import {_} from 'lodash';
import React from 'react';
import {magicVersions} from '../configs/magic_versions.js';
import {magicDataModels} from '../configs/data_models/data_models.js';

export default class extends React.Component {

  componentDidMount() {
    $(this.refs['accordion']).accordion({exclusive: false});
  }

  tablesList(version) {
    const tables = magicDataModels[version].tables;
    const names = _.keys(tables);
    let list = new Array(names.length);
    for (let i in names) {
      list[tables[names[i]].position-1] = names[i];
    }
    return list;
  }

  groupsList(version, table) {
    const columns = magicDataModels[version].tables[table].columns;
    const names = _.keys(columns);
    let list = []
    for (let i in names) {
      list[columns[names[i]].position-1] = columns[names[i]].group;
    }
    return _.uniq(list);
  }

  columnsList(version, table, group) {
    const columns = magicDataModels[version].tables[table].columns;
    const names = _.keys(columns);
    let list = []
    for (let i in names) {
      if (columns[names[i]].group === group)
        list[columns[names[i]].position-1] = names[i];
    }
    return list;
  }

  render() {
    let {version} = this.props;
    let previous_version;
    if (_.indexOf(magicVersions, version) > 0)
      previous_version = magicVersions[_.indexOf(magicVersions, version)-1];
    let model = magicDataModels[version];
    return (
      <div className="data-model">
        <div className="ui stackable secondary menu">
          <div className="item">
            <div className="ui category search">
              <div className="ui icon input">
                <input className="prompt" type="text" placeholder="Search data models ..."/>
                <i className="search icon"></i>
              </div>
              <div className="results"></div>
            </div>
          </div>
          <div className="item">
            <div className="ui basic buttons versions">
              <div className="ui disabled button">Version</div>
              {magicVersions.slice().reverse().map((v,i) => {
                const classes = (v === version ? 'active ' : '') + 'ui button';
                let n_columns = 0;
                for (let table in magicDataModels[v].tables)
                  n_columns += _.keys(magicDataModels[v].tables[table].columns).length;
                return (
                  <a key={i} className={classes} href={`../${v}/`}>
                    {v}
                    <div className="ui circular small floating basic label">
                      {n_columns}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div ref="accordion" className="ui styled fluid accordion">
          {this.tablesList(version).map((table,i) => {
            return (
              <div key={i}>
                <div className={(i === 0 ? 'active ' : '') + 'title'}>
                  <i className="dropdown icon"></i>
                  {model.tables[table].label}&nbsp;
                  <div className="ui circular small basic label">
                    {_.keys(model.tables[table].columns).length}
                  </div>
                  <div className="ui right floated statistic">
                    <em>
                      {table}&nbsp;
                      ({model.tables[table].position},0)
                    </em>
                  </div>
                </div>
                <div className={(i === 0 ? 'active ' : '') + 'content'}>
                  {this.groupsList(version, table).map((group,j) => {
                    return (
                      <div key={j}>
                        <div className={(j === 0 ? 'active ' : '') + 'title'}>
                          <i className="dropdown icon"></i>
                          {group} Group
                        </div>
                        <div className={(j === 0 ? 'active ' : '') + 'content'}>
                          {this.columnsList(version, table, group).map((column,k) => {
                            return (
                              <div key={k}>
                                <div className={(k === 0 ? 'active ' : '') + 'title'}>
                                  <i className="dropdown icon"></i>
                                  {model.tables[table].columns[column].label}&nbsp;
                                  <div className="ui basic horizontal small label">
                                    {model.tables[table].columns[column].type}
                                  </div>
                                  <div className="ui right floated statistic">
                                    <em>
                                      {column}&nbsp;
                                      ({model.tables[table].position},
                                      {model.tables[table].columns[column].position})
                                    </em>
                                  </div>
                                </div>
                                <div className={(k === 0 ? 'active ' : '') + 'content'}>
                                  <table className="ui very basic table"><tbody>
                                    {(model.tables[table].columns[column].description ?
                                      <tr>
                                        <td className="top aligned collapsing"><b>Description</b></td>
                                        <td>{model.tables[table].columns[column].description}</td>
                                      </tr> : undefined)}
                                    {(model.tables[table].columns[column].notes ?
                                      <tr>
                                        <td className="top aligned collapsing"><b>Notes</b></td>
                                        <td>{model.tables[table].columns[column].notes}</td>
                                      </tr> : undefined)}
                                    {(model.tables[table].columns[column].examples ?
                                      <tr>
                                        <td className="top aligned collapsing"><b>Examples</b></td>
                                        <td>
                                          {model.tables[table].columns[column].examples.map((x,l) => {
                                            return (
                                              <span key={l}>
                                                {(l > 0 ? <br/> : undefined)}
                                                {x}
                                              </span>
                                            );
                                          })}
                                        </td>
                                      </tr> : undefined)}
                                    {(model.tables[table].columns[column].validations ?
                                      <tr>
                                        <td className="top aligned collapsing"><b>Validations</b></td>
                                        <td>
                                          {model.tables[table].columns[column].validations.map((x,l) => {
                                            return (
                                              <span key={l}>
                                                {(l > 0 ? <br/> : undefined)}
                                                {x}
                                              </span>
                                            );
                                          })}
                                        </td>
                                      </tr> : undefined)}
                                    {(model.tables[table].columns[column].previous_columns ?
                                      <tr>
                                        <td className="top aligned collapsing"><b>Previous Columns</b></td>
                                        <td>
                                          {model.tables[table].columns[column].previous_columns.map((x,l) => {
                                            return (
                                              <span key={l}>
                                                {(l > 0 ? <br/> : undefined)}
                                                <a href={'../' + previous_version + '/' + x.table + '/' + x.column + '/'}>
                                                  {x.table}.{x.column}
                                                </a>
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
            );
          })}
        </div>
      </div>
    )
  }

}

