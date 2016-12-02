import React, { PropTypes } from 'react';

export default class GoogleStaticMap extends React.Component {

  render() {
    const key = 'AIzaSyBLZOmrD0zBidUXezxmNRHcpPp5cA45pUQ';
    const width = this.props.width || 100;
    const height = this.props.height || 100;
    let src = `//maps.googleapis.com/maps/api/staticmap?key=${key}&size=${width}x${height}&maptype=relief`;
    return (
      <img className="ui bordered image" src={src} style={{minWidth: width, minHeight: height, maxWidth: width, maxHeight: height}}/>
    );
  }
}

GoogleStaticMap.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  paths: PropTypes.array
};