const {describe, it} = global;
import _ from 'lodash';
import {expect} from 'chai';
import Promise from 'bluebird';
import ValidateContribution from '/lib/modules/magic/validate_contribution';
//import {default as contribution3552 } from '/lib/modules/magic/tests/files/contributions/3552.js';
//import {default as contribution8054 } from '/lib/modules/magic/tests/files/contributions/8054.js';
//import {default as contribution10507} from '/lib/modules/magic/tests/files/contributions/10507_partial.js';

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

// Test validating valid contributions.
describe('when validating valid JSON', () => {

  it('should not generate any errors or warning.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      locations: [{
        location: 'location name',
        location_type: 'Archeological Ashes',
        geologic_classes: 'Archeologic',
        lithologies: ':Achondrite:Agate:',
        lat_s: "0",
        lat_n: "0",
        lon_w: "0",
        lon_e: "0",
        age_unit: 'Ma'
      }]
    };
    return validateNoErrorTest(json);
  });

});

// Test validating invalid contributions.
describe('when validating invalid JSON', () => {

  it('should report a missing required field.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      locations: [{
        location: 'location name'
      }]
    };
    return validateErrorTest(json, 'locations', 'location_type', /missing required column/);
  });

  it('should report a value not the controlled vocabulary.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      locations: [{
        age_unit: '?'
      }]
    };
    return validateErrorTest(json, 'locations', 'age_unit', /not in the .* controlled vocabulary/);
  });

  it('should report a value too small.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      locations: [{
        lat_s: "-91"
      }]
    };
    return validateErrorTest(json, 'locations', 'lat_s', /is less than/);
  });

  it('should report a value too large.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      locations: [{
        lat_s: "91"
      }]
    };
    return validateErrorTest(json, 'locations', 'lat_s', /is greater than/);
  });

});

// Expect validation errors to contain one error that matches the reValidationError regex.
const validateNoErrorTest = (json) => {
  const validator = new ValidateContribution({});
  return validator.validatePromise(json).then(() => {
    if (_.keys(validator.validation.errors).length > 0) {
      console.log(JSON.stringify(validator.validation.errors, null, '\t'));
    }
    expect(validator.warnings()).to.be.empty;
    expect(validator.errors()).to.be.empty;
    expect(_.keys(validator.validation.errors)).to.be.empty;
  });
};

// Expect validation errors to contain one error that matches the reValidationError regex.
const validateErrorTest = (json, table, column, reValidationError) => {
  const validator = new ValidateContribution({});
  return validator.validatePromise(json).then(() => {
    if (_.keys(validator.validation.errors).length > 0) {
      console.log(JSON.stringify(validator.validation.errors, null, '\t'));
    }
    expect(validator.warnings()).to.be.empty;
    expect(validator.errors()).to.be.empty;
    expect(_.keys(validator.validation.errors)).to.be.contain(table);
    expect(_.keys(validator.validation.errors[table])).to.be.contain(column);
    expect(_.find(_.keys(validator.validation.errors[table][column]), message => message.match(reValidationError))).to.not.be.undefined;
  });
};

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