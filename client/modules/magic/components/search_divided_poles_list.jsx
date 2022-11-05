import _ from 'lodash';
import React from 'react';

export default class extends React.Component {

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps, this.props);
  }

  render() {
    // if (this.props.items) console.log('search divided poles list', this.props.items);
    return (
      <div>
        <div className="ui list" style={{padding: 0, margin: '1em 0'}}>
          {this.props.items ?
            this.props.items.length === 0 ?
              <div className="item" style={{padding: 0}}>
                <div className="ui fluid warning message">
                  <div className="ui center aligned huge basic segment">
                    { this.props.idFilter ? 
                      "In Preparation For Publishing - Check Back Soon" : 
                      "No Items to Display"
                    }
                  </div>
                </div>
              </div>
            :
              _.flatten(this.props.items.map((item, i) => {
                return item.rows.map((row, j) => {
                  return <div className="item" style={{ padding: 0 }} key={`${i}_${j}`}>
                    {(this.props.children ? React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child, { item: { ...item, row }, active: this.props.items.length === 1});
                    }) : undefined)}
                    {this.props.items && this.props.items.length > 1 ? <div className="ui fitted divider" style={{margin: '1em 0'}}/> : undefined}
                  </div>
                })
              }))
          :
            _.times(this.props.pageSize, (i) =>
              <div className="item" key={i} style={{padding: 0, minHeight: '150px', position: 'relative'}}>
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