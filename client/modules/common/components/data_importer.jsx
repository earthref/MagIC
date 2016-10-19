import _ from 'lodash';
import React from 'react';
import FixedTable from './fixed_table.jsx';
import {portals} from '../configs/portals.js';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.initialState = {
      nHeaderRows: '1',
      maxDataRows: 5,
      tableName: '',
      in: [],
      inColumnNames: [],
      outColumnNames: [],
      includeColumns: [],
      includeRows: [],
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
    $(this.refs['errors accordion']).accordion();
    this.setState({in: (!Array.isArray(this.props.data) ? [] : this.props.data)});
  }

  shouldComponentUpdate(nextProps, nextState) {
    let newState = nextState;

    // Copy the props data to the state input data.
    newState.in = (!Array.isArray(nextProps.data) ? [] : nextProps.data);

    // Validate the header row number.
    const nHeaderRows = newState.nHeaderRows;
    newState.errors.nHeaderRows = [];
    if (nHeaderRows !== '' && isNaN(nHeaderRows))
      newState.errors.nHeaderRows.push('"Header Row Number" must be empty (for no header) or numeric.');
    else if (nHeaderRows !== '' && nHeaderRows !== String(Number.parseInt(nHeaderRows)))
      newState.errors.nHeaderRows.push('"Header Row Number" must be empty (for no header) or an integer.');
    else if (nHeaderRows !== '' && Number.parseInt(nHeaderRows) < 1)
      newState.errors.nHeaderRows.push('"Header Row Number" must be empty (for no header) or greater than or equal to 1.');
    else if (nHeaderRows !== '' && Number.parseInt(nHeaderRows) > newState.in.length)
      newState.errors.nHeaderRows.push('"Header Row Number" must be empty (for no header) or less than or equal to ' + newState.in.length + ' (the number of rows in the dataset).');

    // Validate the table name.
    newState.errors.tableName = [];
    if (newState.tableName === '')
      newState.errors.tableName.push('"Table Name" must be selected.');
    else if ((_.indexOf(_.keys(this.props.model.tables)), newState.tableName) === -1)
      newState.errors.tableName.push('Table name "' + newState.tableName + '" is not recognized.');

    // Update the input column names list.
    newState.in = (!Array.isArray(nextProps.data) ? [] : nextProps.data);
    const nColumns = _.reduce(newState.in, (maxColumns, row) => Math.max(row.length, maxColumns), 0);
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

    // Extend or contract the include rows boolean array.
    const nHeaderRowsInt = (this.state.nHeaderRows === '' ? 0 : Number.parseInt(this.state.nHeaderRows));
    newState.includeRows = _.concat(
      _.slice(newState.includeRows, 0, newState.maxDataRows + nHeaderRowsInt), // trim the array if it's too long
      _.times(newState.maxDataRows + nHeaderRowsInt - newState.includeRows.length, () => true) // extend the array if it's too short
    );

    // Extend or contract the include columns boolean array.
    newState.includeColumns = _.concat(
      _.slice(newState.includeColumns, 0, newState.inColumnNames.length), // trim the array if it's too long
      _.times(newState.inColumnNames.length - newState.includeColumns.length, () => true) // extend the array if it's too short
    );

    // Update the output column names list.
    newState.errors.columnNames = [];
    newState.outColumnNames = _.concat(
      _.slice(newState.outColumnNames, 0, newState.inColumnNames.length),
      _.slice(Array(newState.inColumnNames.length), newState.outColumnNames.length)
    );
    newState.outColumnNames = newState.outColumnNames.map((outColumnName, i) => {

      // If the table name is not selected, don't add errors and leave the column name selections intact.
      if (newState.errors.tableName.length > 0 || !newState.includeColumns[i]) return outColumnName;

      // If the output column name isn't empty, check that it's valid for the selected table.
      if (outColumnName !== undefined &&
          _.indexOf(
            _.keys(this.props.model.tables[newState.tableName].columns),
            outColumnName
          ) === -1) {
        newState.errors.columnNames.push('Selected column name "' + outColumnName +
          '" is unrecognized in column number ' + (i+1) + ' for table name "' + newState.tableName + '".');
      }

      // If the output column name is empty, see if the input column name is valid for the selected table.
      if (outColumnName === undefined) {
        let modelColumnByName, modelColumnByLabel;
        _.keys(this.props.model.tables[newState.tableName].columns).forEach((columnName) => {
          const columnLabel = this.props.model.tables[newState.tableName].columns[columnName].label;
          if (columnName === _.lowerCase(newState.inColumnNames[i]))
            modelColumnByName = columnName;
          if (_.lowerCase(columnLabel) === _.lowerCase(newState.inColumnNames[i]))
            modelColumnByLabel = columnName;
        });
        if (modelColumnByName !== undefined)
          outColumnName = modelColumnByName;
        else if (modelColumnByLabel !== undefined)
          outColumnName = modelColumnByLabel;
        else
          newState.errors.columnNames.push('Column name "' + newState.inColumnNames[i] +
            '" is unrecognized in column number ' + (i + 1) + ' for table name "' + newState.tableName + '".');
      }

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

  componentDidUpdate() {
    $(this.refs['table column headers']).find('.ui.checkbox:not(.ui-checkbox)').addClass('ui-checkbox').checkbox({
      onChange: $.proxy(function (react) {
        let includeColumns = react.state.includeColumns;
        includeColumns[$(this).data('column-idx')] = $(this).prop('checked');
        _.delay(() => { react.setState({includeColumns: includeColumns})});
      }, undefined, this)
    });
    $(this.refs['table body']).find('.ui.checkbox:not(.ui-checkbox)').addClass('ui-checkbox').checkbox({
      onChange: $.proxy(function (react) {
        let includeRows = react.state.includeRows;
        includeRows[$(this).data('row-idx')] = $(this).prop('checked');
        _.delay(() => { react.setState({includeRows: includeRows})});
      }, undefined, this)
    });

    $(this.refs['table column names']).find('.ui.dropdown:not(.ui-dropdown)').addClass('ui-dropdown').dropdown({
      fullTextSearch: 'exact',
      onChange: (value, text, $choice) => {
        if ($choice.data) {
          let outColumnNames = this.state.outColumnNames;
          outColumnNames[$choice.data('column-index')] = value;
          _.delay(() => this.setState({outColumnNames: outColumnNames}));
        }
      }
    });
    $(this.refs['table column names']).find('.ui.dropdown.ui-dropdown').dropdown('refresh');

    $(this.refs['table column units']).find('.ui.dropdown:not(.ui-dropdown)').addClass('ui-dropdown').dropdown({
      fullTextSearch: 'exact'
    });
    $(this.refs['table column units']).find('.ui.dropdown.ui-dropdown').dropdown('refresh');
  }

  portalColor() {
    const portal = this.props.portal || 'EarthRef.org';
    return portals[portal] && portals[portal].color || 'green';
  }

  renderOptions() {
    return (
      <div className="ui three column stackable grid">
        <div className="column">
          <div className="ui labeled fluid action input">
            <div className={"ui label" + (this.state.tableName === '' ? ' red' : '')}>
              Table Name
            </div>
            <div ref="table name dropdown"
                 className={"ui selection fluid dropdown" + (this.state.tableName === '' ? ' error' : '')}>
              <i className="dropdown icon"/>
              <div className="default text">
                <span className="text">Select One</span>
              </div>
              <div className="menu">
                {(_.keys(this.props.model.tables).map((table, i) => {
                  return (
                    <div key={i} data-value={table} className="item">
                      {this.props.model.tables[table].label}
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
              Header Row Number
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
                {(_.keys(this.props.model.tables).map((table, i) => {
                  return (
                    <div key={i} data-value={table} className="item">
                      {this.props.model.tables[table].label}
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
    return (
      <div ref="errors accordion"
           className={'ui accordion red message' + (nErrors > 0 ? '' : ' hidden')}>
        <div className="ui red title">
          <i className="dropdown icon"/>
          {nErrors + ' Error' + (nErrors > 1 ? 's' : '')}
        </div>
        <div className="ui relaxed list content">
          {_.keys(this.state.errors).map((error_group, i) => {
            return this.state.errors[error_group].map((error, j) => {
              return (
                <div className="item" key={i + '.' + j}>
                  <i className="warning circle icon"/>
                  <div className="content">
                    {error}
                  </div>
                </div>
              );
            })
          })}
        </div>
      </div>
    );
  }

  renderColumnHeaderDropdownMenu(iColumn) {
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
            _.keys(this.props.model.tables[this.state.tableName].columns),
            (columnName) => this.props.model.tables[this.state.tableName].columns[columnName].position
          ).map((columnName, i) => {
            return (
              <div className="item" key={i} data-value={columnName} data-column-index={iColumn}>
                <span className="description">
                  {columnName}
                </span>
                <span className="text">
                  {this.props.model.tables[this.state.tableName].columns[columnName].label}
                </span>
              </div>
            );
          })
        }
      </div>
    );
  }

  renderTable() {
    const nHeaderRowsInt = (this.state.nHeaderRows === '' ? 0 : Number.parseInt(this.state.nHeaderRows));
    return (
      <div style={{marginTop:'1em'}}>
        <FixedTable className="ui compact celled striped definition single line table">
          <thead>
            <tr ref="table column headers">
              <th></th>
              {(this.state.inColumnNames.map((columnName, i) => {
                return (
                  <th key={i}>
                    <div className="ui fitted toggle checkbox" data-position="bottom right"
                         data-tooltip={'Click to ' + (this.state.includeColumns[i] ? 'exclude' : 'include') + ' this column'}>
                      <input type="checkbox" checked={this.state.includeColumns[i]} data-column-idx={i}/>
                    </div>
                    <span>{columnName}</span>
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
                        (this.state.includeColumns[i] ? '' : ' disabled') +
                        (this.state.errors.tableName.length > 0 ? '' : ' search') +
                        (this.state.errors.tableName.length > 0 ||
                          outColumnName === undefined ||
                          this.props.model.tables[this.state.tableName].columns[outColumnName] === undefined ?
                        ' error' : '')
                      }
                      style={{display:'table-cell'}}
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
                    this.props.model.tables[this.state.tableName].columns[outColumnName]
                );
                return (this.state.includeColumns[i] ?
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
                  <td className="center aligned error" colSpan={this.state.inColumnNames.length + 1}>Error: No data rows.</td>
                </tr>
              :
                this.state.in.map((row, i) => {
                  return (
                    i < nHeaderRowsInt + this.state.maxDataRows && (
                    this.state.nHeaderRows === '' ||
                    this.state.errors.nHeaderRows.length > 0 ||
                    i >= nHeaderRowsInt) ?
                      <tr key={i}>
                        <td className="collapsing right aligned">
                          <div className="ui fitted toggle checkbox" data-position="top left"
                               data-tooltip={(this.state.includeRows[i] ? 'Exclude' : 'Include') + ' this row'}>
                            <input type="checkbox" checked={this.state.includeRows[i]} data-row-idx={i}/>
                          </div>
                          {i+1}
                        </td>
                        {(row.map((col, j) => {
                          const className = (this.state.includeRows[i] && this.state.includeColumns[j] ? '' : 'disabled');
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
          </tbody>
          {(this.state.maxDataRows > 5 || nHeaderRowsInt + this.state.maxDataRows < this.state.in.length ?
            <tfoot className="full-width">
              <tr>
                <th></th>
                <th colSpan={this.state.inColumnNames.length} className="center aligned">
                  {(nHeaderRowsInt + this.state.maxDataRows < this.state.in.length ?
                    <a className="ui label" onClick={(e) => this.setState({maxDataRows: this.state.maxDataRows + 5})}>
                      View 5 more rows
                    </a>
                  :
                    undefined
                  )}
                  {(this.state.maxDataRows > 5 ?
                    <a className="ui label" onClick={(e) => this.setState({maxDataRows: 5})}>
                      Reset to view up to 5 rows
                    </a>
                  :
                    undefined
                  )}
                </th>
              </tr>
            </tfoot>
          :
            undefined
          )}
        </FixedTable>
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