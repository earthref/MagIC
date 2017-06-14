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
    this.privateContributions = [];
    this.state = {
      loaded: false,
      taps: 0
    };
  }

  componentDidMount() {
    $(this.refs['failed to delete']).modal({
      closable: false
    });
    $(this.refs['confirm activate']).modal({
      closable: false
    });
    $(this.refs['confirm delete']).modal({
      closable: false,
      onHide: ($modal) => {
        $(this.refs['confirm delete input']).val("");
      }
    });
    this.updateContributions();
  }

  confirmActivate(id) {
    $(this.refs['confirm activate']).modal('setting', {
      onApprove: ($modal) => {
        Meteor.call('activateContribution', id,
          (error) => {
            if (error)
              $(this.refs['failed to activate']).modal('show');
            else
              this.updateContributions();
          }
        );
      }
    }).modal('show');
  }

  confirmDelete(id) {
    $(this.refs['confirm delete']).modal('setting', {
      onApprove: ($modal) => {
        console.log("delete?", $(this.refs['confirm delete input']).val());
        if ($(this.refs['confirm delete input']).val() === 'DELETE') {
          console.log("deleting");
          Meteor.call('deleteContribution', id, '@' + Cookies.get('user_id'),
            (error) => {
              if (error)
                $(this.refs['failed to delete']).modal('show');
              else
                this.updateContributions();
            }
          );
        } else return false;
      }
    }).modal('show');
  }

  updateContributions() {
    if (!Cookies.get('user_id')) {
      this.setState({loaded: true});
    } else {
      Meteor.call('getPrivateContributions', '@' + Cookies.get('user_id'), (error, contributions) => {
        if (error) {
          console.error(error);
        } else {
          this.privateContributions = contributions.map((c, i) => {
            let privateContribution = {contribution: c, errors: []};
            if (c && c.contribution && c.contribution[0] && c.contribution[0].doi) {
              //if (!c.contribution._doiData || !c._summary || !c._summary.contribution || !c._summary.contribution.CITATION)
                //this.updateDOI(i, c.contribution[0].doi);
              privateContribution.doi = c.contribution[0].doi;
            } else {
              privateContribution.doi = '';
            }
            if (!c._doiData)
              privateContribution.errors.push("The contribution requires a valid DOI prior to activation.");
            return privateContribution;
          });
          console.log('getPrivateContributions', this.privateContributions);
          this.setState({loaded: true, taps: this.state.taps + 1});
        }
      });
    }

  }

  updateDOI(i, doi) {
    if (this.privateContributions[i] && this.privateContributions[i].contribution && this.privateContributions[i].contribution._doiData)
      delete this.privateContributions[i].contribution._doiData;
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "//api.crossref.org/works/" + doi,
    }).done((doiData) => {
      console.log('doi data', this.privateContributions[i], doiData);
      if (this.privateContributions[i] && this.privateContributions[i].contribution && this.privateContributions[i].contribution._id &&
          doiData && doiData.status === 'ok') {
        Meteor.call('updateDOI', this.privateContributions[i].contribution._id, doiData.message,
          (error, c) => {
            console.log('updateDOI', i, c, this.privateContributions);
            //privateContributions[i] = c;
            //this.setState({privateContributions: privateContributions, taps: this.state.taps+1});
            this.updateContributions();
            // 10.1073/pnas.1615797114
            // 10.5636/jgg.23.1
          }
        );
      }
    });
  }

  render() {
    console.log('privateContributions', this.privateContributions, Cookies.get('user_id'));
    if (!Cookies.get('user_id')) return (
      <div className="private-contributions">
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
              {this.privateContributions.map((c,i) => {
                return (
                  <div className="item" key={i}>
                    {Cookies.get('mail_id') == '5730' ?
                    <div>
                      <textarea defaultValue={
                        (c.contribution._summary ? JSON.stringify(c.contribution._summary.contribution, null, '  ') : '')
                      } style={{width: '100%', height: '50px'}}/>
                      <button
                        onClick={() => this.updateES(c.contribution)}
                      >
                        Update
                      </button>
                    </div>
                    : undefined
                    }
                    <div style={{display: 'flex', flexFlow: 'row wrap', marginTop: '0.5em', marginBottom: '0.5em'}}>
                      <div style={{flex: '1 1 auto'}}>
                        <div className={"ui labeled fluid input" + (c.contribution._activated || c.doi && c.contribution._doiData ? '' : ' error')}>
                          <div className={"ui label" + (c.contribution._activated || c.doi && c.contribution._doiData ? '' : ' red')}>
                            DOI
                          </div>
                          <input type="text" default="None" value={c.doi} readOnly={c.contribution._activated }
                                 onChange={(e) => {
                                   let privateContributions = this.privateContributions;
                                   privateContributions[i].doi = e.target.value;
                                   this.setState({privateContributions: privateContributions});
                                   this.updateDOI(i, e.target.value);
                           }}/>
                        </div>
                      </div>
                      {!c.contribution._activated ?
                        <div className={portals['MagIC'].color + ' ui icon button' + (c.errors.length || c.contribution._activated ? ' disabled' : '')} style={{margin: '0 0 0 0.5em'}}
                             onClick={(e) => {
                               this.confirmActivate(c.contribution._id);
                             }}
                        >
                          <i className="checkmark icon"/>
                          Activate
                        </div> :
                        <div className="ui green disabled icon button" style={{margin: '0 0 0 0.5em'}}>
                          <i className="checkmark icon"/>
                          Activated
                        </div>
                      }
                      {!c.contribution._activated ?
                        <div className={portals['MagIC'].color + ' ui basic icon button delete-contribution'} style={{margin: '0 0 0 0.5em'}}
                        onClick={(e) => {
                          this.confirmDelete(c.contribution._id);
                        }}
                      >
                        <i className="close icon"/>
                        Delete
                      </div> :undefined}
                    </div>
                    {c.contribution._summary && c.contribution._summary.contribution ?
                      <Summary doc={c.contribution._summary.contribution}/> : undefined
                    }
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
            Delete Your Private Contribution
          </div>
          <div className="content">
            <p>Failed to delete this contribution.</p>
          </div>
          <div className="actions">
            <div ref="failed to delete button" className="ui red basic cancel inverted button">
              <i className="remove icon"></i>
              Ok
            </div>
          </div>
        </div>
        <div ref="confirm delete" className="ui modal">
          <div className="ui icon header">
            <i className="file text outline icon"></i>
            Delete Your Private Contribution
          </div>
          <div className="content">
            <div className="ui icon error message">
              <i className="warning sign icon"></i>
              Warning! Deleting this contribution is irreversible.
            </div>
            <div className="ui basic segment">
              Please type "DELETE" below if this is your intention:
            </div>
            <div className="ui fluid large error input">
              <input ref="confirm delete input" defaultValue={''}/>
            </div>
          </div>
          <div className="actions">
            <div className="ui red approve button">
              <i className="remove icon"></i>
              Delete
            </div>
            <div className="ui cancel button">Cancel</div>
          </div>
        </div>
        <div ref="failed to activate" className="ui basic modal">
          <div className="ui icon header">
            <i className="file text outline icon"></i>
            Activate Your Private Contribution
          </div>
          <div className="content">
            <p>Failed to activate this contribution.</p>
          </div>
          <div className="actions">
            <div className="ui red basic cancel inverted button">
              <i className="remove icon"></i>
              Ok
            </div>
          </div>
        </div>
        <div ref="confirm activate" className="ui modal">
          <div className="ui icon header">
            <i className="file text outline icon"></i>
            Activate Your Private Contribution
          </div>
          <div className="content">
            <div className="ui icon error message">
              <i className="warning sign icon"></i>
              Warning! Activating your contribution makes the data publicly visible.
            </div>
          </div>
          <div className="actions">
            <div className="ui red approve button">
              <i className="check icon"></i>
              Activate
            </div>
            <div className="ui cancel button">Cancel</div>
          </div>
        </div>
      </div>
    );
  }

}

