import {Meteor} from 'meteor/meteor';

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {Random} from 'meteor/random';

GoogleMaps.load({v: "3", key: "AIzaSyBLZOmrD0zBidUXezxmNRHcpPp5cA45pUQ"});

export default class GoogleMap extends React.Component {

  constructor(props) {
    super(props);
    this.drawIncrement = 1000;
    this.objects = [];
    this.state = {
      loaded: false,
      iDoc: 0, 
      error: ""
    };
    this.reset();
  }

  reset() {
    this.objects.forEach((m) => m.setMap(null));
    this.objects = [];
    this.bounds = new google.maps.LatLngBounds();
    console.log("GoogleMaps reset");
  }

  componentDidMount() {
    this.loadGoogleMap();
  }

  componentDidUpdate(lastProps, lastState) {
    console.log('GoogleMaps componentDidUpdate', _.isEqual(lastProps, this.props), lastProps.docs.length, this.props.docs.length, this.props.nDocs);
    if (this.state.iDoc >= this.props.docs.length &&
        _.isEqual(lastProps, this.props) && 
        _.isEqual(lastState, this.state)) 
      return;
    console.log('GoogleMaps componentDidUpdate', _.isEqual(lastProps, this.props), _.isEqual(lastState, this.state), lastProps, this.props, lastState, this.state);

    if (this.props.nDocs === null || this.props.nDocs === undefined && !_.isEqual(lastProps.docs, this.props.docs)) this.reset();
      
    this.loadGoogleMap();

    if (this.state.iDoc < this.props.docs.length) {

      this.setState((prevState, props) =>
        ({iDoc: Math.min(props.docs.length, prevState.iDoc + this.drawIncrement)})
      );

      console.log('GoogleMaps drawing', this.state.iDoc+1, 'to', this.state.iDoc + this.drawIncrement);

      _.forEach(this.props.docs.slice(this.state.iDoc, this.state.iDoc + this.drawIncrement), (c) => {

        let s = c.summary;

        try {
          _.uniqBy(s._all._geo_envelope, x => _.flatten(x.coordinates).join('_')).forEach((envelope, i) => {
            if (i == 0) this.addObject(
              envelope.coordinates[1][1],
              envelope.coordinates[0][1],
              envelope.coordinates[0][0],
              envelope.coordinates[1][0],
              s.contribution && '<a href="/MagIC/' + s.contribution.id + '"><b>' + (s.contribution._reference && s.contribution._reference.citation || "Unknown") + 
              '</b> v. ' + s.contribution.version + '</a>' + 
              '<br/>by ' + s.contribution._contributor
            );
          });
        } catch(error) {
          console.error(error);
        }

        try {
          _.uniqBy(s._all._geo_point, x => _.flatten(x.coordinates).join('_')).forEach((point, i) => {
            if (i == 0) this.addObject(
              point.coordinates[1],
              point.coordinates[1],
              point.coordinates[0],
              point.coordinates[0],
              s.contribution && '<a href="/MagIC/' + s.contribution.id + '"><b>' + (s.contribution._reference && s.contribution._reference.citation || "Unknown") + 
              '</b> v. ' + s.contribution.version + '</a>' + 
              '<br/>by ' + s.contribution._contributor
            );
          });
        } catch(error) {
          console.error(error);
        }

      });

      if (this.state.iDoc === 0) _.delay(() => {
        console.log("Google Maps recenter");
        this.map.fitBounds(this.bounds);
        this.map.setCenter(this.bounds.getCenter());
        let listener = google.maps.event.addListener(this.map, "idle", () => {
          console.log("Google Maps reset zoom?", this.map.getZoom());
          if (this.map.getZoom() > 6) this.map.setZoom(6);
          if (this.map.getZoom() < 2) this.map.setZoom(2);
          google.maps.event.removeListener(listener);
        });
      }, 500);

      if (GoogleMaps.maps[this.name])
        _.delay(() => google.maps.event.trigger(GoogleMaps.maps[this.name].instance,'resize'), 500);

    }

  }
  
  componentWillUnmount() {
    if (GoogleMaps.maps[this.name]) {
      google.maps.event.clearInstanceListeners(GoogleMaps.maps[this.name].instance);
      delete GoogleMaps.maps[this.name];
    }
  }

