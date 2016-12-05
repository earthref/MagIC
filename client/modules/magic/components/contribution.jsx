import _ from 'lodash';
import numeral from 'numeral';
import moment from 'moment';
import React from 'react';
import GoogleStaticMap from '../../common/components/google_static_map';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    $(this.refs['contribution']).accordion({exclusive: false});
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

  renderMapThumbnail() {
    const c = this.props.contribution;
    let paths = [];

    if (c.begin_lats !== undefined &&
        c.end_lats   !== undefined && c.begin_lats.length == c.end_lats  .length &&
        c.begin_lons !== undefined && c.begin_lats.length == c.begin_lons.length &&
        c.end_lons   !== undefined && c.begin_lats.length == c.end_lons  .length) {
      _(c.begin_lats).forEach(([], i) => {
        paths.push({
          lat_s: c.begin_lats[i],
          lat_n: c.end_lats  [i],
          lon_w: c.begin_lons[i],
          lon_e: c.end_lons  [i]})
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

  renderGeo(c) {
    let geologic = [];
    if (c.plate_block) geologic.push(c.plate_block);
    if (c.terrane) geologic.push(c.terrane);
    if (c.geological_province_section) geologic.push(c.geological_province_section);
    if (c.setting) geologic.push(c.setting);
    let geographic = [];
    if (c.country) geographic.push(c.country);
    if (c.region) geographic.push(c.region);
    if (c.village_city) geographic.push(c.village_city);
    let oceanographic = [];
    if (c.continent_ocean) oceanographic.push(c.continent_ocean);
    if (c.ocean_sea) oceanographic.push(c.ocean_sea);
    return (
      <div>
        {(geologic.length      > 0 ? <span><b>Geologic:</b><br/>{geologic.join(', ')}<br/></span> : undefined)}
        {(geographic.length    > 0 ? <span><b>Geographic:</b><br/>{geographic.join(', ')}<br/></span> : undefined)}
        {(oceanographic.length > 0 ? <span><b>Oceanographic:</b><br/>{oceanographic.join(', ')}<br/></span> : undefined)}
      </div>
    );
  }

  render() {
    const c = this.props.contribution;
    return (
      <div ref="contribution" className="ui accordion magic-contribution">
        <div className="title" style={{paddingLeft:'1em'}}>
          <i className="dropdown icon" style={{position:'relative', left:'-1.3rem'}}/>
          <div className="ui doubling grid" style={{marginTop:'-2.5rem'}}>
            <div className="row" style={{paddingBottom:0}}>
              <div className="sixteen wide column">
            <span>
              {c.citation} v.{c.version}
            </span>
            <span className="description" style={{fontSize:'small', float:'right', textAlign:'right'}}>
              {moment(c.activated).calendar()} by <b>{c.contributor}</b>
            </span>
              </div>
            </div>
            <div className="row" style={{paddingTop:'.5em', fontWeight:'normal', whiteSpace:'nowrap'}}>
              <div className="two wide right aligned column">
                <a className="ui basic tiny fluid compact icon button" style={{marginTop:'0.5em'}}
                   href={'//earthref.org/cgi-bin/z-download.cgi?file_path=' +
                   (c.folder === 'zmab' ?
                       `/projects/earthref/archive/bgfiles/${c.folder}/${c.file_name}.txt`
                       :
                       `/projects/earthref/local/oracle/earthref/magic/uploads/${c.contributor_id}/${c.folder}/${c.file_name}`
                   )
                   }
                >
                  <i className="ui file text outline icon"/> Download
                </a>
                <div className="ui basic tiny fluid compact icon button" style={{marginTop:'0.5em'}}><i className="ui linkify icon"/> Copy Link</div>
                <div className="ui basic tiny fluid compact icon disabled button"><i className="star icon"/> Follow</div>
              </div>
              <div className="two wide column" style={{fontSize:'small'}}>
                {(c.n_locations ?    <a onClick={this.showData.bind(this)}>{c.n_locations    + ' Location'    + (c.n_locations    > 1 ? 's' : '')}</a> : undefined)}<br/>
                {(c.n_sites ?        <a onClick={this.showData.bind(this)}>{c.n_sites        + ' Site'        + (c.n_sites        > 1 ? 's' : '')}</a> : undefined)}<br/>
                {(c.n_samples ?      <a onClick={this.showData.bind(this)}>{c.n_samples      + ' Sample'      + (c.n_samples      > 1 ? 's' : '')}</a> : undefined)}<br/>
                {(c.n_specimens ?    <a onClick={this.showData.bind(this)}>{c.n_specimens    + ' Specimen'    + (c.n_specimens    > 1 ? 's' : '')}</a> : undefined)}<br/>
                {(c.n_measurements ? <a onClick={this.showData.bind(this)}>{c.n_measurements + ' Measurement' + (c.n_measurements > 1 ? 's' : '')}</a> : undefined)}
              </div>
              <div className="two wide column">
                <div className="ui image">
                  {(c.contribution_id && c.random_plot_name && !c.random_plot_name.match(/eqarea_\.png$/) ?
                    <img className="ui bordered image"
                      src={'//static.earthref.org/imcache/Set(gravity:Center)%7CCrop(geometry:360x360+10+0)%7CResize(geometry:100x100)/images/MAGIC/static_plots/' +
                        c.contribution_id + '/' + c.random_plot_name}
                      style={{border:'1px solid rgba(0, 0, 0, 0.1)', maxWidth:'100px', maxHeight:'100px'}}
                    />
                  :
                    <img className="ui bordered image" src="/MagIC/plot.png" style={{border:'1px solid rgba(0, 0, 0, 0.1)', maxWidth:'100px', maxHeight:'100px', visibility:'hidden'}}/>
                  )}
                </div>
              </div>
              <div className="two wide column">
                <a className="ui tiny image" href="#" onClick={this.showMap.bind(this)}>
                  {this.renderMapThumbnail()}
                </a>
              </div>
              <div className="two wide column" style={{fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
                {this.renderGeo(c)}
              </div>
              <div className="two wide column" style={{fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
                {(c.class ? <span><b>Class:</b><br/>{c.class.join(', ')}<br/></span> : undefined)}
                {(c.type ? <span><b>Type:</b><br/>{c.type.join(', ')}<br/></span> : undefined)}
                {(c.lithologies ? <span><b>Lithology:</b><br/>{c.lithologies.join(', ')}<br/></span> : undefined)}
              </div>
              <div className="two wide column" style={{fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
                {(c.max_ages || c.min_ages ?
                    <span>
                      <b>Age:</b><br/>
                      {numeral(c.min_ages).format('0[.]0 a')} - <br/>
                      {numeral(c.max_ages).format('0[.]0 a')}<br/>
                      Years BP
                    </span>
                  : undefined)}
              </div>
              <div className="two wide column" style={{fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
              {(c.method_codes ? <span><b>Method Codes:</b><br/><span dangerouslySetInnerHTML={{__html: c.method_codes.slice(0,4).join('<br/>') + (c.method_codes.length > 4 ? ' ...' : '')}} /></span> : undefined)}
            </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div dangerouslySetInnerHTML={{__html: c.reference_html}} />
          <div dangerouslySetInnerHTML={{__html: c.abstract_html}} />
          <table className="ui very basic small table">
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
                    <td>{moment(v.activated).calendar()} by <b>{c.contributor}</b></td>
                    <td>
                      <a className="ui basic tiny fluid icon button" style={{marginTop:'0.5em'}}
                         href={'//earthref.org/cgi-bin/z-download.cgi?file_path=' +
                         (v.folder === 'zmab' ?
                             `/projects/earthref/archive/bgfiles/${v.folder}/${v.file_name}.txt`
                             :
                             `/projects/earthref/local/oracle/earthref/magic/uploads/${c.contributor_id}/${v.folder}/${v.file_name}`
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
}

