import React from 'react';
import Count from '../components/count';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, subscriptionName, elasticsearchQuery, elasticsearchFilters}, onData) => {
  const {Meteor, Collections} = context();
  const subscriptionHandle = Meteor.subscribe(subscriptionName, elasticsearchQuery, elasticsearchFilters);
  if (subscriptionHandle.ready()) {
    const doc = Collections[subscriptionName].findOne();
    if (doc !== undefined) {
      const count = doc.count;
      onData(null, {count});
    } else {
      onData();
    }
  } else {
    onData();
  }
};

export default composeAll(
  composeWithTracker(composer, () => (
    <i className="notched circle loading icon" style={{animationDuration:'0.75s', margin:0}}></i>
  )),
  useDeps()
)(Count);
