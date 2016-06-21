import {_} from 'lodash';
import Runner from '../../er/actions/runner';
import ParseContribution from './parse_contribution';

import {default as versions} from '../configs/magic_versions';
import {default as models} from '../configs/data_models/data_models';

// This class upgrades the json data from its current model to the newest model if a newer model is available.
export default class extends Runner {

  constructor({LocalState}) {
    super('UPGRADE_CONTRIBUTION', {LocalState});
    this.parser = new ParseContribution({LocalState});
    this.reset();

    // Make a list of unique composite keys for each table.
    this.mergeKeys = {
      locations: ['location'],
      sites: ['site', 'location'],
      samples: ['sample', 'site'],
      specimens: ['specimen', 'sample'],
      criteria: ['criterion', 'table_column'],
      ages: ['location', 'site', 'sample', 'specimen'],
      images: ['location', 'site', 'sample', 'specimen']
    };

  }

  reset() {
    super.reset();
    this.jsonOld = undefined;
    this.versionOld = undefined;
    this.modelOld = undefined;
    this.jsonNew = {};
    this.versionNew = undefined;
    this.modelNew = undefined;
    this.json = undefined;
    this.tableRowNumber = 0;
    this.progress = 0;
    this.syntheticSpecimenNames = {};
    this.newMethodCodes = {};
    this.undefinedTableColumnErrors = {};
    this.deletedTableColumnWarnings = {};
    this.upgradeMap = {};
  }
  
  // Upgrade a contribution to its next MagIC data model version.
  // The input JSON can be assumed to be the entire contribution.
  // The upgrade happens in two stages: map column names and then merge rows.
  upgrade(jsonOld, nRows, progressHandler) {

    this.reset();
    this.jsonOld = jsonOld;

    // Update table and column names all the way to the new data model version.
    this._map();
    this.progress = 50;

    // Merge rows that can be combined because they are orthogonal (null or identical in each column).
    if (this.errors().length === 0)
      this._merge();

    this.progress = 100;
    return this.json;
  }

