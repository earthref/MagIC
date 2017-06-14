import React from 'react';
import DividedList from '../components/divided_list';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, isPoles, subscriptionName, elasticsearchQuery, elasticsearchFilters, elasticsearchSort, elasticsearchPageSize, elasticsearchPageNumber, minimongoSort}, onData) => {
  const {Meteor, Collections} = context();
  const subscriptionHandle = Meteor.subscribe(subscriptionName, elasticsearchQuery, elasticsearchFilters, elasticsearchSort, elasticsearchPageSize, elasticsearchPageNumber);
  let docs = null;
  if (subscriptionHandle.ready()) {
    docs = Collections[subscriptionName].find({_page: elasticsearchPageNumber}, {sort: {_i: 1}}).fetch() || [];
    console.log('search divided list ready', docs);
    onData(null, {isPoles, docs});
  } else {
    onData(null, {isPoles});
  }
};

export default composeAll(
  composeWithTracker(composer, () => (
    <div className="ui active inverted dimmer" style={{minHeight: '500px'}}>
      <div className="ui text loader">Loading</div>
    </div>
  )),
  useDeps()
)(DividedList);
