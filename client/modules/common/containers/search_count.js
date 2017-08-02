import React from 'react';
import Count from '/client/modules/common/components/count';
import {compose} from 'react-komposer';

export const composer = ({subscriptionName, elasticsearchQuery, elasticsearchFilters}, onData) => {
  const subscriptionHandle = Meteor.subscribe(subscriptionName, elasticsearchQuery, elasticsearchFilters);
  if (subscriptionHandle.ready()) {
    const doc = Collections[subscriptionName].findOne();
    if (doc !== undefined) {
      const count = doc.count;
      onData(null, {count});
    } else {
      onData();
    }
  } else {
    onData();
  }
};

function composeWithTracker(reactiveMapper) {
  return (props, onData, env) => {
    let trackerCleanup = null;
    const handler = Tracker.nonreactive(() => {
      return Tracker.autorun(() => {
        trackerCleanup = reactiveMapper(props, onData, env);
      });
    });

    return () => {
      if(typeof trackerCleanup === 'function') trackerCleanup();
      return handler.stop();
    };
  };
}

export default compose(
  composeWithTracker(composer),
  {
    loadingHandler: () => (
      <i className="notched circle loading icon" style={{animationDuration:'0.75s', margin:0}}></i>
    )
  }
)(Count);
