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
          size: 0,
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
        if (filters && filters.length) search.query.bool.filter.push(...filters);
        //if (definition.recordSet == 'magic.count.contributions.summaries') console.log("count publishing", definition.recordSet, search);

        //let ready = false;
        esClient.search({
          index: definition.index,
          type: definition.type,
          body: search
        }).then((resp) => {
          //if (!ready) {
            //if (definition.recordSet == 'magic.count.contributions.summaries') console.log('adding count', definition.recordSet, resp.hits.total);
            this.added(definition.recordSet, 'id', {count: resp.hits.total});
          //} else {
          //  if (definition.recordSet == 'magic.count.contributions.summaries') console.log('changing count', definition.recordSet, resp.count);
          //  this.changed(definition.recordSet, 'id', {count: resp.count});
          //}
          //ready = true;
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
        if (filters && filters.length) search.query.bool.filter.push(...filters);
        //console.log("count sum", definition.field, definition.recordSet, search, search.query.bool.filter);

        //let sum;
        esClient.search({
          index: definition.index,
          type: definition.type,
          body: search
        }).then((resp) => {
          //if (sum === undefined) {
            //console.log('adding sum', definition.recordSet, resp.aggregations.sum.value);
            this.added(definition.recordSet, 'id', {count: resp.aggregations.sum.value});
          //} else {
          //  console.log('changing sum', definition.recordSet, resp.aggregations.sum.value);
          //  this.changed(definition.recordSet, 'id', {count: resp.aggregations.sum.value});
          //}
          //sum = resp.aggregations.sum.value;
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
        if (definition.filters && definition.filters.length) search.query.bool.filter.push(...definition.filters);
        if (query !== undefined) search.query.bool.must = query;
        if (filters && filters.length) search.query.bool.filter.push(...filters);
        if (sort  !== undefined) search.sort  = sort;
        if (pageSize !== undefined) search.size  = pageSize;
        if (pageNumber !== undefined) search.from  = (pageNumber - 1) * search.size;
        console.log("search publishing", search.from, search.size, search.query.bool.filter);

        esClient.search({
          index: definition.index,
          type: definition.type,
          body: search
        }).then((resp) => {
          resp.hits.hits.forEach((hit) => {
            //console.log('resp', hit._id, pageNumber, Object.keys(publishedIDs).length);
            //if (publishedIDs[hit._id]) {
              //console.log('changing', hit._id, Object.keys(publishedIDs).length);
            //  this.changed(definition.recordSet, hit._id, _.extend(hit._source, {_id: hit._id, _score: hit._score, _page: pageNumber}));
            //} else {
              console.log('adding', hit._id, Object.keys(publishedIDs).length);
              //publishedIDs[hit._id] = true;
              this.added(definition.recordSet, hit._id, _.extend(hit._source, {_id: hit._id, _score: hit._score, _page: pageNumber}));
            //}
          });
          this.ready();
        }, function (err) {
          console.trace(err.message);
          this.error(new Meteor.Error(e, 'hey!'));
        });

      });

    })
  });

}