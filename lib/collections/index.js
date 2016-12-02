import _ from 'lodash';
import {Mongo} from 'meteor/mongo';

// Create a
class CollectionsCompiler {
  constructor() {
    this.collections = {};
    this.definitions = {};
  }
  add(portal, type, level, set, definition) {
    definition.recordSet = `${portal}.${type}.${level}.${set}`;
    this.collections[definition.recordSet] = new Mongo.Collection(definition.recordSet);
    _.set(this.definitions, definition.recordSet, definition);
  }
}

let c = new CollectionsCompiler();
c.add('magic', 'filters', 'contributions', 'reference_year', {index: 'magic-summaries', type: 'contribution', aggs: {buckets: {histogram: {field: 'reference_year', interval: 5}}}});
c.add('magic', 'filters', 'contributions', 'contributor'   , {index: 'magic-summaries', type: 'contribution', aggs: {buckets: {terms:     {field: 'contributor'               , size: 50 }}}});
c.add('magic', 'filters', 'contributions', 'external_db'   , {index: 'magic-summaries', type: 'contribution', aggs: {buckets: {terms:     {field: 'external_database_ids.name', size: 50 }}}});
c.add('magic', 'filters', 'contributions', 'location_type' , {index: 'magic-summaries', type: 'contribution', aggs: {buckets: {terms:     {field: 'location_type'            , size: 50 }}}});
c.add('magic', 'filters', 'contributions', 'geologic_type' , {index: 'magic-summaries', type: 'contribution', aggs: {buckets: {terms:     {field: 'geologic_types'            , size: 50 }}}});
c.add('magic', 'filters', 'contributions', 'geologic_class', {index: 'magic-summaries', type: 'contribution', aggs: {buckets: {terms:     {field: 'geologic_classes'          , size: 50 }}}});
c.add('magic', 'filters', 'contributions', 'lithology'     , {index: 'magic-summaries', type: 'contribution', aggs: {buckets: {terms:     {field: 'lithologies'               , size: 50 }}}});
c.add('magic', 'pages'  , 'contributions', 'summaries'     , {index: 'magic-summaries', type: 'contribution', _source: {excludes: ['images.*', 'ages.*']}                         });
c.add('magic', 'pages'  , 'contributions', 'images'        , {index: 'magic-summaries', type: 'contribution', _source: {includes: ['images.*']}, filters: [{range: {n_plots: {gte: 1}}}]                                  });
c.add('magic', 'count'  , 'contributions', 'summaries'     , {index: 'magic-summaries', type: 'contribution'                                                                      });
c.add('magic', 'sum'    , 'contributions', 'images'        , {index: 'magic-summaries', type: 'contribution', field: 'n_images'                                                   });
c.add('magic', 'sum'    , 'contributions', 'plots'         , {index: 'magic-summaries', type: 'contribution', field: 'n_plots'                                                   });
c.add('magic', 'sum'    , 'contributions', 'ages'          , {index: 'magic-summaries', type: 'contribution', field: 'n_ages'                                                   });
c.add('magic', 'count'  , 'contributions', 'poles'         , {index: 'magic-summaries', type: 'contribution'                                                                     });
c.add('magic', 'sum'    , 'locations'    , 'summaries'     , {index: 'magic-summaries', type: 'contribution'    , field: 'n_locations'                                                     });
c.add('magic', 'sum'    , 'sites'        , 'summaries'     , {index: 'magic-summaries', type: 'contribution'        , field: 'n_sites'                                                      });

const Collections = c.collections;
const collectionDefinitions = c.definitions;



  // MagIC
//c['magic-search-' + 'contributions' + '-' + 'filters' + '-' + 'reference_year_buckets'] = {index: 'magic-contributions', type: 'contribution', aggs: {buckets: {histogram: {field: 'reference_year', interval: 5}}} };
//c['magic-search-' + 'contributions' + '-' + 'filters' + '-' + 'contributor_id_buckets'] = {index: 'magic-contributions', type: 'contribution', aggs: {buckets: {terms:     {field: 'external_database_ids'      }}} };
//c['magic-search-' + 'contributions' + '-' + 'filters' + '-' + 'external_db_buckets'   ] = {index: 'magic-contributions', type: 'contribution', aggs: {buckets: {terms:     {field: 'contributor_id'             }}} };
//c['magic-search-' + 'contributions' + '-' + 'pages'   + '-' + 'contributions'         ] = {index: 'magic-contributions', type: 'contribution'                                                                       };
//c['magic-search-' + 'contributions' + '-' + 'counts'  + '-' + 'contributions'         ] = {index: 'magic-contributions', type: 'contribution'                                                                       };
//c['magic-search-' + 'contributions' + '-' + 'counts'  + '-' + 'ages'                  ] = {index: 'magic-contributions', type: 'contribution'                                                                       };
//c['magic-search-' + 'contributions' + '-' + 'counts'  + '-' + 'images'                ] = {index: 'magic-contributions', type: 'contribution'                                                                       };
//c['magic-search-' + 'locations'     + '-' + 'counts'  + '-' + 'locations'             ] = {index: 'magic-contributions', type: 'contribution'                                                                       };
//c['magic-search-' + 'sites'         + '-' + 'counts'  + '-' + 'sites'                 ] = {index: 'magic-contributions', type: 'contribution'                                                                       };
//c['magic-search-' + 'samples'       + '-' + 'counts'  + '-' + 'samples'               ] = {index: 'magic-contributions', type: 'contribution'                                                                       };
//c['magic-search-' + 'specimens'     + '-' + 'counts'  + '-' + 'specimens'             ] = {index: 'magic-contributions', type: 'contribution'                                                                       };
//Collections['magic']['filters'] = _.cloneDeep(c);

//Object(Collections).keys.forEach((recordSet) => {
//  Collections[recordSet].collection = new Mongo.Collection(recordSet);
//});

export {Collections, collectionDefinitions};