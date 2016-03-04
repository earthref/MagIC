import {_} from 'lodash';
import Runner from './runner';

// Temporarily import the models from the test files. These will be in MongoDB soon.
import {default as model20} from './tests/files/data_models/2.0.js';
import {default as model21} from './tests/files/data_models/2.1.js';
import {default as model22} from './tests/files/data_models/2.2.js';
import {default as model23} from './tests/files/data_models/2.3.js';
import {default as model24} from './tests/files/data_models/2.4.js';
import {default as model25} from './tests/files/data_models/2.5.js';
import {default as model30} from './tests/files/data_models/3.0.js';
const dataModels = {
  '2.0': model20,
  '2.1': model21,
  '2.2': model22,
  '2.3': model23,
  '2.4': model24,
  '2.5': model25,
  '3.0': model30
};
const magicVersions = ['2.0', '2.1', '2.2', '2.3', '2.4', '2.5', '3.0'];

export default class extends Runner {

  constructor({LocalState}) {
    super('UPGRADE_CONTRIBUTION', {LocalState});
  }

  upgrade(jsonOld, maxVersion) {

    // Initialize the upgrading state.
    this.table = undefined;
    this.rowNumber = undefined;
    this.column = undefined;

    // Check for a valid input.
    if (_.isEmpty(jsonOld)) {
      this._appendWarning('The first argument (MagIC contribution in JSON format) is empty.');
      return jsonOld;
    }

    // Check that the maximum MagIC data model version to upgrade to is valid (maxVersion is in magicVersions).
    if (maxVersion && _.indexOf(magicVersions, maxVersion) === -1) {
      let strVersions = magicVersions.map((str) => { return `"${str}"`; }).join(', ');
      this._appendError(`The second argument (maximum MagIC data model version), "${maxVersion}", is invalid. ` +
                        `Expected one of: ${strVersions}.`);
      return jsonOld;
    }

    //console.log("JSON file in parser: " + JSON.stringify(jsonOld));

    // Look for the current MagIC data model version.
    let currentVersion;
    if(!jsonOld || !jsonOld['contribution']) {
      this._appendError('Failed to find the "contribution" table.');
      return jsonOld;
    }
    if (jsonOld['contribution']) {
      if (jsonOld['contribution'].length !== 1) {
        this._appendError('The "contribution" table does not have exactly one row.');
        return jsonOld;
      }
      if (!jsonOld['contribution'][0]['magic_version']) {
        this._appendError('The "contribution" table does not include the "magic_version" column.');
        return jsonOld;
      }
      this.contributionTable = 'contribution';
      currentVersion = jsonOld['contribution'][0]['magic_version'];
    }

    // Check that the current MagIC data model version is valid (currentVersion is in magicVersions).
    if (_.indexOf(magicVersions, currentVersion) === -1) {
      let strVersions = magicVersions.map((str) => { return `"${str}"`; }).join(", ");
      this._appendError(`MagIC data model version ${currentVersion} is invalid. Expected one of: ${strVersions}.`);
      return jsonOld;
    }

    //console.log(`Current Version: ${currentVersion}`);

    // Check that there is a newer MagIC data model to use or that the maxVersion has been reached.
    if (_.indexOf(magicVersions, currentVersion) === magicVersions.length - 1) {
      //this._appendWarning(`This contribution is already at the latest MagIC data model version ${currentVersion}.`);
      return jsonOld;
    }

    // Upgrade the contribution.
    let jsonNew = {};
    for (let table in jsonOld) {
      jsonNew[table] = [];
      for (let row of jsonOld[table]) {
        let newRow = {};
        for (let column in row) {
          if (table === 'contribution' && column === 'magic_version') {
            newRow[column] = magicVersions[_.indexOf(magicVersions, currentVersion) + 1];
          } else {
            newRow[column] = row[column];
          }
        }
        jsonNew[table].push(newRow);
      }
    }

    //GGG REMOVE THIS LOOP ONCE TRANSPLANTED
    let dataModel = dataModels['2.3'];
    let currentDataModel = dataModel.magic_version;
    console.log('Outlining changes for data model: :' + currentDataModel)
    for(let table in dataModel.tables)
    {
      alertOnNewTableName = false;
      console.log(`--------------Ver ${currentDataModel} changes for table: ${table} ---------------`);
      for (let column in dataModel.tables[table].columns) {

        //TEST FOR NEW COLUMNS
        if (currentDataModel != '2.0')//All columns in 2.0 are considered "new"
        {
          /*The schemas aren't consistent when it comes to next and previous columns being absent. Sometimes there is an
          empty array signifying no next/previous columns (v.2.2 - v2.4), other times there is an array with a single empty
          object (v 2.0, 2.1) and still other times the "previous" or "next" column properries don't exist at all (v2.5)*/
          let previousColArray = dataModel.tables[table].columns[column]['previous_columns']
          if  ((previousColArray.length == 0) ||
              (!hasOwnProperty.call(previousColArray[0], 'column')))
              console.log(`**** NEW column: " ${column}  Ver: ${currentDataModel}, Table: ${table}  ****`);
        }

        //TEST FOR DELETED COLUMNS
          let nextColArray = dataModel.tables[table].columns[column]['next_columns'];

          if  ((nextColArray == undefined) ||
              (nextColArray.length == 0) ||
              (!(hasOwnProperty.call(nextColArray[0], 'column')))){
            console.log(`**** DELETED column: " ${column}  Ver: ${currentDataModel}, Table: ${table}  ****`);
          }

        else {
          let currentColName = column;
          let nextColumnName = dataModel.tables[table].columns[column]['next_columns'][0]['column'];
          //console.log("Next Column: " + nextColumnName);
          if (!(currentColName === nextColumnName)) {
            console.log(`**** Column name change detected, Ver: ${currentDataModel}, Table: ${table}  ****`);
            console.log(`Current: ${currentColName}`);
            console.log(`Next:    ${nextColumnName}`);
          }
        }
      }
    }
    //console.log("old: ", jsonOld);
    //console.log("new: ", jsonNew);

    // Recursively upgrade the contribution.
   return this.upgrade(jsonNew, maxVersion);

  }

}
