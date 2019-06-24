import React from 'react';
import SearchFiltersBuckets from '/client/modules/common/components/search_filters_buckets';
import {compose} from '@storybook/react-komposer';

export const composer = ({es}, onData) => {
  onData(null, { filters: undefined });
  if (es) Meteor.call('esBuckets', es, (error, result) => {
    try {
      if (error) {
        console.error('esBuckets', error);
        onData(null, {error: error});
      } else {
        onData(null, {filters: result});
      }
    } catch (error) {
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
)(SearchFiltersBuckets);
