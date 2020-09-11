import _ from 'lodash';
import React from 'react';

export default class extends React.Component {

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps, this.props);
  }

  render() {
    // if (this.props.items) console.log('divided list', this.props.items);
    return (
      <div>
        <div className="ui list" style={{padding: 0, margin: '1em 0'}}>
          {this.props.items ?
            this.props.items.length === 0 ?
              <div className="item" style={{padding: 0}}>
                <div className="ui fluid warning message">
                  <div className="ui center aligned huge basic segment">
                    No Items to Display
                  </div>
                </div>
              </div>
            :
              this.props.items.map((item, i) => {
                return <div className="item" style={{padding: 0}} key={i}>
                  {(this.props.children ? React.Children.map(this.props.children, (child) => {
                      return React.cloneElement(child, {item: item, active: this.props.items.length === 1});
                    }
                  ) : undefined)}
                  {this.props.items && this.props.items.length > 1 ? <div className="ui fitted divider" style={{margin: '1em 0'}}/> : undefined}
                </div>
              })
          :
            _.times(this.props.pageSize, (i) =>
              <div className="item" key={i} style={{padding: 0, minHeight: '100px', position: 'relative'}}>
                <div className="ui active inverted dimmer">
                  <div className="ui text loader">Loading</div>
                </div>
                {this.props.pageSize > 1 ? <div className="ui fitted divider" style={{margin: '1em 0'}}/> : undefined}
              </div>
            )
          }
        </div>
      </div>
    );
  }
}