import React from 'react';
import {compose} from 'react-komposer';

import SearchJSONLD from '/client/modules/magic/components/search_jsonld';

export const composer = ({es}, onData) => {
  onData(null, { item: undefined });
  Meteor.call('esPage', es, 1, 1, (error, results) => {
    try {
      if (error) {
        console.error('JSONLD', error);
        onData(null, {error: error});
      } else if (results.length > 0) {
        onData(null, {item: results[0]});
      }
    } catch (error) {}
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
)(SearchJSONLD);
