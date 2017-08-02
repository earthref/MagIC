import _ from 'lodash';
import Promise from 'bluebird';
import Runner from '/client/modules/common/actions/runner';

import {versions, models} from '/lib/modules/magic/data_models';

export default class extends Runner {

  constructor({runnerState}) {
    super({runnerState});
    this.reset();
  }

  reset() {
    super.reset();
    this.json = {};
    this.lastGetVersionResult = ''; // != undefined to trigger warnings and errors on first getVersion()
  }

  getVersion(json) {

    let text = '';

    // Check for a valid input after defaulting to the class json property.
    if (_.isEmpty(json)) json = this.json;
    if (_.isEmpty(json)) {
      this._appendWarning('The first argument (MagIC contribution in JSON format) is empty.');
      return { version: undefined, isGuessed: true };
    }
    this.json = json;

    // Look for the MagIC data model version.
    let version, isGuessed;
    if(!json || !json['contribution']) {
      isGuessed = true;
      version = this._guessVersion();
      if (version !== this.lastGetVersionResult)
        this._appendWarning('Failed to find the "contribution" table.');
      if (version !== undefined && version !== this.lastGetVersionResult)
        this._appendWarning(`Guessed that the contribution is using MagIC Data Model version ${version}.`);
    }
    if (json['contribution']) {
      if (json['contribution'].length !== 1) {
        version = undefined;
        if (version !== this.lastGetVersionResult)
          this._appendError('The "contribution" table does not have exactly one row.');
      }
      else {
        if (json['contribution'][0]['data_model_version']) {
          isGuessed = false;
          version = json['contribution'][0]['data_model_version'];
        }
        else {
          isGuessed = true;
          version = this._guessVersion();
          if (version !== this.lastGetVersionResult)
            this._appendWarning('The "contribution" table does not include the "data_model_version" column.');
          if (version !== undefined && version !== this.lastGetVersionResult)
            this._appendWarning(`Guessed that the contribution is using MagIC Data Model version ${version}.`);
        }
      }
    }

    // Check that the MagIC data model version is valid (oldVersion is in versions).
    if (_.indexOf(versions, version) === -1) {
      const strVersions = versions.map((str) => { return `"${str}"`; }).join(", ");
      version = undefined;
      if (version !== this.lastGetVersionResult)
        this._appendError(`MagIC Data Model version ${version} is invalid. Expected one of: ${strVersions}.`);
    }

    // Warn if the contribution appears to be using a different version now.
    if (this.lastGetVersionResult !== '' &&
        version !== undefined &&
        version !== this.lastGetVersionResult)
      this._appendWarning(`The contribution now appears to be using MagIC Data Model version ${version}.`);

    // Don't keep reporting version errors and warnings next time this is run.
    this.lastGetVersionResult = version;

    return { version: version, isGuessed: isGuessed };

  }

  _guessVersion() {

    // Iterate through the data model versions starting with the newest one.
    for (let version of _.clone(versions).reverse()) {

      // If there is a table name that isn't in the this version's data model, skip to the next older version.
      if (_.difference(_.keys(this.json), _.keys(models[version].tables)).length > 0)
        continue;

      // Iterate through each table in the JSON.
      for (let table of _.keys(this.json)) {

        // Make a list of columns used in this table.
        let columns = (this.json[table].columns ?
            this.json[table].columns :
          _.reduce(this.json[table], (columns, row) => { return _.union(_.keys(row), columns); }, [])
        );

        // If there is a column name that isn't in the this version's data model, skip to the next older version.
        if (_.difference(columns, _.keys(models[version].tables[table].columns)) > 0)
          continue;

      }

      return version;

    }

    return undefined;

  }
  
}
