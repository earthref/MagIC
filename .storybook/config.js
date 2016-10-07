import { configure } from '@kadira/storybook';

function loadStories() {

  // Require all Semantic UI js files
  var jsFiles = require.context('../client/lib/semantic-ui', true, /^(.*\.(js$))[^.]*$/igm);
  jsFiles.keys().forEach(jsFiles);

  // Require Semantic UI less entry point
  require('../client/lib/semantic-ui/semantic.less');

  // Require all component less files
  var lessFiles = require.context('../client/modules', true, /^(.*\.(less$))[^.]*$/igm);
  lessFiles.keys().forEach(lessFiles);

  // Require stories list
  require('../.stories/home.jsx');
  require('../.stories/icon_button.jsx');
  require('../.stories/data_importer.jsx');

}

configure(loadStories, module);
