import {_} from 'lodash';
import Runner from '../../core/actions/runner.js';
import GetContributionVersion from './get_contribution_version';

import {default as magicVersions} from '../configs/magic_versions';
import {default as magicDataModels} from '../configs/data_models/data_models';

/**This class upgrades the json data from its current model to the next model if a newer model is available
 * It can optionally upgrade the model several times until it reaches a maxVersion*/
export default class extends Runner {

  constructor({LocalState}) {
    super('UPGRADE_CONTRIBUTION', {LocalState});
    this.VersionGetter = new GetContributionVersion({LocalState});
  }

  // Upgrade a contribution to its next MagIC data model version.
  // The input JSON can be assumed to be the entire contribution.
  // The upgrade happens in two stages: map and then reduce.
  // This could probably be parallelized easily, but for now speed is less important that accuracy for this operation.
  upgrade(oldJSON, maxVersion) {

    // Update table and column names all the way to the new data model version.
    let newJSON = this._map(oldJSON, maxVersion);

    // Merge rows that can be combined because they are orthogonal (null or identical in each column).
    newJSON = this._reduce(newJSON);

    return newJSON;
  }

  // Update table and column names to the new data model version.
  _map(oldJSON, maxVersion){
    let newJSON = {};

    // Retrieve the data model version used in the json
    const oldVersion = this.VersionGetter.getVersion(oldJSON);
    if (!oldVersion) return newJSON;

    // Check that the maximum MagIC data model version to upgrade to is valid (maxVersion is in magicVersions).
    if (maxVersion && _.indexOf(magicVersions, maxVersion) === -1) {
      let strVersions = magicVersions.map((str) => { return `"${str}"`; }).join(', ');
      this._appendError(`The second argument (maximum MagIC data model version), "${maxVersion}", is invalid. ` +
        `Expected one of: ${strVersions}.`);
      return newJSON;
    }

    // Check if the maxVersion has been reached.
    if (oldVersion === maxVersion) return newJSON;

    // Check that there is a newer MagIC data model to use.
    if (_.indexOf(magicVersions, oldVersion) === magicVersions.length - 1) return newJSON;
    const newVersion = magicVersions[_.indexOf(magicVersions, oldVersion) + 1];
    
    // Retrieve the data models
    const oldModel = magicDataModels[oldVersion];
    const newModel = magicDataModels[newVersion];

    let upgradeMap = this._getUpgradeMap(newModel);

    // RCJM: using this for a quick sanity check of the upgrade map
    /*for (let t in upgradeMap)
      for (let c in upgradeMap[t])
        if (upgradeMap[t][c].length > 1 && t != 'pmag_results' && t != 'rmag_results')
          console.log(t, c, upgradeMap[t][c]);*/

    for (let oldJSONTable in oldJSON) {

      // Used to avoid duplicate errors or warnings for each row.
      let undefinedColumnErrors = {};
      let deletedColumnWarnings = {};

      // Check that the old table is defined in the old data model.
      if (!oldModel['tables'][oldJSONTable]) {
        this._appendError(`Table "${oldJSONTable}" is not defined in magic data model version ${oldVersion}.`);
        continue;
      }

      for (let oldJSONRowIdx in oldJSON[oldJSONTable]) {//loop through all rows in table old table
        let oldJSONRow = oldJSON[oldJSONTable][oldJSONRowIdx];
        let newRow = {};
        let newJSONTable;

        // Handle special cases when upgrading from 2.5 to 3.0
        if (newVersion == '3.0') {

          // Map data into the correct parent table
          if (oldJSONTable == 'pmag_results' || oldJSONTable == 'rmag_results') {
            if (oldRowData['er_synthetic_names'] != null && !oldRowData['er_synthetic_names'].match(/.+:.+/))
              newJSONTable = 'specimens';
            else if (oldRowData['er_specimen_names'] != null && !oldRowData['er_specimen_names'].match(/.+:.+/))
              newJSONTable = 'specimens';
            else if (oldRowData['er_sample_names']!= null && !oldRowData['er_specimen_names'].match(/.+:.+/))
              newJSONTable = 'samples';
            else if (oldRowData['er_site_names']!= null && !oldRowData['er_site_names'].match(/.+:.+/))
              newJSONTable = 'sites';
            else if (oldRowData['er_location_names']!= null && !oldRowData['er_location_names'].match(/.+:.+/))
              newJSONTable = 'locations';
            else
              this._appendWarning(`Row ${oldJSONRowIdx} in table "${oldJSONTable}" was deleted in MagIC data model version ${newVersion} since it is a contribution-level result.`);
            continue;
          }
          
        }

        for (let oldJSONColumn in oldJSONRow) {//loop through all columns in row

          // Check that the old column is defined in the old data model.
          if (!oldModel['tables'][oldJSONTable]['columns'][oldJSONColumn]) {
            if (!undefinedColumnErrors[oldJSONColumn])
              this._appendError(`Column "${oldJSONColumn}" in table "${oldJSONTable}" is not defined in magic data model ${oldVersion}.`);
            undefinedColumnErrors[oldJSONColumn] = true;
            continue;
          }

          // Check that the old table and column are defined in the new data model.
          if (!upgradeMap[oldJSONTable] || !upgradeMap[oldJSONTable][oldJSONColumn]) {
            if (!deletedColumnWarnings[oldJSONColumn])
              this._appendWarning(`Column "${oldJSONColumn}" in table "${oldJSONTable}" was deleted in MagIC data model version ${newVersion}.`);
            deletedColumnWarnings[oldJSONColumn] = true;
            continue;
          }

          // Cycle through the upgrade info outlining the potential locations in the new model for a single piece of data
          // Go through the location(s) to move ONE field of data from the old model to the proper table in the new
console.log(oldJSONTable, oldJSONColumn, upgradeMap[oldJSONTable][oldJSONColumn]);
          for (let upgradeToTableAndColumnIdx in upgradeMap[oldJSONTable][oldJSONColumn]) {

            let upgradeColumn = upgradeMap[oldJSONTable][oldJSONColumn][upgradeToTableAndColumnIdx].column;
            let upgradeTable = upgradeMap[oldJSONTable][oldJSONColumn][upgradeToTableAndColumnIdx].table;

            if (!newJSONTable || upgradeTable == newJSONTable) {

              // Create the table in the new JSON if it doesn't exist
              if (!newJSON[upgradeTable]) newJSON[upgradeTable] = [];
              console.log(`new data: ${upgradeColumn}`);
              newRow[upgradeColumn] = oldJSONRow[oldJSONColumn];

            }

          }

        }

        // Add the row to the new JSON
        newJSON[upgradeTable].push(newRow);
console.log(`json: ${JSON.stringify(newJSON)}`);
      }
    }

    // Update the data model version
    newJSON['contribution'][0]['magic_version'] = newVersion;

    // Recursively upgrade the contribution.
    return this._map(newJSON, maxVersion);

  }

