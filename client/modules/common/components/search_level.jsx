import _ from 'lodash';
import React from 'react';
import Count from '../containers/search_count';
import SearchSummariesView from '../../magic/components/search_summaries_view';
import SearchMapView from '../../magic/components/search_map_view';
import SearchPlotsView from '../../magic/components/search_plots_view';
import {portals} from '../../common/configs/portals';

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
      showSettings: {overflow: 'hidden', transition: 'all 0.5s ease'},
      td: {verticalAlign: 'top', overflow: 'hidden', transition: 'all 0.5s ease', position: 'relative'},
      countLabel: {color: '#0C0C0C', margin: '-1em -1em -1em 0.5em', minWidth: '4em'},
    }
  }

  renderTabs() {
    return (
      <div className="ui top attached tabular small menu search-tab-menu">
        <div style={_.merge({}, this.styles.showSettings, {maxWidth: (this.state.settingsVisible ? '0px' : '125px')})}>
          <a className="item" onClick={() => this.setState({settingsVisible: true})}>
            <i className="ui chevron circle right black icon"/>
            Settings
          </a>
        </div>
        {this.props.views.map((view) =>
          <div key={view.name}
               className={(this.state.view === view.name ? 'active ' : '') + 'item'}
               onClick={() => this.setState({view: view.name})}
               style={(this.state.view !== view.name ? this.styles.a : {})}
          >
            {view.name}
            {view.countSubscriptionName !== undefined ?
              <div className="ui circular small basic label" style={this.styles.countLabel}>
                <Count
                  subscriptionName={view.countSubscriptionName}
                  elasticsearchQuery={this.props.elasticsearchQuery}
                  elasticsearchFilters={this.props.elasticsearchFilters}
                />
              </div>
              : undefined}
          </div>
        )}
        <div className="item">
          <a className={portals['MagIC'].color + ' ui compact button'} style={{paddingTop: '0.5em', paddingBottom: '0.5em'}}>
            <i className="ui plus icon"/>
            Custom View
          </a>
        </div>
        <div className="right menu">
          <div className="item" style={{paddingRight: '1em'}}>
            <div className="ui dropdown icon button" style={{paddingTop: '0.5em', paddingBottom: '0.5em'}}>
              <input type="hidden" name="sort"/>
              <div className="default text">Upload Date</div>
              <i className="ui dropdown icon"/>
              <div className="menu">
                <div className="item" data-value="1">Ascending</div>
                <div className="item" data-value="0">Descending</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
        <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
          {this.renderTabs()}
          <div style={{flex: 1, display: 'flex'}}>
            {this.props.views.map((view) => {
              if (view.type === 'list' && this.state.view === view.name)
                return <SearchSummariesView
                  key={view.name}
                  style={{flex: 1}}
                  subscriptionName={view.subscriptionName}
                  countSubscriptionName={view.countSubscriptionName}
                  elasticsearchQuery={this.props.elasticsearchQuery}
                  elasticsearchFilters={this.props.elasticsearchFilters}
                  elasticsearchSort={this.props.elasticsearchSort}
                  minimongoSort={this.props.minimongoSort}
                />;
              if (view.type === 'map' && this.state.view === view.name)
                return <SearchMapView
                  key={view.name}
                  style={{flex: 1}}
                  subscriptionName={view.subscriptionName}
                  countSubscriptionName={view.countSubscriptionName}
                  elasticsearchQuery={this.props.elasticsearchQuery}
                  elasticsearchFilters={this.props.elasticsearchFilters}
                  elasticsearchSort={this.props.elasticsearchSort}
                  minimongoSort={this.props.minimongoSort}
                />;
              if (view.type === 'plots' && this.state.view === view.name)
                return <SearchPlotsView
                  key={view.name}
                  style={{flex: 1}}
                  subscriptionName={view.subscriptionName}
                  countSubscriptionName={view.countSubscriptionName}
                  elasticsearchQuery={this.props.elasticsearchQuery}
                  elasticsearchFilters={this.props.elasticsearchFilters}
                  elasticsearchSort={this.props.elasticsearchSort}
                  minimongoSort={this.props.minimongoSort}
                />;
            })}
        </div>
      </div>
    );
  }

}

