import React from 'react';
import {compose} from '@storybook/react-komposer';

import InfiniteScroller from '/client/modules/common/components/infinite_scroller';

export const composer = ({es}, onData) => {
  // No onData() call here so that the component doesn't clear and then re-render all pages.
  Meteor.call('esCount', es, (error, result) => {
    if (error) {
      console.error('InfiniteScrollerWithCount', error);
      onData(null, {error: error});
    } else {
      //console.log('esCount', es, result);
      onData(null, {count: result});
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
)(InfiniteScroller);
