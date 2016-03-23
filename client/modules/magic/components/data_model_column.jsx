import {_} from 'lodash';
import React from 'react';
import {magicVersions} from '../configs/magic_versions.js';
import {magicDataModels} from '../configs/data_models/data_models.js';

export default class extends React.Component {

  render() {
    let {version, table, column} = this.props;
    let previous_version;
    if (_.indexOf(magicVersions, version) > 0)
      previous_version = magicVersions[_.indexOf(magicVersions, version)-1];
    let model = magicDataModels[version];
    return (
      <div>
        <div className="title">
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
        <div className={'content'}>
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
                        <a href={'../' + previous_version + '/?q=' + x.table + '.' + x.column}>
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
  }

}

