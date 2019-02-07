import React from 'react';

export default class extends React.Component {

  render() {
    const { file, error, source, style } = this.props
    console.log('plot render', file, error, source && source.length);
    if (error) {
      return (
        <div style={style}>
          <br/>Error<br/>Retrieving<br/><b>Plot</b><br/><br/>
        </div>
      );
    }
    else if (source && source.length && source.length > 4 && source.substring && source.substring(0, 4) === "data") {
      return (
        <img className="ui bordered centered image" style={style} src={source}/>
      );
    }
    else {
      return (
        <div className="ui active inverted dimmer" style={style}>
          <div className="ui text loader">Loading</div>
        </div>
      );
    }
  }
}

