import _ from 'lodash';
import React from 'react';
import saveAs from 'save-as';
import IconButton from '../../common/components/icon_button.jsx';
import MagICContribution from './contribution.jsx';
import MagICSearchSummariesContributions from '../containers/search_summaries_contributions';
import MagICSearchSummariesContributionsCountTab from '../containers/search_summaries_contributions_count_tab';
import {portals} from '../../common/configs/portals';
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
      sort: 'updated',
      sortDirection: -1,
      settingsVisible: true
    };
    this.styles = {
      a: {cursor: 'pointer', color: '#792f91'},
      table: {width: '100%'},
      td: {verticalAlign: 'top', overflow: 'hidden', transition: 'all 0.5s ease'},
      segment: {padding: '0'},
      activeTab: {backgroundColor: '#F0F0F0'},
      searchInput: {padding: '1em'},
      hideSettings: {paddingLeft: '1em'},
      showSettings: {overflow: 'hidden', transition: 'all 0.5s ease'},
      hideSettingsIcon: {paddingLeft: '0.5em', paddingRight: '0.5em'},
      settings: {whiteSpace: 'nowrap', overflowY: 'auto', padding: '1em'},
      results: {overflow: 'auto', padding: '1em', borderLeft: '1px solid #D4D4D5', transition: 'all 0.5s ease', borderRadius: '0', boxShadow: 'none'}
    };
  }

  componentDidMount() {
    $(this.refs['results']).accordion({exclusive: false});
    window.addEventListener("resize", this.onWindowResize.bind(this));
    this.onWindowResize();
    this.showSettings();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize.bind(this));
  }

  componentDidUpdate() {
    this.onWindowResize();
    $(this.refs['results']).accordion({exclusive: false});
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

  onSearchChange(e) {
  }

  showSettings() {
    $(this.refs['show settings']).hide()
    $(this.refs['hide settings']).show();
    $(this.refs['settings']).show();
    $(this.refs['results']).addClass('settings-visible');
  }

  hideSettings() {
    $(this.refs['show settings']).show()
    $(this.refs['hide settings']).hide();
    $(this.refs['settings']).hide();
    $(this.refs['results']).removeClass('settings-visible');
  }

  renderSortSettings() {
    return (
      <div className="ui link list">
        <a className="item"
           style={(this.state.sort === 'updated' ? _.merge({}, this.styles.a, {fontWeight: 'bold', color: 'black'}) : this.styles.a)}
           onClick={() => this.setState({
             sort: 'updated',
             sortDirection: (this.state.sort === 'updated' ? -1 * this.state.sortDirection : -1)
           })}>
          <i className={'ui icon' +
            (this.state.sort === 'updated' ? ' sort numeric' +
            (this.state.sortDirection === 1 ? ' ascending' : ' descending') : '')}/>
          <div className="content">Upload Date</div>
        </a>
        <a className="item"
           style={(this.state.sort === 'long_authors' ? _.merge({}, this.styles.a, {fontWeight: 'bold', color: 'black'}) : this.styles.a)}
           onClick={() => this.setState({
             sort: 'long_authors',
             sortDirection: (this.state.sort === 'long_authors' ? -1 * this.state.sortDirection : 1)
           })}>
          <i className={'ui icon' +
            (this.state.sort === 'long_authors' ? ' sort alphabet' +
            (this.state.sortDirection === 1 ? ' ascending' : ' descending') : '')}/>
          <div className="content">First Author</div>
        </a>
        <a className="item"
           style={(this.state.sort === 'max_ages' ? _.merge({}, this.styles.a, {fontWeight: 'bold', color: 'black'}) : this.styles.a)}
           onClick={() => this.setState({
             sort: 'max_ages',
             sortDirection: (this.state.sort === 'max_ages' ? -1 * this.state.sortDirection : -1)
           })}>
          <i className={'ui icon' +
            (this.state.sort === 'max_ages' ? ' sort numeric' +
            (this.state.sortDirection === 1 ? ' ascending' : ' descending') : '')}/>
          <div className="content">Age</div>
        </a>
        <a className={'item'} style={this.styles.a}>
          <i className="ui plus icon"/>
          <div className="content">Custom Sort Column</div>
        </a>
      </div>
    );
  }

  renderFilterSettings() {
    return (
      <div className="ui accordion">
        <div className="title"><i className="ui caret right icon"/>Bounding Box</div>
        <div className="content"></div>
        <div className="title"><i className="ui caret right icon"/>Age Range</div>
        <div className="content"></div>
        <div className="title"><i className="ui caret right icon"/>Uploaded By</div>
        <div className="content"></div>
        <div className="title"><i className="ui caret right icon"/>Following</div>
        <div className="content"></div>
        <div className="title"><i className="ui caret right icon"/>Method Codes</div>
        <div className="content"></div>
        <div className="title"><i className="ui caret right icon"/>Publication Year</div>
        <div className="content"></div>
        <div className="active title"><i className="ui caret down icon"/>External DB</div>
        <div className="active content ui list">
          <div className="item"><i className="ui icon"/><div className="content">ARCHEO00</div></div>
          <div className="item"><i className="ui icon"/><div className="content">CALS7K.2</div></div>
          <div className="item"><i className="ui icon"/><div className="content">DRAGON</div></div>
          <div className="item"><i className="ui icon"/><div className="content">GEOMAGIA50</div></div>
          <div className="item"><i className="ui icon"/><div className="content">PALEOMAGIA</div></div>
          <div className="item"><i className="ui icon"/><div className="content">PINT</div></div>
          <div className="item"><i className="ui icon"/><div className="content">PINT08</div></div>
          <div className="item"><i className="ui icon"/><div className="content">PSVRL</div></div>
          <div className="item"><i className="ui icon"/><div className="content">TAFI</div></div>
          <div className="item"><i className="ui icon"/><div className="content">TRANS</div></div>
        </div>
        <div className="title"><i className="ui caret right icon"/>Includes Intensities</div>
        <div className="title"><i className="ui caret right icon"/>Has Measurements</div>
        <div className="title"><i className="ui small plus icon"/> Custom Column Filter</div>
      </div>
    );
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
          </div>
        :
          <a className="item" onClick={() => this.setState({view: 'Summaries'})}>
            {level}
          </a>
        }
        {this.state.view == 'Images' ?
          <div className="active item">
            Images
          </div>
          :
          <a className="item" onClick={() => this.setState({view: 'Images'})}>
            Images
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
          </div>
          <a className="item" style={this.styles.a}>
            Locations
          </a>
          <a className="item" style={this.styles.a}>
            Sites
          </a>
          <a className="item" style={this.styles.a}>
            Samples
          </a>
          <a className="item"style={this.styles.a}>
            Specimens
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
            <td style={_.merge({}, this.styles.td, {maxWidth: (this.state.settingsVisible ? 'calc(25vw)' : '0px')})}>
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
                  {this.renderSortSettings()}
                  <div className="ui divider"></div>
                  <h5 className="ui header">
                    Filter Settings
                  </h5>
                  {this.renderFilterSettings()}
                </div>
              </div>
            </td>
            <td style={_.merge({},
              this.styles.td,
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
                  <div className="ui styled fluid accordion search-results"
                       style={_.merge({}, this.styles.results, (this.state.settingsVisible ? {} : {borderLeft: 'none'}))}>
                    {this.props.contribution ?
                      <MagICContribution contribution={this.props.contribution}/>
                    :
                      <MagICSearchSummariesContributions
                        selector={(this.state.search != '' ? {$text: {$search: this.state.search}} : {})}
                        options={{sort: {[this.state.sort]: this.state.sortDirection}, limit: 50}}/>
                    }
                  </div>
                </td>
                <td style={_.merge({},
                  this.styles.td,
                  (this.state.level === 'Contributions' && this.state.view === 'Images' ?
                    {width: '100%', maxWidth: 'calc(100vw)'} :
                    {width: '0%', maxWidth: '0px'})
                )}>
                  <div className="ui styled fluid accordion search-results"
                       style={_.merge({}, this.styles.results, (this.state.settingsVisible ? {} : {borderLeft: 'none'}))}>
                  </div>
                </td>
                <td style={_.merge({},
                  this.styles.td,
                  (this.state.level === 'Contributions' && this.state.view === 'Map' ?
                    {width: '100%', maxWidth: 'calc(100vw)'} :
                    {width: '0%', maxWidth: '0px'})
                )}>
                  <div ref="results" className="ui styled fluid accordion search-results"
                       style={_.merge({}, this.styles.results, (this.state.settingsVisible ? {} : {borderLeft: 'none'}))}>
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

