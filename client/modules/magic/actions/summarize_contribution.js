import _ from 'lodash';
import $ from 'jquery';
import moment from 'moment';
import Promise from 'bluebird';
import Runner from '/client/modules/common/actions/runner';

import {versions, models} from '/lib/modules/magic/data_models';
import {cvs} from '/lib/modules/er/controlled_vocabularies';

export default class extends Runner {

  constructor({runnerState}) {
    super({runnerState});
  }

  // Return a promise for creating the summary
  summarizePromise(contribution, contributionMetadata) {

    return this.preSummarizePromise(contribution, contributionMetadata)
      .then(this._summarizeTables.bind(this))
      .then(this._getCrossRefData.bind(this))
      .then(this._adoptChildTables.bind(this))
      .then(this._inheritParentTables.bind(this))
      .then(this._aggregateTables.bind(this));

  }

  // Return a promise for creating the pre-summary
  preSummarizePromise(contribution, contributionMetadata) {

    console.log('preSummarizePromise');

    if (!contribution) {
      this._appendError(`Invalid contribution.`);
      return Promise.resolve();
    }

    this.contribution = contribution;
    this.json = {};
    this.reset();
    this._initProp(this.json, 'contribution', { summary: { contribution: { data_model_version: _.last(versions) }}});

    if (contributionMetadata)
      _.merge(this.json.contribution.summary.contribution, contributionMetadata);

    return new Promise((resolve) => {
      resolve();
    });

  }

