import {_} from 'lodash';
import Runner from '../../core/actions/runner.js';
import GetContributionVersion from './get_contribution_version';

import {default as magicVersions} from '../configs/magic_versions';
import {default as magicDataModels} from '../configs/data_models/data_models';

/**This class upgrades the json data from its current model to the next model if a newer model is available
 * It can optionally upgrade the model several times until it reaches a versionMax*/
export default class extends Runner {

  constructor({LocalState}) {
    super('UPGRADE_CONTRIBUTION', {LocalState});
    this.VersionGetter = new GetContributionVersion({LocalState});
  }

  // Upgrade a contribution to its next MagIC data model version.
  // The input JSON can be assumed to be the entire contribution.
  // The upgrade happens in two stages: map and then reduce.
  // This could probably be parallelized easily, but for now speed is less important that accuracy for this operation.
  upgrade(jsonOld, versionMax) {

    // Update table and column names all the way to the new data model version.
    let json = this._map(jsonOld, versionMax);

    // Merge rows that can be combined because they are orthogonal (null or identical in each column).
    if (this.errors().length === 0)
      json = this._reduce(json);

    return json;
  }

  // Map table and column names to the new data model version.
  // The input JSON may be mutated during the mapping.
  // Outputs a copy of the JSON in the new data model version.
  _map(jsonOld, versionMax){
    let jsonNew = {};

    // Retrieve the data model version used in the json
    const versionOld = this.VersionGetter.getVersion(jsonOld);
    if (!versionOld) return jsonOld;

    // Check that the maximum MagIC data model version to upgrade to is valid (versionMax is in magicVersions).
    if (versionMax && _.indexOf(magicVersions, versionMax) === -1) {
      let strVersions = magicVersions.map((str) => { return `"${str}"`; }).join(', ');
      this._appendError(`The second argument (maximum MagIC data model version), "${versionMax}", is invalid. ` +
        `Expected one of: ${strVersions}.`);
      return jsonOld;
    }

    // Check if the versionMax has been reached.
    if (versionOld === versionMax) return jsonOld;

    // Check that there is a newer MagIC data model to use.
    if (_.indexOf(magicVersions, versionOld) === magicVersions.length - 1) return jsonOld;
    const versionNew = magicVersions[_.indexOf(magicVersions, versionOld) + 1];

    // Retrieve the data models
    const modelOld = magicDataModels[versionOld];
    const modelNew = magicDataModels[versionNew];

    // Handle special cases when upgrading from 2.5 to 3.0 tables
    if (versionNew === '3.0') {

      // Unofficially add a mapping from er_expeditions to locations because the 2.5 model
      // doesn't include a foreign key.
      modelOld['tables']['er_expeditions']['columns']['er_location_name'] = {};
      modelNew['tables']['locations']['columns']['location']['previous_columns'].push(
        {'table':'er_expeditions','column':'er_location_name'}
      );

    }

    let upgradeMap = this._getUpgradeMap(modelNew);

    // RCJM: using this for a quick sanity check of the upgrade map
    /*for (let t in upgradeMap)
      for (let c in upgradeMap[t])
        if (upgradeMap[t][c].length > 1 && t != 'pmag_results' && t != 'rmag_results')
          console.log(t, c, upgradeMap[t][c]);*/

    for (let jsonTableOld in jsonOld) {

      // Used to avoid duplicate errors or warnings for each row.
      let undefinedTableColumnErrors = {};
      let deletedTableColumnWarnings = {};

      // Handle special cases when upgrading from 2.5 to 3.0 tables
      if (versionNew === '3.0') {

        // Don't warn about these tables being deleted when upgrading from 2.5 to 3.0
        if (jsonTableOld === 'magic_methods' ||
            jsonTableOld === 'er_citations' ||
            jsonTableOld === 'er_mailinglist' ||
            jsonTableOld === 'magic_calibrations')
          continue;

        if (jsonTableOld === 'er_expeditions') {
          let expeditionsNew = [];
          for (let expeditionRowIdx in jsonOld['er_expeditions']) {
            let expeditionRow = jsonOld['er_expeditions'][expeditionRowIdx];

            // If a list of locations for this expedition is provided, duplicate the
            // expedition row for each location and add the er_location_name column
            if (expeditionRow['expedition_location']) {
              let expeditionLocations = expeditionRow['expedition_location']
              expeditionLocations = expeditionLocations.replace(/(^:|:$)/g,'');
              expeditionLocations = expeditionLocations.split(':');
              for (let expeditionLocation of expeditionLocations) {
                expeditionRow['er_location_name'] = expeditionLocation;
                expeditionsNew.push(_.cloneDeep(expeditionRow));
              }
            }

            // Otherwise, duplicate the expedition row for each location and add the
            // er_location name column
            else {
              for (let locationRowIdx in jsonOld['er_locations']) {
                let locationRow = jsonOld['er_locations'][locationRowIdx];
                expeditionRow['er_location_name'] = locationRow['er_location_name'];
                expeditionsNew.push(_.cloneDeep(expeditionRow));
              }
            }

          }
          jsonOld['er_expeditions'] = expeditionsNew;
        }

      }

      // Check that the old table is defined in the old data model.
      if (!modelOld['tables'][jsonTableOld]) {
        this._appendError(`Table "${jsonTableOld}" is not defined in magic data model version ${versionOld}.`);
        continue;
      }

      // Loop through all rows in table old table
      let rowNumber = 0;
      for (let jsonRowOldIdx in jsonOld[jsonTableOld]) {
        let jsonRowOld = jsonOld[jsonTableOld][jsonRowOldIdx];
        let tableRowsNew = {};
        let joinTable;
        let relativeIntensityNormalization;
        rowNumber++;

        // Handle special cases when upgrading from 2.5 to 3.0 rows
        if (versionNew === '3.0') {

          // Map data into the correct parent table
          if (jsonTableOld === 'pmag_results' || jsonTableOld === 'rmag_results') {
            if (jsonRowOld['er_synthetic_names'] != null && !jsonRowOld['er_synthetic_names'].match(/.+:.+/))
              joinTable = 'specimens';
            else if (jsonRowOld['er_specimen_names'] != null && !jsonRowOld['er_specimen_names'].match(/.+:.+/))
              joinTable = 'specimens';
            else if (jsonRowOld['er_sample_names']!= null && !jsonRowOld['er_sample_names'].match(/.+:.+/))
              joinTable = 'samples';
            else if (jsonRowOld['er_site_names']!= null && !jsonRowOld['er_site_names'].match(/.+:.+/))
              joinTable = 'sites';
            else if (jsonRowOld['er_location_names']!= null && !jsonRowOld['er_location_names'].match(/.+:.+/))
              joinTable = 'locations';
            else
              this._appendWarning(`Row ${rowNumber} in table "${jsonTableOld}" was deleted in ` +
                                  `MagIC data model version ${versionNew} since it is a contribution-level result.`);
          }

          // Record the type of relative intensity normalization and remove the associated method code
          if (jsonRowOld['magic_method_codes']) {

            // Make a list of relative intensity normalizations in the method codes
            let methodCodes = jsonRowOld['magic_method_codes'].replace(/(^:|:$)/g,'').split(/:/);
            methodCodes = methodCodes.map((methodCode) => { return methodCode.toUpperCase(); });
            let relativeIntensityNormalizations = _.intersection(methodCodes, ['IE-ARM', 'IE-IRM', 'IE-CHI']);

            // Remove the relative intensity normalization method code
            jsonRowOld['magic_method_codes'] = _.without(methodCodes, 'IE-ARM', 'IE-IRM', 'IE-CHI').join(':');

            // Record the type of relative intensity normalization
            if (relativeIntensityNormalizations.length > 1)
              this._appendError(`Row ${rowNumber} in table "${jsonTableOld}" includes more than one ` +
                `type of relative intensity normalization in the method codes.`);
            else if (relativeIntensityNormalizations.length === 1)
              relativeIntensityNormalization = relativeIntensityNormalizations[0].replace(/IE-/,'');
            else
              relativeIntensityNormalization = undefined;
            // relativeIntensityNormalization = undefined or 'ARM' or 'IRM' or 'CHI'

          }

          // Add the geoid to the method codes
          if (jsonRowOld['location_geoid']) {
            if (!jsonRowOld['magic_method_codes']) jsonRowOld['magic_method_codes'] = '';
            jsonRowOld['magic_method_codes'] += ':GE-' + jsonRowOld['location_geoid'];
          }
          if (jsonRowOld['site_location_geoid']) {
            if (!jsonRowOld['magic_method_codes']) jsonRowOld['magic_method_codes'] = '';
            jsonRowOld['magic_method_codes'] += ':GE-' + jsonRowOld['site_location_geoid'];
          }
          if (jsonRowOld['sample_location_geoid']) {
            if (!jsonRowOld['magic_method_codes']) jsonRowOld['magic_method_codes'] = '';
            jsonRowOld['magic_method_codes'] += ':GE-' + jsonRowOld['sample_location_geoid'];
          }

        }

        for (let jsonColumnOld in jsonRowOld) {//loop through all columns in row

          // Handle special cases when upgrading from 2.5 to 3.0 columns
          if (versionNew === '3.0') {

            // Don't warn about these columns being deleted when upgrading from 2.5 to 3.0
            if (!upgradeMap[jsonTableOld][jsonColumnOld] && (
                jsonColumnOld === 'er_location_name'    ||
                jsonColumnOld === 'er_site_name'        ||
                jsonColumnOld === 'er_sample_name'      ||
                jsonColumnOld === 'er_specimen_name'    ||
                jsonColumnOld === 'expedition_location' ||
                jsonColumnOld === 'location_geoid'      ||
                jsonColumnOld === 'site_location_geoid' ||
                jsonColumnOld === 'sample_location_geoid'))
              continue;

            // Combine external_database_names/ids into a dictionary
            if (jsonColumnOld === 'external_database_names') {
              let dbNames = jsonRowOld['external_database_names'].replace(/(^:|:$)/g,'').split(/:/);
              let dbIDs = jsonRowOld['external_database_ids'].replace(/(^:|:$)/g,'').split(/:/);
              let dict = [];
              for (let dbIdx in dbNames) {
                dict.push(dbNames[dbIdx] + '[' + dbIDs[dbIdx] + ']');
              }
              jsonRowOld['external_database_names'] = dict.join(':');
            }
            if (jsonColumnOld === 'external_database_ids') continue;

          }

          // Check that the old column is defined in the old data model.
          if (!modelOld['tables'][jsonTableOld]['columns'][jsonColumnOld]) {
            if (!undefinedTableColumnErrors[jsonTableOld + '.' + jsonColumnOld])
              this._appendError(`Column "${jsonColumnOld}" in table "${jsonTableOld}" ` +
                                `is not defined in magic data model ${versionOld}.`);
            undefinedTableColumnErrors[jsonTableOld + '.' + jsonColumnOld] = true;
            continue;
          }

          // Check that the old table and column are defined in the new data model.
          if (!upgradeMap[jsonTableOld] || !upgradeMap[jsonTableOld][jsonColumnOld]) {

            if (!deletedTableColumnWarnings[jsonTableOld + '.' + jsonColumnOld])
              this._appendWarning(`Column "${jsonColumnOld}" in table "${jsonTableOld}" ` +
                                  `was deleted in MagIC data model version ${versionNew}.`);
            deletedTableColumnWarnings[jsonTableOld + '.' + jsonColumnOld] = true;
            continue;
          }

          // Cycle through the upgrade info outlining the potential locations in the new model for a single piece of data
          // Go through the location(s) to move ONE field of data from the old model to the proper table in the new
          for (let upgradeToTableAndColumnIdx in upgradeMap[jsonTableOld][jsonColumnOld]) {

            let jsonTableNew  = upgradeMap[jsonTableOld][jsonColumnOld][upgradeToTableAndColumnIdx].table;
            let jsonColumnNew = upgradeMap[jsonTableOld][jsonColumnOld][upgradeToTableAndColumnIdx].column;
            let jsonValueNew  = jsonRowOld[jsonColumnOld];

            if (!joinTable || joinTable === jsonTableNew) {

              // Handle special cases when upgrading from 2.5 to 3.0 columns
              if (versionNew === '3.0') {

                if (jsonColumnNew.match(/^int_rel/) && relativeIntensityNormalization) {
                  jsonColumnNew = jsonColumnNew.replace(/^int_rel/, 'int_rel_' + relativeIntensityNormalization);
                  console.log(jsonColumnNew);
                }

              }

              // Normalize lists for easier comparison in _reduce() by sorting them
              if (modelNew['tables'][jsonTableNew]['columns'][jsonColumnNew].type === 'List' ||
                  modelNew['tables'][jsonTableNew]['columns'][jsonColumnNew].type === 'Dictionary') {
                jsonValueNew = jsonValueNew.replace(/(^:|:$)/g, '').split(/:/);
                jsonValueNew = _(jsonValueNew).sortBy().sortedUniq().join(':');
              }

              // Create the table in the new JSON if it doesn't exist
              if (!tableRowsNew[jsonTableNew]) tableRowsNew[jsonTableNew] = {};

              // Add the column value to the new JSON
              tableRowsNew[jsonTableNew][jsonColumnNew] = jsonValueNew;

            }

          }

        }

        // Add the row(s) to the new JSON
        for (let table in tableRowsNew) {
          if (!jsonNew[table]) jsonNew[table] = [];
          jsonNew[table].push(tableRowsNew[table]);
        }
      }
    }

    // Update the data model version
    jsonNew['contribution'][0]['magic_version'] = versionNew;

    // Recursively upgrade the contribution.
    return this._map(jsonNew, versionMax);

  }

