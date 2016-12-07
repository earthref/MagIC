import React from 'react';
import InfiniteScroller from '../components/infinite_scroller';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, countSubscriptionName, elasticsearchQuery, elasticsearchFilters}, onData) => {
  const {Meteor, Collections} = context();
  const subscriptionHandle = Meteor.subscribe(countSubscriptionName, elasticsearchQuery, elasticsearchFilters);
  let count = null;
  if (subscriptionHandle.ready()) {
    const doc = Collections[countSubscriptionName].findOne();
    count = (doc && doc.count) || null;
  }
  onData(null, {count});
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(InfiniteScroller);
