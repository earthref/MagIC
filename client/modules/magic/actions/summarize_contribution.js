import _ from 'lodash';
import $ from 'jquery';
import Promise from 'bluebird';
import Runner from '../../common/actions/runner.js';

import {default as versions} from '../../../../lib/modules/magic/magic_versions';
import {default as models  } from '../../../../lib/modules/magic/data_models';
import {default as cvs     } from '../../../../lib/modules/er/controlled_vocabularies';

export default class extends Runner {

  constructor({runnerState}) {
    super({runnerState});
  }

  // Return a promise for creating the summary in the json property
  summarizePromise(contribution) {

    if (!contribution) {
      this._appendError(`Invalid contribution.`);
      return Promise.resolve();
    }

    this.contribution = contribution;
    this.json = {};
    this._initProp(this.json, 'contribution', { summary: {}});

    return this._crossRef()
      .then(this._summarizeTables.bind(this))
      .then(this._inheritParentTables.bind(this))
      .then(this._adoptChildTables.bind(this))
      .then(this._aggregateTables.bind(this));

  }

  _crossRef() {

    //console.log(this.contribution.er_citations);

    return new Promise((resolve) => {
      resolve();
      /*try {
        let doi = this.contribution.contribution[0].doi;
        //console.log(doi);
        $.ajax({
          type: "GET",
          dataType: "json",
          url: "http://api.crossref.org/works/" + doi,
        }).done((doiData) => {
          //console.log('doi data', doiData);
        }).fail(() => {
          //this._appendError(`Failed to retrieve CrossRef data for DOI "${doi}".`);
        }).always(resolve);
      } catch(e) {
        resolve();
      }*/
    });

  }

