import _ from 'lodash';
import React from 'react';
import saveAs from 'save-as';
import IconButton from '../../common/components/icon_button.jsx';
import MagICContribution from './contribution.jsx';
import MagICSearchSummariesContributionSearch from '../containers/search_summaries_contribution_search';
import MagICSearchSummariesContributionCount from '../containers/search_summaries_contribution_count';
import MagICSearchAgesContributionCount from '../containers/search_ages_contribution_count';
import MagICSearchImagesContributionCount from '../containers/search_images_contribution_count';
import MagICSearchSummariesLocationCount from '../containers/search_summaries_location_count';
import MagICSearchSummariesSiteCount from '../containers/search_summaries_site_count';
import MagICSearchSummariesSampleCount from '../containers/search_summaries_sample_count';
import MagICSearchSummariesSpecimenCount from '../containers/search_summaries_specimen_count';
import MagICSearchFiltersContributionReferenceYearBuckets from '../containers/search_filters_reference_year_buckets';
import MagICSearchFiltersContributionContributorIDBuckets from '../containers/search_filters_contributor_id_buckets';
import MagICSearchFiltersContributionExternalDBNameBuckets from '../containers/search_filters_external_db_name_buckets';
import {portals} from '../../common/configs/portals';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import {default as cvs} from '../../../../lib/modules/er/controlled_vocabularies';
import {default as svs} from '../../../../lib/modules/er/suggested_vocabularies';
import {default as contributions} from '../../../../lib/modules/magic/contributions';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      level: 'Contributions',
      view: 'Summaries',
      sort: 'activated',
      sortDirection: -1,
      sortDefault: true,
      limit: 20,
      settingsVisible: true,
      filters: []
    };
    this.styles = {
      a: {cursor: 'pointer', color: '#792f91'},
      table: {width: '100%'},
      td: {verticalAlign: 'top', overflow: 'hidden', transition: 'all 0.5s ease', position: 'relative'},
      segment: {padding: '0'},
      activeTab: {backgroundColor: '#F0F0F0'},
      countLabel: {color: '#0C0C0C', margin: '-1em -1em -1em 0.5em', minWidth: '4em'},
      searchInput: {padding: '1em', paddingBottom: 0},
      hideSettings: {paddingLeft: '1em'},
      showSettings: {overflow: 'hidden', transition: 'all 0.5s ease'},
      hideSettingsIcon: {paddingLeft: '0.5em', paddingRight: '0.5em'},
      settings: {whiteSpace: 'nowrap', overflowY: 'auto', padding: '1em'},
      settingsHeader: {margin: 0},
      filterBuckets: {paddingLeft: '0.5em', position: 'relative'},
      results: {overflow: 'auto', padding: '1em', borderLeft: '1px solid #D4D4D5', transition: 'all 0.5s ease', borderRadius: '0', boxShadow: 'none'}
    };
  }

  componentDidMount() {
    $(this.refs['results']).accordion({exclusive: false});
    $(this.refs['filters']).accordion({exclusive: false});
    window.addEventListener("resize", this.onWindowResize.bind(this));
    this.onWindowResize();
    this.showSettings();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize.bind(this));
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.search !== this.state.search || !_.isEqual(nextState.filters, this.state.filters))
      this.setState({limit: 20});
  }

  componentDidUpdate() {
    this.onWindowResize();
    //$(this.refs['results']).accordion({exclusive: false});
  }

  componentWillReceiveProps(nextProps) {
  }

  onWindowResize() {
    const windowHeight = $(window).height() - (this.props.bottomOffset || 0) - 29;
    if (windowHeight !== this.windowHeight) {
      this.windowHeight = windowHeight;
      $(this.refs['settings']).height(windowHeight - $(this.refs['settings']).offset().top);
      $('> td > table > tbody >  tr > td > div.search-results', this.refs['search tabs']).each(function() {
        $(this).height(windowHeight - $(this).offset().top);
      });
    }
  }

  onResultsScroll(e) {
    if (e.target.scrollTop > $(e.target).children().first().height() - 2 * $(e.target).height())
      this.setState({limit: this.state.limit + 10});
    //console.log(e.target.scrollTop, $(e.target).height(), $(e.target).children().first().height(), this.state.limit);
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
        <div className="title"><i className="dropdown icon"/>Publication Year</div>
        <div className="content" style={this.styles.filterBuckets}>
          <MagICSearchFiltersContributionReferenceYearBuckets
            elasticsearchQuery={this.getSearchQuery()}
          />
        </div>
        <div className="title"><i className="dropdown icon"/>Uploader</div>
        <div className="content" style={this.styles.filterBuckets}>
          <MagICSearchFiltersContributionContributorIDBuckets
            elasticsearchQuery={this.getSearchQuery()}
          />
        </div>
        <div className="title"><i className="dropdown icon"/>External DB</div>
        <div className="content" style={this.styles.filterBuckets}>
          <MagICSearchFiltersContributionExternalDBNameBuckets
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

  renderTabMenu(level) {
    return (
      <div className="ui top attached tabular small menu search-tab-menu">
        <div style={_.merge({}, this.styles.showSettings, {maxWidth: (this.state.settingsVisible ? '0px' : '125px')})}>
          <a className="item" onClick={() => this.setState({settingsVisible: true})}>
            <i className="ui chevron circle right black icon"/>
            Settings
          </a>
        </div>
        {this.state.view == 'Summaries' ?
          <div className="active item">
            {level}
            <div className="ui circular small basic label" style={this.styles.countLabel}>
              <MagICSearchSummariesContributionCount
                elasticsearchQuery={this.getSearchQuery()}
              />
            </div>
          </div>
        :
          <a className="item" onClick={() => this.setState({view: 'Summaries'})}>
            {level}
            <div className="ui circular small basic label" style={this.styles.countLabel}>
              <MagICSearchSummariesContributionCount
                elasticsearchQuery={this.getSearchQuery()}
              />
            </div>
          </a>
        }
        {this.state.view == 'Ages' ?
          <div className="active item">
            Ages
            <div className="ui circular small basic label" style={this.styles.countLabel}>
              <MagICSearchAgesContributionCount
                elasticsearchQuery={this.getSearchQuery()}
              />
            </div>
          </div>
          :
          <a className="item" onClick={() => this.setState({view: 'Ages'})}>
            Ages
            <div className="ui circular small basic label" style={this.styles.countLabel}>
              <MagICSearchAgesContributionCount
                elasticsearchQuery={this.getSearchQuery()}
              />
            </div>
          </a>
        }
        {this.state.view == 'Images' ?
          <div className="active item">
            Images
            <div className="ui circular small basic label" style={this.styles.countLabel}>
              <MagICSearchImagesContributionCount
                elasticsearchQuery={this.getSearchQuery()}
              />
            </div>
          </div>
          :
          <a className="item" onClick={() => this.setState({view: 'Images'})}>
            Images
            <div className="ui circular small basic label" style={this.styles.countLabel}>
              <MagICSearchImagesContributionCount
                elasticsearchQuery={this.getSearchQuery()}
              />
            </div>
          </a>
        }
        {this.state.view == 'Map' ?
          <div className="active item">
            Map
          </div>
          :
          <a className="item" onClick={() => this.setState({view: 'Map'})}>
            Map
          </a>
        }
        <div className="right menu">
          <div className="item">
            <i className="save icon"/>
            <a className="ui" style={this.styles.a}>Save Search</a>
          </div>
          <div className="item">
            <i className="download icon"/>
            <a className="ui" style={this.styles.a}>Download Results</a>
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
              <MagICSearchSummariesContributionCount
                elasticsearchQuery={this.getSearchQuery()}
              />
            </div>
          </div>
          <a className="item" style={this.styles.a}>
            Locations
            <div className="ui circular small basic label" style={this.styles.countLabel}>
              <MagICSearchSummariesLocationCount
                elasticsearchQuery={this.getSearchQuery()}
              />
            </div>
          </a>
          <a className="item" style={this.styles.a}>
            Sites
            <div className="ui circular small basic label" style={this.styles.countLabel}>
              <MagICSearchSummariesSiteCount
                elasticsearchQuery={this.getSearchQuery()}
              />
            </div>
          </a>
          <a className="item" style={this.styles.a}>
            Samples
            <div className="ui circular small basic label" style={this.styles.countLabel}>
              <MagICSearchSummariesSampleCount
                elasticsearchQuery={this.getSearchQuery()}
              />
            </div>
          </a>
          <a className="item"style={this.styles.a}>
            Specimens
            <div className="ui circular small basic label" style={this.styles.countLabel}>
              <MagICSearchSummariesSpecimenCount
                elasticsearchQuery={this.getSearchQuery()}
              />
            </div>
          </a>
          <a className="item" style={this.styles.a}>
            Experiments
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
          <div className="ui labeled fluid input" style={this.styles.searchInput}>
            <div className={portals['MagIC'].color + ' ui label'}>
              <i className="search icon"/>
              Search MagIC
            </div>
            <input
              ref="search"
              className="prompt"
              type="text"
              placeholder="e.g. igneous outcrop"
              value={this.state.search}
              onChange={() => this.setState({search: this.refs['search'].value})}
            />
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
              {this.renderTabMenu('Contributions')}
              <table style={this.styles.table}><tbody><tr>
                <td style={_.merge({},
                    this.styles.td,
                    (this.state.level === 'Contributions' && this.state.view === 'Summaries' ?
                      {width: '100%', maxWidth: 'calc(100vw)'} :
                      {width: '0%', maxWidth: '0px'})
                  )}>
                  <div ref="results" className="ui styled fluid accordion search-results"
                       style={_.merge({}, this.styles.results, (this.state.settingsVisible ? {} : {borderLeft: 'none'}))}
                       onScroll={this.onResultsScroll.bind(this)}
                  >
                    <MagICSearchSummariesContributionSearch
                        elasticsearchQuery={this.getSearchQuery()}
                        elasticsearchSort={[{[this.getSortColumn()]: (this.getSortDirection() == 1 ? 'asc' : 'desc')}]}
                        minimongoSort={{[this.getSortColumn()]: this.getSortDirection()}}
                        elasticsearchLimit={this.state.limit}
                    />
                  </div>
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
                  <div className="ui styled fluid accordion search-results"
                       style={_.merge({}, this.styles.results, (this.state.settingsVisible ? {} : {borderLeft: 'none'}), {padding: 0})}
                  >

                  </div>
                </td>
              </tr></tbody></table>
            </td>
          </tr></tbody></table>
        </div>
      </div>
    );
  }

}