  // Map table and column names to the new data model version.
  // The input JSON may be mutated during the mapping.
  // Outputs a copy of the JSON in the new data model version.
  _map(){

    // Retrieve the data model version used in the json.
    this.versionOld = this.parser.getVersion(this.jsonOld);
    if (!this.versionOld) return;

    // Check if the newest model has been reached.
    if (this.versionOld === _.last(versions)) {
      this.json = this.jsonNew;
      return this.json;
    }

    // Check that there is a newer MagIC data model to use.
    if (_.indexOf(versions, this.versionOld) === versions.length - 1) {
      this.json = this.jsonNew;
      return this.json;
    }
    this.versionNew = versions[_.indexOf(versions, this.versionOld) + 1];

    // Retrieve the data models and create the upgrade map.
    this.modelOld = models[this.versionOld];
    this.modelNew = models[this.versionNew];
    this.upgradeMap = this.getUpgradeMap(this.modelNew);

    // Handle special cases when upgrading from 2.5 to 3.0 tables.
    if (this.versionNew === '3.0') {

      // Unofficially add a mapping from er_expeditions to locations because the 2.5 model
      // doesn't include a foreign key.
      this.modelOld['tables']['er_expeditions']['columns']['er_location_name'] = {};
      this.modelNew['tables']['locations']['columns']['location']['previous_columns'].push(
        {'table':'er_expeditions','column':'er_location_name'}
      );

      // Favor synthetic names over specimen names for natural synthetics.
      if (this.jsonOld['er_specimens'] && this.jsonOld['er_synthetics']) {
        for (let jsonRowOldIdx in this.jsonOld['er_synthetics']) {
          let syntheticRow = this.jsonOld['er_synthetics'][jsonRowOldIdx];
          if (syntheticRow['er_specimen_name'] && syntheticRow['er_synthetic_name']) {
            this.syntheticSpecimenNames[syntheticRow['er_specimen_name']] = syntheticRow['er_synthetic_name'];
          }
        }
      }

      // Define new method code names
      this.newMethodCodes['ST-BC'] = 'ST-C';
      this.newMethodCodes['ST-BC-Q1'] = 'ST-BCQ-1';
      this.newMethodCodes['ST-BC-Q2'] = 'ST-BCQ-2';
      this.newMethodCodes['ST-BC-Q3'] = 'ST-BCQ-3';
      this.newMethodCodes['ST-BC-Q4'] = 'ST-BCQ-4';
      this.newMethodCodes['ST-BC-Q5'] = 'ST-BCQ-5';
      this.newMethodCodes['ST-CT'] = 'ST-G';
      this.newMethodCodes['ST-IC'] = 'ST-C-I';
      this.newMethodCodes['ST-IFC'] = 'ST-G-IF';
      this.newMethodCodes['ST-VV-Q1'] = 'ST-VVQ-1';
      this.newMethodCodes['ST-VV-Q2'] = 'ST-VVQ-2';
      this.newMethodCodes['ST-VV-Q3'] = 'ST-VVQ-3';
      this.newMethodCodes['ST-VV-Q4'] = 'ST-VVQ-4';
      this.newMethodCodes['ST-VV-Q5'] = 'ST-VVQ-5';
      this.newMethodCodes['ST-VV-Q6'] = 'ST-VVQ-6';
      this.newMethodCodes['ST-VV-Q7'] = 'ST-VVQ-7';

    }

    // RCJM: using this for a quick sanity check of the upgrade map
    /*for (let t in this.upgradeMap)
     for (let c in this.upgradeMap[t])
     if (this.upgradeMap[t][c].length > 1 && t != 'pmag_results' && t != 'rmag_results')
     console.log(t, c, this.upgradeMap[t][c]);*/

    for (let jsonTableOld in this.jsonOld) {

      // Handle special cases when upgrading from 2.5 to 3.0 tables.
      if (this.versionNew === '3.0') {

        // Don't warn about these tables being deleted when upgrading from 2.5 to 3.0.
        if (jsonTableOld === 'magic_methods' ||
          jsonTableOld === 'er_citations' ||
          jsonTableOld === 'er_mailinglist' ||
          jsonTableOld === 'magic_calibrations')
          continue;

        if (jsonTableOld === 'er_expeditions') {
          let expeditionsNew = [];
          for (let expeditionRowIdx in this.jsonOld['er_expeditions']) {
            let expeditionRow = this.jsonOld['er_expeditions'][expeditionRowIdx];

            // If a list of locations for this expedition is provided, duplicate the
            // expedition row for each location and add the er_location_name column.
            if (expeditionRow['expedition_location']) {
              let expeditionLocations = expeditionRow['expedition_location']
              expeditionLocations = expeditionLocations.replace(/(^:|:$)/g, '');
              expeditionLocations = expeditionLocations.split(':');
              for (let expeditionLocation of expeditionLocations) {
                expeditionRow['er_location_name'] = expeditionLocation;
                expeditionsNew.push(_.cloneDeep(expeditionRow));
              }
            }

            // Otherwise, duplicate the expedition row for each location and add the er_location name column.
            else {
              for (let locationRowIdx in this.jsonOld['er_locations']) {
                let locationRow = this.jsonOld['er_locations'][locationRowIdx];
                expeditionRow['er_location_name'] = locationRow['er_location_name'];
                expeditionsNew.push(_.cloneDeep(expeditionRow));
              }
            }

          }
          this.jsonOld['er_expeditions'] = expeditionsNew;
        }

      }

      // Check that the old table is defined in the old data model.
      if (!this.modelOld['tables'][jsonTableOld]) {
        this._appendError(`Table "${jsonTableOld}" is not defined in MagIC Data Model version ${this.versionOld}.`);
        continue;
      }

    //}

    //for (let jsonTableOld in this.jsonOld) {

      // Loop through all rows in table old table.
      this.tableRowNumber = 0;
      for (let jsonRowOldIdx in this.jsonOld[jsonTableOld]) {
        this._mapTableRow(jsonTableOld, jsonRowOldIdx);
      }
    }

    // Update the data model version.
    this.jsonNew['contribution'][0]['magic_version'] = this.versionNew;

    // Recursively upgrade the contribution.
    this.jsonOld = this.jsonNew;
    return this._map();

  }

