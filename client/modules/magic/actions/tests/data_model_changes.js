const {describe, it} = global;
import {expect} from 'chai';
import _ from  'lodash';
import DataModelChanges from '/client/modules/magic/actions/data_model_changes';
import {models} from '/lib/modules/magic/data_models';

describe('magic.actions.data_model_changes', () => {

  // Test getting changes from an invalid model.
  describe('when getting changes from an invalid model', () => {

    it('should reject getting changes from an empty model', () => {
      dataModelChangesErrorTest(null, /the model argument .* is empty/i);
      dataModelChangesErrorTest(undefined, /the model argument .* is empty/i);
      dataModelChangesErrorTest({}, /the model argument .* is empty/i);
    });

    it('should reject when no MagIC version is found', () => {
      const model = {
        no_data_model_version: '3.0',
        tables: {}
      };
      dataModelChangesErrorTest(model, /has no "data_model_version" property/i);
    });

    it('should reject when no tables list is found', () => {
      const model = {
        data_model_version: '3.0',
        no_tables: {}
      };
      dataModelChangesErrorTest(model, /has no "tables" property/i);
    });

    it('should reject when no columns are in a table', () => {
      const model = {
        data_model_version: '3.0',
        tables: {
          contribution: {
            no_columns: {}
          }
        }
      };
      dataModelChangesErrorTest(model, /failed to find the columns list for table: .*/i);
    });

    it('should reject when the previous columns list is invalid', () => {
      const noTableModel = {
        data_model_version: '3.0',
        tables: {
          contribution: {
            columns: {
              data_model_version: {
                previous_columns: [{
                  no_table: '',//no_table
                  column: ''
                }]
              }
            }
          }
        }
      };
      const noColumnModel = {
        data_model_version: '3.0',
        tables: {
          contribution: {
            columns: {
              data_model_version: {
                previous_columns: [{
                  table: '',
                  no_column: ''
                }]
              }
            }
          }
        }
      };
      dataModelChangesErrorTest(noTableModel, /failed to find the previous table name for column/i);
      dataModelChangesErrorTest(noColumnModel, /failed to find the previous column name for column/i);
    });
  });

  // Test making lists of changes from a valid model.
  describe('when making lists of changes from a valid model', () => {

    it('should ignore unchanged columns', () => {
      let expectedModelChanges = emptyExpectedModelChanges();
      const model = {
        data_model_version: '2.5',
        tables: {
          contribution: {
            columns: {
              data_model_version: {
                previous_columns: [{
                  table: 'contribution', //should equal parent table,
                  column: 'data_model_version'//should equal parent column
                }]
              }
            }
          }
        }
      };
      dataModelChangesModelTest(model, expectedModelChanges, true);
    });

    //RCJM: I need to finish cleaning up the data models before fixing this test.
    /*
    it('should make a list of deleted columns', () => {
      refreshExpectedModelChanges();
      const model = {
        data_model_version: '2.5',
        tables: {
          contribution: {
            columns: {
              data_model_version: {
                previous_columns: [{
                  table: 'contribution',
                  column: 'data_model_version'
                }]
              }
            }
          }
        }
      };
      _.set(expectedModelChanges.deleted_columns, 'contribution.data_model_version', true);
      dataModelChangesModelTest(model, expectedModelChanges, true);
    });*/

    // The inserted_columns list
    it('should make a list of inserted columns', () => {
      let expectedModelChanges = emptyExpectedModelChanges();
      const model = {
        data_model_version: '2.5',
        tables: {
          contribution: {
            columns: {
              data_model_version: {
                not_previous_columns: ''
              }
            }
          }
        }
      };
      // Set inserted_columns.tables.contribution.columns.data_model_version to an empty object which we might use later
      // to store notes extracted from the model about why the column was inserted.
      _.set(expectedModelChanges.inserted_columns, 'tables.contribution.columns.data_model_version', {});
      dataModelChangesModelTest(model, expectedModelChanges, true);
    });

    it('should make a list of renamed columns', () => {
      let expectedModelChanges = emptyExpectedModelChanges();
      const model = {
        data_model_version: '2.5',
        tables: {
          contribution: {
            columns: {
              data_model_version: {
                previous_columns: [{
                  table: 'contribution',
                  column: 'version' //if this doesn't equal the parent column name (data_model_version) then it has been renamed
                }]
              }
            }
          }
        }
      };
      // Set renamed_columns.tables.contribution.columns.data_model_version to the old table name and column name.
      _.set(expectedModelChanges.renamed_columns, 'tables.contribution.columns.data_model_version', {
        table: 'contribution',
        column: 'version'
      });
      dataModelChangesModelTest(model, expectedModelChanges, true);
    });

    //THIS COMES FROM MULTIPLE PREVIOUS COLUMNS
    it('should make a list of merged columns', () => {
      let expectedModelChanges = emptyExpectedModelChanges();
      const model = {
        data_model_version: '2.5',
        tables: {
          er_locations: {
            columns: {
              type: {
                previous_columns: [{
                  table: 'contribution',
                  column: 'data_model_version_1'
                }, {
                  table: 'er_sites',
                  column: 'site_type'
                }]
              }
            }
          }
        }
      };

      _.set(expectedModelChanges.merged_columns, 'tables.er_locations.columns.type', [{
        table: 'contribution',
        column: 'data_model_version_1'
      }, {
        table: 'er_sites',
        column: 'site_type'
      }]);
      dataModelChangesModelTest(model, expectedModelChanges, true);

      //RCJM: Merged columns shouldn't be in the renamed_columns list.
      //Any data model column with multiple previous_columns, should only be in the merged_columns list.
    });

    //THESE ARE SUPPOSED TO JUST PASS WITH NO ISSUES BUT WON'T QUITE - GGG
    /*it('should make lists of changes with the 2.2 model', () => {
      dataModelChangesNoWarningNoErrorTest(models['2.2']);
    });

    it('should make lists of changes with the 2.3 model', () => {
      dataModelChangesNoWarningNoErrorTest(models['2.3']);
    });

    it('should make lists of changes with the 2.4 model', () => {
      dataModelChangesNoWarningNoErrorTest(models['2.4']);
    });

    it('should make lists of changes with the 2.5 model', () => {
      dataModelChangesNoWarningNoErrorTest(models['2.5']);
    });

    it('should make lists of changes with the 3.0 model', () => {
      dataModelChangesNoWarningNoErrorTest(models['3.0']);
    });*/


  });

});


