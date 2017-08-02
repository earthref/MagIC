import React from 'react';
import GoogleMap from '/client/modules/common/components/google_map';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({}, onData) => {
  console.log('GoogleMaps.loaded()', GoogleMaps.loaded());
  if (GoogleMaps.loaded()) {
    const loaded = true;
    onData(null, {loaded});
  } else {
    onData();
  }
};

export default composeAll(
  composeWithTracker(composer, () => (
    <i className="notched circle loading icon" style={{animationDuration:'0.75s', margin:0}}></i>
  )),
  useDeps()
)(GoogleMap);
