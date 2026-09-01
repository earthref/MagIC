import {Meteor} from 'meteor/meteor';

import React from 'react';
import {render} from 'react-dom';

import App from './app';
import includeSemanticCss from './lib/semantic-ui/include_semantic_css';

// Start fetching Semantic UI right away, then render once it has arrived.
const semanticCssLoaded = includeSemanticCss();

Meteor.startup(() => {
  semanticCssLoaded.then(() => {
    render(<App/>, document.getElementById('react-root'));
  });
});
