import React from 'react';

import {Link} from 'react-router-dom';

export default class extends React.Component {

  render() {
    return (
      <div>
        <h4>MagIC Standard Format</h4>
        <p>
         The MagIC text file format is a tab delimited file which contains the data for a contribution archived 
         in the MagIC datastore. Empty tables and columns are not placed in the MagIC text file. The format consists
         of a table name header (the word "delimited" is optional), column names, data, and a table separator. 
         Please see the <Link style={{color: 'purple'}} to={'/MagIC/data-models/3.0'}>MagIC data model</Link> for a detailed description of all the possible tables and columns available in the MagIC datastore.<br/> 
        </p>
        <p>
An example of a MagIC text file that contains contribution, location, and site level information (-- represents tab) is shown below. The contribution table is not generally used while uploading and is created by the MagIC data upload software.
        </p>
        <p>
        This <b><a href='https://github.com/earthref/MagIC/blob/master/.public/MagIC/Template3.0ForMagICUpload.xlsx?raw=true'>Excel file</a></b> is 
        also useful for quickly seeing which columns in each table are required and some additional commonly used columns.
        Bold column headers indicate the column is required.
        </p>
        <p>
        <code>
         tab delimited--contribution<br/>
         id--version--timestamp--contributor--data_model_version--reference<br/>
         11927--1--2017-06-22T05:09:47.959Z--@njarboe--3--10.1002/2017GC007049<br/>
>>>>>>>>>><br/>
tab delimited--locations<br/>
location--location_type--geologic_classes--lithologies--lat_s--lat_n--lon_w--lon_e--continent_ocean--country--age--age_sigma--age_unit<br/>
Eastern Sheep Creek--Stratigraphic Section--Extrusive:Igneous:Subaerial--Basaltic-Andesite:Basalt:Andesite--40.70923--40.70923--243.17595--243.17595--North America--United States of America--15.23--0.26--Ma<br/>
>>>>>>>>>><br/>
tab delimited--sites<br/>
site--location--method_codes--citations--geologic_classes--geologic_types--lithologies--bed_dip--bed_dip_direction--lat--lon--age--age_sigma--age_unit--dir_dec--dir_inc--dir_alpha95--dir_k--dir_n_sample--analysts<br/>
E28--Eastern Sheep Creek--GM-ARAR:LT-AF-Z:SO-SM:LP-DIR-AF:FS-FD--This study--Extrusive:Igneous--Lava Flow--Basaltic Lava--6--79.6--40.7--243.2--15.23--0.26--Ma--357.3--47.6--1.4--1949.1--7--Bogue<br/>
        </code>
        </p>
        <p>
        <b>Paleomagnetic directional example</b><br/>
        For the complete data file from the above example see <a href="https://earthref.org/MagIC/16875">Bogue et al. (2017)</a>.
        It is a good example of a paleomagnetic directional study that has tables all the way down to the measurement level.<br/>
        <b>Paleointensity example</b><br/>
        For an example of a data file from a paleointensity study with measurement data 
        see <a href="https://earthref.org/MagIC/16357">Cai et al. (2020)</a>.
        </p>
        <a name="compact"></a>
        <h4>MagIC Compact Format</h4>
        <p>
          For large MagIC upload files with columns that repeat the same values for every row, a compact form of the MagIC file format should be used. This allows for a large reduction in size in the measurement table for MagIC files with XPEEM, SQUID microscopy, FORC, QDM and other image like data. Large MagIC sites tables due to long core records can also often be reduced significantly in size by using the compact format.
        </p>
        <p>
          The format consists of placing the repeated column values at the top of a table and then putting the rest of the rest of the table below that as usual. Place a "*", then a space, then the column name, then a tab (shown as --), and then the column value that is repeated for every row. For columns with multiple values, one value is allowed to be substituted while the rest of the row remains the same. This is done by placing a "*" in the compact column value and then putting the changing row values in the regular part of the table. See the derived_value column below for an example. In this case this reduces the file size significantly because the text "XPEEM," and ",10.1088/1742-6596/430/1/012127" only appear in the data header and not in thousands of rows.
        </p>
        <p>
        <b>X-ray photoemission electron microscopy (XPEEM) file example from <a href="https://earthref.org/MagIC/16837">Maurel et al. (2020)</a></b><br/>
        <code>
           tab--measurements<br/>
           * experiment--CoA01-r1offR<br/>
           * specimen--CoA01<br/>
           * standard--u<br/>
           * quality--g<br/>
           * method_codes--LP-XPEEM<br/>
           * citations--This study<br/>
           * derived_value--XPEEM,*,10.1088/1742-6596/430/1/012127<br/>
           measurement--derived_value--meas_pos_x--meas_pos_y<br/>
           1--41--0.0--0.0<br/>
           2--43--9.488e-09--0.0<br/>
           3--49--1.8976e-08--0.0<br/>
        </code>
        <br/>
        <b>SQUID Microscopy (SM) file example from <a href="earthref.org/MagIC/17039">Borlina et al. (2020)</a></b><br/>
        <code> 
           tab--measurements<br/>
           * experiment--    F1_115C_Z_150107_h18_map1<br/>
           * specimen--      150107_h18<br/>
           * standard--      u<br/>
           * quality--       g<br/>
           * method_codes--  LP-SQUIDM<br/>
           * citations--     This study<br/>
           * description--   Scanning Direction: Y, Scanning Mode: Continuous, Scanning Speed: 3000 m/s, Grid Size: 121 x 121, Number of points: 14641, Sampling Mode: Single-point, Sampling Frequency: N/A, Calibration Factor: 1.000 nT/V, Scan Start Time: 10:04:14 PM on 11/10/2017, Scan End Time: 10:12:12 PM on 11/10/2017, Total Scanning Time: 0 hours, 8 minutes.<br/>
           * derived_value SQUID Microscopy Model Height Lima And Weiss 2016,0.000429,10.1002/2016GC006487;SQUID Microscopy Residuals Lima And Weiss 2016,0.4214,10.1002/2016GC006487<br/>
           measurement--magn_z--meas_pos_x--meas_pos_y<br/>
           1--4.860960133333341e-12--4.7e-07--6.95e-07<br/>
           2--4.4558579999999895e-12--2.5469999999999995e-05--6.95e-07<br/>
           3---8.101379e-13--5.046999999999999e-05--6.95e-07<br/>
           4--8.50661386666666e-12--7.546999999999998e-05--6.95e-07<br/>
           5--8.102042666666771e-13--0.00010047--6.95e-07<br/>
        </code> 
        </p>
        <a name="zip"></a>
        <h4>MagIC Zip File Download Formats</h4>
        <p>
            If the MagIC test files are very large, the data may be configured as a zip file for downloading. This zip file may contain just one MagIC text file or may contain multiple files where the measurement data has been divided into separate files for each experiment. This separation is useful when the individual MagIC file size would be many gigabytes and unwieldy to work with.
        </p>
      </div>
    );
  }

}
