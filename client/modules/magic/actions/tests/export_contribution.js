const {describe, it} = global;
import {expect} from 'chai';
import ExportContribution from '../export_contribution';
import {default as contribution3552 } from './files/contributions/3552.js';
import {default as contribution8054 } from './files/contributions/8054.js';
import {default as contribution10507} from './files/contributions/10507.js';

describe('magic.actions.export_contribution', () => {

  // Test exporting invalid JSON to text.
  describe('when exporting invalid JSON to text', () => {
    it('should reject if the table name is invalid.', () => {
      const invalidTable = {
        contribution: [{
          magic_version: '3.0'
        }],
        not_er_locations: [{
          region: 'California'
        }]
      };
      exportContributionToTextErrorTest(invalidTable,
        /table .* is not defined in magic data model version/i);
    });

    it('should reject if the column name is invalid.', () => {
      const invalidColumn = {
        contribution: [{
          magic_version: '2.5', 
          author: 'Geoff'
        }],
        er_locations: [{
          not_region: 'California'
        }]
      };
      exportContributionToTextErrorTest(invalidColumn,
        /column .* in table .* is not defined in magic data model/i);
    });

    it('should report one error if the same two columns are invalid.', () => {
      const invalidColumns = {
        contribution: [{
          magic_version: '2.5'
        }],
        er_locations: [{
          not_region: 'California'
        },{
          not_region: 'California'
        }]
      };
      exportContributionToTextNErrorsTest(invalidColumns, 1);
      exportContributionToTextErrorTest(invalidColumns,
        /column .* in table .* is not defined in magic data model/i);
    });

    it('should report two errors if two different columns are invalid.', () => {
      const invalidColumns = {
        contribution: [{
          magic_version: '2.5'
        }],
        er_locations: [{
          not_region: 'California'
        },{
          not_region2: 'California'
        }]
      };
      exportContributionToTextNErrorsTest(invalidColumns, 2);
      exportContributionToTextErrorTest(invalidColumns,
        /column .* in table .* is not defined in magic data model/i);
    });
  });

  // Test exporting valid JSON to text.
  describe('when exporting valid JSON to text', () => {
    it('should keep export tables and columns in the order defined in the data model', () => {
      const json1 = {
        contribution: [{
          magic_version: '2.5'
        }],
        er_specimens: [{
          er_location_name:  'lo1',
          specimen_dip:      1.2,
          specimen_igsn:     'igsn1',
          er_specimen_name:  'sp1',
          er_sample_name:    'sa1',
          er_citation_names: ['10.1023/A:1', 'This study']
        }, {
          er_location_name: 'lo1',
          specimen_dip:     1.3,
          specimen_igsn:    'igsn2',
          er_specimen_name: 'sp2',
          er_sample_name:   'sa1'
        }],
        er_sites: [{
          er_location_name:   'lo1',
          er_site_name:       'si2',
          site_description:   'a',
          magic_method_codes: ['code2', 'code1']
        }, {
          er_site_name:      'si1',
          er_location_name:  'lo1',
          er_citation_names: ['10.1023/A1'],
          site_type:         'Kiln'
        }]
      };
      const text1 =
        'tab delimited\tcontribution\n' +
        'magic_version\n' +
        '2.5\n' +
        '>>>>>>>>>>\n' +
        'tab delimited\ter_sites\n' +
        'er_site_name\ter_location_name\tsite_type\tsite_description\tmagic_method_codes\ter_citation_names\n' +
        'si2\tlo1\t\ta\t:code2:code1:\t\n' +
        'si1\tlo1\tKiln\t\t\t:10.1023/A1:\n' +
        '>>>>>>>>>>\n' +
        'tab delimited\ter_specimens\n' +
        'er_specimen_name\ter_location_name\ter_sample_name\tspecimen_dip\tspecimen_igsn\ter_citation_names\n' +
        'sp1\tlo1\tsa1\t1.2\tigsn1\t:"10.1023/A:1":This study:\n' +
        'sp2\tlo1\tsa1\t1.3\tigsn2\t\n';
      exportContributionToTextJSONTest(json1, text1);
      const json2 = {
        contribution: [{
          magic_version: '3.0',
          id: '1234',
          contributor: '@magic'
      
        }],
        specimens: [{
          specimen: 'sp1',
          rotation_sequence: [[1.4,5.2,-.3],[0,-2.1,0.12345]],
          description: 'a, b',
          external_database_ids: {'GEOMAGIA50':'1435', 'CALS7K.2':23, 'ARCHEO00':null, 'TRANS':''}
        }]
      };
      const text2 =
        'tab delimited\tcontribution\n' +
        'id\tcontributor\tmagic_version\n' +
        '1234\t@magic\t3.0\n' +
        '>>>>>>>>>>\n' +
        'tab delimited\tspecimens\n' +
        'specimen\tdescription\trotation_sequence\texternal_database_ids\n' +
        'sp1\ta, b\t1.4:5.2:-0.3;0:-2.1:0.12345\tGEOMAGIA50[1435]:CALS7K.2[23]:ARCHEO00[]:TRANS[]\n';
      exportContributionToTextJSONTest(json2, text2);
    });
  });

  // Test parsing valid files.
  //GGG temporarily removing tests for export, they might pass with a false positive now
  /*describe('when exporting valid files to text', () => {
    it('should export contribution 3552 (MagIC version 2.2) with no errors', () => {
      exportContributionToTextNoErrorTest(contribution3552);
    });
    it('should export contribution 8054 (MagIC version 2.4) with no errors', () => {
      exportContributionToTextNoErrorTest(contribution8054);
    });
    it('should export contribution 10507 (MagIC version 2.5) with no errors', () => {
      exportContributionToTextNoErrorTest(contribution10507);
    });
  });*/
});

// Expect the errors to contain one error that matches the reErrorMsg regex.
const exportContributionToTextErrorTest = (json, reErrorMsg) => {
  const Exporter = new ExportContribution({});
  Exporter.toText(json);
    expect(Exporter.errors().length).to.be.at.least(1);
    expect(Exporter.errors()[Exporter.errors().length - 1]['message']).to.match(reErrorMsg);

};

// Expect no errors.
const exportContributionToTextNoErrorTest = (json) => {
  const Exporter = new ExportContribution({});
  Exporter.toText(json);
  expect(Exporter.errors().length).to.equal(0);
  return Exporter;
};

// Expect N errors.
const exportContributionToTextNErrorsTest = (json, nErrors) => {
  const Exporter = new ExportContribution({});
  Exporter.toText(json);
  console.log(`length: ${Exporter.errors().length}`);
  expect(Exporter.errors().length).to.equal(nErrors);
};

// Expect no errors and check against expected text.
const exportContributionToTextJSONTest = (json, textExpected) => {
  const Exporter = new ExportContribution({});
  const text = Exporter.toText(json);
    expect(Exporter.errors().length).to.equal(0);
    console.log(`text:\n${text}`);
    console.log(`text Expected:\n${textExpected}`);
    expect(text).to.equal(textExpected);

};