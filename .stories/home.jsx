import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import Home from '../client/modules/common/components/home.jsx';

storiesOf('Home', module)
  .add('ER', () => (
    <Home portal="EarthRef.org">
      <div>
        EarthRef Home.
      </div>
    </Home>
  ))
  .add('MagIC', () => (
    <Home portal="MagIC">
      <div>
        MagIC Home.
      </div>
    </Home>
  ));