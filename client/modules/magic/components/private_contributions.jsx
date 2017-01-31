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
            //this.updateContributions();
          }
        );
      }
    });
  }

  updateES(c) {
    console.log(JSON.parse($("#textarea").val()));
    Meteor.call('updateES', c._es_id, JSON.parse($("#textarea").val()),
      (error) => {
        console.log('updated contribution', this.state._id, error);
      }
    );
  }

  preview() {

  }

  deactivate() {

  }

  activate() {

  }

  render() {
    //const privateContributions = Collections['magic.private.contributions'].find({}, {'_inserted': -1}).fetch();
    console.log('privateContributions', this.state.contributions, Cookies.get('user_id'));
    if (!Cookies.get('user_id')) return (
      <div>
        <div className="ui top attached segment">
          <div className="ui center aligned two column relaxed grid">
            <div className="column">
              <IconButton
                className="borderless card" href="" portal="MagIC"
                onClick={() => location.href = '//earthref.org/log-out/?next_url=/log-in%3Fnext_url=' + window.location.href}
              >
                <i className="icons">
                  <i className="user icon"/>
                  <i className="sign in corner icon"/>
                </i>
                <div className="title">Log In</div>
              </IconButton>
            </div>
            <div className="ui vertical divider">
              OR
            </div>
            <div className="column">
              <IconButton
                className="borderless card" href="" portal="MagIC"
                onClick={() => location.href = '//earthref.org/register/'}
              >
                <i className="icons">
                  <i className="user icon"/>
                  <i className="plus corner icon"/>
                </i>
                <div className="title">Join EarthRef.org</div>
              </IconButton>
            </div>
          </div>
        </div>
        <div className="ui bottom attached icon error message">
          <i className="warning sign icon"/>
          <div className="content">
            Please log in to EarthRef.org before managing to your private workspace.
          </div>
        </div>
      </div>
    );
    else return (
      <div>
        <div ref="segment" className="ui segment" style={{minHeight: '8em'}}>
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
                    {Cookies.get('mail_id') == '6869' ?
                    <div>
                      <textarea id="textarea" defaultValue={JSON.stringify(c._summary.contribution, null, '  ')} style={{width: '800px', height: '500px'}}></textarea>
                      <button
                        onClick={() => this.updateES(c)}
                      >
                        Update
                      </button>
                    </div>
                    : undefined
                    }
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
                      <div className={portals['MagIC'].color + ' ui button'} style={{margin: '0 0 0 0.5em'}}
                           onClick={this.preview.bind(this)}
                      >
                        <i className="checkmark icon"/>
                        Preview
                      </div>
                      <div className={portals['MagIC'].color + ' ui basic button' + (c.contribution && c.contribution[0] && c.contribution[0].doi ? '' : ' disabled')} style={{margin: '0 0 0 0.5em'}}
                           onClick={this.activate.bind(this)}
                      >
                        <i className="checkmark icon"/>
                        Activate
                      </div>
                      {Cookies.get('user_id') === 'rminnett' ?
                        <div className={portals['MagIC'].color + ' ui basic button' + (c.UPLOAD !== 0 ? '' : ' disabled')} style={{margin: '0 0 0 0.5em'}}
                             onClick={this.deactivate.bind(this)}
                        >
                        <i className="checkmark icon"/>
                        Deactivate
                        </div>
                        :
                        undefined
                      }
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

