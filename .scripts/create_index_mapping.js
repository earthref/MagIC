const {describe, it} = global;
import fs from 'fs';
import {expect} from 'chai';
import _ from 'lodash';
import elasticsearch from 'elasticsearch';

import {versions, models} from '/lib/modules/magic/data_models';

const esClient = new elasticsearch.Client({
  //log: 'trace',
  host: "http://128.193.70.68:9200"
});

var dateFormat = "year||year_month||date||date_time||date_time_no_millis||yyyy-MM-dd'T'HH:mm:ss.SSZZ";
var dirOut = 'client/modules/magic/actions/tests/output/summaries3/';
if (!fs.existsSync(dirOut)) fs.mkdirSync(dirOut);

// TODO: Add summary.contribution._reference.timestamp for better sorting by publication date
// TODO: Add min and max to all numeric
// TODO: Recalculate ages with conversion without the 1950 offset

describe('magic.actions.summarize', () => {

  it('should create a new index and mappings.', () => {

    let properties = {
      rows:     { enabled: false },
      columns:  { enabled: false },
      ages:     { enabled: false },
      images:   { enabled: false },
      criteria: { enabled: false },
      summary:  { type: 'object', properties: {} } };
    properties.summary.properties._all = { type: 'object', properties: {} };
    _.keys(models[_.last(versions)].tables).forEach((table) => {
      let model = models[_.last(versions)].tables[table];
      if (table === 'contribution') {
        properties.summary.properties[table] = {
          type: 'object',
          properties: {
            _contributor: { type: 'text', fields: {raw: {type: 'keyword' } } },
            _author:      { type: 'text', fields: {raw: {type: 'keyword' } } },
            _is_latest:   { type: 'boolean', null_value: 'false' },
            _history:     { type: 'object' },
            _reference:   { type: 'object' }
          }
        };
        properties.summary.properties[table].properties._history.properties = {
          id:                 { type: 'integer' },
          version:            { type: 'integer' },
          data_model_version: { type: 'text', fields: {raw: {type: 'keyword' } } },
          contributor:        { type: 'text', fields: {raw: {type: 'keyword' } } },
          description:        { type: 'text', fields: {raw: {type: 'keyword' } } },
          timestamp:          { type: 'date', format: dateFormat }
        };
        properties.summary.properties[table].properties._reference.properties = {
          source:        { type: 'text', fields: {raw: {type: 'keyword' } } },
          doi:           { type: 'text', fields: {raw: {type: 'keyword' } } },
          id:            { type: 'text', fields: {raw: {type: 'keyword' } } },
          title:         { type: 'text', fields: {raw: {type: 'keyword' } } },
          citation:      { type: 'text', fields: {raw: {type: 'keyword' } } },
          year:          { type: 'integer' },
          authors:       { type: 'object' },
          long_authors:  { type: 'text', fields: {raw: {type: 'keyword' } } },
          journal:       { type: 'text', fields: {raw: {type: 'keyword' } } },
          keywords:      { type: 'text', fields: {raw: {type: 'keyword' } } },
          tags:          { type: 'text', fields: {raw: {type: 'keyword' } } },
          html:          { type: 'text', fields: {raw: {type: 'keyword' } } },
          abstract_html: { type: 'text', fields: {raw: {type: 'keyword' } } },
          n_citations:   { type: 'integer' }
        };
        properties.summary.properties[table].properties._reference.properties.authors.properties = {
          _orcid:        { type: 'text', fields: {raw: {type: 'keyword' } } },
          _username:     { type: 'text', fields: {raw: {type: 'keyword' } } },
          given:         { type: 'text', fields: {raw: {type: 'keyword' } } },
          family:        { type: 'text', fields: {raw: {type: 'keyword' } } },
          affiliation:   { type: 'text', fields: {raw: {type: 'keyword' } } }
        };
        _.merge(properties.summary.properties[table].properties, columnsToMapping(model, true));
      } else if (table === 'measurements') {
        properties.summary.properties.experiments = { type: 'object', properties: {} };
        let additionalColumns = {
          _n_measurements: { type: 'integer' }
        };
        _.merge(properties.summary.properties.experiments.properties, additionalColumns, columnsToMapping(model));
        _.merge(properties.summary.properties._all.properties       , additionalColumns, columnsToMapping(model));
      } else if (table === 'ages' || table === 'images' || table === 'criteria') {
        properties.summary.properties[table] = { type: 'object', properties: {} };
        let additionalColumns = {
          ['_n_' + table]: { type: 'integer' }
        };
        _.merge(properties.summary.properties[table].properties, additionalColumns, columnsToMapping(model));
        _.merge(properties.summary.properties._all.properties  , additionalColumns, columnsToMapping(model));
      } else {
        properties.summary.properties[table] = { type: 'object', properties: {} };
        let additionalColumns = {
          _n_results: { type: 'integer' }
        };
        _.merge(properties.summary.properties[table].properties, additionalColumns, columnsToMapping(model));
        _.merge(properties.summary.properties._all.properties  , additionalColumns, columnsToMapping(model));
      }
    });
    let index = {
      settings: { 'index.mapping.total_fields.limit': 1000000 },
      mappings: { _default_: { dynamic: 'strict', properties: properties } }
    };
    fs.writeFileSync(dirOut+'default_mapping.json', JSON.stringify(index, null, 2));
  });

});

