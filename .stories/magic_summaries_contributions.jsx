import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import MagICSearchSummariesContributions from '../client/modules/magic/containers/search_summaries_contribution_search';


storiesOf('Search', module)
  .add('MagIC Summaries Contributions', () => (
    <MagICSearchSummariesContributions/>
  ));