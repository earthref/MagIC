import React, { PropTypes } from 'react';

export default class GoogleStaticMap extends React.Component {

  boundLat(x) {
    return Math.max(Math.min(x, 90), -90);
  }

  boundLon(x) {
    if      (x < -180) return this.boundLon(x + 360);
    else if (x >  180) return this.boundLon(x - 360);
    else               return x;
  }

  render() {

    const key = 'AIzaSyBLZOmrD0zBidUXezxmNRHcpPp5cA45pUQ';
    const width   = this.props.width    || 100;
    const height  = this.props.height   || 100;
    const padding = this.props.padding  || 5  ;
    const minDim  = this.props.minDim/2 || .2 ;
    const color   = this.props.color    || 'BBBBBB99';
    const border  = this.props.border   || '800080FF';
    const weight  = this.props.weight   || 1;
    const paths   = this.props.paths    || [];
    const noMap   = (
      <div style={{
        minWidth: width,
        minHeight: height,
        maxWidth: width,
        maxHeight: height,
        visibility: 'hidden'
      }}>
      </div>
    );

    if (paths.length == 0) {
      return noMap;
    }

    else {

      try {

        let src = `//maps.googleapis.com/maps/api/staticmap?key=${key}&size=${width}x${height}&maptype=relief`;
        let lat_min, lat_max, lon_min, lon_max;

        _(paths).forEach((p, i) => {

          p.lat_n = (p.lat_n !== undefined ? p.lat_n : p.lat);
          p.lat_s = (p.lat_s !== undefined ? p.lat_s : p.lat);
          p.lon_e = (p.lon_e !== undefined ? p.lon_e : p.lon);
          p.lon_w = (p.lon_w !== undefined ? p.lon_w : p.lon);

          if (p.lat_n < p.lat_s) [p.lat_n, p.lat_s] = [p.lat_s, p.lat_n];
          if (p.lon_e < p.lon_w) [p.lon_w, p.lon_e] = [p.lon_w, p.lon_e];

          if (src.length < 800 &&
            p.lat_n !== undefined &&
            p.lat_s !== undefined &&
            p.lon_e !== undefined &&
            p.lon_w !== undefined) {

            let lat_n = this.boundLat(p.lat_n + minDim);
            let lat_s = this.boundLat(p.lat_s - minDim);
            let lon_e = this.boundLon(p.lon_e + minDim);
            let lon_w = this.boundLon(p.lon_w - minDim);

            src += `&path=color:0x${border}|weight:${weight}|fillcolor:0x${color}|`;
            src += lat_s.toFixed(2) + ',' + lon_w.toFixed(2) + '|' +
                   lat_s.toFixed(2) + ',' + lon_e.toFixed(2) + '|' +
                   lat_n.toFixed(2) + ',' + lon_e.toFixed(2) + '|' +
                   lat_n.toFixed(2) + ',' + lon_w.toFixed(2) + '|' +
                   lat_s.toFixed(2) + ',' + lon_w.toFixed(2);

            lat_max = (lat_max !== undefined ? Math.max(lat_max, lat_n) : lat_n);
            lat_min = (lat_min !== undefined ? Math.min(lat_min, lat_s) : lat_s);
            lon_max = (lon_max !== undefined ? Math.max(lon_max, lon_e) : lon_e);
            lon_min = (lon_min !== undefined ? Math.min(lon_min, lon_w) : lon_w);

          }

        });

        lat_max = this.boundLat(lat_max + padding);
        lat_min = this.boundLat(lat_min - padding);
        lon_max = this.boundLon(lon_max + padding);
        lon_min = this.boundLon(lon_min - padding);

        src += `&path=color:0x00000000|${lat_min},${lon_min}|${lat_max},${lon_max}`;

        return (
          <img className="ui bordered image" src={src} onClick={() => console.log(paths)}
               style={{minWidth: width, minHeight: height, maxWidth: width, maxHeight: height}}/>
        );

      } catch (e) {
        console.error(e);
        return noMap;
      }

    }
  }
}

GoogleStaticMap.propTypes = {
  width:   PropTypes.number, // width in pixels
  height:  PropTypes.number, // height in pixels
  padding: PropTypes.number, // padding around paths bounding box in degrees
  minDim:  PropTypes.number, // minimum path dimensions in degrees
  color:   PropTypes.string, // path fill color in alpha hex string
  border:  PropTypes.string, // path border color in alpha hex string
  weight:  PropTypes.number, // path border thickness in pixels
  paths:   PropTypes.array
};