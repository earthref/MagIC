const {describe, it} = global;
import {expect} from 'chai';
import JSZip from 'xlsx-style/node_modules/jszip';
import XLSX from 'xlsx-style';
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
          magic_version: '3.0'
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
        'tab delimited\tcontribution\n' +
        'magic_version\n' +
        '3.0\n' +
        '>>>>>>>>>>\n' +
        'tab delimited\tsites\n' +
        'site\tlocation\tsite_alternatives\tmethod_codes\tcitations\tdescription\n' +
        'si2\tlo1\t\t:code2:code1:\t\ta\n' +
        'si1\tlo1\tKiln\t\t:10.1023/A1:\t\n' +
        '>>>>>>>>>>\n' +
        'tab delimited\tspecimens\n' +
        'specimen\tsample\tigsn\tcitations\tdip\n' +
        'sp1\tsa1\tigsn1\t:"10.1023/A:1":This study:\t1.2\n' +
        'sp2\tsa1\tigsn2\t\t1.3\n';
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

  // Test exporting valid JSON to extended text.
  describe('when exporting valid JSON to extended text', () => {
    it('should keep export tables and columns in the order defined in the data model', () => {
      const json1 = {
        contribution: [{
          magic_version: '3.0'
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
          //GGG I think of the headers as metadata for a given column
          //GGG Are the number of headers variable or fixed? --- Rupert confirms that 4 is fixed for now, the fourth is for the column names.
        'tab delimited\tcontribution\t4 headers\n' +
        'Contribution\n' +  // Group Name (columns[column_name].group)
        'MagIC Version\n' + // Column Name (columns[column_name].label)
        'String\n' +        // Column Type and/or Unit ()  (columns[column_name].type and .unit depending upon logic
        'magic_version\n' +
        '3.0\n' +
        '>>>>>>>>>>\n' +
         //Each table has different headers. The headers are based upon metadata for each column from the model.
        'tab delimited\tsites\t4 headers\n' +
        //So, here we begin three rows of meta data for the sites table
        'Names\t\tSite\tResult\t\tMetadata\n' + // from group from each column in the model(columns[column_name].group), (blank if repeated from last column, will be a merged cell in Excel export)
        'Site Name\tLocation Name\tSite Name Alternatives\tMethod Codes\tCitation Names\tDescription\n' + // List column meta-names for the sites table
        'String\tString\tList\tList\tList\tString\n' + // Column Type and/or Unit -- special logic documented in production code
        'site\tlocation\tsite_alternatives\tmethod_codes\tcitations\tdescription\n' + //"Normal" table definition
        'si2\tlo1\t\t:code2:code1:\t\ta\n' + //"normal" table data
        'si1\tlo1\tKiln\t\t:10.1023/A1:\t\n' + //"normal" table data
        '>>>>>>>>>>\n' +
        'tab delimited\tspecimens\t4 headers\n' +
         //now three moreof metadata from the specimen data model
        'Names\t\tSpecimen\tResult\tGeology\n' + // Group Name
        'Specimen Name\tSample Name\tSpecimen IGSN\tCitation Names\tDip\n' + // Column Name (label)
        'String\tString\tString\tList\tNumber in Degrees\n' + // Column Type and/or Unit
        'specimen\tsample\tigsn\tcitations\tdip\n' +
        'sp1\tsa1\tigsn1\t:"10.1023/A:1":This study:\t1.2\n' +
        'sp2\tsa1\tigsn2\t\t1.3\n';
      exportContributionToExtendedTextJSONTest(json1, text1);
      const json2 = {
        contribution: [{
          magic_version: '3.0',
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
        'Contribution\t\t\n' +                            // Group Name
        'Contribution ID\tContributor\tMagIC Version\n' + // Column Name
        'Integer\tString\tString\n' +                    // Column Type and/or Unit
        'id\tcontributor\tmagic_version\n' +
        '1234\t@magic\t3.0\n' +
        '>>>>>>>>>>\n' +
        'tab delimited\tspecimens\t4 headers\n' +
        'Names\tMeasurement Parameters\tResult\tMetadata\t\t\n' + // Group Name
        'Specimen Name\tMeasurement Step Minimum\tResult Type\tDescription\tSequence of Rotations\tExternal Database IDs\n' + // Column Name
        'String\tNumber\tFlag\tString\tMatrix\tDictionary\n' + // Column Type and/or Unit
        'specimen\tmeas_step_min\tresult_type\tdescription\trotation_sequence\texternal_database_ids\n' +
        'sp1\t1\ta\ta, b\t1.4:5.2:-0.3;0:-2.1:0.12345\tGEOMAGIA50[1435]:CALS7K.2[23]:ARCHEO00[]:TRANS[]\n';
      exportContributionToExtendedTextJSONTest(json2, text2);
    });
  });

  // Test exporting valid JSON to extended text.
  describe('when exporting valid JSON to extended text', () => {
    it('should keep export tables and columns in the order defined in the data model', () => {
      const json1 = {
        contribution: [{
          magic_version: '3.0'
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
          //GGG I think of the headers as metadata for a given column
          //GGG Are the number of headers variable or fixed? --- Rupert confirms that 4 is fixed for now, the fourth is for the column names.
          'tab delimited\tcontribution\t4 headers\n' +
          'Contribution\n' +  // Group Name (columns[column_name].group)
          'MagIC Version\n' + // Column Name (columns[column_name].label)
          'String\n' +        // Column Type and/or Unit ()  (columns[column_name].type and .unit depending upon logic
          'magic_version\n' +
          '3.0\n' +
          '>>>>>>>>>>\n' +
          //Each table has different headers. The headers are based upon metadata for each column from the model.
          'tab delimited\tsites\t4 headers\n' +
          //So, here we begin three rows of meta data for the sites table
          'Names\t\tSite\tResult\t\tMetadata\n' + // from group from each column in the model(columns[column_name].group), (blank if repeated from last column, will be a merged cell in Excel export)
          'Site Name\tLocation Name\tSite Name Alternatives\tMethod Codes\tCitation Names\tDescription\n' + // List column meta-names for the sites table
          'String\tString\tList\tList\tList\tString\n' + // Column Type and/or Unit -- special logic documented in production code
          'site\tlocation\tsite_alternatives\tmethod_codes\tcitations\tdescription\n' + //"Normal" table definition
          'si2\tlo1\t\t:code2:code1:\t\ta\n' + //"normal" table data
          'si1\tlo1\tKiln\t\t:10.1023/A1:\t\n' + //"normal" table data
          '>>>>>>>>>>\n' +
          'tab delimited\tspecimens\t4 headers\n' +
          //now three moreof metadata from the specimen data model
          'Names\t\tSpecimen\tResult\tGeology\n' + // Group Name
          'Specimen Name\tSample Name\tSpecimen IGSN\tCitation Names\tDip\n' + // Column Name (label)
          'String\tString\tString\tList\tNumber in Degrees\n' + // Column Type and/or Unit
          'specimen\tsample\tigsn\tcitations\tdip\n' +
          'sp1\tsa1\tigsn1\t:"10.1023/A:1":This study:\t1.2\n' +
          'sp2\tsa1\tigsn2\t\t1.3\n';
      exportContributionToExtendedTextJSONTest(json1, text1);
      const json2 = {
        contribution: [{
          magic_version: '3.0',
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
          'Contribution\t\t\n' +                            // Group Name
          'Contribution ID\tContributor\tMagIC Version\n' + // Column Name
          'Integer\tString\tString\n' +                    // Column Type and/or Unit
          'id\tcontributor\tmagic_version\n' +
          '1234\t@magic\t3.0\n' +
          '>>>>>>>>>>\n' +
          'tab delimited\tspecimens\t4 headers\n' +
          'Names\tMeasurement Parameters\tResult\tMetadata\t\t\n' + // Group Name
          'Specimen Name\tMeasurement Step Minimum\tResult Type\tDescription\tSequence of Rotations\tExternal Database IDs\n' + // Column Name
          'String\tNumber\tFlag\tString\tMatrix\tDictionary\n' + // Column Type and/or Unit
          'specimen\tmeas_step_min\tresult_type\tdescription\trotation_sequence\texternal_database_ids\n' +
          'sp1\t1\ta\ta, b\t1.4:5.2:-0.3;0:-2.1:0.12345\tGEOMAGIA50[1435]:CALS7K.2[23]:ARCHEO00[]:TRANS[]\n';
      exportContributionToExtendedTextJSONTest(json2, text2);
    });

  });

  // Test exporting valid JSON to extended text.
  describe('when exporting valid JSON to EXCEL format', () => {
    it('should export EXCEL tables and columns in the order defined in the data model', () => {
      const json1 = {
        contribution: [{
          magic_version: '3.0'
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
      exportContributionToExcelTest(json1, 'client/modules/magic/actions/tests/output/test.xlsx');
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
  console.log(`length: ${Exporter.errors().length}`);
  expect(Exporter.errors().length).to.equal(nErrors);
};

// Expect no errors and check against expected text.
const exportContributionToTextJSONTest = (json, textExpected) => {
  const Exporter = new ExportContribution({});
  const text = Exporter.toText(json,false);
  expect(Exporter.errors().length).to.equal(0);
  console.log(`text:\n${text}`);
  console.log(`text Expected:\n${textExpected}`);
  expect(text).to.equal(textExpected);
};

// Expect no errors and check against expected text.
const exportContributionToExtendedTextJSONTest = (json, textExpected) => {
  const Exporter = new ExportContribution({});
  const text = Exporter.toText(json, true);
  expect(Exporter.errors().length).to.equal(0);
  console.log(`text:\n${text}`);
  console.log(`text Expected:\n${textExpected}`);
  expect(text).to.equal(textExpected);
};

// Expect no errors create an Excel file.
const exportContributionToExcelTest = (json, outputFile) => {
  const Exporter = new ExportContribution({});
  const workbook = Exporter.toExcel(json);
  expect(Exporter.errors().length).to.equal(0);
  var writeOpts = { tabSelected:'sites' }; // <--- GGG might be using this incorrectly, doesn't appear to work, i also tried a simple index number
  XLSX.writeFile(workbook, outputFile, writeOpts);
};