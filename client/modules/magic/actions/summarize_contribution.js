import _ from 'lodash';
import Promise from 'bluebird';
import Runner from '../../common/actions/runner.js';

import { default as versions } from '../../../../lib/modules/magic/magic_versions';
import { default as models   } from '../../../../lib/modules/magic/data_models';

export default class extends Runner {

  constructor({runnerState}) {
    super({runnerState});
  }

  summarize(contribution) {

    let summary = {contribution: {}};

    if (contribution.measurements) {
      summary.experiments = summary.experiments || {};
      summary.specimens   = summary.specimens   || {};
      contribution.measurements.rows.map((measurementRow) => {

        // Increment the number of measurements for this contribution.
        if (!summary.contribution.N_MEASUREMENTS)
          summary.contribution.N_MEASUREMENTS = 0;
        summary.contribution.N_MEASUREMENTS += 1;

        const experimentColumnIdx = contribution.measurements.columns.indexOf('experiment');
        let experimentName = measurementRow[experimentColumnIdx];
        if (experimentName !== undefined && experimentName !== '') {
          experimentName = experimentName.replace('.', '_');
          if (!summary.experiments[experimentName])
            summary.experiments[experimentName] = {};

          // Increment the number of measurements for this experiment.
          if (!summary.experiments[experimentName].N_MEASUREMENTS)
            summary.experiments[experimentName].N_MEASUREMENTS = 0;
          summary.experiments[experimentName].N_MEASUREMENTS += 1;

          // Add the experiment name to the list for this contribution.
          if (!summary.contribution.EXPERIMENT_NAMES)
            summary.contribution.EXPERIMENT_NAMES = {};
          summary.contribution.EXPERIMENT_NAMES[experimentName] = true;

          const specimenColumnIdx = contribution.measurements.columns.indexOf('specimen');
          let specimenName = measurementRow[specimenColumnIdx];
          if (specimenName !== undefined && specimenName !== '') {
            specimenName = specimenName.replace('.', '_');
            summary.experiments[experimentName].ER_SPECIMEN_NAME = specimenName;
            if (!summary.specimens[specimenName])
              summary.specimens[specimenName] = {};

            // Increment the number of measurements for this specimen.
            if (!summary.specimens[specimenName].N_MEASUREMENTS)
              summary.specimens[specimenName].N_MEASUREMENTS = 0;
            summary.specimens[specimenName].N_MEASUREMENTS += 1;

            // Add the experiment name to the list for this specimen.
            if (!summary.specimens[specimenName].EXPERIMENT_NAMES)
              summary.specimens[specimenName].EXPERIMENT_NAMES = {};
            summary.specimens[specimenName].EXPERIMENT_NAMES[experimentName] = true;
          }

        }

      });

      // Convert the list of experiment names into the number of experiments for each specimen.
      _.keys(summary.specimens).map((specimenName) => {
        if (summary.specimens[specimenName].EXPERIMENT_NAMES) {
          summary.specimens[specimenName].EXPERIMENT_NAMES = _.keys(summary.specimens[specimenName].EXPERIMENT_NAMES).join(':');
          summary.specimens[specimenName].N_EXPERIMENTS = summary.specimens[specimenName].EXPERIMENT_NAMES.split(':').length;
        }
      });
    }

    if (contribution.specimens) {
      summary.specimens = summary.specimens || {};
      summary.samples   = summary.samples   || {};
      contribution.specimens.map((specimenRow) => {

        // Increment the number of specimen results for this contribution.
        if (!summary.contribution.N_SPECIMEN_RESULTS)
          summary.contribution.N_SPECIMEN_RESULTS = 0;
        summary.contribution.N_SPECIMEN_RESULTS += 1;

        _.keys(specimenRow).map((column) => {
          if (!summary.contribution[column.toUpperCase()])
            summary.contribution[column.toUpperCase()] = {};
          if (models[_.last(versions)].tables.samples.columns[column] && models[_.last(versions)].tables.specimens.columns[column].type === 'List')
            specimenRow[column].split(':').map((val) => {
              if (_.trim(val) !== '')
                summary.contribution[column.toUpperCase()][_.trim(val)] = true
            });
          else
            if (_.trim(specimenRow[column]) !== '')
              summary.contribution[column.toUpperCase()][_.trim(specimenRow[column])] = true
        });

        let specimenName = specimenRow.specimen;
        if (specimenName !== undefined && specimenName !== '') {
          specimenName = specimenName.replace('.', '_');
          if (!summary.specimens[specimenName])
            summary.specimens[specimenName] = {};

          // Add the specimen name to the list for this contribution.
          if (!summary.contribution.ER_SPECIMEN_NAMES)
            summary.contribution.ER_SPECIMEN_NAMES = {};
          summary.contribution.ER_SPECIMEN_NAMES[specimenName] = true;

        }

        let sampleName = specimenRow.sample;
        if (sampleName !== undefined && sampleName !== '') {
          sampleName = sampleName.replace('.', '_');
          if (!summary.samples[sampleName])
            summary.samples[sampleName] = {};
        }

        // If this specimen belongs to a sample:
        if (specimenName !== undefined && specimenName !== '' &&
            sampleName !== undefined && sampleName !== '') {
          summary.specimens[specimenName].ER_SAMPLE_NAME = sampleName;

          // Increment the number of specimen results for this sample.
          if (!summary.samples[sampleName].N_SPECIMEN_RESULTS)
            summary.samples[sampleName].N_SPECIMEN_RESULTS = 0;
          summary.samples[sampleName].N_SPECIMEN_RESULTS += 1;

          // Add the specimen name to the list for this sample.
          if (!summary.samples[sampleName].ER_SPECIMEN_NAMES)
            summary.samples[sampleName].ER_SPECIMEN_NAMES = {};
          summary.samples[sampleName].ER_SPECIMEN_NAMES[specimenName] = true;

        }

      });

      // Convert the list of specimen names into the number of specimens for each sample.
      _.keys(summary.samples).map((sampleName) => {
        if (summary.samples[sampleName].ER_SPECIMEN_NAMES) {
          summary.samples[sampleName].ER_SPECIMEN_NAMES = _.keys(summary.samples[sampleName].ER_SPECIMEN_NAMES).join(':');
          summary.samples[sampleName].N_SPECIMENS = summary.samples[sampleName].ER_SPECIMEN_NAMES.split(':').length;
          summary.samples[sampleName].N_EXPERIMENTS = 0;
          summary.samples[sampleName].N_MEASUREMENTS = 0;
          summary.samples[sampleName].ER_SPECIMEN_NAMES.split(':').map((specimenName) => {
            summary.samples[sampleName].N_EXPERIMENTS += summary.specimens[specimenName].N_EXPERIMENTS;
            summary.samples[sampleName].N_MEASUREMENTS += summary.specimens[specimenName].N_MEASUREMENTS;
          });
        }
      });

    }

    if (contribution.samples) {
      summary.samples = summary.samples || {};
      summary.sites   = summary.sites   || {};
      contribution.samples.map((sampleRow) => {

        // Increment the number of sample results for this contribution.
        if (!summary.contribution.N_SAMPLE_RESULTS)
          summary.contribution.N_SAMPLE_RESULTS = 0;
        summary.contribution.N_SAMPLE_RESULTS += 1;

        _.keys(sampleRow).map((column) => {
          if (!summary.contribution[column.toUpperCase()])
            summary.contribution[column.toUpperCase()] = {};
          if (models[_.last(versions)].tables.samples.columns[column] && models[_.last(versions)].tables.samples.columns[column].type === 'List')
            sampleRow[column].split(':').map((val) => {
              if (_.trim(val) !== '')
                summary.contribution[column.toUpperCase()][_.trim(val)] = true
            });
          else
            if (_.trim(sampleRow[column]) !== '')
              summary.contribution[column.toUpperCase()][_.trim(sampleRow[column])] = true
        });

        let sampleName = sampleRow.sample;
        if (sampleName !== undefined && sampleName !== '') {
          sampleName = sampleName.replace('.', '_');
          if (!summary.samples[sampleName])
            summary.samples[sampleName] = {};

          // Add the sample name to the list for this contribution.
          if (!summary.contribution.ER_SAMPLE_NAMES)
            summary.contribution.ER_SAMPLE_NAMES = {};
          summary.contribution.ER_SAMPLE_NAMES[sampleName] = true;
        }

        let siteName = sampleRow.site;
        if (siteName !== undefined && siteName !== '') {
          siteName = siteName.replace('.', '_');
          if (!summary.sites[siteName])
            summary.sites[siteName] = {};
        }

        // If this sample belongs to a site:
        if (sampleName !== undefined && sampleName !== '' &&
            siteName !== undefined && siteName !== '') {
          summary.samples[sampleName].ER_SITE_NAME = siteName;

          // Increment the number of sample results for this site.
          if (!summary.sites[siteName].N_SAMPLE_RESULTS)
            summary.sites[siteName].N_SAMPLE_RESULTS = 0;
          summary.sites[siteName].N_SAMPLE_RESULTS += 1;

          // Add the sample name to the list for this site.
          if (!summary.sites[siteName].ER_SAMPLE_NAMES)
            summary.sites[siteName].ER_SAMPLE_NAMES = {};
          summary.sites[siteName].ER_SAMPLE_NAMES[sampleName] = true;

        }

      });

      // Convert the list of sample names into the number of samples for each site.
      _.keys(summary.sites).map((siteName) => {
        if (summary.sites[siteName].ER_SAMPLE_NAMES) {
          summary.sites[siteName].ER_SAMPLE_NAMES = _.keys(summary.sites[siteName].ER_SAMPLE_NAMES).join(':');
          summary.sites[siteName].N_SAMPLES = summary.sites[siteName].ER_SAMPLE_NAMES.split(':').length;
          summary.sites[siteName].N_SPECIMENS = 0;
          summary.sites[siteName].N_SPECIMEN_RESULTS = 0;
          summary.sites[siteName].N_EXPERIMENTS = 0;
          summary.sites[siteName].N_MEASUREMENTS = 0;
          summary.sites[siteName].ER_SAMPLE_NAMES.split(':').map((sampleName) => {
            summary.sites[siteName].N_SPECIMENS += summary.samples[sampleName].N_SPECIMENS;
            summary.sites[siteName].N_SPECIMEN_RESULTS += summary.samples[sampleName].N_SPECIMEN_RESULTS;
            summary.sites[siteName].N_EXPERIMENTS += summary.samples[sampleName].N_EXPERIMENTS;
            summary.sites[siteName].N_MEASUREMENTS += summary.samples[sampleName].N_MEASUREMENTS;
          });
        }
      });
    }
    
    if (contribution.sites) {
      summary.sites     = summary.sites     || {};
      summary.locations = summary.locations || {};
      contribution.sites.map((siteRow) => {

        // Increment the number of sites results for this contribution.
        if (!summary.contribution.N_SITE_RESULTS)
          summary.contribution.N_SITE_RESULTS = 0;
        summary.contribution.N_SITE_RESULTS += 1;

        _.keys(siteRow).map((column) => {
          if (!summary.contribution[column.toUpperCase()])
            summary.contribution[column.toUpperCase()] = {};
          if (models[_.last(versions)].tables.samples.columns[column] && models[_.last(versions)].tables.sites.columns[column].type === 'List')
            siteRow[column].split(':').map((val) => {
              if (_.trim(val) !== '')
                summary.contribution[column.toUpperCase()][_.trim(val)] = true
            });
          else
            if (_.trim(siteRow[column]) !== '')
              summary.contribution[column.toUpperCase()][_.trim(siteRow[column])] = true
        });

        let siteName = siteRow.site;
        if (siteName !== undefined && siteName !== '') {
          siteName = siteName.replace('.', '_');
          if (!summary.sites[siteName])
            summary.sites[siteName] = {};

          // Add the site name to the list for this contribution.
          if (!summary.contribution.ER_SITE_NAMES)
            summary.contribution.ER_SITE_NAMES = {};
          summary.contribution.ER_SITE_NAMES[siteName] = true;
        }

        let locationName = siteRow.location;
        if (locationName !== undefined && locationName !== '') {
          locationName = locationName.replace('.', '_');
          if (!summary.locations[locationName])
            summary.locations[locationName] = {};
        }

        // If this site belongs to a location:
        if (siteName !== undefined && siteName !== '' &&
            locationName !== undefined && locationName !== '') {
          summary.sites[siteName].ER_SITE_NAME = siteName;

          // Increment the number of site results for this location.
          if (!summary.locations[locationName].N_SITE_RESULTS)
            summary.locations[locationName].N_SITE_RESULTS = 0;
          summary.locations[locationName].N_SITE_RESULTS += 1;

          // Add the site name to the list for this location.
          if (!summary.locations[locationName].ER_SITE_NAMES)
            summary.locations[locationName].ER_SITE_NAMES = {};
          summary.locations[locationName].ER_SITE_NAMES[siteName] = true;

        }

      });

      // Convert the list of site names into the number of sites for each location.
      _.keys(summary.locations).map((locationName) => {
        if (summary.locations[locationName].ER_SITE_NAMES) {
          summary.locations[locationName].ER_SITE_NAMES = _.keys(summary.locations[locationName].ER_SITE_NAMES).join(':');
          summary.locations[locationName].N_SITES = summary.locations[locationName].ER_SITE_NAMES.split(':').length;
          summary.locations[locationName].N_SAMPLES = 0;
          summary.locations[locationName].N_SAMPLE_RESULTS = 0;
          summary.locations[locationName].N_SPECIMENS = 0;
          summary.locations[locationName].N_SPECIMEN_RESULTS = 0;
          summary.locations[locationName].N_EXPERIMENTS = 0;
          summary.locations[locationName].N_MEASUREMENTS = 0;
          summary.locations[locationName].ER_SITE_NAMES.split(':').map((siteName) => {
            summary.locations[locationName].N_SAMPLES += summary.sites[siteName].N_SAMPLES;
            summary.locations[locationName].N_SAMPLE_RESULTS += summary.sites[siteName].N_SAMPLE_RESULTS;
            summary.locations[locationName].N_SPECIMENS += summary.sites[siteName].N_SPECIMENS;
            summary.locations[locationName].N_SPECIMEN_RESULTS += summary.sites[siteName].N_SPECIMEN_RESULTS;
            summary.locations[locationName].N_EXPERIMENTS += summary.sites[siteName].N_EXPERIMENTS;
            summary.locations[locationName].N_MEASUREMENTS += summary.sites[siteName].N_MEASUREMENTS;
          });
        }
      });
    }


    if (contribution.locations) {
      summary.locations    = summary.locations    || {};
      summary.contribution = summary.contribution || {};
      contribution.locations.map((locationRow) => {

        // Increment the number of location results for this contribution.
        if (!summary.contribution.N_LOCATION_RESULTS)
          summary.contribution.N_LOCATION_RESULTS = 0;
        summary.contribution.N_LOCATION_RESULTS += 1;

        _.keys(locationRow).map((column) => {
          if (models[_.last(versions)].tables.samples.columns[column] && models[_.last(versions)].tables.locations.columns[column].type === 'List') {
            if (!summary.contribution[column.toUpperCase()])
              summary.contribution[column.toUpperCase()] = {};
            locationRow[column].split(':').map((val) => {
              if (_.trim(val) !== '')
                summary.contribution[column.toUpperCase()][_.trim(val)] = true
            });
          } else {
            if (!summary.contribution[column.toUpperCase()])
              summary.contribution[column.toUpperCase()] = {};
            if (_.trim(locationRow[column]) !== '')
              summary.contribution[column.toUpperCase()][_.trim(locationRow[column])] = true
          }
        });

        let locationName = locationRow.location;
        if (locationName !== undefined && locationName !== '') {
          locationName = locationName.replace('.', '_');
          if (!summary.locations[locationName])
            summary.locations[locationName] = {};

          // Add the location name to the list for this contribution.
          if (!summary.contribution.ER_LOCATION_NAMES)
            summary.contribution.ER_LOCATION_NAMES = {};
          summary.contribution.ER_LOCATION_NAMES[locationName] = true;
        }

      });

    }

    if (summary.contribution) {
      _.keys(summary.contribution).map((column) => {
        if (column.slice(0,2) != 'N_')
          summary.contribution[column] = _.keys(summary.contribution[column]).join(':');
      });

      /*if (column === 'LAT' ||
          column === 'LON'
      ) {
        summary.contribution[column + 'S'] = summary.contribution[column];
        delete summary.contribution[column];
      }*/

      if (summary.contribution.ER_LOCATION_NAMES) {
        summary.contribution.N_LOCATIONS = summary.contribution.ER_LOCATION_NAMES.split(':').length;
      }
      if (summary.contribution.ER_SITE_NAMES) {
        summary.contribution.N_SITES = summary.contribution.ER_SITE_NAMES.split(':').length;
        delete summary.contribution.ER_SITE_NAMES;
      }
      if (summary.contribution.ER_SAMPLE_NAMES) {
        summary.contribution.N_SAMPLES = summary.contribution.ER_SAMPLE_NAMES.split(':').length;
        delete summary.contribution.ER_SAMPLE_NAMES;
      }
      if (summary.contribution.ER_SPECIMEN_NAMES) {
        summary.contribution.N_SPECIMENS = summary.contribution.ER_SPECIMEN_NAMES.split(':').length;
        delete summary.contribution.ER_SPECIMEN_NAMES;
      }
      if (summary.contribution.EXPERIMENT_NAMES) {
        summary.contribution.N_EXPERIMENTS = summary.contribution.EXPERIMENT_NAMES.split(':').length;
        delete summary.contribution.EXPERIMENT_NAMES;
      }
    }

    if (contribution.criteria) {
      summary.criteria = summary.criteria || {};
      contribution.criteria.map((criteriaRow) => {

        let criterionName = criteriaRow.criterion;
        if (criterionName !== undefined && criterionName !== '') {
          criterionName = criterionName.replace('.', '_');
          if (!summary.criteria[criterionName])
            summary.criteria[criterionName] = {};
        }

      });
    }

    if (contribution.ages) {
      summary.ages = summary.ages || {};
      contribution.ages.map((agesRow) => {

        if (agesRow.specimen !== undefined && agesRow.specimen !== '') {
          let specimenName = agesRow.specimen.replace('.', '_');
          if (!summary.specimens[specimenName])
            summary.specimens[specimenName] = {};

          // Increment the number of ages for this specimen.
          if (!summary.specimens[specimenName].N_AGES)
            summary.specimens[specimenName].N_AGES = 0;
          summary.specimens[specimenName].N_AGES += 1;

          // Increment the number of specimen ages.
          if (!summary.ages.N_SPECIMEN_AGES)
            summary.ages.N_SPECIMEN_AGES = 0;
          summary.ages.N_SPECIMEN_AGES += 1;
        }

        else if (agesRow.sample !== undefined && agesRow.sample !== '') {
          let sampleName = agesRow.sample.replace('.', '_');
          if (!summary.samples[sampleName])
            summary.samples[sampleName] = {};

          // Increment the number of ages for this sample.
          if (!summary.samples[sampleName].N_AGES)
            summary.samples[sampleName].N_AGES = 0;
          summary.samples[sampleName].N_AGES += 1;

          // Increment the number of sample ages.
          if (!summary.ages.N_SAMPLE_AGES)
            summary.ages.N_SAMPLE_AGES = 0;
          summary.ages.N_SAMPLE_AGES += 1;
        }

        else if (agesRow.site !== undefined && agesRow.site !== '') {
          let siteName = agesRow.site.replace('.', '_');
          if (!summary.sites[siteName])
            summary.sites[siteName] = {};

          // Increment the number of ages for this site.
          if (!summary.sites[siteName].N_AGES)
            summary.sites[siteName].N_AGES = 0;
          summary.sites[siteName].N_AGES += 1;

          // Increment the number of site ages.
          if (!summary.ages.N_SITE_AGES)
            summary.ages.N_SITE_AGES = 0;
          summary.ages.N_SITE_AGES += 1;
        }

        else if (agesRow.location !== undefined && agesRow.location !== '') {
          let locationName = agesRow.location.replace('.', '_');
          if (!summary.locations[locationName])
            summary.locations[locationName] = {};

          // Increment the number of ages for this location.
          if (!summary.locations[locationName].N_AGES)
            summary.locations[locationName].N_AGES = 0;
          summary.locations[locationName].N_AGES += 1;

          // Increment the number of location ages.
          if (!summary.ages.N_LOCATION_AGES)
            summary.ages.N_LOCATION_AGES = 0;
          summary.ages.N_LOCATION_AGES += 1;
        }

      });
    }

    /*if (contribution.locations) {
      summary.locations = {};

      if (contribution.sites       ) summary.location[].n_sites       = this.countUniqueValues(contribution.sites       , 'site'      );
      if (contribution.samples     ) summary.location[].n_samples     = this.countUniqueValues(contribution.samples     , 'sample'    );
      if (contribution.specimens   ) summary.location[].n_specimens   = this.countUniqueValues(contribution.specimens   , 'specimen'  );
      if (contribution.measurements) summary.location[].n_experiments = this.countUniqueValues(contribution.measurements, 'experiment');
    }

    if (contribution.locations   ) summary.contribution.n_locations   = this.countUniqueValues(contribution.locations   , 'location'  );
    if (contribution.sites       ) summary.contribution.n_sites       = this.countUniqueValues(contribution.sites       , 'site'      );
    if (contribution.samples     ) summary.contribution.n_samples     = this.countUniqueValues(contribution.samples     , 'sample'    );
    if (contribution.specimens   ) summary.contribution.n_specimens   = this.countUniqueValues(contribution.specimens   , 'specimen'  );
    if (contribution.measurements) summary.contribution.n_experiments = this.countUniqueValues(contribution.measurements, 'experiment');
    if (contribution.ages        ) summary.contribution.n_ages        = contribution.ages.length;
    if (contribution.criteria    ) summary.contribution.n_criteria    = contribution.criteria.length;
    if (contribution.images      ) summary.contribution.n_images      = contribution.images.length;
*/
    console.log(contribution, summary);

    return summary;

  }

  countUniqueValues(collection, property, filterProperty, filterValue) {
    return _.keys(_.reduce(collection, (values, item) => values[item[property]] = true, {})).length;
  }
}
