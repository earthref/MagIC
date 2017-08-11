import {Meteor} from 'meteor/meteor';

import _ from 'lodash';
import elasticsearch from 'elasticsearch';

const esClient = new elasticsearch.Client({
  //log: 'trace',
  host: Meteor.settings.elasticsearch && Meteor.settings.elasticsearch.url || ''
});

export default function () {

  Meteor.methods({

    async esBuckets({index, type, queries, filters, aggs}) {
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


        if (_.isArray(queries)) search.query.bool.must.push(...queries);

        let unfilteredResp = await esClient.search({
          index: index,
          type: type,
          body: search
        });

        if (_.isArray(filters)) search.query.bool.filter.push(...filters);

        let filteredResp = await esClient.search({
          index: index,
          type: type,
          body: search
        });

        return _.reverse(_.sortBy(unfilteredResp.aggregations.buckets.buckets.map(filter => {
          let filtered = _.find(filteredResp.aggregations.buckets.buckets, {key: filter.key});
          filter.filtered_doc_count = filtered ? filtered.doc_count : 0;
          return filter;
        }), ['filtered_doc_count', 'doc_count']));

      } catch(error) {
        console.error('esBuckets', index, type, queries, filters, error.message);
        throw new Meteor.Error('esBuckets', error.message);
      }
    },

    async esCount({index, type, queries, filters, countField}) {
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

        if (_.isArray(queries)) search.query.bool.must.push(...queries);
        if (_.isArray(filters)) search.query.bool.filter.push(...filters);

        if (_.trim(countField) !== '') search.aggs = { count: { sum: { field: countField }}};

        let resp = await esClient.search({
          index: index,
          type: type,
          body: search
        });
        return (_.trim(countField) !== '' ? resp.aggregations.count.value : resp.hits.total);

      } catch(error) {
        console.error('esCount', index, type, queries, filters, countField, error.message);
        throw new Meteor.Error('esCount', error.message);
      }
    },

    async esPage({index, type, queries, filters, source, sort}, pageSize, pageNumber) {
      console.log('esPage', pageNumber, index, type, queries, filters, sort);
      this.unblock();
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

        if (_.isArray(queries)) search.query.bool.must.push(...queries);
        if (_.isArray(filters)) search.query.bool.filter.push(...filters);

        let resp = await esClient.search({
          index: index,
          type: type,
          body: search
        });
        return resp.hits.hits.map(hit => hit._source);

      } catch(error) {
        console.error('esPage', index, type, queries, filters, source, sort, pageSize, pageNumber, error.message);
        throw new Meteor.Error('esPage', error.message);
      }
    },

    async esContributionIDs({index, queries, filters}) {
      console.log('esContributionIDs', index, queries, filters);
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
          aggs : {buckets: {terms: {field: 'summary.contribution.id', size:1e6}}}
        };

        if (_.isArray(queries)) search.query.bool.must.push(...queries);
        if (_.isArray(filters)) search.query.bool.filter.push(...filters);

        let resp = await esClient.search({
          index: index,
          type: 'contribution',
          body: search
        });
        return resp.aggregations.buckets.buckets.map((id) => id.key);

      } catch(error) {
        console.error('esContributionIDs', index, queries, filters, error.message);
        throw new Meteor.Error('esPage', error.message);
      }
    }

  });

};