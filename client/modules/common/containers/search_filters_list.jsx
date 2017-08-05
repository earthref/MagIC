import React from 'react';
import FiltersList from '/client/modules/common/components/filters_list';
import {compose} from 'react-komposer';

export const composer = ({es}, onData) => {
  //onData(null, {error: undefined, filters: []});
  Meteor.call('esBuckets', es, (error, result) => {
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
)(FiltersList);