  // Merge rows that can be combined because they are orthogonal (null or identical in each column).
  _reduce(oldJSON) {

    let newJSON = {};

    // RCJM: GGG, replace this to pass the tests.
    newJSON = oldJSON;

    return newJSON;
  }

  //newModel is the "more recent" of the two models involved in the upgrade process. It is the model we are upgrading the JSON object to.
  //The upgradeMap is "forward looking" from the perspective of the "less recent" (or "current") model in that it shows the path from the less recent model to the "more recent".
  _getUpgradeMap(newModel) {

    let upgradeMap = {};

    for (let newTableName in newModel.tables) {//this gets the STRING name of the property into 'table'
      let newTableObject = newModel.tables[newTableName];//this on the other hand, gets the whole table object

      for (let newColumnName in newTableObject.columns)
      {
        let currentColumnObj = newTableObject.columns[newColumnName];
        let prevColArray = currentColumnObj.previous_columns;

        if((prevColArray == undefined) || prevColArray.length==0) {
          continue;
        }

          if (prevColArray &&
              prevColArray.length === 1) {
            let previousColTableName = prevColArray[0].table;
            let previousColumnName = prevColArray[0].column;
            if(!upgradeMap[previousColTableName])                     upgradeMap[previousColTableName] = {};
            if(!upgradeMap[previousColTableName][previousColumnName]) upgradeMap[previousColTableName][previousColumnName] = [];

            //TEST FOR TABLE/COLUMNS WITH NO CHANGES
            if(newColumnName == previousColumnName && newTableName == previousColTableName){
              upgradeMap[previousColTableName][previousColumnName].push({table:newTableName,column:newColumnName});
              //console.log(`NO CHANGE in table and column with no change detected. table:${newTableName}. Column name = ${newColumnName}` );
              continue;
            }

            //TEST FOR RENAMED TABLES OR COLUMNS
            if ((newTableName != previousColTableName) || (newColumnName != previousColumnName)) {
              //console.log(`RENAMED table or column detected. Previous table name : ${previousColTableName} New table: ${newTableName}.` );
              //console.log(`Previous column name = ${previousColumnName}. New column name = ${newColumnName}` );
              upgradeMap[previousColTableName][previousColumnName].push({table:newTableName,column:newColumnName});
              continue;
            }
          }

          //TEST FOR MERGED COLUMNS...If there is more than one previous column, that indicates a MERGE to this version
           if (prevColArray && (prevColArray.length > 1))
          {
            for(let prevColIdx in prevColArray)
            {
              let tmpPreviousColumnName = prevColArray[prevColIdx].column;
              let tmpPreviousColTableName  = prevColArray[prevColIdx].table;

              /*if(!upgradeMap[tmpPreviousColTableName] || upgradeMap[tmpPreviousColTableName]==undefined)
                upgradeMap[tmpPreviousColTableName] = {};
              if(!upgradeMap[tmpPreviousColTableName][tmpPreviousColumnName] || upgradeMap[tmpPreviousColTableName][tmpPreviousColumnName]==undefined)
                upgradeMap[tmpPreviousColTableName][tmpPreviousColumnName] = [];

              upgradeMap[tmpPreviousColTableName][tmpPreviousColumnName].push([{table:newTableName, column:newColumnName}]);*/
              if(!upgradeMap[tmpPreviousColTableName])
                upgradeMap[tmpPreviousColTableName] = {};
              if(!upgradeMap[tmpPreviousColTableName][tmpPreviousColumnName])
                upgradeMap[tmpPreviousColTableName][tmpPreviousColumnName] = [];

              upgradeMap[tmpPreviousColTableName][tmpPreviousColumnName].push({table:newTableName, column:newColumnName});
            }
          }
      }
    }

    console.log(`Upgrade Map ${JSON.stringify(upgradeMap)}`);
    return upgradeMap;

  }
}