  _summarizeTables() {

    let sortedTables = _.sortBy(_.keys(models[_.last(versions)].tables), (table) => {
      return models[_.last(versions)].tables[table].position;
    });

    return Promise.each(sortedTables, (table, tableIdx) => {

      return new Promise((resolve) => {

        let model = models[_.last(versions)].tables[table];

        if (this.contribution[table]) {
          if (table === 'contribution') {
            this.contribution.contribution.forEach((row) => {
              this._copyRowProps(row, this.json.contribution, model);
            });
          } else if (table === 'measurements') {
            this._initProp(this.json, 'experiments', {});
            const experimentColumnIdx = this.contribution.measurements.columns.indexOf('experiment');
            const specimenColumnIdx = this.contribution.measurements.columns.indexOf('specimen');
            this.contribution.measurements.rows.forEach((row) => {
              if (row[experimentColumnIdx]) {
                let name = row[experimentColumnIdx];
                let prop = this._nameToProp(name);
                let parent = row[specimenColumnIdx];
                let parentProp = this._nameToProp(parent);
                this._initProp(this.json.experiments, prop, {});
                this._initProp(this.json.experiments[prop], parentProp, {
                  columns: this.contribution.measurements.columns,
                  rows: [],
                  summary: {
                    experiments: {_n_measurements: 0}
                  }
                });
                this.json.experiments[prop][parentProp].rows.push(row);
                let rowObject = _.zipObject(this.contribution.measurements.columns, row);
                this._summarizeRowProps(rowObject, this.json.experiments[prop][parentProp].summary.experiments, model);
                this.json.experiments[prop][parentProp].summary.experiments._n_measurements += 1;
              }
            });
            _.keys(this.json.experiments).forEach((prop) => {
              _.keys(this.json.experiments[prop]).forEach((parentProp) => {
                this._consolidateSummary(this.json.experiments[prop][parentProp].summary.experiments, model);
              });
            });
          } else if (table === 'ages' || table === 'images') {
            this.contribution[table].forEach((row) => {
              let name = '';
              let prop;
              let parentProp;
              let joinTable;
              if (_.trim(row.location) !== '' && _.trim(row.site) === '') {
                prop = this._nameToProp(row.location);
                if (this.json.locations[prop] &&
                    _.keys(this.json.locations[prop]).length > 0) {
                  joinTable = 'locations';
                  name = row.location;
                  parentProp = _.keys(this.json.locations[prop])[0]
                }
              } else if (_.trim(row.site) !== '' && _.trim(row.sample) === '') {
                prop = this._nameToProp(row.site);
                if (this.json.sites[prop] &&
                  _.keys(this.json.sites[prop]).length > 0) {
                  joinTable = 'sites';
                  name = row.site;
                  parentProp = _.keys(this.json.sites[prop])[0]
                }
              } else if (_.trim(row.sample) !== '' && _.trim(row.specimen) === '') {
                prop = this._nameToProp(row.sample);
                if (this.json.samples[prop] &&
                  _.keys(this.json.samples[prop]).length > 0) {
                  joinTable = 'samples';
                  name = row.sample;
                  parentProp = _.keys(this.json.samples[prop])[0]
                }
              } else if (_.trim(row.specimen) !== '') {
                prop = this._nameToProp(row.specimen);
                if (this.json.specimens[prop] &&
                  _.keys(this.json.specimens[prop]).length > 0) {
                  joinTable = 'specimens';
                  name = row.specimen;
                  parentProp = _.keys(this.json.specimens[prop])[0]
                }
              }

              // If the age or image has join target, add it to the table summary.
              if (name !== '') {
                this._initProp(this.json[joinTable][prop][parentProp], table, []);
                this._initProp(this.json[joinTable][prop][parentProp].summary, table, {_n: 0});
                this.json[joinTable][prop][parentProp][table].push(row);
                this._summarizeRowProps(row, this.json[joinTable][prop][parentProp].summary[table], model);
                this.json[joinTable][prop][parentProp].summary[table]._n += 1;
              }
            });

            // Search for ages or images and consolidate the summaries.
            _.keys(this.json).forEach((joinTable) => {
              _.keys(this.json[joinTable]).forEach((prop) => {
                _.keys(this.json[joinTable][prop]).forEach((parentProp) => {
                  if (this.json[joinTable][prop][parentProp].summary &&
                    this.json[joinTable][prop][parentProp].summary[table])
                    this._consolidateSummary(this.json[joinTable][prop][parentProp].summary[table], model);
                });
              });
            });
          } else if (table === 'criteria') {
            this.contribution[table].forEach((row) => {

            });
          } else {
            let nameColumn = table.replace(/s$/, '');
            let parentColumn = sortedTables[tableIdx-1].replace(/s$/, '');
            this._initProp(this.json, table, {});
            this.contribution[table].forEach((row) => {
              let name = row[nameColumn] || '';
              let prop = this._nameToProp(name);
              let parent = row[parentColumn] || '';
              let parentProp = this._nameToProp(parent);
              this._initProp(this.json[table], prop, {});
              this._initProp(this.json[table][prop], parentProp, {
                rows: [],
                summary: {
                  [table]: {_n_results: 0}
                }
              });
              this.json[table][prop][parentProp].rows.push(row);
              this._summarizeRowProps(row, this.json[table][prop][parentProp].summary[table], model);
              this.json[table][prop][parentProp].summary[table]._n_results += 1;
            });
            _.keys(this.json[table]).forEach((prop) => {
              _.keys(this.json[table][prop]).forEach((parentProp) => {
                this._consolidateSummary(this.json[table][prop][parentProp].summary[table], model);
              });
            });
          }
        }
        resolve();
      }).delay();
    });

  }

