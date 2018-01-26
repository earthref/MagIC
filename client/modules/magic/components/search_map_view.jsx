import _ from 'lodash';
import React from 'react';
import SearchMap from '/client/modules/common/containers/search_map';

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
            elasticsearchPageSize={2000}
            minimongoSort={this.props.minimongoSort}
          />
        </div>
      </div>
    );
  }

}

