import {_} from 'lodash';
import filesize from 'filesize';
import numeral from 'numeral';
import React from 'react';
import Promise from 'bluebird';
import Dropzone from 'react-dropzone';
import {default as versions} from '../configs/magic_versions';
import {default as models} from '../configs/data_models/data_models';
import ParseContribution from '../actions/parse_contribution';
import UpgradeContribution from '../actions/upgrade_contribution';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      processingStep: 1,
      visibleStep: 1,
      files: [],
      fromVersion: undefined,
      nReadErrors: 0,
      nParseWarnings: 0,
      nParseErrors: 0
    };
    this.parser = new ParseContribution({});
    this.upgrader = new UpgradeContribution({});
    this.jsonToUpgrade = {};
    this.isUpgraded = false;
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

  restart() {
    this.parser.reset();
    this.upgrader.reset();
    this.jsonToUpgrade = {};
    this.isUpgraded = false;
    this.setState({
      processingStep: 1,
      visibleStep: 1,
      files: [],
      fromVersion: undefined,
      nReadErrors: 0,
      nParseWarnings: 0,
      nParseErrors: 0
    });
    // TODO: cancel active reading or parsing
  }

  reviewParse() {
    this.setState({visibleStep: 2});
  }

  reviewUpgrade() {
    this.setState({visibleStep: 3});
  }

  onDrop(files) {

    for (let i in files) {
      files[i].readProgress = 0;
      files[i].readErrors = [];
      files[i].parseProgress = 0;
      files[i].parseWarnings = [];
      files[i].parseErrors = [];
    }

    this.setState({
      processingStep: 2,
      visibleStep: 2,
      files: _.sortBy(files, (f) => { return f.name; }),
      fromVersion: undefined,
      nReadErrors: 0,
      nParseWarnings: 0,
      nParseErrors: 0
    });

    _.defer(() => {
      for (let i in files)
        this.read(i);
    });
  }

  read(i) {
    const files = this.state.files;
    const fileReader = new FileReader();
    fileReader.onprogress = (e) => {
      files[i].readProgress = (e.loaded/e.total);
      this.setState({files: files});
    };
    fileReader.onload = (e) => {
      files[i].readProgress = 100;
      files[i].txt = e.target.result;
      this.setState({files: files});
      this.parse();
    };
    fileReader.onerror = (e) => {
      files[i].readErrors.push(e.toString());
      this.setState({nReadErrors: files[i].readErrors.length});
    };
    fileReader.readAsText(files[i]);
  }

  parse() {
    const files = this.state.files;

    // Check that reading is complete.
    const allFilesRead = _.reduce(files, (allFilesRead, file) => {
      return (file.txt ? allFilesRead : false);
    }, true);
    if (!allFilesRead || this.state.processingStep == 1) return;

    // Reading is complete, begin parsing sequentially through the files.
    for (let i in files) {
      if (!files[i].isParsing) {
        files[i].isParsing = true;
        this.isParsed = false;
        this.parser.resetProgress();
        this.parser.parsePromise(files[i].txt, 1000,
          (percent) => {
            files[i].parseProgress = percent;
            this.setState({files: files});
          }
        ).then((parser) => {
          files[i].parseWarnings = parser.warnings();
          files[i].parseErrors = parser.errors();
          files[i].isParsed = true;
          const nParseWarnings = _.reduce(files, (nParseWarnings, file) => {
            return nParseWarnings + file.parseWarnings.length;
          }, 0);
          const nParseErrors = _.reduce(files, (nParseErrors, file) => {
            return nParseErrors + file.parseErrors.length;
          }, 0);
          this.setState({files: files, nParseErrors: nParseErrors, nParseWarnings: nParseWarnings});
          this.parse();
          this.upgrade();
        });
        return;
      }
    }
  }

  upgrade(fromVersion) {
    const files = this.state.files;

    // Check that parsing is complete.
    if (!this.isParsed) {
      const allFilesParsed = _.reduce(files, (allFilesParsed, file) => {
        return (file.isParsed ? allFilesParsed : false);
      }, true);
      if (!allFilesParsed || this.state.nParseErrors > 0 || this.state.processingStep == 1) return;
      this.isParsed = true;
    }

    // Parsing is complete, begin upgrading.
    let jsonParsed = this.parser.json;

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
    if (!jsonParsed.contribution || jsonParsed.contribution.length === 0)
      jsonParsed.contribution = [{}];
    jsonParsed.contribution[0]['magic_version'] = fromVersion;

    // Upgrade the contribution.
    this.isUpgraded = false;
    this.upgrader.upgrade(jsonParsed);
    this.isUpgraded = true;

    this.setState({
      nUpgraderErrrors: this.upgrader.errors().length
    });

  }

  saveContributionFile() {
    console.log('Saving files to ...');
  }

  render() {
    const step = this.state.visibleStep;
    const fromVersion = this.state.fromVersion;
    const toVersion = _.last(versions)
    const nTables = _.size(this.upgrader.json);
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
        <div className="ui active attached message upgrade-contribution-message">
          <div ref="accordion" className="ui accordion">
            <div className="active title"></div>
            <div ref="select step message" className="active content select-step-content">
              {(step === 1 ?
                <Dropzone ref="dropzone" className="upgrade-dropzone" onDrop={this.onDrop.bind(this)}>
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
                {this.state.files.map((file, i) => {
                  return (
                    <div key={i} className="item" data-file={file.name}>
                      <div className="ui image">
                        <div className={(file.isParsed ? '' : 'active ') + 'ui inverted dimmer'}>
                          <div className="ui loader"></div>
                        </div>
                        <i className="file icons">
                          <i className="fitted file text outline icon"></i>
                          {(file.readErrors.length > 0 || file.parseErrors.length > 0 ?
                            <i className="corner red warning circle icon"></i>
                          : (file.parseWarnings.length > 0 ?
                            <i className="corner yellow warning circle icon"></i>
                          : undefined ))}
                        </i>
                      </div>
                      <div className="content">
                        <div className="ui header">
                          {file.name + ' '}
                          <div className="ui horizontal label">{filesize(file.size)}</div>
                          {(file.readErrors.length > 0 ?
                            <div className="ui horizontal red label">
                              {numeral(file.readErrors.length).format('0,0') + ' Read Error' + (file.readErrors.length === 1 ? '' : 's')}
                            </div>
                          : undefined)}
                          {(file.parseErrors.length > 0 ?
                            <div className="ui horizontal red label">
                              {numeral(file.parseErrors.length).format('0,0') + ' Parse Error' + (file.parseErrors.length === 1 ? '' : 's')}
                            </div>
                          : undefined)}
                          {(file.parseWarnings.length > 0 ?
                            <div className="ui horizontal yellow label">
                              {numeral(file.parseWarnings.length).format('0,0') + ' Parse Warning' + (file.parseWarnings.length === 1 ? '' : 's')}
                            </div>
                          : undefined)}
                        </div>
                        <div className="description">
                          <div className="ui grid">
                            <div className="two column row">
                              <div className="column">
                                <div className={(file.readErrors ? 'error ' : '') + 'ui tiny purple progress'}
                                     data-action="read"
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
                                     data-action="parse"
                                     data-percent={file.parseProgress}>
                                  <div className="bar"></div>
                                  <div className="label">Parse</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {(file.readErrors.length > 0 || file.parseErrors.length > 0 || file.parseWarnings.length > 0 ?
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
                    <div className={(this.isUpgraded ? '' : 'active ') + 'ui inverted dimmer'}>
                      <div className="ui loader"></div>
                    </div>
                    <i className="file icons">
                      <i className="fitted file text outline icon"></i>
                      {(this.upgrader.errors().length > 0 ?
                        <i className="corner red warning circle icon"></i>
                        : (this.upgrader.warnings().length > 0 ?
                        <i className="corner yellow warning circle icon"></i>
                        : undefined ))}
                    </i>
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
                            return (
                              <div className="item" value={v} key={i} selected={v === fromVersion}>{v}</div>
                            );
                          })}
                        </div>
                      </div>
                      <span> to {toVersion} </span>
                      {(this.isUpgraded || nTables > 0 || nRows > 0 ?
                        <a className="ui horizontal label">
                          {numeral(nRows).format('0,0') + ' Row' + (nRows === 1 ? '' : 's')}
                          <span> in </span>
                          {numeral(nTables).format('0,0') + ' Table' + (nTables === 1 ? '' : 's')}
                        </a>
                      : undefined)}
                    </div>
                    <div className="description">
                      <div className={(this.upgrader.errors().length ? 'error ' : '') + 'ui tiny purple progress'}
                           data-percent={this.upgrader.progress}>
                        <div className="bar"></div>
                        <div className="label">Upgrade</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {(this.isUpgraded && this.upgrader.errors().length === 0 ?
                <div className="ui basic segment">
                  <h4 className="ui horizontal divider header">
                    <i className="download icon"></i>
                    <span className="content">
                      Download Upgraded Contribution
                    </span>
                  </h4>
                  <br/>
                  <div className="ui three column middle aligned very relaxed stackable grid">
                    <div className="column">
                      <button className="ui fluid purple icon large button">
                        MagIC Text File
                      </button>
                    </div>
                    <div className="column">
                      <button className="ui fluid icon large button">
                        Excel Spreadsheet
                      </button>
                    </div>
                    <div className="column">
                      <button className="ui fluid icon large button">
                        JSON String
                      </button>
                    </div>
                  </div>
                </div>
              :undefined)}
              {(this.state.fromVersion ?
                <div className="ui basic segment">
                  <div className="ui two column middle aligned very relaxed stackable grid">
                    <div className="column">
                      <table className="ui very basic collapsing compact celled right floated table">
                        <thead>
                        <tr>
                          <th>Table</th>
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
                              <td>{nRows}</td>
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
                          <th>Table</th>
                          <th>Rows</th>
                        </tr>
                        </thead>
                        <tbody>
                        {_.sortBy(_.keys(models[toVersion].tables),
                          (t) => { return models[toVersion].tables[t].position; }
                        ).map((t,i) => {
                          const tableName = models[toVersion].tables[t].label;
                          const nRows = (this.upgrader.json && this.upgrader.json[t] ? this.upgrader.json[t].length : 0);
                          return (nRows > 0 ?
                            <tr key={i}>
                              <td><h4>{tableName}</h4></td>
                              <td>{nRows}</td>
                            </tr>
                            : undefined);
                        })}
                        </tbody>
                      </table>
                    </div>
                  </div>
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
        {(step === 2 && this.state.nReadErrors + this.state.nParseErrors > 0 ?
        <div className="ui bottom attached icon error message">
          <i className="warning circle icon"></i>
          <div className="content">
            Reading and parsing
            {this.state.files.length === 1 ? ' this file ' : ' these files '}
            resulted in
            {' ' + (this.state.nReadErrors + this.state.nParseErrors)}
            {this.state.nReadErrors + this.state.nParseErrors === 1 ? ' error' : ' errors'}
            . Please address
            {this.state.nReadErrors + this.state.nParseErrors === 1 ? ' the error ' : ' these errors '}
            and return to Step 1.
          </div>
        </div>
        : undefined)}
        {(step === 2 && this.state.nReadErrors + this.state.nParseErrors === 0 && this.state.nParseWarnings > 0 ?
          <div className="ui bottom attached icon warning message">
            <i className="warning circle icon"></i>
            <div className="content">
              Reading and parsing
              {this.state.files.length === 1 ? ' this file ' : ' these files '}
              was successful despite the
              {' ' + this.state.nParseWarnings}
              {this.state.nParseWarnings === 1 ? ' warning ' : ' warnings '}
              . Upgrading this contribution can proceed in Step 3, but please review and consider addressing
              {this.state.nParseWarnings === 1 ? ' the warning' : ' these warnings'}
              .
            </div>
          </div>
          : undefined)}
        {(step === 2 && !this.isParsed && this.state.nReadErrors + this.state.nParseErrors + this.state.nParseWarnings === 0 ?
          <div className="ui bottom attached icon message">
            <i className="purple info circle icon"></i>
            <div className="content">
              Reading and parsing
              {this.state.files.length === 1 ? ' this file ' : ' these files '}
              in preparation for upgrading.
            </div>
          </div>
          : undefined)}
        {(step === 2 && this.isParsed && this.state.nReadErrors + this.state.nParseErrors + this.state.nParseWarnings === 0 ?
          <div className="ui bottom attached icon success message">
            <i className="check circle icon"></i>
            <div className="content">
              Reading and parsing
              {this.state.files.length === 1 ? ' this file ' : ' these files '}
              was successful. Upgrading this contribution can proceed in Step 3.
            </div>
          </div>
          : undefined)}
        {(step === 3 && !fromVersion > 0 ?
          <div className="ui bottom attached icon error message">
            <i className="warning circle icon"></i>
            <div className="content">
              The <em>MagIC Data Model version</em> could not be determined from the parsed
              {this.state.files.length === 1 ? ' file' : ' files'}.
              Please select the version from which to upgrade.
            </div>
          </div>
          : undefined)}
      </div>
    )
  }

}