  _inheritParentTables() {

    let sortedTables = _.sortBy(_.keys(models[_.last(versions)].tables), (table) => {
      return models[_.last(versions)].tables[table].position;
    });

    return Promise.each(sortedTables, (table) => {

      return new Promise((resolve) => {

        let model = models[_.last(versions)].tables[table];
        let contributionSummary = _.omitBy(this.json.contribution, (value, key) => /(^__|summary)/.test(key));

        if (table === 'contribution') {

        } else if (table === 'measurements') {
          _.keys(this.json.experiments).forEach((experimentProp) => {
            _.keys(this.json.experiments[experimentProp]).forEach((specimenProp) => {
              this._inheritParentSummaries(
                'experiments', experimentProp, specimenProp,
                'specimens', specimenProp,
                models[_.last(versions)].tables.specimens
              );
              if (this.json.specimens) _.keys(this.json.specimens[specimenProp]).forEach((sampleProp) => {
                this._inheritParentSummaries(
                  'experiments', experimentProp, specimenProp,
                  'samples', sampleProp,
                  models[_.last(versions)].tables.samples
                );
                if (this.json.samples) _.keys(this.json.samples[sampleProp]).forEach((siteProp) => {
                  this._inheritParentSummaries(
                    'experiments', experimentProp, specimenProp,
                    'sites', siteProp,
                    models[_.last(versions)].tables.sites
                  );
                  if (this.json.sites) _.keys(this.json.sites[siteProp]).forEach((locationProp) => {
                    this._inheritParentSummaries(
                      'experiments', experimentProp, specimenProp,
                      'locations', locationProp,
                      models[_.last(versions)].tables.locations
                    );
                  });
                });
              });
              this.json.experiments[experimentProp][specimenProp].summary.contribution = contributionSummary;
            });
          });
        } else if (table === 'ages' || table === 'images' || table === 'criteria') {

        } else if (table === 'specimens') {
          _.keys(this.json.specimens).forEach((specimenProp) => {
            _.keys(this.json.specimens[specimenProp]).forEach((sampleProp) => {
              this._inheritParentSummaries(
                'specimens', specimenProp, sampleProp,
                'samples', sampleProp,
                models[_.last(versions)].tables.samples
              );
              if (this.json.samples) _.keys(this.json.samples[sampleProp]).forEach((siteProp) => {
                this._inheritParentSummaries(
                  'specimens', specimenProp, sampleProp,
                  'sites', siteProp,
                  models[_.last(versions)].tables.sites
                );
                if (this.json.sites) _.keys(this.json.sites[siteProp]).forEach((locationProp) => {
                  this._inheritParentSummaries(
                    'specimens', specimenProp, sampleProp,
                    'locations', locationProp,
                    models[_.last(versions)].tables.locations
                  );
                });
              });
              this.json.specimens[specimenProp][sampleProp].summary.contribution = contributionSummary;
            });
          });
        } else if (table === 'samples') {
          _.keys(this.json.samples).forEach((sampleProp) => {
            _.keys(this.json.samples[sampleProp]).forEach((siteProp) => {
              this._inheritParentSummaries(
                'samples', sampleProp, siteProp,
                'sites', siteProp,
                models[_.last(versions)].tables.sites
              );
              if (this.json.sites) _.keys(this.json.sites[siteProp]).forEach((locationProp) => {
                this._inheritParentSummaries(
                  'samples', sampleProp, siteProp,
                  'locations', locationProp,
                  models[_.last(versions)].tables.locations
                );
              });
              this.json.samples[sampleProp][siteProp].summary.contribution = contributionSummary;
            });
          });
        } else if (table === 'sites') {
          _.keys(this.json.sites).forEach((siteProp) => {
            _.keys(this.json.sites[siteProp]).forEach((locationProp) => {
              this._inheritParentSummaries(
                'sites', siteProp, locationProp,
                'locations', locationProp,
                models[_.last(versions)].tables.locations
              );
              this.json.sites[siteProp][locationProp].summary.contribution = contributionSummary;
            });
          });
        } else if (table === 'locations') {
          _.keys(this.json.locations).forEach((locationProp) => {
            _.keys(this.json.locations[locationProp]).forEach((prop) => {
              this.json.locations[locationProp][prop].summary.contribution = contributionSummary;
            });
          });
        }

        resolve();
      }).delay();
    });

  }

