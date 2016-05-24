import {_} from 'lodash';
import Runner from '../../core/actions/runner.js';

import {default as magicVersions} from '../configs/magic_versions';
import {default as magicDataModels} from '../configs/data_models/data_models';

export default class extends Runner {

  constructor({LocalState}) {
    super('GET_CONTRIBUTION_VERSION', {LocalState});
  }

  getVersion(JSON) {

    let text = '';

    // Check for a valid input.
    if (_.isEmpty(JSON)) {
      this._appendWarning('The first argument (MagIC contribution in JSON format) is empty.');
      return undefined;
    }

    // Look for the MagIC data model version.
    let version;
    if(!JSON || !JSON['contribution']) {
      this._appendError('Failed to find the "contribution" table.');
      return undefined;
    }
    if (JSON['contribution']) {
      if (JSON['contribution'].length !== 1) {
        this._appendError('The "contribution" table does not have exactly one row.');
        return undefined;
      }
      if (!JSON['contribution'][0]['magic_version']) {
        this._appendError('The "contribution" table does not include the "magic_version" column.');
        return undefined;
      }
      version = JSON['contribution'][0]['magic_version'];
    }

    // Check that the MagIC data model version is valid (oldVersion is in magicVersions).
    if (_.indexOf(magicVersions, version) === -1) {
      const strVersions = magicVersions.map((str) => { return `"${str}"`; }).join(", ");
      this._appendError(`MagIC data model version ${version} is invalid. Expected one of: ${strVersions}.`);
      return undefined;
    }
    
    return version;

  }

}
