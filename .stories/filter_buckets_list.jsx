import _ from 'lodash';
import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import FiltersList from '../client/modules/common/components/filters_list';

const data = {};

storiesOf('Filter Buckets List', module)
  .add('Terms', () => (
    <div className="ui segment" style={{maxWidth: 200}}>
      <FiltersList
        title="Filter 1"
        filters={[{key: 'Term 1', doc_count: '2'}, {key: 'Term 2', doc_count: '5'}]}
      />
      <FiltersList
        title="Filter 2"
        filters={[{key: 1980, doc_count: '2'}, {key: 1985, doc_count: '5'}, {key: 1990, doc_count: '5'}]}
        show={2}
      />
    </div>
  ));