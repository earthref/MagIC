import React from 'react';
import {Link} from 'react-router-dom';

export default class extends React.Component {

  render() {
    return (
      <div>
        <p> The following is a list of Jupyter Notebooks resources that 
            use PmagPy programs to manipulate, analyze and display paleomagnetic 
            data using the MagIC data file format. 
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
