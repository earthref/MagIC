import React from 'react';
import {portals} from '../configs/portals.js';

export default class extends React.Component {

  render() {
    const {portal} = this.props;
    return (
      <div>
        <a
          className={'ui menu basic button home-logo ' + portals[portal].color}
          href={`/${portal}/`}
        >
          {portal.substring(0,1)}
        </a>
        <h1 className="home-title">{portals[portal].title}</h1>
        <h4 className="home-subtitle">{portals[portal].subtitle}</h4>
        <div className="ui divider"></div>
        {this.props.children}
      </div>
    )
  }

}

