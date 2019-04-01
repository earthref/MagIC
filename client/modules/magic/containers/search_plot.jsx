import Cookies from 'js-cookie';
import React from 'react';
import SearchPlot from '/client/modules/magic/components/search_plot';
import {compose} from 'react-komposer';

let plotCache = {};
const cacheExpiration = 5*60*1000; // 5 minutes
const cacheMax = 5000;

export const composer = ({ file, isPrivate }, onData) => {
  if (!isPrivate) {
    onData(null, { source: file });
  } else {
    if (plotCache[file] && plotCache[file].timestamp >= Date.now() - cacheExpiration) {
      onData(null, { source: plotCache[file].source })
    } else {
      onData(null, { source: undefined });
      Meteor.call('magicGetPmagPyPlot', file, Cookies.get('user_id'), function (error, source) {
        if (source) {
          plotCache[file] = { source, timestamp: Date.now() };
          onData(null, { source });
        } else {
          onData(null, { error });
        }
      });
    }
  }

  // Remove expired cache entries
  _.keys(plotCache).forEach((file) => { 
    if (plotCache[file].timestamp < Date.now() - cacheExpiration) {
      delete plotCache[file];
    }
  });

  // Remove oldest entries if 10% over the max
  if (_.keys(plotCache).length > 1.1*cacheMax) {
    const sortedFiles = _.map(_.sortBy(_.map(_.keys(plotCache), file => ({ file, timestamp: plotCache[file].timestamp })), 'timestamp'), (x) => x.file);
    plotCache = _.omit(plotCache, sortedFiles.slice(0, sortedFiles.length - cacheMax));
  }

};

export default compose(composer, {
  propsToWatch: ['file']
})(SearchPlot);
