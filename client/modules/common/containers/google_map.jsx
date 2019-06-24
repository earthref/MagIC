import React from 'react';
import GoogleMap from '/client/modules/common/components/google_map';
import {compose} from '@storybook/react-komposer';

export const composer = ({}, onData) => {
  console.log('GoogleMaps.loaded()', GoogleMaps.loaded());
  if (GoogleMaps.loaded()) {
    const loaded = true;
    onData(null, {loaded});
  } else {
    onData();
  }
};

export default compose(
  composer,
  {
    loadingHandler: () => (
      <i className="notched circle loading icon" style={{animationDuration:'0.75s', margin:0}}></i>
    )
  }
)(GoogleMap);
