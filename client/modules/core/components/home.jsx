import React from 'react';
import {portals} from '../configs/portals.js';

export default class extends React.Component {

  render() {
    const {portal} = this.props;
    return (
      <div>
        <h1>{portals[portal].title}</h1>
        <h4 style={{marginTop: 0}}>{portals[portal].subtitle}</h4>
      </div>
    )
  }

}

