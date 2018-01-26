const {describe, it} = global;
import fs from 'fs';
import {expect} from 'chai';
import _ from 'lodash';
import uuid from 'uuid';
import Promise from 'bluebird';
import elasticsearch from 'elasticsearch';

const esClient = new elasticsearch.Client({
  //log: 'trace',
  host: "http://128.193.70.68:9200"
});

var dirIn = 'client/modules/magic/actions/tests/output/upgraded7/';
var esDirIn = 'client/modules/magic/actions/tests/output/es7/';
var esBackup = 'client/modules/magic/actions/tests/output/esBackup/';
var dirOut = 'client/modules/magic/actions/tests/output/upgraded8/';
var esDirOut = 'client/modules/magic/actions/tests/output/es8/';
if (!fs.existsSync(dirOut)) fs.mkdirSync(dirOut);
if (!fs.existsSync(esDirOut)) fs.mkdirSync(esDirOut);

describe('magic.actions.fix_upgrade_to_3.0', () => {
  it('should finish.', function (done) { setTimeout(() => {
    return Promise.each(fs.readdirSync(esDirIn).slice(5,5000), (file) => {
      return new Promise((resolve) => {
        const doc = JSON.parse(fs.readFileSync(esDirIn + file, "utf8"));
        const magicID = parseInt(doc.MAGIC_CONTRIBUTION_ID);
        const magicOldID = parseInt(doc.SVW_MAGIC_CONTRIBUTION_ID);
        const magicNewID = magicID + 800;
        let text = fs.readFileSync(dirIn + 'MagIC_Contribution_' + magicID + '.txt', "utf8");
        let lines = text.split('\n');
        let columns = lines[2].split('\t');
        columns[0] = magicNewID;
        if (lines[1].indexOf('description') >= 0) {
          columns[columns.length - 1] = 'Upgraded to MagIC Data Model 3.0 by the MagIC Database Team';
        }
        lines[2] = columns.join('\t');
        if (lines[1].indexOf('description') < 0) {
          lines[1] += '\tdescription';
          lines[2] += '\tUpgraded to MagIC Data Model 3.0 by the MagIC Database Team';
        }
        fs.writeFileSync(dirOut + 'MagIC_Contribution_' + magicNewID + '.txt', lines.join('\n'));

        getDoc(doc.SVW_MAGIC_CONTRIBUTION_ID).then((resp) => {
          try {
            const esID = resp.hits.hits[0]._id;
            let hit = resp.hits.hits[0];
            const oldDoc = JSON.parse(fs.readFileSync(esBackup + 'MagIC_Contribution_' + magicOldID + '.json', "utf8"))._source;
            const oldContributorID = oldDoc.CONTRIBUTOR_ID;
            const oldContributor = oldDoc.CONTRIBUTOR;

            hit._source.MAGIC_CONTRIBUTION_ID = "" + magicNewID;
            hit._source.version_history[0].contribution_id = magicNewID;

            hit._source.CONTRIBUTOR_ID = oldContributorID;
            hit._source.CONTRIBUTOR = oldContributor;
            hit._source.version_history[0].contributor = oldContributor;

            hit._source.FILE_NAME = "MagIC_Contribution_" + magicNewID;
            hit._source.version_history[0].file_name = "MagIC_Contribution_" + magicNewID;

            fs.writeFileSync(esDirOut + 'MagIC_Contribution_' + magicNewID + '.json', JSON.stringify(hit));
            console.log(magicOldID);

            updateDoc(esID, hit._source);

            resolve();
          } catch (err) {
            console.error(doc.SVW_MAGIC_CONTRIBUTION_ID + " ERROR", err);
            resolve();
          }
        });
      });
    }).then(() => { done(); });
  }, 4)});
});

function getDoc(id) {
  return esClient.search({
    index: 'magic_v5', type: 'contributions_summaries',
    from: 0,
    size: 2,
    body: {
      "query": {
        "bool": {
          "must": [{
            "term" : { "SVW_MAGIC_CONTRIBUTION_ID": "" + id }
          },
            { "term" : { "UPLOAD": "1" }
            }]
        }
      }
    }
  });
}

function updateDoc(id, doc) {
  return esClient.update({
    index: 'magic_v5', type: 'contributions_summaries',
    id: id,
    refresh: true,
    body: { doc: doc}
  });
}