import _ from 'lodash';
import React from 'react';
import SearchMap from '/client/modules/common/containers/search_map';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div style={_.extend({padding: '1em', backgroundColor: '#FFFFFF'}, this.props.style)}>
        <div style={{border: '1px solid #d4d4d5', position: 'relative', height: '100%'}}>
          <SearchMap
            es={this.props.es}
          />
        </div>
      </div>
    );
  }

}