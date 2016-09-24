import React from 'react';
import {portals, portalsOrder} from '../configs/portals.js';

export default class extends React.Component {

  render() {
    const {location, portal} = this.props;
    const navigationClasses = (location === 'top' ? 'left menu ' : '') + location + '-navigation';
    return (
      <div className={navigationClasses}>
        {portalsOrder.map((p, i) => {
          const classes = (p === portal ? portals[p].color + ' active ' : '') + 'item';
          return (<a key={i} className={classes} href={portals[p].url}>{p}</a>);
        })}
      </div>
    );
  }

}
