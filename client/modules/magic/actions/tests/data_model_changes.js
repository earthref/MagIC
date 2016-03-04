const {describe, it} = global;
import {expect} from 'chai';
import DataModelChanges from '../data_model_changes';
import {default as model20} from './files/data_models/2.0.js';
import {default as model21} from './files/data_models/2.1.js';
import {default as model22} from './files/data_models/2.2.js';
import {default as model23} from './files/data_models/2.3.js';
import {default as model24} from './files/data_models/2.4.js';
import {default as model25} from './files/data_models/2.5.js';
import {default as model30} from './files/data_models/3.0.js';

// Expect the warnings to contain one warning that matches the reWarningMsg regex.
const dataModelChangesWarningTest = (model, reWarningMsg) => {
  const ChangeLog = new DataModelChanges({});
  ChangeLog.changes(model);
  expect(ChangeLog.warnings().length).to.be.at.least(1);
  expect(ChangeLog.warnings()[ChangeLog.warnings().length - 1]['message']).to.match(reWarningMsg);
};

// Expect the errors to contain one error that matches the reErrorMsg regex.
const dataModelChangesErrorTest = (model, reErrorMsg) => {
  const ChangeLog = new DataModelChanges({});
  ChangeLog.changes(model);
  expect(ChangeLog.errors().length).to.be.at.least(1);
  expect(ChangeLog.errors()[ChangeLog.errors().length - 1]['message']).to.match(reErrorMsg);
};

// Expect no errors.
const dataModelChangesNoErrorTest = (model) => {
  const ChangeLog = new DataModelChanges({});
  ChangeLog.changes(model);
  expect(ChangeLog.errors().length).to.equal(0);
};

// Expect no errors and check against expected JSON.
const dataModelChangesModelTest = (model, modelExpectedChanges) => {
  const ChangeLog = new DataModelChanges({});
  const modelChanges = ChangeLog.changes(model);
  expect(ChangeLog.errors().length).to.equal(0);
  expect(modelChanges).to.deep.equal(modelExpectedChanges);
};

describe('magic.actions.data_model_changes', () => {

  // Test getting changes from an invalid model.
  describe('when getting changes from an invalid model', () => {

    it('should warn about getting changes from an empty model', () => {
      dataModelChangesWarningTest(null, /the first argument .* is empty/i);
      dataModelChangesWarningTest(undefined, /the first argument .* is empty/i);
      dataModelChangesWarningTest({}, /the first argument .* is empty/i);
    });

    it('should reject when no tables list is found', () => {
      const model = {
        no_tables: {}
      };
      dataModelChangesErrorTest(model, undefined, /failed to find the tables list in the model/i);
    });

    it('should reject when no tables list is found', () => {
      const model = {
        tables: {
          contribution: {
            no_columns: {}
          }
        }
      };
      dataModelChangesErrorTest(model, undefined, /failed to find the columns list for table .*/i);
    });

    it('should reject when the previous columns list is invalid', () => {
      const noTableModel = {
        tables: {
          contribution: {
            columns: {
              magic_version: {
                previous_columns: {
                  no_table: '',
                  column: ''
                }
              }
            }
          }
        }
      };
      dataModelChangesErrorTest(noTableModel, undefined, /failed to find the previous table name for column .* in table .*/i);
      const noColumnModel = {
        tables: {
          contribution: {
            columns: {
              magic_version: {
                previous_columns: {
                  table: '',
                  no_column: ''
                }
              }
            }
          }
        }
      };
      dataModelChangesErrorTest(noColumnModel, undefined, /failed to find the previous column name for column .* in table .*/i);
    });

    it('should reject when the next columns list is invalid', () => {
      const noTableModel = {
        tables: {
          contribution: {
            columns: {
              magic_version: {
                next_columns: {
                  no_table: '',
                  column: ''
                }
              }
            }
          }
        }
      };
      dataModelChangesErrorTest(noTableModel, undefined, /failed to find the next table name for column .* in table .*/i);
      const noColumnModel = {
        tables: {
          contribution: {
            columns: {
              magic_version: {
                next_columns: {
                  table: '',
                  no_column: ''
                }
              }
            }
          }
        }
      };
      dataModelChangesErrorTest(noColumnModel, undefined, /failed to find the next column name for column .* in table .*/i);
    });

  });

  // Test getting changes from a valid model.
  describe('when getting changes from a valid model', () => {

  });

});
