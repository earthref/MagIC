import _ from  "lodash";
import numeral from 'numeral';
import React from "react";
import saveAs from "save-as";
import Cookies from "js-cookie";
import {Tracker}  from "meteor/tracker";
import {portals} from "/lib/configs/portals";
import {Collections} from "/lib/collections";

import DividedList from "/client/modules/common/components/divided_list";
import SearchSummaryListItem from "/client/modules/magic/components/search_summaries_list_item";
import IconButton from "/client/modules/common/components/icon_button";
import {index} from "/lib/configs/magic/search_levels.js";

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
    Meteor.call("esValidatePrivateContribution", {index: index, id: id, contributor: "@" + Cookies.get("user_id")},
    (error, validation) => {
      if (error) {
        $(this.refs["validate error"]).html(error.message);
        $(this.refs["validate loading"]).hide();
        $(this.refs["validate results"]).hide();
        $(this.refs["validate error"]).show();
      } else {
        this.setState({validation}, () => {
          $(this.refs["validate loading"]).hide();
          $(this.refs["validate results"]).show();
          $(this.refs["validate error"]).hide();
        });
      }
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
        Meteor.call("esDeletePrivateContribution", {index: index, id: id, contributor: "@" + Cookies.get("user_id")},
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
    if (!Cookies.get("user_id")) {
      this.setState({loaded: true});
    } else {
      Meteor.call("esGetPrivateContributionSummaries", {
        index: index,
        contributor: "@" + Cookies.get("user_id"),
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
      contributor: "@" + Cookies.get("user_id"),
      _contributor: Cookies.get("name"),
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

    const nValidationWarnings = this.state.validation.warnings.length;
    const strValidationWarnings = numeral(nValidationWarnings).format('0,0') + ' Validation Warning' + (nValidationWarnings === 1 ? '' : 's');

    const nValidationErrors = this.state.validation.errors.length;
    const strValidationErrors = numeral(nValidationErrors).format('0,0') + ' Validation Error' + (nValidationErrors === 1 ? '' : 's');

    console.log("privateContributions", this.privateContributions, Cookies.get("user_id"));
    if (!Cookies.get("user_id")) return (
      <div>
        <div className="ui top attached segment">
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
            <IconButton className="card" link="/MagIC/upload" portal="MagIC" style={{marginBottom: "1.5em"}}>
              <i className="large icons">
                <i className="table icon"/>
                <i className="corner add icon"/>
              </i>
              <div className="title">Upload</div>
              <div className="subtitle">Import data into your private workspace.</div>
            </IconButton>
            {this.privateContributions.map((c,i) => {
              let hasReference = c.summary.contribution._reference && c.summary.contribution._reference.doi;
              //console.log("ref", c, noReference);
              return (
                <div className="item" key={i} style={{marginBottom: "1.5em"}}>
                  <div className={portals["MagIC"].color + " ui top attached inverted segment"} style={{padding: "0.5em"}}>
                    <div style={{display: "flex", flexFlow: "row wrap"}}>
                      <div style={{flex: "1 1 auto"}}>
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
                                   if (e.key === "Enter") this.updateName(i);
                                 }.bind(this, i)}/>
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
                          Delete Contribution
                        </div>
                      }
                    </div>
                  </div>
                  <div className="ui attached secondary segment" style={{padding: "0.5em"}}>
                    <div style={{display: "flex", flexFlow: "row wrap"}}>
                      <div style={{flex: "1 1 auto"}}>
                        <div className={"ui labeled fluid small icon input" + (c.updatingReference ? " loading" : "") + (c.summary.contribution._is_activated == "true" || hasReference ? "" : " error")}>
                          <div className={"ui label" + (c.summary.contribution._is_activated === "true" || hasReference ? "" : " red")} style={{position: "relative"}}>
                            DOI
                          </div>
                          <input type="text" default="None" placeholder="The study's DOI (required)" value={c.reference !== undefined ? c.reference : c.summary.contribution.reference} readOnly={c.updatingReference || c.summary.contribution._is_activated === "true"}
                                 onChange={(e) => {
                                   this.privateContributions[i].reference = e.target.value;
                                   this.setState({taps: this.state.taps + 1});
                                 }}
                                 onKeyPress={function(i, e) {
                                   if (e.key === "Enter") this.updateReference(i);
                                 }.bind(this, i)}/>
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
                                 onChange={(e) => {
                                   this.privateContributions[i].description = e.target.value;
                                   this.setState({taps: this.state.taps + 1});
                                 }}
                                 onKeyPress={function(i, e) {
                                   if (e.key === "Enter") this.updateDescription(i);
                                 }.bind(this, i)}/>
                          {c.description !== undefined && <i className="red save link icon" onClick={function(i, e) {
                            this.updateDescription(i);
                          }.bind(this, i)}/>}
                        </div>
                      </div>
                      {c.summary.contribution._is_activated !== "true" && c.summary.contribution._is_valid !== "true" &&
                        <div className={portals["MagIC"].color + " ui basic small button"} style={{margin: "0 0 0 0.5em"}}
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
                               this.activate(c.summary.contribution.id);
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
                      {c.summary.contribution._is_activated === "true" && "@" + Cookies.get("user_id") === "@rminnett" && 
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
                  <div className="ui bottom attached segment" style={{padding: "1px 1em 0"}}>
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
                      {this.state.validation.errors.map((error, j) => {
                        return (
                          <tr key={j} className="error">
                            <td>{error.message}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              : undefined)}
              {(nValidationWarnings ?
                <div className="extra" style={{marginBottom: '2em'}}>
                  <table className="ui compact small inverted yellow table">
                    <tbody>
                      <tr>
                        <td><i className="warning sign icon"></i><b>{strValidationWarnings}</b></td>
                      </tr>
                      {this.state.validation.warnings.map((warning, j) => {
                        return (
                          <tr key={j} className="warning">
                            <td>{warning.message}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              : undefined)}
              {(nValidationErrors === 0 && nValidationWarnings == 0 ?
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

}
