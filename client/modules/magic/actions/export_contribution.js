import {_} from 'lodash';
import Runner from '../../core/actions/runner.js';
import GetContributionVersion from './get_contribution_version';
//import json2csv from 'json2csv';

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

    // Retrieve the data model
    const model = magicDataModels[version];

    for (let newTableName in json) {//this gets the string name of the property 'table'
      let newTableObject = model.tables[newTableName];
      if(!newTableObject)
      {
        this._appendError(`table ${newTableName} is not defined in magic data model version ${version}`);
        continue;
      }

      //Test to make sure the column names are valid for a given model
      let columnErrorTracker = {};//keep track of invalid columns we have seen
      for (let jsonRowIdx in json[newTableName]) {
        let jsonColumnNames = Object.getOwnPropertyNames(json[newTableName][jsonRowIdx]);
        for (let jsonColumnNameIdx in jsonColumnNames) {
          let modelColumn = model.tables[newTableName].columns[jsonColumnNames[jsonColumnNameIdx]];
          if (!modelColumn || modelColumn == undefined) {
            if (!columnErrorTracker[jsonColumnNames[jsonColumnNameIdx]] ) {
              this._appendError(`column ${jsonColumnNames[jsonColumnNameIdx]} in table ${newTableName} is not defined in magic data model version ${version}`);
              //Keeping track of column we have seen for this table. I really only care about the property here, not the value.
              columnErrorTracker[jsonColumnNames[jsonColumnNameIdx]] = 'placeholder';
            }
            continue;
        }
      }
        // TODO: use the model to build up text string here

        // Text should be a valid MagIC tab delimited text file with the tables and columns in the order defined in the data model.


        // For each table in json, make a list of all of the columns used in the rows in the json table,
        // and sort them using the "position" property of the data model columns.
        // Start by making a list of tables in json, and sort them using the "position" property of the data model tables.
        //console.log(`JSON BEFORE: ${JSON.stringify(json)}`)
        var jsonAscendingOrder = _.sortBy( json, 'position' );

        //console.log(`JSON AFTER : ${JSON.stringify(jsonAscendingOrder)}`);
        for(var tableName in jsonAscendingOrder)
        {
          //console.log(`Table: ${tableName}`);

        }



        /*for (var table in json) {
          if (!table.hasOwnProperty(table)) {
            //The current property is not a direct property of p
            continue;
          }*/



          //Do your logic with the property here



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


      //let tsv = '';
      /*json2csv({ data: json, del: '\t', doubleQuotes: ''}, function(err, tsv) {
        if (err) console.log(err);
         console.log(tsv);
        callBack(tsv);
      });*/

  }
}
