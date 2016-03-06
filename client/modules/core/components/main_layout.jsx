import React from 'react';

const Layout = ({content = () => null }) => (
  <div>
    <div className="ui vertical inverted sidebar menu left">
      <a className="active item">EarthRef.org</a>
      <a className="item">GERM</a>
      <a className="item">MagIC</a>
      <a className="item">SBN</a>
      <a className="item">ERESE</a>
    </div>
    <div className="ui top fixed menu">
      <div className="ui container">
        <a className="active item">EarthRef.org</a>
        <a className="item">GERM</a>
        <a className="item">MagIC</a>
        <a className="item">SBN</a>
        <a className="item">ERESE</a>
      </div>
    </div>
    <div className="ui menu">
      <div className="ui container">
        <a className="active item">EarthRef.org</a>
        <a className="item">GERM</a>
        <a className="item">MagIC</a>
        <a className="item">SBN</a>
        <a className="item">ERESE</a>
      </div>
    </div>
    {content()}
  </div>
);

export default Layout;
