import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { portals } from '/lib/configs/portals.js';

class IconButton extends React.Component {

  constructor(props) {
    super(props);
    this.styles = {
      header: { marginTop: 0, marginBottom: '0.5rem' },
      onlyHeader: { marginTop: 0, marginBottom: 0 },
      subHeader: { textTransform: 'none', color: '#555555', marginBottom: 0 }
    };
  }

  portalColor() {
    return portals[this.props.portal].color || 'green';
  }

  renderChildren () {
    let hasSubTitle = _.some(_.map(this.props.children, c => c && c.props && c.props.className === 'subtitle'));
    let headerStyle = hasSubTitle ? this.styles.header : this.styles.onlyHeader;
    return (
      <div className="content">
        {React.Children.map(this.props.children, (child, i) => {
          if (child.props.className === 'title')
            child = React.cloneElement(child, { className: 'ui header ' + this.portalColor(), style: headerStyle});
          if (child.props.className === 'small title')
            child = React.cloneElement(child, { className: 'ui small header ' + this.portalColor(), style: headerStyle});
          if (child.props.className.indexOf('statistic') !== -1)
            child = React.cloneElement(child, { className: child.props.className + ' ' + this.portalColor()});
          if (child.props.className === 'subtitle')
            child = React.cloneElement(child, { className: 'ui sub header', style: this.styles.subHeader});
          return child;
        })}
      </div>
    );
  }

  render() {
    let {portal, className, href, link, tooltip, position, ...props} = this.props;
    className = 'ui icon header basic fluid button ' + this.portalColor() + ' ' +
      className + ' er-icon-button';

    if (this.props.href) return (
      <div className={className} {...props}>
        <a href={this.props.href}>
          <div data-tooltip={tooltip} data-position={position}>
            {this.renderChildren()}
          </div>
        </a>
      </div>
    );
    else if (this.props.link) return (
      <div className={className} {...props}>
        <Link to={this.props.link}>
          <div data-tooltip={tooltip} data-position={position}>
            {this.renderChildren()}
          </div>
        </Link>
      </div>
    );
    else return (
      <div className={className} {...props}>
        <div data-tooltip={tooltip} data-position={position}>
          {this.renderChildren()}
        </div>
      </div>
    );
  }

}

IconButton.propTypes = {
  portal:    PropTypes.oneOf(_.keys(portals)).isRequired,
  className: PropTypes.string,
  href:      PropTypes.string,
  link:      PropTypes.string,
  tooltip:   PropTypes.string,
  position:  PropTypes.string
};

export default IconButton;