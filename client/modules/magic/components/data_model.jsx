import {_} from 'lodash';
import React from 'react';
import {magicVersions} from '../configs/magic_versions.js';
import {magicDataModels} from '../configs/data_models/data_models.js';
import DataModelColumn from './data_model_column.jsx';

export default class extends React.Component {

  componentDidMount() {
    $(this.refs['accordion']).accordion({exclusive: false});
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

  render() {
    let {version, search} = this.props;
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
                <input className="prompt" type="text" placeholder="Search data models ..." value={search}/>
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
                for (let t in magicDataModels[v].tables)
                  n_columns += _.keys(magicDataModels[v].tables[t].columns).length;
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
          <div className="item">
            <div className="ui basic buttons">
              <div className="ui button disabled">
                Download
              </div>
              <div className="ui button">
                .json
              </div>
              <div className="ui button disabled">
                .xls
              </div>
            </div>
          </div>
        </div>
        <div ref="accordion" className="ui styled fluid accordion">
          {this.tablesList(version).map((t,i) => {
            return (
              <div key={i}>
                <div className={(i === 0 ? 'active ' : '') + 'title'}>
                  <i className="dropdown icon"></i>
                  {model.tables[t].label}&nbsp;
                  <div className="ui circular small basic label">
                    {_.keys(model.tables[t].columns).length}
                  </div>
                  <div className="ui right floated statistic">
                    <em>
                      {t}&nbsp;
                      ({model.tables[t].position},0)
                    </em>
                  </div>
                </div>
                <div className={(i === 0 ? 'active ' : '') + 'content'}>
                  {this.groupsList(version, t).map((group,j) => {
                    return (
                      <div key={j}>
                        <div className={(j === 0 ? 'active ' : '') + 'title'}>
                          <i className="dropdown icon"></i>
                          {group} Group
                        </div>
                        <div className={(j === 0 ? 'active ' : '') + 'content'}>
                          {this.columnsList(version, t, group).map((c,k) => {
                            return (
                              <DataModelColumn key={k} version={version} table={t} column={c} />
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
    );
  }

}

