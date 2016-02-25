export default class {

  constructor({Meteor, LocalState}) {
    this.Meteor = Meteor;
    this.LocalState = LocalState;
    this._clearErrors()
    this.jsonContribution = {};
    this.tableCounter = 0;
    this.totalLineNumbersInFile;
  }

  parse(text) {

    if (!text) {
      return this.LocalState.set('PARSE_CONTRIBUTION_ERRORS', 'Contribution text is required.');
    }

    text = text.replace(/\n$/, ''); //Remove trailing

    var contribFileLines = text.split('\n');
    var currentLine;
    var columns = [];

    // *************** MAIN PROCESSING LOOP******************
    var expectStartOfTableOrEOF = true;
    var lineIndex = 0;
    this.totalLineNumbersInFile = contribFileLines.length;
    console.log('Parsing...total line numbers: ' + this.totalLineNumbersInFile);

    // ****************** THIS IS THE MAIN PROCESSING LOOP *******************
    for (lineIndex = 0;
         (lineIndex < contribFileLines.length); lineIndex++) {

      currentLine = contribFileLines[lineIndex];

      // ***************
      if (this.skipThisLine(currentLine)) {
        // console.log("skipping inconsequential line: "+ currentLine) ;
        lineIndex = lineIndex++; //GGG AGAIN, BAD PROGRAMMING PRACTICE BUT IT WORKS FOR NOW
        currentLine = contribFileLines[lineIndex]; //Just eat the skipped line and continue
      }

      // ***************
      currentLine = this.cleanString(currentLine);

      // ***************
      if (this.startOfTable(currentLine)) {
        var tableDefinition = this.tokenizeLine(currentLine);
        var currentTableName = tableDefinition[1]; // tablename should be the second token in this row

        if (currentTableName === undefined) {
          this.logAndException(EXCEPTION, LOG, 'Warning, table delimiter "tab" has no table name.', lineIndex);
        }

        //console.log("Processing table: " + currentTableName + " #" + this.tableCounter + " with columns: " + columns);

        if (!this.jsonContribution.hasOwnProperty(currentTableName)) // Don't read the table property if the table has already been added
        {
          this.jsonContribution[currentTableName] = [];
        } // Set up the table with an empty array to later give name/value pair objects of column/data

        // skip to the next line for the column headers
        // console.log("skipping table definition line: "+ currentLine) ;
        lineIndex++; //GGG, I realize this is poor programming practice, but it is due to the line by line requirement
        currentLine = contribFileLines[lineIndex];
        columns = this.tokenizeLine(currentLine);

        try {
          this.hasDuplicateStrings(columns);
        } catch (e) {
          this.logAndException(EXCEPTION, LOG, 'Duplicate column name found. ' + e.message, lineIndex);
        }

        // Test for columns with no data
        if (this.arrayHasEmptyStrings(columns)) {
          this.logAndException(EXCEPTION, LOG, 'Warning, empty column header found  While processing table: ' + currentTableName, lineIndex);
        }

        expectStartOfTableOrEOF = false;
      } // end ifStartIfTable
      else if (expectStartOfTableOrEOF === true) // in this case we expected the start of a table but didn't find it
      {
        this.logAndException(EXCEPTION, LOG, 'Start of table string "tab" expected but not found. ', lineIndex);
      }

      // ***********NOW PROCESS COLUMN DATA WITHIN THE CURRENT TABLE  ************
      // console.log("skipping column header line: "+ currentLine) ;
      lineIndex++; //GGG, I realize this is poor programming practice, but it is due to the line by line requirement
      currentLine = contribFileLines[lineIndex];
      do {
        var rowValuesToAdd = this.tokenizeLine(currentLine);
        var row = {};

        for (var columnNumber in columns) {
          if (rowValuesToAdd[columnNumber] && rowValuesToAdd[columnNumber].length > 0) // weed out empty strings
            row[columns[columnNumber]] = rowValuesToAdd[columnNumber];
        }

        if (this.jsonContribution[currentTableName]) {
          this.jsonContribution[currentTableName].push(row);
          // console.log("added row: "+ currentLine) ;
          lineIndex++; //GGG, I realize this is poor programming practice, but it is due to the line by line requirement
          currentLine = contribFileLines[lineIndex];
        }

      } while (!this.endOfTable(currentLine) && !this.isEndOfFile(lineIndex));

      // ***************  SEARCH FOR THE END OF TABLE DELIMITER
      if (this.endOfTable(currentLine)) {
        expectStartOfTableOrEOF = true;
      }
      if (this.isEndOfFile(lineIndex)) {break;}
    }
  }

  isEndOfFile(lineIndex)
  {
    if (lineIndex < (this.totalLineNumbersInFile)) {return false;}
    else {return true;}
  }


  hasDuplicateStrings(arrayToCheck) {
    var stringSet = new Set();
    for (var sIndex in arrayToCheck) {
      if (stringSet.has(arrayToCheck[sIndex])) {
        throw new Error('Duplicate value detected: ' + arrayToCheck[sIndex]);
      } else {
        stringSet.add(arrayToCheck[sIndex]);
      }
    }
    return false;
  }

  arrayHasEmptyStrings(arrayOfStrings) {
    for (var i in arrayOfStrings) {
      if (arrayOfStrings[i] === '') {
        return true;
      }
    }
    return false;
  }

  tokenizeLine(currentLine) {
    var rowValues = [];
    if (currentLine) rowValues = currentLine.split('\t');
    //console.log(rowValues);
    rowValues = this.cleanArrayStringValues(rowValues);
    return rowValues;
  }

  cleanArrayStringValues(arrayOfStrings) {
    for (var i in arrayOfStrings) {
      arrayOfStrings[i] = this.cleanString(arrayOfStrings[i]);
    }
    return arrayOfStrings;
  }

  //separate function as there may be more items to clean?
  cleanString(currentLine) {
    return currentLine.trim(); //remove leading and trailing spaces
  }

  //Test for blank lines and any other conditions leading to  skip a line
  skipThisLine(currentLine) {
    var skipLine = false;
    const RE_skipLine = /^\s*$/;

    if (currentLine === undefined) {
      skipLine = true;
    } else if (RE_skipLine.test(currentLine)) {
      skipLine = true;
    }

    return skipLine;
  }

  startOfTable(currentLine) {
    const RE_TableStart = /^tab*/; // GGG need to make this regex better

    var startOfTable = false;
    if (RE_TableStart.test(currentLine)) {
      startOfTable = true;
      this.tableCounter++;
      console.log("Table #" + this.tableCounter+' detected via delimiter: ' + RE_TableStart.exec(currentLine)[0]); // This prints the text pattern that was discovered
    }

    return startOfTable;

  }

  // detects strings indicating the end of a table
  endOfTable(currentLine) {
    const RE_endTable = /^\s*>+\s*/;
    var endOfTable = false;

    if (RE_endTable.test(currentLine)) {
      endOfTable = true;
      // console.log("End of table detected at line via delimiter: " + RE_endTable.exec(currentLine)[0]); // This prints the text pattern that was discovered
    }
    return endOfTable;
  }

  logAndException(EXCEPTION, LOG, messageString, lineNumber) {
    if (LOG) {
      console.log(messageString);
    }
    if (EXCEPTION) {
      lineNumber++; //correct for zero based array index
      var errorMessage = messageString + '. File line #' + lineNumber.toString()+'.';
      // throw new Error(errorMessage);
      this.LocalState.set('PARSE_CONTRIBUTION_ERROR', errorMessage);
    }
  }

  _error() {
    const errors = this.LocalState.get('PARSE_CONTRIBUTION_ERRORS');
    this.LocalState.set('PARSE_CONTRIBUTION_ERRORS', errorMessage);
  }

  _clearErrors() {
    return this.LocalState.set('PARSE_CONTRIBUTION_ERRORS', {});
  }
}
