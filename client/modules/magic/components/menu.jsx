import React from 'react';
import {Link} from 'react-router-dom';
import {NavLink} from 'react-router-dom';

export default class extends React.Component {

  render() {
    let itemStyle = {padding:'0.5em 1em'};
    return (
      <div className="ui secondary small pointing purple menu" style={{margin:'0.25em 0 1.25em'}}>
        <NavLink exact className={"item"} to={"/MagIC"} activeClassName="active" style={itemStyle}>
          Home
        </NavLink>
        <NavLink className={"item"} to={"/MagIC/about"} activeClassName="active" style={itemStyle}>
          About
        </NavLink>
        <NavLink className={"item"} to={"/MagIC/contact"} activeClassName="active" style={itemStyle}>
          Contact 
        </NavLink>
        <NavLink className={"item"} to={"/MagIC/grand-challenges"} activeClassName="active" style={itemStyle}>
          Grand Challenges
        </NavLink>
        <NavLink className={"item"} to={"/MagIC/workshops"} activeClassName="active" style={itemStyle}>
          Workshops
        </NavLink>
        <NavLink className={"item"} to={"/MagIC/links"} activeClassName="active" style={itemStyle}>
          Links
        </NavLink>
        <div className="right menu">
          <a className={"item"} href={"https://github.com/earthref/MagIC/issues"} target="_blank" style={itemStyle}>
            <i className="fitted exclamation triangle icon"></i>
            Report an Issue on GitHub
          </a>
          <NavLink className={"item"} to={"/MagIC/help"} activeClassName="active" style={itemStyle}>
            <i className="fitted question circle icon"></i>
            Help
          </NavLink>
        </div>
      </div>
    );
  }

}

