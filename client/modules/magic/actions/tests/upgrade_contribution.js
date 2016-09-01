const {describe, it} = global;
import _ from 'lodash';
import {expect} from 'chai';
import Promise from 'bluebird';
import ParseContribution from '../parse_contribution.js';
import UpgradeContribution from '../upgrade_contribution.js';
import {default as contribution10507} from './files/contributions/10507';

describe('magic.actions.upgrade_contribution', () => {

  // Test upgrading invalid JSON.
  describe('when upgrading invalid JSON', () => {
    
    it('should reject if the table name is invalid.', () => {
      const invalidTable = {
        contribution: [{
          magic_version: '2.5'
        }],
        not_er_locations: [{
          region: 'California'
        }]
      };
      return upgradeContributionErrorTest(invalidTable, 
        /table .* is not defined in magic data model version /i);
    });

    it('should reject if the column name is invalid.', () => {
      const invalidColumn = {
        contribution: [{
          magic_version: '2.5'
        }],
        er_locations: [{
          not_region: 'California'
        }]
      };
      return upgradeContributionErrorTest(invalidColumn,
        /column .* in table .* is not defined in magic data model/i);
    });

    it('should report one error if the same two columns are invalid.', () => {
      const invalidColumns = {
        contribution: [{
          magic_version: '2.4'
        }],
        er_locations: [{
          not_region: 'California'
        },{
          not_region: 'California'
        }]
      };
      return Promise.all([
        upgradeContributionNErrorsTest(invalidColumns, 1),
        upgradeContributionErrorTest(invalidColumns,
          /column .* in table .* is not defined in magic data model/i)
      ]);
    });
    
    it('should report two errors if two different columns are invalid.', () => {
      const invalidColumns = {
        contribution: [{
          magic_version: '2.4'
        }],
        er_locations: [{
          not_region: 'California'
        },{
          not_region2: 'California'
        }]
      };
      return Promise.all([
        upgradeContributionNErrorsTest(invalidColumns, 2),
        upgradeContributionErrorTest(invalidColumns,
         /column .* in table .* is not defined in magic data model/i)
      ]);
    });

    it('should report one error if two or more different relative intensity normalizations are used', () => {
      const tooManyCodes1 = {
        contribution: [{
          magic_version: '2.5'
        }],
        er_sites: [{
          er_site_name: 'site_1'
        }],
        pmag_results: [{
          er_site_names: 'site_1',
          average_int_rel: '1',
          average_int_rel_sigma: '2',
          magic_method_codes: 'IE-IRM:IE-ARM'
        }]
      };
      const tooManyCodes2 = {
        contribution: [{
          magic_version: '2.5'
        }],
        er_sites: [{
          er_site_name: 'site_1'
        }],
        pmag_results: [{
          er_site_names: 'site_1',
          average_int_rel: '1',
          average_int_rel_sigma: '2',
          magic_method_codes: 'IE-IRM:IE-ARM:IE-CHI'
        }]
      };
      return Promise.all([
        upgradeContributionNErrorsTest(_.cloneDeep(tooManyCodes1), 1),
        upgradeContributionErrorTest(_.cloneDeep(tooManyCodes1),
          /row .* in table .* includes more than one type of relative intensity normalization in the method codes/i),
        upgradeContributionNErrorsTest(_.cloneDeep(tooManyCodes2), 1),
        upgradeContributionErrorTest(_.cloneDeep(tooManyCodes2),
          /row .* in table .* includes more than one type of relative intensity normalization in the method codes/i)
      ]);
    });

  });

  // Test upgrading valid JSON.
  describe('when upgrading valid JSON', () => {

    // Numbers don't get converted from string until schema validation, so make sure they stay as strings for now.
    it('should keep numbers as strings', () => {
      const jsonOld = {
        contribution: [{
          magic_version: '2.5',
          id: '66'
        }]
      };
      const jsonNew = {
        contribution: [{
          magic_version: '3.0',
          id:'66'
        }]
      };
      return upgradeContributionJSONTest(jsonOld, jsonNew);
    });

    // Tables and columns can change names from one version to the next.
    it('should update column names', () => {
      const jsonOld1 = {
        contribution: [{
          magic_version: '2.5'
        }],
        er_specimens: [{
          er_specimen_name: '1'
        }]
      };
      const jsonNew1 = {
        contribution: [{
          magic_version: '3.0'
        }],
        specimens: [{
          specimen: '1'
        }]
      };
      const jsonOld2 = {
        contribution: [{
          magic_version: '2.5'
        }],
        rmag_susceptibility: [{
          susceptibility_loss_tangent: '1'
        }]
      };
      const jsonNew2 = {
        contribution: [{
          magic_version: '3.0'
        }],
        specimens: [{
          susc_loss_tangent: '1'
        }]
      };
      return Promise.all([
        upgradeContributionJSONTest(jsonOld1, jsonNew1),
        upgradeContributionJSONTest(jsonOld2, jsonNew2)
      ]);
    });

    // Columns could be removed during an upgrade. Make sure the user will be warned about any deletions.
    it('should warn about deleted columns', () => {
      const jsonOld = {
        contribution: [{
          magic_version: '2.5'
        }],
        er_sites: [{
          site_definition: '1'
        }]
      };
      return upgradeContributionWarningTest(jsonOld,
        /column .* in table .* was deleted in magic data model/i);
    });
  });

  // Tests specific to a 2.5 to 3.0 upgrade.
  // Some of the logic needed to pass these tests needs to be hard coded for the 2.5 to 3.0 upgrade case.
  // e.g. handling normalized relative intensities and geoids and creating new column types
  describe('when upgrading 2.5 to 3.0', () => {

    describe('when generating warnings and errors', () => {

      // Contribution level results are removed in 3.0. Make sure the user will be warned about any deletions.
      // This can happen in pmag_results or rmag_results.
      it('should warn about deleted results', () => {
        const jsonOld1 = {
          contribution: [{
            magic_version: '2.5'
          }],
          pmag_results: [{
            // These commented out columns would be empty for a contribution level result:
            //er_location_names: '',
            //er_site_names: '',
            //er_sample_names: '',
            //er_specimen_names: '',
            average_int: '1'
          }]
        };
        const jsonOld2 = {
          contribution: [{
            magic_version: '2.5'
          }],
          rmag_results: [{
            critical_temp: '1'
          }]
        };
        return Promise.all([
          upgradeContributionWarningTest(jsonOld2,
            /row .* in table .* was deleted in magic data model/i),
          upgradeContributionWarningTest(jsonOld1,
            /row .* in table .* was deleted in magic data model/i)
        ]);
      });

    });

    describe('when merging rows', () => {

      // pmag_results and rmag_results in 2.5 and older tables had a loose parent/child relationship.
      //
      // For example a pmag_results row like this, which is a result based on a combination of specimens:
      //   er_location_names   er_sites_names   er_sample_names   er_specimens_names    average_intensity
      //   Location1           Site1            Sample1           Specimen1:Specimen2   0.0000068914
      // had a parent record in the er_samples table with er_samples.er_sample_name = Sample1 because the specimens names
      // in this pmag_results row are plural and describe which of Sample1's specimens were included in the result.
      //
      // Whereas a pmag_results row like this:
      //   er_location_names   er_sites_names   er_sample_names   er_specimens_names    average_intensity
      //   Location1           Site1            Sample1           Specimen1             0.0000052143
      //   Location1           Site1            Sample1           Specimen2             0.000005456
      // had a parent record in the er_specimens table with er_specimens.er_specimen_name = Specimen1.
      // Make sure these rows wind up in the right 3.0 tables.
      //
      // The situation above might represent a rock(sample) split into two pieces (specimens) Each specimen was then
      // analyzed separately. The rows with a singular er_specimen_names is considered a specimen.
      // The row with the plural er_specimens_names might represent an average of the two specimens and is considered a sample.
      it('should assign the same column into different tables based on the level', () => {
        const jsonOld = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_samples: [{
            er_sample_name: '1'
          }],
          er_specimens: [{
            er_sample_name: '1',
            er_specimen_name: '3'
          }],
          pmag_results: [{ // this is a sample level result (single sample name)
            er_sample_names: '1',
            er_specimen_names: ':3:1:',
            average_int: '5'
          }, { // this is a specimen level result (single specimen name)
            er_sample_names: '1',
            er_specimen_names: '3',
            average_int: '6'
          }]
        };
        const jsonNew = {
          contribution: [{
            magic_version: '3.0'
          }],
          samples: [{
            sample: '1',
            specimens: '1:3',
            int_abs: '5'
          }],
          specimens: [{
            sample: '1',
            specimen: '3',
            int_abs: '6'
          }]
        };
        return upgradeContributionJSONTest(jsonOld, jsonNew);
      });

      // Since many of the parent/child tables in 2.5 and earlier are joined into a single table in 3.0, make sure that
      // these two rows wind up in a single row when possible
      // (i.e. when all columns are either orthogonal or identical)
      // if, in the set of colliding columns (based on the mapping) NOT have different values, then collpase to a single row
      it('should merge the same column value from different tables', () => {
        const jsonOld1 = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_specimens: [{
            er_specimen_name: 'specimen_A',
            specimen_texture: 'Metamorphic'
          }],
          pmag_results: [{
            er_specimen_names: 'specimen_A',
            data_type: 'a'
          }]
        };
        const jsonNew1 = {
          contribution: [{
            magic_version: '3.0'
          }],
          specimens: [{ // texture from er_specimens and result_type from pmag_results are orthogonal
            specimen: 'specimen_A',
            texture: 'Metamorphic',
            result_type: 'a'
          }]
        };
        const jsonOld2 = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_sites: [{
            er_site_name: 'site_A',
            site_lat: '1.1'
          }],
          pmag_results: [{
            er_site_names: 'site_A',
            average_lat: '1.1'
          }]
        };
        const jsonNew2 = {
          contribution: [{
            magic_version: '3.0'
          }],
          sites: [{ // lat from er_sites and pmag_results are identical
            site: 'site_A',
            lat: '1.1'
          }]
        };
        return Promise.all([
          upgradeContributionJSONTest(jsonOld1, jsonNew1),
          upgradeContributionJSONTest(jsonOld2, jsonNew2)
        ]);
      });

      // Since many of the parent/child tables in 2.5 and earlier are joined into a single table in 3.0, make sure that
      // these two rows are kept separate with repeated information.
      it('should keep different column values separate from different tables', () => {
        const jsonOld1 = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_sites: [{
            er_site_name: 'site_A',
            site_class: 'Submarine:Sedimentary',
            magic_method_codes: 'LP-DIR'
          }],
          rmag_results: [{
            er_site_names: 'site_A',
            anisotropy_type: 'A',
            anisotropy_p: '0.0123',
            magic_method_codes: 'LP-PI'
          }]
        };
        const jsonNew1 = {
          contribution: [{
            magic_version: '3.0'
          }],
          sites: [{ // method_codes are different, so these rows can't be combined
            site: 'site_A',
            geologic_classes: 'Sedimentary:Submarine', // lists should be normalized by being sorted
            method_codes: 'LP-DIR'
          }, {
            site: 'site_A',
            aniso_type: 'A',
            aniso_p: '0.0123',
            method_codes: 'LP-PI'
          }]
        };
        const jsonOld2 = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_samples: [{
            er_sample_name: 'sample_A',
            er_citation_names: 'This Study'
          }],
          pmag_results: [{
            er_sample_names: 'sample_A',
            average_int: '0.0123',
            er_citation_names: '10.1029/92JB01202'
          }]
        };
        const jsonNew2 = {
          contribution: [{
            magic_version: '3.0'
          }],
          samples: [{ // citations are different, so these rows can't be combined
            sample: 'sample_A',
            citations: 'This Study'
          }, {
            sample: 'sample_A',
            int_abs: '0.0123',
            citations: '10.1029/92JB01202'
          }]
        };
        const jsonOld3 = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_sites: [{
            er_site_name: 'site_A',
            site_lat: '1.1'
          }],
          pmag_results: [{
            er_site_names: 'site_A',
            average_lat: '1.2'
          }]
        };
        const jsonNew3 = {
          contribution: [{
            magic_version: '3.0'
          }],
          sites: [{ // lat values are different, so these rows can't be combined
            site: 'site_A',
            lat: '1.1'
          }, {
            site: 'site_A',
            lat: '1.2'
          }]
        };
        return Promise.all([
          upgradeContributionJSONTest(jsonOld1, jsonNew1),
          upgradeContributionJSONTest(jsonOld2, jsonNew2),
          upgradeContributionJSONTest(jsonOld3, jsonNew3)
        ]);
      });

      it('should merge rows even if lists are in a different order', () => {
        const jsonOld = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_samples: [{
            er_sample_name: 'sample_A',
            sample_class: 'Submarine:Sedimentary',
            magic_method_codes: 'LP-DIR:LP-PI'
          }],
          pmag_results: [{
            er_sample_names: 'sample_A',
            average_int: '0.0123',
            magic_method_codes: 'LP-PI:LP-DIR'
          }]
        };
        const jsonNew = {
          contribution: [{
            magic_version: '3.0'
          }],
          samples: [{
            sample: 'sample_A',
            geologic_classes: 'Sedimentary:Submarine',
            int_abs: '0.0123',
            method_codes: 'LP-DIR:LP-PI'
          }]
        };
        return upgradeContributionJSONTest(jsonOld, jsonNew);
      });

      it('should merge rows when changing tables', () => {
        const jsonOld1 = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_sites: [{
            er_site_name: 'Site 1'
          }],
          er_samples: [{
            er_site_name: 'Site 1',
            er_sample_name: 'Sample 2',
            sample_core_depth: '1'
          },{
            er_site_name: 'Site 1',
            er_sample_name: 'Sample 2',
            sample_dip: '2'
          }]
        };
        const jsonNew1 = {
          contribution: [{
            magic_version: '3.0'
          }],
          sites: [{
            site: 'Site 1',
            core_depth: '1'
          }],
          samples: [{
            site: 'Site 1',
            sample: 'Sample 2',
            dip: '2'
          }]
        };
        const jsonOld2 = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_sites: [{
            er_site_name: 'Site 1',
            site_core_depth: '1'
          }],
          er_samples: [{
            er_site_name: 'Site 1',
            er_sample_name: 'Sample 2',
            sample_core_depth: '2'
          },{
            er_site_name: 'Site 1',
            er_sample_name: 'Sample 2',
            sample_dip: '2'
          }]
        };
        const jsonNew2 = {
          contribution: [{
            magic_version: '3.0'
          }],
          sites: [{
            site: 'Site 1',
            core_depth: '2'
          },{
            site: 'Site 1',
            core_depth: '1'
          }],
          samples: [{
            site: 'Site 1',
            sample: 'Sample 2',
            dip: '2'
          }]
        };
        return Promise.all([
          upgradeContributionJSONTest(jsonOld1, jsonNew1),
          upgradeContributionJSONTest(jsonOld2, jsonNew2)
        ]);
      });

      it('should merge expeditions with locations', () => {
        const jsonOld1 = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_locations: [{
            er_location_name: 'loc_1'
          }],
          er_expeditions: [{
            er_expedition_name: 'exp_A',
            expedition_ship: 'ship1',
            expedition_mb_sonar: '123'
          }]
        };
        const jsonNew1 = {
          contribution: [{
            magic_version: '3.0'
          }],
          locations: [{
            location: 'loc_1',
            expedition_name: 'exp_A',
            expedition_ship: 'ship1'
          }]
        };
        const jsonOld2 = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_locations: [{
            er_location_name: 'loc_1'
          },{
            er_location_name: 'loc_2'
          },{
            er_location_name: 'loc_3'
          }],
          er_expeditions: [{
            er_expedition_name: 'exp_A',
            expedition_ship: 'ship1',
            expedition_mb_sonar: '123',
            expedition_location: 'loc_1:loc_2'
          },{
            er_expedition_name: 'exp_B',
            expedition_location: 'loc_3'
          }]
        };
        const jsonNew2 = {
          contribution: [{
            magic_version: '3.0'
          }],
          locations: [{
            location: 'loc_1',
            expedition_name: 'exp_A',
            expedition_ship: 'ship1'
          },{
            location: 'loc_2',
            expedition_name: 'exp_A',
            expedition_ship: 'ship1'
          },{
            location: 'loc_3',
            expedition_name: 'exp_B'
          }]
        };
        return Promise.all([
          upgradeContributionJSONTest(jsonOld1, jsonNew1),
          upgradeContributionJSONTest(jsonOld2, jsonNew2)
        ]);
      });

    });

    describe('when adding defaults', () => {

      it('should assign a tilt correction for tilt corrected/uncorrected directions', () => {
        const jsonOld1 = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_samples: [{
            er_sample_name: 'sample_A',
            sample_class: 'Submarine:Sedimentary',
          }],
          pmag_results: [{
            er_sample_names: 'sample_A',
            average_int: '0.0123',
            tilt_dec_corr: '1',
            magic_method_codes: 'LP-PI:LP-DIR'
          }]
        };
        const jsonNew1 = {
          contribution: [{
            magic_version: '3.0'
          }],
          samples: [{
            sample: 'sample_A',
            geologic_classes: 'Sedimentary:Submarine',
            int_abs: '0.0123',
            dir_dec: '1',
            dir_tilt_correction: '100', // insert a 100% tilt correction
            method_codes: 'LP-DIR:LP-PI'
          }]
        };
        const jsonOld2 = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_samples: [{
            er_sample_name: 'sample_A',
            sample_class: 'Submarine:Sedimentary',
          }],
          pmag_results: [{
            er_sample_names: 'sample_A',
            average_int: '0.0123',
            tilt_inc_uncorr: '1',
            magic_method_codes: 'LP-PI:LP-DIR'
          }]
        };
        const jsonNew2 = {
          contribution: [{
            magic_version: '3.0'
          }],
          samples: [{
            sample: 'sample_A',
            geologic_classes: 'Sedimentary:Submarine',
            int_abs: '0.0123',
            dir_inc: '1',
            dir_tilt_correction: '0', // insert a 0% tilt correction
            method_codes: 'LP-DIR:LP-PI'
          }]
        };
        return Promise.all([
          upgradeContributionJSONTest(jsonOld1, jsonNew1),
          upgradeContributionJSONTest(jsonOld2, jsonNew2)
        ]);
      });

      it('should insert the default sample orientation flag of "g" only if there is an orientation', () => {
        const jsonOld1 = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_samples: [{
            sample_azimuth: 1
          }],
        };
        const jsonNew1 = {
          contribution: [{
            magic_version: '3.0'
          }],
          samples: [{
            orientation_flag: 'g',
            azimuth: 1
          }]
        };
        const jsonOld2 = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_samples: [{
            sample_dip: 1
          }],
        };
        const jsonNew2 = {
          contribution: [{
            magic_version: '3.0'
          }],
          samples: [{
            orientation_flag: 'g',
            dip: 1
          }]
        };
        const jsonOld3 = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_samples: [{
            sample_bed_dip: 1
          }],
        };
        const jsonNew3 = {
          contribution: [{
            magic_version: '3.0'
          }],
          samples: [{
            orientation_flag: 'g',
            bed_dip: 1
          }]
        };
        const jsonOld4 = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_samples: [{
            sample_cooling_rate: 1
          }],
        };
        const jsonNew4 = {
          contribution: [{
            magic_version: '3.0'
          }],
          samples: [{
            cooling_rate: 1 // no orientation data, so no orientation flag
          }]
        };
        const jsonOld5 = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_samples: [{
            sample_orientation_flag: 'b',
            sample_azimuth: 1
          }],
        };
        const jsonNew5 = {
          contribution: [{
            magic_version: '3.0'
          }],
          samples: [{
            orientation_flag: 'b',
            azimuth: 1
          }]
        };
        return Promise.all([
          upgradeContributionJSONTest(jsonOld1, jsonNew1),
          upgradeContributionJSONTest(jsonOld2, jsonNew2),
          upgradeContributionJSONTest(jsonOld3, jsonNew3),
          upgradeContributionJSONTest(jsonOld4, jsonNew4),
          upgradeContributionJSONTest(jsonOld5, jsonNew5)
        ]);
      });

      it('should insert site default values', () => {
        const jsonOld1 = {
          contribution: [{
            magic_version: '2.5'
          }],
          pmag_sites: [{
            site_int: 1
          }]
        };
        const jsonNew1 = {
          contribution: [{
            magic_version: '3.0'
          }],
          sites: [{
            result_type: 'i',
            result_type: 'i',
            result_type: 'i',
            result_quality: 'g'
          }]
        };
        return Promise.all([
          upgradeContributionJSONTest(jsonOld1, jsonNew1)
        ]);
      });

      it('should insert other default values', () => {
        const jsonOld = {
          contribution: [{
            magic_version: '2.5'
          }],
          magic_measurements: [{
            treatment_temp: 1 // causes default measurements.standard and measurements.quality
          }],
          pmag_samples: [{
            sample_polarity,
            sample_nrm
          }],
          //pmag_sites: [{
          //  site_nrm,
          //  site_polarity
          //}],
          pmag_specimens: [{
            specimen_scat,
            specimen_polarity,
            specimen_nrm,
            specimen_correction
          }],
          rmag_anisotropy: [{
            anisotropy_flag
          }],
          rmag_hysteresis: [{
            hysteresis_flag
          }],
          rmag_remanence: [{
            remanence_flag
          }],
          rmag_susceptibility: [{
            susceptibility_flag
          }]
        };
        const jsonNew = {
          contribution: [{
            magic_version: '3.0'
          }],
          sites: [{

            result_type: 'i',
            result_quality: 'g'
          }],
          samples: [{
            result_type: 'i',
            result_quality: 'g'
          }],
          specimens: [{
            result_type: 'i',
            result_quality: 'g'
          }],
          measurements: [{
            treat_temp: 1,
            standard: 'u',
            quality: 'g'
          }]

        };
        return upgradeContributionJSONTest(jsonOld, jsonNew);
      });

    });

    describe('when reorganizing data', () => {

      it('should separate results with mixtures of corrected/uncorrected directions', () => {
        const jsonOld = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_samples: [{
            er_sample_name: 'sample_A',
            sample_class: 'Submarine:Sedimentary',
          }],
          pmag_results: [{
            er_sample_names: 'sample_A',
            average_int: '0.0123',
            tilt_dec_corr: '1',
            tilt_inc_uncorr: '2',
            magic_method_codes: 'LP-PI:LP-DIR'
          }]
        };
        const jsonNew = {
          contribution: [{
            magic_version: '3.0'
          }],
          samples: [{
            sample: 'sample_A',
            geologic_classes: 'Sedimentary:Submarine',
            int_abs: '0.0123',
            dir_dec: '1',
            dir_tilt_correction: '100',
            method_codes: 'LP-DIR:LP-PI'
          }, {
            sample: 'sample_A',
            geologic_classes: 'Sedimentary:Submarine',
            int_abs: '0.0123',
            dir_dec: '2',
            dir_tilt_correction: '0',
            method_codes: 'LP-DIR:LP-PI'
          }]
        };
        return upgradeContributionJSONTest(jsonOld, jsonNew);
      });

      it('should convert a wide pmag_criteria table into a tall criteria table', () => {
        const jsonOld = {
          contribution: [{
            magic_version: '2.5'
          }],
          pmag_criteria: [{
            pmag_criteria_code: 'DE-SITE',
            site_k: '180',
            site_alpha95: '50',
            criteria_definition: 'Criteria for selection of site direction'
          }]
        };
        const jsonNew = {
          contribution: [{
            magic_version: '3.0'
          }],
          criteria: [{ // this row first because of sorting on criterion, table_column
            description: 'Criteria for selection of site direction',
            criterion: 'DE-SITE',
            table_column: 'sites.dir_alpha95',
            criterion_operation: '<=',
            criterion_value: '50'
          }, {
            description: 'Criteria for selection of site direction',
            criterion: 'DE-SITE',
            table_column: 'sites.dir_k',
            criterion_operation: '>=',
            criterion_value: '180'
          }]
        };
        return upgradeContributionJSONTest(jsonOld, jsonNew);
      });

      it('should convert the specimen direction type into a method code', () => {
        const jsonOld1 = {
          contribution: [{
            magic_version: '2.5'
          }],
          pmag_specimens: [{
            specimen_inc: 1,
            magic_method_codes: 'DE-SITE'
          }]
        };
        const jsonNew1 = {
          contribution: [{
            magic_version: '3.0'
          }],
          specimens: [{
            dir_inc: 1,
            method_codes: 'DE-SITE:DE-BFL' // default to "determined from a line"
          }]
        };
        const jsonOld2 = {
          contribution: [{
            magic_version: '2.5'
          }],
          pmag_specimens: [{
            specimen_inc: 1,
            specimen_direction_type: 'l',
            magic_method_codes: 'DE-SITE'
          }]
        };
        const jsonNew2 = {
          contribution: [{
            magic_version: '3.0'
          }],
          specimens: [{
            dir_inc: 1,
            method_codes: 'DE-SITE:DE-BFP' // apply "determined from a line"
          }]
        };
        const jsonOld3 = {
          contribution: [{
            magic_version: '2.5'
          }],
          pmag_specimens: [{
            specimen_inc: 1,
            specimen_direction_type: 'p',
            magic_method_codes: 'DE-SITE'
          }]
        };
        const jsonNew3 = {
          contribution: [{
            magic_version: '3.0'
          }],
          specimens: [{
            dir_inc: 1,
            method_codes: 'DE-SITE:DE-BFP' // apply "determined from a plane"
          }]
        };
        const jsonOld4 = {
          contribution: [{
            magic_version: '2.5'
          }],
          pmag_results: [{
            er_specimen_name: 's1',
            average_inc: 1,
            magic_method_codes: 'DE-SITE'
          }]
        };
        const jsonNew4 = {
          contribution: [{
            magic_version: '3.0'
          }],
          specimens: [{
            specimen: 's1',
            dir_inc: 1,
            method_codes: 'DE-SITE' // not for pmag_results directions
          }]
        };
        const jsonOld5 = {
          contribution: [{
            magic_version: '2.5'
          }],
          pmag_specimens: [{
            specimen_int: 1,
            magic_method_codes: 'LP-DIR'
          }]
        };
        const jsonNew5 = {
          contribution: [{
            magic_version: '3.0'
          }],
          specimens: [{
            int_abs: 1,
            method_codes: 'LP-DIR' // not without a pmag_specimens direction
          }]
        };
        return Promise.all([
          upgradeContributionJSONTest(jsonOld1, jsonNew1),
          upgradeContributionJSONTest(jsonOld2, jsonNew2),
          upgradeContributionJSONTest(jsonOld3, jsonNew3),
          upgradeContributionJSONTest(jsonOld4, jsonNew4),
          upgradeContributionJSONTest(jsonOld5, jsonNew5)
        ]);
      });

      it('should assign the minimum location lat and lon to the correct columns', () => {
        const jsonOld = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_locations: [{
            location_begin_lat: 10,
            location_end_lat: -10,
            location_begin_lon: 10,
            location_end_lon: 5
          }]
        };
        const jsonNew = {
          contribution: [{
            magic_version: '3.0'
          }],
          locations: [{
            lat_s: -10,
            lat_n: 10,
            lon_w: 5,
            lon_e: 10
          }]
        };
        return upgradeContributionJSONTest(jsonOld, jsonNew);
      });

      it('should summarize measurements as experiments', () => {
        return upgradeContributionJSONTest(jsonOld, jsonNew);
      });

      it('should combine external_database_names/ids into a dictionary', () => {
        const jsonOld = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_locations: [{
            er_location_name: 'loc_1'
          }],
          pmag_results: [{
            er_location_names: 'loc_1',
            external_database_names: ':GEOMAGIA50:CALS7K.2:ARCHEO00:',
            external_database_ids: '1435::2329'
          }]
        };
        const jsonNew = {
          contribution: [{
            magic_version: '3.0'
          }],
          locations: [{
            location: 'loc_1',
            external_database_ids: 'ARCHEO00[2329]:CALS7K.2[]:GEOMAGIA50[1435]'
          }]
        };
        return upgradeContributionJSONTest(jsonOld, jsonNew);
      });

      it('should use method codes to map normalized relative intensities', () => {
        const jsonOld = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_sites: [{
            er_site_name: 'site_1'
          }],
          pmag_results: [{
            er_site_names: 'site_1',
            average_int_rel: '1',
            average_int_rel_sigma: '2',
            magic_method_codes: 'something else:ie-ARM'
          }]
        };
        const jsonNew = {
          contribution: [{
            magic_version: '3.0'
          }],
          sites: [{
            site: 'site_1',
            int_rel_ARM: '1',
            int_rel_ARM_sigma: '2',
            method_codes: 'SOMETHING ELSE'
          }]
        };
        return upgradeContributionJSONTest(jsonOld, jsonNew);
      });

      it('should add a geoid method code', () => {
        const jsonOld = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_sites: [{
            er_site_name: 'site_1',
            site_location_geoid: 'WGS84'
          }]
        };
        const jsonNew = {
          contribution: [{
            magic_version: '3.0'
          }],
          sites: [{
            site: 'site_1',
            method_codes: 'GE-WGS84'
          }]
        };
        return upgradeContributionJSONTest(jsonOld, jsonNew);
      });

      it('should rename method codes', () => {
        const jsonOld = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_sites: [{
            er_site_name: 'site_1',
            magic_method_codes: 'ST-BC:ST-BC-Q1:ST-CT:ST-IC:ST-IFC:ST-VV-Q1'
          }]
        };
        const jsonNew = {
          contribution: [{
            magic_version: '3.0'
          }],
          sites: [{
            site: 'site_1',
            method_codes: 'ST-BCQ-1:ST-C:ST-C-I:ST-G:ST-G-IF:ST-VVQ-1'
          }]
        };
        return upgradeContributionJSONTest(jsonOld, jsonNew);
      });

      it('should favor synthetic name over specimen name', () => {
        const jsonOld = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_samples: [{
            er_sample_name: 'sample1'
          }],
          er_specimens: [{
            er_specimen_name: 'specimen1'
          }, {
            er_specimen_name: 'specimen2'
          }],
          pmag_results: [{
            er_sample_names: 'sample1',
            er_specimen_names: 'specimen1:specimen2',
            average_int: '1'
          }],
          er_synthetics: [{
            er_synthetic_name: 'synthetic1',
            er_specimen_name: 'specimen1'
          }]
        };
        const jsonNew = {
          contribution: [{
            magic_version: '3.0'
          }],
          samples: [{
            sample: 'sample1',
            specimens: 'specimen2:synthetic1',
            int_abs: '1'
          }],
          specimens: [{
            specimen: 'specimen2'
          }, {
            specimen: 'synthetic1',
            specimen_alternatives: 'specimen1'
          }]
        };
        return upgradeContributionJSONTest(jsonOld, jsonNew);
      });

      it('should combine pole confidence ellipse parameters', () => {
        const jsonOld = {
          contribution: [{
            magic_version: '2.5'
          }],
          pmag_results: [{
            er_location_names: 'location1',
            eta_dec: '1',
            eta_inc: '2',
            eta_semi_angle: '3',
            zeta_dec: '4',
            zeta_inc: '5',
            zeta_semi_angle: '6'
          }]
        };
        const jsonNew = {
          contribution: [{
            magic_version: '3.0'
          }],
          locations: [{
            location: 'location1',
            pole_conf: '1:2:3:4:5:6'
          }]
        };
        return upgradeContributionJSONTest(jsonOld, jsonNew);
      });

      it('should combine the anisotropy tensor elements', () => {
        const jsonOld = {
          contribution: [{
            magic_version: '2.5'
          }],
          rmag_anisotropy: [{
            er_specimen_name: 'specimen1',
            anisotropy_s1: '1',
            anisotropy_s2: '2',
            anisotropy_s3: '3',
            anisotropy_s4: '4',
            anisotropy_s5: '5',
            anisotropy_s6: '6'
          }]
        };
        const jsonNew = {
          contribution: [{
            magic_version: '3.0'
          }],
          specimens: [{
            specimen: 'specimen1',
            aniso_s: '1:2:3:4:5:6'
          }]
        };
        return upgradeContributionJSONTest(jsonOld, jsonNew);
      });

      it('should combine the anisotropy eigenparameters', () => {
        const jsonOld1 = {
          contribution: [{
            magic_version: '2.5'
          }],
          rmag_results: [{
            er_specimen_names: 'specimen1',
            anisotropy_t1: '1',
            anisotropy_v1_dec: '2',
            anisotropy_v1_inc: '3',
            anisotropy_v1_eta_dec: '4',
            anisotropy_v1_eta_inc: '5',
            anisotropy_v1_eta_semi_angle: '6',
            anisotropy_v1_zeta_dec: '7',
            anisotropy_v1_zeta_inc: '8',
            anisotropy_v1_zeta_semi_angle: '9'
          }]
        };
        const jsonNew1 = {
          contribution: [{
            magic_version: '3.0'
          }],
          specimens: [{
            specimen: 'specimen1',
            aniso_v1: '1:2:3:eta/zeta:4:5:6:7:8:9'
          }]
        };
        const jsonOld2 = {
          contribution: [{
            magic_version: '2.5'
          }],
          rmag_results: [{
            er_specimen_names: 'specimen1',
            anisotropy_t2: '1',
            anisotropy_v2_dec: '2',
            anisotropy_v2_inc: '3'
          }]
        };
        const jsonNew2 = {
          contribution: [{
            magic_version: '3.0'
          }],
          specimens: [{
            specimen: 'specimen1',
            aniso_v2: '1:2:3'
          }]
        };
        return Promise.all([
          upgradeContributionJSONTest(jsonOld1, jsonNew1),
          upgradeContributionJSONTest(jsonOld2, jsonNew2)
        ]);
      });

      it('should adopt inferred ages up to the sites table', () => {
        const jsonOld1 = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_sites: [{
            er_site_name: 'site1'
          }],
          er_samples: [{
            er_site_name: 'site1',
            er_sample_name: 'sample1'
          }],
          er_specimens: [{
            er_site_name: 'site1',
            er_sample_name: 'sample1',
            er_specimen_name: 'specimen1'
          }],
          pmag_results: [{
            er_site_names: 'site1',
            er_sample_names: 'sample1',
            er_specimen_names: 'specimen1',
            average_age: '1', // -> pmag_specimens.specimen_inferred_age -> pmag_samples.sample_inferred_age  -> pmag_sites.site_inferred_age
            average_age_low: '0',
            average_age_high: '2'
          }]
        };
        const jsonNew1 = {
          contribution: [{
            magic_version: '3.0'
          }],
          sites: [{
            site: 'site1',
            age: '1',
            age_low: '0',
            age_high: '2'
          }],
          samples: [{
            site: 'site1',
            sample: 'sample1'
          }],
          specimens: [{
            sample: 'sample1',
            specimen: 'specimen1'
          }]
        };
        return upgradeContributionJSONTest(jsonOld1, jsonNew1);
      });

      it('should repeat metadata', () => {
        const jsonOld1 = {
          contribution: [{
            magic_version: '2.5'
          }],
          er_specimens: [{
            er_specimen_name: 'specimen1',
            specimen_lithology: 'Basalt'
          }],
          pmag_specimens: [{
            er_specimen_name: 'specimen1',
            specimen_inc: '1'
          }, {
            er_specimen_name: 'specimen1',
            specimen_inc: '2'
          }]
        };
        const jsonNew1 = {
          contribution: [{
            magic_version: '3.0'
          }],
          specimens: [{
            specimen: 'specimen1',
            lithologies: 'Basalt',
            dir_inc: '1'
          }, {
            specimen: 'specimen1',
            lithologies: 'Basalt',
            dir_inc: '2'
          }]
        };
        return upgradeContributionJSONTest(jsonOld1, jsonNew1);
      });

      it('should combine descriptions without repetition', () => {
        const jsonOld1 = {
          contribution: [{
            magic_version: '2.5'
          }],
          pmag_results: [{
            er_site_names: 'site1',
            pmag_result_name: 'name',
            result_description: 'a name'
          }]
        };
        const jsonNew1 = {
          contribution: [{
            magic_version: '3.0'
          }],
          sites: [{
            site: 'site1',
            description: 'a name'
          }]
        };
        const jsonOld2 = {
          contribution: [{
            magic_version: '2.5'
          }],
          pmag_results: [{
            er_site_names: 'site1',
            pmag_result_name: 'name1',
            result_description: 'a name'
          }]
        };
        const jsonNew2 = {
          contribution: [{
            magic_version: '3.0'
          }],
          sites: [{
            site: 'site1',
            description: 'name1, a name'
          }]
        };
        return Promise.all([
          upgradeContributionJSONTest(jsonOld1, jsonNew1),
          upgradeContributionJSONTest(jsonOld2, jsonNew2)
        ]);
      });

      it('should convert dates into ISO 8601 timestamps', () => {
        const jsonOld1 = {
          contribution: [{
            magic_version: '2.5'
          }],
          magic_measurements: [{
            measurement_date: '2008:07:01:08:46:00.00',
            measurement_time_zone: 'SAN'
          }]
        };
        const jsonNew1 = {
          contribution: [{
            magic_version: '3.0'
          }],
          measurements: [{
            timestamp: '2008-07-01T15:46:00Z'
          }]
        };
        const jsonOld2 = {
          contribution: [{
            magic_version: '2.5'
          }],
          magic_measurements: [{
            measurement_date: '2008:07:01:08:46:00.00'
          }]
        };
        const jsonNew2 = {
          contribution: [{
            magic_version: '3.0'
          }],
          measurements: [{
            timestamp: '2008-07-01T08:46:00Z'
          }]
        };
        const jsonOld3 = {
          contribution: [{
            magic_version: '2.5'
          }],
          magic_measurements: [{
            measurement_time_zone: 'SAN'
          }]
        };
        const jsonNew3 = {
          contribution: [{
            magic_version: '3.0'
          }]
        };
        return Promise.all([
          upgradeContributionJSONTest(jsonOld1, jsonNew1),
          upgradeContributionJSONTest(jsonOld2, jsonNew2),
          upgradeContributionJSONTest(jsonOld3, jsonNew3)
        ]);
      });

      // TODO: create a rotation matrix, even though they haven't been used properly
      /*it('should create a rotation matrix', () => {
       const jsonOld = {
       contribution: [{
       magic_version: '2.5'
       }],
       er_specimens: [{
       er_specimen_name: 'specimen1'
       }],
       pmag_specimens: [{
       er_specimen_names: 'specimen1',
       pmag_rotation_codes: 'code1:code2'
       }],
       pmag_rotations: [{
       pmag_rotation_codes: 'code1',
       er_specimen_name: 'specimen1'
       }]
       };
       const jsonNew = {
       contribution: [{
       magic_version: '3.0'
       }],
       specimens: [{
       specimen: 'synthetic1',
       specimen_alternatives: 'specimen1'
       }]
       };
       upgradeContributionJSONTest(jsonOld, jsonNew);
       });

       it('should warn about parsing an empty string', () => {
       const jsonOld = {
       contribution: [{
       magic_version: '2.5'
       }],
       er_specimens: [{
       er_specimen_name: 'sp1'
       }],
       pmag_results: [{
       er_location_names: 'lo1',
       er_site_names: 'si1',
       er_sample_names: 'sa1',
       er_specimen_names: 'sp1',
       pmag_rotation_codes: 'code1:code2'
       }],
       pmag_rotations: [{
       pmag_rotation_code: 'code1'
       }]
       };
       return upgradeContributionWarningTest(jsonOld, /pmag_rotations/i);
       });*/

      // TODO: reference to DOI, might need to export er_citation_ids to avoid losing DOIs in upgrades

      // TODO: user to handle
    });

  });

  // Test upgrading valid files.
  describe('when upgrading valid files', () => {
    it('should upgrading contribution 10507 (MagIC version 2.5) with no errors', () => {
      const parser = new ParseContribution({});
      return parser.parsePromise({text: contribution10507}).then(() => upgradeContributionNoErrorTest(parser.json));
    });
  });
  
  // Test calculating the upgrade map.
  describe('when calculating the upgrade map', () => {
    it('should handle renamed tables', () => {
      const newModel = {//indicates that table "er_locations" has been changed to "locations"
        tables: { locations: {
          columns: { location_name: {
            previous_columns: [{
              table: 'er_locations',
              column: 'location_name'
            }]
          }}
        }}
      };
      const upgradeMap = {
        er_locations: { location_name: [{ table: 'locations', column: 'location_name'}]}//the map from the old model to the new
      };
      upgradeContributionCreateMapTest(newModel, upgradeMap);
    });

    it('should handle multiple columns', () => {
      const newModel = {
        'magic_version': '3.0',
        'tables': {
          'contribution': {
            'label': 'Contribution',
            'position': 1,
            'description': 'Contribution metadata',
            'columns': {
              'id': {
                'label': 'Contribution ID',
                'group': 'Contribution',
                'position': 1,
                'type': 'Integer',
                'description': 'Unique MagIC Contribution ID, Download Only, written during contribution activation',
                'examples': ['5412'],
                'validations': ['downloadOnly()'],
                'previous_columns': [{
                  'table': 'contribution',
                  'column': 'id'
                }]
              },
              'version': {
                'label': 'Version',
                'group': 'Contribution',
                'position': 2,
                'type': 'Integer',
                'description': 'Contribution version number, Download Only, written during contribution activation',
                'notes': '1 for original contribution, 6 for latest contribution if there are 6 versions, empty if the contribution is not activated',
                'validations': ['downloadOnly()'],
                'previous_columns': [{
                  'table': 'contribution',
                  'column': 'version'
                }]
              }
            }//end columns
      }}};
      const upgradeMap = {
        contribution: {
          id:     [{ table: 'contribution', column: 'id'}],
          version:[{ table: 'contribution', column: 'version'}]
        }

      };
      upgradeContributionCreateMapTest(newModel, upgradeMap);
    });

    it('should handle inserted columns', () => {
      const newModel = {
        tables: { er_locations: {
          columns: { location_name: {}}
        }}
      };
      const upgradeMap = {};
      upgradeContributionCreateMapTest(newModel, upgradeMap);
    });

    //If a the current column name is different than the previous column name on a one to one basis. By contrast, multiple columns with
    //the same previous column indicate that a split was made from the previous version
    it('should handle renamed columns', () => {
      const newModel = {//indicates that column er_locations.name has been changed  to er_locations.location_name
        tables: { er_locations: {
          columns: { location_name: {
            previous_columns: [{
              table: 'er_locations',
              column: 'name'
            }]
          }}
        }}
      };
      const upgradeMap  = {
        er_locations: { name: [{ table: 'er_locations', column: 'location_name'}]}//from the previous table and column to new table and column
      };
      upgradeContributionCreateMapTest(newModel, upgradeMap);
    });

    //If there are two columns with different names that have the same previous table and previous column name, we have a split
    it('should handle split columns', () => {
      const newModel = {
        tables: { er_locations: {
          columns: {
            location_name1: {
              previous_columns: [{
                table: 'er_locations',
                column: 'splitColName'
              }]
            },
            location_name2: {
              previous_columns: [{
                table: 'er_locations',
                column: 'splitColName'
              }]
            }
          }
        }}
      };
      const upgradeMap = {
        er_locations: {
          splitColName: [
            { table: 'er_locations', column: 'location_name1'},
            { table: 'er_locations', column: 'location_name2'}
          ]
        }
      };
      upgradeContributionCreateMapTest(newModel, upgradeMap);
    });

    it('should handle merged columns', () => {
      const newModel = {
        tables: { er_locations: {
          columns: { location_name: {
            previous_columns: [{
              table: 'er_locations',
              column: 'col_name1'
            }, {
              table: 'er_locations',
              column: 'col_name2'
            }]
          }}
        }}
      };
      const upgradeMap = {
        er_locations: {//the table in the new model
          col_name1: [{ table: 'er_locations', column: 'location_name'}],//from previous column (old JSON) TO new table and column
          col_name2: [{ table: 'er_locations', column: 'location_name'}] //from previous column (old JSON) TO new table and column
        }
      };
      upgradeContributionCreateMapTest(newModel, upgradeMap);
    });

  });
});

