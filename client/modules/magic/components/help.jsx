import React from 'react';

import {Link} from 'react-router-dom';

export default class extends React.Component {

  render() {
    return (
      <div>
        <p>
         The MagIC website continues to evolve. Older tutorials are more likely to not match the current layout exactly, but they should still be quite helpful. Please let us know if they are confusing, especially if it is due to the tutorial not matching the current website.<br/>
        </p>
        <p>
         <b>Tutorial Videos</b><br/>
         <a href='https://youtu.be/_Bb3YJKgwOA'><font color='purple'>Uploading Data Demo</font></a> - 2017/12/7 (9 min)<br/>
How to go from a formatted text file or Excel file of data and upload it into the MagIC database. 
         This demo assumes that the data is correctly separated into tables or Excel worksheets according to the MagIC <Link style={{color: 'purple'}} to={'/MagIC/data-models/3.0'}>data model</Link>.<br/> 
        </p>
        <p>
         <b>Tutorial Pages</b><br/>
            Coming soon.
        </p>
      </div>
    );
  }

}

