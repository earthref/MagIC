import _ from "lodash";
import elasticsearch from "elasticsearch";
import BPromise from "bluebird";
import AWS from 'aws-sdk';

import ExportContribution from '/lib/modules/magic/export_contribution';
import { s3UploadObject, s3ListObjects, s3DeleteKeys } from "/server/methods/s3";

const esClient = new elasticsearch.Client({
  //log: "trace",
  host: "http://128.193.70.68:9200",
  keepAlive: false,
  requestTimeout: 60 * 60 * 1000 // 1 hour
});

let index = "magic_v4";

describe("magic.s3", () => {

  it("magic-contributions bucket should be up to date", function (done) { setTimeout(() => {
    this.timeout(0);

    esClient.search({
      index: index, type: "contribution", size: 1e4, 
      _source: "summary.contribution.id",
      body: {
        "query": { "bool": { 
          "must": [
            { "term": { "summary.contribution._is_activated": "true"}},
            { "term": { "summary.contribution._is_latest": "true"}}
          ]
        }}
      }
    }).then((resp) => {
      const activatedLatestCIDsInES = _.map(resp.hits.hits, hit => parseInt(hit._source.summary.contribution.id)).sort();
      s3ListObjects({ bucket: 'magic-contributions' }).then((objects) => {
        const activatedLatestKeysInS3 = _.reduce(_.map(objects, 'Key'), (cIDs, key) => {
          const cID = parseInt(key);
          cIDs[cID] = cIDs[cID] || [];
          if (key !== cID + '/') cIDs[cID].push(key);
          return cIDs;
        }, {});
        const activatedLatestCIDsInS3 = _.keys(activatedLatestKeysInS3).sort();
        const activatedLatestCIDsIncompleteInS3 = _.filter(activatedLatestCIDsInS3, cID => {
          return _.indexOf(activatedLatestKeysInS3[cID], `${cID}/magic_contribution_${cID}.txt`) < 0;
        });
        const activatedLatestCIDsNotInS3 = _.differenceWith(activatedLatestCIDsInES, activatedLatestCIDsInS3, (x, y)  => x == y);
        const activatedLatestCIDsNotInES = _.differenceWith(activatedLatestCIDsInS3, activatedLatestCIDsInES, (x, y)  => x == y);
        
        if (activatedLatestCIDsIncompleteInS3.length) console.log('Activated latest contributions are incomplete in S3', activatedLatestCIDsIncompleteInS3.join(','));
        if (activatedLatestCIDsNotInS3.length) console.log('Activated latest contributions missing in S3', activatedLatestCIDsNotInS3.join(','));
        if (activatedLatestCIDsNotInES.length) console.log('Activated latest contributions missing in ES', activatedLatestCIDsNotInES.join(','));
        
        if (activatedLatestCIDsIncompleteInS3.length)
          return done(activatedLatestCIDsIncompleteInS3.length + " activated latest contributions are incomplete in S3");
        else if (activatedLatestCIDsNotInS3.length)
          return done(activatedLatestCIDsNotInS3.length + " activated latest contributions are missing in S3");
        else if (activatedLatestCIDsNotInES.length)
          return done(activatedLatestCIDsNotInES.length + " activated latest contributions are shouldn't be in S3");
        else
          return done();
      });
    });
    
  }, 0)});

  it("magic-activated-contributions bucket should be up to date", function (done) { setTimeout(() => {
    this.timeout(0);

    esClient.search({
      index: index, type: "contribution", size: 1e4, 
      _source: "summary.contribution._history",
      body: {
        "query": { "bool": { 
          "must": [
            { "term": { "summary.contribution._is_activated": "true"}}
          ]
        }}
      }
    }).then((resp) => {
      const activatedCIDsInES = _.uniq(_.flatten(_.map(resp.hits.hits, hit => 
        _.map(hit._source.summary.contribution._history, history => history.id)))).sort();
      s3ListObjects({ bucket: 'magic-activated-contributions' }).then((objects) => {
        const activatedKeysInS3 = _.reduce(_.map(objects, 'Key'), (cIDs, key) => {
          const cID = parseInt(key);
          cIDs[cID] = cIDs[cID] || [];
          if (key !== cID + '/') cIDs[cID].push(key);
          return cIDs;
        }, {});
        const activatedCIDsInS3 = _.keys(activatedKeysInS3).sort();
        const activatedCIDsIncompleteInS3 = _.filter(activatedCIDsInS3, cID => {
          return _.indexOf(activatedKeysInS3[cID], `${cID}/magic_contribution_${cID}.txt`) < 0;
        });
        const activatedCIDsNotInS3 = _.differenceWith(activatedCIDsInES, activatedCIDsInS3, (x, y)  => x == y);
        const activatedCIDsNotInES = _.differenceWith(activatedCIDsInS3, activatedCIDsInES, (x, y)  => x == y);
        
        if (activatedCIDsIncompleteInS3.length) console.log('Activated contributions are incomplete in S3', activatedCIDsIncompleteInS3.join(','));
        if (activatedCIDsNotInS3.length) console.log('Activated contributions missing in S3', activatedCIDsNotInS3.join(','));
        if (activatedCIDsNotInES.length) console.log('Activated contributions missing in ES', activatedCIDsNotInES.join(','));
        
        if (activatedCIDsIncompleteInS3.length)
          return done(activatedCIDsIncompleteInS3.length + " activated contributions are incomplete in S3");
        else if (activatedCIDsNotInS3.length)
          return done(activatedCIDsNotInS3.length + " activated contributions are missing in S3");
        else if (activatedCIDsNotInES.length)
          return done(activatedCIDsNotInES.length + " activated contributions are shouldn't be in S3");
        else
          return done();
      });
    });
    
  }, 0)});

  it("magic-private-contributions bucket should be up to date", function (done) { setTimeout(() => {
    this.timeout(0);

    esClient.search({
      index: index, type: "contribution", size: 1e4, 
      _source: "summary.contribution.id",
      body: {
        "query": { "bool": { 
          "must": [
            { "term": { "summary.contribution._is_activated": "false"}}
          ]
        }}
      }
    }).then((resp) => {
      const privateCIDsInES = _.map(resp.hits.hits, hit => parseInt(hit._source.summary.contribution.id)).sort();
      s3ListObjects({ bucket: 'magic-private-contributions' }).then((objects) => {
        const privateKeysInS3 = _.reduce(_.map(objects, 'Key'), (cIDs, key) => {
          const cID = parseInt(key);
          cIDs[cID] = cIDs[cID] || [];
          if (key !== cID + '/') cIDs[cID].push(key);
          return cIDs;
        }, {});
        const privateCIDsInS3 = _.keys(privateKeysInS3).sort();
        const privateCIDsNotInS3 = _.differenceWith(privateCIDsInES, privateCIDsInS3, (x, y)  => x == y);
        const privateCIDsNotInES = _.differenceWith(privateCIDsInS3, privateCIDsInES, (x, y)  => x == y);

        if (privateCIDsNotInS3.length) console.log('Private contributions missing in S3', privateCIDsNotInS3.join(','));
        if (privateCIDsNotInES.length) console.log('Private contributions missing in ES', privateCIDsNotInES.join(','));
        
        if (privateCIDsNotInS3.length)
          return done(privateCIDsNotInS3.length + " private contributions are missing in S3");
        else if (privateCIDsNotInES.length)
          return done(privateCIDsNotInES.length + " private contributions are shouldn't be in S3");
        else
          return done();
      });
    });
    
  }, 0)});

  xit("magic-activated-contributions bucket should be up", function (done) { setTimeout(() => {
    this.timeout(0);

    esClient.search({
      index: index, type: "contribution", size: 1e4, 
      _source: [
        "summary.contribution.id"
      ],
      body: {
        "query": { "bool": { 
          "must": [
            { "term": { "summary.contribution._is_latest": "true"}}
          ]
        }}
      }
    }).then((resp) => {
      const latestCIDs = _.map(resp.hits.hits, hit => hit._source.summary.contribution.id);
      new BPromise(resolve => {
        try {
          s3ListObjects({ bucket: 'magic-contributions' }).then((objects) => { 
            resolve(_.reduce(_.map(objects, 'Key'), (cIDs, key) => {
              const cID = parseInt(key);
              cIDs[cID] = cIDs[cID] || [];
              if (key !== cID + '/') cIDs[cID].push(key);
              return cIDs;
            }, {}));
          });
        } catch (e) {
          console.error("s3ListObjects", `Failed to retrieve S3 objects in ${bucket}`, e);
          throw new Meteor.Error("s3ListObjects", `Failed to retrieve S3 objects in ${bucket}`);
        }
      }).then((s3CIDsAndKeys) => {
        s3CIDs = _.map(_.keys(s3CIDsAndKeys), x => parseInt(x));
        const oldCIDs = _.difference(s3CIDs, latestCIDs);
        const oldKeys = _.flatten(_.values(_.pick(s3CIDsAndKeys, oldCIDs)));
        if (oldCIDs.length) {
          s3DeleteKeys({ bucket: 'magic-contributions', keys: oldKeys }).then(() => { 
            s3DeleteKeys({ bucket: 'magic-contributions', keys: _.map(oldCIDs, c => c + '/') }).then(() => {
              console.log('Deleted previous contributions versions', oldCIDs);
              done();
            });
          });
        } else { done(); }
      });
    });
    
  }, 0)});

  xit("latest activated contributions should be uploaded", function (done) { setTimeout(() => {
    this.timeout(0);

    esClient.search({
      index: index, type: "contribution", size: 1e4, 
      _source: [
        "summary.contribution.id", 
        "contribution"
      ],
      body: {
        "query": { "bool": { 
          "must": [
            { "term": { "summary.contribution._is_latest": "true"}},
            { "term": { "summary.contribution._is_activated": "true"}}
          ]
        }}
      }
    }).then((resp) => {
      BPromise.each(resp.hits.hits, hit => {
        const cid = hit._source.summary.contribution.id;
        return new Promise((resolve) => {
          try {
            s3ListObjects({ bucket: 'magic-contributions', prefix: '' + cid }).then((objects) => {
              if (objects.length > 0) {
                console.log('Already in magic-contribuitons on S3', cid);
                resolve(true);
              } else if (hit._source.contribution) {
                const exporter = new ExportContribution({});
                s3UploadObject({
                  bucket: 'magic-contributions',
                  key: `${cid}/magic_contribution_${cid}.txt`,
                  body: exporter.toText(hit._source.contribution)
                }).then((data) => {
                  console.log('Uploaded to magic-contributions on S3', cid);
                  resolve(true);
                });
              } else {
                resolve(`Failed to upload ${cid} because the contribuion data are not in Elasticsearch.`)
              }
            });
          } catch (e) {
            resolve(e);
          }
        });
      }).then((results) => {
        if (!_.every(results, Boolean))
          done("Failed to upload all latest activated contributions.");
        else
          done();
      });

    });

  }, 0)});

});
