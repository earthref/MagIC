import React from 'react';
import {compose} from '@storybook/react-komposer';

import Count from '/client/modules/common/components/count';

export const composer = ({es}, onData) => {
  onData(null, {error: undefined, count: undefined});
  Meteor.call('esCount', es, (error, result) => {
    try {
      if (error) {
        console.error('esCount', error);
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
)(Count);
