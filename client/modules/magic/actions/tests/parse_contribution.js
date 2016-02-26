const {describe, it} = global;
import {expect} from 'chai';
import {spy} from 'sinon';
import ParseContribution from '../parse_contribution';

const parseContributionWarningTest = (text, reErrorMsg) => {

  // create a mock Map instead of a Reactive Dict
  const LocalState = new Map();

  // parse the test string
  const parser = new ParseContribution({LocalState});
  parser.parse(text);

  // retrieve the spied arguments from the 1st time LocalState.set was called
  const errors = LocalState.get('PARSE_CONTRIBUTION_WARNINGS');

  // expect the parse errors to contain one error that matches the matchErrorMSG regex
  expect(errors.length).to.be.at.least(1);
  expect(errors[errors.length - 1]['message']).to.match(reErrorMsg);

};

const parseContributionErrorTest = (text, reErrorMsg) => {

  // create a mock Map instead of a Reactive Dict
  const LocalState = new Map();

  // parse the test string
  const parser = new ParseContribution({LocalState});
  parser.parse(text);

  // retrieve the spied arguments from the 1st time LocalState.set was called
  const errors = LocalState.get('PARSE_CONTRIBUTION_ERRORS');

  // expect the parse errors to contain one error that matches the matchErrorMSG regex
  expect(errors.length).to.be.at.least(1);
  expect(errors[errors.length - 1]['message']).to.match(reErrorMsg);
  
};

const parseContributionJSONTest = (text, jsonExpected) => {

  // create a mock Map instead of a Reactive Dict
  const LocalState = new Map();

  // parse the test string
  const parser = new ParseContribution({LocalState});
  const json = parser.parse(text);

  // retrieve the spied arguments from the 1st time LocalState.set was called
  const errors = LocalState.get('PARSE_CONTRIBUTION_ERRORS');

  // expect no errors and
  expect(errors.length).to.equal(0);
  expect(json).to.deepEqual(jsonExpected);

};

describe('magic.actions.parseContribution', () => {
  describe('parse', () => {
    it('should warn about parsing an empty string', () => {
      parseContributionWarningTest(null, /empty/i);
    });
    it('should reject nonsense', () => {
      parseContributionErrorTest('nonsense', /unrecognized column delimiter/i);
    });
    it('should reject if table name is missing', () => {
      parseContributionErrorTest('tab\t \n', /invalid table definition/i);
    });
    it('should handle a valid string with no data', () => {
      parseContributionJSONTest('tab\ttable\ncol1\tcol2\n', {});
    });
  });
});
