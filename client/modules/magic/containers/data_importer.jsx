import React from 'react';
import DataImporter from '/client/modules/common/components/data_importer';
import {compose} from '@storybook/react-komposer';

export const composer = ({context, subscriptionName, user_id}, onData) => {
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

export default compose(
  composer,
  {
    loadingHandler: () => (
      <div className="ui active inverted dimmer" style={{minHeight: '500px'}}>
        <div className="ui text loader">Loading</div>
      </div>
    )
  }
)(DataImporter);
