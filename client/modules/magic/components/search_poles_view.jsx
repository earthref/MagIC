import _ from 'lodash';
import React from 'react';
import InfiniteScrollerWithCount from '/client/modules/common/containers/infinite_scroller_with_count';
import SearchDividedPolesList from '/client/modules/magic/containers/search_divided_poles_list';
import SearchPolesListItem from '/client/modules/magic/components/search_poles_list_item';

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
        <SearchDividedPolesList es={this.props.es}>
          <SearchPolesListItem table={this.props.es.type}/>
        </SearchDividedPolesList>
      </InfiniteScrollerWithCount>
    );
  }

}

