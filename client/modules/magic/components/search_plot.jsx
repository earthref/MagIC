import React from 'react';

import {portals} from '/lib/configs/portals';

export default class extends React.Component {

  componentDidMount() {
    this.forceImgContainerReflow();
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
        <div style={style}>
          <div style={{display:'flex', flexDirection:'row', maxHeight:'100%', maxWidth:'100%', margin:'auto'}}>
            <div ref="img container" style={{display:'flex', position:'relative'}}>
              <img style={{maxHeight:'100%', maxWidth:'100%', margin:'auto', border:'.5px solid grey'}} src={source}/>
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
        <img className="ui image" style={style} src={source}/>
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

