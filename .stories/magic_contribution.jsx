import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import MagICContribution from '../client/modules/magic/components/search_summaries_list_item.jsx';


storiesOf('Search', module)
  .add('MagIC Contribution', () => (
    <MagICContribution contribution={{
      "contributor_id": 6382,
      "location_type": [
        "Outcrop"
      ],
      "reference_html": "<b>Bucker, C., Schult, A., Bloch, W. and Guerreiro, S.D.C. (1986).</b> Rockmagnetism and palaeomagnetism of an Early Cretaceous/Late Jurassic dike swarm in Rio Grande do Norte, Brazil.<i> Journal of Geophysics 60: 129-135.</i>",
      "n_locations": 1,
      "reference_id": 90086,
      "n_plots": 1,
      "contribution_id": 4297,
      "file_name": "zmab0090086tmp01",
      "min_inc": 20.8,
      "min_ages": 125000000,
      "citation": "Bucker et al. (1986)",
      "contributor": "MagIC Database Team",
      "end_lats": [
        -5.7
      ],
      "mdt_code": "m006169dt20061219131543",
      "region": [
        "NE Brazil"
      ],
      "n_vgp": 1,
      "geologic_classes": [
        "Intrusive"
      ],
      "max_ages": 167000000,
      "geologic_types": [
        "Outcrop"
      ],
      "n_dec": 1,
      "begin_lats": [
        -5.7
      ],
      "lithologies": [
        "dykes"
      ],
      "begin_lons": [
        323.6
      ],
      "status": 2,
      "max_dec": 186.6,
      "private_key": "oRekB9L6tWin",
      "random_plot_name": "LO:_Mesozoic Dykes, Rio Grande do Norte_SI:__SA:__SP:__CO:_g_TY:_eqarea_.png",
      "folder": "zmab",
      "reference_year": 1986,
      "min_dec": 186.6,
      "version_history": [
        {
          "activated": "2006-12-19T13:15:47-05:00",
          "contribution_id": 4297,
          "file_name": "zmab0090086tmp01",
          "version": 1,
          "upload": 1,
          "magic_version": 2.2,
          "folder": "zmab"
        }
      ],
      "upload": 1,
      "n_ages": 1,
      "country": [
        "Brazil"
      ],
      "activated": "2006-12-19T13:15:47-05:00",
      "version": 1,
      "long_authors": "Bucker, C., Schult, A., Bloch, W. and Guerreiro, S.D.C.",
      "magic_version": 2.2,
      "max_inc": 20.8,
      "method_codes": [
        "LP-DC3",
        "DE-VGP",
        "LT-AF-Z"
      ],
      "continent_ocean": [
        "South America"
      ],
      "n_inc": 1,
      "end_lons": [
        323.6
      ],
      "external_database_ids": {
        "name": "GPMDB"
      }
    }}/>
  ));