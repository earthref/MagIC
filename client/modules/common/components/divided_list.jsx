import React from 'react';

export default class extends React.Component {

  render() {
    return (
      <div>
        <div className="ui divided list" style={{margin: 0}}>
          {this.props.docs ? this.props.docs.map((doc, i) => {
            return <div className="item" key={i}>
              {(this.props.children ? React.Children.map(this.props.children, (child) => {
                  return React.cloneElement(child, {doc: doc});
                }
              ) : undefined)}
            </div>
          }) :
          _.times(this.props.elasticsearchPageSize, (i) =>
            <div className="item" key={i} style={{minHeight: '100px', position: 'relative'}}>
              <div className="ui active inverted dimmer">
                <div className="ui text loader">Loading</div>
              </div>
            </div>
          )}
        </div>
        <div className="ui fitted divider"></div>
      </div>
    );
  }
}