  _adoptChildTables() {

    let sortedTables = _.sortBy(_.keys(models[_.last(versions)].tables), (table) => {
      return models[_.last(versions)].tables[table].position;
    });

    return Promise.each(sortedTables, (table) => {

      return new Promise((resolve) => {

        let model = models[_.last(versions)].tables[table];

        if (table === 'locations') {
          this._initProp(this.json.contribution.summary, table, {});
          _.keys(this.json.locations).forEach((locationProp) => {
            _.keys(this.json.locations[locationProp]).forEach((prop) => {
              this._aggregateProps(
                this.json[table][locationProp][prop].summary[table],
                this.json.contribution.summary[table],
                model
              );
            });
          });
        }
        if (table === 'sites') {
          this._initProp(this.json.contribution.summary, table, {});
          _.keys(this.json.sites).forEach((siteProp) => {
            _.keys(this.json.sites[siteProp]).forEach((locationProp) => {
              this._aggregateProps(
                this.json[table][siteProp][locationProp].summary[table],
                this.json.contribution.summary[table],
                model
              );
              if (this.json.locations) _.keys(this.json.locations[locationProp]).forEach((prop) => {
                this._initProp(this.json.locations[locationProp][prop].summary, table, {});
                this._aggregateProps(
                  this.json[table][siteProp][locationProp].summary[table],
                  this.json.locations[locationProp][prop].summary[table],
                  model
                );
              });
            });
          });
        }
        if (table === 'samples') {
          this._initProp(this.json.contribution.summary, table, {});
          _.keys(this.json.samples).forEach((sampleProp) => {
            _.keys(this.json.samples[sampleProp]).forEach((siteProp) => {
              this._aggregateProps(
                this.json[table][sampleProp][siteProp].summary[table],
                this.json.contribution.summary[table],
                model
              );
              if (this.json.sites) _.keys(this.json.sites[siteProp]).forEach((locationProp) => {
                this._initProp(this.json.sites[siteProp][locationProp].summary, table, {});
                this._aggregateProps(
                  this.json[table][sampleProp][siteProp].summary[table],
                  this.json.sites[siteProp][locationProp].summary[table],
                  model
                );
                if (this.json.locations) _.keys(this.json.locations[locationProp]).forEach((prop) => {
                  this._initProp(this.json.locations[locationProp][prop].summary, table, {});
                  this._aggregateProps(
                    this.json[table][sampleProp][siteProp].summary[table],
                    this.json.locations[locationProp][prop].summary[table],
                    model
                  );
                });
              });
            });
          });
        }
        if (table === 'specimens') {
          this._initProp(this.json.contribution.summary, table, {});
          _.keys(this.json.specimens).forEach((specimenProp) => {
            _.keys(this.json.specimens[specimenProp]).forEach((sampleProp) => {
              this._aggregateProps(
                this.json[table][specimenProp][sampleProp].summary[table],
                this.json.contribution.summary[table],
                model
              );
              if (this.json.samples) _.keys(this.json.samples[sampleProp]).forEach((siteProp) => {
                this._initProp(this.json.samples[sampleProp][siteProp].summary, table, {});
                this._aggregateProps(
                  this.json[table][specimenProp][sampleProp].summary[table],
                  this.json.samples[sampleProp][siteProp].summary[table],
                  model
                );
                if (this.json.sites) _.keys(this.json.sites[siteProp]).forEach((locationProp) => {
                  this._initProp(this.json.sites[siteProp][locationProp].summary, table, {});
                  this._aggregateProps(
                    this.json[table][specimenProp][sampleProp].summary[table],
                    this.json.sites[siteProp][locationProp].summary[table],
                    model
                  );
                  if (this.json.locations) _.keys(this.json.locations[locationProp]).forEach((prop) => {
                    this._initProp(this.json.locations[locationProp][prop].summary, table, {});
                    this._aggregateProps(
                      this.json[table][specimenProp][sampleProp].summary[table],
                      this.json.locations[locationProp][prop].summary[table],
                      model
                    );
                  });
                });
              });
            });
          });
        }
        if (table === 'measurements') {
          this._initProp(this.json.contribution.summary, 'experiments', {});
          _.keys(this.json.experiments).forEach((experimentProp) => {
            _.keys(this.json.experiments[experimentProp]).forEach((specimenProp) => {
              this._aggregateProps(
                this.json.experiments[experimentProp][specimenProp].summary.experiments,
                this.json.contribution.summary.experiments,
                model
              );
              if (this.json.specimens) _.keys(this.json.specimens[specimenProp]).forEach((sampleProp) => {
                this._initProp(this.json.specimens[specimenProp][sampleProp].summary, 'experiments', {});
                this._aggregateProps(
                  this.json.experiments[experimentProp][specimenProp].summary.experiments,
                  this.json.specimens[specimenProp][sampleProp].summary.experiments,
                  model
                );
                if (this.json.samples) _.keys(this.json.samples[sampleProp]).forEach((siteProp) => {
                  this._initProp(this.json.samples[sampleProp][siteProp].summary, 'experiments', {});
                  this._aggregateProps(
                    this.json.experiments[experimentProp][specimenProp].summary.experiments,
                    this.json.samples[sampleProp][siteProp].summary.experiments,
                    model
                  );
                  if (this.json.sites) _.keys(this.json.sites[siteProp]).forEach((locationProp) => {
                    this._initProp(this.json.sites[siteProp][locationProp].summary, 'experiments', {});
                    this._aggregateProps(
                      this.json.experiments[experimentProp][specimenProp].summary.experiments,
                      this.json.sites[siteProp][locationProp].summary.experiments,
                      model
                    );
                    if (this.json.locations) _.keys(this.json.locations[locationProp]).forEach((prop) => {
                      this._initProp(this.json.locations[locationProp][prop].summary, 'experiments', {});
                      this._aggregateProps(
                        this.json.experiments[experimentProp][specimenProp].summary.experiments,
                        this.json.locations[locationProp][prop].summary.experiments,
                        model
                      );
                    });
                  });
                });
              });
            });
          });
        }
        resolve();

      }).delay();
    });
  }

