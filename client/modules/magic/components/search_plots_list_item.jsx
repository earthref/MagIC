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
    $(this.refs['accordion']).accordion({exclusive: false});
  }

  render() {
    const c = this.props.doc;
    console.log('plots', this.props);
    return (
      <div ref="accordion" className="ui accordion magic-contribution">
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
            <div className="ui cards" style={{padding:'1em 0', fontWeight:'normal', fontSize:'11px'}}>
              {(c.images ? c.images.map((image, i) =>
                <div className="card" key={i} style={{width:'150px'}}>
                  <div className="image">
                    <img className="ui bordered image"
                         src={'//static.earthref.org/imcache/Set(gravity:Center)%7CCrop(geometry:360x360+10+0)%7CResize(geometry:100x100)/images/MAGIC/static_plots/' +
                         c.contribution_id + '/' + image.name}
                         style={{minWidth:'150px', minHeight:'150px'}}
                    />
                  </div>
                  <div className="content">
                    <div className="header">
                      {image.title}
                    </div>
                    <div className="meta">
                      Type: {image.type}
                    </div>
                  </div>
              </div>
              ) : undefined)}
            </div>
          </div>
        </div>
        <div className="content">
          EXTRA
        </div>
      </div>
    );
  }
}

