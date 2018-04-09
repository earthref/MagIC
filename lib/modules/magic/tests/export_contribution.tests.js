const {describe, it} = global;
import {expect} from 'chai';
import jszip from 'jszip'; //import JSZip from 'xlsx-style/node_modules/jszip';
import XLSX from 'xlsx';
import ExportContribution from '/lib/modules/magic/export_contribution';
import {default as contribution_3 } from '/lib/modules/magic/tests/files/contributions/3.0';
//import {default as contribution3552 } from '/lib/modules/magic/tests/files/contributions/3552';
//import {default as contribution8054 } from '/lib/modules/magic/tests/files/contributions/8054';
//import {default as contribution10507} from '/lib/modules/magic/tests/files/contributions/10507_partial';

describe('magic.actions.export_contribution', () => {

  // Test exporting invalid JSON to text.
  describe('when exporting invalid JSON to text', () => {

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
          data_model_version: '3.0'
        }],
        specimens: [{
          dip:       1.2,
          igsn:      'igsn1',
          specimen:  'sp1',
          sample:    'sa1',
          citations: ['10.1023/A:1', 'This study']
        }, {
          dip:      1.3,
          igsn:     'igsn2',
          specimen: 'sp2',
          sample:   'sa1'
        }],
        sites: [{
          location:     'lo1',
          site:         'si2',
          description:  'a',
          method_codes: ['code2', 'code1']
        }, {
          site:              'si1',
          location:          'lo1',
          citations:         ['10.1023/A1'],
          site_alternatives: 'Kiln'
        }],
        measurements: {
          columns: ['dir_inc', 'dir_dec'],
          rows:   [['1'      , '2'      ],
                   ['1'      , '2'      ],
                   ['1'      , '2'      ]]
        },
        _not_a_valid_table_name: {
          // this should get skipped
        }
      };
      const text1 =
        'tab delimited\tcontribution\n' +
        'data_model_version\n' +
        '3.0\n' +
        '>>>>>>>>>>\n' +
        'tab delimited\tsites\n' +
        'site\tlocation\tsite_alternatives\tmethod_codes\tcitations\tdescription\n' +
        'si2\tlo1\t\tcode2:code1\t\ta\n' +
        'si1\tlo1\tKiln\t\t10.1023/A1\t\n' +
        '>>>>>>>>>>\n' +
        'tab delimited\tspecimens\n' +
        'specimen\tsample\tigsn\tcitations\tdip\n' +
        'sp1\tsa1\tigsn1\t"10.1023/A:1":This study\t1.2\n' +
        'sp2\tsa1\tigsn2\t\t1.3\n' +
        '>>>>>>>>>>\n' +
        'tab delimited\tmeasurements\n' +
        'dir_inc\tdir_dec\n' +
        '1\t2\n' +
        '1\t2\n' +
        '1\t2\n';
      exportContributionToTextJSONTest(json1, text1);
      const json2 = {
        contribution: [{
          data_model_version: '3.0',
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
        'id\tcontributor\tdata_model_version\n' +
        '1234\t@magic\t3.0\n' +
        '>>>>>>>>>>\n' +
        'tab delimited\tspecimens\n' +
        'specimen\tdescription\trotation_sequence\texternal_database_ids\n' +
        'sp1\ta, b\t1.4:5.2:-0.3;0:-2.1:0.12345\tGEOMAGIA50[1435]:CALS7K.2[23]:ARCHEO00[]:TRANS[]\n';
      exportContributionToTextJSONTest(json2, text2);
    });
  });

  // Test exporting valid JSON to extended text.
  describe('when exporting valid JSON to extended text', () => {
    it('should keep export tables and columns in the order defined in the data model', () => {
      const json1 = {
        contribution: [{
          data_model_version: '3.0'
        }],
        specimens: [{
          dip:       1.2,
          igsn:      'igsn1',
          specimen:  'sp1',
          sample:    'sa1',
          citations: ['10.1023/A:1', 'This study']
        }, {
          dip:      1.3,
          igsn:     'igsn2',
          specimen: 'sp2',
          sample:   'sa1'
        }],
        sites: [{
          location:     'lo1',
          site:         'si2',
          description:  'a',
          method_codes: ['code2', 'code1']
        }, {
          site:              'si1',
          location:          'lo1',
          citations:         ['10.1023/A1'],
          site_alternatives: 'Kiln'
        }]
      };
      const text1 =
        'tab delimited\tcontribution\t4 headers\n' +
        'Contribution\n' +       // Group Name              (columns[column_name].group)
        'Data Model Version\n' + // Column Name             (columns[column_name].label)
        'String\n' +             // Column Type and/or Unit (columns[column_name].type and .unit depending upon logic)
        'data_model_version\n' +
        '3.0\n' +
        '>>>>>>>>>>\n' +
        'tab delimited\tsites\t4 headers\n' +
        'Names\t\tSite\tResult\t\tMetadata\n' +
        'Site Name\tLocation Name\tSite Name Alternatives\tMethod Codes\tCitation DOIs\tDescription\n' +
        'String\tString\tList\tList\tList\tString\n' +
        'site\tlocation\tsite_alternatives\tmethod_codes\tcitations\tdescription\n' +
        'si2\tlo1\t\tcode2:code1\t\ta\n' +
        'si1\tlo1\tKiln\t\t10.1023/A1\t\n' +
        '>>>>>>>>>>\n' +
        'tab delimited\tspecimens\t4 headers\n' +
        'Names\t\tSpecimen\tResult\tOrientation\n' +
        'Specimen Name\tSample Name\tSpecimen IGSN\tCitation DOIs\tDip\n' +
        'String\tString\tString\tList\tNumber in Degrees\n' +
        'specimen\tsample\tigsn\tcitations\tdip\n' +
        'sp1\tsa1\tigsn1\t"10.1023/A:1":This study\t1.2\n' +
        'sp2\tsa1\tigsn2\t\t1.3\n';
      exportContributionToExtendedTextJSONTest(json1, text1);
      const json2 = {
        contribution: [{
          data_model_version: '3.0',
          id: '1234',
          contributor: '@magic'
        }],
        specimens: [{
          specimen: 'sp1',
          meas_step_min: 1,
          result_type: 'a',
          rotation_sequence: [[1.4,5.2,-.3],[0,-2.1,0.12345]],
          description: 'a, b',
          external_database_ids: {'GEOMAGIA50':'1435', 'CALS7K.2':23, 'ARCHEO00':null, 'TRANS':''}
        }]
      };
      const text2 =
        'tab delimited\tcontribution\t4 headers\n' +
        'Contribution\t\t\n' +                                 // Group Name
        'Contribution ID\tContributor\tData Model Version\n' + // Column Name
        'Integer\tString\tString\n' +                          // Column Type and/or Unit
        'id\tcontributor\tdata_model_version\n' +
        '1234\t@magic\t3.0\n' +
        '>>>>>>>>>>\n' +
        'tab delimited\tspecimens\t4 headers\n' +
        'Names\tResult\tMeasurement Parameters\tMetadata\t\t\n' + // Group Name
        'Specimen Name\tResult Type\tMeasurement Step Minimum\tDescription\tSequence of Rotations\tExternal Database IDs\n' + // Column Name
        'String\tFlag\tNumber\tString\tMatrix\tDictionary\n' + // Column Type and/or Unit
        'specimen\tresult_type\tmeas_step_min\tdescription\trotation_sequence\texternal_database_ids\n' +
        'sp1\ta\t1\ta, b\t1.4:5.2:-0.3;0:-2.1:0.12345\tGEOMAGIA50[1435]:CALS7K.2[23]:ARCHEO00[]:TRANS[]\n';
      exportContributionToExtendedTextJSONTest(json2, text2);
    });
  });

  // Test exporting valid JSON to extended text.
  describe('when exporting valid JSON to EXCEL format', () => {
    it('should export EXCEL tables and columns in the order defined in the data model', () => {
      const json1 = {
        contribution: [{
          data_model_version: '3.0'
        }],
        specimens: [{
          dip:       1.2,
          igsn:      'igsn1',
          specimen:  'sp1',
          sample:    'sa1',
          citations: ['10.1023/A:1', 'This study']
        }, {
          dip:      1.3,
          igsn:     'igsn2',
          specimen: 'sp2',
          sample:   'sa1',
          dir_tilt_correction: '100',
          dir_dec: '1.5',
          dir_inc: '2',
          dir_alpha95: '0.123'
        }],
        sites: [{
          location:     'lo1',
          site:         'si2',
          description:  'a',
          method_codes: ['code2', 'code1']
        }, {
          site:              'si1',
          location:          'lo1',
          citations:         '10.1023/A1',
          site_alternatives: 'Kiln',
          method_codes: 'code1:code2'
        }],
        measurements: {
          columns: ['number', 'experiment'],
          rows: [
            ['1','A']
          ]
        }
      };
      exportContributionToExcelTest(json1, 'lib/modules/magic/tests/output/test.xlsx');
    });
  });

  // Test exporting valid files to Excel.
  describe('when exporting valid files to EXCEL', () => {
    it('should export contribution 3.0 (MagIC version 3.0) with no errors', () => {
      exportContributionToExcelTest(contribution_3, 'lib/modules/magic/tests/output/3.0.xlsx');
    });
  });

  // Test parsing valid files.
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
  Exporter.toText(json,false);
  expect(Exporter.errors().length).to.be.at.least(1);
  expect(Exporter.errors()[Exporter.errors().length - 1]['message']).to.match(reErrorMsg);
};

