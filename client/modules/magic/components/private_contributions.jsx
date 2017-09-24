import _ from  'lodash';
import React from 'react';
import saveAs from 'save-as';
import Cookies from 'js-cookie';
import {Tracker}  from 'meteor/tracker';
import {portals} from '/lib/configs/portals';
import {Collections} from '/lib/collections';

import DividedList from '/client/modules/common/components/divided_list';
import SearchSummaryListItem from '/client/modules/magic/components/search_summaries_list_item';
import IconButton from '/client/modules/common/components/icon_button';
import {index} from '/lib/configs/magic/search_levels.js';

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
        Meteor.call('esActivateContribution', {index: index, id: id},
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
        this.privateContributions = _.reject(this.privateContributions, {summary: {contribution: {id: id}}});
        this.setState({taps: this.state.taps + 1});
        Meteor.call('esDeletePrivateContribution', {index: index, id: id, contributor: '@' + Cookies.get('user_id')},
          (error) => {
            if (error)
              $(this.refs['failed to delete']).modal('show');
            else
              this.updateContributions();
          }
        );
      }
    }).modal('show');
  }

  updateContributions() {
    if (!Cookies.get('user_id')) {
      this.setState({loaded: true});
    } else {
      Meteor.call('esGetPrivateContributionSummaries', {
        index: index,
        contributor: '@' + Cookies.get('user_id'),
        includeActivated: true
      }, (error, contributions) => {
        if (error) {
          console.error(error);
        } else {
          this.privateContributions = contributions/*t.map((c, i) => {
            let privateContribution = {contribution: c, errors: []};
            if (c && c.contribution && c.contribution[0] && c.contribution[0].doi) {
              //if (!c.contribution._doiData || !c._summary || !c._summary.contribution || !c._summary.contribution.CITATION)
                //this.updateDOI(i, c.contribution[0].doi);
              privateContribution.doi = c.contribution[0].doi;
            } else {
              privateContribution.doi = '';
            }
            if (!(c && c.contribution && c.contribution._summary && c.contribution._summary.contribution.summary.contribution.reference))
              privateContribution.errors.push("The contribution requires a valid DOI prior to activation.");
            return privateContribution;
          });*/
          //console.log('getPrivateContributions', this.privateContributions);
          this.setState({loaded: true, taps: this.state.taps + 1});
        }
      });
    }

  }

  updateName(i) {
    this.privateContributions[i].updatingName = true;
    this.setState({taps: this.state.taps + 1});
    Meteor.call("esUpdateContributionName", {
      index: index,
      id: this.privateContributions[i].summary.contribution.id,
      name: this.privateContributions[i].name
    }, (error, c) => {
      this.updateContributions();
    });
  }

  updateReference(i) {
    this.privateContributions[i].updatingReference = true;
    this.setState({taps: this.state.taps + 1});
    Meteor.call("esUpdateContributionReference", {
      index: index,
      contributor: '@' + Cookies.get('user_id'),
      _contributor: Cookies.get('name'),
      id: this.privateContributions[i].summary.contribution.id,
      reference: this.privateContributions[i].reference,
      description: this.privateContributions[i].summary.contribution.description,
    }, (error, c) => {
      this.updateContributions();
    });
  }

  updateDescription(i) {
    this.privateContributions[i].updatingDescription = true;
    this.setState({taps: this.state.taps + 1});
    Meteor.call("esUpdateContributionDescription", {
      index: index,
      id: this.privateContributions[i].summary.contribution.id,
      description: this.privateContributions[i].description
    }, (error, c) => {
      this.updateContributions();
    });
  }

  renderOffline() {
    return (
      <div ref="segment" className="ui warning message">
        <div className="header">
          Sorry for the inconvenience!
        </div>
        <br/>
        The <b>MagIC Private Workspace</b> is temporarily disabled until <b>4 September, 2017</b> while we make improvements to the system.
      </div>
    );
  }

  render() {
    console.log('privateContributions', this.privateContributions, Cookies.get('user_id'));
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
        {!this.state.loaded ?
          <div className="ui segment" style={{minHeight: '8em'}}>
            <div className="ui inverted active dimmer">
              <div className="ui text loader">Loading</div>
            </div>
          </div>
          :
          <div className="ui list" style={{margin: '0'}}>
            <IconButton className="card" link="/MagIC/upload" portal="MagIC" style={{marginBottom: '1.5em'}}>
              <i className="large icons">
                <i className="table icon"/>
                <i className="corner add icon"/>
              </i>
              <div className="title">Upload</div>
              <div className="subtitle">Import data into your private workspace.</div>
            </IconButton>
            {this.privateContributions.map((c,i) => {
              return (
                <div className="item" key={i} style={{marginBottom: "1.5em"}}>
                  <div className={portals['MagIC'].color + " ui top attached inverted segment"} style={{padding: '0.5em'}}>
                    <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                      <div style={{flex: '1 1 auto'}}>
                        <div className={"ui labeled fluid small icon input" + (c.updatingName ? " loading" : "")}>
                          <div className="ui label">
                            Private Contribution Name
                          </div>
                          <input type="text" default="None" placeholder="A name to help you remember which contribution you are working on" value={c.name !== undefined ? c.name : c.summary.contribution._name} readOnly={c.updatingName}
                                 onChange={(e) => {
                                   this.privateContributions[i].name = e.target.value;
                                   this.setState({taps: this.state.taps + 1});
                                 }}
                                 onKeyPress={function(i, e) {
                                   if (e.key === 'Enter') this.updateName(i);
                                 }.bind(this, i)}/>
                          {c.name !== undefined && <i className="red save link icon" onClick={function(i, e) {
                            this.updateName(i);
                          }.bind(this, i)}/>}
                        </div>
                      </div>
                      <div className="ui small button disabled" style={{margin: '0 0 0 0.5em'}}
                           onClick={(e) => {
                             this.uploadTo(c.summary.contribution.id);
                           }}
                      >
                        Add Data to This Study
                      </div>
                    </div>
                  </div>
                  <div className="ui attached secondary segment" style={{padding: '0.5em'}}>
                    <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                      <div style={{flex: '1 1 auto'}}>
                        <div className={"ui labeled fluid small icon input" + (c.updatingReference ? " loading" : "") + (c.summary.contribution._is_activated === "true" || c.summary.contribution._reference ? '' : ' error')}>
                          <div className={"ui label" + (c.summary.contribution._is_activated === "true" || c.summary.contribution._reference ? '' : ' red')} style={{position: "relative"}}>
                            DOI
                          </div>
                          <input type="text" default="None" placeholder="The study's DOI (required)" value={c.reference !== undefined ? c.reference : c.summary.contribution.reference} readOnly={c.updatingReference || c.summary.contribution._is_activated === "true"}
                                 onChange={(e) => {
                                   this.privateContributions[i].reference = e.target.value;
                                   this.setState({taps: this.state.taps + 1});
                                 }}
                                 onKeyPress={function(i, e) {
                                   if (e.key === 'Enter') this.updateReference(i);
                                 }.bind(this, i)}/>
                          {c.reference !== undefined && <i className="red save link icon" onClick={function(i, e) {
                            this.updateReference(i);
                          }.bind(this, i)}/>}
                        </div>
                      </div>
                      <div style={{flex: '1 1 auto', margin: '0 0 0 0.5em'}}>
                        <div className={"ui labeled fluid small icon input" + (c.updatingDescription ? " loading" : "")}>
                          <div className="ui label">
                            Description
                          </div>
                          <input type="text" default="None" placeholder="Describe the changes being made in this version" value={c.description !== undefined ? c.description : c.summary.contribution.description} readOnly={c.updatingDescription || c.summary.contribution._is_activated === "true"}
                                 onChange={(e) => {
                                   this.privateContributions[i].description = e.target.value;
                                   this.setState({taps: this.state.taps + 1});
                                 }}
                                 onKeyPress={function(i, e) {
                                   if (e.key === 'Enter') this.updateDescription(i);
                                 }.bind(this, i)}/>
                          {c.description !== undefined && <i className="red save link icon" onClick={function(i, e) {
                            this.updateDescription(i);
                          }.bind(this, i)}/>}
                        </div>
                      </div>
                      {c.summary.contribution._is_activated !== "true" ?
                        <div className={"ui small button " + (!c.summary.contribution._reference ? "disabled red" : portals['MagIC'].color)} style={{margin: '0 0 0 0.5em'}}
                             onClick={(e) => {
                               this.confirmActivate(c.summary.contribution.id);
                             }}
                        >
                          Activate
                        </div> :
                        <div className="ui green disabled small button" style={{margin: '0 0 0 0.5em'}}>
                          Activated
                        </div>
                      }
                      {c.summary.contribution._is_activated !== "true" &&
                      <div className={portals['MagIC'].color + ' ui basic small button delete-contribution'} style={{margin: '0 0 0 0.5em'}}
                           onClick={(e) => {
                             this.confirmDelete(c.summary.contribution.id);
                           }}
                      >
                        Delete
                      </div>
                      }
                      {c.summary.contribution._is_activated === "true" &&
                      <div className={portals['MagIC'].color + ' ui basic small button'} style={{margin: '0 0 0 0.5em'}}
                           onClick={(e) => {
                             console.log('deactivating');
                             Meteor.call('esDeactivateContribution', {index: index, id: c.summary.contribution.id},
                               (error) => { console.log('deactivated'); this.updateContributions(); }
                             );
                           }}
                      >
                        Deactivate
                      </div>
                      }
                    </div>
                  </div>
                  <div className="ui bottom attached segment" style={{padding: '1px 1em 0'}}>
                    <DividedList items={[c]}>
                      <SearchSummaryListItem table="contribution" collapsed/>
                    </DividedList>
                  </div>
                </div>
              );
            })}
          </div>
        }
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
              Warning! You cannot undo this delete.
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

