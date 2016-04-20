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
      this.contributionTable = 'contribution';//GGG not sure what this is here for, seems to be unused
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

    // UPGRADE THE CONTRIBUTION
    let upgradeMap = this.getUpgradeMap(newModel);
    let jsonNew = {};
    for (let oldTable in jsonOld) {

      // Check that the old table is defined in the old data model.
      if (!oldModel['tables'][oldTable]) {
        this._appendError(`Table "${oldTable}" is not defined in magic data model version ${oldVersion}.`);
        continue;
      }

      if (!jsonNew[oldTable]) jsonNew[oldTable] = [];

      for (let oldRow of jsonOld[oldTable]) {

        let newRow = {};
        for (let oldColumn in oldRow) {

          // Check that the old column is defined in the old data model.
          if (!oldModel['tables'][oldTable]['columns'][oldColumn]) {
            console.log(`VERSION? 1`);
            this._appendError(`Column "${oldColumn}" in table "${oldTable}" is not defined in magic data model ${oldVersion}.`);
            continue;
          }

          // Check that the old table and column are defined in the new data model.
          if (!upgradeMap[oldTable] || !upgradeMap[oldTable][oldColumn]) {
            console.log(`VERSION? 2`);
            this._appendWarning(`Column "${oldColumn}" in table "${oldTable}" was deleted in MagIC data model version ${newVersion}.`);
            continue;
          }
          console.log(`VERSION? ${oldTable}: ${oldColumn}: ${newVersion}`);

          // Upgrade the version number
          if (oldTable === 'contribution' && oldColumn === 'magic_version') {

            newRow[oldColumn] = newVersion;
            continue;
          }

          // TODO: this doesn't handle changes in table names properly yet
          for (let newTableColumn in upgradeMap[oldTable][oldColumn]) {
            //if (!jsonNew[newTableColumn.table]) jsonNew[newTableColumn.table] = [];
            newRow[newTableColumn.column] = oldRow[oldColumn];
          }
        }

        // TODO: this doesn't handle changes in table names properly yet
        jsonNew[oldTable].push(newRow);

      }
    }

    console.log("old: ", JSON.stringify(jsonOld, null, 1));
//    console.log("old: ", jsonOld);
    console.log("new: ", JSON.stringify(jsonNew, null, 1));

    /*GGG Reintroduce recursion when we are building reasonable upgraded versions.*/
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
//console.log(`TABLE: ${newTableName}`);
      let mappingArray = [];
      for (let newColumnName in newTableObject.columns)
      {
        //let currentColumnsObj = newTableObject.columns;
        let currentColumnObj = newTableObject.columns[newColumnName];
        let prevColArray = currentColumnObj.previous_columns;

        if((prevColArray == undefined) || prevColArray.length==0) {
          continue;
        }


          if (prevColArray &&
              prevColArray.length === 1) {
            let previousColTableName = prevColArray[0].table;
            let previousColumnName = prevColArray[0].column;
            let tableColMapping = {[previousColumnName]:mappingArray};

            //console.log(JSON.stringify(tableColMapping));

            //TEST FOR TABLE/COLUMNS WITH NO CHANGES
            if(newColumnName == previousColumnName && newTableName == previousColTableName){

              tableColMapping[previousColumnName].push({table:newTableName,column:newColumnName});
              _.set(upgradeMap,previousColTableName,tableColMapping);
              //console.log(`NO CHANGE in table and column with no change detected. table:${newTableName}. Column name = ${newColumnName}` );
              continue;
            }

            //TEST FOR RENAMED TABLES OR COLUMNS
            if ((newTableName != previousColTableName) || (newColumnName != previousColumnName)) {
              //console.log(`RENAMED table or column detected. Previous table name : ${previousColTableName} New table: ${newTableName}.` );
              //console.log(`Previous column name = ${previousColumnName}. New column name = ${newColumnName}` );
              tableColMapping[previousColumnName].push({table:newTableName,column:newColumnName});
              _.set(upgradeMap,previousColTableName,tableColMapping);
              continue;
            }

            /*//TEST FOR RENAMED (POTENTIALLY SPLIT) COLUMNS
            if(newColumnName != previousColumnName)
            {
              //console.log(`RENAMED (potentially a split) column  detected in table ${newTableName}. Previous column name = ${previousColumnName}. New column name = ${newColumnName}` );
              tableColMapping[previousColumnName].push({table:newTableName,column:newColumnName});
              _.set(upgradeMap,previousColTableName,tableColMapping);
            }*/
          }

          //TEST FOR MERGED COLUMNS...If there is more than one previous column, that indicates a MERGE to this version
           if (prevColArray && (prevColArray.length > 1))
          {
            upgradeMap[newTableName] = {};
           //console.log("MERGED column detected in table " +newTableName);

            for(let prevColIdx in prevColArray)
            {
              let tmpPreviousColTableName = prevColArray[prevColIdx].table;
              let tmpPreviousColumnName = prevColArray[prevColIdx].column;//:${tmpPreviousColumnName}
              upgradeMap[newTableName][tmpPreviousColumnName] = [{table:newTableName, column:newColumnName}];
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