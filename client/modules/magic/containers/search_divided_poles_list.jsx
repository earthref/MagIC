import _ from 'lodash';
import React from 'react';
import {compose} from '@storybook/react-komposer';

import SearchDividedPolesList from '/client/modules/magic/components/search_divided_poles_list';

export const composer = ({es, pageSize, pageNumber}, onData) => {
  onData(null, { items: undefined, idFilter: false });
  Meteor.call('esPage', es, pageSize, pageNumber, (error, results) => {
    try {
      if (error) {
        console.error('SearchDividedPolesList', error);
        onData(null, {error: error});
      } else {
        onData(null, {items: results, idFilter: es && es.queries && _.find(_.map(es.queries, "terms"), "summary.contribution._history.id") });
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
)(SearchDividedPolesList);
