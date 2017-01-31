import React from 'react';
import FiltersList from '/client/modules/common/components/filters_list';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, name, title, elasticsearchQuery, elasticsearchFilters}, onData) => {
  const {Meteor, Collections} = context();
  const subscriptionHandle = Meteor.subscribe(name, elasticsearchQuery, elasticsearchFilters);
  if (subscriptionHandle.ready()) {
    let filters = Collections[name].find({}, {sort: { "doc_count": -1}}).fetch();
    onData(null, {filters});
  } else {
    onData();
  }
};

export default composeAll(
  composeWithTracker(composer, () => (
    <div>
      <i className="notched circle loading icon" style={{animationDuration:'0.75s'}}></i>
    </div>
  )),
  useDeps()
)(FiltersList);
