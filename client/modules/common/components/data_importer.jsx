import _ from 'lodash';
import React from 'react';
import FixedTable from './fixed_table.jsx';
import {portals} from '../configs/portals.js';
import {default as versions} from '../../../../lib/modules/magic/magic_versions';
import {default as models} from '../../../../lib/modules/magic/data_models';
let dataModels = {MagIC: models[_.last(versions)]};

export default class DataImporter extends React.Component {

  constructor(props) {
    super(props);
    this.initialState = {
      nHeaderRows: this.props.nHeaderRows || '1',
      minDataRows: 6,
      maxDataRows: 6,
      tableName: this.props.tableName || '',
      in: [],
      inColumnNames: [],
      outColumnNames: [],
      loadedColumnMenu: {},
      excludeColumnIdxs: [],
      excludeRowIdxs: [],
      errors: {
        nHeaderRows: [],
        tableName: [],
        columnNames: []
      }
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    $(this.refs['table name dropdown']).dropdown({
      onChange: (tableName) => {
        _.delay(() => this.setState({tableName: tableName}));
      }
    });
    if (this.props.tableName)
      $(this.refs['table name dropdown']).dropdown('set selected', this.props.tableName);
    this.setState({in: (!Array.isArray(this.props.data) ? [] : this.props.data)});
  }

  shouldComponentUpdate(nextProps, nextState) {
    let newState = nextState;

    // Copy the props data to the state input data.
    newState.in = (!Array.isArray(nextProps.data) ? [] : nextProps.data);

    // Validate the number of header rows.
    const nHeaderRows = newState.nHeaderRows;
    newState.errors.nHeaderRows = [];
    if (nHeaderRows !== '' && isNaN(nHeaderRows))
      newState.errors.nHeaderRows.push('"Number of Header Rows" must be empty (for no header) or numeric.');
    else if (nHeaderRows !== '' && nHeaderRows !== String(Number.parseInt(nHeaderRows)))
      newState.errors.nHeaderRows.push('"Number of Header Rows" must be empty (for no header) or an integer.');
    else if (nHeaderRows !== '' && Number.parseInt(nHeaderRows) < 0)
      newState.errors.nHeaderRows.push('"Number of Header Rows" must be empty (for no header) or greater than or equal to 0.');
    else if (nHeaderRows !== '' && Number.parseInt(nHeaderRows) > newState.in.length)
      newState.errors.nHeaderRows.push('"Number of Header Rows" must be empty (for no header) or less than or equal to ' + newState.in.length + ' (the number of rows in the dataset).');
    newState.nHeaderRowsInt = (nHeaderRows === '' ? 0 : Number.parseInt(nHeaderRows));

    // Validate the table name.
    newState.errors.tableName = [];
    if (newState.tableName === '')
      newState.errors.tableName.push('"Table Name" must be selected.');
    else if (_.indexOf(_.keys(dataModels[this.props.portal].tables), newState.tableName) === -1)
      newState.errors.tableName.push('Table name "' + newState.tableName + '" is not recognized.');

    // Update the input column names list.
    newState.in = (!Array.isArray(nextProps.data) ? [] : nextProps.data);
    const nColumns = _.reduce(newState.in, (maxColumns, row, rowIdx) =>
      (rowIdx >= newState.nHeaderRowsInt ? Math.max(row.length, maxColumns) : maxColumns), 0);
    newState.inColumnNames = _.map(_.range(nColumns), (x) => 'Column ' + (x+1));
    if (newState.nHeaderRows !== '' && newState.errors.nHeaderRows.length === 0) {
      const columnNames = newState.in[newState.nHeaderRows - 1].map((x, i) =>
        (x === undefined || x == '' ? 'Column ' + (i + 1) : x)
      );
      newState.inColumnNames = _.concat(
        columnNames,
        _.slice(newState.inColumnNames, columnNames.length)
      );
    }

    // Update the output column names list.
    newState.errors.columnNames = [];
    newState.outColumnNames = _.concat(
      _.slice(newState.outColumnNames, 0, newState.inColumnNames.length),
      _.slice(Array(newState.inColumnNames.length), newState.outColumnNames.length)
    );
    newState.outColumnNameCounts = _.countBy(newState.outColumnNames);
    newState.outColumnNames = newState.outColumnNames.map((outColumnName, i) => {

      // If the table name is not selected, don't add errors and leave the column name selections intact.
      if (newState.errors.tableName.length > 0 || this.state.excludeColumnIdxs.indexOf(i) >= 0) return outColumnName;

      // If the output column name isn't empty, check that it's valid for the selected table.
      if (outColumnName !== undefined &&
          _.indexOf(
            _.keys(dataModels[this.props.portal].tables[newState.tableName].columns),
            outColumnName
          ) === -1) {
        newState.errors.columnNames.push('Selected column name "' + outColumnName +
          '" is unrecognized in column number ' + (i+1) + ' for table name "' + newState.tableName + '".');
      }

      // If the output column name is empty, see if the input column name is valid for the selected table.
      if (outColumnName === undefined) {
        let modelColumnByName, modelColumnByLabel;
        for (let columnName in dataModels[this.props.portal].tables[newState.tableName].columns) {
          if (columnName === newState.inColumnNames[i].toLowerCase())
            modelColumnByName = columnName;
          else {
            const columnLabel = dataModels[this.props.portal].tables[newState.tableName].columns[columnName].label;
            if (columnLabel.toLowerCase() === newState.inColumnNames[i].toLowerCase())
              modelColumnByLabel = columnName;
          }
        }
        if (modelColumnByName !== undefined)
          outColumnName = modelColumnByName;
        else if (modelColumnByLabel !== undefined)
          outColumnName = modelColumnByLabel;
        else
          newState.errors.columnNames.push('Column name "' + newState.inColumnNames[i] +
            '" is unrecognized in column number ' + (i + 1) + ' for table name "' + newState.tableName + '".');
      }

      if (outColumnName !== undefined && newState.outColumnNameCounts[outColumnName] > 1)
        newState.errors.columnNames.push('Column name "' + newState.inColumnNames[i] +
          '" in column number ' + (i + 1) + ' and another column are both importing into "' + outColumnName + '". ' +
          'Either exclude the duplicate columns or change their import column.');

      // Otherwise, return the column name.
      return outColumnName;

    });

    // Update the state instead of the component if necessary.
    if (!_.isEqual(newState, nextState)) {
      this.setState(newState);
      return false;
    }
    else return true;
  }

  componentDidUpdate(prevProps, prevState) {
    $(this.refs['errors accordion']).not('.ui-accordion').addClass('ui-accordion').accordion();
    $(this.refs['table column headers']).find('.ui.checkbox:not(.ui-checkbox)').addClass('ui-checkbox').checkbox({
      onChange: $.proxy(function (react) {
        let excludeColumnIdxs = react.state.excludeColumnIdxs;
        _.pull(excludeColumnIdxs, $(this).data('column-idx'));
        if (!$(this).prop('checked')) excludeColumnIdxs.push($(this).data('column-idx'));
        _.delay(() => { react.setState({excludeColumnIdxs: excludeColumnIdxs})});
      }, undefined, this)
    });
    $(this.refs['table body']).find('.ui.checkbox:not(.ui-checkbox)').addClass('ui-checkbox').checkbox({
      onChange: $.proxy(function (react) {
        let excludeRowIdxs = react.state.excludeRowIdxs;
        _.pull(excludeRowIdxs, $(this).data('row-idx'));
        if (!$(this).prop('checked')) excludeRowIdxs.push($(this).data('row-idx'));
        _.delay(() => { react.setState({excludeRowIdxs: excludeRowIdxs})});
      }, undefined, this)
    });

    $(this.refs['table column names']).find('.ui.dropdown:not(.ui-dropdown)').addClass('ui-dropdown').each((i, dropdown) => {
      $(dropdown).dropdown({
        fullTextSearch: 'exact',
        onChange: (value, text, $choice) => {
          if ($choice.data) {
            let outColumnNames = this.state.outColumnNames;
            outColumnNames[$choice.data('column-idx')] = value;
            _.delay(() => this.setState({outColumnNames: outColumnNames}));
          }
        },
        onShow: () => {
          const columnIdx = $(dropdown).data('column-idx');
          let loadedColumnMenu = this.state.loadedColumnMenu;
          loadedColumnMenu[columnIdx] = true;
          this.setState({loadedColumnMenu: loadedColumnMenu});
        }
      });
    });
    $(this.refs['table column names']).find('.ui.dropdown.ui-dropdown').dropdown('refresh');

    $(this.refs['table column units']).find('.ui.dropdown:not(.ui-dropdown)').addClass('ui-dropdown').dropdown({
      fullTextSearch: 'exact'
    });
    $(this.refs['table column units']).find('.ui.dropdown.ui-dropdown').dropdown('refresh');

    let readyState = {
      tableName: this.state.tableName,
      nErrors: _.reduce(this.state.errors, (sum, errors) => sum + errors.length, 0),
      outColumnNames: this.state.outColumnNames,
      nExcludeColumnIdxs: this.state.excludeColumnIdxs.length,
      nExcludeRowIdxs: this.state.excludeRowIdxs.length
    };
    if (!_.isEqual(this.lastReadyState, readyState)) {
      this.lastReadyState = readyState;
      if (readyState.nErrors === 0 && this.props.onReady) {
        let columns = [];
        for (let columnIdx in this.state.outColumnNames)
          if (this.state.excludeColumnIdxs.indexOf(columnIdx) === -1)
            columns.push(this.state.outColumnNames[columnIdx]);
        let rows = [];
        for (let rowIdx in this.state.in) {
          if (rowIdx >= this.state.nHeaderRowsInt && this.state.excludeRowIdxs.indexOf(rowIdx) === -1)
            rows.push(this.state.in[rowIdx]);
        }
        this.props.onReady(this.state.tableName, columns, rows);
      }
      else if (this.props.onNotReady)
        this.props.onNotReady();
    }

  }

  portalColor() {
    const portal = this.props.portal || 'EarthRef.org';
    return portals[portal] && portals[portal].color || 'green';
  }

  columnIsDownloadOnly(i) {
    let outColumnName = (i < this.state.outColumnNames.length ? this.state.outColumnNames[i] : undefined);
    let dataModelTable = this.state.tableName && dataModels[this.props.portal].tables[this.state.tableName];
    let dataModelColumn = dataModelTable && dataModelTable.columns[outColumnName];
    let validations = dataModelColumn && dataModelColumn.validations;
    return validations && /downloadOnly\(\)/.test(validations);
  }

  renderOptions() {
    return (
      <div className="ui three column stackable grid">
        <div className="column">
          <div className="ui labeled fluid action input">
            <div className={'ui basic label ' + (this.state.tableName === '' ? 'red' : this.portalColor())}>
              Table Name
            </div>
            <div ref="table name dropdown"
                 className={"ui selection fluid dropdown" + (this.state.tableName === '' ? ' error' : '')}>
              <i className="dropdown icon"/>
              <div className="default text">
                <span className="text">Select One</span>
              </div>
              <div className="menu">
                {(_.keys(dataModels[this.props.portal].tables).map((table, i) => {
                  return (
                    <div key={i} data-value={table} className="item">
                      {dataModels[this.props.portal].tables[table].label}
                    </div>
                  );
                }))}
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className={"ui labeled fluid input" + (this.state.errors.nHeaderRows.length === 0 ? '' : ' error')}>
            <div className={"ui label" + (this.state.errors.nHeaderRows.length === 0 ? '' : ' red')}>
              Number of Header Rows
            </div>
            <input ref="header_row_input" type="text" default="None" value={this.state.nHeaderRows}
                   onChange={(e) => {
                     this.setState({nHeaderRows: this.refs['header_row_input'].value})}}/>
          </div>
        </div>
        <div className="column">
          <div className="ui labeled fluid action input">
            <div className="ui disabled label">
              Import Template
            </div>
            <div ref="import template dropdown"
                 className="ui disabled selection fluid dropdown">
              <i className="dropdown icon"/>
              <div className="default text">
                <span className="text">Select One</span>
              </div>
              <div className="menu">
                {(_.keys(dataModels[this.props.portal].tables).map((table, i) => {
                  return (
                    <div key={i} data-value={table} className="item">
                      {dataModels[this.props.portal].tables[table].label}
                    </div>
                  );
                }))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderErrors() {
    const nErrors = _.reduce(this.state.errors, (sum, errors) => sum + errors.length, 0);
    return (nErrors > 0 ?
      <table className="ui compact small inverted red table">
        <tbody>
          <tr>
            <td><i className="warning sign icon"></i><b>
              {nErrors + ' Import Error' + (nErrors > 1 ? 's' : '')}
            </b></td>
          </tr>
          {_.keys(this.state.errors).map((error_group, i) => {
            return this.state.errors[error_group].map((error, j) => {
              return (
                <tr className="error" key={i + '.' + j}>
                  <td>{error}</td>
                </tr>
              );
            })
          })}
        </tbody>
      </table>
      : undefined
    );
  }

  renderColumnHeaderDropdownMenu(columnIdx) {
    const menuLoaded = this.state.loadedColumnMenu[columnIdx];
    return (this.state.errors.tableName.length > 0 ?
      <div className="menu">
        <div className="ui error message">
          <div className="header">Error</div>
          <p>"Table Name" must be selected.</p>
        </div>
      </div>
    :
      <div className="menu">
        {_.sortBy(
            _.keys(dataModels[this.props.portal].tables[this.state.tableName].columns),
            (columnName) => dataModels[this.props.portal].tables[this.state.tableName].columns[columnName].position
          ).map((columnName, i) => {
            return (menuLoaded || this.state.outColumnNames[columnIdx] === columnName ?
              <div className="item" key={i} data-value={columnName} data-column-idx={columnIdx}>
                <span className="description">
                  {columnName}
                </span>
                <span className="text">
                  {dataModels[this.props.portal].tables[this.state.tableName].columns[columnName].label}
                </span>
              </div> : undefined
            );
          })
        }
        {!menuLoaded ?
          <div className="header">
            <i className="loading circle notched icon"/>
            Loading
          </div> : undefined}
      </div>
    );
  }

  renderTable() {
    const nRows = this.props.data.length - this.state.excludeRowIdxs.length - this.state.nHeaderRows;
    const nCols = this.state.inColumnNames.length - this.state.excludeColumnIdxs.length;
    return (
      <div style={{marginTop:'1em'}}>
        <FixedTable className="ui compact celled striped definition single line table">
          <thead>
            <tr ref="table column headers">
              <th></th>
              {(this.state.inColumnNames.map((columnName, i) => {
                const downloadOnly = this.columnIsDownloadOnly(i);
                const excluded = this.state.excludeColumnIdxs.indexOf(i) >= 0;
                const tooltip = (downloadOnly ? 'Column is "Download Only".' :
                    'Click to ' + (excluded ? 'include' : 'exclude') + '.');
                return (
                  <th key={i}>
                    <div className={'ui fitted toggle checkbox' + (downloadOnly ? ' disabled' : '')}
                         data-position="bottom right"
                         data-tooltip={tooltip}>
                      <input type="checkbox" defaultChecked={!downloadOnly && !excluded} data-column-idx={i}/>
                    </div>
                    <span style={!downloadOnly && !excluded ? {color: this.portalColor()} : {}}>
                      {columnName}
                    </span>
                  </th>
                );
              }))}
            </tr>
          </thead>
          <tbody ref="table body">
            <tr ref="table column names">
              <td className="collapsing right aligned">Column</td>
              {(this.state.outColumnNames.map((outColumnName, i) => {
                return (
                  <td key={i}
                      className={
                        'ui fluid dropdown' +
                        (this.state.excludeColumnIdxs.indexOf(i) === -1 ? '' : ' disabled') +
                        (this.state.errors.tableName.length > 0 ? '' : ' search') +
                        (this.state.errors.tableName.length > 0 ||
                          outColumnName === undefined ||
                          this.state.outColumnNameCounts[outColumnName] > 1 ||
                          dataModels[this.props.portal].tables[this.state.tableName].columns[outColumnName] === undefined ?
                        ' error' : '')
                      }
                      style={{display: 'table-cell', width: 'initial'}}
                      data-column-idx={i}
                      data-outColumnName={outColumnName}
                  >
                    <input type="hidden" value={outColumnName}/>
                    <i className="dropdown icon"/>
                    <div className="default text">
                      <span className="text">Select One</span>
                    </div>
                    {this.renderColumnHeaderDropdownMenu(i)}
                  </td>
                );
              }))}
            </tr>
            <tr ref="table column units">
              <td className="collapsing right aligned">Units</td>
              {(this.state.inColumnNames.map((columnName, i) => {
                const outColumnName = this.state.outColumnNames[i];
                const modelColumn = (
                  this.state.errors.tableName.length > 0 || outColumnName === undefined ?
                    undefined
                  :
                    dataModels[this.props.portal].tables[this.state.tableName].columns[outColumnName]
                );
                return (this.state.excludeColumnIdxs.indexOf(i) === -1 ?
                  (modelColumn === undefined ?
                    <td key={i} className="error"></td>
                  :
                    (modelColumn.other_units === undefined ?
                      <td key={i} className={(modelColumn.unit === undefined ? 'disabled' : '')}>
                        {(modelColumn.unit === undefined ? 'None' : modelColumn.unit)}
                      </td>
                    :
                      <td key={i} className="ui dropdown" style={{display:'table-cell'}}>
                        <div className="default text">
                          <span className="text">Select One</span>
                        </div>
                        <i className="caret down icon"/>
                        <div className="menu">
                          {_.concat(modelColumn.unit, _.keys(modelColumn.other_units)).map((unit, j) =>
                            <div className="item" key={j}>
                              {unit}
                            </div>
                          )}
                        </div>
                      </td>
                    )
                  )
                :
                  <td key={i} className="disabled"></td>
                );
              }))}
            </tr>
            {(this.state.nHeaderRows === '' && this.state.in.length === 0 ||
              this.state.nHeaderRows >= this.state.in.length ?
                <tr>
                  <td className="center aligned error" colSpan={this.state.inColumnNames.length + 1}>
                    Error: No rows to import.
                  </td>
                </tr>
              :
                this.state.in.map((row, i) => {
                  return (
                    i < this.state.nHeaderRowsInt + this.state.maxDataRows && (
                    this.state.nHeaderRows === '' ||
                    this.state.errors.nHeaderRows.length > 0 ||
                    i >= this.state.nHeaderRowsInt) ?
                      <tr key={i}>
                        <td className="collapsing right aligned">
                          <div className="ui fitted toggle checkbox" data-position="top left"
                               data-tooltip={'Click to ' + (this.state.excludeRowIdxs.indexOf(i) === -1 ? 'exclude' : 'include')}>
                            <input type="checkbox" defaultChecked={this.state.excludeRowIdxs.indexOf(i) === -1} data-row-idx={i}/>
                          </div>
                          <span style={this.state.excludeRowIdxs.indexOf(i) === -1 ? {color: this.portalColor()} : {}}>
                            {i+1}
                          </span>
                        </td>
                        {(row.map((col, j) => {
                          const downloadOnly = this.columnIsDownloadOnly(j);
                          const className = (downloadOnly || this.state.excludeColumnIdxs.indexOf(j) >= 0 ||
                                             this.state.excludeRowIdxs.indexOf(i) >= 0 ? 'disabled' : '');
                          return (
                            <td key={j} className={className}>{col}</td>
                          );
                        }))}
                      </tr>
                  :
                    undefined
                  );
                })
            )}
            {(this.state.nHeaderRows === '' && this.state.in.length === 0 ||
              this.state.nHeaderRows >= this.state.in.length ? undefined :
              _.times(this.state.nHeaderRowsInt + this.state.minDataRows - this.state.in.length, (i) =>
              <tr key={i}>
                <td className="collapsing right aligned">{this.state.in.length + i + 1}</td>
                <td colSpan={this.state.outColumnNames.length}></td>
              </tr>))}
          </tbody>
        </FixedTable>
        <div className="ui two column grid" style={{marginTop: '0'}}>
          <div className="column">
            {(this.state.nHeaderRowsInt + this.state.maxDataRows < this.state.in.length ?
              <a className={'ui horizontal label ' + this.portalColor()}
                 onClick={(e) => this.setState({maxDataRows: this.state.maxDataRows + this.state.minDataRows})}>
                <i className="plus icon"/>
                Preview More Rows
              </a> : undefined
            )}
            {(this.state.maxDataRows > this.state.minDataRows ?
              <a className={'ui horizontal label ' + this.portalColor()}
                 onClick={(e) => this.setState({maxDataRows: this.state.minDataRows})}>
                <i className="undo icon"/>
                Preview Less Rows
              </a> : undefined
            )}
          </div>
          <div className="right aligned column">
            Importing <div className={'ui horizontal label ' + this.portalColor()}>
              {nRows}
            </div>{(nRows === 1 ? 'row' : 'rows')} with <div className={'ui horizontal label ' + this.portalColor()}>
              {nCols}
            </div>{(nCols === 1 ? 'column.' : 'columns.')}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={'er-data-importer ' + (this.props.className || '')} style={this.props.style}>
        {this.renderOptions()}
        {this.renderErrors()}
        {this.renderTable()}
      </div>
    );
  }

}