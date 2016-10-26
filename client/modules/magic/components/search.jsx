import {_} from 'lodash';
import React from 'react';
import saveAs from 'save-as';
import IconButton from '../../common/components/icon_button.jsx';
import {portals} from '../../common/configs/portals';
import {default as cvs} from '../../../../lib/modules/er/controlled_vocabularies';
import {default as svs} from '../../../../lib/modules/er/suggested_vocabularies';
import {default as contributions} from '../../../../lib/modules/magic/contributions';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: this.props.search,
      loaded: false,
      updating: false
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    $(this.refs['accordion']).filter(':not(.er-accordion)').addClass('er-accordion').accordion({exclusive: false});
    $('.ui.sticky')
      .sticky({
        context: '#results'
      })
    ;
  }

  componentWillReceiveProps(nextProps) {
  }

  onSearchChange(e) {
  }

  render() {
    const vocabularies = {};
    return (
      <div className="magic-search">
        <div className="ui top attached tabular menu">
          <a className={'active item'} href="">
            Contributions
          </a>
          <a className={'item'} href="">
            Locations
          </a>
          <a className={'item'} href="">
            Sites
          </a>
          <a className={'item'} href="">
            Samples
          </a>
          <a className={'item'} href="">
            Specimens
          </a>
          <a className={'item'} href="">
            Synthetics
          </a>
          <a className={'item'} href="">
            Experiments
          </a>
          <div className="right menu">
            <div className="active item">
              <div className="ui search">
                <div className="ui transparent icon input">
                  <input
                    ref="search"
                    className="prompt"
                    type="text"
                    placeholder="Search MagIC ..."
                    value={this.state.search}
                  />
                  <i className={portals['MagIC'].color + ' search icon'}/>
                </div>
                <div className="results"></div>
              </div>
            </div>
          </div>
        </div>
        {(this.props.view === 'public' ?
          <div ref="segment" className="ui bottom attached segment">
            <div className="ui divided grid" style={{marginTop:0, marginBottom:0}}>
              <div className="three wide column" style={{fontSize:'small', paddingTop:0}}>
                <div className="ui fixed top">
                  <i className="ui large angle double left icon" style={{float:'right'}}/>
                  <h4 className="ui header" style={{marginTop:0}}>
                    References Sort
                  </h4>
                  <i className="ui sort numeric descending icon"/> <b>Upload Date</b><br/><br/>
                  <i className="ui icon"/> Number of Rows<br/><br/>
                  <i className="ui icon"/> Number of Citations<br/><br/>
                  <i className="ui plus icon"/> Custom Sort Column<br/>
                  <div className="ui divider"></div>
                  <h4 className="ui header">
                    References Filters
                  </h4>
                  <i className="ui caret right icon"/>Bounding Box<br/><br/>
                  <i className="ui caret right icon"/>Age Range<br/><br/>
                  <i className="ui caret right icon"/>Uploaded By<br/><br/>
                  <i className="ui caret right icon"/>Following<br/><br/>
                  <i className="ui caret right icon"/>Method Codes<br/><br/>
                  <i className="ui caret right icon"/>Publication Year<br/><br/>
                  <i className="ui caret down icon"/>External DB<br/>
                  <i className="ui icon"/><i className="ui icon"/>ARCHEO00<br/>
                  <i className="ui icon"/><i className="ui icon"/>CALS7K.2<br/>
                  <i className="ui icon"/><i className="ui icon"/>DRAGON<br/>
                  <i className="ui icon"/><i className="ui icon"/>GEOMAGIA50<br/>
                  <i className="ui icon"/><i className="ui icon"/>PALEOMAGIA<br/>
                  <i className="ui icon"/><i className="ui icon"/>PINT<br/>
                  <i className="ui icon"/><i className="ui icon"/>PINT08<br/>
                  <i className="ui icon"/><i className="ui icon"/>PSVRL<br/>
                  <i className="ui icon"/><i className="ui icon"/>TAFI<br/>
                  <i className="ui icon"/><i className="ui icon"/>TRANS<br/><br/>
                  <i className="ui caret right icon"/>Includes Intensities<br/><br/>
                  <i className="ui caret right icon"/>Has Measurements<br/><br/>
                  <i className="ui small plus icon"/> Custom Column Filter
                </div>
              </div>
              <div className="thirteen wide column" id="results" style={{paddingTop:0}}>
                <div className="ui equal width grid">
                  <div className="left aligned column">
                    <i className="plus icon"/>
                    <a href="">Create a Compilation</a>
                  </div>
                  <div className="center aligned column">
                    <i className="up arrow icon"/>
                    <a href="">Upload a Contribution</a>
                  </div>
                  <div className="right aligned column">
                    <i className="download icon"/>
                    <a href="">Download as .zip</a>
                  </div>
                </div>
                <div ref="accordion" className="ui styled fluid accordion">
                  {contributions.contributions.map((c,i) => {
                    return (
                      <div className="vocabularies-table" key={i}>
                        <div className={(i === 0 ? 'active ' : '') + 'title'}>
                          <i className="dropdown icon" style={{position:'relative', left:'-1.3rem'}}/>
                          <div className="ui doubling grid" style={{marginTop:'-2.5rem'}}>
                            <div className="row" style={{paddingBottom:0}}>
                              <div className="sixteen wide column">
                            <span>
                              {c.citation}
                            </span>
                            <span className="description" style={{fontSize:'small', float:'right', textAlign:'right'}}>
                              by <b>{c.contributor}</b>
                            </span>
                              </div>
                            </div>
                            <div className="row" style={{paddingTop:'.5em', fontWeight:'normal', whiteSpace:'nowrap'}}>
                              <div className="three wide column" style={{fontSize:'small'}}>
                                {(c.n_locations ? <a href="">{c.n_locations + ' Location' + (c.n_locations > 1 ? 's' : '')}</a> : undefined)}<br/>
                                {(c.n_sites ? <a href="">{c.n_sites + ' Site' + (c.n_sites > 1 ? 's' : '')}</a> : undefined)}<br/>
                                {(c.n_samples ? <a href="">{c.n_samples + ' Sample' + (c.n_samples > 1 ? 's' : '')}</a> : undefined)}<br/>
                                {(c.n_specimens ? <a href="">{c.n_specimens + ' Specimen' + (c.n_specimens > 1 ? 's' : '')}</a> : undefined)}<br/>
                                {(c.n_measurements ? <a href="">{c.n_measurements + ' Measurement' + (c.n_measurements > 1 ? 's' : '')}</a> : undefined)}
                              </div>
                              <div className="two wide column">
                                <div className="ui image">
                                  <img className="ui bordered image" src="/MagIC/plot.png" style={{border:'1px solid rgba(0, 0, 0, 0.1)', maxWidth:'100px', maxHeight:'100px'}}/>
                                </div>
                              </div>
                              <div className="two wide column">
                                <div className="ui tiny image">
                                  <img className="ui bordered image" src="/MagIC/map.png" style={{border:'1px solid rgba(0, 0, 0, 0.1)', maxWidth:'100px', maxHeight:'100px'}}/>
                                </div>
                              </div>
                              <div className="three wide column" style={{fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
                                {(c.class ? <span><b>Class:</b><br/>{_.without(c.class.split(':'), '').join(', ')}<br/></span> : undefined)}
                                {(c.type ? <span><b>Type:</b><br/>{_.without(c.type.split(':'), '').join(', ')}<br/></span> : undefined)}
                                {(c.lithologies ? <span><b>Lithology:</b><br/>{_.without(c.lithologies.split(':'), '').join(', ')}<br/></span> : undefined)}
                              </div>
                              <div className="three wide column" style={{fontSize:'small', overflow:'hidden', textOverflow:'ellipsis'}}>
                                {(c.method_codes ? <span><b>Method Codes:</b><br/><span dangerouslySetInnerHTML={{__html: _.without(c.method_codes.split(':'), '').slice(0,4).join('<br/>')}} /></span> : undefined)}

                              </div>
                              <div className="three wide right aligned column">
                                <div className={'ui basic tiny fluid icon button' + (i < 2 ? ' active' : '')}><i className={(i < 2 ? '' : 'empty ') + 'star icon'}/> {(i < 2 ? 'Unfollow' : 'Follow')}</div>
                                <div className="ui basic tiny fluid icon button" style={{marginTop:'0.5em'}}><i className="ui linkify icon"/> Copy Link</div>
                                <div className="ui basic tiny fluid icon button" style={{marginTop:'0.5em'}}><i className="ui file text outline icon"/> Download</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={(i === 0 ? 'active ' : '') + 'content'}>
                          <div dangerouslySetInnerHTML={{__html: c.reference_html}} />
                          <div dangerouslySetInnerHTML={{__html: c.abstract_html}} />
                          <table className="ui very basic small table">
                            <thead>
                            <tr>
                              <th>Version</th>
                              <th>Data Model</th>
                              <th>Uploaded</th>
                              <th>Row Changes</th>
                              <th>Download</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                              <td>3</td>
                              <td>3.0</td>
                              <td>04 Oct. 2016 by <b>MagIC Database Team</b></td>
                              <td>+250 / -5</td>
                              <td><i className="ui file text outline icon"/> MagIC Text&nbsp;&nbsp;&nbsp;<i className="ui file excel outline icon"/> Excel</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>2.5</td>
                              <td>01 Oct. 2016 by <b>{c.contributor}</b></td>
                              <td>+43 / -52</td>
                              <td><i className="ui file text outline icon"/> MagIC Text&nbsp;&nbsp;&nbsp;<i className="ui file excel outline icon"/> Excel</td>
                            </tr>
                            <tr>
                              <td>1</td>
                              <td>2.4</td>
                              <td>10 Sep. 2016 by <b>MagIC Database Team</b></td>
                              <td>+2554 / -0</td>
                              <td><i className="ui file text outline icon"/> MagIC Text&nbsp;&nbsp;&nbsp;<i className="ui file excel outline icon"/> Excel</td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        : undefined)}
        {(this.props.view === 'private' ?
          <div className="ui attached segment cards" style={{marginBottom:0}}>
              <IconButton className="card" href="/MagIC/upload" portal="MagIC">
                <i className="large icons">
                  <i className="table icon"/>
                  <i className="corner add icon"/>
                </i>
                <div className="title">Upload</div>
                <div className="subtitle">Import data into your private workspace.</div>
              </IconButton>
          </div>
          : undefined)}
        {(this.props.view === 'private' ?
          <div className="ui error bottom attached message">
            Your private workspace is currently empty. Please upload your first contribution.
          </div>
          :
          undefined)}
        {(this.props.view === 'shared' ?
          <div className="ui error bottom attached message">
            No contributions are currently shared with you. Please ask your collaborator to share their contribution with you.
          </div>
          : undefined)}
        <div ref="no-match-message" className="ui hidden error bottom attached message">
          No references match your search. Please edit the search string.
        </div>
      </div>
    );
  }

}

