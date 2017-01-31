var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var elasticsearch = require('elasticsearch');
var csv = require('fast-csv');
var uuid = require('uuid');
var Promise = require('bluebird');

function elasticsearch_csv (options) {
  this.options = options || {};

  if (!this.options.es || !this.options.es.index) {
    throw new Error('index is invalid or missing');
  }
  if (!this.options.es || !this.options.es.type) {
    throw new Error('type is invalid or missing');
  }
  if (!this.options.csv || !this.options.csv.filePath) {
    throw new Error('filePath is invalid or missing');
  }
  try {
    stats = fs.lstatSync(path.resolve(this.options.csv.filePath));

    if (stats.isDirectory()) {
      throw new Error('file is a directory');
    }
  } catch (err) {
    throw err;
  }

  this.esClient = new elasticsearch.Client(_.omit(this.options.es, ['index','type']));

  return this;
}

elasticsearch_csv.prototype = {
  parse: function () {
    return new Promise((function (resolve, reject) {
      var request = {
          body: []
        },
        stream = fs.createReadStream(this.options.csv.filePath),
        csvStream = csv(_.omit(this.options.csv, ['filePath']))
          .on('data', (function (data) {
            if (_.isPlainObject(data)) {
              var _id = uuid.v4();
              var body = {};
              _.forEach(data, function (value, key) {
                if (/^SVW_.*_ID$/.test(key)) _id = key + ':' + value;
                try {
                  //console.log(key, value, !/^\s*$/.test(value));
                  if (!/^\s*$/.test(value) && key !== 'BBOX' && key !== 'CTX_REFERENCE') {
                    body[key] = value; //JSON.parse(value);
                    //console.log('Inserting', key, body[key]);
                  }
                } catch (ignore) {
                  //console.log(ignore);
                }
              });
              request.body.push({ index: { _index: this.options.es.index, _type: this.options.es.type, _id: _id } });
              request.body.push(body);
              //console.log(JSON.stringify(body, null, '  '));
            } else {
              reject(new Error('Data and/or options have no headers specified'));
            }
          }).bind(this))
          .on('end', function () {
            resolve(request);
          })
          .on('data-invalid', reject);

      stream.pipe(csvStream);
    }).bind(this));
  },
  import: function () {
    return new Promise((function (resolve, reject) {
      this.parse().then((function (request) {
        request.timeout = '2h';
        this.esClient.bulk(request, function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      }).bind(this), reject);
    }).bind(this));
  }
};

var types = {
  CO: 'contributions',
  LO: 'locations',
  SI: 'sites',
  SA: 'samples',
  SP: 'specimens',
  SY: 'synthetics',
  ME: 'measurements'
};
var dir = '.data/level2/';
var v = 5;
var indexes = {
  '':              'summaries',
  IMAGES:          'images',
  PLOTS:           'plots',
  AGES:            'ages',
  PMAG_RESULTS:    'pmag_results',
  RMAG_RESULTS:    'rmag_results',
  RMAG_ANISOTROPY: 'rmag_anisotropies',
  RMAG_HYSTERESIS: 'rmag_hystereses',
  RMAG_REMANENCE:  'rmag_remanences',
  RMAG_SUSCEPT:    'rmag_susceptibilities'
};

files = fs.readdirSync(dir + 'chunks/');
function insertFile(file) {
  var result = /SVW_(ER|MAGIC)_(.*?)(_(IMAGES|AGES|PLOTS|PMAG_RESULTS|RMAG_(.*)))?_DATA_TABLE\.dsv.\d+$/.exec(file);
  if (!result) {
    console.log('Skipping', dir + 'chunks/' +file);
    if (files.length > 0) insertFile(files.shift());
  }
  var type = types[result[2].substr(0,2)] + '_' + (indexes[result[4]] || indexes['']);
  var index = 'magic_v' + v; //indexes[result[4]] || indexes[''];

  //console.log(file, type, index);
  //return;

  var esCSV = new elasticsearch_csv({
    es: { index: index, type: type, host: 'http://elastic:7UCqaDzNAmgRrPw7VnMVfm7JRBE6@128.193.70.68:9200', requestTimeout: 120000 },
    csv: { filePath: dir + 'chunks/' + file, headers: true, delimiter: '˧' }
  });

  esCSV.import()
    .then(function (response) {
      // Elasticsearch response for the bulk insert
      if (response.errors) {
        fs.writeFileSync(dir + 'chunks/' + file + '.es.errors.json', JSON.stringify(response, null, '  '));
        console.log('ERROR!', dir + 'chunks/' + file + '.es.errors.json');
      }
      else
        console.log(file, 'success in', response.took);
      if (files.length > 0) insertFile(files.shift());
    }, function (err) {
      fs.writeFileSync(dir + 'chunks/' + file + '.import.errors.json', JSON.stringify(err, null, '  '));
      console.log('ERROR!', dir + 'chunks/' + file + '.import.errors.json');
      if (files.length > 0) insertFile(files.shift());
    });

}
insertFile(files.shift());
