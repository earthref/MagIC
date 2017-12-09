import _ from  'lodash';
import React from 'react';
import saveAs from 'save-as';

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
        <p>
        <b>About MagIC</b><br/>
        <br/>
        MagIC is a database for the paleomagntic, geomagnetic, and rock magnetic community.</p>
        <p>MagIC is supported by many people and orgianizations. The core group is:<br/>
         <a href="http://earthref.org/erml/126">Cathy Constable</a> <br/>
         <a href="http://earthref.org/erml/629">Lisa Tauxe</a> <br/>
         <a href="http://earthref.org/erml/335">Anthoy Koppers</a> <br/>
         <a href="http://earthref.org/erml/6434">Nick Jarboe</a> <br/>
         <a href="http://earthref.org/erml/5730">Rupert Minnett</a> <br/> 
         <a href="http://earthref.org/erml/8110">Lori Jonestrask</a> <br/>
        </p>
        <p>We provide resources for work on some scientific grand challenges:<br/>
        <ul>
          <li> The Geomagnetic and Thermal History of the Earth </li>
          <li> True Polar Wander and Plumes </li>
          <li> Understanding Interactions Between Magnetic Field and Climate </li>
          <li> Biogeomagnetis </li>
          <li> Environmental Magnetism, Dust and Rainfall </li>
          <li> Magnetism at High Pressures and in Extraterrestrial Bodies </li>
        </ul>
        </p>
        <p> Detailed <a href="grand-challenges"><font color="purple">descriptions</font></a> of the Grand Challenges.  </p>
      </div>
    );
  }

}

