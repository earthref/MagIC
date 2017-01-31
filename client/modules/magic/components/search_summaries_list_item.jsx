import _ from 'lodash';
import numeral from 'numeral';
import moment from 'moment';
import React from 'react';
import GoogleStaticMap from '../../common/components/google_static_map';
//import saveAs from 'save-as';
//import XLSX from 'xlsx-style';
//import ExportContribution from '../actions/export_contribution';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    $(this.refs['accordion']).accordion({exclusive: false});
  }
  showData() {
    /*$(this.refs['data modal']).modal('show');
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();*/
  }

  showMap(e) {
    /*$(this.refs['map modal']).modal('show');
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();*/
  }

  renderMapThumbnail(c) {
    let paths = [];

    c.BEGIN_LATS = c.BEGIN_LATS || c.LAT_S || c.LATS;
    c.END_LATS   = c.END_LATS   || c.LAT_N || c.LATS;
    c.BEGIN_LONS = c.BEGIN_LONS || c.LON_W || c.LONS;
    c.END_LONS   = c.END_LONS   || c.LON_E || c.LONS;

    if (c.BEGIN_LATS !== undefined &&
        c.END_LATS   !== undefined && c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':').length == c.END_LATS  .replace(/(^:|:$)/g, '').split(':').length &&
        c.BEGIN_LONS !== undefined && c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':').length == c.BEGIN_LONS.replace(/(^:|:$)/g, '').split(':').length &&
        c.END_LONS   !== undefined && c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':').length == c.END_LONS  .replace(/(^:|:$)/g, '').split(':').length) {
      _.forEach(c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':'), ([], i) => {
        paths.push({
          lat_s: parseFloat(c.BEGIN_LATS.replace(/(^:|:$)/g, '').split(':')[i]),
          lat_n: parseFloat(c.END_LATS  .replace(/(^:|:$)/g, '').split(':')[i]),
          lon_w: parseFloat(c.BEGIN_LONS.replace(/(^:|:$)/g, '').split(':')[i]),
          lon_e: parseFloat(c.END_LONS  .replace(/(^:|:$)/g, '').split(':')[i])})
      });
    }

    if (c.BEGIN_LAT !== undefined &&
        c.END_LAT   !== undefined &&
        c.BEGIN_LON !== undefined &&
        c.END_LON   !== undefined) {
      paths.push({
          lat_s: parseFloat(c.BEGIN_LAT),
          lat_n: parseFloat(c.END_LAT  ),
          lon_w: parseFloat(c.BEGIN_LON),
          lon_e: parseFloat(c.END_LON  )
      });
    }

    if (c.LAT !== undefined &&
        c.LON !== undefined) {
      paths.push({
        lat_s: parseFloat(c.LAT),
        lat_n: parseFloat(c.LAT),
        lon_w: parseFloat(c.LON),
        lon_e: parseFloat(c.LON)
      });
    }

    return (
      <GoogleStaticMap
        width={100}
        height={100}
        paths={paths}
      />
    );

  }

  renderAge(c) {
    let avg_ages = c.AVERAGE_AGE,
        min_ages = c.MIN_AGES || c.AVERAGE_AGE_LOW || (c.AGES && _.min(c.AGES.split(':'))),
        max_ages = c.MAX_AGES || c.AVERAGE_AGE_HIGH || (c.AGES && _.max(c.AGES.split(':')));
    let n_ages = c.N_AGES || c.AVERAGE_NN || (c.AGES && c.AGES.split(':').length);
    let age_unit = c.AVERAGE_AGE_UNIT || c.AGE_UNIT;
    if (avg_ages || min_ages && max_ages) {
      if (min_ages < 0 && max_ages < 0)
        [min_ages, max_ages] = [-max_ages, -min_ages];
      if (min_ages < 0)
        min_ages = -min_ages;
      if (max_ages < 0)
        max_ages = -max_ages;
      avg_ages = c.AVERAGE_AGE && (age_unit ? avg_ages + ' ' + age_unit : numeral(avg_ages)
      .format('0[.]0 a')
      .replace(/b$/, 'Ga')
      .replace(/m$/, 'Ma')
      .replace(/k$/, 'ka')
      .replace(/(\d)\s*$/, '$1 a'));
      min_ages = age_unit ? min_ages + ' ' + age_unit : numeral(min_ages)
      .format('0[.]0 a')
      .replace(/b$/, 'Ga')
      .replace(/m$/, 'Ma')
      .replace(/k$/, 'ka')
      .replace(/(\d)\s*$/, '$1 a');
      max_ages = age_unit ? max_ages + ' ' + age_unit : numeral(max_ages)
        .format('0[.]0 a')
        .replace(/b$/, 'Ga')
        .replace(/m$/, 'Ma')
        .replace(/k$/, 'ka')
        .replace(/(\d)\s*$/, '$1 a');
      return (avg_ages || min_ages === max_ages ?
        <span>
          <b>Age:</b><br/>
          {avg_ages || min_ages}<br/>
          {n_ages ? <span><b>N: </b>{n_ages}</span> : undefined}
        </span>
        :
        <span>
          <b>Min. Age:</b><br/>
          {min_ages}<br/>
          <b>Max. Age:</b><br/>
          {max_ages}<br/>
          {n_ages ? <span><b>N: </b>{n_ages}</span> : undefined}
        </span>
      );
    } else {
      return undefined;
    }
  }

  renderPole(c) {

    if (c.VGP_LAT && c.VGP_LON){
      //console.log('pole', c.AVERAGE_LAT, c.AVERAGE_LON);
      return (
        <span>
          <b>Pole:</b><br/>
          {c.VGP_LAT < 0 ?
          numeral(-c.VGP_LAT).format('0[.]00') + '°S' :
          numeral( c.VGP_LAT).format('0[.]00') + '°N'}<br/>
          {c.VGP_LON < 0 ?
          numeral(-c.VGP_LON).format('0[.]00') + '°W' :
          numeral( c.VGP_LON).format('0[.]00') + '°E'}<br/>
          {c.VGP_ALPHA95 &&
          <b>A<sub>95</sub>: </b>}
          {c.VGP_ALPHA95 && numeral( c.VGP_ALPHA95).format('0[.]00')}
        </span>
      );
    }
    else return undefined;
  }

  renderGeo(c) {
    let geologic = [];
    if (c.PLATE_BLOCK) geologic.push(c.PLATE_BLOCK.replace(/(^:|:$)/g, '').split(':'));
    if (c.TERRANE) geologic.push(c.TERRANE.replace(/(^:|:$)/g, '').split(':'));
    if (c.GEOLOGICAL_PROVINCE_SECTION) geologic.push(c.GEOLOGICAL_PROVINCE_SECTION.replace(/(^:|:$)/g, '').split(':'));
    if (c.SETTING) geologic.push(c.SETTING.replace(/(^:|:$)/g, '').split(':'));
    if (c.LOCATION_TYPE) geologic.push(c.LOCATION_TYPE.replace(/(^:|:$)/g, '').split(':'));
    let geographic = [];
    if (c.COUNTRY) geographic.push(c.COUNTRY.replace(/(^:|:$)/g, '').split(':'));
    if (c.REGION) geographic.push(c.REGION.replace(/(^:|:$)/g, '').split(':'));
    if (c.VILLAGE_CITY) geographic.push(c.VILLAGE_CITY.replace(/(^:|:$)/g, '').split(':'));
    if (c.LOCATION) geographic.push(c.LOCATION.replace(/(^:|:$)/g, '').split(':'));
    let oceanographic = [];
    if (c.CONTINENT_OCEAN) oceanographic.push(c.CONTINENT_OCEAN.replace(/(^:|:$)/g, '').split(':'));
    if (c.OCEAN_SEA) oceanographic.push(c.OCEAN_SEA.replace(/(^:|:$)/g, '').split(':'));
    return (
      <div style={{minWidth: 200, maxWidth: 200, marginRight: '1em', marginBottom: 5, fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
        {(geologic.length      > 0 ? <span><b>Geologic:</b><br/>{geologic.join(', ')}<br/></span> : undefined)}
        {(geographic.length    > 0 ? <span><b>Geographic:</b><br/>{geographic.join(', ')}<br/></span> : undefined)}
        {(oceanographic.length > 0 ? <span><b>Oceanographic:</b><br/>{oceanographic.join(', ')}<br/></span> : undefined)}
      </div>
    );
  }

  render() {
    const c = this.props.doc;
    console.log('summary', this.props);
    return (
      <div ref="accordion" className="ui accordion magic-contribution">
        <div className="title search_summaries_list_item" style={{paddingLeft:'1em'}}>
          <i className="dropdown icon" style={{position:'relative', left:'-1.3rem', top:'-.2rem'}}/>
          <div className="ui doubling grid" style={{marginTop:'-1.5rem', marginBottom: '-.5em'}}>
            <div className="row" style={{display:'flex', padding:'0 1em 0.5em'}}>
                <span style={{fontSize:'small', fontWeight:'bold'}}>
                  {c.CITATION && c.VERSION ? c.CITATION + ' v. ' + c.VERSION : c.TITLE}
                </span>
                <span style={{fontSize:'small', flex:'1', height:'1.25em', overflow:'hidden', textOverflow:'ellipsis', margin: '0 0.5em'}}
                      dangerouslySetInnerHTML={{
                        __html: (c.CITATION && c.VERSION && c.TITLE ? c.TITLE + ' ' : '') +
                        (c.REFERENCE_HTML || '').replace(/^.*?>.*?>/g, '').replace(/<i.*$/g, '')
                      }}>
                </span>
                <span className="description" style={{fontSize:'small', float:'right', textAlign:'right'}}>
                  {moment(c.INSERTED).calendar()} by <b>{c.CONTRIBUTOR}</b>
                </span>
              </div>
            <div className="row flex_row" style={{padding:'0', fontWeight:'normal', whiteSpace:'nowrap', display:'flex'}}>
              <div style={{minWidth: 100, maxWidth: 100, marginRight: '1em', marginBottom: 5}}>
                <a className={'ui basic tiny fluid compact icon header button' + (c.FOLDER && c.FILE_NAME ? '' : ' disabled')} style={{padding:'1.25em 0', height:'100px'}}
                   href={'//earthref.org/cgi-bin/z-download.cgi?file_path=' +
                   (c.FOLDER === 'zmab' ?
                       `/projects/earthref/archive/bgfiles/${c.FOLDER}/${c.FILE_NAME}.txt`
                       :
                       `/projects/earthref/local/oracle/earthref/magic/uploads/${c.CONTRIBUTOR_ID}/${c.FOLDER}/${c.FILE_NAME}`
                   )}
                >
                  <i className="ui file text outline icon"/> Download
                </a>
              </div>
              <div style={{minWidth: 125, maxWidth: 125, marginRight: '1em', marginBottom: 5, fontSize:'small'}}>
                {(c.N_LOCATIONS    ? <a onClick={this.showData.bind(this)}>{c.N_LOCATIONS    + ' Location'    + (c.N_LOCATIONS    > 1 ? 's' : '')}<br/></a> : undefined)}
                {(c.N_SITES        ? <a onClick={this.showData.bind(this)}>{c.N_SITES        + ' Site'        + (c.N_SITES        > 1 ? 's' : '')}<br/></a> : undefined)}
                {(c.N_SAMPLES      ? <a onClick={this.showData.bind(this)}>{c.N_SAMPLES      + ' Sample'      + (c.N_SAMPLES      > 1 ? 's' : '')}<br/></a> : undefined)}
                {(c.N_SPECIMENS    ? <a onClick={this.showData.bind(this)}>{c.N_SPECIMENS    + ' Specimen'    + (c.N_SPECIMENS    > 1 ? 's' : '')}<br/></a> : undefined)}
                {(c.N_EXPERIMENTS  ? <a onClick={this.showData.bind(this)}>{c.N_EXPERIMENTS  + ' Experiment'  + (c.N_EXPERIMENTS  > 1 ? 's' : '')}<br/></a> : undefined)}
                {(c.N_MEASUREMENTS ? <a onClick={this.showData.bind(this)}>{c.N_MEASUREMENTS + ' Measurement' + (c.N_MEASUREMENTS > 1 ? 's' : '')}     </a> : undefined)}
              </div>
              <div style={{minWidth: 100, maxWidth: 100, marginRight: '1em', marginBottom: 5}}>
                <div className="ui image">
                  {(c.RANDOM_PLOT_NAME ?
                    <img className="ui bordered image"
                    src={'//static.earthref.org/imcache/' +
                      (/_TY:_(aniso|eq)/.test(c.RANDOM_PLOT_NAME) ? 'Crop(geometry:292x292+111+104)' : 'Set(gravity:Center)|Crop(geometry:360x360+10+0)') +
                      '|Resize(geometry:100x100)/images/MAGIC/static_plots/' +
                      c.MAGIC_CONTRIBUTION_ID + '/' + c.RANDOM_PLOT_NAME}
                      style={{border:'1px solid rgba(0, 0, 0, 0.1)', maxWidth:'100px', maxHeight:'100px'}}
                    />
                  :
                    <img className="ui bordered image" src="/MagIC/plot.png" style={{border:'1px solid rgba(0, 0, 0, 0.1)', maxWidth:'100px', maxHeight:'100px', visibility:'hidden'}}/>
                  )}
                </div>
              </div>
              {!this.props.isPoles && <div style={{minWidth: 100, maxWidth: 100, marginRight: '1em', marginBottom: 5}}>
                <a className="ui tiny image" href="#" onClick={this.showMap.bind(this)}>
                  {this.renderMapThumbnail(c)}
                </a>
              </div>}
              {!c.SVW_ER_LO_PMAG_RESULT_ID && this.renderGeo(c)}
              {!c.SVW_ER_LO_PMAG_RESULT_ID && <div style={{minWidth: 200, maxWidth: 200, marginRight: '1em', marginBottom: 5, fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
                {((c.CLASS || c.GEOLOGIC_CLASSES) ? <span><b>Class:</b><br/>{(c.CLASS || c.GEOLOGIC_CLASSES).replace(/(^:|:$)/g, '').split(':').join(', ')}<br/></span> : undefined)}
                {((c.TYPE || c.GEOLOGIC_TYPES) ? <span><b>Type:</b><br/>{(c.TYPE || c.GEOLOGIC_TYPES).replace(/(^:|:$)/g, '').split(':').join(', ')}<br/></span> : undefined)}
                {((c.LITHOLOGY || c.LITHOLOGIES) ? <span><b>Lithology:</b><br/>{(c.LITHOLOGY || c.LITHOLOGIES).replace(/(^:|:$)/g, '').split(':').join(', ')}<br/></span> : undefined)}
              </div>}
              {c.SVW_ER_LO_PMAG_RESULT_ID && <div style={{minWidth: 75, maxWidth: 75, marginRight: '1em', marginBottom: 5, fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
                {this.renderPole(c)}
              </div>}
              <div style={{minWidth: 100, maxWidth: 100, marginRight: '1em', marginBottom: 5, fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
                {this.renderAge(c)}
              </div>
              <div style={{minWidth: 150, maxWidth: 150, marginRight: '1em', marginBottom: 5, fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
                {(c.METHOD_CODES || c.MAGIC_METHOD_CODES ?
                  <span><b>Method Codes:</b><br/>
                    <span dangerouslySetInnerHTML={{__html:
                    (c.METHOD_CODES || c.MAGIC_METHOD_CODES || '').replace(/(^:|:$)/g, '').split(':').slice(0,5).join('<br/>') +
                    ((c.METHOD_CODES || c.MAGIC_METHOD_CODES || '').replace(/(^:|:$)/g, '').split(':').length > 5 ? ' ...' : '')}} />
                  </span> : undefined)}
              </div>
              <div style={{minWidth: 150, maxWidth: 150, marginRight: '1em', marginBottom: 5, fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
                {(c.ER_CITATION_NAMES && _.without(c.ER_CITATION_NAMES.replace(/(^:|:$)/g, '').split(':'), 'This Study', 'this study', 'This study').length > 0 ?
                  <span><b>Citations:</b><br/>
                      <span dangerouslySetInnerHTML={{__html:
                      _.without((c.ER_CITATION_NAMES || '').replace(/(^:|:$)/g, '').split(':'), 'This Study', 'this study', 'This study').slice(0,5).join('<br/>') +
                      (_.without((c.ER_CITATION_NAMES || '').replace(/(^:|:$)/g, '').split(':'), 'This Study', 'this study', 'This study').length > 5 ? ' ...' : '')}} />
                    </span> : undefined)}
              </div>
              <div style={{marginRight: '1em', marginBottom: 5, fontSize:'small'}}>
                {((c.MAGIC_CONTRIBUTION_ID) ? <span><b>Contribution Link:</b><br/><a href={'https://earthref.org/MagIC/' + c.MAGIC_CONTRIBUTION_ID}>{'earthref.org/MagIC/' + c.MAGIC_CONTRIBUTION_ID}</a><br/></span> : undefined)}
                {((c.DOI) ? <span><b>Publication Link:</b><br/><a href={'https://earthref.org/MagIC/doi' + c.DOI}>{'earthref.org/MagIC/' + c.DOI}</a><br/></span> : undefined)}
                {((c.MAGIC_CONTRIBUTION_ID) ? <span><b>EarthRef Data DOI:</b><br/>{'10.7288/V4/MagIC/' + c.MAGIC_CONTRIBUTION_ID}</span> : undefined)}
              </div>
            </div>
          </div>
        </div>
        <div className="content" style={{fontSize:'small'}}>
          <div dangerouslySetInnerHTML={{__html: (c.REFERENCE_HTML || '').replace(/<u> INCOMPLETE REFERENCE !<\/u>/g, '')}} />
          <div dangerouslySetInnerHTML={{__html: c.ABSTRACT}} />
          {c.REFERENCE_KEYWORDS ?
            <div dangerouslySetInnerHTML={{__html: '<b>Keywords: </b>' + c.REFERENCE_KEYWORDS.replace(/(^:|:$)/g, '').split(':').join(', ')}} />
            : undefined}
          {c.REFERENCE_TAGS ?
            <div dangerouslySetInnerHTML={{__html: '<b>Tags: </b>' + c.REFERENCE_TAGS.replace(/(^:|:$)/g, '').split(':').join(', ')}} />
            : undefined}
          {c.version_history ?
            <table className="ui very basic small compact table" style={{maxWidth:700}}>
              <thead>
              <tr>
                <th>Version</th>
                <th>Data Model</th>
                <th>Uploaded</th>
                <th>Download</th>
              </tr>
              </thead>
              <tbody>
              {c.version_history.map((v, i) => {
                return (
                  <tr key={i}>
                    <td>{v.version}</td>
                    <td>{v.magic_version}</td>
                    <td>{moment(v.activated).calendar()} by <b>{v.contributor}</b></td>
                    <td>
                      <a className="ui basic tiny fluid icon compact button" style={{marginTop:'0'}}
                         href={'//earthref.org/cgi-bin/z-download.cgi?file_path=' +
                           (v.folder === 'zmab' ?
                               `/projects/earthref/archive/bgfiles/${v.folder}/${v.file_name}.txt`
                               :
                               `/projects/earthref/local/oracle/earthref/magic/uploads/${c.CONTRIBUTOR_ID}/${v.folder}/${v.file_name}`
                           )
                         }
                      >
                        <i className="ui file text outline icon"/> Download
                      </a>
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          : undefined}
        </div>
        <div ref="map modal" className="ui fullscreen modal">
          <i className="close icon"></i>
          <div className="header">
            {c.citation} Map
          </div>
          <img className="ui bordered image" src="/MagIC/map.png" style={{border:'1px solid rgba(0, 0, 0, 0.1)', width:'100%', height:'calc(100vh - 10em)'}}/>
        </div>
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

