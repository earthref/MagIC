import {Meteor} from 'meteor/meteor';

import _ from "lodash";
import moment from "moment";
import Promise from "bluebird";
import elasticsearch from "elasticsearch";

import SummarizeContribution from '/lib/modules/magic/summarize_contribution.js';
import {versions} from '/lib/configs/magic/data_models';
import {levels} from '/lib/configs/magic/search_levels.js';

const esClient = new elasticsearch.Client({
  //log: "trace",
  "host": Meteor.settings.elasticsearch && Meteor.settings.elasticsearch.url || ""
});

export default function () {

  Meteor.methods({

    async esBuckets({index, type, queries, filters, aggs}) {
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
              }, {
                "term": {
                  "summary.contribution._is_activated": "true"
                }
              }]
            }
          },
          aggs : aggs
        };


        if (_.isArray(queries)) search.query.bool.must.push(...queries);

        let unfilteredResp = await esClient.search({
          "index": index,
          "type": type,
          "body": search
        });

        if (_.isArray(filters)) search.query.bool.filter.push(...filters);

        let filteredResp = await esClient.search({
          "index": index,
          "type": type,
          "body": search
        });

        return _.reverse(_.sortBy(unfilteredResp.aggregations.buckets.buckets.map(filter => {
          let filtered = _.find(filteredResp.aggregations.buckets.buckets, {key: filter.key});
          filter.filtered_doc_count = filtered ? filtered.doc_count : 0;
          return filter;
        }), ["filtered_doc_count", "doc_count"]));

      } catch(error) {
        console.error("esBuckets", index, type, queries, filters, error.message);
        throw new Meteor.Error("esBuckets", error.message);
      }
    },

    async esCount({index, type, queries, filters, countField}) {
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
              }, {
                "term": {
                  "summary.contribution._is_activated": "true"
                }
              }]
            }
          }
        };

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
      console.log("esPage", pageNumber, index, type, queries, filters, sort);
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
              }, {
                "term": {
                  "summary.contribution._is_activated": "true"
                }
              }]
            }
          },
          "sort": sort
        };

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
              }, {
                "term": {
                  "summary.contribution._is_activated": "true"
                }
              }]
            }
          },
          aggs : {buckets: {terms: {field: "summary.contribution.id", size:1e6}}}
        };

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
              "match_all": {}
            },
            "sort": [{
              "summary.contribution.id": "desc"
            }]
          }
        });
        if (!_.isNumber(next_id.hits.hits[0]._source.summary.contribution.id))
          throw 'Failed to retrieve new contribution ID.';
        next_id = next_id.hits.hits[0]._source.summary.contribution.id + 1;

        let body = {
          "summary": {
            "contribution": {
              "id": next_id,
              "version": null,
              "contributor": contributor,
              "timestamp": moment().utc().toISOString(),
              "data_model_version": _.last(versions),
              "_contributor": _contributor,
              "_name": name,
              "_is_activated": "false",
              "_is_latest": "true",
              "_history": [{
                "id": next_id,
                "version": null,
                "contributor": _contributor,
                "timestamp": moment().utc().toISOString(),
                "data_model_version": _.last(versions)
              }]
            }
          },
          "contribution": {}
        };

        if (contribution) {
          if (summary && summary.contribution) {
            body = _.merge(summary.contribution, body);
          } else {
            const summarizer = new SummarizeContribution({});
            await summarizer.summarizePromise(contribution, body);
            body = summarizer.json.contribution;
          }
          body.contribution = contribution;
        }

        body.contribution.contribution = [{
          "id": next_id,
          "version": null,
          "contributor": contributor,
          "timestamp": moment().utc().toISOString(),
          "data_model_version": _.last(versions)
        }];

        // Create the new contribution and return the new contribution ID
        await esClient.index({
          "index": index,
          "type": "contribution",
          "id": next_id + "_0",
          "body": body,
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

        contribution = contribution || {};
        contribution.contribution =
          contribution.contribution &&
          contribution.contribution.length &&
          contribution.contribution.length === 1 &&
          contribution.contribution || [{
          "id": id,
          "version": null
        }];
        contribution.contribution[0] = _.merge(contribution.contribution[0], {
          "contributor": contributor,
          "timestamp": moment().utc().toISOString(),
          "data_model_version": _.last(versions)
        });

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
        if (_.isPlainObject(resp.hits.hits[0]._source.contribution.contribution))
          resp.hits.hits[0]._source.contribution.contribution = [resp.hits.hits[0]._source.contribution.contribution];
        contribution = resp.hits.hits[0]._source.contribution;
        summary.contribution = resp.hits.hits[0]._source.summary.contribution;

        await summarizer.summarizePromise(contribution, {summary: summary});

        let bulkIndex = [], rowIdx = 1;
        _.without(_.keys(summarizer.json), 'contribution').forEach((indexType) => {
          _.keys(summarizer.json[indexType]).forEach((name) => {
            _.keys(summarizer.json[indexType][name]).forEach((parent) => {
              bulkIndex.push(
                { index: { _index: index, _type: indexType, _id: id + '_' + rowIdx } },
                summarizer.json[indexType][name][parent]
              );
              rowIdx += 1;
            });
          });
        });
        await Promise.map(_.chunk(bulkIndex, 2*100), (bulkIndexChunk, i, n) => {
          return new Promise((resolve) => {
            console.log('starting chunk', i+1, 'of', n);
            esClient.bulk({ body: bulkIndexChunk }, (err, resp) => {
              if (resp.errors) {
                console.error('errors in chunk', i+1, 'of', n, JSON.stringify(resp));
                resolve(false);
              } else {
                console.log('finished chunk', i+1, 'of', n);
                resolve(true);
              }
            });
          });
        }, { concurrency: 3 }).then((results) => {
          if (!_.every(results, Boolean))
            throw new Meteor.Error("esUpdatePrivateSummaries", "Failed to upload private contribution.");
        });

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
            "_source": {
              "excludes": ["*.vals", "*._geo_shape"],
              "includes": ["summary.contribution.*", "summary._all.*"]
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
        return resp.hits.hits[0]._source;

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
        if (_.isPlainObject(resp.hits.hits[0]._source.contribution.contribution))
          resp.hits.hits[0]._source.contribution.contribution = [resp.hits.hits[0]._source.contribution.contribution];
        return resp.hits.hits[0]._source.contribution;

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
    async esUpdateContributionReference({index, id, contributor, _contributor, reference, description}) {
      console.log("esUpdateContributionReference", index, id, contributor, _contributor, reference, description);
      this.unblock();

      let doi = _.toUpper(_.trim(reference));
      let _reference = null;
      let _history = [{
        "id": id,
        "version": null,
        "contributor": _contributor,
        "timestamp": moment().utc().toISOString(),
        "data_model_version": _.last(versions),
        "description": description
      }];
      let version = null;

      try {
        _reference = Meteor.call("getReferenceMetadata", doi);
      } catch(error) {
        console.error("esUpdateContributionReference", index, id, contributor, _contributor, reference, description, error.message);
      }

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
          version = parseInt(resp.hits.hits[0]._source.summary.contribution._history[0].version) + 1;
          _history[0].version = version;
          _history.push(...resp.hits.hits[0]._source.summary.contribution._history);
        } else {
          version = 1;
          _history[0].version = version;
        }
      } catch(error) {
        version = 1;
        _history[0].version = version;
        console.error("esUpdateContributionReference", index, id, contributor, _contributor, reference, description, error.message);
      }

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
                  "timestamp": moment().utc().toISOString(),
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
                  "timestamp": moment().utc().toISOString(),
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
        await esClient.updateByQuery({
          "index": index,
          "refresh": true,
          "body": {
            "script": {
              "inline": "ctx._source.summary.contribution._is_activated = \"true\""
            },
            "query": {
              "term": {
                "summary.contribution.id": id
              }
            }
          }
        });
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