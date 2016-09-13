import _ from 'lodash';
import jQuery from 'jquery';
import XLSX from 'xlsx-style';
import Runner from '../../er/actions/runner.js';
import ValidateContribution from './validate_contribution';

import { default as magicVersions   } from '../configs/magic_versions';
import { default as magicDataModels } from '../configs/data_models/data_models';

export default class extends Runner {

  constructor({runnerState}) {
    super({runnerState});
    runnerState = this.runnerState;
    this.validator = new ValidateContribution({runnerState});
    this.version;
    this.model;
  }

  // Convert a JSON contribution to a MagIC Text Format string.
  toText(json) {
    // Text should be a valid MagIC tab delimited text file with the tables and columns in the order defined in the data model.

    // Retrieve the data model version used in the jsonToExport
    let { version } = this.validator.getVersion(json);
    this.version = version;
    if (!this.version) return json;

    // Retrieve the data model
    this.model = magicDataModels[this.version];
    this.orderedModel = this.createOrderedModel();

    this.testValidityOfTablesAndColumns(json);

    let text = this.createTSVfile(json, false);

    return text;
  }

  // Convert a JSON contribution to a MagIC Extended Text Format string.
  toExtendedText(json) {
    // Text should be a valid MagIC tab delimited text file with the tables and columns in the order defined in the data model.

    // Retrieve the data model version used in the jsonToExport
    let { version } = this.validator.getVersion(json);
    this.version = version;
    if (!this.version) return json;

    // Retrieve the data model
    this.model = magicDataModels[this.version];
    this.orderedModel = this.createOrderedModel();

    this.testValidityOfTablesAndColumns(json);

    let text = this.createTSVfile(json, true);

    return text;
  }

