import {_} from 'lodash';
import Runner from '../../core/actions/runner.js';
import GetContributionVersion from './get_contribution_version';

import {default as magicVersions} from '../configs/magic_versions';
import {default as magicDataModels} from '../configs/data_models/data_models';

export default class extends Runner {

  constructor({LocalState}) {
    super('EXPORT_CONTRIBUTION', {LocalState});
    this.VersionGetter = new GetContributionVersion({LocalState});
  }

  toText(json) {

    let text = '';

    // Retrieve the data model version used in the json
    const version = this.VersionGetter.getVersion(json);
    if (!version) return text;

//    console.log(`version ${version}`);

    // Retrieve the data model
    const model = magicDataModels[version];

    for (let newTableName in json) {//this gets the STRING name of the property into 'table'

      let newTableObject = model.tables[newTableName];//this on the other hand, gets the whole table
      if(!newTableObject)
      {
        this._appendError(`table ${newTableName} is not defined in magic data model version`);
        continue;
      }

      for (let newColumnName in newTableObject.columns) {
        let newColumnObject =  model.tables[newTableName][newColumnName];//model.tables[newTableName];
        if(!newColumnObject)
        {
          this._appendError(`column ${newColumnName} in table ${newTableName} is not defined in magic data model version`);
          continue;
        }

        let currentColumnObj = newTableObject.columns[newColumnName];

console.log(`test: ${newTableName}`);
        // TODO: use the model to build up text string here

        // Text should be a valid MagIC tab delimited text file with the tables and columns in the order defined in the data model.

        // Start by making a list of tables in json, and sort them using the "position" property of the data model tables.
        for (var table in json) {
          if (!table.hasOwnProperty(table)) {
            //The current property is not a direct property of p
            continue;
          }

          console.log(`Table ${table}`);
          //Do your logic with the property here
        }


        // For each table in json, make a list of all of the columns used in the rows in the json table,
        // and sort them using the "position" property of the data model columns.

        // Then loop through the used tables in data model order,
        //   print the table header (note: "tab delimited\ttable_name" format)
        //   loop through the used columns for that table in data model order,
        //     print the column headers
        //   loop through the rows in that table in the order in the json,
        //     loop through the used columns for that table in data model order,
        //       print the column value for that row
        //         note: arrays turn into :val1:val2 string,
        //               any string in an array that contains a ":" gets double quotes around it
        //   and print the table separator if there is another table.
      }
    }

    return text;

  }

}
