import React from 'react';
import Count from '../../common/components/count';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, elasticsearchQuery}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('elasticsearch/magic-search-summaries/specimen/_count', elasticsearchQuery).ready()) {
    const doc = Collections.MagICSearchSummariesSpecimenCount.findOne();
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
