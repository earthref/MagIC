import _ from 'lodash';
import moment from 'moment';
import filesize from 'filesize';
import React from 'react';
import saveAs from 'save-as';
import Cookies from 'js-cookie';
import Promise from 'bluebird';
import {Mongo} from 'meteor/mongo';
import numeral from 'numeral';
import {Tracker}  from 'meteor/tracker';
import Dropzone from 'react-dropzone';
import JSZip from 'xlsx-style/node_modules/jszip'; // not used, but makes xlsx-style happy
import XLSX from 'xlsx-style';
import {Collections} from '/lib/collections';
import {default as versions} from '../../../../lib/modules/magic/magic_versions';
import {default as models} from '../../../../lib/modules/magic/data_models';
import SummarizeContribution from '../actions/summarize_contribution';
import ExportContribution from '../actions/export_contribution';
import DataImporter from '../../common/components/data_importer.jsx';
import IconButton from '../../common/components/icon_button.jsx';

export default class MagICUploadContribution extends React.Component {

  constructor(props) {
    super(props);
    this.files = [];
    this.initialState = {
      processingStep: 1,
      visibleStep: 1,
      readProgressTaps: 0,
      totalReadErrors: 0,
      isRead: false,
      fileFormats: [],
      totalParseErrors: 0,
      importProgressTaps: 0,
      totalImportErrors: 0,
      _id: '',
      _existing_contribution: {},
      _name: 'My Contribution',
      _contributor: Cookies.get('name'),
      _userid: (Cookies.get('user_id') ? '@' + Cookies.get('user_id') : undefined),
      _mailid: Cookies.get('mail_id'),
      uploading: false,
      uploaded: false,
      uploadError: undefined
    };
    this.summarizer = new SummarizeContribution({});
    this.state = this.initialState;
    if (Cookies.get('user_id')) {
      Tracker.autorun(function () {
        Meteor.subscribe('magic.private.contributions.summaries', '@' + Cookies.get('user_id'));
      });
    }
  }

  restart() {
    for (let i in this.files)
      if (this.files[i].fileReader)
        this.files[i].fileReader.abort();
    this.files = [];
    this.contribution = {};
    this.summary = {};
    this.setState(this.initialState);
  }

  componentDidMount() {
    let text = localStorage.getItem('Text to Upload');
    if (text) {
      localStorage.removeItem('Text to Upload');
      this.files = [{
        readProgress: 100,
        readErrors: [],
        text: text,
        name: 'Output from Upload Tool.txt',
        size: text.length,
        format: 'magic'
      }];
      this.setState({
        isRead: true,
        fileFormats: ['magic'],
        totalReadErrors: 0,
        processingStep: 2,
        visibleStep: 2
      },() =>  _.defer(() => this.parse(0)));
    }
    $(this.refs['accordion']).accordion({on: null, collapsible: false});
  }

  componentDidUpdate() {
    $(this.refs['accordion']).accordion('open', this.state.visibleStep - 1);
    $('.ui.progress').each(function() {
      if (!isNaN($(this).attr('data-percent')))
        $(this).progress('set').progress($(this).attr('data-percent'));
    });
    $('.upload-contribution .import-step-content .format-dropdown:not(.ui-dropdown)').addClass('ui-dropdown').dropdown({
      onChange: (value, text, $choice) => {
        let i = $choice.data('i');
        let fileFormats = this.state.fileFormats;
        fileFormats[i] = value;
        this.setState({fileFormats: fileFormats}, () => _.defer(() => this.parse(i)));
      }
    });
    $('.upload-contribution .import-step-content .format-dropdown.ui-dropdown').dropdown('refresh');
    $(this.refs['private contributions']).not('.ui-dropdown').addClass('ui-dropdown').dropdown({
      onChange: (value, text, $choice) => {
        let old = (value === '' ? {} : Collections['magic.private.contributions'].findOne(value));
        console.log('private contribution as changed', value, text, $choice, old);
        this.setState({
          _id: value, 
          _existing_contribution: (value === '' ? undefined : old),
          _existing_summary: (value === '' ? undefined : this.summarizer.summarize(old))
      }, () => this.reviewUpload());
      }
    });
    $(this.refs['private contributions']).dropdown('refresh');
  }

  reviewImport() {
    this.setState({visibleStep: 2});
  }

  reviewUpload() {
    this.contribution = _.cloneDeep(this.state._existing_contribution) || {};
    console.log('before merging', this.state._existing_contribution, this.contribution);
    for (let file of this.files) {
      if (file.imported) file.imported.map((data) => {
        if (data.table && data.columns && data.rows) {
          if (this.contribution[data.table]) delete this.contribution[data.table];
        }
      });
    }
    for (let file of this.files) {
      if (file.imported) file.imported.map((data) => {
        if (data.table && data.columns && data.rows) {
          if (data.table === 'measurements') {
            /* this.contribution.experiments = {};
            let experimentColumnIdx = data.columns.indexOf('experiment');
            data.rows.map((row, i) => {
              this.contribution.experiments[row[experimentColumnIdx]] = this.contribution.experiments[row[experimentColumnIdx]] || {
                columns: data.columns,
                rows: []
              };
              this.contribution.experiments[row[experimentColumnIdx]].rows.push(row);
            }); */
            if (this.contribution.measurements !== undefined) {
              file.parseErrors.push('There are more than one measurement tables in this file. Please combine them before uploading.');
            } else {
              this.contribution.measurements = {
                columns: data.columns,
                rows: data.rows
              }
            }
          } else {
            this.contribution[data.table] = this.contribution[data.table] || [];
            data.rows.map((row, i) =>
              this.contribution[data.table].push(
                _.reduce(row, (json, column, j) => { json[data.columns[j]] = column; return json; }, {})
              )
            );
          }
        }
      });
    }
    this.summary = this.summarizer.summarize(this.contribution);
    console.log('after merging', this.contribution, this.summary);

    let totalParseErrors = _.reduce(this.files, (n, file) => n + file.parseErrors.length, 0);
    this.setState({
      totalParseErrors: totalParseErrors,
      importProgressTaps: this.state.importProgressTaps + 1,
      visibleStep: (totalParseErrors > 0 ? 2 : 3)
    });
  }

  readFiles(files) {

    // Sort the files by name.
    this.files = _.sortBy(files, file => file.name);

    // Initialize the read progress state.
    for (let i in this.files) {
      this.files[i].readProgress = 0;
      this.files[i].readErrors = [];
      this.files[i].format = 'magic';
    }
    this.setState({
      processingStep: 2,
      visibleStep: 2,
      readProgressTaps: 0,
      fileFormats: this.files.map((f) => f.format)
    });

    // Read the files in parallel.
    Promise.all(this.files.map((file, i) => {
      return new Promise((resolve, reject) => {
        this.files[i].fileReader = new FileReader();
        this.files[i].fileReader.onprogress = e => {
          this.files[i].readProgress = (e.loaded/e.total);
          this.setState({readProgressTaps: this.state.readProgressTaps + 1});
        };
        this.files[i].fileReader.onload = e => {
          this.files[i].readProgress = 100;
          if (this.files[i].format === 'xls') {
            this.files[i].workbook = XLSX.read(e.target.result, {type: 'binary'});
          } else this.files[i].text = e.target.result;
          this.setState({readProgressTaps: this.state.readProgressTaps + 1}, () => _.defer(() => this.parse(i)));
          resolve();
        };
        this.files[i].fileReader.onerror = e => {
          this.files[i].readErrors.push(e.toString());
          this.setState({readProgressTaps: this.state.readProgressTaps + 1});
          reject();
        };
        if (/\.xls(x)?$/.test(file.name)) {
          this.files[i].format = 'xls';
          let fileFormats = this.state.fileFormats;
          fileFormats[i] = 'xls';
          this.setState({fileFormats: fileFormats});
          this.files[i].fileReader.readAsBinaryString(file);
        } else this.files[i].fileReader.readAsText(file);
      }).delay();
    })).then(() => {
      this.setState({
        isRead: true,
        totalReadErrors: _.reduce(this.files, (n, file) => n + file.readErrors.length, 0)
      });
    });
  }

  parse(i) {
    this.contribution = undefined;
    this.files[i].parseErrors = [];

    if (this.state.fileFormats[i] === 'magic') {
      if (this.files[i].text) {
        let text = this.files[i].text;
        text = text.replace('\r\n','\n');
        this.files[i].tableNames = [''];
        this.files[i].data = [[[]]];
        text.split(/\s*>+\s*\n/).map((table, j) => {
          let tableName = table.match(/^tab( delimited)?\s*?\t(.+?)\s*?[\n\v\f\r\x85\u2028\u2029]+/);
          this.files[i].tableNames[j] = (tableName && table.length >= 3 ? tableName[2] : '');
          this.files[i].data[j] = table.split(/[\n\v\f\r\x85\u2028\u2029]+/).map((line, j) => {
            line = line.replace(/\t+$/, '');
            if (line != '') return line.split('\t');
          });
          _.pull(this.files[i].data[j], undefined);
          console.log('parsed table', this.files[i].tableNames[j], this.files[i].data[j]);
        });
      } else {
        this.files[i].parseErrors.push("Failed to parse this file as a MagIC Text File.")
      }
    }
    if (this.state.fileFormats[i] === 'tsv') {
      if (this.files[i].text) {
        let text = this.files[i].text;
        text = text.replace('\r\n','\n');
        this.files[i].data = text.split(/[\n\v\f\r\x85\u2028\u2029]+/).map((line, j) => line.split('\t'));
      } else {
        this.files[i].parseErrors.push("Failed to parse this file as a Tab Delimited File.")
      }
    }
    if (this.state.fileFormats[i] === 'csv') {
      if (this.files[i].text) {
        let text = this.files[i].text;
        text = text.replace('\r\n','\n');
        this.files[i].data = text.split(/[\n\v\f\r\x85\u2028\u2029]+/).map((line, j) => line.split(','));
      } else {
        this.files[i].parseErrors.push("Failed to parse this file as a Comma Delimited File.")
      }
    }
    if (this.state.fileFormats[i] === 'xls') {
      if (this.files[i].workbook) {
        this.files[i].tableNames = [''];
        this.files[i].data = [[[]]];
        this.files[i].workbook.SheetNames.map((tableName, j) => {
          this.files[i].tableNames[j] = tableName;
          this.files[i].data[j] = this.xlsSheetToArray(this.files[i].workbook.Sheets[tableName]);
        });
      } else {
        this.files[i].parseErrors.push("Failed to parse this file as an Excel File.")
      }
    }

    this.setState({
      totalParseErrors: _.reduce(this.files, (n, file) => n + file.parseErrors.length, 0)
    });

  }

  xlsSheetToArray(sheet) {
    let data = [];
    let nSkipRows = 0;
    let nSkipColumns = 0;

    // Check if this is a MagIC Excel file by looking for "Group:" in cell A1 and "Column:" in cell A4.
    if (sheet.A1 && /Group:/.test(sheet.A1.v) &&
        sheet.A4 && /Column:/.test(sheet.A4.v)) {
      nSkipRows = 3;
      nSkipColumns = 1;
    }

    // Loop through the sheet and copy the values into the data array.
    for (let cellName in sheet) {
      const cellCoordinates = XLSX.utils.decode_cell(cellName);
      const rowIdx = cellCoordinates.r;
      const columnIdx = cellCoordinates.c;
      if (rowIdx >= nSkipRows && columnIdx >= nSkipColumns) {
        if (data[rowIdx - nSkipRows] === undefined)
          data[rowIdx - nSkipRows] = [];
        if (data[rowIdx - nSkipRows].length < columnIdx - nSkipColumns + 1)
          _.times(columnIdx - nSkipColumns + 1 - data[rowIdx - nSkipRows].length,
            () => data[rowIdx - nSkipRows].push(''));
        data[rowIdx - nSkipRows][columnIdx - nSkipColumns] = _.trim(String(sheet[cellName].v));
      }
    }

    // Make sure each row has the same number of columns.
    let maxRowLength = _.reduce(data, (max, row) => row && row.length && Math.max(max, row.length) || max, 0);
    for (let rowIdx in data) {
      if (data[rowIdx].length < maxRowLength)
        _.times(maxRowLength - data[rowIdx].length, () => data[rowIdx].push(''));
    }

    return data;
  }

