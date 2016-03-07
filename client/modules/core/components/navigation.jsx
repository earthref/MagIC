import React from 'react';

export default class extends React.Component {

  render() {
    const {location, portal} = this.props;
    return (
      <div className="left menu">
          <a className={(portal === 'EarthRef' ? "active green  " : "") + "item"} href="/"      >EarthRef.org</a>
          <a className={(portal === 'GERM'     ? "active orange " : "") + "item"} href="/GERM/" >GERM</a>
          <a className={(portal === 'MagIC'    ? "active purple " : "") + "item"} href="/MagIC/">MagIC</a>
          <a className={(portal === 'SBN'      ? "active teal   " : "") + "item"} href="/SBN/"  >SBN</a>
          <a className={(portal === 'ERESE'    ? "active blue   " : "") + "item"} href="/ERESE/">ERESE</a>
      </div>
    );
  }

}

