import {_} from 'lodash';
import filesize from 'filesize';
import numeral from 'numeral';
import React from 'react';
import Promise from 'bluebird';
import Dropzone from 'react-dropzone';
import ParseContribution from '../actions/parse_contribution';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      files: []
    };
  }

  componentDidMount() {
    $(this.refs['accordion']).accordion({on: null, collapsible: false});
  }

  componentDidUpdate() {
    $(this.refs['accordion']).accordion('open', this.state.step - 1);
    $('.ui.progress').each(function() {
      $(this).progress('set').progress($(this).attr('data-percent'));
    });
  }

  restart() {
    $(this.refs['dropzone'])
    this.setState({step: 1, files:[]});
  }

  reviewParse() {
    this.setState({step: 2});
  }

  reviewUpgrade() {
    this.setState({step: 3});
  }

  onDrop(files) {
    this.setState({
      step: 2,
      files: _.sortBy(files, (f) => { return f.name; })
    });

    _.defer(() => {
      try {
        for (let i in files) {
          const fileReader = new FileReader();

          fileReader.onprogress = (e) => {
            files[i].readProgress = (e.loaded/e.total);
            this.setState({files: files});
          };
          fileReader.onload = (e) => {

            files[i].readProgress = 100;
            this.setState({files: files});

            const Parser = new ParseContribution({});
            Parser.parsePromise(e.target.result, 1000,
              (percent) => {
                files[i].parseProgress = percent;
                this.setState({files: files});
              }
            ).then((parser) => {
              files[i].json = parser.json;
              files[i].parseErrors = parser.errors();
              files[i].parseWarnings = parser.warnings();
              this.setState({files: files});
            });

          };
          fileReader.readAsText(files[i]);
        }
      }
      catch(err) {
        console.log(err); //.message, err);
        debugger;
      }
    });

  }

  saveContributionFile() {
    console.log('Saving files to ...');
  }

  render() {
    const step = this.state.step;
    return (
      <div className="upgrade-contribution">
        <div className="ui top attached stackable three steps">
          <div ref="select step" className={(['active', 'hidden', 'hidden'])[step-1] + ' pointing below step'}>
            <i className="icons">
              <i className="folder open outline icon"></i>
            </i>
            <div className="content">
              <div className="title">Step 1. Select File(s)</div>
              <div className="description">Click and select or drag and drop files below.</div>
            </div>
          </div>
          <a ref="select link step"
             className={(['hidden', '', ''])[step-1] + ' pointing below step'}
             onClick={this.restart.bind(this)}>
            <i className="icons">
              <i className="folder open outline icon"></i>
            </i>
            <div className="content">
              <div className="title">Step 1. Restart</div>
              <div className="description">All progress in upgrading will be lost.</div>
            </div>
          </a>
          <div ref="read step" className={(['disabled', 'active', 'hidden'])[step-1] + ' pointing below step'}>
            <i className="icons">
              <i className="file text outline icon"></i>
            </i>
            <div className="content">
              <div className="title">Step 2.<br/>Read and Parse</div>
              <div className="description">The upgrade occurs locally on your computer without uploading to MagIC.</div>
            </div>
          </div>
          <a ref="read link step"
             className={(['hidden', 'hidden', ''])[step-1] + ' pointing below step'}
             onClick={this.reviewParse.bind(this)}>
            <i className="icons">
              <i className="file text outlinee icon"></i>
            </i>
            <div className="content">
              <div className="title">Step 2.<br/>Read and Parse</div>
              <div className="description">Review parsing results.</div>
            </div>
          </a>
          <div ref="upgrade step" className={(['disabled', 'disabled', 'hidden'])[step-1] + ' pointing below step'}>
            <i className="icons">
              <i className="file text outline icon"></i>
              <i className="corner up arrow icon"></i>
            </i>
            <div className="content">
              <div className="title">Step 3.<br/>Upgrade</div>
              <div className="description">The upgrade occurs locally on your computer without uploading to MagIC.</div>
            </div>
          </div>
          <a ref="upgrade link step"
             className={(['hidden', 'hidden', 'active'])[step-1] + ' pointing below step'}
             onClick={this.reviewUpgrade.bind(this)}>
            <i className="icons">
              <i className="file text outline icon"></i>
              <i className="corner up arrow icon"></i>
            </i>
            <div className="content">
              <div className="title">Step 3.<br/>Read and Parse</div>
              <div className="description">Review upgrading results.</div>
            </div>
          </a>
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
              : undefined )}
            </div>
            <div className="title"></div>
            <div ref="upgrade step message" className="content upgrade-step-content">
              <div ref="files" className="ui divided items">
                {this.state.files.map((file,i) => {
                  const nTables = _.size(file.json);
                  const nRows = _.reduce(file.json, (sum, value) => { return sum + value.length; }, 0);
                  return (
                    <div key={i} className="item" data-file={file.name}>
                      <div className="ui image">
                        <div className={(file.json ? '' : 'active ') + 'ui inverted dimmer'}>
                          <div className="ui loader"></div>
                        </div>
                        <i className="fitted file text outline icon"></i>
                      </div>
                      <div className="content">
                        <div className="header">{file.name}</div>
                        <div className="meta">
                          <div className="ui horizontal label">{filesize(file.size)}</div>
                          {(file.readErrors ?
                            <a className="ui horizontal red label">
                              {numeral(file.readErrors.length).format('0,0') + ' Error' + (file.readErrors.length > 0 ? 's' : '')}
                            </a>
                            : undefined )}
                          {(file.parseErrors && file.parseErrors.length > 0 ?
                            <a className="ui horizontal red label">
                              {numeral(file.parseErrors.length).format('0,0') + ' Error' + (file.parseErrors.length > 0 ? 's' : '')}
                            </a>
                            : undefined )}
                          {(file.parseWarnings && file.parseWarnings.length > 0 ?
                            <a className="ui horizontal yellow label">
                              {numeral(file.parseWarnings.length).format('0,0') + ' Warning' + (file.parseWarnings.length > 0 ? 's' : '')}
                            </a>
                            : undefined )}
                          {(file.json && nTables > 0 ?
                            <a className="ui horizontal label">
                              {numeral(nTables).format('0,0') + ' Table' + (nTables > 0 ? 's' : '')}
                            </a>
                            : undefined )}
                          {(file.json && nRows > 0 ?
                            <a className="ui horizontal label">
                              {numeral(nRows).format('0,0') + ' Row' + (nRows > 0 ? 's' : '')}
                            </a>
                            : undefined )}
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
                      </div>
                    </div>
                  );
                })}
              </div>
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

