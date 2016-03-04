const {describe, it} = global;
import {expect} from 'chai';
import ParseContribution from '../parse_contribution';
import UpgradeContribution from '../upgrade_contribution';
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

// Expect the errors to contain one error that matches the reErrorMsg regex.
const upgradeContributionErrorTest = (jsonOld, maxVersion, reErrorMsg) => {
  const Upgrader = new UpgradeContribution({});
  Upgrader.upgrade(jsonOld, maxVersion);
  expect(Upgrader.errors().length).to.be.at.least(1);
  expect(Upgrader.errors()[Upgrader.errors().length - 1]['message']).to.match(reErrorMsg);
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
          magic_version: '2.0'
        }]
      };
      upgradeContributionErrorTest(invalidMagicVersion, '1.0', /the second argument .* is invalid/i);
    });

    it('should reject when no contribution table is found', () => {
      const jsonNoContribTable = {
        notContribTable: [{
          col1: 'str1',
          col2: '1.23'
        }],
        otherTable: [{
          col1: '2.2'
        }]
      };
       upgradeContributionErrorTest(jsonNoContribTable, undefined, /failed to find the "contribution" table/i);
    });

    it('should reject when the "contribution" table does not include the "magic_version" column.', () => {
      const jsonContribNoMagicVersion = {
        contribution: [{
          not_magic_version: '1.2',
          col2: '1.2'
        }]
      };
      upgradeContributionErrorTest(jsonContribNoMagicVersion, undefined,
        /table does not include the "magic_version" column./i);
    });

    it('should reject when the "contribution" table does not have exactly one row.', () => {
      const jsonContribTwoColumns = {
        contribution: [{
          col1: 'str1',
          col2: '1.2'
        }, {
          col1: 'str2',
          col2: '1.2'
        }]
      };
      upgradeContributionErrorTest(jsonContribTwoColumns, undefined, /table does not have exactly one row./i);
    });

   it('should reject if the requested data model is invalid.', () => {
      const invalidMagicVersion = {
        contribution: [{
          magic_version: '0.1',
          col2: '1.2'
        }]
      };
      upgradeContributionErrorTest(invalidMagicVersion, undefined, /data model version .* is invalid/i);
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
          magic_version: '2.5'
        }]
      };
      upgradeContributionJSONTest(jsonOld, '2.5', jsonNew);
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

  });

  // Test upgrading valid files.



  //LIST OF TABLE/COLUMN CHANGES
  // Test upgrading valid JSON.
  describe('Temporary place to run column change list', () => {
    it('Should list column changes', () => {
      const Upgrader = new UpgradeContribution({});
      Upgrader.upgrade('2.0', '2.0');


    });
  });



});
