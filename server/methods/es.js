import {Promise as BPromise} from 'bluebird';

import {Meteor} from 'meteor/meteor';
import {Promise} from 'meteor/promise';

import _ from "lodash";
import uuid from "uuid";
import moment from "moment";
import elasticsearch from "elasticsearch";

import SummarizeContribution from '/lib/modules/magic/summarize_contribution.js';
import ValidateContribution from '/lib/modules/magic/validate_contribution.js';
import {versions} from '/lib/configs/magic/data_models';
import {levels} from '/lib/configs/magic/search_levels.js';

const esClient = new elasticsearch.Client({
  //log: "trace",
  host: Meteor.settings.elasticsearch && Meteor.settings.elasticsearch.url || "",
  keepAlive: false,
  requestTimeout: 60 * 60 * 1000 // 1 hour
});

export default function () {

  Meteor.methods({

    async esBuckets({index, type, queries, aggs}) {
      console.log("esBuckets", index, type, queries, aggs);
      this.unblock();
      try {

        let search = {
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
        console.error("esBuckets", index, type, queries, filters, error.message);
        throw new Meteor.Error("esBuckets", error.message);
      }
    },

    async esCount({index, type, queries, filters, countField}) {
      console.log("esCount", index, type, queries, filters, countField);
      this.unblock();
      try {

        let search = {
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

        let resp = await esClient.search({
          "index": index,
          "type": type,
          "body": search
        });
        return (_.trim(countField) !== "" ? resp.aggregations.count.value : resp.hits.total);

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

        let resp = await esClient.search({
          "index": index,
          "type": type,
          "body": search
        });
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

        await esClient.update({
          "index": index,
          "type": "contribution",
          "id": id + "_0",
          "refresh": true,
          "body": {
            "doc": {
              "summary": summary,
              "contribution": contribution
            }
          }
        });
      } catch(error) {
        console.error("esUpdatePrivateContribution", index, contributor, _contributor, id, error.message);
        throw new Meteor.Error("esUpdatePrivateContribution", error.message);
      }
    },

    async esUpdatePrivatePreSummaries({index, contributor, id}) {
      console.log("esUpdatePrivatePreSummaries", index, contributor, id);
      this.unblock();

      const summarizer = new SummarizeContribution({});

      let contribution = {};
      let summary = {};
      try {
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
                }, {
                  "term": {
                    "summary.contribution._is_activated": "false"
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

        await summarizer.preSummarizePromise(contribution, {summary: summary});

        console.log("esUpdatePrivatePreSummaries updating contribution doc", index, contributor, id + "_0");
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

    async esUpdatePrivateSummaries({index, contributor, id}) {
      console.log("esUpdatePrivateSummaries", index, contributor, id);
      this.unblock();

      const summarizer = new SummarizeContribution({});

      let contribution = {};
      let summary = {};
      try {
        let resp = await esClient.search({
          "index": index,
          "type": "contribution",
          "body": {
            "_source": {
              "includes": ["summary.contribution.*", "contribution.*"]
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
        if (resp.hits.total > 0) {
          if (resp.hits.hits[0]._source.contribution && _.isPlainObject(resp.hits.hits[0]._source.contribution.contribution))
            resp.hits.hits[0]._source.contribution.contribution = [resp.hits.hits[0]._source.contribution.contribution];
          contribution = resp.hits.hits[0]._source.contribution;
          summary.contribution = resp.hits.hits[0]._source.summary.contribution;
        }

        await summarizer.summarizePromise(contribution, {summary: summary});

        console.log("esUpdatePrivateSummaries updating contribution doc", index, contributor, id + "_0");
        await esClient.update({
          "index": index,
          "type": "contribution",
          "id": id + "_0",
          "refresh": true,
          "body": {
            "doc": { summary: summarizer.json.contribution.summary }
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

        let resp = await esClient.search({
          "index": index,
          "type": "contribution",
          "body": {
            "size": 100,
            "_source": {
              "excludes": ["*.vals", "*._geo_shape"],
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

        let resp = await esClient.search({
          "index": index,
          "type": "contribution",
          "body": {
            "_source": {
              "excludes": ["*.vals", "*._geo_shape"],
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
          await esClient.update({
            "index": index,
            "type": "contribution",
            "id": id + "_0",
            "refresh": true,
            "body": {
              "doc": {
                "summary": {
                  "contribution": {
                    "_history": _history
                  }
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
            "doc": {
              "summary": {
                "contribution": {
                  "description": description
                }
              },
              "contribution": {
                "contribution": {
                  "description": description
                }
              }
            }
          }
        });
      } catch(error) {
        console.error("esUpdateContributionDescription", index, id, description, error.message);
        throw new Meteor.Error("esUpdateContributionDescription", error.message);
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
        await esClient.update({
          "index": index,
          "type": "contribution",
          "id": id + "_0",
          "refresh": true,
          "body": {
            "script": {
              "inline": `
                ctx._source.summary.contribution.version = null; 
                ctx._source.summary.contribution._reference = null; 
                ctx._source.summary.contribution._history = null;
              `
            }
          }
        });
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

        return validator.errorsAndWarnings();

      } catch(error) {
        console.error("esValidatePrivateContribution", index, id, contributor, error.message);
        throw new Meteor.Error("esValidatePrivateContribution", error.message);
      }
    },

    async esDeletePrivateContribution({index, id, contributor}) {
      console.log("esDeletePrivateContribution", index, id, contributor);
      this.unblock();
      try {
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
                "inline": "ctx._source.summary.contribution._is_latest = \"false\""
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
        resp = await esClient.updateByQuery({
          "index": index,
          "refresh": true,
          "body": {
            "script": {
              "inline": "ctx._source.summary.contribution = params.contributionSummary",
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
                "inline": "ctx._source.summary.contribution._is_latest = \"true\""
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
              "inline": "ctx._source.summary.contribution._is_activated = \"false\""
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
    }

  });

};