  _aggregateTables() {

    let sortedTables = _.sortBy(_.keys(models[_.last(versions)].tables), (table) => {
      return models[_.last(versions)].tables[table].position;
    });

    return Promise.each(sortedTables, (table) => {

      return new Promise((resolve) => {

        let model = models[_.last(versions)].tables[table];

        if (table === 'contribution') {
          this._initProp(this.json.contribution.summary, '_all', {});
          _.keys(this.json.contribution.summary).forEach((summaryTable) => {
            if (summaryTable !== '_all' && summaryTable !== 'contribution') {
              this._aggregateProps(
                this.json.contribution.summary[summaryTable],
                this.json.contribution.summary._all,
                models[_.last(versions)].tables[summaryTable === 'experiments' ? 'measurements' : summaryTable]
              );
            }
          });
        } else if (table === 'measurements') {
          _.keys(this.json.experiments).forEach((experimentProp) => {
            _.keys(this.json.experiments[experimentProp]).forEach((specimenProp) => {
              this._initProp(this.json.experiments[experimentProp][specimenProp].summary, '_all', {});
              _.keys(this.json.experiments[experimentProp][specimenProp].summary).forEach((summaryTable) => {
                if (summaryTable !== '_all' && summaryTable !== 'contribution') {
                  this._aggregateProps(
                    this.json.experiments[experimentProp][specimenProp].summary[summaryTable],
                    this.json.experiments[experimentProp][specimenProp].summary._all,
                    models[_.last(versions)].tables[summaryTable === 'experiments' ? 'measurements' : summaryTable]
                  );
                }
              });
            });
          });
        } else if (table === 'ages' || table === 'images' || table === 'criteria') {

        } else {
          _.keys(this.json[table]).forEach((prop) => {
            _.keys(this.json[table][prop]).forEach((parentProp) => {
              this._initProp(this.json[table][prop][parentProp].summary, '_all', {});
              _.keys(this.json[table][prop][parentProp].summary).forEach((summaryTable) => {
                if (summaryTable !== '_all' && summaryTable !== 'contribution') {
                  this._aggregateProps(
                    this.json[table][prop][parentProp].summary[summaryTable],
                    this.json[table][prop][parentProp].summary._all,
                    models[_.last(versions)].tables[summaryTable === 'experiments' ? 'measurements' : summaryTable]
                  );
                }
              });
            });
          });
        }

        resolve();

      }).delay();
    });
  }

  _nameToProp(name) {
    return '_' + _.trim(name).replace(/\./g, '_');
  }

  _initProp(object, property, initValue) {
    if (!_.has(object, property)) object[property] = initValue;
  }

  _copyRowProps(row, summary, model) {

    if (!summary) {
      this._appendError(`Invalid summary.`);
      return;
    }
    if (!model || !model.columns) {
      this._appendError(`Invalid data model.`);
      return;
    }

    _.keys(row).forEach((column) => {
      if (model.columns[column] && model.columns[column].type === 'List') {
        this._initProp(summary, column, []);
        row[column].split(':').forEach((val) => {
          if (_.trim(val) !== '')
            summary[column].push(_.trim(val));
        });
      } else if (model.columns[column] && model.columns[column].type === 'Number') {
        summary[column] = parseFloat(row[column]);
      } else if (model.columns[column] && model.columns[column].type === 'Integer') {
        summary[column] = parseInt(row[column]);
      } else if (model.columns[column] && model.columns[column].type === 'String') {
        summary[column] = _.trim(row[column]);
      } else if (model.columns[column] && model.columns[column].type === 'Timestamp') {
        summary[column] = _.trim(row[column]);
      } else if (model.columns[column]) {
        this._appendError(`Unrecognized data model type "${model.columns[column].type}".`);
      }else if (model.columns[column]) {
        this._appendError(`Unrecognized data model column "${column}".`);
      }
    });
  }

