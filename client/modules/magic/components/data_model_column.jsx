import _ from  'lodash';
import React from 'react';
import {versions, models} from '/lib/configs/magic/data_models';
import {cvs} from '/lib/modules/er/controlled_vocabularies';
import {svs} from '/lib/modules/er/suggested_vocabularies';
import {codes} from '/lib/configs/magic/method_codes';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.reValidationParam = /\("(.+?)"\)/;
  }

  formatValidation(validation) {
    let matches;
    if (validation == 'required()')
      return (
        <span>
          Required: this column must not be empty in the <a href={'?q=' + this.props.table + '.'}>
            {this.props.table}
          </a> table rows.
        </span>
      );
    else if (validation == 'downloadOnly()')
      return `Download Only: this column is included in downloaded contributions,
        but is ignored in uploaded contributions.`;
    else if (validation.substr(0,4) == 'in("') {
      const column = validation.substr(4,validation.length-6);
      return (
        <span>
          Found In: this column must contain a value
          found in the contribution's <a href={'?q=' + column}>
            {column}
          </a> column.
        </span>
      );
    }
    else if (validation.substr(0,21) == 'requiredUnlessTable("') {
      const table = validation.substr(21,validation.length-23);
      return (
        <span>
          Governed: this column must not be empty unless the contribution
          includes rows in the  <a href={'?q=' + table + '.'}>
          {table}
        </a> table.
        </span>
      );
    }
    else if (validation.substr(0,10) == 'requiredIf("') {
      const column = validation.substr(10,validation.length-12);
      return (
        <span>
          Governed: this column must not be empty if the <a href={'?q=' + column + '.'}>
          {column}
        </a> column is not empty.
        </span>
      );
    }
    else if (validation.substr(0,16) == 'requiredUnless("') {
      const columns = validation.substr(16,validation.length-18).split('","');
      return (
        <span>
          Governed: this column must not be empty unless the {(columns.map((c, i) => {
            return (
              <span key={i}>
                {(i > 0 ? ' or ' : '')}
                <a href={'?q=' + c}>
                  {c}
                </a>
              </span>
            );
          }))} column is not empty.
        </span>
      );
    }
    else if (validation == 'type("users")') {
      return (
        <span>
          Suggested: this column could contain a user's handle found
          in the <a href={'/users/'}>EarthRef.org Users</a> list.
          If not, the column value should include the user's email address and
          the user will be contacted when the contribution is activated (made public).
        </span>
      );
    }
    else if (validation == 'type("url")') {
      return (
        <span>
          Controlled: this column must contain a valid URL.
        </span>
      );
    }
    else if (validation == 'type("igsn")') {
      return (
        <span>
          Controlled: this column must contain a
          valid <a href="http://www.geosamples.org/aboutigsn">International Geo Sample Number</a>.
        </span>
      );
    }
    else if (validation == 'type("date_time")') {
      return (
        <span>
          Controlled: this column must contain a valid date and time between 1900 and today.
        </span>
      );
    }
    else if (validation == 'type("references")') {
      return (
        <span>
            Validation: This DOI should be a valid DOI that is resolvable by doi.org. If you have
            a data set associated with a paper that does not have a DOI (PhD thesis,
            master thesis, USGS report, etc), MagIC can store the paper in the ERDA
            database (barring copyright issues) and mint a DOI for it.
        </span>
      );
    }
    else if (validation == 'type("method_codes")') {
      return (
        <span>
          Controlled: this column must contain a value found
          in the <a href={'/MagIC/method-codes/'}>Method Codes</a> controlled vocabulary.
        </span>
      );
    }
    else if (validation.substr(0,4) == 'cv("') {
      const cv = validation.substr(4,validation.length-6);
      let cv_label = cv;
      if (cvs[cv] && cvs[cv].label) cv_label = cvs[cv].label;
      else console.error(`cvs[${cv}].label is not defined.`);
      return (
        <span>
          Controlled: this column must contain a value found
          in the <a href={'/vocabularies/' + _.kebabCase(cv) + '/'}>
            {cv_label}
          </a> controlled vocabulary.
        </span>
      );
    }
    else if (validation.substr(0,4) == 'sv("') {
      const sv = validation.substr(4,validation.length-6);
      let sv_label = sv;
      if (svs[sv] && svs[sv].label) sv_label = svs[sv].label;
      else console.error(`svs[${sv}].label is not defined.`);
      return (
        <span>
          Suggested: this column could contain a value found
          in the <a href={'/vocabularies/' + _.kebabCase(sv) + '/'}>
            {sv_label}
          </a> suggested vocabulary. If not, the value will be added to the
          suggested vocabulary when the contribution is activated (made public).
        </span>
      );
    }
    return validation;
  }

  formatTypeUnit(type, unit) {
    if (!unit || unit == 'Custom' || unit == 'Dimensionless')
      return type;
    if (unit == 'Flag')
      return unit;
    return type + (unit ? ' in ' + unit : unit);
  }

  formatVocabulariesSample(vocabulary) {
    return _.map(_.sampleSize(vocabulary.items, 5), (item) => {
      if (item.label)
        return (
          <span>
            <b>{item.item}</b>
            <span className="vocabulary-label"> = {item.label}</span>
          </span>
        );
      else
        return item.item;
    });
  }

  render() {
    const {version, table, column} = this.props;
    const model = models[version].tables[table].columns[column];

    let validations = model.validations;
    const user_validation = _.find(validations, (x) => { return x == 'type("users")'; });
    const mc_validation   = _.find(validations, (x) => { return x == 'type("method_codes")'; });
    const ref_validation  = _.find(validations, (x) => { return x == 'type("references")'; });
    const cv_validation   = _.find(validations, (x) => { return x.substr(0,4) == 'cv("'; });
    const sv_validation   = _.find(validations, (x) => { return x.substr(0,4) == 'sv("'; });
    const required = _.some(validations, (x) => {
      return x == 'required()';
    });
    const governed = _.some(validations, (x) => {
      return x != 'required()' && x.substr(0,8) == 'required';
    });
    const downloadOnly = _.some(validations, (x) => {
      return x == 'downloadOnly()';
    });
    const foundIn = _.some(validations, (x) => {
      return x.substr(0,4) == 'in("';
    });
    const type = (_.some(validations, (x) => {
      return x.substr(0,6) == 'type("';
    }) && !mc_validation && !ref_validation && !user_validation);

    let examples = model.examples;
    if (!examples && cv_validation) {
      const reMatches = this.reValidationParam.exec(cv_validation);
      if (reMatches.length >= 2 && cvs[reMatches[1]])
        examples = this.formatVocabulariesSample(cvs[reMatches[1]]);
      else
        console.error(`Failed to use ${cv_validation} to populate examples`);
    } else if (!examples && sv_validation) {
      const reMatches = this.reValidationParam.exec(sv_validation);
      if (reMatches.length >= 2 && svs[reMatches[1]])
        examples = this.formatVocabulariesSample(svs[reMatches[1]]);
      else
        console.error(`Failed to use ${sv_validation} to populate examples`);
    }

    let previous = model.previous_columns;

    let previous_version;
    if (_.indexOf(versions, version) > 0)
      previous_version = versions[_.indexOf(versions, version)-1];

    return (
      <div>
        <div className="title">
          <i className="dropdown icon"/>
          <span>
            {models[version].tables[table].position}.{model.position}
          </span>
          <span>
            {model.label}
            <span className="column">, {column}</span>
          </span>
          <span className="ui basic horizontal small label">
            {this.formatTypeUnit(model.type, model.unit)}
          </span>
          <span className="description">{model.description}</span>
          {(governed && !required ?
            <div className="ui green horizontal small label">
              Governed
            </div>  : undefined)}
          {(required ?
            <div className="ui red horizontal small label">
              Required
            </div>  : undefined)}
          {(downloadOnly ?
            <div className="ui black horizontal small label">
              Download Only
            </div>  : undefined)}
          {(cv_validation || mc_validation || type ?
            <div className="ui orange horizontal small label">
              Controlled
            </div>  : undefined)}
          {(sv_validation || ref_validation || user_validation ?
            <div className="ui yellow horizontal small label">
              Suggested
            </div>  : undefined)}
          {(foundIn ?
            <div className="ui teal horizontal small label">
              Found In
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
            {(model.type ?
              <tr>
                <td className="top aligned collapsing"><b>Type:</b></td>
                <td>{model.type}</td>
              </tr> : undefined)}
            {(model.unit ?
              <tr>
                <td className="top aligned collapsing"><b>Unit:</b></td>
                <td>{model.unit}</td>
              </tr> : undefined)}
            {(model.urls ?
              <tr>
                <td className="top aligned collapsing">
                  <b>
                    {'Link' + (model.urls.length > 1 ? 's' : '')}:
                  </b>
                </td>
                <td>
                  {model.urls.map((x,l) => {
                    return (
                      <span key={l}>
                        {(l > 0 ? <br/> : undefined)}
                        <a href={x} target="_blank">{x}</a>
                      </span>
                    );
                  })}
                </td>
              </tr> : undefined)}
            {(examples ?
              <tr>
                <td className="top aligned collapsing">
                  <b>
                    {'Example' + (examples.length > 1 ? 's' : '')}:
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
                    {'Validation' + (validations.length > 1 ? 's' : '')}:
                  </b>
                </td>
                <td>
                  {validations.map((x,l) => {
                    return (
                      <span key={l}>
                        {(l > 0 ? <br/> : undefined)}
                        {this.formatValidation(x)}
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
                    {previous_version + ' Column' + (previous.length > 1 ? 's' : '')}:
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