  upload() {
    if (!this.contribution) {
      this.setState({
        uploadError: "The contribution could not be prepared for upload.",
        uploading: false
      });
  } else {
        this.contribution._activated = false;
        console.log('upload', this.contribution, this.state._id);
        if (this.state._id !== '')
          Meteor.call('updateContribution', this.state._id, this.state._contributor, this.state._userid, this.state._mailid, this.state._name, this.contribution, this.summary,
            (error) => {
              console.log('updated contribution', this.state._id, error);
              if (error) this.setState({uploadError: error, uploading: false});
              else       this.setState({uploaded: true, uploading: false});
            }
          );
        else
          Meteor.call('insertContribution', this.state._contributor, this.state._userid, this.state._mailid, this.state._name, this.contribution, this.summary,
            (error) => {
              console.log('inserted contribution', this.state._id, error);
              if (error) this.setState({uploadError: error, uploading: false});
              else       this.setState({uploaded: true, uploading: false});
            }
          );
        this.setState({
          uploading: true
        });
      //}).fail(() => {
      //  this.setState({
      //    uploadError: "Failed to upload the contribution. Please try again in a few minutes.",
      //    uploading: false
      //  });
      //});
    }
  }

  uploadExampleMagICv3() {
    this.uploadExample('MagIC Text File in Data Model v. 3.0', 'magic');
  }

  uploadExampleMagICv2() {
    this.uploadExample('MagIC Text File in Data Model v. 2.5');
  }

  uploadExampleTabDelimitedSites() {
    this.uploadExample('Tab Delimited File with Sites Data', 'tsv');
  }

  uploadExampleTabDelimitedSpecimens() {
    this.uploadExample('Tab Delimited File with Specimens Data', 'csv');
  }

  uploadExampleMagICExcel() {
    this.uploadExample('MagIC Text File in Data Model v. 3.0', 'magic', 'MagIC Excel File.xls');
  }

  uploadExampleExcel() {
    this.uploadExample('Tab Delimited File with Sites Data', 'tsv', 'Excel File.xls');
  }

  uploadExample(name, format, file) {
    this.files = [{
      name: file || name + '.txt',
      size: examples[name].length,
      readProgress: 100,
      readErrors: [],
      text: examples[name],
      format: format
    }];
    this.setState({
      processingStep: 2,
      visibleStep: 2,
      isRead: true,
      totalReadErrors: 0,
      fileFormats: [format]
    }, () => _.defer(() => this.parse(0)));
  }

  downloadFile(file) {
    const blob = new Blob([file.text], {type: "text/plain;charset=utf-8"});
    saveAs(blob, file.name);
  }

  downloadExampleMagICv3() {
    const blob = new Blob([examples['MagIC Text File in Data Model v. 3.0']], {type: "text/plain;charset=utf-8"});
    saveAs(blob, 'MagIC Example Text File in Data Model v. 3.0.txt');
  }

  downloadExampleTabDelimitedSpecimens() {
    const blob = new Blob([examples['Tab Delimited File with Specimens Data']], {type: "text/plain;charset=utf-8"});
    saveAs(blob, 'MagIC Example Tab Delimited File with Specimens Data.txt');
  }

  renderDataImporter(i, j, data, tableName, nHeaderRows) {
    console.log('renderDataImporter', data);
    return (
      <DataImporter
        portal="MagIC"
        tableName={tableName}
        nHeaderRows={nHeaderRows}
        data={data}
        onReady={(t, c, r) => {
          this.files[i].imported = this.files[i].imported || [];
          this.files[i].imported[j] = {table: t, columns: c, rows: r};
          this.files[i].importErrors = [];
          this.setState({
            totalImportErrors: _.reduce(this.files, (n, file) => n + file.importErrors.length, 0),
            importProgressTaps: this.state.importProgressTaps + 1
          });
        }}
        onNotReady={() => {
          this.files[i].importErrors = [{}];
          this.setState({
            totalImportErrors: _.reduce(this.files, (n, file) => n + file.importErrors.length, 0),
            importProgressTaps: this.state.importProgressTaps + 1
          });
        }}
      />
    );
  }

  renderParseErrors(i) {
    const nErrors = this.files[i].parseErrors.length;
    return (nErrors > 0 ?
        <table className="ui compact small inverted red table">
          <tbody>
          <tr>
            <td><i className="warning sign icon"></i><b>
              {nErrors + ' Parse Error' + (nErrors > 1 ? 's' : '')}
            </b></td>
          </tr>
          {this.files[i].parseErrors.map((error, i) =>
            <tr className="error" key={i}>
              <td>{error}</td>
            </tr>
          )}
          </tbody>
        </table>
        : undefined
    );
  }

