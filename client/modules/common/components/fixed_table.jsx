import React from 'react';

export default class extends React.Component {

  render() {
    return (
      <div style={{overflow:'auto'}}>
        <table className={this.props.className} style={this.props.style}>
          {this.props.children}
        </table>
      </div>
    );
  }

}