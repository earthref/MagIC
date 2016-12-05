import React from 'react';
import InfiniteScroller from '../components/infinite_scroller';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, subscriptionName, elasticsearchQuery, elasticsearchFilters, pageNumberPropName, pageSize}, onData) => {
  const {Meteor, Collections} = context();
  const subscriptionHandle = Meteor.subscribe(subscriptionName, elasticsearchQuery, elasticsearchFilters);
  let count = null;
  if (subscriptionHandle.ready()) {
    const doc = Collections[subscriptionName].findOne();
    if (doc !== undefined) {
      count = doc.count;
      onData(null, {count, pageNumberPropName, pageSize});
    } else {
      onData(null, {count, pageNumberPropName, pageSize});
    }
  } else {
    onData(null, {count, pageNumberPropName, pageSize});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(InfiniteScroller);