function columnsToMapping(model, isContribution) {
  let mapping = {};
  _.keys(model.columns).forEach((column) => {
    if (model.columns[column].type === 'Number') {
      mapping[column] = {
        type: 'object',
        properties: {
          vals:  { enabled: false      },
          n:     { type: 'integer'     },
          range: { type: 'float_range' }
        }
      };
    } else if (model.columns[column].type === 'Integer') {
      if (isContribution)
        mapping[column] = { type: 'integer' };
      else
        mapping[column] = {
          type: 'object',
          properties: {
            vals:  { enabled: false        },
            n:     { type: 'integer'       },
            range: { type: 'integer_range' }
          }
        };
    } else if (model.columns[column].type === 'String') {
      mapping[column] = {
        type: 'text', fields: { raw: { type: 'keyword' } }
      };
    } else if (model.columns[column].type === 'Timestamp') {
      if (isContribution)
        mapping[column] = { type: 'date', format: dateFormat };
      else
        mapping[column] = {
          type: 'object',
          properties: {
            vals:  { enabled: false  },
            n:     { type: 'integer' },
            range: { type: 'date_range', format: 'epoch_millis' }
          }
        };
    } else if (model.columns[column].type === 'List') {
      mapping[column] = {
        type: 'text', fields: { raw: { type: 'keyword' } }
      };
    } else if (model.columns[column].type === 'Dictionary') {
      mapping[column] = {
        type: 'object',
        properties: {
          key:   { type: 'text', fields: { raw: { type: 'keyword' } } },
          value: { type: 'text', fields: { raw: { type: 'keyword' } } }
        }
      };
    } else if (model.columns[column].type === 'Matrix') {
      mapping[column] = {
        type: 'text', fields: { raw: { type: 'keyword' } }
      };
    } else {
      throw new Error(`Unknown column type ${model.columns[column].type} for column ${column}.`);
    }

    if (column === 'age' || column === 'age_low' || column === 'age_high') {
      mapping._age_ybp = {
        properties: {
          vals:  { enabled: false      },
          n:     { type: 'integer'     },
          range: { type: 'float_range' }
        }
      };
      mapping._age_low_ybp = {
        properties: {
          vals:  { enabled: false      },
          n:     { type: 'integer'     },
          range: { type: 'float_range' }
        }
      };
      mapping._age_high_ybp = {
        properties: {
          vals:  { enabled: false      },
          n:     { type: 'integer'     },
          range: { type: 'float_range' }
        }
      };
      mapping._age_sigma_y = {
        properties: {
          vals:  { enabled: false      },
          n:     { type: 'integer'     },
          range: { type: 'float_range' }
        }
      };
      mapping._age_range_ybp = {
        properties: {
          vals:  { enabled: false      },
          n:     { type: 'integer'     },
          range: { type: 'float_range' }
        }
      };
      mapping._age_range_ybp = {
        properties: {
          vals:  { enabled: false      },
          n:     { type: 'integer'     },
          range: { type: 'float_range' }
        }
      };
    }

    if (column === 'lat' && model.columns.lon) {
      mapping._geo_point = {
        type: 'geo_shape',
        points_only: true
      };
      mapping._has_geo = {
        type: 'boolean', null_value: 'false'
      };
    }

    if (column === 'lat_n' && model.columns.lat_s && model.columns.lon_w && model.columns.lon_e) {
      mapping._geo_envelope = {
        type: 'geo_shape'
      };
      mapping._has_geo = {
        type: 'boolean', null_value: 'false'
      };
    }

  });
  return mapping;
}