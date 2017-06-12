import React, { PropTypes } from 'react';
import { Random } from 'meteor/random';

//let GoogleMaps = GoogleMaps || {}, google = google || {};

GoogleMaps.load({v: '3', key: 'AIzaSyBLZOmrD0zBidUXezxmNRHcpPp5cA45pUQ'});

export default class GoogleMap extends React.Component {

  constructor(props) {
    super(props);
    this.loaded = false;
    this.objects = [];
    this.state = {
      iDoc: -1
    }
  }

  componentDidUpdate(lastProps, lastState) {
    if (!this.loaded && GoogleMaps.loaded()) {
      this.loaded = true;
      this.name = Random.id();
      GoogleMaps.create({
        name: this.name,
        element: this.container,
        options: _.extend({mapTypeId: 'terrain'}, this.props.mapOptions())
      });
      this.map = GoogleMaps.maps[this.name].instance;

      this.props.onReady(this);
    }

    if (this.loaded && !_.isEqual(lastProps.docs, this.props.docs)) {

      this.objects.forEach((m) => m.setMap(null));
      this.objects = [];
      this.bounds = new google.maps.LatLngBounds();
      this.setState({iDoc: 0});

    }

    if (this.loaded && _.isArray(this.props.docs) &&
      this.state.iDoc >= 0 && this.state.iDoc < this.props.docs.length) {

      console.log('drawing', this.state.iDoc);

      _.forEach(this.props.docs.slice(this.state.iDoc, this.state.iDoc+100), (c) => {


        if (c.BEGIN_LATS !== undefined &&
            c.END_LATS   !== undefined && c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':').length == c.END_LATS.replace(/(^:|:$)/g, '').split(':').length &&
            c.BEGIN_LONS !== undefined && c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':').length == c.BEGIN_LONS.replace(/(^:|:$)/g, '').split(':').length &&
            c.END_LONS   !== undefined && c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':').length == c.END_LONS.replace(/(^:|:$)/g, '').split(':').length) {
          _.forEach(c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':'), ([], i) => {
            this.addObject(
              this.boundLat(parseFloat(c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':')[i])),
              this.boundLat(parseFloat(c.END_LATS  .replace(/(^:|:$)/g, '').split(':')[i])),
              this.boundLon(parseFloat(c.BEGIN_LONS.replace(/(^:|:$)/g, '').split(':')[i])),
              this.boundLon(parseFloat(c.END_LONS  .replace(/(^:|:$)/g, '').split(':')[i])),
              '<b>' + c.CITATION + '</b> v. ' + c.VERSION + '<br/>by ' + c.CONTRIBUTOR
            );
          });
        }

        if (c.BEGIN_LAT !== undefined &&
            c.END_LAT   !== undefined &&
            c.BEGIN_LON !== undefined &&
            c.END_LON   !== undefined) {
          this.addObject(
            this.boundLat(parseFloat(c.BEGIN_LAT)),
            this.boundLat(parseFloat(c.END_LAT  )),
            this.boundLon(parseFloat(c.BEGIN_LON)),
            this.boundLon(parseFloat(c.END_LON  )),
            '<b>' + c.CITATION + '</b> v. ' + c.VERSION + '<br/>by ' + c.CONTRIBUTOR
          );
        }

        if (c.LAT !== undefined &&
            c.LON !== undefined) {
          this.addObject(
            this.boundLat(parseFloat(c.LAT)),
            this.boundLat(parseFloat(c.LAT)),
            this.boundLon(parseFloat(c.LON)),
            this.boundLon(parseFloat(c.LON)),
            '<b>' + c.CITATION + '</b> v. ' + c.VERSION + '<br/>by ' + c.CONTRIBUTOR
          );
        }

      });

      this.map.fitBounds(this.bounds);
      this.map.setCenter(this.bounds.getCenter());
      let listener = google.maps.event.addListener(this.map, "idle", () => {
        if (this.map.getZoom() > 6) this.map.setZoom(6);
        google.maps.event.removeListener(listener);
      });

      this.setState({iDoc: this.state.iDoc+100});

    }

    if (GoogleMaps.maps[this.name])
      _.delay(() => google.maps.event.trigger(GoogleMaps.maps[this.name].instance,'resize'), 500);
  }

  addObject(south, north, west, east, info) {
    if (this.objects.length > 1000)
      return;
    const minDim = 0.2;
    if (north < south) { let s = south; south = north; north = s; }
    if (east  < west ) { let e = east;  east  = west;  west  = e; }
    if (south + minDim < north && west + minDim < east) {
      let rect = this.addRectangle({
        south: south,
        north: north,
        west: west,
        east: east
      }, info);
    } else {
      let point = this.addCircleMarker({
        lat: south,
        lng: west
      }, info);
    }
  }

  addCircleMarker(position, content) {
    let map = this.map;
    let infowindow = new google.maps.InfoWindow({
      content: content
    });
    let purpleCircle = {
      path: 'M 5, 5 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0',
      fillColor: '#800080',
      fillOpacity: 1,
      scale: 1,
      strokeColor: '#800080',
      strokeWeight: 1,
      strokeWidth: 1
    };
    let circle = new google.maps.Marker({
      position: position,
      icon: purpleCircle,
      map: map
    });
    circle.addListener('click', function() {
      infowindow.open(map, circle);
    });
    this.objects.push(circle);
    this.bounds.extend(position);
    return circle;
  }

  addRectangle(bounds, content) {
    let map = this.map;
    let infowindow = new google.maps.InfoWindow({
      content: content
    });
    let rect = new google.maps.Rectangle({
      strokeColor: '#800080',
      strokeOpacity: 1,
      strokeWeight: 1,
      fillColor: '#BBBBBB',
      fillOpacity: 0.35,
      map: map,
      bounds: bounds
    });
    rect.addListener('click', function() {
      infowindow.setPosition(rect.getBounds().getCenter());
      infowindow.open(map, rect);
    });
    this.objects.push(rect);
    this.bounds.extend(rect.getBounds().getNorthEast());
    this.bounds.extend(rect.getBounds().getSouthWest());
    return rect;
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