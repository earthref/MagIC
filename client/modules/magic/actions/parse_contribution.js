import {_} from 'lodash';
import Promise from 'bluebird';
import Runner from '../../er/actions/runner.js';
import {default as versions} from '../configs/magic_versions';

export default class extends Runner {

  constructor({LocalState}) {
    super('PARSE_CONTRIBUTION', {LocalState});
    this.reset();
  }

  reset() {
    this.json = {};
    this.version = undefined;
    this.isVersionGuessed = false;
    this.resetProgress();
  }
  
  resetProgress() {
    super.reset();
    this.lineNumber = 0;
    this.progress = 0;
  }
  
  parsePromise(text, nLines, progressHandler) {

    // Check for a valid input.
    if (!text) {
      return this._appendWarning('Contribution text is empty.');
    }
    
    // Initialize this parsing operation.
    this.table = undefined;
    this.columns = [];
    this.skipTable = false;
    this.tableLineNumber = 0;

    if (!nLines) nLines = 1;
    
    return new Promise.each(
      _.chunk(text.match(/[^\r\n]+/g), nLines),
      (lines, i, t) => {
        return new Promise((resolve) => {
          lines.forEach((line) => { this._parseLine(line); });
          this.progress = 100 * (i + 1) / t;
          if (progressHandler) progressHandler(this.progress);
          resolve();
        }).delay();
      }
    ).then(() => {
      this.version = this.getVersion();
      return this;
    });
    
  }

  parse(text) {

    // Check for a valid input.
    if (!text) {
      return this._appendWarning('Contribution text is empty.');
    }

    // Initialize this parsing operation.
    this.table = undefined;
    this.columns = [];
    this.skipTable = false;
    this.tableLineNumber = 0;

    // Split the text on line breaks.
    const lines = text.match(/[^\r\n]+/g);

    // Process the text line by line.
    lines.forEach(this._parseLine.bind(this));

    // Look for empty tables to issue a warning.
    for (let jsonTable in this.json) {
      if (this.json[jsonTable].length === 0)
        this._appendWarning(`No data values were found in the ${jsonTable} table.`);
    }

    this.version = this.getVersion();
    return this.json;

  }

  _parseLine(line) {

    // Skip empty lines.
    if (line === undefined || line === '') return;

    // Skip lines if skipping table.
    if (this.skipTable) return;

    // Record the line number.
    this.lineNumber++;
    this.tableLineNumber++;

    // If this line ends a table, initialize a new table.
    if (line.match(/^>+$/)) {
      this.table = undefined;
      this.columns = [];
      this.tableLineNumber = 0;
      this.skipTable = false;
    }

    // If this is the first line of a table, look for the table name.
    else if (this.tableLineNumber === 1) {

      // Split the table definition on the tab character.
      let tableDefinition = line.split(/\t/);

      // Check table definition has at least 2 elements in it.
      if (tableDefinition.length < 2) {
        this._appendError('Invalid table definition. Expected something like "tab[tab]measurements[new line]".');
        this.skipTable = true;
      }

      // Clean leading and trailing whitespace from each part of the table definition.
      tableDefinition = tableDefinition.map((value) => { return value.trim(); });

      // Check the column delimiter is "tab".
      if (!tableDefinition[0].match(/^tab(\s|$)/i)) {
        this._appendError(`Unrecognized column delimiter "${tableDefinition[0]}". Expected "tab".`);
        this.skipTable = true;
      }

      // Tab has been found, check for table name.
      else if (tableDefinition[1] === undefined || tableDefinition[1] === '') {
        this._appendError(`No table name following tab delimiter`);
        this.skipTable = true;
      }

      // Save the table name and add it to the JSON if necessary.
      else {
        this.table = tableDefinition[1];
        if (!this.json.hasOwnProperty(this.table))
          this.json[this.table] = [];
      }

    }

    // If this is the second line of a table, look for the column names.
    else if (this.tableLineNumber === 2) {

      // Split the column definition on the tab character.
      this.columns = line.split(/\t/);

      // Check for column names.
      if (this.columns.length === 0) {
        this._appendError('No column names found.');
        this.skipTable = true;
      }

      // Clean leading and trailing whitespace from each column name.
      this.columns = this.columns.map((value) => { return value.trim(); });

      // Check for empty column names.
      if (_.findIndex(this.columns, '') !== -1) {
        this._appendError('Empty column names are not allowed.');
        this.skipTable = true;
      }

      // Check for duplicate column names.
      if (this.columns.length !== _.uniq(this.columns).length) {
        this._appendError('Found duplicate column names.');
        this.skipTable = true;
      }

    }

    // Otherwise, parse the row.
    else {

      // Split the row values on the tab character.
      let values = line.split(/\t/);

      // Check there are enough column names.
      if (values.length > this.columns.length) {
        this._appendError('More values found than columns.');
      }

      // Append the row of values onto the table in the JSON.
      else {

        // Remove leading and trailing whitespace.
        values = values.map((value) => { return value.trim(); });

        // Combine the coluns and values into an object.
        let row = _.zipObject(this.columns.slice(0, values.length), values);

        // Remove empty values
        row = _.omitBy(row, (value, key) => { return value === ""; });

        this.json[this.table].push(row);

      }

    }

  }

  getVersion(json) {

    let text = '';
    this.isVersionGuessed = false;
    
    // Check for a valid input after defaulting to the class json property.
    if (_.isEmpty(json)) json = this.json;
    if (_.isEmpty(json)) {
      this._appendWarning('The first argument (MagIC contribution in JSON format) is empty.');
      return undefined;
    }

    // Look for the MagIC data model version.
    let version;
    if(!json || !json['contribution']) {
      //this._appendWarning('Failed to find the "contribution" table.');
      return this._guessVersion(json);
    }
    if (json['contribution']) {
      if (json['contribution'].length !== 1) {
        this._appendError('The "contribution" table does not have exactly one row.');
        return undefined;
      }
      if (!json['contribution'][0]['magic_version']) {
        //this._appendWarning('The "contribution" table does not include the "magic_version" column.');
        return this._guessVersion(json);
      }
      version = json['contribution'][0]['magic_version'];
    }

    // Check that the MagIC data model version is valid (oldVersion is in versions).
    if (_.indexOf(versions, version) === -1) {
      const strVersions = versions.map((str) => { return `"${str}"`; }).join(", ");
      this._appendError(`MagIC data model version ${version} is invalid. Expected one of: ${strVersions}.`);
      return undefined;
    }

    return version;

  }

  _guessVersion(json) {

    let version;
    this.isVersionGuessed = true;
    
    return version;

  }
  
}
