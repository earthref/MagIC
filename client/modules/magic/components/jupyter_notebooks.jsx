import _ from  'lodash';
import React from 'react';
import saveAs from 'save-as';
import {Link} from 'react-router-dom';

import {portals} from '/lib/configs/portals.js';
import {methodCodes} from '/lib/configs/magic/method_codes.js';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loaded: false,
      updating: false
    };
  }

  componentDidMount() {
    $(this.refs['accordion']).accordion({exclusive: false});
    setTimeout(() => { this.setState({loaded: true}); }, 1);
  }

  componentDidUpdate() {
    this.search(this.refs['search'].value);
    $(this.refs['loading']).removeClass('active');
    this.setState({updating: false});
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.updating ||
        nextState.search != this.state.search ||
        nextState.loaded != this.state.loaded) {
      return true;
    }
    if (nextProps.version !== this.props.version) {
      $(this.refs['loading']).addClass('active');
      setTimeout(() => { this.setState({updating: true}); }, 1);
    }
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({search: nextProps.search});
  }

  render() {
    return (
      <div>
        <p> The following is a list of Jupyter Notebooks resources that 
            use PmagPy programs to manipulate, analyze and display paleomagnetic 
            data using the MagIC data file format. 
        </p>
        <p> <a href='https://github.com/PmagPy/2016_Tauxe-et-al_PmagPy_Notebooks'><font color='purple'>Tauxe el al. (2016) PmagPy Example Notebooks</font></a>
            <br/>
            Python Jupyter Notebooks from the 2016 G-Cubed <a href='http://dx.doi.org/10.1002/2016GC006307'><font color='purple'>paper</font></a> describing 
            PmagPy. Includes a <a href='https://github.com/PmagPy/2016_Tauxe-et-al_PmagPy_Notebooks/blob/master/Example_PmagPy_Notebook.ipynb'><font color='purple'>notebook</font></a> for 
            taking two data sets from the MagIC database and conducting a variety of analyses on them including a fold test, a common mean test and the calculation of a combined paleomagnetic pole. 
            This collection also includes a variety of shorter code <a href='https://github.com/PmagPy/2016_Tauxe-et-al_PmagPy_Notebooks/blob/master/Additional_PmagPy_Examples.ipynb'><font color='purple'>examples</font></a> that 
            put PmagPy functions to use within the notebook environment.
        </p>
        <p> <a href='https://github.com/PmagPy/2017_MagIC_Workshop_PmagPy_Tutorial'><font color='purple'>2017 MagIC Workshop PmagPy Tutorial</font></a><br/>
            Python Jupyter Notebooks from the 2017 MagIC Workshop by Nick Swanson-Hysell. Includes updated notebooks from the Tauxe et al. (2016) along with other notebooks.
        </p>
      </div>
    );
  }

}
