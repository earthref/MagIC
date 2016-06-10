import React from 'react';
import saveAs from 'save-as';
import JSZip from 'xlsx-style/node_modules/jszip';
import XLSX from 'xlsx-style';
import ExportContribution from '../actions/export_contribution';

export default class extends React.Component {

  exportToExcel() {

    let Exporter = new ExportContribution({});
    let workbook = Exporter.toExcel($(this.refs['json']).val());

    // Prepare the workbook for output.
    let workbookBinary = XLSX.write(workbook, {bookType:'xlsx', bookSST:true, type: 'binary'});
    let workbookBuffer = new ArrayBuffer(workbookBinary.length);
    let workbookEncoded = new Uint8Array(workbookBuffer);
    for (var i=0; i!=workbookBinary.length; ++i)
      workbookEncoded[i] = workbookBinary.charCodeAt(i) & 0xFF;
    let workbookBlob = new Blob([workbookBuffer], {type: 'application/octet-stream'});

    saveAs(workbookBlob, 'test.xlsx');

  }

  render() {
    return (
      <div className="export-test">
        <div  className="ui form">
          <div className="field">
            <textarea ref="json" rows="30">{`{
  contribution: [{
    magic_version: '3.0'
  }],
  specimens: [{
    dip:       1.2,
    igsn:      'igsn1',
    specimen:  'sp1',
    sample:    'sa1',
    citations: ['10.1023/A:1', 'This study']
  }, {
    dip:      1.3,
    igsn:     'igsn2',
    specimen: 'sp2',
    sample:   'sa1'
  }],
  sites: [{
    location:     'lo1',
    site:         'si2',
    description:  'a',
    method_codes: ['code2', 'code1']
  }, {
    site:              'si1',
    location:          'lo1',
    citations:         ['10.1023/A1'],
    site_alternatives: 'Kiln'
  }]
}`}
            </textarea>
          </div>
          <button className="ui button" onClick={this.exportToExcel.bind(this)}>
            Download
          </button>
        </div >
      </div>
    )
  }

}

