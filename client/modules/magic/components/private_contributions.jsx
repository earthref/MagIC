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
      loaded: false,
      privateContributions: []
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
  }

  componentDidUpdate() {

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
    let contributions = Collections['magic.private.contributions'].find({}, {'_inserted': -1}).fetch();
    let privateContributions = contributions.map((c, i) => {
      let privateContribution = {contribution: c, errors: []};
      if (c && c.contribution && c.contribution[0] && c.contribution[0].doi) {
        if (!c.contribution._doiData || !c._summary || !c._summary.contribution || !c._summary.contribution.CITATION)
          //this.updateDOI(i, c.contribution[0].doi);
        privateContribution.doi = c.contribution[0].doi;
      } else {
        privateContribution.doi = '';
      }
      if (!c._doiData)
        privateContribution.errors.push("The contribution requires a valid DOI prior to activation.");
      return privateContribution;
    });
    this.setState({privateContributions: privateContributions});
  }

  updateDOI(i, doi) {
    let privateContributions = this.state.privateContributions;
    if (privateContributions[i] && privateContributions[i].contribution && privateContributions[i].contribution._doiData)
      delete privateContributions[i].contribution._doiData;
    this.setState({privateContributions: privateContributions});
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "//api.crossref.org/works/" + doi,
    }).done((doiData) => {
      console.log('doi data', privateContributions[i], doiData);
      if (privateContributions[i] && privateContributions[i].contribution && privateContributions[i].contribution._id &&
          doiData && doiData.status === 'ok') {
        Meteor.call('updateDOI', privateContributions[i].contribution._id, doiData.message,
          (error) => {
            this.updateContributions();
          }
        );
      }
    });
  }

  render() {
    //const privateContributions = Collections['magic.private.contributions'].find({}, {'_inserted': -1}).fetch();
    console.log('privateContributions', this.state.privateContributions, Cookies.get('user_id'));
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
              {this.state.privateContributions.map((c,i) => {
                return (
                  <div className="item" key={i}>
                    {Cookies.get('mail_id') == '6869' ?
                    <div>
                      <textarea id="textarea" defaultValue={JSON.stringify(c.contribution._summary.contribution, null, '  ')} style={{width: '800px', height: '500px'}}></textarea>
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
                        <div className={"ui labeled fluid input" + (c.doi && c.contribution._doiData ? '' : ' error')}>
                          <div className={"ui label" + (c.doi && c.contribution._doiData ? '' : ' red')}>
                            DOI
                          </div>
                          <input type="text" default="None" value={c.doi}
                                 onChange={(e) => {
                                   let privateContributions = this.state.privateContributions;
                                   privateContributions[i].doi = e.target.value;
                                   this.setState({privateContributions: privateContributions});
                                   this.updateDOI(i, e.target.value);
                           }}/>
                        </div>
                      </div>
                      <div className={portals['MagIC'].color + ' ui basic button' + (c.errors.length ? ' disabled' : '')} style={{margin: '0 0 0 0.5em'}}
                           onClick={(e) => {
                             this.confirmActivate(c.contribution._id);
                           }}
                      >
                        <i className="checkmark icon"/>
                        Activate
                      </div>
                      <div className={portals['MagIC'].color + ' ui icon button delete-contribution'} style={{margin: '0 0 0 0.5em'}}
                        onClick={(e) => {
                          this.confirmDelete(c.contribution._id);
                        }}
                      >
                        <i className="close icon"/>
                        Delete
                      </div>
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
            <div className="ui red basic cancel inverted button">
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

