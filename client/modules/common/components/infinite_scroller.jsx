import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

export default class InfiniteScroller extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nPages: props.nPages || 1
    };
    this.onScroll = _.throttle(() => {
      this._onScroll();
    }, 100);
  }

  componentDidMount() {
    this.timeoutScroll = setInterval(this.onScroll, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timeoutScroll);
  }

  componentWillUpdate(nextProps, nextState) {
    if (!_.isEqual(
        _.extend({}, this.props, {style: null}),
        _.extend({}, nextProps , {style: null}))) {
      this.setState({nPages: 0});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.nPages === 0)
      this.setState({nPages: 1});
  }

  _onScroll() {
    const scrollerHeight = $(this.refs['scroller']).height();
    const scrollerPosition = this.refs['scroller'] && this.refs['scroller'].scrollTop;
    const contentHeight = $(this.refs['content']).height();

    let maxPages;
    if (this.props.count && this.props.pageSize)
      maxPages = Math.ceil(this.props.count / this.props.pageSize);

    //console.log('scroll', this.state.nPages, maxPages, scrollerPosition, scrollerHeight, contentHeight);
    if (scrollerPosition > contentHeight - scrollerHeight - 50 ||
        scrollerHeight > contentHeight) {
      //if (maxPages === undefined || this.state.nPages < maxPages) {
      if (maxPages !== undefined && this.state.nPages < maxPages) {
        //console.log('nPages:', this.state.nPages + 1, 'maxPages', maxPages);
        this.setState({nPages: this.state.nPages + 1});
      }
    }
  }

  render() {
    return (
      <div ref="scroller" style={this.props.style} onScroll={this.onScroll}>
        <div ref="content">
          {_.times(this.state.nPages, (iPage) => {
            //console.log('infinite scroller', iPage, this.state.nPages);//, this.props.children);
            return (
              <div key={iPage} style={{position: 'relative'}}>
                {React.Children.map(this.props.children, (child) =>
                 React.cloneElement(child, { pageNumber: iPage+1, pageSize: this.props.pageSize })
                 )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

}

InfiniteScroller.propTypes = {

};