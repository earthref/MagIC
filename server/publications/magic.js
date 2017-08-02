import _ from 'lodash';
import Fiber from 'fibers';
import {Collections, collectionDefinitions} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import elasticsearch from 'elasticsearch';

const esClient = new elasticsearch.Client({
  //log: 'trace',
  host: Meteor.settings.elasticsearch && Meteor.settings.elasticsearch.url || ''
});

export default function () {

  _.forEach(collectionDefinitions.magic.filters, (levelDefinitions, level) => {
    _.forEach(levelDefinitions, (definition) => {

      Meteor.publish(definition.recordSet, function (query, filters) {

        let search = {
          size: 0,
          query: {
            bool: {
              must: [],
              filter: [{
                term: {
                  "summary.contribution._is_latest": "t"
                }
              }]
            }
          },
          aggs : definition.aggs
        };
        if (_.isPlainObject(query)) search.query.bool.must.push(query);
        if (_.isArray(definition.queries)) search.query.bool.must.push(...definition.queries);

        //if (_.isArray(filters)) search.query.bool.filter.push(...filters);
        //if (_.isArray(filters)) search.query.bool.must.push(...filters);
        //if (_.isArray(definition.filters)) search.query.bool.filter.push(...definition.filters);

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
          size: 0,
          query: {
            bool: {
              must: [],
              filter: [{
                term: {
                  "summary.contribution._is_latest": "t"
                }
              }]
            }
          }
        };

        if (_.isPlainObject(query)) search.query.bool.must.push(query);
        if (_.isArray(definition.queries)) search.query.bool.must.push(...definition.queries);

        if (_.isArray(filters)) search.query.bool.must.push(...filters);
        if (_.isArray(definition.filters)) search.query.bool.filter.push(...definition.filters);

        esClient.search({
          index: definition.index,
          type: definition.type,
          body: search
        }).then((resp) => {
          this.added(definition.recordSet, 'id', {count: resp.hits.total});
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
              must: [],
              filter: [{
                term: {
                  "summary.contribution._is_latest": "t"
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

        if (_.isPlainObject(query)) search.query.bool.must.push(query);
        if (_.isArray(definition.queries)) search.query.bool.must.push(...definition.queries);

        //if (_.isArray(filters)) search.query.bool.filter.push(...filters);
        if (_.isArray(filters)) search.query.bool.must.push(...filters);
        if (_.isArray(definition.filters)) search.query.bool.filter.push(...definition.filters);

        esClient.search({
          index: definition.index,
          type: definition.type,
          body: search
        }).then((resp) => {
          this.added(definition.recordSet, 'id', {count: resp.aggregations.sum.value});
          this.ready();
        }, function (err) {
          console.trace(err.message);
        });

      });
    })
  });

  _.forEach(collectionDefinitions.magic.pages, (levelDefinitions, level) => {
    _.forEach(levelDefinitions, (definition) => {

      //console.log(definition.recordSet);

      Meteor.publish(definition.recordSet, function (query, filters, sort, pageSize, pageNumber) {

        //console.log("page", definition.recordSet);

        let search = {
          from: 0,
          size: 10,
          query: {
            bool: {
              must: [],
              filter: [{
                term: {
                  "summary.contribution._is_latest": "t"
                }
              }]
            }
          }
        };
        if (definition._source !== undefined) search._source = definition._source;

        if (_.isPlainObject(query)) search.query.bool.must.push(query);
        if (_.isArray(definition.queries)) search.query.bool.must.push(...definition.queries);

        //if (_.isArray(filters)) search.query.bool.filter.push(...filters);
        if (_.isArray(filters)) search.query.bool.must.push(...filters);
        if (_.isArray(definition.filters)) search.query.bool.filter.push(...definition.filters);

        if (_.isArray(sort)) search.sort  = sort;
        if (_.isInteger(pageSize)) search.size  = pageSize;
        if (_.isInteger(pageNumber)) search.from  = (pageNumber - 1) * search.size;
        if (search.size === 0) { delete search.from; delete search.size; }
        //console.log("pages", definition.recordSet, search.from, search.size, JSON.stringify(search.query.bool));

        //esClient.search({
        //  index: definition.index,
        //  type: definition.type,
        //  body: search
        //}).then((resp) => {
        //  let i = (pageNumber - 1) * search.size + 1;
        //  if (resp.hits.hits.length === 0) this.ready();
        //  resp.hits.hits.forEach((hit) => {
        //    this.added(definition.recordSet, hit._id, _.extend(hit._source, {
        //      _id: hit._id,
        //      _score: hit._score,
        //      _page: pageNumber,
        //      _i: i
        //    }));
        //    i = i + 1;
        //    this.ready();
        //  });
        //}, function (err) {
        //  console.trace(err.message);
        //  this.error(new Meteor.Error(e, 'Error retrieving contribution data.'));
        //});
        this.ready();

      });

    })
  });

}