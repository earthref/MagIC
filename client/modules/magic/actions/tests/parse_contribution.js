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

    it('should reject nonsense with tab header', () => {
      parseContributionErrorTest('nonsense\ttable', /unrecognized column delimiter/i);
    })


    it('should reject leading space nonsense', () => {
      parseContributionErrorTest('  nonsense  \ttable\ncol1\tcol2\nstr1\t1.2', /. Expected "tab"./i);
    });

    //MY PARSER DETECTED THESE CASES
    var noTableNames = ["tab\n",
      " tab \n",
      " tab \t",
      "tab\t\n",
      'tab\t \n'];
    for (var noTableName of noTableNames)
    {
      it('should reject if table name is missing', () => {
        parseContributionErrorTest(noTableName, /No table name following tab delimiter/);
      });
    }

    it('should reject repeated column names', () => {
      parseContributionErrorTest('tab\ttable\ncol1\tcol1\n', /Found duplicate column names/i);
    });


    //VALID BUT EMPTY FILES
    it('a table can have no rows under it', () => {
      parseContributionWarningTest('tab\ttable\ncol1\tcol2\n', /no rows in table/i);
    });

    it('a table can have no rows under it', () => {
      parseContributionWarningTest('tab \t123\ncol1\tcol2\n', /no rows in table/i);
    });



    //VALID TEXT FILE JSON TESTS
    /* All Numbers should remain as strings for now.
     // FOR THE SCHEMA CHECKER json = { "table": [ { "col1": "str1", "col2": 1.2 } ] };
     // FOR NOW json = { "table": [ { "col1": "str1", "col2": "1.2" } ] };*/
    //"tab\ttable\ncol1\tcol2\nstr1\t1.2"
    it('should keep numbers as strings', () => {
      var json = { "table": [ { "col1": "str1", "col2": "1.2" } ] };
      parseContributionJSONTest('tab\ttable\ncol1\tcol2\nstr1\t1.2', json);
    });


    /* Blank lines, and leading and trailing spaces (not tabs) should be removed.
     // json = { "table": [ { "col1": "str1", "col2": "1.2" } ] };*/
    var filesWithBlanks = ["\ntab\ttable\ncol1\tcol2\nstr1\t1.2",
      "tab\ttable\ncol1\tcol2\n\n\nstr1\t1.2",
      " tab\ttable\ncol1\tcol2\nstr1\t1.2",
      "tab  \ttable\ncol1\tcol2\nstr1\t1.2",
      "tab\t  table\ncol1\tcol2\nstr1\t1.2",
      "tab\ttable\ncol1  \tcol2\n  str1\t1.2  "];
    for (var fileWithBlanks of filesWithBlanks)
    {

      it('should create proper JSON eliminating blank lines and leading/trailing spaces from:" +fileWithBlanks' , () => {
        var json = { "table": [ { "col1": "str1", "col2": "1.2" } ] };
        parseContributionJSONTest(fileWithBlanks, json);
      });
    }







    ///JSON tests
    it('should handle a valid string with no data', () => {
      parseContributionJSONTest('tab\ttable\ncol1\tcol2\n', {});
    });
  });
});
