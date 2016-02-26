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
  describe('upgrade invalid', () => {
    it('should warn about upgrading an empty object', () => {
      upgradeContributionWarningTest(null, /empty/i);
      upgradeContributionWarningTest(undefined, /empty/i);
      upgradeContributionWarningTest({}, /empty/i);
    });
  });
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
          magic_version: '2.3'
        }],
        er_locations: [{
          begin_latitude: '10.0'
        }]
      };
      upgradeContributionJSONTest(jsonOld, jsonNew);
    });
  });
});