// Expect the warnings to contain one warning that matches the reWarningMsg regex.
const upgradeContributionWarningTest = (jsonOld, reWarningMsg) => {
  const upgrader = new UpgradeContribution({});
  return upgrader.upgradePromise({json: jsonOld}).then(() => {
    expect(upgrader.warnings().length).to.be.at.least(1);
    expect(_.find(upgrader.warnings(), warning => warning.message.match(reWarningMsg))).to.not.be.undefined;
  });
};

// Expect the last error to match the reErrorMsg regex.
const upgradeContributionErrorTest = (jsonOld, reErrorMsg) => {
  const upgrader = new UpgradeContribution({});
  return upgrader.upgradePromise({json: jsonOld}).then(() => {
    expect(upgrader.errors().length).to.be.at.least(1);
    expect(_.find(upgrader.errors(), error => error.message.match(reErrorMsg))).to.not.be.undefined;
  });
};

const upgradeContributionNErrorsTest = (jsonOld, nErrors) => {
  const upgrader = new UpgradeContribution({});
  return upgrader.upgradePromise({json: jsonOld}).then(() => {
    expect(upgrader.errors().length).to.equal(nErrors);
  });
};

// Expect no errors.
const upgradeContributionNoErrorTest = (jsonOld) => {
  const upgrader = new UpgradeContribution({});
  return upgrader.upgradePromise({json: jsonOld}).then(() => {
    expect(upgrader.errors().length).to.equal(0);
  });
};

// Expect no errors and check against expected JSON.
const upgradeContributionJSONTest = (jsonOld, jsonExpected) => {
  const upgrader = new UpgradeContribution({});
  return upgrader.upgradePromise({json: jsonOld}).then(() => {
    expect(upgrader.errors().length).to.equal(0);
    expect(upgrader.json).to.deep.equal(jsonExpected);
  });
};

// Expect no errors and check the upgrade map against expected map.
const upgradeContributionCreateMapTest = (newModel, expectedMap) => {
  const upgrader = new UpgradeContribution({});
  const upgradeMap = upgrader.getUpgradeMap(newModel);
  expect(upgradeMap).to.deep.equal(expectedMap);
  expect(upgrader.warnings().length).to.equal(0);
  expect(upgrader.errors().length).to.equal(0);
};