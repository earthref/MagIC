import _ from 'lodash';
import {Collections, collectionDefinitions} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {esClient} from '../configs/elasticsearch';

export default function () {

  _.forEach(collectionDefinitions.magic.filters, (levelDefinitions, level) => {
    _.forEach(levelDefinitions, (definition) => {

      Meteor.publish(definition.recordSet, function (query) {

        let search = {
          size: 0,
          query: {
            bool: {
              filter: [{
                term: {
                  upload: 1
                }
              }]
            }
          },
          aggs : definition.aggs
        };
        if (query !== undefined) search.query.bool.must = query;

        let publishedKeys = {};
        esClient.search({
          index: definition.index,
          type: definition.type,
          body: search
        }).then((resp) => {
          resp.aggregations.buckets.buckets.forEach((bucket) => {
            if (publishedKeys[bucket.key]) {
              //console.log('changing bucket', bucket.key);
              this.changed(definition.recordSet, bucket.key, bucket);
            } else {
              //console.log('adding bucket', bucket.key);
              publishedKeys[bucket.key] = true;
              this.added(definition.recordSet, bucket.key, bucket);
            }
          });
          this.ready();
        }, function (err) {
          console.trace(err.message);
        });

      });
    })
  });

  _.forEach(collectionDefinitions.magic.count, (levelDefinitions, level) => {
    _.forEach(levelDefinitions, (definition) => {

      Meteor.publish(definition.recordSet, function (query, filters) {

        let search = {
          query: {
            bool: {
              filter: [{
                term: {
                  upload: 1
                }
              }]
            }
          }
        };
        if (query !== undefined) search.query.bool.must = query;
        if (filters && filters.length) search.query.bool.filter.push(filters);
        console.log("count publishing", definition.recordSet, search, search.query.bool.filter);

        let count;
        esClient.count({
          index: definition.index,
          type: definition.type,
          body: search
        }).then((resp) => {
          if (count === undefined) {
            console.log('adding count', definition.recordSet, resp.count);
            this.added(definition.recordSet, 'id', {count: resp.count});
          } else {
            console.log('changing count', definition.recordSet, resp.count);
            this.changed(definition.recordSet, 'id', {count: resp.count});
          }
          count = resp.count;
          this.ready();
        }, function (err) {
          console.trace(err.message);
        });

      });
    })
  });

  _.forEach(collectionDefinitions.magic.sum, (levelDefinitions, level) => {
    _.forEach(levelDefinitions, (definition) => {

      Meteor.publish(definition.recordSet, function (query, filters) {

        let search = {
          size: 0,
          query: {
            bool: {
              filter: [{
                term: {
                  upload: 1
                }
              }]
            }
          },
          aggs: {
            sum: {
              sum: {
                field: definition.field
              }
            }
          }
        };
        if (query !== undefined) search.query.bool.must = query;
        if (filters && filters.length) search.query.bool.filter.push(filters);
        console.log("count sum", definition.field, definition.recordSet, search, search.query.bool.filter);

        let sum;
        esClient.search({
          index: definition.index,
          type: definition.type,
          body: search
        }).then((resp) => {
          if (sum === undefined) {
            console.log('adding sum', definition.recordSet, resp.aggregations.sum.value);
            this.added(definition.recordSet, 'id', {count: resp.aggregations.sum.value});
          } else {
            console.log('changing sum', definition.recordSet, resp.aggregations.sum.value);
            this.changed(definition.recordSet, 'id', {count: resp.aggregations.sum.value});
          }
          sum = resp.aggregations.sum.value;
          this.ready();
        }, function (err) {
          console.trace(err.message);
        });

      });
    })
  });

  _.forEach(collectionDefinitions.magic.pages, (levelDefinitions, level) => {
    _.forEach(levelDefinitions, (definition) => {

      console.log(definition.recordSet);

      Meteor.publish(definition.recordSet, function (query, filters, sort, pageSize, pageNumber) {
        let publishedIDs = {};
        let search = {
          from: 0,
          size: 10,
          query: {
            bool: {
              filter: [{
                term: {
                  upload: 1
                }
              }]
            }
          }
        };
        if (definition._source !== undefined) search._source = definition._source;
        //if (definition.filters && definition.filters.length) search.query.bool.filter.push(definition.filters);
        if (query !== undefined) search.query.bool.must = query;
        //if (filters && filters.length) search.query.bool.filter.push(filters);
        if (sort  !== undefined) search.sort  = sort;
        if (pageSize !== undefined) search.size  = pageSize;
        if (pageNumber !== undefined) search.from  = (pageNumber - 1) * search.size;
        console.log("search publishing", Object.keys(publishedIDs).length, search);

        esClient.search({
          index: 'magic-contributions',
          type: 'contribution',
          body: search
        }).then((resp) => {
          resp.hits.hits.forEach((hit) => {
            console.log('resp', hit._id, pageNumber, Object.keys(publishedIDs).length);
            if (publishedIDs[hit._id]) {
              //console.log('changing', hit._id, Object.keys(publishedIDs).length);
              this.changed(definition.recordSet, hit._id, _.extend(hit._source, {_id: hit._id, _score: hit._score, _page: pageNumber}));
            } else {
              //console.log('adding', hit._id, Object.keys(publishedIDs).length);
              publishedIDs[hit._id] = true;
              this.added(definition.recordSet, hit._id, _.extend(hit._source, {_id: hit._id, _score: hit._score, _page: pageNumber}));
            }
          });
          this.ready();
        }, function (err) {
          console.trace(err.message);
          this.error(new Meteor.Error(e, 'hey!'));
        });

      });

    })
  });

  /*Meteor.publish('elasticsearch/magic-search-filters/contribution/contributor_id/_buckets', function (query) {

    let publishedKeys = {};
    let search = {
      size: 0,
      query: {
        bool: {
          filter: [{
            term: {
              upload: 1
            }
          }]
        }
      },
      "aggs" : {
        "buckets" : {
          "terms" : {
            "field" : "contributor_id"
          }
        }
      }
    };
    if (query !== undefined) search.query.bool.must = query;

    esClient.search({
      index: 'magic-contributions',
      type: 'contribution',
      body: search
    }).then((resp) => {
      resp.aggregations.buckets.buckets.forEach((bucket) => {
        if (publishedKeys[bucket.key]) {
          //console.log('changing bucket', bucket.key);
          this.changed('elasticsearch/magic-search-filters/contribution/contributor_id/_buckets', bucket.key, bucket);
        } else {
          //console.log('adding bucket', bucket.key);
          publishedKeys[bucket.key] = true;
          this.added('elasticsearch/magic-search-filters/contribution/contributor_id/_buckets', bucket.key, bucket);
        }
      });
    }, function (err) {
      console.trace(err.message);
    });

    return MagICSearchFiltersContributionContributorIDBuckets.find({});

  });

  Meteor.publish('elasticsearch/magic-search-summaries/contribution/_search', function (query, sort, limit) {
    let publishedIDs = {};
    console.log("search publishing", Object.keys(publishedIDs).length);
    let search = {
      size: 10,
      query: {
        bool: {
          filter: {
            term: {
              upload: 1
            }
          }
        }
      }
    };
    if (query !== undefined) search.query.bool.must = query;
    if (sort  !== undefined) search.sort  = sort;
    if (limit !== undefined) search.size  = limit;

    esClient.search({
      index: 'magic-contributions',
      type: 'contribution',
      body: search
    }).then((resp) => {
      resp.hits.hits.forEach((hit) => {
        console.log('resp', hit._id, Object.keys(publishedIDs).length);
        if (publishedIDs[hit._id]) {
          console.log('changing', hit._id, Object.keys(publishedIDs).length);
          this.changed('elasticsearch/magic-search-summaries/contribution/_search', hit._id, _.extend(hit._source, {_id: hit._id, _score: hit._score}));
        } else {
          console.log('adding', hit._id, Object.keys(publishedIDs).length);
          publishedIDs[hit._id] = true;
          this.added('elasticsearch/magic-search-summaries/contribution/_search', hit._id, _.extend(hit._source, {_id: hit._id, _score: hit._score}));
        }
      });
      this.ready();
    }, function (err) {
      console.trace(err.message);
      this.error(new Meteor.Error(e, 'hey!'));
    });

    console.log("search published", Object.keys(publishedIDs).length);
    //return MagICSearchSummariesContributionSearch.find({});


  });

  Meteor.publish('elasticsearch/magic-search-summaries/contribution/_count', function (query) {

    let count;
    let search = {
      query: {
        bool: {
          filter: {
            term: {
              upload: 1
            }
          }
        }
      }
    };
    if (query !== undefined) search.query.bool.must = query;

    esClient.count({
      index: 'magic-contributions',
      type: 'contribution',
      body: search
    }).then((resp) => {
      if (count === undefined) {
        //console.log('adding count', resp.count);
        this.added('elasticsearch/magic-search-summaries/contribution/_count', 'id', {count: resp.count});
      } else {
        //console.log('changing count', resp.count);
        this.changed('elasticsearch/magic-search-summaries/contribution/_count', 'id', {count: resp.count});
      }
      count = resp.count;
    }, function (err) {
      console.trace(err.message);
    });

    return MagICSearchSummariesContributionCount.find({});

  });

  Meteor.publish('elasticsearch/magic-search-summaries/location/_count', function (query) {

    let count;
    let search = {
      size: 0,
      query: {
        bool: {
          filter: {
            term: {
              upload: 1
            }
          }
        }
      },
      aggs : {
        count : {
          sum : {
            field : "n_locations"
          }
        }
      }
    };
    if (query !== undefined) search.query.bool.must = query;

    esClient.search({
      index: 'magic-contributions',
      type: 'contribution',
      body: search
    }).then((resp) => {
      const resp_count = resp.aggregations.count.value;
      if (count === undefined) {
        //console.log('adding count', );
        this.added('elasticsearch/magic-search-summaries/location/_count', 'id', {count: resp_count});
      } else {
        //console.log('changing count', resp_count);
        this.changed('elasticsearch/magic-search-summaries/location/_count', 'id', {count: resp_count});
      }
      count = resp.count;
    }, function (err) {
      console.trace(err.message);
    });

    return MagICSearchSummariesLocationCount.find({});

  });

  Meteor.publish('elasticsearch/magic-search-ages/contribution/_count', function (query) {

    let count;
    let search = {
      size: 0,
      query: {
        bool: {
          filter: {
            term: {
              upload: 1
            }
          }
        }
      },
      aggs : {
        count : {
          sum : {
            field : "n_ages"
          }
        }
      }
    };
    if (query !== undefined) search.query.bool.must = query;

    esClient.search({
      index: 'magic-contributions',
      type: 'contribution',
      body: search
    }).then((resp) => {
      const resp_count = resp.aggregations.count.value;
      if (count === undefined) {
        //console.log('adding count', );
        this.added('elasticsearch/magic-search-ages/contribution/_count', 'id', {count: resp_count});
      } else {
        //console.log('changing count', resp_count);
        this.changed('elasticsearch/magic-search-ages/contribution/_count', 'id', {count: resp_count});
      }
      count = resp.count;
    }, function (err) {
      console.trace(err.message);
    });

    return MagICSearchAgesContributionCount.find({});

  });

  Meteor.publish('elasticsearch/magic-search-images/contribution/_count', function (query) {

    let count;
    let search = {
      size: 0,
      query: {
        bool: {
          filter: {
            term: {
              upload: 1
            }
          }
        }
      },
      aggs : {
        images_count : {
          sum : {
            field : "n_images"
          }
        },
        plots_count : {
          sum : {
            field : "n_plots"
          }
        }
      }
    };
    if (query !== undefined) search.query.bool.must = query;

    esClient.search({
      index: 'magic-contributions',
      type: 'contribution',
      body: search
    }).then((resp) => {
      const resp_count = resp.aggregations.images_count.value + resp.aggregations.plots_count.value;
      if (count === undefined) {
        //console.log('adding count', );
        this.added('elasticsearch/magic-search-images/contribution/_count', 'id', {count: resp_count});
      } else {
        //console.log('changing count', resp_count);
        this.changed('elasticsearch/magic-search-images/contribution/_count', 'id', {count: resp_count});
      }
      count = resp.count;
    }, function (err) {
      console.trace(err.message);
    });

    return MagICSearchImagesContributionCount.find({});

  });

  Meteor.publish('elasticsearch/magic-search-summaries/site/_count', function (query) {

    let count;
    let search = {
      size: 0,
      query: {
        bool: {
          filter: {
            term: {
              upload: 1
            }
          }
        }
      },
      aggs : {
        count : {
          sum : {
            field : "n_sites"
          }
        }
      }
    };
    if (query !== undefined) search.query.bool.must = query;

    esClient.search({
      index: 'magic-contributions',
      type: 'contribution',
      body: search
    }).then((resp) => {
      const resp_count = resp.aggregations.count.value;
      if (count === undefined) {
        //console.log('adding count', );
        this.added('elasticsearch/magic-search-summaries/site/_count', 'id', {count: resp_count});
      } else {
        //console.log('changing count', resp_count);
        this.changed('elasticsearch/magic-search-summaries/site/_count', 'id', {count: resp_count});
      }
      count = resp.count;
    }, function (err) {
      console.trace(err.message);
    });

    return MagICSearchSummariesSiteCount.find({});

  });

  Meteor.publish('elasticsearch/magic-search-summaries/sample/_count', function (query) {

    let count;
    let search = {
      size: 0,
      query: {
        bool: {
          filter: {
            term: {
              upload: 1
            }
          }
        }
      },
      aggs : {
        count : {
          sum : {
            field : "n_samples"
          }
        }
      }
    };
    if (query !== undefined) search.query.bool.must = query;

    esClient.search({
      index: 'magic-contributions',
      type: 'contribution',
      body: search
    }).then((resp) => {
      const resp_count = resp.aggregations.count.value;
      if (count === undefined) {
        //console.log('adding count', );
        this.added('elasticsearch/magic-search-summaries/sample/_count', 'id', {count: resp_count});
      } else {
        //console.log('changing count', resp_count);
        this.changed('elasticsearch/magic-search-summaries/sample/_count', 'id', {count: resp_count});
      }
      count = resp.count;
    }, function (err) {
      console.trace(err.message);
    });

    return MagICSearchSummariesSampleCount.find({});

  });

  Meteor.publish('elasticsearch/magic-search-summaries/specimen/_count', function (query) {

    let count;
    let search = {
      size: 0,
      query: {
        bool: {
          filter: {
            term: {
              upload: 1
            }
          }
        }
      },
      aggs : {
        count : {
          sum : {
            field : "n_specimens"
          }
        }
      }
    };
    if (query !== undefined) search.query.bool.must = query;

    esClient.search({
      index: 'magic-contributions',
      type: 'contribution',
      body: search
    }).then((resp) => {
      const resp_count = resp.aggregations.count.value;
      if (count === undefined) {
        //console.log('adding count', );
        this.added('elasticsearch/magic-search-summaries/specimen/_count', 'id', {count: resp_count});
      } else {
        //console.log('changing count', resp_count);
        this.changed('elasticsearch/magic-search-summaries/specimen/_count', 'id', {count: resp_count});
      }
      count = resp.count;
    }, function (err) {
      console.trace(err.message);
    });

    return MagICSearchSummariesSpecimenCount.find({});

  });

  /*Meteor.publish('magic.summaries.contributions.count', function (selector) {

    // Increment and decrement the counter on changes.
    let count = 0;
    let initializing = true;
    const cursor = MagICSummariesContributions.find(selector);
    const id = JSON.stringify(selector);
    const handle = cursor.observeChanges({
      added: () => {
        count++;
        if (!initializing) this.changed('magic.summaries.contributions.counts', id, {count: count});
      },
      removed: () => {
        count--;
        this.changed('magic.summaries.contributions.counts', id, {count: count});
      }
    });

    // Initialize the subscription.
    initializing = false;
    this.added('magic.summaries.contributions.counts', id, {count: count});
    this.ready();

    // Stop observing the cursor when client unsubscribes.
    this.onStop(() => handle.stop());

  });*/
}