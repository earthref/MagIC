import React from 'react';
import {portals} from '../configs/portals.js';

export default class extends React.Component {

  render() {
    const {portal} = this.props;
    return (
      <div>
        <h1 className="home-title">{portals[portal].title}</h1>
        <h4 className="home-subtitle">{portals[portal].subtitle}</h4>
        <div className="ui divider"></div>
        {this.props.children}
      </div>
    )
  }

}

