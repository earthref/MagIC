import _ from 'lodash';
import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import {withKnobs, number, array} from '@kadira/storybook-addon-knobs';
import GoogleStaticMap from '../client/modules/common/components/google_static_map';

storiesOf('Google Static Map', module)
  .addDecorator(withKnobs)
  .add('Thumbnail', () => (
    <GoogleStaticMap
      width={number('Width',100)}
      height={number('Height',100)}
      paths={array('Paths', [{test: 'test'}])}
    />
  ))
;