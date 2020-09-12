import _ from 'lodash';
import React from 'react';
import SearchFiltersBuckets from '/client/modules/common/components/search_filters_buckets';
import {compose} from '@storybook/react-komposer';

export const composer = ({es, labels}, onData) => {
  onData(null, { filters: undefined });
  if (es) Meteor.call('esBuckets', es, (error, result) => {
    try {
      if (error) {
        console.error('esBuckets', error);
        onData(null, {error: error});
      } else {
        const filters = labels.map(x => {
          return { ...x, 
            doc_count: result[x.key] && result[x.key].doc_count || 0
          };
        }).filter(x => x.doc_count > 0);
        onData(null, { filters });
      }
    } catch (e) {
      console.log('onData error', e.name, e.message);
    }
  });
};

export default compose(
  composer,
  {
    shouldSubscribe(currentProps, nextProps) {
      return !_.isEqual(currentProps.es, nextProps.es);
    }
  }
)(SearchFiltersBuckets);