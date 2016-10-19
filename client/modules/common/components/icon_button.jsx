import React from 'react';
import {portals} from '../configs/portals.js';

export default class extends React.Component {

  portalColor() {
    const portal = this.props.portal || 'EarthRef.org';
    return portals[portal] && portals[portal].color || 'green';
  }

  renderChildren () {
    return (
      <div className="content">
        {React.Children.map(this.props.children, (child, i) => {
          if (child.props.className === 'title')
            child = React.cloneElement(child, { className: 'ui header ' + this.portalColor()});
          if (child.props.className.indexOf('statistic') !== -1)
            child = React.cloneElement(child, { className: child.props.className + ' ' + this.portalColor()});
          if (child.props.className === 'subtitle')
            child = React.cloneElement(child, { className: 'ui sub header'});
          return child;
        })}
      </div>
    );
  }

  render() {
    let {className, portal, tooltip, position, ...props} = this.props;
    className = 'ui icon header basic fluid button ' + this.portalColor() + ' ' +
      className + ' er-icon-button';
    return (
      <div className={className} {...props}>
      {(this.props.href ?
        <a href={this.props.href} data-tooltip={tooltip} data-position={position}>
          {this.renderChildren()}
        </a>
      :
        <div data-tooltip={tooltip} data-position={position}>
          {this.renderChildren()}
        </div>
      )}
      </div>);
  }

}