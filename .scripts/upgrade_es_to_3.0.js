const {describe, it} = global;
import fs from 'fs';
import {expect} from 'chai';
import _ from 'lodash';
import uuid from 'uuid';
import Promise from 'bluebird';
import elasticsearch from 'elasticsearch';
import ParseContribution from '../parse_contribution';
import UpgradeContribution from '../upgrade_contribution';
import ExportContribution from '../export_contribution';

const esClient = new elasticsearch.Client({
  //log: 'trace',
  host: "http://128.193.70.68:9200"
});

//var dirIn = 'D:/Google Drive/Cogense/Clients/Anthony Koppers/EarthRef/MagIC/Projects/Meteor/Upgrader/2.5 Contributions Test - Citations/';
var dirIn = 'D:/Google Drive/Cogense/Clients/Anthony Koppers/EarthRef/MagIC/Projects/Meteor/Upgrader/2.5 Contributions/';
var dirInBad = 'D:/Google Drive/Cogense/Clients/Anthony Koppers/EarthRef/MagIC/Projects/Meteor/Upgrader/2.5 Contributions with Issues/';
var dirOut = 'client/modules/magic/actions/tests/output/upgraded7/';
var esOut = 'client/modules/magic/actions/tests/output/es7/';
var pre3backup = 'client/modules/magic/actions/tests/output/pre3backup7/';
var esBackup = 'client/modules/magic/actions/tests/output/esBackup/';
if (!fs.existsSync(dirOut)) fs.mkdirSync(dirOut);
if (!fs.existsSync(esOut)) fs.mkdirSync(esOut);
if (!fs.existsSync(pre3backup)) fs.mkdirSync(pre3backup);
if (!fs.existsSync(esBackup)) fs.mkdirSync(esBackup);

describe('magic.actions.upgrade_es_to_3.0', () => {
  it('should finish.', function (done) { setTimeout(() => {
    esNextToUpgrade(5000).then((resp) =>{
      let id = 11201;
      Promise.each(resp.hits.hits, (hit, i) => {
        if (!fs.existsSync(esBackup + 'MagIC_Contribution_' + hit._source.MAGIC_CONTRIBUTION_ID + '.json'))
          fs.writeFileSync(esBackup + 'MagIC_Contribution_' + hit._source.MAGIC_CONTRIBUTION_ID + '.json', JSON.stringify(hit));
        if (fs.existsSync(dirInBad + hit._source.MAGIC_CONTRIBUTION_ID + '.txt'))
          console.log("SKIPPING CONTRIBUTION WITH ISSUES:", hit._source.MAGIC_CONTRIBUTION_ID);
        else if (!fs.existsSync(pre3backup + 'MagIC_Contribution_' + hit._source.MAGIC_CONTRIBUTION_ID + '.txt')) {
          try {
            let doc = _.cloneDeep(hit._source);
            let newID = id + i;
            console.log(hit._source.MAGIC_CONTRIBUTION_ID, '|', newID, '|', hit._id);
            doc.MAGIC_CONTRIBUTION_ID = "" + newID;
            doc.VERSION = "" + (parseInt(doc.VERSION) + 1);
            doc.CONTRIBUTOR_ID = "6382";
            doc.CONTRIBUTOR = "MagIC Database Team";
            doc.MAGIC_VERSION = "3.0";
            doc.FOLDER = "zmab";
            doc.FILE_NAME = "MagIC_Contribution_" + newID;
            doc.version_history.unshift({
              "folder": "zmab",
              "contributor": "MagIC Database Team",
              "upload": 1,
              "file_name": "MagIC_Contribution_" + newID,
              "contribution_id": newID,
              "version": parseInt(doc.VERSION),
              "magic_version": 3,
              "activated": hit._source.version_history[0].activated
            });
            const text = fs.readFileSync(dirIn + hit._source.MAGIC_CONTRIBUTION_ID + '.txt', "utf8");
            fs.writeFileSync(pre3backup + 'MagIC_Contribution_' + hit._source.MAGIC_CONTRIBUTION_ID + '.txt', text);

            const parser = new ParseContribution({});
            return parser.parsePromise({text: text}).then(() => {
              try {
                expect(parser.errors().length).to.equal(0);
                const upgrader = new UpgradeContribution({});
                if (parser.errors().length === 0) return upgrader.upgradePromise({json: parser.json}).then(() => {
                  try {
                    expect(upgrader.errors().length).to.equal(0);
                    upgrader.json.contribution[0].id = doc.MAGIC_CONTRIBUTION_ID;
                    upgrader.json.contribution[0].version = doc.VERSION;
                    const exporter = new ExportContribution({});
                    fs.writeFileSync(dirOut + 'MagIC_Contribution_' + newID + '.txt', exporter.toText(upgrader.json));
                    fs.writeFileSync(esOut + 'MagIC_Contribution_' + newID + '.json', JSON.stringify(doc));
                    try {
                      expect(exporter.errors().length).to.equal(0);
                      return esClient.index({
                       index: 'magic_v5', type: 'contributions_summaries',
                       id: uuid.v4(),
                       body: doc,
                      }).then(() => {
                       return esClient.update({
                        index: 'magic_v5', type: 'contributions_summaries',
                        id: hit._id,
                        body: { doc: { "UPLOAD": "2"}},
                       });
                      });
                    } catch (err) {
                      console.log(hit._source.MAGIC_CONTRIBUTION_ID + " ERROR");
                      done(err);
                    }
                  } catch (err) {
                    console.log(hit._source.MAGIC_CONTRIBUTION_ID + " ERROR");
                    done(err);
                  }
                });
              } catch (err) {
                console.log(hit._source.MAGIC_CONTRIBUTION_ID + " ERROR");
                done(err);
              }

            });
          } catch (err) {
            console.log(hit._source.MAGIC_CONTRIBUTION_ID + " ERROR");
            done(err);
          }
        }
        return Promise.resolve();
      }).then(() => {
        done();
      });
    });

  }, 4)});
});

function esNextToUpgrade(n) {
  return esClient.search({
    index: 'magic_v5', type: 'contributions_summaries',
    from: 0,
    size: n,
    body: {
      "query": {
        "bool": {
          "must_not": {
            "term": {
              "MAGIC_VERSION": "3.0"
            }
          },
          "must": {
            "term": {
              "UPLOAD": "1"
            }
          }
        }
      }
    }
  });
}

async function parse(text) {
  const parser = new ParseContribution({});
  await parser.parsePromise({text: text});
  return parser.json;
}

async function upgrade(json) {
  const upgrader = new UpgradeContribution({});
  await upgrader.upgradePromise({json: json});
  return upgrader.json;
}