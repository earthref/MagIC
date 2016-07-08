import {_} from 'lodash';
import XLSX from 'xlsx-style';
import Runner from '../../core/actions/runner.js';
import GetContributionVersion from './get_contribution_version';
import {default as magicDataModels} from '../configs/data_models/data_models';

export default class extends Runner {

  constructor({LocalState}) {
    super('EXPORT_CONTRIBUTION', {LocalState});
    this.VersionGetter = new GetContributionVersion({LocalState});
    this.version;
    this.model;
    }

  /*To extended text is a boolean indicating whether or not the text should be extended*/
  toText(jsonToExport, toExtendedText) {
    // Text should be a valid MagIC tab delimited text file with the tables and columns in the order defined in the data model.
    // Retrieve the data model version used in the jsonToExport
    this.version = this.VersionGetter.getVersion(jsonToExport)
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
    //Now set properties related to the header for this sheet.
    //I'm making these class variables as they apply globally to all generated sheets, although obviously they only apply to excel exports
    this.HEADER_ROW_START_IDX = 0;//hard coded as the [0,0] index is where the header range starts
    this.HEADER_COL_START_IDX = 0;//hard coded as the [0,0] index is where the header range starts
    this.HEADER_ROW_END_IDX = 3;//hard coded as there are always four header columns
    this.LAST_COL_IDX = {};//for each table/sheet, will be populated with an integer, indicating the last column for that sheet
    this.LAST_ROW_IDX = {};//for each table/sheet, will be populated with an integer, indicating the last row for that sheet
    this.EXTRA_ROW_FORMATTING_PADDING = 20;
    //this.COL_WIDTHS = {};//this will contain an array for each sheet containing width formatting info for each column

    // Create an empty workbook
    let workbook = { SheetNames: [], Sheets: {} };

    //Create a sheet for each table in the model, and add headers and data to it
    //for(let orderedTableIdx in this.orderedModel)
    for(let tableName in this.model.tables)
    {
      //let tableName = Object.getOwnPropertyNames(this.orderedModel[orderedTableIdx]);//loop through the tables in the model

      if(!jsonToExport[tableName])//only process this table if it exists in the json to export file
        continue;

      workbook.SheetNames.push(tableName);//Create a sheet for each table in the 3.0 model in the workbook.

//      console.log(`Before SHEET: ${tableName}  Index:  ${orderedTableIdx}` );

      //gather the data for the table headers
      let tableHeaders = this.createExtendedHeadersData(tableName, jsonToExport);

      /*These the first four rows of the excel file, and they will always be the same*/
      let groupHeader = tableHeaders.groupHeader;
      groupHeader.unshift('Group:  ');//place 'Group' at the beginning of the array;
      let nameHeader = tableHeaders.labelHeader;
      nameHeader.unshift('Name:  ');
      let typeHeader = tableHeaders.columnTypeOrUnitHeader;
      typeHeader.unshift('Type:  ');
      let columnHeader = tableHeaders.columnNameHeader;
      columnHeader.unshift('Column:  ');

      /*Create array of sheet headers. This will be an array of arrays.
      The first dimension of the array is the row in the excel sheet
      The second dimension is the row data*/
      let completeSpreadSheetData =
          [
            groupHeader ,
            nameHeader,
            typeHeader,
            columnHeader
            /*      [1,2,3],
             [true, false, null, "sheetjs"],
             ["foo","bar",new Date("2014-02-19T14:30Z"), "0.3"],
             ["baz", null, "qux"]*/
          ]

      //Now gather the data from the json object
      let jsonTableData = jsonToExport[tableName];

      //Add data to the spreadsheet row by row, adding a blank column at the beginning of each row
      for(let jsonRowDataIdx in jsonTableData)
      {
        //console.log(` ${jsonTableData[jsonRowDataIdx]}`);
        ///Insert data into each column of a row in the proper row order
        //let orderedColumnNames = this.orderedModel[orderedTableIdx][tableName];
        let orderedColListForThisJsonTable = this.filterRelevantOrderedListOfColumns(tableName, jsonToExport, -1/*orderedColumnNames*/);
        let numberOfColumns = orderedColListForThisJsonTable.length;
        let newRowArray = [];
        for(let colNameIdx in orderedColListForThisJsonTable)
        {
          //grab the column names in order, extract from unordered JSON and add to ordered array
          let colName = orderedColListForThisJsonTable[colNameIdx];

          //console.log(`Trying to get data from JSON.  table: ${tableName}  jsonRowIdx: ${jsonRowDataIdx} ColName: ${colName} `);
          let dataToAdd = jsonToExport[tableName][jsonRowDataIdx][colName];
          if (dataToAdd == undefined){dataToAdd = '';}//for rows with no data

          newRowArray.push(dataToAdd);//add one data column to the row
        }

//        console.log(`Adding new row data: ${newRowArray}`);
        newRowArray.unshift('');//this makes the first column blank
        //console.log(`First Data Column${newRowArray[0]}`);
        //console.log(`Second Data Column${newRowArray[1]}`);
        completeSpreadSheetData.push(newRowArray);


      }

      //book keeping for later regarding spreadsheet dimensions
      this.LAST_COL_IDX[tableName] = groupHeader.length - 1;
      this.LAST_ROW_IDX[tableName] = completeSpreadSheetData.length- 1;

      //Create sheet for workbook
      workbook.Sheets[tableName] = this._toSheet(completeSpreadSheetData);

      //TODO: formatting concerns need to be refactored into a separate method
      /************FORMAT SHEETS**************/
      let currentSheet = workbook.Sheets[tableName];

      //find proper column widths, "!cols" is a special property of the sheet that we can set
      currentSheet['!cols'] = this._findColumnWidthsBasedOnHeaders(completeSpreadSheetData);// !cols is a special property of a worksheet that has a list of properties for each column

      //****************FORMAT GROUP HEADER**************
      for(let groupIdx in groupHeader)
      {
        let cellAddress = XLSX.utils.encode_cell({r: 0,c: groupIdx});

        /*later, we need to compare the next and previous columns for formatting purposes*/
        let nextCellColIdx = Number(groupIdx);
        let previousColIdx = Number(groupIdx);
            nextCellColIdx++;//
        previousColIdx--;


        //let previousCellToTheLeft = XLSX.utils.encode_cell({c: previousColIdx,r: 0});

        //DEFAULT FORMATTING FOR GROUP.
        let groupRowColor = { rgb: 'cccccc' };
        currentSheet[cellAddress].s =
        {
          alignment: {horizontal: 'center', vertical: 'center'},
          border: {
            left: {style: 'thick', color: {auto: 1}},
            right: {style: 'thick', color: {auto: 1}},
            top: {style: 'thick', color: {auto: 1}},
            bottom: {style: 'thick', color: {auto: 1}}
          },
          font: {bold: 'true', sz:'12'},
          fill: {fgColor: groupRowColor}
        }


        //OVERRIDE GROUP FORMATTING
       // let nextCellAddressToTheRight = XLSX.utils.encode_cell({c: nextCellColIdx,r: 0});
        if(this._isNextCellSameGroupHeader(nextCellColIdx, currentSheet))
        {
          //this is a hack to move the text closer to the "center" when a group takes up two columns
          currentSheet[cellAddress].s.alignment = {horizontal: 'right', vertical: 'center'};
          currentSheet[cellAddress].s.border.right = {style:'hair', color: groupRowColor};
        }
        /*else
        {
          currentSheet[cellAddress].s.border.right = {style:'medium', color: groupRowColor};
        }*/
        if (currentSheet[cellAddress].v == '')// Do not bold the border if this cell is empty
        {
          currentSheet[cellAddress].s.border.left = {style: 'hair', color: groupRowColor};
        }
      }

      /**********FORMAT NAME HEADER**********/
      let nameTypeColumnBorderStyle = 'thin';
      let nameTypeColumnFillColor =  {rgb: 'f2f2f2'};
      for(let nameHeaderIdx in typeHeader)
      {
        let cellAddress = XLSX.utils.encode_cell({r: 1, c: nameHeaderIdx});//row 1 of excel output
        
        if(currentSheet[cellAddress])//if there is data to format
        {
          currentSheet[cellAddress].s = {
            alignment: {horizontal: 'left', vertical: 'center'},
            border: {
              left: {style: nameTypeColumnBorderStyle, color: {auto: 1}},
              right: {style: nameTypeColumnBorderStyle, color: {auto: 1}},
              top: {style: 'hair', color: {auto: 1}},
              bottom: {style: 'hair', color: nameTypeColumnFillColor}
            },
            fill: {fgColor: nameTypeColumnFillColor}
          };
        }
      }

      /********FORMAT TYPE HEADER*******/
      for(let typeIdx in typeHeader)
      {
        let cellAddress = XLSX.utils.encode_cell({r: 2,c: typeIdx});
        currentSheet[cellAddress].s = {
          font:{color: {rgb: '808080'}},//this changes the color of the TYPE header text to grey-ish
          alignment: {horizontal: 'left', vertical: 'center'},
          border: {
            left: {style: nameTypeColumnBorderStyle, color: {auto: 1}},
            right: {style: nameTypeColumnBorderStyle, color: {auto: 1}},
            top: {style: 'hair', color: nameTypeColumnFillColor},//making the border the same color as the 'fill' effectively hides them from sight
            bottom: {style: 'hair', color: nameTypeColumnFillColor}
          },
          fill: {fgColor: nameTypeColumnFillColor}
        };
      }

      /**********FORMAT COLUMN HEADER***********/
      for(let columnIdx in columnHeader)
      {
        let cellAddress = XLSX.utils.encode_cell({r: 3,c: columnIdx});
        currentSheet[cellAddress].s = {
          alignment: {horizontal: 'left', vertical: 'center'},
          border: {
            left: {style: nameTypeColumnBorderStyle, color: {auto: 1}},
            right: {style: nameTypeColumnBorderStyle, color: {auto: 1}},
            top: {style: 'hair', color: nameTypeColumnFillColor},
            bottom: {style: 'thick', color: {auto: 1}}
          },
          fill: {fgColor: nameTypeColumnFillColor}
        };


        /* GGG -HYPERLINK CAPABILITY DOESN'T SEEM TO BE SUPPORTED IN XLSX-SYLE
         Despite what appears in the docs to be hyperlink support...after first attempting many different approaches which seemed like they should be no-brainers, and the researching, I'm nearly sure there is no support for creating hyperlinks when writing docs.
         These discussions corroborate this flaw in the xlsx-style package (along with its parent package):

         https://www.bountysource.com/issues/7424885-when-writing-hyperlink-cell-save-the-wb-cell-created-as-simple-text
         (latest part of this conversation was today)

         http://stackoverflow.com/questions/32485449/xlxs-js-how-does-the-l-cell-hyperlink-object-option-work

         Below are some attempts to make it work, similar to attempts made by others. These fields are apparently ignored as they have no effect on the output
         */
        /*currentSheet[cellAddress].w = undefined;
        currentSheet[cellAddress].t = 's';
        currentSheet[cellAddress].h = 'true';

        currentSheet[cellAddress].l= {Target: 'pleaseWork'}; //{ Target: 'testItBaby', tooltip: 'No Chance'};//`<a href="url">${currentSheet[cellAddress].v}</a>`;*/
        //currentSheet[cellAddress].v = currentSheet[cellAddress].v.display;
        //currentSheet[cellAddress].w = `<a href="url">${currentSheet[cellAddress].v}</a>`;
        //'https://earthref.org/MagIC/data-models/3.0/#[table].[column]'
      }

      let cellAddress = undefined;
      //Override Group, Name, Type, and Column headers style (the first column of the headers
      cellAddress = XLSX.utils.encode_cell({ r: 0, c: 0});
      currentSheet[cellAddress].s.alignment = {horizontal: 'right', vertical: 'center'};
      currentSheet[cellAddress].s.border.right = {style: 'thick', color: {auto: 1}};

      cellAddress = XLSX.utils.encode_cell({ r: 1, c: 0});
      currentSheet[cellAddress].s.alignment = {horizontal: 'right', vertical: 'center'};
      currentSheet[cellAddress].s.border.right = {style: 'thick', color: {auto: 1}};

      //This is the hard code for justification of the header for rows 1, 2 and 3
      //TODO: only override properties that have changed from the baseline style, without redefining the rest of the style, as done above for rows 0 and 1 ,something like this::
      cellAddress = XLSX.utils.encode_cell({r: 2, c: 0});
      currentSheet[cellAddress].s = {
      alignment: {horizontal: 'right', vertical: 'center'},
      border: {
        left: {style: 'hair', color: {auto: 1}},
        right: {style: 'thick', color: {auto: 1}},
        top: {style: 'hair', color: {auto: 1}},
        bottom: {style: 'hair', color: {auto: 1}}
      },
      fill: {fgColor: {rgb: 'f2f2f2'}}
    };

    cellAddress = XLSX.utils.encode_cell({r: 3, c: 0});
    currentSheet[cellAddress].s = {
      alignment: {horizontal: 'right', vertical: 'center'},
      border: {
        left: {style: 'hair', color: {auto: 1}},
        right: {style: 'thick', color: {auto: 1}},
        top: {style: 'hair', color: {auto: 1}},
        bottom: {style: 'thick', color: {auto: 1}}
      },
      fill: {fgColor: {rgb: 'f2f2f2'}}
    };

      //console.log(`json:\n ${JSON.stringify(currentSheet)}`);

     /*****FORMAT DATA CELLS*****/
     //currentSheet = this.formatDataCells(currentSheet);

      /****FORMAT FINAL CONCERNS****/
      currentSheet = this.finalFormattingConcerns(currentSheet, tableName);
    }

    return workbook;
  }

