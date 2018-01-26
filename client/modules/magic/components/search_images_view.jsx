import _ from 'lodash';
import React from 'react';
import InfiniteScrollerWithCount from '/client/modules/common/containers/infinite_scroller_with_count';
import SearchDividedList from '/client/modules/common/containers/search_divided_list';
import Plots from '/client/modules/magic/components/search_plots_list_item';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.styles = {
      scroller: {overflowY: 'scroll', background: 'white', padding: '1em', transition: 'all 0.5s ease', borderRadius: '0', boxShadow: 'none'}
    }
  }

  render() {
    return (
      <InfiniteScrollerWithCount
        style={_.extend({}, this.styles.scroller, this.props.style)}
        countSubscriptionName={this.props.countSubscriptionName}
        elasticsearchQuery={this.props.elasticsearchQuery}
        elasticsearchFilters={this.props.elasticsearchFilters}
        pageNumberPropName="elasticsearchPageNumber"
        pageSize={5}
      >
        <SearchDividedList
          subscriptionName={this.props.subscriptionName}
          elasticsearchQuery={this.props.elasticsearchQuery}
          elasticsearchFilters={this.props.elasticsearchFilters}
          elasticsearchSort={this.props.elasticsearchSort}
          elasticsearchPageSize={5}
          minimongoSort={this.props.minimongoSort}
        >
          <Plots/>
        </SearchDividedList>
      </InfiniteScrollerWithCount>
    );
  }

}