  _mapTableRow(jsonTableOld, jsonRowOldIdx) {

    let tableRowsNew = {};
    let joinTable;
    let relativeIntensityNormalization;

    // Make a copy of the row since it might be mutated during the column mapping
    let jsonRowOld = _.cloneDeep(this.jsonOld[jsonTableOld][jsonRowOldIdx]);

    // Handle special cases when upgrading from 2.5 to 3.0 rows.
    if (this.versionNew === '3.0') {

      // Map data into the correct parent table.
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
          this._appendWarning(`Row ${(parseInt(jsonRowOldIdx)+1)} in table "${jsonTableOld}" was deleted in ` +
            `MagIC data model version ${this.versionNew} since it is a contribution-level result.`);
      }

      // Record the type of relative intensity normalization and remove the associated method code.
      if (jsonRowOld['magic_method_codes']) {

        // Make a list of method codes and update their names if necessary.
        let methodCodes = jsonRowOld['magic_method_codes'].replace(/(^:|:$)/g,'').split(/:/);
        methodCodes = methodCodes.map((methodCode) => {
          let mc = methodCode.toUpperCase();
          if (this.newMethodCodes[mc]) mc = this.newMethodCodes[mc];
          return mc;
        });

        // Make a list of relative intensity normalizations in the method codes.
        let relativeIntensityNormalizations = _.intersection(methodCodes, ['IE-ARM', 'IE-IRM', 'IE-CHI']);

        // Remove the relative intensity normalization method code.
        jsonRowOld['magic_method_codes'] = _.without(methodCodes, 'IE-ARM', 'IE-IRM', 'IE-CHI').join(':');

        // Record the type of relative intensity normalization.
        if (relativeIntensityNormalizations.length > 1)
          this._appendError(`Row ${(parseInt(jsonRowOldIdx)+1)} in table "${jsonTableOld}" includes more than one ` +
            `type of relative intensity normalization in the method codes.`);
        else if (relativeIntensityNormalizations.length === 1)
          relativeIntensityNormalization = relativeIntensityNormalizations[0].replace(/IE-/,'');
        else
          relativeIntensityNormalization = undefined;
        // Now relativeIntensityNormalization is undefined or 'ARM' or 'IRM' or 'CHI'.

      }

      // Add the geoid to the method codes.
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

      // Favor synthetic names over specimen names for natural synthetics.
      if (jsonTableOld === 'er_specimens' &&
        this.syntheticSpecimenNames[jsonRowOld['er_specimen_name']]) {
        if (jsonRowOld['er_specimen_alternatives']) {
          let alternatives = jsonRowOld['er_specimen_alternatives'].replace(/(^:|:$)/g,'').split(/:/);
          alternatives.append(jsonRowOld['er_specimen_name']);
          jsonRowOld['er_specimen_alternatives'] = _.uniq(alternatives).join(':');
        } else {
          jsonRowOld['er_specimen_alternatives'] = jsonRowOld['er_specimen_name'];
        }
        jsonRowOld['er_specimen_name'] = this.syntheticSpecimenNames[jsonRowOld['er_specimen_name']];
      } else if (this.syntheticSpecimenNames[jsonRowOld['er_specimen_name']]) {
        jsonRowOld['er_specimen_name'] = this.syntheticSpecimenNames[jsonRowOld['er_specimen_name']];
      } else if (jsonRowOld['er_specimen_names']) {
        let specimens = jsonRowOld['er_specimen_names'].replace(/(^:|:$)/g, '').split(/:/);
        for (let specimenIdx in specimens) {
          if (this.syntheticSpecimenNames[specimens[specimenIdx]]) {
            specimens[specimenIdx] = this.syntheticSpecimenNames[specimens[specimenIdx]];
          }
        }
        jsonRowOld['er_specimen_names'] = _.uniq(specimens).join(':');
      }

    }

