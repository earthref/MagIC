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
  expect(LocalState_key).to.be.equal('PARSE_CONTRIBUTION_ERROR');
  expect(LocalState_val).to.match(reErrorMsg);

};

describe('magic.actions.parseContribution', () => {
  describe('parse', () => {
    it('should reject if text is not there', () => {
      parseContributionErrorTest(null, /Contribution text is required./);
    });

    it('should reject nonsense with no tab header', () => {
      parseContributionErrorTest('nonsense', /Start of table string \"tab\" expected but not found./);
    });

    it('should reject nonsense with tab header', () => {
      parseContributionErrorTest('nonsense\ttable', /Start of table string \"tab\" expected but not found./);
    });

    it('should reject leading space nonsense with tab and column headers', () => {
      parseContributionErrorTest('  nonsense  \ttable\ncol1\tcol2\nstr1\t1.2', /Start of table string \"tab\" expected but not found./);
    });

    var noTableNames = ["tab\n",
        " tab \n",
        " tab \t",
        "tab\t\n"];
    for (var noTableName of noTableNames)
    {
      it('should reject if table name is missing', () => {
        parseContributionErrorTest(noTableName, /Error, table delimiter \"tab\" has no table name./);
      });
    }
  });
});
