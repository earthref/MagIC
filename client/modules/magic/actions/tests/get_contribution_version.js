const {describe, it} = global;
import {expect} from 'chai';
import ParseContribution from '../parse_contribution';
import GetContributionVersion from '../get_contribution_version';
import {default as contribution3552 } from './files/contributions/3552.js';
import {default as contribution8054 } from './files/contributions/8054.js';
import {default as contribution10507} from './files/contributions/10507.js';

describe('magic.actions.get_contribution_version', () => {

  // Test getting version from invalid strings.
  describe('when getting version from invalid JSON', () => {
    it('should warn about getting version from an empty object', () => {
      getContributionVersionWarningTest(null, /the first argument .* is empty/i);
      getContributionVersionWarningTest(undefined, /the first argument .* is empty/i);
      getContributionVersionWarningTest({}, /the first argument .* is empty/i);
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
      getContributionVersionErrorTest(jsonNoContribTable,
        /failed to find the "contribution" table/i);
    });

    it('should reject when the "contribution" table does not include the "magic_version" column.', () => {
      const jsonContribNoMagicVersion = {
        contribution: [{
          not_magic_version: '2.2'
        }]
      };
      getContributionVersionErrorTest(jsonContribNoMagicVersion,
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
      getContributionVersionErrorTest(jsonContribTwoRows,
        /table does not have exactly one row./i);
    });

    it('should reject if the data model version is invalid.', () => {
      const invalidMagicVersion = {
        contribution: [{
          magic_version: '0.1'
        }]
      };
      getContributionVersionErrorTest(invalidMagicVersion,
        /data model version .* is invalid/i);
    });

  });

  // Test getting version from valid files.
  describe('when exporting valid files to text', () => {
    it('should exporting contribution 3552 (MagIC version 2.2) with no errors', () => {
      const Parser3552 = new ParseContribution({});
      const json3552 = Parser3552.parse(contribution3552);
      getContributionVersionJSONTest(json3552, '2.2');
    });
    it('should exporting contribution 8054 (MagIC version 2.4) with no errors', () => {
      const Parser8054 = new ParseContribution({});
      const json8054 = Parser8054.parse(contribution8054);
      getContributionVersionJSONTest(json8054, '2.4');
    });
    it('should exporting contribution 10507 (MagIC version 2.5) with no errors', () => {
      const Parser10507 = new ParseContribution({});
      const json10507 = Parser10507.parse(contribution10507);
      getContributionVersionJSONTest(json10507, '2.5');
    });
  });
});

// Expect the warnings to contain one warning that matches the reWarningMsg regex.
const getContributionVersionWarningTest = (json, reWarningMsg) => {
  const VersionGetter = new GetContributionVersion({});
  VersionGetter.getVersion(json);
  expect(VersionGetter.warnings().length).to.be.at.least(1);
  expect(VersionGetter.warnings()[VersionGetter.warnings().length - 1]['message']).to.match(reWarningMsg);
};

// Expect the errors to contain one error that matches the reErrorMsg regex.
const getContributionVersionErrorTest = (json, reErrorMsg) => {
  const VersionGetter = new GetContributionVersion({});
  VersionGetter.getVersion(json);
  expect(VersionGetter.errors().length).to.be.at.least(1);
  expect(VersionGetter.errors()[VersionGetter.errors().length - 1]['message']).to.match(reErrorMsg);
};

// Expect no errors.
const getContributionVersionNoErrorTest = (json) => {
  const VersionGetter = new GetContributionVersion({});
  VersionGetter.getVersion(json);
  expect(VersionGetter.errors().length).to.equal(0);
};

// Expect no errors and check against expected text.
const getContributionVersionJSONTest = (json, expectVersion) => {
  const VersionGetter = new GetContributionVersion({});
  const version = VersionGetter.getVersion(json);
  expect(VersionGetter.errors().length).to.equal(0);
  expect(version).to.equal(expectVersion);
};