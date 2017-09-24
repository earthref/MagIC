const {describe, it} = global;
import fs from 'fs';
import {expect} from 'chai';
import _ from 'lodash';
import Promise from 'bluebird';
import elasticsearch from 'elasticsearch';
import ParseContribution from '/lib/modules/magic/parse_contribution';
import UpgradeContribution from '/lib/modules/magic/upgrade_contribution';
import ExportContribution from '/lib/modules/magic/export_contribution';
import SummarizeContribution from '/lib/modules/magic/summarize_contribution';

import {versions, models} from '/lib/configs/magic/data_models';

const esClient = new elasticsearch.Client({
  //log: 'trace',
  host: "http://128.193.70.68:9200",
  keepAlive: false,
  requestTimeout: 60 * 60 * 1000 // 1 hour
});

//var dirIn = 'D:/Google Drive/Cogense/Clients/Anthony Koppers/EarthRef/MagIC/Projects/Meteor/Upgrader/2.5 Contributions Test - Citations/';
var dirIn = 'D:/Google Drive/Cogense/Clients/Anthony Koppers/EarthRef/MagIC/Projects/Meteor/Upgrader/3.0 Contributions 5/';
var dirOut = 'client/modules/magic/actions/tests/output/summaries5/';
var indexName = 'magic_v2';
if (!fs.existsSync(dirOut)) fs.mkdirSync(dirOut);

describe('magic.actions.summarize', () => {

  const files = fs.readdirSync(dirIn);
  if (files) for (var file of files.slice(0,5000)) {

    describe('when summarizing ' + file, function(file) {
      it('should process ' + file, function (done) { setTimeout(() => {
        this.timeout(0);

        //if (fs.existsSync(dirOut + '/' + file + '.indexes/' + file + '.contribution.json')) {
        if (fs.existsSync(dirOut + '/' + file + '.summary.json')) {
          done();
          return undefined;
        }

        const text = fs.readFileSync(dirIn + file, "utf8");
        const parser = new ParseContribution({});
        parser.parsePromise({text: text}).then(() => {
          //console.log('Parser output', parser.json);
          try {
            expect(parser.errors().length).to.equal(0);
            expect(file).to.equal("magic_contribution_" + parser.json.contribution[0].id + ".txt");
            esOldByContribution(parser.json.contribution[0].id).then((resp) => {
              expect(resp.hits.total).to.equal(1);

              let oldContribution = resp.hits.hits[0]._source;
              let newContribution = {};

              if (oldContribution.CONTRIBUTOR) newContribution._contributor = oldContribution.CONTRIBUTOR;
              if (oldContribution.UPLOAD) newContribution._is_latest = parseInt(oldContribution.UPLOAD) == 1 ? 'true' : 'false';
              if (oldContribution.version_history) newContribution._history = oldContribution.version_history.map(v => {
                return {
                  contributor: v.contributor,
                  id: v.contribution_id,
                  data_model_version: parseFloat(v.magic_version).toFixed(1),
                  timestamp: v.activated,
                  version: v.version
                }
              });

              newContribution._reference = {};
              if (oldContribution.TITLE) newContribution._reference.title = oldContribution.TITLE;
              if (oldContribution.CITATION) newContribution._reference.citation = oldContribution.CITATION;
              if (oldContribution.YEAR) newContribution._reference.year = oldContribution.YEAR;
              if (oldContribution.LONG_AUTHORS) newContribution._reference.long_authors = oldContribution.LONG_AUTHORS;
              if (oldContribution.JOURNAL) newContribution._reference.journal = oldContribution.JOURNAL;

              if (oldContribution.REFERENCE_KEYWORDS) newContribution._reference.keywords = oldContribution.REFERENCE_KEYWORDS;
              if (oldContribution.REFERENCE_TAGS) newContribution._reference.tags = oldContribution.REFERENCE_TAGS;
              if (oldContribution.REFERENCE_HTML) newContribution._reference.html = oldContribution.REFERENCE_HTML;
              if (oldContribution.ABSTRACT_HTML) newContribution._reference.abstract_html = oldContribution.ABSTRACT_HTML;

              const summarizer = new SummarizeContribution({});
              summarizer.summarizePromise(parser.json, newContribution).then(() => {
                expect(summarizer.errors().length).to.equal(0);
                fs.writeFileSync(dirOut+file+'.summary.json', JSON.stringify(summarizer.json));

                let bulkIndex = [], rowIdx = 0, cID = summarizer.json.contribution.summary.contribution.id;
                bulkIndex.push({ index: { _index: indexName, _type: 'contribution', _id: cID + '_' + rowIdx } }, summarizer.json.contribution);
                rowIdx += 1;
                _.without(_.keys(summarizer.json), 'contribution').forEach((indexType) => {
                  _.keys(summarizer.json[indexType]).forEach((name) => {
                    _.keys(summarizer.json[indexType][name]).forEach((parent) => {
                      bulkIndex.push({ index: { _index: indexName, _type: indexType, _id: cID + '_' + rowIdx } }, summarizer.json[indexType][name][parent]);
                      rowIdx += 1;
                    });
                  });
                });
                Promise.map(_.chunk(bulkIndex, 2*100), (bulkIndexChunk, i, n) => {
                  return new Promise((resolve) => {
                    console.log('starting chunk', i+1, 'of', n);
                    esClient.bulk({ body: bulkIndexChunk }, (err, resp) => {
                      fs.writeFileSync(dirOut + file + '-chunk-' + (i+1) + '.resp.json', JSON.stringify(resp));
                      //if (resp.errors) {
                      //  console.log('errors in chunk', i+1, 'of', n);
                      //  fs.writeFileSync(dirOut + file + '-chunk-' + (i+1) + '.errors.json', JSON.stringify(resp));
                      //  resolve(false);
                      //}
                      //else {
                        console.log('finished chunk', i+1, 'of', n);
                        resolve(true);
                      //}
                    });
                  });
                }, { concurrency: 3 }).then((results) => {
                  if (_.every(results, Boolean)) done();
                  else done(results);
                });
              });
            });

          } catch (err) {
            done(err);
          }
        });
      }, 0)});
    }.bind(null, file));
  }
});

function esOldByContribution(id) {
  return esClient.search({
    index: 'magic_v5', type: 'contributions_summaries',
    body: {
      "query": {
        "bool": {
          "must": [
            {
              "term": {
                "UPLOAD": "1"
              }
            }, {
              "term": {
                "MAGIC_CONTRIBUTION_ID": id
              }
            }
          ]
        }
      }
    }
  });
}