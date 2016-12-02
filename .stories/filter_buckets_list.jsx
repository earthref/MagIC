import _ from 'lodash';
import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import FilterBucketsList from '../client/modules/common/components/filter_buckets_list';

const data = {};

storiesOf('Filter Buckets List', module)
  .add('Terms', () => (
    <div className="ui segment">
      <FilterBucketsList
      />
    </div>
  ));