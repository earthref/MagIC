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

const maxFilterBuckets = 100;
let c = new CollectionsCompiler();

c.collections['magic.private.contributions'] = new Mongo.Collection('magic.private.contributions');
c.collections['magic.import.settings.templates'] = new Mongo.Collection('magic.import.settings.templates');
c.collections['magic.import.settings.templates.subscription'] = new Mongo.Collection('magic.import.settings.templates.subscription');

c.add('magic', 'filters', 'contributions', 'contributor'   , {index: 'magic_v5', type: 'contributions_summaries', aggs: {buckets: {terms:     {field: 'CONTRIBUTOR.raw'              , size: maxFilterBuckets + 1}}} });
c.add('magic', 'filters', 'contributions', 'external_db'   , {index: 'magic_v5', type: 'contributions_summaries', aggs: {buckets: {terms:     {field: 'EXTERNAL_DATABASE_NAMES-colon', size: maxFilterBuckets + 1}}} });
c.add('magic', 'filters', 'contributions', 'location_type' , {index: 'magic_v5', type: 'contributions_summaries', aggs: {buckets: {terms:     {field: 'LOCATION_TYPES-colon'         , size: maxFilterBuckets + 1}}} });
c.add('magic', 'filters', 'contributions', 'geologic_type' , {index: 'magic_v5', type: 'contributions_summaries', aggs: {buckets: {terms:     {field: 'TYPE-colon'                   , size: maxFilterBuckets + 1}}} });
c.add('magic', 'filters', 'contributions', 'geologic_class', {index: 'magic_v5', type: 'contributions_summaries', aggs: {buckets: {terms:     {field: 'CLASS-colon'                  , size: maxFilterBuckets + 1}}} });
c.add('magic', 'filters', 'contributions', 'lithology'     , {index: 'magic_v5', type: 'contributions_summaries', aggs: {buckets: {terms:     {field: 'LITHOLOGY-colon'              , size: maxFilterBuckets + 1}}} });
c.add('magic', 'filters', 'contributions', 'method_code'   , {index: 'magic_v5', type: 'contributions_summaries', aggs: {buckets: {terms:     {field: 'METHOD_CODES-colon'           , size: maxFilterBuckets + 1}}} });
//c.add('magic', 'filters', 'contributions', 'location_class', {index: 'magic_v5', type: 'contributions_summaries', aggs: {buckets: {terms:     {field: 'LOCATION_CLASSES-colon'       , size: maxFilterBuckets + 1}}} });

c.add('magic', 'pages'  , 'contributions', 'summaries'     , {index: 'magic_v5', type: 'contributions_summaries',                                 });
c.add('magic', 'count'  , 'contributions', 'summaries'     , {index: 'magic_v5', type: 'contributions_summaries'                                                                                });

c.add('magic', 'pages'  , 'contributions', 'pmag'          , {index: 'magic_v5', type: 'contributions_pmag_results'});
c.add('magic', 'pages'  , 'contributions', 'rmag'          , {index: 'magic_v5', type: 'contributions_rmag_results'});
c.add('magic', 'pages'  , 'contributions', 'poles'         , {index: 'magic_v5', type: 'contributions_pmag_results', queries: [{exists: {field: 'POLE_COMP_NAME'}}]});
c.add('magic', 'pages'  , 'contributions', 'ages'          , {index: 'magic_v5', type: 'contributions_ages',                              });
c.add('magic', 'pages'  , 'contributions', 'map'           , {index: 'magic_v5', type: 'contributions_summaries', _source: {includes: ['BEGIN_LATS', 'END_LATS', 'BEGIN_LONS', 'END_LONS', 'CITATION', 'VERSION', 'CONTRIBUTOR']}, queries: [{exists: {field: 'BEGIN_LATS'}}]});
c.add('magic', 'count'  , 'contributions', 'map'           , {index: 'magic_v5', type: 'contributions_summaries', queries: [{exists: {field: 'BEGIN_LATS'}}]                             });

c.add('magic', 'pages'  , 'contributions', 'images'        , {index: 'magic_v5', type: 'contributions_images'  });
c.add('magic', 'pages'  , 'contributions', 'plots'         , {index: 'magic_v5', type: 'contributions_plots'  });

