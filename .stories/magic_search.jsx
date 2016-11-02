import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import MagICSearch from '../client/modules/magic/components/search.jsx';

storiesOf('Search', module)
  .add('MagIC', () => (
    <MagICSearch search={""}/>
  ));