    for (let jsonColumnOld in jsonRowOld) {

      // Handle special cases when upgrading from 2.5 to 3.0 columns.
      if (this.versionNew === '3.0') {

        // Don't warn about these columns being deleted when upgrading from 2.5 to 3.0.
        if (!this.upgradeMap[jsonTableOld][jsonColumnOld] && (
          jsonColumnOld === 'er_location_name'      ||
          jsonColumnOld === 'er_site_name'          ||
          jsonColumnOld === 'er_sample_name'        ||
          jsonColumnOld === 'er_specimen_name'      ||
          jsonColumnOld === 'expedition_location'   ||
          jsonColumnOld === 'location_geoid'        ||
          jsonColumnOld === 'site_location_geoid'   ||
          jsonColumnOld === 'sample_location_geoid' ||
          jsonTableOld === 'er_citations' ||
          jsonTableOld === 'er_mailinglist' ||
          (jsonTableOld === 'rmag_results' && jsonColumnOld === 'er_location_name') ||
          jsonTableOld === 'magic_methods'))
          continue;

        // Combine external_database_names/ids into a dictionary.
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

        // Convert the columns in pmag_criteria into rows in the criteria table.
        if (jsonTableOld === 'pmag_criteria') {

          // Create a criteria row if processing a criterion column and not metadata.
          if (jsonColumnOld !== 'pmag_criteria_code' &&
            jsonColumnOld !== 'criteria_definition' &&
            jsonColumnOld !== 'criteria_description' &&
            jsonColumnOld !== 'er_citation_names') {

            // Check that the pmag_criteria column is defined in the data model criteria map.
            if (!this.modelNew['criteria_map'][jsonColumnOld]) {
              if (!this.undefinedTableColumnErrors[jsonTableOld + '.' + jsonColumnOld])
                this._appendError(`Column "${jsonColumnOld}" in table "${jsonTableOld}" ` +
                  `is not defined in criteria definition of the MagIC Data Model version ${this.versionNew}.`);
              this.undefinedTableColumnErrors[jsonTableOld + '.' + jsonColumnOld] = true;
              continue;
            }

            // Create the criteria row.
            let criteriaRow = {};
            criteriaRow['table_column'] = this.modelNew['criteria_map'][jsonColumnOld]['table_column'];
            criteriaRow['criterion_operation'] = this.modelNew['criteria_map'][jsonColumnOld]['criterion_operation'];
            criteriaRow['criterion_value'] = jsonRowOld[jsonColumnOld];
            if (jsonRowOld['pmag_criteria_code'])
              criteriaRow['criterion'] = jsonRowOld['pmag_criteria_code'];
            if (jsonRowOld['criteria_definition'] || jsonRowOld['criteria_description'])
              criteriaRow['description'] =
                (jsonRowOld['criteria_definition'] ? jsonRowOld['criteria_definition'] : '') +
                (jsonRowOld['criteria_definition'] && jsonRowOld['criteria_description'] ? ', ' : '') +
                (jsonRowOld['criteria_description'] ? jsonRowOld['criteria_description'] : '');
            if (jsonRowOld['er_citation_names'])
              criteriaRow['citations'] = jsonRowOld['er_citation_names'];

            // Create the table in the new JSON if it doesn't exist.
            if (!tableRowsNew['criteria']) tableRowsNew['criteria'] = [];

            // Add the criterion row to the criteria table.
            tableRowsNew['criteria'].push(criteriaRow);

          }
          continue;
        }
      }

      // Check that the old column is defined in the old data model.
      if (!this.modelOld['tables'][jsonTableOld]['columns'][jsonColumnOld]) {
        if (!this.undefinedTableColumnErrors[jsonTableOld + '.' + jsonColumnOld])
          this._appendError(`Column "${jsonColumnOld}" in table "${jsonTableOld}" ` +
            `is not defined in MagIC Data Model version ${this.versionOld}.`);
        this.undefinedTableColumnErrors[jsonTableOld + '.' + jsonColumnOld] = true;
        continue;
      }

      // Check that the old table and column are defined in the new data model.
      if (!this.upgradeMap[jsonTableOld] || !this.upgradeMap[jsonTableOld][jsonColumnOld]) {
        if (!this.deletedTableColumnWarnings[jsonTableOld + '.' + jsonColumnOld])
          this._appendWarning(`Column "${jsonColumnOld}" in table "${jsonTableOld}" ` +
            `was deleted in MagIC Data Model version ${this.versionNew}.`);
        this.deletedTableColumnWarnings[jsonTableOld + '.' + jsonColumnOld] = true;
        continue;
      }

      // Cycle through the upgrade info outlining the potential locations in the new model for a single piece of data
      // Go through the location(s) to move ONE field of data from the old model to the proper table in the new
      for (let upgradeToTableAndColumnIdx in this.upgradeMap[jsonTableOld][jsonColumnOld]) {

        let jsonTableNew  = this.upgradeMap[jsonTableOld][jsonColumnOld][upgradeToTableAndColumnIdx].table;
        let jsonColumnNew = this.upgradeMap[jsonTableOld][jsonColumnOld][upgradeToTableAndColumnIdx].column;
        let jsonValueNew  = jsonRowOld[jsonColumnOld];

        if (!joinTable || joinTable === jsonTableNew) {

          // Handle special cases when upgrading from 2.5 to 3.0 columns.
          if (this.versionNew === '3.0') {

            // Move the normalized relative intensities into separate columns.
            if (jsonColumnNew.match(/^int_rel/) && relativeIntensityNormalization)
              jsonColumnNew = jsonColumnNew.replace(/^int_rel/, 'int_rel_' + relativeIntensityNormalization);

          }

          // Normalize lists for easier comparison in _reduce() by sorting them.
          if (this.modelNew['tables'][jsonTableNew]['columns'][jsonColumnNew].type === 'List' ||
            this.modelNew['tables'][jsonTableNew]['columns'][jsonColumnNew].type === 'Dictionary') {
            jsonValueNew = jsonValueNew.replace(/(^:|:$)/g, '').split(/:/);
            jsonValueNew = _(jsonValueNew).sortBy().sortedUniq().join(':');
          }

          // Create the table in the new JSON if it doesn't exist.
          if (!tableRowsNew[jsonTableNew]) {
            tableRowsNew[jsonTableNew] = [];
            tableRowsNew[jsonTableNew][0] = {};
          }

          // Add the column value to the new JSON.
          tableRowsNew[jsonTableNew][0][jsonColumnNew] = jsonValueNew;

        }
      }
    }

