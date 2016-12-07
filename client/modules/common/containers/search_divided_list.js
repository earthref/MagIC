import React from 'react';
import DividedList from '../components/divided_list';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, subscriptionName, elasticsearchQuery, elasticsearchFilters, elasticsearchSort, elasticsearchPageSize, elasticsearchPageNumber, minimongoSort}, onData) => {
  const {Meteor, Collections} = context();
  const subscriptionHandle = Meteor.subscribe(subscriptionName, elasticsearchQuery, elasticsearchFilters, elasticsearchSort, elasticsearchPageSize, elasticsearchPageNumber);
  let docs = null;
  if (subscriptionHandle.ready()) {
    docs = Collections[subscriptionName].find({_page: elasticsearchPageNumber}, {sort: minimongoSort}).fetch();
    //console.log('page', elasticsearchPageNumber, docs.length);
    onData(null, {docs});
  } else {
    onData();
  }
};

export default composeAll(
  composeWithTracker(composer, () => (
    <div className="ui active inverted dimmer" style={{minHeight: '100px'}}>
      <div className="ui text loader">Loading</div>
    </div>
  )),
  useDeps()
)(DividedList);