  //Per requirements, this will only work for model 3.0
  toExcel(jsonToExport) {

    let { version } = this.validator.getVersion(jsonToExport);
    this.version = version;

    this.model = magicDataModels[this.version];
    this.orderedModel = this.createOrderedModel();

    // Create an empty workbook.
    let workbook = { SheetNames: [], Sheets: {} };

    let style = {fill:{patternType: 'solid'},  font:{}, numFmt:{}, alignment:{}, border:{}};

    // Iterate through all of the tables in the model.
    for (let modelTable in this.model.tables) {

      // Skip model tables that are not included in the contribution.
      if (jsonToExport[modelTable] === undefined) continue;

      // Create a worksheet data matrix.
      let tableHeaders = this.createExtendedHeadersData(modelTable, jsonToExport);
      let wsData = [
        ['Group: ' , ... tableHeaders.groupHeader           ],
        ['Name: '  , ... tableHeaders.labelHeader           ],
        ['Type: '  , ... tableHeaders.columnTypeOrUnitHeader],
        ['Column: ', ... tableHeaders.columnNameHeader      ]
      ];

      // Iterate through all of the data rows in the table.
      for (let rowIdx in (jsonToExport[modelTable].rows || jsonToExport[modelTable])) {

        // Add a blank column at the beginning of each data row for the row headers.
        let wsRow = [''];

        if (jsonToExport[modelTable].rows) wsRow = wsRow.concat(jsonToExport[modelTable].rows[rowIdx]);
        else
          // Iterate through each column name in the header.
          for (let columnName of tableHeaders.columnNameHeader) {
            let value = jsonToExport[modelTable][rowIdx][columnName];
            wsRow.push(value);
          }

        wsData.push(wsRow.map((value, i) => {
          if (Array.isArray(value) && value.length > 0 && !Array.isArray(value[0])) value = value.join(':');
          return value;
        }));

      }

      // Convert the data matrix into a worksheet object.
      let worksheet = this._toSheet(wsData);
      let range = {};
      let rowIdx;

      // Format the group header row.
      rowIdx = 0;
      for (let columnIdx = 0; columnIdx < wsData[rowIdx].length; columnIdx++) {

        let cellAddress = XLSX.utils.encode_cell({r: rowIdx,c: columnIdx});
        let cellStyle = {
          font:      {bold: 'true'},
          alignment: {horizontal: (columnIdx == 0 ? 'right' : 'center'),
                      vertical: 'center'},
          fill:      {fgColor: {rgb: 'CCCCCC'}},
          border:    {top:    {style: 'thick' , color: {rgb: '555555'}},
                      bottom: {style: 'medium', color: {rgb: '555555'}}}
        };

        // Add borders.
        if (columnIdx == 0)
          cellStyle.border.left = {style: 'thick', color: {rgb: '555555'}};
        if (columnIdx == 0 || columnIdx == wsData[rowIdx].length - 1)
          cellStyle.border.right = {style: 'thick', color: {rgb: '555555'}};
        if (columnIdx > 0 && columnIdx < wsData[rowIdx].length - 1 && wsData[0][columnIdx+1] != '')
          cellStyle.border.right = {style: 'medium', color: {rgb: '555555'}};

        worksheet[cellAddress].s = cellStyle;

        // Define merged cells.
        if (columnIdx > 0 && wsData[0][columnIdx] != '')
          range.s = {r:rowIdx, c:columnIdx};
        else if (columnIdx > 0 && wsData[0][columnIdx+1] != '') {
          range.e = {r:rowIdx, c:columnIdx};
          if (!worksheet['!merges']) worksheet['!merges'] = [];
          console.log(range);
          worksheet['!merges'].push(range); //XLSX.utils.encode_range(range));
          range = {};
        }

      }
      console.log(worksheet['!merges']);

      // Format the name header row.
      rowIdx = 1;
      for (let columnIdx = 0; columnIdx < wsData[rowIdx].length; columnIdx++) {

        let cellAddress = XLSX.utils.encode_cell({r: rowIdx,c: columnIdx});
        let cellStyle = {
          alignment: {horizontal: (columnIdx == 0 ? 'right' : 'center'),
                      vertical: 'center'},
          fill:      {fgColor: {rgb: 'FFFFFF'}},
          border:    {}
        };

        // Add borders.
        if (columnIdx == 0)
          cellStyle.border.left = {style: 'thick', color: {rgb: '555555'}};
        if (columnIdx == 0 || columnIdx == wsData[rowIdx].length - 1)
          cellStyle.border.right = {style: 'thick', color: {rgb: '555555'}};
        else if (columnIdx > 0 && columnIdx < wsData[rowIdx].length - 1 && wsData[0][columnIdx+1] != '')
          cellStyle.border.right = {style: 'medium', color: {rgb: '555555'}};
        else
          cellStyle.border.right = {style: 'thin', color: {rgb: '888888'}};

        worksheet[cellAddress].s = cellStyle;

      }

      // Format the type header row.
      rowIdx = 2;
      for (let columnIdx = 0; columnIdx < wsData[rowIdx].length; columnIdx++) {

        let cellAddress = XLSX.utils.encode_cell({r: rowIdx,c: columnIdx});
        let cellStyle = {
          font:      {italic: 'true', color: {rgb: '888888'}},
          alignment: {horizontal: (columnIdx == 0 ? 'right' : 'center'),
                      vertical: 'center'},
          fill:      {fgColor: {rgb: 'FFFFFF'}},
          border:    {}
        };

        // Add borders.
        if (columnIdx == 0)
          cellStyle.border.left = {style: 'thick', color: {rgb: '555555'}};
        if (columnIdx == 0 || columnIdx == wsData[rowIdx].length - 1)
          cellStyle.border.right = {style: 'thick', color: {rgb: '555555'}};
        else if (columnIdx > 0 && columnIdx < wsData[rowIdx].length - 1 && wsData[0][columnIdx+1] != '')
          cellStyle.border.right = {style: 'medium', color: {rgb: '555555'}};
        else
          cellStyle.border.right = {style: 'thin', color: {rgb: '888888'}};

        worksheet[cellAddress].s = cellStyle;

      }

      // Format the column name header row.
      rowIdx = 3;
      for (let columnIdx = 0; columnIdx < wsData[rowIdx].length; columnIdx++) {

        let cellAddress = XLSX.utils.encode_cell({r: rowIdx,c: columnIdx});
        let cellStyle = {
          font:      {bold: 'true'},
          alignment: {horizontal: (columnIdx == 0 ? 'right' : 'center'),
                      vertical: 'center'},
          fill:      {fgColor: {rgb: 'F2F2F2'}},
          border:    {top:    {style: 'thin' , color: {rgb: '555555'}},
                      bottom: {style: 'thick', color: {rgb: '555555'}}}
        };

        // Add borders.
        if (columnIdx == 0)
          cellStyle.border.left = {style: 'thick', color: {rgb: '555555'}};
        if (columnIdx == 0 || columnIdx == wsData[rowIdx].length - 1)
          cellStyle.border.right = {style: 'thick', color: {rgb: '555555'}};
        else if (columnIdx > 0 && columnIdx < wsData[rowIdx].length - 1 && wsData[0][columnIdx+1] != '')
          cellStyle.border.right = {style: 'medium', color: {rgb: '555555'}};
        else
          cellStyle.border.right = {style: 'thin', color: {rgb: '888888'}};

        worksheet[cellAddress].s = cellStyle;

      }

      // Format the entire worksheet.
      let columnWidths = new Array(wsData[0].length).fill(0);
      for (let rowIdx = 0; rowIdx < wsData.length; rowIdx++) {
        for (let columnIdx = 0; columnIdx < wsData[rowIdx].length; columnIdx++) {
          let cellAddress = XLSX.utils.encode_cell({r: rowIdx,c: columnIdx});
          if (worksheet[cellAddress] !== undefined) {
            if (worksheet[cellAddress].v !== undefined)
              columnWidths[columnIdx] = Math.max(columnWidths[columnIdx], worksheet[cellAddress].v.toString().length);
            if (worksheet[cellAddress].s === undefined) worksheet[cellAddress].s = {};
            if (worksheet[cellAddress].s.font === undefined) worksheet[cellAddress].s.font = {};
            worksheet[cellAddress].s.font.name = 'Consolas';
            worksheet[cellAddress].s.font.sz = '11';
          }
        }
      }
      worksheet['!cols'] = columnWidths.map((w) => { return {wpx: (w+1)*7.5}});

      // Add the worksheet to the workbook.
      workbook.SheetNames.push(modelTable);
      workbook.Sheets[modelTable] = worksheet;

    }

    return workbook;
  }

