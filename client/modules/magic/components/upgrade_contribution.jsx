import _ from 'lodash';
import filesize from 'filesize';
import numeral from 'numeral';
import React from 'react';
import Promise from 'bluebird';
import Dropzone from 'react-dropzone';
import saveAs from 'save-as';
import {default as versions} from '../configs/magic_versions';
import {default as models} from '../configs/data_models/data_models';
import ParseContribution from '../actions/parse_contribution';
import UpgradeContribution from '../actions/upgrade_contribution';
import ExportContribution from '../actions/export_contribution';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.files = [];
    this.parser = new ParseContribution({});
    this.upgrader = new UpgradeContribution({});
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
        this.parser.resetProgress();
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

    // Check if the user has overridden the contribution version
    if (fromVersion === undefined) {
      fromVersion = this.parser.getVersion();
    }
    this.setState({
      processingStep: 3, 
      visibleStep: 3,
      fromVersion: fromVersion
    });
    if (fromVersion === undefined) return;

    // Override the contribution version.
    let jsonParsed = this.parser.json;
    if (!jsonParsed.contribution || jsonParsed.contribution.length === 0)
      jsonParsed.contribution = [{}];
    jsonParsed.contribution[0]['magic_version'] = fromVersion;

    // Upgrade the contribution.
    this.upgrader.upgradePromise({
      json: jsonParsed,
      onProgress: (percent) => {
        this.setState({upgradeProgress: percent});
      }
    }).then(() => {
      this.setState({isUpgraded: true});
      console.log('upgrade warnings', this.upgrader.warnings());
      console.log('upgrade errors', this.upgrader.errors());
    });

  }

  saveText() {
    const exporter = new ExportContribution({});
    let blob = new Blob([exporter.toText(this.upgrader.json)], {type: "text/plain;charset=utf-8"});
    saveAs(blob, 'Upgraded Contribution v' + _.last(versions) + '.txt');
  }

  saveJSON() {
    const exporter = new ExportContribution({});
    const blob = new Blob([JSON.stringify(this.upgrader.json, null, '\t')], {type: "text/plain;charset=utf-8"});
    saveAs(blob, 'Upgraded Contribution v' + _.last(versions) + '.json');
  }

  render() {
    const step = this.state.visibleStep;
    const fromVersion = this.state.fromVersion;
    const toVersion = _.last(versions)
    const nTables = _.size(this.upgrader.json);
    const nUpgradeWarnings = this.upgrader.warnings().length;
    const nUpgradeErrors = this.upgrader.errors().length;
    const nRows = _.reduce(this.upgrader.json, (sum, value) => { return sum + value.length; }, 0);
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
                          <div className="ui grid">
                            <div className="two column row">
                              <div className="column">
                                <div className={
                                       (file.readErrors ? 'error ' : '') +
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
                        {(this.upgrader.errors().length > 0 ? <i className="corner red warning circle icon"></i>
                          : (this.upgrader.warnings().length > 0 ? <i className="corner yellow warning circle icon"></i>
                          : undefined )
                        )}
                      </i>
                    </div>
                  </div>
                  <div className="content">
                    <div className="ui header">
                      <span>Upgrading from </span>
                      <div ref="from version"
                           className={(fromVersion ? '' : 'error ') + 'ui inline dropdown'}>
                        <div className="text">
                          {fromVersion || 'Unknown'}
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
                          {numeral(nRows).format('0,0') + ' Row' + (nRows === 1 ? '' : 's')}
                          <span> in </span>
                          {numeral(nTables).format('0,0') + ' Table' + (nTables === 1 ? '' : 's')}
                        </a>
                      : undefined)}
                      {(this.state.isUpgraded && this.upgrader.errors().length > 0 ?
                        <div className="ui horizontal red label">
                          {numeral(this.upgrader.errors().length).format('0,0') + ' Upgrade Error' + (this.upgrader.errors().length === 1 ? '' : 's')}
                        </div>
                        : undefined)}
                      {(this.state.isUpgraded && this.upgrader.warnings().length > 0 ?
                        <div className="ui horizontal yellow label">
                          {numeral(this.upgrader.warnings().length).format('0,0') + ' Upgrade Warning' + (this.upgrader.warnings().length === 1 ? '' : 's')}
                        </div>
                        : undefined)}
                    </div>
                    <div className="description">
                      <div className={(this.upgrader.errors().length ? 'error ' : '') + 'ui tiny purple progress'}
                           data-percent={this.state.upgradeProgress}>
                        <div className="bar"></div>
                        <div className="label">Upgrade</div>
                      </div>
                    </div>
                    {(this.upgrader.warnings().length || this.upgrader.errors().length ?
                      <div className="extra" style={{marginTop: '2em'}}>
                        <table className="ui compact table">
                          <tbody>
                          {this.upgrader.errors().map((error, j) => {
                            return (
                              <tr key={j} className="error">
                                <td>{error.message}</td>
                              </tr>
                            );
                          })}
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
              {(this.state.isUpgraded && this.upgrader.errors().length === 0 ?
                <div>
                  <h4 className="ui horizontal divider header">
                    <i className="download icon"></i>
                        <span className="content">
                          Download the Upgraded Contribution
                        </span>
                  </h4>
                  <div className="ui basic segment">
                    <div className="ui three column middle aligned very relaxed stackable grid">
                      <div className="column">
                        <button className="ui fluid icon large disabled button">
                          Excel Spreadsheet
                        </button>
                      </div>
                      <div className="column">
                        <button className="ui fluid purple icon large button" onClick={this.saveText.bind(this)}>
                          MagIC Text File
                        </button>
                      </div>
                      <div className="column">
                        <button className="ui fluid icon large button" onClick={this.saveJSON.bind(this)}>
                          JSON String
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* The ui segment thinks it's the last segment because of the wrapping <div> for React. */}
                  <div></div>
                </div>
              :undefined)}
              {(this.state.fromVersion ?
                <div>
                  <h4 className="ui horizontal divider header">
                    <i className="download icon"></i>
                        <span className="content">
                          Upgrade Details
                        </span>
                  </h4>
                  <div className="ui basic segment">
                    <div className="ui two column very relaxed stackable grid">
                      <div className="column">
                        <table className="ui very basic collapsing compact celled right floated table">
                          <thead>
                          <tr>
                            <th>{this.state.fromVersion} Table</th>
                            <th>Rows</th>
                          </tr>
                          </thead>
                          <tbody>
                          {_.sortBy(_.keys(models[this.state.fromVersion].tables),
                            (t) => { return models[this.state.fromVersion].tables[t].position; }
                          ).map((t,i) => {
                            const tableName = models[this.state.fromVersion].tables[t].label;
                            const nRows = (this.parser.json && this.parser.json[t] ? this.parser.json[t].length : 0);
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
                            <th>Rows</th>
                          </tr>
                          </thead>
                          <tbody>
                          {_.sortBy(_.keys(models[toVersion].tables),
                            (t) => { return models[toVersion].tables[t].position; }
                          ).map((t,i) => {
                            //console.log(models[toVersion].tables[t], (this.upgrader.json && this.upgrader.json[t] ? this.upgrader.json[t] : ''))
                            const tableName = models[toVersion].tables[t].label;
                            const nRows = (this.upgrader.json && this.upgrader.json[t] ? this.upgrader.json[t].length : 0);
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
            <i className="warning circle icon"></i>
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
            <i className="warning circle icon"></i>
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
              Upgrading the contribution from MagIC Data Model version {fromVersion} to {toVersion} ...
            </div>
          </div>
          : undefined)}
        {(step === 3 && fromVersion && this.state.isUpgraded && nUpgradeErrors > 0 ?
          <div className="ui bottom attached icon error message">
            <i className="warning circle icon"></i>
            <div className="content">
              Upgrading the contribution from MagIC Data Model version {fromVersion} to {toVersion} failed
              to complete because of {numeral(nUpgradeErrors).format('0,0')}
              {' error' + (nUpgradeErrors === 1 ? '' : 's') + '.'}
            </div>
          </div>
          : undefined)}
        {(step === 3 && fromVersion && this.state.isUpgraded && nUpgradeErrors === 0 && nUpgradeWarnings > 0 ?
          <div className="ui bottom attached icon success message">
            <i className="check circle icon"></i>
            <div className="content">
              Upgrading the contribution from MagIC Data Model version {fromVersion} to {toVersion} completed
              successfully with {numeral(nUpgradeWarnings).format('0,0')}
              {' warning' + (nUpgradeWarnings === 1 ? '' : 's') + '.'}
            </div>
          </div>
          : undefined)}
        {(step === 3 && fromVersion && this.state.isUpgraded && (nUpgradeErrors + nUpgradeWarnings) === 0 ?
          <div className="ui bottom attached icon success message">
            <i className="check circle icon"></i>
            <div className="content">
              Upgrading the contribution from MagIC Data Model version {fromVersion} to {toVersion} completed
              successfully.
            </div>
          </div>
          : undefined)}
      </div>
    )
  }

}

