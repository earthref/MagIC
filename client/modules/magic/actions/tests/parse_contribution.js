const {describe, it} = global;
import _ from 'lodash';
import {expect} from 'chai';
import Promise from 'bluebird';
import ParseContribution from '../parse_contribution';
import {default as contribution3552 } from './files/contributions/3552.js';
import {default as contribution8054 } from './files/contributions/8054.js';
import {default as contribution10507} from './files/contributions/10507.js';

describe('magic.actions.parse_contribution', () => {

  // Test parsing invalid strings.
  describe('when parsing invalid strings', () => {
    it('should warn about parsing an empty string', () => {
      return Promise.all([
        parseContributionWarningTest(undefined, /empty/i),
        parseContributionWarningTest('', /empty/i)
      ]);
    });

    it('should warn about parsing a non-string', () => {
      return Promise.all([
        parseContributionWarningTest(null, /not a string/i),
        parseContributionWarningTest({}, /not a string/i),
        parseContributionWarningTest(0, /not a string/i),
        parseContributionWarningTest(false, /not a string/i)
      ]);
    });

    it('should reject nonsense', () => {
      return parseContributionErrorTest('nonsense', /unrecognized column delimiter/i);
    });

    it('should reject nonsense with tab header', () => {
      return parseContributionErrorTest('nonsense\ttable', /unrecognized column delimiter/i);
    });

    it('should reject leading space nonsense', () => {
      return parseContributionErrorTest('  nonsense  \ttable\ncol1\tcol2\nstr1\t1.2', /. Expected "tab"./i);
    });

    it('should reject if table name is missing', () => {
      const noTableNames = [
        'tab\n',
        ' tab \n',
        ' tab \t',
        'tab\t\n',
        'tab\t \n'
      ];
      return Promise.all(noTableNames.map(noTableName =>
        parseContributionErrorTest(noTableName, /no table name following tab delimiter/i)
      ));
    });

    it('should reject repeated column names', () => {
      return parseContributionErrorTest('tab\ttable\ncol1\tcol1\n', /found duplicate column names/i);
    });

    it('should warn about empty tables', () => {
      return Promise.all([
        parseContributionWarningTest('tab\ttable\ncol1\tcol2\n', /no data values were found/i),
        parseContributionWarningTest('tab \t123\ncol1\tcol2\n', /no data values were found/i)
      ]);
    });
  });

  // Test parsing valid strings.
  describe('when parsing valid strings', () => {

    it('should keep numbers as strings', () => {
      const text = `tab\tcontribution
                    magic_version
                    3.0
                    >>>>>>>>>>>
                    tab\ttable
                    col1\tcol2
                    str1\t1.2`;
      const json = {
        contribution: [{ magic_version: '3.0' }],
        table: [{
          col1: 'str1',
          col2: '1.2'
        }]
      };
      return parseContributionJSONTest(text, json);
    });

    it('should keep measurements as a table', () => {
      const text = `tab\tcontribution
                    magic_version
                    3.0
                    >>>>>>>>>>>
                    tab\tMAGIC_measurements
                    col1\tcol2
                    str1\t1.1
                    str2\t1.2
                    >>>>>>>>>>>
                    tab\tMeasurements
                    col1\tcol2
                    str1\t1.2`;
      const json = {
        contribution: [{ magic_version: '3.0' }],
        magic_measurements: {
          columns: ['col1', 'col2'],
          rows: [
            ['str1','1.1'],
            ['str2','1.2']
          ]
        },
        measurements: {
          columns: ['col1', 'col2'],
          rows: [
            ['str1','1.2']
          ]
        },
      };
      return parseContributionJSONTest(text, json);
    });

    it('should eliminate blank lines and leading/trailing spaces', () => {
      const texts = [
        '\ntab\tcontribution\nmagic_version\tdoi\n3.0\t1.2',
        'tab delimited \tcontribution\nmagic_version\tdoi\n\n\n3.0\t1.2',
        ' tab\tcontribution\nmagic_version\tdoi\n3.0\t1.2',
        'tab any_non_tab_string\tcontribution\nmagic_version\tdoi\n3.0\t1.2',
        'tab any_non_tab_string\tcontribution\nmagic_version\tdoi\n3.0\t1.2',
        'tab\t  contribution\nmagic_version\tdoi\n3.0\t1.2',
        'tab\tcontribution\nmagic_version  \tdoi\n  3.0\t1.2  '
      ];
      const json = {
        contribution: [{
          magic_version: '3.0',
          doi: '1.2'
        }]
      };
      return Promise.all(texts.map(text =>
        parseContributionJSONTest(text, json)
      ));
    });

    it('should handle empty columns', () => {
      const texts = [
        `tab\tcontribution
         \tmagic_version\tdoi
         \t3.0\t1.2`,
        `tab\tcontribution
         magic_version\t\tdoi
         3.0\t\t1.2`,
        `tab\tcontribution
         magic_version\tdoi\tempty_column
         3.0\t1.2\t`
      ];
      const json = {
        contribution: [{
          magic_version: '3.0',
          doi: '1.2'
        }]
      };
      return Promise.all(texts.map(text =>
        parseContributionJSONTest(text, json)
      ));
    });

    it('should combine rows', () => {
      const partial1 = 'tab\tcontribution\nmagic_version\n3.0';
      const partial2 = 'tab\ttable\ncol1\tcol2\nstr1\t1.2';
      const partial3 = 'tab\ttable\ncol1\tcol2\nstr2\t1.0';
      const json = {
        contribution: [{
          magic_version: '3.0'
        }],
        table: [{
          col1: 'str1',
          col2: '1.2'
        }, {
          col1: 'str2',
          col2: '1.0'
        }]
      };
      return parseContributionsJSONTest([partial1, partial2, partial3], json);
    });

    it('should combine tables', () => {
      const partial1 = 'tab\tcontribution\nmagic_version\n3.0';
      const partial2 = 'tab\ttable2\ncol1\tcol2\nstr2\t1.0';
      const json = {
        contribution: [{
          magic_version: '3.0'
        }],
        table2: [{
          col1: 'str2',
          col2: '1.0'
        }]
      };
      return parseContributionsJSONTest([partial1, partial2], json);
    });

  });

  // Test parsing valid files.
  describe('when parsing valid files', () => {
    it('should parse contribution 3552 (MagIC version 2.2) with no errors', () => {
      return parseContributionNoErrorTest(contribution3552);
    });
    it('should parse contribution 8054 (MagIC version 2.4) with no errors', () => {
      return parseContributionNoErrorTest(contribution8054);
    });
    it('should parse contribution 10507 (MagIC version 2.5) with no errors', () => {
      return parseContributionNoErrorTest(contribution10507);
    });
  });

});

