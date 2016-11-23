import {MagICSearchSummariesContributionSearch} from '/lib/collections';
import {MagICSearchSummariesContributionCount} from '/lib/collections';
import {MagICSearchAgesContributionCount} from '/lib/collections';
import {MagICSearchImagesContributionCount} from '/lib/collections';
import {MagICSearchSummariesLocationCount} from '/lib/collections';
import {MagICSearchSummariesSiteCount} from '/lib/collections';
import {MagICSearchSummariesSampleCount} from '/lib/collections';
import {MagICSearchSummariesSpecimenCount} from '/lib/collections';
import {MagICSearchFiltersContributionReferenceYearBuckets} from '/lib/collections';
import {MagICSearchFiltersContributionContributorIDBuckets} from '/lib/collections';
import {MagICSearchFiltersContributionExternalDBNameBuckets} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import elasticsearch from 'elasticsearch';
const esClient = new elasticsearch.Client({
  //log: 'trace',
  host: 'http://elastic:7UCqaDzNAmgRrPw7VnMVfm7JRBE6@128.193.70.68:9200' // Haviside
});

export default function () {

  Meteor.publish('elasticsearch/magic-search-filters/contribution/reference_year/_buckets', function (query) {

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
          "histogram" : {
            "field" : "reference_year",
            "interval": 5
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
          console.log('changing bucket', bucket.key);
          this.changed('elasticsearch/magic-search-filters/contribution/reference_year/_buckets', bucket.key, bucket);
        } else {
          console.log('adding bucket', bucket.key);
          publishedKeys[bucket.key] = true;
          this.added('elasticsearch/magic-search-filters/contribution/reference_year/_buckets', bucket.key, bucket);
        }
      });
    }, function (err) {
      console.trace(err.message);
    });

    return MagICSearchFiltersContributionReferenceYearBuckets.find({});

  });

  Meteor.publish('elasticsearch/magic-search-filters/contribution/external_db_name/_buckets', function (query) {

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
            "field" : "external_database_ids"
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
          console.log('changing bucket', bucket.key);
          this.changed('elasticsearch/magic-search-filters/contribution/external_db_name/_buckets', bucket.key, bucket);
        } else {
          console.log('adding bucket', bucket.key);
          publishedKeys[bucket.key] = true;
          this.added('elasticsearch/magic-search-filters/contribution/external_db_name/_buckets', bucket.key, bucket);
        }
      });
    }, function (err) {
      console.trace(err.message);
    });

    return MagICSearchFiltersContributionExternalDBNameBuckets.find({});

  });

  Meteor.publish('elasticsearch/magic-search-filters/contribution/contributor_id/_buckets', function (query) {

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
          console.log('changing bucket', bucket.key);
          this.changed('elasticsearch/magic-search-filters/contribution/contributor_id/_buckets', bucket.key, bucket);
        } else {
          console.log('adding bucket', bucket.key);
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
        if (publishedIDs[hit._id]) {
          console.log('changing', hit._id);
          this.changed('elasticsearch/magic-search-summaries/contribution/_search', hit._id, _.extend(hit._source, {_id: hit._id, _score: hit._score}));
        } else {
          console.log('adding', hit._id);
          publishedIDs[hit._id] = true;
          this.added('elasticsearch/magic-search-summaries/contribution/_search', hit._id, _.extend(hit._source, {_id: hit._id, _score: hit._score}));
        }
      });
    }, function (err) {
      console.trace(err.message);
    });

    return MagICSearchSummariesContributionSearch.find({});

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
        console.log('adding count', resp.count);
        this.added('elasticsearch/magic-search-summaries/contribution/_count', 'id', {count: resp.count});
      } else {
        console.log('changing count', resp.count);
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
        console.log('adding count', );
        this.added('elasticsearch/magic-search-summaries/location/_count', 'id', {count: resp_count});
      } else {
        console.log('changing count', resp_count);
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
        console.log('adding count', );
        this.added('elasticsearch/magic-search-ages/contribution/_count', 'id', {count: resp_count});
      } else {
        console.log('changing count', resp_count);
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
        console.log('adding count', );
        this.added('elasticsearch/magic-search-images/contribution/_count', 'id', {count: resp_count});
      } else {
        console.log('changing count', resp_count);
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
        console.log('adding count', );
        this.added('elasticsearch/magic-search-summaries/site/_count', 'id', {count: resp_count});
      } else {
        console.log('changing count', resp_count);
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
        console.log('adding count', );
        this.added('elasticsearch/magic-search-summaries/sample/_count', 'id', {count: resp_count});
      } else {
        console.log('changing count', resp_count);
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
        console.log('adding count', );
        this.added('elasticsearch/magic-search-summaries/specimen/_count', 'id', {count: resp_count});
      } else {
        console.log('changing count', resp_count);
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