import React from "react";
import {Link} from "react-router-dom";

export default class extends React.Component {

  render() {
    return (
      <div>
        <p>
          The MagIC website continues to evolve. Older tutorials are more likely to not match the current layout exactly, but they should still be quite helpful. Please let us know if they are confusing, especially if it is due to the tutorial not matching the current website. 
        </p>
        <p>
          You can email questions and comments to Nick Jarboe (<a href="mailto:njarboe@ucsd.edu">njarboe@ucsd.edu</a>) about any aspect of the MagIC and PmagPy software systems. 
          If you would like to have live help or a walk through of any of the part of MagIC's uploading, searching, or downloading data procedures, please email Nick Jarboe. We can set up a time for a live chat over video using Skype, Zoom, Google Hangouts, etc.<br/>
        </p>
        <p>
          <b>Video Tutorials</b><br/>
          A series of four demo videos were make for the 2020 MagIC Workshop demo series. They can be seen on the MagIC YouTube channel:<br/>
          <a href="https://www.youtube.com/watch?v=9yGPbATqRtI">PmagPy Using Jupyter Notebooks - MagIC Workshop 2020</a> - 2020/3/18 (1hr 5min) - <a href="">notebook download</a>
          <br/>
          <a href="https://youtu.be/GUjf33aNnFQ">PmagPy Demag GUI Paleomagnetic Analysis And MagIC File Export Software Demo - MagIC Workshop 2020</a> - 2020/3/17 (57min) - <a href="">Write up</a><br/>
          <a href="https://youtu.be/pchdPBzSmT0">MagIC Data Model and Uploading Data to the MagIC Database - MagIC Workshop 2020</a> - 2020/3/16 (54min)<br/>
          <a href="https://youtu.be/vRDiIXCm-sY">Pmag GUI install, SIO Data Import, and Thellier GUI Demo: A Paleomagnetic Analysis Tool - MagIC 2020</a> - 2020/3/12 (37 min)
          <br/>
          <br/>
        <p>
          <b>Written Tutorials</b><br/>
          <a href="https://github.com/Swanson-Hysell-Group/2020_Demag_GUI_tutorial/"> PmagPy Demag GUI Paleomagnetic Analysis And MagIC File Export Software</a><br/>
        </p>
        <p>
          <b>Upgrade Older MagIC DataFiles</b><br/>
          The <Link to={"/MagIC/upgrade"}>Upgrade Tool</Link> converts older MagIC data format files to the current 3.0 MagIC data model.
        </p>
        <p>
          <b>Other Help Pages</b><br/>
          <Link to={"/MagIC/help/text-file-format"}>The MagIC file format</Link> - 2018/2/1 <br/> 
        </p>
          <b>Older Videos</b><br/>
          <a href="https://youtu.be/_Bb3YJKgwOA">Uploading Data Demo</a> - 2017/12/7 (9 min)<br/>
          How to go from a formatted text file or Excel file of data and upload it into the MagIC database. 
          This demo assumes that the data are correctly separated into tables or Excel worksheets according to the MagIC <Link to={"/MagIC/data-models/3.0"}>data model</Link>.<br/> 
           <br/>
          Taking a journal article and its supplemental material and creating an Excel File for uploading the data into MagIC.
	  An updated version of the Excel template file used in the video can be downloaded from <a href='https://github.com/earthref/MagIC/blob/master/.public/MagIC/Template3.0ForMagICUpload.xlsx?raw=true'>Template3.0ForMagICUpload.xlsx</a>. 
        </p>
        <p>
          <a href="https://youtu.be/rCUUPp3qpmI">Creating an Excel File for MagIC Uploading: Part 1</a> - 2018/2/7 (28 min)<br/>
          <a href="https://youtu.be/Pwfx6UilbXM">Creating an Excel File for MagIC Uploading: Part 2</a> - 2018/2/7 (13 min)<br/>
          <a href="https://youtu.be/Ll3S8Mm1gSM">Creating an Excel File for MagIC Uploading: Part 3</a> - 2018/2/7 (18 min)<br/>
        </p>
      </div>
    );
  }

}

