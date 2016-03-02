export default class {

  constructor(name, {LocalState}) {

    if (LocalState === undefined) LocalState = new Map();

    this.name = name.toUpperCase();
    this.LocalState = LocalState;

    // Clear errors and warnings
    this.LocalState.set(`${this.name}_ERRORS`, []);
    this.LocalState.set(`${this.name}_WARNINGS`, []);

  }

  warnings() {
    return this.LocalState.get(`${this.name}_WARNINGS`);
  }

  errors() {
    return this.LocalState.get(`${this.name}_ERRORS`);
  }

  _appendWarning(warningMessage) {
    const warnings = this.LocalState.get(`${this.name}_WARNINGS`);
    const warning = {lineNumber:this.lineNumber, message:warningMessage};
    //console.log('WARNING: ', warningMessage);
    warnings.push(warning);
    this.LocalState.set(`${this.name}_WARNINGS`, warnings);
  }

  _appendError(errorMessage) {
    const errors = this.LocalState.get(`${this.name}_ERRORS`);
    const error = {lineNumber:this.lineNumber, message:errorMessage};
    //console.log('ERROR: ', errorMessage);
    errors.push(error);
    this.LocalState.set(`${this.name}_ERRORS`, errors);
  }

}