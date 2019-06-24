import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

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
        <NavLink className={"item"} to={"/MagIC/technology"} activeClassName="active" style={itemStyle}>
          Technology
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
            <Icon name='exclamation triangle'/>
            Report an Issue on GitHub
          </a>
          <NavLink className={"item"} to={"/MagIC/help"} activeClassName="active" style={itemStyle}>
            <Icon name='question'/>
            Help
          </NavLink>
          <NavLink className={"item"} to={"/MagIC/contact"} activeClassName="active" style={itemStyle}>
            <Icon name='mail'/>
            Contact 
          </NavLink>
        </div>
      </div>
    );
  }

}