  renderDetails(c, s) {
    return (
      <table className="ui very basic collapsing compact celled table" style={{display: 'inline'}}>
        <thead>
        <tr>
          <th>Table</th>
          <th>N Rows</th>
          <th colSpan={2}>Assignment</th>
        </tr>
        </thead>
        <tbody>
        {_.sortBy(_.keys(models[_.last(versions)].tables),
          (t) => { return models[_.last(versions)].tables[t].position; }
        ).map((t,i) => {
          let json = c;
          const tableName = models[_.last(versions)].tables[t].label;
          const nRows = (json && json[t] ? (json[t].rows ? json[t].rows.length : json[t].length) : 0);
          const n = (s && s[t] && _.keys(s[t]).length || 0);
          const nExperiments = (t === 'measurements' && s && s.contribution && s.contribution.N_EXPERIMENTS || 0);
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
        {this.renderAgesDetails(c, s)}
      </table>
    )  ;
  }
  
  renderAgesDetails(c, s) {
    if ((c && c.ages) || (s && s.ages)) {
      const nRows = (c && c.ages && c.ages.length || 0);
      let nAges = [];
      if (s && s.ages && s.ages.N_LOCATION_AGES)
        nAges.push({
          label: 'Location Age' + (s.ages.N_LOCATION_AGES === 1 ? '' : 's'),
          n: s.ages.N_LOCATION_AGES
        });
      if (s && s.ages && s.ages.N_SITE_AGES)
        nAges.push({
          label: 'Site Age' + (s.ages.N_SITE_AGES === 1 ? '' : 's'),
          n: s.ages.N_SITE_AGES
        });
      if (s && s.ages && s.ages.N_SAMPLE_AGES)
        nAges.push({
          label: 'Sample Age' + (s.ages.N_SAMPLE_AGES === 1 ? '' : 's'),
          n: s.ages.N_SAMPLE_AGES
        });
      if (s && s.ages && s.ages.N_SPECIMEN_AGES)
        nAges.push({
          label: 'Specimen Age' + (s.ages.N_SPECIMEN_AGES === 1 ? '' : 's'),
          n: s.ages.N_SPECIMEN_AGES
        });
      if (nRows > 0 || nAges.length > 0) return (
        <tbody>
        <tr>
          <td style={{borderTop: '1px solid rgba(0, 0, 0, 0.1)'}} className="top aligned" rowSpan={nAges.length || 1}>
            <h4>Ages</h4></td>
          <td style={{borderTop: '1px solid rgba(0, 0, 0, 0.1)'}} className="top aligned"
              rowSpan={nAges.length || 1}>{nRows > 0 && numeral(nRows).format('0,0')}</td>
          <td style={{borderTop: '1px solid rgba(0, 0, 0, 0.1)'}}
              className="right aligned">{nAges.length > 0 ? numeral(nAges[0].n).format('0,0') : undefined}</td>
          <td style={{borderTop: '1px solid rgba(0, 0, 0, 0.1)'}}>{nAges.length > 0 ? nAges[0].label : undefined}</td>
        </tr>
        {nAges.slice(1).map((nAge, i) =>
          <tr key={i}>
            <td className="right aligned"
                style={{borderLeft: '1px solid rgba(0, 0, 0, 0.1)'}}>{numeral(nAge.n).format('0,0')}</td>
            <td>{nAge.label}</td>
          </tr>
        )}
        </tbody>
      );
    }
  }

  render() {
    //const privateContributions = Collections['magic.private.contributions'].find({_contributor: '@' + Cookies.get('user_id'), _activated: false}, {'_inserted': -1}).fetch();
    //console.log('privateContributions', privateContributions, Cookies.get('user_id'));

    const step = this.state.visibleStep;
    if (!this.state._contributor) return (
      <div>
        <div className="ui top attached segment">
          <div className="ui center aligned two column relaxed grid">
            <div className="column">
              <IconButton
                className="borderless card" href="" portal="MagIC"
                onClick={() => location.href = '//earthref.org/log-in/?next_url=' + window.location.href}
              >
                <i className="icons">
                  <i className="user icon"/>
                  <i className="sign in corner icon"/>
                </i>
                <div className="title">Log In</div>
              </IconButton>
            </div>
            <div className="ui vertical divider">
              OR
            </div>
            <div className="column">
              <IconButton
                className="borderless card" href="" portal="MagIC"
                onClick={() => location.href = '//earthref.org/register/'}
              >
                <i className="icons">
                  <i className="user icon"/>
                  <i className="plus corner icon"/>
                </i>
                <div className="title">Join EarthRef.org</div>
              </IconButton>
            </div>
          </div>
        </div>
        <div className="ui bottom attached icon error message">
          <i className="warning sign icon"/>
          <div className="content">
            Please log in to EarthRef.org before uploading to your private workspace.
          </div>
        </div>
      </div>
    );
    else return (
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
                <div className="title">Step 2. Import</div>
                <div className="description">Read and parse the files.</div>
              </div>
            </div>
            :
            <a ref="read link step"
               className="pointing below step"
               onClick={this.reviewImport.bind(this)}>
              <i className="icons">
                <i className="file text outline icon"></i>
              </i>
              <div className="content">
                <div className="title">Step 2. Import</div>
                <div className="description">Read and parse the files.</div>
              </div>
            </a>
          )}
          {(this.state.processingStep < 2 || this.state.totalReadErrors > 0 || this.state.totalImportErrors > 0 || step === 3 ?
            <div ref="upload step" className={(step == 3 ? 'active' : 'disabled') + ' pointing below step'}>
              <i className="icons">
                <i className="file text outline icon"></i>
                <i className="corner plus icon"></i>
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
                <i className="corner plus icon"></i>
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
              <div className="ui basic segment">
              {(step === 1 ?
                <Dropzone ref="dropzone" className="upload-dropzone" onDrop={this.readFiles.bind(this)}>
                  <div className="ui center aligned two column relaxed grid">
                    <div className="column">
                      <i className="huge purple folder open outline icon"></i>
                      <h5>Click and select</h5>
                      <h5>files to upload.</h5>
                    </div>
                    <div className="ui vertical divider">
                      OR
                    </div>
                    <div className="column">
                      <i className="huge purple external icon"></i>
                      <h5>Drag and drop files</h5>
                      <h5>here to upload.</h5>
                    </div>
                  </div>
                </Dropzone>
              : undefined)}
              </div>
              <div className="ui divider"></div>
              <h4 className="ui header" style={{marginBottom: '1em'}}>
                If you don't have a file handy or want to try a different format, upload an example file:
              </h4>
              <div className="ui five stackable cards">
                <IconButton
                  className="borderless card" href="" portal="MagIC" position="bottom left"
                  tooltip={'Click to upload this example dataset into your private ' +
                  'workspace. You can always delete it later.'}
                  onClick={this.uploadExampleMagICv3.bind(this)}
                >
                  <i className="icons">
                    <i className="file text outline icon"/>
                  </i>
                  <div className="title">Example<br/>MagIC Text</div>
                  <div className="subtitle">Data Model v. 3.0</div>
                </IconButton>
                <IconButton
                  className="borderless card" href="" portal="MagIC" position="bottom left"
                  tooltip={'Click to upload this example dataset into your private ' +
                  'workspace. You can always delete it later.'}
                  onClick={this.uploadExampleTabDelimitedSites.bind(this)}
                >
                  <i className="icons">
                    <i className="table icon"/>
                  </i>
                  <div className="title">Example<br/>Tab Delimited</div>
                  <div className="subtitle">Sites Data</div>
                </IconButton>
                <IconButton
                  className="borderless card" href="" portal="MagIC" position="bottom center"
                  tooltip={'Click to upload this example dataset into your private ' +
                  'workspace. You can always delete it later.'}
                  onClick={this.uploadExampleTabDelimitedSpecimens.bind(this)}
                >
                  <i className="icons">
                    <i className="table icon"/>
                  </i>
                  <div className="title">Example<br/>Comma Delimited</div>
                  <div className="subtitle">Specimens Data</div>
                </IconButton>
                <IconButton
                  className="borderless card" href="" portal="MagIC" position="bottom right"
                  tooltip={'Click to upload this example dataset into your private ' +
                  'workspace. You can always delete it later.'}
                  onClick={this.uploadExampleMagICExcel.bind(this)}
                >
                  <i className="icons">
                    <i className="file excel outline icon"/>
                  </i>
                  <div className="title">Example<br/>MagIC Excel File</div>
                  <div className="subtitle">Data Model v. 3.0</div>
                </IconButton>
                <IconButton
                  className="borderless card" href="" portal="MagIC" position="bottom right"
                    tooltip={'Click to upload this example dataset into your private ' +
                  'workspace. You can always delete it later.'}
                  onClick={this.uploadExampleExcel.bind(this)}
                >
                  <i className="icons">
                    <i className="file excel outline icon"/>
                  </i>
                  <div className="title">Example<br/>Excel File</div>
                  <div className="subtitle">Sites Data</div>
                </IconButton>
              </div>
            </div>
            <div className="title"></div>
            <div ref="import step message" className="content import-step-content">
              <h3>Reading and parsing the {this.files.length === 1 ? ' file' : ' files'} for upload:</h3>
              <div ref="files" className="ui divided items">
                {step === 2 ? this.files.map((file, i) => {
                  const fileIsDone = (file.readErrors && file.readErrors.length > 0);
                  const fileHasErrors = (
                    (file.readErrors && file.readErrors.length > 0) ||
                    (file.parseErrors && file.parseErrors.length > 0) ||
                    (file.importErrors && file.importErrors.length > 0)
                  );
                  return (
                    <div key={i} className="item" data-file={file.name}>
                      <div className="ui image">
                        <div className="icon loader wrapper">
                          <div className={(this.state.isRead ? '' : 'active ') + 'ui inverted dimmer'}>
                            <div className="ui loader"></div>
                          </div>
                          <i className="file icons">
                            <i className="fitted file text outline icon"></i>
                            {(fileHasErrors ? <i className="corner red warning circle icon"></i> : undefined )}
                          </i>
                        </div>
                      </div>
                      <div className="content">
                        <div className="ui header">
                          {file.name + ' '}
                          <div className="ui horizontal label">{filesize(file.size)}</div>
                          {file.format !== 'xls' ? <div className="ui horizontal label button" onClick={() => this.downloadFile(file)}>Download Original</div> : undefined}
                          {file.readErrors && file.readErrors.length > 0 ?
                            <div className="ui horizontal red label">
                              {numeral(file.readErrors.length).format('0,0') + ' Read Error' + (file.readErrors.length === 1 ? '' : 's')}
                            </div>
                            : undefined}
                          {file.parseErrors && file.parseErrors.length > 0 ?
                            <div className="ui horizontal red label">
                              {numeral(file.parseErrors.length).format('0,0') + ' Parse Error' + (file.parseErrors.length === 1 ? '' : 's')}
                            </div>
                            : undefined}
                          {file.importErrors && file.importErrors.length > 0 ?
                            <div className="ui horizontal red label">
                              {numeral(file.importErrors.length).format('0,0') + ' Import Error' + (file.importErrors.length === 1 ? '' : 's')}
                            </div>
                            : undefined}
                        </div>
                        <div className="description">
                          <div className={
                            (file.readErrors && file.readErrors.length > 0 ? 'error ' : '') +
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
                          <div className="ui labeled fluid action input">
                            <div className="ui purple label">
                              Parse As
                            </div>
                            <div className="ui fluid selection dropdown format-dropdown">
                              <input name="format" type="hidden" value={this.state.fileFormats[i]}/>
                              <i className="dropdown icon"></i>
                              <div className="text">MagIC Text File</div>
                              <div className="menu">
                                <div data-i={i} data-value="magic" className="item">
                                  MagIC Text File
                                </div>
                                <div data-i={i} data-value="tsv" className="item">
                                  Tab Delimited Text File
                                </div>
                                <div data-i={i} data-value="csv" className="item">
                                  Comma Delimited Text File
                                </div>
                                <div data-i={i} data-value="xls" className="item">
                                  Excel File
                                </div>
                              </div>
                            </div>
                          </div>
                          {(this.files[i].parseErrors && this.files[i].parseErrors.length > 0 ?
                            this.renderParseErrors(i)
                          :
                            <div>
                              {(this.state.fileFormats[i] === 'magic' && this.files[i].data && this.files[i].tableNames ?
                                  this.files[i].data.map((table, j) =>
                                    <div key={j}>
                                      <div className="ui divider"></div>
                                      {this.renderDataImporter(i, j, this.files[i].data[j], this.files[i].tableNames[j], "2")}
                                    </div>
                                  ) : undefined
                              )}
                              {(this.state.fileFormats[i] === 'tsv' && this.files[i].data ?
                                  <div>
                                    <div className="ui divider"></div>
                                    {this.renderDataImporter(i, 1, this.files[i].data)}
                                  </div> : undefined
                              )}
                              {(this.state.fileFormats[i] === 'csv' && this.files[i].data ?
                                  <div>
                                    <div className="ui divider"></div>
                                    {this.renderDataImporter(i, 1, this.files[i].data)}
                                  </div> : undefined
                              )}
                              {(this.state.fileFormats[i] === 'xls' && this.files[i].workbook && this.files[i].data && this.files[i].tableNames ?
                                  this.files[i].data.map((table, j) =>
                                    <div key={j}>
                                      <div className="ui divider"></div>
                                      {this.renderDataImporter(i, j, this.files[i].data[j], this.files[i].tableNames[j])}
                                    </div>
                                  ) : undefined
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }) : undefined}
              </div>
            </div>
            <div className="title"></div>
            <div ref="upload step message" className="content upload-step-content">
              {step === 3 ? <div className="ui items">
                <div className="item">
                  <div className="ui image">
                    <div className="icon loader wrapper">
                      <div className={(this.state.uploading ? 'active ' : '') + 'ui inverted dimmer'}>
                        <div className="ui loader"></div>
                      </div>
                      <i className="file icons">
                        <i className="fitted file text outline icon"></i>
                        {(this.state.uploadErrors ? <i className="corner red warning circle icon"></i>
                            : (this.state.uploaded ? <i className="corner green check circle icon"></i> : <i className="corner plus icon"></i>)
                        )}
                      </i>
                    </div>
                  </div>
                  <div className="content">
                    <div className="ui labeled fluid action input">
                      <div className="ui label">
                        Upload To
                      </div>
                      <div ref="private contributions" className="ui fluid selection dropdown">
                        <input name="_id" type="hidden" value={this.state._id}/>
                        <i className="dropdown icon"/>
                        <div className="text">A New Private Contribution</div>
                        <div className="menu">
                          <div data-value="" className="item">
                            A New Private Contribution
                          </div>
                          {Collections['magic.private.contributions'].find({_contributor: '@' + Cookies.get('user_id'), _activated: false}, {'_inserted': -1}).fetch().map((c, i) =>
                            <div key={i} data-value={c._id} className="item">
                              <span className="description">{moment(c._inserted).calendar()}</span>
                              <span className="text">{c._name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <br/>
                    <div>
                      <div className={"ui labeled fluid input" + (this.state._name.length > 0 ? '' : ' error') + (this.state._id ? ' disabled' : '')}>
                        <div className={"ui label" + (this.state._name.length > 0 ? '' : ' red')}>
                          Temporary Private Contribution Name
                        </div>
                        <input ref="contribution name" type="text" default="None" value={this.state._name}
                               onChange={(e) => {
                                 this.setState({_name: this.refs['contribution name'].value})}}/>
                      </div>
                    </div>
                    <br/>
                    {(this.state.uploaded ?
                      <a className="ui fluid green button"
                         href="/MagIC/private">
                        View Your Private Workspace
                      </a>
                    :
                      <div className={'ui fluid purple button' + (this.state._name.length > 0 && !this.state.uploading ? '' : ' disabled')}
                           onClick={this.upload.bind(this)}>
                        Upload to {this.state._id ? 'your existing private contribution: ' + this.state._existing_contribution._name : 'a new private contribution: ' + this.state._name}
                      </div>
                    )}
                    {(this.summary || this.contribution ?
                      <div>
                        <div className="ui horizontal divider">
                          <span className="content">
                            Upload Details
                          </span>
                        </div>
                        <div className="ui basic segment">
                          {this.state._existing_contribution && this.state._existing_summary ?
                            <div className="ui two column very relaxed stackable grid">
                              <div className="center aligned column">
                                <div className="ui small header">
                                  {this.state._id ? this.state._existing_contribution._name : this.state._name} Before Upload
                                </div>
                                <br/>
                                {this.renderDetails(this.state._existing_contribution, this.state._existing_summary)}
                              </div>
                              <div className="ui vertical divider">
                                <i className="circle arrow right icon"></i>
                              </div>
                              <div className="center aligned column">
                                <div className="ui small header">
                                  {this.state._id ? this.state._existing_contribution._name : this.state._name} After Upload
                                </div>
                                <br/>
                                {this.renderDetails(this.contribution, this.summary)}
                              </div>
                            </div>
                          :
                            <div className="ui one column very relaxed stackable grid">
                              <div className="center aligned column">
                                {this.renderDetails(this.contribution, this.summary)}
                              </div>
                            </div>
                          }

                        </div>
                        {/* The ui segment thinks it's the last segment because of the wrapping <div> for React. */}
                        <div></div>
                      </div> : undefined)}
                  </div>
                </div>
              </div> : undefined}
            </div>
          </div>
        </div>
        {(step === 1 ?
          <div className="ui bottom attached icon message">
            <i className="purple circle info icon"/>
            <div className="content">
              The selected file or files can be partial or complete contributions.
            </div>
          </div>
          : undefined)}
        {(step === 2 && this.state.totalReadErrors > 0 ?
          <div className="ui bottom attached icon error message">
            <i className="warning sign icon"/>
            <div className="content">
              The selected {this.files.length === 1 ? ' file could not' : ' files could not all'} be read.
            </div>
          </div>
          : undefined)}
        {(step === 2 && this.state.totalReadErrors == 0 && this.state.totalParseErrors > 0 ?
          <div className="ui bottom attached icon error message">
            <i className="warning sign icon"/>
            <div className="content">
              The selected {this.files.length === 1 ? ' file could not' : ' files could not all'} be parsed.
              Please change the <b>Parse As</b> format.
            </div>
          </div>
          : undefined)}
        {(step === 2 && this.state.totalReadErrors == 0 && this.state.totalParseErrors == 0 && this.state.totalImportErrors > 0 ?
          <div className="ui bottom attached icon error message">
            <i className="warning sign icon"/>
            <div className="content">
              The selected {this.files.length === 1 ? ' file could not' : ' files could not all'} be imported.
              Please address the list of errors.
            </div>
          </div>
          : undefined)}
        {(step === 2 &&
            this.state.totalReadErrors == 0 &&
            this.state.totalParseErrors == 0 &&
            this.state.totalImportErrors == 0 ?
          <div className="ui bottom attached icon success message">
            <i className="check circle icon"></i>
            <div className="content">
              The selected {this.files.length === 1 ? ' file was' : ' files were'} parsed successfully.
            </div>
            <div className="ui right floated purple button" onClick={this.reviewUpload.bind(this)}>
              Upload
            </div>
          </div>
          : undefined)}
        {(step === 3 && !this.state.uploading && !this.state.uploaded ?
          <div className="ui bottom attached icon message">
            <i className="purple circle info icon"/>
            <div className="content">
              Select where to upload the {this.files.length === 1 ? ' file' : ' files'} to in your private workspace.
            </div>
          </div>
          : undefined)}
        {(step === 3 && this.state.uploading ?
          <div className="ui bottom attached icon message">
            <i className="purple circle info icon"/>
            <div className="content">
              Uploading the {this.files.length === 1 ? ' file' : ' files'} to
              {this.state._id ? ' your existing ' : ' a new '}
              private contribution called <b>{this.state._name}</b>.
            </div>
          </div>
          : undefined)}
        {(step === 3 && this.state.uploadError ?
          <div className="ui bottom attached icon error message">
            <i className="warning sign icon"></i>
            <div className="content">
              Failed to upload the {this.files.length === 1 ? ' file' : ' files'} to
              {this.state._id ? ' your existing ' : ' a new '}
              private contribution called <b>{this.state._name}</b>. Error: {this.state.uploadError.error}
            </div>
          </div>
          : undefined)}
        {(step === 3 && this.state.uploaded ?
          <div className="ui bottom attached icon success message">
            <i className="check circle icon"></i>
            <div className="content">
              The {this.files.length === 1 ? ' file was' : ' files were'} uploaded successfully to
              {this.state._id ? ' your existing ' : ' a new '}
              private contribution called <b>{this.state._name}</b>.
            </div>
          </div>
          : undefined)}
      </div>
    )
  }

}

const examples = {
  'MagIC Text File in Data Model v. 3.0':
`tab delimited\tcontribution
id\tversion\ttimestamp\tcontributor\tmagic_version\tdoi
10747\t6\t2015-07-09T02:20:01.000Z\t@magic\t3.0\t10.1029/93JB00024
>>>>>>>>>>
tab delimited\tlocations
location\tlocation_type\tlocation_alternatives\tresult_name\tresult_type\tcitations\tlat_s\tlat_n\tlon_w\tlon_e\tage\tage_sigma\tage_low\tage_high\tage_unit\tdir_tilt_correction\tdir_dec\tdir_inc\tdir_alpha95\tdir_k\tdir_n_samples\tpole_lat\tpole_lon\tpole_dp\tpole_dm\tdescription\tsoftware_packages
Hawaii\tOutcrop\t:Hawaiian Holocene Lavas:\tHawaiian Holocene Lavas\ta\t:This study:\t19.072\t19.58\t204.44\t204.92\t0.5\t0.5\t0\t1\tYears BP\t100\t2.40\t31.6\t4.7\t40.7\t284\t86.8\t339.50\t3\t5.3\tfrom DRAGON DATABASE 10-07-07.\t:GPMDB:
>>>>>>>>>>
tab delimited\tsites
site\tlocation\tresult_type\tmethod_codes\tcitations\tgeologic_classes\tgeologic_types\tlithologies\tlat\tlon\tage\tage_sigma\tage_unit\tdir_tilt_correction\tdir_dec\tdir_inc\tdir_alpha95\tdir_k\tdir_n_specimens\tdir_polarity\tdir_nrm_origin\tvgp_lat\tvgp_lon\tvdm\tvdm_n_samples\tvadm\tvadm_n_samples\tint_abs\tint_abs_sigma\tdescription\tsoftware_packages
01a\tHawaii\t\t\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t
01b\tHawaii\t\t\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t
01c\tHawaii\t\t\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t
2\tHawaii\t\t\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t
2\tHawaii\ti\t:DE-BFL:\t:This study:\t\t\t\t19.552\t204.70\t440\t240\tYears BP\t100\t7.60\t36.6\t1.1\t1662\t12\tn\tp\t82.9\t287.40\t1.06E+23\t4\t1.07E+23\t4\t4.79E-05\t6.00E-07\t2\t:PINT03:
3\tHawaii\ti\t:DE-BFL:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.296\t204.69\t700\t210\tYears BP\t100\t2.80\t41.4\t1.2\t905\t18\tn\tp\t84.8\t234.30\t9.42E+22\t2\t9.97E+22\t2\t4.45E-05\t1.20E-06\t3\t:PINT03:
4\tHawaii\ti\t:DE-BFL:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.494\t204.66\t760\t210\tYears BP\t100\t353.00\t25.8\t1.6\t849\t11\tn\tp\t81.1\t74.50\t1.05E+23\t2\t9.86E+22\t2\t4.41E-05\t8.00E-07\t4\t:PINT03:
5\tHawaii\ti\t:DE-BFL:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.564\t204.66\t1320\t150\tYears BP\t100\t2.20\t18.2\t2.2\t400\t12\tn\tp\t79.6\t12.80\t1.03E+23\t4\t9.27E+22\t4\t4.15E-05\t3.60E-06\t5\t:PINT03:
6\tHawaii\ti\t:DE-BFL:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.533\t204.65\t1690\t210\tYears BP\t100\t355.50\t17.8\t1.9\t679\t10\tn\tp\t78.7\t48.00\t9.71E+22\t4\t8.71E+22\t4\t3.90E-05\t3.10E-06\t6\t:PINT03:
7\tHawaii\ti\t:DE-BFL:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.118\t204.43\t2180\t180\tYears BP\t100\t11.20\t14.7\t2.1\t439\t12\tn\tp\t74.1\t340.00\t1.21E+23\t4\t1.08E+23\t4\t4.81E-05\t1.23E-05\t7\t:PINT03:
8\tHawaii\ti\t:DE-BFL:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.455\t204.71\t2190\t210\tYears BP\t100\t11.30\t15.2\t1.3\t1095\t12\tn\tp\t74\t340.00\t1.21E+23\t4\t1.08E+23\t4\t4.81E-05\t1.23E-05\t8\t:PINT03:
9\tHawaii\ti\t:DE-BFL:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.538\t204.66\t2550\t240\tYears BP\t100\t1.20\t21\t1.5\t987\t12\tn\tp\t81.3\t16.90\t1.07E+23\t4\t9.74E+22\t4\t4.36E-05\t2.30E-06\t9\t:PINT03:
10\tHawaii\ti\t:DE-BFL:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.64\t204.96\t2890\t210\tYears BP\t100\t357.70\t25.7\t2.3\t370\t11\tn\tp\t83.5\t44.90\t1.24E+23\t5\t1.15E+23\t5\t5.17E-05\t1.16E-05\t10\t:PINT03:
11\tHawaii\ti\t:DE-BFL:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.302\t204.69\t3480\t240\tYears BP\t100\t3.70\t36.4\t1.4\t1091\t12\tn\tp\t86.4\t279.50\t1.06E+23\t2\t1.07E+23\t2\t4.79E-05\t1.03E-05\t11\t:PINT03:
12\tHawaii\ti\t:DE-BFL:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.713\t204.88\t4050\t150\tYears BP\t100\t4.50\t33.4\t1.1\t1467\t11\tn\tp\t85.5\t313.10\t1.15E+23\t3\t1.13E+23\t3\t5.06E-05\t1.70E-06\t12\t:PINT03:
13\tHawaii\ti\t:DE-BFL:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.161\t204.46\t5160\t300\tYears BP\t100\t4.70\t27.6\t2\t493\t12\tn\tp\t83.6\t339.20\t8.54E+22\t5\t8.10E+22\t5\t3.61E-05\t2.60E-06\t13\t:PINT03:
14\tHawaii\ti\t:DE-BFL:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.543\t204.88\t5650\t270\tYears BP\t100\t5.40\t33.7\t1.4\t958\t12\tn\tp\t84.8\t305.80\t7.67E+22\t3\t7.57E+22\t3\t3.39E-05\t2.50E-06\t14\t:PINT03:
15\tHawaii\ti\t:DE-BFL:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.086\t204.41\t6160\t330\tYears BP\t100\t357.80\t54.9\t1.7\t819\t12\tn\tp\t73.5\t198.10\t6.41E+22\t2\t7.91E+22\t2\t3.52E-05\t3.50E-06\t15\t:PINT03:
16\tHawaii\ti\t:DE-BFL:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.072\t204.44\t7300\t300\tYears BP\t100\t2.30\t25.4\t1.4\t914\t10\tn\tp\t83.9\t3.00\t6.47E+22\t4\t6.02E+22\t4\t2.70E-05\t2.10E-06\t16\t:PINT03:
17\tHawaii\ti\t:DE-BFL:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.145\t204.48\t7950\t330\tYears BP\t100\t359.50\t33.4\t1.5\t917\t12\tn\tp\t89\t53.10\t6.97E+22\t3\t6.89E+22\t3\t3.07E-05\t1.10E-06\t17\t:PINT03:
18\tHawaii\ti\t:DE-BFL:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.42\t204.66\t8740\t300\tYears BP\t100\t357.30\t36\t2.3\t413\t11\tn\tp\t87.4\t127.20\t9.91E+22\t5\t9.98E+22\t5\t4.46E-05\t6.90E-06\t18\t:PINT03:
19\tHawaii\ti\t:DE-BFL:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.418\t204.66\t9500\t420\tYears BP\t100\t3.00\t33.7\t2.3\t351\t11\tn\tp\t87\t313.60\t9.30E+22\t5\t9.19E+22\t5\t4.11E-05\t4.90E-06\t19\t:PINT03:
20\tHawaii\ti\t:DE-BFL:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.101\t204.44\t10290\t450\tYears BP\t100\t3.60\t31.9\t1.8\t570\t12\tn\tp\t86.1\t322.00\t8.26E+22\t5\t8.08E+22\t5\t3.60E-05\t8.40E-06\t20\t:PINT03:
21\tHawaii\ti\t:DE-BFL:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t18.972\t204.38\t11780\t300\tYears BP\t100\t2.10\t8.7\t1.7\t738\t12\tn\tp\t75.2\t16.20\t8.55E+22\t3\t7.51E+22\t3\t3.34E-05\t5.00E-06\t21\t:PINT03:
22\tHawaii\t\t\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t
01a\tHawaii\ti\t:DE-BFL:\t:This study:\t\t\t\t19.545\t204.91\t260\t210\tYears BP\t100\t5.50\t41.3\t1.7\t630\t12\tn\tp\t83.4\t254.60\t1.11E+23\t4\t1.17E+23\t4\t5.26E-05\t5.30E-06\t01a\t:PINT03:
01b\tHawaii\ti\t:DE-BFL:\t:This study:\t\t\t\t19.58\t204.94\t260\t210\tYears BP\t100\t3.20\t44.2\t1.4\t906\t12\tn\tp\t83\t229.20\t1.11E+23\t4\t1.17E+23\t4\t5.26E-05\t5.30E-06\t01b\t:PINT03:
01c\tHawaii\ti\t:DE-BFL:\t:This study:\t\t\t\t19.572\t204.94\t260\t210\tYears BP\t100\t3.10\t46\t2.1\t418\t12\tn\tp\t81.7\t224.10\t1.11E+23\t4\t1.17E+23\t4\t5.26E-05\t5.30E-06\t01c\t:PINT03:
22\tHawaii\ti\t:DE-BFL:\t:This study:\t\t\t\t19.072\t204.44\t13210\t570\tYears BP\t100\t357.50\t54.6\t1.4\t916\t11\tn\tp\t73.8\t197.20\t6.93E+22\t4\t8.51E+22\t4\t3.79E-05\t3.40E-06\t22\t:PINT03:
>>>>>>>>>>
tab delimited\tsamples
sample\tsite\tcitations\tgeologic_classes\tgeologic_types\tlithologies\tlat\tlon
1B475-2\t3\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.296\t204.69
1B487-3\t3\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.296\t204.69
1B704-1\t9\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.538\t204.66
1B708-3\t9\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.538\t204.66
1B710-1\t9\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.538\t204.66
1B714-3\t9\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.538\t204.66
1B730-1\t6\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.533\t204.65
1B732-2\t6\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.533\t204.65
1B733-1\t6\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.533\t204.65
1B734-2\t6\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.533\t204.65
1B755-1\t4\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.494\t204.66
1B757-3\t4\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.494\t204.66
8B416-4\t11\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.302\t204.69
8B417-1\t11\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.302\t204.69
8B437-5\t12\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.713\t204.88
8B439-2\t12\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.713\t204.88
8B440-2\t12\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.713\t204.88
8B625-1\t8\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.455\t204.71
8B631-1\t8\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.455\t204.71
8B794-2\t01a\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.545\t204.91
8B829-2\t2\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.552\t204.70
8B833-4\t2\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.552\t204.70
8B835-2\t2\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.552\t204.70
8B836-3\t2\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.552\t204.70
8B889-4\t7\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.118\t204.43
8B891-4\t7\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.118\t204.43
8B896-2\t7\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.118\t204.43
8B897-4\t7\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.118\t204.43
8B906-1\t14\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.543\t204.88
8B907-2\t14\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.543\t204.88
8B910-3\t14\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.543\t204.88
9B039-2\t10\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.64\t204.96
9B040-1\t10\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.64\t204.96
9B041-3\t10\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.64\t204.96
9B042-3\t10\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.64\t204.96
9B046-3\t10\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.64\t204.96
9B109-2\t5\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.564\t204.66
9B110-4\t5\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.564\t204.66
9B113-4\t5\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.564\t204.66
9B117-2\t5\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.564\t204.66
9B131-5\t01b\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.58\t204.94
9B433-5\t01c\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.572\t204.94
9B437-5\t01c\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.572\t204.94
9B445-3\t13\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.161\t204.46
9B448-4\t13\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.161\t204.46
9B449-2\t13\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.161\t204.46
9B451-2\t13\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.161\t204.46
9B454-4\t13\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.161\t204.46
9B483-2\t20\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.101\t204.44
9B486-4\t20\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.101\t204.44
9B489-2\t20\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.101\t204.44
9B490-3\t20\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.101\t204.44
9B492-4\t20\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.101\t204.44
9B659-2\t15\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.086\t204.41
9B660-4\t15\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.086\t204.41
9B666-3\t17\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.145\t204.48
9B669-2\t17\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.145\t204.48
9B670-2\t17\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.145\t204.48
9B902-3\t21\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t18.972\t204.38
9B904-2\t21\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t18.972\t204.38
9B905-2\t21\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t18.972\t204.38
9B937-2\t18\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.42\t204.66
9B944-1\t18\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.42\t204.66
9B945-3\t18\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.42\t204.66
9B947-2\t18\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.42\t204.66
9B948-1\t18\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.42\t204.66
9B949-2\t19\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.418\t204.66
9B950-3\t19\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.418\t204.66
9B953-3\t19\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.418\t204.66
9B955-2\t19\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.418\t204.66
9B959-3\t19\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.418\t204.66
9B961-2\t16\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.072\t204.44
9B962-3\t16\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.072\t204.44
9B964-1\t16\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.072\t204.44
9B965-2\t16\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.072\t204.44
9B975-2\t22\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.072\t204.44
9B976-1\t22\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.072\t204.44
9B977-1\t22\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.072\t204.44
9B984-2\t22\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t19.072\t204.44
>>>>>>>>>>
tab delimited\tspecimens
specimen\tsample\tresult_quality\tmethod_codes\tcitations\tgeologic_classes\tgeologic_types\tlithologies\tmagn_volume\tint_corr\tint_treat_dc_field
1B475-2\t1B475-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t5.39\tu\t3.5e-05
1B487-3\t1B487-3\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t6.67\tu\t3.5e-05
1B704-1\t1B704-1\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t16.4\tu\t3.5e-05
1B708-3\t1B708-3\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t6.04\tu\t3.5e-05
1B710-1\t1B710-1\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t11.3\tu\t3.5e-05
1B714-3\t1B714-3\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t23.5\tu\t3.5e-05
1B730-1\t1B730-1\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t16.2\tu\t3.5e-05
1B732-2\t1B732-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t27.2\tu\t3.5e-05
1B733-1\t1B733-1\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t17.9\tu\t3.5e-05
1B734-2\t1B734-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t18.1\tu\t3.5e-05
1B755-1\t1B755-1\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t14.3\tu\t3.5e-05
1B757-3\t1B757-3\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t21.1\tu\t3.5e-05
8B416-4\t8B416-4\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t6.01\tu\t3.5e-05
8B417-1\t8B417-1\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t12.3\tu\t3.5e-05
8B437-5\t8B437-5\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t11.4\tu\t3.5e-05
8B439-2\t8B439-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t11.7\tu\t3.5e-05
8B440-2\t8B440-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t20\tu\t3.5e-05
8B625-1\t8B625-1\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t7.41\tu\t3.5e-05
8B631-1\t8B631-1\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t4.43\tu\t3.5e-05
8B794-2\t8B794-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t10.5\tu\t3.5e-05
8B829-2\t8B829-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t17.8\tu\t3.5e-05
8B833-4\t8B833-4\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t22.9\tu\t3.5e-05
8B835-2\t8B835-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t26\tu\t3.5e-05
8B836-3\t8B836-3\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t20.6\tu\t3.5e-05
8B889-4\t8B889-4\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t10\tu\t3.5e-05
8B891-4\t8B891-4\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t12.7\tu\t3.5e-05
8B896-2\t8B896-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t8.95\tu\t3.5e-05
8B897-4\t8B897-4\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t23.3\tu\t3.5e-05
8B906-1\t8B906-1\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t4.25\tu\t3.5e-05
8B907-2\t8B907-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t5.89\tu\t3.5e-05
8B910-3\t8B910-3\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t5.57\tu\t3.5e-05
9B039-2\t9B039-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t6.42\tu\t3.5e-05
9B040-1\t9B040-1\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t6.92\tu\t3.5e-05
9B041-3\t9B041-3\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t6.76\tu\t3.5e-05
9B042-3\t9B042-3\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t5.96\tu\t3.5e-05
9B046-3\t9B046-3\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t16.5\tu\t3.5e-05
9B109-2\t9B109-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t12.6\tu\t3.5e-05
9B110-4\t9B110-4\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t14.9\tu\t3.5e-05
9B113-4\t9B113-4\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t7.02\tu\t3.5e-05
9B117-2\t9B117-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t23.5\tu\t3.5e-05
9B131-5\t9B131-5\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t5.94\tu\t3.5e-05
9B433-5\t9B433-5\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t3.9\tu\t3.5e-05
9B437-5\t9B437-5\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t3.34\tu\t3.5e-05
9B445-3\t9B445-3\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t9.8\tu\t3.5e-05
9B448-4\t9B448-4\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t18.1\tu\t3.5e-05
9B449-2\t9B449-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t12.7\tu\t3.5e-05
9B451-2\t9B451-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t14.7\tu\t3.5e-05
9B454-4\t9B454-4\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t14.2\tu\t3.5e-05
9B483-2\t9B483-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t9.39\tu\t3.5e-05
9B486-4\t9B486-4\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t7.75\tu\t3.5e-05
9B489-2\t9B489-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t9.26\tu\t3.5e-05
9B490-3\t9B490-3\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t8.58\tu\t3.5e-05
9B492-4\t9B492-4\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t6.22\tu\t3.5e-05
9B659-2\t9B659-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t6.39\tu\t3.5e-05
9B660-4\t9B660-4\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t11.5\tu\t3.5e-05
9B666-3\t9B666-3\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t5.14\tu\t3.5e-05
9B669-2\t9B669-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t10.1\tu\t3.5e-05
9B670-2\t9B670-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t5.8\tu\t3.5e-05
9B902-3\t9B902-3\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t7.68\tu\t3.5e-05
9B904-2\t9B904-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t4.12\tu\t3.5e-05
9B905-2\t9B905-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t8.64\tu\t3.5e-05
9B937-2\t9B937-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t1.5\tu\t3.5e-05
9B944-1\t9B944-1\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t16.2\tu\t3.5e-05
9B945-3\t9B945-3\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t9.32\tu\t3.5e-05
9B947-2\t9B947-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t6.12\tu\t3.5e-05
9B948-1\t9B948-1\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t14.6\tu\t3.5e-05
9B949-2\t9B949-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t9.27\tu\t3.5e-05
9B950-3\t9B950-3\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t16.3\tu\t3.5e-05
9B953-3\t9B953-3\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t9.29\tu\t3.5e-05
9B955-2\t9B955-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t10.1\tu\t3.5e-05
9B959-3\t9B959-3\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t18.5\tu\t3.5e-05
9B961-2\t9B961-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t9.58\tu\t3.5e-05
9B962-3\t9B962-3\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t7.23\tu\t3.5e-05
9B964-1\t9B964-1\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t9.84\tu\t3.5e-05
9B965-2\t9B965-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t3.39\tu\t3.5e-05
9B975-2\t9B975-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t10.8\tu\t3.5e-05
9B976-1\t9B976-1\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t6.83\tu\t3.5e-05
9B977-1\t9B977-1\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t4.04\tu\t3.5e-05
9B984-2\t9B984-2\tg\t:LP-PI-ALT-PTRM:LP-PI-TRM:\t:This study:\t:Extrusive:Igneous:\t:Lava Flow:\t:Not Specified:\t13.6\tu\t3.5e-05
>>>>>>>>>>
tab delimited\tages
location\tsite\tage\tage_sigma\tage_unit\tmethod_codes\tcitations
Hawaii\t01a\t260\t210\tYears BP\t:GM-C14:\t:This study:
Hawaii\t01b\t260\t210\tYears BP\t:GM-C14:\t:This study:
Hawaii\t01c\t260\t210\tYears BP\t:GM-C14:\t:This study:
Hawaii\t2\t440\t240\tYears BP\t:GM-C14:\t:This study:
Hawaii\t3\t700\t210\tYears BP\t:GM-C14:\t:This study:
Hawaii\t4\t760\t210\tYears BP\t:GM-C14:\t:This study:
Hawaii\t5\t1320\t150\tYears BP\t:GM-C14:\t:This study:
Hawaii\t6\t1690\t210\tYears BP\t:GM-C14:\t:This study:
Hawaii\t7\t2180\t180\tYears BP\t:GM-C14:\t:This study:
Hawaii\t8\t2190\t210\tYears BP\t:GM-C14:\t:This study:
Hawaii\t9\t2550\t240\tYears BP\t:GM-C14:\t:This study:
Hawaii\t10\t2890\t210\tYears BP\t:GM-C14:\t:This study:
Hawaii\t11\t3480\t240\tYears BP\t:GM-C14:\t:This study:
Hawaii\t12\t4050\t150\tYears BP\t:GM-C14:\t:This study:
Hawaii\t13\t5160\t300\tYears BP\t:GM-C14:\t:This study:
Hawaii\t14\t5650\t270\tYears BP\t:GM-C14:\t:This study:
Hawaii\t15\t6160\t330\tYears BP\t:GM-C14:\t:This study:
Hawaii\t16\t7300\t300\tYears BP\t:GM-C14:\t:This study:
Hawaii\t17\t7950\t330\tYears BP\t:GM-C14:\t:This study:
Hawaii\t18\t8740\t300\tYears BP\t:GM-C14:\t:This study:
Hawaii\t19\t9500\t420\tYears BP\t:GM-C14:\t:This study:
Hawaii\t20\t10290\t450\tYears BP\t:GM-C14:\t:This study:
Hawaii\t21\t11780\t300\tYears BP\t:GM-C14:\t:This study:
Hawaii\t22\t13210\t570\tYears BP\t:GM-C14:\t:This study:`,
  'MagIC Text File in Data Model v. 2.5':
`tab\tcontribution
id\tdoi\tversion\ttimestamp\tmagic_version\tcontributor\tauthor\tdescription
10747\t10.1029/93JB00024\t6\t2015-07-09T02:20:01.000Z\t2.5\t@magic\t\t
>>>>>>>>>>
tab \ter_locations
location_type\ter_citation_names\tlocation_end_lat\tlocation_begin_lon\ter_location_name\ter_location_alternatives\tlocation_begin_lat\tlocation_end_lon
Outcrop\tThis study\t19.58\t204.44\tHawaii\tHawaiian Holocene Lavas\t19.072\t204.92
>>>>>>>>>>
tab \ter_samples
er_citation_names\tsample_lithology\ter_site_name\ter_sample_name\tsample_lat\ter_location_name\tsample_type\tsample_lon\tsample_class
This study\tNot Specified\t01a\t8B794-2\t19.545\tHawaii\tLava Flow\t204.91\tIgneous : Extrusive
This study\tNot Specified\t01b\t9B131-5\t19.58\tHawaii\tLava Flow\t204.94\tIgneous : Extrusive
This study\tNot Specified\t01c\t9B433-5\t19.572\tHawaii\tLava Flow\t204.94\tIgneous : Extrusive
This study\tNot Specified\t01c\t9B437-5\t19.572\tHawaii\tLava Flow\t204.94\tIgneous : Extrusive
This study\tNot Specified\t2\t8B829-2\t19.552\tHawaii\tLava Flow\t204.70\tIgneous : Extrusive
This study\tNot Specified\t2\t8B833-4\t19.552\tHawaii\tLava Flow\t204.70\tIgneous : Extrusive
This study\tNot Specified\t2\t8B835-2\t19.552\tHawaii\tLava Flow\t204.70\tIgneous : Extrusive
This study\tNot Specified\t2\t8B836-3\t19.552\tHawaii\tLava Flow\t204.70\tIgneous : Extrusive
This study\tNot Specified\t3\t1B475-2\t19.296\tHawaii\tLava Flow\t204.69\tIgneous : Extrusive
This study\tNot Specified\t3\t1B487-3\t19.296\tHawaii\tLava Flow\t204.69\tIgneous : Extrusive
This study\tNot Specified\t4\t1B755-1\t19.494\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t4\t1B757-3\t19.494\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t5\t9B109-2\t19.564\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t5\t9B110-4\t19.564\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t5\t9B113-4\t19.564\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t5\t9B117-2\t19.564\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t6\t1B730-1\t19.533\tHawaii\tLava Flow\t204.65\tIgneous : Extrusive
This study\tNot Specified\t6\t1B732-2\t19.533\tHawaii\tLava Flow\t204.65\tIgneous : Extrusive
This study\tNot Specified\t6\t1B733-1\t19.533\tHawaii\tLava Flow\t204.65\tIgneous : Extrusive
This study\tNot Specified\t6\t1B734-2\t19.533\tHawaii\tLava Flow\t204.65\tIgneous : Extrusive
This study\tNot Specified\t7\t8B889-4\t19.118\tHawaii\tLava Flow\t204.43\tIgneous : Extrusive
This study\tNot Specified\t7\t8B891-4\t19.118\tHawaii\tLava Flow\t204.43\tIgneous : Extrusive
This study\tNot Specified\t7\t8B896-2\t19.118\tHawaii\tLava Flow\t204.43\tIgneous : Extrusive
This study\tNot Specified\t7\t8B897-4\t19.118\tHawaii\tLava Flow\t204.43\tIgneous : Extrusive
This study\tNot Specified\t8\t8B625-1\t19.455\tHawaii\tLava Flow\t204.71\tIgneous : Extrusive
This study\tNot Specified\t8\t8B631-1\t19.455\tHawaii\tLava Flow\t204.71\tIgneous : Extrusive
This study\tNot Specified\t9\t1B704-1\t19.538\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t9\t1B708-3\t19.538\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t9\t1B710-1\t19.538\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t9\t1B714-3\t19.538\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t10\t9B039-2\t19.64\tHawaii\tLava Flow\t204.96\tIgneous : Extrusive
This study\tNot Specified\t10\t9B040-1\t19.64\tHawaii\tLava Flow\t204.96\tIgneous : Extrusive
This study\tNot Specified\t10\t9B041-3\t19.64\tHawaii\tLava Flow\t204.96\tIgneous : Extrusive
This study\tNot Specified\t10\t9B042-3\t19.64\tHawaii\tLava Flow\t204.96\tIgneous : Extrusive
This study\tNot Specified\t10\t9B046-3\t19.64\tHawaii\tLava Flow\t204.96\tIgneous : Extrusive
This study\tNot Specified\t11\t8B416-4\t19.302\tHawaii\tLava Flow\t204.69\tIgneous : Extrusive
This study\tNot Specified\t11\t8B417-1\t19.302\tHawaii\tLava Flow\t204.69\tIgneous : Extrusive
This study\tNot Specified\t12\t8B437-5\t19.713\tHawaii\tLava Flow\t204.88\tIgneous : Extrusive
This study\tNot Specified\t12\t8B439-2\t19.713\tHawaii\tLava Flow\t204.88\tIgneous : Extrusive
This study\tNot Specified\t12\t8B440-2\t19.713\tHawaii\tLava Flow\t204.88\tIgneous : Extrusive
This study\tNot Specified\t13\t9B445-3\t19.161\tHawaii\tLava Flow\t204.46\tIgneous : Extrusive
This study\tNot Specified\t13\t9B448-4\t19.161\tHawaii\tLava Flow\t204.46\tIgneous : Extrusive
This study\tNot Specified\t13\t9B449-2\t19.161\tHawaii\tLava Flow\t204.46\tIgneous : Extrusive
This study\tNot Specified\t13\t9B451-2\t19.161\tHawaii\tLava Flow\t204.46\tIgneous : Extrusive
This study\tNot Specified\t13\t9B454-4\t19.161\tHawaii\tLava Flow\t204.46\tIgneous : Extrusive
This study\tNot Specified\t14\t8B906-1\t19.543\tHawaii\tLava Flow\t204.88\tIgneous : Extrusive
This study\tNot Specified\t14\t8B907-2\t19.543\tHawaii\tLava Flow\t204.88\tIgneous : Extrusive
This study\tNot Specified\t14\t8B910-3\t19.543\tHawaii\tLava Flow\t204.88\tIgneous : Extrusive
This study\tNot Specified\t15\t9B659-2\t19.086\tHawaii\tLava Flow\t204.41\tIgneous : Extrusive
This study\tNot Specified\t15\t9B660-4\t19.086\tHawaii\tLava Flow\t204.41\tIgneous : Extrusive
This study\tNot Specified\t16\t9B961-2\t19.072\tHawaii\tLava Flow\t204.44\tIgneous : Extrusive
This study\tNot Specified\t16\t9B962-3\t19.072\tHawaii\tLava Flow\t204.44\tIgneous : Extrusive
This study\tNot Specified\t16\t9B964-1\t19.072\tHawaii\tLava Flow\t204.44\tIgneous : Extrusive
This study\tNot Specified\t16\t9B965-2\t19.072\tHawaii\tLava Flow\t204.44\tIgneous : Extrusive
This study\tNot Specified\t17\t9B666-3\t19.145\tHawaii\tLava Flow\t204.48\tIgneous : Extrusive
This study\tNot Specified\t17\t9B669-2\t19.145\tHawaii\tLava Flow\t204.48\tIgneous : Extrusive
This study\tNot Specified\t17\t9B670-2\t19.145\tHawaii\tLava Flow\t204.48\tIgneous : Extrusive
This study\tNot Specified\t18\t9B937-2\t19.42\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t18\t9B944-1\t19.42\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t18\t9B945-3\t19.42\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t18\t9B947-2\t19.42\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t18\t9B948-1\t19.42\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t19\t9B949-2\t19.418\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t19\t9B950-3\t19.418\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t19\t9B953-3\t19.418\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t19\t9B955-2\t19.418\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t19\t9B959-3\t19.418\tHawaii\tLava Flow\t204.66\tIgneous : Extrusive
This study\tNot Specified\t20\t9B483-2\t19.101\tHawaii\tLava Flow\t204.44\tIgneous : Extrusive
This study\tNot Specified\t20\t9B486-4\t19.101\tHawaii\tLava Flow\t204.44\tIgneous : Extrusive
This study\tNot Specified\t20\t9B489-2\t19.101\tHawaii\tLava Flow\t204.44\tIgneous : Extrusive
This study\tNot Specified\t20\t9B490-3\t19.101\tHawaii\tLava Flow\t204.44\tIgneous : Extrusive
This study\tNot Specified\t20\t9B492-4\t19.101\tHawaii\tLava Flow\t204.44\tIgneous : Extrusive
This study\tNot Specified\t21\t9B902-3\t18.972\tHawaii\tLava Flow\t204.38\tIgneous : Extrusive
This study\tNot Specified\t21\t9B904-2\t18.972\tHawaii\tLava Flow\t204.38\tIgneous : Extrusive
This study\tNot Specified\t21\t9B905-2\t18.972\tHawaii\tLava Flow\t204.38\tIgneous : Extrusive
This study\tNot Specified\t22\t9B975-2\t19.072\tHawaii\tLava Flow\t204.44\tIgneous : Extrusive
This study\tNot Specified\t22\t9B976-1\t19.072\tHawaii\tLava Flow\t204.44\tIgneous : Extrusive
This study\tNot Specified\t22\t9B977-1\t19.072\tHawaii\tLava Flow\t204.44\tIgneous : Extrusive
This study\tNot Specified\t22\t9B984-2\t19.072\tHawaii\tLava Flow\t204.44\tIgneous : Extrusive
>>>>>>>>>>
tab \ter_specimens
er_citation_names\tspecimen_class\ter_site_name\ter_sample_name\ter_location_name\ter_specimen_name\tspecimen_lithology\tspecimen_type
This study\tIgneous : Extrusive\t01a\t8B794-2\tHawaii\t8B794-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t01b\t9B131-5\tHawaii\t9B131-5\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t01c\t9B433-5\tHawaii\t9B433-5\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t01c\t9B437-5\tHawaii\t9B437-5\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t2\t8B829-2\tHawaii\t8B829-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t2\t8B833-4\tHawaii\t8B833-4\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t2\t8B835-2\tHawaii\t8B835-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t2\t8B836-3\tHawaii\t8B836-3\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t3\t1B475-2\tHawaii\t1B475-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t3\t1B487-3\tHawaii\t1B487-3\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t4\t1B755-1\tHawaii\t1B755-1\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t4\t1B757-3\tHawaii\t1B757-3\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t5\t9B109-2\tHawaii\t9B109-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t5\t9B110-4\tHawaii\t9B110-4\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t5\t9B113-4\tHawaii\t9B113-4\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t5\t9B117-2\tHawaii\t9B117-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t6\t1B730-1\tHawaii\t1B730-1\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t6\t1B732-2\tHawaii\t1B732-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t6\t1B733-1\tHawaii\t1B733-1\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t6\t1B734-2\tHawaii\t1B734-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t7\t8B889-4\tHawaii\t8B889-4\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t7\t8B891-4\tHawaii\t8B891-4\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t7\t8B896-2\tHawaii\t8B896-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t7\t8B897-4\tHawaii\t8B897-4\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t8\t8B625-1\tHawaii\t8B625-1\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t8\t8B631-1\tHawaii\t8B631-1\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t9\t1B704-1\tHawaii\t1B704-1\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t9\t1B708-3\tHawaii\t1B708-3\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t9\t1B710-1\tHawaii\t1B710-1\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t9\t1B714-3\tHawaii\t1B714-3\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t10\t9B039-2\tHawaii\t9B039-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t10\t9B040-1\tHawaii\t9B040-1\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t10\t9B041-3\tHawaii\t9B041-3\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t10\t9B042-3\tHawaii\t9B042-3\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t10\t9B046-3\tHawaii\t9B046-3\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t11\t8B416-4\tHawaii\t8B416-4\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t11\t8B417-1\tHawaii\t8B417-1\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t12\t8B437-5\tHawaii\t8B437-5\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t12\t8B439-2\tHawaii\t8B439-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t12\t8B440-2\tHawaii\t8B440-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t13\t9B445-3\tHawaii\t9B445-3\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t13\t9B448-4\tHawaii\t9B448-4\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t13\t9B449-2\tHawaii\t9B449-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t13\t9B451-2\tHawaii\t9B451-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t13\t9B454-4\tHawaii\t9B454-4\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t14\t8B906-1\tHawaii\t8B906-1\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t14\t8B907-2\tHawaii\t8B907-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t14\t8B910-3\tHawaii\t8B910-3\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t15\t9B659-2\tHawaii\t9B659-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t15\t9B660-4\tHawaii\t9B660-4\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t16\t9B961-2\tHawaii\t9B961-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t16\t9B962-3\tHawaii\t9B962-3\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t16\t9B964-1\tHawaii\t9B964-1\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t16\t9B965-2\tHawaii\t9B965-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t17\t9B666-3\tHawaii\t9B666-3\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t17\t9B669-2\tHawaii\t9B669-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t17\t9B670-2\tHawaii\t9B670-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t18\t9B937-2\tHawaii\t9B937-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t18\t9B944-1\tHawaii\t9B944-1\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t18\t9B945-3\tHawaii\t9B945-3\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t18\t9B947-2\tHawaii\t9B947-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t18\t9B948-1\tHawaii\t9B948-1\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t19\t9B949-2\tHawaii\t9B949-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t19\t9B950-3\tHawaii\t9B950-3\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t19\t9B953-3\tHawaii\t9B953-3\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t19\t9B955-2\tHawaii\t9B955-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t19\t9B959-3\tHawaii\t9B959-3\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t20\t9B483-2\tHawaii\t9B483-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t20\t9B486-4\tHawaii\t9B486-4\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t20\t9B489-2\tHawaii\t9B489-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t20\t9B490-3\tHawaii\t9B490-3\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t20\t9B492-4\tHawaii\t9B492-4\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t21\t9B902-3\tHawaii\t9B902-3\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t21\t9B904-2\tHawaii\t9B904-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t21\t9B905-2\tHawaii\t9B905-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t22\t9B975-2\tHawaii\t9B975-2\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t22\t9B976-1\tHawaii\t9B976-1\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t22\t9B977-1\tHawaii\t9B977-1\tNot Specified\tLava Flow
This study\tIgneous : Extrusive\t22\t9B984-2\tHawaii\t9B984-2\tNot Specified\tLava Flow
>>>>>>>>>>
tab \ter_sites
er_citation_names\tsite_lithology\tsite_class\tsite_definition\ter_site_name\ter_location_name\tsite_type
This study\tNot Specified\tIgneous : Extrusive\ts\t01a\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t01b\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t01c\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t2\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t3\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t4\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t5\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t6\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t7\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t8\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t9\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t10\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t11\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t12\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t13\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t14\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t15\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t16\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t17\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t18\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t19\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t20\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t21\tHawaii\tLava Flow
This study\tNot Specified\tIgneous : Extrusive\ts\t22\tHawaii\tLava Flow
>>>>>>>>>>
tab \ter_ages
er_citation_names\ter_site_name\tage\tage_unit\ter_location_name\tage_sigma\tmagic_method_codes
This study\t01a\t260\tYears BP\tHawaii\t210\tGM-C14
This study\t01b\t260\tYears BP\tHawaii\t210\tGM-C14
This study\t01c\t260\tYears BP\tHawaii\t210\tGM-C14
This study\t2\t440\tYears BP\tHawaii\t240\tGM-C14
This study\t3\t700\tYears BP\tHawaii\t210\tGM-C14
This study\t4\t760\tYears BP\tHawaii\t210\tGM-C14
This study\t5\t1320\tYears BP\tHawaii\t150\tGM-C14
This study\t6\t1690\tYears BP\tHawaii\t210\tGM-C14
This study\t7\t2180\tYears BP\tHawaii\t180\tGM-C14
This study\t8\t2190\tYears BP\tHawaii\t210\tGM-C14
This study\t9\t2550\tYears BP\tHawaii\t240\tGM-C14
This study\t10\t2890\tYears BP\tHawaii\t210\tGM-C14
This study\t11\t3480\tYears BP\tHawaii\t240\tGM-C14
This study\t12\t4050\tYears BP\tHawaii\t150\tGM-C14
This study\t13\t5160\tYears BP\tHawaii\t300\tGM-C14
This study\t14\t5650\tYears BP\tHawaii\t270\tGM-C14
This study\t15\t6160\tYears BP\tHawaii\t330\tGM-C14
This study\t16\t7300\tYears BP\tHawaii\t300\tGM-C14
This study\t17\t7950\tYears BP\tHawaii\t330\tGM-C14
This study\t18\t8740\tYears BP\tHawaii\t300\tGM-C14
This study\t19\t9500\tYears BP\tHawaii\t420\tGM-C14
This study\t20\t10290\tYears BP\tHawaii\t450\tGM-C14
This study\t21\t11780\tYears BP\tHawaii\t300\tGM-C14
This study\t22\t13210\tYears BP\tHawaii\t570\tGM-C14
>>>>>>>>>>
tab \ter_citations
long_authors\ttitle\tjournal\tcitation_type\tvolume\tdoi\tyear\ter_citation_name\tpages
"Mankinen, E.A. and Champion, D.E."\tBroad trends in geomagnetic paleointensity on Hawaii during Holocene time\tJournal of Geophysical Research\tJournal\t98\t10.1029/93JB00024\t1993\tThis study\t"7,959-7,976"
"Cox, A. and Doell, R.R."\tReview of paleomagnetism\t"Geological Society of America, Bulletin"\tJournal\t71\t\t1960\tCox & Doell 1960\t645
"Thellier, E. and Thellier, O."\tSur l'intensite du champ magnetique terrestre dans le passe historique et geologique\tAnnales de Geophysique\tJournal\t15\t\t1959\tThellier & Thellier 1959\t285-378
"Thellier, E."\tSur l'aimantationdes terres cuites et ses applications geophysique\tAnnales Institut Physique du Globe de Paris\tJournal\t16\t\t1938\tThellier 1938\t157-302
>>>>>>>>>>
tab \tpmag_specimens
specimen_correction\ter_citation_names\tspecimen_magn_volume\ter_site_name\ter_sample_name\ter_location_name\ter_specimen_name\tspecimen_lab_field_dc\tmagic_method_codes
u\tThis study\t10.5\t01a\t8B794-2\tHawaii\t8B794-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t5.94\t01b\t9B131-5\tHawaii\t9B131-5\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t3.9\t01c\t9B433-5\tHawaii\t9B433-5\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t3.34\t01c\t9B437-5\tHawaii\t9B437-5\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t17.8\t2\t8B829-2\tHawaii\t8B829-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t22.9\t2\t8B833-4\tHawaii\t8B833-4\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t26\t2\t8B835-2\tHawaii\t8B835-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t20.6\t2\t8B836-3\tHawaii\t8B836-3\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t5.39\t3\t1B475-2\tHawaii\t1B475-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t6.67\t3\t1B487-3\tHawaii\t1B487-3\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t14.3\t4\t1B755-1\tHawaii\t1B755-1\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t21.1\t4\t1B757-3\tHawaii\t1B757-3\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t12.6\t5\t9B109-2\tHawaii\t9B109-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t14.9\t5\t9B110-4\tHawaii\t9B110-4\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t7.02\t5\t9B113-4\tHawaii\t9B113-4\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t23.5\t5\t9B117-2\tHawaii\t9B117-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t16.2\t6\t1B730-1\tHawaii\t1B730-1\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t27.2\t6\t1B732-2\tHawaii\t1B732-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t17.9\t6\t1B733-1\tHawaii\t1B733-1\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t18.1\t6\t1B734-2\tHawaii\t1B734-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t10\t7\t8B889-4\tHawaii\t8B889-4\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t12.7\t7\t8B891-4\tHawaii\t8B891-4\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t8.95\t7\t8B896-2\tHawaii\t8B896-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t23.3\t7\t8B897-4\tHawaii\t8B897-4\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t7.41\t8\t8B625-1\tHawaii\t8B625-1\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t4.43\t8\t8B631-1\tHawaii\t8B631-1\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t16.4\t9\t1B704-1\tHawaii\t1B704-1\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t6.04\t9\t1B708-3\tHawaii\t1B708-3\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t11.3\t9\t1B710-1\tHawaii\t1B710-1\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t23.5\t9\t1B714-3\tHawaii\t1B714-3\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t6.42\t10\t9B039-2\tHawaii\t9B039-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t6.92\t10\t9B040-1\tHawaii\t9B040-1\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t6.76\t10\t9B041-3\tHawaii\t9B041-3\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t5.96\t10\t9B042-3\tHawaii\t9B042-3\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t16.5\t10\t9B046-3\tHawaii\t9B046-3\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t6.01\t11\t8B416-4\tHawaii\t8B416-4\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t12.3\t11\t8B417-1\tHawaii\t8B417-1\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t11.4\t12\t8B437-5\tHawaii\t8B437-5\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t11.7\t12\t8B439-2\tHawaii\t8B439-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t20\t12\t8B440-2\tHawaii\t8B440-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t9.8\t13\t9B445-3\tHawaii\t9B445-3\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t18.1\t13\t9B448-4\tHawaii\t9B448-4\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t12.7\t13\t9B449-2\tHawaii\t9B449-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t14.7\t13\t9B451-2\tHawaii\t9B451-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t14.2\t13\t9B454-4\tHawaii\t9B454-4\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t4.25\t14\t8B906-1\tHawaii\t8B906-1\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t5.89\t14\t8B907-2\tHawaii\t8B907-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t5.57\t14\t8B910-3\tHawaii\t8B910-3\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t6.39\t15\t9B659-2\tHawaii\t9B659-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t11.5\t15\t9B660-4\tHawaii\t9B660-4\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t9.58\t16\t9B961-2\tHawaii\t9B961-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t7.23\t16\t9B962-3\tHawaii\t9B962-3\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t9.84\t16\t9B964-1\tHawaii\t9B964-1\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t3.39\t16\t9B965-2\tHawaii\t9B965-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t5.14\t17\t9B666-3\tHawaii\t9B666-3\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t10.1\t17\t9B669-2\tHawaii\t9B669-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t5.8\t17\t9B670-2\tHawaii\t9B670-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t1.5\t18\t9B937-2\tHawaii\t9B937-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t16.2\t18\t9B944-1\tHawaii\t9B944-1\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t9.32\t18\t9B945-3\tHawaii\t9B945-3\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t6.12\t18\t9B947-2\tHawaii\t9B947-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t14.6\t18\t9B948-1\tHawaii\t9B948-1\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t9.27\t19\t9B949-2\tHawaii\t9B949-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t16.3\t19\t9B950-3\tHawaii\t9B950-3\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t9.29\t19\t9B953-3\tHawaii\t9B953-3\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t10.1\t19\t9B955-2\tHawaii\t9B955-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t18.5\t19\t9B959-3\tHawaii\t9B959-3\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t9.39\t20\t9B483-2\tHawaii\t9B483-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t7.75\t20\t9B486-4\tHawaii\t9B486-4\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t9.26\t20\t9B489-2\tHawaii\t9B489-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t8.58\t20\t9B490-3\tHawaii\t9B490-3\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t6.22\t20\t9B492-4\tHawaii\t9B492-4\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t7.68\t21\t9B902-3\tHawaii\t9B902-3\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t4.12\t21\t9B904-2\tHawaii\t9B904-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t8.64\t21\t9B905-2\tHawaii\t9B905-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t10.8\t22\t9B975-2\tHawaii\t9B975-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t6.83\t22\t9B976-1\tHawaii\t9B976-1\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t4.04\t22\t9B977-1\tHawaii\t9B977-1\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
u\tThis study\t13.6\t22\t9B984-2\tHawaii\t9B984-2\t3.5e-05\tLP-PI-ALT-PTRM:LP-PI-TRM
>>>>>>>>>>
tab \tpmag_results
er_citation_names\taverage_inc\ter_site_names\tvdm\taverage_int\taverage_age_low\taverage_alpha95\tmagic_software_packages\tvadm\taverage_age\tresult_description\ter_location_names\taverage_int_sigma\tvadm_n\tdata_type\taverage_dec\tvdm_n\tvgp_lat\taverage_nn\taverage_lat\taverage_age_unit\taverage_k\taverage_lon\tvgp_dm\tvgp_dp\tpmag_result_name\taverage_age_high\tvgp_lon\taverage_age_sigma
This study\t41.3\t01a\t1.11E+23\t5.26E-05\t\t1.7\tPINT03\t1.17E+23\t260\t\tHawaii\t5.30E-06\t4\ti\t5.50\t4\t83.4\t12\t19.545\tYears BP\t630\t204.91\t\t\t01a\t\t254.60\t210
This study\t44.2\t01b\t1.11E+23\t5.26E-05\t\t1.4\tPINT03\t1.17E+23\t260\t\tHawaii\t5.30E-06\t4\ti\t3.20\t4\t83\t12\t19.58\tYears BP\t906\t204.94\t\t\t01b\t\t229.20\t210
This study\t46\t01c\t1.11E+23\t5.26E-05\t\t2.1\tPINT03\t1.17E+23\t260\t\tHawaii\t5.30E-06\t4\ti\t3.10\t4\t81.7\t12\t19.572\tYears BP\t418\t204.94\t\t\t01c\t\t224.10\t210
This study\t36.6\t2\t1.06E+23\t4.79E-05\t\t1.1\tPINT03\t1.07E+23\t440\t\tHawaii\t6.00E-07\t4\ti\t7.60\t4\t82.9\t12\t19.552\tYears BP\t1662\t204.70\t\t\t2\t\t287.40\t240
This study\t41.4\t3\t9.42E+22\t4.45E-05\t\t1.2\tPINT03\t9.97E+22\t700\t\tHawaii\t1.20E-06\t2\ti\t2.80\t2\t84.8\t18\t19.296\tYears BP\t905\t204.69\t\t\t3\t\t234.30\t210
This study\t25.8\t4\t1.05E+23\t4.41E-05\t\t1.6\tPINT03\t9.86E+22\t760\t\tHawaii\t8.00E-07\t2\ti\t353.00\t2\t81.1\t11\t19.494\tYears BP\t849\t204.66\t\t\t4\t\t74.50\t210
This study\t18.2\t5\t1.03E+23\t4.15E-05\t\t2.2\tPINT03\t9.27E+22\t1320\t\tHawaii\t3.60E-06\t4\ti\t2.20\t4\t79.6\t12\t19.564\tYears BP\t400\t204.66\t\t\t5\t\t12.80\t150
This study\t17.8\t6\t9.71E+22\t3.90E-05\t\t1.9\tPINT03\t8.71E+22\t1690\t\tHawaii\t3.10E-06\t4\ti\t355.50\t4\t78.7\t10\t19.533\tYears BP\t679\t204.65\t\t\t6\t\t48.00\t210
This study\t14.7\t7\t1.21E+23\t4.81E-05\t\t2.1\tPINT03\t1.08E+23\t2180\t\tHawaii\t1.23E-05\t4\ti\t11.20\t4\t74.1\t12\t19.118\tYears BP\t439\t204.43\t\t\t7\t\t340.00\t180
This study\t15.2\t8\t1.21E+23\t4.81E-05\t\t1.3\tPINT03\t1.08E+23\t2190\t\tHawaii\t1.23E-05\t4\ti\t11.30\t4\t74\t12\t19.455\tYears BP\t1095\t204.71\t\t\t8\t\t340.00\t210
This study\t21\t9\t1.07E+23\t4.36E-05\t\t1.5\tPINT03\t9.74E+22\t2550\t\tHawaii\t2.30E-06\t4\ti\t1.20\t4\t81.3\t12\t19.538\tYears BP\t987\t204.66\t\t\t9\t\t16.90\t240
This study\t25.7\t10\t1.24E+23\t5.17E-05\t\t2.3\tPINT03\t1.15E+23\t2890\t\tHawaii\t1.16E-05\t5\ti\t357.70\t5\t83.5\t11\t19.64\tYears BP\t370\t204.96\t\t\t10\t\t44.90\t210
This study\t36.4\t11\t1.06E+23\t4.79E-05\t\t1.4\tPINT03\t1.07E+23\t3480\t\tHawaii\t1.03E-05\t2\ti\t3.70\t2\t86.4\t12\t19.302\tYears BP\t1091\t204.69\t\t\t11\t\t279.50\t240
This study\t33.4\t12\t1.15E+23\t5.06E-05\t\t1.1\tPINT03\t1.13E+23\t4050\t\tHawaii\t1.70E-06\t3\ti\t4.50\t3\t85.5\t11\t19.713\tYears BP\t1467\t204.88\t\t\t12\t\t313.10\t150
This study\t27.6\t13\t8.54E+22\t3.61E-05\t\t2\tPINT03\t8.10E+22\t5160\t\tHawaii\t2.60E-06\t5\ti\t4.70\t5\t83.6\t12\t19.161\tYears BP\t493\t204.46\t\t\t13\t\t339.20\t300
This study\t33.7\t14\t7.67E+22\t3.39E-05\t\t1.4\tPINT03\t7.57E+22\t5650\t\tHawaii\t2.50E-06\t3\ti\t5.40\t3\t84.8\t12\t19.543\tYears BP\t958\t204.88\t\t\t14\t\t305.80\t270
This study\t54.9\t15\t6.41E+22\t3.52E-05\t\t1.7\tPINT03\t7.91E+22\t6160\t\tHawaii\t3.50E-06\t2\ti\t357.80\t2\t73.5\t12\t19.086\tYears BP\t819\t204.41\t\t\t15\t\t198.10\t330
This study\t25.4\t16\t6.47E+22\t2.70E-05\t\t1.4\tPINT03\t6.02E+22\t7300\t\tHawaii\t2.10E-06\t4\ti\t2.30\t4\t83.9\t10\t19.072\tYears BP\t914\t204.44\t\t\t16\t\t3.00\t300
This study\t33.4\t17\t6.97E+22\t3.07E-05\t\t1.5\tPINT03\t6.89E+22\t7950\t\tHawaii\t1.10E-06\t3\ti\t359.50\t3\t89\t12\t19.145\tYears BP\t917\t204.48\t\t\t17\t\t53.10\t330
This study\t36\t18\t9.91E+22\t4.46E-05\t\t2.3\tPINT03\t9.98E+22\t8740\t\tHawaii\t6.90E-06\t5\ti\t357.30\t5\t87.4\t11\t19.42\tYears BP\t413\t204.66\t\t\t18\t\t127.20\t300
This study\t33.7\t19\t9.30E+22\t4.11E-05\t\t2.3\tPINT03\t9.19E+22\t9500\t\tHawaii\t4.90E-06\t5\ti\t3.00\t5\t87\t11\t19.418\tYears BP\t351\t204.66\t\t\t19\t\t313.60\t420
This study\t31.9\t20\t8.26E+22\t3.60E-05\t\t1.8\tPINT03\t8.08E+22\t10290\t\tHawaii\t8.40E-06\t5\ti\t3.60\t5\t86.1\t12\t19.101\tYears BP\t570\t204.44\t\t\t20\t\t322.00\t450
This study\t8.7\t21\t8.55E+22\t3.34E-05\t\t1.7\tPINT03\t7.51E+22\t11780\t\tHawaii\t5.00E-06\t3\ti\t2.10\t3\t75.2\t12\t18.972\tYears BP\t738\t204.38\t\t\t21\t\t16.20\t300
This study\t54.6\t22\t6.93E+22\t3.79E-05\t\t1.4\tPINT03\t8.51E+22\t13210\t\tHawaii\t3.40E-06\t4\ti\t357.50\t4\t73.8\t11\t19.072\tYears BP\t916\t204.44\t\t\t22\t\t197.20\t570
This study\t31.6\t\t\t\t0\t4.7\tGPMDB\t\t0.5\tfrom DRAGON DATABASE 10-07-07.\tHawaii\t\t\ta\t2.40\t\t86.8\t284\t19.4\tYears BP\t40.7\t244.60\t5.3\t3\tHawaiian Holocene Lavas\t1\t339.50\t0.5
>>>>>>>>>>
tab \tmagic_methods
magic_method_code
GM-C14
LP-PI-ALT-PTRM
LP-PI-TRM`,
  'Tab Delimited File with Sites Data':
`site\tlocation\tresult_type\tmethod_codes\tcitations\tgeologic_classes\tgeologic_types\tlithologies\tlat\tlon\tage\tage_sigma\tage_unit\tdir_tilt_correction\tdir_dec\tdir_inc\tdir_alpha95\tdir_k\tdir_n_specimens\tdir_polarity\tdir_nrm_origin\tvgp_lat\tvgp_lon\tvdm\tvdm_n_samples\tvadm\tvadm_n_samples\tint_abs\tint_abs_sigma\tdescription\tsoftware_packages
01a\tHawaii\t\t\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t
01b\tHawaii\t\t\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t
01c\tHawaii\t\t\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t
2\tHawaii\t\t\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t
01c\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t
2\tHawaii\ti\t:DE-BFL:\t:This study:\t\t\t\t19.552\t204.70\t440\t240\tYears BP\t100\t7.60\t36.6\t1.1\t1662\t12\tn\tp\t82.9\t287.40\t1.06E+23\t4\t1.07E+23\t4\t4.79E-05\t6.00E-07\t2\t:PINT03:
3\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.296\t204.69\t700\t210\tYears BP\t100\t2.80\t41.4\t1.2\t905\t18\tn\tp\t84.8\t234.30\t9.42E+22\t2\t9.97E+22\t2\t4.45E-05\t1.20E-06\t3\t:PINT03:
4\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.494\t204.66\t760\t210\tYears BP\t100\t353.00\t25.8\t1.6\t849\t11\tn\tp\t81.1\t74.50\t1.05E+23\t2\t9.86E+22\t2\t4.41E-05\t8.00E-07\t4\t:PINT03:
5\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.564\t204.66\t1320\t150\tYears BP\t100\t2.20\t18.2\t2.2\t400\t12\tn\tp\t79.6\t12.80\t1.03E+23\t4\t9.27E+22\t4\t4.15E-05\t3.60E-06\t5\t:PINT03:
6\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.533\t204.65\t1690\t210\tYears BP\t100\t355.50\t17.8\t1.9\t679\t10\tn\tp\t78.7\t48.00\t9.71E+22\t4\t8.71E+22\t4\t3.90E-05\t3.10E-06\t6\t:PINT03:
7\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.118\t204.43\t2180\t180\tYears BP\t100\t11.20\t14.7\t2.1\t439\t12\tn\tp\t74.1\t340.00\t1.21E+23\t4\t1.08E+23\t4\t4.81E-05\t1.23E-05\t7\t:PINT03:
8\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.455\t204.71\t2190\t210\tYears BP\t100\t11.30\t15.2\t1.3\t1095\t12\tn\tp\t74\t340.00\t1.21E+23\t4\t1.08E+23\t4\t4.81E-05\t1.23E-05\t8\t:PINT03:
9\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.538\t204.66\t2550\t240\tYears BP\t100\t1.20\t21\t1.5\t987\t12\tn\tp\t81.3\t16.90\t1.07E+23\t4\t9.74E+22\t4\t4.36E-05\t2.30E-06\t9\t:PINT03:
10\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.64\t204.96\t2890\t210\tYears BP\t100\t357.70\t25.7\t2.3\t370\t11\tn\tp\t83.5\t44.90\t1.24E+23\t5\t1.15E+23\t5\t5.17E-05\t1.16E-05\t10\t:PINT03:
11\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.302\t204.69\t3480\t240\tYears BP\t100\t3.70\t36.4\t1.4\t1091\t12\tn\tp\t86.4\t279.50\t1.06E+23\t2\t1.07E+23\t2\t4.79E-05\t1.03E-05\t11\t:PINT03:
12\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.713\t204.88\t4050\t150\tYears BP\t100\t4.50\t33.4\t1.1\t1467\t11\tn\tp\t85.5\t313.10\t1.15E+23\t3\t1.13E+23\t3\t5.06E-05\t1.70E-06\t12\t:PINT03:
13\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.161\t204.46\t5160\t300\tYears BP\t100\t4.70\t27.6\t2\t493\t12\tn\tp\t83.6\t339.20\t8.54E+22\t5\t8.10E+22\t5\t3.61E-05\t2.60E-06\t13\t:PINT03:
14\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.543\t204.88\t5650\t270\tYears BP\t100\t5.40\t33.7\t1.4\t958\t12\tn\tp\t84.8\t305.80\t7.67E+22\t3\t7.57E+22\t3\t3.39E-05\t2.50E-06\t14\t:PINT03:
15\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.086\t204.41\t6160\t330\tYears BP\t100\t357.80\t54.9\t1.7\t819\t12\tn\tp\t73.5\t198.10\t6.41E+22\t2\t7.91E+22\t2\t3.52E-05\t3.50E-06\t15\t:PINT03:
16\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.072\t204.44\t7300\t300\tYears BP\t100\t2.30\t25.4\t1.4\t914\t10\tn\tp\t83.9\t3.00\t6.47E+22\t4\t6.02E+22\t4\t2.70E-05\t2.10E-06\t16\t:PINT03:
17\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.145\t204.48\t7950\t330\tYears BP\t100\t359.50\t33.4\t1.5\t917\t12\tn\tp\t89\t53.10\t6.97E+22\t3\t6.89E+22\t3\t3.07E-05\t1.10E-06\t17\t:PINT03:
18\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.42\t204.66\t8740\t300\tYears BP\t100\t357.30\t36\t2.3\t413\t11\tn\tp\t87.4\t127.20\t9.91E+22\t5\t9.98E+22\t5\t4.46E-05\t6.90E-06\t18\t:PINT03:
19\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.418\t204.66\t9500\t420\tYears BP\t100\t3.00\t33.7\t2.3\t351\t11\tn\tp\t87\t313.60\t9.30E+22\t5\t9.19E+22\t5\t4.11E-05\t4.90E-06\t19\t:PINT03:
20\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.101\t204.44\t10290\t450\tYears BP\t100\t3.60\t31.9\t1.8\t570\t12\tn\tp\t86.1\t322.00\t8.26E+22\t5\t8.08E+22\t5\t3.60E-05\t8.40E-06\t20\t:PINT03:
21\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t18.972\t204.38\t11780\t300\tYears BP\t100\t2.10\t8.7\t1.7\t738\t12\tn\tp\t75.2\t16.20\t8.55E+22\t3\t7.51E+22\t3\t3.34E-05\t5.00E-06\t21\t:PINT03:
22\tHawaii\t\t\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t
01a\tHawaii\ti\t:DE-BFL:\t:This study:\t\t\t\t19.545\t204.91\t260\t210\tYears BP\t100\t5.50\t41.3\t1.7\t630\t12\tn\tp\t83.4\t254.60\t1.11E+23\t4\t1.17E+23\t4\t5.26E-05\t5.30E-06\t01a\t:PINT03:
01b\tHawaii\ti\t:DE-BFL:\t:This study:\t\t\t\t19.58\t204.94\t260\t210\tYears BP\t100\t3.20\t44.2\t1.4\t906\t12\tn\tp\t83\t229.20\t1.11E+23\t4\t1.17E+23\t4\t5.26E-05\t5.30E-06\t01b\t:PINT03:
01c\tHawaii\ti\t:DE-BFL:\t:This study:\t\t\t\t19.572\t204.94\t260\t210\tYears BP\t100\t3.10\t46\t2.1\t418\t12\tn\tp\t81.7\t224.10\t1.11E+23\t4\t1.17E+23\t4\t5.26E-05\t5.30E-06\t01c\t:PINT03:
22\tHawaii\ti\t:DE-BFL:\t:This study:\t\t\t\t19.072\t204.44\t13210\t570\tYears BP\t100\t357.50\t54.6\t1.4\t916\t11\tn\tp\t73.8\t197.20\t6.93E+22\t4\t8.51E+22\t4\t3.79E-05\t3.40E-06\t22\t:PINT03:
`,
  'Tab Delimited File with Specimens Data':
`specimen,sample,result_quality,method_codes,citations,geologic_classes,geologic_types,lithologies
1B475-2,1B475-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
1B487-3,1B487-3,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
1B704-1,1B704-1,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
1B708-3,1B708-3,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
1B710-1,1B710-1,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
1B714-3,1B714-3,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
1B730-1,1B730-1,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
1B732-2,1B732-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
1B733-1,1B733-1,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
1B734-2,1B734-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
1B755-1,1B755-1,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
1B757-3,1B757-3,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
8B416-4,8B416-4,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
8B417-1,8B417-1,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
8B437-5,8B437-5,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
8B439-2,8B439-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
8B440-2,8B440-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
8B625-1,8B625-1,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
8B631-1,8B631-1,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
8B794-2,8B794-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
8B829-2,8B829-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
8B833-4,8B833-4,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
8B835-2,8B835-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
8B836-3,8B836-3,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
8B889-4,8B889-4,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
8B891-4,8B891-4,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
8B896-2,8B896-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
8B897-4,8B897-4,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
8B906-1,8B906-1,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
8B907-2,8B907-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
8B910-3,8B910-3,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B039-2,9B039-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B040-1,9B040-1,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B041-3,9B041-3,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B042-3,9B042-3,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B046-3,9B046-3,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B109-2,9B109-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B110-4,9B110-4,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B113-4,9B113-4,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B117-2,9B117-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B131-5,9B131-5,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B433-5,9B433-5,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B437-5,9B437-5,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B445-3,9B445-3,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B448-4,9B448-4,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B449-2,9B449-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B451-2,9B451-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B454-4,9B454-4,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B483-2,9B483-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B486-4,9B486-4,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B489-2,9B489-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B490-3,9B490-3,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B492-4,9B492-4,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B659-2,9B659-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B660-4,9B660-4,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B666-3,9B666-3,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B669-2,9B669-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B670-2,9B670-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B902-3,9B902-3,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B904-2,9B904-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B905-2,9B905-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B937-2,9B937-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B944-1,9B944-1,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B945-3,9B945-3,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B947-2,9B947-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B948-1,9B948-1,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B949-2,9B949-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B950-3,9B950-3,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B953-3,9B953-3,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B955-2,9B955-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B959-3,9B959-3,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B961-2,9B961-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B962-3,9B962-3,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B964-1,9B964-1,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B965-2,9B965-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B975-2,9B975-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B976-1,9B976-1,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B977-1,9B977-1,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:
9B984-2,9B984-2,g,:LP-PI-ALT-PTRM:LP-PI-TRM:,:This study:,:Extrusive:Igneous:,:Lava Flow:,:Not Specified:`,
  'Excel File': ``
};