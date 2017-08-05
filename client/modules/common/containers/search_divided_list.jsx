import React from 'react';
import DividedList from '/client/modules/common/components/divided_list';
import {compose} from 'react-komposer';

export const composer = ({es, pageSize, pageNumber}, onData) => {
  onData(null, { items: undefined });
  Meteor.call('esPage', es, pageSize, pageNumber, (error, results) => {
    try {
      if (error) {
        console.error('search_divided_list', error);
        onData(null, {error: error});
      } else {
        onData(null, {items: results });
      }
    } catch (error) {}
  });
};

export default compose(
  composer,
  {
    propsToWatch: ['es', 'pageSize', 'pageNumber'],
    shouldSubscribe(currentProps, nextProps) {
      return !_.isEqual(currentProps.es, nextProps.es) ||
        !_.isEqual(currentProps.pageSize, nextProps.pageSize) ||
        !_.isEqual(currentProps.pageNumber, nextProps.pageNumber);
    }
  }
)(DividedList);
