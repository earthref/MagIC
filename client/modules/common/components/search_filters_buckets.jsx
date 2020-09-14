import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';
import Count from './count';

export default class SearchFiltersBuckets extends React.Component {

  search = '';

  constructor(props) {
    super(props);
    this.state = {
      activeFilters: this.propsActiveFiltersTostateActiveFilters(props.activeFilters),
      search: ''
    };
    //console.log(props.name, props.activeFilters, this.state.activeFilters);
    this.styles = {
      b: {fontWeight: 'bold'},
      flex: {display: 'flex', marginBottom: '0.25em'},
      flexGrow: {flexGrow: 1, marginRight: '0.5em', whiteSpace: 'normal'},
      content: {paddingTop: 0},
      click: {cursor: 'pointer'}
    };
    this.handleSearchOnChange = _.debounce(this._handleSearchOnChange.bind(this), 500);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.activeFilters, this.props.activeFilters))
      this.setState({
        activeFilters: this.propsActiveFiltersTostateActiveFilters(this.props.activeFilters)
      });
    else if (!_.isEqual(prevState.activeFilters, this.state.activeFilters) && this.props.onChange !== undefined)
      this.props.onChange(_.keys(this.state.activeFilters).sort());
  }

  toggleList() {
    $(this.refs['title']).toggleClass('active');
    $(this.refs['content']).slideToggle(250);
    if (this.props.onClick) this.props.onClick();
  }

  _handleSearchOnChange(search) {
    this.setState({ search });
  }

  propsActiveFiltersTostateActiveFilters(activeFilters) {
    return _.reduce(activeFilters, (filters, key) => { if (key) filters[key] = true; return filters; }, {});
  }

  addFilter(key) {
    this.setState({activeFilters: _.extend({}, this.state.activeFilters, {[key]: true})});
  }

  removeFilter(key) {
    this.setState({activeFilters: _.omit(this.state.activeFilters, key)});
  }

  renderFilter(filter, active, matched) {
    return (
      <div key={filter.key}
        style={_.extend({}, this.styles.flex, this.styles.click)}
        onClick={(e) => {
          e.target.style.opacity = 0.5;
          e.target.style.cursor = 'wait';
          _.delay(() => (active ? this.removeFilter(filter.key) : this.addFilter(filter.key)));
        }}
      >
        <div className="ui checkbox" style={{ minWidth: 22, maxWidth: 22 }}>
          <input type="checkbox" checked={active} onChange={() => {}}/>
          <label/>
        </div>
        <div style={_.extend({}, this.styles.flexGrow, this.styles.click, (active ? this.styles.b : ''))}>
          { this.props.quoted && '"' || undefined }
          {matched ? 
            <Highlighter searchWords={[this.state.search]} textToHighlight={filter.label || filter.key}/>
          : 
            <span style={
              filter.style || 
              Meteor.isDevelopment && this.props.cv && !this.props.cv.includes(filter.key) && { color: 'red' } || 
              {}
            }>{filter.label || filter.key }</span>
          }
          { this.props.quoted && '"' || undefined }
        </div>
        <div>
          <Count
            className="ui circular small basic label"
            count={filter.doc_count}
            onMouseOver={(e) => $(e.target).popup({
              html: this.props.onMouseOver(filter.label || filter.key, filter.doc_count),
              position: 'bottom right',
              variation: 'small'
            }).popup('show')}
          />
        </div>
      </div>
    );
  }

  render() {
    const activeFilters = {};
    const matchedFilters = {};
    // this.state.activeFilters may contain a filter from another level that is no longer in
    // this.props.filters, so prepend the activeFilters
    const filters = (this.props.activeFilters && this.props.activeFilters.map(x => ({ key: x, doc_count: 0 })) || []).concat(this.props.filters || []);
    filters.forEach((filter, i) => {
      if (filter.key in this.state.activeFilters)
        activeFilters[filter.key] = { i, filter };
      if (!(filter.key in this.state.activeFilters) && 
          this.state.search !== '' &&
          _.toLower(filter.label || filter.key).indexOf(_.toLower(this.state.search)) !== -1)
        matchedFilters[filter.key] = { i, filter };
    });
    const inactiveFilters = this.props.filters && this.props.filters.length && 
      this.props.filters.filter(x => !activeFilters[x.key] && !matchedFilters[x.key]) || [];
    return (
      <div ref="filter" className="ui small accordion">
        <div ref="title" className="title" style={{paddingBottom: 0}}>
          <div style={this.styles.flex}
               onClick={this.toggleList.bind(this)}>
            <i className="dropdown icon"/>
            <div style={_.extend({}, this.styles.flexGrow, this.styles.b)}>
              {this.props.title}
            </div>
          </div>
          {_.sortBy(_.keys(activeFilters), x => activeFilters[x].i).map(x =>
            this.renderFilter(activeFilters[x].filter, true, false)
          )}
        </div>
        <div ref="content" className="content" style={this.styles.content}>
          <div className="ui small input fluid" style={{ marginBottom: '0.25em' }}>
            <input 
              placeholder={`Find ${this.props.itemsName}`}
              defaultValue={this.state.search}
              onChange={(e) => {
                this.handleSearchOnChange(e.target.value);
              }}
            />
          </div>
          {this.props.filters && _.keys(matchedFilters).length === 0 && this.state.search !== '' && 
            <div style={{ textAlign: 'center'}}><b>No Matches</b></div> || undefined
          }
          {_.sortBy(_.keys(matchedFilters), x => matchedFilters[x].i).map(x =>
            this.renderFilter(matchedFilters[x].filter, false, true)
          )}
          <div className="ui divider"/>
          { this.props.filters === undefined &&
            <div style={{textAlign: 'center'}}>
              <i className="notched circle loading icon" style={{animationDuration:'0.75s', margin:0}}></i> Loading ...
            </div> || undefined
          }
          { this.props.filters && inactiveFilters.length === 0 &&
            <div style={{ textAlign: 'center'}}>
              <b>No {this.props.itemsName}</b>
            </div> || undefined
          }
          { this.props.filters && inactiveFilters.length && inactiveFilters.map(filter => 
              this.renderFilter(filter, false, false)
            ) || undefined
          }
        </div>
      </div>
    );
  }
}

SearchFiltersBuckets.propTypes = {
  activeFilters: PropTypes.array,
  title:         PropTypes.string.isRequired,
};