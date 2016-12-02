import _ from 'lodash';
import React from 'react';
import saveAs from 'save-as';
import DebounceInput from 'react-debounce-input';
import Count from '../../common/containers/count';
import InfiniteScrollerWithCount from '../../common/containers/infinite_scroller_with_count';
import GoogleStaticMap from '../../common/components/google_static_map';
import IconButton from '../../common/components/icon_button.jsx';
import MagICContribution from './contribution.jsx';
import MagICSearchSummariesContributionSearch from '../containers/search_pages_contributions_summaries';
import MagICSearchFilterBucket from '../containers/search_filter_bucket';
import {portals} from '../../common/configs/portals';
import GoogleMap from '../../common/containers/google_map';
import {default as cvs} from '../../../../lib/modules/er/controlled_vocabularies';
import {default as svs} from '../../../../lib/modules/er/suggested_vocabularies';
import {default as contributions} from '../../../../lib/modules/magic/contributions';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      _search: '',
      level: 'Contributions',
      view: 'Summaries',
      sort: 'activated',
      sortDirection: -1,
      sortDefault: true,
      settingsVisible: true,
      filters: []
    };
    this.styles = {
      a: {cursor: 'pointer', color: '#792f91'},
      table: {width: '100%'},
      input: {borderColor: '#888888'},
      td: {verticalAlign: 'top', overflow: 'hidden', transition: 'all 0.5s ease', position: 'relative'},
      segment: {padding: '0'},
      saveButton: {backgroundColor: '#FFFFFF !important'},
      downloadButton: {backgroundColor: '#FFFFFF !important', marginLeft: '-1px'},
      activeTab: {backgroundColor: '#F0F0F0'},
      countLabel: {color: '#0C0C0C', margin: '-1em -1em -1em 0.5em', minWidth: '4em'},
      searchInput: {padding: '1em', paddingBottom: 0},
      hideSettings: {paddingLeft: '1em'},
      showSettings: {overflow: 'hidden', transition: 'all 0.5s ease'},
      hideSettingsIcon: {paddingLeft: '0.5em', paddingRight: '0.5em'},
      settings: {whiteSpace: 'nowrap', overflowY: 'scroll', padding: '1em', borderRight: '1px solid #D4D4D5', },
      settingsHeader: {margin: 0},
      filterBuckets: {paddingLeft: '0.5em', position: 'relative'},
      scroller: {overflowY: 'scroll', background: 'white', padding: '1em', transition: 'all 0.5s ease', borderRadius: '0', boxShadow: 'none'}
    };
    this.handleSearch = _.throttle((value) => {
      this.setState({search: value});
    }, 1000);
  }

  componentDidMount() {
    //$(this.refs['results']).accordion({exclusive: false});
    $(this.refs['filters']).accordion({exclusive: false});
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
    //$(this.refs['results']).accordion({exclusive: false});
  }

  componentWillReceiveProps(nextProps) {
  }

  onWindowResize() {
    const windowHeight = $(window).height() - (this.props.bottomOffset || 0) - 25;
    if (windowHeight !== this.windowHeight) {
      this.windowHeight = windowHeight;
      $(this.refs['settings']).height(windowHeight - $(this.refs['settings']).offset().top);
      $('> td > table > tbody >  tr > td > div', this.refs['search tabs']).each(function() {
        $(this).height(windowHeight - $(this).offset().top);
      });
    }
  }

  onResultsScroll(e) {
    const scrollPaneHeight = $(e.target).height();
    const scrollPanePosition = e.target.scrollTop;
    const scrollContentHeight = $(e.target).children().first().height();
    console.log(e.target.scrollTop, $(e.target).children().last().height() - $(e.target).height(), $(e.target).children().last().position().top, $(e.target).children().last().height(), $(e.target).height(), this.state.pageNumber, $(e.target), $(e.target).children().last());
    if (e.target.scrollTop > $(e.target).children().last().height() - $(e.target).height() - 50) {
      this.setState({pageNumber: this.state.pageNumber + 1});
      console.log('pageNumber:', this.state.pageNumber + 1)
    }
  }

  showSettings() {
    $(this.refs['show settings']).hide();
    $(this.refs['hide settings']).show();
    $(this.refs['settings']).show();
    $(this.refs['results']).addClass('settings-visible');
  }

  hideSettings() {
    $(this.refs['show settings']).show();
    $(this.refs['hide settings']).hide();
    $(this.refs['settings']).hide();
    $(this.refs['results']).removeClass('settings-visible');
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
    return (
      <div ref="filters" className="ui accordion">
        <div className="title"><i className="dropdown icon"/>Geospatial Boundary</div>
        <div className="content" style={this.styles.filterBuckets}>
          <GoogleStaticMap></GoogleStaticMap>
        </div>
        <div className="title"><i className="dropdown icon"/>Publication Year</div>
        <div className="content" style={this.styles.filterBuckets}>
          <MagICSearchFilterBucket
            name="reference_year"
            elasticsearchQuery={this.getSearchQuery()}
          />
        </div>
        <div className="title"><i className="dropdown icon"/>Contributor</div>
        <div className="content" style={this.styles.filterBuckets}>
          <MagICSearchFilterBucket
            name="contributor"
            elasticsearchQuery={this.getSearchQuery()}
          />
        </div>
        <div className="title"><i className="dropdown icon"/>External DB</div>
        <div className="content" style={this.styles.filterBuckets}>
          <MagICSearchFilterBucket
            name="external_db"
            elasticsearchQuery={this.getSearchQuery()}
          />
        </div>
        <div className="title"><i className="dropdown icon"/>Location Type</div>
        <div className="content" style={this.styles.filterBuckets}>
          <MagICSearchFilterBucket
            name="location_type"
            elasticsearchQuery={this.getSearchQuery()}
          />
        </div>
        <div className="title"><i className="dropdown icon"/>Geologic Type</div>
        <div className="content" style={this.styles.filterBuckets}>
          <MagICSearchFilterBucket
            name="geologic_type"
            elasticsearchQuery={this.getSearchQuery()}
          />
        </div>
        <div className="title"><i className="dropdown icon"/>Geologic Class</div>
        <div className="content" style={this.styles.filterBuckets}>
          <MagICSearchFilterBucket
            name="geologic_class"
            elasticsearchQuery={this.getSearchQuery()}
          />
        </div>
        <div className="title"><i className="dropdown icon"/>Lithology</div>
        <div className="content" style={this.styles.filterBuckets}>
          <MagICSearchFilterBucket
            name="lithology"
            elasticsearchQuery={this.getSearchQuery()}
          />
        </div>
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

  renderViewTabMenu(level) {
    return (
      <div className="ui top attached tabular small menu search-tab-menu">
        <div style={_.merge({}, this.styles.showSettings, {maxWidth: (this.state.settingsVisible ? '0px' : '125px')})}>
          <a className="item" onClick={() => this.setState({settingsVisible: true})}>
            <i className="ui chevron circle right black icon"/>
            Settings
          </a>
        </div>
        {this.renderViewTab('Summaries', 'magic.count.contributions.summaries')}
        {this.renderViewTab('Plots'    , 'magic.sum.contributions.plots'      )}
        {this.renderViewTab('Ages'     , 'magic.sum.contributions.ages'       )}
        {this.renderViewTab('Poles'    , 'magic.count.contributions.poles'    )}
        {this.renderViewTab('Images'   , 'magic.sum.contributions.images'     )}
        {this.renderViewTab('Map')}
        <a className="item">
          <i className="ui plus icon"/>
          Custom View
        </a>
        <div className="right menu">
          <div className="item" style={{paddingRight: '1em'}}>
            <div className="ui icon dropdown button" style={{paddingTop: '0.5em', paddingBottom: '0.5em'}}>
              <input type="hidden" name="sort"/>
              <i className="ui sort icon"/>
              <div className="default text">Upload Date</div>
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
      <div className="magic-search">
        <div className="ui top attached tabular menu level-tabs">
          <div className={'active item'} style={this.styles.activeTab}>
            Contributions
            <div className="ui circular small basic label" style={this.styles.countLabel}>
              <Count
                subscriptionName="magic.count.contributions.summaries"
                elasticsearchQuery={this.getSearchQuery()}
                elasticsearchFilters={[]}
              />
            </div>
          </div>
          <a className="item" style={this.styles.a}>
            Locations
            <div className="ui circular small basic label" style={this.styles.countLabel}>
              <Count
                subscriptionName="magic.sum.locations.summaries"
                elasticsearchQuery={this.getSearchQuery()}
              />
            </div>
          </a>
          <a className="item" style={this.styles.a}>
            Sites
            <div className="ui circular small basic label" style={this.styles.countLabel}>
              <Count
                subscriptionName="magic.sum.sites.summaries"
                elasticsearchQuery={this.getSearchQuery()}
              />
            </div>
          </a>
          <a className="item" style={this.styles.a}>
            Samples
            <div className="ui circular small basic label" style={this.styles.countLabel}>
            </div>
          </a>
          <a className="item"style={this.styles.a}>
            Specimens
            <div className="ui circular small basic label" style={this.styles.countLabel}>
            </div>
          </a>
          <a className="item" style={this.styles.a}>
            Measurements
            <div className="ui circular small basic label" style={this.styles.countLabel}>
            </div>
          </a>
          <div className="right menu">
            <div className="item" style={{paddingRight: 0}}>
              <div className={portals['MagIC'].color + ' ui compact button'}>
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
              minLength={0}
              debounceTimeout={500}
              className="prompt"
              type="text"
              placeholder={'e.g. metamorphic "field intensity" -precambrian'}
              value={this.state._search}
              style={this.styles.input}
              onChange={(e) => { this.setState({_search: e.target.value}); this.handleSearch(e.target.value); }}
            />
            <div className={portals['MagIC'].color + ' ui basic button'} style={this.styles.saveButton}>
              <i className="save icon"/>
              Save Search
            </div>
            <div className={portals['MagIC'].color + ' ui basic button'} style={this.styles.downloadButton}>
              <i className="download icon"/>
              Download Results
            </div>
          </div>
          <table style={this.styles.table}><tbody><tr ref="search tabs">
            <td style={_.merge({},
              this.styles.td,
              {paddingTop: '1em'},
              {maxWidth: (this.state.settingsVisible ? '250px' : '0px')}
            )}>
              <div ref="hide settings">
                <a className="ui top attached tabular small menu"
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
                </a>
              </div>
              <div ref="settings" style={this.styles.settings}>
                <div>
                  <h4 className="ui header" style={this.styles.settingsHeader}>
                    Sort By
                  </h4>
                  {this.renderSortSettings()}
                  <div className="ui divider"></div>
                  <h4 className="ui header" style={this.styles.settingsHeader}>
                    Filter By
                  </h4>
                  {this.renderFilterSettings()}
                </div>
              </div>
            </td>
            <td style={_.merge({},
              this.styles.td,
              {paddingTop: '1em'},
              (this.state.level === 'Contributions' ?
                {width: '100%', maxWidth: 'calc(100vw)'} :
                {width: '0%', maxWidth: '0px'})
            )}>
              {this.renderViewTabMenu('Contributions')}
              <table style={this.styles.table}><tbody><tr>
                <td style={_.merge({},
                    this.styles.td,
                    (this.state.level === 'Contributions' && this.state.view === 'Summaries' ?
                      {width: '100%', maxWidth: 'calc(100vw)'} :
                      {width: '0%', maxWidth: '0px'})
                  )}>
                  <InfiniteScrollerWithCount
                      style={this.styles.scroller}
                      subscriptionName="magic.count.contributions.summaries"
                      searchQuery={this.getSearchQuery()}
                      pageNumberPropName="elasticsearchPageNumber"
                      pageSize={5}
                  >
                    <MagICSearchSummariesContributionSearch
                      elasticsearchQuery={this.getSearchQuery()}
                      elasticsearchSort={[{[this.getSortColumn()]: (this.getSortDirection() == 1 ? 'asc' : 'desc')}]}
                      elasticsearchPageSize={5}
                      minimongoSort={{[this.getSortColumn()]: this.getSortDirection()}}
                    />
                  </InfiniteScrollerWithCount>
                </td>
                <td style={_.merge({},
                  this.styles.td,
                  (this.state.level === 'Contributions' && this.state.view === 'Ages' ?
                    {width: '100%', maxWidth: 'calc(100vw)'} :
                    {width: '0%', maxWidth: '0px'})
                )}>
                  <div className="ui styled fluid accordion search-results"
                       style={_.merge({}, this.styles.results, (this.state.settingsVisible ? {} : {borderLeft: 'none'}))}
                       onScroll={this.onResultsScroll.bind(this)}
                  >
                  </div>
                </td>
                <td style={_.merge({},
                  this.styles.td,
                  (this.state.level === 'Contributions' && this.state.view === 'Images' ?
                    {width: '100%', maxWidth: 'calc(100vw)'} :
                    {width: '0%', maxWidth: '0px'})
                )}>
                  <div className="ui styled fluid accordion search-results"
                       style={_.merge({}, this.styles.results, (this.state.settingsVisible ? {} : {borderLeft: 'none'}))}
                       onScroll={this.onResultsScroll.bind(this)}
                  >
                  </div>
                </td>
                <td style={_.merge({},
                  this.styles.td,
                  (this.state.level === 'Contributions' && this.state.view === 'Map' ?
                    {width: '100%', maxWidth: 'calc(100vw)'} :
                    {width: '0%', maxWidth: '0px'})
                )}>
                  <div style={{padding: '1em', backgroundColor: '#FFFFFF'}}>
                    <div style={{border: '1px solid #d4d4d5', height: '100%'}}>
                      <GoogleMap
                        onReady={this.handleMapReady}
                        mapOptions={this.handleMapOptions}
                      ></GoogleMap>
                    </div>
                  </div>
                </td>
              </tr></tbody></table>
            </td>
          </tr></tbody></table>
        </div>
      </div>
    );
  }

  renderViewTab(view, subscriptionName) {
    return (this.state.view == view ?
      <div className="active item">
        {view}
        {subscriptionName !== undefined ?
          <div className="ui circular small basic label" style={this.styles.countLabel}>
            <Count
              subscriptionName={subscriptionName}
              elasticsearchQuery={this.getSearchQuery()}
            />
          </div>
        : undefined}
      </div>
    :
      <a className="item" onClick={() => this.setState({view: view})}>
        {view}
        {subscriptionName !== undefined ?
          <div className="ui circular small basic label" style={this.styles.countLabel}>
            <Count
              subscriptionName={subscriptionName}
              elasticsearchQuery={this.getSearchQuery()}
            />
          </div>
          : undefined}
      </a>
    );
  }

  handleMapReady() {
    console.log('handleMapReady');
  }

  handleMapOptions() {
    console.log('handleMapOptions');
    return {
      center: new google.maps.LatLng(-37.8136, 144.9631),
      zoom: 8
    };
  }

}

