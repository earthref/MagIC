import {_} from 'lodash';
import React from 'react';
import {default as versions} from '../configs/magic_versions.js';
import {default as models} from '../configs/data_models/data_models.js';
import {default as cvs} from '../configs/data_models/controlled_vocabularies.js';
import {default as svs} from '../configs/data_models/suggested_vocabularies.js';
import {default as codes} from '../configs/data_models/method_codes.js';

export default class extends React.Component {

  render() {
    const {version, table, column} = this.props;
    const model = models[version].tables[table].columns[column];

    let validations = model.validations;


    let examples = model.examples;
    let cv_validation = _.find(validations, (x) => { return _.includes(x, 'cv(') });
    let sv_validation = _.find(validations, (x) => { return _.includes(x, 'sv(') });

    let previous = model.previous_columns;


    let previous_version;
    if (_.indexOf(versions, version) > 0)
      previous_version = versions[_.indexOf(versions, version)-1];

    return (
      <div>
        <div className="title">
          <i className="dropdown icon"/>
          <span>{models[version].tables[table].position}.{model.position}</span>
          <span>{model.label}</span>
          <div className="ui basic horizontal small label">{model.type}</div>
          <span className="description">{model.description}</span>
          {(_.some(validations, (x) => { return _.includes(x, 'required('); }) ?
            <div className="ui red horizontal small label">
              Required
            </div>  : undefined)}
          {(_.some(validations, (x) => { return _.includes(x, 'downloadOnly('); }) ?
            <div className="ui black horizontal small label">
              Download Only
            </div>  : undefined)}
          {(_.some(validations, (x) => { return _.includes(x, 'cv('); }) ?
            <div className="ui yellow horizontal small label">
              Controlled
            </div>  : undefined)}
          {(_.some(validations, (x) => { return _.includes(x, 'sv('); }) ?
            <div className="ui orange horizontal small label">
              Suggested
            </div>  : undefined)}
        </div>
        <div className="content">
          <table className="ui very basic small compact table"><tbody>
            {(model.description ?
              <tr>
                <td className="top aligned collapsing"><b>Description:</b></td>
                <td>{model.description}</td>
              </tr> : undefined)}
            {(model.notes ?
              <tr>
                <td className="top aligned collapsing"><b>Notes:</b></td>
                <td>{model.notes}</td>
              </tr> : undefined)}
            {(examples ?
              <tr>
                <td className="top aligned collapsing">
                  <b>
                    {'Example' + (examples && examples.length > 1 ? 's' : '')}:
                  </b>
                </td>
                <td>
                  {examples.map((x,l) => {
                    return (
                      <span key={l}>
                        {(l > 0 ? <br/> : undefined)}
                        {x}
                      </span>
                    );
                  })}
                </td>
              </tr> : undefined)}
            {(validations ?
              <tr>
                <td className="top aligned collapsing">
                  <b>
                    {'Validation' + (validations && validations.length > 1 ? 's' : '')}:
                  </b>
                </td>
                <td>
                  {validations.map((x,l) => {
                    return (
                      <span key={l}>
                        {(l > 0 ? <br/> : undefined)}
                        {x}
                      </span>
                    );
                  })}
                </td>
              </tr> : undefined)}
            <tr>
              <td className="top aligned collapsing">
                <b>{version} Column:</b>
              </td>
              <td>
                {table}.{column}
              </td>
            </tr>
            {(previous_version && previous ?
              <tr>
                <td className="top aligned collapsing">
                  <b>
                    {previous_version + ' Column' + (previous && previous.length > 1 ? 's' : '')}:
                  </b>
                </td>
                <td>
                  {previous.map((x,l) => {
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

