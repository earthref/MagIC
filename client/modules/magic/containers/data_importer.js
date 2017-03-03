import React from 'react';
import DataImporter from '../../common/components/data_importer';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({
  context,
  subscriptionName,
  user_id
}, onData) => {
  const {Meteor, Collections} = context();
  const subscriptionHandle = Meteor.subscribe(subscriptionName, user_id);
  let docs = null;
  if (subscriptionHandle.ready()) {
    docs = Collections[subscriptionName].find({}).fetch();
    onData(null, {docs});
  } else {
    onData(null, {});
  }
};

export default composeAll(
  composeWithTracker(composer, () => (
    <div className="ui active inverted dimmer" style={{minHeight: '500px'}}>
      <div className="ui text loader">Loading</div>
    </div>
  )),
  useDeps()
)(DataImporter);
