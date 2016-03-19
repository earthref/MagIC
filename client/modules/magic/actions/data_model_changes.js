import {_} from 'lodash';
import Runner from './runner';

import {magicVersions} from '../configs/magic_versions.js';
import {magicDataModels} from '../configs/data_models/data_models.js';

/*This class makes a lists of changes from the "previous" model to the "current" model*/
export default class extends Runner {

  constructor({LocalState}) {
    super('DATA_MODEL_CHANGE_LOG', {LocalState});

    //model changes that must be reflected:
    //deleted, inserted, renamed, merged
    this.modelChanges = {};
    this.dataModelVersionNumber = '0';
  }

  changes(model) {

    this.modelChanges.deleted_columns = [];//GGG we need to fill this list with all the prior columns and remove them as we find other columns
    this.modelChanges.inserted_columns = [];
    this.modelChanges.renamed_columns = [];
    this.modelChanges.merged_columns = [];

    try {
      this.criticalModelValidation(model);
    }
    catch (err){
      // console.log("Basic model validation failed. " + err);
      return "Basic model validation failed. " + err;
    }
//    let dataModel = dataModels['2.3'];  //GGG this is from the original parser test
    let dataModel = model;
    this.dataModelVersionNumber = dataModel.magic_version;

    console.log('Outlining changes for data model: ' + this.dataModelVersionNumber);
    for(let table in dataModel.tables)
    {
      let changedColumn = false;

      if(!hasOwnProperty.call(dataModel.tables[table], 'columns')){
        this._appendError(`failed to find the columns list for table: ${table}`);
      }

      console.log(`--------------Ver ${this.dataModelVersionNumber} changes for table: ${table} ---------------`);
      for (let column in dataModel.tables[table].columns) {

        //************************** BASIC VALIDATION OF COLUMNS ***********************
        //TEST FOR PROPER PREVIOUS COLUMN STRUCTURE
        let prevColArray = dataModel.tables[table].columns[column].previous_columns;
        let nextColArray = dataModel.tables[table].columns[column].next_columns;

        //GGG Once again, i feel like I'm in the year 1991, programming in BASIC. I don't like scripting. Using a "continue" here to skip this iteration/
        //If there is no mention of a previous or next column, then there is no change to be reported.
        if(prevColArray == undefined && nextColArray == undefined)  {continue;}

        if((prevColArray == undefined ||
          prevColArray.length == 0 ||
          !hasOwnProperty.call(prevColArray[0], 'table'))){
          this._appendError(`failed to find the previous table name for column ${column} in table ${table}`);
        }
        if(prevColArray == undefined ||
          prevColArray.length == 0 ||
          !hasOwnProperty.call(prevColArray, 'column')){
          this._appendError(`failed to find the previous column name for column ${column} in table ${table}`);
        }

        //TEST FOR PROPER NEXT COLUMN STRUCTURE
        if( nextColArray == undefined ||
          nextColArray.length == 0 ||
          !hasOwnProperty.call(nextColArray[0], 'table')){
          this._appendError(`failed to find the next table name for column ${column} in table ${table}`);
        }
        if( nextColArray == undefined ||
          nextColArray.length == 0 ||
          !hasOwnProperty.call(nextColArray, 'column')){
          this._appendError(`failed to find the next column name for column ${column} in table ${table}`);
        }


        //************************** DETECTION OF COLUMN CHANGES ***********************
        //TEST FOR NEW COLUMNS
        if (this.dataModelVersionNumber != '2.0')//All columns in 2.0 are considered "new"
        {
          /*The schemas aren't consistent when it comes to next and previous columns being absent. Sometimes there is an
           empty array signifying no next/previous columns (v.2.2 - v2.4), other times there is an array with a single empty
           object (v 2.0, 2.1) and still other times the "previous" or "next" column properries don't exist at all (v2.5)*/
          //let prevColArray = dataModel.tables[table].columns[column]['previous_columns']
          if (prevColArray == undefined ||
            prevColArray.length == 0 ||
            !hasOwnProperty.call(prevColArray[0], 'column')) {
            changedColumn = true;

            //console.log(`PUSHING: table:${table} and column: ${column}`);
            let insertedElement = {table:table, column:column};
            this.modelChanges.inserted_columns.push(insertedElement);
            console.log(`**** INSERTED columns: " ${column}  Ver: ${this.dataModelVersionNumber}, Table: ${table}  ****`);
          }
        }

        //TEST FOR DELETED COLUMNS
        //nextColArray = dataModel.tables[table].columns[column]['next_columns'];
        if  (nextColArray == undefined ||
          nextColArray.length == 0 ||
          !(hasOwnProperty.call(nextColArray[0], 'column'))){
          changedColumn = true;

          //console.log(`PUSHING: table:${table} and column: ${column}`);
          let deletedElement = {table:table, column:column};
          this.modelChanges.deleted_columns.push(deletedElement);
          console.log(`**** DELETED column: " ${column}  Ver: ${this.dataModelVersionNumber}, Table: ${table}  ****`);
        }
        else {//test for name change
          let currentColName = column;
          let nextColumnName = dataModel.tables[table].columns[column]['next_columns'][0]['column'];
          //console.log("Next Column: " + nextColumnName);
          if (!(currentColName === nextColumnName)) {
            console.log(`**** Column name change detected, Ver: ${this.dataModelVersionNumber}, Table: ${table}  ****`);
            console.log(`Current: ${currentColName}`);
            console.log(`Next:    ${nextColumnName}`);
          }
        }

        this.testForRenamedColumns(prevColArray,nextColArray,table, column);
        this.testForMergedColumns(prevColArray,nextColArray,table, column);
      }
    }

    return this.modelChanges;
  }



