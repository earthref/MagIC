import _ from 'lodash';
import React from 'react';
import SearchFiltersBuckets from '/client/modules/common/components/search_filters_buckets';
import {compose} from '@storybook/react-komposer';

export const composer = ({es, title}, onData) => {
  onData(null, { filters: undefined });
  if (es) Meteor.call('esBuckets', es, (error, result) => {
    try {
      if (error) {
        console.error('esBuckets', error);
        onData(null, {error: error});
      } else {
        result = _.sortBy(_.filter(result, (o) => o.doc_count > 0), (x) => {
          let key = x.key;
          if (title === 'Author') {
            const names = x.key.split('. ');
            key = names.length > 1 ? names[names.length - 1] : x.key;
          }
          return _.deburr(_.toLower(key));
        });
        onData(null, {filters: result});
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