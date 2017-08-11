import _ from 'lodash';
import React from 'react';

export default class extends React.Component {

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps, this.props);
  }

  render() {
    if (this.props.items) console.log('divided list', this.props.items);
    return (
      <div>
        <div className="ui divided list" style={{margin: 0}}>
          {this.props.items ?
            this.props.items.length === 0 ?
              <div className="item">
                <div className="ui fluid warning message">
                  <div className="ui center aligned huge basic segment">
                    No Items to Display
                  </div>
                </div>
              </div>
            :
              this.props.items.map((item, i) => {
                return <div className="item" key={i}>
                  {(this.props.children ? React.Children.map(this.props.children, (child) => {
                      return React.cloneElement(child, {item: item, active: this.props.items.length === 1});
                    }
                  ) : undefined)}
                </div>
              })
          :
            _.times(this.props.pageSize, (i) =>
              <div className="item" key={i} style={{minHeight: '100px', position: 'relative'}}>
                <div className="ui active inverted dimmer">
                  <div className="ui text loader">Loading</div>
                </div>
              </div>
            )
          }
        </div>
        {!this.props.items || this.props.items.length > 0 ?
          <div className="ui fitted divider"/>
        : undefined}
      </div>
    );
  }
}