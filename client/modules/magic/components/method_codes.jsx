import _ from  'lodash';
import React from 'react';
import saveAs from 'save-as';
import {portals} from '../../common/configs/portals';
import {default as methodCodes} from '../../../../lib/modules/magic/method_codes';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loaded: false,
      updating: false
    };
  }

  componentDidMount() {
    $(this.refs['accordion']).accordion({exclusive: false});
    setTimeout(() => { this.setState({loaded: true}); }, 1);
  }

  componentDidUpdate() {
    this.search(this.refs['search'].value);
    $(this.refs['loading']).removeClass('active');
    this.setState({updating: false});
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.updating ||
        nextState.search != this.state.search ||
        nextState.loaded != this.state.loaded) {
      return true;
    }
    if (nextProps.version !== this.props.version) {
      $(this.refs['loading']).addClass('active');
      setTimeout(() => { this.setState({updating: true}); }, 1);
    }
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({search: nextProps.search});
  }

  onSearchChange(e) {
    this.setState({ search: e.target.value });
  }

  search(str) {
    const $tbls  = $(this.refs['accordion']).find('.data-model-table');
    const $grps  = $(this.refs['accordion']).find('.data-model-group');
    const $cols  = $(this.refs['accordion']).find('.data-model-column');

    // Enable columns that contain the string and disable others.
    if (str !== '') {
      $cols.addClass('no-match').filter(':icontains(' + str + ')').removeClass('no-match');
      $tbls.find('.data-model-table-count').each(function() {
        const $table = $(this).parents('.data-model-table');
        const n_match = $table.find('.data-model-column').not('.no-match').length;
        $(this).addClass(portals['MagIC'].color);
        $(this).children('span').remove();
        $(this).prepend(`<span>${n_match} of </span>`);
        if (n_match === 0)
          $table.addClass('no-match');
        else
          $table.removeClass('no-match');
      });
      $grps.find('.data-model-group-count').each(function() {
        const $group = $(this).parents('.data-model-group');
        const n_match = $group.find('.data-model-column').not('.no-match').length;
        $(this).addClass(portals['MagIC'].color);
        $(this).children('span').remove();
        $(this).prepend(`<span>${n_match} of </span>`);
        if (n_match === 0)
          $group.addClass('no-match');
        else
          $group.removeClass('no-match');
      });
      $(this.refs['count']).html($cols.not('.no-match').length + ' of ' + $cols.length);
      $(this.refs['count']).addClass(portals['MagIC'].color);
    }

    // Enable all columns since the search string is empty.
    else {
      $tbls.removeClass('no-match');
      $grps.removeClass('no-match');
      $cols.removeClass('no-match');
      const $counts = $tbls.find('.data-model-table-count, .data-model-group-count');
      $counts.removeClass(portals['MagIC'].color);
      $counts.children().remove();
      $(this.refs['count']).html($cols.length);
      $(this.refs['count']).removeClass(portals['MagIC'].color);
    }

    // If the search has up to 100 column matches or excludes an entire table,
    // expand all tables and groups.
    if ($cols.not('.no-match').length <= 100 || $tbls.filter('.no-match').length >= 1) {
      $tbls.not('.no-match').children().addClass('active');
      $grps.not('.no-match').children().addClass('active');

      if ($cols.not('.no-match').length <= 10)
        $cols.not('.no-match').children().children().addClass('active');
      else
        $cols.not('.no-match').children().children().removeClass('active');
    }

    // Otherwise, expand the first table and all of the groups.
    else {
      $tbls.not('.no-match').children().removeClass('active');
      $grps.not('.no-match').children().addClass('active');
      $cols.not('.no-match').children().children().removeClass('active');
      $tbls.not('.no-match').first().children().addClass('active');
    }

    // Show the error message if no column match.
    if (this.state.loaded && $tbls.not('.no-match').length === 0) {
      $(this.refs['segment']).hide();
      $(this.refs['no-match-message']).show();
    } else {
      $(this.refs['segment']).show();
      $(this.refs['no-match-message']).hide();
    }
  }

  downloadJSON() {
    const blob = new Blob([JSON.stringify(methodCodes, null, '\t')], {type: "text/plain;charset=utf-8"});
    saveAs(blob, 'MagIC Method Codes.json');
  }

  render() {
    return (
      <div className="data-model" style={{marginTop: '-3em'}}>
        <div className="ui top attached tabular menu">
          <div className="right menu">
            <div className="active item">
              <div className="ui search">
                <div className="ui transparent icon input">
                  <input
                    ref="search"
                    className="prompt"
                    type="text"
                    placeholder="Search the columns ..."
                    value={this.state.search}
                    onChange={this.onSearchChange.bind(this)}
                  />
                  <i className={portals['MagIC'].color + ' search icon'}/>
                </div>
                <div className="results"></div>
              </div>
            </div>
          </div>
        </div>
        <div ref="segment" className="ui bottom attached segment">
          <div ref="loading" className="ui inverted active dimmer">
            <div className="ui text loader">Loading</div>
          </div>
          <div className="ui grid">
            <div className="ten wide column"></div>
            <div className="right aligned six wide column">
              <i className="download icon"/>
              Download as <a href="" onClick={this.downloadJSON.bind(this)}>.json</a>.
            </div>
          </div>
          <div ref="accordion" className="ui styled fluid accordion">
            {_.keys(methodCodes).sort().map((group,i) => {
              if (this.state.loaded) return (
                <div className="data-model-table" key={i}>
                  <div className="title">
                    <i className="dropdown icon"/>
                    <span>
                      {methodCodes[group].label}
                    </span>
                    <div className="ui circular small basic label data-model-table-count">
                      {methodCodes[group].codes.length}
                    </div>
                  </div>
                  <div className={(i === 0 ? 'active ' : '') + 'content'}>
                    {methodCodes[group].codes.map((code,j) => {
                      return (
                        <div className="data-model-column" key={j}>
                          <div className={(j === 0 ? 'active ' : '') + 'title'}>
                            <i className="dropdown icon"/>
                            {code.code}
                            <span className="description">
                              {code.definition}
                            </span>
                          </div>
                          <div className={(j === 0 ? 'active ' : '') + 'content'}>
                            <table className="ui very basic small compact table"><tbody>
                            {(code.definition ?
                              <tr>
                                <td className="top aligned collapsing"><b>Definition:</b></td>
                                <td>{code.definition}</td>
                              </tr> : undefined)}
                            {(code.description ?
                              <tr>
                                <td className="top aligned collapsing"><b>Description:</b></td>
                                <td>{code.description}</td>
                              </tr> : undefined)}
                            {(code.urls ?
                              <tr>
                                <td className="top aligned collapsing"><b>References:</b></td>
                                <td>
                                  {code.urls.map((url,k) => {
                                    return (
                                      <span key={k}>
                                        {(k > 0 ? <br/> : undefined)}
                                        <a href={url}>{url}</a>
                                      </span>
                                    );
                                  })}
                                </td>
                              </tr> : undefined)}
                            </tbody></table>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div ref="no-match-message" className="ui hidden error bottom attached message">
          No method codes match your search. Please edit the search string.
        </div>
      </div>
    );
  }

}

