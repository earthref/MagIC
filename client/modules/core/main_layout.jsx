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
    <div className="ui top fixed secondary pointing menu" style={{background: '#F8F8F8'}}>
      <div className="ui container">
        <a className="item">
          <i className="sidebar icon"></i>
        </a>
        <a className="active green item">EarthRef.org</a>
        <a className="item">GERM</a>
        <a className="item">MagIC</a>
        <a className="item">SBN</a>
        <a className="item">ERESE</a>
        <div className="right menu">
          <div className="ui search">
            <div className="ui transparent icon input item">
              <input className="prompt" type="text" placeholder="Search EarthRef" style={{border: 'none', marginTop: '-1px', marginBottom: '-1px'}}/>
              <i className="search icon"></i>
            </div>
            <div className="results"></div>
          </div>
        </div>
      </div>
    </div>
    <div className="ui main container" style={{paddingTop: '4em'}}>
      {content()}
    </div>
  </div>
);

export default Layout;
