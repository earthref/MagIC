import React from 'react';
import Dropzone from 'react-dropzone';
import {parseContribution} from '../actions/parse_contribution.js';

export default class extends React.Component {

  componentDidMount() {
    $(this.refs['accordion']).accordion({on: null, collapsible: false})
  }

  restart() {
    $(this.refs['select step']).show();
    $(this.refs['select link step']).hide();
    $(this.refs['upgrade step']).removeClass('active').addClass('disabled');
    $(this.refs['save step']).removeClass('active').addClass('disabled');
    $(this.refs['accordion']).accordion('open',0);
  }

  onDrop(files) {
    $(this.refs['select step']).hide();
    $(this.refs['select link step']).show();
    $(this.refs['upgrade step']).removeClass('disabled').addClass('active');
    $(this.refs['save step']).removeClass('active').addClass('disabled');
    $(this.refs['accordion']).accordion('open',1);

    try {
      for (let file of files) {
        const fr = new FileReader();
        fr.onload = (e) => {
          console.log(e.target.result);
        };
        fr.readAsText(file);
      }
    }
    catch(err) {
      console.error(err.message, err);
    }

  }

  saveContributionFile() {
    console.log('Saving files to ...');
  }

  render() {
    return (
      <div className="upgrade-contribution">
        <div className="ui top attached stackable four steps">
          <div ref="select step" className="step">
            <i className="file text outline icon"></i>
            <div className="content">
              <div className="title">Step 1.<br/>Select Text or Excel File(s)</div>
              <div className="description">Click and select or drag and drop files below.</div>
            </div>
          </div>
          <a ref="select link step" className="step" style={{display: "none"}} onClick={this.restart.bind(this)}>
            <i className="file text outline icon"></i>
            <div className="content">
              <div className="title">Step 1.<br/>Restart by Selecting new File(s)</div>
              <div className="description">All progress in upgrading will be lost.</div>
            </div>
          </a>
          <div ref="upgrade step" className="active step">
            <i className="icons icon">
              <i className="file text outline icon"></i>
              <i className="corner purple check icon"></i>
            </i>
            <div className="content">
              <div className="title">Step 2.<br/>Verify the Data Upload</div>
              <div className="description">Confirm the data being uploaded.</div>
            </div>
          </div>
          <div ref="save step" className="disabled step">
            <i className="icons icon">
              <i className="file text outline icon"></i>
              <i className="corner folder open icon"></i>
            </i>
            <div className="content">
              <div className="title">Step 3.<br/>Choose the Destination</div>
              <div className="description">Append to an existing or create a new contribution.</div>
            </div>
          </div>
          <div ref="save step" className="disabled step">
            <i className="icons icon">
              <i className="file text outline icon"></i>
              <i className="corner up arrow icon"></i>
            </i>
            <div className="content">
              <div className="title">Step 4.<br/>Upload the Contribution</div>
              <div className="description">Upload the data to your private workspace.</div>
            </div>
          </div>
        </div>
        <div className="ui active attached message upgrade-contribution-message">
          <div className="ui accordion">
            <div className="title"></div>
            <div ref="select step message" className="content select-step-content">
              <div ref="loading" className="ui inverted dimmer">
                <div className="ui text loader">Loading files</div>
                <div className="ui button">Cancel</div>
              </div>
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
            <div className="active title"></div>
            <div ref="verify step message" className="active content verify-step-content">
              <div ref="accordion" className="ui accordion">
                <div className="active title">
                  <div className="ui right floated selection dropdown" style={{float:'right',display:'inline-block'}}>
                    <input type="hidden"/>
                    <i className="dropdown icon"></i>
                    <div class="menu">
                      <div class="active item" data-value="1">sites</div>
                    </div>
                  </div>
                  <h4>File sites_data.xls:</h4>
                </div>
                <div className="active content">
                  <table className="ui celled definition small compact table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Site</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>D</th>
                        <th>I</th>
                        <th>Intensity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="right aligned collapsing">Column</td>
                        <td>
                          <div className="ui fluid dropdown">
                            <input type="hidden"/>
                            <i className="dropdown icon"></i>
                            <div class="menu">
                              <div class="active item" data-value="1">site</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="ui fluid dropdown">
                            <input type="hidden"/>
                            <i className="dropdown icon"></i>
                            <div class="menu">
                              <div class="active item" data-value="1">lat</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="ui fluid dropdown">
                            <input type="hidden"/>
                            <i className="dropdown icon"></i>
                            <div class="menu">
                              <div class="active item" data-value="1">lon</div>
                            </div>
                          </div>
                        </td>
                        <td className="negative">
                          <div className="ui fluid dropdown error">
                            <input type="hidden"/>
                            <i className="dropdown icon"></i>
                            <div class="menu">
                              <div class="active item" data-value="1"></div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="ui fluid dropdown">
                            <input type="hidden"/>
                            <i className="dropdown icon"></i>
                            <div class="menu">
                              <div class="active item" data-value="1">dir_inc</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="ui fluid dropdown">
                            <input type="hidden"/>
                            <i className="dropdown icon"></i>
                            <div class="menu">
                              <div class="active item" data-value="1">int_abs</div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="right aligned collapsing">Unit</td>
                        <td>
                        </td>
                        <td>
                          <div className="ui fluid dropdown">
                            <input type="hidden"/>
                            <i className="dropdown icon"></i>
                            <div class="menu">
                              <div class="active item" data-value="1">Degrees</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="ui fluid dropdown">
                            <input type="hidden"/>
                            <i className="dropdown icon"></i>
                            <div class="menu">
                              <div class="active item" data-value="1">Degrees</div>
                            </div>
                          </div>
                        </td>
                        <td className="negative">
                          <div className="ui fluid dropdown error">
                            <input type="hidden"/>
                            <i className="dropdown icon"></i>
                            <div class="menu">
                              <div class="active item" data-value="1">Degrees</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="ui fluid dropdown">
                            <input type="hidden"/>
                            <i className="dropdown icon"></i>
                            <div class="menu">
                              <div class="active item" data-value="1">Degrees</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="ui fluid dropdown">
                            <input type="hidden"/>
                            <i className="dropdown icon"></i>
                            <div class="menu">
                              <div class="active item" data-value="1">mT</div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="right aligned collapsing">1</td>
                        <td>mc20</td>
                        <td className="right aligned">-77.88</td>
                        <td className="right aligned">165.02</td>
                        <td className="right aligned negative">138.7</td>
                        <td className="right aligned">-77.3</td>
                        <td className="right aligned">0.01431</td>
                      </tr>
                      <tr>
                        <td className="right aligned collapsing">2</td>
                        <td>mc200</td>
                        <td className="right aligned">-77.54995</td>
                        <td className="right aligned">166.16148</td>
                        <td className="right aligned negative">296.8</td>
                        <td className="right aligned">-83.7</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className="right aligned collapsing">3</td>
                        <td>mc201</td>
                        <td className="right aligned">-77.56284</td>
                        <td className="right aligned">166.21958</td>
                        <td className="negative"></td>
                        <td></td>
                        <td className="right aligned">0.04716</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="title"></div>
            <div ref="upload step message" className="content upload-step-content">
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

