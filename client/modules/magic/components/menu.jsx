import React from 'react';
import {Link} from 'react-router-dom';
import {NavLink} from 'react-router-dom';

export default class extends React.Component {

  render() {
    return (
      <div className="ui secondary menu" style={{margin:'-1em 0', minHeight:'1.5em'}}>
        <NavLink exact className={"vertically fitted item"} to={"/MagIC"} activeClassName="active" style={{minHeight:'1.5em'}}>
          Home
        </NavLink>
        <NavLink className={"vertically fitted item"} to={"/MagIC/about"} activeClassName="active" style={{minHeight:'1.5em'}}>
          About
        </NavLink>
        <NavLink className={"vertically fitted item"} to={"/MagIC/contact"} activeClassName="active" style={{minHeight:'1.5em'}}>
         Contact 
        </NavLink>
        <NavLink className={"vertically fitted item"} to={"/MagIC/help"} activeClassName="active" style={{minHeight:'1.5em'}}>
          Help
        </NavLink>
        <NavLink className={"vertically fitted item"} to={"/MagIC/workshops"} activeClassName="active" style={{minHeight:'1.5em'}}>
          Workshops
        </NavLink>
        <NavLink className={"vertically fitted item"} to={"/MagIC/links"} activeClassName="active" style={{minHeight:'1.5em'}}>
          Links
        </NavLink>
      </div>
    );
  }

}

