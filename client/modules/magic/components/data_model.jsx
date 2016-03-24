import {_} from 'lodash';
import React from 'react';
import {default as magicVersions} from '../configs/magic_versions.js';
import {default as magicDataModels} from '../configs/data_models/data_models.js';
import DataModelColumn from './data_model_column.jsx';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {search: this.props.search};
  }

  componentDidMount() {
    $(this.refs['accordion']).accordion({exclusive: false});
    this.search(this.refs['search'].value);
  }

  componentWillUpdate() {
    $(this.refs['loading']).addClass('active');
  }

  componentDidUpdate() {
    this.search(this.refs['search'].value);
    $(this.refs['loading']).removeClass('active');
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.search(this.refs['search'].value);
    return (nextProps.version !== this.props.version);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({search: nextProps.search});
  }

  tablesList(version) {
    const tables = magicDataModels[version].tables;
    const names = _.keys(tables);
    let list = [];
    for (let i in names) {
      list[tables[names[i]].position-1] = names[i];
    }
    return list;
  }

  groupsList(version, table) {
    const columns = magicDataModels[version].tables[table].columns;
    const names = _.keys(columns);
    let list = [];
    for (let i in names) {
      list[columns[names[i]].position-1] = columns[names[i]].group;
    }
    return _.uniq(list);
  }

  columnsList(version, table, group) {
    const columns = magicDataModels[version].tables[table].columns;
    const names = _.keys(columns);
    let list = [];
    for (let i in names) {
      if (columns[names[i]].group === group)
        list[columns[names[i]].position-1] = names[i];
    }
    return _.pull(list, undefined);
  }

  onSearchChange(e) {
    this.setState({ search: e.target.value });
  }

  search(str) {

    const $tbls = $(this.refs['accordion']).find('.data-model-table');
    const $grps = $(this.refs['accordion']).find('.data-model-group');
    const $cols = $(this.refs['accordion']).find('.data-model-column');

    // Enable columns that contain the string and disable others.
    if (str !== '') {
      $tbls.filter(':not(:contains(' + str + '))').addClass('no-match');
      $grps.filter(':not(:contains(' + str + '))').addClass('no-match');
      $cols.filter(':not(:contains(' + str + '))').addClass('no-match');
      $tbls.filter(':contains('      + str + ')').removeClass('no-match');
      $grps.filter(':contains('      + str + ')').removeClass('no-match');
      $cols.filter(':contains('      + str + ')').removeClass('no-match');
      $tbls.not('.no-match').find('.data-model-table-count').each(function() {
        const n_match = $(this).parents('.data-model-table')
          .find('.data-model-column').not('.no-match').length;
        $(this).children('span').remove();
        $(this).prepend(`<span>${n_match} of </span>`);
      });
      $grps.not('.no-match').find('.data-model-group-count').each(function() {
        const n_match = $(this).parents('.data-model-group')
          .find('.data-model-column').not('.no-match').length;
        $(this).children('span').remove();
        $(this).prepend(`<span>${n_match} of </span>`);
      });
    }

    // Enable all columns since the search string is empty.
    else {
      $tbls.removeClass('no-match');
      $grps.removeClass('no-match');
      $cols.removeClass('no-match');
      $tbls.find('.data-model-table-count > span, .data-model-group-count > span').remove();
    }

    // Show the first table/group/column.
    $tbls.not('.no-match').children().removeClass('active');
    $grps.not('.no-match').children().removeClass('active');
    $cols.not('.no-match').children().children().removeClass('active');
    $tbls.not('.no-match').first().children().addClass('active');
    $tbls.each(function() {
      $(this).find('.data-model-group').not('.no-match').first().children().addClass('active');
    });
    $grps.each(function() {
      $(this).find('.data-model-column').not('.no-match').first().children().children().addClass('active');
    });

    // Show the error message if no column match.
    if ($tbls.not('.no-match').length === 0) {
      $(this.refs['segment']).hide();
      $(this.refs['no-match-message']).show();
    } else {
      $(this.refs['segment']).show();
      $(this.refs['no-match-message']).hide();
    }

  }

  render() {
    const version = this.props.version;
    const model = magicDataModels[version];
    if (_.indexOf(magicVersions, version) > 0)
      previous_version = magicVersions[_.indexOf(magicVersions, version)-1];
    return (
      <div className="data-model">
        <div className="ui top attached tabular menu">
          <div className="disabled item"><b>Version:</b></div>
          {magicVersions.slice().reverse().map((v,i) => {
            const classes = (v === version ? 'active ' : '') + 'item';
            return (
              <a key={i} className={classes} href={`../${v}/`}>{v}</a>
            );
          })}
          <div className="right menu">
            <div className="item">
              <div className="ui search">
                <div className="ui transparent icon input">
                  <input
                    ref="search"
                    className="prompt"
                    type="text"
                    placeholder="Search data model columns ..."
                    value={this.state.search}
                    onChange={this.onSearchChange.bind(this)}
                  />
                  <i className="search icon"/>
                </div>
                <div className="results"></div>
              </div>
            </div>
          </div>
        </div>
        <div ref="segment" className="ui bottom attached segment">
          <div ref="loading" className="ui inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
          <div className="ui grid">
            <div className="ten wide column">
              Published by the <a href="">MagIC Database Team</a> on March 20th, 2016.
            </div>
            <div className="right aligned six wide column">
              <i className="download icon"/>
              Download as <a href="">.json</a> or <a href="">.xls</a>.
            </div>
          </div>
          <div ref="accordion" className="ui styled fluid accordion">
            {this.tablesList(version).map((t,i) => {
              return (
                <div className="data-model-table" key={i}>
                  <div className="title">
                    <i className="dropdown icon"/>
                    {model.tables[t].label}&nbsp;
                    <div className="ui circular small basic label data-model-table-count">
                      {_.keys(model.tables[t].columns).length}
                    </div>
                    <div className="ui right floated statistic">
                      <em>
                        {t}&nbsp;
                        ({model.tables[t].position},0)
                      </em>
                    </div>
                  </div>
                  <div className="content">
                    {this.groupsList(version, t).map((group,j) => {
                      return (
                        <div className="data-model-group" key={j}>
                          <div className={(j === 0 ? 'active ' : '') + 'title'}>
                            <i className="dropdown icon"/>
                            {group} Group&nbsp;
                            <div className="ui circular small basic label data-model-group-count">
                              {this.columnsList(version, t, group).length}
                            </div>
                          </div>
                          <div className={(j === 0 ? 'active ' : '') + 'content'}>
                            {this.columnsList(version, t, group).map((c,k) => {
                              return (
                                <div className="data-model-column" key={k}>
                                  <DataModelColumn
                                    version={version}
                                    table={t}
                                    column={c}
                                  />
                                </div>
                              );
                            })}
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
        <div ref="no-match-message" className="ui hidden error attached message">
          No columns match your search. Please edit the search string.
        </div>
      </div>
    );
  }

}

