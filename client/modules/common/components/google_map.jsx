import React, { PropTypes } from 'react';
import { Random } from 'meteor/random';

GoogleMaps.load({v: '3', key: 'AIzaSyBLZOmrD0zBidUXezxmNRHcpPp5cA45pUQ'});

export default class GoogleMap extends React.Component {

  constructor(props) {
    super(props);
    this.loaded = false;
    this.markers = [];
  }

  componentDidUpdate(lastProps, lastState) {
    if (!this.loaded && GoogleMaps.loaded()) {
      this.loaded = true;
      this.name = Random.id();
      GoogleMaps.create({
        name: this.name,
        element: this.container,
        options: this.props.mapOptions()
      });
      this.props.onReady(this);
    }

    if (this.loaded && !_.isEqual(lastProps.docs, this.props.docs)) {

      this.markers.forEach((m) => m.setMap(null));
      this.markers = [];

      let bounds = new google.maps.LatLngBounds();
      this.props.docs.forEach((c) => {

        let paths = [];
        const minDim = 0.2;
        if (c.BEGIN_LATS !== undefined &&
          c.END_LATS !== undefined && c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':').length == c.END_LATS.replace(/(^:|:$)/g, '').split(':').length &&
          c.BEGIN_LONS !== undefined && c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':').length == c.BEGIN_LONS.replace(/(^:|:$)/g, '').split(':').length &&
          c.END_LONS !== undefined && c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':').length == c.END_LONS.replace(/(^:|:$)/g, '').split(':').length) {
          _.forEach(c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':'), ([], i) => {
            var south = this.boundLat(parseFloat(c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':')[i]) + minDim),
              north = this.boundLat(parseFloat(c.END_LATS.replace(/(^:|:$)/g, '').split(':')[i]) - minDim),
              west = this.boundLon(parseFloat(c.BEGIN_LONS.replace(/(^:|:$)/g, '').split(':')[i]) + minDim),
              east = this.boundLon(parseFloat(c.END_LONS.replace(/(^:|:$)/g, '').split(':')[i]) - minDim);
            if (north < south) [north, south] = [south, north];
            if (east < west) [east, west] = [west, east];
            paths.push({
              south: south,
              north: north,
              west: west,
              east: east
            });
          });
        }
        /*if (c.begin_lats !== undefined &&
         c.end_lats   !== undefined && c.begin_lats.length == c.end_lats  .length &&
         c.begin_lons !== undefined && c.begin_lats.length == c.begin_lons.length &&
         c.end_lons   !== undefined && c.begin_lats.length == c.end_lons  .length) {
         _(c.begin_lats).forEach(([], i) => {
         paths.push({
         south: c.begin_lats[i],
         north: c.end_lats  [i],
         west:  c.begin_lons[i],
         east:  c.end_lons  [i]})
         });
         }*/

        paths.forEach((path) => {
          let rect = new google.maps.Rectangle({
            strokeColor: '#800080',
            strokeOpacity: 1,
            strokeWeight: 1,
            fillColor: '#BBBBBB',
            fillOpacity: 0.35,
            map: GoogleMaps.maps[this.name].instance,
            bounds: path
          });
          this.markers.push(rect);
          bounds.extend(rect.getBounds().getNorthEast());
          bounds.extend(rect.getBounds().getSouthWest());
        });

      });

      GoogleMaps.maps[this.name].instance.fitBounds(bounds).setCenter(bounds.getCenter());
      var listener = google.maps.event.addListener(GoogleMaps.maps[this.name].instance, "idle", () => {
        if (GoogleMaps.maps[this.name].instance.getZoom() > 4) GoogleMaps.maps[this.name].instance.setZoom(4);
        google.maps.event.removeListener(listener);
      });

    }

    if (GoogleMaps.maps[this.name])
      _.delay(() => google.maps.event.trigger(GoogleMaps.maps[this.name].instance,'resize'), 500);
  }

  boundLat(x) {
    return Math.max(Math.min(x, 90), -90);
  }

  boundLon(x) {
    if      (x < -180) return this.boundLon(x + 360);
    else if (x >  180) return this.boundLon(x - 360);
    else               return x;
  }

  componentWillUnmount() {
    if (GoogleMaps.maps[this.name]) {
      google.maps.event.clearInstanceListeners(GoogleMaps.maps[this.name].instance);
      delete GoogleMaps.maps[this.name];
    }
  }

  render() {
    return (
      <div ref={c => (this.container = c)} style={_.extend({width: '100%', height: '100%'}, this.props.style)}>
        {this.props.children}
      </div>
    );
  }
}

GoogleMap.propTypes = {
  onReady:  PropTypes.func.isRequired,
  mapOptions:  PropTypes.func.isRequired,
  children: PropTypes.node
};