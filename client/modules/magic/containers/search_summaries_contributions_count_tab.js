import MagICSearchCountTab from '../components/search_count_tab';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, selector}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('magic.summaries.contributions.count', selector).ready()) {
    const contribution_count = Collections.MagICSummariesContributions.find().count();
    onData(null, {contribution_count});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(MagICSearchCountTab);
