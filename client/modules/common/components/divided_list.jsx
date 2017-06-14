import React from 'react';

export default class extends React.Component {

  render() {
    console.log('divided list', this.props.docs);
    return (
      <div>
        <div className="ui divided list" style={{margin: 0}}>
          {this.props.docs ?
            this.props.docs.length === 0 ?
              <div className="item">
                <div className="ui fluid warning message">
                  <div className="ui center aligned huge basic segment">
                    No Items to Display
                  </div>
                </div>
              </div>
            :
              this.props.docs.map((doc, i) => {
                return <div className="item" key={i}>
                  {(this.props.children ? React.Children.map(this.props.children, (child) => {
                      return React.cloneElement(child, {doc: doc});
                    }
                  ) : undefined)}
                </div>
              })
          :
            _.times(this.props.elasticsearchPageSize, (i) =>
              <div className="item" key={i} style={{minHeight: '100px', position: 'relative'}}>
                <div className="ui active inverted dimmer">
                  <div className="ui text loader">Loading</div>
                </div>
              </div>
            )
          }
        </div>
        {this.props.docs && this.props.docs.length > 0 ?
          <div className="ui fitted divider"></div>
        : undefined}
      </div>
    );
  }
}