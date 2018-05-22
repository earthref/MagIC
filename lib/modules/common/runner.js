export default class {

  constructor({runnerState}) {
    if (runnerState === undefined) runnerState = {};
    this.runnerState = runnerState;
    this.runnerState['_runner_errors'  ] = [];
    this.runnerState['_runner_warnings'] = [];
  }

  reset() {
    this.runnerState['_runner_errors'  ] = [];
    this.runnerState['_runner_warnings'] = [];
  }

  warnings() {
    return this.runnerState['_runner_warnings'];
  }

  errors() {
    return this.runnerState['_runner_errors'];
  }

  errorsAndWarnings() {
    return { errors: this.runnerState['_runner_errors'], warnings: this.runnerState['_runner_warnings'] };
  }

  _appendWarning(warningMessage) {
    const warning = {lineNumber: this.lineNumber, message: warningMessage};
    //console.warn('WARNING: ', warningMessage);
    this.runnerState['_runner_warnings'].push(warning);
  }

  _appendError(errorMessage) {
    const error = {lineNumber: this.lineNumber, message: errorMessage};
    console.error('ERROR: ', errorMessage);
    this.runnerState['_runner_errors'].push(error);
  }

  _reportProgress() {

  }

}