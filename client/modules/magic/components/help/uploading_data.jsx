import React from 'react';

import {Link} from 'react-router-dom';

export default class extends React.Component {

  render() {
    return (
      <div>
        <p>
         You can see a video demo of this content <a href='https://youtu.be/_Bb3YJKgwOA'><font color='purple'>here</font></a>
        <p>
         This tutorial assumes that your data has beem formatted into an Excel file with a separate worksheet for each data table or into tab or comma delimited files (one file for each table). You can determine what data goes in each table from the interactive on-line <Link style={{color: 'purple'}} to={'/MagIC/data-models/3.0'}>data model page</Link>. Please feel free to email Nick Jarboe (<a href='mailto:njarboe@ucsd.edu'><font color='purple'>njarboe@ucsd.edu</font></a>) with questions or comments.
        </p>
        <p>
        First navigate to the <Link style={{color: 'purple'}} to={'/MagIC'}>MagIC home page</Link>. If you are logged in, then your name will appear in the upper right-hand corner of the page. Otherwise you should click the text "Login" which will bring you to the login page (the login system is still in the old EarthRef format). If you do not have an account yet, click on the Register link to create an account.   
        </p>
        <p>
        Next click on the third huge button, which is labeled "Upload", near the top of the MagIC homepage. Next you can either use the "Open file" dialogue GUI on your system to select a data file to upload by clicking on the full-width image link in the middle of the page on either side of the "OR" or drag the file from your system's "File folder" GUI to the same location. If you have multiple files to combine in an upload, you will first go through the rest of the upload steps to create a private contribution and then repeat this process for each file to add more data to the contribution.
        </p>
      </div>
    );
  }

}

