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

    this.modelChanges.deleted_columns = {};//GGG we need to fill this list with all the prior columns and remove them as we find other columns
    this.modelChanges.inserted_columns = {};
    this.modelChanges.renamed_columns = {};
    this.modelChanges.merged_columns = {};

    try {
      this.criticalModelValidation(model);
    }
    catch (err){
      // console.log("Basic model validation failed. " + err);
      return "Basic model validation failed. " + err;
    }

    let dataModel = model;
    this.dataModelVersionNumber = dataModel.magic_version;

    console.log('Outlining changes for data model: ' + this.dataModelVersionNumber);
    for(let currentTableName in dataModel.tables)
    {
      if(!hasOwnProperty.call(dataModel.tables[currentTableName], 'columns')){
        this._appendError(`failed to find the columns list for table: ${currentTableName}`);
      }

      console.log(`--------------Ver ${this.dataModelVersionNumber} changes for table: ${currentTableName} ---------------`);
      for (let currentColumnName in dataModel.tables[currentTableName].columns) {

        let prevColArray = dataModel.tables[currentTableName].columns[currentColumnName].previous_columns;

        //TEST FOR "INSERTED (NEW) COLUMN" FIRST AS THIS WILL INFORM US ABOUT
        //THE EXISTENCE OF "previous_column"
        if((prevColArray == undefined ||
            prevColArray.length == 0 )){
          if (this.dataModelVersionNumber != '2.0')//All columns in 2.0 are considered "new"
          {
            let insertedElement = {table:currentTableName, column:currentColumnName};
            _.set(this.modelChanges.inserted_columns, `tables[${currentTableName}].columns[${currentColumnName}]`, {});
            console.log(`**** INSERTED columns: " ${currentColumnName}  Ver: ${this.dataModelVersionNumber}, Table: ${currentTableName}  ****`);
          }
          continue;//once we determine the column is inserted there is nothing else to do
        }

        //TEST FOR THE INTEGRITY OF THE PREVIOUS_COL PROPERTY
        let previousColumnName;
        let previousColumnTableName;
        let prevColIntegrity = true;
        if((!hasOwnProperty.call(prevColArray[0], 'table'))){
          this._appendError(`failed to find the previous table name for column ${currentColumnName} in table ${currentTableName}`);
          prevColIntegrity = false;
        }
        if(!hasOwnProperty.call(prevColArray[0], 'column')){
          this._appendError(`failed to find the previous column name for column ${currentColumnName} in table ${currentTableName}`);
          prevColIntegrity = false;
        }
        if (prevColIntegrity === true)
        {
          previousColumnTableName = prevColArray[0].table;
          previousColumnName = prevColArray[0].column;
        }
        else {continue;}// The only scenario where this integrity is not needed is the deleted column, already taken care of


        //TEST FOR DELETED COLUMNS
        if  (false){//GGG PUTTING THIS OFF FOR A BIT
          let deletedElement = {table:currentTableName, column:currentColumnName};
          this.modelChanges.deleted_columns.push(deletedElement);
          console.log(`**** DELETED column: " ${currentColumnName}  Ver: ${this.dataModelVersionNumber}, Table: ${currentTableName}  ****`);
        }

        //TEST FOR UNCHANGED COLUMNS AND COLUMN NAME CHANGES
        if (currentColumnName ===  previousColumnName) {//There is no change at all
          continue;
        }
        else if(prevColArray.length === 1){//THERE IS A COLUMN NAME CHANGE
          console.log(`**** Column name change detected, Ver: ${this.dataModelVersionNumber}, Table: ${currentTableName}  ****`);
          console.log(`Current: ${currentColumnName}`);
          console.log(`Next:    ${previousColumnName}`);
          _.set(this.modelChanges.renamed_columns, `tables[${currentTableName}].columns[${currentColumnName}]`, {
            table:currentTableName,
            column: previousColumnName
          });
        }
        else this.testForMergedColumns(prevColArray, currentTableName, currentColumnName);
      }
    }

    return this.modelChanges;
  }


  testForMergedColumns(prevColArray, currentTable, currentColumn)
  {
    if(prevColArray.length > 1)
    {
      console.log(`**** MERGED column: " ${currentColumn}  Ver: ${this.dataModelVersionNumber}, Table: ${currentTable}  ****`);

      let mergedColArray = [];
      for(let idx in prevColArray)
      {
        mergedColArray.push(
        {
          table: prevColArray[idx].table,
          column: prevColArray[idx].column
        });
      }

      _.set(this.modelChanges.merged_columns, 'tables.contribution.columns.magic_version', mergedColArray);
      return true;
    }

    return false;//no merged column detected
  }

  //SOON TO BE DELETED, KEEPING AS REFERENCE
  testForMergedColumnsOld(prevColArray,nextColArray,currentTable,currentColumn)
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
}