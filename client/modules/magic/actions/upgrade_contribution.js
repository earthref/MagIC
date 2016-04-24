import {_} from 'lodash';
import Runner from './runner.js';

import {default as magicVersions} from '../configs/magic_versions';
import {default as magicDataModels} from '../configs/data_models/data_models';


/**This class upgrades the json data from its current model to the next model if a newer model is available
 * It can optionally upgrade the model several times until it reaches a maxVersion*/
export default class extends Runner {

  constructor({LocalState}) {
    super('UPGRADE_CONTRIBUTION', {LocalState});
    this.jsonOld;
    this.maxVersion;
    this.jsonNew;
  }
  
  upgrade(jsonOld, maxVersion) {
    // Initialize the upgrading state.
    this.jsonOld = jsonOld;
    this.jsonNew = undefined;
    this.maxVersion = maxVersion;
    this.table = undefined;
    this.column = undefined;

    //**********BASIC VALIDATION************
    // Check for a valid input.
    if (_.isEmpty(this.jsonOld)) {
      this._appendWarning('The first argument (MagIC contribution in JSON format) is empty.');
      return this.jsonOld;
    }

    // Check that the maximum MagIC data model version to upgrade to is valid (maxVersion is in magicVersions).
    if (this.maxVersion && _.indexOf(magicVersions, this.maxVersion) === -1) {
      let strVersions = magicVersions.map((str) => { return `"${str}"`; }).join(', ');
      this._appendError(`The second argument (maximum MagIC data model version), "${this.maxVersion}", is invalid. ` +
                        `Expected one of: ${strVersions}.`);
      return this.jsonOld;
    }

    // Look for the old MagIC data model version.
    let oldVersion;
    if(!this.jsonOld || !this.jsonOld['contribution']) {
      this._appendError('Failed to find the "contribution" table.');
      return this.jsonOld;
    }
    if (this.jsonOld['contribution']) {
      if (this.jsonOld['contribution'].length !== 1) {
        this._appendError('The "contribution" table does not have exactly one row.');
        return this.jsonOld;
      }
      if (!this.jsonOld['contribution'][0]['magic_version']) {
        this._appendError('The "contribution" table does not include the "magic_version" column.');
        return this.jsonOld;
      }
      this.contributionTable = 'contribution';//GGG not sure what this is here for, seems to be unused
      oldVersion = this.jsonOld['contribution'][0]['magic_version'];
    }

    // Check that the old MagIC data model version is valid (oldVersion is in magicVersions).
    if (_.indexOf(magicVersions, oldVersion) === -1) {
      const strVersions = magicVersions.map((str) => { return `"${str}"`; }).join(", ");
      this._appendError(`MagIC data model version ${oldVersion} is invalid. Expected one of: ${strVersions}.`);
      return this.jsonOld;
    }

    // Check if the maxVersion has been reached.
    if (oldVersion === this.maxVersion) return this.jsonOld;

    // Check that there is a newer MagIC data model to use.
    if (_.indexOf(magicVersions, oldVersion) === magicVersions.length - 1) return this.jsonOld;
    const newVersion = magicVersions[_.indexOf(magicVersions, oldVersion) + 1];
    const oldModel = magicDataModels[oldVersion];
    const newModel = magicDataModels[newVersion];


    // ********** UPGRADE THE CONTRIBUTION ********
    this.jsonNew = this.createNewJSON(newModel, oldModel, oldVersion, newVersion);

    /*GGG Reintroduce recursion when we are building reasonable upgraded versions.*/
    return this.jsonNew;
    // Recursively upgrade the contribution.
    //return this.upgrade(this.jsonNew, this.maxVersion);
  }

  createNewJSON(newModel, oldModel, oldVersion, newVersion){

      let upgradeMap = this.getUpgradeMap(newModel);
      this.jsonNew = {};
      for (let oldJSONTable in this.jsonOld) {

        // Check that the old table is defined in the old data model.
        if (!oldModel['tables'][oldJSONTable]) {
          this._appendError(`Table "${oldJSONTable}" is not defined in magic data model version ${oldVersion}.`);
          continue;
        }

        for (let oldJSONRow of this.jsonOld[oldJSONTable]) {//loop through all rows in table
          let newRow = {};

          for (let oldJSONColumn in oldJSONRow) {//loop through all columns in row
            // Check that the old column is defined in the old data model.
            if (!oldModel['tables'][oldJSONTable]['columns'][oldJSONColumn]) {
              this._appendError(`Column "${oldJSONColumn}" in table "${oldJSONTable}" is not defined in magic data model ${oldVersion}.`);
              continue;
            }

            // Check that the old table and column are defined in the new data model.
            if (!upgradeMap[oldJSONTable] || !upgradeMap[oldJSONTable][oldJSONColumn]) {
              this._appendWarning(`Column "${oldJSONColumn}" in table "${oldJSONTable}" was deleted in MagIC data model version ${newVersion}.`);
              continue;
            }

            // Special case for upgrade the version number. I bet there is a smoother way of doing this
            //For now, it is important to set the upgradeTable here in the special case, because we do so in the general case
            var upgradeTable;
            if (oldJSONTable === 'contribution' && oldJSONColumn === 'magic_version') {
              newRow[oldJSONColumn] = newVersion;
              upgradeTable = 'contribution';

              continue;
            }

            //Cycle through the upgrade info for a given table/column to know where to place the the old model's data in the new model
            //This loop goes through the location(s) to move ONE field of data
            for (let upgradeToTableAndColumnIdx in upgradeMap[oldJSONTable][oldJSONColumn]) {
              //if (!this.jsonNew[upgradeToTableAndColumn.table]) this.jsonNew[upgradeToTableAndColumn.table] = [];
              upgradeTable = upgradeMap[oldJSONTable][oldJSONColumn][upgradeToTableAndColumnIdx].table;

              var upgradeColumn = upgradeMap[oldJSONTable][oldJSONColumn][upgradeToTableAndColumnIdx].column;
              newRow[upgradeColumn] = oldJSONRow[oldJSONColumn];
            }
          }
          if (!this.jsonNew[upgradeTable]) this.jsonNew[upgradeTable] = [];
          this.jsonNew[upgradeTable].push(newRow);
        }
      }
    return this.jsonNew;
  }


  //newModel is the "more recent" of the two models involved in the upgrade process. It is the model we are upgrading the JSON object to.
  //The upgradeMap is "forward looking" from perspecitve of the "less recent" (or "current") model in that it shows the path from the less recent model to the "more recent".
  getUpgradeMap(newModel) {

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