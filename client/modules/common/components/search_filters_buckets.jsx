import React from 'react';
import PropTypes from 'prop-types';

export default class SearchFiltersBuckets extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeFilters: this.propsActiveFiltersTostateActiveFilters(props.activeFilters),
      showAll: false
    };
    //console.log(props.name, props.activeFilters, this.state.activeFilters);
    this.styles = {
      b: {fontWeight: 'bold'},
      flex: {display: 'flex', marginBottom: '0.25em'},
      flexGrow: {flexGrow: 1, marginRight: '0.5em', whiteSpace: 'normal'},
      content: {paddingTop: 0},
      click: {cursor: 'pointer'}
    };
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
  }

  toggleOverflow() {
    this.setState({showAll: !this.state.showAll}, () => {
      this.state.showAll ? $(this.refs['overflow']).slideDown(250): $(this.refs['overflow']).slideUp(250);
    });
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

  renderActiveFilters() {
    return (
      <div>
        {this.props.filters.slice(0, this.props.maxBuckets).map((filter) => {
          if (filter.key in this.state.activeFilters)
            return this.renderFilter(filter, true);
        })}
      </div>
    );
  }

  renderInactiveFilters() {
    const nToShow = this.props.show || 10;
    let i = 0;
    return (
      <div>
        {this.props.filters.slice(0, this.props.maxBuckets).map((filter) => {
          if (!(filter.key in this.state.activeFilters) && i < nToShow) {
            i += 1;
            return this.renderFilter(filter, false);
          }
        })}
      </div>
    );
  }

  renderOverflowFilters() {
    const nToShow = this.props.show || 10;
    let i = 0;
    let hasOverflow = false;
    return (
      <div>
        <div ref="overflow" style={{display: 'none'}}>
          {this.props.filters.slice(0, this.props.maxBuckets).map((filter) => {
            if (!(filter.key in this.state.activeFilters)) {
              hasOverflow = (i >= nToShow);
              i += 1;
              if (hasOverflow) return this.renderFilter(filter, false);
            }
          })}
        </div>
        {hasOverflow ? this.renderOverflowButton() : undefined}
      </div>
    );
  }

  renderOverflowButton() {
    return (
      <div className="ui mini fluid compact basic button"
           onClick={this.toggleOverflow.bind(this)}
      >
        {this.state.showAll ? 'Show Less' : 'Show More'}
      </div>
    );
  }

  renderFilter(filter, active) {
    return (
      <div key={filter.key}
           style={_.extend({}, this.styles.flex, this.styles.click)}
           onClick={() => (active ? this.removeFilter(filter.key) : this.addFilter(filter.key))}>
        <div className="ui checkbox">
          <input type="checkbox" checked={active} onChange={() => {}}/>
          <label/>
        </div>
        <div style={_.extend({}, this.styles.flexGrow, this.styles.click, (active ? this.styles.b : ''))}>
          {filter.key}
        </div>
        <div>
          <div className="ui circular small basic label" onMouseOver={(e) => $(e.target).popup({
            html: `${filter.doc_count} have a "${filter.key}" <b>${this.props.title}</b>, of which ${filter.filtered_doc_count} ` +
                  `also ${filter.filtered_doc_count === 1 ? 'matches' : 'match'} other filters.`,
            position: 'bottom right',
            variation: 'small'
          }).popup('show')}>
            {filter.filtered_doc_count + ' of ' + filter.doc_count}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const nActiveBuckets = _.size(this.state.activeFilters);
    const nBuckets = _.size(this.props.filters) <= this.props.maxBuckets ? _.size(this.props.filters) : this.props.maxBuckets + '+';
    return (
      <div ref="filter" className="ui small accordion">
        <div ref="title" className="title" style={{paddingBottom: 0}}>
          <div style={this.styles.flex}
               onClick={this.toggleList.bind(this)}>
            <i className="dropdown icon"/>
            <div style={_.extend({}, this.styles.flexGrow, this.styles.b)}>
              {this.props.title}
            </div>
            <div>
              <div className="ui circular small basic label" onMouseOver={(e) => $(e.target).popup({
                html: `${nActiveBuckets} of the ${nBuckets} <b>${this.props.title}</b> filters ${nActiveBuckets === 1 ? 'is' : 'are'} active.`,
                position: 'bottom right',
                variation: 'small'
              }).popup('show')}>
                {nActiveBuckets + ' of ' + nBuckets}
              </div>
            </div>
          </div>
          {this.renderActiveFilters()}
        </div>
        <div ref="content" className="content" style={this.styles.content}>
          {this.renderInactiveFilters()}
          {this.renderOverflowFilters()}
        </div>
      </div>
    );
  }
}

SearchFiltersBuckets.propTypes = {
  activeFilters: PropTypes.array,
  filters:       PropTypes.array.isRequired,
  title:         PropTypes.string.isRequired,
  show:          PropTypes.number
};