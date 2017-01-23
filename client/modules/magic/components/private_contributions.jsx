import _ from  'lodash';
import React from 'react';
import saveAs from 'save-as';
import Cookies from 'js-cookie';
import {Tracker}  from 'meteor/tracker';
import {portals} from '../../common/configs/portals';
import {Collections} from '/lib/collections';
import Summary from './search_summaries_list_item';
import IconButton from '../../common/components/icon_button.jsx';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loaded: false,
      updating: false,
      contributions: [],
      dois: []
    };
    if (Cookies.get('user_id'))
      //Tracker.autorun(() => {
        Meteor.subscribe('magic.private.contributions.summaries', '@' + Cookies.get('user_id'), () => {
          //console.log('subscription ready');
          this.updateContributions();
          this.setState({loaded: true});
        });
      //});
  }

  updateContributions() {
    let contributions = Collections['magic.private.contributions'].find({}, {'_inserted': -1}).fetch();
    let dois = contributions.map((c) => {
      if(c && c.contribution && c.contribution[0] && c.contribution[0].doi) {
        if (!c._summary || !c._summary.contribution || !c._summary.contribution.CITATION)
          this.updateDOI(c, c.contribution[0].doi);
        return c.contribution[0].doi;
      } else return '';
    });
    this.setState({contributions: contributions, dois: dois});
  }

  updateDOI(c, doi) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "//api.crossref.org/works/" + doi,
    }).done((doiData) => {
      console.log(c, doiData);
      if (c && c._id && doiData && doiData.status === 'ok') {
        Meteor.call('updateDOI', c._id, doiData.message,
          (error) => {
            this.updateContributions();
          }
        );
      }
    });
  }

  render() {
    //const privateContributions = Collections['magic.private.contributions'].find({}, {'_inserted': -1}).fetch();
    console.log('privateContributions', this.state.contributions, Cookies.get('user_id'));
    return (
      <div style={{marginTop: '-3em'}}>
        <div ref="segment" className="ui bottom attached segment" style={{minHeight: '8em'}}>
          {!this.state.loaded ?
            <div ref="loading" className="ui inverted active dimmer">
              <div className="ui text loader">Loading</div>
            </div>
            :
            <div className="ui divided list" style={{margin: '0'}}>
              <IconButton className="card" href="/MagIC/upload" portal="MagIC">
                <i className="large icons">
                  <i className="table icon"/>
                  <i className="corner add icon"/>
                </i>
                <div className="title">Upload</div>
                <div className="subtitle">Import data into your private workspace.</div>
              </IconButton>
              {this.state.contributions.map((c,i) => {
                let doi = this.state.dois && this.state.dois[i] || '';
                return (
                  <div className="item" key={i}>
                    <div style={{display: 'flex', flexFlow: 'row wrap', marginTop: '0.5em', marginBottom: '0.5em'}}>
                      <div style={{flex: '1 1 auto'}}>
                        <div className={"ui labeled fluid input" + (doi ? '' : ' error') + (this.state._id ? ' disabled' : '')}>
                          <div className={"ui label" + (doi ? '' : ' red')}>
                            DOI
                          </div>
                          <input type="text" default="None" value={doi}
                                 onChange={(e) => {
                                   let dois = this.state.dois;
                                   dois[i] = e.target.value;
                                   this.setState({dois: dois});
                                   this.updateDOI(c, e.target.value);
                           }}/>
                        </div>
                      </div>
                      <div className={portals['MagIC'].color + ' ui basic disabled button'} style={{margin: '0 0 0 0.5em'}}>
                        <i className="add user icon"/>
                        Share
                      </div>
                      <div className={portals['MagIC'].color + ' ui basic button' + (c.contribution && c.contribution[0] && c.contribution[0].doi ? '' : ' disabled')} style={{margin: '0 0 0 0.5em'}}>
                        <i className="checkmark icon"/>
                        Activate
                      </div>
                      <div className={portals['MagIC'].color + ' ui icon button'} style={{margin: '0 0 0 0.5em'}}
                        onClick={(e) => {
                          Meteor.call('deleteContribution', c._id, '@' + Cookies.get('user_id'),
                            (error) => {
                              this.updateContributions();
                            }
                          );
                        }}
                      >
                        <i className="close icon"/>
                        Delete
                      </div>
                    </div>
                    {c._summary && c._summary.contribution ? <Summary doc={c._summary.contribution} mongoID={c._id} key={i}/> : undefined}
                  </div>
                );
              })}
            </div>
          }
        </div>
        <div ref="no-match-message" className="ui hidden error bottom attached message">
          None of your contributions match your search. Please edit the search string.
        </div>
        <div ref="failed to delete" className="ui basic modal">
          <div className="ui icon header">
            <i className="file text outline icon"></i>
            Delete Private Contribution
          </div>
          <div className="content">
            <p>Failed to delete this contribution.</p>
          </div>
          <div className="actions">
            <div className="ui red basic cancel inverted button">
              <i className="remove icon"></i>
              Ok
            </div>
          </div>
        </div>
      </div>
    );
  }

}

