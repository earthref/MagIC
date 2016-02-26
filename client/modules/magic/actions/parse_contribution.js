export default class {

  constructor({Meteor, LocalState}) {
    this.Meteor = Meteor;
    this.LocalState = LocalState;

    // Clear errors and warnings
    this.LocalState.set('PARSE_CONTRIBUTION_ERRORS', []);
    this.LocalState.set('PARSE_CONTRIBUTION_WARNINGS', []);

    // Initialize the contribution
    this.json = {};
    this.tableNumber = 0;
    this.lineNumber = 0;

  }

  parse(text) {

    // Check for a valid input
    if (!text) {
      return this._appendWarning('Contribution text is empty.');
    }

    // Split the text on line breaks
    const lines = text.match(/[^\r\n]+/g);
    let table = undefined;
    let columns = [];

    // Process the text line by line
    let skipTable = false;
    let tableLineNumber = 0;
    for (let i = 0; i < lines.length; i++) {

      // Trim leading and trailing whitespace from the line
      let line = lines[i].trim();

      // Skip empty lines
      if (line === undefined || line == '') continue;

      // Skip lines if skipping table
      if (skipTable) continue;

      // Record the line number
      this.lineNumber = i + 1;
      tableLineNumber++;

      // If this line ends a table
      if (line.match(/^>+$/)) {
        table = undefined;
        columns = [];
        tableLineNumber = 0;
        skipTable = false;
      }

      // If this is the first line of a table, look for the table name
      else if (tableLineNumber == 1) {

        // Split the table definition on the tab character
        let tableDefinition = line.split(/\s*\t\s*/);

        // Check table definition has at least 2 elements in it
        if (tableDefinition.length < 2) {
          this._appendError('Invalid table definition. Expected something like "tab[tab]measurements[new line]".');
          skipTable = true;
        }

        // Clean leading and trailing whitespace from each part of the table definition
        tableDefinition.map((str) => { return str.trim(); });

        // Check the column delimiter is "tab"
        if (!tableDefinition[0].match(/^tab$/i)) {
          this._appendError(`Unrecognized column delimiter "${tableDefinition[0]}". Expected "tab".`);
          skipTable = true;
        }

        // Save the table name
        table = tableDefinition[1];

        // Initialize a new table in the JSON if necessary
        if (!this.json.hasOwnProperty(table))
          this.json[table] = [];

      }

      // If this is the second line of a table, look for the column names
      else if (tableLineNumber == 2) {

        // Split the column definition on the tab character
        columns = line.split(/\s*\t\s*/);

        // Check for column names
        if (columns.length == 0) {
          this._appendError('No column names found.');
          skipTable = true;
        }

        // Clean leading and trailing whitespace from each column name
        columns = columns.map(String.trim);

        // Check for empty column names
        if (_.findIndex(columns, '') !== -1) {
          this._appendError('Empty column names are not allowed.');
          skipTable = true;
        }

        // Check for duplicate column names
        if (columns.length !== _.uniq(columns).length) {
          this._appendError('Found duplicate column names.');
          skipTable = true;
        }

      }

      // Otherwise parse the row
      else {

        // Split the row values on the tab character
        let values = line.split(/\s*\t\s*/);

        // Check there are enough column names
        if (values.length > columns.length) {
          this._appendError('More values found than columns.');
        }

        // Append the row of values onto the table in the JSON
        else {
          values = values.map((str) => { return str.trim(); });
          this.json[table].push(_.zipObject(columns.slice(0, value.length), values));
        }
      }

    }

    return this.json;

  }

  _appendWarning(errorMessage) {
    const warnings = this.LocalState.get('PARSE_CONTRIBUTION_WARNINGS');
    const warning = {'line_number': this.lineNumber, 'message': errorMessage};
    warnings.push(warning);
    this.LocalState.set('PARSE_CONTRIBUTION_WARNINGS', warnings);
  }

  _appendError(errorMessage) {
    const errors = this.LocalState.get('PARSE_CONTRIBUTION_ERRORS');
    const error = {'line_number': this.lineNumber, 'message': errorMessage};
    errors.push(error);
    this.LocalState.set('PARSE_CONTRIBUTION_ERRORS', errors);
  }

}
