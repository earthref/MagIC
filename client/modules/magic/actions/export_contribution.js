import {_} from 'lodash';
import XLSX from 'xlsx-style';
import Runner from '../../er/actions/runner.js';
import Parser from './parse_contribution';
//import json2csv from 'json2csv';

import {default as magicVersions} from '../configs/magic_versions';
import {default as magicDataModels} from '../configs/data_models/data_models';

export default class extends Runner {

  constructor({LocalState}) {
    super('EXPORT_CONTRIBUTION', {LocalState});
    this.parser = new Parser({LocalState});
    this.version;
    this.model;
  }

  /*To extended text is a boolean indicating whether or not the text should be extended*/
  toText(jsonToExport, toExtendedText) {
    // Text should be a valid MagIC tab delimited text file with the tables and columns in the order defined in the data model.

    // Retrieve the data model version used in the jsonToExport
    this.version = this.parser.getVersion(jsonToExport)
    if (!this.version) return jsonToExport;

    // Retrieve the data model
    this.model = magicDataModels[this.version];
    this.orderedModel = this.createOrderedModel(jsonToExport);

    this.testValidityOfTablesAndColumns(jsonToExport);


    // TODO: use the model to build up text string here
    let text = this.createTSVfile(jsonToExport, toExtendedText);

    return text;
  }

