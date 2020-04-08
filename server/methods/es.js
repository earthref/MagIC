import {Promise as BPromise} from 'bluebird';

import {Meteor} from 'meteor/meteor';
import {Promise} from 'meteor/promise';

import _ from "lodash";
import __ from "deepdash/standalone";
import uuid from "uuid";
import moment from "moment";
import bcrypt from "bcrypt";
import sizeof from "object-sizeof";
import elasticsearch from "elasticsearch";

import ExportContribution from '/lib/modules/magic/export_contribution.js';
import SummarizeContribution from '/lib/modules/magic/summarize_contribution.js';
import ValidateContribution from '/lib/modules/magic/validate_contribution.js';
import {versions} from '/lib/configs/magic/data_models';
import {levels} from '/lib/configs/magic/search_levels.js';
import { s3UploadObject, s3DeleteKeys } from './s3';
import { resolveTxt } from 'dns';

const saltRounds = 10;

const esClient = new elasticsearch.Client({
  //log: "trace",
  host: Meteor.settings.elasticsearch && Meteor.settings.elasticsearch.url || "",
  keepAlive: false,
  apiVersion: '6.8',
  requestTimeout: 60 * 60 * 1000 // 1 hour
});

//const erUsersIndex = Meteor.isDevelopment ? 'er_users_v1_sandbox' : 'er_users_v1';
const erUsersIndex = Meteor.isDevelopment ? 'er_users_v1' : 'er_users_v1';

