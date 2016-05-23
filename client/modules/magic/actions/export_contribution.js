import {_} from 'lodash';
import Runner from './runner.js';

import {magicVersions} from '../configs/magic_versions.js';
import {magicDataModels} from '../configs/data_models/data_models.js';

export default class extends Runner {

  constructor({LocalState}) {
    super('PARSE_CONTRIBUTION', {LocalState});
  }

  toText(JSON) {

    let text = '';

    // Check for a valid input.
    if (_.isEmpty(JSON)) {
      this._appendWarning('The first argument (MagIC contribution in JSON format) is empty.');
      return JSON;
    }

    // Look for the MagIC data model version.
    let version;
    if(!JSON || !JSON['contribution']) {
      this._appendError('Failed to find the "contribution" table.');
      return JSON;
    }
    if (JSON['contribution']) {
      if (JSON['contribution'].length !== 1) {
        this._appendError('The "contribution" table does not have exactly one row.');
        return JSON;
      }
      if (!JSON['contribution'][0]['magic_version']) {
        this._appendError('The "contribution" table does not include the "magic_version" column.');
        return JSON;
      }
      version = JSON['contribution'][0]['magic_version'];
    }

    // Check that the MagIC data model version is valid (oldVersion is in magicVersions).
    if (_.indexOf(magicVersions, version) === -1) {
      const strVersions = magicVersions.map((str) => { return `"${str}"`; }).join(", ");
      this._appendError(`MagIC data model version ${version} is invalid. Expected one of: ${strVersions}.`);
      return JSON;
    }

    // Retrieve the data model
    const model = magicDataModels[version];

    // TODO: use the model to build up text string here

    // text should be a valid MagIC tab delimited text file with the tables and columns in the order defined in the data model.

    return text;

  }

}
