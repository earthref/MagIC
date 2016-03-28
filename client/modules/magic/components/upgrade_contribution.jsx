import React from 'react';
import Dropzone from 'react-dropzone';
import {parseContribution} from '../actions/parse_contribution.js';

export default class extends React.Component {

  componentDidMount() {
    $(this.refs['accordion']).accordion({on: null, collapsible: false})
  }

  restart() {
    $(this.refs['select step']).addClass('active');
    $(this.refs['upgrade step']).removeClass('active').addClass('disabled');
    $(this.refs['save step']).removeClass('active').addClass('disabled');
    $(this.refs['accordion']).accordion('open',0);
  }

  onDrop(files) {
    $(this.refs['select step']).removeClass('active');
    $(this.refs['upgrade step']).removeClass('disabled').addClass('active');
    $(this.refs['save step']).removeClass('active').addClass('disabled');
    $(this.refs['accordion']).accordion('open',1);
  }

  saveContributionFile() {
    console.log('Saving files to ...');
  }

  render() {
    return (
      <div className="upgrade-contribution">
        <div className="ui top attached stackable three steps">
          <a ref="select step" className="active step" onClick={this.restart.bind(this)}>
            <i className="file text outline icon"></i>
            <div className="content">
              <div className="title">Select the MagIC Text File(s)</div>
              <div className="description">The text files must all belong to a single MagIC contribution.</div>
            </div>
          </a>
          <div ref="upgrade step" className="disabled step">
            <i className="icons">
              <i className="file text outline icon"></i>
              <i className="corner up arrow icon"></i>
            </i>
            <div className="content">
              <div className="title">Upgrade the MagIC Contribution</div>
              <div className="description">The upgrade occurs locally on your computer without uploading to MagIC.</div>
            </div>
          </div>
          <div ref="save step" className="disabled step">
            <i className="download icon"></i>
            <div className="content">
              <div className="title">Save the Upgraded Contribution</div>
              <div className="description">Save the upgraded contribution text file to your downloads folder.</div>
            </div>
          </div>
        </div>
        <div className="ui active attached message upgrade-contribution-message">
          <div ref="accordion" className="ui accordion">
            <div className="active title"></div>
            <div ref="select step message" className="active content select-step-content">
              <Dropzone className="upgrade-dropzone" onDrop={this.onDrop.bind(this)}>
                <div className="ui center aligned two column relaxed grid">
                  <div className="column">
                    <i className="huge purple folder open outline icon"></i>
                    <h5>Click and select</h5>
                    <h5>files to upgrade.</h5>
                  </div>
                  <div className="ui vertical divider">
                    OR
                  </div>
                  <div className="column">
                    <i className="huge purple external icon"></i>
                    <h5>Drag and drop files</h5>
                    <h5>here to upgrade.</h5>
                  </div>
                </div>
              </Dropzone>
            </div>
            <div className="title"></div>
            <div ref="upgrade step message" className="content upgrade-step-content">
              Step 2
            </div>
            <div className="title"></div>
            <div ref="save step message" className="content save-step-content">
              Step 3
            </div>
          </div>
        </div>
        <div className="ui bottom attached icon message">
          <i className="purple circle info icon"></i>
          <div className="content">
            The selected file or files must constitute a complete contribution for proper upgrading to
            the <a className="purple" href="../data-model/">latest MagIC data model version</a> and
            the original files will not be overwritten by the upgrading process.
          </div>
        </div>
      </div>
    )
  }

}

