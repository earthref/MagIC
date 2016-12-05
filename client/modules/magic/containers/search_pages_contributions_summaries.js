import React from 'react';
import MagICSearchSummariesContributionsList from '../components/search_summaries_contributions_list';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, elasticsearchQuery, elasticsearchFilters, elasticsearchSort, elasticsearchPageSize, elasticsearchPageNumber, minimongoSort}, onData) => {
  const {Meteor, Collections} = context();
  const setName = 'magic.pages.contributions.summaries';
  const subscriptionHandle = Meteor.subscribe(setName, elasticsearchQuery, elasticsearchFilters, elasticsearchSort, elasticsearchPageSize, elasticsearchPageNumber);
  if (subscriptionHandle.ready()) {
    const contributions = Collections[setName].find({_page: elasticsearchPageNumber}, {sort: minimongoSort}).fetch();
    console.log('page', elasticsearchPageNumber, contributions.length);
    _.delay(() => onData(null, {contributions}));
  } else {
    onData();
  }
};

export default composeAll(
  composeWithTracker(composer, () => (
    <div className="ui active inverted dimmer" style={{minHeight: '100px', marginLeft: 1}}>
      <div className="ui text loader">Loading</div>
    </div>
  )),
  useDeps()
)(MagICSearchSummariesContributionsList);
