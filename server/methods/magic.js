import _ from 'lodash';
import Fiber from 'fibers';
import uuid from 'uuid';
import request from 'request';
import elasticsearch from 'elasticsearch';
//import s3 from 's3';
import moment from 'moment';
import {Collections, collectionDefinitions} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';


const esClient = new elasticsearch.Client({
  //log: 'trace',
  host: 'http://elastic:7UCqaDzNAmgRrPw7VnMVfm7JRBE6@128.193.70.68:9200' //process.env.ELASTICSEARCH_URL
});


//const s3Client = new s3.createClient({
//  s3Options: {
//    accessKeyId: "AKIAJUJ7HRHRA4OXLTTA",
//    secretAccessKey: "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"
//  }
//});

export default function () {

  Meteor.methods({
    'insertContribution': function (contributor, user, mailid, name, c, s) {
      //check(id, Integer);
      //check(name, String);
      //check(data, Object);

      if (c.contribution && c.contribution.length > 0) {
        c.contribution = c.contribution.splice(0,1);
        delete c.contribution[0].version;
        delete c.contribution[0].id;
        delete c.contribution[0].magic_version;
        delete c.contribution[0].timestamp;
      } else {
        c.contribution = [{}];
      }
      c.contribution[0].contributor = user;
      c.contribution[0].magic_version = '3.0';
      c.contribution[0].version = 'PRIVATE';
      c.contribution[0].timestamp = moment().toISOString();
      c._contributor = user;
      c._inserted = c.contribution[0].timestamp;
      c._name = name;

      let id = Collections['magic.private.contributions'].findOne('next_id');
      if (id && id.next_id) {
        c.contribution[0].id = id.next_id;
        Collections['magic.private.contributions'].update('next_id', {next_id: id.next_id + 1});
      }

      c._id = uuid.v4();

      if (c.measurements && c.measurements.rows && c.measurements.columns) {
        let i = 0;
        for (i = 0; i < c.measurements.rows.length; i+=1000) {
          Collections['magic.private.measurements'].insert({
            contribution_mongo_id: c._id,
            columns: c.measurements.columns,
            rows: c.measurements.rows.slice(i, 1000)
          });
        }
      }

      s = s || {};
      s.contribution = s.contribution || {};
      s.contribution.TITLE = c._name;
      s.contribution.CONTRIBUTOR = contributor;
      s.contribution.CONTRIBUTOR_ID = mailid;
      s.contribution.INSERTED = c._inserted;
      s.contribution.VERSION = 'PRIVATE';
      s.contribution.MAGIC_CONTRIBUTION_ID = c.contribution[0].id;
      s.contribution._id = c._id;
      c._summary = s;


      /*let es = {};
       _.keys(c._summary.contribution, (k) => {
       if (k !== 'LAT' &&
       k !== 'LON' &&
       k !== 'VGP_LAT' &&
       k !== 'VGP_LON')
       es[k] = c._summary.contribution[k];
       });*/


      Collections['magic.private.contributions'].insert(c);
    },
    'updateContribution': function (id, c, s) {
      c._summary = s;

      if (c.measurements && c.measurements.rows && c.measurements.columns) {
        let i = 0;
        for (i = 0; i < c.measurements.rows.length; i+=1000) {
          Collections['magic.private.measurements'].insert({
            contribution_mongo_id: c._id,
            columns: c.measurements.columns,
            rows: c.measurements.rows.slice(i, 1000)
          });
        }
      }

      Collections['magic.private.contributions'].update(id, c);
    },
    'activateContribution': function (id) {
      let c = Collections['magic.private.contributions'].findOne(id);
      c._es_id = uuid.v4();
      c._activated = true;
      Collections['magic.private.contributions'].update(id, c);

      if (c && c.contribution && c.contribution[0].doi) {
        esClient.search({
          index: 'magic_v5', type: 'contributions_summaries',
          body: {
            "size": 1,
            "query": {
              "bool": {
                "must": {
                  "simple_query_string": {
                    "query": '"' + c.contribution[0].doi + '"'
                  }
                },
                "filter": {
                  "term": {"UPLOAD": 1}
                }
              }
            }
          }
        }).then((resp) => {

          c._summary.contribution.VERSION = '1';
          resp.hits.hits.forEach((hit) => {
            c._summary.prev_version = hit._source.VERSION;
            c._summary.prev_contributor_id = hit._source.CONTRIBUTOR_ID;
            c._summary.prev_contributor = hit._source.CONTRIBUTOR;
            if (c._summary.prev_version)
              c._summary.contribution.VERSION = Number(c._summary.prev_version) + 1 + '';
          });

          let summary = _.pick(c._summary.contribution, [
            "AGE_UNIT",
            "LAT_N",
            "N_LOCATION_RESULTS",
            "LITHOLOGIES",
            "MEAS_STEP_MAX",
            "AGES",
            "GEOLOGIC_TYPES",
            "N_SITES",
            "N_SPECIMENS",
            "LON_W",
            "CONTRIBUTOR_ID",
            "CITATIONS",
            "LAT_S",
            "CONTRIBUTOR",
            "N_SAMPLES",
            "N_SAMPLE_RESULTS",
            "LON_E",
            "N_LOCATIONS",
            "METHOD_CODES",
            "MEAS_STEP_UNIT",
            "LOCATION_TYPE",
            "GEOLOGIC_CLASSES",
            "N_MEASUREMENTS",
            "N_SPECIMEN_RESULTS",
            "N_EXPERIMENTS",
            "TITLE",
            "MEAS_STEP_MIN",
            "N_SITE_RESULTS",
            "CITATION",
            "YEAR",
            "REFERENCE_KEYWORDS",
            "MAGIC_CONTRIBUTION_ID",
            "JOURNAL",
            "REFERENCE_HTML",
            "FILE_NAME"
          ]);
          summary.UPLOAD = 1;
          summary.INSERTED = moment().format("DD-MMM-YY HH:mm:ss");
          //summary.MONGO_ID = id;

          //console.log('insertContribution', c.contribution);
          esClient.index({
            index: 'magic_v5', type: 'contributions_summaries',
            id: id,
            body: summary,
          }, function (error, response) {
            if (error) {
              console.trace(error.message);
              //this.error(new Meteor.Error(e, 'hey!'));
            }
          });

        }, function (error) {
          if (error) {
            console.trace(error.message);
            //this.error(new Meteor.Error(e, 'hey!'));
          }
        });
      } else {
        if (error) {
          console.trace(error.message);
          //this.error(new Meteor.Error(e, 'hey!'));
        }
      }
    },
    'updatePrevious': function(id) {
      let c = Collections['magic.private.contributions'].findOne(id);
      if (c && c.contribution && c.contribution[0].doi) {
        esClient.search({
          index: 'magic_v5', type: 'contributions_summaries',
          body: {
            "size": 1,
            "query": {
              "bool": {
                "must": {
                  "simple_query_string": {
                    "query": '"' + c.contribution[0].doi + '"'
                  }
                },
                "filter": {
                  "term": {"UPLOAD": 1}
                }
              }
            }
          }
        }).then((resp) => {

          console.log('updatePrevious es', resp.hits.hits);

          resp.hits.hits.forEach((hit) => {
            c._summary.prev_version = hit._source.VERSION;
            c._summary.prev_contributor_id = hit._source.CONTRIBUTOR_ID;
            c._summary.prev_contributor = hit._source.CONTRIBUTOR;
            c._summary.contribution.VERSION = '1';
            if (c._summary.prev_version)
              c._summary.contribution.VERSION = Number(c._summary.prev_version) + 1 + '';
            c.contribution[0].version = c._summary.contribution.VERSION;
            console.log('updatePrevious after', id, c._summary.contribution.VERSION, c.contribution[0].version);
            updateContribution(id, c);
            console.log('updatePrevious updated', Collections['magic.private.contributions'], id, c._summary.contribution.VERSION, c.contribution[0].version);

          });

        }, function (err) {
          console.trace(err.message);
        });
      }
    },
    'updateDOI': function (id, doiData) {
      check(id, String);
      check(doiData, Object);

      let c = Collections['magic.private.contributions'].findOne(id);
      c._doiData = doiData;
      c._summary = c._summary || {};
      c._summary.contribution = c._summary.contribution || {};
      c.contribution = c.contribution || [{}];

      if (doiData && doiData.title && doiData.title[0]) {
        c._name = doiData.title[0];
        c._summary.contribution.TITLE = doiData.title[0];
      }
      if (doiData && doiData['container-title'] && doiData['container-title'][0]) {
        c._summary.contribution.JOURNAL = doiData['container-title'][0];
      }
      if (doiData && doiData.DOI)
        c.contribution[0].doi = doiData.DOI;
      if (doiData && doiData['published-print'] && doiData['published-print']['date-parts'] &&
        doiData['published-print']['date-parts'][0] && doiData['published-print']['date-parts'][0][0]) {
        c._summary.contribution.YEAR = doiData['published-print']['date-parts'][0][0];
      }
      c._summary.contribution.REFERENCE_KEYWORDS = doiData.subject.join(':') || undefined;
      if (doiData && doiData.author && doiData.author.length == 1) {
        c._summary.contribution.CITATION = doiData.author[0].family;
      }
      if (doiData && doiData.author && doiData.author.length == 2) {
        c._summary.contribution.CITATION = doiData.author[0].family + ' & ' + doiData.author[1].family;
      }
      if (doiData && doiData.author && doiData.author.length > 2) {
        c._summary.contribution.CITATION = doiData.author[0].family + ' et al.';
      }
      if (c._summary.contribution.YEAR)
        c._summary.contribution.CITATION += ' (' + c._summary.contribution.YEAR + ')';
      c._summary.contribution.REFERENCE_HTML = '<b>' +
        doiData.author.map((a) => a.family + ', ' + a.given).join(', ') +
        ' (' + c._summary.contribution.YEAR + ').</b> ' +
        c._summary.contribution.TITLE + '.<i> ' +
        c._summary.contribution.JOURNAL +
        (doiData.volume ? ' ' + doiData.volume : '') +
        (doiData.issue ? ' (' + doiData.issue + ')' : '') +
        (doiData.page ? ':' + doiData.page : '') + '. ' +
        'doi:<a href="//dx.doi.org/' + doiData.DOI + '">' + doiData.DOI + '</a>.</i>';
      Collections['magic.private.contributions'].update(id, c);
    },
    'deleteContribution': function(id, user) {
      console.log('deleting', id, user);
      let nRemoved = Collections['magic.private.contributions'].remove({_id: id, _contributor: user});
      if (nRemoved < 1) {
        if (error) {
          console.trace(error.message);
          //this.error(new Meteor.Error(e, 'hey!'));
        }
      }
    }
  });

};

function updateContribution(id, c) {
  console.log('before update', id, c);
  Collections['magic.private.contributions'].update(id, c);
  console.log('after update', id, c);

}
