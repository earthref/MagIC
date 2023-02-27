import _ from 'lodash';
import React from 'react';

import { portals } from '/lib/configs/portals';
import Clamp from '/client/modules/common/components/clamp';
import SearchPlot from '/client/modules/magic/containers/search_plot';

const locationsRe = new RegExp(`LO:_(.*?)_(SI:|CO:|TY:|\.png)`);
const sitesRe = new RegExp(`SI:_(.*?)_(SA:|CO:|TY:|\.png)`);
const samplesRe = new RegExp(`SA:_(.*?)_(SP:|CO:|TY:|\.png)v`);
const specimensRe = new RegExp(`SP:_(.*?)_(CO:|TY:|\.png)`);
const typeRe = new RegExp(`_TY:_(.*?)_?(\.png)`);

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeFiles: []
    };
  }

  componentDidMount(){
    Meteor.call('magicGetPmagPyPlotFiles', 16705, 'rminnett', undefined, (function (error, allFiles) {
      const files = {};
      allFiles.forEach(x => {
        if (x && x.length > 10 && x.slice(x.length - 10, x.length).toLowerCase() === '.thumb.png') {
          const file = x.slice(0, x.length - 10) + '.png';
          files[file] = files[file] || {};
          files[file].thumbnail = x;
        } else if (x && x.length > 4 && x.slice(x.length - 4, x.length).toLowerCase() === '.png') {
          files[x] = files[x] || {};
          files[x].full = x;
        }
      });
      this.setState({ activeFiles: _.values(files) });
    }).bind(this));
  }

  fileToRowName(file) {
    const locationsMatch = file.match(locationsRe);
    const sitesMatch = file.match(sitesRe);
    const samplesMatch = file.match(samplesRe);
    const specimensMatch = file.match(specimensRe);
    if (specimensMatch && specimensMatch.length >= 1 && specimensMatch[1] !== '') { return specimensMatch[1]; }
    else if (samplesMatch && samplesMatch.length >= 1 && samplesMatch[1] !== '') { return samplesMatch[1]; }
    else if (sitesMatch && sitesMatch.length >= 1 && sitesMatch[1] !== '') { return sitesMatch[1]; }
    else if (locationsMatch && locationsMatch.length >= 1 && locationsMatch[1] !== '') { return locationsMatch[1]; }
    return 'Contribution';
    }
  
  render() {

    let plotSize = 100;

    const containerStyle = {position:'relative', boxSizing:'content-box', minHeight: plotSize - 2, maxHeight: plotSize - 2, minWidth: plotSize - 2, maxWidth: plotSize - 2, marginRight:'1rem', marginBottom: 5, fontSize:'small', color:'#AAAAAA', textAlign:'center', overflow:'hidden', textOverflow:'ellipsis', border:'1px solid rgba(0,0,0,.1)'};
    const thumbnailContainerStyle = _.extend({}, containerStyle, {display: 'flex'});
    const thumbnailStyle = {maxWidth: plotSize - 22, maxHeight: plotSize - 22, margin:'10px', objectFit:'contain'};
    const loadingStyle = {minHeight: plotSize - 2, maxHeight: plotSize - 2, minWidth: plotSize - 2, maxWidth: plotSize - 2, padding: 0};
    const modalStyle = _.extend({}, thumbnailContainerStyle, {margin:'0 1rem 2rem 0', overflow:'visible'});

    return (
      <div style={_.extend({backgroundColor: '#FFFFFF'}, this.props.style)}>
        <div style={{ textAlign: 'left', padding: '.5rem', borderBottom: '1px solid #D4D4D5' }}>
          <div className="ui small basic compact buttons">
            <div className="ui active button" style={{cursor: 'default'}}>
              <span style={{ fontWeight: 'bold', color: portals['MagIC'].color }}>
                Plot Types:
              </span>
            </div>
            <div 
              className={"ui button"}
            >
              <span style={{fontWeight: 'bold', color: portals['MagIC'].color}}>
                Hysteresis Loops
              </span>
              <div 
                className={"ui horizontal label"}
                style={{ margin: '-1rem -.75rem -1rem 0.75rem', padding: '.2rem .5rem', minWidth: 0, color: portals['MagIC'].color }}
              >
                110
              </div>
            </div>
            <div 
              className={"ui button active"}
            >
              <span style={{fontWeight: 'bold', color: 'inherit'}}>
                Backfield Curves
              </span>
              <div 
                className={"ui horizontal label basic"}
                style={{ margin: '-1rem -.75rem -1rem 0.75rem', padding: '.2rem .5rem', minWidth: 0, color: 'inherit' }}
              >
                55
              </div>
            </div>
            <div 
              className={"ui button active"}
            >
              <span style={{fontWeight: 'bold', color: 'inherit'}}>
                x-T curves
              </span>
              <div 
                className={"ui horizontal label basic"}
                style={{ margin: '-1rem -.75rem -1rem 0.75rem', padding: '.2rem .5rem', minWidth: 0, color: 'inherit' }}
              >
                10
              </div>
            </div>
            <div 
              className={"ui button active"}
            >
              <span style={{fontWeight: 'bold', color: 'inherit'}}>
                FC-ZFC Curves
              </span>
              <div 
                className={"ui horizontal label basic"}
                style={{ margin: '-1rem -.75rem -1rem 0.75rem', padding: '.2rem .5rem', minWidth: 0, color: 'inherit' }}
              >
                34
              </div>
            </div>
          </div>
        </div>
        <table style={{
          margin: -1,
          height: 500
        }}><tr><td style={{
          padding: 0,
          width: '50%'
        }}>
          <div className="image content" style={{display:'flex', position:'relative', flexWrap:'wrap', alignContent:'flex-start', padding:'.5rem', overflowY:'scroll', height:'100%' }}>
            {this.state.activeFiles.map((f, i) => 
              <div key={`${i}`} style={modalStyle}>
                <a href="#" onClick={() => this.setState({ file: f })} style={{display:'flex', maxWidth: plotSize, maxHeight: plotSize, margin: 'auto'}}>
                  <SearchPlot style={thumbnailStyle} loadingStyle={loadingStyle} file={f.thumbnail || f.full}/>
                </a>
                <div className="ui bottom attached mini label" style={{ boxSizing:'border-box', zIndex: 1000, width:'calc(100% + 2px)', margin: '1px -1px -1rem -1px', lineHeight: '1rem', padding: '0 .25rem', border:'1px solid rgba(0,0,0,.1)', whiteSpace:'nowrap', direction:'rtl' }}>
                  <Clamp lines={1} ><span>{this.fileToRowName(f.thumbnail || f.full)}</span></Clamp>
                </div>
              </div>
            )}
          </div>
        </td>
        <td style={{
          padding: 0,
          width: '50%'
        }}>
          <img src="https://s3.amazonaws.com/magic-plots/16705/LO:_b12_30M_SI:_b12_30M_SA:_b12_30M_SP:_b12_30_AlMg_100h_375_02_TY:_hyst_.png"/>
        </td></tr></table>
      </div>
    );
  }

}