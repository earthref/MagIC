const {describe, it} = global;
import {expect} from 'chai';
import ParseContribution from '../parse_contribution';
import {default as contribution289  } from './files/contributions/289.js';
import {default as contribution3552 } from './files/contributions/3552.js';
import {default as contribution7527 } from './files/contributions/7527.js';
import {default as contribution7661 } from './files/contributions/7661.js';
import {default as contribution8054 } from './files/contributions/8054.js';
import {default as contribution10507} from './files/contributions/10507.js';

// Expect the parse errors to contain one error that matches the matchErrorMSG regex.
const parseContributionWarningTest = (text, reErrorMsg) => {
  const Parser = new ParseContribution({});
  Parser.parse(text);
  expect(Parser.warnings().length).to.be.at.least(1);
  expect(Parser.warnings()[Parser.warnings().length - 1]['message']).to.match(reErrorMsg);
};

// Expect the parse errors to contain one error that matches the matchErrorMSG regex.
const parseContributionErrorTest = (text, reErrorMsg) => {
  const Parser = new ParseContribution({});
  Parser.parse(text);
  expect(Parser.errors().length).to.be.at.least(1);
  expect(Parser.errors()[Parser.errors().length - 1]['message']).to.match(reErrorMsg);
};

// Expect no errors.
const parseContributionNoErrorTest = (text) => {
  const Parser = new ParseContribution({});
  Parser.parse(text);
  expect(Parser.errors().length).to.equal(0);

};

// Expect no errors and check against expected JSON.
const parseContributionJSONTest = (text, jsonExpected) => {
  const Parser = new ParseContribution({});
  const json = Parser.parse(text);
  expect(Parser.errors().length).to.equal(0);
  expect(json).to.deep.equal(jsonExpected);
};

describe('magic.actions.parse_contribution', () => {

  // Test parsing invalid strings.
  describe('when parsing invalid strings', () => {
    it('should warn about parsing an empty string', () => {
      parseContributionWarningTest(null, /empty/i);
      parseContributionWarningTest(undefined, /empty/i);
      parseContributionWarningTest('', /empty/i);
    });

    it('should reject nonsense', () => {
      parseContributionErrorTest('nonsense', /unrecognized column delimiter/i);
    });

    it('should reject nonsense with tab header', () => {
      parseContributionErrorTest('nonsense\ttable', /unrecognized column delimiter/i);
    });

    it('should reject leading space nonsense', () => {
      parseContributionErrorTest('  nonsense  \ttable\ncol1\tcol2\nstr1\t1.2', /. Expected "tab"./i);
    });

    it('should reject if table name is missing', () => {
      const noTableNames = [
        'tab\n',
        ' tab \n',
        ' tab \t',
        'tab\t\n',
        'tab\t \n'
      ];
      for (var noTableName of noTableNames)
        parseContributionErrorTest(noTableName, /no table name following tab delimiter/i);
    });

    it('should reject repeated column names', () => {
      parseContributionErrorTest('tab\ttable\ncol1\tcol1\n', /found duplicate column names/i);
    });

    it('should warn about empty tables', () => {
      parseContributionWarningTest('tab\ttable\ncol1\tcol2\n', /no data values were found/i);
      parseContributionWarningTest('tab \t123\ncol1\tcol2\n', /no data values were found/i);
    });
  });


  // Test parsing valid strings.
  describe('when parsing valid strings', () => {
    it('should keep numbers as strings', () => {
      const json = {
        table: [{
          col1: 'str1',
          col2: '1.2'
        }]
      };
      parseContributionJSONTest('tab\ttable\ncol1\tcol2\nstr1\t1.2', json);
    });

    it('should eliminate blank lines and leading/trailing spaces', () => {
      const withBlanks = [
        '\ntab\ttable\ncol1\tcol2\nstr1\t1.2',
        'tab\ttable\ncol1\tcol2\n\n\nstr1\t1.2',
        ' tab\ttable\ncol1\tcol2\nstr1\t1.2',
        'tab  \ttable\ncol1\tcol2\nstr1\t1.2',
        'tab\t  table\ncol1\tcol2\nstr1\t1.2',
        'tab\ttable\ncol1  \tcol2\n  str1\t1.2  '
      ];
      const json = {
        table: [{
          col1: 'str1',
          col2: '1.2'
        }]
      };
      for (var withBlank of withBlanks)
        parseContributionJSONTest(withBlank, json);
    });
  });

  // Test parsing valid files.
  describe('when parsing valid files', () => {
    it('should parse contribution 289 with no errors', () => {
      parseContributionNoErrorTest(contribution289);
    });
    it('should parse contribution 3552 with no errors', () => {
      parseContributionNoErrorTest(contribution3552);
    });
    it('should parse contribution 7527 with no errors', () => {
      parseContributionNoErrorTest(contribution7527);
    });
    it('should parse contribution 7661 with no errors', () => {
      parseContributionNoErrorTest(contribution7661);
    });
    it('should parse contribution 8054 with no errors', () => {
      parseContributionNoErrorTest(contribution8054);
    });
    it('should parse contribution 10507 with no errors', () => {
      parseContributionNoErrorTest(contribution10507);
    });
  });
});