  // Merge rows that can be combined because they are orthogonal (null or identical in each column).
  _reduce(json) {

    const keys = {
      contribution: ['magic_version'],
      locations: ['location'],
      sites: ['site'],
      samples: ['sample'],
      specimens: ['specimen'],
      measurements: ['number', 'experiment', 'specimen'],
      criteria: ['criterion', 'table_column'],
      ages: ['location', 'site', 'sample', 'specimen'],
      images: ['location', 'site', 'sample', 'specimen']
    };

    // For each table in the contribution
    for (let table in json) {
//if (table !== 'ages') continue;
//console.log("merging:", table);

      json[table] = _.sortBy(json[table], keys[table]);
//console.log("table", json[table]);
      if (table != 'measurements') {
        for (let rowIdx = 0; rowIdx < json[table].length; rowIdx++) {
//if (rowIdx > 10) break;
          if (json[table][rowIdx] === undefined) continue;
//console.log("merging", rowIdx, json[table][rowIdx]);
          const rowKeys = (keys[table] ? _.pick(json[table][rowIdx], keys[table]) : json[table][rowIdx]);
          for (let rowToMergeIdx = rowIdx + 1; rowToMergeIdx < json[table].length; rowToMergeIdx++) {
//if (rowToMergeIdx > 10) break;
//console.log("can merge?", rowToMergeIdx, json[table][rowToMergeIdx], 'has?', rowKeys);
            if (json[table][rowToMergeIdx] === undefined) continue;
            if (_.isMatch(json[table][rowToMergeIdx], rowKeys)) {
              const rowCopy = _.cloneDeep(json[table][rowIdx]);
//console.log("before", json[table][rowToMergeIdx], '->', rowCopy);
              _.merge(rowCopy, json[table][rowToMergeIdx]);
//console.log("after", rowCopy);
              if (_.isMatch(rowCopy, json[table][rowIdx])) {
                json[table][rowIdx] = rowCopy;
                json[table][rowToMergeIdx] = undefined;
//console.log("merged", rowIdx, "with", rowToMergeIdx);
              }
            } else {
//if (table === 'ages') console.log("done with", rowIdx, "of", json[table].length, ", stopped at",rowToMergeIdx);
              break;
            }
          }
        }
        _.remove(json[table], _.isEmpty);
      }
    }

    return json;
  }

  //modelNew is the "more recent" of the two models involved in the upgrade process. It is the model we are upgrading the JSON object to.
  //The upgradeMap is "forward looking" from the perspective of the "less recent" (or "current") model in that it shows the path from the less recent model to the "more recent".
  _getUpgradeMap(modelNew) {

    let upgradeMap = {};

    for (let newTableName in modelNew.tables) {//this gets the STRING name of the property into 'table'
      let newTableObject = modelNew.tables[newTableName];//this on the other hand, gets the whole table object

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

//console.log(`Upgrade Map ${JSON.stringify(upgradeMap)}`);
    return upgradeMap;

  }
}