  _getCrossRefData() {

    console.log('_getCrossRefData');

    return new Promise((resolve) => {
      try {
        let doi = _.trim(this.json.contribution.summary.contribution.reference);
        if (doi === '')
          resolve();
        else
          $.ajax({
            type: "GET",
            dataType: "json",
            url: "http://api.crossref.org/works/" + doi,
          }).done((doiData) => {
            console.log(doiData);
            if (doiData.status === 'ok') {
              let d = doiData.message;
              let _reference = {
                source: 'crossref',
                doi: d.DOI
              };

              if (d.title && d.title.length > 0)
                _reference.title = d.title[0];

              if (d['container-title'] && d['container-title'].length > 0)
                _reference.journal = d['container-title'][0];

              if (d['published-print'] && d['published-print']['date-parts'] &&
                d['published-print']['date-parts'][0] && d['published-print']['date-parts'][0][0])
                _reference.year = d['published-print']['date-parts'][0][0];
              else if (d['published-online'] && d['published-online']['date-parts'] &&
                d['published-online']['date-parts'][0] && d['published-online']['date-parts'][0][0])
                _reference.year = d['published-online']['date-parts'][0][0];

              if (d.subject)
                _reference.keywords = d.subject;

              if (d.author && d.author.length === 1)
                _reference.citation = d.author[0].family;
              else if (d.author && d.author.length === 2)
                _reference.citation = d.author[0].family + ' & ' + d.author[1].family;
              else if (d.author && d.author.length > 2)
                _reference.citation = d.author[0].family + ' et al.';
              if (_reference.year)
                _reference.citation += ' (' + _reference.year + ')';

              if (d.author)
                _reference.authors = d.author.map((a) => {
                  let author = { family: a.family };
                  if (a.given) author.given = a.given;
                  if (a.affiliation && a.affiliation.length > 0)
                    author.affiliation = a.affiliation.map((affiliation) => affiliation.name);
                  if (a.ORCID) {
                    let match = a.ORCID.match(/\/([^\/]+)$/);
                    if (match.length >= 2) author._orcid = match[1];
                  }
                  return author;
                });

              if (d.author)
                _reference.long_authors = d.author.map((a) => (a.given ? a.given + ' ' : '') +  a.family).join(', ');

              if (d['is-referenced-by-count'])
                _reference.n_citations = d['is-referenced-by-count'];

              _reference.html = '<b>' +
                (_reference.long_authors ? _reference.long_authors : '<i>Unknown Authors</i>') +
                ' (' + (_reference.year ? _reference.year : '<i>Unknown Year</i>') + ').</b> ' +
                (_reference.title ? _reference.title : '<i>Unknown Title</i>') + '. <i>' +
                (_reference.journal ? _reference.journal : 'Unknown Journal') +
                (d.volume ? ' ' + d.volume : '') +
                (d.issue ? ' (' + d.issue + ')' : '') +
                (d.page ? ':' + d.page : '') + '.' +
                (d.DOI ? ' doi:<a href="//dx.doi.org/' + d.DOI + '">' + d.DOI + '</a>.' : '') +
                '</i>';
              _reference.html = _reference.html.replace(/"/g, "'");

              this.json.contribution.summary.contribution._reference = _reference;
            }
            resolve();
          }).fail((e) => {
            //this._appendError(`Failed to retrieve CrossRef data for DOI "${doi}".`);
            console.error(e);
            resolve();
          }).always(() =>{
            console.log('always');
            resolve();
          });
      } catch(e) {
        resolve();
      }
    });

  }

  _summarizeTables() {

    console.log('_summarizeTables');

    let sortedTables = _.sortBy(_.keys(models[_.last(versions)].tables), (table) => {
      return models[_.last(versions)].tables[table].position;
    });

    return Promise.each(sortedTables, (table, tableIdx) => {

      return new Promise((resolve) => {

        console.log('summarizing', table);

        let model = models[_.last(versions)].tables[table];

        if (this.contribution[table]) {
          if (table === 'contribution') {
            this.contribution.contribution.forEach((row) => {
              this._copyRowProps(row, this.json.contribution.summary.contribution, model);
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
                    experiments: { _n_measurements: 0 }
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
                this._initProp(this.json[joinTable][prop][parentProp].summary, table, { ['_n_' + table]: 0 });
                this.json[joinTable][prop][parentProp][table].push(row);
                this._summarizeRowProps(row, this.json[joinTable][prop][parentProp].summary[table], model);
                this.json[joinTable][prop][parentProp].summary[table]['_n_' + table] += 1;
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
            this.contribution.criteria.forEach((row, criteriaRowIdx) => {
              let criterionTableColumn = row.table_column || '';
              let criterionTable = criterionTableColumn.substr(0, criterionTableColumn.indexOf('.'));
              let criterionColumn = criterionTableColumn.substr(criterionTableColumn.indexOf('.') + 1);
              if (_.trim(row.criterion) !== '' && _.indexOf(_.keys(models[_.last(versions)].tables), criterionTable.toLowerCase()) >= 0) {
                this._initProp(this.json.contribution, 'criteria', {rows: []});
                this.json.contribution.criteria.rows.push(_.merge(
                  {
                    _rowIdx: criteriaRowIdx,
                    _table: criterionTable,
                    _column: criterionColumn
                  }, row));
                this._initProp(this.json.contribution.summary, 'criteria', {_n_criteria: 0});
                this._summarizeRowProps(row, this.json.contribution.summary.criteria, model);
                this.json.contribution.summary.criteria._n_criteria += 1;
                _.keys(this.json[criterionTable]).forEach((prop) => {
                  _.keys(this.json[criterionTable][prop]).forEach((parentProp) => {
                    this._initProp(this.json[criterionTable][prop][parentProp], 'criteria', {rows: []});
                    this.json[criterionTable][prop][parentProp].criteria.rows.push(_.merge(
                      {
                        _rowIdx: criteriaRowIdx,
                        _table: criterionTable,
                        _column: criterionColumn
                      }, row));
                    this._initProp(this.json[criterionTable][prop][parentProp].summary, 'criteria', { _n_criteria: 0 });
                    this._summarizeRowProps(row, this.json[criterionTable][prop][parentProp].summary.criteria, model);
                    this.json[criterionTable][prop][parentProp].summary.criteria._n_criteria += 1;
                  });
                });
              }
            });

            // Since the tables are processed in order, the data tables should already be summarized.
            _.keys(this.json).forEach((consolidateTable) => {
              if (consolidateTable === 'contribution')
                this._consolidateSummary(this.json[consolidateTable].summary.criteria, model);
              else
                _.keys(this.json[consolidateTable]).forEach((prop) => {
                  _.keys(this.json[consolidateTable][prop]).forEach((parentProp) => {
                    this._consolidateSummary(this.json[consolidateTable][prop][parentProp].summary.criteria, model);
                  });
                });
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

    console.log('_inheritParentTables');

    let sortedTables = _.sortBy(_.keys(models[_.last(versions)].tables), (table) => {
      return models[_.last(versions)].tables[table].position;
    });

    return Promise.each(sortedTables, (table) => {

      return new Promise((resolve) => {

        console.log('inheriting', table);

        let model = models[_.last(versions)].tables[table];
        let contributionSummary = _.omitBy(this.json.contribution.summary.contribution, (value, key) => /(^__)/.test(key));

        if (table === 'measurements') {
          table = 'experiments';
          _.keys(this.json[table]).forEach((tableProp) => {
            _.keys(this.json[table][tableProp]).forEach((parentProp) => {
              let specimenProp = parentProp;
              if (this.json.specimens) _.keys(this.json.specimens[specimenProp]).forEach((sampleProp) => {
                this._aggregateSummaries('specimens',
                  this.json.specimens[specimenProp][sampleProp],
                  this.json[table][tableProp][parentProp]
                );
                if (this.json.specimens[specimenProp][sampleProp].ages) {
                  this._aggregateSummaries('ages',
                    this.json.specimens[specimenProp][sampleProp],
                    this.json[table][tableProp][parentProp]
                  );
                }
                if (this.json.specimens[specimenProp][sampleProp].images) {
                  this._aggregateSummaries('images',
                    this.json.specimens[specimenProp][sampleProp],
                    this.json[table][tableProp][parentProp]
                  );
                }
                if (this.json.samples) _.keys(this.json.samples[sampleProp]).forEach((siteProp) => {
                  this._aggregateSummaries('samples',
                    this.json.samples[sampleProp][siteProp],
                    this.json[table][tableProp][parentProp]
                  );
                  if (this.json.samples[sampleProp][siteProp].ages) {
                    this._aggregateSummaries('ages',
                      this.json.samples[sampleProp][siteProp],
                      this.json[table][tableProp][parentProp]
                    );
                  }
                  if (this.json.samples[sampleProp][siteProp].images) {
                    this._aggregateSummaries('images',
                      this.json.samples[sampleProp][siteProp],
                      this.json[table][tableProp][parentProp]
                    );
                  }
                  if (this.json.sites) _.keys(this.json.sites[siteProp]).forEach((locationProp) => {
                    this._aggregateSummaries('sites',
                      this.json.sites[siteProp][locationProp],
                      this.json[table][tableProp][parentProp]
                    );
                    if (this.json.sites[siteProp][locationProp].ages) {
                      this._aggregateSummaries('ages',
                        this.json.sites[siteProp][locationProp],
                        this.json[table][tableProp][parentProp]
                      );
                    }
                    if (this.json.sites[siteProp][locationProp].images) {
                      this._aggregateSummaries('images',
                        this.json.sites[siteProp][locationProp],
                        this.json[table][tableProp][parentProp]
                      );
                    }
                    if (this.json.locations) _.keys(this.json.locations[locationProp]).forEach((contributionProp) => {
                      this._aggregateSummaries('locations',
                        this.json.locations[locationProp][contributionProp],
                        this.json[table][tableProp][parentProp]
                      );
                      if (this.json.locations[locationProp][contributionProp].ages) {
                        this._aggregateSummaries('ages',
                          this.json.locations[locationProp][contributionProp],
                          this.json[table][tableProp][parentProp]
                        );
                      }
                      if (this.json.locations[locationProp][contributionProp].images) {
                        this._aggregateSummaries('images',
                          this.json.locations[locationProp][contributionProp],
                          this.json[table][tableProp][parentProp]
                        );
                      }
                    });
                  });
                });
              });
              this.json[table][tableProp][parentProp].summary.contribution = contributionSummary;
            });
          });
        } else if (table === 'specimens') {
          _.keys(this.json[table]).forEach((tableProp) => {
            _.keys(this.json[table][tableProp]).forEach((parentProp) => {
              let sampleProp = parentProp;
              if (this.json.samples) _.keys(this.json.samples[sampleProp]).forEach((siteProp) => {
                this._aggregateSummaries('samples',
                  this.json.samples[sampleProp][siteProp],
                  this.json[table][tableProp][parentProp]
                );
                if (this.json.samples[sampleProp][siteProp].ages) {
                  this._aggregateSummaries('ages',
                    this.json.samples[sampleProp][siteProp],
                    this.json[table][tableProp][parentProp]
                  );
                }
                if (this.json.samples[sampleProp][siteProp].images) {
                  this._aggregateSummaries('images',
                    this.json.samples[sampleProp][siteProp],
                    this.json[table][tableProp][parentProp]
                  );
                }
                if (this.json.sites) _.keys(this.json.sites[siteProp]).forEach((locationProp) => {
                  this._aggregateSummaries('sites',
                    this.json.sites[siteProp][locationProp],
                    this.json[table][tableProp][parentProp]
                  );
                  if (this.json.sites[siteProp][locationProp].ages) {
                    this._aggregateSummaries('ages',
                      this.json.sites[siteProp][locationProp],
                      this.json[table][tableProp][parentProp]
                    );
                  }
                  if (this.json.sites[siteProp][locationProp].images) {
                    this._aggregateSummaries('images',
                      this.json.sites[siteProp][locationProp],
                      this.json[table][tableProp][parentProp]
                    );
                  }
                  if (this.json.locations) _.keys(this.json.locations[locationProp]).forEach((contributionProp) => {
                    this._aggregateSummaries('locations',
                      this.json.locations[locationProp][contributionProp],
                      this.json[table][tableProp][parentProp]
                    );
                    if (this.json.locations[locationProp][contributionProp].ages) {
                      this._aggregateSummaries('ages',
                        this.json.locations[locationProp][contributionProp],
                        this.json[table][tableProp][parentProp]
                      );
                    }
                    if (this.json.locations[locationProp][contributionProp].images) {
                      this._aggregateSummaries('images',
                        this.json.locations[locationProp][contributionProp],
                        this.json[table][tableProp][parentProp]
                      );
                    }
                  });
                });
              });
              this.json[table][tableProp][parentProp].summary.contribution = contributionSummary;
            });
          });
        } else if (table === 'samples') {
          _.keys(this.json[table]).forEach((tableProp) => {
            _.keys(this.json[table][tableProp]).forEach((parentProp) => {
              let siteProp = parentProp;
              if (this.json.sites) _.keys(this.json.sites[siteProp]).forEach((locationProp) => {
                this._aggregateSummaries('sites',
                  this.json.sites[siteProp][locationProp],
                  this.json[table][tableProp][parentProp]
                );
                if (this.json.sites[siteProp][locationProp].ages) {
                  this._aggregateSummaries('ages',
                    this.json.sites[siteProp][locationProp],
                    this.json[table][tableProp][parentProp]
                  );
                }
                if (this.json.sites[siteProp][locationProp].images) {
                  this._aggregateSummaries('images',
                    this.json.sites[siteProp][locationProp],
                    this.json[table][tableProp][parentProp]
                  );
                }
                if (this.json.locations) _.keys(this.json.locations[locationProp]).forEach((contributionProp) => {
                  this._aggregateSummaries('locations',
                    this.json.locations[locationProp][contributionProp],
                    this.json[table][tableProp][parentProp]
                  );
                  if (this.json.locations[locationProp][contributionProp].ages) {
                    this._aggregateSummaries('ages',
                      this.json.locations[locationProp][contributionProp],
                      this.json[table][tableProp][parentProp]
                    );
                  }
                  if (this.json.locations[locationProp][contributionProp].images) {
                    this._aggregateSummaries('images',
                      this.json.locations[locationProp][contributionProp],
                      this.json[table][tableProp][parentProp]
                    );
                  }
                });
              });
              this.json[table][tableProp][parentProp].summary.contribution = contributionSummary;
            });
          });
        } else if (table === 'sites') {
          _.keys(this.json[table]).forEach((tableProp) => {
            _.keys(this.json[table][tableProp]).forEach((parentProp) => {
              let locationProp = parentProp;
              if (this.json.locations) _.keys(this.json.locations[locationProp]).forEach((contributionProp) => {
                this._aggregateSummaries('locations',
                  this.json.locations[locationProp][contributionProp],
                  this.json[table][tableProp][parentProp]
                );
                if (this.json.locations[locationProp][contributionProp].ages) {
                  this._aggregateSummaries('ages',
                    this.json.locations[locationProp][contributionProp],
                    this.json[table][tableProp][parentProp]
                  );
                }
                if (this.json.locations[locationProp][contributionProp].images) {
                  this._aggregateSummaries('images',
                    this.json.locations[locationProp][contributionProp],
                    this.json[table][tableProp][parentProp]
                  );
                }
              });
              this.json[table][tableProp][parentProp].summary.contribution = contributionSummary;
            });
          });
        } else if (table === 'locations') {
          _.keys(this.json[table]).forEach((tableProp) => {
            _.keys(this.json[table][tableProp]).forEach((parentProp) => {
              this.json[table][tableProp][parentProp].summary.contribution = contributionSummary;
            });
          });
        }

        resolve();
      }).delay();
    });

  }

  _adoptChildTables() {

    console.log('_adoptChildTables');

    let sortedTables = _.sortBy(_.keys(models[_.last(versions)].tables), (table) => {
      return models[_.last(versions)].tables[table].position;
    });

    return Promise.each(sortedTables, (table) => {

      return new Promise((resolve) => {

        console.log('adopting', table);

        let model = models[_.last(versions)].tables[table];

        if (table === 'locations') {
          _.keys(this.json.locations).forEach((locationProp) => {
            _.keys(this.json.locations[locationProp]).forEach((prop) => {
              this._aggregateSummaries(table,
                this.json[table][locationProp][prop],
                this.json.contribution
              );
              if (this.json[table][locationProp][prop].ages) {
                this._aggregateSummaries('ages',
                  this.json[table][locationProp][prop],
                  this.json.contribution
                );
              }
              if (this.json[table][locationProp][prop].images) {
                this._aggregateSummaries('images',
                  this.json[table][locationProp][prop],
                  this.json.contribution
                );
              }
            });
          });
        }
        if (table === 'sites') {
          _.keys(this.json.sites).forEach((siteProp) => {
            _.keys(this.json.sites[siteProp]).forEach((locationProp) => {
              this._aggregateSummaries(table,
                this.json[table][siteProp][locationProp],
                this.json.contribution
              );
              if (this.json[table][siteProp][locationProp].ages) {
                this._aggregateSummaries('ages',
                  this.json[table][siteProp][locationProp],
                  this.json.contribution
                );
              }
              if (this.json[table][siteProp][locationProp].images) {
                this._aggregateSummaries('images',
                  this.json[table][siteProp][locationProp],
                  this.json.contribution
                );
              }
              if (this.json.locations) _.keys(this.json.locations[locationProp]).forEach((prop) => {
                this._aggregateSummaries(table,
                  this.json[table][siteProp][locationProp],
                  this.json.locations[locationProp][prop]
                );
                if (this.json[table][siteProp][locationProp].ages) {
                  this._aggregateSummaries('ages',
                    this.json[table][siteProp][locationProp],
                    this.json.locations[locationProp][prop]
                  );
                }
                if (this.json[table][siteProp][locationProp].images) {
                  this._aggregateSummaries('images',
                    this.json[table][siteProp][locationProp],
                    this.json.locations[locationProp][prop]
                  );
                }
              });
            });
          });
        }
        if (table === 'samples') {
          _.keys(this.json.samples).forEach((sampleProp) => {
            _.keys(this.json.samples[sampleProp]).forEach((siteProp) => {
              this._aggregateSummaries(table,
                this.json[table][sampleProp][siteProp],
                this.json.contribution
              );
              if (this.json[table][sampleProp][siteProp].ages) {
                this._aggregateSummaries('ages',
                  this.json[table][sampleProp][siteProp],
                  this.json.contribution
                );
              }
              if (this.json[table][sampleProp][siteProp].images) {
                this._aggregateSummaries('images',
                  this.json[table][sampleProp][siteProp],
                  this.json.contribution
                );
              }
              if (this.json.sites) _.keys(this.json.sites[siteProp]).forEach((locationProp) => {
                this._aggregateSummaries(table,
                  this.json[table][sampleProp][siteProp],
                  this.json.sites[siteProp][locationProp]
                );
                if (this.json[table][sampleProp][siteProp].ages) {
                  this._aggregateSummaries('ages',
                    this.json[table][sampleProp][siteProp],
                    this.json.sites[siteProp][locationProp]
                  );
                }
                if (this.json[table][sampleProp][siteProp].images) {
                  this._aggregateSummaries('images',
                    this.json[table][sampleProp][siteProp],
                    this.json.sites[siteProp][locationProp]
                  );
                }
                if (this.json.locations) _.keys(this.json.locations[locationProp]).forEach((prop) => {
                  this._aggregateSummaries(table,
                    this.json[table][sampleProp][siteProp],
                    this.json.locations[locationProp][prop]
                  );
                  if (this.json[table][sampleProp][siteProp].ages) {
                    this._aggregateSummaries('ages',
                      this.json[table][sampleProp][siteProp],
                      this.json.locations[locationProp][prop]
                    );
                  }
                  if (this.json[table][sampleProp][siteProp].images) {
                    this._aggregateSummaries('images',
                      this.json[table][sampleProp][siteProp],
                      this.json.locations[locationProp][prop]
                    );
                  }
                });
              });
            });
          });
        }
        if (table === 'specimens') {
          _.keys(this.json.specimens).forEach((specimenProp) => {
            _.keys(this.json.specimens[specimenProp]).forEach((sampleProp) => {
              this._aggregateSummaries(table,
                this.json[table][specimenProp][sampleProp],
                this.json.contribution
              );
              if (this.json[table][specimenProp][sampleProp].ages) {
                this._aggregateSummaries('ages',
                  this.json[table][specimenProp][sampleProp],
                  this.json.contribution
                );
              }
              if (this.json[table][specimenProp][sampleProp].images) {
                this._aggregateSummaries('images',
                  this.json[table][specimenProp][sampleProp],
                  this.json.contribution
                );
              }
              if (this.json.samples) _.keys(this.json.samples[sampleProp]).forEach((siteProp) => {
                this._aggregateSummaries(table,
                  this.json[table][specimenProp][sampleProp],
                  this.json.samples[sampleProp][siteProp]
                );
                if (this.json[table][specimenProp][sampleProp].ages) {
                  this._aggregateSummaries('ages',
                    this.json[table][specimenProp][sampleProp],
                    this.json.samples[sampleProp][siteProp]
                  );
                }
                if (this.json[table][specimenProp][sampleProp].images) {
                  this._aggregateSummaries('images',
                    this.json[table][specimenProp][sampleProp],
                    this.json.samples[sampleProp][siteProp],
                  );
                }
                if (this.json.sites) _.keys(this.json.sites[siteProp]).forEach((locationProp) => {
                  this._aggregateSummaries(table,
                    this.json[table][specimenProp][sampleProp],
                    this.json.sites[siteProp][locationProp],
                  );
                  if (this.json[table][specimenProp][sampleProp].ages) {
                    this._aggregateSummaries('ages',
                      this.json[table][specimenProp][sampleProp],
                      this.json.sites[siteProp][locationProp]
                    );
                  }
                  if (this.json[table][specimenProp][sampleProp].images) {
                    this._aggregateSummaries('images',
                      this.json[table][specimenProp][sampleProp],
                      this.json.sites[siteProp][locationProp]
                    );
                  }
                  if (this.json.locations) _.keys(this.json.locations[locationProp]).forEach((prop) => {
                    this._aggregateSummaries(table,
                      this.json[table][specimenProp][sampleProp],
                      this.json.locations[locationProp][prop],
                    );
                    if (this.json[table][specimenProp][sampleProp].ages) {
                      this._aggregateSummaries('ages',
                        this.json[table][specimenProp][sampleProp],
                        this.json.locations[locationProp][prop]
                      );
                    }
                    if (this.json[table][specimenProp][sampleProp].images) {
                      this._aggregateSummaries('images',
                        this.json[table][specimenProp][sampleProp],
                        this.json.locations[locationProp][prop]
                      );
                    }
                  });
                });
              });
            });
          });
        }
        if (table === 'measurements') {
          _.keys(this.json.experiments).forEach((experimentProp) => {
            _.keys(this.json.experiments[experimentProp]).forEach((specimenProp) => {
              this._aggregateSummaries('experiments',
                this.json.experiments[experimentProp][specimenProp],
                this.json.contribution
              );
              if (this.json.specimens) _.keys(this.json.specimens[specimenProp]).forEach((sampleProp) => {
                this._aggregateSummaries('experiments',
                  this.json.experiments[experimentProp][specimenProp],
                  this.json.specimens[specimenProp][sampleProp]
                );
                if (this.json.samples) _.keys(this.json.samples[sampleProp]).forEach((siteProp) => {
                  this._aggregateSummaries('experiments',
                    this.json.experiments[experimentProp][specimenProp],
                    this.json.samples[sampleProp][siteProp]
                  );
                  if (this.json.sites) _.keys(this.json.sites[siteProp]).forEach((locationProp) => {
                    this._aggregateSummaries('experiments',
                      this.json.experiments[experimentProp][specimenProp],
                      this.json.sites[siteProp][locationProp]
                    );
                    if (this.json.locations) _.keys(this.json.locations[locationProp]).forEach((prop) => {
                      this._aggregateSummaries('experiments',
                        this.json.experiments[experimentProp][specimenProp],
                        this.json.locations[locationProp][prop]
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

    console.log('_aggregateTables');

    let sortedTables = _.sortBy(_.keys(models[_.last(versions)].tables), (table) => {
      return models[_.last(versions)].tables[table].position;
    });

    return Promise.each(sortedTables, (table) => {

      return new Promise((resolve) => {

        console.log('aggregating', table);

        if (table === 'contribution') {
          this._initProp(this.json.contribution.summary, '_all', {});
          _.keys(this.json.contribution.summary).forEach((summaryTable) => {
            if (summaryTable !== '_all' && summaryTable !== 'contribution') {
              this._aggregateSummaries(summaryTable,
                this.json.contribution,
                this.json.contribution, '_all'
              );
            }
          });
        } else if (table !== 'ages' && table !== 'images' && table !== 'criteria') {
          if (table === 'measurements') table = 'experiments';
          _.keys(this.json[table]).forEach((prop) => {
            _.keys(this.json[table][prop]).forEach((parentProp) => {
              this._initProp(this.json[table][prop][parentProp].summary, '_all', {});
              _.keys(this.json[table][prop][parentProp].summary).forEach((summaryTable) => {
                if (summaryTable !== '_all' && summaryTable !== 'contribution') {
                  this._aggregateSummaries(summaryTable,
                    this.json[table][prop][parentProp],
                    this.json[table][prop][parentProp], '_all'
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
        this._appendWarning(`Unrecognized data model column "${column}".`);
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
        let ybpColumn = '_' + column + '_ybp';
        if (age !== undefined) {
          let age_ybp;
          if (row.age_unit === 'Ga'                ) age_ybp = 1000000000*age;
          if (row.age_unit === 'Ma'                ) age_ybp = 1000000*age;
          if (row.age_unit === 'Ka'                ) age_ybp = 1000*age - (age < 100 ? 1950 : 0);
          if (row.age_unit === 'Years AD (+/-)'    ) age_ybp = 1950 - age;
          if (row.age_unit === 'Years BP'          ) age_ybp = age;
          if (row.age_unit === 'Years Cal AD (+/-)') age_ybp = 1950 - age;
          if (row.age_unit === 'Years Cal BP'      ) age_ybp = age;
          if (age_ybp !== undefined) {
            this._initProp(summary, ybpColumn, []);
            summary[ybpColumn].push(age_ybp);
            this._initProp(summary, '_age_range_ybp', []);
            summary._age_range_ybp.push(age_ybp);
          }
        }
      }
    });

    if (row.age_unit && row.age_sigma) {
      let age_sigma = parseFloat(row.age_sigma);
      if (age_sigma !== undefined) {
        let age_sigma_y;
        if (row.age_unit === 'Ga'                ) age_sigma_y = 1000000000*age_sigma;
        if (row.age_unit === 'Ma'                ) age_sigma_y = 1000000*age_sigma;
        if (row.age_unit === 'Ka'                ) age_sigma_y = 1000*age_sigma;
        if (row.age_unit === 'Years AD (+/-)'    ) age_sigma_y = age_sigma;
        if (row.age_unit === 'Years BP'          ) age_sigma_y = age_sigma;
        if (row.age_unit === 'Years Cal AD (+/-)') age_sigma_y = age_sigma;
        if (row.age_unit === 'Years Cal BP'      ) age_sigma_y = age_sigma;
        if (age_sigma_y !== undefined) {
          this._initProp(summary, '_age_sigma_y', []);
          summary._age_sigma_y.push(age_sigma_y);
        }
      }
    }

    if (row.lon && row.lat) {
      let lon = parseFloat(row.lon);
      let lat = parseFloat(row.lat);
      if (lat <= 90 && lat >= -90) {
        while (lon < -180) lon += 360;
        while (lon >  180) lon -= 360;
        this._initProp(summary, '_geo_point', []);
        summary._geo_point.push({ type: 'point', coordinates: [lon, lat] });
        this._initProp(summary, '_has_geo', "true");
      }
    }

    if (row.lon_w && row.lat_n && row.lon_e && row.lat_s) {
      let lon_w = parseFloat(row.lon_w);
      let lat_n = parseFloat(row.lat_n);
      let lon_e = parseFloat(row.lon_e);
      let lat_s = parseFloat(row.lat_s);
      if (lat_n <= 90 && lat_n >= -90 && lat_s <= 90 && lat_s >= -90) {
        while (lon_w < -180) lon_w += 360;
        while (lon_w >  180) lon_w -= 360;
        while (lon_e < -180) lon_e += 360;
        while (lon_e >  180) lon_e -= 360;
        this._initProp(summary, '_geo_envelope', []);
        summary._geo_envelope.push({ type: 'envelope', coordinates: [ [lon_w, lat_n], [lon_e, lat_s] ] });
        this._initProp(summary, '_has_geo', "true");
      }
    }

    _.keys(row).forEach((column) => {
      if (!model.columns[column]) {
        this._appendWarning(`Unrecognized data model column "${column}".`);
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
          let dt = moment(_.trim(row[column]), ['YYYY', moment.ISO_8601], true);
          if (dt.isValid()) {
            this._initProp(summary, column, []);
            summary[column].push(dt.valueOf());
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
        } else if (
            model.columns[column].type === 'Number' ||
            model.columns[column].type === 'Integer' ||
            model.columns[column].type === 'Timestamp') {
          summary[column] = {
            vals: summary[column],
            n: summary[column].length,
            range: {
              gte: _.min(_.without(summary[column], undefined)),
              lte: _.max(_.without(summary[column], undefined))
            }
          };
        } else {
          summary[column] = _.sortBy(_.uniq(summary[column]));
        }
      }
      if (/^_age.*\_y(bp)?$/.test(column)) {
        summary[column] = {
          vals: summary[column],
          n: summary[column].length,
          range: {
            gte: _.min(_.without(summary[column], undefined)),
            lte: _.max(_.without(summary[column], undefined))
          }
        };
      }
    });
  }
  
  _aggregateSummaries(fromName, from, to, toName) {
    let model = models[_.last(versions)].tables[fromName === 'experiments' ? 'measurements' : fromName];
    toName = toName || fromName;
    if (model && from && from.summary && from.summary[fromName] && to) {
      this._initProp(to, 'summary', {});
      this._initProp(to.summary, toName, {});
      _.keys(from.summary[fromName]).forEach((column) => {
        if (model.columns[column]) {
          if (model.columns[column].type === 'Number' ||
            model.columns[column].type === 'Integer' ||
            model.columns[column].type === 'Timestamp') {
            if (!_.has(to.summary[toName], column)) {
              to.summary[toName][column] = _.cloneDeep(from.summary[fromName][column]);
            } else {
              to.summary[toName][column].vals = to.summary[toName][column].vals.concat(from.summary[fromName][column].vals);
              to.summary[toName][column].n = _.sum([to.summary[toName][column].n, from.summary[fromName][column].n]);
              to.summary[toName][column].range.gte = _.min(_.without([to.summary[toName][column].range.gte, from.summary[fromName][column].range.gte], undefined));
              to.summary[toName][column].range.lte = _.max(_.without([to.summary[toName][column].range.lte, from.summary[fromName][column].range.lte], undefined));
            }
          } else {
            this._initProp(to.summary[toName], column, []);
            to.summary[toName][column] = _.sortBy(_.uniq(to.summary[toName][column].concat(from.summary[fromName][column])));
          }
        }
        if (/^\_age.*\_y(bp)?$/.test(column)) {
          if (!_.has(to.summary[toName], column)) {
            to.summary[toName][column] = _.cloneDeep(from.summary[fromName][column]);
          } else {
            to.summary[toName][column].vals = to.summary[toName][column].vals.concat(from.summary[fromName][column].vals);
            to.summary[toName][column].n = _.sum([to.summary[toName][column].n, from.summary[fromName][column].n]);
            to.summary[toName][column].range.gte = _.min(_.without([to.summary[toName][column].range.gte, from.summary[fromName][column].range.gte], undefined));
            to.summary[toName][column].range.lte = _.max(_.without([to.summary[toName][column].range.lte, from.summary[fromName][column].range.lte], undefined));
          }
        }
        if (/^\_n(\_|$)/.test(column)) {
          this._initProp(to.summary[toName], column, 0);
          to.summary[toName][column] += from.summary[fromName][column];
        }
        if (/^\_geo_/.test(column)) {
          this._initProp(to.summary[toName], column, []);
          to.summary[toName][column] = to.summary[toName][column].concat(from.summary[fromName][column]);
          this._initProp(to.summary[toName], '_has_geo', "true");
        }
      });
    }
  };

}
