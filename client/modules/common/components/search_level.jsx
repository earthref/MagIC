import _ from 'lodash';
import React from 'react';

import Count from '/client/modules/common/containers/search_count';
import SearchSummariesView from '/client/modules/magic/components/search_summaries_view';
import SearchRowsView from '/client/modules/magic/containers/search_rows_view';
import SearchMapView from '/client/modules/magic/components/search_map_view';
import SearchImagesView from '/client/modules/magic/components/search_images_view';
import {portals} from '/lib/configs/portals.js';

export default class extends React.Component {

  constructor(props) {
    super(props);
    let initialView = props.view || (props.views && props.views.length && props.views[0].name);
    this.state = {
      settingsVisible: (props.settingsVisible !== undefined ? props.settingsVisible : true),
      view: initialView
    };
    this.styles = {
      a: {cursor: 'pointer', color: '#792f91'},
      td: {verticalAlign: 'top', overflow: 'hidden', transition: 'all 0.5s ease', position: 'relative'},
      countLabel: {color: '#0C0C0C', margin: '-1em -1em -1em 0.5em', minWidth: '4em'},
    }
  }

  renderTabs() {
    let activeView = _.find(this.props.views, { name: this.state.view }) || this.props.views[0];
    return (
      <div ref="tabs" className="ui top attached tabular small menu search-tab-menu">
        {this.props.views.map((view) =>
          <div key={view.name}
               className={(activeView.name === view.name ? 'active ' : '') + 'item'}
               onClick={() => this.setState({view: view.name})}
               style={(activeView.name !== view.name ? this.styles.a : {})}
          >
            {view.name}
            <div className="ui circular small basic label" style={this.styles.countLabel}>
              <Count
                es={_.extend({}, view.es, this.props.es)}
              />
            </div>
          </div>
        )}
        <div className="right aligned item" style={{paddingRight: '1em', display: 'none'}}>
          <a className={portals['MagIC'].color + ' ui compact button'} style={{paddingTop: '0.5em', paddingBottom: '0.5em'}}>
            <i className="ui plus icon"/>
            Custom View
          </a>
        </div>
      </div>
    );
  }

  renderView() {
    let viewStyle = {
      borderLeft: '1px solid #d4d4d5',
      height: (this.props.height ? this.props.height - $(this.refs['tabs']).outerHeight() : '100%'),
      width: (this.props.width ? this.props.width : '100%')
    };
    let view = _.find(this.props.views, { name: this.state.view }) || this.props.views[0];
    if (view.name === 'Summaries') return (
      <SearchSummariesView
        key={view.name}
        style={viewStyle}
        es={_.extend({}, view.es, this.props.es)}
      />
    );
    if (view.name === 'Rows') return (
      <SearchRowsView
        key={view.name}
        style={viewStyle}
        es={_.extend({}, view.es, this.props.es)}
        table={view.es.type === 'experiments' ? 'measurements' : view.es.type}
        pageSize={20}
      />
    );
    if (view.name === 'Map') return (
      <SearchMapView
        key={view.name}
        style={viewStyle}
        es={_.extend({}, view.es, this.props.es)}
      />
    );
    if (view.name === 'Images' || view.name === 'Plots') return (
      <SearchImagesView
        key={view.name}
        style={viewStyle}
        es={_.extend({}, view.es, this.props.es)}
      />
    );
  }

  render() {
    return (
      <div style={{width: '100%', height: '100%'}}>
        {this.renderTabs()}
        <div style={{width: '100%', height: '100%'}}>
          {this.renderView()}
        </div>
      </div>
    );
  }

}

