import React from 'react';
import SearchRowsView from '/client/modules/magic/components/search_rows_view';
import {compose} from 'react-komposer';

export const composer = ({es}, onData) => {
  onData(null, {error: undefined, count: undefined});
  Meteor.call('esCount', es, (error, result) => {
    try {
      if (error) {
        console.error('search_rows_view', error);
        onData(null, {error: error});
      } else {
        onData(null, {count: result});
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
)(SearchRowsView);
