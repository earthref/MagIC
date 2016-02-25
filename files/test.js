    // These should throw a exception about it not being a text file in the MagIC text format.
const invalid_text_files = [

  /* Error: "nonsense" is not recognized as a column delimiter on line 1.  X*/
  "nonsense",
  "nonsense\ttable",
  "  nonsense  \ttable\ncol1\tcol2\nstr1\t1.2",

  /* Error: a table name could not be found on line 1.  X*/
  "tab\n",
  " tab \n",
  " tab \t",
  "tab\t\n",

  /* Error: "csv" is not recognized as a column delimiter on line 1.  X
  // (later we might support csv, but all of the existing contributions we're working with are tab delimited)*/
  "csv\ttable\n",

  /* Error: column name "col1" in table "table" cannot be repeated on line 2.  X*/ 
  "tab\ttable\ncol1\tcol1\n"

];
export { invalid_text_files };

/* These should result in an empty object when converted to JSON.*/
const valid_but_empty_text_files = [

  /* A table can have no rows under it.*/
  "tab\ttable\ncol1\tcol2\n",
  "    tab \t123\ncol1\tcol2\n",

  /* A table name can be repeated.*/
  "tab\ttable\ncol1\tcol2\n>>>>>>>>>>\ntab\ttable\ncol1\tcol2"// GGG THIS IS CURRENTLY BROKEN

];
export { valid_but_empty_text_files };

