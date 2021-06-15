import React from "react";
import {Link} from "react-router-dom";

export default class extends React.Component {

  render() {
    return (
      <div>
        <p>
          For <b>FAQ</b>, see below.<br/>
          <br/>
          The MagIC website continues to evolve. Older tutorials are more likely to not match the current layout exactly, but they 
          should still be quite helpful. Please let us know if they are confusing, especially if it is due to the tutorial not 
          matching the current website. 
        </p>
        <p>
          You can email questions and comments to Nick Jarboe (<a href="mailto:njarboe@ucsd.edu">njarboe@ucsd.edu</a>) about any aspect of the MagIC and PmagPy software systems. 
          If you would like to have live help or a walkthrough of any of the part of MagIC's uploading, searching, or downloading data procedures, please email Nick Jarboe. I can also set up a time for a live chat over video using Skype, Zoom, Google Hangouts, etc.<br/>
        </p>
        <p>
          <b>MagIC File Format - What You Need to Know to Create MagIC Data Files</b><br/>
          <Link to={"/MagIC/help/text-file-format"}>The MagIC file format</Link><br/> 
          This page describes the MagIC file format, presents a short MagIC file as an example, describes 
          how to create a MagIC file from your data, gives links to examples of previous contributed MagIC files for various types of 
          studies (paleodirections, paleointensity, FORC, XPEEM, and SQUID Microscopy), and describes the compact MagIC file format that 
          may be used for large sediment core or 2-D data files. 
        </p>
          <b>Video Tutorials</b><br/>
          <u>The 2020 MagIC Fall AGU demo series</u><br/>
          <a href="https://youtu.be/lBaixvCSszA">The MagIC Website: Overview, Resource Links, Searching, and Downloading</a> - Dec. 3, 2020 (17 min) - Nick Jarboe <br/>
          <a href="https://youtu.be/V63_tpVLuVo">The MagIC Data Model and Uploading Data</a> - Dec. 3, 2020 (31 min) - Nick Jarboe <br/>
          <a href="https://youtu.be/CD3wHZo0uOQ">The FIESTA/MagIC API</a> - Dec. 3, 2020 (27 min) - Rupert Minnett <br/>
          <a href="https://youtu.be/JoY_5pV4gyE">Using MagIC's JupyterHub and PmagPy Notebooks for Data Analysis and Upload</a> - Dec. 3, 2020 (62 min) - Lisa Tauxe <br/>
          <br/>
          <u>The 2020 MagIC Workshop demo series</u><br/>
          <a href="https://youtu.be/pchdPBzSmT0">MagIC Data Model and Uploading Data to the MagIC Database</a> - Mar. 16, 2020 (54min) - Nick Jarboe <br/>
          <a href="https://www.youtube.com/watch?v=9yGPbATqRtI">PmagPy Using Jupyter Notebooks</a> - Mar. 18, 2020 (1hr 5min) - <a href="https://github.com/PmagPy/PmagPy/blob/master/MagIC_workshop_demo.ipynb">notebook download</a> - Lisa Tauxe
          <br/>
          <a href="https://youtu.be/GUjf33aNnFQ">PmagPy Demag GUI Paleomagnetic Analysis And MagIC File Export Software Demo</a> - Mar. 17, 2020 (57min) - <a href="https://github.com/Swanson-Hysell-Group/2020_Demag_GUI_tutorial/">Write up</a> - Nick Swanson-Hysell<br/>
          <a href="https://youtu.be/vRDiIXCm-sY">Pmag GUI install, SIO Data Import, and Thellier GUI Demo: A Paleomagnetic Analysis Tool</a> - Mar. 12, 2020 (37 min) - <a href="https://github.com/ltauxe/PmagPy_tutorials">Write up</a> - Lisa Tauxe<br/>
          <br/>
        <p>
          <b>Written Tutorials</b><br/>
          <a href="https://github.com/Swanson-Hysell-Group/2020_Demag_GUI_tutorial/"> PmagPy Demag GUI Paleomagnetic Analysis And MagIC File Export Software</a><br/>
          <a href="https://github.com/ltauxe/PmagPy_tutorials">Using Thellier GUI with an Example Dataset</a><br/>
        </p>
        <p>
          <b>Older Videos</b><br/>
          <a href="https://youtu.be/_Bb3YJKgwOA">Uploading Data Demo</a> - Dec. 7, 2017 (9 min)<br/>
          How to go from a formatted text file or Excel file of data and upload it into the MagIC database. 
          This demo assumes that the data are correctly separated into tables or Excel worksheets according to the MagIC <Link to={"/MagIC/data-models/3.0"}>data model</Link>.<br/> 
           <br/>
          <a href="https://youtu.be/rCUUPp3qpmI">Creating an Excel File for Uploading Legacy Data to MagIC: Part 1</a> - Feb. 7, 2018 (28 min)<br/>
          <a href="https://youtu.be/Pwfx6UilbXM">Creating an Excel File for Uploading Legacy Data to MagIC: Part 2</a> - Feb. 7, 2018 (13 min)<br/>
          <a href="https://youtu.be/Ll3S8Mm1gSM">Creating an Excel File for Uploading Legacy Data to MagIC: Part 3</a> - Feb. 7, 2018 (18 min)<br/>
	      An updated version of the Excel template file used in the video can be downloaded 
          from <a href='https://github.com/earthref/MagIC/blob/master/.public/MagIC/TemplateForMagICDataUpload.xlsx?raw=true'>TemplateForMagICDataUpload.xlsx</a>.<br/>
          How to take a journal article and its supplemental material and creating an Excel File for uploading the data into MagIC.
          This method is recommended only for legacy papers where the measurement data is not available and the only surviving data sources are
          from the published papers. For publishing new data from active labs, please contact us (Nick Jarboe - njarboe@ucsd.edu) to help you 
          implement a workflow for the lab that includes the creating of MagIC file formatted files.
          <br/>
        </p>
        <p>
          <a name="faq"></a>
          <h3>FAQ</h3>
          <b>How do I cite a data set that I have used that is in MagIC?</b><br/>
          Data that you have placed into MagIC as supporting data for a paper should be cited in the paper and placed in the reference
          list. Data downloaded from MagIC should also be cited when used.<br/>
          <br/>
          <i>General data citation form:</i><br/>
          Data Author(s)/Principal Investigator name(s) (YEAR) "Title of Dataset", publisher or distributor, DOI<br/>
          <br/>
          <i>Example Citation:</i><br/>
          Jun Meng, Stuart A. Gilder, Yalin Li, Chengshan Wang, Tao Liu (2020) "Expanse of Greater India in the late Cretaceous", Magnetics Information Consortium (MagIC), doi:10.7288/V4/MAGIC/16853
        </p>
        <p>
          <b>When should I upload my data for my journal article to MagIC?</b><br/>
          Many journals now require that the data be available to reviewers of your paper while it is in review. Others 
          only require the data to be available at publication. 
          MagIC encourages you to <a href="https://www.earthref.org/MagIC/upload">upload</a> your data to your private workspace
          while you are collecting your data. Setting up your lab to include formatting your data into the MagIC format
          while it is being collected makes the process of uploading it to MagIC much less difficult at publication time.
          We will work with your lab to help you understand our data model, test your formatting of MagIC data files, and 
          create programs that translate data formats, if needed. Many measurement level data converters already exist.<br/>
          <br/>
          If that is not the case and you are looking for a data repository to put your data into after collecting, processing, and
          analyzing the data, MagIC is happy to assist you. Having a link to your fully formatted dataset in a private workspace on 
          MagIC will likely improve the chances of your paper being accepted for review and publication.<br/>
          <br/> 
          If you have already have a paper in review and the reviewers are asking which data repository you are planning to use, we
          are happy to work with you at this stage, but formatting your data to the MagIC data model will take some effort and time
          on both your part and ours.
        </p>
        <p>
          <b>What is the best way to view and edit MagIC text files?</b><br/>
          Since MagIC text files are tab delimited files, we find that opening them in a spreadsheet is the best way to view and edit them.
          If you are using Excel, use the "Open" option under the "File" menu. Make sure to import the file as "Text" and not 
          "General", otherwise Excel will
          change data that looks like a date and other nasty things. You can also save any edits you made by saving the file as tab delimited. 
          If you imported the file as tab delimited, this should be the default save setting.
          <br/>
        </p>
        <p>
          <b>How do I upgrade older MagIC data files formats to the 3.0 data model?</b><br/>
          The <Link to={"/MagIC/upgrade"}>Upgrade Tool</Link> converts older MagIC data format files to the current 3.0 MagIC data model.
        </p>
        <p>
          <b></b><br/>
          <br/>
          <br/>
        </p>
      </div>
    );
  }

}

