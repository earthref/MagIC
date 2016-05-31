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
    this.version;
    this.model;
  }

  toText(jsonToTranslate) {

    // Text should be a valid MagIC tab delimited text file with the tables and columns in the order defined in the data model.
    let text = 'tab';
    // Retrieve the data model version used in the jsonToTranslate
    this.version = this.VersionGetter.getVersion(jsonToTranslate)
    if (!this.version) return text;

    // Retrieve the data model
    this.model = magicDataModels[this.version];

    this.testValidityOfTablesAndColumns(jsonToTranslate);

    let tablePositionMap = this.orderTablesAndColumns(jsonToTranslate);

    // TODO: use the model to build up text string here
    this.createTSVfile(tablePositionMap, jsonToTranslate);

    /*for (var table in jsonToTranslate) {
     if (!table.hasOwnProperty(table)) {
     //The current property is not a direct property of p
     continue;
     }*/

    return text;


      //let tsv = '';
      /*json2csv({ data: jsonToTranslate, del: '\t', doubleQuotes: ''}, function(err, tsv) {
        if (err) console.log(err);
         console.log(tsv);
        callBack(tsv);
      });*/

  }

  createTSVfile(tablePositionMap, jsonToTranslate){
    // Then loop through the used tables in data model order,
    //   print the table header (note: "tab delimited\ttable_name" format)
    //   loop through the used columns for that table in data model order,
    //     print the column headers
    //   loop through the rows in that table in the order in the jsonToTranslate,
    //     loop through the used columns for that table in data model order,
    //       print the column value for that row
    //         note: arrays turn into :val1:val2 string,
    //               any string in an array that contains a ":" gets double quotes around it
    //   and print the table separator if there is another table.
    for(let orderedTableIdx in tablePositionMap)
    {
      let tableName = Object.getOwnPropertyNames(tablePositionMap[orderedTableIdx]);
      if(jsonToTranslate[tableName])
      {
        console.log(`In JSON: ${tableName}`);
        for(let orderedColIdx in tablePositionMap[orderedTableIdx][tableName])
        {
          console.log(`Ordered columns: ${tablePositionMap[orderedTableIdx][tableName][orderedColIdx]}`);
        }
      }
    }
  }

  testValidityOfTablesAndColumns(jsonToTranslate){
      for (let newTableName in jsonToTranslate) {//this gets the string name of the property 'table'
        let newTableObject = this.model.tables[newTableName];
        if(!newTableObject)
        {
          this._appendError(`table ${newTableName} is not defined in magic data model version ${this.version}`);
          continue;
        }

        //Test to make sure the column names are valid for a given model
        let columnErrorTracker = {};//keep track of invalid columns we have seen
        for (let jsonRowIdx in jsonToTranslate[newTableName]) {
          let jsonColumnNames = Object.getOwnPropertyNames(jsonToTranslate[newTableName][jsonRowIdx]);
          for (let jsonColumnNameIdx in jsonColumnNames) {
            let modelColumn = this.model.tables[newTableName].columns[jsonColumnNames[jsonColumnNameIdx]];
            if (!modelColumn || modelColumn == undefined) {
              if (!columnErrorTracker[jsonColumnNames[jsonColumnNameIdx]] ) {//only add an error if we don't already have an error on the same column
                this._appendError(`column ${jsonColumnNames[jsonColumnNameIdx]} in table ${newTableName} is not defined in magic data model version ${this.version}`);
                //Keeping track of column we have seen for this table. I really only care about the property here, not the value.
                columnErrorTracker[jsonColumnNames[jsonColumnNameIdx]] = 'placeholder';
                          }
                          continue;
                      }
                  }
              }
          }
      }

  /*
    Builds an array of table objects ordered by the "position" property of the data model tables.
   sort tables using the "position" property of the data model .
   The array has the following structure:
   [
      {tableName1: [column1, column2,...]},
      {tableName2: [column3, column4,...]},,
      .
      .
      .
   ]
   */
  orderTablesAndColumns(jsonToTranslate)
  {
      let tableNames = Object.getOwnPropertyNames(this.model['tables']);
      let tablePositionMap = [];
      for(let tableIdx in tableNames)
      {
        let properTablePositionIdx = this.model['tables'][tableNames[tableIdx]].position - 1;
        tablePositionMap[properTablePositionIdx] = {[tableNames[tableIdx]]:[]};

        let columnPositionMap = [];
        let columnNames = Object.getOwnPropertyNames(this.model['tables'][tableNames[tableIdx]].columns);
        for(let columnIdx in columnNames)
        {
          let columnName = columnNames[columnIdx];
          let columnPosition = this.model['tables'][tableNames[tableIdx]]['columns'][columnName].position;
          columnPositionMap[columnPosition] = columnName;
        }
        //assign the properly ordered array of columns to the object keyed via the current table
        tablePositionMap[properTablePositionIdx][tableNames[tableIdx]] = columnPositionMap;
      }

      return tablePositionMap;
  }
}
