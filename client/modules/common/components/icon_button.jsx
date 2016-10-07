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
          if (child.props.className === 'subtitle')
            child = React.cloneElement(child, { className: 'ui sub header'});
          return child;
        })}
      </div>
    );
  }

  render() {
    const className = 'ui icon header basic fluid button ' + this.portalColor() + ' ' +
                      this.props.className + ' er-icon-button';
    return (
      <div className={className} style={this.props.style}>
      {(this.props.href ?
        <a className="content" href={this.props.href}>
          {this.renderChildren()}
        </a>
      :
        <div className="content">
          {this.renderChildren()}
        </div>
      )}
      </div>);
  }

}