  testForMergedColumns(prevColArray,nextColArray,currentTable,currentColumn)
  {
    if (nextColArray == undefined ||
      nextColArray.length == 0 ||
      !(hasOwnProperty.call(nextColArray[0], 'column')) ||
      prevColArray == undefined ||
      prevColArray.length == 0 ||
      !(hasOwnProperty.call(prevColArray[0], 'column'))
    )
    //if(this.previousAndNextNotExist())
    {//IF EITHER PREV/NEXT PROPERTY DOES NOT EXIST, THIS IS NOT A RENAMED COLUMN
      return false;
    }
    else
    {
      if (prevColArray.length > 1 && nextColArray.length == 1) {
        let mergedElement = {
          table: currentTable,
          column: currentColumn,
          merged_columns: [
            /*table: currentTable,
             column: prevColName*/
          ]
        };

        for(let prevColumn in prevColArray)
        {
          let prevColName = prevColArray[prevColumn].column;

          mergedElement.merged_columns.push(
            {
              table: currentTable,
              column: prevColName
            }
          );
        }

        this.modelChanges.merged_columns.push(mergedElement);
        console.log(`**** MERGED column: " ${currentColumn}  Ver: ${this.dataModelVersionNumber}, Table: ${currentTable}  ****`);
        return true;
      }
    }
    return false;
  }


  testForRenamedColumns(prevColArray,nextColArray,currentTable,currentColumn) {
    let renamedElement = '';


    if (nextColArray == undefined ||
      nextColArray.length == 0 ||
      !(hasOwnProperty.call(nextColArray[0], 'column')) ||
      prevColArray == undefined ||
      prevColArray.length == 0 ||
      !(hasOwnProperty.call(prevColArray[0], 'column'))
    )
    //if(this.previousAndNextNotExist())
    {//IF EITHER PREV/NEXT PROPERTY DOES NOT EXIST, THIS IS NOT A RENAMED COLUMN
      return false;
    }
    else
    {
      let nextColName = nextColArray[0].column;
      let prevColName = prevColArray[0].column;
      if (nextColName != prevColName) {
        renamedElement = {
          table: currentTable,
          column: currentColumn,
          previous_column: {
            table: currentTable,
            column: prevColName
          }
        };
        this.modelChanges.renamed_columns.push(renamedElement);
        console.log(`**** RENAMED column: " ${currentColumn}  Ver: ${this.dataModelVersionNumber}, Table: ${currentTable}  ****`);
        return true;
      }
    }
    return false;
  }

  criticalModelValidation(model) {
    if(model == null || Object.keys(model).length === 0 || model == undefined)
    {
      console.log("Model: "+model);
      this._appendError(`the model argument ${model} is empty.`);
      throw "the model argument is empty, can not proceed.";
    }

    if(!hasOwnProperty.call(model, 'tables'))
    {
      //console.log("Model: " + model);
      this._appendError(`the model argument ${model} has no "tables" property.`);
      throw "the model argument has no tables, can not proceed.";
    }

    if(!hasOwnProperty.call(model, 'magic_version'))
    {
      this._appendError(`has no "magic_version" property`);
      throw "the model argument ${model} has no magic_version property, can not proceed.";
    }
  }

  previousAndNextNotExist()
  {
    let prevNextNotExist =
      (nextColArray == undefined ||
      nextColArray.length == 0 ||
      !(hasOwnProperty.call(nextColArray[0], 'column')) ||
      prevColArray == undefined ||
      prevColArray.length == 0 ||
      !(hasOwnProperty.call(prevColArray[0], 'column')));

    return prevNextNotExist;
  }
}