import _ from 'lodash';
import Promise from 'bluebird';
import Runner from '/lib/modules/common/runner';

import {versions, models} from '/lib/configs/magic/data_models';
import {cvs} from '/lib/modules/er/controlled_vocabularies';

export default class extends Runner {

  constructor({runnerState}) {
    super({runnerState});
    this.reset();
  }

  reset() {
    super.reset();
    this.json = {};
    this.lastGetVersionResult = ''; // != undefined to trigger warnings and errors on first getVersion()
    this.validation = { errors: {}, warnings: {} };
  }

  getVersion(json) {

    let text = '';

    // Check for a valid input after defaulting to the class json property.
    if (_.isEmpty(json)) json = this.json;
    if (_.isEmpty(json)) {
      this._appendWarning('The first argument (MagIC contribution in JSON format) is empty.');
      return { version: undefined, isGuessed: true };
    }
    this.json = json;

    // Look for the MagIC data model version.
    let version, isGuessed;
    if(!json || !json['contribution']) {
      isGuessed = true;
      version = this._guessVersion();
      if (version !== this.lastGetVersionResult)
        this._appendWarning('Failed to find the "contribution" table.');
      if (version !== undefined && version !== this.lastGetVersionResult)
        this._appendWarning(`Guessed that the contribution is using MagIC Data Model version ${version}.`);
    }
    if (json['contribution']) {
      if (json['contribution'].length !== 1) {
        version = undefined;
        if (version !== this.lastGetVersionResult)
          this._appendError('The "contribution" table does not have exactly one row.');
      }
      else {
        if (json['contribution'][0]['data_model_version']) {
          isGuessed = false;
          version = json['contribution'][0]['data_model_version'];
        }
        else if (json['contribution'][0]['magic_version']) {
          isGuessed = false;
          version = json['contribution'][0]['magic_version'];
        }
        else {
          isGuessed = true;
          version = this._guessVersion();
          if (version !== this.lastGetVersionResult)
            this._appendWarning('The "contribution" table does not include the "data_model_version" column.');
          if (version !== undefined && version !== this.lastGetVersionResult)
            this._appendWarning(`Guessed that the contribution is using MagIC Data Model version ${version}.`);
        }
      }
    }

    // Check that the MagIC data model version is valid (oldVersion is in versions).
    if (_.indexOf(versions, version) === -1) {
      const strVersions = versions.map((str) => { return `"${str}"`; }).join(", ");
      version = undefined;
      if (version !== this.lastGetVersionResult)
        this._appendError(`MagIC Data Model version ${version} is invalid. Expected one of: ${strVersions}.`);
    }

    // Warn if the contribution appears to be using a different version now.
    if (this.lastGetVersionResult !== '' &&
        version !== undefined &&
        version !== this.lastGetVersionResult)
      this._appendWarning(`The contribution now appears to be using MagIC Data Model version ${version}.`);

    // Don't keep reporting version errors and warnings next time this is run.
    this.lastGetVersionResult = version;

    return { version: version, isGuessed: isGuessed };

  }

  _guessVersion() {

    // Iterate through the data model versions starting with the newest one.
    for (let version of _.clone(versions).reverse()) {

      // If there is a table name that isn't in the this version's data model, skip to the next older version.
      if (_.difference(_.keys(this.json), _.keys(models[version].tables)).length > 0)
        continue;

      // Iterate through each table in the JSON.
      for (let table of _.keys(this.json)) {

        // Make a list of columns used in this table.
        let columns = (this.json[table].columns ?
            this.json[table].columns :
          _.reduce(this.json[table], (columns, row) => { return _.union(_.keys(row), columns); }, [])
        );

        // If there is a column name that isn't in the this version's data model, skip to the next older version.
        if (_.difference(columns, _.keys(models[version].tables[table].columns)) > 0)
          continue;

      }

      return version;

    }

    return undefined;

  }

  validatePromise(json) {

    //console.log('validatePromise');
      
    if (!json) {
      this._appendError(`Invalid contribution.`);
      return Promise.resolve();
    }

    this.reset();
    this.json = json;

    return this._validateTables();

  }

  _addValidationError(table, column, message, row) {
    this.validation.errors[table]                  = this.validation.errors[table]                  || {};
    this.validation.errors[table][column]          = this.validation.errors[table][column]          || {};
    this.validation.errors[table][column][message] = this.validation.errors[table][column][message] || {};
    if (row !== undefined) this.validation.errors[table][column][message][row] = true;
  }

  _validateTables() {

    //console.log('_validateTables');

    let sortedTables = _.sortBy(_.keys(models[_.last(versions)].tables), (table) => {
      return models[_.last(versions)].tables[table].position;
    });

    return Promise.each(sortedTables, (table, tableIdx) => {

      return new Promise((resolve) => {

        if (this.json[table]) {
          //console.log('validating', table);
          let model = models[_.last(versions)].tables[table];
          if (table === 'measurements') {
            _.keys(model.columns).forEach(column => {
              this._validateColumn(table, column, this.json[table].columns);
            });
            
            if (!this.validation.errors[table])
              this.json[table].rows.forEach((row, idxRow) => {
                row.forEach((val, colIdx) => {
                  if (colIdx >= this.json[table].columns.length) {
                    this._addValidationError(table, column, 
                      `The ${table} table row has more values than the column headers.`, idxRow+1);
                  } else {
                    this._validateColumn(table, this.json[table].columns[colIdx], this.json[table].columns, idxRow+1, val);
                  }
                });
              });
          } else {
            this.json[table].forEach((row, idxRow) => {
              _.keys(model.columns).forEach(column => {
                this._validateColumn(table, column, _.keys(row), idxRow+1, row[column]);
              });
            });
          } 
        }

        resolve();

      });
    });
  }

  _validateColumn(table, column, columns, row, val) {
    let model = models[_.last(versions)].tables[table];

    if (_.includes(model.columns[column].validations, "required()") && 
        !_.includes(columns, column) && (val === undefined || !_.isEmpty(val)))
      this._addValidationError(table, column, 
        `The ${table} table is missing required column "${column}".`, row);

    let vals = [val];
    if (val && model.columns[column].type === 'List')
      vals = _.filter(val.split(':'), _.isEmpty);

    vals.forEach(v => {
      if (v === undefined || v === null || v === '') return;

      let cv;
      if (_.find(model.columns[column].validations, x => { return cv = x.match(/^cv\("(.*)"\)$/); }) &&
          !_.find(cvs[cv[1]].items, { item: v }))
        this._addValidationError(table, column, 
          `The ${table} table column "${column}" value "${v}" is not in the "${cvs[cv[1]].label}" controlled vocabulary.`, row);

      let min;
      if (_.find(model.columns[column].validations, x => { return min = x.match(/^min\(([^"]*)\)$/); }) &&
        parseFloat(v) < parseFloat(min[1]))
        this._addValidationError(table, column, 
          `The ${table} table column "${column}" value "${v}" is less than "${min[1]}".`, row);

      let max;
      if (_.find(model.columns[column].validations, x => { return max = x.match(/^max\(([^"]*)\)$/); }) &&
        parseFloat(v) > parseFloat(max[1]))
        this._addValidationError(table, column, 
          `The ${table} table column "${column}" value "${v}" is greater than "${max[1]}".`, row);
    });

  }
  
}
