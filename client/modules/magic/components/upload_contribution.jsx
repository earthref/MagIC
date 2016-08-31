import _ from 'lodash';
import filesize from 'filesize';
import React from 'react';
import Promise from 'bluebird';
import Dropzone from 'react-dropzone';
import {default as versions} from '../configs/magic_versions';
import {default as models} from '../configs/data_models/data_models';
import ParseContribution from '../actions/parse_contribution.js';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.files = [];
    this.parser = new ParseContribution({});
    this.initialState = {
      processingStep: 1,
      visibleStep: 1,
      readProgressTaps: 0,
      totalReadErrors: 0,
      isRead: false,
      parseProgressTaps: 0,
      totalParseWarnings: 0,
      totalParseErrors: 0,
      isParsed: false
    };
    this.state = this.initialState;
  }

  restart() {
    for (let i in this.files)
      if (this.files[i].fileReader)
        this.files[i].fileReader.abort();
    this.files = [];
    this.parser.reset();
    this.setState(this.initialState);
    // TODO: cancel active reading or parsing
  }

  componentDidMount() {
    $(this.refs['accordion']).accordion({on: null, collapsible: false});
  }

  componentDidUpdate() {
    $(this.refs['accordion']).accordion('open', this.state.visibleStep - 1);
    $('.ui.progress').each(function() {
      if (!isNaN($(this).attr('data-percent')))
        $(this).progress('set').progress($(this).attr('data-percent'));
    });
    $('.upload-contribution .parse-step-content .format-dropdown').dropdown({
      onChange: (value, text, $item) => {
        this.parse({idxFile: $item.data('i'), format: value});
      }
    });
    $('.upload-contribution .parse-step-content .table-dropdown').dropdown({
      onChange: (value, text, $item) => {
        $('.upload-contribution .parse-step-content .table-dropdown[data-i=' + $item.data('i') + ']').removeClass('error');
      }
    });
  }

  reviewParse() {
    this.setState({visibleStep: 2});
  }

  reviewUpload() {
    this.setState({visibleStep: 3});
  }

  readFiles(files) {

    // Sort the files by name.
    this.files = _.sortBy(files, file => file.name);

    // Initialize the read progress state.
    for (let i in this.files) {
      this.files[i].readProgress = 0;
      this.files[i].readErrors = [];
    }
    this.setState({
      processingStep: 2,
      visibleStep: 2,
      readProgressTaps: 0
    });

    // Read the files in parallel.
    Promise.all(files.map((file, i) => {
      return new Promise((resolve, reject) => {
        this.files[i].fileReader = new FileReader();
        this.files[i].fileReader.onprogress = e => {
          this.files[i].readProgress = (e.loaded/e.total);
          this.setState({readProgressTaps: this.state.readProgressTaps + 1});
        };
        this.files[i].fileReader.onload = e => {
          this.files[i].readProgress = 100;
          this.files[i].text = e.target.result;
          this.setState({readProgressTaps: this.state.readProgressTaps + 1});
          resolve();
        };
        this.files[i].fileReader.onerror = e => {
          this.files[i].readErrors.push(e.toString());
          this.setState({readProgressTaps: this.state.readProgressTaps + 1});
          reject();
        };
        this.files[i].fileReader.readAsText(file);
      }).delay();
    })).then(() => {
      this.setState({
        isRead: true,
        totalReadErrors: _.reduce(this.files, (n, file) => n + file.readErrors.length, 0)
      });
      this.parse();
    });
  }

  parse({idxFile = undefined, format = 'magic'} = {}) {

    // Initialize the parse progress state.
    for (let i in this.files) {
      if (idxFile === undefined || idxFile == i) {
        this.files[i].parseProgress = 0;
        this.files[i].parseWarnings = [];
        this.files[i].parseErrors = [];
        this.files[i].format = format;
      }
    }
    this.setState({
      parseProgressTaps: 0
    });

    // Parse sequentially through the files.
    Promise.each(this.files, (file, i) => {
      return (idxFile === undefined || idxFile == i ?
        new Promise((resolve) => {
          this.parser.resetProgress();
          this.parser.parsePromise({
            text: this.files[i].text,
            onProgress: (percent) => {
              this.files[i].parseProgress = percent;
              this.setState({parseProgressTaps: this.state.parseProgressTaps + 1});
            },
            format: this.files[i].format
          }).then(() => {
            this.files[i].parseProgress = 100;
            this.files[i].parseWarnings = this.parser.warnings();
            this.files[i].parseErrors = this.parser.errors();
            resolve();
          });
        }).delay() : Promise.resolve());
    }).then(() => {
      const totalParseErrors = _.reduce(this.files, (n, file) => n + file.parseErrors.length, 0);
      const totalParseWarnings = _.reduce(this.files, (n, file) => n + file.parseWarnings.length, 0);
      this.setState({
        isParsed: true,
        totalParseErrors: totalParseErrors,
        totalParseWarnings: totalParseWarnings
      });
      console.log(this.files, this.parser);
      if (totalParseErrors === 0)
        this.upload();
    });
  }

  upload() {

    this.setState({
      processingStep: 3,
      visibleStep: 3
    });

  }

  saveContributionFile() {
    console.log('Saving files to ...');
  }

  render() {
    const step = this.state.visibleStep;
    return (
      <div className="upload-contribution">
        <div className="ui top attached stackable three steps">
          {(this.state.processingStep === 1 ?
            <div ref="select step" className="active pointing below step">
              <i className="icons">
                <i className="folder open outline icon"></i>
              </i>
              <div className="content">
                <div className="title">Step 1. Select</div>
                <div className="description">Click and select or drag and drop files below.</div>
              </div>
            </div>
          :
            <a ref="select link step" className="pointing below step" onClick={this.restart.bind(this)}>
              <i className="icons">
                <i className="folder open outline icon"></i>
              </i>
              <div className="content">
                <div className="title">Step 1. Restart</div>
                <div className="description">Progress will be lost.</div>
              </div>
            </a>
          )}
          {(this.state.processingStep < 2 || step === 2 ?
            <div ref="read step" className={(step == 2 ? 'active' : 'disabled') + ' pointing below step'}>
              <i className="icons">
                <i className="file text outline icon"></i>
              </i>
              <div className="content">
                <div className="title">Step 2. Parse</div>
                <div className="description">Read and parse the files.</div>
              </div>
            </div>
            :
            <a ref="read link step"
               className="pointing below step"
               onClick={this.reviewParse.bind(this)}>
              <i className="icons">
                <i className="file text outline icon"></i>
              </i>
              <div className="content">
                <div className="title">Step 2. Parse</div>
                <div className="description">Read and parse the files.</div>
              </div>
            </a>
          )}
          {(this.state.processingStep < 3 || step === 3 ?
            <div ref="upload step" className={(step == 3 ? 'active' : 'disabled') + ' pointing below step'}>
              <i className="icons">
                <i className="file text outline icon"></i>
                <i className="corner folder open icon"></i>
              </i>
              <div className="content">
                <div className="title">Step 3. Upload</div>
                <div className="description">Append to or create a new contribution.</div>
              </div>
            </div>
            :
            <a ref="upload link step"
               className="pointing below step"
               onClick={this.reviewUpload.bind(this)}>
              <i className="icons">
                <i className="file text outline icon"></i>
                <i className="corner folder open icon"></i>
              </i>
              <div className="content">
                <div className="title">Step 3. Upload</div>
                <div className="description">Append to or create a new contribution.</div>
              </div>
            </a>
          )}
        </div>
        <div className="ui attached message upload-contribution-message">
          <div ref="accordion" className="ui accordion">
            <div className="active title"></div>
            <div ref="select step message" className="active content select-step-content">
              {(step === 1 ?
                <Dropzone ref="dropzone" className="upgrade-dropzone" onDrop={this.readFiles.bind(this)}>
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
                : undefined)}
            </div>
            <div className="title"></div>
            <div ref="parse step message" className="content parse-step-content">
              <h3>Reading and parsing each of the files in the contribution:</h3>
              <div ref="files" className="ui divided items">
                {this.files.map((file, i) => {
                  const fileIsDone = (file.parseProgress === 100 ||
                    (file.readErrors && file.readErrors.length > 0) ||
                    (file.parseErrors && file.parseErrors.length > 0));
                  const fileHasErrors = ((file.readErrors && file.readErrors.length > 0) ||
                    (file.parseErrors && file.parseErrors.length > 0));
                  const fileHasWarnings = (file.parseWarnings && file.parseWarnings.length > 0);
                  return (
                    <div key={i} className="item" data-file={file.name}>
                      <div className="ui image">
                        <div className="icon loader wrapper">
                          <div className={(fileIsDone ? '' : 'active ') + 'ui inverted dimmer'}>
                            <div className="ui loader"></div>
                          </div>
                          <i className="file icons">
                            <i className="fitted file text outline icon"></i>
                            {(fileHasErrors ? <i className="corner red warning circle icon"></i>
                                : (fileHasWarnings ? <i className="corner yellow warning circle icon"></i>
                                : undefined )
                            )}
                          </i>
                        </div>
                      </div>
                      <div className="content">
                        <div className="ui header">
                          {file.name + ' '}
                          <div className="ui horizontal label">{filesize(file.size)}</div>
                          {(file.readErrors && file.readErrors.length > 0 ?
                            <div className="ui horizontal red label">
                              {numeral(file.readErrors.length).format('0,0') + ' Read Error' + (file.readErrors.length === 1 ? '' : 's')}
                            </div>
                            : undefined)}
                          {(file.parseErrors && file.parseErrors.length > 0 ?
                            <div className="ui horizontal red label">
                              {numeral(file.parseErrors.length).format('0,0') + ' Parse Error' + (file.parseErrors.length === 1 ? '' : 's')}
                            </div>
                            : undefined)}
                          {(file.parseWarnings && file.parseWarnings.length > 0 ?
                            <div className="ui horizontal yellow label">
                              {numeral(file.parseWarnings.length).format('0,0') + ' Parse Warning' + (file.parseWarnings.length === 1 ? '' : 's')}
                            </div>
                            : undefined)}
                        </div>
                        <div className="description">
                          <div className={
                            (file.readErrors ? 'error ' : '') +
                            'ui tiny purple progress'
                          }
                               data-percent={file.readProgress}>
                            <div className="bar"></div>
                            <div className="label">Read</div>
                          </div>
                          {((file.readErrors && file.readErrors.length > 0) ?
                            <table className="ui compact table">
                              <tbody>
                                {file.readErrors.map((error, j) => {
                                  return (
                                    <tr key={j} className="error">
                                      <td></td>
                                      <td>{error}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                            : undefined)}
                          <div className="ui small buttons">
                            <div className="ui disabled button">
                              Parse As
                            </div>
                            <div className="ui dropdown button format-dropdown">
                              <div className="text">MagIC Text File</div>
                              <i className="dropdown icon"></i>
                              <div className="menu">
                                <div data-i={i} data-value="magic" className="item">
                                  MagIC Text File
                                </div>
                                <div data-i={i} data-value="tsv" className="item">
                                  Tab Delimited Text File
                                </div>
                                <div data-i={i} data-value="csv" className="disabled item">
                                  Comma Delimited Text File
                                </div>
                                <div data-i={i} data-value="fw" className="disabled item">
                                  Fixed Width Text File
                                </div>
                                <div data-i={i} data-value="xls" className="disabled item">
                                  Excel File
                                </div>
                              </div>
                            </div>
                          </div>
                          {(file.format === 'tsv' ?
                            <div data-i={i} className="ui right floated dropdown small basic button error table-dropdown">
                              <div className="text">Data Model Table</div>
                              <i className="dropdown icon"></i>
                              <div className="menu">
                                <div data-i={i} data-value="contribution" className="item">
                                  Contribution
                                </div>
                                <div data-i={i} data-value="locations" className="item">
                                  Locations
                                </div>
                                <div data-i={i} data-value="sites" className="item">
                                  Sites
                                </div>
                                <div data-i={i} data-value="samples" className="item">
                                  Samples
                                </div>
                                <div data-i={i} data-value="specimens" className="item">
                                  Specimens
                                </div>
                                <div data-i={i} data-value="measurements" className="item">
                                  Measurmeents
                                </div>
                                <div data-i={i} data-value="ages" className="item">
                                  Ages
                                </div>
                                <div data-i={i} data-value="images" className="item">
                                  Images
                                </div>
                              </div>
                            </div>
                            : undefined )}
                          <div className={
                            (file.parseErrors && file.parseErrors.length ? 'error ' :
                              (file.parseWarnings && file.parseWarnings.length ? 'warning ' : '')) +
                            'ui tiny purple progress'
                          }
                               data-percent={file.parseProgress}>
                            <div className="bar"></div>
                            <div className="label">Parse</div>
                          </div>
                          <div>
                            {(file.format === 'magic' ?
                              ((file.parseErrors && file.parseErrors.length > 0) ||
                                (file.parseWarnings && file.parseWarnings.length > 0) ?
                                <table className="ui compact table">
                                  <tbody>
                                    {file.parseErrors.map((error, j) => {
                                      return (
                                        <tr key={j} className="error">
                                          <td>Line {error.lineNumber}</td>
                                          <td>{error.message}</td>
                                        </tr>
                                      );
                                    })}
                                    {file.parseWarnings.map((warning, j) => {
                                      return (
                                        <tr key={j} className="warning">
                                          <td>Line {warning.lineNumber}</td>
                                          <td>{warning.message}</td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              : undefined)
                            :
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
                                        <div className="menu">
                                          <div className="active item" data-value="1">site</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="ui fluid dropdown">
                                        <input type="hidden"/>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                          <div className="active item" data-value="1">lat</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="ui fluid dropdown">
                                        <input type="hidden"/>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                          <div className="active item" data-value="1">lon</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="negative">
                                      <div className="ui fluid dropdown error">
                                        <input type="hidden"/>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                          <div className="active item" data-value="1"></div>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="ui fluid dropdown">
                                        <input type="hidden"/>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                          <div className="active item" data-value="1">dir_inc</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="ui fluid dropdown">
                                        <input type="hidden"/>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                          <div className="active item" data-value="1">int_abs</div>
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
                                        <div className="menu">
                                          <div className="active item" data-value="1">Degrees</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="ui fluid dropdown">
                                        <input type="hidden"/>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                          <div className="active item" data-value="1">Degrees</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="negative">
                                      <div className="ui fluid dropdown error">
                                        <input type="hidden"/>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                          <div className="active item" data-value="1">Degrees</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="ui fluid dropdown">
                                        <input type="hidden"/>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                          <div className="active item" data-value="1">Degrees</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="ui fluid dropdown">
                                        <input type="hidden"/>
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                          <div className="active item" data-value="1">mT</div>
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
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="title"></div>
            <div ref="import step message" className="content import-step-content">
              <div className="content">
                <h3>Reading and parsing each of the files in the contribution:</h3>
                <div ref="files" className="ui divided items">
                  {this.files.map((file, i) => {
                    return (
                      <div key={i} className="item" data-file={file.name}>
                        <div className="title">
                          {file.name}
                        </div>
                        <div className="content">
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
                                <div className="menu">
                                  <div className="active item" data-value="1">site</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="ui fluid dropdown">
                                <input type="hidden"/>
                                <i className="dropdown icon"></i>
                                <div className="menu">
                                  <div className="active item" data-value="1">lat</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="ui fluid dropdown">
                                <input type="hidden"/>
                                <i className="dropdown icon"></i>
                                <div className="menu">
                                  <div className="active item" data-value="1">lon</div>
                                </div>
                              </div>
                            </td>
                            <td className="negative">
                              <div className="ui fluid dropdown error">
                                <input type="hidden"/>
                                <i className="dropdown icon"></i>
                                <div className="menu">
                                  <div className="active item" data-value="1"></div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="ui fluid dropdown">
                                <input type="hidden"/>
                                <i className="dropdown icon"></i>
                                <div className="menu">
                                  <div className="active item" data-value="1">dir_inc</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="ui fluid dropdown">
                                <input type="hidden"/>
                                <i className="dropdown icon"></i>
                                <div className="menu">
                                  <div className="active item" data-value="1">int_abs</div>
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
                                <div className="menu">
                                  <div className="active item" data-value="1">Degrees</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="ui fluid dropdown">
                                <input type="hidden"/>
                                <i className="dropdown icon"></i>
                                <div className="menu">
                                  <div className="active item" data-value="1">Degrees</div>
                                </div>
                              </div>
                            </td>
                            <td className="negative">
                              <div className="ui fluid dropdown error">
                                <input type="hidden"/>
                                <i className="dropdown icon"></i>
                                <div className="menu">
                                  <div className="active item" data-value="1">Degrees</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="ui fluid dropdown">
                                <input type="hidden"/>
                                <i className="dropdown icon"></i>
                                <div className="menu">
                                  <div className="active item" data-value="1">Degrees</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="ui fluid dropdown">
                                <input type="hidden"/>
                                <i className="dropdown icon"></i>
                                <div className="menu">
                                  <div className="active item" data-value="1">mT</div>
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
                    );
                  })}
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
            The selected file or files can be partial or complete contributions.
          </div>
        </div>
      </div>
    )
  }

}

