import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

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

    const key = Meteor.isDevelopment && Meteor.settings.public.google ?
      Meteor.settings.public.google.apiKey :
      'AIzaSyBLZOmrD0zBidUXezxmNRHcpPp5cA45pUQ';
    const width   = this.props.width    || 100;
    const height  = this.props.height   || 100;
    const padding = this.props.padding  || 2  ;
    const color   = this.props.color    || 'BBBBBB99';
    const border  = this.props.border   || '800080FF';
    const weight  = this.props.weight   || 2;
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

    if (paths.length === 0) {
      return noMap;
    }

    else {

      try {

        let src = `//maps.googleapis.com/maps/api/staticmap?key=${key}&scale=2&size=${1.5*width}x${1.5*height}`;
        let lat_min, lat_max, lon_min, lon_max;
        let src_paths = [];

        paths.forEach((p, i) => {

          p.lat_n = (p.lat_n !== undefined ? p.lat_n : p.lat);
          p.lat_s = (p.lat_s !== undefined ? p.lat_s : p.lat);
          p.lon_e = (p.lon_e !== undefined ? p.lon_e : p.lon);
          p.lon_w = (p.lon_w !== undefined ? p.lon_w : p.lon);

          if (p.lat_n < p.lat_s) { let s = p.lat_s; p.lat_s = p.lat_n; p.lat_n = s; }
          if (p.lon_e < p.lon_w) { let e = p.lon_e; p.lon_e = p.lat_w; p.lat_w = e; }

          if (p.lat_n !== undefined &&
              p.lat_s !== undefined &&
              p.lon_e !== undefined &&
              p.lon_w !== undefined) {

            let src_path = {};
            src_path.lat_n = this.boundLat(p.lat_n);
            src_path.lat_s = this.boundLat(p.lat_s);
            src_path.lon_e = this.boundLon(p.lon_e);
            src_path.lon_w = this.boundLon(p.lon_w);

            lat_max = (lat_max !== undefined ? Math.max(lat_max, src_path.lat_n) : src_path.lat_n);
            lat_min = (lat_min !== undefined ? Math.min(lat_min, src_path.lat_s) : src_path.lat_s);
            lon_max = (lon_max !== undefined ? Math.max(lon_max, src_path.lon_e) : src_path.lon_e);
            lon_min = (lon_min !== undefined ? Math.min(lon_min, src_path.lon_w) : src_path.lon_w);

            src_paths.push(src_path);
          }

        });

        src_paths = _.uniqWith(src_paths, (p1, p2) =>
          p1.lat_n === p2.lat_n &&
          p1.lat_s === p2.lat_s &&
          p1.lon_e === p2.lon_e &&
          p1.lon_w === p2.lon_w
        );

        //src_paths = _.shuffle(src_paths);

        let min_dim = Math.max(2*padding + lat_max - lat_min, 2*padding + lon_max - lon_min)/Math.min(width, height);

        src_paths.forEach((p, i) => {

          if (src.length < 1848) { // leave 200 characters for the rest of the URL

            let lat_n = p.lat_n + min_dim;
            let lat_s = p.lat_s - min_dim;
            let lon_e = p.lon_e + min_dim;
            let lon_w = p.lon_w - min_dim;

            src += `&path=color:0x${border}|weight:${weight}|fillcolor:0x${color}|`;
            src += lat_s.toFixed(2) + ',' + lon_w.toFixed(2) + '|' +
                   lat_s.toFixed(2) + ',' + lon_e.toFixed(2) + '|' +
                   lat_n.toFixed(2) + ',' + lon_e.toFixed(2) + '|' +
                   lat_n.toFixed(2) + ',' + lon_w.toFixed(2) + '|' +
                   lat_s.toFixed(2) + ',' + lon_w.toFixed(2);

          }

        });

        lat_max = this.boundLat(lat_max + padding);
        lat_min = this.boundLat(lat_min - padding);
        lon_max = this.boundLon(lon_max + padding);
        lon_min = this.boundLon(lon_min - padding);

        src += `&path=color:0x00000000|${lat_min.toFixed(2)},${lon_min.toFixed(2)}|${lat_max.toFixed(2)},${lon_max.toFixed(2)}`;

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
  color:   PropTypes.string, // path fill color in alpha hex string
  border:  PropTypes.string, // path border color in alpha hex string
  weight:  PropTypes.number, // path border thickness in pixels
  paths:   PropTypes.array
};