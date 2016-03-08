import React from 'react';
import {parseContribution} from '../actions/parse_contribution.js';

export default class extends React.Component {

  selectContributionFiles() {

    console.log('Selecting files');

    // open a dialog box to select a single file, multiple files, or a directory

    // for each selected file try to open it, if it is a text file, try to parse it

    console.log('The following files could not be parsed:');

    // the files that could be parsed with ">>>>>>>>>>\n" between the files

    console.log('The following files were parsed:');

    // enable the save contribution files button

  }

  saveContributionFile() {
    console.log('Saving files to ...');
  }

  render() {
    return (
      <div>
        <button className="ui button" onClick={this.selectContributionFiles}>
          Select Contribution Files
        </button>
        <button className="ui disabled button" onClick={this.saveContributionFile}>
          Save Upgraded Contribution File
        </button>
      </div>
    )
  }

}

