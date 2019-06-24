import React from 'react';
import {compose} from '@storybook/react-komposer';

import GoogleMap from '/client/modules/common/components/google_map';

export const composer = ({es}, onData) => {
  let docs = [];
  onData(null, { docs: [], nDocs: null });
  Meteor.call('esScroll', es, 1000, function processResults(error, results) {
    try {
      if (error) {
        console.error('SearchMap', error);
        onData(null, {error: error});
      } else {
        docs.push(...results.hits.hits.map(hit => hit._source));
        console.log('SearchMap', docs.length, results.hits.total);
        onData(null, {docs: docs, nDocs: results.hits.total});
        if (results.hits.total > docs.length)
          Meteor.call('esScrollByID', results._scroll_id, processResults);
      }
    } catch (error) {
      console.error(error);
      onData(null, {error: error});
    }
  });
};

export default compose(
  composer,
  {
    propsToWatch: ['es'],
    shouldSubscribe(currentProps, nextProps) {
      return !_.isEqual(currentProps.es, nextProps.es);
    }
  }
)(GoogleMap);