  //Per requirements, this will only work for model 3.0
  toExcel(jsonToExport) {
    this.version = this.VersionGetter.getVersion(jsonToExport);//Todo: refactor the init of class variables into a separate function
    this.model = magicDataModels[this.version];
    this.orderedModel = this.createOrderedModel(jsonToExport);

    // Create an empty workbook
    let workbook = { SheetNames: [], Sheets: {} };

    let style = {fill:{patternType: 'solid'},  font:{}, numFmt:{}, alignment:{}, border:{}};

    for(let modelTable in this.model.tables)
    {
      workbook.SheetNames.push(modelTable);//Create a sheet for each table in the 3.0 model in the workbook.
      
      let tableHeaders = this.createExtendedHeadersData(modelTable, jsonToExport/*, orderedColumnArray*/);

      /*These the first four rows of the excel file*/
      let groupHeader = tableHeaders.groupHeader;
      groupHeader.unshift('Group:  ');//place 'Group' at the beginning of the array
      //console.log(`groupHD${groupHeader}`);
      let typeHeader = tableHeaders.labelHeader;
      typeHeader.unshift('Name:  ');
      typeHeader = tableHeaders.columnTypeOrUnitHeader;
      typeHeader.unshift('Type:  ');
      let columnHeader = tableHeaders.columnNameHeader;
      columnHeader.unshift('Column:  ');

      //Now gather the data from the json object
      let tableData = jsonToExport[modelTable];

      /*Create array of sheet headers/data. This will be an array of arrays.
      The first dimension of the array is the row in the excel sheet
      The second dimension is the row data*/
      let completeSpreadSheetData =
          [
            groupHeader ,
            typeHeader,
            typeHeader,
            columnHeader
            /*      [1,2,3],
             [true, false, null, "sheetjs"],
             ["foo","bar",new Date("2014-02-19T14:30Z"), "0.3"],
             ["baz", null, "qux"]*/
          ]

      //Add data to the spreadsheet row by row, adding a blank column at the beginning
      for(let dataRowIdx in tableData)
      {
        let newRowArray = _.values(tableData[dataRowIdx]);
        newRowArray.unshift('');//Add a blank column at the beginning of each row
        completeSpreadSheetData.push(newRowArray);
      }

      workbook.Sheets[modelTable] = this._toSheet(completeSpreadSheetData);

      //From the xlsx-style docs:
      /*Cell range objects are stored as {s:S, e:E} where S is the first cell and E is the last cell in the range.
      The ranges are inclusive. For example, the range A3:B7 is represented by the object {s:{c:0, r:2}, e:{c:1, r:6}}*/
      let currentSheet = workbook.Sheets[modelTable];

      //TODO: formatting concerns need to be refactored into a separate method
      /*FORMAT SHEETS*/
      //****************FORMAT GROUP HEADER**************
      for(let groupIdx in groupHeader)
      {
        let cellAddress = XLSX.utils.encode_cell({r: 0,c: groupIdx});
        console.log(`here: ${cellAddress}`);

        /*later, we need to compare the next and previous columns for formatting purposes*/
        let nextCellColIdx = Number(groupIdx);
        let previousColIdx = Number(groupIdx);
            nextCellColIdx++;//
        previousColIdx--;

        let nextCellAddressToTheRight = XLSX.utils.encode_cell({c: nextCellColIdx,r: 0});
        let previousCellToTheLeft = XLSX.utils.encode_cell({c: previousColIdx,r: 0});

        //ggg crappy hack to get the first col to be right alligned
        let textOrientation = 'center';
        if(groupIdx == 0)
          textOrientation = 'right';

        //this is the default formatting for the group row.
        currentSheet[cellAddress].s =
        {
          alignment: {horizontal: textOrientation, vertical: 'center'},
          border: {
            left: {style: 'thick', color: {auto: 1}},
            right: {style: 'thick', color: {auto: 1}},
            top: {style: 'thick', color: {auto: 1}},
            bottom: {style: 'thick', color: {auto: 1}}
          },
          font: {bold: 'true'},
          fill: {fgColor: {rgb: 'D3D3D3'}}
        }

        if( currentSheet[nextCellAddressToTheRight] &&
            currentSheet[nextCellAddressToTheRight].v == '')
        {
          currentSheet[cellAddress].s =
          {
            alignment: {horizontal: 'center', vertical: 'center'},
            border: {
              left: {style: 'thick', color: {auto: 1}},
              right: {style: 'hair', color: {auto: 1}},
              top: {style: 'thick', color: {auto: 1}},
              bottom: {style: 'thick', color: {auto: 1}}
            },
            font: {bold: 'true'},
            fill: {fgColor: {rgb: 'D3D3D3'}}
          }
        }
        if (currentSheet[cellAddress].v == '')// Do not bold the border if this cell is empty
        {
         // console.log(`trying for hair..`);
          currentSheet[cellAddress].s =
          {
            alignment: {horizontal: 'center', vertical: 'center'},
            border: {
              left: {style: 'hair', color: {auto: 1}},
              right: {style: 'thick', color: {auto: 1}},
              top: {style: 'thick', color: {auto: 1}},
              bottom: {style: 'thick', color: {auto: 1}}
            },
            font: {bold: 'true'},
            fill: {fgColor: {rgb: 'D3D3D3'}}
          }
        }
        //console.log(`old ${currentSheet[cellAddress].v}`);
      }

      /*FORMAT NAME HEADER*/
      for(let nameIdx in typeHeader)
      {
        let cellAddress = XLSX.utils.encode_cell({c: nameIdx, r: 1});//row 1 of excel output
        if(currentSheet[cellAddress])//if there is data to format
        {
          currentSheet[cellAddress].s = {
            alignment: {horizontal: 'right', vertical: 'center'},
            border: {
              left: {style: 'hair', color: {auto: 1}},
              right: {style: 'hair', color: {auto: 1}},
              top: {style: 'hair', color: {auto: 1}},
              bottom: {style: 'hair', color: {auto: 1}}
            },
            fill: {fgColor: {rgb: 'DCDCDC'}}
          };
        }
      }

      /*FORMAT TYPE HEADER*/
      for(let typeIdx in typeHeader)
      {
        let cellAddress = XLSX.utils.encode_cell({c: typeIdx, r: 2});
        if(currentSheet[cellAddress])//if there is data to format
        {
        currentSheet[cellAddress].s = {
          alignment: {horizontal: 'right', vertical: 'center'},
          border: {
            left: {style: 'hair', color: {auto: 1}},
            right: {style: 'hair', color: {auto: 1}},
            top: {style: 'hair', color: {auto: 1}},
            bottom: {style: 'hair', color: {auto: 1}}
          },
          fill: {fgColor: {rgb: 'DCDCDC'}}
        };
        }
      }

      for(let typeIdx in typeHeader)
      {
        let cellAddress = XLSX.utils.encode_cell({c: typeIdx, r: 2});
        currentSheet[cellAddress].s = {
          alignment: {horizontal: 'center', vertical: 'center'},
          border: {
            left: {style: 'hair', color: {auto: 1}},
            right: {style: 'hair', color: {auto: 1}},
            top: {style: 'hair', color: {auto: 1}},
            bottom: {style: 'hair', color: {auto: 1}}
          },
          //font: {bold: 'true'},
          fill: {fgColor: {rgb: 'DCDCDC'}}
        };
      }

      for(let columnIdx in columnHeader)
      {
        //todo: reverse col/row
        let cellAddress = XLSX.utils.encode_cell({c: columnIdx, r: 3});
        currentSheet[cellAddress].s = {
          alignment: {horizontal: 'right', vertical: 'center'},
          border: {
            left: {style: 'hair', color: {auto: 1}},
            right: {style: 'hair', color: {auto: 1}},
            top: {style: 'hair', color: {auto: 1}},
            bottom: {style: 'thick', color: {auto: 1}}
          },
          fill: {fgColor: {rgb: 'DCDCDC'}}
        };
      }

      //style; //{fill.patternType: 'solid'};
      /*currentSheet['A2'].v = 'Name:';
      currentSheet['A3'].v = 'Type:';
      currentSheet['A4'].s = 'Column:';*/

    }

    return workbook;
  }


