const {describe, it} = global;
import {expect} from 'chai';
import {spy} from 'sinon';
import ParseContribution from '../parse_contribution';

const parseContributionErrorTest = (text, reErrorMsg) => {

  // create a mock LocalState object and spy on its set() method
  const LocalState = {set: spy()};

  // parse the test string
  const parser = new ParseContribution({LocalState});
  parser.parse(text);

  // retrieve the spied arguments from the 1st time LocalState.set was called
  const args = LocalState.set.args[0];
  const LocalState_key = args[0];
  const LocalState_val = args[1];

  // expect the parse errors to contain one error that matches the matchErrorMSG regex
  expect(LocalState_key).to.be.equal('PARSE_CONTRIBUTION_ERRORS');
  expect(LocalState_val).to.match(reErrorMsg);

};

describe('magic.actions.parseContribution', () => {
  describe('parse', () => {
    it('should reject if text is not there', () => {
      parseContributionErrorTest(null, /required/);
    });
    it('should reject nonsense', () => {
      parseContributionErrorTest('nonsense', /not recognized as a column delimiter/);
    });
    it('should reject if table name is missing', () => {
      parseContributionErrorTest('tab\n', /table name could not be found/);
    });
  });
});
