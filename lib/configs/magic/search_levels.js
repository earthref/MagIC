let levels = [
  { name: 'Contributions' },
  { name: 'Locations'     },
  { name: 'Sites'         },
  { name: 'Samples'       },
  { name: 'Specimens'     },
  { name: 'Experiments'   },
  { name: 'Measurements'  }
];

let index = 'magic_v2';

levels[0].views = [ { name: 'Summaries', es: { index: index, type: 'contribution' , source: {excludes: ['*.vals', '*._geo_shape'   ], includes: ['summary.contribution.*', 'summary.' + 'contribution' + '.*', 'summary._all.*']} }} ]; //,
//                  { name: 'Map'      , es: { index: index, type: 'contribution' , source: {excludes: ['*.vals', '*._geo_shape'   ], includes: ['summary.contribution.*', 'summary.' + 'contribution' + '.*', 'summary._all.*'} } ,
//                  { name: 'Plots'    , es: { index: index, type: 'contribution' , source: {excludes: ['*.vals', '*._geo_shape'   ], includes: ['summary.contribution.*', 'summary.' + 'contribution' + '.*', 'summary._all.*'} } ,
//                  { name: 'Images'   , es: { index: index, type: 'contribution' , source: {excludes: ['*.vals', '*._geo_shape'   ], includes: ['summary.contribution.*', 'summary.' + 'contribution' + '.*', 'summary._all.*'} } ];
levels[1].views = [ { name: 'Summaries', es: { index: index, type: 'locations'    , source: {excludes: ['*.vals', '*._geo_shape'   ], includes: ['summary.contribution.*', 'summary.' + 'locations'    + '.*', 'summary._all.*']} }} ,
                    { name: 'Rows'     , es: { index: index, type: 'locations'    , source: {excludes: ['*.vals', '*._geo_shape'   ], includes: ['summary.contribution.*', 'summary.' + 'locations'    + '.*', 'summary._all.*']}    , countField: 'summary.locations._n_results' }} ]; //,
//                  { name: 'Map'      , es: { index: index, type: 'locations'    , source: {excludes: ['*.vals', '*._geo_shape'   ], includes: ['summary.contribution.*', 'summary.' + 'locations'    + '.*', 'summary._all.*'} } ,
//                  { name: 'Plots'    , es: { index: index, type: 'locations'    , source: {excludes: ['*.vals', '*._geo_shape'   ], includes: ['summary.contribution.*', 'summary.' + 'locations'    + '.*', 'summary._all.*'} } ,
//                  { name: 'Images'   , es: { index: index, type: 'locations'    , source: {excludes: ['*.vals', '*._geo_shape'   ], includes: ['summary.contribution.*', 'summary.' + 'locations'    + '.*', 'summary._all.*'} } ];
levels[2].views = [ { name: 'Summaries', es: { index: index, type: 'sites'        , source: {excludes: ['*.vals', '*._geo_envelope'], includes: ['summary.contribution.*', 'summary.' + 'sites'        + '.*', 'summary._all.*']} }} ,
                    { name: 'Rows'     , es: { index: index, type: 'sites'        , source: {excludes: ['*.vals', '*._geo_envelope'], includes: ['summary.contribution.*', 'summary.' + 'sites'        + '.*', 'summary._all.*']}    , countField: 'summary.sites._n_results' }} ]; //,
//                  { name: 'Ages'     , es: { index: index, type: 'sites'        , source: {excludes: ['*.vals', '*._geo_envelope'], includes: ['summary.contribution.*', 'summary.' + 'sites'        + '.*', 'summary._all.*'} } ,
//                  { name: 'Map'      , es: { index: index, type: 'sites'        , source: {excludes: ['*.vals', '*._geo_envelope'], includes: ['summary.contribution.*', 'summary.' + 'sites'        + '.*', 'summary._all.*'} } ];
levels[3].views = [ { name: 'Summaries', es: { index: index, type: 'samples'      , source: {excludes: ['*.vals', '*._geo_envelope'], includes: ['summary.contribution.*', 'summary.' + 'samples'      + '.*', 'summary._all.*']} }} ,
                    { name: 'Rows'     , es: { index: index, type: 'samples'      , source: {excludes: ['*.vals', '*._geo_envelope'], includes: ['summary.contribution.*', 'summary.' + 'samples'      + '.*', 'summary._all.*']}    , countField: 'summary.samples._n_results' }} ]; //,
//                  { name: 'Ages'     , es: { index: index, type: 'samples'      , source: {excludes: ['*.vals', '*._geo_envelope'], includes: ['summary.contribution.*', 'summary.' + 'samples'      + '.*', 'summary._all.*'} } ,
//                  { name: 'Map'      , es: { index: index, type: 'samples'      , source: {excludes: ['*.vals', '*._geo_envelope'], includes: ['summary.contribution.*', 'summary.' + 'samples'      + '.*', 'summary._all.*'} } ];
levels[4].views = [ { name: 'Summaries', es: { index: index, type: 'specimens'    , source: {excludes: ['*.vals', '*._geo_envelope'], includes: ['summary.contribution.*', 'summary.' + 'specimens'    + '.*', 'summary._all.*']} }} ,
                    { name: 'Rows'     , es: { index: index, type: 'specimens'    , source: {excludes: ['*.vals', '*._geo_envelope'], includes: ['summary.contribution.*', 'summary.' + 'specimens'    + '.*', 'summary._all.*']}    , countField: 'summary.specimens._n_results' }} ]; //,
//                  { name: 'Plots'    , es: { index: index, type: 'specimens'    , source: {excludes: ['*.vals', '*._geo_envelope'], includes: ['summary.contribution.*', 'summary.' + 'specimens'    + '.*', 'summary._all.*'} } ,
//                  { name: 'Images'   , es: { index: index, type: 'specimens'    , source: {excludes: ['*.vals', '*._geo_envelope'], includes: ['summary.contribution.*', 'summary.' + 'specimens'    + '.*', 'summary._all.*'} } ];
levels[5].views = [ { name: 'Summaries', es: { index: index, type: 'experiments'  , source: {excludes: ['*.vals', '*._geo_envelope'], includes: ['summary.contribution.*', 'summary.' + 'experiments'  + '.*', 'summary._all.*']} }} ,
                    { name: 'Rows'     , es: { index: index, type: 'experiments'  , source: {excludes: ['*.vals', '*._geo_envelope'], includes: ['summary.contribution.*', 'summary.' + 'experiments'  + '.*', 'summary._all.*']}    , countField: 'summary.experiments._n_measurements' }} ];
levels[6].views = [ { name: 'Rows'     , es: { index: index, type: 'experiments'  , source: {excludes: ['*.vals', '*._geo_envelope'], includes: ['summary.contribution.*', 'summary.' + 'experiments'  + '.*', 'summary._all.*']}    , countField: 'summary.experiments._n_measurements' }} ];

export {levels, index};