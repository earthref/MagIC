import {_} from 'lodash';
import moment from 'moment';
import React from 'react';
import {portals} from '../../core/configs/portals.js';
import {default as versions} from '../configs/magic_versions.js';
import {default as models} from '../configs/data_models/data_models.js';
import DataModelColumn from './data_model_column.jsx';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: this.props.search,
      loaded: false,
      updating: false
    };
    console.log('new cache');
    this.dataModelColumnCache = {};
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

  tablesList(version) {
    const tables = models[version].tables;
    const names = _.keys(tables);
    let list = [];
    for (let i in names) {
      list[tables[names[i]].position-1] = names[i];
    }
    return list;
  }

  groupsList(version, table) {
    const columns = models[version].tables[table].columns;
    const names = _.keys(columns);
    let list = [];
    for (let i in names) {
      list[columns[names[i]].position-1] = columns[names[i]].group;
    }
    return _.uniq(list);
  }

  groupsValidationList(version, table, group) {
    const columns = models[version].tables[table].columns;
    const names = _.keys(columns);
    let list = [];
    for (let i in names) {
      if (columns[names[i]].group === group)
        list.push.apply(list, columns[names[i]].validations);
    }
    return _.uniq(list);
  }

  columnsList(version, table, group) {
    const columns = models[version].tables[table].columns;
    const names = _.keys(columns);
    let list = [];
    for (let i in names) {
      if (!group || columns[names[i]].group === group)
        list[columns[names[i]].position-1] = names[i];
    }
    return _.pull(list, undefined);
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
    if (this.state.loaded && $tbls.not('.no-match').length === 0) {
      $(this.refs['segment']).hide();
      $(this.refs['no-match-message']).show();
    } else {
      $(this.refs['segment']).show();
      $(this.refs['no-match-message']).hide();
    }
  }

  cachedDataModelColumn(table, column) {
    const version = this.props.version;

    // Define the cache key as the concatenation of the version, table, and column.
    const cacheKey = [version, table, column].toString();

    // Add the DataModelColumn component to the cache if necessary.
    if (!this.dataModelColumnCache[cacheKey])
      this.dataModelColumnCache[cacheKey] = (
        <DataModelColumn
          version={version}
          table={table}
          column={column}
        />
      );

    // Retrieve the cached DataModelColumn component
    return this.dataModelColumnCache[cacheKey];
  }

  render() {
    const version = this.props.version;
    const model = models[version];
    const published = moment(model.published_day, 'YYYY:MM:DD').format('MMMM Do, YYYY');
    let previous_version;
    if (_.indexOf(versions, version) > 0)
      previous_version = versions[_.indexOf(versions, version)-1];
    return (
      <div className="data-model">
        <div className="ui top attached tabular menu">
          <div className="disabled item"><b>Version:</b></div>
          {versions.slice().reverse().map((v,i) => {
            const classes = (v === version ? 'active ' : '') + 'item';
            return (
              <a key={i} className={classes} href={`../${v}/`}>
                {v}
                {(v === version ?
                  <div
                    ref="count"
                    className="ui circular small basic floating label data-model-count"
                  ></div> : undefined)}
              </a>
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
                    placeholder="Search the data model columns ..."
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
          <div ref="loading" className="ui inverted active dimmer">
            <div className="ui text loader">Loading</div>
          </div>
          <div className="ui grid">
            <div className="ten wide column">
              {(published ?
                <span>
                  Published by the <a href="/user/@magic/">MagIC Database Team</a> on {published}.
                </span> : undefined)}
            </div>
            <div className="right aligned six wide column">
              <i className="download icon"/>
              Download as <a href="">.json</a>.
            </div>
          </div>
          <div ref="accordion" className="ui styled fluid accordion">
            {this.tablesList(version).map((t,i) => {
              if (this.state.loaded) return (
                <div className="data-model-table" key={i}>
                  <div className="title">
                    <i className="dropdown icon"/>
                    <span>{model.tables[t].position + '.'}</span>
                    <span>{model.tables[t].label}</span>
                    <div className="ui circular small basic label data-model-table-count">
                      {_.keys(model.tables[t].columns).length}
                    </div>
                    <span className="description">{model.tables[t].description}</span>
                  </div>
                  <div className="content">
                    {this.groupsList(version, t).map((g,j) => {
                      const columns = this.columnsList(version, t, g);
                      const validations = this.groupsValidationList(version, t, g);
                      const required = _.some(validations, (x) => {
                        return _.includes(x, 'required(');
                      });
                      const governed = _.some(validations, (x) => {
                        return !_.includes(x, 'required(') && _.includes(x, 'required');
                      });
                      return (
                        <div className="data-model-group" key={j}>
                          <div className={(j === 0 ? 'active ' : '') + 'title'}>
                            <i className="dropdown icon"/>
                            {g} Group
                            <div className="ui circular small basic label data-model-group-count">
                              {columns.length}
                            </div>
                            <span className="description"></span>
                            {(governed && !required ?
                              <div className="ui green horizontal small label">
                                Governed
                              </div>  : undefined)}
                            {(required ?
                              <div className="ui red horizontal small label">
                                Required
                              </div>  : undefined)}
                          </div>
                          <div className={(j === 0 ? 'active ' : '') + 'content'}>
                            {columns.map((c,k) => {
                              return (
                                <div className="data-model-column" key={k}>
                                  {(this.cachedDataModelColumn(t,c))}
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
        <div ref="no-match-message" className="ui hidden error bottom attached message">
          No columns match your search. Please edit the search string.
        </div>
      </div>
    );
  }

}

