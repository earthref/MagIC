import { configure } from '@kadira/storybook';

function loadStories() {

  require('../public/lib/semantic-ui/compiled/2.2.6/semantic.css');
  require('../client/lib/semantic-ui/semantic.2.2.6.js');

  // Require stories list
  require('../.stories/home');
  require('../.stories/icon_button');
  require('../.stories/google_static_map');
  require('../.stories/histogram_selector');
  require('../.stories/filter_buckets_list');
  //require('../.stories/data_importer');
  //require('../.stories/magic_search');
  require('../.stories/magic_contribution');

}

configure(loadStories, module);
