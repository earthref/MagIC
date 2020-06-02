import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';

import Count from '/client/modules/common/containers/search_count';
import SearchFiltersBuckets from '/client/modules/common/containers/search_filters_buckets';
import SearchSummariesView from '/client/modules/magic/components/search_summaries_view';
import SearchRowsView from '/client/modules/magic/containers/search_rows_view';
import SearchMapView from '/client/modules/magic/components/search_map_view';
import SearchImagesView from '/client/modules/magic/components/search_images_view';
import SearchDownload from '/client/modules/magic/components/search_download';
import SearchJSONLD from '/client/modules/magic/containers/search_jsonld';
import {portals} from '/lib/configs/portals.js';
import {versions, models} from '/lib/configs/magic/data_models.js';
import {levels, index} from '/lib/configs/magic/search_levels.js';

const model = models[_.last(versions)];
const sortedTables = _.sortBy(_.keys(models[_.last(versions)].tables), (table) => {
  return models[_.last(versions)].tables[table].position;
});

let filters = [
  {type: 'string'   , name: 'summary.contribution._reference.authors._name', title: 'Author'                  , term: 'summary.contribution._reference.authors._name.raw', aggs: {buckets: {terms: {field: 'summary.contribution._reference.authors._name.raw', size: 1001}}}, maxBuckets: 1000},
  {type: 'string'   , name: 'summary._all.external_database_ids'           , title: 'External Database'       , term: 'summary._all.external_database_ids.key.raw'       , aggs: {buckets: {terms: {field: 'summary._all.external_database_ids.key.raw'       , size: 1001}}}, maxBuckets: 1000},
  {type: 'string'   , name: 'summary.contribution._contributor'            , title: 'Contributor'             , term: 'summary.contribution._contributor.raw'            , aggs: {buckets: {terms: {field: 'summary.contribution._contributor.raw'            , size: 1001}}}, maxBuckets: 1000},
  {type: 'string'   , name: 'summary._all.location_type'                   , title: 'Location Type'           , term: 'summary._all.location_type.raw'                   , aggs: {buckets: {terms: {field: 'summary._all.location_type.raw'                   , size: 1001}}}, maxBuckets: 1000},
  {type: 'string'   , name: 'summary._all.geologic_type'                   , title: 'Geologic Type'           , term: 'summary._all.geologic_types.raw'                  , aggs: {buckets: {terms: {field: 'summary._all.geologic_types.raw'                  , size: 1001}}}, maxBuckets: 1000},
  {type: 'string'   , name: 'summary._all.geologic_class'                  , title: 'Geologic Class'          , term: 'summary._all.geologic_classes.raw'                , aggs: {buckets: {terms: {field: 'summary._all.geologic_classes.raw'                , size: 1001}}}, maxBuckets: 1000},
  {type: 'string'   , name: 'summary._all.lithology'                       , title: 'Lithology'               , term: 'summary._all.lithologies.raw'                     , aggs: {buckets: {terms: {field: 'summary._all.lithologies.raw'                     , size: 1001}}}, maxBuckets: 1000},
  {type: 'string'   , name: 'summary._all.method_codes'                    , title: 'Method Code'             , term: 'summary._all.method_codes.raw'                    , aggs: {buckets: {terms: {field: 'summary._all.method_codes.raw'                    , size: 1001}}}, maxBuckets: 1000},
  //{type: 'string'   , name: 'summary._all.scientists'                      , title: 'Research Scientist Name' , term: 'summary._all.scientists.raw'                      , aggs: {buckets: {terms: {field: 'summary._all.scientists.raw'                      , size: 1001}}}, maxBuckets: 1000},
  //{type: 'string'   , name: 'summary._all.analysts'                        , title: 'Analyst Name'            , term: 'summary._all.analysts.raw'                        , aggs: {buckets: {terms: {field: 'summary._all.analysts.raw'                        , size: 1001}}}, maxBuckets: 1000},
  {type: 'string'   , name: 'summary._all.software_packages'               , title: 'Software Package'        , term: 'summary._all.software_packages.raw'               , aggs: {buckets: {terms: {field: 'summary._all.software_packages.raw'               , size: 1001}}}, maxBuckets: 1000},
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

const searchTerms = {
  "id":          { field: 'summary.contribution._history.id', processor: x => x },
  "private_key": { field: 'summary.contribution._private_key', processor: x => x },
  "doi":         { field: 'summary.contribution._reference.doi.raw', processor: x => _.toUpper(_.trim(x)) },
  "orcid":       { field: 'summary.contribution._reference.authors._orcid.raw', processor: x => x },
};
/*const searchMatches = {
  "author":      'summary.contribution._reference.authors.family',
};*/
const searchSortOption = { name: 'Most Relevant First', sort: [{'_score': 'desc'}] };
const sortOptions = [
  { name: 'Recently Contributed First'  , sort: [{'summary.contribution.timestamp': 'desc'}] },
  { name: 'Recently Contributed Last'   , sort: [{'summary.contribution.timestamp': 'asc'}] },
  { name: 'Recently Published First'    , sort: [{'summary.contribution._reference.year': 'desc'}] },
  { name: 'Recently Published Last'     , sort: [{'summary.contribution._reference.year': 'asc'}]  },
  { name: 'Most Cited Publication First', sort: [{'summary.contribution._reference.n_citations': 'desc'}] },
  { name: 'Citations A-z'               , sort: [{'summary.contribution._reference.citation.raw': 'asc'}] },
  { name: 'Citations z-A'               , sort: [{'summary.contribution._reference.citation.raw': 'desc'}] },
//  { name: 'Youngest Age First'          , sort: [{'summary._all._age_range_ybp': 'asc'}] },
//  { name: 'Oldest Age First'            , sort: [{'summary._all._age_range_ybp': 'desc'}] },
];
const intUnits = [
  {name: 'nT', from: (x) => x/1e9, min: 0, max: Infinity},
  {name: 'µT', from: (x) => x/1e6, min: 0, max: Infinity},
  {name: 'mT', from: (x) => x/1e3, min: 0, max: Infinity},
  {name: 'T' , from: (x) => x    , min: 0, max: Infinity},
];
const intUnitsDefault = 'µT';
const ageUnits = [
  {name: 'AD', from: (x) => -x+1950, min: 1, max: new Date().getFullYear()},
  {name: 'BC', from: (x) =>  x+1949, min: 1, max: Infinity},
  {name: 'ka', from: (x) =>  x*1e3 , min: 0, max: Infinity},
  {name: 'Ma', from: (x) =>  x*1e6 , min: 0, max: Infinity},
  {name: 'Ga', from: (x) =>  x*1e9 , min: 0, max: Infinity},
];
const ageUnitsDefault = 'Ma';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: this.props.search || '',
      searchInput: this.props.search || '',
      levelNumber: 0,
      view: '',
      sort: 'Recently Contributed First',
      sortDefault: true,
      activeFilters: {},
      openedFilters: {},
      height: undefined,
      width: undefined,
      lat_min: undefined,
      lat_max: undefined,
      lon_min: undefined,
      lon_max: undefined,
      pole_lat_min: undefined,
      pole_lat_max: undefined,
      pole_lon_min: undefined,
      pole_lon_max: undefined,
      vgp_lat_min: undefined,
      vgp_lat_max: undefined,
      vgp_lon_min: undefined,
      vgp_lon_max: undefined,
      age_min: undefined,
      age_min_unit: undefined,
      age_max: undefined,
      age_max_unit: undefined,
      int_min: undefined,
      int_max: undefined,
      int_unit: undefined,
      pub_yr_min: undefined,
      pub_yr_max: undefined,
    };
    this.styles = {
      a: {cursor: 'pointer', color: '#792f91'},
      table: {width: '100%'},
      input: {borderColor: '#888888', borderLeft: 'none', borderRight: 'none', flex: '1'},
      td: {verticalAlign: 'top', overflow: 'hidden', transition: 'all 0.5s ease', position: 'relative'},
      segment: {padding: '0'},
      searchButton: {marginLeft: '-1px'},
      activeTab: {backgroundColor: '#F0F0F0'},
      countLabel: {color: '#0C0C0C', margin: '-1em -1em -1em 0.5em', minWidth: '4em'},
      searchInput: {padding: '1em', paddingBottom: 0, flex: 1},
      filters: {whiteSpace: 'nowrap', overflowY: 'scroll', border: 'none', flex: 1 },
      filter: {margin: '1em 0 .5em'},
      filterHeader: {margin: '0'},
      filterBuckets: {paddingLeft: '0.5em', position: 'relative'}
    };
    this.updateSearchInput = _.debounce((value) => {
      this.setState({searchInput: value});
    }, 500);

    this.handleNumericInput = _.debounce((input, value, min, max) => {
      console.log(input, value, min, max);
      let parsedValue = parseFloat(value);
      console.log(input, value, min, max, parsedValue);
      if (value === '')
        this.setState({[input]: undefined});
      else if (!isNaN(parsedValue) && parsedValue >= min && parsedValue <= max)
        this.setState({[input]: parsedValue});
      else
        this.setState({[input]: null});
    }, 500);
  }

  componentDidMount() {
    let self = this;
    $(this.refs['sort']).dropdown({ onChange: function (value, text) { self.setState({sort: text, sortDefault: false}); } });
    $(this.refs['age_min_unit']).dropdown({ onChange: function (value, text) { self.setState({age_min_unit: text}); } });
    $(this.refs['age_max_unit']).dropdown({ onChange: function (value, text) { self.setState({age_max_unit: text}); } });
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
    try {
      const windowHeight = $(window).height() - 60; // to allow for the footer
      if (windowHeight !== this.windowHeight) {
        this.windowHeight = windowHeight;
        const height = windowHeight - $(this.refs['filters']).offset().top + 20;
        this.setState({height: height});
      }
      const windowWidth = $(window).width();
      if (windowWidth !== this.windowWidth) {
        this.windowWidth = windowWidth;
        const width = windowWidth - $(this.refs['filters']).outerWidth() - 2 * $(this.refs['filters']).offset().left - 10;
        this.setState({width: width});
      }
    } catch(e) {}
  }

  getSearchQueries() {
    let queries = [];
    let search = this.state.search.replace(/(\w+):\"(.+?)\"\s*/g, (match, term, value) => {
      queries.push(
        searchTerms[term] ? {
          terms: {
          [searchTerms[term].field]: value.split(/\s*\|\|\s*/).map(x => searchTerms[term].processor(x))
          }
        } : {
          wildcard: {
            ['summary._all.' + term + '.raw']: value
          }
        }
      );
      return '';
    });
    if (_.trim(search) !== '') {
      queries.push({
        simple_query_string: {
          query: search,
          default_operator: 'and'
        }
      });
    }
    console.log('queries', queries);
    return queries;
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
      let lon_min = -180;
      if (_.isNumber(this.state.lon_min)) {
        lon_min = this.state.lon_min;
        while(lon_min < -180) lon_min += 360;
        while(lon_min >  180) lon_min -= 360;
      }
      let lon_max = 180;
      if (_.isNumber(this.state.lon_max)) {
        lon_max = this.state.lon_max;
        while(lon_max < -180) lon_max += 360;
        while(lon_max >  180) lon_max -= 360;
      }
      if (lon_min > lon_max) {
        let lon_temp = lon_min;
        lon_min = lon_max;
        lon_max = lon_temp;
      }
      activeFilters.push({
        geo_shape: {
          'summary._all._geo_envelope': {
            shape: {
            type: 'envelope',
            coordinates : [[lon_min, _.isNumber(this.state.lat_max) ? this.state.lat_max :  90],
                           [lon_max, _.isNumber(this.state.lat_min) ? this.state.lat_min : -90]]
          },
            relation: 'intersects'
          }
        }
      });
    }

    if (_.isNumber(this.state.pole_lat_min) || _.isNumber(this.state.pole_lat_max) ||
        _.isNumber(this.state.pole_lon_min) || _.isNumber(this.state.pole_lon_max)) {
      let pole_lon_min = -180;
      if (_.isNumber(this.state.pole_lon_min)) {
        lon_min = this.state.pole_lon_min;
        while(pole_lon_min < -180) pole_lon_min += 360;
        while(pole_lon_min >  180) pole_lon_min -= 360;
      }
      let pole_lon_max = 180;
      if (_.isNumber(this.state.pole_lon_max)) {
        lon_max = this.state.pole_lon_max;
        while(pole_lon_max < -180) pole_lon_max += 360;
        while(pole_lon_max >  180) pole_lon_max -= 360;
      }
      if (pole_lon_min > pole_lon_max) {
        let pole_lon_temp = pole_lon_min;
        pole_lon_min = pole_lon_max;
        pole_lon_max = pole_lon_temp;
      }
      activeFilters.push({ range: { 'summary._all.pole_lat.range': {
        gte: this.state.pole_lat_min,
        lte: this.state.pole_lat_max
      }}});
      activeFilters.push({ range: { 'summary._all.pole_lon.range': {
        gte: pole_lon_min,
        lte: pole_lon_max
      }}});
    }

    if (_.isNumber(this.state.vgp_lat_min) || _.isNumber(this.state.vgp_lat_max) ||
        _.isNumber(this.state.vgp_lon_min) || _.isNumber(this.state.vgp_lon_max)) {
      let vgp_lon_min = -180;
      if (_.isNumber(this.state.vgp_lon_min)) {
        lon_min = this.state.vgp_lon_min;
        while(vgp_lon_min < -180) vgp_lon_min += 360;
        while(vgp_lon_min >  180) vgp_lon_min -= 360;
      }
      let vgp_lon_max = 180;
      if (_.isNumber(this.state.vgp_lon_max)) {
        vgp_lon_max = this.state.vgp_lon_max;
        while(vgp_lon_max < -180) vgp_lon_max += 360;
        while(vgp_lon_max >  180) vgp_lon_max -= 360;
      }
      if (vgp_lon_min > vgp_lon_max) {
        let vgp_lon_temp = vgp_lon_min;
        vgp_lon_min = vgp_lon_max;
        vgp_lon_max = vgp_lon_temp;
      }
      activeFilters.push({ range: { 'summary._all.vgp_lat.range': {
        gte: this.state.vgp_lat_min,
        lte: this.state.vgp_lat_max
      }}});
      activeFilters.push({ range: { 'summary._all.vgp_lon.range': {
        gte: vgp_lon_min,
        lte: vgp_lon_max
      }}});
    }

    if (_.isNumber(this.state.age_min) && _.isNumber(this.state.age_max))
      activeFilters.push({ range: { 'summary._all._age_range_ybp.range': {
        gte: _.find(ageUnits, {name: this.state.age_min_unit || ageUnitsDefault}).from(this.state.age_min),
        lte: _.find(ageUnits, {name: this.state.age_max_unit || ageUnitsDefault}).from(this.state.age_max)
      }}});
    else if (_.isNumber(this.state.age_min))
      activeFilters.push({ range: { 'summary._all._age_range_ybp.range': {
        gte: _.find(ageUnits, {name: this.state.age_min_unit || ageUnitsDefault}).from(this.state.age_min)
      }}});
    else if (_.isNumber(this.state.age_max))
      activeFilters.push({ range: { 'summary._all._age_range_ybp.range': {
        lte: _.find(ageUnits, {name: this.state.age_max_unit || ageUnitsDefault}).from(this.state.age_max)
      }}});

    if (_.isNumber(this.state.int_min) && _.isNumber(this.state.int_max))
      activeFilters.push({ range: { 'summary._all.int_abs.range': {
        gte: _.find(intUnits, {name: this.state.int_unit || intUnitsDefault}).from(this.state.int_min),
        lte: _.find(intUnits, {name: this.state.int_unit || intUnitsDefault}).from(this.state.int_max)
      }}});
    else if (_.isNumber(this.state.int_min))
      activeFilters.push({ range: { 'summary._all.int_abs.range': {
        gte: _.find(intUnits, {name: this.state.int_unit || intUnitsDefault}).from(this.state.int_min)
      }}});
    else if (_.isNumber(this.state.int_max))
      activeFilters.push({ range: { 'summary._all.int_abs.range': {
        lte: _.find(intUnits, {name: this.state.int_unit || intUnitsDefault}).from(this.state.int_max)
      }}});

    if (_.isNumber(this.state.pub_yr_min) && _.isNumber(this.state.pub_yr_max))
      activeFilters.push({ range: { 'summary.contribution._reference.year': {
        gte: this.state.pub_yr_min,
        lte: this.state.pub_yr_max
      }}});
    else if (_.isNumber(this.state.pub_yr_min))
      activeFilters.push({ range: { 'summary.contribution._reference.year': {
        gte: this.state.pub_yr_min
      }}});
    else if (_.isNumber(this.state.pub_yr_max))
      activeFilters.push({ range: { 'summary.contribution._reference.year': {
        lte: this.state.pub_yr_max
      }}});

    console.log('activeFilters', activeFilters);
    return activeFilters;
  }

  clearActiveFilters() {
    $(this.refs.filters).find('input').val('');
    this.setState({
      activeFilters: {},
      lat_min: undefined,
      lat_max: undefined,
      lon_min: undefined,
      lon_max: undefined,
      age_min: undefined,
      age_min_unit: undefined,
      age_max: undefined,
      age_max_unit: undefined,
      int_min: undefined,
      int_max: undefined,
      int_unit: undefined
    });
  }

  render() {
    let searchQueries = this.getSearchQueries();
    let activeFilters = this.getActiveFilters();
    return (
      <div className="magic-search">
        {this.renderJSONLD(searchQueries)}
        <div className="ui top attached tabular menu level-tabs">
          {levels.map((level, i) =>
            <div key={i} className={(this.state.levelNumber === i ? 'active ' : '') + 'item'}
                 style={(this.state.levelNumber === i ? this.styles.activeTab : this.styles.a)}
                 onClick={() => this.setState({levelNumber: i})}>
              {level.name}
              <div className="ui circular small basic label" style={this.styles.countLabel}>
                <Count
                  es={_.extend({}, level.views[0].es, { queries: searchQueries, filters: activeFilters })}
                />
              </div>
            </div>
          )}
          {Cookies.get('user_id', Meteor.isDevelopment ? {} : { domain: '.earthref.org'}) ?
            <div className="right menu">
              <div className="item" style={{paddingRight: 0}}>
                <Link className={portals['MagIC'].color + ' ui compact button'} style={{paddingTop: '0.5em', paddingBottom: '0.5em'}} to="/MagIC/private">
                  Private Workspace
                </Link>
              </div>
            </div> : undefined}
        </div>
        <div className="ui bottom attached secondary segment" style={this.styles.segment}>
          <div style={{display: 'flex', width: '100%'}}>
            <div className="ui labeled fluid action input" style={this.styles.searchInput}>
              <div className={portals['MagIC'].color + ' ui label'}>
                <i className="search icon"/>
                Search MagIC
              </div>
              <input
                ref="search"
                className="prompt"
                type="text"
                defaultValue={this.props.search || ''}
                placeholder={'e.g. metamorphic "field intensity" -precambrian'}
                style={this.styles.input}
                onChange={(e) => this.updateSearchInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && this.setState({search: e.target.value})}
              />
              <div className={'ui basic black button' + (this.state.searchInput === this.state.search ? ' disabled' : '')}
                   onClick={(e) => this.setState({search: this.state.searchInput})}
              >
                <i className="search icon"/>
                Search
              </div>
              <div className={'ui basic black button' + (_.isEmpty(this.state.search + this.state.searchInput) ? ' disabled' : '')}
                   style={this.styles.searchButton}
                   onClick={(e) => { this.refs['search'].value = ''; this.setState({search: "", searchInput: ""}); }}
              >
                <i className="remove circle icon"/>
                Clear
              </div>
            </div>
            <SearchDownload className={portals['MagIC'].color + ' ui basic button'} style={{margin: '1em 1em 0 0'}}
                 queries={searchQueries} filters={activeFilters}>
              <i className="download icon"/>
              Download Results
            </SearchDownload>
          </div>
          <div ref="results" style={{display: 'flex', marginTop: '1em', height: this.state.height || '100%', width: this.state.width || '100%'}}>
            <div>
              <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '275px'}}>
                <div>
                  <div className="ui top attached tabular small menu" style={{paddingLeft: '1em'}}>
                    <div className="active item" style={this.styles.activeTab}>
                      Filters
                    </div>
                    <div className="right aligned item" style={{padding:'0 1em'}}>
                      <div className={'ui small compact button' + (activeFilters.length > 0 ? ' ' + portals['MagIC'].color : ' basic disabled')} style={{padding:'0.5em'}}
                           onClick={(e) => this.clearActiveFilters()}
                      >
                        <i className="remove circle icon"/>
                        Clear Filters
                      </div>
                    </div>
                  </div>
                </div>
                <div ref="filters" className="ui small basic attached segment" style={this.styles.filters}>
                  <div style={{marginTop: '-1em'}}>

                    <div style={this.styles.filter}>
                      <div className="ui right floated tiny compact icon button" style={{padding:'0.25em 0.5em', display:'none'}}>
                        <i className="caret right icon"/>
                      </div>
                      <div className="ui tiny header" style={this.styles.filterHeader}>
                        Publication Year
                      </div>
                      <div className="ui mini labeled input" style={{display: 'flex', marginTop: '0.25em'}}>
                        <div className={'ui input' + (this.state.pub_yr_min === null ? ' error' : '')}
                            style={{flexShrink: '1', minWidth:20}}>
                          <input type="text" placeholder={"-Infinity"}
                                style={{borderTopRightRadius:0, borderBottomRightRadius:0}}
                                onChange={(e) => {
                                  this.handleNumericInput('pub_yr_min', e.target.value, -Infinity, _.isNumber(this.state.pub_yr_max) ? this.state.pub_yr_max: moment().year());
                                }}
                          />
                        </div>
                        <div className="ui label" style={{borderRadius:0, margin:0}}>to</div>
                        <div className={'ui input' + (this.state.pub_yr_max === null ? ' error' : '')}
                            style={{flexShrink: '1', minWidth:20}} >
                          <input type="text" placeholder={moment().year()}
                                style={{borderTopLeftRadius:0, borderBottomLeftRadius:0}}
                                onChange={(e) => {
                                  this.handleNumericInput('pub_yr_max', e.target.value, _.isNumber(this.state.pub_yr_min) ? this.state.pub_yr_min: -Infinity, moment().year());
                                }}
                          />
                        </div>
                      </div>
                    </div>

                    <div style={this.styles.filter}>
                      <div className="ui right floated tiny compact icon button" style={{padding:'0.25em 0.5em', display:'none'}}>
                        <i className="caret right icon"/>
                      </div>
                      
                      <div className="ui tiny header" style={this.styles.filterHeader}>
                        Geospatial Boundary
                      </div>
                      <div className="ui mini labeled input" style={{display: 'flex', marginTop: '0.25em'}}>
                        <div className="ui label" style={{borderTopRightRadius:0, borderBottomRightRadius:0, margin:0, width:40}}>Lat</div>
                        <div className={'ui input' + (this.state.lat_min === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}}>
                          <input type="text" placeholder="-90"
                                 style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.handleNumericInput('lat_min', e.target.value, -90, _.isNumber(this.state.lat_max) ? this.state.lat_max: 90);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderRadius:0, margin:0}}>to</div>
                        <div className={'ui input' + (this.state.lat_max === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}} >
                          <input type="text" placeholder="90"
                                 style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.handleNumericInput('lat_max', e.target.value, _.isNumber(this.state.lat_min) ? this.state.lat_min: -90, 90);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderTopLeftRadius:0, borderBottomLeftRadius:0, margin:0}}>
                          deg
                        </div>
                      </div>
                      <div className="ui mini labeled input" style={{display: 'flex', marginTop: '0.25em'}}>
                        <div className="ui label" style={{borderTopRightRadius:0, borderBottomRightRadius:0, margin:0, width:40}}>Lon</div>
                        <div className={'ui input' + (this.state.lon_min === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}}>
                          <input type="text" placeholder="-360"
                                 style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.handleNumericInput('lon_min', e.target.value, -360, 360);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderRadius:0, margin:0}}>to</div>
                        <div className={'ui input' + (this.state.lon_max === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}} >
                          <input type="text" placeholder="360"
                                 style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.handleNumericInput('lon_max', e.target.value, -360, 360);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderTopLeftRadius:0, borderBottomLeftRadius:0, margin:0}}>
                          deg
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
                      <div className="ui mini labeled input" style={{display: 'flex', marginTop: '0.25em'}}>
                        <div className={'ui input' + (this.state.age_min === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}}>
                          <input type="text" placeholder={_.find(ageUnits, {name: this.state.age_min_unit || ageUnitsDefault}).min}
                                 style={{borderTopRightRadius:0, borderBottomRightRadius:0}}
                                 onChange={(e) => {
                                   this.handleNumericInput('age_min', e.target.value,
                                     _.isNumber(this.state.age_min_unit === 'AD' && this.state.age_max) ? this.state.age_max : 0,
                                     _.isNumber(this.state.age_min_unit !== 'AD' && this.state.age_max) ? this.state.age_max: Infinity);
                                 }}
                          />
                        </div>
                        <div ref="age_min_unit" className="ui dropdown label" style={{borderRadius:0, margin:0}}>
                          <div className="text">{this.state.age_min_unit || ageUnitsDefault}</div>
                          <i className="dropdown icon"/>
                          <div className="menu">
                            {ageUnits.map((unit, i) =>
                              <div key={i} className={
                                ((this.state.age_min_unit || ageUnitsDefault) === unit.name ? 'active ' : '') + 'item'
                              }>
                                {unit.name}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="ui label" style={{borderRadius:0, margin:0, borderLeft:'1px solid #dddede'}}>to</div>
                        <div className={'ui input' + (this.state.age_max === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}} >
                          <input type="text" placeholder={_.find(ageUnits, {name: this.state.age_max_unit || ageUnitsDefault}).max}
                                 style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.handleNumericInput('age_max', e.target.value,
                                     _.isNumber(this.state.age_max_unit !== 'AD' && this.state.age_min) ? this.state.age_min: 0,
                                     _.isNumber(this.state.age_max_unit === 'AD' && this.state.age_min) ? this.state.age_min : Infinity);
                                 }}
                          />
                        </div>
                        <div ref="age_max_unit" className="ui dropdown label" style={{borderTopLeftRadius:0, borderBottomLeftRadius:0, margin:0}}>
                          <div className="text">{this.state.age_max_unit || ageUnitsDefault}</div>
                          <i className="dropdown icon"/>
                          <div className="menu">
                            {ageUnits.map((unit, i) =>
                              <div key={i} className={
                                ((this.state.age_min_unit || ageUnitsDefault) === unit.name ? 'active ' : '') + 'item'
                              }>
                                {unit.name}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={this.styles.filter}>
                      <div className="ui right floated tiny compact icon button" style={{padding:'0.25em 0.5em', display:'none'}}>
                        <i className="caret right icon"/>
                      </div>
                      
                      <div className="ui tiny header" style={this.styles.filterHeader}>
                        Paleomagnetic Poles Region
                      </div>
                      <div className="ui mini labeled input" style={{display: 'flex', marginTop: '0.25em'}}>
                        <div className="ui label" style={{borderTopRightRadius:0, borderBottomRightRadius:0, margin:0, width:40}}>Lat</div>
                        <div className={'ui input' + (this.state.lat_min === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}}>
                          <input type="text" placeholder="-90"
                                 style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.handleNumericInput('pole_lat_min', e.target.value, -90, _.isNumber(this.state.pole_lat_max) ? this.state.pole_lat_max : 90);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderRadius:0, margin:0}}>to</div>
                        <div className={'ui input' + (this.state.lat_max === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}} >
                          <input type="text" placeholder="90"
                                 style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.handleNumericInput('pole_lat_max', e.target.value, _.isNumber(this.state.pole_lat_min) ? this.state.pole_lat_min : -90, 90);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderTopLeftRadius:0, borderBottomLeftRadius:0, margin:0}}>
                          deg
                        </div>
                      </div>
                      <div className="ui mini labeled input" style={{display: 'flex', marginTop: '0.25em'}}>
                        <div className="ui label" style={{borderTopRightRadius:0, borderBottomRightRadius:0, margin:0, width:40}}>Lon</div>
                        <div className={'ui input' + (this.state.lon_min === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}}>
                          <input type="text" placeholder="-360"
                                 style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.handleNumericInput('pole_lon_min', e.target.value, -360, _.isNumber(this.state.pole_lon_max) ? this.state.pole_lon_max : 360);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderRadius:0, margin:0}}>to</div>
                        <div className={'ui input' + (this.state.lon_max === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}} >
                          <input type="text" placeholder="360"
                                 style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.handleNumericInput('pole_lon_max', e.target.value, _.isNumber(this.state.pole_lon_min) ? this.state.pole_lon_min : -360, 360);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderTopLeftRadius:0, borderBottomLeftRadius:0, margin:0}}>
                          deg
                        </div>
                      </div>
                    </div>

                    <div style={this.styles.filter}>
                      <div className="ui right floated tiny compact icon button" style={{padding:'0.25em 0.5em', display:'none'}}>
                        <i className="caret right icon"/>
                      </div>
                      
                      <div className="ui tiny header" style={this.styles.filterHeader}>
                        Virtual Geomagnetic Poles Region
                      </div>
                      <div className="ui mini labeled input" style={{display: 'flex', marginTop: '0.25em'}}>
                        <div className="ui label" style={{borderTopRightRadius:0, borderBottomRightRadius:0, margin:0, width:40}}>Lat</div>
                        <div className={'ui input' + (this.state.lat_min === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}}>
                          <input type="text" placeholder="-90"
                                 style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.handleNumericInput('vgp_lat_min', e.target.value, -90, _.isNumber(this.state.vgp_lat_max) ? this.state.vgp_lat_max : 90);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderRadius:0, margin:0}}>to</div>
                        <div className={'ui input' + (this.state.lat_max === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}} >
                          <input type="text" placeholder="90"
                                 style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.handleNumericInput('vgp_lat_max', e.target.value, _.isNumber(this.state.vgp_lat_min) ? this.state.vgp_lat_min : -90, 90);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderTopLeftRadius:0, borderBottomLeftRadius:0, margin:0}}>
                          deg
                        </div>
                      </div>
                      <div className="ui mini labeled input" style={{display: 'flex', marginTop: '0.25em'}}>
                        <div className="ui label" style={{borderTopRightRadius:0, borderBottomRightRadius:0, margin:0, width:40}}>Lon</div>
                        <div className={'ui input' + (this.state.lon_min === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}}>
                          <input type="text" placeholder="-360"
                                 style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.handleNumericInput('vgp_lon_min', e.target.value, -360, _.isNumber(this.state.vgp_lon_max) ? this.state.vgp_lon_max : 360);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderRadius:0, margin:0}}>to</div>
                        <div className={'ui input' + (this.state.lon_max === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}} >
                          <input type="text" placeholder="360"
                                 style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.handleNumericInput('vgp_lon_max', e.target.value, _.isNumber(this.state.vgp_lon_min) ? this.state.vgp_lon_min : -360, 360);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderTopLeftRadius:0, borderBottomLeftRadius:0, margin:0}}>
                          deg
                        </div>
                      </div>
                    </div>

                    <div style={this.styles.filter}>
                      <div className="ui right floated tiny compact icon button" style={{padding:'0.25em 0.5em', display:'none'}}>
                        <i className="caret right icon"/>
                      </div>
                      <div className="ui tiny header" style={this.styles.filterHeader}>
                        Absolute Paleointensity Range
                      </div>
                      <div className="ui mini labeled input" style={{display: 'flex', marginTop: '0.25em'}}>
                        <div className={'ui input' + (this.state.int_min === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}}>
                          <input type="text" placeholder={_.find(intUnits, {name: this.state.int_unit || intUnitsDefault}).min}
                                 style={{borderTopRightRadius:0, borderBottomRightRadius:0}}
                                 onChange={(e) => {
                                   this.handleNumericInput('int_min', e.target.value, 0, _.isNumber(this.state.int_max) ? this.state.int_max: Infinity);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderRadius:0, margin:0}}>to</div>
                        <div className={'ui input' + (this.state.int_max === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}} >
                          <input type="text" placeholder={_.find(intUnits, {name: this.state.int_unit || intUnitsDefault}).max}
                                 style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.handleNumericInput('int_max', e.target.value, _.isNumber(this.state.int_min) ? this.state.int_min: 0, Infinity);
                                 }}
                          />
                        </div>
                        <div ref="int_unit" className="ui dropdown label" style={{borderTopLeftRadius:0, borderBottomLeftRadius:0, margin:0}}>
                          <div className="text">{this.state.int_unit || intUnitsDefault}</div>
                          <i className="dropdown icon"/>
                          <div className="menu">
                            {intUnits.map((unit, i) =>
                              <div key={i} className={
                                ((this.state.int_unit || intUnitsDefault) === unit.name ? 'active ' : '') + 'item'
                              }>
                                {unit.name}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    { false &&
                    <div style={this.styles.filter}>
                      <div className="ui right floated tiny compact icon button" style={{padding:'0.25em 0.5em', display:'none'}}>
                        <i className="caret right icon"/>
                      </div>
                      <div className="ui tiny header" style={this.styles.filterHeader}>
                        Declination Range
                      </div>
                      <div className="ui mini labeled input" style={{display: 'flex', marginTop: '0.25em'}}>
                        <div className={'ui input' + (this.state.int_min === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}}>
                          <input type="text" placeholder={_.find(intUnits, {name: this.state.int_unit || intUnitsDefault}).min}
                                 style={{borderTopRightRadius:0, borderBottomRightRadius:0}}
                                 onChange={(e) => {
                                   this.handleNumericInput('dec_min', e.target.value, 0, _.isNumber(this.state.dec_max) ? this.state.int_max : 360);
                                 }}
                          />
                        </div>
                        <div className="ui label" style={{borderRadius:0, margin:0}}>to</div>
                        <div className={'ui input' + (this.state.int_max === null ? ' error' : '')}
                             style={{flexShrink: '1', minWidth:20}} >
                          <input type="text" placeholder={_.find(intUnits, {name: this.state.int_unit || intUnitsDefault}).max}
                                 style={{borderRadius:0}}
                                 onChange={(e) => {
                                   this.handleNumericInput('dec_max', e.target.value, _.isNumber(this.state.dec_min) ? this.state.dec_min : 0, 360);
                                 }}
                          />
                        </div>
                      </div>
                    </div> }
                    <div>
                      {filters.map((filter, i) =>
                        <div key={i}>
                          <SearchFiltersBuckets
                            name={filter.name}
                            title={filter.title}
                            maxBuckets={filter.maxBuckets}
                            es={this.state.openedFilters[filter.name] && {
                              index: index,
                              type: 'contribution',
                              queries: searchQueries,
                              aggs: filter.aggs
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
                            onClick={() => {
                              console.log('clicked');
                              let openedFilters = this.state.openedFilters;
                              openedFilters[filter.name] = true;
                              this.setState({openedFilters});
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
              <div style={{width: '100%', height: '100%'}}>
                {this.renderTabs(searchQueries, activeFilters)}
                <div style={{width: '100%', height: '100%'}}>
                  {this.renderView(searchQueries, activeFilters)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderTabs(searchQueries, activeFilters) {
    let activeView =
      _.find(levels[this.state.levelNumber].views, { name: this.state.view }) ||
      levels[this.state.levelNumber].views[0];
    return (
      <div ref="tabs" className="ui top attached tabular small menu search-tab-menu">
        {levels[this.state.levelNumber].views.map((view) =>
          <div key={view.name}
               className={(activeView.name === view.name ? 'active ' : '') + 'item'}
               onClick={() => this.setState({view: view.name})}
               style={(activeView.name !== view.name ? this.styles.a : {})}
          >
            {view.name}
            <div className="ui circular small basic label" style={this.styles.countLabel}>
              <Count es={_.extend({}, view.es, {
                queries: view.name === 'Map' ? _.concat(searchQueries, {exists: 
                  {field: this.state.levelNumber < 2 ? "summary._all._geo_envelope" : "summary._all._geo_point"}
                }) : searchQueries,
                filters: activeFilters
              })}/>
            </div>
          </div>
        )}
        <div className="right aligned item" style={{padding: '0 1em', display: 'none'}}>
          <a className={portals['MagIC'].color + ' ui compact button'} style={{padding: '0.5em'}}>
            <i className="ui plus icon"/>
            Custom View
          </a>
        </div>
        <div className="right aligned item" style={{padding: '0 1em'}}>
          <div ref="sort" className={portals['MagIC'].color + ' ui dropdown label'} style={{padding: '0.5em'}}>
            <div className="text">{this.state.sort}</div>
            <i className="dropdown icon"/>
            <div className="menu">
              {searchQueries.length > 0 &&
                <div className={(searchQueries.length > 0 && this.state.sortDefault || this.state.sort === searchSortOption.name ? 'active ' : '') + 'item'}>
                  {searchSortOption.name}
                </div>
              }
              {searchQueries.length > 0 &&
                <div className="divider"/>
              }
              {sortOptions.map(option =>
                <div key={option.name} className={(!(searchQueries.length > 0 && this.state.sortDefault) && this.state.sort === option.name ? 'active ' : '') + 'item'}>
                  {option.name}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderView(searchQueries, activeFilters) {
    let viewStyle = {
      borderLeft: '1px solid #d4d4d5',
      height: (this.state.height ? this.state.height - $(this.refs['tabs']).outerHeight() : '100%'),
      width: (this.state.height ? this.state.width : '100%')
    };
    let activeView =
      _.find(levels[this.state.levelNumber].views, { name: this.state.view }) ||
      levels[this.state.levelNumber].views[0];
    let es = _.extend({}, activeView.es, {
      queries: searchQueries,
      filters: activeFilters,
      sort:    searchQueries.length > 0 && this.state.sortDefault ? searchSortOption.sort : _.find(sortOptions, {name: this.state.sort}).sort
    });
    if (activeView.name === 'Summaries') return (
      <SearchSummariesView
        key={this.state.levelNumber + '_' + activeView.name}
        style={viewStyle}
        es={es}
        pageSize={5}
      />
    );
    if (activeView.name === 'Rows') return (
      <SearchRowsView
        key={this.state.levelNumber + '_' + activeView.name}
        style={viewStyle}
        es={es}
        table={activeView.es.type === 'experiments' ? 'measurements' : activeView.es.type}
        pageSize={20}
      />
    );
    if (activeView.name === 'Map') return (
      <SearchMapView
        key={this.state.levelNumber + '_' + activeView.name}
        style={viewStyle}
        es={_.extend({}, es, {queries: _.concat(searchQueries, {exists: 
          {field: this.state.levelNumber < 2 ? "summary._all._geo_envelope" : "summary._all._geo_point"}
        })})}
      />
    );
    if (activeView.name === 'Images' || activeView.name === 'Plots') return (
      <SearchImagesView
        key={this.state.levelNumber + '_' + activeView.name}
        style={viewStyle}
        es={es}
      />
    );
  }

  renderJSONLD(searchQueries) {
    let activeView =
      _.find(levels[this.state.levelNumber].views, { name: this.state.view }) ||
      levels[this.state.levelNumber].views[0];
    let es = _.extend({}, activeView.es, {
      queries: searchQueries
    });
    let queries = {};
    this.state.search.replace(/(\w+):\"(.+?)\"\s*/g, (match, term, value) => {
      queries[term] = value;
    });
    if (queries.doi || queries.id) {
      return <SearchJSONLD es={es} id={queries.id}/>
    }
  }

  updateDownloadCheckboxes(e) {
    console.log(e.target == this.refs['download contributions checkbox']);
  }

}

export default Search;

