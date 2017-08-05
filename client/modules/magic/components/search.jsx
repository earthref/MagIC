import _ from 'lodash';
import React from 'react';
import Cookies from 'js-cookie';

import Count from '/client/modules/common/containers/search_count.jsx';
import FiltersList from '/client/modules/common/containers/search_filters_list.jsx';
import SearchLevel from '/client/modules/common/components/search_level.jsx';
import {portals} from '/lib/configs/portals.js';
import {versions, models} from '/lib/modules/magic/data_models.js';
import {levels} from '/lib/modules/magic/search_levels.js';

let model = models[_.last(versions)];
let sortedTables = _.sortBy(_.keys(models[_.last(versions)].tables), (table) => {
  return models[_.last(versions)].tables[table].position;
});

let filters = [
  //{type: 'bbox'     , name: ''                                                                                 , title: 'Geospatial Boundary'},
  //{type: 'histogram', name: 'magic.filters.contributions.reference_year', term: 'reference_year'               , title: 'Publication Year'   },
  //{type: 'string'   , name: 'magic.filters.contributions.external_db'   , term: 'summary.', title: 'External DB'        },
  {type: 'string'   , name: 'contribution._contributor.raw', title: 'Contributor'   , term: 'summary.contribution._contributor.raw', aggs: {buckets: {terms: {field: 'summary.contribution._contributor.raw', size: 1001}}}, maxBuckets: 1000},
  {type: 'string'   , name: '_all.location_type'           , title: 'Location Type' , term: 'summary._all.location_type.raw'       , aggs: {buckets: {terms: {field: 'summary._all.location_type.raw'       , size: 1001}}}, maxBuckets: 1000},
  {type: 'string'   , name: '_all.geologic_type'           , title: 'Geologic Type' , term: 'summary._all.geologic_types.raw'      , aggs: {buckets: {terms: {field: 'summary._all.geologic_types.raw'      , size: 1001}}}, maxBuckets: 1000},
  {type: 'string'   , name: '_all.geologic_class'          , title: 'Geologic Class', term: 'summary._all.geologic_classes.raw'    , aggs: {buckets: {terms: {field: 'summary._all.geologic_classes.raw'    , size: 1001}}}, maxBuckets: 1000},
  {type: 'string'   , name: '_all.lithology'               , title: 'Lithology'     , term: 'summary._all.lithologies.raw'         , aggs: {buckets: {terms: {field: 'summary._all.lithologies.raw'         , size: 1001}}}, maxBuckets: 1000},
  {type: 'string'   , name: '_all.method_codes'            , title: 'Method Code'   , term: 'summary._all.method_codes.raw'        , aggs: {buckets: {terms: {field: 'summary._all.method_codes.raw'        , size: 1001}}}, maxBuckets: 1000}
];
let filterNames = {};
//sortedTables.forEach((table) => {
//  let sortedColumns = _.sortBy(_.keys(model.tables[table].columns), (column) => {
//    return model.tables[table].columns[column].position;
//  });
//  sortedColumns.forEach((column) => {
//    let label = model.tables[table].columns[column].label;
//    let type = model.tables[table].columns[column].type;
//    if (filterNames['magic.filters.' + column] === undefined) {
//      if (type === 'String') {
//        filters.push({ type: 'string', name: 'magic.filters.' + column, term: 'summary._all.' + column + '.raw', title: label });
//      }
//      filterNames['magic.filters.' + column] = true;
//    }
//  });
//});

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: this.props.search || '', _search: this.props.search || '',
      levelNumber: 0,
      sort: 'summary.contribution.timestamp',
      sortDirection: -1,
      sortDefault: true,
      settingsVisible: true,
      activeFilters: {},
      height: undefined,
      width: undefined,
      lat_min: undefined, _lat_min: '',
      lat_max: undefined, _lat_max: '',
      lon_min: undefined, _lon_min: '',
      lon_max: undefined, _lon_max: '',
      age_min: undefined, _age_min: '',
      age_max: undefined, _age_max: '',
      age_unit: 'ka',
      int_min: undefined, _int_min: '',
      int_max: undefined, _int_max: '',
      int_unit: 'µT'
    };
    this.styles = {
      a: {cursor: 'pointer', color: '#792f91'},
      table: {width: '100%'},
      input: {borderColor: '#888888', borderLeft: 'none', borderRight: 'none'},
      td: {verticalAlign: 'top', overflow: 'hidden', transition: 'all 0.5s ease', position: 'relative'},
      segment: {padding: '0'},
      searchButton: {marginLeft: '-1px', display: 'none'},
      activeTab: {backgroundColor: '#F0F0F0'},
      countLabel: {color: '#0C0C0C', margin: '-1em -1em -1em 0.5em', minWidth: '4em'},
      searchInput: {padding: '1em', paddingBottom: 0},
      settings: {whiteSpace: 'nowrap', overflowY: 'scroll', border: 'none', flex: 1 },
      settingsHeader: {margin: '0'},
      filter: {margin: '1em 0 .5em'},
      filterHeader: {margin: '0'},
      filterBuckets: {paddingLeft: '0.5em', position: 'relative'},
      //scroller: {overflowY: 'scroll', background: 'white', padding: '1em', transition: 'all 0.5s ease', borderRadius: '0', boxShadow: 'none'}
    };
    this.handleSearch = _.throttle((value) => {
      this.setState({search: value});
    }, 1000);

    this.handleNumericInput = _.throttle((input, value) => {
      this.setState({[input]: (value === '' ? undefined : (isNaN(parseFloat(value)) ? null : parseFloat(value)))});
    }, 1000);
  }

  componentDidMount() {
    let self = this;
    $(this.refs['age_unit']).dropdown({ onChange: function (value, text) { self.setState({age_unit: text}); } });
    $(this.refs['int_unit']).dropdown({ onChange: function (value, text) { self.setState({int_unit: text}); } });
    window.addEventListener("resize", this.onWindowResize.bind(this));
    this.onWindowResize();
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
    const windowHeight = $(window).height() - 60; // to allow for the footer
    if (windowHeight !== this.windowHeight) {
      this.windowHeight = windowHeight;
      const height = windowHeight - $(this.refs['settings']).offset().top + 20;
      this.setState({height: height});
    }
    const windowWidth = $(window).width();
    if (windowWidth !== this.windowWidth) {
      this.windowWidth = windowWidth;
      const width = windowWidth - $(this.refs['settings']).outerWidth() - 2*$(this.refs['settings']).offset().left - 17;
      this.setState({width: width});
    }
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
           style={(this.getSortColumn() === 'summary.contribution.timestamp' ? _.merge({}, this.styles.a, {fontWeight: 'bold', color: 'black'}) : this.styles.a)}
           onClick={() => this.setState({
             sort: 'summary.contribution.timestamp',
             sortDirection: (this.state.sort === 'summary.contribution.timestamp' ? -1 * this.state.sortDirection : -1),
             sortDefault: false
           })}>
          <i className={'ui icon' +
          (this.getSortColumn() === 'summary.contribution.timestamp' ? ' arrow circle' +
          (this.getSortDirection() === 1 ? ' up' : ' down') : '')}/>
          <div className="content">Upload Date</div>
        </a>
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
    return (this.state.search !== '' ? {
      simple_query_string: {
        query: this.state.search,
        default_operator: 'and'
      }
    } : {});
  }

  getActiveFilters() {
    const activeFilters = _.reduce(filters, (activeFilters, filter) => {
      if (this.state.activeFilters[filter.name]) {
        activeFilters.push({ terms: { [filter.term]: this.state.activeFilters[filter.name] } });
      }
      return activeFilters;
    }, []);

    if (_.isNumber(this.state.lat_min) || _.isNumber(this.state.lat_max) ||
        _.isNumber(this.state.lon_min) || _.isNumber(this.state.lon_max)) {
      activeFilters.push({
        geo_shape: {
          'summary._all._geo_envelope': {
            shape: {
            type: 'envelope',
            coordinates : [[
              _.isNumber(this.state.lon_min) ? this.state.lon_min : -180,
              _.isNumber(this.state.lat_max) ? this.state.lat_max : 90
            ], [
              _.isNumber(this.state.lon_max) ? this.state.lon_max : 180,
              _.isNumber(this.state.lat_min) ? this.state.lat_min : -90
            ]]
          },
            relation: 'intersects'
          }
        }
      });
    }

    let age_mult =
      (this.state.age_unit === 'Ga' ? 1e9 :
        (this.state.age_unit === 'Ma' ? 1e6 :
          (this.state.age_unit === 'ka' ? 1e3 : 1)));
    if (_.isNumber(this.state.age_min) && _.isNumber(this.state.age_max))
      activeFilters.push({ range: { 'summary._all._age_range_ybp.range': { gte: this.state.age_min*age_mult, lte: this.state.age_max*age_mult }}});
    else if (_.isNumber(this.state.age_min))
      activeFilters.push({ range: { 'summary._all._age_range_ybp.range': { gte: this.state.age_min*age_mult }}});
    else if (_.isNumber(this.state.age_max))
      activeFilters.push({ range: { 'summary._all._age_range_ybp.range': { lte: this.state.age_max*age_mult }}});

    let int_mult =
      (this.state.int_unit === 'nT' ? 1e-9 :
        (this.state.int_unit === 'µT' ? 1e-6 :
          (this.state.int_unit === 'mT' ? 1e-3 : 1)));
    if (_.isNumber(this.state.int_min) && _.isNumber(this.state.int_max))
      activeFilters.push({ range: { 'summary._all.int_abs.range': { gte: this.state.int_min*int_mult, lte: this.state.int_max*int_mult }}});
    else if (_.isNumber(this.state.int_min))
      activeFilters.push({ range: { 'summary._all.int_abs.range': { gte: this.state.int_min*int_mult }}});
    else if (_.isNumber(this.state.int_max))
      activeFilters.push({ range: { 'summary._all.int_abs.range': { lte: this.state.int_max*int_mult }}});

    console.log('activeFilters', activeFilters);
    return activeFilters;
  }
  
  clearActiveFilters() {
    this.setState({
      activeFilters: [],
      lat_min: undefined, _lat_min: '',
      lat_max: undefined, _lat_max: '',
      lon_min: undefined, _lon_min: '',
      lon_max: undefined, _lon_max: '',
      age_min: undefined, _age_min: '',
      age_max: undefined, _age_max: '',
      age_unit: 'ka',
      int_min: undefined, _int_min: '',
      int_max: undefined, _int_max: '',
      int_unit: 'µT'
    });
  }

  render() {
    let searchQuery = this.getSearchQuery();
    let activeFilters = this.getActiveFilters();
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
                  es={_.extend({}, level.views[0].es, { query: searchQuery, filters: activeFilters })}
                />
              </div>
            </div>
          )}
          {Cookies.get('user_id') ?
            <div className="right menu">
              <div className="item" style={{paddingRight: 0}}>
                <a className={portals['MagIC'].color + ' ui compact button'} style={{paddingTop: '0.5em', paddingBottom: '0.5em'}} href="/MagIC/private">
                  Private Workspace
                </a>
              </div>
            </div> : undefined}
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
            <div className={'ui basic black button'} onClick={(e) => { this.setState({_search: ''}); this.handleSearch(''); }}>
              <i className="remove circle icon"/>
              Clear Search
            </div>
            <div className={portals['MagIC'].color + ' ui basic button'} style={this.styles.searchButton}>
              <i className="save icon"/>
              Save Search
            </div>
            <div className={portals['MagIC'].color + ' ui basic button'} style={this.styles.searchButton}>
              <i className="download icon"/>
              Download Results
            </div>
          </div>
          <div ref="results" style={{display: 'flex', marginTop: '1em', height: this.state.height || '100%', width: this.state.width || '100%'}}>
            <div>
              <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '275px'}}>
                <div ref="settings tab">
                  <div className="ui top attached tabular small menu" style={{paddingLeft: '1em'}}>
                    <div className="active item" style={this.styles.activeTab}>
                      Settings
                    </div>
                  </div>
                </div>
                <div ref="settings" className="ui small basic attached segment" style={this.styles.settings}>
                  <div>
                    <div className="ui small header" style={this.styles.settingsHeader}>
                      Sort by:
                    </div>
                    {this.renderSortSettings()}
                    <div className="ui divider"></div>
                    <div className="ui right floated small compact basic icon button" style={{padding:'0.5em', margin:'-0.25em 0'}}
                       onClick={(e) => this.clearActiveFilters()}
                    >
                      <i className="remove circle icon"/>
                      Clear
                    </div>
                    <div className="ui small header" style={this.styles.settingsHeader}>
                      Filter Contributions by:
                    </div>
                    <div style={this.styles.filter}>
                      <div className="ui right floated tiny compact icon button" style={{padding:'0.25em 0.5em', display:'none'}}>
                        <i className="caret right icon"/>
                      </div>
                      <div className="ui tiny header" style={this.styles.filterHeader}>
                        Geospatial Boundary
                      </div>
                      <div style={{display: 'flex', marginTop: '0.25em'}}>
                        <div className="ui label" style={{borderTopRightRadius:0, borderBottomRightRadius:0, margin:0, width:40}}>Lat.</div>
                        <div className={'ui small input' + (this.state.lat_min === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}}>
                          <input type="text" placeholder="-90"
                                 value={this.state._lat_min} style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.setState({_lat_min: e.target.value});
                                   this.handleNumericInput('lat_min', e.target.value);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderRadius:0, margin:0}}>to</div>
                        <div className={'ui small input' + (this.state.lat_max === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}} >
                          <input type="text" placeholder="90"
                                 value={this.state._lat_max} style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.setState({_lat_max: e.target.value});
                                   this.handleNumericInput('lat_max', e.target.value);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderTopLeftRadius:0, borderBottomLeftRadius:0, margin:0}}>
                          deg.
                        </div>
                      </div>
                      <div style={{display: 'flex', marginTop: '0.25em'}}>
                        <div className="ui label" style={{borderTopRightRadius:0, borderBottomRightRadius:0, margin:0, width:40}}>Lon.</div>
                        <div className={'ui small input' + (this.state.lon_min === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}}>
                          <input type="text" placeholder="-90"
                                 value={this.state._lon_min} style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.setState({_lon_min: e.target.value});
                                   this.handleNumericInput('lon_min', e.target.value);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderRadius:0, margin:0}}>to</div>
                        <div className={'ui small input' + (this.state.lon_max === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}} >
                          <input type="text" placeholder="90"
                                 value={this.state._lon_max} style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.setState({_lon_max: e.target.value});
                                   this.handleNumericInput('lon_max', e.target.value);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderTopLeftRadius:0, borderBottomLeftRadius:0, margin:0}}>
                          deg.
                        </div>
                      </div>
                    </div>

                    <div style={this.styles.filter}>
                      <div className="ui right floated tiny compact icon button" style={{padding:'0.25em 0.5em', display:'none'}}>
                        <i className="caret right icon"/>
                      </div>
                      <div className="ui tiny header" style={this.styles.filterHeader}>
                        Age Range
                      </div>
                      <div style={{display: 'flex', marginTop: '0.25em'}}>
                        <div className={'ui small input' + (this.state.age_min === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}}>
                          <input type="text" placeholder="Today"
                                 value={this.state._age_min} style={{borderTopRightRadius:0, borderBottomRightRadius:0}}
                                 onChange={(e) => {
                                   this.setState({_age_min: e.target.value});
                                   this.handleNumericInput('age_min', e.target.value);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderRadius:0, margin:0}}>to</div>
                        <div className={'ui small input' + (this.state.age_max === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}} >
                          <input type="text" placeholder="Infinity"
                                 value={this.state._age_max} style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.setState({_age_max: e.target.value});
                                   this.handleNumericInput('age_max', e.target.value);
                                 }}
                          />
                        </div>
                        <div ref="age_unit" className="ui dropdown label" style={{borderTopLeftRadius:0, borderBottomLeftRadius:0, margin:0}}>
                          <div className="text">{this.state.age_unit}</div>
                          <i className="dropdown icon"></i>
                          <div className="menu">
                            <div className="item">YBP</div>
                            <div className="item">ka</div>
                            <div className="item">Ma</div>
                            <div className="item">Ga</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={this.styles.filter}>
                      <div className="ui right floated tiny compact icon button" style={{padding:'0.25em 0.5em', display:'none'}}>
                        <i className="caret right icon"/>
                      </div>
                      <div className="ui tiny header" style={this.styles.filterHeader}>
                        Absolute Intensity Range
                      </div>
                      <div style={{display: 'flex', marginTop: '0.25em'}}>
                        <div className={'ui small input' + (this.state.int_min === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}}>
                          <input type="text" placeholder="-Infinity"
                                 value={this.state._int_min} style={{borderTopRightRadius:0, borderBottomRightRadius:0}}
                                 onChange={(e) => {
                                   this.setState({_int_min: e.target.value});
                                   this.handleNumericInput('int_min', e.target.value);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderRadius:0, margin:0}}>to</div>
                        <div className={'ui small input' + (this.state.int_max === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}} >
                          <input type="text" placeholder="Infinity"
                                 value={this.state._int_max} style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.setState({_int_max: e.target.value});
                                   this.handleNumericInput('int_max', e.target.value);
                                 }}
                          />
                        </div>
                        <div ref="int_unit" className="ui dropdown label" style={{borderTopLeftRadius:0, borderBottomLeftRadius:0, margin:0}}>
                          <div className="text">{this.state.int_unit}</div>
                          <i className="dropdown icon"></i>
                          <div className="menu">
                            <div className="item">nT</div>
                            <div className="item">µT</div>
                            <div className="item">mT</div>
                            <div className="item">T</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      {filters.map((filter, i) =>
                        <div key={i}>
                          <FiltersList
                            name={filter.name}
                            title={filter.title}
                            maxBuckets={filter.maxBuckets}
                            es={{
                              type: 'contribution',
                              query:   searchQuery,
                              filters: activeFilters,
                              aggs:    filter.aggs
                            }}
                            activeFilters={this.state.activeFilters[filter.name]}
                            onChange={(filters) => {
                              let activeFilters = this.state.activeFilters;
                              if (filters && filters.length && filters.length > 0)
                                activeFilters[filter.name] = filters;
                              else
                                delete activeFilters[filter.name];
                              this.setState({activeFilters});
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{flex: 1}}>
              <SearchLevel
                height={this.state.height}
                width={this.state.width}
                views={levels[this.state.levelNumber].views}
                es={{
                  query:   searchQuery,
                  filters: activeFilters,
                  sort:    [{[this.getSortColumn()]: (this.getSortDirection() == 1 ? 'asc' : 'desc')}]
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Search;

