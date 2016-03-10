import {_} from 'lodash';
import Runner from './runner';

import {magicVersions} from '../configs/magic_versions.js';

export default class extends Runner {

  constructor({LocalState}) {
    super('UPGRADE_CONTRIBUTION', {LocalState});
  }

  upgrade(jsonOld, maxVersion) {

    // Initialize the upgrading state.
    this.table = undefined;
    this.rowNumber = undefined;
    this.column = undefined;

    // Check for a valid input.
    if (_.isEmpty(jsonOld)) {
      this._appendWarning('The first argument (MagIC contribution in JSON format) is empty.');
      return jsonOld;
    }

    // Check that the maximum MagIC data model version to upgrade to is valid (maxVersion is in magicVersions).
    if (maxVersion && _.indexOf(magicVersions, maxVersion) === -1) {
      let strVersions = magicVersions.map((str) => { return `"${str}"`; }).join(', ');
      this._appendError(`The second argument (maximum MagIC data model version), "${maxVersion}", is invalid. ` +
                        `Expected one of: ${strVersions}.`);
      return jsonOld;
    }

    //console.log("JSON file in parser: " + JSON.stringify(jsonOld));

    // Look for the current MagIC data model version.
    let currentVersion;
    if(!jsonOld || !jsonOld['contribution']) {
      this._appendError('Failed to find the "contribution" table.');
      return jsonOld;
    }
    if (jsonOld['contribution']) {
      if (jsonOld['contribution'].length !== 1) {
        this._appendError('The "contribution" table does not have exactly one row.');
        return jsonOld;
      }
      if (!jsonOld['contribution'][0]['magic_version']) {
        this._appendError('The "contribution" table does not include the "magic_version" column.');
        return jsonOld;
      }
      this.contributionTable = 'contribution';
      currentVersion = jsonOld['contribution'][0]['magic_version'];
    }

    // Check that the current MagIC data model version is valid (currentVersion is in magicVersions).
    if (_.indexOf(magicVersions, currentVersion) === -1) {
      let strVersions = magicVersions.map((str) => { return `"${str}"`; }).join(", ");
      this._appendError(`MagIC data model version ${currentVersion} is invalid. Expected one of: ${strVersions}.`);
      return jsonOld;
    }

    //console.log(`Current Version: ${currentVersion}`);

    // Check that there is a newer MagIC data model to use or that the maxVersion has been reached.
    if (_.indexOf(magicVersions, currentVersion) === magicVersions.length - 1) {
      //this._appendWarning(`This contribution is already at the latest MagIC data model version ${currentVersion}.`);
      return jsonOld;
    }

    // Upgrade the contribution.
    let jsonNew = {};
    for (let table in jsonOld) {
      jsonNew[table] = [];
      for (let row of jsonOld[table]) {
        let newRow = {};
        for (let column in row) {
          if (table === 'contribution' && column === 'magic_version') {
            newRow[column] = magicVersions[_.indexOf(magicVersions, currentVersion) + 1];
          } else {
            newRow[column] = row[column];
          }
        }
        jsonNew[table].push(newRow);
      }
    }

    //console.log("old: ", jsonOld);
    //console.log("new: ", jsonNew);

    // Recursively upgrade the contribution.
   return this.upgrade(jsonNew, maxVersion);

  }

}
