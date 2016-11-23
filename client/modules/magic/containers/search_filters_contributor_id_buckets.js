import React from 'react';
import FilterBucketsList from '../../common/components/filter_buckets_list';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, elasticsearchQuery}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('elasticsearch/magic-search-filters/contribution/contributor_id/_buckets', elasticsearchQuery).ready()) {
    const buckets = Collections.MagICSearchFiltersContributionContributorIDBuckets.find({}, {sort: { "doc_count": -1}}).fetch();
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