  loadGoogleMap() {
    let loaded = this.state.loaded;
    if (!loaded && GoogleMaps.loaded()) {
      loaded = true;
      this.name = Random.id();
      GoogleMaps.create({
        name: this.name,
        element: this.container,
        options: _.extend({mapTypeId: 'terrain'}, this.props.mapOptions)
      });
      this.map = GoogleMaps.maps[this.name].instance;

      console.log("GoogleMaps loading");
      if (this.props.onReady) this.props.onReady(this);
    }

    if (!loaded)
      this.setState({loaded: loaded, error: "Failed to load Google Map."});
    else
      this.setState({loaded: loaded});
  }

  addObject(south, north, west, east, info) {
    //if (this.objects.length > 1000)
    //  return;
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
      path: 'M 256,480c-84.828,0-153.6-68.157-153.6-152.228c0-84.081, 153.6-359.782, 153.6-359.782s 153.6,275.702, 153.6,359.782C 409.6,411.843, 340.828,480, 256,480z M 255.498,282.245c-26.184,0-47.401,21.043-47.401,46.981c0,25.958, 21.217,46.991, 47.401,46.991c 26.204,0, 47.421-21.033, 47.421-46.991 C 302.92,303.288, 281.702,282.245, 255.498,282.245z',
      fillColor: '#FFFFFF',
      fillOpacity: 1,
      strokeColor: '#800080',
      strokeWeight: 1,
      strokeWidth: 0.5,
      anchor: new google.maps.Point(255.498,-26.204),
      scale: .04,
      rotation: 180
    };
    let circle = new google.maps.Marker({
      position: position,
      icon: purpleCircle,
      map: map
    });
    circle.addListener('click', function() {
      infowindow.open(map, circle);
    });
    /*circle.addListener('mouseout', function() {
      infowindow.close();
    });*/
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
      fillColor: '#BBBBBB',
      fillOpacity: 0.35,
      strokeColor: '#800080',
      strokeOpacity: 1,
      strokeWeight: 1,
      strokeWidth: 0.5,
      map: map,
      bounds: bounds
    });
    rect.addListener('click', function() {
      infowindow.setPosition(rect.getBounds().getCenter());
      infowindow.open(map, rect);
    });
    /*rect.addListener('mouseout', function() {
      infowindow.close();
    });*/
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

  render() {
    let messageStyle = {marginTop:'.5em', padding:'.5em', position:'fixed', marginLeft:'-25%', width:'50%', zIndex:100};
    return (
      <div style={{textAlign:'center', width:'100%', height:'100%'}}>
        {this.props.nDocs === null && 
          <div className="ui compact small floating message" style={messageStyle}>
            <p>Loading ...</p>
          </div>
        }
        {(this.state.iDoc < this.props.docs.length || this.state.iDoc < this.props.nDocs) && 
          <div className="ui compact small floating message" style={messageStyle}>
            <p>Loading {this.state.iDoc+1} to {Math.min(this.props.nDocs, this.state.iDoc+this.drawIncrement)} of {this.props.nDocs}</p>
          </div>
        }
        {(this.props.nDocs === 0 || this.props.nDocs === undefined && this.props.docs.length === 0) &&
          <div className="ui compact small floating warning message" style={messageStyle}>
            <p><i className="ui warning sign inline icon"></i> No markers to display.</p>
          </div>
        }
        {!_.isEmpty(this.state.error) &&
          <div className="ui compact small floating error message" style={messageStyle}>
            <p><i className="ui warning sign inline icon"></i> {this.state.error}</p>
          </div>
        }
       {!_.isEmpty(this.props.error) &&
          <div className="ui compact small floating error message" style={messageStyle}>
            <p><i className="ui warning sign inline icon"></i> {this.props.error}</p>
          </div>
        }
       <div ref={c => (this.container = c)} style={_.extend({width: '100%', height: '100%'}, this.props.style)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

GoogleMap.propTypes = {
  docs:  PropTypes.array,
  nDocs:  PropTypes.number,
  style:  PropTypes.object,
  onReady:  PropTypes.func,
  mapOptions:  PropTypes.object,
  children: PropTypes.node
};