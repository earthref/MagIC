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
import {default as model20} from './files/data_models/2.0.js';
import {default as model21} from './files/data_models/2.1.js';
const dataModels = {'2.0': model20, '2.1': model21};

// Expect the parse errors to contain one error that matches the matchErrorMSG regex.
const upgradeContributionWarningTest = (jsonOld, reErrorMsg) => {
  const Upgrader = new UpgradeContribution({});
  Upgrader.upgrade(jsonOld);
  expect(Upgrader.warnings().length).to.be.at.least(1);
  expect(Upgrader.warnings()[Upgrader.warnings().length - 1]['message']).to.match(reErrorMsg);
};

// Expect the parse errors to contain one error that matches the matchErrorMSG regex.
const upgradeContributionErrorTest = (jsonOld, reErrorMsg) => {
  const Upgrader = new UpgradeContribution({});
  Upgrader.upgrade(jsonOld);
  expect(Upgrader.errors().length).to.be.at.least(1);
  expect(Upgrader.errors()[Upgrader.errors().length - 1]['message']).to.match(reErrorMsg);
};

// Expect no errors.
const upgradeContributionNoErrorTest = (jsonOld) => {
  const Upgrader = new UpgradeContribution({});
  Upgrader.upgrade(jsonOld);
  expect(Upgrader.errors().length).to.equal(0);
};

// Expect no errors and check against expected JSON.
const upgradeContributionJSONTest = (jsonOld, jsonExpected) => {
  const Upgrader = new UpgradeContribution({});
  const jsonNew = Upgrader.upgrade(jsonOld);
  expect(Upgrader.errors().length).to.equal(0);
  expect(jsonNew).to.deep.equal(jsonExpected);
};

describe('magic.actions.upgrade_contribution', () => {

  // Test parsing invalid JSON.
  describe('upgrade invalid', () => {

    it('should warn about upgrading an empty object', () => {
      upgradeContributionWarningTest(null, /Contribution is empty/i);
      upgradeContributionWarningTest(undefined, /Contribution is empty/i);
      upgradeContributionWarningTest({}, /Contribution is empty/i);
    });

    //NOTE:2.5 and before uses "magic_contributions" 3.0 uses "contributions"
    //Failed to find the "magic_contributions" or "contribution" table.   XX
    it('should reject when no contribution table is found', () => {

      const jsonNoContribTable =
      {
        notContribTable:
        [
          {
            col1: 'str1',
            col2: '1.23'
          }
        ],
        otherTable:
        [
          {col1: '2.2'}
        ]
      };
       upgradeContributionErrorTest(jsonNoContribTable, /Failed to find the "contribution" table/i);
    });


    it('should reject when magic_contributions table does not have exactly one row', () => {
      const jsonContribTwoColumns = {
        contribution: [{
          col1: 'str1',
          col2: '1.2'
        }, {
          col1: 'str2',
          col2: '1.2'
        }]
      };
      upgradeContributionErrorTest(jsonContribTwoColumns, /The "contribution" table does not have exactly one row/i);
    });

    it('should reject when "magic_contributions" table does not include the "magic_version" column.', () => {
      const jsonContribNoMagicVersion = {
        contribution: [{
          not_magic_version: '1.2',
          col2: '1.2'
        }]
      };
      upgradeContributionErrorTest(jsonContribNoMagicVersion, /The "contribution" table does not include the "magic_version" column./i);
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
      upgradeContributionErrorTest(jsonContribTwoColumns, /The "contribution" table does not have exactly one row./i);
    });

    it('should reject when the "contribution" table does not include the "magic_version" column.', () => {
      const jsonContribNoMagicVersion = {
        contribution: [{
          not_magic_version: '1.2',
          col2: '1.2'
        }]
      };
      upgradeContributionErrorTest(jsonContribNoMagicVersion, /The "contribution" table does not include the "magic_version" column./i);
    });

   it('should reject there if requested data model is invalid.', () => {
      const invalidMagicVersion = {
        contribution: [{
          magic_version: '6.9',
          col2: '1.2'
        }]
      };
      upgradeContributionErrorTest(invalidMagicVersion, /MagIC data model version/i); //rest of that string:  ${currentVersion} is invalid. Expected one of: ${strVersions}
    });

    it('should reject there if requested version is already the newest version.', () => {
      const invalidMagicVersion = {
        contribution: [{
          magic_version: '3.0'
        }]
      };
      upgradeContributionWarningTest(invalidMagicVersion, /This contribution is already at the latest MagIC data model version/i); //rest of that string:  ${currentVersion}
    });

  });

  // Test upgrading valid JSON.
  describe('upgrade valid', () => {
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
      upgradeContributionJSONTest(jsonOld, jsonNew);
    });
  });

  // Test upgrading valid files.


});
