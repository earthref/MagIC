import React from 'react';
import FilterBucketsList from '../../common/components/filter_buckets_list';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, elasticsearchQuery}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('elasticsearch/magic-search-filters/contribution/external_db_name/_buckets', elasticsearchQuery).ready()) {
    let buckets = Collections.MagICSearchFiltersContributionExternalDBNameBuckets.find({}, {sort: { "doc_count": -1}}).fetch();
    //buckets = _.reject(buckets, {key: 'id'});
    onData(null, {buckets});
  } else {
    onData();
  }
};

export default composeAll(
  composeWithTracker(composer, () => (
    <i className="notched circle loading icon" style={{animationDuration:'0.75s', margin:0}}></i>
  )),
  useDeps()
)(FilterBucketsList);
