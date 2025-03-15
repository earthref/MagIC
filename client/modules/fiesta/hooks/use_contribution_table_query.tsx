import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { useQuery } from '@tanstack/react-query';
import { index } from '/lib/configs/magic/search_levels';
import { versions, models } from '/lib/configs/magic/data_models';

export const useContributionTableQuery = (contributionID: number, table: string, options) => {
  const queryOptions = {
    ...options,
  }
  return useQuery(
    ['contribution table', contributionID, table],
    async () => {
      const data = await Meteor.callAsync('esGetContribution', { index, id: contributionID, tables: [table] });
      const rows = data?.[table] || [];
      
      const model = models[versions.slice(-1)[0]];
      const orderedColumnNames = _.sortBy(_.keys(model.tables[table].columns), column => model.tables[table].columns[column].position);
      const usedColumns = {};
      rows.forEach(row => { _.keys(row).forEach(column => { usedColumns[column] = true; }) });
      const emptyColumnsIdxs = orderedColumnNames.reduce((columns, column, i) => {
          return usedColumns[column] ? columns : columns.concat(i);
      }, []);
      const isColumnReadOnly = {}
      orderedColumnNames.forEach(column =>
        isColumnReadOnly[column] = model.tables[table].columns[column].validations?.some(validation => /downloadOnly\(\)/.test(validation))
      );
      const columnCV = {}
      orderedColumnNames.forEach((column) => {
        model.tables[table].columns[column].validations?.forEach(validation => {
          const match = /cv\("(.+)"\)|type\("(method_codes)"\)/.exec(validation);
          if (match)
            columnCV[column] = match[1] || match[2];
        });
      });

      return { rows, orderedColumnNames, emptyColumnsIdxs, isColumnReadOnly, columnCV };
    },
    queryOptions
  );
}
