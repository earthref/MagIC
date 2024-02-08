import _ from  "lodash";
import numeral from 'numeral';
import getRanges from 'get-ranges';
import React from "react";
import {Link} from 'react-router-dom';
import saveAs from "save-as";
import Cookies from "js-cookie";
import {Tracker}  from "meteor/tracker";
import {portals} from "/lib/configs/portals";
import {Collections} from "/lib/collections";
import { Accordion, List, Dropdown, Tab, Input } from 'semantic-ui-react';

import Count from '/client/modules/common/containers/search_count';
import DividedList from "/client/modules/common/components/search_divided_list";
import SearchSummariesListItem from "/client/modules/magic/containers/search_summaries_list_item";
import IconButton from "/client/modules/common/components/icon_button";
import {index} from "/lib/configs/magic/search_levels.js";
import {versions, models} from '/lib/configs/magic/data_models';
import {cvs} from '/lib/modules/er/controlled_vocabularies';
import { css } from "jquery";

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.privateContributions = [];
    this.state = {
      loaded: false,
      validation: { errors: [], warnings: [] },
      activated: false,
      taps: 0
    };
  }

  componentDidMount() {
    $(this.refs["failed to delete"]).modal({
      closable: false
    });
    $(this.refs["confirm activate"]).modal({
      closable: false
    });
    $(this.refs["confirm delete"]).modal({
      closable: false,
      onHide: ($modal) => {
        $(this.refs["confirm delete input"]).val("");
      }
    });
    this.updateContributions();
  }

  validate(id, activate) {
    $(this.refs["validate loading"]).height($(window).height() - 400).show();
    $(this.refs["validate results"]).height($(window).height() - 400).hide();
    $(this.refs["validate error"]).hide();
    $(this.refs["validate"]).modal().modal("show");
    Meteor.call("esValidatePrivateContribution", {index: index, id: id, contributor: "@" + Cookies.get("user_id", Meteor.isDevelopment ? {} : { domain: '.earthref.org'})},
      (error, validation) => {
        if (error) {
          $(this.refs["validate error"]).html(error.message);
          $(this.refs["validate loading"]).hide();
          $(this.refs["validate results"]).hide();
          $(this.refs["validate error"]).show();
        } else if (activate && this.nValidationErrors(validation) === 0) {
          $(this.refs["validate loading"]).hide();
          $(this.refs["validate results"]).hide();
          $(this.refs["validate error"]).hide();
          this.confirmActivate(id);
        } else {
          this.setState({validation}, () => {
            $(this.refs["validate loading"]).hide();
            $(this.refs["validate error"]).hide();
            $(this.refs["validate results"]).show();
          });
        }
        this.updateContributions();
      }
    );
  }

  validateThenActivate(id) {
    this.validate(id, true);
  }

  confirmActivate(id) {
    $(this.refs["confirm activate"]).modal("setting", {
      onApprove: ($modal) => {
        Meteor.call("esActivateContribution", {index: index, id: id},
          (error) => {
            if (error)
              $(this.refs["failed to activate"]).modal("show");
            else
              this.updateContributions();
          }
        );
      }
    }).modal("show");
  }

  confirmDelete(id) {
    $(this.refs["confirm delete"]).modal("setting", {
      onApprove: ($modal) => {
        this.privateContributions = _.reject(this.privateContributions, {summary: {contribution: {id: id}}});
        this.setState({taps: this.state.taps + 1});
        Meteor.call("esDeletePrivateContribution", {index: index, id: id, contributor: "@" + Cookies.get("user_id", Meteor.isDevelopment ? {} : { domain: '.earthref.org'})},
          (error) => {
            if (error)
              $(this.refs["failed to delete"]).modal("show");
            else
              this.updateContributions();
          }
        );
      }
    }).modal("show");
  }

  showShareLink(id, private_key) {
    $(this.refs["share link"]).val(`https://earthref.org/MagIC/${id}/${private_key}`);
    $(this.refs["share"]).modal("show");
  }

  updateContributions() {
    if (!Cookies.get("user_id", Meteor.isDevelopment ? {} : { domain: '.earthref.org'})) {
      this.setState({loaded: true});
    } else {
      this.setState({loaded: false});
      Meteor.call("esGetPrivateContributionSummaries", {
        index: index,
        contributor: "@" + Cookies.get("user_id", Meteor.isDevelopment ? {} : { domain: '.earthref.org'}),
        activated: this.state.activated
      }, (error, contributions) => {
        if (error) {
          console.error(error);
        } else {
          this.privateContributions = contributions;
          this.setState({loaded: true, taps: this.state.taps + 1});
        }
      });
    }

  }

  updateName(i) {
    this.privateContributions[i].updatingName = true;
    this.setState({taps: this.state.taps + 1}, () =>
      Meteor.call("esUpdateContributionName", {
        index: index,
        id: this.privateContributions[i].summary.contribution.id,
        name: this.privateContributions[i].name
      }, (error, c) => {
        this.updateContributions();
      })
    );
  }

  updateReference(i) {
    this.privateContributions[i].updatingReference = true;
    this.privateContributions[i].summary.contribution._reference = {};
    this.setState({taps: this.state.taps + 1}, () =>
      Meteor.call("esUpdateContributionReference", {
        index: index,
        contributor: "@" + Cookies.get("user_id", Meteor.isDevelopment ? {} : { domain: '.earthref.org'}),
        _contributor: Cookies.get("name", Meteor.isDevelopment ? {} : { domain: '.earthref.org'}),
        id: this.privateContributions[i].summary.contribution.id,
        reference: this.privateContributions[i].reference,
        description: this.privateContributions[i].summary.contribution.description,
      }, (error, c) => {
        this.updateContributions();
      })
    );
  }

  updateDescription(i) {
    this.privateContributions[i].updatingDescription = true;
    this.setState({taps: this.state.taps + 1}, () =>
      Meteor.call("esUpdateContributionDescription", {
        index: index,
        id: this.privateContributions[i].summary.contribution.id,
        description: this.privateContributions[i].description
      }, (error, c) => {
        this.updateContributions();
      })
    );
  }

  updateLabNames(i) {
    this.privateContributions[i].updatingLabNames = true;
    this.setState({taps: this.state.taps + 1}, () =>
      Meteor.call("esUpdateContributionData", {
        index: index,
        id: this.privateContributions[i].summary.contribution.id,
        field: "lab_names",
        list: this.privateContributions[i].lab_names,
        delimiter: ":"
      }, (error, c) => {
        this.updateContributions();
      })
    );
  }

  updateFunding(i) {
    this.privateContributions[i].updatingFunding = true;
    this.setState({taps: this.state.taps + 1}, () =>
      Meteor.call("esUpdateContributionData", {
        index: index,
        id: this.privateContributions[i].summary.contribution.id,
        field: "funding",
        list: this.privateContributions[i].funding && this.privateContributions[i].funding.map(x =>
          `${x.title}[${x.url}]`
        ) || [],
        delimiter: ";"
      }, (error, c) => {
        this.updateContributions();
      })
    );
  }

  updateSupplementalLinks(i) {
    this.privateContributions[i].updatingSupplementalLinks = true;
    this.setState({taps: this.state.taps + 1}, () =>
      Meteor.call("esUpdateContributionData", {
        index: index,
        id: this.privateContributions[i].summary.contribution.id,
        field: "supplemental_links",
        list: this.privateContributions[i].supplemental_links && this.privateContributions[i].supplemental_links.map(x =>
          `${x.title}[${x.url}]`
        ) || [],
        delimiter: ";"
      }, (error, c) => {
        this.updateContributions();
      })
    );
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

  nValidationWarnings(validation) {
    return validation && _.reduce(_.keys(validation.warnings), (n, table) => 
      n + _.reduce(_.keys(validation.warnings[table]), (nTable, column) =>
        nTable + _.keys(validation.warnings[table][column]).length,
      0),
    0);
  }

  nValidationErrors(validation) {
    return validation && _.reduce(_.keys(validation.errors), (n, table) => 
      n + _.reduce(_.keys(validation.errors[table]), (nTable, column) =>
        nTable + _.keys(validation.errors[table][column]).length,
      0),
    0);
  }

  render() {

    const nValidationWarnings = this.nValidationWarnings(this.state.validation);
    const strValidationWarnings = numeral(nValidationWarnings).format('0,0') + ' Validation Warning' + (nValidationWarnings === 1 ? '' : 's');

    const nValidationErrors = this.nValidationErrors(this.state.validation);
    const strValidationErrors = numeral(nValidationErrors).format('0,0') + ' Validation Error' + (nValidationErrors === 1 ? '' : 's');

    console.log("privateContributions", this.privateContributions, Cookies.get("user_id", Meteor.isDevelopment ? {} : { domain: '.earthref.org'}));
    if (!Cookies.get("user_id", Meteor.isDevelopment ? {} : { domain: '.earthref.org'})) return (
      <div>
        <div className="ui top attached segment" ref={(el) => el && el.style.setProperty('width', 'calc(100% + 2px)', 'important')}>
          <div className="ui center aligned two column relaxed grid">
            <div className="column">
              <IconButton
                className="borderless card" href="" portal="MagIC"
                onClick={() => location.href = "//earthref.org/log-out/?next_url=/log-in%3Fnext_url=" + window.location.href}
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
                onClick={() => location.href = "//earthref.org/register/"}
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
        <div className="ui list" style={{margin: "0"}}>
          <Link className={portals['MagIC'].color + ' ui icon button'} style={{float:'right', margin:'0 0 0.5em'}} to="/MagIC/upload">
            <i className="add icon"/> Upload Data Into Your Private Workspace
          </Link>
          <button className={(this.state.activated ? '' : portals['MagIC'].color) + ' ui icon button'} style={{margin:'0 1em 0.5em 0'}} onClick={() => { this.setState({ activated: false }, this.updateContributions.bind(this))}}>
            <i className="edit icon"/> In Preparation
            <div className="ui circular small basic label" style={{color: '#0C0C0C', margin: '-1em -0.5em -1em 0.5em', minWidth: '4em'}}>
              <Count
                es={{ index: 'magic', type: 'contribution', allVersions: true, filters: [
                  {"term": { "summary.contribution.contributor.raw": "@" + Cookies.get("user_id", Meteor.isDevelopment ? {} : { domain: '.earthref.org'}) }},
                  {"term": { "summary.contribution._is_activated": "false" }}
                ] }}
              />
            </div>
          </button>
          <button className={(!this.state.activated ? '' : portals['MagIC'].color) + ' ui icon button'} style={{margin:'0 1em 0.5em 0'}} onClick={() => { this.setState({ activated: true }, this.updateContributions.bind(this))}}>
            <i className="clipboard check icon"/> Published 
            <div className="ui circular small basic label" style={{color: '#0C0C0C', margin: '-1em -0.5em -1em 0.5em', minWidth: '4em'}}>
              <Count
                es={{ index: 'magic', type: 'contribution', allVersions: true, filters: [
                  {"term": { "summary.contribution.contributor.raw": "@" + Cookies.get("user_id", Meteor.isDevelopment ? {} : { domain: '.earthref.org'}) }},
                  {"term": { "summary.contribution._is_activated": "true" }}
                ] }}
              />
            </div>
          </button>
          {!this.state.loaded ?
            <div className="ui segment" style={{minHeight: "8em"}}>
              <div className="ui inverted active dimmer">
                <div className="ui text loader">Loading</div>
              </div>
            </div>
          :
          this.privateContributions.map((c,i) => {
            let hasReference = c.summary.contribution._reference && c.summary.contribution._reference.doi;
            
            let labNames = c.lab_names || c.summary.contribution.lab_names && (
              _.isArray(c.summary.contribution.lab_names) ? 
                c.summary.contribution.lab_names : 
                c.summary.contribution.lab_names.split(':')
            ) || [];

            let funding = c.funding || c.summary.contribution.funding && (
              _.isArray(c.summary.contribution.funding) ? 
                c.summary.contribution.funding.map(x => {
                  let y = x.split('[');
                  return {title: y[0], url: y.length > 1 && y[1].substr(0, y[1].length-1) || ''}
                }) : 
                c.summary.contribution.funding.split(';').map(x => {
                  let y = x.split('[');
                  return {title: y[0], url: y.length > 1 && y[1].substr(0, y[1].length-1) || ''}
                })
            ) || [];

            let supplementalLinks = c.supplemental_links || c.summary.contribution.supplemental_links && (
              _.isArray(c.summary.contribution.supplemental_links) ? 
                c.summary.contribution.supplemental_links.map(x => {
                  let y = x.split('[');
                  return {title: y[0], url: y.length > 1 && y[1].substr(0, y[1].length-1) || ''}
                }) : 
                c.summary.contribution.supplemental_links.split(';').map(x => {
                  let y = x.split('[');
                  return {title: y[0], url: y.length > 1 && y[1].substr(0, y[1].length-1) || ''}
                })
            ) || [];

            //console.log("ref", c, noReference);
            return (
              <div className="item" key={i} style={{marginBottom: "1.5em"}}>
                <div className={portals["MagIC"].color + " ui top attached inverted segment"} style={{padding: "0.5em"}} ref={(el) => el && el.style.setProperty('width', 'calc(100% + 2px)', 'important')}>
                  <div style={{display: "flex", flexFlow: "row wrap"}}>
                    <div style={{flex: "1 1 auto"}}>
                      <div className="ui labeled fluid small input">
                        <div className="ui label">
                          Private Contribution Name
                        </div>
                        <input type="text" default="None"
                          placeholder="A name to help you remember which contribution you are working on"
                          value={c.name !== undefined ? c.name : c.summary.contribution._name} readOnly={c.updatingName}
                          style={{ borderRadius: 0 }}
                          onChange={(e) => {
                            c.name = e.target.value;
                            this.setState({taps: this.state.taps + 1});
                          }}
                          onKeyPress={function(i, e) {
                            if (e.key === "Enter") this.updateName(i);
                          }.bind(this, i)}
                        />
                        <div className={
                            "ui small right attached icon button" + 
                            (c.name === undefined ? " disabled" : " red") + 
                            (c.updatingName ? " disabled loading" : "")
                          }
                          style={{ marginRight: 0 }}
                          onClick={function(i, e) {
                            this.updateName(i);
                          }.bind(this, i)}
                        >
                          <i className="save link icon"/>&nbsp;Save
                        </div>
                      </div>
                    </div>
                    {c.summary.contribution._is_activated !== "true" &&
                      <div className="ui small button" style={{margin: "0 0 0 0.5em"}}
                          onClick={(e) => {
                            this.showShareLink(c.summary.contribution.id, c.summary.contribution._private_key);
                          }}
                      >
                        Share
                      </div>
                    }
                    {c.summary.contribution._is_activated !== "true" &&
                      <div className="ui small button" style={{margin: "0 0 0 0.5em"}}
                          onClick={(e) => {
                            this.confirmDelete(c.summary.contribution.id);
                          }}
                      >
                        Delete
                      </div>
                    }
                  </div>
                </div>
                <div className="ui attached secondary segment" style={{padding: "0.5em"}} ref={(el) => el && el.style.setProperty('width', 'calc(100% + 2px)', 'important')}>
                  <div style={{display: "flex"}}>
                    <div style={{flex: "1 1 auto"}}>
                      <div className={"ui corner labeled fluid small input" + (!labNames.length ? " error": "")}>
                        <div className={"ui label" + (!labNames.length ? " red": "")}
                          style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                        >
                          Labs
                        </div>
                        <Dropdown multiple selection search
                          error={!labNames.length}
                          defaultValue={labNames}
                          placeholder="Select one or more labs where the measurements were made (required)"
                          style={{ borderRadius: 0, flexGrow: 1 }}
                          header = "Ordered by University / Institution Name:"
                          options={
                            cvs && cvs.lab_names && cvs.lab_names.items && cvs.lab_names.items.map(item => {
                              return {
                                key: item.item,
                                text: item.item,
                                value: item.item
                              };
                            })
                          }
                          onChange={(e, data) => {
                            c.lab_names = data.value;
                            this.setState({taps: this.state.taps + 1});
                          }}
                          onKeyPress={function(i, e) {
                            if (e.key === "Enter") this.updateLabNames(i);
                          }.bind(this, i)}
                        />
                        <div className={
                            "ui small right attached icon button" + 
                            (c.lab_names === undefined ? " disabled" : " red") + 
                            (c.updatingLabNames ? " disabled loading" : "")
                          }
                          style={{ marginRight: 0, whiteSpace: "nowrap" }}
                          onClick={function(i, e) {
                            this.updateLabNames(i);
                          }.bind(this, i)}
                        >
                          <i className="save link icon"/> Save
                        </div>
                      </div>
                    </div>
                    <div className="ui small purple button" style={{margin: "0 0 0 0.5em", whiteSpace: "nowrap" }}
                      onClick={function (i, e) {
                        c.funding = c.funding || funding;
                        c.funding.push({ title: "", url: ""});
                        this.updateFunding(i);
                      }.bind(this, i)}
                    >
                      <i className="add icon"/>Funding
                    </div>
                    <div className="ui small purple button" style={{margin: "0 0 0 0.5em", whiteSpace: "nowrap" }}
                      onClick={function (i, e) {
                        c.supplemental_links = c.supplemental_links || supplementalLinks;
                        c.supplemental_links.push({ title: "", url: ""});
                        this.updateSupplementalLinks(i);
                      }.bind(this, i)}
                    >
                      <i className="add icon"/>Supplement
                    </div>
                  </div>
                </div>
                {funding && funding.map((funding_item, j) =>
                  <div className="ui attached secondary segment" style={{padding: "0.5em"}} ref={(el) => el && el.style.setProperty('width', 'calc(100% + 2px)', 'important')}>
                    <div style={{display: "flex"}}>
                      <div style={{flex: "1 1 auto"}}>
                        <div className="ui labeled fluid small input">
                          <div className="ui label" style={{position: "relative"}}>
                            Funding
                          </div>
                          <input type="text" default="None"
                            placeholder="Grant Title"
                            value={funding_item.title} readOnly={c.updatingFunding}
                            style={{ borderRadius: 0 }}
                            onChange={(e) => {
                              c.funding = c.funding || funding;
                              c.funding[j].title = e.target.value;
                              this.setState({taps: this.state.taps + 1});
                            }}
                            onKeyPress={function(i, e) {
                              if (e.key === "Enter") this.updateFunding(i);
                            }.bind(this, i)}
                          />
                          <input type="text" default="None"
                            placeholder="Grant URL"
                            value={funding_item.url} readOnly={c.updatingFunding}
                            style={{ borderRadius: 0 }}
                            onChange={(e) => {
                              c.funding = c.funding || funding;
                              c.funding[j].url = e.target.value;
                              this.setState({taps: this.state.taps + 1});
                            }}
                            onKeyPress={function(i, e) {
                              if (e.key === "Enter") this.updateFunding(i);
                            }.bind(this, i)}
                          />
                          <div className={
                              "ui small right attached icon button" + 
                              (c.funding === undefined ? " disabled" : " red") + 
                              (c.updatingFunding ? " disabled loading" : "")
                            }
                            style={{ marginRight: 0, whiteSpace: "nowrap" }}
                            onClick={function(i, e) {
                              c.funding = c.funding || funding;
                              this.updateFunding(i);
                            }.bind(this, i)}
                          >
                            <i className="save link icon"/> Save
                          </div>
                        </div>
                      </div>
                      <div className={"ui small purple button" + 
                          (c.updatingFunding ? " disabled loading" : "")
                        } style={{margin: "0 0 0 0.5em", whiteSpace: "nowrap" }}
                        onClick={function (i, e) {
                          c.funding = c.funding || funding;
                          c.funding.splice(j, 1);
                          this.updateFunding(i);
                        }.bind(this, i)}
                      >
                        <i className="minus icon"/>This Funding
                      </div>
                    </div>
                  </div>
                )}
                {supplementalLinks && supplementalLinks.map((supplemental_link_item, j) =>
                  <div className="ui attached secondary segment" style={{padding: "0.5em"}} ref={(el) => el && el.style.setProperty('width', 'calc(100% + 2px)', 'important')}>
                    <div style={{display: "flex"}}>
                      <div style={{flex: "1 1 auto"}}>
                        <div className="ui labeled fluid small input">
                          <div className="ui label" style={{position: "relative"}}>
                            Supplement
                          </div>
                          <input type="text" default="None"
                            placeholder="Supplement Title"
                            value={supplemental_link_item.title} readOnly={c.updateSupplementalLinks}
                            style={{ borderRadius: 0 }}
                            onChange={(e) => {
                              c.supplemental_links = c.supplemental_links || supplementalLinks;
                              c.supplemental_links[j].title = e.target.value;
                              this.setState({taps: this.state.taps + 1});
                            }}
                            onKeyPress={function(i, e) {
                              if (e.key === "Enter") this.updateSupplementalLinks(i);
                            }.bind(this, i)}
                          />
                          <input type="text" default="None"
                            placeholder="Supplement URL"
                            value={supplemental_link_item.url} readOnly={c.updatingSupplementalLinks}
                            style={{ borderRadius: 0 }}
                            onChange={(e) => {
                              c.supplemental_links = c.supplemental_links || supplementalLinks;
                              c.supplemental_links[j].url = e.target.value;
                              this.setState({taps: this.state.taps + 1});
                            }}
                            onKeyPress={function(i, e) {
                              if (e.key === "Enter") this.updateSupplementalLinks(i);
                            }.bind(this, i)}
                          />
                          <div className={
                              "ui small right attached icon button" + 
                              (c.supplemental_links === undefined ? " disabled" : " red") + 
                              (c.updatingSupplementalLinks ? " disabled loading" : "")
                            }
                            style={{ marginRight: 0, whiteSpace: "nowrap" }}
                            onClick={function(i, e) {
                              c.supplemental_links = c.supplemental_links || supplementalLinks;
                              this.updateSupplementalLinks(i);
                            }.bind(this, i)}
                          >
                            <i className="save link icon"/> Save
                          </div>
                        </div>
                      </div>
                      <div className={"ui small purple button" + 
                          (c.updatingSupplementalLinks ? " disabled loading" : "")
                        } style={{margin: "0 0 0 0.5em", whiteSpace: "nowrap" }}
                        onClick={function (i, e) {
                          c.supplemental_links = c.supplemental_links || supplementalLinks;
                          c.supplemental_links.splice(j, 1);
                          this.updateSupplementalLinks(i);
                        }.bind(this, i)}
                      >
                        <i className="minus icon"/>This Supplement
                      </div>
                    </div>
                  </div>
                )}
                <div className="ui attached secondary segment" style={{padding: "0.5em"}} ref={(el) => el && el.style.setProperty('width', 'calc(100% + 2px)', 'important')}>
                  <div style={{display: "flex", flexFlow: "row wrap"}}>
                    <div style={{flex: "1 1 auto"}}>
                      <div className={"ui labeled fluid small input" + (c.summary.contribution._is_activated == "true" || hasReference ? "" : " error")}>
                        <div className={"ui label" + (c.summary.contribution._is_activated === "true" || hasReference ? "" : " red")} style={{position: "relative"}}>
                          DOI
                        </div>
                        <input type="text" default="None" placeholder="The study's DOI (required)" 
                          value={c.reference !== undefined ? c.reference : c.summary.contribution.reference} 
                          readOnly={c.updatingReference || c.summary.contribution._is_activated === "true"}
                          style={{ borderRadius: 0 }}
                          onChange={(e) => {
                            c.reference = e.target.value;
                            this.setState({taps: this.state.taps + 1});
                          }}
                          onKeyPress={function(i, e) {
                            if (e.key === "Enter") this.updateReference(i);
                          }.bind(this, i)}
                          title="After your paper is published, you may need to wait up to a day for the paper's DOI to register, but generally it should work an hour or two. Re-enter the DOI to try again."
                        />
                        <div className={
                            "ui small right attached icon button" + 
                            (c.reference === undefined ? " disabled" : " red") + 
                            (c.updatingReference ? " disabled loading" : "")
                          }
                          onClick={function(i, e) {
                            this.updateReference(i);
                          }.bind(this, i)}
                        >
                          <i className="save link icon"/>&nbsp;Save
                        </div>
                      </div>
                    </div>
                    <div style={{flex: "1 1 auto", margin: "0 0 0 0.5em"}}>
                      <div className="ui labeled fluid small input">
                        <div className="ui label">
                          Description
                        </div>
                        <input type="text" default="None"
                          placeholder="Describe the changes being made in this version"
                          value={c.description !== undefined ? c.description : c.summary.contribution.description}
                          readOnly={c.updatingDescription || c.summary.contribution._is_activated === "true"}
                          style={{ borderRadius: 0 }}
                          onChange={(e) => {
                            c.description = e.target.value;
                            this.setState({taps: this.state.taps + 1});
                          }}
                          onKeyPress={function(i, e) {
                            if (e.key === "Enter") this.updateDescription(i);
                          }.bind(this, i)}
                        />
                        <div className={
                            "ui small right attached icon button" + 
                            (c.description === undefined ? " disabled" : " red") + 
                            (c.updatingDescription ? " disabled loading" : "")
                          }
                          onClick={function(i, e) {
                            this.updateDescription(i);
                          }.bind(this, i)}
                        >
                          <i className="save link icon"/>&nbsp;Save
                        </div>
                      </div>
                    </div>
                    {c.summary.contribution._is_activated !== "true" && c.summary.contribution._is_valid !== "true" &&
                      <div className={"ui red small button"} style={{margin: "0 0 0 0.5em"}}
                          onClick={(e) => {
                            this.validate(c.summary.contribution.id);
                          }}
                      >
                        Validate
                      </div>
                    }
                    {c.summary.contribution._is_activated !== "true" && c.summary.contribution._is_valid === "true" &&
                      <div className={"ui small button " + (hasReference ? portals["MagIC"].color : "disabled red")} style={{margin: "0 0 0 0.5em"}}
                        onClick={(e) => {
                          this.validateThenActivate(c.summary.contribution.id);
                        }}
                      >
                        Publish
                      </div>
                    }
                    {c.summary.contribution._is_activated === "true" &&
                      <div className="ui green disabled small button" style={{margin: "0 0 0 0.5em"}}>
                        Published
                      </div>
                    }
                    {c.summary.contribution._is_activated === "true" && Meteor.isDevelopment && 
                    <div className={portals["MagIC"].color + " ui basic small button"} style={{margin: "0 0 0 0.5em"}}
                        onClick={(e) => {
                          console.log("deactivating");
                          Meteor.call("esDeactivateContribution", {index: index, id: c.summary.contribution.id},
                            (error) => { console.log("deactivated"); this.updateContributions(); }
                          );
                        }}
                    >
                      Make Private
                    </div>
                    }
                  </div>
                </div>
                <div className="ui bottom attached segment" style={{padding: "1px 1em 0"}} ref={(el) => el && el.style.setProperty('width', 'calc(100% + 2px)', 'important')}>
                  <DividedList items={[c]}>
                    <SearchSummariesListItem table="contribution" collapsed/>
                  </DividedList>
                </div>
              </div>
            );
          })}
        </div>
        { this.state.loaded && this.privateContributions.length === 0 && 
          <div className="ui fluid warning message">
            <div className="ui center aligned huge basic segment">
              No Items to Display
            </div>
          </div>
        }
        <div ref="share" className="ui modal">
          <div className="ui icon header">
            <i className="add user icon"></i>
            Share Your Private Contribution
          </div>
          <div className="content">
            <div className="ui fluid input">
              <input ref="share link" type="text" readOnly={true}/>
            </div>
          </div>
          <div className="actions">
            <div className="ui black deny button">
              OK
            </div>
          </div>
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
              OK
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
            Publish Your Private Contribution
          </div>
          <div className="content">
            <p>Error: Failed to publish this contribution. Please email <a href="mailto:magic-support@earthref.org">magic-support@earthref.org</a> to report this problem. We will get your validated dataset published quickly. 
            </p>
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
            Publish Your Private Contribution
          </div>
          <div className="content">
            <div className="ui icon error message">
              <i className="warning sign icon"></i>
              Warning! Your data will be publicly visible.
            </div>
          </div>
          <div className="actions">
            <div className="ui red approve button">
              <i className="check icon"></i>
              Publish
            </div>
            <div className="ui cancel button">Cancel</div>
          </div>
        </div>
        <div ref="validate" className="ui modal">
          <div className="ui icon header">
            <i className="file text outline icon"></i>
            Validate Your Private Contribution
          </div>
          <div className="content" style={{padding: 0}}>
            <div ref="validate loading" className="ui basic segment">
              <div className="ui active inverted dimmer" style={{height: "100%"}}>
                <div className="ui text loader">Validating</div>
              </div>
            </div>
            <div ref="validate results" className="ui basic segment" style={{overflowY: "scroll"}}>
              {(nValidationErrors ?
                <div className="extra" style={{marginBottom: '2em'}}>
                  <table className="ui compact small inverted red table">
                    <tbody>
                      <tr>
                        <td><i className="warning circle icon"></i><b>{strValidationErrors}</b></td>
                      </tr>
                    </tbody>
                  </table>
                  {this._renderValitationTables('Error', this.state.validation.errors)}  
                </div>
              : undefined)}
              {(nValidationErrors === 0 && nValidationWarnings === 0 ?
                <div className="extra" style={{marginBottom: '2em'}}>
                  <table className="ui compact small inverted green table">
                    <tbody>
                      <tr>
                        <td><i className="check icon"></i><b>Validation passed successfully!</b></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              : undefined)}
            </div>
            <div ref="validate error" className="ui error message">
            </div>
          </div>
          <div className="actions">
            <div className="ui cancel button">Close</div>
          </div>
        </div>
      </div>
    );
  }

  _renderValitationTables(type, results) {
    const model = models[_.last(versions)];

    let panels = [];
    _.sortBy(_.keys(model.tables), table => model.tables[table].position).forEach(table => {
      const n = _.reduce(_.keys(results[table]), (n, column) => n + _.keys(results[table][column]).length, 0);
      if (results[table]) panels.push({
        active: true,
        title: `${model.tables[table].label} (${n} ${type}${n > 1 ? 's' : ''})`,
        content: { 
          key: table,
          content: this._renderValitationColumns(type, results, table)
        }
      });
    });
    return (
      <Accordion exclusive={false} panels={panels} style={{ margin: '0 0 0 0.5em' }}/>
    );
  }

  _renderValitationColumns(type, results, table) {
    const model = models[_.last(versions)];
    let panels = [];
    _.sortBy(_.keys(model.tables[table].columns), column => model.tables[table].columns[column].position).forEach(column => {
      const n = _.keys(results[table][column]).length
      if (results[table][column]) panels.push({
        active: true,
        title: `${model.tables[table].columns[column].label} (${n} ${type}${n > 1 ? 's' : ''})`,
        content: {
          key: table + '_' + column,
          content: this._renderValitationMessage(results, table, column)
        }
      });
    });
    return (
      <Accordion.Accordion exclusive={false} panels={panels} style={{ margin: '0 0 0 0.5em' }}/>
    );
  }

  _renderValitationMessage(results, table, column) {
    return (
      <List bulleted style={{ margin: '0 0 0 2.5em' }}>{
        _.sortBy(_.keys(results[table][column]), message => -_.keys(results[table][column][message]).length).map(message => {
          const rows = _.sortBy(_.keys(results[table][column][message]), row => parseFloat(row));
          return (
          <List.Item>
            {message} {rows.length ? `(Row${rows.length > 1 ? 's' : ''}: ${getRanges(rows).join(', ')})` : ''}
          </List.Item>
          );
        })
      }</List>
    );
  }

}
