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
          <b>MagIC File Format</b><br/>
          <Link to={"/MagIC/help/text-file-format"}>The MagIC file format</Link> - 2020/5/18<br/> 
        </p>
        <p>
          <b>Dataset Citation</b><br/>
          Data citations for data in MagIC should be in the form of:<br/>
          Data Author/Principal Investigator name(s) (YEAR) "Title of Dataset", publisher or distributor, DOI 
        </p>
        <p>
          <b>Example Citation</b><br/>
          Jun Meng, Stuart A. Gilder, Yalin Li, Chengshan Wang, Tao Liu (2020) "Expanse of Greater India in the late Cretaceous", Magnetics Information Consortium (MagIC), doi:10.7288/V4/MAGIC/16853
        </p>
        <p>
          <b>Video Tutorials</b><br/>
          The 2020 MagIC Workshop demo series:<br/>
          <a href="https://youtu.be/pchdPBzSmT0">MagIC Data Model and Uploading Data to the MagIC Database</a> - 2020/3/16 (54min) - Nick Jarboe <br/>
          <a href="https://www.youtube.com/watch?v=9yGPbATqRtI">PmagPy Using Jupyter Notebooks</a> - 2020/3/18 (1hr 5min) - <a href="https://github.com/PmagPy/PmagPy/blob/master/MagIC_workshop_demo.ipynb">notebook download</a> - Lisa Tauxe
          <br/>
          <a href="https://youtu.be/GUjf33aNnFQ">PmagPy Demag GUI Paleomagnetic Analysis And MagIC File Export Software Demo</a> - 2020/3/17 (57min) - <a href="https://github.com/Swanson-Hysell-Group/2020_Demag_GUI_tutorial/">Write up</a> - Nick Swanson-Hysell<br/>
          <a href="https://youtu.be/vRDiIXCm-sY">Pmag GUI install, SIO Data Import, and Thellier GUI Demo: A Paleomagnetic Analysis Tool</a> - 2020/3/12 (37 min)- <a href="https://github.com/ltauxe/PmagPy_tutorials">Write up</a> - Lisa Tauxe<br/>
          <br/>
        <p>
          <b>Written Tutorials</b><br/>
          <a href="https://github.com/Swanson-Hysell-Group/2020_Demag_GUI_tutorial/"> PmagPy Demag GUI Paleomagnetic Analysis And MagIC File Export Software</a><br/>
          <a href="https://github.com/ltauxe/PmagPy_tutorials">Using Thellier GUI with an Example Dataset</a><br/>
        </p>
        <p>
          <b>Upgrade Older MagIC DataFiles</b><br/>
          The <Link to={"/MagIC/upgrade"}>Upgrade Tool</Link> converts older MagIC data format files to the current 3.0 MagIC data model.
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

