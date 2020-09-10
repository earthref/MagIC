import React from 'react';
import {Link} from 'react-router-dom';

export default class extends React.Component {

  render() {
    return (
      <div>

        <a href='https://jupyterhub.earthref.org'><b>EarthRef's JupyterHub Server</b></a>
        <p> EarthRef.org supports a JupyterHub server where you can run PmagPy notebooks and create your own. 
          Login using your EarthRef(MagIC) username(handle) and password. If you don't know your EarthRef username and password, 
          login to the MagIC website at the <a href="https://www2.earthref.org/MagIC">home page</a>. You can 
          login using your ORCID id or your 
          username and password, or create an account with your ORCID id. You can then view, set, or edit your 
          username and password by clicking on your name in the upper right of the webpage. If you created your 
          account with an ORCID id, you will have to set your username and password before logging into the JupyterHub. 
        </p>
        <p>
        The JuypterHub site can be found at <a href="https://jupyterhub.earthref.org">jupyterhub.earthref.org</a>.<br/>
        </p>
        <p><b>PmagPy Fundemetals</b><br/>
        A <a href="https://github.com/PmagPy/PmagPy/blob/master/PmagPy_online.ipynb">Juypter Notebook</a> explaining PmagPy Online. This is a tutorial on using the EarthRef JuypterHub, PmagPy, and the MagIC database.<br/>
        A presentation of the notebook by Lisa Tauxe at the EarthCube 2020 meeting can be found at <a href="https://doi.org/10.1002/essoar.10504182.1">doi.org/10.1002/essoar.10504182.1</a>.<br/>
        <br/>
            These five Jupyter notebooks for PmagPy can also be downloaded separately and describes many of the functions and uses of the PmagPy in more detail.They can be downloaded from the PmagPy GitHub website:<br/>
            <a href='https://github.com/PmagPy/PmagPy/blob/master/PmagPy_introduction.ipynb'>Introduction</a><br/>
            <a href='https://github.com/PmagPy/PmagPy/blob/master/PmagPy_MagIC.ipynb'>PmagPy and MagIC</a><br/>
            <a href='https://github.com/PmagPy/PmagPy/blob/master/PmagPy_calculations.ipynb'>Calculations</a><br/>
            <a href='https://github.com/PmagPy/PmagPy/blob/master/PmagPy_plots_analysis.ipynb'>Plots and Analysis</a><br/>
            <a href='https://github.com/PmagPy/PmagPy/blob/master/PmagPy-cli.ipynb'>PmagPy - Command Line Versons of PmagPy Functions</a>
        </p>
        <p><b>Other PmagPy  Notebooks</b><br/>
          <a href='https://github.com/PmagPy/PmagPy/blob/master/MagIC_workshop_demo.ipynb'>2020 MagIC Workshop PmagPy Jupyter Notebook Tutorial</a><br/>
          This notebook covers how to use PmagPy in three parts. 
          Exercise 1 looks at a typical "directional" data set and shows how to make useful plots like the equal area projection, maps of VGPs and maps of site locations. 
          Exercise 2 shows how to get geomagnetic vectors from IGRF-like tables and several ways of looking at the data through time and space. 
          Exercise 3 considers directional (polarity), anisotropy data and natural gamma radiation (NGR), a measure of the dominance of clay versus diatomaceous ooze in this core, as a function of depth in an IODP core.<br/>
         Demo recording on <b>YouTube</b>: <a href='https://www.youtube.com/watch?v=9yGPbATqRtI'>PmagPy Using Jupyter Notebooks</a>
        </p>
        <p> <a href='https://github.com/PmagPy/2016_Tauxe-et-al_PmagPy_Notebooks'>Tauxe el al. (2016) PmagPy Example Notebooks</a> <br/>
        Python Jupyter Notebooks from the 2016 G-Cubed <a href='http://dx.doi.org/10.1002/2016GC006307'>paper</a> describing 
        PmagPy. Includes a <a href='https://github.com/PmagPy/2016_Tauxe-et-al_PmagPy_Notebooks/blob/master/Example_PmagPy_Notebook.ipynb'>notebook</a> for 
        taking two data sets from the MagIC database and conducting a variety of analyses on them including a fold test, a common mean test and the calculation of a combined paleomagnetic pole. 
        This collection also includes a variety of shorter code <a href='https://github.com/PmagPy/2016_Tauxe-et-al_PmagPy_Notebooks/blob/master/Additional_PmagPy_Examples.ipynb'>examples</a> that 
        put PmagPy functions to use within the notebook environment.
        </p>
        <p> <a href='https://github.com/PmagPy/2017_MagIC_Workshop_PmagPy_Tutorial'>2017 MagIC Workshop PmagPy Tutorial</a><br/>
            Python Jupyter Notebooks from the 2017 MagIC Workshop by Nick Swanson-Hysell. Includes updated notebooks from the Tauxe et al. (2016) along with other notebooks.
        </p>
      </div>
    );
  }

}
