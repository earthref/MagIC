import React from 'react';
import SearchSummariesListItem from '/client/modules/magic/components/search_summaries_list_item';
import {compose} from '@storybook/react-komposer';
import {index} from '/lib/configs/magic/search_levels.js';

export const composer = ({item}, onData) => {
  onData(null, {});
  if (item && item.summary && item.summary._incomplete_summary === undefined) {
    let id = item.summary && item.summary.contribution && item.summary.contribution.id;
    let contributor = item.summary && item.summary.contribution && item.summary.contribution.contributor;
    Meteor.call("esUpdatePrivateSummaries", {index, id, contributor}, (error) => {
      try {
        if (error) {
          console.error('SearchSummariesListItem', error);
          onData(null, {error: error});
        } else {
          console.log('SearchSummariesListItem done');
          onData(null, { updated: true });
        }
      } catch (error) {
        console.error('SearchSummariesListItem', error);
      }
    });
  }
};

export default compose(
  composer,
  {}
)(SearchSummariesListItem);
