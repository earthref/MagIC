import _ from 'lodash';
import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import GoogleStaticMap from '../client/modules/common/components/google_static_map';

const data = {};

storiesOf('Histogram Selector', module)
  .add('Thumbnail', () => (
    <div className="ui segment">
      <GoogleStaticMap
      />
    </div>
  ));