  _datenum(v, date1904) {
    if(date1904) v+=1462;
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
  }

  _toSheet(data, opts) {
    var worksheet = {};
    var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
    for(var R = 0; R != data.length; ++R) {
      for(var C = 0; C != data[R].length; ++C) {
        if(range.s.r > R) range.s.r = R;
        if(range.s.c > C) range.s.c = C;
        if(range.e.r < R) range.e.r = R;
        if(range.e.c < C) range.e.c = C;
        var cell = {v: data[R][C] };
        if(cell.v == null) continue;
        var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

        if(jQuery.isNumeric(cell.v)) cell.t = 'n';
        else if(typeof cell.v === 'boolean') cell.t = 'b';
        else if(cell.v instanceof Date) {
          cell.t = 'n'; cell.z = XLSX.SSF._table[14];
          cell.v = this._datenum(cell.v);
        }
        else cell.t = 's';
        worksheet[cell_ref] = cell;
      }
    }
    if(range.s.c < 10000000) worksheet['!ref'] = XLSX.utils.encode_range(range);
    return worksheet;
  }

  //creates a single extended header TSV based on the table
  generateExtendedHeaderTSV(tableName, jsonToExport)
  {
    let extendedHeader = '';
    let extraHeaderData = this.createExtendedHeadersData(tableName, jsonToExport/*, orderedColumnArray*/);

    extendedHeader = extendedHeader + extraHeaderData.groupHeader.join('\t');
    extendedHeader = extendedHeader + '\n';
    extendedHeader = extendedHeader + extraHeaderData.labelHeader.join('\t');
    extendedHeader = extendedHeader + '\n';
    extendedHeader = extendedHeader + extraHeaderData.columnTypeOrUnitHeader.join('\t');
    extendedHeader = extendedHeader + '\n';

    return extendedHeader;
  }

  _getOrderedColumnList(tableName)
  {
    /*GGG: this is hacky but i cant make indexOf work for an object in an array, and I'm on an airplane and cant look it up*/
    //Find the index that holds the object which represents a given table
    for(let orderedTableIdx in this.orderedModel)
    {
      if (this.orderedModel[orderedTableIdx][tableName])
      {
        return this.orderedModel[orderedTableIdx][tableName];
      }
    }

    /*this.orderedModel.indexOf(this.orderedModel[tableName]);
     console.log(`index of: ${orderedTableIdx}`);
     let orderedColumnArray = this.orderedModel[orderedTableIdx][tableName];//this.orderedModel[orderedTableIdx][tableName];*/

  };

