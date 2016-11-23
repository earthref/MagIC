import React from 'react';
import MagICSearchSummariesContributionsList from '../components/search_summaries_contributions_list';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, elasticsearchQuery, elasticsearchSort, elasticsearchLimit, minimongoSort}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('elasticsearch/magic-search-summaries/contribution/_search', elasticsearchQuery, elasticsearchSort, elasticsearchLimit).ready()) {
    const contributions = Collections.MagICSearchSummariesContributionSearch.find({}, {sort: minimongoSort}).fetch();
    console.log('search contributions', contributions.length);
    //debugger;
    onData(null, {contributions});
  } else {
    console.log('search contributions not ready');
    onData();
  }
};

export default composeAll(
  composeWithTracker(composer, () => (
    <div className="ui active inverted dimmer" style={{marginLeft: 1}}>
      <div className="ui text loader">Loading</div>
    </div>
  )),
  useDeps()
)(MagICSearchSummariesContributionsList);
