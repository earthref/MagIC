import React from 'react';
import {Link} from 'react-router-dom';

export default class extends React.Component {

  render() {
    return (
      <div className="ui secondary menu" style={{margin:'-1em 0', minHeight:'1.5em'}}>
        <Link className={"vertically fitted item"} to={"/MagIC"} style={{minHeight:'1.5em'}}>
          Home
        </Link>
        <Link className={"vertically fitted item"} to={"/MagIC/about"} style={{minHeight:'1.5em'}}>
          About
        </Link>
      </div>
    );
  }

}

