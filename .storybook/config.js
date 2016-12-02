import { configure } from '@kadira/storybook';

function loadStories() {

  require('../public/lib/semantic-ui/compiled/2.2.6/semantic.css');
  require('../client/lib/semantic-ui/semantic.js');

  // Require stories list
  require('../.stories/home');
  require('../.stories/icon_button');
  require('../.stories/data_importer');
  //require('../.stories/magic_search');
  require('../.stories/magic_contribution');

}

configure(loadStories, module);
