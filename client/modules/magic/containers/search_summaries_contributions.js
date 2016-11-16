import MagICSearchSummariesContributions from '../components/search_summaries_contributions';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, selector, options}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('magic.summaries.contributions', selector, options).ready()) {
    const contributions = Collections.MagICSummariesContributions.find().fetch();
    onData(null, {contributions});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(MagICSearchSummariesContributions);
