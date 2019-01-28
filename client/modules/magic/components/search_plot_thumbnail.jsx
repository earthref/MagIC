import _ from 'lodash';
import React from 'react';

import SearchPlot from '/client/modules/magic/containers/search_plot';

import {portals} from '/lib/configs/portals';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      file: undefined,
      maxVisible: 10
    };
  }

  showPlots() {
    $(this.refs['plots modal']).modal({ onVisible: () => this.setState({modal: true}) });
    $(this.refs['plots modal']).modal('show');
  }

  render() {
    const { id, error, files } = this.props
    const containerStyle = {position: 'relative', minWidth: 100, maxWidth: 100, marginRight: '1em', marginBottom: 5, fontSize:'small', color:'#AAAAAA', textAlign:'center', overflow:'hidden', textOverflow:'ellipsis'};
    const modalStyle = {position: 'relative', minWidth: 100, marginRight: '1em', fontSize:'small', color:'#AAAAAA', textAlign:'center', overflow:'hidden', textOverflow:'ellipsis'};
    const thumbnailStyle = {minHeight: 100, maxHeight: 100, margin: '0 auto'};
    console.log('thumbnail render', id, error, files && files.length, this.state);
    if (error) {
      return (
        <div style={containerStyle}>
          <br/>Error<br/>Retrieving<br/><b>Plots</b><br/><br/>
        </div>
      );
    }
    else if (this.state.file || files && files.length > 0) {
      return (
        <div style={containerStyle}>
          <a href="#" onClick={this.showPlots.bind(this)}>
            <SearchPlot style={thumbnailStyle} id={id} file={this.state.file || files[0]} />
          </a>
          <div ref="plots modal" className="ui fullscreen modal">
            <i className="close icon"></i>
            <div className="header">
              {files.length} PmagPy Plots
            </div>
            <div className="image content">
              <SearchPlot style={{position: 'relative', minHeight: 'calc(100vh - 400px)'}} id={id} file={this.state.file || files[0]} />
            </div>
              <div className="actions" style={{display: 'flex', overflowX: 'scroll', minHeight: 'calc(100px + 2rem)' }}>
                {this.state.modal && files.slice(0, this.state.maxVisible).map((file, i) => 
                  <div key={i} style={modalStyle}>
                    <a href="#" onClick={() => this.setState({ file })}>
                      <SearchPlot style={_.extend({}, thumbnailStyle, (this.state.file && this.state.file === file) || (!this.state.file && i === 0) ? { borderWidth: 2, borderColor: portals['MagIC'].color } : {})} id={id} file={file}/>
                    </a>
                  </div>
                )}
                {files.length > this.state.maxVisible && 
                  <a style={{minWidth: 100, lineHeight: '1.25em', fontWeight: 'bold', textAlign: 'center'}} href="#" onClick={() => this.setState({ maxVisible: this.state.maxVisible + 10 })}>
                    <br/>Load<br/>Plots<br/>
                    {this.state.maxVisible + 1} - {Math.min(files.length, this.state.maxVisible + 10)}
                    <br/>of {files.length}
                  </a>
                }
              </div>
          </div>
        </div>
      );
    }
    else if (files && files.length === 0) {
      return (
        <div style={containerStyle}>
          <br/>No<br/><b>Plots</b><br/>Made<br/><br/>
        </div>
      );
    }
    else {
      return (
        <div style={containerStyle}>
          <div className="ui active inverted dimmer" style={{minHeight: 100}}>
            <div className="ui text loader">Loading</div>
          </div>
        </div>
      );
    }
  }
}

