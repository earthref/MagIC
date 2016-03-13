const {describe, it} = global;
import {expect} from 'chai';
import DataModelChanges from '../data_model_changes.js';
import {magicDataModels} from './files/data_models/data_models.js';

let expectedModelChanges = {};

function refreshExpectedModelChanges() {
  expectedModelChanges.deleted_columns = [];
  expectedModelChanges.inserted_columns = [];
  expectedModelChanges.renamed_columns = [];
  expectedModelChanges.merged_columns = [];
  expectedModelChanges.splitting_columns =[];
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
const dataModelChangesWarningTest = (model, reWarningMsg) => {
  const modelChanges = new DataModelChanges({});
  modelChanges.changes(model);
  expect(modelChanges.warnings().length).to.be.at.least(1);
  expect(modelChanges.warnings()[modelChanges.warnings().length - 1]['message']).to.match(reWarningMsg);
};

const dataModelChangesErrorTest = (model, reErrorMsg) => {
  const modelChanges = new DataModelChanges({});
  modelChanges.changes(model);
  //console.log("YO: " + modelChanges.errors()[0]['message']);
  expect(modelChanges.errors().length).to.be.at.least(1);
  //expect(modelChanges.errors()[modelChanges.errors().length - 1]['message']).to.match(reErrorMsg);
  let errorFound = errorInCollection(reErrorMsg, modelChanges);
  expect(errorFound).to.equal(true);
};

// Expect no warnings.
const dataModelChangesNoWarningNoErrorTest = (model) => {
  const modelChanges = new DataModelChanges({});
  modelChanges.changes(model);
  expect(modelChanges.warnings().length).to.equal(0);
  expect(modelChanges.errors().length).to.equal(0);
};

// Expect no errors.
const dataModelChangesNoErrorTest = (model) => {
  const modelChanges = new DataModelChanges({});
  modelChanges.changes(model);
  expect(modelChanges.errors().length).to.equal(0);
};

// Expect no errors and check against expected JSON.
const dataModelChangesModelTest = (model, modelExpectedChanges, ignoreOtherErrors) => {
  const dataModelChangeDetector = new DataModelChanges({});
  dataModelChangeDetector.changes(model);
  if(!ignoreOtherErrors) expect(dataModelChangeDetector.errors().length).to.equal(0);

  console.log("EXPECTED! " + JSON.stringify(modelExpectedChanges));
  console.log("ACTUAL  ! " + JSON.stringify(dataModelChangeDetector.modelChanges));

  expect( dataModelChangeDetector.modelChanges).to.deep.equal(modelExpectedChanges);
};

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
        no_magic_version: '3.0',
        tables: {}
      };
      dataModelChangesErrorTest(model, /has no "magic_version" property/i);
    });

    it('should reject when no tables list is found', () => {
      const model = {
        magic_version: '3.0',
        no_tables: {}
      };
      dataModelChangesErrorTest(model, /has no "tables" property/i);
    });

    it('should reject when no columns are in a table', () => {
      const model = {
        magic_version: '3.0',
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
        magic_version: '3.0',
        tables: {
          contribution: {
            columns: {
              magic_version: {
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
        magic_version: '3.0',
        tables: {
          contribution: {
            columns: {
              magic_version: {
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


    it('should reject when the next columns list is invalid', () => {
      const noTableModel = {
        magic_version: '3.0',
        tables: {
          contribution: {
            columns: {
              magic_version: {
                next_columns: [{
                  no_table: '',
                  column: ''
                }]
              }
            }
          }
        }
      };
      dataModelChangesErrorTest(noTableModel, /failed to find the next table name for column .* in table .*/i);
      const noColumnModel = {
        magic_version: '3.0',
        tables: {
          contribution: {
            columns: {
              magic_version: {
                next_columns: [{
                  table: '',
                  no_column: ''
                }]
              }
            }
          }
        }
      };
      dataModelChangesErrorTest(noColumnModel, /failed to find the next column name for column .* in table .*/i);
    });

  });

  // Test making lists of changes from a valid model.
  describe('when making lists of changes from a valid model', () => {

    it('should ignore unchanged columns', () => {
      refreshExpectedModelChanges();
      const model = {
        magic_version: '2.5',
        tables: {
          contribution: {
            columns: {
              magic_version: {
                not_previous_not_next_columns: ''
              }
            }
          }
        }
      };

      dataModelChangesModelTest(model, expectedModelChanges, true);
    });

    it('should make a list of deleted columns', () => {
      refreshExpectedModelChanges();
      const model = {
        magic_version: '2.5',
        tables: {
          contribution: {
            columns: {
              magic_version: {
                previous_columns: [{
                  table: 'contribution',
                  column: 'magic_version'
                }]
              }
            }
          }
        }
      };

      expectedModelChanges.deleted_columns.push({
        table: 'contribution',
        column: 'magic_version'
      });

      /*
       const modelChanges = {
       deleted_columns: [{
       table: 'contribution',
       column: 'magic_version'
       }]
       };*/
      dataModelChangesModelTest(model, expectedModelChanges, true);
    });

    it('should make a list of inserted columns', () => {
      refreshExpectedModelChanges();
      const model = {
        magic_version: '2.5',
        tables: {
          contribution: {
            columns: {
              magic_version: {
                next_columns: [{
                  table: 'contribution',
                  column: 'magic_version'
                }]
              }
            }
          }
        }
      };

      expectedModelChanges.inserted_columns.push({
        table: 'contribution',
        column: 'magic_version'
      });

      /*      const modelChanges = {
       inserted_columns: [{
       table: 'contribution',
       column: 'magic_version'
       }]
       };*/
      dataModelChangesModelTest(model, expectedModelChanges, true);
    });

    it('should make a list of renamed columns', () => {
      refreshExpectedModelChanges();
      const model = {
        magic_version: '2.5',
        tables: {
          contribution: {
            columns: {
              magic_version: {
                previous_columns: [{
                  table: 'contribution',
                  column: 'version'
                }],
                next_columns: [{
                  table: 'contribution',
                  column: 'magic_version'
                }]
              }
            }
          }
        }
      };

      expectedModelChanges.renamed_columns.push({
        table: 'contribution',
        column: 'magic_version',
        previous_column: {
          table: 'contribution',
          column: 'version'
        }
      });

      dataModelChangesModelTest(model, expectedModelChanges, true);
    });

    //THIS COMES FROM MULTIPLE PREVIOUS COLUMNS
    it('should make a list of merged columns', () => {
      refreshExpectedModelChanges();
      const model = {
        magic_version: '2.5',
        tables: {
          contribution: {
            columns: {
              magic_version: {
                previous_columns: [{
                  table: 'contribution',
                  column: 'magic_version_1'
                }, {
                  table: 'contribution',
                  column: 'magic_version_2'
                }],
                next_columns: [{
                  table: 'contribution',
                  column: 'magic_version'
                }]
              }
            }
          }
        }
      };


      expectedModelChanges.merged_columns.push({
        table: 'contribution',
        column: 'magic_version',
        merged_columns: [{
          table: 'contribution',
          column: 'magic_version_1'
        }, {
          table: 'contribution',
          column: 'magic_version_2'
        }]
      });

      //GGG DOING THIS BECAUSE MERGED COLUMNS ARE ALSO RENAMED COLUMNS
      //SUCH COLUMNS SHOULD SHOW UP IN BOTH CATEGORIES, BASED ONT HE CURRENT DEFINITION
      //THIS IS A BIT OF A HACK BECUASE IT ONLY DEALS WITH ONE OF THE TWO COLUMNS "RENAMED" COLUMNS
      // THAT THE ODE ADDRESSES
      expectedModelChanges.renamed_columns.push({
        table: 'contribution',
        column: 'magic_version',
        previous_column: {
          table: 'contribution',
          column: 'magic_version_1'
        }
      });

      /*const modelChanges = {
       merged_columns: [{
       table: 'contribution',
       column: 'magic_version',
       previous_columns: [{
       table: 'contribution',
       column: 'magic_version_1'
       }, {
       table: 'contribution',
       column: 'magic_version_2'
       }]
       }]
       };*/
      dataModelChangesModelTest(model, expectedModelChanges, true);
    });


    it('should make a list of splitting columns', () => {
      refreshExpectedModelChanges();
      const model = {
        magic_version: '2.5',
        tables: {
          contribution: {
            columns: {
              magic_version: {
                previous_columns: [{
                  table: 'contribution',
                  column: 'magic_version'
                }],
                next_columns: [{
                  table: 'contribution',
                  column: 'magic_version_1'
                }, {
                  table: 'contribution',
                  column: 'magic_version_2'
                }]
              }
            }
          }
        }
      };

      expectedModelChanges.splitting_columns.push({
        table: 'contribution',
        column: 'magic_version',
        splitting_columns: [{
          table: 'contribution',
          column: 'magic_version_1'
        }, {
          table: 'contribution',
          column: 'magic_version_2'
        }]});

      //GGG DOING THIS BECAUSE MERGED COLUMNS ARE ALSO RENAMEING COLUMNS
      //SUCH COLUMNS SHOULD SHOW UP IN BOTH CATEGORIES, BASED ONT HE CURRENT DEFINITION
      //THIS IS A BIT OF A HACK BECUASE IT ONLY DEALS WITH ONE OF THE TWO COLUMNS "RENAMED" COLUMNS
      // THAT THE ODE ADDRESSES
      expectedModelChanges.renamed_columns.push({
        table: 'contribution',
        column: 'magic_version',
        previous_column: {
          table: 'contribution',
          column: 'magic_version'
        }
      });

      /*const modelChanges = {
       splitting_columns: [{
       table: 'contribution',
       column: 'magic_version',
       next_columns: [{
       table: 'contribution',
       column: 'magic_version_1'
       }, {
       table: 'contribution',
       column: 'magic_version_2'
       }]
       }]
       };*/
      dataModelChangesModelTest(model, expectedModelChanges, true);
    });

    //THESE ARE SUPPOSED TO JUST PASS WITH NO ISSUES BUT WON'T QUITE - GGG
    it('should make lists of changes with the 2.2 model', () => {
      dataModelChangesNoWarningNoErrorTest(magicDataModels['2.2']);
    });

    it('should make lists of changes with the 2.3 model', () => {
      dataModelChangesNoWarningNoErrorTest(magicDataModels['2.3']);
    });

    it('should make lists of changes with the 2.4 model', () => {
      dataModelChangesNoWarningNoErrorTest(magicDataModels['2.4']);
    });

    it('should make lists of changes with the 2.5 model', () => {
      dataModelChangesNoWarningNoErrorTest(magicDataModels['2.5']);
    });

    it('should make lists of changes with the 3.0 model', () => {
      dataModelChangesNoWarningNoErrorTest(magicDataModels['3.0']);
    });


  });

});