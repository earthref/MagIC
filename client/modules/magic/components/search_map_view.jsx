import _ from 'lodash';
import React from 'react';
import SearchMap from '../../common/containers/search_map';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  setOptions() {
    return {
    };
  }

  onReady(map) {

    return;

    map.props.docs.forEach((c) => {

      let paths = [];
      const minDim = 0.2;
      if (c.BEGIN_LATS !== undefined &&
        c.END_LATS   !== undefined && c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':').length == c.END_LATS  .replace(/(^:|:$)/g, '').split(':').length &&
        c.BEGIN_LONS !== undefined && c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':').length == c.BEGIN_LONS.replace(/(^:|:$)/g, '').split(':').length &&
        c.END_LONS   !== undefined && c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':').length == c.END_LONS  .replace(/(^:|:$)/g, '').split(':').length) {
        _.forEach(c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':'), ([], i) => {
          var south = this.boundLat(parseFloat(c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':')[i]) + minDim),
              north = this.boundLat(parseFloat(c.END_LATS  .replace(/(^:|:$)/g, '').split(':')[i]) - minDim),
              west  = this.boundLon(parseFloat(c.BEGIN_LONS.replace(/(^:|:$)/g, '').split(':')[i]) + minDim),
              east  = this.boundLon(parseFloat(c.END_LONS  .replace(/(^:|:$)/g, '').split(':')[i]) - minDim);
          if (north < south) [north, south] = [south, north];
          if (east  < west ) [east , west ] = [west , east ];
          paths.push({
            south: south,
            north: north,
            west:  west ,
            east:  east });
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

      let bounds = new google.maps.LatLngBounds();

      paths.forEach((path) => {
        let rect = new google.maps.Rectangle({
          strokeColor: '#800080',
          strokeOpacity: 1,
          strokeWeight: 1,
          fillColor: '#BBBBBB',
          fillOpacity: 0.35,
          map: GoogleMaps.maps[map.name].instance,
          bounds: path
        });
        bounds.extend(rect.getBounds().getNorthEast());
        bounds.extend(rect.getBounds().getSouthWest());
      });

      var listener = google.maps.event.addListener(GoogleMaps.maps[map.name].instance, "idle", function() {
        GoogleMaps.maps[map.name].instance.fitBounds(bounds);
        if (GoogleMaps.maps[map.name].instance.getZoom() > 4) GoogleMaps.maps[map.name].instance.setZoom(4);
        google.maps.event.removeListener(listener);
      });

    });

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
    return (
      <div style={_.extend({padding: '1em', backgroundColor: '#FFFFFF'}, this.props.style)}>
        <div style={{border: '1px solid #d4d4d5', position: 'relative', height: '100%'}}>
          <SearchMap
            onReady={this.onReady.bind(this)}
            mapOptions={this.setOptions}
            subscriptionName={this.props.subscriptionName}
            countSubscriptionName={this.props.countSubscriptionName}
            elasticsearchQuery={this.props.elasticsearchQuery}
            elasticsearchFilters={this.props.elasticsearchFilters}
            elasticsearchSort={this.props.elasticsearchSort}
            elasticsearchPageSize={500}
            minimongoSort={this.props.minimongoSort}
          />
        </div>
      </div>
    );
  }

}