  createExtendedHeadersData(tableName, jsonToExport) {
    // returns data to be used for extra headers (groups, columns names, and units)
    let discoveredColumns = {};
    let previousGroupFound = '';
    let groupHeaderArray = [];
    let labelHeaderArray = [];
    let columnTypeOrUnitHeaderArray = [];
    let columnHeaderArray = [];
    let orderedColumnArray = this._getOrderedColumnList(tableName);

    //loop through ordered model columns for this table, see if json has data from that column
    for (let orderedColumnIdx in orderedColumnArray) {

      let potentialColumnToAdd = orderedColumnArray[orderedColumnIdx];
      //Traverse the entire JSON table's rows looking for usages of the each column found in the ordered model. If the JSON file has the column in question
      //extract the desired information and create the extended header
      for(let jsonRowIdx in jsonToExport[tableName]) {

        if (jsonToExport[tableName][jsonRowIdx][potentialColumnToAdd] && //if this ordered column is found in the json file
            !discoveredColumns[potentialColumnToAdd]) {                    //and we haven't seen this column before

          //ggg gather data here from the model and add the header
          discoveredColumns[potentialColumnToAdd] = potentialColumnToAdd;//again this is a bit of overlapping code here but i like the object notatoin for keeping track of a set
          columnHeaderArray.push(potentialColumnToAdd);

          let labelToAdd = this.model['tables'][tableName]['columns'][potentialColumnToAdd]['label'];
          labelHeaderArray.push(labelToAdd);

          // Append the group name if it's not the same as the previous column.
          let currentGroupToAdd = this.model['tables'][tableName]['columns'][potentialColumnToAdd]['group'];
          groupHeaderArray.push((previousGroupFound != currentGroupToAdd ? currentGroupToAdd : ''));
          previousGroupFound = currentGroupToAdd;

          columnTypeOrUnitHeaderArray.push(this.getColumnTypeOrUnitString(tableName,potentialColumnToAdd));
        }
      }
    }

    let orderedHeaderData = {};
    orderedHeaderData.groupHeader = groupHeaderArray;
    orderedHeaderData.labelHeader = labelHeaderArray;
    orderedHeaderData.columnTypeOrUnitHeader = columnTypeOrUnitHeaderArray;
    orderedHeaderData.columnNameHeader = columnHeaderArray;

    return orderedHeaderData;
  }

  getColumnTypeOrUnitString(table, column) {

    let columnTypeOrUnitString = '';
    let columnType = this.model['tables'][table]['columns'][column]['type'];
    let columnUnit = this.model['tables'][table]['columns'][column]['unit'];

    if (columnType === 'Number') {
      columnTypeOrUnitString = 'Number';
      if (columnUnit !== 'Dimensionless' &&
          columnUnit !== 'Custom' &&
          columnUnit !== '')
        columnTypeOrUnitString += ` in ${columnUnit}`;
    }
    else if (columnUnit === 'Flag')
      columnTypeOrUnitString = 'Flag';
    else
      columnTypeOrUnitString = columnType;

    return columnTypeOrUnitString;

  }

