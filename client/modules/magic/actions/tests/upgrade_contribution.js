const {describe, it} = global;
import {expect} from 'chai';
import UpgradeContribution from '../upgrade_contribution';
//import {default as contribution289  } from '/test_files/289.js';
//import {default as contribution3552 } from '/test_files/3552.js';
//import {default as contribution7527 } from '/test_files/7527.js';
//import {default as contribution7661 } from '/test_files/7661.js';
//import {default as contribution8054 } from '/test_files/8054.js';
//import {default as contribution10507} from '/test_files/10507.js';

const upgradeContributionWarningTest = (jsonOld, reErrorMsg) => {

  // create a mock Map instead of a Reactive Dict
  const LocalState = new Map();

  // upgrade the old JSON
  const Upgrader = new UpgradeContribution({LocalState});
  Upgrader.upgrade(jsonOld);

  // retrieve the spied arguments from the 1st time LocalState.set was called
  const errors = LocalState.get('UPGRADE_CONTRIBUTION_WARNINGS');

  // expect the parse errors to contain one error that matches the matchErrorMSG regex
  expect(errors.length).to.be.at.least(1);
  expect(errors[errors.length - 1]['message']).to.match(reErrorMsg);

};

const upgradeContributionErrorTest = (jsonOld, reErrorMsg) => {

  // create a mock Map instead of a Reactive Dict
  const LocalState = new Map();

  console.log(`Recieved by Error Tets test ${JSON.stringify(jsonOld)}`);

  // upgrade the old JSON
  const Upgrader = new UpgradeContribution({LocalState});
  Upgrader.upgrade(jsonOld);

  // retrieve the spied arguments from the 1st time LocalState.set was called
  const errors = LocalState.get('UPGRADE_CONTRIBUTION_ERRORS');

  // expect the parse errors to contain one error that matches the matchErrorMSG regex
  expect(errors.length).to.be.at.least(1);
  expect(errors[errors.length - 1]['message']).to.match(reErrorMsg);

};

const upgradeContributionNoErrorTest = (jsonOld) => {

  // create a mock Map instead of a Reactive Dict
  const LocalState = new Map();

  // upgrade the old JSON
  const Upgrader = new UpgradeContribution({LocalState});
  Upgrader.upgrade(jsonOld);

  // retrieve the spied arguments from the 1st time LocalState.set was called
  const errors = LocalState.get('UPGRADE_CONTRIBUTION_ERRORS');

  // expect no errors
  expect(errors.length).to.equal(0);

};

const upgradeContributionJSONTest = (jsonOld, jsonExpected) => {

  // create a mock Map instead of a Reactive Dict
  const LocalState = new Map();

  // upgrade the old JSON
  const Upgrader = new UpgradeContribution({LocalState});
  const jsonNew = Upgrader.upgrade(jsonOld);

  // retrieve the spied arguments from the 1st time LocalState.set was called
  const errors = LocalState.get('UPGRADE_CONTRIBUTION_ERRORS');

  // expect no errors and check against expected JSON
  expect(errors.length).to.equal(0);
  expect(jsonNew).to.deep.equal(jsonExpected);

};


describe('magic.actions.upgrade_contribution', () => {

  //**********DETECT INVALID
  describe('upgrade invalid', () => {
      it('should warn about upgrading an empty object', () => {
      upgradeContributionWarningTest(null, /Contribution is empty/i);
      upgradeContributionWarningTest(undefined, /Contribution is empty/i);
      upgradeContributionWarningTest({}, /Contribution is empty/i);
    });



    //NOTE:2.5 and before uses "magic_contributions" 3.0 uses "contributions"
    //Failed to find the "magic_contributions" or "contribution" table.   XX
    it('should reject when no contribution or magic_contributions table is found', () => {

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
       upgradeContributionErrorTest(jsonNoContribTable, /Failed to find the "magic_contributions" or "contribution" table/i);
    });


    it('should reject when magic_contributions table does not have exactly one row', () => {
      const jsonContribTwoColumns = {
        magic_contributions: [
          {
            col1: 'str1',
            col2: '1.2'
          },
          {
            col1: 'str2',
            col2: '1.2'
          }
        ]
      };
      upgradeContributionErrorTest(jsonContribTwoColumns, /The "magic_contributions" table does not have exactly one row/i);
    });

    it('should reject when "magic_contributions" table does not include the "magic_version" column.', () => {
      const jsonContribNoMagicVersion = {
        magic_contributions: [{
          not_magic_version: '1.2',
          col2: '1.2'
        }]
      };
      upgradeContributionErrorTest(jsonContribNoMagicVersion, /The "magic_contributions" table does not include the "magic_version" column./i);
    });

    it('should reject when the "contribution" table does not have exactly one row.', () => {
      const jsonContribTwoColumns = {
        contribution: [
          {
            col1: 'str1',
            col2: '1.2'
          },
          {
            col1: 'str2',
            col2: '1.2'
          }
        ]
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

    it('should reject if there exists both a "magic_contributions" and "contribution" table.', () => {
      const jasonDoubleContributionTables =
      {
        magic_contributions:
            [
              {magic_version: '2.2'}
            ],
        contributions:
            [
              {magic_version: '2.2'}
            ]
      };
      upgradeContributionErrorTest(jasonDoubleContributionTables, /Found both a "magic_contributions" and "contribution" table./i);
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



  //*******UPGRADE VALID FILES
  describe('upgrade valid', () => {
    it('should keep numbers as strings', () => {
      const jsonOld = {
        magic_contributions: [{
          magic_version: '2.2'
        }],
        er_locations: [{
          begin_latitude: '10.0'
        }]
      };
      const jsonNew = {
        magic_contributions: [{
          magic_version: '3.0'
        }],
        er_locations: [{
          begin_latitude: '10.0'
        }]
      };
      upgradeContributionJSONTest(jsonOld, jsonNew);
    });
  });


});
