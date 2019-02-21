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
      maxVisible: 0,
      level: undefined,
      type: undefined
    };
    this.visibleIncrement = 50;
    this.levels = [
      'Contribution',
      'Locations',
      'Sites',
      'Samples',
      'Specimens',
      'Other'
    ];
    this.fileIdx = undefined;
    this.prevFile = undefined;
    this.nextFile = undefined;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyDown);
  }
  
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(e) {
    const { file, maxVisible } = this.state
    // left/right arrow keystroke should select next/previous plot
    if ($(this.refs['plots modal']).modal('is active') && file && this.fileIdx >= 0) {
      if (this.prevFile && e.keyCode === 37) {
        const newMaxVisible = Math.max(maxVisible, Math.ceil(this.fileIdx/this.visibleIncrement)*this.visibleIncrement);
        this.setState({ file: this.prevFile, maxVisible: (!isNaN(newMaxVisible) && newMaxVisible) || maxVisible });
      } else if (this.nextFile && e.keyCode === 39) {
        const newMaxVisible = Math.max(maxVisible, Math.ceil(this.fileIdx/this.visibleIncrement)*this.visibleIncrement);
        this.setState({ file: this.nextFile, maxVisible: (!isNaN(newMaxVisible) && newMaxVisible) || maxVisible });
      }
    }
  }

  showPlots() {
    $(this.refs['plots modal']).modal({ observeChanges: true, onVisible: () => this.setState({modal: true, maxVisible: this.visibleIncrement}) });
    $(this.refs['plots modal']).modal('show');
  }

  filesToLevels() {
    const { files, location, site, sample, specimen } = this.props;
    const cleanLocation = location && location.replace(':', '') || '';
    const cleanSite = site && site.replace(':', '') || '';
    const cleanSample = sample && sample.replace(':', '') || '';
    const cleanSpecimen = specimen && specimen.replace(':', '') || '';
    const types = {
      'Pole Map': [],
      'VGP Map': [],
      'Equal Area': [],
      'Zijderveld': [],
      'Arai': [],
      'Demagnetization': [],
      'Deremagnetization': [],
      'Anisotropy': [],
      'Other': [],
      count: 0
    };
    const levels = {};
    this.levels.forEach(level => levels[level] =  _.cloneDeep(types));
    const locationsRe = new RegExp(`LO:_(.*?)_`);
    const sitesRe = new RegExp(`SI:_(.*?)_`);
    const samplesRe = new RegExp(`SA:_(.*?)_`);
    const specimensRe = new RegExp(`SP:_(.*?)_`);
    const typeRe = new RegExp(`_TY:_(.*?)_`);
    files && _.forEach(files, file => {
      try {
        let level = 'Contribution';
        const locationsMatch = file.match(locationsRe);
        const sitesMatch = file.match(sitesRe);
        const samplesMatch = file.match(samplesRe);
        const specimensMatch = file.match(specimensRe);
        if (specimensMatch && specimensMatch.length >= 1 && specimensMatch[1] !== '') { level = 'Specimens'; }
        else if (samplesMatch && samplesMatch.length >= 1 && samplesMatch[1] !== '') { level = 'Samples'; }
        else if (sitesMatch && sitesMatch.length >= 1 && sitesMatch[1] !== '') { level = 'Sites'; }
        else if (locationsMatch && locationsMatch.length >= 1 && locationsMatch[1] !== '') { level = 'Locations'; }

        if (
          (!specimen || !specimensMatch || !specimensMatch.length >= 1 || specimensMatch[1] === '' || specimensMatch[1] === cleanSpecimen) &&
          (!sample || !samplesMatch || !samplesMatch.length >= 1 || samplesMatch[1] === '' || samplesMatch[1] === cleanSample) &&
          (!site || !sitesMatch || !sitesMatch.length >= 1 || sitesMatch[1] === '' || sitesMatch[1] === cleanSite) &&
          (!location || !locationsMatch || !locationsMatch.length >= 1 || locationsMatch[1] === '' || locationsMatch[1] === cleanLocation)
        ) {
          const typeMatch = file.match(typeRe);
          if (typeMatch && typeMatch.length >= 1) {
            if (typeMatch[1] === 'eqarea') { levels[level]['Equal Area'].push(file); }
            else if (typeMatch[1] === 'zijd') { levels[level]['Zijderveld'].push(file); }
            else if (typeMatch[1] === 'arai') { levels[level]['Arai'].push(file); }
            else if (typeMatch[1] === 'demag') { levels[level]['Demagnetization'].push(file); }
            else if (typeMatch[1] === 'deremag') { levels[level]['Deremagnetization'].push(file); }
            else if (typeMatch[1].substr(0,5) === 'aniso') { levels[level]['Anisotropy'].push(file); }
            else if (typeMatch[1].substr(0,4) === 'POLE') { levels[level]['Pole Map'].push(file); }
            else if (typeMatch[1].substr(0,3) === 'VGP') { levels[level]['VGP Map'].push(file); }
            else { levels[level]['Other'].push(file); }
            levels[level].count++;
          } else {
            console.error('No type found', file);
            levels[level]['Other'].push(file);
            levels[level].count++;
          }
        }
      } catch (e) {
        console.error(e);
      }
    });
    return levels;
  }

  render() {
    const { id, error, files, citation, location, site, sample, specimen } = this.props;
    const { level, type } = this.state;
    const containerStyle = {position:'relative', minHeight: 100, maxHeight: 100, minWidth: 100, maxWidth: 100, marginRight:'1em', marginBottom: 5, fontSize:'small', color:'#AAAAAA', textAlign:'center', overflow:'hidden', textOverflow:'ellipsis', border:'.5px solid grey'};
    const thumbnailStyle = {maxWidth: 100, maxHeight: 100, margin:'auto'};
    const modalStyle = _.extend({}, containerStyle, {minHeight: 150, maxHeight: 150, minWidth: 150, maxWidth: 150, margin:'0 1em 1em 0'});
    const modalThumbnailStyle = _.extend({}, thumbnailStyle, {maxWidth: 150, maxHeight: 150});
    const levels = this.filesToLevels();

    const activeLevel = 
      (levels[level] && levels[level].count && level) ||
      (!location && !site && !sample && !specimen && levels['Contribution'] && levels['Contribution'].count && 'Contribution') ||
      (!site && !sample && !specimen && levels['Locations'] && levels['Locations'].count && 'Locations') ||
      (!sample && !specimen && levels['Sites'] && levels['Sites'].count && 'Sites') ||
      (!specimen && levels['Samples'] && levels['Samples'].count && 'Samples') ||
      (levels['Specimens'] && levels['Specimens'].count && 'Specimens') ||
      _.reduce(this.levels, (x, level) => x || (levels[level].count && level), '');
    const activeType = (levels[activeLevel] && levels[activeLevel][type] && levels[activeLevel][type].length && type) ||
      _.reduce(_.keys(levels[activeLevel]), (x, type) => x || (type !== 'count' && levels[activeLevel][type].length && type), '');
    
    if (levels[activeLevel] && levels[activeLevel][activeType] && levels[activeLevel][activeType].length) {
      this.fileIdx  = _.indexOf(levels[activeLevel][activeType], this.state.file);
      this.prevFile = this.fileIdx > 0 && levels[activeLevel][activeType][this.fileIdx - 1];
      this.nextFile = this.fileIdx < levels[activeLevel][activeType].length - 1 && levels[activeLevel][activeType][this.fileIdx + 1];
    }

    const count = _.reduce(_.keys(levels), (x, level) => x + levels[level].count, 0);

    if (error) {
      return (
        <div style={containerStyle}>
          <br/>Error<br/>Retrieving<br/><b>Plots</b><br/><br/>
        </div>
      );
    }
    else if (count) {
      return (
        <div style={containerStyle}>
          <a href="#" onClick={this.showPlots.bind(this)} style={{display: 'flex'}}>
            <SearchPlot style={thumbnailStyle} id={id}
              file={this.state.file || (levels[activeLevel] && levels[activeLevel][activeType] && levels[activeLevel][activeType][0])}
            />
            <div className="ui top right attached small basic label" style={{ padding:'.5em', margin:'-.5px' }}>
              <span style={{ color: portals['MagIC'].color }}>
                { count }
              </span>
            </div>
          </a>
          <div ref="plots modal" className="ui fullscreen modal">
            <i className="close icon"></i>
            <div className="header">
              { specimen || sample || site || location || citation } PmagPy Plots
            </div>
            <div className="header actions" style={{ textAlign: 'left', padding: '.5em' }}>
              <div className="ui small basic compact buttons">
                <div className="ui active button" style={{cursor: 'default'}}>
                  <span style={{ fontWeight: 'bold', color: portals['MagIC'].color }}>
                    Data Model Level:
                  </span>
                </div>
                { this.levels.map((level, idx) => levels[level].count && 
                  <div
                    className={"ui button" + (level === activeLevel ? " active" : "")}
                    key={idx}
                    style={type === activeType ? {cursor: 'default'} : {}}
                    onClick={() => this.setState({ level, file: undefined, maxVisible: this.visibleIncrement })}
                  >
                    <span style={{fontWeight: 'bold'}}>
                      { level }
                    </span>
                    <div 
                      className={"ui horizontal label" + (level === activeLevel ? " basic" : "")}
                      style={{ margin: '-1em -.75em -1em 0.75em', padding: '.2em .5em', minWidth: 0 }}
                    >
                      { levels[level].count }
                    </div>
                  </div> || undefined
                )}
              </div>
            </div>
            <div className="image content" style={{display:'flex', position:'relative', flexWrap:'wrap', alignContent:'flex-start', padding:'.5em', overflowY:'scroll', height:'calc(100vh - 275px)' }}>
              {!this.state.file && this.state.modal && levels[activeLevel] && levels[activeLevel][activeType].slice(0, this.state.maxVisible).map((file, i) => 
                <div key={`${activeLevel} ${activeType} ${i}`} style={modalStyle}>
                  <a href="#" onClick={() => this.setState({ file })} style={{display:'flex', width:'150px', height:'150px'}}>
                    <SearchPlot id={id} style={modalThumbnailStyle} file={file} />
                  </a>
                </div>
              )}
              {!this.state.file && this.state.maxVisible && levels[activeLevel] && levels[activeLevel][activeType] && levels[activeLevel][activeType].length > this.state.maxVisible && 
                <a style={{minWidth: 100, lineHeight: '1.25em', fontWeight: 'bold', textAlign: 'center'}} href="#" onClick={() => this.setState({ maxVisible: this.state.maxVisible + this.visibleIncrement })}>
                  <br/>Load<br/>Plots<br/>
                  {this.state.maxVisible + 1} - {Math.min(levels[activeLevel] && levels[activeLevel][activeType].length, this.state.maxVisible + this.visibleIncrement)}
                  <br/>of {levels[activeLevel] && levels[activeLevel][activeType].length}
                </a>
              }
              {this.state.file && 
                <div style={{display:'flex', position:'absolute', top: 0, right: 0, bottom: 0, left: 0, padding:'2em 4em 2em'}}>
                  <SearchPlot style={{display:'flex', height:'100%', width:'100%', margin:0}} id={id} file={this.state.file} download={true}/>
                  <a href="#" onClick={() => this.setState({file: undefined})} style={{position:'absolute', right:'1em', top:'1em', zIndex:1000}}>
                    <i className="ui large close icon"/>
                  </a>
                  {this.prevFile &&
                    <a href="#" onClick={() => this.setState({file: this.prevFile})} style={{position:'absolute', left:'1em', top:'50%', marginTop:'-.75em', zIndex:1000}}>
                      <i className="ui large left arrow icon"/>
                    </a>
                  }
                  {this.nextFile &&
                    <a href="#" onClick={() => this.setState({file: this.nextFile})} style={{position:'absolute', right:'1em', top:'50%', marginTop:'-.75em', zIndex:1000}}>
                      <i className="ui large right arrow icon"/>
                    </a>
                  }
                </div>
              }
            </div>
            <div className="actions" style={{ textAlign: 'left', padding: '.5em' }}>
              <div className="ui small basic compact buttons">
                <div className="ui active button" style={{cursor: 'default'}}>
                  <span style={{ fontWeight: 'bold', color: portals['MagIC'].color }}>
                    { activeLevel } Level Plot Types:
                  </span>
                </div>
                { _.keys(levels[activeLevel]).map((type, idx) => levels[activeLevel][type].length &&
                  <div 
                    className={"ui button" + (type === activeType ? " active" : "")}
                    key={idx}
                    style={type === activeType ? {cursor: 'default'} : {}}
                    onClick={() => this.setState({ type, file: undefined, maxVisible: this.visibleIncrement })}
                  >
                    <span style={{fontWeight: 'bold'}}>
                      { type }
                    </span>
                    <div 
                      className={"ui horizontal label" + (type === activeType ? " basic" : "")}
                      style={{ margin: '-1em -.75em -1em 0.75em', padding: '.2em .5em', minWidth: 0 }}
                    >
                      { levels[activeLevel][type].length }
                    </div>
                  </div> || undefined
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
    else if (files && (files.length === 0 || count === 0)) {
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

