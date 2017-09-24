const {describe, it} = global;
import _ from 'lodash';
import {expect} from 'chai';
import Promise from 'bluebird';
import ValidateContribution from '/lib/modules/magic/validate_contribution';
import {default as contribution3552 } from './files/contributions/3552.js';
import {default as contribution8054 } from './files/contributions/8054.js';
import {default as contribution10507} from './files/contributions/10507.js';

describe('magic.actions.validate_contribution', () => {

  // Test getting version from invalid strings.
  describe('when getting data model version from invalid JSON', () => {
    it('should warn about getting version from an empty object', () => {
      getContributionVersionWarningTest(null, /the first argument .* is empty/i);
      getContributionVersionWarningTest(undefined, /the first argument .* is empty/i);
      getContributionVersionWarningTest({}, /the first argument .* is empty/i);
    });

    it('should reject when the "contribution" table does not have exactly one row.', () => {
      const json = {
        contribution: [{
          data_model_version: '2.2'
        }, {
          data_model_version: '2.3'
        }]
      };
      return getContributionVersionErrorTest(json,
        /table does not have exactly one row./i);
    });

    it('should reject if the data model version is invalid.', () => {
      const json = {
        contribution: [{
          data_model_version: '0.1'
        }]
      };
      return getContributionVersionErrorTest(json,
        /data model version .* is invalid/i);
    });

  });

  // Test getting the contribution MagIC Data Model version.
  describe('when getting data model version from valid JSON', () => {

    it('should get the data model version', () => {
      const json = {
        contribution: [{
          data_model_version: '3.0'
        }]
      };
      return getContributionVersionTest(json, '3.0');
    });

    it('should warn about guessing the data model version', () => {
      const json = {
        locations: [{
          location: 'A'
        }],
        measurements: {
          columns: ['number', 'experiment'],
          rows: [
            ['1','A']
          ]
        }
      };
      return getContributionVersionWarningTest(json, /guessed that the contribution is using/i);
    });

    it('should guess the data model version is 3.0', () => {
      const json = {
        locations: [{
          location: 'A'
        }],
        measurements: {
          columns: ['number', 'experiment'],
          rows: [
            ['1','A']
          ]
        }
      };
      return guessContributionVersionTest(json, '3.0');
    });

    it('should guess the data model version is 2.5', () => {
      const json = {
        er_locations: [{
          er_location_name: 'A'
        }],
        magic_measurements: {
          columns: ['measurement_number', 'magic_experiment_name'],
          rows: [
            ['1','A']
          ]
        }
      };
      return guessContributionVersionTest(json, '2.5');
    });

  });

});

// Expect the warnings to contain one warning that matches the reWarningMsg regex.
const getContributionVersionWarningTest = (json, reWarningMsg) => {
  const validator = new ValidateContribution({});
  validator.getVersion(json);
  expect(validator.warnings().length).to.be.at.least(1);
  expect(_.find(validator.warnings(), warning => warning.message.match(reWarningMsg))).to.not.be.undefined;
};

// Expect the errors to contain one error that matches the reErrorMsg regex.
const getContributionVersionErrorTest = (json, reErrorMsg) => {
  const validator = new ValidateContribution({});
  validator.getVersion(json);
  expect(validator.errors().length).to.be.at.least(1);
  expect(_.find(validator.errors(), error => error.message.match(reErrorMsg))).to.not.be.undefined;
};

// Expect the version to be retrieved correctly.
const getContributionVersionTest = (json, versionExpected) => {
  const validator = new ValidateContribution({});
  let { version, isGuessed } = validator.getVersion(json);
  expect(isGuessed).to.be.false;
  expect(version).to.equal(versionExpected);
};

// Expect the version to be guessed correctly.
const guessContributionVersionTest = (json, versionExpected) => {
  const validator = new ValidateContribution({});
  let { version, isGuessed } = validator.getVersion(json);
  expect(isGuessed).to.be.true;
  expect(version).to.equal(versionExpected);
};