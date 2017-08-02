import _ from 'lodash';
import {Meteor} from 'meteor/meteor';
import elasticsearch from 'elasticsearch';

const esClient = new elasticsearch.Client({
  //log: 'trace',
  host: Meteor.settings.elasticsearch && Meteor.settings.elasticsearch.url || ''
});

export default function () {

  Meteor.methods({

    async esBuckets({ index, type, query, filters, aggs}) {
      this.unblock();
      try {

        let search = {
          size: 0,
          query: {
            bool: {
              must: [],
              filter: [{
                term: {
                  "summary.contribution._is_latest": "true"
                }
              }]
            }
          },
          aggs : aggs
        };

        if (_.isPlainObject(query)) search.query.bool.must.push(query);

        let unFilteredResp = await esClient.search({
          index: index,
          type: type,
          body: search
        });

        //if (_.isArray(filters)) search.query.bool.filter.push(...filters);

        //let filteredResp = await esClient.search({
        //  index: index,
        //  type: type,
        //  body: search
        //});

        return unFilteredResp.aggregations.buckets.buckets;
        //{
        //  unfiltered: unFilteredResp.aggregations.buckets.buckets,
        //  filtered:   filteredResp.aggregations.buckets.buckets
        //};

      } catch(error) {
        console.error('esBuckets', index, type, query, filters, error.message);
        throw new Meteor.Error('esBuckets', error.message);
      }
    },

    async esCount({ index, type, query, filters, countField }) {
      this.unblock();
      try {

        let search = {
          size: 0,
          query: {
            bool: {
              must: [],
              filter: [{
                term: {
                  "summary.contribution._is_latest": "true"
                }
              }]
            }
          }
        };

        if (_.isPlainObject(query)) search.query.bool.must.push(query);
        if (_.isArray(filters)) search.query.bool.filter.push(...filters);

        if (_.trim(countField) !== '') search.aggs = { count: { sum: { field: countField }}};

        let resp = await esClient.search({
          index: index,
          type: type,
          body: search
        });
        return (_.trim(countField) !== '' ? resp.aggregations.count.value : resp.hits.total);

      } catch(error) {
        console.error('esCount', index, type, query, filters, countField, error.message);
        throw new Meteor.Error('esCount', error.message);
      }
    },

    async esPage({ index, type, query, filters, source, sort }, pageSize, pageNumber) {
      //console.log('esPage', pageNumber, index, type, query, filters, sort);
      //this.unblock();
      try {

        let search = {
          from: pageSize * (pageNumber - 1),
          size: pageSize,
          _source: source,
          query: {
            bool: {
              must: [],
              filter: [{
                term: {
                  "summary.contribution._is_latest": "true"
                }
              }]
            }
          },
          sort: sort
        };

        if (_.isPlainObject(query)) search.query.bool.must.push(query);
        if (_.isArray(filters)) search.query.bool.filter.push(...filters);

        let resp = await esClient.search({
          index: index,
          type: type,
          body: search
        });
        return resp.hits.hits.map(hit => hit._source);

      } catch(error) {
        console.error('esPage', index, type, query, filters, source, sort, pageSize, pageNumber, error.message);
        throw new Meteor.Error('esPage', error.message);
      }
    }
  });

};