  _datenum(v, date1904) {
    if(date1904) v+=1462;
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
  }

  _toSheet(data, opts) {
    var workSheet = {};
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

        if(typeof cell.v === 'number') cell.t = 'n';
        else if(typeof cell.v === 'boolean') cell.t = 'b';
        else if(cell.v instanceof Date) {
          cell.t = 'n'; cell.z = XLSX.SSF._table[14];
          cell.v = this._datenum(cell.v);
        }
        else cell.t = 's';

        workSheet[cell_ref] = cell;
      }
    }
    if(range.s.c < 10000000) workSheet['!ref'] = XLSX.utils.encode_range(range);
    return workSheet;
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

  createExtendedHeadersData(tableName, jsonToExport/*, orderedColumnArray*/)
  {
    // returns data to be used for extra headers (groups, columns names, and units)
    let discoveredColumns = {};
    let previousGroupFound = '';
    let groupHeaderArray = [];
    let labelHeaderArray = [];
    let columnTypeOrUnitHeaderArray = [];
    let columnHeaderArray = [];
    //let orderedTableIdx = _getOrderedColumnList
    let orderedColumnArray = this._getOrderedColumnList(tableName);
    
    //loop through ordered model columns for this table, see if json has data from that column
    for(let orderedColumnIdx in orderedColumnArray)
    {
      let potentialColumnToAdd = orderedColumnArray[orderedColumnIdx];
      //Traverse the entire JSON table's rows looking for usages of the each column found in the ordered model. If the JSON file has the column in question
      //extract the desired information and create the extended header
      for(let jsonRowIdx in jsonToExport[tableName])
      {
        if (jsonToExport[tableName][jsonRowIdx][potentialColumnToAdd] && //if this ordered column is found in the json file
            !discoveredColumns[potentialColumnToAdd]) //and we haven't seen this column before
        {
          //ggg gather data here from the model and add the header
          discoveredColumns[potentialColumnToAdd] = potentialColumnToAdd;//again this is a bit of overlapping code here but i like the object notatoin for keeping track of a set
          columnHeaderArray.push(potentialColumnToAdd);

          let labelToAdd = this.model['tables'][tableName]['columns'][potentialColumnToAdd]['label'];
          labelHeaderArray.push(labelToAdd);

          //we only want to add a 'group' header when the current group is different than the previous one. If the group is the same as the previous
          //the we want to only add a tab
          let currentGroupToAdd = this.model['tables'][tableName]['columns'][potentialColumnToAdd]['group'];
          if(previousGroupFound != currentGroupToAdd)
            groupHeaderArray.push(currentGroupToAdd);
          else
            groupHeaderArray.push('');

           previousGroupFound = currentGroupToAdd;//this.model['tables'][tableName]['columns'][potentialColumnToAdd]['group'];

          columnTypeOrUnitHeaderArray.push(this.getColumnTypeOrUnitString(tableName,potentialColumnToAdd));
        }
      }
    }

    let orderedHeaderData = {};
    orderedHeaderData.groupHeader = groupHeaderArray;
    orderedHeaderData.labelHeader= labelHeaderArray;
    orderedHeaderData.columnTypeOrUnitHeader = columnTypeOrUnitHeaderArray;
    orderedHeaderData.columnNameHeader = columnHeaderArray;

    return orderedHeaderData;
  }

  getColumnTypeOrUnitString(tableName, potentialColumnToAdd)
  {
    // logic for column type/unit row:
    // if type === 'Number'
    //   if unit === 'Dimensionless' or 'Custom' or empty
    //     print 'Number'
    //   else
    //     print 'Number in [unit]'
    // else if unit === 'Flag'
    //     print 'Flag'
    // else
    //     print '[type]'

    let columnTypeOrUnitString = '';
    let columnType = this.model['tables'][tableName]['columns'][potentialColumnToAdd]['type'];
    let columnUnit = this.model['tables'][tableName]['columns'][potentialColumnToAdd]['unit'];

    if(columnType === 'Number')
    {
      if( columnUnit === 'Dimensionless' ||
          columnUnit === 'Custom' ||
          columnUnit === '')
        columnTypeOrUnitString = 'Number';
      else
        columnTypeOrUnitString = `Number in ${columnUnit}`;
    }
    else if (columnUnit === 'Flag')
      columnTypeOrUnitString= 'Flag';
    else
      columnTypeOrUnitString = columnType;

    return columnTypeOrUnitString;
  }

  createTSVfile( jsonToExport, toExtendedText){
    //  loop through the used tables in data model order,
    //   print the table header (note: "tab delimited\ttable_name" format)
    //   loop through the used columns for that table in data model order,
    //     print the column headers
    //   loop through the rows in that table in the order in the jsonToTranslate,
    //     loop through the used columns for that table in data model order,
    //       print the column value for that row
    //         note: arrays turn into :val1:val2 string,
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

            dataToAdd =  this.handleSpecialCases(dataToAdd,colName);

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

  handleSpecialCases(dataToManipulate, columnName)
  {
    if (dataToManipulate == '') return dataToManipulate;

    let manipulatedData = '';

    if(columnName == 'external_database_ids')
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


    if(columnName == 'rotation_sequence')
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

    if( columnName == 'er_citation_names' ||
        columnName == 'magic_method_codes'||
        columnName == 'method_codes' ||
        columnName == 'citations')
    {
      //if colons are present in the data, we need to escape the string with quotes so the data is not confused to be a
      //multi segment piece of data
      manipulatedData = ':';
      for(let dataIdx in dataToManipulate)
      {
        if(dataToManipulate[dataIdx].match(/:/))
        {
          dataToManipulate[dataIdx] = '"'+dataToManipulate[dataIdx]+'"'
        }

        manipulatedData = manipulatedData + dataToManipulate[dataIdx] + ':';//multi segment data is separated by colons
        //console.log(`manipulated data: ${manipulatedData}`);
      }
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
  createOrderedModel(jsonToTranslate)
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
