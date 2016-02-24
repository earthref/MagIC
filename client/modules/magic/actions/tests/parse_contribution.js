const {describe, it} = global;
import {expect} from 'chai';
import {spy} from 'sinon';
import parseContribution from '../parse_contribution';

const parseContributionErrorTest = (text, matchError) => {
  const LocalState = {set: spy()};
  const parser = new parseContribution({LocalState});
  parser.parse(text);
  const args = LocalState.set.args[0];
  expect(args[0]).to.be.equal('PARSE_CONTRIBUTION_ERROR');
  expect(args[1]).to.match(matchError);
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
