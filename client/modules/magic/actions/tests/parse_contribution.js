const {describe, it} = global;
import {expect} from 'chai';
import {spy} from 'sinon';
import parseContribution from '../parse_contribution';

describe('magic.actions.parseContribution', () => {
  describe('create', () => {
    it('should reject if text is not there', () => {
      const LocalState = {set: spy()};
      parseContribution.create({LocalState}, null);
      const args = LocalState.set.args[0];
      expect(args[0]).to.be.equal('PARSE_CONTRIBUTION_ERROR');
      expect(args[1]).to.match(/required/);
    });
  });
});
