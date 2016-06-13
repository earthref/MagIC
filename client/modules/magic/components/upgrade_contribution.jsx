import {_} from 'lodash';
import filesize from 'filesize';
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
    $(this.refs['accordion']).accordion('open',this.state.step - 1);
  }

  restart() {
    $(this.refs['dropzone'])
    this.setState({step: 1, files:[]});
  }

  onDrop(files) {
    this.setState({
      step: 2,
      files: _.sortBy(files, (f) => { return f.name; })
    });

    _.defer((files) => {
      try {
        for (let file of files) {
          const fileReader = new FileReader(),
                $fileIconDimmer = $(this.refs['files']).find('[data-file="' + file.name + '"] > .image > .dimmer'),
                $readStep = $(this.refs['files']).find('[data-file="' + file.name + '"] [data-action=read]'),
                $parseStep = $(this.refs['files']).find('[data-file="' + file.name + '"] [data-action=parse]'),
                $readProgress = $readStep.find('.ui.progress').progress({percent: 0}),
                $parseProgress = $parseStep.find('.ui.progress').progress({percent: 0});

          $readStep.removeClass("disabled").addClass("active");
          fileReader.name = file.name;
          fileReader.onprogress = (e) => {
            $readProgress.progress('set').progress(e.loaded/e.total);
          };
          fileReader.onload = (e) => {
            $readStep.removeClass("active").addClass("completed");
            $readProgress.progress('set').progress(100);

            $parseStep.removeClass("disabled").addClass("active");
            const Parser = new ParseContribution({});
            Parser.parsePromise(e.target.result, 1000,
              (percent) => { $parseProgress.progress('set').progress(percent); }
            ).then((parser) => {
              $parseStep.removeClass("active").addClass("completed");
              $fileIconDimmer.removeClass("active");
              file.json = parser.json;
              file.parseErrors = parser.errors();
              file.parseWarnings = parser.warnings();
              $parseProgress.progress('set').progress(100);
            });

          };
          fileReader.readAsText(file);
        }
      }
      catch(err) {
        console.log(err); //.message, err);
        debugger;
      }
    }, files);

  }

  parseFile() {
    return new Promise((resolve, reject) => {

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
          <div ref="select step" className={(step === 1 ? 'active' : 'hidden') + ' pointing below step'}>
            <i className="icons">
              <i className="folder open outline icon"></i>
            </i>
            <div className="content">
              <div className="title">Step 1.<br/>Select the MagIC Text File(s)</div>
              <div className="description">Click and select or drag and drop files below.</div>
            </div>
          </div>
          <a ref="select link step" className={(step !== 1 ? '' : 'hidden') + ' pointing below step'} onClick={this.restart.bind(this)}>
            <i className="icons">
              <i className="folder open outline icon"></i>
            </i>
            <div className="content">
              <div className="title">Step 1.<br/>Restart by Selecting new File(s)</div>
              <div className="description">All progress in upgrading will be lost.</div>
            </div>
          </a>
          <div ref="read step" className={(step === 2 ? 'active' : 'disabled') + ' pointing below step'}>
            <i className="icons">
              <i className="file text outline icon"></i>
            </i>
            <div className="content">
              <div className="title">Step 2.<br/>Read the MagIC Contribution</div>
              <div className="description">The upgrade occurs locally on your computer without uploading to MagIC.</div>
            </div>
          </div>
          <div ref="upgrade step" className={(step === 3 ? 'active' : 'disabled') + ' pointing below step'}>
            <i className="icons">
              <i className="file text outline icon"></i>
              <i className="corner up arrow icon"></i>
            </i>
            <div className="content">
              <div className="title">Step 3.<br/>Upgrade the MagIC Contribution</div>
              <div className="description">The upgrade occurs locally on your computer without uploading to MagIC.</div>
            </div>
          </div>
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
                  return (
                    <div key={i} className="item" data-file={file.name}>
                      <div className="ui image">
                        <div className="ui active inverted dimmer">
                          <div className="ui loader"></div>
                        </div>
                        <i className="fitted file text outline icon"></i>
                      </div>
                      <div className="content">
                        <div className="header">{file.name}</div>
                        <div className="meta">
                          <div className="ui horizontal label">{filesize(file.size)}</div>
                          {(file.readErrors ?
                            <div className="ui horizontal red label">
                              {file.readErrors} Error{(file.readErrors > 0 ? 's' : '')}
                            </div>
                            : undefined )}
                          {(file.parseErrors ?
                            <div className="ui horizontal red label">
                              {file.parseErrors} Error{(file.parseErrors > 0 ? 's' : '')}
                            </div>
                            : undefined )}
                          {(file.parseWarnings ?
                            <div className="ui horizontal yellow label">
                              {file.parseWarnings} Warning{(file.parseWarnings > 0 ? 's' : '')}
                            </div>
                            : undefined )}
                          {(file.nTables ?
                            <div className="ui horizontal label">
                              {file.nTables} Table{(file.nTables > 0 ? 's' : '')}
                            </div>
                            : undefined )}
                          {(file.nRows ?
                            <div className="ui horizontal label">
                              {file.nRows} Row{(file.nRows > 0 ? 's' : '')}
                            </div>
                            : undefined )}
                        </div>
                        <div className="description">
                          <div className="ui grid">
                            <div className="two column row">
                              <div className="column" data-action="read">
                                <div className="ui tiny purple progress">
                                  <div className="bar"></div>
                                  <div className="label">Read</div>
                                </div>
                              </div>
                              <div className="column" data-action="parse">
                                <div className="ui tiny purple progress">
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