  /*This is a placeholder for one of the final formatting concerns, right justifying floats/doubles*/ //GGG i gigure this is low priority
  formatDataCells(currentSheet)
  {
   /* if(currentSheet[cellAddress])
    {

    }*/
  }

  /*This is where we hope to clean up formatting odds and ends that didn't fit into any previous slot*/
  //GGG Currently buggy
  finalFormattingConcerns(currentSheet, tableName)
    {
      //console.log(`Table ${modelTable}`);
      //Traverse all of the header rows to override special formatting where needed
      /*for(let rowIdx = this.HEADER_ROW_START_IDX; rowIdx <= this.HEADER_ROW_END_IDX; rowIdx++)
      {
        console.log(`Row: ${rowIdx}  Col: ${this.LAST_COL_IDX[modelTable]}`);
        let cellAddressLastColumn = XLSX.utils.encode_cell({r: rowIdx, c: this.LAST_COL_IDX[modelTable]});
        cellAddressLastColumn.s.border = {left: {style: 'thick', color: {auto: 1}}};
      }*/

      //this.HEADER_ROW_END_IDX +1   this.LAST_ROW_IDX[currentSheet]`
      //Traverse every DATA row of the sheet (not headers) and alter the first and last columns' formatting
      for(let rowIdx = this.HEADER_ROW_END_IDX +1; rowIdx <= this.LAST_ROW_IDX[tableName] /*+ this.EXTRA_ROW_FORMATTING_PADDING*/; rowIdx++)
      {
        console.log(`ROW IDX: ${rowIdx}`);
        let cellAddressFirstColumn = XLSX.utils.encode_cell({r: rowIdx, c: 0});
        let cellAddressLastColumn = XLSX.utils.encode_cell({r: rowIdx, c: this.LAST_COL_IDX[tableName]});

        //The beginning and end of the table rows have thick left and right cell borders
        /*currentSheet[cellAddressFirstColumn].s.border = {left: {style: 'thick', color: {auto: 1}}};*/
        currentSheet[cellAddressFirstColumn].s =
        {
          alignment: {horizontal: 'left', vertical: 'center'},
          border: {
            left: {style: 'hair', color: {auto: 1}},
            right: {style: 'thick', color: {auto: 1}},
            top: {style: 'hair', color: {auto: 1}},
            bottom: {style: 'hair', color: {auto: 1}}
          }
        };

        console.log(`json: ${JSON.stringify(cellAddressLastColumn)}  Value: ${currentSheet[cellAddressLastColumn]}`);
        //console.log(`data sheet: ${JSON.stringify(currentSheet[cellAddressLastColumn])}`);
        //The beginning and end of the table rows have thick left and right cell borders
      currentSheet[cellAddressLastColumn].s = {
        alignment: {horizontal: 'left', vertical: 'center'},
        border: {
          left: {style: 'hair', color: {auto: 1}},
          right: {style: 'thick', color: {auto: 1}},
          top: {style: 'hair', color: {auto: 1}},
          bottom: {style: 'hair', color: {auto: 1}}
        }
      };
    }

    //Traverse every data row and column. Add formatting where for numbers (right justify) and group columns (slightly darker dividing lines)
      for(let rowIdx = this.HEADER_ROW_END_IDX +1; rowIdx <= this.LAST_ROW_IDX[tableName] /*+ this.EXTRA_ROW_FORMATTING_PADDING*/; rowIdx++)
      {
        for(let colIdx = 0; colIdx <= this.LAST_COL_IDX[tableName]; colIdx++)
        {
          if(!this._isNextCellSameGroupHeader(colIdx, currentSheet))
          {
            //add a style object to every data row for potential formatting
            let cellAddress = XLSX.utils.encode_cell({r: rowIdx, c: colIdx});
            currentSheet[cellAddress].s = {
              alignment: {horizontal: 'left', vertical: 'center'},
              border: {
                left: {style: 'medium', color: {auto: 1}},
                right: {style: 'hair', color: {auto: 1}},
                top: {style: 'hair', color: {auto: 1}},
                bottom: {style: 'hair', color: {auto: 1}}
              }
            };
          }
        }
      }

    return currentSheet;
  }

