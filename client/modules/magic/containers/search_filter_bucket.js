import React from 'react';
import FilterBucketsList from '/client/modules/common/components/filter_buckets_list';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, name, elasticsearchQuery}, onData) => {
  const {Meteor, Collections} = context();
  const setName = 'magic.filters.contributions.' + name;
  const subscriptionHandle = Meteor.subscribe(setName, elasticsearchQuery);
  if (subscriptionHandle.ready()) {
    let buckets = Collections[setName].find({}, {sort: { "doc_count": -1}}).fetch();
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
