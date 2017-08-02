import React from 'react';
import PropTypes from 'prop-types';

export default class extends React.Component {

  render() {
    const {location, portal} = this.props;
    const navigationClasses = (location === 'top' ? 'left menu ' : '') + location + '-navigation';
    return (
      <div className={navigationClasses}>
        {portalsOrder.map((p, i) => {
          const classes = (p === portal ? portals[p].color + ' active ' : '') + 'item';
          const styles = (i === 0 ? {paddingLeft: '0px'} : {});
          return (
            <a key={i} className={classes} href={portals[p].url} style={styles}>
              {p}
            </a>
          );
        })}
      </div>
    );
  }

}