  _isNextCellSameGroupHeader(nextGroupHeaderColIdx, currentSheet)
  {
    let nextCellAddressToTheRight = XLSX.utils.encode_cell({c: nextGroupHeaderColIdx,r: 0});
    return ( currentSheet[nextCellAddressToTheRight] &&
        currentSheet[nextCellAddressToTheRight].v == '')
  }


  /*This method produces an object that is friendly to xlxs-style outlining the size of each column. The format looks like this:
   * var wscols = [
   {wch:6},
   {wch:7},
   {wch:10}
   ];
   with each array index corresponding to a column in the spreadsheet*/
  _findColumnWidthsBasedOnHeaders(completeSpreadSheetData)
  {
    let numberOfColumns = completeSpreadSheetData[0].length;//using the first row to infer the number of columns for the entire spreadsheet
    let workSheetColWidths = new Array(numberOfColumns).fill({wch:0});
    for(let rowIdx in completeSpreadSheetData)
    {
      for(let colIdx in completeSpreadSheetData[rowIdx])
      {
        if(completeSpreadSheetData[rowIdx][colIdx].length > workSheetColWidths[colIdx].wch)
        {
//          console.log(`LAST COL IDX COLS ROW 0: ${numberOfColumns - 1} accessing col: ${colIdx}`);
          workSheetColWidths[colIdx] = {wch:completeSpreadSheetData[rowIdx][colIdx].length};
        }
      }
    }

    return workSheetColWidths;
  }

