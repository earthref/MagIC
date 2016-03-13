const {describe, it} = global;
import {expect} from 'chai';
import ParseContribution from '../parse_contribution.js';
import UpgradeContribution from '../upgrade_contribution.js';
//import {default as contribution289  } from './files/289.js';
//import {default as contribution3552 } from './files/3552.js';
//import {default as contribution7527 } from './files/7527.js';
//import {default as contribution7661 } from './files/7661.js';
//import {default as contribution8054 } from './files/8054.js';
//import {default as contribution10507} from './files/10507.js';

// Expect the warnings to contain one warning that matches the reWarningMsg regex.
const upgradeContributionWarningTest = (jsonOld, maxVersion, reWarningMsg) => {
  const Upgrader = new UpgradeContribution({});
  Upgrader.upgrade(jsonOld, maxVersion);
  expect(Upgrader.warnings().length).to.be.at.least(1);
  expect(Upgrader.warnings()[Upgrader.warnings().length - 1]['message']).to.match(reWarningMsg);
};

// Expect the last error to match the reErrorMsg regex.
const upgradeContributionErrorTest = (jsonOld, maxVersion, reErrorMsg) => {
  const Upgrader = new UpgradeContribution({});
  Upgrader.upgrade(jsonOld, maxVersion);
  expect(Upgrader.errors().length).to.be.at.least(1);
  expect(Upgrader.errors()[Upgrader.errors().length - 1]['message']).to.match(reErrorMsg);
};

// Expect N errors.
const upgradeContributionNErrorsTest = (jsonOld, maxVersion, nErrors) => {
  const Upgrader = new UpgradeContribution({});
  Upgrader.upgrade(jsonOld, maxVersion);
  expect(Upgrader.errors().length).to.equal(nErrors);
};

// Expect no errors.
const upgradeContributionNoErrorTest = (jsonOld, maxVersion) => {
  const Upgrader = new UpgradeContribution({});
  Upgrader.upgrade(jsonOld, maxVersion);
  expect(Upgrader.errors().length).to.equal(0);
};

// Expect no errors and check against expected JSON.
const upgradeContributionJSONTest = (jsonOld, maxVersion, jsonExpected) => {
  const Upgrader = new UpgradeContribution({});
  const jsonNew = Upgrader.upgrade(jsonOld, maxVersion);
  expect(Upgrader.errors().length).to.equal(0);
  expect(jsonNew).to.deep.equal(jsonExpected);
};

// Expect no errors and check the upgrade map against expected map.
const upgradeContributionMapTest = (newModel, expectedMap) => {
  const Upgrader = new UpgradeContribution({});
  const upgradeMap = Upgrader.getUpgradeMap(newModel);

  console.log("EXPECTED! " + JSON.stringify(expectedMap));
  console.log("ACTUAL  ! " + JSON.stringify(upgradeMap));

  expect(Upgrader.errors().length).to.equal(0);
  expect(upgradeMap).to.deep.equal(expectedMap);
};

