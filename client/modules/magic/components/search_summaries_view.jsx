import _ from 'lodash';
import React from 'react';
import InfiniteScrollerWithCount from '/client/modules/common/containers/infinite_scroller_with_count';
import SearchDividedList from '/client/modules/common/containers/search_divided_list';
import SearchSummariesListItem from '/client/modules/magic/containers/search_summaries_list_item';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.styles = {
      scroller: {overflowY: 'scroll', background: 'white', padding: '0 1em', borderRadius: '0', boxShadow: 'none'}
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps);
  }

  render() {
    return (
      <InfiniteScrollerWithCount
        style={_.extend({}, this.styles.scroller, this.props.style)}
        es={this.props.es}
        pageSize={this.props.pageSize || 5}
      >
        <SearchDividedList es={this.props.es}>
          <SearchSummariesListItem table={this.props.es.type}/>
        </SearchDividedList>
      </InfiniteScrollerWithCount>
    );
  }

}