c.add('magic', 'count'  , 'contributions', 'pmag'          , {index: 'magic_v5', type: 'contributions_pmag_results'});
c.add('magic', 'count'  , 'contributions', 'rmag'          , {index: 'magic_v5', type: 'contributions_rmag_results'});
c.add('magic', 'count'  , 'contributions', 'ages'          , {index: 'magic_v5', type: 'contributions_ages'});
c.add('magic', 'count'  , 'contributions', 'images'        , {index: 'magic_v5', type: 'contributions_images'                                             });
c.add('magic', 'count'  , 'contributions', 'plots'         , {index: 'magic_v5', type: 'contributions_plots'                                                    });

c.add('magic', 'pages'  , 'locations'    , 'summaries'     , {index: 'magic_v5', type: 'locations_summaries'                                    });
c.add('magic', 'count'  , 'locations'    , 'summaries'     , {index: 'magic_v5', type: 'locations_summaries',                                                      });

c.add('magic', 'pages'  , 'locations'    , 'poles'     , {index: 'magic_v5', type: 'locations_pmag_results', queries: [{exists: {field: 'VGP_LAT'}}]                                    });
c.add('magic', 'count'  , 'locations', 'poles'             , {index: 'magic_v5', type: 'locations_pmag_results', queries: [{exists: {field: 'VGP_LAT'}}]});

c.add('magic', 'pages'  , 'locations'    , 'plots'         , {index: 'magic-summaries', type: 'contribution', _source: {includes: ['contribution_id', 'citation', 'version', 'activated', 'contributor', 'locations.images']}, queries: [{exists: {field: 'locations.images'}}], filters: [{range: {n_plots: {gte: 1}}}]    });
c.add('magic', 'sum'    , 'locations'    , 'plots'         , {index: 'magic-summaries', type: 'contribution', field: 'n_plots', queries: [{exists: {field: 'locations.images'}}]                                                              });

c.add('magic', 'sum'    , 'locations'    , 'ages'          , {index: 'magic-summaries', type: 'location', field: 'n_ages'                                                               });

c.add('magic', 'pages'  , 'locations'    , 'map'         , {index: 'magic_v5', type: 'locations_summaries', _source: {includes: ['BEGIN_LAT', 'END_LAT', 'BEGIN_LON', 'END_LON', 'CITATION', 'VERSION', 'CONTRIBUTOR']}, queries: [{exists: {field: 'BEGIN_LAT'}}]});
c.add('magic', 'count'  , 'locations'    , 'map'           , {index: 'magic_v5', type: 'locations_summaries', queries: [{exists: {field: 'BEGIN_LAT'}}]                             });

c.add('magic', 'pages'  , 'sites'        , 'summaries'     , {index: 'magic_v5', type: 'sites_summaries',                                });
c.add('magic', 'count'    , 'sites'        , 'summaries'     , {index: 'magic_v5', type: 'sites_summaries'                                                      });

c.add('magic', 'pages'  , 'sites'    , 'map'         , {index: 'magic_v5', type: 'sites_summaries', _source: {includes: ['LAT', 'LON', 'CITATION', 'VERSION', 'CONTRIBUTOR']}, queries: [{exists: {field: 'LAT'}}]});
c.add('magic', 'count'  , 'sites'    , 'map'           , {index: 'magic_v5', type: 'sites_summaries', queries: [{exists: {field: 'LAT'}}]                             });

c.add('magic', 'pages'  , 'samples'        , 'summaries'     , {index: 'magic_v5', type: 'samples_summaries',                                  });
c.add('magic', 'count'    , 'samples'      , 'summaries'     , {index: 'magic_v5', type: 'samples_summaries'                                                      });

c.add('magic', 'pages'  , 'samples'    , 'map'         , {index: 'magic_v5', type: 'samples_summaries', _source: {includes: ['LAT', 'LON', 'CITATION', 'VERSION', 'CONTRIBUTOR']}, queries: [{exists: {field: 'LAT'}}]});
c.add('magic', 'count'  , 'samples'    , 'map'           , {index: 'magic_v5', type: 'samples_summaries', queries: [{exists: {field: 'LAT'}}]                             });

c.add('magic', 'pages'  , 'specimens'        , 'summaries'     , {index: 'magic_v5', type: 'specimens_summaries',                                  });
c.add('magic', 'count'    , 'specimens'    , 'summaries'     , {index: 'magic_v5', type: 'specimens_summaries'                                                      });

c.add('magic', 'sum'    , 'measurements' , 'summaries'     , {index: 'magic_v5', type: 'contributions_summaries' , field: 'N_MEASUREMENTS'                                                     });

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

export {Collections, collectionDefinitions, maxFilterBuckets};