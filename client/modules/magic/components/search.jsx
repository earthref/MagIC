import _ from 'lodash';
import React from 'react';
import Count from '../../common/containers/search_count';
import FiltersList from '../../common/containers/search_filters_list';
import SearchLevel from '../../common/components/search_level';
import {portals} from '../../common/configs/portals';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      _search: '',
      levelNumber: 0,
      sort: 'activated',
      sortDirection: -1,
      sortDefault: true,
      settingsVisible: true,
      filters: {}
    };
    this.styles = {
      a: {cursor: 'pointer', color: '#792f91'},
      table: {width: '100%'},
      input: {borderColor: '#888888'},
      td: {verticalAlign: 'top', overflow: 'hidden', transition: 'all 0.5s ease', position: 'relative'},
      segment: {padding: '0'},
      downloadButton: {marginLeft: '-1px'},
      activeTab: {backgroundColor: '#F0F0F0'},
      countLabel: {color: '#0C0C0C', margin: '-1em -1em -1em 0.5em', minWidth: '4em'},
      searchInput: {padding: '1em', paddingBottom: 0},
      hideSettings: {paddingLeft: '1em'},
      //showSettings: {overflow: 'hidden', transition: 'all 0.5s ease'},
      hideSettingsIcon: {paddingLeft: '0.5em', paddingRight: '0.5em'},
      settings: {whiteSpace: 'nowrap', overflowY: 'scroll', border: 'none', flex: 1 },
      settingsHeader: {margin: 0},
      filterBuckets: {paddingLeft: '0.5em', position: 'relative'},
      //scroller: {overflowY: 'scroll', background: 'white', padding: '1em', transition: 'all 0.5s ease', borderRadius: '0', boxShadow: 'none'}
    };
    this.handleSearch = _.throttle((value) => {
      this.setState({search: value});
    }, 1000);
  }

  componentDidMount() {
    window.addEventListener("resize", this.onWindowResize.bind(this));
    this.onWindowResize();
    this.showSettings();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize.bind(this));
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.view !== this.state.view) {
      _.delay(() => $(window).trigger('resize'), 500);
    }
  }

  componentDidUpdate() {
    this.onWindowResize();
  }

  onWindowResize() {
    const windowHeight = $(window).height() - (this.props.bottomOffset || 0);
    if (windowHeight !== this.windowHeight) {
      this.windowHeight = windowHeight;
      $(this.refs['results']).height(windowHeight - $(this.refs['settings']).offset().top + 20);
    }
  }

  showSettings() {
    //$(this.refs['show settings']).hide();
    //$(this.refs['hide settings']).show();
    //$(this.refs['settings']).show();
    //$(this.refs['results']).addClass('settings-visible');
  }

  hideSettings() {
    //$(this.refs['show settings']).show();
    //$(this.refs['hide settings']).hide();
    //$(this.refs['settings']).hide();
    //$(this.refs['results']).removeClass('settings-visible');
  }

  renderSortSettings() {
    return (
      <div className="ui link list">
        <a className="item"
           style={(this.getSortColumn() === '_score' ? _.merge({}, this.styles.a, {fontWeight: 'bold', color: 'black'}) : this.styles.a)}
           onClick={() => this.setState({
             sort: '_score',
             sortDirection: -1,
             sortDefault: false
           })}>
          <i className={'ui icon' +
          (this.getSortColumn() === '_score' ? ' arrow circle down' : '')}/>
          <div className="content">Relevance</div>
        </a>
        <a className="item"
           style={(this.getSortColumn() === 'activated' ? _.merge({}, this.styles.a, {fontWeight: 'bold', color: 'black'}) : this.styles.a)}
           onClick={() => this.setState({
             sort: 'activated',
             sortDirection: (this.state.sort === 'activated' ? -1 * this.state.sortDirection : -1),
             sortDefault: false
           })}>
          <i className={'ui icon' +
          (this.getSortColumn() === 'activated' ? ' arrow circle' +
          (this.getSortDirection() === 1 ? ' up' : ' down') : '')}/>
          <div className="content">Upload Date</div>
        </a>
        <a className="item"
           style={(this.getSortColumn() === 'max_ages' ? _.merge({}, this.styles.a, {fontWeight: 'bold', color: 'black'}) : this.styles.a)}
           onClick={() => this.setState({
             sort: 'max_ages',
             sortDirection: (this.state.sort === 'max_ages' ? -1 * this.state.sortDirection : -1),
             sortDefault: false
           })}>
          <i className={'ui icon' +
            (this.getSortColumn() === 'max_ages' ? ' arrow circle' +
            (this.getSortDirection() === 1 ? ' up' : ' down') : '')}/>
          <div className="content">Age</div>
        </a>
      </div>
    );
  }

  renderFilterSettings() {
    const filters = [
      //{type: 'bbox'     , name: '', title: 'Geospatial Boundary'},
      //{type: 'histogram', name: 'magic.filters.contributions.reference_year', term: 'reference_year', title: 'Publication Year'},
      {type: 'string'   , name: 'magic.filters.contributions.contributor'   , term: 'contributor'               , title: 'Contributor'     },
      {type: 'string'   , name: 'magic.filters.contributions.external_db'   , term: 'external_database_ids.name', title: 'External DB'     },
      {type: 'string'   , name: 'magic.filters.contributions.location_type' , term: 'location_type'             , title: 'Location Type'   },
      {type: 'string'   , name: 'magic.filters.contributions.geologic_type' , term: 'geologic_types'            , title: 'Geologic Type'   },
      {type: 'string'   , name: 'magic.filters.contributions.geologic_class', term: 'geologic_classes'          , title: 'Geologic Class'  },
      {type: 'string'   , name: 'magic.filters.contributions.lithology'     , term: 'lithologies'               , title: 'Lithology'       }
    ];
    return (
      <div>
        {filters.map((filter, i) =>
          <div key={i}>
            <FiltersList
              name={filter.name}
              title={filter.title}
              elasticsearchQuery={this.getSearchQuery()}
              activeFilters={this.state.filters[filter.term]}
              onChange={(filters) => {
                let allFilters = this.state.filters;
                allFilters[filter.term] = filters;
                this.setState({filters: allFilters});
              }}
            />
          </div>
        )}
      </div>
    );
  }

  getSortColumn() {
    return (this.state.sortDefault && this.state.search !== '' ? '_score' : this.state.sort);
  }

  getSortDirection() {
    return (this.state.sortDefault && this.state.search !== '' ? -1 : this.state.sortDirection);
  }

  getSearchQuery() {
    return (this.state.search != '' ? {
      simple_query_string: {
        query: this.state.search,
        default_operator: 'and'
      }
    } : {});
  }

  getFilters() {
    const filters = _.reduce(_.keys(this.state.filters).sort(), (filters, term) => {
      filters.push(..._.map(this.state.filters[term], (key) => { return {term: {[term]: key}}}));
      return filters;
    }, []);
    console.log('new filters', filters[0]);
    return filters;
  }

  render() {
    const levels = [
      { name: 'Contributions' },
      { name: 'Locations'     },
      { name: 'Sites'         },
      { name: 'Samples'       },
      { name: 'Specimens'     },
      { name: 'Measurements'  }
    ];
    levels[0].views = [
      {name: 'Summaries', type: 'list'   , subscriptionName: 'magic.pages.contributions.summaries', countSubscriptionName: 'magic.count.contributions.summaries'},
      {name: 'Poles'    , type: 'list',    subscriptionName: 'magic.pages.contributions.poles'    , countSubscriptionName: 'magic.count.contributions.poles'    },
      {name: 'Ages'     , type: 'list',    subscriptionName: 'magic.pages.contributions.ages'     , countSubscriptionName: 'magic.sum.contributions.ages'       },
      {name: 'PMag'     , type: 'list'   , subscriptionName: 'magic.pages.contributions.summaries', countSubscriptionName: 'magic.count.contributions.summaries'},
      {name: 'RMag'     , type: 'list'   , subscriptionName: 'magic.pages.contributions.summaries', countSubscriptionName: 'magic.count.contributions.summaries'},
      {name: 'Plots'    , type: 'plots'  , subscriptionName: 'magic.pages.contributions.plots'    , countSubscriptionName: 'magic.sum.contributions.plots'      },
      {name: 'Map'      , type: 'map'    , subscriptionName: 'magic.pages.contributions.map'      , countSubscriptionName: 'magic.count.contributions.map'      },
      //{name: 'Images'   , type: 'gallery', subscriptionName: 'magic.sum.contributions.images'     , countSubscriptionName: 'magic.sum.contributions.images'     },
    ];
    levels[1].views = [
      {name: 'Summaries', type: 'list'   , subscriptionName: 'magic.pages.locations.summaries'    , countSubscriptionName: 'magic.count.locations.summaries'},
      {name: 'Poles'    , type: 'list',    subscriptionName: 'magic.pages.contributions.poles'    , countSubscriptionName: 'magic.count.contributions.poles'    },
      {name: 'Ages'     , type: 'list',    subscriptionName: 'magic.pages.locations.ages'         , countSubscriptionName: 'magic.sum.locations.ages'       },
      {name: 'PMag'     , type: 'list'   , subscriptionName: 'magic.pages.contributions.summaries', countSubscriptionName: 'magic.count.contributions.summaries'},
      {name: 'RMag'     , type: 'list'   , subscriptionName: 'magic.pages.contributions.summaries', countSubscriptionName: 'magic.count.contributions.summaries'},
      {name: 'Plots'    , type: 'plots'  , subscriptionName: 'magic.pages.locations.plots'        , countSubscriptionName: 'magic.sum.locations.plots'      },
      //{name: 'Images'   , type: 'gallery', subscriptionName: 'magic.sum.contributions.images'     , countSubscriptionName: 'magic.sum.contributions.images'     },
      {name: 'Map'      , type: 'map'    , subscriptionName: 'magic.pages.locations.map'          , countSubscriptionName: 'magic.count.locations.map'      }
    ];
    levels[2].views = [
      {name: 'Summaries', type: 'list'   , subscriptionName: 'magic.pages.sites.summaries'        , countSubscriptionName: 'magic.sum.sites.summaries'}
    ];
    levels[3].views = [
      {name: 'Summaries', type: 'list'   , subscriptionName: 'magic.pages.locations.summaries'    , countSubscriptionName: 'magic.sum.samples.summaries'}
    ];
    levels[4].views = [
      {name: 'Summaries', type: 'list'   , subscriptionName: 'magic.pages.locations.summaries'    , countSubscriptionName: 'magic.sum.specimens.summaries'}
    ];
    levels[5].views = [
      {name: 'Summaries', type: 'list'   , subscriptionName: 'magic.pages.locations.summaries'    , countSubscriptionName: 'magic.sum.measurements.summaries'}
    ];

    return (
      <div className="magic-search">
        <div className="ui top attached tabular menu level-tabs">
          {levels.map((level, i) =>
            <div key={i} className={(this.state.levelNumber === i ? 'active ' : '') + 'item'}
                 style={(this.state.levelNumber === i ? this.styles.activeTab : this.styles.a)}
                 onClick={() => this.setState({levelNumber: i})}>
              {level.name}
              <div className="ui circular small basic label" style={this.styles.countLabel}>
                <Count
                  subscriptionName={level.views[0].countSubscriptionName}
                  elasticsearchQuery={this.getSearchQuery()}
                  elasticsearchFilters={this.getFilters()}
                />
              </div>
            </div>
          )}
          <div className="right menu">
            <div className="item" style={{paddingRight: 0}}>
              <div className={portals['MagIC'].color + ' ui compact button'} style={{paddingTop: '0.5em', paddingBottom: '0.5em'}}>
                <i className="plus icon"/>
                Upload Data
              </div>
            </div>
          </div>
        </div>
        <div className="ui bottom attached secondary segment" style={this.styles.segment}>
          <div className="ui labeled fluid action input" style={this.styles.searchInput}>
            <div className={portals['MagIC'].color + ' ui label'}>
              <i className="search icon"/>
              Search MagIC
            </div>
            <input
              className="prompt"
              type="text"
              placeholder={'e.g. metamorphic "field intensity" -precambrian'}
              value={this.state._search}
              style={this.styles.input}
              onChange={(e) => { this.setState({_search: e.target.value}); this.handleSearch(e.target.value); }}
            />
            <div className={portals['MagIC'].color + ' ui basic icon button'}>
              <i className="save icon"/>
              Save Search
            </div>
            <div className={portals['MagIC'].color + ' ui basic icon button'} style={this.styles.downloadButton}>
              <i className="download icon"/>
              Download Results
            </div>
          </div>
          <div ref="results" style={{width: '100%', display: 'flex', paddingTop: '1em'}}>
            <div>
              <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <div ref="settings tab">
                  <div className="ui top attached tabular small menu"
                     style={_.merge({}, this.styles.a, this.styles.hideSettings)}
                     onClick={() => this.setState({settingsVisible: false})}>
                    <div className="active item" style={this.styles.activeTab}>
                      Settings
                    </div>
                    <div className="right menu">
                      <div className="item" style={this.styles.hideSettingsIcon}>
                        <i className="ui chevron circle left black icon"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div ref="settings" className="ui small basic attached segment" style={this.styles.settings}>
                  <div>
                    <h5 className="ui header" style={this.styles.settingsHeader}>
                      Sort By
                    </h5>
                    {this.renderSortSettings()}
                    <div className="ui divider"></div>
                    <h5 className="ui header" style={this.styles.settingsHeader}>
                      Filter By
                    </h5>
                    {this.renderFilterSettings()}
                  </div>
                </div>
              </div>
            </div>
            <div style={{flex: 1}}>
              <SearchLevel
                views={levels[this.state.levelNumber].views}
                elasticsearchQuery={this.getSearchQuery()}
                elasticsearchFilters={this.getFilters()}
                elasticsearchSort={[{[this.getSortColumn()]: (this.getSortDirection() == 1 ? 'asc' : 'desc')}]}
                minimongoSort={{[this.getSortColumn()]: this.getSortDirection()}}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }



}

