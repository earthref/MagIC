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
      maxVisible: 10,
      level: undefined,
      type: undefined
    };
    this.levels = [
      'Contribution',
      'Locations',
      'Sites',
      'Samples',
      'Specimens',
      'Other'
    ]
  }

  showPlots() {
    $(this.refs['plots modal']).modal({ onVisible: () => this.setState({modal: true}) });
    $(this.refs['plots modal']).modal('show');
  }

  filesToLevels() {
    const { files, location, site, sample, specimen } = this.props;
    const cleanLocation = location && location.replace(':', '') || '';
    const cleanSite = site && site.replace(':', '') || '';
    const cleanSample = sample && sample.replace(':', '') || '';
    const cleanSpecimen = specimen && specimen.replace(':', '') || '';
    const types = {
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
    const locationsRe = new RegExp(`/LO:_(.*?)_`);
    const sitesRe = new RegExp(`_SI:_(.*?)_`);
    const samplesRe = new RegExp(`_SA:_(.*?)_`);
    const specimensRe = new RegExp(`_SP:_(.*?)_`);
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
            else { levels[level]['Other'].push(file); }
            levels[level].count++;
          } else {
            console.error('No type found', file);
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
    const containerStyle = {position: 'relative', minWidth: 100, maxWidth: 100, marginRight: '1em', marginBottom: 5, fontSize:'small', color:'#AAAAAA', textAlign:'center', overflow:'hidden', textOverflow:'ellipsis'};
    const modalStyle = {position: 'relative', minWidth: 100, marginRight: '1em', fontSize:'small', color:'#AAAAAA', textAlign:'center', overflow:'hidden', textOverflow:'ellipsis'};
    const thumbnailStyle = {minHeight: 100, maxHeight: 100, marginLeft: 'auto'};
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
          <a href="#" onClick={this.showPlots.bind(this)}>
            <SearchPlot style={thumbnailStyle} id={id}
              file={this.state.file || (levels[activeLevel] && levels[activeLevel][activeType] && levels[activeLevel][activeType][0])}
            />
            <div className="ui top right attached small basic label" style={{ padding: '.5em' }}>
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
            <div className="header actions" style={{ textAlign: 'left', padding: '.5rem' }}>
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
                    onClick={() => this.setState({ level, file: undefined, maxVisible: 10 })}
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
            <div className="image content">
              <SearchPlot
                download
                id={id} 
                style={{position: 'relative', minHeight: 'calc(100vh - 500px)', maxHeight: 'calc(100vh - 500px)', margin: 'auto'}} 
                file={this.state.file || (levels[activeLevel] && levels[activeLevel][activeType] && levels[activeLevel][activeType][0])}
              />
            </div>
            <div className="actions" style={{ textAlign: 'left', padding: '.5rem' }}>
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
                    onClick={() => this.setState({ type, file: undefined, maxVisible: 10 })}
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
            <div className="actions" style={{display: 'flex', overflowX: 'scroll', minHeight: 'calc(100px + 2rem)' }}>
              {this.state.modal && levels[activeLevel] && levels[activeLevel][activeType].slice(0, this.state.maxVisible).map((file, i) => 
                <div key={i} style={modalStyle}>
                  <a href="#" onClick={() => this.setState({ file })}>
                    <SearchPlot
                      style={_.extend({}, thumbnailStyle, (this.state.file && this.state.file === file) || (!this.state.file && i === 0) ? { borderWidth: 2, borderColor: portals['MagIC'].color } : {})}
                      id={id}
                      file={file}
                    />
                  </a>
                </div>
              )}
              {levels[activeLevel] && levels[activeLevel][activeType] && levels[activeLevel] && levels[activeLevel][activeType].length > this.state.maxVisible && 
                <a style={{minWidth: 100, lineHeight: '1.25em', fontWeight: 'bold', textAlign: 'center'}} href="#" onClick={() => this.setState({ maxVisible: this.state.maxVisible + 10 })}>
                  <br/>Load<br/>Plots<br/>
                  {this.state.maxVisible + 1} - {Math.min(levels[activeLevel] && levels[activeLevel][activeType].length, this.state.maxVisible + 10)}
                  <br/>of {levels[activeLevel] && levels[activeLevel][activeType].length}
                </a>
              }
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

