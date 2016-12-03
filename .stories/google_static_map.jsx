import _ from 'lodash';
import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import {withKnobs, number, select} from '@kadira/storybook-addon-knobs';
import GoogleStaticMap from '../client/modules/common/components/google_static_map';

const paths = {
  "1 Bounding Box": [{lat_s: 33.671, lat_n: 33.685, lon_w: -116.251, lon_e: -116.234}]
};


const story = storiesOf('Google Static Map', module).addDecorator(withKnobs);

_(paths).forEach((path, key) => {
  story.add(key, () => (
    <GoogleStaticMap
      width={number('Width',100)}
      height={number('Height',100)}
      padding={number('Padding',5)}
      paths={path}
    />
  ));
});
