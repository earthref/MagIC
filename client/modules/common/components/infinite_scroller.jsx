import _ from 'lodash';
import React, { PropTypes } from 'react';

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
    //window.addEventListener("resize", this.onScroll);
  }

  componentWillUnmount() {
    //window.removeEventListener("resize", this.onScroll);
    clearInterval(this.timeoutScroll);
  }

  componentWillUpdate(nextProps, nextState) {
    if (!_.isEqual(this.props, nextProps)) {
      console.log('resetting infinite scroller');
      this.setState({nPages: 1});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //if (!_.isEqual(prevProps, this.props))
    //  this.onScroll();
  }

  _onScroll() {
    const scrollerHeight = $(this.refs['scroller']).height();
    const scrollerPosition = this.refs['scroller'] && this.refs['scroller'].scrollTop;
    const contentHeight = $(this.refs['content']).height();
    //console.log(scrollerHeight, scrollerPosition, contentHeight);

    let maxPages;
    if (this.props.count && this.props.pageSize)
      maxPages = Math.ceil(this.props.count / this.props.pageSize);

    //console.log('scroll', this.state.nPages, maxPages, scrollerPosition, scrollerHeight, contentHeight);
    if (scrollerPosition > contentHeight - scrollerHeight - 50 ||
        scrollerHeight > contentHeight) {
      //if (maxPages === undefined || this.state.nPages < maxPages) {
      if (maxPages !== undefined && this.state.nPages < maxPages) {
        console.log('nPages:', this.state.nPages + 1, 'maxPages', maxPages);
        this.setState({nPages: this.state.nPages + 1});
      }
    }
  }

  render() {
    const pageNumberPropName = this.props.pageNumberPropName || 'page';
    return (
      <div ref="scroller" style={this.props.style} onScroll={this.onScroll}>
        <div ref="content">
          {_.times(this.state.nPages, (iPage) => {
            //console.log(this.props.children);
            return (
              <div key={iPage} style={{position: 'relative'}}>
                {React.Children.map(this.props.children, (child) =>
                 React.cloneElement(child, {[pageNumberPropName]: iPage+1})
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