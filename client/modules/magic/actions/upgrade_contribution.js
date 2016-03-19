import {_} from 'lodash';
import Runner from './runner.js';

import {magicVersions} from '../configs/magic_versions.js';
import {magicDataModels} from './tests/files/data_models/data_models.js';


/**This class upgrades the json data from its current model to the next model if a newer model is available
 * It can optionally upgrade the model several times until it reaches a maxVersion*/
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

    // Look for the old MagIC data model version.
    let oldVersion;
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
      oldVersion = jsonOld['contribution'][0]['magic_version'];
    }

    // Check that the old MagIC data model version is valid (oldVersion is in magicVersions).
    if (_.indexOf(magicVersions, oldVersion) === -1) {
      const strVersions = magicVersions.map((str) => { return `"${str}"`; }).join(", ");
      this._appendError(`MagIC data model version ${oldVersion} is invalid. Expected one of: ${strVersions}.`);
      return jsonOld;
    }

    // Check if the maxVersion has been reached.
    if (oldVersion === maxVersion) return jsonOld;

    // Check that there is a newer MagIC data model to use.
    if (_.indexOf(magicVersions, oldVersion) === magicVersions.length - 1) return jsonOld;
    const newVersion = magicVersions[_.indexOf(magicVersions, oldVersion) + 1];
    const oldModel = magicDataModels[oldVersion];
    const newModel = magicDataModels[newVersion];

    // Upgrade the contribution.
    const upgradeMap = this.getUpgradeMap(newModel);
    let jsonNew = {};
    for (let table in jsonOld) {

      // Check that the old table is defined in the old data model.
      if (!oldModel['tables'][table]) {
        this._appendError(`Table "${table}" is not defined in magic data model version ${oldVersion}.`);
        continue;
      }

      if (!jsonNew[table]) jsonNew[table] = [];

      for (let row of jsonOld[table]) {
        let newRow = {};
        for (let column in row) {

          // Check that the old column is defined in the old data model.
          if (!oldModel['tables'][table][column]) {
            this._appendError(`Column "${column}" in table "${table}" is not defined in magic data model ${oldVersion}.`);
            continue;
          }

          // Check that the old table and column are defined in the new data model.
          if (!upgradeMap[table] || !upgradeMap[table][column]) {
            this._appendWarning(`Column "${column}" in table "${table}" was deleted in MagIC data model version ${newVersion}.`);
            continue;
          }

          // Upgrade the version number
          if (table === 'contribution' && column === 'magic_version') {
            newRow[column] = newVersion;
            continue;
          }

          // TODO: this doesn't handle changes in table names properly yet
          for (let newTableColumn in upgradeMap[table][column]) {
            //if (!jsonNew[newTableColumn.table]) jsonNew[newTableColumn.table] = [];
            newRow[newTableColumn.column] = row[column];
          }

        }

        // TODO: this doesn't handle changes in table names properly yet
        jsonNew[table].push(newRow);

      }
    }

    console.log("old: ", jsonOld);
    console.log("new: ", jsonNew);

    /*GGG I feel this "clever" recursion trick causes more problems than it is worth
    It causes prblems with testing, as the upgrade process to  create JSON new is not complete,
    and the result is passing a trash version of jsonNew back into the system, accuring more errors
    and warnings and causing exceptions to be throw. I don't see the problem with just calling the function
    as many times as needed in a loop.*/
    return jsonNew;
    // Recursively upgrade the contribution.
   //return this.upgrade(jsonNew, maxVersion);

  }

  //newModel is the "more recent" of the two models involved in the upgrade process. It is the model we are upgrading the JSON object to.
  //The upgradeMap is "forward looking" from perspecitve of the "less recent" (or "current") model in that it shows the path from the less recent model to the "more recent".
  getUpgradeMap(newModel) {

    let upgradeMap = {};

    for (let newTableName in newModel.tables) {//this gets the STRING name of the property into 'table'
      let newTableObject = newModel.tables[newTableName];//this on the other hand, gets the whole table object

      //let previousTableColumnMap =  new Map();
      let mapping = {};
      for (let newColumn in newTableObject.columns)
      {
        let currentColumnsObj = newTableObject.columns;
        let currentColumnObj = currentColumnsObj[newColumn];
        let prevColArray = currentColumnObj.previous_columns;

        //this tests for the situation where we don't have "previous" information, which means we have a new/
        if((currentColumnObj.previous_columns == undefined) || currentColumnObj.previous_columns.length==0)
          continue;

          //TEST FOR TABLES AND RENAMED COLUMNS
          if (prevColArray &&
              prevColArray.length === 1) {
            let previousColTableName = prevColArray[0].table;
            let previousColumnName = prevColArray[0].column;
            let tableColMapping = {[previousColumnName]:[]};
            
            if ((newTableName != previousColTableName) || newColumn != previousColumnName) {
              console.log("RENAMED table/column detected in table " +newTableName);

              tableColMapping[previousColumnName].push({table:newTableName,column:newColumn});

              _.set(upgradeMap,previousColTableName,tableColMapping);
            }
          }

          //TEST FOR MERGED COLUMNS...If there is more than one previous column, that indicates a MERGE to this version
           if (prevColArray && (prevColArray.length > 1))
          {
            upgradeMap[newTableName] = {};
            console.log("MERGED column detected in table " +newTableName);

            for(let prevColIdx in prevColArray)
            {
              let tmpPreviousColTableName = prevColArray[prevColIdx].table;
              let tmpPreviousColumnName = prevColArray[prevColIdx].column;//:${tmpPreviousColumnName}
              upgradeMap[newTableName][tmpPreviousColumnName] = [{table:newTableName, column:newColumn}];
            }
          }
      }
    }
    return upgradeMap;
  }
}



//GGG THIS IS THE OLD SPLIT COL SOLUTION, holding onto it for a bit as i might want to copy some
/*let prevColKey = previousColTableName + previousColumnName;
 if (previousTableColumnMap.has(prevColKey)) // If we have seen this "previous column" before
 {
 console.log("SPLIT of previous column detcted: " + previousColTableName + "  " + previousColumnName);
 let newColName1 = previousTableColumnMap.get(prevColKey);
 _.set(upgradeMap[newTableName],previousColumnName,[{table:newTableName,column:newColName1},{table:newTableName,column:newColumn}]);
 continue; //if it is a split column, it isn't any other kind of column
 }
 else {previousTableColumnMap.set(prevColKey, newColumn);}//keep track that we have seen this previous table+column combination
 */