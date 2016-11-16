import Count from '../../common/components/count';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, selector}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('magic.summaries.contributions.count', selector).ready()) {
    const count = Collections.MagICSummariesContributionsCounts.findOne(JSON.stringify(selector)).count;
    onData(null, {count});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Count);
