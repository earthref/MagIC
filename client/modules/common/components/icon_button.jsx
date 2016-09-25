import React from 'react';
import {portals} from '../configs/portals.js';

export default class extends React.Component {

  render() {
    const {portal, title, style, children, className, icons} = this.props;
    const color = portals[portal].color;
    return (
      <div className={'ui basic icon header button ' + color + ' ' + className} style={style}>
        <div className="content">
          <div className={'ui header ' + color}>{title}</div>
          {children}
        </div>
      </div>
    )
  }

}

