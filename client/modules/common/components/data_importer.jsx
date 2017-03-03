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
      nRows: 0,
      minDataRows: 6,
      maxDataRows: 6,
      in: [],
      inColumnNames: [],
      loadedColumnMenu: {},
      excludeRowIdxs: [],
      excludeTable: false,
      errors: {
        data: [],
        nHeaderRows: [],
        tableName: [],
        columnNames: []
      },
      settings: {
        nHeaderRows:        this.props.nHeaderRows || '1',
        tableName:          this.props.tableName || '',
        outColumnNames:     this.props.outColumnNames || {},
        excludeColumnNames: this.props.excludeColumnNames || []
      }
    };
    this.excludedEmptyRows = false;
    this.state = this.initialState;
  }

  componentDidMount() {
    $(this.refs['table name dropdown']).dropdown({
      onChange: (tableName) => {
        let settings = this.state.settings;
        settings.tableName = tableName;
        _.delay(() => this.setState({settings: settings}));
      }
    });
    if (this.props.tableName)
      $(this.refs['table name dropdown']).dropdown('set selected', _.trim(this.props.tableName));
    this.setState({in: (!Array.isArray(this.props.data) ? [] : this.props.data)});
  }

  shouldComponentUpdate(nextProps, nextState) {
    let newState = nextState;

    // Copy the props data to the state input data.
    newState.in = (!Array.isArray(nextProps.data) ? [] : nextProps.data);

    // Validate the number of header rows.
    const nHeaderRows = newState.settings.nHeaderRows;
    newState.errors.nHeaderRows = [];
    if (nHeaderRows !== '' && isNaN(nHeaderRows))
      newState.errors.nHeaderRows.push('"Number of Header Rows" must be empty (for no header) or numeric.');
    else if (nHeaderRows !== '' && nHeaderRows !== String(Number.parseInt(nHeaderRows)))
      newState.errors.nHeaderRows.push('"Number of Header Rows" must be empty (for no header) or an integer.');
    else if (nHeaderRows !== '' && Number.parseInt(nHeaderRows) < 0)
      newState.errors.nHeaderRows.push('"Number of Header Rows" must be empty (for no header) or greater than or equal to 0.');
    else if (nHeaderRows !== '' && Number.parseInt(nHeaderRows) > newState.in.length)
      newState.errors.nHeaderRows.push('"Number of Header Rows" must be empty (for no header) or less than or equal to ' + newState.in.length + ' (the number of rows in the dataset).');
    newState.nHeaderRowsInt = Math.max(0, (nHeaderRows === '' ? 0 : Number.parseInt(nHeaderRows)) || 0);

    // Validate the table name.
    newState.errors.tableName = [];
    newState.settings.tableName = _.trim(String(newState.settings.tableName));
    if (newState.settings.tableName === '')
      newState.errors.tableName.push('"Table Name" must be selected.');
    else if (_.indexOf(_.keys(dataModels[this.props.portal].tables), newState.settings.tableName) === -1)
      newState.errors.tableName.push('Table name "' + newState.settings.tableName + '" is not recognized.');

    // Update the input column names list.
    newState.in = (!Array.isArray(nextProps.data) ? [] : nextProps.data);
    const nColumns = _.reduce(newState.in, (maxColumns, row, rowIdx) =>
      Math.max(rowIdx >= newState.nHeaderRowsInt && row && row.length || 0, maxColumns), 0);
    newState.inColumnNames = _.map(_.range(nColumns), (x) => 'Column ' + (x+1));
    if (newState.nHeaderRowsInt > 0 && newState.errors.nHeaderRows.length === 0) {
      const columnNames = newState.in[newState.nHeaderRowsInt - 1].map((x, i) =>
        (x === undefined || x == '' ? 'Column ' + (i + 1) : _.trim(String(x)))
      );
      newState.inColumnNames = _.concat(
        columnNames,
        _.slice(newState.inColumnNames, columnNames.length)
      );
    }

    // Update the output column names list.
    newState.errors.columnNames = [];
    newState.settings.outColumnNames = _.zipObject(
      newState.inColumnNames,
      _.concat(
        _.slice(newState.settings.outColumnNames, 0, newState.inColumnNames.length),
        _.slice(Array(newState.inColumnNames.length), newState.settings.outColumnNames.length)
      )
    );

    // Calculate the number of times an output column name is used.
    newState.outColumnNameCounts = _.keys(newState.settings.outColumnNames).length;
    newState.inColumnNames.map((idx) => {
      let inColumnName = newState.inColumnNames[idx];
      let outColumnName = newState.settings.outColumnNames[inColumnName];
      if (outColumnName !== undefined && newState.outColumnNameCounts[outColumnName])
        newState.outColumnNameCounts[outColumnName] -= 1;
    });
    debugger;

    _.keys(newState.settings.outColumnNames).map((inColumnName, i) => {

      let outColumnName = newState.settings.outColumnNames[inColumnName];

      // If the table name is not selected, don't add errors and leave the column name selections intact.
      if (newState.errors.tableName.length > 0 || this.state.settings.excludeColumnNames.indexOf(inColumnName) >= 0) return;

      // If the output column name isn't empty, check that it's valid for the selected table.
      if (outColumnName !== undefined &&
          _.indexOf(
            _.keys(dataModels[this.props.portal].tables[newState.settings.tableName].columns),
            outColumnName
          ) === -1) {
        newState.errors.columnNames.push('Selected column name "' + outColumnName +
          '" is unrecognized in column number ' + (i+1) + ' for table name "' + newState.settings.tableName + '".');
      }

      // If the output column name is empty, see if the input column name is valid for the selected table.
      if (outColumnName === undefined) {
        let modelColumnByName, modelColumnByLabel;
        for (let columnName in dataModels[this.props.portal].tables[newState.settings.tableName].columns) {
          if (columnName === newState.inColumnNames[i].toLowerCase())
            modelColumnByName = columnName;
          else {
            const columnLabel = dataModels[this.props.portal].tables[newState.settings.tableName].columns[columnName].label;
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
            '" is unrecognized in column number ' + (i + 1) + ' for table name "' + newState.settings.tableName + '".');
      }

      if (outColumnName !== undefined && newState.outColumnNameCounts[outColumnName] > 1)
        newState.errors.columnNames.push('Column name "' + newState.inColumnNames[i] +
          '" in column number ' + (i + 1) + ' and another column are both importing into the "' +
          newState.settings.tableName + '.' + outColumnName + '" data model column. ' +
          'Either exclude the duplicate columns or change their import column.');

      // Otherwise, set the column name.
      newState.settings.outColumnNames[inColumnName] = outColumnName;

    });

    if ((!this.excludedEmptyRows || !_.isEqual(this.props.data, nextProps.data)) && Array.isArray(nextProps.data)) {
      let nRows = 0;
      nextProps.data.forEach((row, rowIdx) => {
        nRows += 1;
        if (Array.isArray(row)) {
          let isEmptyRow = true;
          for (let colIdx = 0; colIdx <= row.length; colIdx++) {
            if (!_.isEmpty(row[colIdx])) {
              isEmptyRow = false;
              break;
            }
          }
          if (isEmptyRow && newState.excludeRowIdxs.indexOf(rowIdx) === -1)
            newState.excludeRowIdxs.push(rowIdx);
        }
      });
      newState.nRows = nRows;
      this.excludedEmptyRows = true;
    }

    // Validate the data array.
    newState.errors.data = [];
    if (!Array.isArray(nextProps.data))
      newState.errors.data.push('Failed to parse the data into an array.');
    if (Array.isArray(nextProps.data) && newState.inColumnNames.length - newState.settings.excludeColumnNames.length <= 0)
      newState.errors.data.push('There are no rows to import.');
    else if (Array.isArray(nextProps.data) && nextProps.data.length - newState.settings.excludeColumnNames.length - newState.nHeaderRowsInt <= 0)
      newState.errors.data.push('There are no columns to import.');
    if (newState.errors.data.length > 0)
      newState.excludeTable = true;
    if (newState.excludeTable)
      newState.errors.data.push('Skipping table "' + newState.settings.tableName + '".');

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
        const columnIdx = $(this).data('column-idx');
        if (columnIdx === -1) {
          _.delay(() => {
            react.setState({excludeTable: !$(this).prop('checked')})
          });
        } else {
          const inColumnName = react.state.inColumnNames[columnIdx];
          let settings = react.state.settings;
          _.pull(settings.excludeColumnNames, inColumnName);
          if (!$(this).prop('checked')) settings.excludeColumnNames.push(inColumnName);
          _.delay(() => {
            react.setState({settings: settings})
          });
        }
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
        direction: 'downward',
        selectOnKeydown: false,
        forceSelection: false,
        keepOnScreen: false,
        fullTextSearch: 'exact',
        onChange: (value, text, $choice) => {
          if ($choice.data) {
            let outColumnNames = this.state.settings.outColumnNames;
            let inColumnName = this.state.settings.inColumnNames[$choice.data('column-idx')];
            outColumnNames[inColumnName] = value;
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
      tableName: this.state.settings.tableName,
      nErrors: _.reduce(this.state.errors, (sum, errors) => sum + errors.length, 0),
      outColumnNames: this.state.settings.outColumnNames,
      nExcludeColumnNames: this.state.settings.excludeColumnNames.length,
      nExcludeRowIdxs: this.state.excludeRowIdxs.length,
      excludeTable: this.state.excludeTable
    };
    if (!_.isEqual(this.lastReadyState, readyState)) {
      this.lastReadyState = readyState;
      if (readyState.nErrors === 0 || readyState.excludeTable && this.props.onReady) {
        let columns = [];
        for (let columnIdx in this.state.settings.inColumnNames) {
          const inColumnName = this.state.settings.inColumnNames[columnIdx];
          if (this.state.nExcludeColumnNames.indexOf(inColumnName) === -1)
            columns.push(this.state.settings.outColumnNames[inColumnName]);
        }
        let rows = [];
        for (let rowIdx in this.state.in) {
          if (rowIdx >= this.state.nHeaderRowsInt && this.state.excludeRowIdxs.indexOf(rowIdx) === -1)
            rows.push(this.state.in[rowIdx]);
        }
        this.props.onReady(this.state.settings.tableName, columns, rows);
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
    let inColumnName = (i < this.state.inColumnNames.length ? this.state.inColumnNames[i] : undefined);
    let outColumnName = this.state.settings.outColumnNames[inColumnName];
    let dataModelTable = this.state.settings.tableName && dataModels[this.props.portal].tables[this.state.settings.tableName];
    let dataModelColumn = dataModelTable && dataModelTable.columns[outColumnName];
    let validations = dataModelColumn && dataModelColumn.validations;
    return validations && /downloadOnly\(\)/.test(validations);
  }

  renderOptions() {
    return (
      <div className="ui three column stackable grid">
        <div className="column">
          <div className="ui labeled fluid action input">
            <div className={'ui basic label ' + (this.state.settings.tableName === '' && !this.state.excludeTable ? 'red' : this.portalColor())}>
              Table Name
            </div>
            <div ref="table name dropdown"
                 className={"ui selection fluid dropdown" + (this.state.settings.tableName === '' && !this.state.excludeTable ? ' error' : '')}>
              <i className="dropdown icon"/>
              <div className="default text">
                <span className="text">{this.state.settings.tableName || 'Select One'}</span>
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
          <div className={"ui labeled fluid input" + (this.state.errors.nHeaderRows.length === 0 || this.state.excludeTable ? '' : ' error')}>
            <div className={"ui label" + (this.state.errors.nHeaderRows.length === 0 || this.state.excludeTable ? '' : ' red')}>
              Number of Header Rows
            </div>
            <input ref="header_row_input" type="text" default="None" value={this.state.settings.nHeaderRows}
              onChange={(e) => {
                let settings = this.state.settings;
                settings.nHeaderRows = this.refs['header_row_input'].value;
                this.setState({settings: settings});
              }}
            />
          </div>
        </div>
        <div className="column">
          {"" === "" ?
            <div className="ui labeled fluid action input">
              <div className="ui label" data-tooltip="Save and share import settings. Coming soon..." data-position="bottom right">
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
            :
            <div className="ui labeled fluid input">
              <div className="ui label" data-tooltip="Save and share import settings." data-position="bottom right">
                Save Import Template As
              </div>
              <input type="text"/>
            </div>
          }
        </div>
      </div>
    );
  }

  renderErrors() {
    const nErrors = _.reduce(this.state.errors, (sum, errors) => sum + errors.length, 0);
    const nDataErrors = this.state.errors.data.length;
    if (this.state.excludeTable || nDataErrors > 0)
      return (<table className="ui compact small inverted table yellow">
        <tbody>
        <tr>
          <td><i className="warning sign icon"></i><b>
            {nDataErrors + ' Import Warning' + (nDataErrors > 1 ? 's' : '')}
          </b></td>
        </tr>
        {this.state.errors.data.map((error, i) =>
          <tr className="warning" key={i}>
            <td>{error}</td>
          </tr>
        )}
        </tbody>
      </table>);
    else if (nErrors > 0)
      return (<table className="ui compact small inverted table red">
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
      </table>);
    else
      return undefined;
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
            _.keys(dataModels[this.props.portal].tables[this.state.settings.tableName].columns),
            (columnName) => dataModels[this.props.portal].tables[this.state.settings.tableName].columns[columnName].position
          ).map((columnName, i) => {
            let inColumnName = this.state.inColumnNames[columnIdx];
            return (menuLoaded || this.state.settings.outColumnNames[inColumnName] === columnName ?
              <div className="item" key={i} data-value={columnName} data-column-idx={columnIdx}>
                <span className="description">
                  {columnName}
                </span>
                <span className="text">
                  {dataModels[this.props.portal].tables[this.state.settings.tableName].columns[columnName].label}
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
    console.log(_.keys(this.props.data).length, this.props.data);
    const nRows = Math.max(0, this.state.nRows - this.state.excludeRowIdxs.length - this.state.nHeaderRows);
    const nCols = Math.max(0, this.state.inColumnNames.length - this.state.settings.excludeColumnNames.length);
    const tableTooltip = 'Click to ' + (this.state.excludeTable ? 'include' : 'exclude') + ' this table.';
    return (
      <div style={{marginTop:'1em'}}>
        <FixedTable className="ui compact celled striped definition single line table">
          <thead>
            <tr ref="table column headers">
              <th style={{pointerEvents: 'auto'}}>
                <div className="ui fitted toggle left floated checkbox" data-position="bottom left" data-tooltip={tableTooltip}>
                  <input type="checkbox" defaultChecked={!this.state.excludeTable} data-column-idx={-1}/>
                </div>
              </th>
              {(this.state.inColumnNames.map((columnName, i) => {
                const downloadOnly = this.columnIsDownloadOnly(i);
                const excluded = this.state.settings.excludeColumnNames.indexOf(columnName) >= 0;
                const tooltip = (downloadOnly ? 'Column is "Download Only".' :
                    'Click to ' + (excluded ? 'include' : 'exclude') + '.');
                return (
                  <th key={i}>
                    <div className={'ui fitted toggle right floated checkbox' + (downloadOnly || this.state.excludeTable ? ' disabled' : '')}
                         data-position="bottom right"
                         data-tooltip={tooltip}>
                      <input type="checkbox" defaultChecked={!downloadOnly && !excluded} data-column-idx={i}/>
                    </div>
                    <span style={!downloadOnly && !excluded && !this.state.excludeTable ? {color: this.portalColor()} : {}}>
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
              {(this.state.inColumnNames.map((inColumnName, i) => {
                const outColumnName = this.state.settings.outColumnNames[inColumnName];
                console.log('here', outColumnName);
                return (
                  <td key={i}
                      className={
                        'ui fluid dropdown' +
                        (this.state.settings.excludeColumnNames.indexOf(inColumnName) === -1 && !this.state.excludeTable ? '' : ' disabled') +
                        (this.state.errors.tableName.length > 0 ? '' : ' search') +
                        (!this.state.excludeTable && (this.state.errors.tableName.length > 0 ||
                          outColumnName === undefined ||
                          this.state.outColumnNameCounts[outColumnName] > 1 ||
                          dataModels[this.props.portal].tables[this.state.settings.tableName].columns[outColumnName] === undefined) ?
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
              {(this.state.inColumnNames.map((inColumnName, i) => {
                const outColumnName = this.state.settings.outColumnNames[inColumnName];
                const modelColumn = (
                  this.state.errors.tableName.length > 0 || outColumnName === undefined ?
                    undefined
                  :
                    dataModels[this.props.portal].tables[this.state.settings.tableName].columns[outColumnName]
                );
                return (this.state.settings.excludeColumnNames.indexOf(inColumnName) === -1 && !this.state.excludeTable ?
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
            {this.state.in.map((row, i) => {
              return (
                i < this.state.nHeaderRowsInt + this.state.maxDataRows && (
                this.state.settings.nHeaderRows === '' ||
                this.state.errors.nHeaderRows.length > 0 ||
                i >= this.state.nHeaderRowsInt) ?
                  <tr key={i}>
                    <td className="collapsing right aligned">
                      <div className={'ui fitted toggle left floated checkbox' + (this.state.excludeTable ? ' disabled' : '')} data-position="top left"
                           data-tooltip={'Click to ' + (this.state.excludeRowIdxs.indexOf(i) === -1 ? 'exclude' : 'include')}>
                        <input type="checkbox" defaultChecked={this.state.excludeRowIdxs.indexOf(i) === -1} data-row-idx={i}/>
                      </div>
                      <span style={this.state.excludeRowIdxs.indexOf(i) === -1 && !this.state.excludeTable ? {color: this.portalColor()} : {}}>
                        {i+1}
                      </span>
                    </td>
                    {(row.map((col, j) => {
                      const inColumnName = this.state.inColumnNames[j];
                      const downloadOnly = this.columnIsDownloadOnly(j);
                      const className = (downloadOnly || this.state.settings.excludeColumnNames.indexOf(inColumnName) >= 0 ||
                                         this.state.excludeRowIdxs.indexOf(i) >= 0 || this.state.excludeTable ? 'disabled' : '');
                      return (
                        <td key={j} className={className}>{col}</td>
                      );
                    }))}
                  </tr>
              :
                undefined
              );
            })}
            {(this.state.settings.nHeaderRows === '' && this.state.in.length === 0 ||
              this.state.settings.nHeaderRows >= this.state.in.length ? undefined :
              _.times(this.state.nHeaderRowsInt + this.state.minDataRows - this.state.in.length, (i) =>
              <tr key={i}>
                <td className="collapsing right aligned">{this.state.in.length + i + 1}</td>
                <td colSpan={_.keys(this.state.settings.outColumnNames).length}></td>
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
        {this.props.data && this.props.data.length && this.renderTable() || undefined}
      </div>
    );
  }

}