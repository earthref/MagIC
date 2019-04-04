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

// Test validating field types.
describe('when validating field types', () => {

  it('should validate "Integer" fields.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      locations: [{}]
    };
    const isGood = ["01", "9 ", "+1", " -2"];
    const noGood = ["1.", "a1", " 2* ", "1e5", "-"];
    const jsonIsGood = isGood.map(v => { let j = _.cloneDeep(json); j.locations[0].dir_n_sites = v; return j; });
    const jsonNoGood = noGood.map(v => { let j = _.cloneDeep(json); j.locations[0].dir_n_sites = v; return j; });
    const promises = [];
    _.map(jsonIsGood, j => promises.push(validateMissingErrorTest(j, 'locations', 'dir_n_sites', /value .* is not of type "Integer"/)));
    _.map(jsonNoGood, j => promises.push(validateErrorTest(       j, 'locations', 'dir_n_sites', /value .* is not of type "Integer"/)));
    return Promise.all(promises);
  });

  it('should validate "Number" fields.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      locations: [{}]
    };
    const isGood = ["1.", "01", "9 ", "+1", " -2", "1e5", "1e5.2", "1.52e-1"];
    const noGood = ["a1", " 2* ", "a", "1-2", "1..2", "1.2.2", "1.2,2"];
    const jsonIsGood = isGood.map(v => { let j = _.cloneDeep(json); j.locations[0].age = v; return j; });
    const jsonNoGood = noGood.map(v => { let j = _.cloneDeep(json); j.locations[0].age = v; return j; });
    const promises = [];
    _.map(jsonIsGood, j => promises.push(validateMissingErrorTest(j, 'locations', 'age', /value .* is not of type "Number"/)));
    _.map(jsonNoGood, j => promises.push(validateErrorTest(       j, 'locations', 'age', /value .* is not of type "Number"/)));
    return Promise.all(promises);
  });

  it('should validate "Timestamp" fields.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      samples: [{}]
    };
    const isGood = ["2013-02-08", "20130208", "2013-02-08T09", "2013-02-08 09:30:26.123", "20130208T080910,123", "2013-02-08 09+07:00", "2013-02-08 09Z", "2013-02-08 09:30:26.123+07:00"];
    const noGood = ["2013-13-08", "a", ":", "Invalid date"];
    const jsonIsGood = isGood.map(v => { let j = _.cloneDeep(json); j.samples[0].timestamp = v; return j; });
    const jsonNoGood = noGood.map(v => { let j = _.cloneDeep(json); j.samples[0].timestamp = v; return j; });
    const promises = [];
    _.map(jsonIsGood, j => promises.push(validateMissingErrorTest(j, 'samples', 'timestamp', /value .* is not of type "Timestamp"/)));
    _.map(jsonNoGood, j => promises.push(validateErrorTest(       j, 'samples', 'timestamp', /value .* is not of type "Timestamp"/)));
    return Promise.all(promises);
  });

  it('should validate measurements.timestamp field.', () => { // This will fail because there are missing required measurements columns in the json, so the validation stops there.
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      measurements: {
        columns: ['timestamp', 'measurement', 'experiment', 'specimen', 'sequence', 'quality', 'method_codes', 'citations'],
        rows: [['', '1', 'a', 'b', '1', 'g', 'AE-BS', 'This study']]
      }
    };
    const isGood = ["2013-02-08", "20130208", "2013-02-08T09", "2013-02-08 09:30:26.123", "20130208T080910,123", "2013-02-08 09+07:00", "2013-02-08 09Z", "2013-02-08 09:30:26.123+07:00"];
    const noGood = ["2013-13-08", "a", ":", "Invalid date"];
    const jsonIsGood = isGood.map(v => { let j = _.cloneDeep(json); j.measurements.rows[0][0] = v; return j; });
    const jsonNoGood = noGood.map(v => { let j = _.cloneDeep(json); j.measurements.rows[0][0] = v; return j; });
    const promises = [];
    _.map(jsonIsGood, j => promises.push(validateMissingErrorTest(j, 'measurements', 'timestamp', /value .* is not of type "Timestamp"/)));
    _.map(jsonNoGood, j => promises.push(validateErrorTest(       j, 'measurements', 'timestamp', /value .* is not of type "Timestamp"/)));
    return Promise.all(promises);
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

  it('should report a missing requiredIf field.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      locations: [{
        age_sigma: 0
      }]
    };
    return validateErrorTest(json, 'locations', 'age', /missing required column .* since column .* is not empty/);
  });

  it('should report a missing requiredIfGroup field.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      locations: [{
        dir_inc: 0
      }]
    };
    return validateErrorTest(json, 'locations', 'dir_dec', /missing required column .* since group .* is not empty/);
  });

  it('should report a missing requiredOneInGroup field.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      ages: [{
        age: 0
      }]
    };
    return validateErrorTest(json, 'ages', 'location', /missing possibly required column .* since group .* is empty/);
  });

  it('should report a missing requiredUnless field.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      locations: [{
        location: 'location name'
      }]
    };
    return validateErrorTest(json, 'locations', 'age', /missing required column .* since columns? .* (is|are) empty/);
  });

  it('should report a missing requiredUnlessTable field.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      locations: [{
        location: 'location name'
      }]
    };
    return validateErrorTest(json, 'locations', 'citations', /missing required column .* since there is no .* table/);
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

  it('should report an unknown method code.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      locations: [{
        method_codes: 'LP-PI:?'
      }]
    };
    return validateErrorTest(json, 'locations', 'method_codes', /value "\?" is an unknown method code/);
  });

  it('should report a value too small.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      locations: [{
        lat_s: -91
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
        lat_s: 91
      }]
    };
    return validateErrorTest(json, 'locations', 'lat_s', /is greater than/);
  });

  it('should report missing parent keys.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      sites: [{
        location: "a"
      }]
    };
    return validateErrorTest(json, 'sites', 'location', /not present in table .* column/);
  });

  it('should report missing child keys.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      sites: [{
        samples: "a"
      }]
    };
    return validateErrorTest(json, 'sites', 'samples', /not present in table .* column/);
  });

  it('should report missing experiment keys.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      sites: [{
        experiments: "a"
      }]
    };
    return validateErrorTest(json, 'sites', 'experiments', /not present in table .* column/);
  });

});

