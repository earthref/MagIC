import React from 'react';
import InfiniteScroller from '/client/modules/common/components/infinite_scroller';
import {compose} from 'react-komposer';

export const composer = ({es}, onData) => {
  onData(null, {});
  //console.log('esCount', es);
  Meteor.call('esCount', es, (error, result) => {
    if (error) {
      console.error('esCount', error);
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
      //console.log('esCount - shouldSubscribe', currentProps, nextProps);
      return !_.isEqual(currentProps.es, nextProps.es);
    }
  }
)(InfiniteScroller);
