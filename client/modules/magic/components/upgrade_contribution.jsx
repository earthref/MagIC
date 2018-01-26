import _ from 'lodash';
import filesize from 'filesize';
import numeral from 'numeral';
import React from 'react';
import Promise from 'bluebird';
import Dropzone from 'react-dropzone';
import saveAs from 'save-as';
import jszip from 'jszip'; //import JSZip from 'xlsx-style/node_modules/jszip';
import XLSX from 'xlsx';

import ParseContribution from '/lib/modules/magic/parse_contribution.js';
import UpgradeContribution from '/lib/modules/magic/upgrade_contribution.js';
import SummarizeContribution from '/lib/modules/magic/summarize_contribution.js';
import ValidateContribution from '/lib/modules/magic/validate_contribution.js';
import ExportContribution from '/lib/modules/magic/export_contribution.js';
import IconButton from '/client/modules/common/components/icon_button';
import {versions, models} from '/lib/configs/magic/data_models.js';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.files = [];
    this.parser = new ParseContribution({});
    this.upgrader = new UpgradeContribution({});
    this.summarizer = new SummarizeContribution({});
    this.initialState = {
      processingStep: 1,
      visibleStep: 1,
      fromVersion: undefined,
      readProgressTaps: 0,
      totalReadErrors: 0,
      isRead: false,
      parseProgressTaps: 0,
      totalParseWarnings: 0,
      totalParseErrors: 0,
      isParsed: false,
      upgradeProgress: 0,
      isUpgraded: false
    };
    this.state = this.initialState;
  }

  restart() {
    for (let i in this.files)
      if (this.files[i].fileReader)
        this.files[i].fileReader.abort();
    this.files = [];
    this.parser.reset();
    this.upgrader.reset();
    this.setState(this.initialState);
    // TODO: cancel active reading or parsing
  }
  
  componentDidMount() {
    $(this.refs['accordion']).accordion({on: null, collapsible: false});
    $(this.refs['from version']).dropdown({
      onChange: (fromVersion) => {
        $(this.refs['from version']).removeClass("error");
        _.defer(() => {
          this.upgrade(fromVersion);
        });
      }
    });
  }

  componentDidUpdate() {
    $(this.refs['accordion']).accordion('open', this.state.visibleStep - 1);
    $('.ui.progress').each(function() {
      if (!isNaN($(this).attr('data-percent')))
        $(this).progress('set').progress($(this).attr('data-percent'));
    });
  }

  reviewParse() {
    this.setState({visibleStep: 2});
  }

  reviewUpgrade() {
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

  parse() {

    // Initialize the parse progress state.
    for (let i in this.files) {
      this.files[i].parseProgress = 0;
      this.files[i].parseWarnings = [];
      this.files[i].parseErrors = [];
    }
    this.setState({
      parseProgressTaps: 0
    });

    // Parse sequentially through the files.
    Promise.each(this.files, (file, i) => {
      return new Promise((resolve) => {
        this.parser.parsePromise({
          text: file.text,
          onProgress: (percent) => {
            this.files[i].parseProgress = percent;
            this.setState({parseProgressTaps: this.state.parseProgressTaps + 1});
          }
        }).then(() => {
          this.files[i].parseProgress = 100;
          this.files[i].parseWarnings = this.parser.warnings();
          this.files[i].parseErrors = this.parser.errors();
          resolve();
        });
      }).delay();
    }).then(() => {
      const totalParseErrors = _.reduce(this.files, (n, file) => n + file.parseErrors.length, 0);
      const totalParseWarnings = _.reduce(this.files, (n, file) => n + file.parseWarnings.length, 0);
      this.setState({
        isParsed: true,
        totalParseErrors: totalParseErrors,
        totalParseWarnings: totalParseWarnings
      });
      if (totalParseErrors === 0)
        this.upgrade();
    });
  }

  upgrade(fromVersion) {

    // Override the contribution version.
    if (fromVersion !== undefined) {
      if (!this.parser.json.contribution || this.parser.json.contribution.length === 0)
        this.parser.json.contribution = [{}];
      this.parser.json.contribution[0]['data_model_version'] = fromVersion;

    }

    // Otherwise retrieve or guess the contribution version.
    else {
      let validator = new ValidateContribution({});
      let {version} = validator.getVersion(this.parser.json);
      fromVersion = version;
    }

    // Upgrade the contribution.
    this.setState({
      processingStep: 3,
      visibleStep: 3,
      fromVersion: fromVersion
    });
    this.upgrader.upgradePromise({
      json: this.parser.json,
      onProgress: (percent) => {
        this.setState({upgradeProgress: percent});
      }
    }).then(() => {
      //this.summary = this.summarizer.summarize(this.upgrader.json);
      this.setState({
        isUpgraded: true
      });
    });

  }

  saveText() {
    const exporter = new ExportContribution({});
    //console.log(this.upgrader.json);
    let blob = new Blob([exporter.toText(this.upgrader.json)], {type: "text/plain;charset=utf-8"});
    saveAs(blob, 'Upgraded Contribution v' + _.last(versions) + '.txt');
  }

  saveJSON() {
    const blob = new Blob([JSON.stringify(this.upgrader.json, null, '\t')], {type: "text/plain;charset=utf-8"});
    saveAs(blob, 'Upgraded Contribution v' + _.last(versions) + '.json');
  }

  saveExcel() {
    const exporter = new ExportContribution({});
    const workbook = exporter.toExcel(this.upgrader.json);

    // Prepare the workbook for output.
    const workbookBinary = XLSX.write(workbook, {bookType:'xlsx', bookSST:true, type: 'binary'});
    const workbookBuffer = new ArrayBuffer(workbookBinary.length);
    const workbookEncoded = new Uint8Array(workbookBuffer);
    for (var i=0; i!=workbookBinary.length; ++i)
      workbookEncoded[i] = workbookBinary.charCodeAt(i) & 0xFF;
    const workbookBlob = new Blob([workbookBuffer], {type: 'application/octet-stream'});

    saveAs(workbookBlob, 'Upgraded Contribution v' + _.last(versions) + '.xlsx');
  }

  upload() {
    const exporter = new ExportContribution({});
    try {
      localStorage.setItem('Text to Upload', exporter.toText(this.upgrader.json));
      location.href = '/MagIC/upload';
    } catch(e) {
      alert("This contribution is too large to pass to the Upload tool. Please save the contribution as a text file and select it in the Upload tool.");
    }
  }

  renderAgesDetails() {
    if ((this.upgrader.json && this.upgrader.json.ages) || (this.summary && this.summary.ages)) {
      const nRows = (this.upgrader.json && this.upgrader.json.ages && this.upgrader.json.ages.length || 0);
      let nAges = [];
      if (this.summary && this.summary.ages && this.summary.ages.N_LOCATION_AGES)
        nAges.push({
          label: 'Location Age' + (this.summary.ages.N_LOCATION_AGES === 1 ? '' : 's'),
          n: this.summary.ages.N_LOCATION_AGES
        });
      if (this.summary && this.summary.ages && this.summary.ages.N_SITE_AGES)
        nAges.push({
          label: 'Site Age' + (this.summary.ages.N_SITE_AGES === 1 ? '' : 's'),
          n: this.summary.ages.N_SITE_AGES
        });
      if (this.summary && this.summary.ages && this.summary.ages.N_SAMPLE_AGES)
        nAges.push({
          label: 'Sample Age' + (this.summary.ages.N_SAMPLE_AGES === 1 ? '' : 's'),
          n: this.summary.ages.N_SAMPLE_AGES
        });
      if (this.summary && this.summary.ages && this.summary.ages.N_SPECIMEN_AGES)
        nAges.push({
          label: 'Specimen Age' + (this.summary.ages.N_SPECIMEN_AGES === 1 ? '' : 's'),
          n: this.summary.ages.N_SPECIMEN_AGES
        });
      if (nRows > 0 || nAges.length > 0) return (
        <tbody>
        <tr>
          <td style={{borderTop:'1px solid rgba(0, 0, 0, 0.1)'}} className="top aligned" rowSpan={nAges.length || 1}><h4>Ages</h4></td>
          <td style={{borderTop:'1px solid rgba(0, 0, 0, 0.1)'}} className="top aligned" rowSpan={nAges.length || 1}>{nRows > 0 && numeral(nRows).format('0,0')}</td>
          <td style={{borderTop:'1px solid rgba(0, 0, 0, 0.1)'}} className="right aligned">{nAges.length > 0 ? numeral(nAges[0].n).format('0,0') : undefined}</td>
          <td style={{borderTop:'1px solid rgba(0, 0, 0, 0.1)'}}>{nAges.length > 0 ? nAges[0].label : undefined}</td>
        </tr>
        {nAges.slice(1).map((nAge, i) =>
          <tr key={i}>
            <td className="right aligned" style={{borderLeft:'1px solid rgba(0, 0, 0, 0.1)'}}>{numeral(nAge.n).format('0,0')}</td>
            <td>{nAge.label}</td>
          </tr>
        )}
        </tbody>
      );
    }
  }

  render() {
    const step = this.state.visibleStep;
    const fromVersion = this.state.fromVersion;
    const toVersion = _.last(versions)

    const nTables = _.size(this.upgrader.json);
    const strTables = numeral(nTables).format('0,0') + ' Table' + (nTables === 1 ? '' : 's');

    const nRows = _.reduce(this.upgrader.json, (rowsTotal, table) => {
      return rowsTotal + (table.rows ? table.rows.length : table.length);
    }, 0);
    const strRows = numeral(nRows).format('0,0') + ' Row' + (nRows === 1 ? '' : 's');

    const nUpgradeWarnings = this.upgrader.warnings().length;
    const strUpgradeWarnings = numeral(nUpgradeWarnings).format('0,0') + ' Upgrade Warning' + (nUpgradeWarnings === 1 ? '' : 's');

    const nUpgradeErrors = this.upgrader.errors().length;
    const strUpgradeErrors = numeral(nUpgradeErrors).format('0,0') + ' Upgrade Error' + (nUpgradeErrors === 1 ? '' : 's');

    return (
      <div className="upgrade-contribution">
        <div className="ui top attached stackable three steps">
          {(step === 1 ?
            <div ref="select step" className="active pointing below step">
              <i className="icons">
                <i className="folder open outline icon"></i>
              </i>
              <div className="content">
                <div className="title">Step 1. Select File(s)</div>
                <div className="description">Click and select or drag<br/>and drop files below.</div>
              </div>
            </div>
          :
            <a ref="select link step"
               className="pointing below step"
               onClick={this.restart.bind(this)}>
              <i className="icons">
                <i className="folder open outline icon"></i>
              </i>
              <div className="content">
                <div className="title">Step 1. Restart</div>
                <div className="description">All progress in upgrading<br/>will be lost.</div>
              </div>
            </a>
          )}
          {(step < 3 ?
            <div ref="read step" className={(step == 2 ? 'active' : 'disabled') + ' pointing below step'}>
              <i className="icons">
                <i className="file text outline icon"></i>
              </i>
              <div className="content">
                <div className="title">Step 2. Read and Parse</div>
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
                <div className="title">Step 2. Read and Parse</div>
                <div className="description">Review parsing results.</div>
              </div>
            </a>
          )}
          {(this.state.processingStep < 3 ?
            <div ref="upgrade step" className="disabled pointing below step">
              <i className="icons">
                <i className="file text outline icon"></i>
                <i className="corner up arrow icon"></i>
              </i>
              <div className="content">
                <div className="title">Step 3. Upgrade</div>
                <div className="description">The upgrade occurs locally on your computer without uploading to MagIC.</div>
              </div>
            </div>
          : (step < 3 ?
            <a ref="upgrade link step"
               className="pointing below step"
               onClick={this.reviewUpgrade.bind(this)}>
              <i className="icons">
                <i className="file text outline icon"></i>
                <i className="corner up arrow icon"></i>
              </i>
              <div className="content">
                <div className="title">Step 3. Upgrade</div>
                <div className="description">Review upgrading results.</div>
              </div>
            </a>
          :
            <div ref="upgrade step" className="active pointing below step">
              <i className="icons">
                <i className="file text outline icon"></i>
                <i className="corner up arrow icon"></i>
              </i>
              <div className="content">
                <div className="title">Step 3. Upgrade</div>
                <div className="description">Review upgrading results.</div>
              </div>
            </div>
          ))}
        </div>
        <div className="ui attached message upgrade-contribution-message">
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
            <div ref="read step message" className="content read-step-content">
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
                              : (fileHasWarnings ? <i className="corner yellow warning sign icon"></i>
                              : undefined )
                            )}
                          </i>
                        </div>
                      </div>
                      <div className="content">
                        <h3 className="ui header">
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
                        </h3>
                        <div className="description">
                          <div className="ui grid">
                            <div className="two column row">
                              <div className="column">
                                <div className={
                                       (file.readErrors && file.readErrors.length ? 'error ' : '') +
                                       'ui tiny purple progress'
                                     }
                                     data-percent={file.readProgress}>
                                  <div className="bar"></div>
                                  <div className="label">Read</div>
                                </div>
                              </div>
                              <div className="column">
                                <div className={
                                      (file.parseErrors && file.parseErrors.length ? 'error ' :
                                      (file.parseWarnings && file.parseWarnings.length ? 'warning ' : '')) +
                                      'ui tiny purple progress'
                                     }
                                     data-percent={file.parseProgress}>
                                  <div className="bar"></div>
                                  <div className="label">Parse</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {(fileHasErrors || fileHasWarnings ?
                          <div className="extra">
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
                          </div>
                          : undefined)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="title"></div>
            <div ref="upgrade step message" className="content upgrade-step-content">
              <div className="ui items">
                <div className="item">
                  <div className="ui image">
                    <div className="icon loader wrapper">
                      <div className={(this.state.isUpgraded ? '' : 'active ') + 'ui inverted dimmer'}>
                        <div className="ui loader"></div>
                      </div>
                      <i className="file icons">
                        <i className="fitted file text outline icon"></i>
                        {(nUpgradeErrors > 0 ? <i className="corner red warning circle icon"></i>
                          : (nUpgradeWarnings > 0 ? <i className="corner yellow warning sign icon"></i>
                          : undefined )
                        )}
                      </i>
                    </div>
                  </div>
                  <div className="content">
                    <h3 className="ui header">
                      <span>Upgrading from </span>
                      <div ref="from version"
                           className={(fromVersion ? 'black ' : 'red ') + 'ui inline dropdown compact basic icon button'}>
                        <div className="text">
                          {fromVersion || 'Unknown'}&nbsp;
                        </div>
                        <i className="dropdown icon"></i>
                        <div className="menu">
                          {versions.sort().map((v,i) => {
                            return (v !== toVersion ?
                              <div className={(v === fromVersion ? 'active selected ' : '') + 'item'}
                                   value={v} key={i}>
                                {v}
                              </div>
                            : undefined);
                          })}
                        </div>
                      </div>
                      <span> to {toVersion} </span>
                      {(this.state.isUpgraded || nTables > 0 || nRows > 0 ?
                        <a className="ui horizontal label">
                          {strRows}
                          <span> in </span>
                          {strTables}
                        </a>
                      : undefined)}
                    </h3>
                    <div className="description">
                      <div className={(nUpgradeErrors ? 'error ' : '') + 'ui tiny purple progress'}
                           data-percent={this.state.upgradeProgress}>
                        <div className="bar"></div>
                        <div className="label">Upgrade</div>
                      </div>
                    </div>
                    {(nUpgradeErrors ?
                      <div className="extra" style={{marginTop: '2em'}}>
                        <table className="ui compact small inverted red table">
                          <tbody>
                            <tr>
                              <td><i className="warning circle icon"></i><b>{strUpgradeErrors}</b></td>
                            </tr>
                            {this.upgrader.errors().map((error, j) => {
                              return (
                                <tr key={j} className="error">
                                  <td>{error.message}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      : undefined)}
                    {(nUpgradeWarnings ?
                      <div className="extra" style={{marginTop: '2em'}}>
                        <table className="ui compact small inverted yellow table">
                          <tbody>
                            <tr>
                              <td><i className="warning sign icon"></i><b>{strUpgradeWarnings}</b></td>
                            </tr>
                            {this.upgrader.warnings().map((warning, j) => {
                              return (
                                <tr key={j} className="warning">
                                  <td>{warning.message}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      : undefined)}
                  </div>
                </div>
              </div>
              {(this.state.isUpgraded && nUpgradeErrors === 0 ?
                <div>
                  <div className="ui horizontal divider">
                    <span className="content">
                      Next Steps
                    </span>
                  </div>
                  <div className="ui five stackable cards">
                    <IconButton
                      className="borderless card" portal="MagIC" onClick={this.saveExcel.bind(this)}
                    >
                      <i className="icons">
                        <i className="file excel outline icon"/>
                      </i>
                      <div className="title">Save as Excel</div>
                      <div className="subtitle">Download the upgraded contribution as an Excel Worksheet.</div>
                    </IconButton>
                    <IconButton
                      className="borderless card" portal="MagIC" onClick={this.saveText.bind(this)}
                    >
                      <i className="icons">
                        <i className="file text outline icon"/>
                      </i>
                      <div className="title">Save as Text</div>
                      <div className="subtitle">Download the upgraded contribution as a MagIC Text File.</div>
                    </IconButton>
                    <IconButton
                      className="disabled borderless card" portal="MagIC" onClick={this.saveText.bind(this)}
                    >
                      <i className="icons">
                        <i className="file text outline icon"/>
                        <i className="corner help icon"></i>
                      </i>
                      <div className="title">Validate</div>
                      <div className="subtitle">Confirm that the upgraded contribution adheres to the MagIC Data Model.</div>
                    </IconButton>
                    <IconButton
                      className="borderless card" portal="MagIC" onClick={this.upload.bind(this)}
                    >
                      <i className="icons">
                        <i className="table icon"/>
                        <i className="corner add icon"></i>
                      </i>
                      <div className="title">Upload</div>
                      <div className="subtitle">Upload the upgraded contribution to your private workspace.</div>
                    </IconButton>
                    <IconButton
                      className="borderless card" portal="MagIC" onClick={this.restart.bind(this)}
                    >
                      <i className="icons">
                        <i className="file text outline icon"/>
                        <i className="corner arrow up icon"></i>
                      </i>
                      <div className="title">New Upgrade</div>
                      <div className="subtitle">Restart the upgrading tool with another dataset.</div>
                    </IconButton>
                  </div>
                  {/* The ui segment thinks it's the last segment because of the wrapping <div> for React. */}
                  <div></div>
                </div>
              :undefined)}
              {(this.state.fromVersion ?
                <div>
                  <div className="ui horizontal divider">
                    <span className="content">
                      Upgrade Details
                    </span>
                  </div>
                  <div className="ui basic segment">
                    <div className="ui two column very relaxed stackable grid">
                      <div className="column">
                        <table className="ui very basic collapsing compact celled right floated table">
                          <thead>
                          <tr>
                            <th>{this.state.fromVersion} Table</th>
                            <th>N Rows</th>
                          </tr>
                          </thead>
                          <tbody>
                          {_.sortBy(_.keys(models[this.state.fromVersion].tables),
                            (t) => { return models[this.state.fromVersion].tables[t].position; }
                          ).map((t,i) => {
                            let json = this.parser.json;
                            const tableName = models[this.state.fromVersion].tables[t].label;
                            const nRows = (json && json[t] ? (json[t].rows ? json[t].rows.length : json[t].length) : 0);
                            return (nRows > 0 ?
                              <tr key={i}>
                                <td><h4>{tableName}</h4></td>
                                <td>{numeral(nRows).format('0,0')}</td>
                              </tr>
                              : undefined);
                          })}
                          </tbody>
                        </table>
                      </div>
                      <div className="ui vertical divider">
                        <i className="circle arrow right icon"></i>
                      </div>
                      <div className="column">
                        <table className="ui very basic collapsing compact celled table">
                          <thead>
                          <tr>
                            <th>{toVersion} Table</th>
                            <th>N Rows</th>
                            <th colSpan={2}>Assignment</th>
                          </tr>
                          </thead>
                          <tbody>
                          {_.sortBy(_.keys(models[toVersion].tables),
                            (t) => { return models[toVersion].tables[t].position; }
                          ).map((t,i) => {
                            let json = this.upgrader.json;
                            const tableName = models[toVersion].tables[t].label;
                            const nRows = (json && json[t] ? (json[t].rows ? json[t].rows.length : json[t].length) : 0);
                            const n = (this.summary && this.summary[t] && _.keys(this.summary[t]).length || 0);
                            const nExperiments = (t === 'measurements' && this.summary && this.summary.contribution && this.summary.contribution.N_EXPERIMENTS || 0);
                            return (t != 'contribution' && t != 'ages' && (nRows > 0 || n > 0 || nExperiments > 0) ?
                              <tr key={i}>
                                <td><h4>{tableName}</h4></td>
                                <td>{nRows > 0 && numeral(nRows).format('0,0')}</td>
                                {t === 'measurements' ?
                                  <td className="right aligned">{nExperiments > 0 ? numeral(nExperiments).format('0,0') : undefined}</td>
                                :
                                  <td className="right aligned">{(n > 0 ? numeral(n).format('0,0') : undefined)}</td>
                                }
                                {t === 'measurements' ?
                                  <td>{nExperiments > 0 ? (nExperiments === 1 ? 'Experiment' : 'Experiments') : undefined}</td>
                                :
                                  <td>{(n > 0 ? (n === 1 ? (t === 'criteria' ? 'Criterion' : tableName.slice(0, -1)) : tableName) : undefined)}</td>
                                }
                              </tr>
                            : undefined);
                            })}
                          </tbody>
                          {this.renderAgesDetails()}
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* The ui segment thinks it's the last segment because of the wrapping <div> for React. */}
                  <div></div>
                </div>
              : undefined)}
            </div>
          </div>
        </div>
        {(step === 1 ?
          <div className="ui bottom attached icon message">
            <i className="purple info circle icon"></i>
            <div className="content">
              The selected file or files must constitute a complete contribution for proper upgrading to
              the <a className="purple" href="../data-model/" target="_blank">latest MagIC Data Model version</a> and
              the original files will not be overwritten by the upgrading process.
            </div>
          </div>
        : undefined)}
        {(step === 2 && this.state.totalReadErrors + this.state.totalParseErrors > 0 ?
        <div className="ui bottom attached icon error message">
          <i className="warning circle icon"></i>
          <div className="content">
            Reading and parsing
            {this.files.length === 1 ? ' this file ' : ' these files '}
            resulted in
            {' ' + (this.state.totalReadErrors + this.state.totalParseErrors)}
            {this.state.totalReadErrors + this.state.totalParseErrors === 1 ? ' error' : ' errors'}
            . Please address
            {this.state.totalReadErrors + this.state.totalParseErrors === 1 ? ' the error ' : ' these errors '}
            and return to Step 1.
          </div>
        </div>
        : undefined)}
        {(step === 2 && this.state.totalReadErrors + this.state.totalParseErrors === 0 && this.state.totalParseWarnings > 0 ?
          <div className="ui bottom attached icon warning message">
            <i className="warning sign icon"></i>
            <div className="content">
              Reading and parsing
              {this.files.length === 1 ? ' this file ' : ' these files '}
              was successful despite the
              {' ' + this.state.totalParseWarnings}
              {this.state.totalParseWarnings === 1 ? ' warning ' : ' warnings '}
              . Upgrading this contribution can proceed in Step 3, but please review and consider addressing
              {this.state.totalParseWarnings === 1 ? ' the warning' : ' these warnings'}
              .
            </div>
          </div>
          : undefined)}
        {(step === 2 && !this.state.isParsed && this.state.totalReadErrors + this.state.totalParseErrors + this.state.totalParseWarnings === 0 ?
          <div className="ui bottom attached icon message">
            <i className="purple info circle icon"></i>
            <div className="content">
              Reading and parsing
              {this.files.length === 1 ? ' this file ' : ' these files '}
              in preparation for upgrading ...
            </div>
          </div>
          : undefined)}
        {(step === 2 && this.state.isParsed && this.state.totalReadErrors + this.state.totalParseErrors + this.state.totalParseWarnings === 0 ?
          <div className="ui bottom attached icon success message">
            <i className="check circle icon"></i>
            <div className="content">
              Reading and parsing
              {this.files.length === 1 ? ' this file ' : ' these files '}
              was successful. Upgrading this contribution can proceed in Step 3.
            </div>
          </div>
          : undefined)}
        {(step === 3 && fromVersion === undefined ?
          <div className="ui bottom attached icon error message">
            <i className="warning sign icon"></i>
            <div className="content">
              The <em>MagIC Data Model version</em> could not be determined from the parsed
              {this.files.length === 1 ? ' file' : ' files'}.
              Please select the version from which to upgrade.
            </div>
          </div>
          : undefined)}
        {(step === 3 && fromVersion && !this.state.isUpgraded ?
          <div className="ui bottom attached icon message">
            <i className="purple info circle icon"></i>
            <div className="content">
              Upgrading the contribution from MagIC Data Model version <b>{fromVersion}</b> to <b>{toVersion}</b> ...
            </div>
          </div>
          : undefined)}
        {(step === 3 && fromVersion && this.state.isUpgraded && nUpgradeErrors > 0 ?
          <div className="ui bottom attached icon error message">
            <i className="warning circle icon"></i>
            <div className="content">
              Upgrading the contribution from MagIC Data Model
              version <b>{fromVersion}</b> to <b>{toVersion}</b> failed to complete because
              of <b>{strUpgradeErrors}</b>.
            </div>
          </div>
          : undefined)}
        {(step === 3 && fromVersion && this.state.isUpgraded && nUpgradeErrors === 0 && nUpgradeWarnings > 0 ?
          <div className="ui bottom attached icon success message">
            <i className="check circle icon"></i>
            <div className="content">
              Upgrading the contribution from MagIC Data Model
              version <b>{fromVersion}</b> to <b>{toVersion}</b> completed successfully
              with <b>{strUpgradeWarnings}</b>.
            </div>
          </div>
          : undefined)}
        {(step === 3 && fromVersion && this.state.isUpgraded && (nUpgradeErrors + nUpgradeWarnings) === 0 ?
          <div className="ui bottom attached icon success message">
            <i className="check circle icon"></i>
            <div className="content">
              Upgrading the contribution from MagIC Data Model
              version <b>{fromVersion}</b> to <b>{toVersion}</b> completed successfully.
            </div>
          </div>
          : undefined)}
      </div>
    )
  }

}