// Test validating valid contributions.
describe('when validating valid JSON', () => {

  it('should not generate any errors or warnings for natural data.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      locations: [{
        location: 'location 1',
        sites: 'site 1',
        location_type: 'Archeological Ashes',
        geologic_classes: 'archeologic',
        lithologies: ':Achondrite:Agate:',
        lat_s: 0,
        lat_n: 0,
        lon_w: 0,
        lon_e: 0,
        age: 0,
        age_unit: 'Ma'
      }],
      sites: [{
        location: 'location 1',
        site: 'site 1',
        result_quality: 'g',
        result_type: 'a',
        method_codes: ':LP-PI',
        citations: 'this study',
        geologic_classes: 'Archeologic',
        geologic_types: 'Amphora',
        lithologies: ':Achondrite:Agate:',
        lat: 0,
        lon: 0,
        age: 0,
        age_unit: 'Ma'
      }],
      samples: [{
        location: 'location 1',
        site: 'site 1',
        sample: 'sample 1',
        specimens: 'specimen 1:specimen 2:',
        result_quality: 'g',
        result_type: 'a',
        method_codes: ':LP-PI',
        citations: 'this study'
      }],
      specimens: [{
        location: 'location 1',
        site: 'site 1',
        sample: 'sample 1',
        specimen: 'specimen 1',
        experiments: 'experiment 1',
        result_quality: 'g',
        method_codes: ':LP-PI',
        citations: 'this study'
      }, {
        location: 'location 1',
        site: 'site 1',
        sample: 'sample 1',
        specimen: 'specimen 2',
        experiments: 'experiment 2:',
        result_quality: 'g',
        method_codes: ':LP-PI',
        citations: 'this study'
      }],
      measurements: {
        columns: ['measurement', 'experiment', 'specimen', 'sequence', 'standard', 'quality', 'method_codes', 'citations'],
        rows: [
          ['measurement 1', 'experiment 1', 'specimen 1', '1', 's', 'g', 'LP-PI', 'This Study'],
          ['measurement 2', 'experiment 2', 'specimen 2', '2', 's', 'g', 'LP-PI', 'This Study']
        ]
      }
    };
    return validateNoErrorTest(json);
  });

});

// Expect validation errors to be empty.
const validateNoErrorTest = (json) => {
  const validator = new ValidateContribution({});
  return validator.validatePromise(json).then(() => {
    if (_.keys(validator.validation.errors).length > 0) {
      //console.log(JSON.stringify(validator.validation.errors, null, ' '));
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
      //console.log(JSON.stringify(validator.validation.errors, null, ' '));
    }
    expect(validator.warnings()).to.be.empty;
    expect(validator.errors()).to.be.empty;
    expect(_.keys(validator.validation.errors)).to.be.contain(table);
    expect(_.keys(validator.validation.errors[table])).to.be.contain(column);
    expect(_.find(_.keys(validator.validation.errors[table][column]), message => message.match(reValidationError))).to.not.be.undefined;
  });
};

// Expect validation errors to not contain an error that matches the reValidationError regex.
const validateMissingErrorTest = (json, table, column, reValidationError) => {
  const validator = new ValidateContribution({});
  return validator.validatePromise(json).then(() => {
    if (_.keys(validator.validation.errors).length > 0) {
      //console.log(JSON.stringify(validator.validation.errors, null, ' '));
    }
    expect(validator.warnings()).to.be.empty;
    expect(validator.errors()).to.be.empty;
    if (
      validator.validation.errors && 
      validator.validation.errors[table] && 
      validator.validation.errors[table][column]
    ) {
      expect(_.find(_.keys(validator.validation.errors[table][column]), message => message.match(reValidationError))).to.be.undefined;
    }
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