// Expect the warnings to contain one warning that matches the reWarningMsg regex.
const parseContributionWarningTest = (text, reWarningMsg, done) => {
  const parser = new ParseContribution({});
  return parser.parsePromise({text: text}).then(() => {
    expect(parser.warnings().length).to.be.at.least(1);
    expect(_.find(parser.warnings(), warning => warning.message.match(reWarningMsg))).to.not.be.undefined;
  });
};

// Expect the errors to contain one error that matches the reErrorMsg regex.
const parseContributionErrorTest = (text, reErrorMsg) => {
  const parser = new ParseContribution({});
  return parser.parsePromise({text: text}).then(() => {
    expect(parser.errors().length).to.be.at.least(1);
    expect(_.find(parser.errors(), error => error.message.match(reErrorMsg))).to.not.be.undefined;
  });
};

// Expect no errors.
const parseContributionNoErrorTest = (text) => {
  const parser = new ParseContribution({});
  return parser.parsePromise({text: text}).then(() => {
    expect(parser.errors().length).to.equal(0);
  });
};

// Expect no errors and check against expected JSON.
const parseContributionJSONTest = (text, jsonExpected) => {
  const parser = new ParseContribution({});
  return parser.parsePromise({text: text}).then(() => {
    expect(parser.errors().length).to.equal(0);
    expect(parser.json).to.deep.equal(jsonExpected);
  });
};

const parseContributionsJSONTest = (texts, jsonExpected) => {
  const parser = new ParseContribution({});
  return Promise.mapSeries(texts, text => parser.parsePromise({text: text})).then(() => {
    expect(parser.errors().length).to.equal(0);
    expect(parser.json).to.deep.equal(jsonExpected);
  });
};