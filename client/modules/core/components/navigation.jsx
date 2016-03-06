import React from 'react';

const Header = React.createClass({
  render() {
    return (
      <div className="ui vertical inverted sidebar menu left">
        <a className="active item">EarthRef.org</a>
        <a className="item">GERM</a>
        <a className="item">MagIC</a>
        <a className="item">SBN</a>
        <a className="item">ERESE</a>
      </div>
    );
  }
});

export default Header;
