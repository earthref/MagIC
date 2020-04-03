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
import { Accordion, List, Dropdown } from 'semantic-ui-react';

import DividedList from "/client/modules/common/components/divided_list";
import SearchSummaryListItem from "/client/modules/magic/components/search_summaries_list_item";
import IconButton from "/client/modules/common/components/icon_button";
import {index} from "/lib/configs/magic/search_levels.js";
import {versions, models} from '/lib/configs/magic/data_models';
import {cvs} from '/lib/modules/er/controlled_vocabularies';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.privateContributions = [];
    this.state = {
      loaded: false,
      validation: { errors: [], warnings: [] },
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
      Meteor.call("esGetPrivateContributionSummaries", {
        index: index,
        contributor: "@" + Cookies.get("user_id", Meteor.isDevelopment ? {} : { domain: '.earthref.org'}),
        includeActivated: true
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
    this.privateContributions[i].summary.contribution._reference = {};
    this.setState({taps: this.state.taps + 1});
    Meteor.call("esUpdateContributionReference", {
      index: index,
      contributor: "@" + Cookies.get("user_id", Meteor.isDevelopment ? {} : { domain: '.earthref.org'}),
      _contributor: Cookies.get("name", Meteor.isDevelopment ? {} : { domain: '.earthref.org'}),
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

  updateLabNames(i) {
    this.privateContributions[i].updatingLabNames = true;
    this.setState({taps: this.state.taps + 1}, () =>
      Meteor.call("esUpdateContributionLabNames", {
        index: index,
        id: this.privateContributions[i].summary.contribution.id,
        lab_names: this.privateContributions[i].lab_names
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
        {!this.state.loaded ?
          <div className="ui segment" style={{minHeight: "8em"}}>
            <div className="ui inverted active dimmer">
              <div className="ui text loader">Loading</div>
            </div>
          </div>
          :
          <div className="ui list" style={{margin: "0"}}>
            <Link className={portals['MagIC'].color + ' ui compact icon button'} style={{float:'right', margin:'-3em 0 0', paddingTop: '0.5em', paddingBottom: '0.5em'}} to="/MagIC/upload">
              <i className="add icon"/>
              Upload Data Into Your Private Workspace
            </Link>
            {this.privateContributions.map((c,i) => {
              let hasReference = c.summary.contribution._reference && c.summary.contribution._reference.doi;
              //console.log("ref", c, noReference);
              return (
                <div className="item" key={i} style={{marginBottom: "1.5em"}}>
                  <div className={portals["MagIC"].color + " ui top attached inverted segment"} style={{padding: "0.5em"}} ref={(el) => el && el.style.setProperty('width', 'calc(100% + 2px)', 'important')}>
                    <div style={{display: "flex", flexFlow: "row wrap"}}>
                      <div style={{flex: "1 1 auto"}}>
                        <div className={"ui labeled fluid small icon input" + (c.updatingName ? " loading" : "")}>
                          <div className="ui label">
                            Private Contribution Name
                          </div>
                          <input type="text" default="None" placeholder="A name to help you remember which contribution you are working on" value={c.name !== undefined ? c.name : c.summary.contribution._name} readOnly={c.updatingName}
                            onBlur={(e) => {
                              this.privateContributions[i].name = e.target.value;
                              this.updateName(i);
                            }}
                            onChange={(e) => {
                              this.privateContributions[i].name = e.target.value;
                              this.setState({taps: this.state.taps + 1});
                            }}
                            onKeyPress={function(i, e) {
                              if (e.key === "Enter") this.updateName(i);
                            }.bind(this, i)}
                          />
                          {c.name !== undefined && <i className="red save link icon" onClick={function(i, e) {
                            this.updateName(i);
                          }.bind(this, i)}/>}
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
                    <div style={{display: "flex", flexFlow: "row wrap"}}>
                      <div style={{flex: "1 1 auto"}}>
                        <div className="ui corner labeled fluid small icon input">
                          <div className="ui label"
                            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                          >
                            Laboratory Names
                          </div>
                          <Dropdown multiple selection
                            defaultValue={
                              (c.lab_names && c.lab_names.split(":")) ||
                              (c.summary.contribution.lab_names && c.summary.contribution.lab_names.split(":")) ||
                              ""
                            }
                            placeholder="Select one or more laboratories where the measurements in the contribution were made"
                            options={cvs && cvs.lab_names && cvs.lab_names.items && cvs.lab_names.items.map(item => {
                              return {
                                key: item.item,
                                text: item.item,
                                value: item.item
                              };
                            })}
                            style={{ borderRadius: 0, flexGrow: 1 }}
                            onChange={(e, data) => {
                              c.lab_names = data.value.join(":");
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
                            style={{ marginRight: 0 }}
                            onClick={function(i, e) {
                              this.updateLabNames(i);
                            }.bind(this, i)}
                          >
                            <i className="save link icon"/>&nbsp;Save
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ui attached secondary segment" style={{padding: "0.5em"}} ref={(el) => el && el.style.setProperty('width', 'calc(100% + 2px)', 'important')}>
                    <div style={{display: "flex", flexFlow: "row wrap"}}>
                      <div style={{flex: "1 1 auto"}}>
                        <div className={"ui labeled fluid small icon input" + (c.summary.contribution._is_activated == "true" || hasReference ? "" : " error")}>
                          <div className={"ui label" + (c.summary.contribution._is_activated === "true" || hasReference ? "" : " red")} style={{position: "relative"}}>
                            DOI
                          </div>
                          <input type="text" default="None" placeholder="The study's DOI (required)" value={c.reference !== undefined ? c.reference : c.summary.contribution.reference} readOnly={c.updatingReference || c.summary.contribution._is_activated === "true"}
                            onBlur={(e) => {
                              this.privateContributions[i].reference = e.target.value;
                              this.updateReference(i);
                            }}
                            onChange={(e) => {
                              this.privateContributions[i].reference = e.target.value;
                              this.setState({taps: this.state.taps + 1});
                            }}
                            onKeyPress={function(i, e) {
                              if (e.key === "Enter") this.updateReference(i);
                            }.bind(this, i)}
                          />
                          {c.reference !== undefined && <i className="red save link icon" onClick={function(i, e) {
                            this.updateReference(i);
                          }.bind(this, i)}/>}
                        </div>
                      </div>
                      <div style={{flex: "1 1 auto", margin: "0 0 0 0.5em"}}>
                        <div className={"ui labeled fluid small icon input" + (c.updatingDescription ? " loading" : "")}>
                          <div className="ui label">
                            Description
                          </div>
                          <input type="text" default="None" placeholder="Describe the changes being made in this version" value={c.description !== undefined ? c.description : c.summary.contribution.description} readOnly={c.updatingDescription || c.summary.contribution._is_activated === "true"}
                            onBlur={(e) => {
                              this.privateContributions[i].description = e.target.value;
                              this.updateDescription(i);
                            }}
                            onChange={(e) => {
                              this.privateContributions[i].description = e.target.value;
                              this.setState({taps: this.state.taps + 1});
                            }}
                            onKeyPress={function(i, e) {
                              if (e.key === "Enter") this.updateDescription(i);
                            }.bind(this, i)}
                          />
                          {c.description !== undefined && <i className="red save link icon" onClick={function(i, e) {
                            this.updateDescription(i);
                          }.bind(this, i)}/>}
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
                          Activate
                        </div>
                      }
                      {c.summary.contribution._is_activated === "true" &&
                        <div className="ui green disabled small button" style={{margin: "0 0 0 0.5em"}}>
                          Activated
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
                        Deactivate
                      </div>
                      }
                    </div>
                  </div>
                  <div className="ui bottom attached segment" style={{padding: "1px 1em 0"}} ref={(el) => el && el.style.setProperty('width', 'calc(100% + 2px)', 'important')}>
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
        <div ref="share" className="ui modal">
          <div className="ui icon header">
            <i className="add user icon"></i>
            Share Your Private Contribution
          </div>
          <div className="content">
            <div className="ui fluid action input">
              <input ref="share link" type="text" readOnly={true}/>
              <button className="ui icon button" onClick={(e) => {
                var $temp = $("<input>");
                $("body").append($temp);
                $temp.val(this.refs["share link"].value).select();
                document.execCommand("copy");
                $temp.remove();
              }}>
                <i className="copy icon"></i>&nbsp;Copy
              </button>
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
        title: `${model.tables[table].label} (${n} ${type}${n > 1 ? 's' : ''})`,
        content: { 
          key: table,
          content: this._renderValitationColumns(type, results, table)
        }
      });
    });
    return (
      <Accordion panels={panels} style={{ margin: '0 0 0 0.5em' }}/>
    );
  }

  _renderValitationColumns(type, results, table) {
    const model = models[_.last(versions)];
    let panels = [];
    _.sortBy(_.keys(model.tables[table].columns), column => model.tables[table].columns[column].position).forEach(column => {
      const n = _.keys(results[table][column]).length
      if (results[table][column]) panels.push({
        title: `${model.tables[table].columns[column].label} (${n} ${type}${n > 1 ? 's' : ''})`,
        content: {
          key: table + '_' + column,
          content: this._renderValitationMessage(results, table, column)
        }
      });
    });
    return (
      <Accordion.Accordion panels={panels} style={{ margin: '0 0 0 0.5em' }}/>
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