  _summarizeRowProps(row, summary, model) {

    if (!summary) {
      this._appendError(`Invalid summary.`);
      return;
    }
    if (!model || !model.columns) {
      this._appendError(`Invalid data model.`);
      return;
    }

    ['age', 'age_low', 'age_high'].forEach((column) => {
      if (row.age_unit && row[column]) {
        let age = parseFloat(row[column]);
        let bpColumn = '_' + column + '_bp';
        if (age !== undefined) {
          this._initProp(summary, bpColumn, []);
          if (row.age_unit === 'Ga'                ) summary[bpColumn].push(1000000000*age);
          if (row.age_unit === 'Ma'                ) summary[bpColumn].push(1000000*age);
          if (row.age_unit === 'Ka'                ) summary[bpColumn].push(1000*age - (age < 100 ? 1950 : 0));
          if (row.age_unit === 'Years AD (+/-)'    ) summary[bpColumn].push(1950 - age);
          if (row.age_unit === 'Years BP'          ) summary[bpColumn].push(age);
          if (row.age_unit === 'Years Cal AD (+/-)') summary[bpColumn].push(1950 - age);
          if (row.age_unit === 'Years Cal BP'      ) summary[bpColumn].push(age);
        }
      }
    });

    _.keys(row).forEach((column) => {
      if (!model.columns[column]) {
        this._appendError(`Unrecognized data model column "${column}".`);
      } else {
        if (model.columns[column].type === 'List') {
          row[column].split(':').forEach((val) => {
            if (_.trim(val) !== '') {
              this._initProp(summary, column, []);
              summary[column].push(_.trim(val));
            }
          });
        } else if (model.columns[column].type === 'Number') {
          if (!isNaN(parseFloat(row[column]))) {
            this._initProp(summary, column, []);
            summary[column].push(parseFloat(row[column]));
          }
        } else if (model.columns[column].type === 'Integer') {
          if (!isNaN(parseInt(row[column]))) {
            this._initProp(summary, column, []);
            summary[column].push(parseInt(row[column]));
          }
        } else if (model.columns[column].type === 'String') {
          if (_.trim(row[column]) !== '') {
            this._initProp(summary, column, []);
            let val;
            if (model.columns[column].unit === 'Flag' && model.columns[column].validations) {
              model.columns[column].validations.forEach((validation) => {
                let match = validation.match(/cv\("(.*)"\)/);
                if (val === undefined && match && match.length > 1 && cvs[match[1]] && cvs[match[1]].items) {
                  cvs[match[1]].items.forEach((cvItem) => {
                    if (val === undefined && cvItem.item && cvItem.item.toLowerCase() === _.trim(row[column]).toLowerCase())
                      val = cvItem.label;
                  });
                }
              });
            }
            summary[column].push(val !== undefined ? val : _.trim(row[column]));
          }
        } else if (model.columns[column].type === 'Timestamp') {
          if (_.trim(row[column]) !== '') {
            this._initProp(summary, column, []);
            summary[column].push(_.trim(row[column]));
          }
        } else if (model.columns[column].type === 'Dictionary') {
          row[column].split(':').forEach((val) => {
            let match = val.match(/\s*([^[].+)\[(.+)\]\s*/);
            if (match && match.length > 2) {
              this._initProp(summary, column, []);
              summary[column].push({key: match[1], value: match[2]});
            }
          });
        } else if (model.columns[column].type === 'Matrix') {
          this._initProp(summary, column, []);
          summary[column].push(row[column].split(';').map((row) => row.split(':').map((val) => parseFloat(val))));
        } else {
          this._appendError(`Unrecognized data model type "${model.columns[column].type}".`);
        }
      }
    });
  }

  _consolidateSummary(summary, model) {
    _.keys(summary).forEach((column) => {
      if (model.columns[column]) {
        if (model.columns[column].type === 'List') {
          summary[column] = _.sortBy(_.uniq(summary[column]));
        } else if (model.columns[column].type === 'Number' ||
                   model.columns[column].type === 'Integer') {
          summary[column] = {
            vals: summary[column],
            n: summary[column].length,
            min: _.min(_.without(summary[column], undefined)),
            max: _.max(_.without(summary[column], undefined))
          };
        } else {
          summary[column] = _.sortBy(_.uniq(summary[column]));
        }
      }
      if (/^\_age.*\_bp$/.test(column)) {
        summary[column] = {
          vals: summary[column],
          n: summary[column].length,
          min: _.min(_.without(summary[column], undefined)),
          max: _.max(_.without(summary[column], undefined))
        };
      }
    });
  }

  _inheritParentSummaries(table, prop, parentProp, fromTable, fromProp, model) {
    if (this.json[table] && this.json[table][prop] && this.json[table][prop][parentProp] &&
        this.json[fromTable] && this.json[fromTable][fromProp]) {
      this._initProp(this.json[table][prop][parentProp], 'summary', {});
      this._initProp(this.json[table][prop][parentProp].summary, fromTable, {});
      _.keys(this.json[fromTable][fromProp]).forEach((fromParentProp) => {
        if (this.json[fromTable][fromProp][fromParentProp].summary &&
            this.json[fromTable][fromProp][fromParentProp].summary[fromTable])
          this._aggregateProps(
            this.json[fromTable][fromProp][fromParentProp].summary[fromTable],
            this.json[table][prop][parentProp].summary[fromTable],
            model
          );
      });
    }
  }
  
  _aggregateProps(fromSummary, toSummary, model) {
    _.keys(fromSummary).forEach((column) => {
      if (model.columns[column]) {
        if (model.columns[column].type === 'Number' ||
            model.columns[column].type === 'Integer') {
          if (!_.has(toSummary, column)) {
            toSummary[column] = _.cloneDeep(fromSummary[column]);
          } else {
            toSummary[column].vals = toSummary[column].vals.concat(fromSummary[column].vals);
            toSummary[column].n =   _.sum([toSummary[column].n, fromSummary[column].n]);
            toSummary[column].min = _.min(_.without([toSummary[column].min, fromSummary[column].min], undefined));
            toSummary[column].max = _.max(_.without([toSummary[column].max, fromSummary[column].max], undefined));
          }
          if (toSummary[column].min === undefined)
            console.log(column, fromSummary[column].min, toSummary[column].min);
        } else {
          this._initProp(toSummary, column, []);
          toSummary[column] = _.sortBy(_.uniq(toSummary[column].concat(fromSummary[column])));
        }
      }
      if (/^\_age.*\_bp$/.test(column)) {
        if (!_.has(toSummary, column)) {
          toSummary[column] = _.cloneDeep(fromSummary[column]);
        } else {
          toSummary[column].vals = toSummary[column].vals.concat(fromSummary[column].vals);
          toSummary[column].n =   _.sum([toSummary[column].n, fromSummary[column].n]);
          toSummary[column].min = _.min(_.without([toSummary[column].min, fromSummary[column].min], undefined));
          toSummary[column].max = _.max(_.without([toSummary[column].max, fromSummary[column].max], undefined));
        }
        if (toSummary[column].min === undefined)
          console.log(column, fromSummary[column], toSummary[column]);
      }
      if (/^\_n\_/.test(column)) {
        this._initProp(toSummary, column, 0);
        toSummary[column] += fromSummary[column];
      }
    });
  };

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
        if (experimentName !== undefined && _.isString(experimentName) && experimentName !== '') {
          experimentName = experimentName.replace(/\./g, '_');
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
          if (specimenName !== undefined && _.isString(specimenName) && specimenName !== '') {
            specimenName = specimenName.replace(/\./g, '_');
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
          if (models[_.last(versions)].tables.specimens.columns[column] && models[_.last(versions)].tables.specimens.columns[column].type === 'List')
            specimenRow[column].split(':').map((val) => {
              if (_.trim(val) !== '')
                summary.contribution[column.toUpperCase()][_.trim(val)] = true
            });
          else
          if (_.trim(specimenRow[column]) !== '')
            summary.contribution[column.toUpperCase()][_.trim(specimenRow[column])] = true
        });

        let specimenName = specimenRow.specimen;
        if (specimenName !== undefined && _.isString(specimenName) && specimenName !== '') {
          specimenName = specimenName.replace(/\./g, '_');
          if (!summary.specimens[specimenName])
            summary.specimens[specimenName] = {};

          // Add the specimen name to the list for this contribution.
          if (!summary.contribution.ER_SPECIMEN_NAMES)
            summary.contribution.ER_SPECIMEN_NAMES = {};
          summary.contribution.ER_SPECIMEN_NAMES[specimenName] = true;

        }

        let sampleName = specimenRow.sample;
        if (sampleName !== undefined && _.isString(sampleName) && sampleName !== '') {
          sampleName = sampleName.replace(/\./g, '_');
          if (!summary.samples[sampleName])
            summary.samples[sampleName] = {};
        }

        // If this specimen belongs to a sample:
        if (specimenName !== undefined && specimenName !== '' &&
          sampleName !== undefined && _.isString(sampleName) && sampleName !== '') {
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
        if (sampleName !== undefined && _.isString(sampleName) && sampleName !== '') {
          sampleName = sampleName.replace(/\./g, '_');
          if (!summary.samples[sampleName])
            summary.samples[sampleName] = {};

          // Add the sample name to the list for this contribution.
          if (!summary.contribution.ER_SAMPLE_NAMES)
            summary.contribution.ER_SAMPLE_NAMES = {};
          summary.contribution.ER_SAMPLE_NAMES[sampleName] = true;
        }

        let siteName = sampleRow.site;
        if (siteName !== undefined && _.isString(siteName) && siteName !== '') {
          siteName = siteName.replace(/\./g, '_');
          if (!summary.sites[siteName])
            summary.sites[siteName] = {};
        }

        // If this sample belongs to a site:
        if (sampleName !== undefined && sampleName !== '' &&
          siteName !== undefined && _.isString(siteName) && siteName !== '') {
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
          if (models[_.last(versions)].tables.sites.columns[column] && models[_.last(versions)].tables.sites.columns[column].type === 'List')
            siteRow[column].split(':').map((val) => {
              if (_.trim(val) !== '')
                summary.contribution[column.toUpperCase()][_.trim(val)] = true
            });
          else
          if (_.trim(siteRow[column]) !== '')
            summary.contribution[column.toUpperCase()][_.trim(siteRow[column])] = true
        });

        let siteName = siteRow.site;
        if (siteName !== undefined && _.isString(siteName) && siteName !== '') {
          siteName = siteName.replace(/\./g, '_');
          if (!summary.sites[siteName])
            summary.sites[siteName] = {};

          // Add the site name to the list for this contribution.
          if (!summary.contribution.ER_SITE_NAMES)
            summary.contribution.ER_SITE_NAMES = {};
          summary.contribution.ER_SITE_NAMES[siteName] = true;
        }

        let locationName = siteRow.location;
        if (locationName !== undefined && _.isString(locationName) && locationName !== '') {
          locationName = locationName.replace(/\./g, '_');
          if (!summary.locations[locationName])
            summary.locations[locationName] = {};
        }

        // If this site belongs to a location:
        if (siteName !== undefined && siteName !== '' &&
          locationName !== undefined && _.isString(locationName) && locationName !== '') {
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
          if (models[_.last(versions)].tables.locations.columns[column] && models[_.last(versions)].tables.locations.columns[column].type === 'List') {
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
        if (locationName !== undefined && _.isString(locationName) && locationName !== '') {
          locationName = locationName.replace(/\./g, '_');
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
        if (criterionName !== undefined && _.isString(criterionName) && criterionName !== '') {
          criterionName = criterionName.replace(/\./g, '_');
          if (!summary.criteria[criterionName])
            summary.criteria[criterionName] = {};
        }

      });
    }

    if (contribution.ages) {
      summary.ages = summary.ages || {};
      contribution.ages.map((agesRow) => {

        if (agesRow.specimen !== undefined && _.isString(agesRow.specimen) && agesRow.specimen !== '') {
          let specimenName = agesRow.specimen.replace(/\./g, '_');
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

        else if (agesRow.sample !== undefined && _.isString(agesRow.sample) && agesRow.sample !== '') {
          let sampleName = agesRow.sample.replace(/\./g, '_');
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

        else if (agesRow.site !== undefined && _.isString(agesRow.site) && agesRow.site !== '') {
          let siteName = agesRow.site.replace(/\./g, '_');
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

        else if (agesRow.location !== undefined && _.isString(agesRow.location) && agesRow.location !== '') {
          let locationName = agesRow.location.replace(/\./g, '_');
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
