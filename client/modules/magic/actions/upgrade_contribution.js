import {_} from 'lodash';
import Runner from './runner';

const magicVersions = ['2.0', '2.1', '2.2', '2.3', '2.4', '2.5', '3.0'];

export default class extends Runner {

  constructor({LocalState}) {
    super('UPGRADE_CONTRIBUTION', {LocalState});
  }

  upgrade(jsonOld) {

    // Initialize the upgrading state.
    this.table = undefined;
    this.rowNumber = undefined;
    this.column = undefined;

    // Check for a valid input.
    if (_.isEmpty(jsonOld)) {
      this._appendWarning('Contribution is empty.');
      return jsonOld;
    }

    // Look for the current MagIC data model version.
    let currentVersion;

    //console.log("JSON file in parser: " + JSON.stringify(jsonOld));
    if(!jsonOld || !jsonOld['contribution']) {
      this._appendError('Failed to find the "contribution" table.');
      return jsonOld;
    }

    //****If we are using the new contribution table
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

    // Check that the current MagIC data model version is valid, version must be in magicVersionsList
    if (_.indexOf(magicVersions, currentVersion) === -1) {
      let strVersions = magicVersions.map((str) => { return `"${str}"`; }).join(", ");
      this._appendError(`MagIC data model version ${currentVersion} is invalid. Expected one of: ${strVersions}.`);
      return jsonOld;
    }

    // Check that there is a newer MagIC data model
    //console.log(`Current Version: ${currentVersion}`);
    if (_.indexOf(magicVersions, currentVersion) === magicVersions.length - 1) {
      this._appendWarning(`This contribution is already at the latest MagIC data model version ${currentVersion}.`);
      return jsonOld;
    }

    // Get the MagIC data model

    //GGG GRAB DATA MODEL HERE BASED ON nextVersion

    // Upgrade the contribution
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
    return this.upgrade(jsonNew);

  }

}
