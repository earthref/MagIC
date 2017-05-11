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
  //require('../.stories/magic_search'); Needs server connection to elasticsearch
  require('../.stories/magic_contribution');
  //require('../.stories/magic_map'); Needs Meteor for Google Map

}

configure(loadStories, module);