  //creates a single extended header TSV based on the table
  generateExtendedHeaderTSV(tableName, jsonToExport)
  {
    let extendedHeader = '';
    let extraHeaderData = this.createExtendedHeadersData(tableName, jsonToExport);

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
  };

  createExtendedHeadersData(tableName, jsonToExport)
  {
    // returns data to be used for extra headers (groups, columns names, and units)
    let discoveredColumns = {};
    let previousGroupFound = '';
    let groupHeaderArray = [];
    let labelHeaderArray = [];
    let columnTypeOrUnitHeaderArray = [];
    let columnHeaderArray = [];
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

  /**
   Logic for column type/unit row:

  if type === 'Number'
    if unit === 'Dimensionless' or 'Custom' or empty
      print 'Number'
    else
      print 'Number in [unit]'
  else if unit === 'Flag'
      print 'Flag'
  else
      print '[type]'
   **/
  getColumnTypeOrUnitString(tableName, potentialColumnToAdd)
  {
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
          text = text + this.generateExtendedHeaderTSV(tableName, jsonToExport)
        }

        //*********now create the column headers for this table************
        let orderedColumnNames = this.orderedModel[orderedTableIdx][tableName];
        let orderedListOfColumnsAddedToHeader = this.filterRelevantOrderedListOfColumns(tableName, jsonToExport, orderedColumnNames);//<---try to put -1 for orderedColumnNames
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

            dataToAdd =  this._handleSpecialCases(dataToAdd,colName);

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

    /*This returns the ordered list of columns associated with the table name that is passed in
    * The indices correspond DIRECTLY to the position number in the model, that means that the
    * zeroith index is empty.*/
    _findOrderedColumns(tableName)
    {
      for(let orderedModelTableIdx in this.orderedModel)
      {
        let orderedModelTableName = Object.getOwnPropertyNames(this.orderedModel[orderedModelTableIdx])[0];

        //console.log(`Trying ${tableName}: ${tableName.length}   ModelTableNa ${orderedModelTableName}: ${orderedModelTableName.length}`);
        if(orderedModelTableName === tableName)
        {
            return this.orderedModel[orderedModelTableIdx][tableName];
        }
      }
    }

  //This will extract only the columns that are being used in a given jsonToExport and return an array of those columns
  filterRelevantOrderedListOfColumns(tableName, jsonToExport, orderedColumnNames)
  {
    let columnsToAddToHeader = {};//TODO:the object and the array are a bit of a duplicate effort, this simply keeps track of columns we have already seen by adding a property
    let orderedListOfColumnsAddedToHeader = [];//TODO:the object and the array are a bit of a duplicate effort
    if(orderedColumnNames == -1)//find
    {
      orderedColumnNames = this._findOrderedColumns(tableName);
    }
    console.log(`OrderedColumnNames: ${JSON.stringify(orderedColumnNames)}`);

    for(let orderedColIdx in orderedColumnNames)//loop through the columns in the ordered model
    {
      let orderedColumnNameToPotentiallyAdd = orderedColumnNames[orderedColIdx];
      for(let jsonRowsIdx in jsonToExport[tableName])
      {
        //if the column from the model is found in the jsonToTranslate, and it hasn't already been added to the
        // column header in the TSV, then add it
        if(jsonToExport[tableName][jsonRowsIdx][orderedColumnNameToPotentiallyAdd] &&
            !columnsToAddToHeader[orderedColumnNameToPotentiallyAdd] )
        {
          columnsToAddToHeader[orderedColumnNameToPotentiallyAdd] = 'have already seen this column';//keep track of columns we've seen
          orderedListOfColumnsAddedToHeader.push(orderedColumnNameToPotentiallyAdd);
        }
      }
    }
//    console.log(`FINAL COL LIST : ${JSON.stringify(orderedListOfColumnsAddedToHeader)}`);
    return orderedListOfColumnsAddedToHeader;
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

  _handleSpecialCases(dataToManipulate, columnName)
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
   * This a shitty, terribly documented, albiet necessary function from the xslx-style package.
   * I am relegating this method to the bowles of this overblown class.
   * */
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

  /*This menthod is also from the xlsx package example*/
  _datenum(v, date1904) {
    if(date1904) v+=1462;
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
  }
}