/* These should be converted to JSON, but may not match a data model.*/
const valid_text_files = [

  /* All Numbers should remain as strings for now.
  // FOR THE SCHEMA CHECKER json = { "table": [ { "col1": "str1", "col2": 1.2 } ] };
  // FOR NOW json = { "table": [ { "col1": "str1", "col2": "1.2" } ] };*/
  "tab\ttable\ncol1\tcol2\nstr1\t1.2",

  /* Blank lines, and leading and trailing spaces (not tabs) should be removed.
  // json = { "table": [ { "col1": "str1", "col2": "1.2" } ] };*/
  "\ntab\ttable\ncol1\tcol2\nstr1\t1.2",
  "tab\ttable\ncol1\tcol2\n\n\nstr1\t1.2",
  " tab\ttable\ncol1\tcol2\nstr1\t1.2",
  "tab  \ttable\ncol1\tcol2\nstr1\t1.2",
  "tab\t  table\ncol1\tcol2\nstr1\t1.2",
  "tab\ttable\ncol1  \tcol2\n  str1\t1.2  ",

  /* Row order within a table doesn't technically matter since it can be resorted later.
  // ON A PER TABLE BASIS However, it would be nice to preserve that as a default sort order, hence the array.
  // json = { "table": [ { "col1": "str1", "col2": "1.2" }, { "col1": "str2", "col2": "0.1" } ] };
  // (Yes, repeating the column names for each row in the object is not very efficient compared to a table,
  //  but the objects get stored in binary JSON in MongoDB so it's not quite so bad.)*/
  "tab\ttable\ncol1\tcol2\nstr1\t1.2\nstr2\t0.1\n",

  /* Empty columns shouldn't be in the object.
  // Rows with fewer tabs than the column header should treat those trailing columns as empty for that row.
  // json = { "table": [ { "col1": "str1", "col2": "1.2" }, { "col1": "str2" } ] };*/
  "tab\ttable\ncol1\tcol2\nstr1\t1.2\nstr2\t\n",
  "tab\ttable\ncol2\tcol1\n1.2\tstr1\n\tstr2\n",
  "tab\ttable\ncol1\tcol2\nstr1\t1.2\nstr2\n", /*If there is no value for a column it should be left out of the JSON file*/

  /* Repeated tables are combined and may not have the same column headers.
  // Table delimiter is considered valid if it matches regex /^ *>+ *$/ (any leading or trailing spaces and one or more ">").
  // json = { "table": [ { "col1": "str1", "col2": "1.2" }, { "col1": "str2", "col3": "0.1" } ] }; //MAKE SURE TABLE NAMES THAT ARE THE SAME DON'T OVERWRITE EACH OTHER, BUT INSTEAD ARE COMBINED*/
  "tab\ttable\ncol1\tcol2\nstr1\t1.2\n>>>>>>>>>>\ntab\ttable\ncol1\tcol3\nstr2\t0.1\n",
  "tab\ttable\ncol1\tcol2\nstr1\t1.2\n>\ntab\ttable\ncol1\tcol3\nstr2\t0.1\n",
  "tab\ttable\ncol1\tcol2\nstr1\t1.2\n  >>>\ntab\ttable\ncol1\tcol3\nstr2\t0.1\n",
  "tab\ttable\ncol1\tcol2\nstr1\t1.2\n>>     \ntab\ttable\ncol1\tcol3\nstr2\t0.1\n",

  /* Table and column order don't matter in the text file or in JSON.
  //    json = { "table": [ { "col1": "str1", "col2": "1.2" } ], "table2": [ { "col1": "str1", "col2": "1.2" } ] };
  // or json = { "table": [ { "col2": "1.2", "col1": "str1" } ], "table2": [ { "col2": "1.2", "col1": "str1" } ] };
  // or json = { "table2": [ { "col1": "str1", "col2": "1.2" } ], "table": [ { "col1": "str1", "col2": "1.2" } ] };
  // or json = { "table2": [ { "col2": "1.2", "col1": "str1" } ], "table": [ { "col2": "1.2", "col1": "str1" } ] };
  // (These objects are equivalent and should evaluate to equal when we write the formal test.)*/
  "tab\ttable\ncol1\tcol2\nstr1\t1.2\n>>>>>>>>>>\ntab\ttable2\ncol1\tcol2\nstr1\t1.2\n",
  "tab\ttable\ncol2\tcol1\n1.2\tstr1\n>>>>>>>>>>\ntab\ttable2\ncol2\tcol1\n1.2\tstr1\n",
  "tab\ttable2\ncol1\tcol2\nstr1\t1.2\n>>>>>>>>>>\ntab\ttable\ncol1\tcol2\nstr1\t1.2\n",
  "tab\ttable2\ncol2\tcol1\n1.2\tstr1\n>>>>>>>>>>\ntab\ttable\ncol2\tcol1\n1.2\tstr1\n",

  /* Colon-delimited strings should get parsed into an array. Check out the doi1:doi2:
  //strip leading and trailing colons, with the exception of those in ":", which is the escape
  // FOR THE SCHEMA CHECKER: json = { "er_locations": [ { "location_name": "My location", "er_citation_names": [ "doi1", "doi2" ] } ] };
  // FOR NOW: json = { "er_locations": [ { "location_name": "My location", "er_citation_names": ":doi1:doi2:" } ] };*/
  "tab\ter_locations\nlocation_name\ter_citation_names\nMy location\t:doi1:doi2:",
  // FOR NOW: json = { "er_locations": [ { "location_name": "My location", "er_citation_names": "doi1:doi2" } ] };*/
  "tab\ter_locations\nlocation_name\ter_citation_names\nMy location\tdoi1:doi2",

  /* Escaped colons in colon-delimited strings shouldn't get parsed into a seperate array element.
  // FOR THE SCHEMA CHECKER: json = { "er_locations": [ { "location_name": "My location", "er_citation_names": [ "doi1", "do:i2" ] } ] };
  // FOR NOW: json = { "er_locations": [ { "location_name": "My location", "er_citation_names": "doi1:\"do:i2\"" } ] };*/
  "tab\ter_locations\nlocation_name\ter_citation_names\nMy location\tdoi1:\"do:i2\"",

  /* Dictionaries should get parsed into an associative array and order doesn't matter.
  // (These are new in 3.0, but processing of new 3.0 text files will require this parsing.)
  // FOR THE SCHEMA CHECKER: json = { "table": [ { "col1": { "ke:y": "value", "key2": "val[ue2:" } } ] };
  // FOR NOW: json = { "table": [ { "col1": "\"ke:y\"[value]:key2[\"val[ue2:\"]" } ] };*/
  "tab\ttable\ncol1\n\"ke:y\"[value]:key2[\"val[ue2:\"]",
  // FOR NOW: json = { "table": [ { "col1": "key2[\"val[ue2:\"]:\"ke:y\"[value]" } ] };*/
  "tab\ttable\ncol1\nkey2[\"val[ue2:\"]:\"ke:y\"[value]",

  /* Matrices should get parsed into a 2D jagged array and order matters.
  // (These are new in 3.0, but processing of new 3.0 text files will require this parsing.)
  // FOR THE SCHEMA CHECKER: json = { "table": [ { "col1": [ ["label:1;2", "1", "2", "3"], ["4", "5", "6"] ] } ] };
  // FOR NOW: json = { "table": [ { "col1": "\"label:1;2\":1:\"2\":3;4:5:6" } ] };*/
  "tab\ttable\ncol1\n:\"label:1;2\":1:\"2\":3;4:5:6\n"

];
export { valid_text_files };
