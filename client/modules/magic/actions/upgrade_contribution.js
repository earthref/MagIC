import {_} from 'lodash';

export default class {

  constructor({Meteor, LocalState}) {
    this.Meteor = Meteor;
    this.LocalState = LocalState;

    // Clear errors and warnings
    this.LocalState.set('UPGRADE_CONTRIBUTION_ERRORS', []);
    this.LocalState.set('UPGRADE_CONTRIBUTION_WARNINGS', []);

    // Initalize upgrading state
    this.table;
    this.rowNumber;
    this.column;

  }

  upgrade(jsonOld) {

    // Check for a valid input
    if (_.isEmpty(jsonOld)) {
      return this._appendWarning('Contribution is empty.');
    }

    this.jsonNew = jsonOld;

    const versionOld = jsonOld['magic_contributions'][0]['magic_version'];

    return this.jsonNew;

  }

  _appendWarning(warningMessage) {
    const warnings = this.LocalState.get('UPGRADE_CONTRIBUTION_WARNINGS');
    const warning = { table: this.table, rowNumber: this.rowNumber, column: this.column, message: warningMessage};
    console.log('WARNING: ', warningMessage);
    warnings.push(warning);
    this.LocalState.set('UPGRADE_CONTRIBUTION_WARNINGS', warnings);
  }

  _appendError(errorMessage) {
    const errors = this.LocalState.get('UPGRADE_CONTRIBUTION_ERRORS');
    const error = { table: this.table, rowNumber: this.rowNumber, column: this.column, message: errorMessage};
    console.log('ERROR: ', errorMessage);
    errors.push(error);
    this.LocalState.set('UPGRADE_CONTRIBUTION_ERRORS', errors);
  }

}
