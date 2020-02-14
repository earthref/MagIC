import React from 'react';

import {portals} from '/lib/configs/portals';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    //this.forceImgContainerReflow();
  }

  componentDidUpdate() {
    this.forceImgContainerReflow();
  }

  forceImgContainerReflow() {
    try  {
      if (this.refs['img container']) $(this.refs['img container']).hide().show(0);
    } catch (e) {
      // Ignore errors since this is a Chrome rendering patch
    }
  }

  render() {
    const { file, error, source, style, loadingStyle, download } = this.props;
    const { isLoaded } = this.state;
    if (error) {
      return (
        <div style={style}>
          <br/>Error<br/>Retrieving<br/><b>Plot</b><br/><br/>
        </div>
      );
    }
    else if (source && source === file) {
      const s3File = `https://s3.amazonaws.com/magic-plots/${file}`;
      return (download ?
        <div style={style}>
          <div style={{display:'flex', flexDirection:'row', maxHeight:'100%', maxWidth:'100%', margin:'auto'}}>
            <div ref="img container" style={{display:'flex'}}>
              { !isLoaded &&
                <div className="ui active inverted dimmer" style={loadingStyle}>
                  <div className="ui text loader">Loading</div>
                </div>
              }
              <img style={{ visibility:isLoaded ? 'visible' : 'hidden', zIndex: 1, objectFit:'contain', minWidth: 0, maxHeight:'100%', maxWidth:'100%', margin:'auto', border:'1px solid rgba(0,0,0,.1)'}} src={s3File} {...!isLoaded && {onLoad: () => _.defer(() => this.setState({ isLoaded: true }))}}/>
            </div>
            { isLoaded &&
              <div ref="img download" style={{minWidth:'200px', marginLeft:'1em'}}>
                <a className={"ui basic button " + portals['MagIC'].color} download={file} href={s3File}>
                  <i className="download icon"/>
                  Download
                </a>
              </div>
            }
          </div>

        </div>
      :
        <div ref="img container" style={{display:'flex'}}>
          <div className="ui active inverted dimmer" style={loadingStyle}>
            <div className="ui text loader">Loading</div>
          </div>
          <div style={{background:'white', zIndex: 1000, display:'flex'}}>
            <img className="ui image" style={style} src={s3File}/>
          </div>
        </div>
      );
    }
    else if (source && source.length && source.length > 4 && source.substring && source.substring(0, 4) === "data") {
      return (download ?
        <div style={style}>
          <div style={{display:'flex', flexDirection:'row', maxHeight:'100%', maxWidth:'100%', margin:'auto'}}>
            <div ref="img container" style={{display:'flex'}}>
              <div className="ui active inverted dimmer" style={loadingStyle}>
                <div className="ui text loader">Loading</div>
              </div>
              <img style={{ position:'absolute', zIndex: 1, maxHeight:'100%', maxWidth:'100%', margin:'auto', border:'1px solid rgba(0,0,0,.1)'}} src={source} onLoad={this.forceImgContainerReflow.bind(this)}/>
            </div>
            <div style={{minWidth:'200px', marginLeft:'1em'}}>
              <a className={"ui basic button " + portals['MagIC'].color} download={file} href={source}>
                <i className="download icon"/>
                Download
              </a>
            </div>
          </div>

        </div>
      :
        <div ref="img container" style={{display:'flex'}}>
          <div className="ui active inverted dimmer" style={loadingStyle}>
            <div className="ui text loader">Loading</div>
          </div>
          <div style={{background:'white', zIndex: 1000, display:'flex'}}>
            <img className="ui image" style={style} src={source}/>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="ui active inverted dimmer" style={loadingStyle}>
          <div className="ui text loader">Loading</div>
        </div>
      );
    }
  }
}

