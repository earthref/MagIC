import _ from 'lodash';
import numeral from 'numeral';
import moment from 'moment';
import request from 'request';
import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import saveAs from 'save-as';

import Clamp from '/client/modules/common/components/clamp';
import ParseContribution from '/lib/modules/magic/parse_contribution.js';
import ExportContribution from '/lib/modules/magic/export_contribution.js';
import GoogleStaticMap from '/client/modules/common/components/google_static_map';
import GoogleMap from '/client/modules/common/components/google_map';
import SearchPlotThumbnail from '/client/modules/magic/containers/search_plot_thumbnail';
import {index} from '/lib/configs/magic/search_levels.js';

class SearchSummariesListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loadMap: false
    };
    this.styles = {
      a: {cursor: 'pointer', color: '#792f91'}
    }
  }

  componentDidMount() {
    $(this.refs['accordion']).accordion({
      exclusive: false,
      selector: { trigger: '.accordion-trigger'}
    });
  }

  showData() {
    /*$(this.refs['data modal']).modal('show');
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();*/
  }

  showMap(e) {
    this.setState({loadMap: true}, () => 
      $(this.refs['map modal']).modal('show')
    );
  }
  
  renderTitle(item) {
    let title = '';
    if (this.props.table === 'contribution' && item.summary && item.summary.contribution && item.summary.contribution._reference) {
      title = item.summary.contribution._reference.title;
    }
    if (this.props.table === 'locations' && item.summary && item.summary._all) {
      if (item.summary._all.location) title += ' ⇒ <b>' + item.summary._all.location[0] + '</b>';
    }
    if (this.props.table === 'sites' && item.summary && item.summary._all) {
      if (item.summary._all.location) title += ' ⇒ ' + item.summary._all.location[0];
      if (item.summary._all.site) title += ' ⇒ <b>' + item.summary._all.site[0] + '</b>';
    }
    if (this.props.table === 'samples' && item.summary && item.summary._all) {
      if (item.summary._all.location) title += ' ⇒ ' + item.summary._all.location[0];
      if (item.summary._all.site) title += ' ⇒ ' + item.summary._all.site[0];
      if (item.summary._all.sample) title += ' ⇒ <b>' + item.summary._all.sample[0] + '</b>';
    }
    if (this.props.table === 'specimens' && item.summary && item.summary._all) {
      if (item.summary._all.location) title += ' ⇒ ' + item.summary._all.location[0];
      if (item.summary._all.site) title += ' ⇒ ' + item.summary._all.site[0];
      if (item.summary._all.sample) title += ' ⇒ ' + item.summary._all.sample[0];
      if (item.summary._all.specimen) title += ' ⇒ <b>' + item.summary._all.specimen[0] + '</b>';
    }
    if (this.props.table === 'experiments' && item.summary && item.summary._all) {
      if (item.summary._all.location) title += ' ⇒ ' + item.summary._all.location[0];
      if (item.summary._all.site) title += ' ⇒ ' + item.summary._all.site[0];
      if (item.summary._all.sample) title += ' ⇒ ' + item.summary._all.sample[0];
      if (item.summary._all.specimen) title += ' ⇒ ' + item.summary._all.specimen[0];
      if (item.summary._all.experiment) title += ' ⇒ <b>' + item.summary._all.experiment[0] + '</b>';
    }
    return <div style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}} dangerouslySetInnerHTML={{__html: title}}/>;
  }

  renderDownloadButton(item) {
    if (this.props.table !== 'contribution') return undefined;
    let id = item.summary && item.summary.contribution && item.summary.contribution.id;
    let _is_activated = item.summary && item.summary.contribution && item.summary.contribution._is_activated === "true";
    return (
      <div style={{minWidth: 100, maxWidth: 100, marginRight: '1em', marginBottom: 5}}>
        {id && _is_activated &&
        <a
          href={`//earthref.org/MagIC/download/${id}/magic_contribution_${id}.txt`}
          download
        ><button
          className="ui basic tiny fluid compact icon header purple button"
          style={{padding: '20px 0', height: '100px'}}
        >
          <i className="ui file text outline icon"/> Download
        </button></a>}
        {id && !_is_activated && 
        <button type="submit" className="ui basic tiny fluid compact icon header purple button"
          style={{padding: '20px 0', height: '100px'}} onClick={function (id, e) {
            Meteor.call('magicGetPrivateContribution', id, '@' + Cookies.get('user_id'), function (id, error, source) {
              if (source) {
                let blob = new Blob([source], {type: "text/plain;charset=utf-8"});
                saveAs(blob, 'magic_contribution_' + id + '.txt');
              } else {
                Meteor.call('esGetContribution', {index, id}, function (id, error, c) {
                  if (!error && c) {
                    const exporter = new ExportContribution({});
                    let blob = new Blob([exporter.toText(c)], {type: "text/plain;charset=utf-8"});
                    saveAs(blob, 'magic_contribution_' + id + '.txt');
                  } else {
                    console.error(error);
                    alert('Failed to find the contribution for download. Please try again soon or email MagIC using the link at the bottom of this page.');
                  }
                }.bind(this, id));
              }
            }.bind(this, id));
          }.bind(this, id)}>
            <i className="ui file text outline icon"/> Download
          </button>}
        {!id &&
        <button className="ui basic tiny fluid compact icon header purple disabled button" style={{padding:'20px 0', height:'100px'}}>
          <i className="ui file text outline icon"/> Download
        </button>}
      </div>
    );
  }

  renderLinks(item) {
    if (this.props.table !== 'contribution') return undefined;
    let _is_activated = item.summary && item.summary.contribution && item.summary.contribution._is_activated === "true";
    let _has_data_doi = item.summary && item.summary.contribution && item.summary.contribution._has_data_doi === "true";
    let id            = item.summary && item.summary.contribution && item.summary.contribution.id;
    let doi           = item.summary && item.summary.contribution && item.summary.contribution._reference && item.summary.contribution._reference.doi;
    return (
      <div style={{minWidth: 175, maxWidth: 175, marginRight: '1em', marginBottom: 5, fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
        {id &&
        <span>
          <b>MagIC Contribution Link:</b>
          <p>{_is_activated ?
            <a style={this.styles.a} href={'https://earthref.org/MagIC/' + id} target="_blank">{'earthref.org/MagIC/' + id}</a> :
            <span>{'earthref.org/MagIC/' + id}</span>
          }</p>
        </span>}
        {id && item.summary && item.summary.contribution && item.summary.contribution._reference && item.summary.contribution._reference.title && item.summary.contribution._reference.long_authors && 
        <span>
          <b>EarthRef Data DOI Link:</b>
          <p>{_is_activated ?
            (_has_data_doi ? 
              <a style={this.styles.a} href={'http://dx.doi.org/10.7288/V4/MAGIC/' + id} target="_blank">{'10.7288/V4/MAGIC/' + id}</a> : 
              <span>Queued For Creation</span>
             ) :
            <span>Created Upon Activation</span>
          }</p>
        </span>}
        {doi &&
        <span>
          <b>Publication DOI Link:</b>
          <Clamp lines={1}><a style={this.styles.a} href={'https://dx.doi.org/' + doi} target="_blank">{doi}</a></Clamp>
        </span>}
      </div>
    );
  }

  renderCounts(item) {
    let counts = [];
    let labels = [];
    ['Location', 'Site', 'Sample', 'Specimen', 'Experiment'].forEach(label => {
      let level = label.toLowerCase() + 's';
      let name = label.toLowerCase();
      if (item.summary && item.summary._all && item.summary._all['_n_' + level]) {
        let count = item.summary._all['_n_' + level];
        counts.push(count);
        labels.push(label + (count !== 1 ? 's' : ''));
      } else if (item.summary && item.summary._all && item.summary._all[name] && item.summary._all[name].length) {
        let count = item.summary._all[name].length;
        counts.push(count);
        labels.push(label + (count !== 1 ? 's' : ''));
      }
    });
    if (item.summary && item.summary._all && item.summary._all._n_measurements) {
      let count = item.summary._all._n_measurements;
      counts.push(count);
      labels.push('Measurement' + (count !== 1 ? 's' : ''));
    }
    return (
      <div style={{minWidth: 135, maxWidth: 135, marginRight: '1em', marginBottom: 5, fontSize:'small', lineHeight:1}}>
        <table><tbody>
          {counts.map((count, i) => {
            return (
              <tr key={i}>
                <td style={{textAlign: 'right'}}>
                  {numeral(count).format('0 a')}
                </td>
                <td>
                  &nbsp;{labels[i]}
                </td>
              </tr>
            );
          })}
        </tbody></table>
      </div>
    );
  }

  renderQueuedForIndex(item) {
    return (
      <div style={{minWidth: 200, maxWidth: 200, marginRight: '1em', marginBottom: 5, fontSize:'small', color:'#AAAAAA', textAlign:'left', overflow:'hidden', textOverflow:'ellipsis'}}>
        <br/><b>Queued for Indexing</b><br/>Data are available for<br/>downloading and in<br/>the "Rows" sub-tabs.
      </div>
    );
  }

  renderMapThumbnail(item) {

    let paths = [];

    let tableSummary = item.summary && item.summary[this.props.table];
    let allSummary   = item.summary && item.summary._all;

    if (tableSummary && (tableSummary._geo_envelope || tableSummary._geo_point)) {
      if (tableSummary._geo_envelope) 
        _.sortedUniqBy(
          _.sortBy(tableSummary._geo_envelope, 
            x => _.flatten(x.coordinates).join('_')),
          x => _.flatten(x.coordinates).join('_'))
        .forEach(envelope => {
          paths.push({
            lat_s: envelope.coordinates[0][1],
            lat_n: envelope.coordinates[1][1],
            lon_w: envelope.coordinates[0][0],
            lon_e: envelope.coordinates[1][0]
          });
        });

      if (tableSummary._geo_point) 
        _.sortedUniqBy(
          _.sortBy(tableSummary._geo_point, 
            x => _.flatten(x.coordinates).join('_')),
          x => _.flatten(x.coordinates).join('_'))
        .forEach(point => {
          paths.push({
            lat_s: point.coordinates[1],
            lat_n: point.coordinates[1],
            lon_w: point.coordinates[0],
            lon_e: point.coordinates[0]
          });
        });
    } else if (allSummary) {
      if (allSummary._geo_envelope) 
        _.sortedUniqBy(
          _.sortBy(allSummary._geo_envelope, 
            x => _.flatten(x.coordinates).join('_')),
          x => _.flatten(x.coordinates).join('_'))
        .forEach(envelope => {
          paths.push({
            lat_s: envelope.coordinates[0][1],
            lat_n: envelope.coordinates[1][1],
            lon_w: envelope.coordinates[0][0],
            lon_e: envelope.coordinates[1][0]
          });
        });

      if (allSummary._geo_point) 
        _.sortedUniqBy(
          _.sortBy(allSummary._geo_point, 
            x => _.flatten(x.coordinates).join('_')), 
          x => _.flatten(x.coordinates).join('_'))
        .forEach(point => {
          paths.push({
            lat_s: point.coordinates[1],
            lat_n: point.coordinates[1],
            lon_w: point.coordinates[0],
            lon_e: point.coordinates[0]
          });
        });
    }

    return paths.length > 0 ? (
      <div style={{minWidth: 100, maxWidth: 100, marginRight: '1em', marginBottom: 5}}>
        {paths.length > 0 &&
          <a className="ui tiny image" href="#" onClick={this.showMap.bind(this)}>
            <GoogleStaticMap
              width={100}
              height={100}
              paths={paths}
            />
          </a>}
      </div>
    ) : (
      <div style={{minWidth: 100, maxWidth: 100, marginRight: '1em', marginBottom: 5, fontSize:'small', color:'#AAAAAA', textAlign:'center', overflow:'hidden', textOverflow:'ellipsis'}}>
        <br/>No<br/><b>Geospatial</b><br/>Data<br/><br/>
      </div>
    );

  }

  renderAge(item) {

    let tableSummary = item.summary && item.summary[this.props.table];
    let allSummary   = item.summary && item.summary._all;

    if (!(tableSummary && tableSummary._age_range_ybp) && !(allSummary && allSummary._age_range_ybp)) return (
      <div style={{minWidth: 120, maxWidth: 120, marginRight: '1em', marginBottom: 5, fontSize:'small', color:'#AAAAAA', textAlign:'center', overflow:'hidden', textOverflow:'ellipsis'}}>
        <br/>No<br/><b>Age</b><br/>Data<br/><br/>
      </div>
    );

    let min_ages  = (tableSummary && tableSummary._age_range_ybp && tableSummary._age_range_ybp.range.gte) || (allSummary._age_range_ybp && allSummary._age_range_ybp.range.gte),
        max_ages  = (tableSummary && tableSummary._age_range_ybp && tableSummary._age_range_ybp.range.lte) || (allSummary._age_range_ybp && allSummary._age_range_ybp.range.lte),
        n_ages    = (tableSummary && tableSummary._age_range_ybp && tableSummary._age_range_ybp.n        ) || (allSummary._age_range_ybp && allSummary._age_range_ybp.n),
        age_range;

    if (max_ages >= 1e9) {
      max_ages = numeral(max_ages/1e9).format('0[.]0[00]');
      min_ages = min_ages < 1e5 ? '0' : numeral(min_ages/1e9).format('0[.]0[00]');
      age_range = max_ages === min_ages ? `${max_ages} Ga` : `${min_ages} - ${max_ages} Ga`;
    }
    else if (max_ages >= 1e6) {
      max_ages = numeral(max_ages/1e6).format('0[.]0[00]');
      min_ages = min_ages < 1e3 ? '0' : numeral(min_ages/1e6).format('0[.]0[00]');
      age_range = max_ages === min_ages ? `${max_ages} Ma` : `${min_ages} - ${max_ages} Ma`;
    }
    else if (max_ages >= 1e3) {
      max_ages = numeral(max_ages/1e3).format('0[.]0[00]');
      min_ages = min_ages < 1e1 ? '0' : numeral(min_ages/1e3).format('0[.]0[00]');
      age_range = max_ages === min_ages ? `${max_ages} ka` : `${min_ages} - ${max_ages} ka`;
    }
    else {
      let max_ages_unit = max_ages >= 1949.5 ? 'BC' : 'AD';
      let min_ages_unit = min_ages >= 1949.5 ? 'BC' : 'AD';
      max_ages = max_ages >= 1949.5 ? numeral(max_ages - 1949).format('0[.]0[00]') : numeral(1950 - max_ages).format('0[.]0[00]');
      min_ages = min_ages >= 1949.5 ? numeral(min_ages - 1949).format('0[.]0[00]') : numeral(1950 - min_ages).format('0[.]0[00]');
      age_range = age_range || max_ages_unit === min_ages_unit && max_ages === min_ages && `${max_ages} ${max_ages_unit}`;
      age_range = age_range || max_ages_unit === min_ages_unit && max_ages !== min_ages && `${max_ages} - ${min_ages} ${max_ages_unit}`;
      age_range = age_range || max_ages_unit !== min_ages_unit                          && `${max_ages} ${max_ages_unit} - ${min_ages} ${min_ages_unit}`;
    }

    return (
      <div style={{minWidth: 120, maxWidth: 120, marginRight: '1em', marginBottom: 5, fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
        <b>Age:</b><br/>{age_range}
      </div>
    );
  }

  renderInt(item) {

    let tableSummary = item.summary && item.summary[this.props.table];
    let allSummary   = item.summary && item.summary._all;

    if (!(tableSummary && tableSummary.int_abs) && !(allSummary && allSummary.int_abs)) return (
      <div style={{minWidth: 75, maxWidth: 75, marginRight: '1em', marginBottom: 5, fontSize:'small', color:'#AAAAAA', textAlign:'center', overflow:'hidden', textOverflow:'ellipsis'}}>
        <br/>No<br/><b>Intensity</b><br/>Data<br/><br/>
      </div>
    );

    let min_ints = tableSummary && tableSummary.int_abs && tableSummary.int_abs.range.gte || allSummary.int_abs.range.gte,
        max_ints = tableSummary && tableSummary.int_abs && tableSummary.int_abs.range.lte || allSummary.int_abs.range.lte,
        n_ints   = tableSummary && tableSummary.int_abs && tableSummary.int_abs.n         || allSummary.int_abs.n;
    min_ints = numeral(min_ints*1e9)
      .format('0[.]0[00] a')
      .replace(/b$/, 'T')
      .replace(/m$/, 'mT')
      .replace(/k$/, 'µT')
      .replace(/(\d)\s*$/, '$1 nT');
    max_ints = numeral(max_ints*1e9)
      .format('0[.]0[00] a')
      .replace(/b$/, 'T')
      .replace(/m$/, 'mT')
      .replace(/k$/, 'µT')
      .replace(/(\d)\s*$/, '$1 nT');
    return (
      <div style={{minWidth: 75, maxWidth: 75, marginRight: '1em', marginBottom: 5, fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
        {min_ints === max_ints ?
          <span>
            <b>Int:</b><br/>
            {min_ints}<br/>
            {n_ints ? <span><b>N: </b>{n_ints}</span> : undefined}
          </span>
          :
          <span>
            <b>Min Int:</b><br/>
            {min_ints}<br/>
            <b>Max Int:</b><br/>
            {max_ints}<br/>
            {n_ints ? <span><b>N: </b>{n_ints}</span> : undefined}
          </span>
        }
      </div>
    );
  }

  //renderPole(item) {
  //
  //  if (item.VGP_LAT && item.VGP_LON){
  //    //console.log('pole', item.AVERAGE_LAT, item.AVERAGE_LON);
  //    return (
  //      <span>
  //        <b>Pole:</b><br/>
  //        {item.VGP_LAT < 0 ?
  //        numeral(-item.VGP_LAT).format('0[.]00') + '°S' :
  //        numeral( item.VGP_LAT).format('0[.]00') + '°N'}<br/>
  //        {item.VGP_LON < 0 ?
  //        numeral(-item.VGP_LON).format('0[.]00') + '°W' :
  //        numeral( item.VGP_LON).format('0[.]00') + '°E'}<br/>
  //        {item.VGP_ALPHA95 &&
  //        <b>A<sub>95</sub>: </b>}
  //        {item.VGP_ALPHA95 && numeral( item.VGP_ALPHA95).format('0[.]00')}
  //      </span>
  //    );
  //  }
  //  else return undefined;
  //}

  renderGeo(item) {
    let geologic = ['plate_blocks', 'terranes', 'geological_province_sections', 'tectonic_settings'];
    geologic = _.reduce(geologic, (list, column) => {
      if (item.summary && item.summary._all && item.summary._all[column]) list.push(...item.summary._all[column]);
      return list;
    }, []);
    let geographic = ['continent_ocean', 'country', 'ocean_sea', 'region', 'village_city', 'location', 'location_type', 'location_alternatives'];
    geographic = _.reduce(geographic, (list, column) => {
      if (item.summary && item.summary._all && item.summary._all[column]) list.push(...item.summary._all[column]);
      return list;
    }, []);
    return geologic.length > 0 || geographic.length > 0 ? (
      <div style={{minWidth: 125, maxWidth: 125, marginRight: '1em', marginBottom: 5, fontSize:'small', whiteSpace: 'normal'}}>
        {geologic.length > 0 ?
          <span>
            <b>Geologic:</b>
            <Clamp lines={geographic.length > 0 ? 2 : 5}><span>{geologic.join(', ')}</span></Clamp>
          </span> : undefined}
        {geographic.length > 0 ?
          <span>
            <b>Geographic:</b>
            <Clamp lines={geologic.length > 0 ? 2 : 5}><span>{geographic.join(', ')}</span></Clamp>
          </span> : undefined}
      </div>
    ) : (
      <div style={{minWidth: 125, maxWidth: 125, marginRight: '1em', marginBottom: 5, fontSize:'small', color:'#AAAAAA', textAlign:'center', overflow:'hidden', textOverflow:'ellipsis'}}>
        <br/>No<br/><b>Geographic</b><br/>Data<br/><br/>
      </div>
    );
  }

  renderGeology(item) {
    let geologic_classes = item.summary && item.summary._all && item.summary._all.geologic_classes;
    let geologic_types   = item.summary && item.summary._all && item.summary._all.geologic_types;
    let lithologies      = item.summary && item.summary._all && item.summary._all.lithologies;
    let nDefined = _.without([geologic_classes, geologic_types, lithologies], undefined).length;
    let clampLines = (nDefined === 3 ? 1 : (nDefined === 2 ? 2 : 5));
    return (geologic_classes && geologic_classes.length > 0) ||
      (geologic_types && geologic_types.length > 0) ||
      (lithologies && lithologies.length > 0) ?
    (
      <div style={{minWidth: 125, maxWidth: 125, marginRight: '1em', marginBottom: 5, fontSize:'small', whiteSpace: 'normal'}}>
        {geologic_classes && geologic_classes.length > 0 ?
          <span>
            <b>Class:</b>
            <Clamp lines={clampLines}><span>{geologic_classes.join(', ')}</span></Clamp>
          </span> : undefined}
        {geologic_types && geologic_types.length > 0 ?
          <span>
            <b>Type:</b>
            <Clamp lines={clampLines}><span>{geologic_types.join(', ')}</span></Clamp>
          </span> : undefined}
        {lithologies && lithologies.length > 0 ?
          <span>
            <b>Lithology:</b>
            <Clamp lines={clampLines}><span>{lithologies.join(', ')}</span></Clamp>
          </span> : undefined}
      </div>
    ) : (
      <div style={{minWidth: 125, maxWidth: 125, marginRight: '1em', marginBottom: 5, fontSize:'small', color:'#AAAAAA', textAlign:'center', overflow:'hidden', textOverflow:'ellipsis'}}>
        <br/>No<br/><b>Geologic</b><br/>Data<br/><br/>
      </div>
    );
  }

  renderMethodCodes(item) {
    return item.summary._all && item.summary._all.method_codes && item.summary._all.method_codes.length > 0 ? (
      <div style={{minWidth: 125, maxWidth: 125, marginRight: '1em', marginBottom: 5, fontSize:'small', whiteSpace: 'normal'}}>
        <span>
          <b>Method Codes:</b>
          <Clamp lines={5}><span>{item.summary._all.method_codes.join(', ')}</span></Clamp>
        </span>
      </div>
    ) : (
      <div style={{minWidth: 125, maxWidth: 125, marginRight: '1em', marginBottom: 5, fontSize:'small', color:'#AAAAAA', textAlign:'center', overflow:'hidden', textOverflow:'ellipsis'}}>
        <br/>No<br/><b>Method<br/>Codes</b><br/><br/>
      </div>
    );
  }

  renderCitations(item) {
    return item.summary._all && item.summary._all.citations && _.without(item.summary._all.citations, 'this study', 'This study', 'This Study', 'This study').length > 0 ? (
      <div style={{minWidth: 125, maxWidth: 125, marginRight: '1em', marginBottom: 5, fontSize:'small', whiteSpace: 'normal'}}>
        <span>
          <b>Citations:</b>
          <Clamp lines={5}><span>{_.without(item.summary._all.citations, 'this study', 'This study', 'This Study', 'This study').join(', ')}</span></Clamp>
        </span>
      </div>
    ) : (
      <div style={{minWidth: 125, maxWidth: 125, marginRight: '1em', marginBottom: 5, fontSize:'small', color:'#AAAAAA', textAlign:'center', overflow:'hidden', textOverflow:'ellipsis'}}>
        <br/>No<br/><b>Additional<br/>Citations</b><br/><br/>
      </div>
    );
  }

  render() {
    const item = this.props.item;
    try {
    return (
      <div>
        <div ref="accordion" className={'ui accordion search-summaries-list-item' + (this.props.active && !this.props.collapsed ? ' active' : '')} onMouseOver={(e) => {
          clearTimeout(this.hideAccordionButtonTimeout);
          this.showAccordionButtonTimeout = setTimeout(() => {
            if ($(this.refs['accordion title']).hasClass('active')) {
              $(this.refs['close accordion button']).show();
              $(this.refs['open accordion button']).hide();
            } else {
              $(this.refs['open accordion button']).show();
              $(this.refs['close accordion button']).hide();
            }
          }, 500);
        }} onMouseLeave={(e) => {
          clearTimeout(this.showAccordionButtonTimeout);
          this.hideAccordionButtonTimeout = setTimeout(() => {
            $(this.refs['open accordion button']).hide();
            $(this.refs['close accordion button']).hide();
          }, 500);
        }}>
          <div ref="accordion title" className={'title' + (this.props.active && !this.props.collapsed ? ' active' : '')} style={{padding:'0 0 0 1em'}}>
            <i className="dropdown icon" style={{position:'relative', left:'-1.3rem', top:'-.2rem'}}/>
            <div className="ui grid" style={{marginTop:'-1.5rem', marginBottom: '-.5em'}}>
              <div className="row accordion-trigger" style={{display:'flex', padding:'0 1em 0.5em'}}>
                <span style={{fontSize:'small', fontWeight:'bold'}}>
                  {item.summary.contribution && item.summary.contribution._reference && item.summary.contribution._reference.citation || 'Unknown'}
                  {item.summary.contribution && item.summary.contribution.version && <span>&nbsp;v.&nbsp;{item.summary.contribution.version}</span>}
                </span>
                <span style={{fontSize:'small', flex:'1', height:'1.25em', overflow:'hidden', textOverflow:'ellipsis', margin: '0 0.5em'}}>
                  {this.renderTitle(item)}
                </span>
                <span className="description" style={{fontSize:'small', float:'right', textAlign:'right'}}>
                  {item.summary.contribution && moment.utc(item.summary.contribution.timestamp).local().format('LL')}
                  &nbsp;by&nbsp;
                  <b>{item.summary.contribution && item.summary.contribution._contributor}</b>
                </span>
              </div>
              {item.summary && item.summary._incomplete_summary !== "true" ? 
                <div className="row flex_row" style={{padding:'0', fontWeight:'normal', whiteSpace:'nowrap', display:'flex'}}>
                  {this.renderDownloadButton(item)}
                  {this.renderLinks(item)}
                  {this.renderCounts(item)}
                  {this.renderMapThumbnail(item)}
                  <SearchPlotThumbnail 
                    id={item && item.summary && item.summary.contribution && item.summary.contribution.id}
                    citation={item && item.summary && item.summary.contribution && item.summary.contribution._reference && item.summary.contribution._reference.citation }
                    location={item && item.summary && item.summary.locations && item.summary.locations.location && item.summary.locations.location[0] }
                    site={item && item.summary && item.summary.sites && item.summary.sites.site && item.summary.sites.site[0] }
                    sample={item && item.summary && item.summary.samples && item.summary.samples.sample && item.summary.samples.sample[0] }
                    specimen={item && item.summary && item.summary.specimens && item.summary.specimens.specimen && item.summary.specimens.specimen[0] }
                  />
                  {this.renderGeo(item)}
                  {this.renderGeology(item)}
                  {this.renderAge(item)}
                  {this.renderInt(item)}
                  {this.renderMethodCodes(item)}
                  {this.renderCitations(item)}
                </div>
              :
                <div className="row flex_row" style={{padding:'0', fontWeight:'normal', whiteSpace:'nowrap', display:'flex'}}>
                  {this.renderDownloadButton(item)}
                  {this.renderLinks(item)}
                  {this.renderCounts(item)}
                  {this.renderQueuedForIndex(item)}
              </div>
              }
            </div>
          </div>
          <div className={'content' + (this.props.active && !this.props.collapsed ? ' active' : '')} style={{fontSize: 'small', paddingBottom: 0}}>
            <div dangerouslySetInnerHTML={{__html: item.summary.contribution && item.summary.contribution._reference && item.summary.contribution._reference.html}} />
            <div style={{marginTop:'0.5em'}} dangerouslySetInnerHTML={{__html: item.summary.contribution && item.summary.contribution._reference && item.summary.contribution._reference.abstract_html}} />
            {item.summary.contribution && item.summary.contribution._reference && item.summary.contribution._reference.keywords && item.summary.contribution._reference.keywords.join &&

            <div style={{marginTop:'0.5em'}} dangerouslySetInnerHTML={{__html: '<b>Keywords: </b>' + item.summary.contribution._reference.keywords.join(', ')}} />}
            {item.summary.contribution && item.summary.contribution._reference && item.summary.contribution._reference.keywords && !item.summary.contribution._reference.keywords.join &&
            <div style={{marginTop:'0.5em'}} dangerouslySetInnerHTML={{__html: '<b>Keywords: </b>' + item.summary.contribution._reference.keywords}} />}
            {item.summary.contribution && item.summary.contribution._reference && item.summary.contribution._reference.tags && item.summary.contribution._reference.tags.join &&

            <div style={{marginTop:'0.5em'}} dangerouslySetInnerHTML={{__html: '<b>Tags: </b>' + item.summary.contribution._reference.tags.join(', ')}} />}
            {item.summary.contribution && item.summary.contribution._reference && item.summary.contribution._reference.tags && !item.summary.contribution._reference.tags.join &&
            <div style={{marginTop:'0.5em'}} dangerouslySetInnerHTML={{__html: '<b>Tags: </b>' + item.summary.contribution._reference.tags}} />}
            {item.summary.contribution && item.summary.contribution._reference && item.summary.contribution._reference.n_citations &&

            <div style={{marginTop:'0.5em'}} dangerouslySetInnerHTML={{__html: '<b><a target="_blank" href="https://www.crossref.org" style="color: #792f91">Crossref</a> Citation Count: </b>' + item.summary.contribution._reference.n_citations }} />}

            {this.props.table === 'contribution' && item.summary.contribution && item.summary.contribution._history &&
            <table className="ui very basic compact collapsing table">
              <thead>
              <tr>
                <th style={{whiteSpace: 'nowrap'}}>Download</th>
                <th style={{whiteSpace: 'nowrap'}}>MagIC Contribution Link</th>
                <th style={{whiteSpace: 'nowrap'}}>EarthRef Data DOI Link</th>
                <th style={{whiteSpace: 'nowrap'}}>Version</th>
                <th style={{whiteSpace: 'nowrap'}}>Data Model</th>
                <th style={{whiteSpace: 'nowrap'}}>Date</th>
                <th style={{whiteSpace: 'nowrap'}}>Contributor</th>
                {_.find(item.summary.contribution._history, 'description') && <th style={{whiteSpace: 'nowrap'}}>Description</th>}
              </tr>
              </thead>
              <tbody>
              {item.summary.contribution && item.summary.contribution._history.map((v, i) => {
                let _is_activated = item.summary && item.summary.contribution && item.summary.contribution._is_activated === "true";
                let _has_data_doi = item.summary && item.summary.contribution && item.summary.contribution._has_data_doi === "true";
                return (
                  <tr key={i}>
                    <td style={{whiteSpace: 'nowrap'}}>
                      {v.id && v.id < 16282 &&
                      <form action="//earthref.org/cgi-bin/z-download.cgi" method="post">
                        <input type="hidden" name="file_path" value={`/projects/earthref/local/oracle/earthref/magic/meteor/activated/magic_contribution_${v.id}.txt`}/>
                        <input type="hidden" name="file_name" value={`magic_contribution_${v.id}.txt`}/>
                        <button type="submit" className={'ui basic tiny fluid icon compact purple button'} style={{marginTop:'0'}}>
                          <i className="ui file text outline icon"/> Download
                        </button>
                      </form>}
                      {v.id && v.id >= 16282 &&
                      <a href={`//earthref.org/MagIC/download/${v.id}/magic_contribution_${v.id}.txt`} download>
                        <button
                          className="ui basic tiny fluid compact icon purple button"
                          style={{marginTop:'0'}}
                        >
                          <i className="ui file text outline icon"/> Download
                        </button>
                      </a>}
                      {!v.id &&
                      <button className="ui basic tiny fluid compact icon purple disabled button"
                              style={{marginTop:'0'}}>
                        <i className="ui file text outline icon"/> Download
                      </button>}
                    </td>
                    <td>
                      {(_is_activated || i > 0) &&
                      <a style={this.styles.a}
                         href={'https://earthref.org/MagIC/' + v.id}>{'earthref.org/MagIC/' + v.id}</a>}
                      {(!_is_activated && i == 0) &&
                      <span>{'earthref.org/MagIC/' + v.id}</span>}
                    </td>
                    <td>
                      {_is_activated && _has_data_doi &&
                      <a style={this.styles.a}
                         href={'http://dx.doi.org/10.7288/V4/MAGIC/' + v.id} target="_blank">{'10.7288/V4/MAGIC/' + v.id}</a>}
                      {_is_activated && !_has_data_doi &&
                      <span>Queued For Creation</span>}
                      {!_is_activated &&
                        <span>Created Upon Activation</span>}
                    </td>
                    <td>{v.version}</td>
                    <td>{parseFloat(v.data_model_version).toFixed(1)}</td>
                    <td>{moment(v.timestamp).local().format('LL')}</td>
                    <td>{v.contributor}</td>
                    {_.find(item.summary.contribution._history, 'description') && <td>{v.description}</td>}
                  </tr>
                );
              })}
              </tbody>
            </table>}
            {Cookies.get('user_id') == 'rminnett' && this.props.table === 'contribution' && item.summary.contribution &&
            <table className="ui compact red table">
              <thead>
                <tr>
                  <th style={{whiteSpace: 'nowrap'}}>Developer Tasks</th>
                  <th style={{whiteSpace: 'nowrap'}}></th>
                </tr>
              </thead>
              <tbody>
                {item.summary.contribution._is_activated === 'true' &&
                  <tr>
                    <td style={{whiteSpace: 'nowrap'}}>
                      <button className="ui basic tiny fluid compact red button" style={{marginTop:'0'}} 
                        onClick={function(id, e) {
                          console.log("esDeactivateContribution");
                          Meteor.call("esDeactivateContribution", {index: index, id: id},
                            (error) => { console.log("esDeactivateContribution done"); }
                          );
                        }.bind(this, item.summary.contribution.id)}
                      >
                        Deactivate
                      </button>
                    </td>
                    <td>
                      Deactivate the contribution (contribution and Data DOI links will be broken until activated again).
                    </td>
                  </tr>
                }
                {item.summary.contribution._is_activated !== 'true' &&
                  <tr>
                    <td style={{whiteSpace: 'nowrap'}}>
                      <button className="ui basic tiny fluid compact red button" style={{marginTop:'0'}} 
                        onClick={function(id, e) {
                          console.log("esActivateContribution");
                          Meteor.call("esActivateContribution", {index: index, id: id},
                            (error) => { console.log("esActivateContribution done"); }
                          );
                        }.bind(this, item.summary.contribution.id)}
                      >
                        Force Activate
                      </button>
                    </td>
                    <td>
                      Activate the contribution even if not validated.
                    </td>
                  </tr>
                }
                <tr>
                  <td style={{whiteSpace: 'nowrap'}}>
                    <button className="ui basic tiny fluid compact red button" style={{marginTop:'0'}} 
                      onClick={function(id, contributor, e) {
                        console.log("esUpdatePrivatePreSummaries");
                        Meteor.call("esUpdatePrivatePreSummaries", {index, id, contributor},
                          (error) => { console.log("esUpdatePrivatePreSummaries done"); }
                        );
                      }.bind(this, item.summary.contribution.id, item.summary.contribution.contributor)}
                    >
                      Pre Summary
                    </button>
                  </td>
                  <td>
                    Calculate the contribution pre summary and submit it to Elasticsearch for indexing.
                  </td>
                </tr>
                <tr>
                  <td style={{whiteSpace: 'nowrap'}}>
                    <button className="ui basic tiny fluid compact red button" style={{marginTop:'0'}} 
                      onClick={function(id, contributor, e) {
                        console.log("esUpdatePrivateSummaries");
                        Meteor.call("esUpdatePrivateSummaries", {index, id, contributor},
                          (error) => { console.log("esUpdatePrivateSummaries done"); }
                        );
                      }.bind(this, item.summary.contribution.id, item.summary.contribution.contributor)}
                    >
                      Full Summary
                    </button>
                  </td>
                  <td>
                    Calculate the full contribution summary and submit it to Elasticsearch for indexing.
                  </td>
                </tr>
                {item.summary.contribution && item.summary.contribution._history && item.summary.contribution._history.map((v, i) =>
                  <tr key={i}>
                    <td style={{whiteSpace: 'nowrap'}}>
                      <button className="ui basic tiny fluid compact red button" style={{marginTop:'0'}} 
                        onClick={function(id, e) {
                          console.log("esUploadActivatedContributionToS3");
                          Meteor.call("esUploadActivatedContributionToS3", {index, id},
                            (error) => { console.log("esUploadActivatedContributionToS3 done"); }
                          );
                        }.bind(this,v.id)}
                      >
                        Upload {v.id} to S3
                      </button>
                    </td>
                    <td>
                      Upload the contribution text file to magic-contributions and/or magic-activated-contributions.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>}
          </div>
          <div ref="open accordion button" className="ui grey icon button accordion-button" onClick={(e) => {
            $(this.refs['accordion']).accordion('open', 0);
            $(this.refs['close accordion button']).show();
            $(this.refs['open accordion button']).hide();
          }}>
            <i className="caret down icon"></i>
          </div>
          <div ref="close accordion button" className="ui grey icon button accordion-button" onClick={(e) => {
            $(this.refs['accordion']).accordion('close', 0);
            $(this.refs['open accordion button']).show();
            $(this.refs['close accordion button']).hide();
          }}>
            <i className="caret up icon"></i>
          </div>
          {this.state.loadMap && this.renderMapModal(item)}
        </div>
      </div>
    );
    } catch(e) {
      console.error(e);
    }
  }

  renderMapModal(item) {
    let citation = item.summary && item.summary.contribution && item.summary.contribution._reference && item.summary.contribution._reference.citation;
    let name = item.summary && item.summary.contribution && item.summary.contribution._name;
    return (
      <div ref="map modal" className="ui fullscreen modal">
      <i className="close icon"></i>
      <div className="header">
        {citation || name || "Unnamed"} Map
      </div>
      <GoogleMap style={{width:'100%', height:'calc(100vh - 10em)'}} docs={[item]}/>
    </div>
    );
  }

  renderDataModal() {
    return (
      <div ref="data modal" className="ui fullscreen basic modal">
        <i className="close icon" style={{color: 'white', top:'.5rem', right: '0'}}></i>
        <div className="ui top attached inverted tabular menu">
          <a className="item" href="#">
            Locations
          </a>
          <a className="active item" href="#">
            Sites
          </a>
          <a className="item" href="#">
            Samples
          </a>
          <a className="item" href="#">
            Specimens
          </a>
          <a className="item" href="#">
            Experiments
          </a>
        </div>
        <div className="ui bottom attached segment" style={{overflow:'auto', height:'calc(100vh - 10em)'}}>
          {this.renderData()}
        </div>
      </div>
    );
  }

  renderData() {
    let columns = `site\tlocation\tresult_type\tmethod_codes\tcitations\tgeologic_classes\tgeologic_types\tlithologies\tlat\tlon\tage\tage_sigma\tage_unit\tdir_tilt_correction\tdir_dec\tdir_inc\tdir_alpha95\tdir_k\tdir_n_specimens\tdir_polarity\tdir_nrm_origin\tvgp_lat\tvgp_lon\tvdm\tvdm_n_samples\tvadm\tvadm_n_samples\tint_abs\tint_abs_sigma\tdescription\tsoftware_packages`;
    let data = `01a\tHawaii\t\t\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t
01b\tHawaii\t\t\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t
01c\tHawaii\t\t\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t
2\tHawaii\t\t\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t
01c\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t
2\tHawaii\ti\t:DE-BFL:\t:This study:\t\t\t\t19.552\t204.70\t440\t240\tYears BP\t100\t7.60\t36.6\t1.1\t1662\t12\tn\tp\t82.9\t287.40\t1.06E+23\t4\t1.07E+23\t4\t4.79E-05\t6.00E-07\t2\t:PINT03:
3\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.296\t204.69\t700\t210\tYears BP\t100\t2.80\t41.4\t1.2\t905\t18\tn\tp\t84.8\t234.30\t9.42E+22\t2\t9.97E+22\t2\t4.45E-05\t1.20E-06\t3\t:PINT03:
4\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.494\t204.66\t760\t210\tYears BP\t100\t353.00\t25.8\t1.6\t849\t11\tn\tp\t81.1\t74.50\t1.05E+23\t2\t9.86E+22\t2\t4.41E-05\t8.00E-07\t4\t:PINT03:
5\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.564\t204.66\t1320\t150\tYears BP\t100\t2.20\t18.2\t2.2\t400\t12\tn\tp\t79.6\t12.80\t1.03E+23\t4\t9.27E+22\t4\t4.15E-05\t3.60E-06\t5\t:PINT03:
6\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.533\t204.65\t1690\t210\tYears BP\t100\t355.50\t17.8\t1.9\t679\t10\tn\tp\t78.7\t48.00\t9.71E+22\t4\t8.71E+22\t4\t3.90E-05\t3.10E-06\t6\t:PINT03:
7\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.118\t204.43\t2180\t180\tYears BP\t100\t11.20\t14.7\t2.1\t439\t12\tn\tp\t74.1\t340.00\t1.21E+23\t4\t1.08E+23\t4\t4.81E-05\t1.23E-05\t7\t:PINT03:
8\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.455\t204.71\t2190\t210\tYears BP\t100\t11.30\t15.2\t1.3\t1095\t12\tn\tp\t74\t340.00\t1.21E+23\t4\t1.08E+23\t4\t4.81E-05\t1.23E-05\t8\t:PINT03:
9\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.538\t204.66\t2550\t240\tYears BP\t100\t1.20\t21\t1.5\t987\t12\tn\tp\t81.3\t16.90\t1.07E+23\t4\t9.74E+22\t4\t4.36E-05\t2.30E-06\t9\t:PINT03:
10\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.64\t204.96\t2890\t210\tYears BP\t100\t357.70\t25.7\t2.3\t370\t11\tn\tp\t83.5\t44.90\t1.24E+23\t5\t1.15E+23\t5\t5.17E-05\t1.16E-05\t10\t:PINT03:
11\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.302\t204.69\t3480\t240\tYears BP\t100\t3.70\t36.4\t1.4\t1091\t12\tn\tp\t86.4\t279.50\t1.06E+23\t2\t1.07E+23\t2\t4.79E-05\t1.03E-05\t11\t:PINT03:
12\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.713\t204.88\t4050\t150\tYears BP\t100\t4.50\t33.4\t1.1\t1467\t11\tn\tp\t85.5\t313.10\t1.15E+23\t3\t1.13E+23\t3\t5.06E-05\t1.70E-06\t12\t:PINT03:
13\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.161\t204.46\t5160\t300\tYears BP\t100\t4.70\t27.6\t2\t493\t12\tn\tp\t83.6\t339.20\t8.54E+22\t5\t8.10E+22\t5\t3.61E-05\t2.60E-06\t13\t:PINT03:
14\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.543\t204.88\t5650\t270\tYears BP\t100\t5.40\t33.7\t1.4\t958\t12\tn\tp\t84.8\t305.80\t7.67E+22\t3\t7.57E+22\t3\t3.39E-05\t2.50E-06\t14\t:PINT03:
15\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.086\t204.41\t6160\t330\tYears BP\t100\t357.80\t54.9\t1.7\t819\t12\tn\tp\t73.5\t198.10\t6.41E+22\t2\t7.91E+22\t2\t3.52E-05\t3.50E-06\t15\t:PINT03:
16\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.072\t204.44\t7300\t300\tYears BP\t100\t2.30\t25.4\t1.4\t914\t10\tn\tp\t83.9\t3.00\t6.47E+22\t4\t6.02E+22\t4\t2.70E-05\t2.10E-06\t16\t:PINT03:
17\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.145\t204.48\t7950\t330\tYears BP\t100\t359.50\t33.4\t1.5\t917\t12\tn\tp\t89\t53.10\t6.97E+22\t3\t6.89E+22\t3\t3.07E-05\t1.10E-06\t17\t:PINT03:
18\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.42\t204.66\t8740\t300\tYears BP\t100\t357.30\t36\t2.3\t413\t11\tn\tp\t87.4\t127.20\t9.91E+22\t5\t9.98E+22\t5\t4.46E-05\t6.90E-06\t18\t:PINT03:
19\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.418\t204.66\t9500\t420\tYears BP\t100\t3.00\t33.7\t2.3\t351\t11\tn\tp\t87\t313.60\t9.30E+22\t5\t9.19E+22\t5\t4.11E-05\t4.90E-06\t19\t:PINT03:
20\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t19.101\t204.44\t10290\t450\tYears BP\t100\t3.60\t31.9\t1.8\t570\t12\tn\tp\t86.1\t322.00\t8.26E+22\t5\t8.08E+22\t5\t3.60E-05\t8.40E-06\t20\t:PINT03:
21\tHawaii\ti\t:DE-BFL:\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t18.972\t204.38\t11780\t300\tYears BP\t100\t2.10\t8.7\t1.7\t738\t12\tn\tp\t75.2\t16.20\t8.55E+22\t3\t7.51E+22\t3\t3.34E-05\t5.00E-06\t21\t:PINT03:
22\tHawaii\t\t\t:This study:\t:" Extrusive:Igneous ":\t:Lava Flow:\t:Not Specified:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t
01a\tHawaii\ti\t:DE-BFL:\t:This study:\t\t\t\t19.545\t204.91\t260\t210\tYears BP\t100\t5.50\t41.3\t1.7\t630\t12\tn\tp\t83.4\t254.60\t1.11E+23\t4\t1.17E+23\t4\t5.26E-05\t5.30E-06\t01a\t:PINT03:
01b\tHawaii\ti\t:DE-BFL:\t:This study:\t\t\t\t19.58\t204.94\t260\t210\tYears BP\t100\t3.20\t44.2\t1.4\t906\t12\tn\tp\t83\t229.20\t1.11E+23\t4\t1.17E+23\t4\t5.26E-05\t5.30E-06\t01b\t:PINT03:
01c\tHawaii\ti\t:DE-BFL:\t:This study:\t\t\t\t19.572\t204.94\t260\t210\tYears BP\t100\t3.10\t46\t2.1\t418\t12\tn\tp\t81.7\t224.10\t1.11E+23\t4\t1.17E+23\t4\t5.26E-05\t5.30E-06\t01c\t:PINT03:
22\tHawaii\ti\t:DE-BFL:\t:This study:\t\t\t\t19.072\t204.44\t13210\t570\tYears BP\t100\t357.50\t54.6\t1.4\t916\t11\tn\tp\t73.8\t197.20\t6.93E+22\t4\t8.51E+22\t4\t3.79E-05\t3.40E-06\t22\t:PINT03:`;
    return (
      <table className="ui compact celled striped definition single line table">
        <thead>
        <tr ref="table column headers">
          <th></th>
          {columns.split('\t').map((columnName, i) => {
            return (
              <th key={i}>
                {columnName}
              </th>
            );
          })}
        </tr>
        </thead>
        <tbody>
        {data.split('\n').map((row, i) => {
          return (
            <tr key={i} className={i == 3 || i == 6 || i == 10 ? 'active' : ''}>
              <td className="collapsing right aligned">
                {i + 1}
              </td>
              {(row.split('\t').map((col, j) => {
                return (
                  <td key={j}>{col}</td>
                );
              }))}
            </tr>
          );
        })}
        </tbody>
      </table>
    );
  }

}

SearchSummariesListItem.propTypes = {
  table: PropTypes.oneOf(['contribution', 'locations', 'sites', 'samples', 'specimens', 'experiments']).isRequired,
  item:  PropTypes.object
};


export default SearchSummariesListItem;
