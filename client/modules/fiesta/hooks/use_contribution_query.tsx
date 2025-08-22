import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { useQuery } from '@tanstack/react-query';
import { index } from '/lib/configs/magic/search_levels';
import { versions, models } from '../../../../lib/configs/magic/data_models';

export const useContributionQuery = (contributionID: number, options) => {
  const queryOptions = {
    ...options,
  }
  return useQuery(
    ['contribution', contributionID],
    () => Meteor.callAsync('esGetContribution', { index, id: contributionID, tables: _.keys(models[versions.slice(-1)[0]].tables) }),
    queryOptions
  );
}
