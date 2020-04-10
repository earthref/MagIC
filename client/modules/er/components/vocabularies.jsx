import _ from  'lodash';
import React from 'react';
import {Link} from 'react-router-dom';
import saveAs from 'save-as';

import {portals} from '/lib/configs/portals';
import {cvs} from '/lib/modules/er/controlled_vocabularies';
import {svs} from '/lib/modules/er/suggested_vocabularies';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: props.search || "",
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
    if (nextProps.vocabularies !== this.props.vocabularies) {
      $(this.refs['loading']).addClass('active');
      setTimeout(() => { this.setState({updating: true}); }, 1);
    }
    return false;
  }

  clearSearch() {
    this.setState({ search: '' });
  }

  onSearchChange(e) {
    this.setState({ search: e.target.value });
  }

  search(str) {
    const $tbls  = $(this.refs['accordion']).find('.vocabularies-table');
    const $cols  = $(this.refs['accordion']).find('.vocabularies-column');

    // Enable columns that contain the string and disable others.
    if (str !== '') {
      $cols.addClass('no-match').filter(':icontains(' + str + ')').removeClass('no-match');
      $tbls.find('.vocabularies-table-count').each(function() {
        const $table = $(this).parents('.vocabularies-table');
        const n_match = $table.find('.vocabularies-column').not('.no-match').length;
        $(this).addClass(portals['EarthRef.org'].color);
        $(this).children('span').remove();
        $(this).prepend(`<span>${n_match} of </span>`);
        if (n_match === 0)
          $table.addClass('no-match');
        else
          $table.removeClass('no-match');
      });
      $(this.refs['count']).html($cols.not('.no-match').length + ' of ' + $cols.length);
      $(this.refs['count']).addClass(portals['EarthRef.org'].color);
    }

    // Enable all columns since the search string is empty.
    else {
      $tbls.removeClass('no-match');
      $cols.removeClass('no-match');
      const $counts = $tbls.find('.vocabularies-table-count, .vocabularies-group-count');
      $counts.removeClass(portals['EarthRef.org'].color);
      $counts.children().remove();
      $(this.refs['count']).html($cols.length);
      $(this.refs['count']).removeClass(portals['EarthRef.org'].color);
    }

    // If the search has up to 100 column matches or excludes an entire table,
    // expand all tables and groups.
    if ($cols.not('.no-match').length <= 100 || $tbls.filter('.no-match').length >= 1) {
      $tbls.not('.no-match').children().addClass('active');

      if ($cols.not('.no-match').length <= 10)
        $cols.not('.no-match').children().children().addClass('active');
      else
        $cols.not('.no-match').children().children().removeClass('active');
    }

    // Otherwise, expand the first table and all of the groups.
    else {
      $tbls.not('.no-match').children().removeClass('active');
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
    if (this.props.vocabularies === 'controlled') {
      const blob = new Blob([JSON.stringify(cvs, null, '\t')], {type: "text/plain;charset=utf-8"});
      saveAs(blob, 'EarthRef Controlled Vocabularies.json');
    }
    if (this.props.vocabularies === 'suggested') {
      const blob = new Blob([JSON.stringify(svs, null, '\t')], {type: "text/plain;charset=utf-8"});
      saveAs(blob, 'EarthRef Suggested Vocabularies.json');
    }
  }

  render() {
    const vocabularies = (this.props.vocabularies === 'controlled' ? cvs : svs);
    return (
      <div className="vocabularies">
        <div className="ui top attached tabular menu">
          <Link className={(this.props.vocabularies === 'controlled' ? 'active ' : '') + 'item'} to={'/vocabularies/controlled'}>
            Controlled Vocabularies
          </Link>
          <Link className={(this.props.vocabularies === 'suggested' ? 'active ' : '') + 'item'} to={'/vocabularies/suggested'}>
            Suggested Vocabularies
          </Link>
          <div className="right menu">
            <div className="active item">
              <div className="ui search">
                <div className="ui transparent icon input">
                  <input
                    ref="search"
                    className="prompt"
                    type="text"
                    placeholder="Search the vocabularies ..."
                    value={this.state.search}
                    onChange={this.onSearchChange.bind(this)}
                  />
                  { this.state.search ?
                    <i className={portals['EarthRef.org'].color + ' close link icon'} onClick={this.clearSearch.bind(this)}/>:
                    <i className={portals['EarthRef.org'].color + ' search icon'}/>
                  }
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
            <div className="left aligned twelve wide column">
            <b>List label</b>, database column name where used, .json file name (if different from database name)
            </div>
            <div className="right aligned four wide column">
              <a href="#" onClick={this.downloadJSON.bind(this)}>
              <i className="download icon"/>
              Download as .json</a>.
            </div>
          </div>
          <div ref="accordion" className="ui styled fluid accordion">
            {_.keys(vocabularies).sort().map((group,i) => {
              if (this.state.loaded) return (
                <div className="vocabularies-table" key={i}>
                  <div className={(i === 0 ? 'active ' : '') + 'title'}>
                    <i className="dropdown icon"/>
                    <span>
                      {vocabularies[group].label}
                      <span className="column">, {vocabularies[group].database_column}</span>
                      <span className="column">{(vocabularies[group].database_column == group ? '' : ', ' + group)}</span>
                    </span>
                    <div className="ui circular small basic label vocabularies-table-count">
                      {vocabularies[group].items.length}
                    </div>
                  </div>
                  <div className={(i === 0 ? 'active ' : '') + 'content'}>
                    <div className="ui six column doubling padded grid">
                      {vocabularies[group].items.map((item,j) => {
                        return (
                          <div className="vocabularies-column" key={j}>
                            <div className="ui bulleted list">
                              <div className="item">
                                <div className="content">
                                <div style={{ display: "none" }}>"</div>
                                  <div className="header">{item.item}</div>
                                  <div style={{ display: "none" }}>"</div>
                                  <div className="description">{item.label}</div>
                                  <div style={{ display: "none" }}>"{group}"{vocabularies[group].database_column}"{vocabularies[group].label}"</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div ref="no-match-message" className="ui hidden error bottom attached message">
          No vocabularies match your search. Please edit the search string.
        </div>
      </div>
    );
  }

}

