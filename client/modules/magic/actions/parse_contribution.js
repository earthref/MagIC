import {_} from 'lodash';
import Promise from 'bluebird';
import Runner from '../../er/actions/runner.js';

export default class extends Runner {

  constructor({LocalState}) {
    super('PARSE_CONTRIBUTION', {LocalState});

    // Initialize the contribution.
    this.json = {};
    this.lineNumber = 0;

  }

  parseNonBlocking(text, progressHandler) {

    // Initialize this parsing operation.
    this.table = undefined;
    this.columns = [];
    this.skipTable = false;
    this.tableLineNumber = 0;


  }

  parsePromise(text, nLines, progressHandler) {

    // Initialize this parsing operation.
    this.table = undefined;
    this.columns = [];
    this.skipTable = false;
    this.tableLineNumber = 0;

    if (!nLines) nLines = 1;

    //if (progressHandler) progressHandler = _.throttle(progressHandler, 100);

    return new Promise.each(
      _.chunk(text.match(/[^\r\n]+/g), nLines),
      (lines, i, t) => {
        //console.log(i, 'of', t, line);
        //_.defer(() => {
        return new Promise((resolve) => {
          lines.forEach((line) => { this._parseLine(line); });
          if (progressHandler) progressHandler(100 * (i + 1) / t);
          resolve();
        }).delay();
        /*return new Promise(
          (resolve) => {
            this._parseLine(line);
            resolve(this.json);
          },
          (reject) => {
            console.log('reject');
          }
        ).tap(() => {
          console.log('progress');
          if (progressHandler) progressHandler(this.progress);
        })*/
        //return this.json;
      }
    ).then(() => {
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

    if (!asyncCallback) {

      // Process the text line by line.
      lines.forEach(this._parseLine.bind(this));

      // Look for empty tables to issue a warning.
      for (let jsonTable in this.json) {
        if (this.json[jsonTable].length === 0)
          this._appendWarning(`No data values were found in the ${jsonTable} table.`);
      }

      return this.json;

    } else {

      // Process the text line by line.
      lines.forEach(_.defer(this._parseLine.bind(this)));

      _.defer((asyncCallback) => {


      });
      // Look for empty tables to issue a warning.
      for (let jsonTable in this.json) {
        if (this.json[jsonTable].length === 0)
          this._appendWarning(`No data values were found in the ${jsonTable} table.`);
      }

      return this.json;

    }

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

}
