This file is meant to give overviews/examples for quick reference regarding the various data structures used in the MacIC project.
This is by no means a comprehensive description, but it serves as a reminder of the overall structures.

DATA MODELS:
tables.tabName1.columns.colname1
tables.tabName1.columns.colname2
...

tables.tabName2.columns.colname3
tables.tabName2.columns.colname4
...


JSON FILES:
table1  //Each object in the array is a row
[
    {col1: value1, col2:value2,...},  //row 1
    {col1: value3, col2:value4,...},  //row 2
    ...
]

ORDERED MODEL: The ordered model sorts tables and columns according to the "position" properties found in the unordered DATA MODEL described above
[
    {tableName1: [col1, col2,...]},
    {tableName2: [col3, col4,...]},
    ...
]