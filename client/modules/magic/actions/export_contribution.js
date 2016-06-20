import {_} from 'lodash';
import Runner from '../../er/actions/runner';
import ParseContribution from './parse_contribution';
//import json2csv from 'json2csv';

import {default as magicVersions} from '../configs/magic_versions';
import {default as magicDataModels} from '../configs/data_models/data_models';

export default class extends Runner {

  constructor({LocalState}) {
    super('EXPORT_CONTRIBUTION', {LocalState});
    this.parser = new ParseContribution({LocalState});
    this.version;
    this.model;
  }

  toExtendedText(jsonToTranslate) {

    // returns the same thing as toText but with extra headers (groups, columns names, and units)

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

  }

  toText(jsonToTranslate) {

    // Text should be a valid MagIC tab delimited text file with the tables and columns in the order defined in the data model.

    // Retrieve the data model version used in the jsonToTranslate
    this.version = this.parser.getVersion(jsonToTranslate)
    if (!this.version) return jsonToTranslate;

    // Retrieve the data model
    this.model = magicDataModels[this.version];

    this.testValidityOfTablesAndColumns(jsonToTranslate);

    let orderedModel = this.createOrderedModel(jsonToTranslate);

    // TODO: use the model to build up text string here
    let text = this.createTSVfile(orderedModel, jsonToTranslate);

    return text;

    //RCJM: I think you put this in so feel free to delete it: https://github.com/earthref/earthref/commit/a0d5ecf15ab77904a7e4c71dc94bd1d4986e77d5
    //GGG Rupert i'm uncertain what this was supposed to do, If it is meant to validate tables and columns i've done that
    /*for (var table in jsonToTranslate) {
     if (!table.hasOwnProperty(table)) {
     //The current property is not a direct property of p
     continue;
     }*/
  }

  createTSVfile(orderedModel, jsonToTranslate){
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
    let numberOfTablesInJson = Object.keys(jsonToTranslate).length;
    let numberOfTablesInAddedToTSV = 0;
    for(let orderedTableIdx in orderedModel)
    {
      let tableName = Object.getOwnPropertyNames(orderedModel[orderedTableIdx]);//loop through the tables in the model
      if(jsonToTranslate[tableName])//if the current table exists in the json to translate, add it to the output file
      {
        text = text.concat(`tab delimited\t${tableName}\n`);

        //*********now create the column headers for this table*************
        let columnsToAddToTSVheader = {};//TODO:the object and the array are a bit of a duplicate effort
        let orderedListOfColumnsAddedToHeader = [];//TODO:the object and the array are a bit of a duplicate effort
        for(let orderedColIdx in orderedModel[orderedTableIdx][tableName])//loop through the columns in the ordered model
        {
          let orderedColumnNameToPotentiallyAdd = orderedModel[orderedTableIdx][tableName][orderedColIdx];
          for(let jsonRowsIdx in jsonToTranslate[tableName])
          {
            //if the column from the model is found in the jsonToTranslate, and it hasn't already been added to the
            // column header in the TSV, then add itf
            if(jsonToTranslate[tableName][jsonRowsIdx][orderedColumnNameToPotentiallyAdd] &&
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
        for(let jsonRowsIdx in jsonToTranslate[tableName])
          for(let colNameIdx in orderedListOfColumnsAddedToHeader)
          {
            let colName = orderedListOfColumnsAddedToHeader[colNameIdx];
            let numberOfColumns = orderedListOfColumnsAddedToHeader.length;
            let dataToAdd = jsonToTranslate[tableName][jsonRowsIdx][colName];
           // console.log(`DATA: ${dataToAdd}`);
            if (dataToAdd == undefined){dataToAdd = '';}//for rows with no data

            //console.log(`YO! ${dataToAdd}`);
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

        console.log(`data ${manipulatedData}   ${propertyIdx + 1}    ${numberOfElements}`);
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
