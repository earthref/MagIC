import _ from 'lodash';
import numeral from 'numeral';
import moment from 'moment';
import request from 'request';
import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import saveAs from 'save-as';
import { HotTable, HotColumn } from "@handsontable/react";
import "handsontable/dist/handsontable.min.css";

import Clamp from '/client/modules/common/components/clamp';
import ExportContribution from '/lib/modules/magic/export_contribution.js';
import GoogleStaticMap from '/client/modules/common/components/google_static_map';
import GoogleMap from '/client/modules/common/components/google_map';
import Count from '/client/modules/common/components/count';
import SearchPolePlotThumbnail from '/client/modules/magic/containers/search_pole_plot_thumbnail';
import { Button, Modal } from 'semantic-ui-react';
import {versions, models} from '/lib/configs/magic/data_models.js';
import {index} from '/lib/configs/magic/search_levels.js';

class SearchSummariesListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loadMap: false,
      showDataModal: false,
      showConfirmCloseEditedDataModal: false,
      showConfirmChangeTabsEditedDataModal: false,
      confirmChangeTabsDataLevel: undefined,
      dataLoading: false,
      dataEdited: false,
      dataSaving: false,
      dataLevel: undefined,
      contributionData: undefined,
      contributionDataError: undefined
    };
    this.styles = {
      a: {cursor: 'pointer', color: '#800080'}
    }
    this.contributionDataEdited = undefined;
  }

  componentDidMount() {
    $(this.refs['accordion']).accordion({
      exclusive: false,
      selector: { trigger: '.accordion-trigger'}
    });
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
    if (item.summary._all.location) title += ' ⇒ ' + item.summary._all.location[0];
    console.log('renderTitle', item.row);
    if (item.row && item.row.result_name)
      title += ' ⇒ <b>' + item.row.result_name + '</b>';
    return <div style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}} dangerouslySetInnerHTML={{__html: title}}/>;
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
      //if (tableSummary._geo_envelope) 
      //  _.sortedUniqBy(
      //    _.sortBy(tableSummary._geo_envelope, 
      //      x => _.flatten(x.coordinates).join('_')),
      //    x => _.flatten(x.coordinates).join('_'))
      //  .forEach(envelope => {
      //    paths.push({
      //      lat_s: envelope.coordinates[0][1],
      //      lat_n: envelope.coordinates[1][1],
      //      lon_w: envelope.coordinates[0][0],
      //      lon_e: envelope.coordinates[1][0]
      //    });
      //  });

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
      <div style={{minWidth: 150, maxWidth: 150, marginRight: '1em', marginBottom: 5}}>
        {paths.length > 0 &&
          <a className="ui tiny image" style={{ cursor:'pointer' }} onClick={this.showMap.bind(this)}>
            <GoogleStaticMap
              width={150}
              height={150}
              paths={paths}
            />
          </a>}
      </div>
    ) : (
      <div style={{minWidth: 150, maxWidth: 150, marginRight: '1em', marginBottom: 5, fontSize:'small', color:'#AAAAAA', textAlign:'center', overflow:'hidden', textOverflow:'ellipsis'}}>
        <br/>No<br/><b>Geospatial</b><br/>Data<br/><br/>
      </div>
    );

  }

  renderAgeLithology(item) {
    if (item?.row?.age && item?.row?.age_sigma) {
      return (
        <div style={{minWidth: 120, maxWidth: 120, marginRight: '1em', marginBottom: 5, fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
          <b>Age:</b><br/>{item.row.age} ± {item.row.age_sigma} {item.row.age_unit}
        </div>
      );
    } else if (item?.row?.age_low || item?.row?.age_high) {
      return (
        <div style={{minWidth: 120, maxWidth: 120, marginRight: '1em', marginBottom: 5, fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
          <b>Age:</b><br/>{item.row.age_low} - {item.row.age_high} {item.row.age_unit}
        </div>
      );
    } else if (item?.row?.age) {
      return (
        <div style={{minWidth: 120, maxWidth: 120, marginRight: '1em', marginBottom: 5, fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
          <b>Age:</b><br/>{item.row.age} {item.row.age_unit}
        </div>
      );
    } else {
      return (
        <div style={{ minWidth: 120, maxWidth: 120, marginRight: '1em', marginBottom: 5, fontSize: 'small', color: '#AAAAAA', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <br />No<br /><b>Age</b><br />Data<br /><br />
        </div>
      );
    }
  }

  renderPole(item) {
  
    console.log('pole', item);
    if (item.row.pole_lat && item.row.pole_lon){
      return (
        <div style={{minWidth: 100, maxWidth: 100, marginRight: '1em', marginBottom: 5, fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
          <b>Pole:</b><br/>
          {item.row.pole_lat < 0 ?
          numeral(-item.row.pole_lat).format('0[.]00') + '°S' :
          numeral( item.row.pole_lat).format('0[.]00') + '°N'}<br/>
          {item.row.pole_lon < 0 ?
          numeral(-item.row.pole_lon).format('0[.]00') + '°W' :
          numeral( item.row.pole_lon).format('0[.]00') + '°E'}
          {item.row.pole_dp &&
          <b><br/>DP: </b>}
          {item.row.pole_dp && numeral(item.row.pole_dp).format('0[.]00') + '°'}
          {item.row.pole_dm &&
          <b><br/>DM: </b>}
          {item.row.pole_dm && numeral(item.row.pole_dm).format('0[.]00') + '°'}
          {item.row.pole_alpha95 &&
          <b><br/>A<sub>95</sub>: </b>}
          {item.row.pole_alpha95 && numeral(item.row.pole_alpha95).format('0[.]00') + '°'}
        </div>
      );
    }
    else return (
      <div style={{minWidth: 100, maxWidth: 100, marginRight: '1em', marginBottom: 5, fontSize:'small', color:'#AAAAAA', textAlign:'center', overflow:'hidden', textOverflow:'ellipsis'}}>
        <br/>No<br/><b>Pole</b><br/>Data<br/><br/>
      </div>
    );
  }

  renderResultNamePoleComponent(item) {
  
    console.log('pole', item);
    if (item.row.result_name || item.row.pole_comp_name){
      return (
        <div style={{minWidth: 125, maxWidth: 125, marginRight: '1em', marginBottom: 5, fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
          {item.row.result_name && <b>Result Name: <br/></b>}
          {item.row.result_name || undefined}
          {item.row.result_name && item.row.pole_comp_name && <br/>}
          {item.row.pole_comp_name && <b>Pole Component: <br/></b>}
          {item.row.pole_comp_name || undefined}
        </div>
      );
    }
    else return (
      <div style={{minWidth: 125, maxWidth: 125, marginRight: '1em', marginBottom: 5, fontSize:'small', color:'#AAAAAA', textAlign:'center', overflow:'hidden', textOverflow:'ellipsis'}}>
        <br/>No<br/><b>Result</b><br/>Data<br/><br/>
      </div>
    );
  }

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

  renderCitations(item) {
    let citations;
    if (item.summary._all && item.summary._all.citations)
      citations = _.without(item.summary._all.citations, 'this study', 'This study', 'This Study', 'This study', 'this_study', 'This_study', 'This_Study', 'This_study');
    return citations && citations.length > 0 ? (
      <div style={{minWidth: 125, maxWidth: 125, marginRight: '1em', marginBottom: 5, fontSize:'small', whiteSpace: 'normal'}}>
        <span>
          <b>Citations:</b>
          <Clamp lines={5}><span>{citations.join(', ')}</span></Clamp>
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
    console.log('pole render', item);
    let _is_activated = item.summary && item.summary.contribution && item.summary.contribution._is_activated === "true";
    try {
      return (
        <div>
          <div ref="accordion" className={'ui accordion pole-view search-summaries-list-item' + (this.props.active && !this.props.collapsed ? ' active' : '')} onMouseOver={(e) => {
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
                  <span style={{
                    fontSize:'small', fontWeight:'bold',
                    color: !_is_activated && Meteor.isDevelopment ? '#9F3A38' : 'default'
                  }}>
                    {item.summary.contribution && item.summary.contribution._reference && item.summary.contribution._reference.citation || 'Unknown'}
                    {item.summary.contribution && item.summary.contribution.version && <span>&nbsp;v.&nbsp;{item.summary.contribution.version}</span>}
                  </span>
                  <span style={{
                    fontSize:'small', flex:'1', height:'1.25em', overflow:'hidden', textOverflow:'ellipsis', margin: '0 0.5em',
                    color: !_is_activated && Meteor.isDevelopment ? '#9F3A38' : 'default'
                  }}>
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
                    {this.renderMapThumbnail(item)}
                    <SearchPolePlotThumbnail 
                      id={item && item.summary && item.summary.contribution && item.summary.contribution.id}
                      citation={item && item.summary && item.summary.contribution && item.summary.contribution._reference && item.summary.contribution._reference.citation }
                      location={item && item.summary && item.summary.locations && item.summary.locations.location && item.summary.locations.location[0] }    
                      size={150}
                    />
                    {this.renderPole(item)}
                    {this.renderGeo(item)}
                    {this.renderGeology(item)}
                    {this.renderResultNamePoleComponent(item)}
                    {this.renderAgeLithology(item)}
                    {this.renderCitations(item)}
                  </div>
                :
                  <div className="row flex_row" style={{padding:'0', fontWeight:'normal', whiteSpace:'nowrap', display:'flex'}}>
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

              <div style={{marginTop:'0.5em'}} dangerouslySetInnerHTML={{__html: '<b><a target="_blank" href="https://www.crossref.org" style="color: #800080">Crossref</a> Citation Count: </b>' + item.summary.contribution._reference.n_citations }} />}

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
                        <span>{'10.7288/V4/MAGIC/' + v.id}</span>}
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
              {Meteor.isDevelopment && this.props.table === 'contribution' && item.summary.contribution &&
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
                      Calculate the contribution pre-summary and submit it to Elasticsearch for indexing.
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
            {this.state.showDataModal && this.renderDataModal(item)}
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
        {citation || name || "Unnamed"} - Map
      </div>
      <GoogleMap style={{width:'100%', height:'calc(100vh - 10em)'}} docs={[item]}/>
    </div>
    );
  }

}

SearchSummariesListItem.propTypes = {
  table: PropTypes.oneOf(['contribution', 'locations', 'sites', 'samples', 'specimens', 'experiments']).isRequired,
  item:  PropTypes.object
};


export default SearchSummariesListItem;