describe('magic.actions.upgrade_contribution', () => {

  // Test upgrading invalid JSON.
  describe('when upgrading invalid JSON', () => {

    it('should warn about upgrading an empty object', () => {
      upgradeContributionWarningTest(null, undefined, /the first argument .* is empty/i);
      upgradeContributionWarningTest(undefined, undefined, /the first argument .* is empty/i);
      upgradeContributionWarningTest({}, undefined, /the first argument .* is empty/i);
    });

    it('should reject when the maximum upgrade version is invalid.', () => {
      const invalidMagicVersion = {
        contribution: [{
          magic_version: '2.2'
        }]
      };
      upgradeContributionErrorTest(invalidMagicVersion, '1.0', /the second argument .* is invalid/i);
    });

    it('should reject when no contribution table is found', () => {
      const jsonNoContribTable = {
        not_contribution: [{
          magic_version: '2.2'
        }],
        er_locations: [{
          region: 'California'
        }]
      };
       upgradeContributionErrorTest(jsonNoContribTable, undefined, /failed to find the "contribution" table/i);
    });

    it('should reject when the "contribution" table does not include the "magic_version" column.', () => {
      const jsonContribNoMagicVersion = {
        contribution: [{
          not_magic_version: '2.2'
        }]
      };
      upgradeContributionErrorTest(jsonContribNoMagicVersion, undefined,
        /table does not include the "magic_version" column./i);
    });

    it('should reject when the "contribution" table does not have exactly one row.', () => {
      const jsonContribTwoRows = {
        contribution: [{
          magic_version: '2.2'
        }, {
          magic_version: '2.3'
        }]
      };
      upgradeContributionErrorTest(jsonContribTwoRows, undefined, /table does not have exactly one row./i);
    });

   it('should reject if the data model version is invalid.', () => {
      const invalidMagicVersion = {
        contribution: [{
          magic_version: '0.1'
        }]
      };
      upgradeContributionErrorTest(invalidMagicVersion, undefined, /data model version .* is invalid/i);
    });

    it('should reject if the table name is invalid.', () => {
      const invalidTable = {
        contribution: [{
          magic_version: '2.5'
        }],
        not_er_locations: [{
          region: 'California'
        }]
      };
      upgradeContributionErrorTest(invalidTable, undefined, /table .* is not defined in magic data model/i);
    });

    it('should reject if the column name is invalid.', () => {
      const invalidColumn = {
        contribution: [{
          magic_version: '2.5'
        }],
        er_locations: [{
          not_region: 'California'
        }]
      };
      upgradeContributionErrorTest(invalidColumn, undefined,
        /column .* in table .* is not defined in magic data model/i);
    });

    it('should report two errors if two columns are invalid.', () => {
      const invalidColumns = {
        contribution: [{
          magic_version: '2.4'
        }],
        er_locations: [{
          not_region: 'California'
        },{
          not_region: 'California'
        }]
      };
      upgradeContributionNErrorsTest(invalidColumn, '2.5', 2);
      upgradeContributionErrorTest(invalidColumn, '2.5',
        /column .* in table .* is not defined in magic data model/i);
    });

  });

  // Test upgrading valid JSON.
  describe('when upgrading valid JSON', () => {

    it('should keep numbers as strings', () => {
      const jsonOld = {
        contribution: [{
          magic_version: '2.2'
        }],
        er_locations: [{
          begin_latitude: '10.0'
        }]
      };
      const jsonNew = {
        contribution: [{
          magic_version: '3.0'
        }],
        er_locations: [{
          begin_latitude: '10.0'
        }]
      };
      upgradeContributionJSONTest(jsonOld, undefined, jsonNew);
    });

    it('should stop upgrading at the given maximum version', () => {
      const jsonOld = {
        contribution: [{
          magic_version: '2.2'
        }]
      };
      const jsonNew = {
        contribution: [{
          magic_version: '2.4'
        }]
      };
      upgradeContributionJSONTest(jsonOld, '2.4', jsonNew);
    });

    it('should update column names', () => {
      const jsonOld = {
        contribution: [{
          magic_version: '2.0'
        }],
        rmag_susceptibility: [{
          susceptibility_xx: '1'
        }]
      };
      const jsonNew = {
        contribution: [{
          magic_version: '2.1'
        }],
        rmag_susceptibility: [{
          susceptibility_loss_tangent: '1'
        }]
      };
      upgradeContributionJSONTest(jsonOld, '2.1', jsonNew);
    });

    it('should warn about deleted columns', () => {
      const jsonOld = {
        contribution: [{
          magic_version: '2.5'
        }],
        er_expeditions: [{
          expedition_start_loc: '1'
        }]
      };
      upgradeContributionWarningTest(jsonOld, '3.0',
        /column .* in table .* was deleted in magic data model/i);
    });

  });

  // Test upgrading valid files.

  // Test calculating the upgrade map.
  describe('when calculating the upgrade map', () => {
    it('should handle renamed tables', () => {
      const newModel = {//indicates that table "er_locations" has been changed to "locations"
        tables: { locations: {
          columns: { location_name: {
            previous_columns: [{
              table: 'er_locations',
              column: 'location_name'
            }]
          }}
        }}
      };
      const upgradeMap = {
        er_locations: { location_name: [{ table: 'locations', column: 'location_name'}]}
      };

      upgradeContributionMapTest(newModel, upgradeMap);
    });

    it('should handle renamed columns', () => {
      const newModel = {//indicates that column er_locations.name has been changed  to er_locations.location_name
        tables: { er_locations: {
          columns: { location_name: {
            previous_columns: [{
              table: 'er_locations',
              column: 'name'
            }]
          }}
        }}
      };
      const upgradeMap = {
        er_locations: { name: [{ table: 'er_locations', column: 'location_name'}]}
      };
      upgradeContributionMapTest(newModel, upgradeMap);
    });

    it('should handle inserted columns', () => {
      const newModel = {
        tables: { er_locations: {
          columns: { location_name: {}}
        }}
      };
      const upgradeMap = {};
      upgradeContributionMapTest(newModel, upgradeMap);
    });

    //GGG THIS CURRENTLY HAS THE LIMITATION OF MERGING TWO COLUMNS (AND NO MORE)
    //NOT SURE IF WE NEED THE ABILITY TO DO THREE
    it('should handle merged columns', () => {
      const newModel = {
        tables: { er_locations: {
          columns: { location_name: {
            previous_columns: [{
              table: 'er_locations',
              column: 'name1'
            }, {
              table: 'er_locations',
              column: 'name2'
            }]
          }}
        }}
      };

      const upgradeMap = {
        er_locations: {
          name1: [{ table: 'er_locations', column: 'location_name'}],
          name2: [{ table: 'er_locations', column: 'location_name'}]
        }
      };
      upgradeContributionMapTest(newModel, upgradeMap);
    });

    it('should handle split columns', () => {
      const newModel = {
        tables: { er_locations: {
          columns: {
            location_name1: {
              previous_columns: [{
                table: 'er_locations',
                column: 'splitColName'
              }]
            },
            location_name2: {
              previous_columns: [{
                table: 'er_locations',
                column: 'splitColName'
              }]
            }
          }
        }}
      };

      const upgradeMap = {
        er_locations: {
          splitColName: [
            { table: 'er_locations', column: 'location_name1'},
            { table: 'er_locations', column: 'location_name2'}
          ]
        }
      };
      upgradeContributionMapTest(newModel, upgradeMap);
    });

    // TODO: write more difficult tests for table names changing,
    // merging from different tables, splitting into different tables,
    // tables with columns renamed into different tables

  });
});