  createTSVfile(jsonToExport, toExtendedText){
    //  loop through the used tables in data model order,
    //   print the table header (note: "tab delimited\ttable_name" format)
    //   loop through the used columns for that table in data model order,
    //     print the column headers
    //   loop through the rows in that table in the order in the jsonToTranslate,
    //     loop through the used columns for that table in data model order,
    //       print the column value for that row
    //         note: arrays turn into val1:val2 string,
    //               any string in an array that contains a ":" gets double quotes around it
    //   and print the table separator if there is another table.
    let text = ``;
    let numberOfTablesInJson = Object.keys(jsonToExport).length;
    let numberOfTablesInAddedToTSV = 0;
    for(let orderedTableIdx in this.orderedModel)
    {
      let tableName = Object.getOwnPropertyNames(this.orderedModel[orderedTableIdx]);//loop through the tables in the model
      if(jsonToExport[tableName])//if the current table exists in the json to translate, add it to the output file
      {
        text = text.concat(`tab delimited\t${tableName}`);
        if (toExtendedText) {text = text.concat(`\t4 headers`);}
        text = text.concat(`\n`);//in any case, we finish the header with a new line

        //If we want extended headers, pass in the ordered column list
        if (toExtendedText)
        {
          /*let orderedColumnArray = orderedModel[orderedTableIdx][tableName];*/
          text = text + this.generateExtendedHeaderTSV(tableName, jsonToExport/*, orderedColumnArray*/)
        }

        //*********now create the column headers for this table*************
        let columnsToAddToTSVheader = {};//TODO:the object and the array are a bit of a duplicate effort
        let orderedListOfColumnsAddedToHeader = [];//TODO:the object and the array are a bit of a duplicate effort
        for(let orderedColIdx in this.orderedModel[orderedTableIdx][tableName])//loop through the columns in the ordered model
        {
          let orderedColumnNameToPotentiallyAdd = this.orderedModel[orderedTableIdx][tableName][orderedColIdx];
          for(let jsonRowsIdx in jsonToExport[tableName])
          {
            //if the column from the model is found in the jsonToTranslate, and it hasn't already been added to the
            // column header in the TSV, then add it
            if(jsonToExport[tableName][jsonRowsIdx][orderedColumnNameToPotentiallyAdd] &&
              !columnsToAddToTSVheader[orderedColumnNameToPotentiallyAdd] )
            {
              columnsToAddToTSVheader[orderedColumnNameToPotentiallyAdd] = 'have already seen this column';
              orderedListOfColumnsAddedToHeader.push(orderedColumnNameToPotentiallyAdd);
            }
          }
        }
        //add the collected column headers to the TSV here
        if (orderedListOfColumnsAddedToHeader.length > 0)
          text = text.concat(orderedListOfColumnsAddedToHeader.join('\t') + '\n');


        /***************Now add all data from the table to the TSV*****************/
        for(let jsonRowsIdx in jsonToExport[tableName])
          for(let colNameIdx in orderedListOfColumnsAddedToHeader)
          {
            let colName = orderedListOfColumnsAddedToHeader[colNameIdx];
            let numberOfColumns = orderedListOfColumnsAddedToHeader.length;
            let dataToAdd = jsonToExport[tableName][jsonRowsIdx][colName];

            if (dataToAdd == undefined){dataToAdd = '';}//for rows with no data

            if(colNameIdx > 0 && colNameIdx < numberOfColumns)//no delimiter needed for the first column or at the end of the row
            {text = text.concat('\t');}

            dataToAdd =  this.handleSpecialCases(dataToAdd,tableName,colName);

            text = text.concat(dataToAdd);

            if(colNameIdx == numberOfColumns - 1){text = text.concat('\n');}
          }

        numberOfTablesInAddedToTSV++;
        if(numberOfTablesInAddedToTSV < numberOfTablesInJson)//no >>>> delimiter at end of file
          text = text.concat('>>>>>>>>>>\n');
      }
    }
    return text;
  }

  handleSpecialCases(dataToManipulate, tableName, columnName)
  {
   if (dataToManipulate == '') return dataToManipulate;

   let manipulatedData = '';

   if(magicDataModels[_.last(magicVersions)].tables[tableName].columns[columnName].type === 'Dictionary')
   //if(columnName == 'external_database_ids')
   {

   //handles data of this form: {'GEOMAGIA50':'1435', 'CALS7K.2':23, 'ARCHEO00':null, 'TRANS':''}
   //and translates it into this form: GEOMAGIA50[1435]:CALS7K.2[23]:ARCHEO00[]:TRANS[]
   let propertyNames = Object.getOwnPropertyNames(dataToManipulate);
   let numberOfElements = propertyNames.length;
   let numberOfElementsProcessed = 0; //this counter is necessary because the loop index below is given some strange numbers from propertyNames i.e. they are not sequential
   for(let propertyIdx in propertyNames)
   {
   let propertyName = propertyNames[propertyIdx];
   let propertyValue = dataToManipulate[propertyName];
   if(propertyValue == null) {propertyValue = '';}
   manipulatedData = manipulatedData + `${propertyName}[${propertyValue}]`;
   numberOfElementsProcessed++;

   //we do not want a colon in front of the first
   if (//propertyIdx < 1 ||
   numberOfElementsProcessed < numberOfElements )
   manipulatedData = manipulatedData + ':';

   //     console.log(`data ${manipulatedData}   ${propertyIdx + 1}    ${numberOfElements}`);
   }
   return manipulatedData;
   }

   if(magicDataModels[_.last(magicVersions)].tables[tableName].columns[columnName].type === 'Matrix')
   //if(columnName == 'rotation_sequence')
   {
   //this handles data of this nature: rotation_sequence: [[1.4,5.2,-.3],[0,-2.1,0.12345]]
   //and converts it to the TSV representation: 1.4:5.2:-0.3;0:-2.1:0.12345
   let numberOfSubArrays = dataToManipulate.length;
   for(let nestedArrayIdx in dataToManipulate)
   {
   manipulatedData = manipulatedData + dataToManipulate[nestedArrayIdx].join(':');

   //Each array worth of data is separated by a semi colon in the TSV
   if (nestedArrayIdx + 1 < numberOfSubArrays) manipulatedData = manipulatedData + ';';
   }
   return manipulatedData;
   }

   if(magicDataModels[_.last(magicVersions)].tables[tableName].columns[columnName].type === 'List')
   //if( columnName == 'er_citation_names' ||
   //  columnName == 'magic_method_codes'||
   //  columnName == 'method_codes' ||
   //  columnName == 'citations')
   {
   //console.log(dataToManipulate, typeof(dataToManipulate));
   if (typeof(dataToManipulate) === 'string') dataToManipulate = [dataToManipulate];
   manipulatedData = ':' + dataToManipulate.map(v => (v.match(/:/) ? '"' + v + '"' : v)).join(':') + ':';


   //if colons are present in the data, we need to escape the string with quotes so the data is not confused to be a
   //multi segment piece of data
   //manipulatedData = ':';
   //for(let dataIdx in dataToManipulate)
   //{
   //  if(dataToManipulate[dataIdx].match(/:/))
   //  {
   //    dataToManipulate[dataIdx] = '"'+dataToManipulate[dataIdx]+'"'
   //  }
   //
   //  manipulatedData = manipulatedData + dataToManipulate[dataIdx] + ':';//multi segment data is separated by colons
   //  //console.log(`manipulated data: ${manipulatedData}`);
   //}

   return manipulatedData;
   }

   return dataToManipulate;//if not a special case, return the same string that was passed in
  }