export default function () {

  Meteor.methods({

    async esBuckets({index, type, queries, aggs}) {
      console.log("esBuckets", index, type, queries, aggs);
      this.unblock();
      try {

        let search = {
          "_source": false,
          "size": 0,
          "query": {
            "bool": {
              "must": [],
              "filter": [{
                "term": {
                  "summary.contribution._is_latest": "true"
                }
              }]
            }
          },
          aggs : aggs
        };

        if (!_.find(_.map(queries, "terms"), "summary.contribution._private_key")) 
          search.query.bool.filter.push({
            "term": { "summary.contribution._is_activated": "true" }
          });

        if (_.isArray(queries)) search.query.bool.must.push(...queries);

        let resp = await esClient.search({
          "index": index,
          "type": type,
          "body": search
        });
        return _.reverse(_.sortBy(resp.aggregations.buckets.buckets, ["doc_count"]));

      } catch(error) {
        console.error("esBuckets", index, type, queries, error.message);
        throw new Meteor.Error("esBuckets", error.message);
      }
    },

    async esCount({index, type, queries, filters, countField}) {
      console.log("esCount", index, type, queries, filters, countField);
      this.unblock();
      try {

        let search = {
          "query": {
            "bool": {
              "must": [],
              "filter": [{
                "term": {
                  "summary.contribution._is_latest": "true"
                }
              }]
            }
          }
        };
        
        if (!_.find(_.map(queries, "terms"), "summary.contribution._private_key")) {
          search.query.bool.filter.push({
            "term": { "summary.contribution._is_activated": "true" }
          });
        }

        if (_.isArray(queries)) search.query.bool.must.push(...queries);
        if (_.isArray(filters)) search.query.bool.filter.push(...filters);
        if (_.trim(countField) !== "") search.aggs = { count: { sum: { field: countField }}};

        console.log("esCount search:", JSON.stringify(search));
        let resp = _.trim(countField) !== "" ? 
          await esClient.search({
            "index": index,
            "type": type,
            "body": _.extend({}, search, { "_source": false, "size": 0 }),
            "timeout": "60s"
          }) :
          await esClient.count({
            "index": index,
            "type": type,
            "body": search
          });
        let count = _.trim(countField) !== "" ? resp.aggregations.count.value : resp.count;

        console.log("esCount hits:", count);
        return count;

      } catch(error) {
        console.error("esCount", index, type, queries, filters, countField, error.message);
        throw new Meteor.Error("esCount", error.message);
      }
    },

    async esPage({index, type, queries, filters, source, sort}, pageSize, pageNumber) {
      console.log("esPage", pageSize, pageNumber, index, type, queries, filters, sort);
      this.unblock();
      try {

        let search = {
          "from": pageSize * (pageNumber - 1),
          "size": pageSize,
          "_source": source,
          "query": {
            "bool": {
              "must": [],
              "filter": [{
                "term": {
                  "summary.contribution._is_latest": "true"
                }
              }]
            }
          }
        };
        
        if (sort) search.sort = sort;

        if (!_.find(_.map(queries, "terms"), "summary.contribution._private_key")) {
          search.query.bool.filter.push({
            "term": { "summary.contribution._is_activated": "true" }
          });
        }

        if (_.isArray(queries)) search.query.bool.must.push(...queries);
        if (_.isArray(filters)) search.query.bool.filter.push(...filters);

        console.log("esPage search:", JSON.stringify(search));
        let resp = await esClient.search({
          "index": index,
          "type": type,
          "body": search,
          "timeout": "60s"
        });
        console.log("esPage hits:", resp.hits.total);
        return resp.hits.hits.map(hit => hit._source);

      } catch(error) {
        console.error("esPage", index, type, queries, filters, source, sort, pageSize, pageNumber, error.message);
        throw new Meteor.Error("esPage", error.message);
      }
    },
    
    async esScroll({index, type, queries, filters, source, sort}, pageSize) {
      console.log("esScroll", index, type, queries, filters, sort);
      this.unblock();
      try {

        let search = {
          "size": pageSize,
          "_source": source,
          "query": {
            "bool": {
              "must": [],
              "filter": [{
                "term": {
                  "summary.contribution._is_latest": "true"
                }
              }]
            }
          }
        };
        
        if (sort) search.sort = sort;

        if (!_.find(_.map(queries, "terms"), "summary.contribution._private_key")) 
          search.query.bool.filter.push({
            "term": { "summary.contribution._is_activated": "true" }
          });

        if (_.isArray(queries)) search.query.bool.must.push(...queries);
        if (_.isArray(filters)) search.query.bool.filter.push(...filters);

        let resp = await esClient.search({
          "index": index,
          "scroll": '30s',
          "type": type,
          "body": search
        });
        return resp;

      } catch(error) {
        console.error("esScroll", index, type, queries, filters, source, sort, pageSize, error.message);
        throw new Meteor.Error("esScroll", error.message);
      }
    },

    async esScrollByID(scrollID) {
      console.log("esScrollByID", scrollID);
      this.unblock();
      try {

        let resp = await esClient.scroll({
          "scrollId": scrollID,
          "scroll": '30s'
        });
        return resp;

      } catch(error) {
        console.error("esScrollByID", scrollID);
        throw new Meteor.Error("esScrollByID", error.message);
      }
    },

    async esContributionIDs({index, queries, filters}) {
      console.log("esContributionIDs", index, queries, filters);
      this.unblock();
      try {

        let search = {
          "_source": false,
          "size": 0,
          "query": {
            "bool": {
              "must": [],
              "filter": [{
                "term": {
                  "summary.contribution._is_latest": "true"
                }
              }]
            }
          },
          aggs : {buckets: {terms: {field: "summary.contribution.id", size:1e6}}}
        };

        if (!_.find(_.map(queries, "terms"), "summary.contribution._private_key")) 
          search.query.bool.filter.push({
            "term": { "summary.contribution._is_activated": "true" }
          });

        if (_.isArray(queries)) search.query.bool.must.push(...queries);
        if (_.isArray(filters)) search.query.bool.filter.push(...filters);

        let resp = await esClient.search({
          "index": index,
          "type": "contribution",
          "body": search
        });
        return resp.aggregations.buckets.buckets.map((id) => id.key);

      } catch(error) {
        console.error("esContributionIDs", index, queries, filters, error.message);
        throw new Meteor.Error("esContributionIDs", error.message);
      }
    },

    async esCreatePrivateContribution({index, contributor, _contributor, name, contribution, summary}) {
      console.log("esCreatePrivateContribution", index, contributor, _contributor, name);
      this.unblock();
      try {
        if (!contributor || contributor === 'undefined')
          throw new Error('Unrecognized contributor.');

        // Get the next contribution ID
        let next_id = await esClient.search({
          "index": index,
          "type": "contribution",
          "body": {
            "size": 1,
            "_source": "summary.contribution.id",
            "query": {
              "exists": {
                "field": "summary.contribution.id"
              }
            },
            "sort": [{
              "summary.contribution.id": "desc"
            }]
          }
        });
        if (isNaN(_.parseInt(next_id.hits.hits[0]._source.summary.contribution.id)))
          throw new Error('Failed to retrieve new contribution ID.');
        next_id = _.parseInt(next_id.hits.hits[0]._source.summary.contribution.id) + 1;

        let timestamp = moment().utc().toISOString();
        let contributionSummary = {
          "id": next_id,
          "version": null,
          "contributor": contributor,
          "timestamp": timestamp,
          "data_model_version": _.last(versions),
          "_contributor": _contributor,
          "_name": name,
          "_is_activated": "false",
          "_is_latest": "true",
          "_private_key": uuid.v4(),
          "_history": [{
            "id": next_id,
            "version": null,
            "contributor": _contributor,
            "timestamp": timestamp,
            "data_model_version": _.last(versions)
          }]
        };

        summary = summary || {};
        summary.contribution = summary.contribution || {};
        summary.contribution = _.merge(summary.contribution, contributionSummary);

        let contributionRow = {
          "contributor": contributor,
          "id": next_id,
          "version": null,
          "timestamp": timestamp,
          "data_model_version": _.last(versions)
        };

        contribution = contribution || {};
        contribution.contribution =
          contribution.contribution &&
          contribution.contribution.length &&
          contribution.contribution.length === 1 &&
          contribution.contribution || [{}];
        contribution.contribution[0] = _.merge(contribution.contribution[0], contributionRow);

        // Create the new contribution and return the new contribution ID
        await esClient.index({
          "index": index,
          "type": "contribution",
          "id": next_id + "_0",
          "body": {
            "summary": summary,
            "contribution": contribution
          },
          "refresh": true
        });

        return next_id;

      } catch(error) {
        console.error("esCreatePrivateContribution", index, contributor, _contributor, name, error.message);
        throw new Meteor.Error("esCreatePrivateContribution", error.message);
      }
    },

    async esUpdatePrivateContribution({index, contributor, _contributor, id, contribution, summary}) {
      console.log("esUpdatePrivateContribution", index, contributor, _contributor, id);
      this.unblock();

      try {
        if (!contributor || contributor === 'undefined')
          throw new Error('Unrecognized contributor.');

        let contributionRow = {
          "contributor": contributor,
          "id": _.parseInt(id),
          "data_model_version": _.last(versions)
        };

        contribution = contribution || {};
        contribution.contribution =
          contribution.contribution &&
          contribution.contribution.length &&
          contribution.contribution.length === 1 &&
          contribution.contribution || [{}];
        contribution.contribution[0] = _.merge(contribution.contribution[0], contributionRow);

        summary = summary || {};
        summary.contribution = summary.contribution || {};
        summary.contribution = _.merge(summary.contribution, contributionRow);
        summary.contribution._is_valid = "false";

        console.log("esUpdatePrivateContribution updating es index", index, contributor, _contributor, id, sizeof(summary), sizeof(contribution));
        if (id == 16798) delete contribution.measurements;
        await esClient.update({
          "index": index,
          "type": "contribution",
          "id": id + "_0",
          "refresh": true,
          "body": {
            "doc": { summary, contribution }
          }
        });
      } catch(error) {
        console.error("esUpdatePrivateContribution", index, contributor, _contributor, id, error.message);
        throw new Meteor.Error("esUpdatePrivateContribution", error.message);
      }
    },

    async esUpdatePrivatePreSummaries({index, contributor, id, contribution, summary}) {
      console.log("esUpdatePrivatePreSummaries", index, contributor, id);
      this.unblock();

      const summarizer = new SummarizeContribution({});

      try {
        if (!contributor || contributor === 'undefined')
          throw new Error('Unrecognized contributor.');

        //if (contribution === undefined || summary === undefined) {
          let contribution = {};
          let summary = {};
          let resp = await esClient.search({
            "index": index,
            "type": "contribution",
            "body": {
              "_source": {
                "includes": ["summary.contribution.*", "contribution.*", "criteria.*"]
              },
              "query": {
                "bool": {
                  "filter": [{
                    "term": {
                      "summary.contribution.id": id
                    }
                  }, {
                    "term": {
                      "summary.contribution.contributor.raw": contributor
                    }
                  }]
                }
              }
            }
          });
          if (resp.hits.total > 0) {
            if (resp.hits.hits[0]._source.contribution && _.isPlainObject(resp.hits.hits[0]._source.contribution.contribution))
              resp.hits.hits[0]._source.contribution.contribution = [resp.hits.hits[0]._source.contribution.contribution];
            contribution = resp.hits.hits[0]._source.contribution;
            summary.contribution = resp.hits.hits[0]._source.summary.contribution;
          }
        //}

        await summarizer.preSummarizePromise(contribution, {summary: { contribution: summary.contribution }});

        await esClient.update({
          "index": index,
          "type": "contribution",
          "id": id + "_0",
          "refresh": true,
          "body": {
            "doc": { summary: summarizer.json.contribution.summary }
          }
        });
        console.log("esUpdatePrivatePreSummaries updated contribution doc", index, contributor, id + "_0");

        let bulkIndex = [], rowIdx = 1;
        _.without(_.keys(summarizer.json), 'contribution').forEach((indexType) => {
          _.keys(summarizer.json[indexType]).forEach((name) => {
            _.keys(summarizer.json[indexType][name]).forEach((parent) => {
              bulkIndex.push(
                { index: { _index: index, _type: indexType, _id: id + '_' + rowIdx } },
                { summarizer: { indexType, name, parent }}
              );
              rowIdx += 1;
            });
          });
        });

        await BPromise.map(_.chunk(bulkIndex, 100), (bulkIndexChunk, i, n) => {
          return new Promise((resolve) => {
            console.log('esUpdatePrivatePreSummaries starting chunk', i+1, 'of', n);
            esClient.bulk({ 
              body: bulkIndexChunk.map(row => {
                if (row && row.summarizer)
                  row = summarizer.json[row.summarizer.indexType][row.summarizer.name][row.summarizer.parent];
                  row.summary = row.summary || {};
                  row.summary.contribution = summarizer.json.contribution.summary.contribution;
                return row;
              }) 
            }, (err, resp) => {
              if (!resp || resp.errors) {
                console.error('esUpdatePrivatePreSummaries errors in chunk', i+1, 'of', n, JSON.stringify(resp));
                resolve(false);
              } else {
                console.log('esUpdatePrivatePreSummaries finished chunk', i+1, 'of', n);
                resolve(true);
              }
            });
          });
        }, { concurrency: 5 }).then((results) => {
          if (!_.every(results, Boolean))
            throw new Meteor.Error("esUpdatePrivatePreSummaries", "Failed to upload private contribution.");
        });

        console.log("esUpdatePrivatePreSummaries finished", index, contributor, id);

      } catch(error) {
        console.error("esUpdatePrivatePreSummaries", index, contributor, id, error.message);
        throw new Meteor.Error("esUpdatePrivatePreSummaries", error.message);
      }
    },

    async esUpdatePrivateSummaries({index, contributor, id, contribution, summary}) {
      console.log("esUpdatePrivateSummaries", index, contributor, id);
      this.unblock();

      const summarizer = new SummarizeContribution({});

      try {
        if (!contributor || contributor === 'undefined')
          throw new Error('Unrecognized contributor.');

        //if (contribution === undefined || summary === undefined) {
          let contribution = {};
          let summary = {};
          let resp = await esClient.search({
            "index": index,
            "type": "contribution",
            "body": {
              "query": {
                "bool": {
                  "filter": [{
                    "term": {
                      "summary.contribution.id": id
                    }
                  }, {
                    "term": {
                      "summary.contribution.contributor.raw": contributor
                    }
                  }]
                }
              }
            }
          });
          if (resp.hits.total > 0) {
            if (resp.hits.hits[0]._source.contribution && _.isPlainObject(resp.hits.hits[0]._source.contribution.contribution))
              resp.hits.hits[0]._source.contribution.contribution = [resp.hits.hits[0]._source.contribution.contribution];
            contribution = resp.hits.hits[0]._source.contribution;
            summary.contribution = resp.hits.hits[0]._source.summary.contribution;
          }
        //}
  
        await summarizer.summarizePromise(contribution, {summary: { contribution: summary.contribution }});
        
        await esClient.update({
          "index": index,
          "type": "contribution",
          "id": id + "_0",
          "refresh": true,
          "body": {
            "doc": { 
              _incomplete_summary: summarizer.json.contribution._incomplete_summary,
              summary: summarizer.json.contribution.summary
            }
          }
        });
        console.log("esUpdatePrivateSummaries updated contribution doc", index, contributor, id + "_0");

        let bulkIndex = [], rowIdx = 1;
        _.without(_.keys(summarizer.json), 'contribution').forEach((indexType) => {
          _.keys(summarizer.json[indexType]).forEach((name) => {
            _.keys(summarizer.json[indexType][name]).forEach((parent) => {
              bulkIndex.push(
                { index: { _index: index, _type: indexType, _id: id + '_' + rowIdx } },
                { summarizer: { indexType, name, parent }}
              );
              rowIdx += 1;
            });
          });
        });

        await BPromise.map(_.chunk(bulkIndex, 100), (bulkIndexChunk, i, n) => {
          return new Promise((resolve) => {
            console.log('esUpdatePrivateSummaries starting chunk', i+1, 'of', n);
            esClient.bulk({ 
              body: bulkIndexChunk.map(row => {
                if (row && row.summarizer)
                  row = summarizer.json[row.summarizer.indexType][row.summarizer.name][row.summarizer.parent];
                  row.summary = row.summary || {};
                  row.summary.contribution = summarizer.json.contribution.summary.contribution;
                return row;
              }) 
            }, (err, resp) => {
              if (!resp || resp.errors) {
                console.error('esUpdatePrivateSummaries errors in chunk', i+1, 'of', n, JSON.stringify(resp));
                resolve(false);
              } else {
                console.log('esUpdatePrivateSummaries finished chunk', i+1, 'of', n);
                resolve(true);
              }
            });
          });
        }, { concurrency: 5 }).then((results) => {
          if (!_.every(results, Boolean))
            throw new Meteor.Error("esUpdatePrivateSummaries", "Failed to upload private contribution.");
        });

        console.log("esUpdatePrivateSummaries finished", index, contributor, id);

      } catch(error) {
        console.error("esUpdatePrivateSummaries", index, contributor, id, error.message);
        throw new Meteor.Error("esUpdatePrivateSummaries", error.message);
      }
    },

    // TODO: pass login token to authenticate changes
    async esGetPrivateContributionSummaries({index, contributor, includeActivated}) {
      console.log("esGetPrivateContributionSummaries", index, contributor);
      this.unblock();
      try {
        if (!contributor || contributor === 'undefined')
          throw new Error('Unrecognized contributor.');

        let resp = await esClient.search({
          "index": index,
          "type": "contribution",
          "body": {
            "size": 100,
            "_source": {
              "excludes": ["*.vals", "*._geo_shape", "summary._all.vadm_sigma.range"],
              "includes": ["summary.contribution.*", "summary._all.*", "summary._incomplete_summary"]
            },
            "query": {
              "bool": {
                "filter": (includeActivated ?
                  [{
                    "term": {
                      "summary.contribution.contributor.raw": contributor
                    }
                  }] : [{
                    "term": {
                      "summary.contribution.contributor.raw": contributor
                    }
                  },{
                    "term": {
                      "summary.contribution._is_activated": "false"
                    }
                  }]
                )
              }
            },
            "sort": [{
              "summary.contribution._is_activated": "asc"
            }, {
              "summary.contribution.id": "desc"
            }]
          }
        });
        return resp.hits.hits.map(hit => hit._source);

      } catch(error) {
        console.error("esGetPrivateContributionSummaries", index, contributor, error.message);
        throw new Meteor.Error("esGetPrivateContributionSummaries", error.message);
      }
    },

    async esGetPrivateContributionSummary({index, id, contributor}) {
      console.log("esGetPrivateContributionSummary", index, id, contributor);
      this.unblock();
      try {
        if (!contributor || contributor === 'undefined')
          throw new Error('Unrecognized contributor.');

        let resp = await esClient.search({
          "index": index,
          "type": "contribution",
          "body": {
            "_source": {
              "excludes": ["*.vals", "*._geo_shape", "summary._all.vadm_sigma.range"],
              "includes": ["summary.contribution.*", "summary._all.*"]
            },
            "query": {
              "bool": {
                "filter": [{
                  "term": {
                    "summary.contribution.id": id
                  }
                }, {
                  "term": {
                    "summary.contribution.contributor.raw": contributor
                  }
                }, {
                  "term": {
                    "summary.contribution._is_activated": "false"
                  }
                }]
              }
            }
          }
        });
        return resp.hits.total > 0 && resp.hits.hits[0]._source;

      } catch(error) {
        console.error("esGetPrivateContributionSummary", index, id, contributor, error.message);
        throw new Meteor.Error("esGetPrivateContributionSummary", error.message);
      }
    },

    async esGetContribution({index, id}) {
      console.log("esGetContribution", index, id);
      this.unblock();
      try {

        let resp = await esClient.search({
          "index": index,
          "type": "contribution",
          "body": {
            "_source": {
              "includes": ["contribution.*"]
            },
            "query": {
              "bool": {
                "filter": [{
                  "term": {
                    "summary.contribution.id": id
                  }
                }]
              }
            }
          }
        });
        if (resp.hits.total > 0 && resp.hits.hits[0]._source.contribution && _.isPlainObject(resp.hits.hits[0]._source.contribution.contribution))
          resp.hits.hits[0]._source.contribution.contribution = [resp.hits.hits[0]._source.contribution.contribution];
        return resp.hits.total > 0 && resp.hits.hits[0]._source.contribution;

      } catch(error) {
        console.error("esGetContribution", index, id, error.message);
        throw new Meteor.Error("esGetContribution", error.message);
      }
    },

    async esUpdateContributionName({index, id, name}) {
      console.log("esUpdateContributionName", index, id, name);
      this.unblock();

      try {
        await esClient.update({
          "index": index,
          "type": "contribution",
          "id": id + "_0",
          "refresh": true,
          "body": {
            "doc": {
              "summary": {
                "contribution": {
                  "_name": name
                }
              }
            }
          }
        });
      } catch(error) {
        console.error("esUpdateContributionName", index, id, name, error.message);
        throw new Meteor.Error("esUpdateContributionName", error.message);
      }
    },

    async esUpdateContributionDescription({index, id, description}) {
      console.log("esUpdateContributionDescription", index, id, description);
      this.unblock();

      try {
        let resp = await esClient.search({
          "index": index,
          "type": "contribution",
          "body": {
            "_source": {
              "includes": ["summary.contribution._history"]
            },
            "query": {
              "bool": {
                "filter": [{
                  "term": {
                    "summary.contribution.id": id
                  }
                }]
              }
            }
          }
        });
        if (resp.hits.total > 0) {
          let _history = resp.hits.hits[0]._source.summary.contribution._history;
          _history[0].description = description;
          resp = await esClient.updateByQuery({
            "index": index,
            "refresh": true,
            "body": {
              "script": {
                "source": "ctx._source.summary.contribution._history = params._history",
                "params": {_history}
              },
              "query": {
                "term": {
                  "summary.contribution.id": id
                }
              }
            }
          });
        }
      } catch(error) {
        console.error("esUpdateContributionDescription", index, id, description, error.message);
      }

      try {
        await esClient.update({
          "index": index,
          "type": "contribution",
          "id": id + "_0",
          "refresh": true,
          "body": {
            "script": {
              "source": `
                ctx._source.summary.contribution.description = params.description; 
                ctx._source.contribution.contribution[0].description = params.description;
              `,
              "params": {description}
            }
          }
        });
      } catch(error) {
        console.error("esUpdateContributionDescription", index, id, description, error.message);
        throw new Meteor.Error("esUpdateContributionDescription", error.message);
      }
    },

    async esUpdateContributionLabNames({index, id, lab_names}) {
      console.log("esUpdateContributionLabNames", index, id, lab_names);
      this.unblock();
      
      try {
        await esClient.update({
          "index": index,
          "type": "contribution",
          "id": id + "_0",
          "refresh": true,
          "body": {
            "script": {
              "source": `
                ctx._source.summary.contribution.lab_names = params.lab_names; 
                ctx._source.contribution.contribution[0].lab_names = params.lab_names;
              `,
              "params": {lab_names}
            }
          }
        });
      } catch(error) {
        console.error("esUpdateContributionLabNames", index, id, lab_names, error.message);
        throw new Meteor.Error("esUpdateContributionLabNames", error.message);
      }
    },

    // TODO: pass login token to authenticate changes
    async esUpdateContributionReference({index, id, contributor, _contributor, timestamp, reference, description}) {
      console.log("esUpdateContributionReference", index, id, contributor, _contributor, timestamp, reference, description);
      this.unblock();

      timestamp = timestamp || moment().utc().toISOString();
      let doi = _.toUpper(_.trim(reference));
      let _reference = {};

      try {
        _reference = Meteor.call("getReferenceMetadata", doi);
      } catch(error) {
        console.error("esUpdateContributionReference", index, id, contributor, _contributor, reference, description, error.message);
      }

      let _history = [{
        "id": _.parseInt(id),
        "version": null,
        "contributor": _contributor,
        "timestamp": timestamp || moment().utc().toISOString(),
        "data_model_version": _.last(versions),
        "description": description
      }];

      try {
        if (!contributor || contributor === 'undefined')
          throw new Error('Unrecognized contributor.');
          
        let resp = await esClient.search({
          "index": index,
          "type": "contribution",
          "body": {
            "_source": {
              "includes": ["summary.contribution._history"]
            },
            "query": {
              "bool": {
                "filter": [{
                  "term": {
                    "summary.contribution.reference.raw": doi
                  }
                }, {
                  "term": {
                    "summary.contribution._is_activated": "true"
                  }
                }, {
                  "term": {
                    "summary.contribution._is_latest": "true"
                  }
                }]
              }
            }
          }
        });
        if (resp.hits.total > 0) {
          _history[0].version = parseInt(resp.hits.hits[0]._source.summary.contribution._history[0].version) + 1;
          _history.push(...resp.hits.hits[0]._source.summary.contribution._history);
        } else {
          _history[0].version = 1;
        }
      } catch(error) {
        _history[0].version = 1;
        console.error("esUpdateContributionReference", index, id, contributor, _contributor, reference, description, error.message);
      }
      let version = _history[0].version;

      try {
        if (!contributor || contributor === 'undefined')
          throw new Error('Unrecognized contributor.');
          
        await esClient.update({
          "index": index,
          "type": "contribution",
          "id": id + "_0",
          "refresh": true,
          "body": {
            "script": {
              "source": `
                ctx._source.summary.contribution.version = null; 
                ctx._source.summary.contribution._reference = null; 
                ctx._source.summary.contribution._history = null;
              `
            }
          }
        });
        // TODO: change this to an update by script and only update the reference info:
        await esClient.update({
          "index": index,
          "type": "contribution",
          "id": id + "_0",
          "refresh": true,
          "body": {
            "doc": {
              "summary": {
                "contribution": {
                  "version": version,
                  "contributor": contributor,
                  "timestamp": timestamp,
                  "data_model_version": _.last(versions),
                  "description": description,
                  "reference": doi,
                  "_reference": _reference,
                  "_history": _history
                }
              },
              "contribution": {
                "contribution": [{
                  "id": _.parseInt(id),
                  "version": version,
                  "contributor": contributor,
                  "timestamp": timestamp,
                  "data_model_version": _.last(versions),
                  "description": description,
                  "reference": doi
                }]
              }
            }
          }
        });
      } catch(error) {
        console.error("esUpdateContributionReference", index, id, contributor, _contributor, reference, description, error.message);
        throw new Meteor.Error("esUpdateContributionReference", error.message);
      }
    },

    async esValidatePrivateContribution({index, id, contributor}) {
      console.log("esValidatePrivateContribution", index, id, contributor);
      this.unblock();
      try {

        const validator = new ValidateContribution({});

        let resp = await esClient.search({
          "index": index,
          "type": "contribution",
          "body": {
            "_source": {
              "includes": ["contribution.*"]
            },
            "query": {
              "bool": {
                "filter": [{
                  "term": {
                    "summary.contribution.id": id
                  }
                }]
              }
            }
          }
        });
        if (resp.hits.total > 0 && resp.hits.hits[0]._source.contribution && _.isPlainObject(resp.hits.hits[0]._source.contribution.contribution))
          resp.hits.hits[0]._source.contribution.contribution = [resp.hits.hits[0]._source.contribution.contribution];
              
        await validator.validatePromise(resp.hits.hits[0]._source.contribution);

        await esClient.update({
          "index": index,
          "type": "contribution",
          "id": id + "_0",
          "refresh": true,
          "body": {
            "doc": {
              "summary": {
                "contribution": {
                  "_is_valid": _.keys(validator.validation.errors).length ? "false" : "true"
                }
              }
            }
          }
        });

        return validator.validation;

      } catch(error) {
        console.error("esValidatePrivateContribution", index, id, contributor, error.message);
        throw new Meteor.Error("esValidatePrivateContribution", error.message);
      }
    },

    async esDeletePrivateContribution({index, id, contributor}) {
      console.log("esDeletePrivateContribution", index, id, contributor);
      this.unblock();
      try {
        if (!contributor || contributor === 'undefined')
          throw new Error('Unrecognized contributor.');
          
        let resp = await esClient.deleteByQuery({
          "index": index,
          "refresh": true,
          "body": {
            "query": {
              "term": {
                "summary.contribution.id": id
              }
            }
          }
        });
        return true;
      } catch(error) {
        console.error("esDeletePrivateContribution", index, id, contributor, error.message);
        throw new Meteor.Error("esDeletePrivateContribution", error.message);
      }
    },

    async esActivateContribution({index, id}) {
      console.log("esActivateContribution", index, id);
      this.unblock();

      let prev_id;
      let contributionSummary;
      try {
        let resp = await esClient.search({
          "index": index,
          "type": "contribution",
          "body": {
            "_source": {
              "includes": ["summary.contribution"]
            },
            "query": {
              "bool": {
                "filter": [{
                  "term": {
                    "summary.contribution.id": id
                  }
                }]
              }
            }
          }
        });
        if (resp.hits.total > 0 && resp.hits.hits[0]._source.summary)
          contributionSummary = resp.hits.hits[0]._source.summary.contribution;
        if (resp.hits.total > 0 && resp.hits.hits[0]._source.summary.contribution._history.length > 1) {
          prev_id = resp.hits.hits[0]._source.summary.contribution._history[1].id;
          await esClient.updateByQuery({
            "index": index,
            "refresh": true,
            "body": {
              "script": {
                "source": "ctx._source.summary.contribution._is_latest = \"false\""
              },
              "query": {
                "term": {
                  "summary.contribution.id": prev_id
                }
              }
            }
          });
        }
      } catch(error) {
        console.error("esActivateContribution", index, id, error.message);
      }

      try {
        contributionSummary._is_activated = "true";
        contributionSummary.timestamp = moment().utc().toISOString();
        resp = await esClient.updateByQuery({
          "index": index,
          "refresh": true,
          "body": {
            "script": {
              "source": "ctx._source.summary.contribution = params.contributionSummary",
              "params": {contributionSummary}
            },
            "query": {
              "term": {
                "summary.contribution.id": id
              }
            }
          }
        });
        console.log("esActivateContribution activated ", resp.updated, "of", resp.total);
      } catch(error) {
        console.error("esActivateContribution", index, id, error.message);
        throw new Meteor.Error("esActivateContribution", error.message);
      }

      Meteor.call("esUploadActivatedContributionToS3", {index, id});
    },

    async esUploadActivatedContributionToS3({index, id}) {
      console.log("esUploadActivatedContributionToS3", index, id);
      this.unblock();

      try {
        let resp = await esClient.search({
          "index": index,
          "type": "contribution",
          "body": {
            "_source": {
              "includes": ["contribution", "summary.contribution._is_latest", "summary.contribution._history"]
            },
            "query": {
              "bool": {
                "filter": [{
                  "term": {
                    "summary.contribution.id": id
                  }
                }]
              }
            }
          }
        });
        const contribution = resp.hits.hits[0]._source.contribution;
        const history = resp.hits.hits[0]._source.summary.contribution._history;
        const isLatest = resp.hits.hits[0]._source.summary.contribution._is_latest;
        const exporter = new ExportContribution({});
        const contributionText = exporter.toText(contribution);
        //console.log("esUploadActivatedContributionToS3", id, isLatest, contribution, contributionText);
        if (isLatest === 'true') {
          history.slice(1).forEach(v => {
            try {
              s3DeleteKeys({
                bucket: 'magic-contributions',
                keys: [`${v.id}/magic_contribution_${v.id}.txt`]
              }).then(() => {
                console.log("esUploadActivatedContributionToS3", `Deleted ${v.id}/magic_contribution_${v.id}.txt`);
                s3DeleteKeys({
                  bucket: 'magic-contributions',
                  keys: [`${v.id}/`]
                }).then(() => {
                  console.log("esUploadActivatedContributionToS3", `Deleted ${v.id}/`);
                });
              });
            } catch (e) {
              console.log("esUploadActivatedContributionToS3", `Error deleting ${v.id}`, e);
            }
          });
          try {
            s3UploadObject({
                bucket: 'magic-contributions',
                key: `${id}/magic_contribution_${id}.txt`,
                body: contributionText
            }).then(() => {
              console.log("esUploadActivatedContributionToS3", `Uploaded ${id}/magic_contribution_${id}.txt to magic-contributions`);
            });
          } catch (e) {
            console.log("esUploadActivatedContributionToS3", `Error uploading latest ${v.id}`, e);
          }
        }
        try {
          s3UploadObject({
            bucket: 'magic-activated-contributions',
            key: `${id}/magic_contribution_${id}.txt`,
            body: contributionText
          }).then(() => {
            console.log("esUploadActivatedContributionToS3", `Uploaded ${id}/magic_contribution_${id}.txt to magic-activated-contributions`);
          });
        } catch (e) {
          console.log("esUploadActivatedContributionToS3", `Error uploading ${v.id}`, e);
        }
      } catch(error) {
        console.error("esUploadActivatedContributionToS3", index, id, error);
        throw new Meteor.Error("esUploadActivatedContributionToS3", error.message);
      }
      
      console.error("esUploadActivatedContributionToS3 finished", id);
    },

    async esDeactivateContribution({index, id}) {
      console.log("esDeactivateContribution", index, id);
      this.unblock();

      let prev_id;
      try {
        let resp = await esClient.search({
          "index": index,
          "type": "contribution",
          "body": {
            "_source": {
              "includes": ["summary.contribution._history"]
            },
            "query": {
              "bool": {
                "filter": [{
                  "term": {
                    "summary.contribution.id": id
                  }
                }]
              }
            }
          }
        });
        if (resp.hits.total > 0 && resp.hits.hits[0]._source.summary.contribution._history.length > 1) {
          prev_id = resp.hits.hits[0]._source.summary.contribution._history[1].id;
          await esClient.updateByQuery({
            "index": index,
            "refresh": true,
            "body": {
              "script": {
                "source": "ctx._source.summary.contribution._is_latest = \"true\""
              },
              "query": {
                "term": {
                  "summary.contribution.id": prev_id
                }
              }
            }
          });
        }
      } catch(error) {
        console.error("esDeactivateContribution", index, id, error.message);
      }

      try {
        await esClient.updateByQuery({
          "index": index,
          "refresh": true,
          "body": {
            "script": {
              "source": "ctx._source.summary.contribution._is_activated = \"false\""
            },
            "query": {
              "term": {
                "summary.contribution.id": id
              }
            }
          }
        });
      } catch(error) {
        console.error("esDeactivateContribution", index, id, error.message);
        throw new Meteor.Error("esDeactivateContribution", error.message);
      }
      return true;
    },

    async esPasswordLogIn({email, password}) {
      console.log("esPasswordLogIn", email);
      this.unblock();

      let resp;
      try {
        resp = await esClient.search({
          "index": erUsersIndex,
          "body": {
            "query": { "term": { "email.address.raw": email.toLowerCase() }}
          }
        });
        if (resp.hits.total === 0) {
          throw new Meteor.Error("Email", "Unrecognized email address.");
        }
        let user;
        resp.hits.hits.forEach(hit => {
          if (!user && password && hit._source._password &&
            bcrypt.compareSync(password, hit._source._password)
          ) {
            user = hit._source;
            user = __.omitDeep(user, /(^|\.)_/);
            user.has_password = true;
          }
        });
        if (user) return user;
        else throw new Meteor.Error("Password", "Incorrect password.");
      } catch(error) {
        console.error("esPasswordLogIn", email, error.message);
        if (error.error === "Email" || error.error === "Password")
          throw new Meteor.Error(error.error, error.reason);
        else
          throw new Meteor.Error("LogIn", "Logging in failed. Please try again.");
      }
    },

    async esGetUserByID({id, session}) {
      console.log("esGetUserByID", id);
      this.unblock();
      try {
        let resp = await esClient.search({
          "index": erUsersIndex,
          "size": 1,
          "body": {
            "query": { "term": { "id": id }}
          }
        });
        let user = resp.hits.total > 0 ? resp.hits.hits[0]._source : undefined;
        user = __.omitDeep(user, /(^|\.)_/);
        user.handle = (user && user.handle) || `user${user.id}`;
        if (user && session && session.id) {
          session.last_active = moment().utc().format('YYYY-MM-DD[T]HH:mm:ss.SS[Z]');
          user.session = user.session || [];
          user.session = user.session.filter ? user.session : [user.session]; 
          let thisSession = user.session.filter(x => x.id === session.id);
          if (thisSession.length) user.session = user.session.forEach(x => (x.id === session.id ? session : x));
          else user.session.push(session);
          await esClient.update({
            "index": erUsersIndex,
            "type": "_doc",
            "id": user.id,
            "refresh": true,
            "body": { doc: { session }}
          });
        }
        return user;
      } catch(error) {
        console.error("esGetUserByID", id, error.message);
        throw new Meteor.Error("User ID", `Unrecognized user ID ${id}.`);
      }
    },

    async esGetUserByORCID({orcid}) {
      console.log("esGetUserByORCID", orcid);
      this.unblock();
      try {
        let resp = await esClient.search({
          "index": erUsersIndex,
          "size": 1,
          "body": {
            "query": { "term": { "orcid.id.raw": orcid }}
          }
        });
        if (resp.hits.total === 0) return undefined;
        const user = __.omitDeep(resp.hits.hits[0]._source, /(^|\.)_/);
        user.handle = user.handle || `user${user.id}`;
        return user;
      } catch(error) {
        console.error("esGetUserByORCID", orcid, error.message);
        throw new Meteor.Error("ORCID iD", `Unrecognized ORCID iD ${orcid}.`);
      }
    },

    async esGetUsersByEmail({email}) {
      console.log("esGetUsersByEmail", email);
      this.unblock();
      try {
        let resp = await esClient.search({
          "index": erUsersIndex,
          "body": {
            "query": { "term": { "email.address.raw": email.toLowerCase() }},
            "sort": { "id": "desc" }
          }
        });
        if (resp.hits.total === 0) return undefined;
        const users = resp.hits.hits.map(hit => {
          const user = __.omitDeep(hit._source, /(^|\.)_/);
          user.handle = user.handle || `user${user.id}`;
          return user;
        });
        return users;
      } catch(error) {
        console.error("esGetUserByEmail", email, error.message);
        throw new Meteor.Error("Email", `Unrecognized email address ${email}.`);
      }
    },

    async esGetUserByHandle({handle}) {
      console.log("esGetUserByHandle", handle);
      this.unblock();
      try {
        let resp = await esClient.search({
          "index": erUsersIndex,
          "body": {
            "query": { "term": { "handle.raw": handle.toLowerCase() }},
            "sort": { "id": "desc" }
          }
        });
        let user = resp.hits.total > 0 ? resp.hits.hits[0]._source : undefined;
        user = __.omitDeep(user, /(^|\.)_/);
        user.handle = user.handle || `user${user.id}`;
        return user;
      } catch(error) {
        console.error("esGetUserByHandle", handle, error.message);
        throw new Meteor.Error("Handle", `Unrecognized handle ${handle}.`);
      }
    },

    async esNextAvailableHandleFromEmail({email}) {
      console.log("esNextAvailableHandleFromEmail", email);
      this.unblock();
      let handle = email.match(/^([^@]*)@/)[1];
      let resp;
      try {
        resp = await esClient.search({
          "index": erUsersIndex,
          "_source": false,
          "size": 1,
          "body": {
            "query": { "term": { "handle.raw": handle.toLowerCase() }},
            "sort": { "id": "desc" }
          }
        });
        if (resp.hits.total === 0)
          return handle;
        for (x of [...Array(1000).keys()]) {
          resp = await esClient.search({
            "index": erUsersIndex,
            "_source": false,
            "size": 1,
            "body": {
              "query": { "term": { "handle.raw": handle.toLowerCase() + (x+1) }},
              "sort": { "id": "desc" }
            }
          });
          if (resp.hits.total === 0)
            return handle + (x+1);
        }
      } catch(error) {
        console.error("esNextAvailableHandleFromEmail", email, error.message);
        throw new Meteor.Error("esNextAvailableHandleFromEmail", `Failed to find the next available handle for ${email}.`);
      }
    },

    async esNextAvailableUserID() {
      console.log("esNextAvailableUserID");
      this.unblock();
      try {
        let resp = await esClient.search({
          "index": erUsersIndex,
          "_source": false,
          "size": 1,
          "body": {
            "query": {
              "match_all": {}
            },
            "sort": { "id": "desc" }
          }
        });
        return parseInt(resp.hits.hits[0]._id) + 1;
      } catch(error) {
        console.error("esNextAvailableUserID", error.message);
        throw new Meteor.Error("esNextAvailableUserID", "Failed to calculate the next available user ID.");
      }
    },

    async esCreateUserFromORCID({name, email, orcid}) {
      this.unblock();
      console.log("esCreateUserFromORCID", name, email, orcid);
      if (email && email.address) email.address = email.address.toLowerCase();
      try {
        let handle;
        if (email && email.address) handle = await Meteor.call('esNextAvailableHandleFromEmail', {email: email.address});
        let user = { name, email, orcid, handle,
          id: await Meteor.call('esNextAvailableUserID'),
          has_password: false
        };
        console.log("esCreateUserFromORCID", name, email, orcid, user);
        await esClient.index({
          "index": erUsersIndex,
          "type": "_doc",
          "id": user.id,
          "body": user,
          "refresh": true
        });
        return user;
      } catch(error) {
        console.error("esCreateUserFromORCID", name, email, orcid, error.message);
        throw new Meteor.Error("esCreateUserFromORCID", "Failed to create a new user record.");
      }  
    },

    async esUpdateUserORCID({id, name, email, orcid}) {
      this.unblock();
      console.log("esUpdateUserORCID", id, name, email, orcid);
      if (email && email.address) email.address = email.address.toLowerCase();
      try {
        await esClient.update({
          "index": erUsersIndex,
          "type": "_doc",
          "id": id,
          "refresh": true,
          "body": { doc: { name, email, orcid }}
        });
      } catch(error) {
        console.error("esUpdateUserORCID", id, name, email, orcid, error.message);
        throw new Meteor.Error("esUpdateUserORCID", "Failed to update user ORCID data.");
      }  
    },

    async esDisconnectUserORCID({id}) {
      this.unblock();
      console.log("esDisconnectUserORCID", id);
      try {
        await esClient.update({
          "index": erUsersIndex,
          "type": "_doc",
          "id": id,
          "refresh": true,
          "body": { doc: { orcid: { id: '', token: '' }}}
        });
      } catch(error) {
        console.error("esDisconnectUserORCID", id, error.message);
        throw new Meteor.Error("esDisconnectUserORCID", "Failed to disconnect user from ORCID.");
      }  
    },

    async esUpdateUser({ id, name, email, handle, password}) {
      this.unblock();
      if (email && email.address) email.address = email.address.toLowerCase();
      if (handle) handle = handle.toLowerCase();
      let passHash = password && bcrypt.hashSync(password, saltRounds);
      console.log("esUpdateUser", id, name, handle, passHash);
      let doc = { name, handle, email };
      if (passHash) {
        doc._password = passHash;
        doc.has_password = true;
      }
      try {
        await esClient.update({
          "index": erUsersIndex,
          "type": "_doc",
          "id": id,
          "refresh": true,
          "body": { doc }
        });
        return await Meteor.call('esGetUserByID', { id });
      } catch(error) {
        console.error("esUpdateUser", id, name, handle, passHash, error.message);
        throw new Meteor.Error("esUpdateUser", "Failed to update user data.");
      }  
    }

  });

};