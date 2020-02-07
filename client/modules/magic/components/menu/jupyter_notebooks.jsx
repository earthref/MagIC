import React from 'react';
import {Link} from 'react-router-dom';

export default class extends React.Component {

  render() {
    return (
      <div>
        <p> 
            There are five Jupyter notebooks for PmagPy that explain the functions and uses of the PmagPy 
            software. They can be found and downloaded from the PmagPy GitHub website: <br/>
            <br/> 
            <a href='https://github.com/PmagPy/PmagPy/blob/master/PmagPy_introduction.ipynb'>Introduction</a><br/>
            <a href='https://github.com/PmagPy/PmagPy/blob/master/PmagPy_MagIC.ipynb'>PmagPy and MagIC</a><br/>
            <a href='https://github.com/PmagPy/PmagPy/blob/master/PmagPy_calculations.ipynb'>Calculations</a><br/>
            <a href='https://github.com/PmagPy/PmagPy/blob/master/PmagPy_plots_analysis.ipynb'>Plots and Analysis</a><br/>
            <a href='https://github.com/PmagPy/PmagPy/blob/master/PmagPy-cli.ipynb'>PmagPy - Command Line Verson</a>
        </p>
        <p> <br/>Other PmagPy Jupyter Notebooks:
        </p>
        <p> <a href='https://github.com/PmagPy/2016_Tauxe-et-al_PmagPy_Notebooks'>Tauxe el al. (2016) PmagPy Example Notebooks</a>
            <br/>
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