//CODE GRAVEYARD
/*//Here I'm beginging a solution to knowing whether or not we need to combine rows
//obviously it is not complete, and there is a lot more logic needed.
let rowKeyVal = '1';//This is obviously temporary
let upgradeCollisionKey = `${upgradeTable}${upgradeColumn}${rowKeyVal}`;
console.log(`Key ${upgradeCollisionKey}`);

console.log(`Key list: ${Object.getOwnPropertyNames(upgradeColumnCollisions)}`);
console.log(`Has key? ${upgradeColumnCollisions.hasOwnProperty(upgradeCollisionKey)}`);
if(!upgradeColumnCollisions.hasOwnProperty(upgradeCollisionKey))
  newRow[upgradeColumn] = oldJSONRow[oldJSONColumn];
else
  upgradeColumnCollisions[upgradeCollisionKey] = rowKeyVal;*/


//GGG THIS IS THE OLD SPLIT COL SOLUTION, holding onto it for a bit as i might want to copy some
/*let prevColKey = previousColTableName + previousColumnName;
 if (previousTableColumnMap.has(prevColKey)) // If we have seen this "previous column" before
 {
 console.log("SPLIT of previous column detcted: " + previousColTableName + "  " + previousColumnName);
 let newColName1 = previousTableColumnMap.get(prevColKey);
 _.set(upgradeMap[newTableName],previousColumnName,[{table:newTableName,column:newColName1},{table:newTableName,column:newColumnName}]);
 continue; //if it is a split column, it isn't any other kind of column
 }
 else {previousTableColumnMap.set(prevColKey, newColumnName);}//keep track that we have seen this previous table+column combination
 */
/*//TEST FOR RENAMED (POTENTIALLY SPLIT) COLUMNS
 if(newColumnName != previousColumnName)
 {
 //console.log(`RENAMED (potentially a split) column  detected in table ${newTableName}. Previous column name = ${previousColumnName}. New column name = ${newColumnName}` );
 tableColMapping[previousColumnName].push({table:newTableName,column:newColumnName});
 _.set(upgradeMap,previousColTableName,tableColMapping);
 }*/