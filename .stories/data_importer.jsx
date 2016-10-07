import _ from 'lodash';
import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import {default as versions} from '../client/modules/magic/configs/magic_versions';
import {default as models} from '../client/modules/magic/configs/data_models/data_models';
import DataImporter from '../client/modules/common/components/data_importer.jsx';

const importerData = [
  ['Location Name', 'Inclination', 'site_names' , 'Location Name', 'Inclination', 'site_names' , 'Location Name', 'Inclination', 'site_names' , 'Location Name'],
  ['location1'    , '1'          , 'site2'      , 'location1'    , '1'          , 'site2'      , 'location1'    , '1'          , 'site2'      , 'location1'    ],
  ['location2'    , ''           , 'site3'      , 'location2'    , ''           , 'site3'      , 'location2'    , ''           , 'site3'      , 'location2'    ],
  ['location3'    , '2'          , 'site2:site3', 'location3'    , '2'          , 'site2:site3', 'location3'    , '2'          , 'site2:site3', 'location3'    ],
  ['location1'    , '1'          , 'site2'      , 'location1'    , '1'          , 'site2'      , 'location1'    , '1'          , 'site2'      , 'location1'    ],
  ['location2'    , ''           , 'site3'      , 'location2'    , ''           , 'site3'      , 'location2'    , ''           , 'site3'      , 'location2'    ],
  ['location3'    , '2'          , 'site2:site3', 'location3'    , '2'          , 'site2:site3', 'location3'    , '2'          , 'site2:site3', 'location3'    ],
  ['location1'    , '1'          , 'site2'      , 'location1'    , '1'          , 'site2'      , 'location1'    , '1'          , 'site2'      , 'location1'    ],
  ['location2'    , ''           , 'site3'      , 'location2'    , ''           , 'site3'      , 'location2'    , ''           , 'site3'      , 'location2'    ],
  ['location3'    , '2'          , 'site2:site3', 'location3'    , '2'          , 'site2:site3', 'location3'    , '2'          , 'site2:site3', 'location3'    ],
  ['location1'    , '1'          , 'site2'      , 'location1'    , '1'          , 'site2'      , 'location1'    , '1'          , 'site2'      , 'location1'    ],
  ['location2'    , ''           , 'site3'      , 'location2'    , ''           , 'site3'      , 'location2'    , ''           , 'site3'      , 'location2'    ],
  ['location3'    , '2'          , 'site2:site3', 'location3'    , '2'          , 'site2:site3', 'location3'    , '2'          , 'site2:site3', 'location3'    ],
  ['location1'    , '1'          , 'site2'      , 'location1'    , '1'          , 'site2'      , 'location1'    , '1'          , 'site2'      , 'location1'    ],
  ['location2'    , ''           , 'site3'      , 'location2'    , ''           , 'site3'      , 'location2'    , ''           , 'site3'      , 'location2'    ],
  ['location3'    , '2'          , 'site2:site3', 'location3'    , '2'          , 'site2:site3', 'location3'    , '2'          , 'site2:site3', 'location3'    ]
];
models[_.last(versions)].tables.locations.columns.int_abs['other_units'] = {};
models[_.last(versions)].tables.locations.columns.int_abs['other_units']['µT'] = (x) => x*1000000;

storiesOf('Data Importer', module)
  .add('MagIC', () => (
    <div className="ui segment">
      <DataImporter
        portal="MagIC"
        data={importerData}
        model={models[_.last(versions)]}
      />
    </div>
  ));