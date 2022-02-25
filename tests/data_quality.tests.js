import elasticsearch from "elasticsearch";
import uuid from "uuid";
import Promise from "bluebird";

const esClient = new elasticsearch.Client({
  //log: "trace",
  host: "http://128.193.70.68:9200",
  keepAlive: false,
  requestTimeout: 60 * 60 * 1000 // 1 hour
});

let index = "magic_v4";

describe("magic.data_quality", () => {

  xit("contributions should include contribution ID", function (done) { setTimeout(() => {
    this.timeout(0);

    esClient.search({
      index: index, type: "contribution", size: 1e4,
      _source: "summary.contribution.id, contribution.contribution",
      body: {
        "query": { "match_all": {}}
      }
    }).then((resp) => {
      //resp.hits.hits.forEach(hit => console.log(hit._id, hit._source.contribution));
      const hitsWithoutCIDs = _.filter(resp.hits.hits, hit => { 
        return !hit._source.contribution || 
          !hit._source.contribution.contribution || 
          !hit._source.contribution.contribution.length || 
          !hit._source.contribution.contribution[0].id || 
          !hit._source.contribution.contribution[0].id
      });
      hitsWithoutCIDs.forEach(hit => console.log('Missing contribution row ID', hit._id, hit._source.contribution));
      if (hitsWithoutCIDs.length)
        return done(hitsWithoutCIDs.length + " contributions are missing a contribution row ID");
      else
        return done();
    });

  }, 0)});

  it("contributions should have histories", function (done) { setTimeout(() => {
    this.timeout(0);

    esClient.search({
      index: index, type: "contribution", size: 1e4, 
      _source: "summary.contribution.id, summary.contribution._history",
      body: {
        "query": { "match_all": {}}
      }
    }).then((resp) => {
      const incompleteHistories = _.filter(resp.hits.hits, hit => {
        return !hit._source.summary.contribution.id ||
          !hit._source.summary.contribution._history ||
          !hit._source.summary.contribution._history.length ||
          hit._source.summary.contribution._history[0].id != hit._source.summary.contribution.id;
      });
      incompleteHistories.forEach(hit => console.log('Incomplete histories', hit._id, hit._source.summary.contribution.id, hit._source.summary.contribution._history));
      if (incompleteHistories.length)
        return done(incompleteHistories.length + " contributions have incompleted histories.");
      else
        return done();
    });

  }, 0)});

  it("contributions should have unique private keys", function (done) { setTimeout(() => {
    this.timeout(0);

    esClient.search({
      index: index, type: "contribution", size: 0, _source: false,
      body: {
        "aggs": {
          "private_key": {
            "terms": {
              "field": "summary.contribution._private_key",
              "size": 1
            }
          }
        }
      }
    }).then((resp) => {
      if (resp.aggregations.private_key.buckets[0].doc_count > 1)
        return done("At least one duplicate private key exists: " + 
                    resp.aggregations.private_key.buckets[0].key);
      else
        return done();
    });

  }, 0)});

  xit("should create missing contribution private keys", function (done) { setTimeout(() => {
    this.timeout(0);

    esClient.search({
      index: index, type: "contribution", size: 1e4, _source: false,
      body: {
        "query": { "bool": { "must_not": { "exists": {
          "field": "summary.contribution._private_key"
        }}}}
      }
    }).then((resp) => {
      return Promise.each(resp.hits.hits, (hit, i) => {
        console.log("Setting private key for ", hit._id, "(", i, "of", resp.hits.total, ")");
        return esClient.update({
          index: index, type: "contribution",
          id: hit._id,
          refresh: true,
          body: { doc: { "summary": { "contribution": {"_private_key": uuid.v4()}}}},
        });
      }).then(() => {
        done();
      });
    });

  }, 0)});

  xit("should fix mismatching children private keys", function (done) { setTimeout(() => {
    this.timeout(0);

    esClient.search({
      index: index, type: "contribution", size: 1e4,
      _source: "summary.contribution.id, summary.contribution._private_key",
      body: {
        "query": { "bool": { "must": { "exists": {
          "field": "summary.contribution._private_key"
        }}}}
      }
    }).then((resp) => {
      return Promise.each(resp.hits.hits, (hit, i) => {
        let id = hit._source.summary.contribution.id;
        let private_key = hit._source.summary.contribution._private_key;
        let n = resp.hits.total;
        return esClient.search({
          index: index, size: 1e4, _source: false,
          body: {
            "query": { "bool": { 
              "must": { "term": {
                "summary.contribution.id": id
              }}, 
              "must_not": { "term": { 
                "summary.contribution._private_key": private_key 
              }}
            }}
          }
        }).then((resp) => {
          if (resp.hits.total > 0) {
            console.log("Fixing", resp.hits.total, "private keys in", id, "(", i, "of", n, ")");
            return esClient.updateByQuery({
              index: index, refresh: true,
              body: {
                "script": {
                  "inline": "ctx._source.summary.contribution._private_key = params.private_key",
                  "params": { "private_key": private_key }
                },
                "query": { "term": { "summary.contribution.id": id }}
              }
            });
          }
        });
      }).then(() => {
        done();
      });
    });

  }, 0)});

  it("children should have contribution reference metadata", function (done) { setTimeout(() => {
    this.timeout(0);

    esClient.search({
      index: index, size: 1e4, _source: false,
      body: {
        "query": { "bool": { 
          "must": { "exists": { "field": "summary.contribution.id" }},
          "must_not": { "exists": { "field": "summary.contribution._reference" }},
        }}
      }
    }).then((resp) => {
      if (resp.hits.total > 0)
        return done(resp.hits.total + " children documents are missing contribution reference metadata");
      else
        return done();
    });

  }, 0)});

  xit("should fix missing contribution reference metadata", function (done) { setTimeout(() => {
    this.timeout(0);

    esClient.search({
      index: index, size: 1e4,
      _source: "summary.contribution.id",
      body: {
        "query": { "bool": { 
          "must": { "exists": { "field": "summary.contribution.id" }},
          "must_not": { "exists": { "field": "summary.contribution._reference" }},
        }}
      }
    }).then((resp) => {
      return Promise.each(resp.hits.hits, (hit, i) => {
        let cid = hit._source.summary.contribution.id;
        let id = hit._id;
        let type = hit._source.type;
        let n = resp.hits.total;
        return esClient.search({
          index: index, type: "contribution", size: 1e4, 
          _source: "summary.contribution._reference",
          body: {
            "query": { "bool": { "must": [
              {"term": { "summary.contribution.id": cid }},
              {"exists": { "field": "summary.contribution._reference" }}
            ]}}
          }
        }).then((resp) => {
          if (resp.hits.total > 0) {
            let reference = resp.hits.hits[0]._source.summary.contribution._reference;
            console.log("Fixing contribution reference in", type, id, "(", i, "of", n, ")");
            return esClient.update({
              index: index, type: type, id: id, refresh: true,
              body: {
                doc: { summary: { contribution: { _reference: reference}}}
              }
            });
          }
        });
      }).then(() => {
        done();
      });
    });

  }, 0)});

  it("documents should have contribution summaries", function (done) { setTimeout(() => {
    this.timeout(0);

    esClient.search({
      index: index, size: 1e4, _source: false,
      body: {
        "query": { "bool": { 
          "must_not": { "exists": { "field": "summary.contribution" }},
        }}
      }
    }).then((resp) => {
      if (resp.hits.total > 0)
        return done(resp.hits.total + " documents are missing contribution summaries");
      else
        return done();
    });

  }, 0)});

  it("documents should have raw data", function (done) { setTimeout(() => {
    this.timeout(0);

    esClient.search({
      index: index, size: 1e4, _source: false,
      body: {
        "query": { "bool": { 
          "must_not": { "exists": { "field": "contribution" }},
        }}
      }
    }).then((resp) => {
      if (resp.hits.total > 0)
        return done(resp.hits.total + " documents are missing raw data");
      else
        return done();
    });

  }, 0)});

});