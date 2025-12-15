import React from 'react';
import {compose} from '@storybook/react-komposer';

import SVGMapThumbnail from '/client/modules/common/components/svg_map_thumbnail.jsx';

export const composer = ({es}, onData) => {
  let docs = [];
  onData(null, { docs: [], nDocs: null });
  Meteor.call('esScroll', es, 1000, function processResults(error, results) {
    try {
      if (error) {
        console.error('SearchMap', error);
        onData(null, {error: error});
      } else {
        docs.push(...results.body.hits.hits.map(hit => hit._source));
        console.log('SearchMap', docs.length, results.body.hits.total.value);
        
        const markers = docs.map(doc => {
          let lat, lon;
          if (doc.summary && doc.summary.locations && doc.summary.locations._geo_envelope) {
            const env = doc.summary.locations._geo_envelope[0];
            if (env && env.coordinates) {
              const c = env.coordinates;
              let lon1 = c[0][0];
              let lat1 = c[0][1];
              let lon2 = c[1][0];
              let lat2 = c[1][1];

              // Heuristic for bad data where one longitude is positive but should be negative (e.g. 122.7 instead of -122.7)
              // or for dateline crossing unwrapping.
              if (Math.abs(lon1 - lon2) > 180) {
                if (Math.abs(lon1 - (-lon2)) < 20) lon2 = -lon2;
                else if (Math.abs((-lon1) - lon2) < 20) lon1 = -lon1;
              }

              lon = (lon1 + lon2) / 2;
              lat = (lat1 + lat2) / 2;
            }
          }
          return {
            lat,
            lon,
            id: doc._id,
            title: (doc.summary && doc.summary.contribution && doc.summary.contribution._name) || doc._id
          };
        }).filter(m => m.lat !== undefined && m.lon !== undefined);

        onData(null, {docs: docs, markers: markers, nDocs: results.body.hits.total.value});
        if (results.body.hits.total.value > docs.length)
          Meteor.call('esScrollByID', results.body._scroll_id, processResults);
      }
    } catch (error) {
      console.error(error);
      onData(null, {error: error});
    }
  });
};

export default compose(composer, {
  propsToWatch: ["es"],
  shouldSubscribe(currentProps, nextProps) {
    return !_.isEqual(currentProps.es, nextProps.es);
  },
})(SVGMapThumbnail);