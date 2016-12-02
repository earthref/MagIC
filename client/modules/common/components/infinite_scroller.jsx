import _ from 'lodash';
import React from 'react';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nPages: props.nPages || 1
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.onScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onScroll.bind(this));
  }

  componentWillUpdate(nextProps, nextState) {
    if (!_.isEqual(this.props, nextProps)) {
      console.log('resetting infinite scroller');
      this.setState({nPages: 1});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    _.delay(this.onScroll.bind(this), 500);
  }

  onScroll() {
    const scrollerHeight = $(this.refs['scroller']).height();
    const scrollerPosition = this.refs['scroller'].scrollTop;
    const contentHeight = $(this.refs['content']).height();

    let maxPages;
    if (this.props.count && this.props.pageSize)
      maxPages = Math.ceil(this.props.count / this.props.pageSize);

    if (scrollerPosition > contentHeight - scrollerHeight - 100 ||
        scrollerHeight > contentHeight) {
      if (maxPages !== undefined && this.state.nPages < maxPages) {
        console.log('nPages:', this.state.nPages + 1, 'maxPages', maxPages);
        this.setState({nPages: this.state.nPages + 1});
      }
    }
  }

  render() {
    const pageNumberPropName = this.props.pageNumberPropName || 'page';
    return (
      <div {...this.props} ref="scroller" onScroll={_.throttle(this.onScroll.bind(this), 500)}>
        <div ref="content">
          {_.times(this.state.nPages, (iPage) =>
            <div key={iPage} style={{position: 'relative'}}>
              {React.Children.map(this.props.children, (child) =>
                React.cloneElement(child, {[pageNumberPropName]: iPage+1})
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

}