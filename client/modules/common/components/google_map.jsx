import React, { PropTypes } from 'react';
import { Random } from 'meteor/random';

GoogleMaps.load({v: '3', key: 'AIzaSyBLZOmrD0zBidUXezxmNRHcpPp5cA45pUQ'});

export default class GoogleMap extends React.Component {

  constructor(props) {
    super(props);
    this.loaded = false;
  }

  componentDidUpdate() {
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

    if (GoogleMaps.maps[this.name])
      _.delay(() => google.maps.event.trigger(GoogleMaps.maps[this.name].instance,'resize'), 500);
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