import React from 'react';

export default class extends React.Component {

  render() {
    const { file, error, source, style, download } = this.props
    //console.log('plot render', file, error, source && source.length);
    if (error) {
      return (
        <div style={style}>
          <br/>Error<br/>Retrieving<br/><b>Plot</b><br/><br/>
        </div>
      );
    }
    else if (source && source.length && source.length > 4 && source.substring && source.substring(0, 4) === "data") {
      return (download ?
        <a download={file} href={source} style={style}>
          <div className="ui fade reveal bordered image" style={{ width: '100%', textAlign: 'center' }}>
            <div className="visible content">
              <img style={style} src={source}/>
            </div>
            <div className="hidden content" style={{ opacity: .5 }}>
              <img style={style} src={source}/>
              <div className="ui icon header" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <i className="download icon" />
                <div className="content">
                  Download
                </div>
              </div>
            </div>
          </div>
        </a>
      :
        <img className="ui bordered image" style={style} src={source}/>
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

