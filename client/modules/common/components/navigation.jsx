import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {portals, portalsOrder} from '/lib/configs/portals';

class Navigation extends React.Component {

  render() {
    const {position, portal} = this.props;
    return (
      <div className={(position === 'top' ? 'left menu ' : '') + position + '-navigation'}>
        {portalsOrder.map((p, i) => {
          return (p === 'MagIC' ?
            <Link
              key={i}
              className={(portal === p ? 'active ' : '')  + portals[p].color + ' item'}
              to={portals[p].url}
            >
              {p}
            </Link>
            :
            <a key={i}
               className={(portal === p ? 'active ' : '')  + portals[p].color + ' item'}
               href={portals[p].url}
            >
              {p}
            </a>
          );
        })}
      </div>
    );
  }

}

Navigation.propTypes = {
  portal:   PropTypes.oneOf(_.keys(portals)).isRequired,
  position: PropTypes.oneOf(['top', 'sidebar'])
};

export default Navigation;