    // Add the row(s) to the new JSON.
    for (let table in tableRowsNew) {
      if (!this.jsonNew[table]) this.jsonNew[table] = [];
      this.jsonNew[table] = this.jsonNew[table].concat(tableRowsNew[table]);
    }

  }

  // Merge rows that can be combined because they are orthogonal (null or identical in each column).
  _merge() {

    // For each table in the contribution:
    for (let table in this.json) {

      // Skip tables that don't have rows to merge.
      if (table === 'measurements' || table === 'contribution') continue;

      // Sort the table by the unique composite keys.
      this.json[table] = _.sortBy(this.json[table], this.mergeKeys[table]);
      
      // For each row in the sorted table:
      for (let rowIdx = 0; rowIdx < this.json[table].length; rowIdx++) {

        // Skip rows that are empty (e.g. ones that have already been merged).
        if (this.json[table][rowIdx] === undefined) continue;

        this._mergeTableRow(table, rowIdx);

      }

      // Remove all of the empty merged rows from the table.
      _.remove(this.json[table], _.isEmpty);

    }

    return;
  }

  _mergeTableRow(table, rowIdx) {

    // Make a list of the columns of the composite keys that are defined in the current row.
    const rowKeys = (this.mergeKeys[table] ? _.pick(this.json[table][rowIdx], this.mergeKeys[table]) : this.json[table][rowIdx]);

    // For each following row that is a candidate for merging:
    for (let rowCandidateIdx = rowIdx + 1; rowCandidateIdx < this.json[table].length; rowCandidateIdx++) {

      // Skip rows that are empty (e.g. ones that have already been merged).
      if (this.json[table][rowCandidateIdx] === undefined) continue;

      // Stop merging if the candidate row has doesn't share composite key values with the current row.
      // Since the table is sorted, this guarantees that no following rows are candidates for merging.
      if (!_.isMatch(this.json[table][rowCandidateIdx], rowKeys)) break;

      // Make a copy of the current row to test merging with the candidate row.
      const rowMerged = _.cloneDeep(this.json[table][rowIdx]);

      // Merge the candidate row for merging with the current row.
      _.merge(rowMerged, this.json[table][rowCandidateIdx]);

      // If the merge didn't mutate any of the existing values in the current row:
      if (_.isMatch(rowMerged, this.json[table][rowIdx])) {

        // Replace the current row with the merged row.
        this.json[table][rowIdx] = rowMerged;

        // Empty the candidate row so that it is skipped when the current row reaches it without altering the
        // number or rows in the table.
        this.json[table][rowCandidateIdx] = undefined;

      }
    }

  }

  //this.modelNew is the "more recent" of the two models involved in the upgrade process. It is the model we are upgrading the JSON object to.
  //The upgradeMap is "forward looking" from the perspective of the "less recent" (or "current") model in that it shows the path from the less recent model to the "more recent".
  getUpgradeMap(model) {

    let upgradeMap = {};

    for (let newTableName in model.tables) {//this gets the STRING name of the property into 'table'
      let newTableObject = model.tables[newTableName];//this on the other hand, gets the whole table object

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
