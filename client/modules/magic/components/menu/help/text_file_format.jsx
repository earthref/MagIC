import React from 'react';

import {Link} from 'react-router-dom';

export default class extends React.Component {

  render() {
    return (
      <div>
        <p>
         The MagIC text file format is a tab delimited file which contains all of the data for a contribution archived in the MagIC datastore. Empty tables and columns are not placed in the MagIC text file. The format consists of a table name header, column names, data, and a table separator. Please see the <Link style={{color: 'purple'}} to={'/MagIC/data-models/3.0'}>MagIC data model</Link> for a detailed description of all the possible tables and columns available in the MagIC datastore. 
        </p>
        <p>
An example of a MagIC text file that contains contribution, location and site level information (-- represents tab) is shown below. The contribution table is not generally used while uploading and is created by the MagIC data upload software.
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
      </div>
    );
  }

}