// Expect no errors.
const exportContributionToTextNoErrorTest = (json) => {
  const Exporter = new ExportContribution({});
  Exporter.toText(json,false);
  expect(Exporter.errors().length).to.equal(0);
  return Exporter;
};

// Expect N errors.
const exportContributionToTextNErrorsTest = (json, nErrors) => {
  const Exporter = new ExportContribution({});
  Exporter.toText(json,false);
  expect(Exporter.errors().length).to.equal(nErrors);
};

// Expect no errors and check against expected text.
const exportContributionToTextJSONTest = (json, textExpected) => {
  const Exporter = new ExportContribution({});
  const text = Exporter.toText(json,false);
  expect(Exporter.errors().length).to.equal(0);
  expect(text).to.equal(textExpected);
};

// Expect no errors and check against expected text.
const exportContributionToExtendedTextJSONTest = (json, textExpected) => {
  const Exporter = new ExportContribution({});
  const text = Exporter.toExtendedText(json);
  expect(Exporter.errors().length).to.equal(0);
  expect(text).to.equal(textExpected);
};

// Expect no errors create an Excel file.
const exportContributionToExcelTest = (json, outputFile) => {
  const Exporter = new ExportContribution({});
  const workbook = Exporter.toExcel(json);
  expect(Exporter.errors().length).to.equal(0);
  XLSX.writeFile(workbook, outputFile);
}