function logErrors(errors) {
  for(let errorIdx in errors)
    console.log(`ERROR: ${errors[errorIdx]['message']}`);
}

function emptyExpectedModelChanges() {
  let expectedModelChanges = {};
  expectedModelChanges.deleted_columns = {};
  expectedModelChanges.inserted_columns = {};
  expectedModelChanges.renamed_columns = {};
  expectedModelChanges.merged_columns = {};
  return expectedModelChanges;
}

// Expect the errors to contain one error that matches the reErrorMsg regex.
function errorInCollection(reErrorMsg, ChangeLists) {
  let errorInCollection = false;
  for(let error in ChangeLists.errors() )
  {
    console.log('Error: '+ ChangeLists.errors()[error]['message']);
    if(reErrorMsg.test(ChangeLists.errors()[error]['message']))
      errorInCollection = true;//expect(error['message']).to.match(reErrorMsg);
  }
  return errorInCollection;
}

// Expect the warnings to contain one warning that matches the reWarningMsg regex.
function dataModelChangesWarningTest(model, reWarningMsg) {
  const modelChanges = new DataModelChanges({});
  modelChanges.changes(model);
  expect(modelChanges.warnings().length).to.be.at.least(1);
  expect(modelChanges.warnings()[modelChanges.warnings().length - 1]['message']).to.match(reWarningMsg);
}

function dataModelChangesErrorTest(model, reErrorMsg) {
  const modelChanges = new DataModelChanges({});
  modelChanges.changes(model);
  //console.log("YO: " + modelChanges.errors()[0]['message']);
  expect(modelChanges.errors().length).to.be.at.least(1);
  //expect(modelChanges.errors()[modelChanges.errors().length - 1]['message']).to.match(reErrorMsg);
  let errorFound = errorInCollection(reErrorMsg, modelChanges);
  expect(errorFound).to.equal(true);
}

// Expect no warnings.
function dataModelChangesNoWarningNoErrorTest(model) {
  const modelChanges = new DataModelChanges({});
  modelChanges.changes(model);
  expect(modelChanges.warnings().length).to.equal(0);
  expect(modelChanges.errors().length).to.equal(0);
}

// Expect no errors.
function dataModelChangesNoErrorTest(model) {
  const modelChanges = new DataModelChanges({});
  modelChanges.changes(model);
  expect(modelChanges.errors().length).to.equal(0);
}

// Expect no errors and check against expected JSON.
function dataModelChangesModelTest(model, modelExpectedChanges, ignoreOtherErrors) {
  const dataModelChangeDetector = new DataModelChanges({});
  dataModelChangeDetector.changes(model);
  logErrors(dataModelChangeDetector.errors());
  if(!ignoreOtherErrors) expect(dataModelChangeDetector.errors().length).to.equal(0);

  console.log("EXPECTED! " + JSON.stringify(modelExpectedChanges));
  console.log("ACTUAL  ! " + JSON.stringify(dataModelChangeDetector.modelChanges));

  expect( dataModelChangeDetector.modelChanges).to.deep.equal(modelExpectedChanges);
}
