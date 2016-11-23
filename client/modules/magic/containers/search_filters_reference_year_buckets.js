import React from 'react';
import FilterBucketsList from '../../common/components/filter_buckets_list';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, elasticsearchQuery}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('elasticsearch/magic-search-filters/contribution/reference_year/_buckets', elasticsearchQuery).ready()) {
    let buckets = Collections.MagICSearchFiltersContributionReferenceYearBuckets.find({}, {sort: { "doc_count": -1}}).fetch();
    buckets = buckets.map((bucket) => {
      bucket.key = bucket.key + '-' + (bucket.key+4);
      return bucket;
    })
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
