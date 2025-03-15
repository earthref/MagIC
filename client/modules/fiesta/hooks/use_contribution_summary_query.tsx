import { Meteor } from 'meteor/meteor';
import { useQuery } from '@tanstack/react-query';
import { index } from '/lib/configs/magic/search_levels';

export const useContributionSummaryQuery = (contributionID: number, options) => {
  const queryOptions = {
    ...options,
  }
  return useQuery(
    ['contribution summary', contributionID],
    () => Meteor.callAsync('esGetPrivateContributionSummary', {index, id: contributionID}),
    queryOptions
  );
}