  testValidityOfTablesAndColumns(jsonToTranslate){
    for (let newTableName in jsonToTranslate) {//this gets the string name of the property 'table'
      let newTableObject = this.model.tables[newTableName];
      if(!newTableObject)
      {
        this._appendError(`table ${newTableName} is not defined in magic data model version ${this.version}`);
        continue;
      }

      //Test to make sure the column names are valid for a given model
      let columnErrorTracker = {};//keep track of invalid columns we have seen
      for (let jsonRowIdx in jsonToTranslate[newTableName]) {
        let jsonColumnNames = Object.getOwnPropertyNames(jsonToTranslate[newTableName][jsonRowIdx]);
        for (let jsonColumnNameIdx in jsonColumnNames) {
          let modelColumn = this.model.tables[newTableName].columns[jsonColumnNames[jsonColumnNameIdx]];
          if (!modelColumn || modelColumn == undefined) {
            if (!columnErrorTracker[jsonColumnNames[jsonColumnNameIdx]] ) {//only add an error if we don't already have an error on the same column
              this._appendError(`column ${jsonColumnNames[jsonColumnNameIdx]} in table ${newTableName} is not defined in magic data model version ${this.version}`);
              //Keeping track of column we have seen for this table. I really only care about the property here, not the value.
              columnErrorTracker[jsonColumnNames[jsonColumnNameIdx]] = 'placeholder';
            }
            continue;
          }
        }
      }
    }
  }

  /*
   Builds an array of table objects ordered by the "position" property of the data model tables.
   sort tables using the "position" property of the data model .
   The array has the following structure:
   [
   {tableName1: [column1, column2,...]},
   {tableName2: [column3, column4,...]},...
   ]
   */
  createOrderedModel()
  {
    let tableNames = Object.getOwnPropertyNames(this.model['tables']);
    let orderedModel = [];
    for(let tableIdx in tableNames)
    {
      let properTablePositionIdx = this.model['tables'][tableNames[tableIdx]].position - 1;
      orderedModel[properTablePositionIdx] = {[tableNames[tableIdx]]:[]};

      let columnPositionMap = [];
      let columnNames = Object.getOwnPropertyNames(this.model['tables'][tableNames[tableIdx]].columns);
      for(let columnIdx in columnNames)
      {
        let columnName = columnNames[columnIdx];
        let columnPosition = this.model['tables'][tableNames[tableIdx]]['columns'][columnName].position;
        columnPositionMap[columnPosition] = columnName;
      }
      //assign the properly ordered array of columns to the object keyed via the current table
      orderedModel[properTablePositionIdx][tableNames[tableIdx]] = columnPositionMap;
    }
    return orderedModel;
  }
}
