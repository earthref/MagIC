import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Home from '../client/modules/common/components/home.jsx';
import IconButton from '../client/modules/common/components/icon_button.jsx';

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

storiesOf('Icon Button', module)
  .add('ER', () => (
    <div style={{width:'200px', margin:'auto'}}>
      <IconButton portal="EarthRef.org" title="Search" className="purple tiny">
        <i className="icons">
          <i className="database icon"></i>
          <i className="purple corner search icon"></i>
        </i>
        <div className="subtitle">Subtitle</div>
      </IconButton>
    </div>
  ))