global.magicModels['2.3'] = {
  'magic_version':'2.3',
  'tables': {
    'contribution': {
      'label': 'Contribution',
      'position': 1,
      'description': 'Contribution metadata',
      'columns': {
        'id': {
          'label': 'Contribution ID',
          'group': 'Contribution',
          'position': 1,
          'type': 'Integer',
          'description': 'Unique MagIC Contribution ID, Download Only, written during contribution activation',
          'examples': ['5412'],
          'validations': ['downloadOnly()'],
          'previous_columns': [{
            'table': 'contribution',
            'column': 'id'
          }],
          'next_columns': [{
            'table': 'contribution',
            'column': 'id'
          }]
        }, 'version': {
          'label': 'Version',
          'group': 'Contribution',
          'position': 2,
          'type': 'Integer',
          'description': 'Contribution version number, Download Only, written during contribution activation',
          'notes': '1 for original contribution, 6 for latest contribution if there are 6 versions, empty if the contribution is not activated',
          'validations': ['downloadOnly()'],
          'previous_columns': [{
            'table': 'contribution',
            'column': 'version'
          }],
          'next_columns': [{
            'table': 'contribution',
            'column': 'version'
          }]
        }, 'utc_timestamp': {
          'label': 'Activation Timestamp',
          'group': 'Contribution',
          'position': 3,
          'type': 'Timestamp',
          'description': 'UTC date and time of contribution activation, Download Only, written during contribution activation',
          'notes': 'Date and time in the "yyyy:mm:dd:hh:mm:ss.ss" format',
          'validations': ['downloadOnly()'],
          'previous_columns': [{
            'table': 'contribution',
            'column': 'utc_timestamp'
          }],
          'next_columns': [{
            'table': 'contribution',
            'column': 'utc_timestamp'
          }]
        }, 'magic_version': {
          'label': 'MagIC Version',
          'group': 'Contribution',
          'position': 4,
          'type': 'String',
          'description': 'MagIC data model version, Download Only, written during contribution upload',
          'examples': ['2.5', '3.0'],
          'validations': ['downloadOnly()'],
          'previous_columns': [{
            'table': 'contribution',
            'column': 'magic_version'
          }],
          'next_columns': [{
            'table': 'contribution',
            'column': 'magic_version'
          }]
        }, 'contributor': {
          'label': 'Contributor',
          'group': 'Contribution',
          'position': 5,
          'type': 'String',
          'description': 'Contributor EarthRef handle, Download Only, written during contribution upload',
          'examples': ['@njarboe'],
          'validations': ['downloadOnly()'],
          'previous_columns': [{
            'table': 'contribution',
            'column': 'contributor'
          }],
          'next_columns': [{
            'table': 'contribution',
            'column': 'contributor'
          }]
        }, 'doi': {
          'label': 'Reference',
          'group': 'Contribution',
          'position': 6,
          'type': 'String',
          'description': 'Contribution reference DOI',
          'examples': ['10.1029/92JB01202', '10.1023/A:1015035228810'],
          'validations': ['type("references")'],
          'previous_columns': [{
            'table': 'contribution',
            'column': 'doi'
          }],
          'next_columns': [{
            'table': 'contribution',
            'column': 'doi'
          }]
        }, 'author': {
          'label': 'Original Author',
          'group': 'Contribution',
          'position': 7,
          'type': 'String',
          'description': 'Original Author EarthRef handle or name and email',
          'examples': ['@cconstable', 'Not A. Member <no.earthref.handle@gmail.com>'],
          'validations': ['type("users")'],
          'previous_columns': [{
            'table': 'contribution',
            'column': 'author'
          }],
          'next_columns': [{
            'table': 'contribution',
            'column': 'author'
          }]
        }, 'description': {
          'label': 'Description',
          'group': 'Contribution',
          'position': 8,
          'type': 'String',
          'description': 'Contribution description and update comments',
          'examples': ['Fixes errors in latitudes and adds measurement data'],
          'previous_columns': [{
            'table': 'contribution',
            'column': 'description'
          }],
          'next_columns': [{
            'table': 'contribution',
            'column': 'description'
          }]
        }
      }
    },
    'er_members': {
      'position': 5,
      'columns': {
        'er_member_name': {
          'group': 'Rock Member',
          'next_columns': [{
            'table': 'er_members',
            'column': 'er_member_name'
          }],
          'unit': 'Rock Member',
          'position': 0,
          'previous_columns': [{
            'table': 'er_members',
            'column': 'er_member_name'
          }],
          'label': 'Rock Member',
          'type': 'Rock Member',
          'description': 'Rock Member',
          'examples': ['Glasshound Member']
        },
        'er_member_alternatives': {
          'group': 'Rock Member',
          'next_columns': [{
            'table': 'er_members',
            'column': 'er_member_alternatives'
          }],
          'unit': 'Rock Member',
          'position': 1,
          'previous_columns': [{
            'table': 'er_members',
            'column': 'er_member_alternatives'
          }],
          'label': 'Rock Member',
          'type': 'Rock Member',
          'description': 'Rock Member'
        },
        'member_paleo_environment': {
          'group': 'Rock Member',
          'next_columns': [{
            'table': 'er_members',
            'column': 'member_paleo_environment'
          }],
          'unit': 'Rock Member',
          'position': 5,
          'previous_columns': [{
            'table': 'er_members',
            'column': 'member_paleo_environment'
          }],
          'label': 'Rock Member',
          'type': 'Rock Member',
          'description': 'Rock Member',
          'examples': ['Fluvial', 'Continental Shelf', 'Eolian', 'Fringing Reef']
        },
        'member_thickness': {
          'group': 'Rock Member',
          'next_columns': [{
            'table': 'er_members',
            'column': 'member_thickness'
          }],
          'unit': 'Rock Member',
          'position': 6,
          'previous_columns': [{
            'table': 'er_members',
            'column': 'member_thickness'
          }],
          'label': 'Rock Member',
          'type': 'Rock Member',
          'description': 'Rock Member'
        },
        'member_class': {
          'group': 'Rock Member',
          'next_columns': [{
            'table': 'er_members',
            'column': 'member_class'
          }],
          'unit': 'Rock Member',
          'position': 3,
          'previous_columns': [{
            'table': 'er_members',
            'column': 'member_class'
          }],
          'label': 'Rock Member',
          'type': 'Rock Member',
          'description': 'Rock Member',
          'examples': ['Igneous', 'Sedimentary', 'Metamorphic', 'Archeological', 'Intrusive', 'Extrusive', 'Submarine', 'Subaerial']
        },
        'er_formation_name': {
          'group': 'Rock Member',
          'next_columns': [{
            'table': 'er_members',
            'column': 'er_formation_name'
          }],
          'unit': 'Rock Member',
          'position': 2,
          'previous_columns': [{
            'table': 'er_members',
            'column': 'er_formation_name'
          }],
          'label': 'Rock Member',
          'type': 'Rock Member',
          'description': 'Rock Member',
          'examples': ['Bluebird Formation']
        },
        'er_citation_names': {
          'group': 'Rock Member',
          'next_columns': [{
            'table': 'er_members',
            'column': 'er_citation_names'
          }],
          'unit': 'Rock Member',
          'position': 9,
          'previous_columns': [{
            'table': 'er_members',
            'column': 'er_citation_names'
          }],
          'label': 'Rock Member',
          'type': 'Rock Member',
          'description': 'Rock Member',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'er_scientist_mail_names': {
          'group': 'Rock Member',
          'next_columns': [{
            'table': 'er_members',
            'column': 'er_scientist_mail_names'
          }],
          'unit': 'Rock Member',
          'position': 8,
          'previous_columns': [{
            'table': 'er_members',
            'column': 'er_scientist_mail_names'
          }],
          'label': 'Rock Member',
          'type': 'Rock Member',
          'description': 'Rock Member',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'member_description': {
          'group': 'Rock Member',
          'next_columns': [{
            'table': 'er_members',
            'column': 'member_description'
          }],
          'unit': 'Rock Member',
          'position': 7,
          'previous_columns': [{
            'table': 'er_members',
            'column': 'member_description'
          }],
          'label': 'Rock Member',
          'type': 'Rock Member',
          'description': 'Rock Member'
        },
        'member_lithology': {
          'group': 'Rock Member',
          'next_columns': [{
            'table': 'er_members',
            'column': 'member_lithology'
          }],
          'unit': 'Rock Member',
          'position': 4,
          'previous_columns': [{
            'table': 'er_members',
            'column': 'member_lithology'
          }],
          'label': 'Rock Member',
          'type': 'Rock Member',
          'description': 'Rock Member',
          'examples': ['Basalt', 'Granite', 'Mudstone', 'Tuff', 'Granodiorite', 'Marl']
        }
      },
      'label': 'Rock Member',
      'description': 'Unique rock member or section'
    },
    'magic_calibrations': {
      'position': 19,
      'columns': {
        'calibration_time_zone': {
          'group': 'Calibrations',
          'next_columns': [{
            'table': 'magic_calibrations',
            'column': 'calibration_time_zone'
          }],
          'unit': 'Calibrations',
          'position': 5,
          'previous_columns': [{
            'table': 'magic_calibrations',
            'column': 'calibration_time_zone'
          }],
          'label': 'Calibrations',
          'type': 'Calibrations',
          'description': 'Calibrations',
          'examples': ['UTC', 'PDT', 'GMT']
        },
        'er_specimen_name': {
          'group': 'Calibrations',
          'next_columns': [{
            'table': 'magic_calibrations',
            'column': 'er_specimen_name'
          }],
          'unit': 'Calibrations',
          'position': 1,
          'previous_columns': [{
            'table': 'magic_calibrations',
            'column': 'er_specimen_name'
          }],
          'label': 'Calibrations',
          'type': 'Calibrations',
          'description': 'Calibrations',
          'examples': ['Bas123a-01x']
        },
        'magic_instrument_codes': {
          'group': 'Calibrations',
          'next_columns': [{
            'table': 'magic_calibrations',
            'column': 'magic_instrument_codes'
          }],
          'unit': 'Calibrations',
          'position': 8,
          'previous_columns': [{
            'table': 'magic_calibrations',
            'column': 'magic_instrument_codes'
          }],
          'label': 'Calibrations',
          'type': 'Calibrations',
          'description': 'Calibrations',
          'examples': ['SIO-Bubba', 'IRM-OldBlue']
        },
        'magic_method_codes': {
          'group': 'Calibrations',
          'next_columns': [{
            'table': 'magic_calibrations',
            'column': 'magic_method_codes'
          }],
          'unit': 'Calibrations',
          'position': 7,
          'previous_columns': [{
            'table': 'magic_calibrations',
            'column': 'magic_method_codes'
          }],
          'label': 'Calibrations',
          'type': 'Calibrations',
          'description': 'Calibrations',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'er_mineral_name': {
          'group': 'Calibrations',
          'next_columns': [{
            'table': 'magic_calibrations',
            'column': 'er_mineral_name'
          }],
          'unit': 'Calibrations',
          'position': 2,
          'previous_columns': [{
            'table': 'magic_calibrations',
            'column': 'er_mineral_name'
          }],
          'label': 'Calibrations',
          'type': 'Calibrations',
          'description': 'Calibrations',
          'examples': ['San03-001']
        },
        'er_synthetic_name': {
          'group': 'Calibrations',
          'next_columns': [{
            'table': 'magic_calibrations',
            'column': 'er_synthetic_name'
          }],
          'unit': 'Calibrations',
          'position': 3,
          'previous_columns': [{
            'table': 'magic_calibrations',
            'column': 'er_synthetic_name'
          }],
          'label': 'Calibrations',
          'type': 'Calibrations',
          'description': 'Calibrations',
          'examples': ['STD1546-A1']
        },
        'calibration_date': {
          'group': 'Calibrations',
          'next_columns': [{
            'table': 'magic_calibrations',
            'column': 'calibration_date'
          }],
          'unit': 'Calibrations',
          'position': 4,
          'previous_columns': [{
            'table': 'magic_calibrations',
            'column': 'calibration_date'
          }],
          'label': 'Calibrations',
          'type': 'Calibrations',
          'description': 'Calibrations',
          'examples': ['Number in the \'yyyy:mm:dd:hh:mm:ss.ss\' format']
        },
        'er_citation_names': {
          'group': 'Calibrations',
          'next_columns': [{
            'table': 'magic_calibrations',
            'column': 'er_citation_names'
          }],
          'unit': 'Calibrations',
          'position': 10,
          'previous_columns': [{
            'table': 'magic_calibrations',
            'column': 'er_citation_names'
          }],
          'label': 'Calibrations',
          'type': 'Calibrations',
          'description': 'Calibrations',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'calibration_description': {
          'group': 'Calibrations',
          'next_columns': [{
            'table': 'magic_calibrations',
            'column': 'calibration_description'
          }],
          'unit': 'Calibrations',
          'position': 6,
          'previous_columns': [{
            'table': 'magic_calibrations',
            'column': 'calibration_description'
          }],
          'label': 'Calibrations',
          'type': 'Calibrations',
          'description': 'Calibrations'
        },
        'er_analyst_mail_names': {
          'group': 'Calibrations',
          'next_columns': [{
            'table': 'magic_calibrations',
            'column': 'er_analyst_mail_names'
          }],
          'unit': 'Calibrations',
          'position': 9,
          'previous_columns': [{
            'table': 'magic_calibrations',
            'column': 'er_analyst_mail_names'
          }],
          'label': 'Calibrations',
          'type': 'Calibrations',
          'description': 'Calibrations',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'er_sample_name': {
          'group': 'Calibrations',
          'next_columns': [{
            'table': 'magic_calibrations',
            'column': 'er_sample_name'
          }],
          'unit': 'Calibrations',
          'position': 0,
          'previous_columns': [{
            'table': 'magic_calibrations',
            'column': 'er_sample_name'
          }],
          'label': 'Calibrations',
          'type': 'Calibrations',
          'description': 'Calibrations',
          'examples': ['Bas123a-01']
        }
      },
      'label': 'Calibrations',
      'description': 'Calibrations'
    },
    'er_sites': {
      'position': 6,
      'columns': {
        'er_member_name': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'er_member_name'
          }],
          'unit': 'Sites',
          'position': 5,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'er_member_name'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Glasshound Member']
        },
        'magic_method_codes': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'magic_method_codes'
          }],
          'unit': 'Sites',
          'position': 20,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'magic_method_codes'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'site_lithology': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_lithology'
          }],
          'unit': 'Sites',
          'position': 8,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'site_lithology'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Basalt', 'Granite', 'Mudstone', 'Tuff', 'Granodiorite', 'Marl']
        },
        'site_location_geoid': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_location_geoid'
          }],
          'unit': 'Sites',
          'position': 13,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'site_location_geoid'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['WGS84', 'GEOID03', 'USGG2003', 'GEOID99', 'G99SSS', 'G99BM', 'DEFLEC99 ']
        },
        'site_description': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_description'
          }],
          'unit': 'Sites',
          'position': 19,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'site_description'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites'
        },
        'er_scientist_mail_names': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'er_scientist_mail_names'
          }],
          'unit': 'Sites',
          'position': 21,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'er_scientist_mail_names'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'er_site_alternatives': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'er_site_alternatives'
          }],
          'unit': 'Sites',
          'position': 1,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'er_site_alternatives'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites'
        },
        'site_height': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_height'
          }],
          'unit': 'Sites',
          'position': 15,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'site_height'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Positive is up in section or core', 'while negative is down relative to reference height']
        },
        'site_class': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_class'
          }],
          'unit': 'Sites',
          'position': 7,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'site_class'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Igneous', 'Sedimentary', 'Metamorphic', 'Archeological', 'Intrusive', 'Extrusive', 'Submarine', 'Subaerial']
        },
        'site_location_precision': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_location_precision'
          }],
          'unit': 'Sites',
          'position': 12,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'site_location_precision'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Decimal degrees']
        },
        'site_composite_depth': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_composite_depth'
          }],
          'unit': 'Sites',
          'position': 17,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'site_composite_depth'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Meters below seafloor']
        },
        'er_expedition_name': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'er_expedition_name'
          }],
          'unit': 'Sites',
          'position': 2,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'er_expedition_name'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['AVON02MV']
        },
        'site_lat': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_lat'
          }],
          'unit': 'Sites',
          'position': 10,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'site_lat'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'site_lon': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_lon'
          }],
          'unit': 'Sites',
          'position': 11,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'site_lon'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'er_formation_name': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'er_formation_name'
          }],
          'unit': 'Sites',
          'position': 4,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'er_formation_name'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Bluebird Formation']
        },
        'site_definition': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_definition'
          }],
          'unit': 'Sites',
          'position': 6,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'site_definition'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Default = s']
        },
        'site_elevation': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_elevation'
          }],
          'unit': 'Sites',
          'position': 14,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'site_elevation'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Meters above sealevel']
        },
        'er_site_name': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'er_site_name'
          }],
          'unit': 'Sites',
          'position': 0,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'er_site_name'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Bas123a']
        },
        'er_citation_names': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'er_citation_names'
          }],
          'unit': 'Sites',
          'position': 22,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'er_citation_names'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'site_igsn': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_igsn'
          }],
          'unit': 'Sites',
          'position': 18,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'site_igsn'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['SIO0A0987', 'SIO001317']
        },
        'site_core_depth': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_core_depth'
          }],
          'unit': 'Sites',
          'position': 16,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'site_core_depth'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Meters below seafloor']
        },
        'site_type': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_type'
          }],
          'unit': 'Sites',
          'position': 9,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'site_type'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Flow Top', 'Glassy Margin', 'Pot Rim', 'Pillow', 'Kiln', 'Sediment Layer']
        },
        'er_location_name': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'er_location_name'
          }],
          'unit': 'Sites',
          'position': 3,
          'previous_columns': [{
            'table': 'er_sites',
            'column': 'er_location_name'
          }],
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801']
        }
      },
      'label': 'Sites',
      'description': 'Unique rock unit in terms of geological age'
    },
    'rmag_results': {
      'position': 30,
      'columns': {
        'anisotropy_v3_zeta_semi_angle': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v3_zeta_semi_angle'
          }],
          'unit': 'Results',
          'position': 43,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v3_zeta_semi_angle'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Confidence Level = 95%']
        },
        'anisotropy_fl': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_fl'
          }],
          'unit': 'Results',
          'position': 52,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_fl'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'er_sample_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'er_sample_names'
          }],
          'unit': 'Results',
          'position': 3,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'er_sample_names'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Bas123a-01', 'Bas123a-04', 'Bas123a-19']
        },
        'anisotropy_v1_eta_dec': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v1_eta_dec'
          }],
          'unit': 'Results',
          'position': 29,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v1_eta_dec'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'magic_method_codes': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'magic_method_codes'
          }],
          'unit': 'Results',
          'position': 63,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'magic_method_codes'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'critical_temp_type': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'critical_temp_type'
          }],
          'unit': 'Results',
          'position': 12,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'critical_temp_type'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Verway', 'Morin', 'pyrrhotite', 'Neel', 'spin glass', 'Curie', 'Hopkinson', 'blocking', 'unblocking']
        },
        'anisotropy_v2_eta_dec': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v2_eta_dec'
          }],
          'unit': 'Results',
          'position': 30,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v2_eta_dec'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_p': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_p'
          }],
          'unit': 'Results',
          'position': 48,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_p'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_pp': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_pp'
          }],
          'unit': 'Results',
          'position': 49,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_pp'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'critical_temp_high': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'critical_temp_high'
          }],
          'unit': 'Results',
          'position': 10,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'critical_temp_high'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_v2_zeta_semi_angle': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v2_zeta_semi_angle'
          }],
          'unit': 'Results',
          'position': 42,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v2_zeta_semi_angle'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Confidence Level = 95%']
        },
        'anisotropy_ll': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_ll'
          }],
          'unit': 'Results',
          'position': 47,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_ll'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_t2': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_t2'
          }],
          'unit': 'Results',
          'position': 18,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_t2'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'critical_temp_mineral': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'critical_temp_mineral'
          }],
          'unit': 'Results',
          'position': 13,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'critical_temp_mineral'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Magnetite', 'hematite', 'maghemite']
        },
        'anisotropy_l': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_l'
          }],
          'unit': 'Results',
          'position': 46,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_l'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'er_fossil_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'er_fossil_names'
          }],
          'unit': 'Results',
          'position': 5,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'er_fossil_names'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['AMM43-03', 'AMM43-19']
        },
        'compilation_ids': {
          'group': 'Results',
          'next_columns': [],
          'unit': 'Results',
          'position': 61,
          'previous_columns': [],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['1435', '23', '2329']
        },
        'er_specimen_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'er_specimen_names'
          }],
          'unit': 'Results',
          'position': 4,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'er_specimen_names'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Bas123a-01x', 'Bas123a-01y']
        },
        'critical_temp': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'critical_temp'
          }],
          'unit': 'Results',
          'position': 11,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'critical_temp'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'critical_temp_low': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'critical_temp_low'
          }],
          'unit': 'Results',
          'position': 9,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'critical_temp_low'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_v3_zeta_inc': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v3_zeta_inc'
          }],
          'unit': 'Results',
          'position': 37,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v3_zeta_inc'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'er_mineral_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'er_mineral_names'
          }],
          'unit': 'Results',
          'position': 6,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'er_mineral_names'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['PLG33a', 'MAGN-MJ-034']
        },
        'rmag_criteria_codes': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'rmag_criteria_codes'
          }],
          'unit': 'Results',
          'position': 62,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'rmag_criteria_codes'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['MY-MAD', 'MY-APLHA95']
        },
        'hysteresis_bcr_bc': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'hysteresis_bcr_bc'
          }],
          'unit': 'Results',
          'position': 15,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'hysteresis_bcr_bc'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_v3_dec': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v3_dec'
          }],
          'unit': 'Results',
          'position': 22,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v3_dec'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_t': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_t'
          }],
          'unit': 'Results',
          'position': 50,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_t'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'rmag_result_name': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'rmag_result_name'
          }],
          'unit': 'Results',
          'position': 0,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'rmag_result_name'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['MY-POLE-XX']
        },
        'anisotropy_t3': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_t3'
          }],
          'unit': 'Results',
          'position': 19,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_t3'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_v3_eta_dec': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v3_eta_dec'
          }],
          'unit': 'Results',
          'position': 31,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v3_eta_dec'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_v1_inc': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v1_inc'
          }],
          'unit': 'Results',
          'position': 23,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v1_inc'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_v1_eta_inc': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v1_eta_inc'
          }],
          'unit': 'Results',
          'position': 26,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v1_eta_inc'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_v3_inc': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v3_inc'
          }],
          'unit': 'Results',
          'position': 25,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v3_inc'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_v3_eta_semi_angle': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v3_eta_semi_angle'
          }],
          'unit': 'Results',
          'position': 34,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v3_eta_semi_angle'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Confidence Level = 95%']
        },
        'anisotropy_ftest': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_ftest'
          }],
          'unit': 'Results',
          'position': 55,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_ftest'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_v2_eta_inc': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v2_eta_inc'
          }],
          'unit': 'Results',
          'position': 27,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v2_eta_inc'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'result_description': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'result_description'
          }],
          'unit': 'Results',
          'position': 59,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'result_description'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_v1_zeta_inc': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v1_zeta_inc'
          }],
          'unit': 'Results',
          'position': 35,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v1_zeta_inc'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_total': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_total'
          }],
          'unit': 'Results',
          'position': 53,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_total'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Number between 0 and 300% ']
        },
        'anisotropy_ftest23': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_ftest23'
          }],
          'unit': 'Results',
          'position': 57,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_ftest23'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_f': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_f'
          }],
          'unit': 'Results',
          'position': 44,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_f'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_type': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_type'
          }],
          'unit': 'Results',
          'position': 16,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_type'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['AMS', 'AARM', 'AIRM', 'ATRM']
        },
        'anisotropy_v3_eta_inc': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v3_eta_inc'
          }],
          'unit': 'Results',
          'position': 28,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v3_eta_inc'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_v2_dec': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v2_dec'
          }],
          'unit': 'Results',
          'position': 21,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v2_dec'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_v2_zeta_inc': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v2_zeta_inc'
          }],
          'unit': 'Results',
          'position': 36,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v2_zeta_inc'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'er_analyst_mail_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'er_analyst_mail_names'
          }],
          'unit': 'Results',
          'position': 65,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'er_analyst_mail_names'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'hysteresis_mr_ms': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'hysteresis_mr_ms'
          }],
          'unit': 'Results',
          'position': 14,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'hysteresis_mr_ms'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_v2_eta_semi_angle': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v2_eta_semi_angle'
          }],
          'unit': 'Results',
          'position': 33,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v2_eta_semi_angle'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Confidence Level = 95%']
        },
        'er_synthetic_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'er_synthetic_names'
          }],
          'unit': 'Results',
          'position': 7,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'er_synthetic_names'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['STD1546-A1', 'STD1546-X23']
        },
        'anisotropy_v1_zeta_semi_angle': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v1_zeta_semi_angle'
          }],
          'unit': 'Results',
          'position': 41,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v1_zeta_semi_angle'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Confidence Level = 95%']
        },
        'anisotropy_vg': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_vg'
          }],
          'unit': 'Results',
          'position': 51,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_vg'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Fabric is oblate when V>45 degrees']
        },
        'magic_experiment_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'magic_experiment_names'
          }],
          'unit': 'Results',
          'position': 8,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'magic_experiment_names'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['KOPA-299-1', 'KOPA-299-2', 'KOPA-299-6']
        },
        'anisotropy_ff': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_ff'
          }],
          'unit': 'Results',
          'position': 45,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_ff'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_v1_dec': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v1_dec'
          }],
          'unit': 'Results',
          'position': 20,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v1_dec'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'er_citation_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'er_citation_names'
          }],
          'unit': 'Results',
          'position': 66,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'er_citation_names'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'compilation_names': {
          'group': 'Results',
          'next_columns': [],
          'unit': 'Results',
          'position': 60,
          'previous_columns': [],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['GEOMAGIA', 'CALS7', 'ARCHEO00']
        },
        'tilt_correction': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'tilt_correction'
          }],
          'unit': 'Results',
          'position': 58,
          'previous_columns': [],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Correction between geographic (0%) and stratigraphic (100%); unoriented (-1%); partially oriented to horizontal only (-2%)']
        },
        'anisotropy_v2_inc': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v2_inc'
          }],
          'unit': 'Results',
          'position': 24,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v2_inc'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_v1_eta_semi_angle': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v1_eta_semi_angle'
          }],
          'unit': 'Results',
          'position': 32,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v1_eta_semi_angle'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Confidence Level = 95%']
        },
        'er_site_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'er_site_names'
          }],
          'unit': 'Results',
          'position': 2,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'er_site_names'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Bas123a', 'Bas156z', 'Bas445c']
        },
        'anisotropy_ftest12': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_ftest12'
          }],
          'unit': 'Results',
          'position': 56,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_ftest12'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_percent': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_percent'
          }],
          'unit': 'Results',
          'position': 54,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_percent'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Number between 0 and 100% ']
        },
        'magic_instrument_codes': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'magic_instrument_codes'
          }],
          'unit': 'Results',
          'position': 64,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'magic_instrument_codes'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['SIO-Bubba', 'IRM-OldBlue']
        },
        'anisotropy_t1': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_t1'
          }],
          'unit': 'Results',
          'position': 17,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_t1'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_v3_zeta_dec': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v3_zeta_dec'
          }],
          'unit': 'Results',
          'position': 40,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v3_zeta_dec'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_v2_zeta_dec': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v2_zeta_dec'
          }],
          'unit': 'Results',
          'position': 39,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v2_zeta_dec'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'anisotropy_v1_zeta_dec': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v1_zeta_dec'
          }],
          'unit': 'Results',
          'position': 38,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'anisotropy_v1_zeta_dec'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'er_location_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'rmag_results',
            'column': 'er_location_names'
          }],
          'unit': 'Results',
          'position': 1,
          'previous_columns': [{
            'table': 'rmag_results',
            'column': 'er_location_names'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Site 801', 'Site 1129', 'Dredge AMAT02-D15']
        }
      },
      'label': 'Results',
      'description': 'Summary results and highly derived data products (critical temperatures, etc)'
    },
    'er_citations': {
      'position': 13,
      'columns': {
        'er_citation_name': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'er_citation_name'
          }],
          'unit': 'Citations List',
          'position': 0,
          'previous_columns': [{
            'table': 'er_citations',
            'column': 'er_citation_name'
          }],
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['Hart et al. 1999', 'Hart & Staudigel 1999', 'This Study']
        },
        'keywords': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'keywords'
          }],
          'unit': 'Citations List',
          'position': 14,
          'previous_columns': [{
            'table': 'er_citations',
            'column': 'keywords'
          }],
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['Seamount', 'Alkali basalt', 'Hotspot']
        },
        'doi': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'doi'
          }],
          'unit': 'Citations List',
          'position': 3,
          'previous_columns': [{
            'table': 'er_citations',
            'column': 'doi'
          }],
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['10.1029/2002GC000343']
        },
        'book_editors': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'book_editors'
          }],
          'unit': 'Citations List',
          'position': 11,
          'previous_columns': [{
            'table': 'er_citations',
            'column': 'book_editors'
          }],
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['Hart', 'S.R.', 'Blusztajn', 'J. and Meyer', 'P.S.']
        },
        'title': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'title'
          }],
          'unit': 'Citations List',
          'position': 5,
          'previous_columns': [{
            'table': 'er_citations',
            'column': 'title'
          }],
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['No period required at end of title']
        },
        'pages': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'pages'
          }],
          'unit': 'Citations List',
          'position': 9,
          'previous_columns': [{
            'table': 'er_citations',
            'column': 'pages'
          }],
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['2', '345-2', '367 or 123']
        },
        'journal': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'journal'
          }],
          'unit': 'Citations List',
          'position': 7,
          'previous_columns': [{
            'table': 'er_citations',
            'column': 'journal'
          }],
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['Always use non-abbreviated journal names']
        },
        'long_authors': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'long_authors'
          }],
          'unit': 'Citations List',
          'position': 1,
          'previous_columns': [{
            'table': 'er_citations',
            'column': 'long_authors'
          }],
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['Hart', 'S.R.', 'Blusztajn', 'J. and Meyer', 'P.S.']
        },
        'year': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'year'
          }],
          'unit': 'Citations List',
          'position': 2,
          'previous_columns': [{
            'table': 'er_citations',
            'column': 'year'
          }],
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['Number in the \'yyyy\' format', 'where 2001a and 2001b are allowed']
        },
        'publisher': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'publisher'
          }],
          'unit': 'Citations List',
          'position': 12,
          'previous_columns': [{
            'table': 'er_citations',
            'column': 'publisher'
          }],
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['Kluwer Academics']
        },
        'citation_type': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'citation_type'
          }],
          'unit': 'Citations List',
          'position': 6,
          'previous_columns': [{
            'table': 'er_citations',
            'column': 'citation_type'
          }],
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['Journal', 'Book', 'Edited Book', 'Serial Book', 'Abstract', 'Ph.D. Thesis']
        },
        'book_title': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'book_title'
          }],
          'unit': 'Citations List',
          'position': 10,
          'previous_columns': [{
            'table': 'er_citations',
            'column': 'book_title'
          }],
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['No period required at end of title']
        },
        'issn': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'issn'
          }],
          'unit': 'Citations List',
          'position': 4,
          'previous_columns': [{
            'table': 'er_citations',
            'column': 'issn'
          }],
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['1525-2027']
        },
        'city': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'city'
          }],
          'unit': 'Citations List',
          'position': 13,
          'previous_columns': [{
            'table': 'er_citations',
            'column': 'city'
          }],
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['Dordrecht', 'the Netherlands']
        },
        'volume': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'volume'
          }],
          'unit': 'Citations List',
          'position': 8,
          'previous_columns': [{
            'table': 'er_citations',
            'column': 'volume'
          }],
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['34A or 101(4)']
        }
      },
      'label': 'Citations List',
      'description': 'List of references'
    },
    'er_images': {
      'position': 15,
      'columns': {
        'er_member_name': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'er_member_name'
          }],
          'unit': 'Images',
          'position': 5,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'er_member_name'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images',
          'examples': ['Glasshound Member']
        },
        'image_description': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'image_description'
          }],
          'unit': 'Images',
          'position': 15,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'image_description'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images'
        },
        'er_image_name': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'er_image_name'
          }],
          'unit': 'Images',
          'position': 0,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'er_image_name'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images',
          'examples': ['IMG_1429.jpg']
        },
        'image_type': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'image_type'
          }],
          'unit': 'Images',
          'position': 12,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'image_type'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images',
          'examples': ['Outcrop', 'thin section', 'MFM image', 'hologram', 'scanning squid', 'Bitter', 'Moke', 'etc.']
        },
        'er_image_alternatives': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'er_image_alternatives'
          }],
          'unit': 'Images',
          'position': 1,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'er_image_alternatives'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images'
        },
        'er_synthetic_name': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'er_synthetic_name'
          }],
          'unit': 'Images',
          'position': 11,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'er_synthetic_name'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images',
          'examples': ['STD1546-A1']
        },
        'er_expedition_name': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'er_expedition_name'
          }],
          'unit': 'Images',
          'position': 2,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'er_expedition_name'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images',
          'examples': ['AVON02MV']
        },
        'er_formation_name': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'er_formation_name'
          }],
          'unit': 'Images',
          'position': 4,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'er_formation_name'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images',
          'examples': ['Bluebird Formation']
        },
        'image_time_zone': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'image_time_zone'
          }],
          'unit': 'Images',
          'position': 17,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'image_time_zone'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images',
          'examples': ['UTC', 'PDT', 'GMT']
        },
        'er_photographer_mail_names': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'er_photographer_mail_names'
          }],
          'unit': 'Images',
          'position': 18,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'er_photographer_mail_names'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'er_site_name': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'er_site_name'
          }],
          'unit': 'Images',
          'position': 6,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'er_site_name'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images',
          'examples': ['Bas123a']
        },
        'er_citation_names': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'er_citation_names'
          }],
          'unit': 'Images',
          'position': 19,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'er_citation_names'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'er_sample_name': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'er_sample_name'
          }],
          'unit': 'Images',
          'position': 7,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'er_sample_name'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images',
          'examples': ['Bas123a-01']
        },
        'er_specimen_name': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'er_specimen_name'
          }],
          'unit': 'Images',
          'position': 8,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'er_specimen_name'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images',
          'examples': ['Bas123a-01x']
        },
        'image_keywords': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'image_keywords'
          }],
          'unit': 'Images',
          'position': 14,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'image_keywords'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images',
          'examples': ['Simrad Computer', 'Multibeam', 'Seamounts']
        },
        'image_title': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'image_title'
          }],
          'unit': 'Images',
          'position': 13,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'image_title'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images',
          'examples': ['High tech solutions for being lonely at sea']
        },
        'er_mineral_name': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'er_mineral_name'
          }],
          'unit': 'Images',
          'position': 10,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'er_mineral_name'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images',
          'examples': ['San03-001']
        },
        'image_date': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'image_date'
          }],
          'unit': 'Images',
          'position': 16,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'image_date'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images',
          'examples': ['Number in the \'yyyy:mm:dd:hh:mm:ss.ss\' format']
        },
        'er_fossil_name': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'er_fossil_name'
          }],
          'unit': 'Images',
          'position': 9,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'er_fossil_name'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images',
          'examples': ['AMM43-03']
        },
        'er_location_name': {
          'group': 'Images',
          'next_columns': [{
            'table': 'er_images',
            'column': 'er_location_name'
          }],
          'unit': 'Images',
          'position': 3,
          'previous_columns': [{
            'table': 'er_images',
            'column': 'er_location_name'
          }],
          'label': 'Images',
          'type': 'Images',
          'description': 'Images',
          'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801']
        }
      },
      'label': 'Images',
      'description': 'List of images and photographs'
    },
    'er_expeditions': {
      'position': 2,
      'columns': {
        'expedition_start_lat': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_start_lat'
          }],
          'unit': 'Expeditions',
          'position': 10,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_start_lat'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'expedition_vru_sensor': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_vru_sensor'
          }],
          'unit': 'Expeditions',
          'position': 26,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_vru_sensor'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'er_scientist_mail_names': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'er_scientist_mail_names'
          }],
          'unit': 'Expeditions',
          'position': 32,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'er_scientist_mail_names'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'expedition_end_lon': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_end_lon'
          }],
          'unit': 'Expeditions',
          'position': 16,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_end_lon'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'expedition_sci_equipment': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_sci_equipment'
          }],
          'unit': 'Expeditions',
          'position': 9,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_sci_equipment'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'expedition_start_time_zone': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_start_time_zone'
          }],
          'unit': 'Expeditions',
          'position': 13,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_start_time_zone'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['UTC', 'PDT', 'GMT']
        },
        'er_pi_mail_names': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'er_pi_mail_names'
          }],
          'unit': 'Expeditions',
          'position': 31,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'er_pi_mail_names'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Jean Smith', 'Conan H. Blacksun']
        },
        'expedition_ngdc_numb': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_ngdc_numb'
          }],
          'unit': 'Expeditions',
          'position': 4,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_ngdc_numb'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['ARIA01WT', 'AVON02MV', 'AMAT02RR']
        },
        'expedition_location': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_location'
          }],
          'unit': 'Expeditions',
          'position': 6,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_location'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'expedition_sponsor': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_sponsor'
          }],
          'unit': 'Expeditions',
          'position': 5,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_sponsor'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['NSF-OCE', 'NASA']
        },
        'er_expedition_name': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'er_expedition_name'
          }],
          'unit': 'Expeditions',
          'position': 0,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'er_expedition_name'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['AVON02MV']
        },
        'expedition_start_date': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_start_date'
          }],
          'unit': 'Expeditions',
          'position': 12,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_start_date'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Number in the \'yyyy:mm:dd:hh:mm:ss.ss\' format']
        },
        'expedition_end_lat': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_end_lat'
          }],
          'unit': 'Expeditions',
          'position': 15,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_end_lat'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'expedition_leg': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_leg'
          }],
          'unit': 'Expeditions',
          'position': 3,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_leg'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Leg 2']
        },
        'expedition_box_lat_min': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_box_lat_min'
          }],
          'unit': 'Expeditions',
          'position': 20,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_box_lat_min'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'expedition_start_lon': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_start_lon'
          }],
          'unit': 'Expeditions',
          'position': 11,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_start_lon'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'expedition_box_lat_max': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_box_lat_max'
          }],
          'unit': 'Expeditions',
          'position': 21,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_box_lat_max'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'expedition_ssv_sensor': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_ssv_sensor'
          }],
          'unit': 'Expeditions',
          'position': 27,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_ssv_sensor'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'er_crew_mail_names': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'er_crew_mail_names'
          }],
          'unit': 'Expeditions',
          'position': 33,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'er_crew_mail_names'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Josh Coldheart', 'Jane Goodall']
        },
        'er_expedition_alternatives': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'er_expedition_alternatives'
          }],
          'unit': 'Expeditions',
          'position': 1,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'er_expedition_alternatives'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'expedition_themes': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_themes'
          }],
          'unit': 'Expeditions',
          'position': 7,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_themes'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'expedition_end_date': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_end_date'
          }],
          'unit': 'Expeditions',
          'position': 17,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_end_date'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Number in the \'yyyy:mm:dd:hh:mm:ss.ss\' format']
        },
        'expedition_end_time_zone': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_end_time_zone'
          }],
          'unit': 'Expeditions',
          'position': 18,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_end_time_zone'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['UTC', 'PDT', 'GMT']
        },
        'er_citation_names': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'er_citation_names'
          }],
          'unit': 'Expeditions',
          'position': 34,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'er_citation_names'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'expedition_end_loc': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_end_loc'
          }],
          'unit': 'Expeditions',
          'position': 19,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_end_loc'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Majuro', 'Pago Pago', 'Guam']
        },
        'expedition_mdg_sensor': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_mdg_sensor'
          }],
          'unit': 'Expeditions',
          'position': 28,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_mdg_sensor'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'expedition_std_equipment': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_std_equipment'
          }],
          'unit': 'Expeditions',
          'position': 8,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_std_equipment'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'expedition_ship': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_ship'
          }],
          'unit': 'Expeditions',
          'position': 2,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_ship'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['R/V Melville']
        },
        'expedition_mb_sonar': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_mb_sonar'
          }],
          'unit': 'Expeditions',
          'position': 24,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_mb_sonar'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'expedition_box_lon_max': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_box_lon_max'
          }],
          'unit': 'Expeditions',
          'position': 23,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_box_lon_max'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'expedition_description': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_description'
          }],
          'unit': 'Expeditions',
          'position': 29,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_description'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'expedition_start_loc': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_start_loc'
          }],
          'unit': 'Expeditions',
          'position': 14,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_start_loc'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Majuro', 'Pago Pago', 'Guam']
        },
        'expedition_nav_sensor': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_nav_sensor'
          }],
          'unit': 'Expeditions',
          'position': 25,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_nav_sensor'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'expedition_box_lon_min': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_box_lon_min'
          }],
          'unit': 'Expeditions',
          'position': 22,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_box_lon_min'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'expedition_url': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_url'
          }],
          'unit': 'Expeditions',
          'position': 30,
          'previous_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_url'
          }],
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['http://earthref.org']
        }
      },
      'label': 'Expeditions',
      'description': 'Expedition, fieldwork or cruise definition'
    },
    'magic_measurements': {
      'position': 16,
      'columns': {
        'er_member_name': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'er_member_name'
          }],
          'unit': 'Measurements',
          'position': 3,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'er_member_name'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Glasshound Member']
        },
        'measurement_temp_change': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_temp_change'
          }],
          'unit': 'Measurements',
          'position': 42,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_temp_change'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'magic_experiment_name': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'magic_experiment_name'
          }],
          'unit': 'Measurements',
          'position': 10,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'magic_experiment_name'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['KOPA-299-1', 'KOPA-299-2', 'KOPA-299-6']
        },
        'measurement_standard': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_standard'
          }],
          'unit': 'Measurements',
          'position': 12,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_standard'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Default = u']
        },
        'magic_method_codes': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'magic_method_codes'
          }],
          'unit': 'Measurements',
          'position': 67,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'magic_method_codes'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'treatment_ac_field_dc_on': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_ac_field_dc_on'
          }],
          'unit': 'Measurements',
          'position': 32,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_ac_field_dc_on'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_number': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_number'
          }],
          'unit': 'Measurements',
          'position': 13,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_number'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['03C3012']
        },
        'measurement_magn_moment': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_magn_moment'
          }],
          'unit': 'Measurements',
          'position': 51,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_magn_moment'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'treatment_ac_field_decay_rate': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_ac_field_decay_rate'
          }],
          'unit': 'Measurements',
          'position': 31,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_ac_field_decay_rate'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'treatment_dc_field': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_dc_field'
          }],
          'unit': 'Measurements',
          'position': 34,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_dc_field'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_height': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_height'
          }],
          'unit': 'Measurements',
          'position': 23,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_height'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Positive is up in section or core', 'while negative is down relative to reference height']
        },
        'treatment_dc_field_theta': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_dc_field_theta'
          }],
          'unit': 'Measurements',
          'position': 39,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_dc_field_theta'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_magn_volume': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_magn_volume'
          }],
          'unit': 'Measurements',
          'position': 52,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_magn_volume'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_sd': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_sd'
          }],
          'unit': 'Measurements',
          'position': 62,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_sd'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Uncertainty = 1xSD']
        },
        'measurement_chi_qdr_volume': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_chi_qdr_volume'
          }],
          'unit': 'Measurements',
          'position': 56,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_chi_qdr_volume'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'treatment_dc_field_phi': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_dc_field_phi'
          }],
          'unit': 'Measurements',
          'position': 38,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_dc_field_phi'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'treatment_temp_dc_on': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_temp_dc_on'
          }],
          'unit': 'Measurements',
          'position': 28,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_temp_dc_on'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'treatment_dc_field_decay_rate': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_dc_field_decay_rate'
          }],
          'unit': 'Measurements',
          'position': 35,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_dc_field_decay_rate'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_elevation': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_elevation'
          }],
          'unit': 'Measurements',
          'position': 22,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_elevation'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Meters above sealevel']
        },
        'measurement_pos_z': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_pos_z'
          }],
          'unit': 'Measurements',
          'position': 20,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_pos_z'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_magnitude': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_magnitude'
          }],
          'unit': 'Measurements',
          'position': 50,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_magnitude'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_charging_mode': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_charging_mode'
          }],
          'unit': 'Measurements',
          'position': 59,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_charging_mode'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Hysteresis', 'Steady', 'No Overshoot']
        },
        'measurement_inc': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_inc'
          }],
          'unit': 'Measurements',
          'position': 48,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_inc'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'measurement_r2': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_r2'
          }],
          'unit': 'Measurements',
          'position': 60,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_r2'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Number between 0 and 1']
        },
        'measurement_sd_z': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_sd_z'
          }],
          'unit': 'Measurements',
          'position': 65,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_sd_z'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Uncertainty = 1xSD']
        },
        'measurement_description': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_description'
          }],
          'unit': 'Measurements',
          'position': 66,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_description'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'er_synthetic_name': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'er_synthetic_name'
          }],
          'unit': 'Measurements',
          'position': 9,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'er_synthetic_name'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['STD1546-A1']
        },
        'measurement_flag': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_flag'
          }],
          'unit': 'Measurements',
          'position': 11,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_flag'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Default = g']
        },
        'measurement_magn_mass': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_magn_mass'
          }],
          'unit': 'Measurements',
          'position': 53,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_magn_mass'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'er_expedition_name': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'er_expedition_name'
          }],
          'unit': 'Measurements',
          'position': 0,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'er_expedition_name'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['AVON02MV']
        },
        'measurement_chi_volume': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_chi_volume'
          }],
          'unit': 'Measurements',
          'position': 54,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_chi_volume'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_core_depth': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_core_depth'
          }],
          'unit': 'Measurements',
          'position': 24,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_core_depth'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Meters below seafloor']
        },
        'treatment_dc_field_ac_on': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_dc_field_ac_on'
          }],
          'unit': 'Measurements',
          'position': 36,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_dc_field_ac_on'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_chi_qdr_mass': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_chi_qdr_mass'
          }],
          'unit': 'Measurements',
          'position': 57,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_chi_qdr_mass'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_csd': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_csd'
          }],
          'unit': 'Measurements',
          'position': 61,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_csd'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Uncertainty = 1xSD']
        },
        'measurement_lab_field_ac': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_lab_field_ac'
          }],
          'unit': 'Measurements',
          'position': 46,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_lab_field_ac'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_loop_x': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_loop_x'
          }],
          'unit': 'Measurements',
          'position': 16,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_loop_x'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_pos_x': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_pos_x'
          }],
          'unit': 'Measurements',
          'position': 18,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_pos_x'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_positions': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_positions'
          }],
          'unit': 'Measurements',
          'position': 21,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_positions'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'er_formation_name': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'er_formation_name'
          }],
          'unit': 'Measurements',
          'position': 2,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'er_formation_name'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Bluebird Formation']
        },
        'measurement_orient_phi': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_orient_phi'
          }],
          'unit': 'Measurements',
          'position': 44,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_orient_phi'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'er_analyst_mail_names': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'er_analyst_mail_names'
          }],
          'unit': 'Measurements',
          'position': 69,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'er_analyst_mail_names'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'treatment_temp': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_temp'
          }],
          'unit': 'Measurements',
          'position': 26,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_temp'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_lab_field_dc': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_lab_field_dc'
          }],
          'unit': 'Measurements',
          'position': 47,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_lab_field_dc'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'treatment_dc_field_ac_off': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_dc_field_ac_off'
          }],
          'unit': 'Measurements',
          'position': 37,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_dc_field_ac_off'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_temp': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_temp'
          }],
          'unit': 'Measurements',
          'position': 41,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_temp'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_chi_mass': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_chi_mass'
          }],
          'unit': 'Measurements',
          'position': 55,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_chi_mass'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'treatment_ac_field_dc_off': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_ac_field_dc_off'
          }],
          'unit': 'Measurements',
          'position': 33,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_ac_field_dc_off'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'er_site_name': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'er_site_name'
          }],
          'unit': 'Measurements',
          'position': 4,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'er_site_name'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Bas123a']
        },
        'er_citation_names': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'er_citation_names'
          }],
          'unit': 'Measurements',
          'position': 70,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'er_citation_names'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'measurement_freq': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_freq'
          }],
          'unit': 'Measurements',
          'position': 43,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_freq'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_sd_x': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_sd_x'
          }],
          'unit': 'Measurements',
          'position': 63,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_sd_x'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Uncertainty = 1xSD']
        },
        'er_sample_name': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'er_sample_name'
          }],
          'unit': 'Measurements',
          'position': 5,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'er_sample_name'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Bas123a-01']
        },
        'er_specimen_name': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'er_specimen_name'
          }],
          'unit': 'Measurements',
          'position': 6,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'er_specimen_name'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Bas123a-01x']
        },
        'measurement_date': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_date'
          }],
          'unit': 'Measurements',
          'position': 14,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_date'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Number in the \'yyyy:mm:dd:hh:mm:ss.ss\' format']
        },
        'measurement_loop_n': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_loop_n'
          }],
          'unit': 'Measurements',
          'position': 17,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_loop_n'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_dec': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_dec'
          }],
          'unit': 'Measurements',
          'position': 49,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_dec'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'measurement_orient_theta': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_orient_theta'
          }],
          'unit': 'Measurements',
          'position': 45,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_orient_theta'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_sd_y': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_sd_y'
          }],
          'unit': 'Measurements',
          'position': 64,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_sd_y'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Uncertainty = 1xSD']
        },
        'measurement_demagn_code': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_demagn_code'
          }],
          'unit': 'Measurements',
          'position': 40,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_demagn_code'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_sweep_rate': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_sweep_rate'
          }],
          'unit': 'Measurements',
          'position': 58,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_sweep_rate'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_time_zone': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_time_zone'
          }],
          'unit': 'Measurements',
          'position': 15,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_time_zone'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['UTC', 'PDT', 'GMT']
        },
        'magic_instrument_codes': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'magic_instrument_codes'
          }],
          'unit': 'Measurements',
          'position': 68,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'magic_instrument_codes'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['SIO-Bubba', 'IRM-OldBlue']
        },
        'measurement_pos_y': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_pos_y'
          }],
          'unit': 'Measurements',
          'position': 19,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_pos_y'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'er_mineral_name': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'er_mineral_name'
          }],
          'unit': 'Measurements',
          'position': 8,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'er_mineral_name'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['San03-001']
        },
        'measurement_composite_depth': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_composite_depth'
          }],
          'unit': 'Measurements',
          'position': 25,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_composite_depth'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Meters below seafloor']
        },
        'treatment_ac_field': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_ac_field'
          }],
          'unit': 'Measurements',
          'position': 30,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_ac_field'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'er_fossil_name': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'er_fossil_name'
          }],
          'unit': 'Measurements',
          'position': 7,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'er_fossil_name'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['AMM43-03']
        },
        'treatment_temp_dc_off': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_temp_dc_off'
          }],
          'unit': 'Measurements',
          'position': 29,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_temp_dc_off'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'er_location_name': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'er_location_name'
          }],
          'unit': 'Measurements',
          'position': 1,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'er_location_name'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801']
        },
        'treatment_temp_decay_rate': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_temp_decay_rate'
          }],
          'unit': 'Measurements',
          'position': 27,
          'previous_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_temp_decay_rate'
          }],
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        }
      },
      'label': 'Measurements',
      'description': 'Analytical data or measurements'
    },
    'rmag_criteria': {
      'position': 31,
      'columns': {
        'rmag_criteria_code': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'rmag_criteria',
            'column': 'rmag_criteria_code'
          }],
          'unit': 'Selection Criteria',
          'position': 0,
          'previous_columns': [{
            'table': 'rmag_criteria',
            'column': 'rmag_criteria_code'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['MY-ANIS567', 'MY-LOOPS-12']
        },
        'er_citation_names': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'rmag_criteria',
            'column': 'er_citation_names'
          }],
          'unit': 'Selection Criteria',
          'position': 3,
          'previous_columns': [{
            'table': 'rmag_criteria',
            'column': 'er_citation_names'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'criteria_description': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'rmag_criteria',
            'column': 'criteria_description'
          }],
          'unit': 'Selection Criteria',
          'position': 2,
          'previous_columns': [{
            'table': 'rmag_criteria',
            'column': 'criteria_description'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'criteria_definition': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'rmag_criteria',
            'column': 'criteria_definition'
          }],
          'unit': 'Selection Criteria',
          'position': 1,
          'previous_columns': [{
            'table': 'rmag_criteria',
            'column': 'criteria_definition'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        }
      },
      'label': 'Selection Criteria',
      'description': 'Selection criteria used in data selection'
    },
    'magic_methods': {
      'position': 17,
      'columns': {
        'method_type': {
          'group': 'Methods',
          'next_columns': [{
            'table': 'magic_methods',
            'column': 'method_type'
          }],
          'unit': 'Methods',
          'position': 1,
          'previous_columns': [{
            'table': 'magic_methods',
            'column': 'method_type'
          }],
          'label': 'Methods',
          'type': 'Methods',
          'description': 'Methods',
          'examples': ['Lab Protocol']
        },
        'magic_method_code': {
          'group': 'Methods',
          'next_columns': [{
            'table': 'magic_methods',
            'column': 'magic_method_code'
          }],
          'unit': 'Methods',
          'position': 0,
          'previous_columns': [{
            'table': 'magic_methods',
            'column': 'magic_method_code'
          }],
          'label': 'Methods',
          'type': 'Methods',
          'description': 'Methods',
          'examples': ['AC-AARM']
        },
        'method_iaga7': {
          'group': 'Methods',
          'next_columns': [{
            'table': 'magic_methods',
            'column': 'method_iaga7'
          }],
          'unit': 'Methods',
          'position': 4,
          'previous_columns': [{
            'table': 'magic_methods',
            'column': 'method_iaga7'
          }],
          'label': 'Methods',
          'type': 'Methods',
          'description': 'Methods',
          'examples': ['C', 'G', 'F', 'F*']
        },
        'method_url': {
          'group': 'Methods',
          'next_columns': [{
            'table': 'magic_methods',
            'column': 'method_url'
          }],
          'unit': 'Methods',
          'position': 5,
          'previous_columns': [{
            'table': 'magic_methods',
            'column': 'method_url'
          }],
          'label': 'Methods',
          'type': 'Methods',
          'description': 'Methods',
          'examples': ['http://earthref.org/MAGIC/books/Tauxe/2005/lecture.01.htm']
        },
        'method_definition': {
          'group': 'Methods',
          'next_columns': [{
            'table': 'magic_methods',
            'column': 'method_definition'
          }],
          'unit': 'Methods',
          'position': 2,
          'previous_columns': [{
            'table': 'magic_methods',
            'column': 'method_definition'
          }],
          'label': 'Methods',
          'type': 'Methods',
          'description': 'Methods',
          'examples': ['Paleo intensity experiment that uses a laboratory ARM to normalize NRM for paleofield estimation']
        },
        'er_citation_names': {
          'group': 'Methods',
          'next_columns': [{
            'table': 'magic_methods',
            'column': 'er_citation_names'
          }],
          'unit': 'Methods',
          'position': 7,
          'previous_columns': [{
            'table': 'magic_methods',
            'column': 'er_citation_names'
          }],
          'label': 'Methods',
          'type': 'Methods',
          'description': 'Methods',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'method_url_tauxe': {
          'group': 'Methods',
          'next_columns': [{
            'table': 'magic_methods',
            'column': 'method_url_tauxe'
          }],
          'unit': 'Methods',
          'position': 6,
          'previous_columns': [{
            'table': 'magic_methods',
            'column': 'method_url_tauxe'
          }],
          'label': 'Methods',
          'type': 'Methods',
          'description': 'Methods',
          'examples': ['http://earthref.org/MAGIC/books/Tauxe/2005/lecture.01.htm']
        },
        'method_description': {
          'group': 'Methods',
          'next_columns': [{
            'table': 'magic_methods',
            'column': 'method_description'
          }],
          'unit': 'Methods',
          'position': 3,
          'previous_columns': [{
            'table': 'magic_methods',
            'column': 'method_description'
          }],
          'label': 'Methods',
          'type': 'Methods',
          'description': 'Methods',
          'examples': ['Any paleo intensity experiment in which a laboratory ARM is used to normalize NRM for paleofield estimation as suggested by Levi and Banerjee (1976) or more detailed pseudo Thellier experiments by Tauxe et al. (1995).']
        }
      },
      'label': 'Methods',
      'description': 'Controlled vocabulary of sampling, laboratory and statistical techniques'
    },
    'magic_instruments': {
      'position': 18,
      'columns': {
        'instrument_software_version': {
          'group': 'Instruments',
          'next_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_software_version'
          }],
          'unit': 'Instruments',
          'position': 13,
          'previous_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_software_version'
          }],
          'label': 'Instruments',
          'type': 'Instruments',
          'description': 'Instruments',
          'examples': ['Version 1.53', 'Build 056']
        },
        'instrument_software': {
          'group': 'Instruments',
          'next_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_software'
          }],
          'unit': 'Instruments',
          'position': 12,
          'previous_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_software'
          }],
          'label': 'Instruments',
          'type': 'Instruments',
          'description': 'Instruments',
          'examples': ['Dtech D2000 AF Demagnetizer', 'Custom', 'Ranger MS1200']
        },
        'instrument_dimension': {
          'group': 'Instruments',
          'next_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_dimension'
          }],
          'unit': 'Instruments',
          'position': 7,
          'previous_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_dimension'
          }],
          'label': 'Instruments',
          'type': 'Instruments',
          'description': 'Instruments',
          'examples': ['47', '80']
        },
        'instrument_year': {
          'group': 'Instruments',
          'next_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_year'
          }],
          'unit': 'Instruments',
          'position': 1,
          'previous_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_year'
          }],
          'label': 'Instruments',
          'type': 'Instruments',
          'description': 'Instruments',
          'examples': ['Number in the \'yyyy\' format']
        },
        'instrument_url_tauxe': {
          'group': 'Instruments',
          'next_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_url_tauxe'
          }],
          'unit': 'Instruments',
          'position': 16,
          'previous_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_url_tauxe'
          }],
          'label': 'Instruments',
          'type': 'Instruments',
          'description': 'Instruments',
          'examples': ['http://lisa.tauxe.com/handbook/instrument.html']
        },
        'instrument_atmosphere': {
          'group': 'Instruments',
          'next_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_atmosphere'
          }],
          'unit': 'Instruments',
          'position': 10,
          'previous_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_atmosphere'
          }],
          'label': 'Instruments',
          'type': 'Instruments',
          'description': 'Instruments',
          'examples': ['Air', 'Nitrogen', 'Helium', 'Argon', 'Vacuum']
        },
        'instrument_manufacturer': {
          'group': 'Instruments',
          'next_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_manufacturer'
          }],
          'unit': 'Instruments',
          'position': 4,
          'previous_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_manufacturer'
          }],
          'label': 'Instruments',
          'type': 'Instruments',
          'description': 'Instruments',
          'examples': ['Bartington', 'Custom', 'Princeton Measurements Co.']
        },
        'instrument_operation_mode': {
          'group': 'Instruments',
          'next_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_operation_mode'
          }],
          'unit': 'Instruments',
          'position': 6,
          'previous_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_operation_mode'
          }],
          'label': 'Instruments',
          'type': 'Instruments',
          'description': 'Instruments',
          'examples': ['Rotating Field', 'Flowing He Gas']
        },
        'instrument_model': {
          'group': 'Instruments',
          'next_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_model'
          }],
          'unit': 'Instruments',
          'position': 5,
          'previous_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_model'
          }],
          'label': 'Instruments',
          'type': 'Instruments',
          'description': 'Instruments',
          'examples': ['D2000', 'MS1200']
        },
        'magic_instrument_code': {
          'group': 'Instruments',
          'next_columns': [{
            'table': 'magic_instruments',
            'column': 'magic_instrument_code'
          }],
          'unit': 'Instruments',
          'position': 0,
          'previous_columns': [{
            'table': 'magic_instruments',
            'column': 'magic_instrument_code'
          }],
          'label': 'Instruments',
          'type': 'Instruments',
          'description': 'Instruments',
          'examples': ['SIO-Bubba', 'IRM-OldBlue']
        },
        'instrument_url': {
          'group': 'Instruments',
          'next_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_url'
          }],
          'unit': 'Instruments',
          'position': 15,
          'previous_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_url'
          }],
          'label': 'Instruments',
          'type': 'Instruments',
          'description': 'Instruments',
          'examples': ['http://jcruiser.fu.edu/instrument.html']
        },
        'er_citation_names': {
          'group': 'Instruments',
          'next_columns': [{
            'table': 'magic_instruments',
            'column': 'er_citation_names'
          }],
          'unit': 'Instruments',
          'position': 17,
          'previous_columns': [{
            'table': 'magic_instruments',
            'column': 'er_citation_names'
          }],
          'label': 'Instruments',
          'type': 'Instruments',
          'description': 'Instruments',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'instrument_temp_control': {
          'group': 'Instruments',
          'next_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_temp_control'
          }],
          'unit': 'Instruments',
          'position': 9,
          'previous_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_temp_control'
          }],
          'label': 'Instruments',
          'type': 'Instruments',
          'description': 'Instruments',
          'examples': ['Flowing Gas Heater', 'Cryostat', 'Exchange Gas', 'Oven']
        },
        'instrument_field_control': {
          'group': 'Instruments',
          'next_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_field_control'
          }],
          'unit': 'Instruments',
          'position': 8,
          'previous_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_field_control'
          }],
          'label': 'Instruments',
          'type': 'Instruments',
          'description': 'Instruments',
          'examples': ['Coil Constant', 'Hall Probe', 'Shielding']
        },
        'instrument_shielding': {
          'group': 'Instruments',
          'next_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_shielding'
          }],
          'unit': 'Instruments',
          'position': 11,
          'previous_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_shielding'
          }],
          'label': 'Instruments',
          'type': 'Instruments',
          'description': 'Instruments',
          'examples': ['Shielded Room', 'Instrument Shielding Only', 'Helmholtz Coils']
        },
        'instrument_category': {
          'group': 'Instruments',
          'next_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_category'
          }],
          'unit': 'Instruments',
          'position': 2,
          'previous_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_category'
          }],
          'label': 'Instruments',
          'type': 'Instruments',
          'description': 'Instruments',
          'examples': ['Magnetometer', 'Susceptometer', 'Domain Imager']
        },
        'instrument_description': {
          'group': 'Instruments',
          'next_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_description'
          }],
          'unit': 'Instruments',
          'position': 14,
          'previous_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_description'
          }],
          'label': 'Instruments',
          'type': 'Instruments',
          'description': 'Instruments'
        },
        'instrument_type': {
          'group': 'Instruments',
          'next_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_type'
          }],
          'unit': 'Instruments',
          'position': 3,
          'previous_columns': [{
            'table': 'magic_instruments',
            'column': 'instrument_type'
          }],
          'label': 'Instruments',
          'type': 'Instruments',
          'description': 'Instruments',
          'examples': ['AC bridge', 'RF-SQUID', 'MÂ¿ssbauer']
        }
      },
      'label': 'Instruments',
      'description': 'Instrument info based on institute, year of build and instrument name'
    },
    'rmag_hysteresis': {
      'position': 28,
      'columns': {
        'er_member_name': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_member_name'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 3,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_member_name'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['Glasshound Member']
        },
        'magic_method_codes': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'magic_method_codes'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 33,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'magic_method_codes'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'compilation_ids': {
          'group': 'Hysteresis Experiments',
          'next_columns': [],
          'unit': 'Hysteresis Experiments',
          'position': 31,
          'previous_columns': [],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['1435', '23', '2329']
        },
        'hysteresis_ms_moment': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_ms_moment'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 21,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_ms_moment'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'rmag_criteria_codes': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'rmag_criteria_codes'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 32,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'rmag_criteria_codes'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['MY-MAD', 'MY-APLHA95']
        },
        'hysteresis_mr_moment': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_mr_moment'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 18,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_mr_moment'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'hysteresis_ms_volume': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_ms_volume'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 22,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_ms_volume'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'hysteresis_ms_mass': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_ms_mass'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 23,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_ms_mass'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'hysteresis_bc_offset': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_bc_offset'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 26,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_bc_offset'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'hysteresis_mr_mass': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_mr_mass'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 20,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_mr_mass'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'hysteresis_th': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_th'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 28,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_th'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'hysteresis_mr_volume': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_mr_volume'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 19,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_mr_volume'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'er_synthetic_name': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_synthetic_name'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 9,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_synthetic_name'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['STD1546-A1']
        },
        'er_expedition_name': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_expedition_name'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 0,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_expedition_name'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['AVON02MV']
        },
        'hysteresis_bcr': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_bcr'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 24,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_bcr'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'hysteresis_ss': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_ss'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 16,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_ss'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['Number between 0 and 1']
        },
        'hysteresis_xhf': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_xhf'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 27,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_xhf'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'measurement_loop_x': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'measurement_loop_x'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 11,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'measurement_loop_x'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'er_formation_name': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_formation_name'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 2,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_formation_name'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['Bluebird Formation']
        },
        'measurement_orient_phi': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'measurement_orient_phi'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 14,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'measurement_orient_phi'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'er_analyst_mail_names': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_analyst_mail_names'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 35,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_analyst_mail_names'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'measurement_temp': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'measurement_temp'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 13,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'measurement_temp'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'magic_experiment_names': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'magic_experiment_names'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 10,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'magic_experiment_names'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['KOPA-299-1', 'KOPA-299-2', 'KOPA-299-6']
        },
        'hysteresis_sq': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_sq'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 17,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_sq'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['Number between 0 and 1']
        },
        'er_site_name': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_site_name'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 4,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_site_name'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['Bas123a']
        },
        'compilation_names': {
          'group': 'Hysteresis Experiments',
          'next_columns': [],
          'unit': 'Hysteresis Experiments',
          'position': 30,
          'previous_columns': [],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['GEOMAGIA', 'CALS7', 'ARCHEO00']
        },
        'er_citation_names': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_citation_names'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 36,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_citation_names'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'er_sample_name': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_sample_name'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 5,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_sample_name'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['Bas123a-01']
        },
        'measurement_loop_n': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'measurement_loop_n'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 12,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'measurement_loop_n'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'er_specimen_name': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_specimen_name'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 6,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_specimen_name'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['Bas123a-01x']
        },
        'hysteresis_bc': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_bc'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 25,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_bc'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'measurement_orient_theta': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'measurement_orient_theta'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 15,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'measurement_orient_theta'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'hysteresis_description': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_description'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 29,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_description'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'magic_instrument_codes': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'magic_instrument_codes'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 34,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'magic_instrument_codes'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['SIO-Bubba', 'IRM-OldBlue']
        },
        'er_mineral_name': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_mineral_name'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 8,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_mineral_name'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['San03-001']
        },
        'er_fossil_name': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_fossil_name'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 7,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_fossil_name'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['AMM43-03']
        },
        'er_location_name': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_location_name'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 1,
          'previous_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_location_name'
          }],
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801']
        }
      },
      'label': 'Hysteresis Experiments',
      'description': 'Experiment for hysteresis loops and FORCs'
    },
    'er_samples': {
      'position': 7,
      'columns': {
        'er_member_name': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'er_member_name'
          }],
          'unit': 'Samples',
          'position': 5,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'er_member_name'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Glasshound Member']
        },
        'sample_declination_correction': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_declination_correction'
          }],
          'unit': 'Samples',
          'position': 23,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_declination_correction'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Decimal degrees']
        },
        'magic_method_codes': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'magic_method_codes'
          }],
          'unit': 'Samples',
          'position': 31,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'magic_method_codes'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'sample_location_precision': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_location_precision'
          }],
          'unit': 'Samples',
          'position': 15,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_location_precision'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Decimal degrees']
        },
        'sample_elevation': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_elevation'
          }],
          'unit': 'Samples',
          'position': 17,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_elevation'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Meters above sealevel']
        },
        'sample_location_geoid': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_location_geoid'
          }],
          'unit': 'Samples',
          'position': 16,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_location_geoid'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['WGS84', 'GEOID03', 'USGG2003', 'GEOID99', 'G99SSS', 'G99BM', 'DEFLEC99 ']
        },
        'sample_core_depth': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_core_depth'
          }],
          'unit': 'Samples',
          'position': 19,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_core_depth'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Meters below seafloor']
        },
        'er_scientist_mail_names': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'er_scientist_mail_names'
          }],
          'unit': 'Samples',
          'position': 32,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'er_scientist_mail_names'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'sample_alteration_type': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_alteration_type'
          }],
          'unit': 'Samples',
          'position': 12,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_alteration_type'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Hydrothermal', 'Diagenetic', 'Weathering', 'Oxidation', 'Metamorphic']
        },
        'sample_azimuth': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_azimuth'
          }],
          'unit': 'Samples',
          'position': 24,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_azimuth'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'sample_bed_dip': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_bed_dip'
          }],
          'unit': 'Samples',
          'position': 27,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_bed_dip'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'sample_type': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_type'
          }],
          'unit': 'Samples',
          'position': 9,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_type'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Flow Top', 'Glassy Margin', 'Pot Rim', 'Pillow', 'Kiln', 'Dike']
        },
        'sample_description': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_description'
          }],
          'unit': 'Samples',
          'position': 30,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_description'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples'
        },
        'sample_alteration': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_alteration'
          }],
          'unit': 'Samples',
          'position': 11,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_alteration'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Severe', 'High', 'Mild', 'Trace', 'Unaltered']
        },
        'sample_date': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_date'
          }],
          'unit': 'Samples',
          'position': 21,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_date'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Number in the \'yyyy:mm:dd:hh:mm:ss.ss\' format']
        },
        'sample_texture': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_texture'
          }],
          'unit': 'Samples',
          'position': 10,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_texture'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Holocrystalline', 'Hawaiitic', 'Homogeneous']
        },
        'er_expedition_name': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'er_expedition_name'
          }],
          'unit': 'Samples',
          'position': 2,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'er_expedition_name'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['AVON02MV']
        },
        'sample_cooling_rate': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_cooling_rate'
          }],
          'unit': 'Samples',
          'position': 28,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_cooling_rate'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples'
        },
        'er_sample_alternatives': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'er_sample_alternatives'
          }],
          'unit': 'Samples',
          'position': 1,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'er_sample_alternatives'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples'
        },
        'sample_lon': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_lon'
          }],
          'unit': 'Samples',
          'position': 14,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_lon'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'sample_lithology': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_lithology'
          }],
          'unit': 'Samples',
          'position': 8,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_lithology'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Basalt', 'Granite', 'Mudstone', 'Tuff', 'Granodiorite', 'Marl']
        },
        'er_formation_name': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'er_formation_name'
          }],
          'unit': 'Samples',
          'position': 4,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'er_formation_name'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Bluebird Formation']
        },
        'sample_time_zone': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_time_zone'
          }],
          'unit': 'Samples',
          'position': 22,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_time_zone'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['UTC', 'PDT', 'GMT']
        },
        'sample_composite_depth': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_composite_depth'
          }],
          'unit': 'Samples',
          'position': 20,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_composite_depth'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Meters below seafloor']
        },
        'sample_igsn': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_igsn'
          }],
          'unit': 'Samples',
          'position': 29,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_igsn'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['SIO0A0987', 'SIO001317']
        },
        'er_site_name': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'er_site_name'
          }],
          'unit': 'Samples',
          'position': 6,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'er_site_name'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Bas123a']
        },
        'er_citation_names': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'er_citation_names'
          }],
          'unit': 'Samples',
          'position': 33,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'er_citation_names'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'er_sample_name': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'er_sample_name'
          }],
          'unit': 'Samples',
          'position': 0,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'er_sample_name'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Bas123a-01']
        },
        'sample_bed_dip_direction': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_bed_dip_direction'
          }],
          'unit': 'Samples',
          'position': 26,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_bed_dip_direction'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'sample_dip': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_dip'
          }],
          'unit': 'Samples',
          'position': 25,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_dip'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'sample_height': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_height'
          }],
          'unit': 'Samples',
          'position': 18,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_height'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Positive is up in section or core', 'while negative is down relative to reference height']
        },
        'sample_lat': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_lat'
          }],
          'unit': 'Samples',
          'position': 13,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_lat'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'sample_class': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_class'
          }],
          'unit': 'Samples',
          'position': 7,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'sample_class'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Igneous', 'Sedimentary', 'Metamorphic', 'Archeological', 'Intrusive', 'Extrusive', 'Submarine', 'Subaerial']
        },
        'er_location_name': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'er_location_name'
          }],
          'unit': 'Samples',
          'position': 3,
          'previous_columns': [{
            'table': 'er_samples',
            'column': 'er_location_name'
          }],
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801']
        }
      },
      'label': 'Samples',
      'description': 'Sample from site'
    },
    'er_locations': {
      'position': 3,
      'columns': {
        'terrane': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'terrane'
          }],
          'unit': 'Locations',
          'position': 17,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'terrane'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Colorado Plateau', 'Baltica', 'Grenville Province']
        },
        'location_description': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'location_description'
          }],
          'unit': 'Locations',
          'position': 22,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'location_description'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations'
        },
        'er_scientist_mail_names': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'er_scientist_mail_names'
          }],
          'unit': 'Locations',
          'position': 24,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'er_scientist_mail_names'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'location_lithology': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'location_lithology'
          }],
          'unit': 'Locations',
          'position': 21,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'location_lithology'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Basalt', 'Granite', 'Mudstone', 'Tuff', 'Granodiorite', 'Marl']
        },
        'er_location_alternatives': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'er_location_alternatives'
          }],
          'unit': 'Locations',
          'position': 1,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'er_location_alternatives'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations'
        },
        'region': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'region'
          }],
          'unit': 'Locations',
          'position': 14,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'region'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Baja California', 'Gulf of Mexico']
        },
        'location_class': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'location_class'
          }],
          'unit': 'Locations',
          'position': 20,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'location_class'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Igneous', 'Sedimentary', 'Metamorphic', 'Archeological', 'Intrusive', 'Extrusive', 'Submarine', 'Subaerial']
        },
        'location_geoid': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'location_geoid'
          }],
          'unit': 'Locations',
          'position': 10,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'location_geoid'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['WGS84', 'GEOID03', 'USGG2003', 'GEOID99', 'G99SSS', 'G99BM', 'DEFLEC99 ']
        },
        'location_end_lat': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'location_end_lat'
          }],
          'unit': 'Locations',
          'position': 6,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'location_end_lat'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'location_begin_lon': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'location_begin_lon'
          }],
          'unit': 'Locations',
          'position': 4,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'location_begin_lon'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'location_end_elevation': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'location_end_elevation'
          }],
          'unit': 'Locations',
          'position': 8,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'location_end_elevation'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Meters above sealevel']
        },
        'country': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'country'
          }],
          'unit': 'Locations',
          'position': 13,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'country'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Mexico', 'Costa Rica', 'the Netherlands']
        },
        'geological_province_section': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'geological_province_section'
          }],
          'unit': 'Locations',
          'position': 18,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'geological_province_section'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Ljusdal Batholith', 'Storsjon-Edsbyn Sills', 'West Uusima Complex', 'Sierra Nevada']
        },
        'continent_ocean': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'continent_ocean'
          }],
          'unit': 'Locations',
          'position': 11,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'continent_ocean'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['North America', 'Australia', 'Europe', 'Asia', 'Artic Ocean', 'Indian Ocean']
        },
        'location_type': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'location_type'
          }],
          'unit': 'Locations',
          'position': 2,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'location_type'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Drill Site', 'Core', 'Land Section', 'Submarine Section', 'Stratigraphic Section', 'Archeological Site', 'Outcrop', 'Region']
        },
        'location_end_lon': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'location_end_lon'
          }],
          'unit': 'Locations',
          'position': 7,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'location_end_lon'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'location_begin_lat': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'location_begin_lat'
          }],
          'unit': 'Locations',
          'position': 3,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'location_begin_lat'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'village_city': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'village_city'
          }],
          'unit': 'Locations',
          'position': 15,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'village_city'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['San Francisco', 'Aalsmeer', 'San Cristobal', 'Jumilla']
        },
        'er_citation_names': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'er_citation_names'
          }],
          'unit': 'Locations',
          'position': 25,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'er_citation_names'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'location_precision': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'location_precision'
          }],
          'unit': 'Locations',
          'position': 9,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'location_precision'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Decimal degrees']
        },
        'plate_block': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'plate_block'
          }],
          'unit': 'Locations',
          'position': 16,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'plate_block'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['North American Plate', 'Xifon Block', 'Cocos Plate']
        },
        'tectonic_setting': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'tectonic_setting'
          }],
          'unit': 'Locations',
          'position': 19,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'tectonic_setting'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Intra-Plate Volcanism', 'Subduction Zone', 'Mid-Oceanic Ridge']
        },
        'ocean_sea': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'ocean_sea'
          }],
          'unit': 'Locations',
          'position': 12,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'ocean_sea'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Pacific Ocean', 'North Sea', 'Gulf of Mexico']
        },
        'location_url': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'location_url'
          }],
          'unit': 'Locations',
          'position': 23,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'location_url'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['http://earthref.org']
        },
        'location_begin_elevation': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'location_begin_elevation'
          }],
          'unit': 'Locations',
          'position': 5,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'location_begin_elevation'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Meters above sealevel']
        },
        'er_location_name': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'er_location_name'
          }],
          'unit': 'Locations',
          'position': 0,
          'previous_columns': [{
            'table': 'er_locations',
            'column': 'er_location_name'
          }],
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801']
        }
      },
      'label': 'Locations',
      'description': 'Location definition'
    },
    'pmag_samples': {
      'position': 21,
      'columns': {
        'er_member_name': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'er_member_name'
          }],
          'unit': 'Sample Data',
          'position': 3,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'er_member_name'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Glasshound Member']
        },
        'magic_method_codes': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'magic_method_codes'
          }],
          'unit': 'Sample Data',
          'position': 50,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'magic_method_codes'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'sample_inc': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_inc'
          }],
          'unit': 'Sample Data',
          'position': 25,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_inc'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'sample_magn_volume': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_magn_volume'
          }],
          'unit': 'Sample Data',
          'position': 43,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_magn_volume'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'er_fossil_names': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'er_fossil_names'
          }],
          'unit': 'Sample Data',
          'position': 7,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'er_fossil_names'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['AMM43-03', 'AMM43-19']
        },
        'sample_sigma': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_sigma'
          }],
          'unit': 'Sample Data',
          'position': 27,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_sigma'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'compilation_ids': {
          'group': 'Sample Data',
          'next_columns': [],
          'unit': 'Sample Data',
          'position': 47,
          'previous_columns': [],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['1435', '23', '2329']
        },
        'sample_comp_name': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_comp_name'
          }],
          'unit': 'Sample Data',
          'position': 19,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_comp_name'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Characteristic', 'VRM', 'Overprint', 'A', 'B', 'C']
        },
        'er_specimen_names': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'er_specimen_names'
          }],
          'unit': 'Sample Data',
          'position': 6,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'er_specimen_names'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Bas123a-01x', 'Bas123a-01y']
        },
        'sample_inferred_age': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_inferred_age'
          }],
          'unit': 'Sample Data',
          'position': 20,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_inferred_age'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'sample_int_sigma': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_int_sigma'
          }],
          'unit': 'Sample Data',
          'position': 36,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_int_sigma'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'sample_magn_mass': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_magn_mass'
          }],
          'unit': 'Sample Data',
          'position': 44,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_magn_mass'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'er_mineral_names': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'er_mineral_names'
          }],
          'unit': 'Sample Data',
          'position': 8,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'er_mineral_names'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['PLG33a', 'MAGN-MJ-034']
        },
        'sample_polarity': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_polarity'
          }],
          'unit': 'Sample Data',
          'position': 14,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_polarity'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Default = n']
        },
        'sample_comp_nmb': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_comp_nmb'
          }],
          'unit': 'Sample Data',
          'position': 17,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_comp_nmb'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'sample_int_rel_sigma': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_int_rel_sigma'
          }],
          'unit': 'Sample Data',
          'position': 39,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_int_rel_sigma'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'sample_description': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_description'
          }],
          'unit': 'Sample Data',
          'position': 45,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_description'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'sample_dec': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_dec'
          }],
          'unit': 'Sample Data',
          'position': 26,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_dec'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'sample_int_sigma_perc': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_int_sigma_perc'
          }],
          'unit': 'Sample Data',
          'position': 37,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_int_sigma_perc'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'sample_inferred_age_sigma': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_inferred_age_sigma'
          }],
          'unit': 'Sample Data',
          'position': 21,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_inferred_age_sigma'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'sample_k': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_k'
          }],
          'unit': 'Sample Data',
          'position': 32,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_k'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'sample_int_rel_sigma_perc': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_int_rel_sigma_perc'
          }],
          'unit': 'Sample Data',
          'position': 40,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_int_rel_sigma_perc'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'sample_inferred_age_low': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_inferred_age_low'
          }],
          'unit': 'Sample Data',
          'position': 22,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_inferred_age_low'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'er_expedition_name': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'er_expedition_name'
          }],
          'unit': 'Sample Data',
          'position': 0,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'er_expedition_name'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['AVON02MV']
        },
        'sample_nrm': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_nrm'
          }],
          'unit': 'Sample Data',
          'position': 15,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_nrm'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Default = p']
        },
        'sample_n': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_n'
          }],
          'unit': 'Sample Data',
          'position': 29,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_n'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'sample_tilt_correction': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_tilt_correction'
          }],
          'unit': 'Sample Data',
          'position': 34,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_tilt_correction'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Correction between geographic (0%) and stratigraphic (100%); unoriented (-1%); partially oriented to horizontal only (-2%)']
        },
        'measurement_step_unit': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'measurement_step_unit'
          }],
          'unit': 'Sample Data',
          'position': 13,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'measurement_step_unit'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'sample_alpha95': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_alpha95'
          }],
          'unit': 'Sample Data',
          'position': 28,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_alpha95'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Confidence Level = 95%']
        },
        'sample_int_n': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_int_n'
          }],
          'unit': 'Sample Data',
          'position': 41,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_int_n'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'sample_inferred_age_high': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_inferred_age_high'
          }],
          'unit': 'Sample Data',
          'position': 23,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_inferred_age_high'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'er_formation_name': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'er_formation_name'
          }],
          'unit': 'Sample Data',
          'position': 2,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'er_formation_name'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Bluebird Formation']
        },
        'er_analyst_mail_names': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'er_analyst_mail_names'
          }],
          'unit': 'Sample Data',
          'position': 52,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'er_analyst_mail_names'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'sample_direction_type': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_direction_type'
          }],
          'unit': 'Sample Data',
          'position': 16,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_direction_type'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Default = l']
        },
        'er_synthetic_names': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'er_synthetic_names'
          }],
          'unit': 'Sample Data',
          'position': 9,
          'previous_columns': [],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['STD1546-A1', 'STD1546-X23']
        },
        'sample_int': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_int'
          }],
          'unit': 'Sample Data',
          'position': 35,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_int'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'magic_experiment_names': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'magic_experiment_names'
          }],
          'unit': 'Sample Data',
          'position': 10,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'magic_experiment_names'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['KOPA-299-1', 'KOPA-299-2', 'KOPA-299-6']
        },
        'sample_n_planes': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_n_planes'
          }],
          'unit': 'Sample Data',
          'position': 31,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_n_planes'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'measurement_step_min': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'measurement_step_min'
          }],
          'unit': 'Sample Data',
          'position': 11,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'measurement_step_min'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'sample_comp_n': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_comp_n'
          }],
          'unit': 'Sample Data',
          'position': 18,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_comp_n'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'er_site_name': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'er_site_name'
          }],
          'unit': 'Sample Data',
          'position': 4,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'er_site_name'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Bas123a']
        },
        'compilation_names': {
          'group': 'Sample Data',
          'next_columns': [],
          'unit': 'Sample Data',
          'position': 46,
          'previous_columns': [],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['GEOMAGIA', 'CALS7', 'ARCHEO00']
        },
        'er_citation_names': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'er_citation_names'
          }],
          'unit': 'Sample Data',
          'position': 53,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'er_citation_names'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'er_sample_name': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'er_sample_name'
          }],
          'unit': 'Sample Data',
          'position': 5,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'er_sample_name'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Bas123a-01']
        },
        'pmag_rotation_codes': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'pmag_rotation_codes'
          }],
          'unit': 'Sample Data',
          'position': 49,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'pmag_rotation_codes'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['MY-TILT1', 'MY-TILT2', 'MY-TRANS1']
        },
        'sample_n_lines': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_n_lines'
          }],
          'unit': 'Sample Data',
          'position': 30,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_n_lines'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'sample_magn_moment': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_magn_moment'
          }],
          'unit': 'Sample Data',
          'position': 42,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_magn_moment'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'measurement_step_max': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'measurement_step_max'
          }],
          'unit': 'Sample Data',
          'position': 12,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'measurement_step_max'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'sample_inferred_age_unit': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_inferred_age_unit'
          }],
          'unit': 'Sample Data',
          'position': 24,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_inferred_age_unit'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Ma', 'Ka', 'Ga', 'Years BP', 'Years AD (+/-)', 'Years Cal BP', 'Years Cal AD (+/-)']
        },
        'sample_int_rel': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_int_rel'
          }],
          'unit': 'Sample Data',
          'position': 38,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_int_rel'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'magic_instrument_codes': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'magic_instrument_codes'
          }],
          'unit': 'Sample Data',
          'position': 51,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'magic_instrument_codes'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['SIO-Bubba', 'IRM-OldBlue']
        },
        'pmag_criteria_codes': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'pmag_criteria_codes'
          }],
          'unit': 'Sample Data',
          'position': 48,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'pmag_criteria_codes'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['MY-MAD', 'MY-APLHA95']
        },
        'er_location_name': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'er_location_name'
          }],
          'unit': 'Sample Data',
          'position': 1,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'er_location_name'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801']
        },
        'sample_r': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_r'
          }],
          'unit': 'Sample Data',
          'position': 33,
          'previous_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_r'
          }],
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        }
      },
      'label': 'Sample Data',
      'description': 'Sample from site'
    },
    'er_mailinglist': {
      'position': 14,
      'columns': {
        'department': {
          'group': 'Mailing List Contributors',
          'next_columns': [{
            'table': 'er_mailinglist',
            'column': 'department'
          }],
          'unit': 'Mailing List Contributors',
          'position': 2,
          'previous_columns': [{
            'table': 'er_mailinglist',
            'column': 'department'
          }],
          'label': 'Mailing List Contributors',
          'type': 'Mailing List Contributors',
          'description': 'Mailing List Contributors',
          'examples': ['Laboratory of Isotope Geology']
        },
        'email': {
          'group': 'Mailing List Contributors',
          'next_columns': [{
            'table': 'er_mailinglist',
            'column': 'email'
          }],
          'unit': 'Mailing List Contributors',
          'position': 10,
          'previous_columns': [{
            'table': 'er_mailinglist',
            'column': 'email'
          }],
          'label': 'Mailing List Contributors',
          'type': 'Mailing List Contributors',
          'description': 'Mailing List Contributors',
          'examples': ['jcruiser@fu.edu']
        },
        'url': {
          'group': 'Mailing List Contributors',
          'next_columns': [{
            'table': 'er_mailinglist',
            'column': 'url'
          }],
          'unit': 'Mailing List Contributors',
          'position': 11,
          'previous_columns': [{
            'table': 'er_mailinglist',
            'column': 'url'
          }],
          'label': 'Mailing List Contributors',
          'type': 'Mailing List Contributors',
          'description': 'Mailing List Contributors',
          'examples': ['http://jcruiser.fu.edu/home.html']
        },
        'er_mail_name': {
          'group': 'Mailing List Contributors',
          'next_columns': [{
            'table': 'er_mailinglist',
            'column': 'er_mail_name'
          }],
          'unit': 'Mailing List Contributors',
          'position': 0,
          'previous_columns': [{
            'table': 'er_mailinglist',
            'column': 'er_mail_name'
          }],
          'label': 'Mailing List Contributors',
          'type': 'Mailing List Contributors',
          'description': 'Mailing List Contributors',
          'examples': ['John A.B. Cruiser']
        },
        'organization': {
          'group': 'Mailing List Contributors',
          'next_columns': [{
            'table': 'er_mailinglist',
            'column': 'organization'
          }],
          'unit': 'Mailing List Contributors',
          'position': 1,
          'previous_columns': [{
            'table': 'er_mailinglist',
            'column': 'organization'
          }],
          'label': 'Mailing List Contributors',
          'type': 'Mailing List Contributors',
          'description': 'Mailing List Contributors',
          'examples': ['Free University Amsterdam']
        },
        'country': {
          'group': 'Mailing List Contributors',
          'next_columns': [{
            'table': 'er_mailinglist',
            'column': 'country'
          }],
          'unit': 'Mailing List Contributors',
          'position': 7,
          'previous_columns': [{
            'table': 'er_mailinglist',
            'column': 'country'
          }],
          'label': 'Mailing List Contributors',
          'type': 'Mailing List Contributors',
          'description': 'Mailing List Contributors',
          'examples': ['USA']
        },
        'zip_code': {
          'group': 'Mailing List Contributors',
          'next_columns': [{
            'table': 'er_mailinglist',
            'column': 'zip_code'
          }],
          'unit': 'Mailing List Contributors',
          'position': 6,
          'previous_columns': [{
            'table': 'er_mailinglist',
            'column': 'zip_code'
          }],
          'label': 'Mailing List Contributors',
          'type': 'Mailing List Contributors',
          'description': 'Mailing List Contributors',
          'examples': ['CA 92093']
        },
        'state': {
          'group': 'Mailing List Contributors',
          'next_columns': [{
            'table': 'er_mailinglist',
            'column': 'state'
          }],
          'unit': 'Mailing List Contributors',
          'position': 5,
          'previous_columns': [{
            'table': 'er_mailinglist',
            'column': 'state'
          }],
          'label': 'Mailing List Contributors',
          'type': 'Mailing List Contributors',
          'description': 'Mailing List Contributors',
          'examples': ['California']
        },
        'address': {
          'group': 'Mailing List Contributors',
          'next_columns': [{
            'table': 'er_mailinglist',
            'column': 'address'
          }],
          'unit': 'Mailing List Contributors',
          'position': 3,
          'previous_columns': [{
            'table': 'er_mailinglist',
            'column': 'address'
          }],
          'label': 'Mailing List Contributors',
          'type': 'Mailing List Contributors',
          'description': 'Mailing List Contributors',
          'examples': ['Vessel Blvd. 2345']
        },
        'work_phone': {
          'group': 'Mailing List Contributors',
          'next_columns': [{
            'table': 'er_mailinglist',
            'column': 'work_phone'
          }],
          'unit': 'Mailing List Contributors',
          'position': 8,
          'previous_columns': [{
            'table': 'er_mailinglist',
            'column': 'work_phone'
          }],
          'label': 'Mailing List Contributors',
          'type': 'Mailing List Contributors',
          'description': 'Mailing List Contributors',
          'examples': ['620-345-4567']
        },
        'city': {
          'group': 'Mailing List Contributors',
          'next_columns': [{
            'table': 'er_mailinglist',
            'column': 'city'
          }],
          'unit': 'Mailing List Contributors',
          'position': 4,
          'previous_columns': [{
            'table': 'er_mailinglist',
            'column': 'city'
          }],
          'label': 'Mailing List Contributors',
          'type': 'Mailing List Contributors',
          'description': 'Mailing List Contributors',
          'examples': ['Amsterdam']
        },
        'work_fax': {
          'group': 'Mailing List Contributors',
          'next_columns': [{
            'table': 'er_mailinglist',
            'column': 'work_fax'
          }],
          'unit': 'Mailing List Contributors',
          'position': 9,
          'previous_columns': [{
            'table': 'er_mailinglist',
            'column': 'work_fax'
          }],
          'label': 'Mailing List Contributors',
          'type': 'Mailing List Contributors',
          'description': 'Mailing List Contributors',
          'examples': ['621-345-4567']
        }
      },
      'label': 'Mailing List Contributors',
      'description': 'List of addresses'
    },
    'er_synthetics': {
      'position': 11,
      'columns': {
        'er_member_name': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'er_member_name'
          }],
          'unit': 'Synthetic Materials',
          'position': 5,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'er_member_name'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['Glasshound Member']
        },
        'magic_method_codes': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'magic_method_codes'
          }],
          'unit': 'Synthetic Materials',
          'position': 23,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'magic_method_codes'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'synthetic_dope_material': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_dope_material'
          }],
          'unit': 'Synthetic Materials',
          'position': 20,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_dope_material'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['Ti', 'Al', 'Mn', 'Mg']
        },
        'synthetic_shape': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_shape'
          }],
          'unit': 'Synthetic Materials',
          'position': 15,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_shape'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['Euhedral', 'Orthorhombic']
        },
        'er_scientist_mail_names': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'er_scientist_mail_names'
          }],
          'unit': 'Synthetic Materials',
          'position': 24,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'er_scientist_mail_names'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'synthetic_institution': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_institution'
          }],
          'unit': 'Synthetic Materials',
          'position': 12,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_institution'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['IRM', 'SIO']
        },
        'synthetic_size': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_size'
          }],
          'unit': 'Synthetic Materials',
          'position': 16,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_size'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['250-500 Â¿m']
        },
        'er_synthetic_name': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'er_synthetic_name'
          }],
          'unit': 'Synthetic Materials',
          'position': 0,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'er_synthetic_name'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['STD1546-A1']
        },
        'er_expedition_name': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'er_expedition_name'
          }],
          'unit': 'Synthetic Materials',
          'position': 2,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'er_expedition_name'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['AVON02MV']
        },
        'synthetic_igsn': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_igsn'
          }],
          'unit': 'Synthetic Materials',
          'position': 21,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_igsn'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['SIO0A0987', 'SIO001317']
        },
        'synthetic_density': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_density'
          }],
          'unit': 'Synthetic Materials',
          'position': 19,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_density'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials'
        },
        'synthetic_parent_sample': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_parent_sample'
          }],
          'unit': 'Synthetic Materials',
          'position': 11,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_parent_sample'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['STD1546-A1']
        },
        'synthetic_volume': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_volume'
          }],
          'unit': 'Synthetic Materials',
          'position': 17,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_volume'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials'
        },
        'er_formation_name': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'er_formation_name'
          }],
          'unit': 'Synthetic Materials',
          'position': 4,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'er_formation_name'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['Bluebird Formation']
        },
        'er_synthetic_alternatives': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'er_synthetic_alternatives'
          }],
          'unit': 'Synthetic Materials',
          'position': 1,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'er_synthetic_alternatives'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials'
        },
        'er_site_name': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'er_site_name'
          }],
          'unit': 'Synthetic Materials',
          'position': 6,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'er_site_name'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['Bas123a']
        },
        'er_citation_names': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'er_citation_names'
          }],
          'unit': 'Synthetic Materials',
          'position': 25,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'er_citation_names'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'er_sample_name': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'er_sample_name'
          }],
          'unit': 'Synthetic Materials',
          'position': 7,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'er_sample_name'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['Bas123a-01']
        },
        'er_specimen_name': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'er_specimen_name'
          }],
          'unit': 'Synthetic Materials',
          'position': 8,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'er_specimen_name'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['Bas123a-01x']
        },
        'synthetic_weight': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_weight'
          }],
          'unit': 'Synthetic Materials',
          'position': 18,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_weight'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials'
        },
        'synthetic_description': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_description'
          }],
          'unit': 'Synthetic Materials',
          'position': 22,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_description'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials'
        },
        'synthetic_assemblage': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_assemblage'
          }],
          'unit': 'Synthetic Materials',
          'position': 14,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_assemblage'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['Single Crystal', 'Mineral Separate', 'Polycrystalline']
        },
        'synthetic_type': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_type'
          }],
          'unit': 'Synthetic Materials',
          'position': 13,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_type'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['Rock', 'Biogenic', 'Ceramic']
        },
        'er_mineral_name': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'er_mineral_name'
          }],
          'unit': 'Synthetic Materials',
          'position': 10,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'er_mineral_name'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['San03-001']
        },
        'er_fossil_name': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'er_fossil_name'
          }],
          'unit': 'Synthetic Materials',
          'position': 9,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'er_fossil_name'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['AMM43-03']
        },
        'er_location_name': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'er_location_name'
          }],
          'unit': 'Synthetic Materials',
          'position': 3,
          'previous_columns': [{
            'table': 'er_synthetics',
            'column': 'er_location_name'
          }],
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801']
        }
      },
      'label': 'Synthetic Materials',
      'description': 'Synthetic material that is not necessarily related to geology'
    },
    'rmag_remanence': {
      'position': 27,
      'columns': {
        'er_member_name': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_member_name'
          }],
          'unit': 'Remanence Experiments',
          'position': 3,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_member_name'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['Glasshound Member']
        },
        'remanence_sratio': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_sratio'
          }],
          'unit': 'Remanence Experiments',
          'position': 27,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_sratio'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_hirm_moment': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_hirm_moment'
          }],
          'unit': 'Remanence Experiments',
          'position': 30,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_hirm_moment'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_delta_ratio': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_delta_ratio'
          }],
          'unit': 'Remanence Experiments',
          'position': 20,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_delta_ratio'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'magic_method_codes': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'magic_method_codes'
          }],
          'unit': 'Remanence Experiments',
          'position': 48,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'magic_method_codes'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'remanence_cross_over': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_cross_over'
          }],
          'unit': 'Remanence Experiments',
          'position': 34,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_cross_over'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_cmf': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_cmf'
          }],
          'unit': 'Remanence Experiments',
          'position': 38,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_cmf'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_sa': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_sa'
          }],
          'unit': 'Remanence Experiments',
          'position': 41,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_sa'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'compilation_ids': {
          'group': 'Remanence Experiments',
          'next_columns': [],
          'unit': 'Remanence Experiments',
          'position': 46,
          'previous_columns': [],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['1435', '23', '2329']
        },
        'remanence_hirm_mass': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_hirm_mass'
          }],
          'unit': 'Remanence Experiments',
          'position': 32,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_hirm_mass'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_mdf': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_mdf'
          }],
          'unit': 'Remanence Experiments',
          'position': 35,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_mdf'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_delta_temp_low': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_delta_temp_low'
          }],
          'unit': 'Remanence Experiments',
          'position': 21,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_delta_temp_low'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_dzfc_mass': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_dzfc_mass'
          }],
          'unit': 'Remanence Experiments',
          'position': 19,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_dzfc_mass'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'rmag_criteria_codes': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'rmag_criteria_codes'
          }],
          'unit': 'Remanence Experiments',
          'position': 47,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'rmag_criteria_codes'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['MY-MAD', 'MY-APLHA95']
        },
        'remanence_maf': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_maf'
          }],
          'unit': 'Remanence Experiments',
          'position': 36,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_maf'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_mr_mass': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_mr_mass'
          }],
          'unit': 'Remanence Experiments',
          'position': 25,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_mr_mass'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_armx': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_armx'
          }],
          'unit': 'Remanence Experiments',
          'position': 33,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_armx'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_dfc_moment': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_dfc_moment'
          }],
          'unit': 'Remanence Experiments',
          'position': 14,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_dfc_moment'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_bcr': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_bcr'
          }],
          'unit': 'Remanence Experiments',
          'position': 26,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_bcr'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_sratio_back': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_sratio_back'
          }],
          'unit': 'Remanence Experiments',
          'position': 29,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_sratio_back'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'er_synthetic_name': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_synthetic_name'
          }],
          'unit': 'Remanence Experiments',
          'position': 9,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_synthetic_name'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['STD1546-A1']
        },
        'er_expedition_name': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_expedition_name'
          }],
          'unit': 'Remanence Experiments',
          'position': 0,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_expedition_name'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['AVON02MV']
        },
        'remanence_comp_n': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_comp_n'
          }],
          'unit': 'Remanence Experiments',
          'position': 40,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_comp_n'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_description': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_description'
          }],
          'unit': 'Remanence Experiments',
          'position': 44,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_description'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_mr_moment': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_mr_moment'
          }],
          'unit': 'Remanence Experiments',
          'position': 23,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_mr_moment'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'er_formation_name': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_formation_name'
          }],
          'unit': 'Remanence Experiments',
          'position': 2,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_formation_name'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['Bluebird Formation']
        },
        'remanence_hirm_volume': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_hirm_volume'
          }],
          'unit': 'Remanence Experiments',
          'position': 31,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_hirm_volume'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'measurement_orient_phi': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'measurement_orient_phi'
          }],
          'unit': 'Remanence Experiments',
          'position': 12,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'measurement_orient_phi'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'er_analyst_mail_names': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_analyst_mail_names'
          }],
          'unit': 'Remanence Experiments',
          'position': 50,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_analyst_mail_names'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'remanence_cd': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_cd'
          }],
          'unit': 'Remanence Experiments',
          'position': 39,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_cd'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_dfc_volume': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_dfc_volume'
          }],
          'unit': 'Remanence Experiments',
          'position': 15,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_dfc_volume'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_dfc_mass': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_dfc_mass'
          }],
          'unit': 'Remanence Experiments',
          'position': 16,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_dfc_mass'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_dzfc_volume': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_dzfc_volume'
          }],
          'unit': 'Remanence Experiments',
          'position': 18,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_dzfc_volume'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_mr_volume': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_mr_volume'
          }],
          'unit': 'Remanence Experiments',
          'position': 24,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_mr_volume'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_sratio_forward': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_sratio_forward'
          }],
          'unit': 'Remanence Experiments',
          'position': 28,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_sratio_forward'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'measurement_temp': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'measurement_temp'
          }],
          'unit': 'Remanence Experiments',
          'position': 11,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'measurement_temp'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'magic_experiment_names': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'magic_experiment_names'
          }],
          'unit': 'Remanence Experiments',
          'position': 10,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'magic_experiment_names'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['KOPA-299-1', 'KOPA-299-2', 'KOPA-299-6']
        },
        'er_site_name': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_site_name'
          }],
          'unit': 'Remanence Experiments',
          'position': 4,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_site_name'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['Bas123a']
        },
        'compilation_names': {
          'group': 'Remanence Experiments',
          'next_columns': [],
          'unit': 'Remanence Experiments',
          'position': 45,
          'previous_columns': [],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['GEOMAGIA', 'CALS7', 'ARCHEO00']
        },
        'er_citation_names': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_citation_names'
          }],
          'unit': 'Remanence Experiments',
          'position': 51,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_citation_names'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'er_sample_name': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_sample_name'
          }],
          'unit': 'Remanence Experiments',
          'position': 5,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_sample_name'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['Bas123a-01']
        },
        'er_specimen_name': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_specimen_name'
          }],
          'unit': 'Remanence Experiments',
          'position': 6,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_specimen_name'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['Bas123a-01x']
        },
        'remanence_dzfc_moment': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_dzfc_moment'
          }],
          'unit': 'Remanence Experiments',
          'position': 17,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_dzfc_moment'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_sd': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_sd'
          }],
          'unit': 'Remanence Experiments',
          'position': 42,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_sd'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_delta_temp_high': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_delta_temp_high'
          }],
          'unit': 'Remanence Experiments',
          'position': 22,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_delta_temp_high'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'measurement_orient_theta': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'measurement_orient_theta'
          }],
          'unit': 'Remanence Experiments',
          'position': 13,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'measurement_orient_theta'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'magic_instrument_codes': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'magic_instrument_codes'
          }],
          'unit': 'Remanence Experiments',
          'position': 49,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'magic_instrument_codes'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['SIO-Bubba', 'IRM-OldBlue']
        },
        'remanence_q': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_q'
          }],
          'unit': 'Remanence Experiments',
          'position': 43,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_q'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'er_mineral_name': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_mineral_name'
          }],
          'unit': 'Remanence Experiments',
          'position': 8,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_mineral_name'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['San03-001']
        },
        'remanence_mdt': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_mdt'
          }],
          'unit': 'Remanence Experiments',
          'position': 37,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_mdt'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'er_fossil_name': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_fossil_name'
          }],
          'unit': 'Remanence Experiments',
          'position': 7,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_fossil_name'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['AMM43-03']
        },
        'er_location_name': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_location_name'
          }],
          'unit': 'Remanence Experiments',
          'position': 1,
          'previous_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_location_name'
          }],
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801']
        }
      },
      'label': 'Remanence Experiments',
      'description': 'Experiment for magnetic remanence:  ARM, IRM, TRM, CRM, VRM and DRM'
    },
    'er_formations': {
      'position': 4,
      'columns': {
        'formation_class': {
          'group': 'Rock Formations',
          'next_columns': [{
            'table': 'er_formations',
            'column': 'formation_class'
          }],
          'unit': 'Rock Formations',
          'position': 2,
          'previous_columns': [{
            'table': 'er_formations',
            'column': 'formation_class'
          }],
          'label': 'Rock Formations',
          'type': 'Rock Formations',
          'description': 'Rock Formations',
          'examples': ['Igneous', 'Sedimentary', 'Metamorphic', 'Archeological', 'Intrusive', 'Extrusive', 'Submarine', 'Subaerial']
        },
        'er_scientist_mail_names': {
          'group': 'Rock Formations',
          'next_columns': [{
            'table': 'er_formations',
            'column': 'er_scientist_mail_names'
          }],
          'unit': 'Rock Formations',
          'position': 7,
          'previous_columns': [{
            'table': 'er_formations',
            'column': 'er_scientist_mail_names'
          }],
          'label': 'Rock Formations',
          'type': 'Rock Formations',
          'description': 'Rock Formations',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'formation_paleo_enviroment': {
          'group': 'Rock Formations',
          'next_columns': [],
          'unit': 'Rock Formations',
          'position': 4,
          'previous_columns': [{
            'table': 'er_formations',
            'column': 'formation_paleo_enviroment'
          }],
          'label': 'Rock Formations',
          'type': 'Rock Formations',
          'description': 'Rock Formations',
          'examples': ['Fluvial', 'Continental Shelf', 'Eolian', 'Fringing Reef']
        },
        'formation_description': {
          'group': 'Rock Formations',
          'next_columns': [{
            'table': 'er_formations',
            'column': 'formation_description'
          }],
          'unit': 'Rock Formations',
          'position': 6,
          'previous_columns': [{
            'table': 'er_formations',
            'column': 'formation_description'
          }],
          'label': 'Rock Formations',
          'type': 'Rock Formations',
          'description': 'Rock Formations'
        },
        'er_formation_name': {
          'group': 'Rock Formations',
          'next_columns': [{
            'table': 'er_formations',
            'column': 'er_formation_name'
          }],
          'unit': 'Rock Formations',
          'position': 0,
          'previous_columns': [{
            'table': 'er_formations',
            'column': 'er_formation_name'
          }],
          'label': 'Rock Formations',
          'type': 'Rock Formations',
          'description': 'Rock Formations',
          'examples': ['Bluebird Formation']
        },
        'er_citation_names': {
          'group': 'Rock Formations',
          'next_columns': [{
            'table': 'er_formations',
            'column': 'er_citation_names'
          }],
          'unit': 'Rock Formations',
          'position': 8,
          'previous_columns': [{
            'table': 'er_formations',
            'column': 'er_citation_names'
          }],
          'label': 'Rock Formations',
          'type': 'Rock Formations',
          'description': 'Rock Formations',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'formation_thickness': {
          'group': 'Rock Formations',
          'next_columns': [{
            'table': 'er_formations',
            'column': 'formation_thickness'
          }],
          'unit': 'Rock Formations',
          'position': 5,
          'previous_columns': [{
            'table': 'er_formations',
            'column': 'formation_thickness'
          }],
          'label': 'Rock Formations',
          'type': 'Rock Formations',
          'description': 'Rock Formations'
        },
        'er_formation_alternatives': {
          'group': 'Rock Formations',
          'next_columns': [{
            'table': 'er_formations',
            'column': 'er_formation_alternatives'
          }],
          'unit': 'Rock Formations',
          'position': 1,
          'previous_columns': [{
            'table': 'er_formations',
            'column': 'er_formation_alternatives'
          }],
          'label': 'Rock Formations',
          'type': 'Rock Formations',
          'description': 'Rock Formations'
        },
        'formation_lithology': {
          'group': 'Rock Formations',
          'next_columns': [{
            'table': 'er_formations',
            'column': 'formation_lithology'
          }],
          'unit': 'Rock Formations',
          'position': 3,
          'previous_columns': [{
            'table': 'er_formations',
            'column': 'formation_lithology'
          }],
          'label': 'Rock Formations',
          'type': 'Rock Formations',
          'description': 'Rock Formations',
          'examples': ['Basalt', 'Granite', 'Mudstone', 'Tuff', 'Granodiorite', 'Marl']
        }
      },
      'label': 'Rock Formations',
      'description': 'Unique rock formation or sequence'
    },
    'pmag_rotations': {
      'position': 24,
      'columns': {
        'rotation_phi': {
          'group': 'Rotation Data',
          'next_columns': [{
            'table': 'pmag_rotations',
            'column': 'rotation_phi'
          }],
          'unit': 'Rotation Data',
          'position': 3,
          'previous_columns': [{
            'table': 'pmag_rotations',
            'column': 'rotation_phi'
          }],
          'label': 'Rotation Data',
          'type': 'Rotation Data',
          'description': 'Rotation Data'
        },
        'pmag_rotation_code': {
          'group': 'Rotation Data',
          'next_columns': [{
            'table': 'pmag_rotations',
            'column': 'pmag_rotation_code'
          }],
          'unit': 'Rotation Data',
          'position': 0,
          'previous_columns': [{
            'table': 'pmag_rotations',
            'column': 'pmag_rotation_code'
          }],
          'label': 'Rotation Data',
          'type': 'Rotation Data',
          'description': 'Rotation Data',
          'examples': ['MY-TILT1', 'MY-TILT2', 'MY-TRANS1', 'MY-ROT1', 'MY-ROT2']
        },
        'rotation_description': {
          'group': 'Rotation Data',
          'next_columns': [{
            'table': 'pmag_rotations',
            'column': 'rotation_description'
          }],
          'unit': 'Rotation Data',
          'position': 5,
          'previous_columns': [{
            'table': 'pmag_rotations',
            'column': 'rotation_description'
          }],
          'label': 'Rotation Data',
          'type': 'Rotation Data',
          'description': 'Rotation Data'
        },
        'er_citation_names': {
          'group': 'Rotation Data',
          'next_columns': [{
            'table': 'pmag_rotations',
            'column': 'er_citation_names'
          }],
          'unit': 'Rotation Data',
          'position': 6,
          'previous_columns': [{
            'table': 'pmag_rotations',
            'column': 'er_citation_names'
          }],
          'label': 'Rotation Data',
          'type': 'Rotation Data',
          'description': 'Rotation Data',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'rotation_omega': {
          'group': 'Rotation Data',
          'next_columns': [{
            'table': 'pmag_rotations',
            'column': 'rotation_omega'
          }],
          'unit': 'Rotation Data',
          'position': 4,
          'previous_columns': [{
            'table': 'pmag_rotations',
            'column': 'rotation_omega'
          }],
          'label': 'Rotation Data',
          'type': 'Rotation Data',
          'description': 'Rotation Data'
        },
        'rotation_lambda': {
          'group': 'Rotation Data',
          'next_columns': [{
            'table': 'pmag_rotations',
            'column': 'rotation_lambda'
          }],
          'unit': 'Rotation Data',
          'position': 2,
          'previous_columns': [{
            'table': 'pmag_rotations',
            'column': 'rotation_lambda'
          }],
          'label': 'Rotation Data',
          'type': 'Rotation Data',
          'description': 'Rotation Data'
        },
        'rotation_definition': {
          'group': 'Rotation Data',
          'next_columns': [{
            'table': 'pmag_rotations',
            'column': 'rotation_definition'
          }],
          'unit': 'Rotation Data',
          'position': 1,
          'previous_columns': [{
            'table': 'pmag_rotations',
            'column': 'rotation_definition'
          }],
          'label': 'Rotation Data',
          'type': 'Rotation Data',
          'description': 'Rotation Data'
        }
      },
      'label': 'Rotation Data',
      'description': 'Data used to perform complex rotations between coordinate systems'
    },
    'er_minerals': {
      'position': 10,
      'columns': {
        'er_member_name': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'er_member_name'
          }],
          'unit': 'Minerals',
          'position': 5,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'er_member_name'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['Glasshound Member']
        },
        'magic_method_codes': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'magic_method_codes'
          }],
          'unit': 'Minerals',
          'position': 22,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'magic_method_codes'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'er_scientist_mail_names': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'er_scientist_mail_names'
          }],
          'unit': 'Minerals',
          'position': 23,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'er_scientist_mail_names'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'mineral_size': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_size'
          }],
          'unit': 'Minerals',
          'position': 16,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_size'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['250-500 Â¿m']
        },
        'mineral_igsn': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_igsn'
          }],
          'unit': 'Minerals',
          'position': 20,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_igsn'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['SIO0A0987', 'SIO001317']
        },
        'mineral_class_name': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_class_name'
          }],
          'unit': 'Minerals',
          'position': 11,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_class_name'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['Magnetite', 'Plagioclase']
        },
        'mineral_assemblage': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_assemblage'
          }],
          'unit': 'Minerals',
          'position': 12,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_assemblage'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['Single Crystal', 'Mineral Separate', 'Polycrystalline', 'In Situ']
        },
        'er_expedition_name': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'er_expedition_name'
          }],
          'unit': 'Minerals',
          'position': 2,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'er_expedition_name'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['AVON02MV']
        },
        'mineral_shape': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_shape'
          }],
          'unit': 'Minerals',
          'position': 15,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_shape'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['Euhedral', 'Orthorhombic']
        },
        'mineral_density': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_density'
          }],
          'unit': 'Minerals',
          'position': 19,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_density'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals'
        },
        'mineral_alteration_type': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_alteration_type'
          }],
          'unit': 'Minerals',
          'position': 14,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_alteration_type'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['Hydrothermal', 'Diagenetic', 'Weathering', 'Oxidation', 'Metamorphic']
        },
        'er_mineral_alternatives': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'er_mineral_alternatives'
          }],
          'unit': 'Minerals',
          'position': 1,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'er_mineral_alternatives'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals'
        },
        'er_formation_name': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'er_formation_name'
          }],
          'unit': 'Minerals',
          'position': 4,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'er_formation_name'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['Bluebird Formation']
        },
        'mineral_type': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_type'
          }],
          'unit': 'Minerals',
          'position': 10,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_type'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['Phenocryst', 'Microcryst', 'Groundmass', 'Biogenic', 'Detrital Clasts']
        },
        'mineral_description': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_description'
          }],
          'unit': 'Minerals',
          'position': 21,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_description'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals'
        },
        'er_site_name': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'er_site_name'
          }],
          'unit': 'Minerals',
          'position': 6,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'er_site_name'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['Bas123a']
        },
        'er_citation_names': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'er_citation_names'
          }],
          'unit': 'Minerals',
          'position': 24,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'er_citation_names'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'er_sample_name': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'er_sample_name'
          }],
          'unit': 'Minerals',
          'position': 7,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'er_sample_name'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['Bas123a-01']
        },
        'er_specimen_name': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'er_specimen_name'
          }],
          'unit': 'Minerals',
          'position': 8,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'er_specimen_name'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['Bas123a-01x']
        },
        'mineral_volume': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_volume'
          }],
          'unit': 'Minerals',
          'position': 17,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_volume'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals'
        },
        'mineral_weight': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_weight'
          }],
          'unit': 'Minerals',
          'position': 18,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_weight'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals'
        },
        'er_mineral_name': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'er_mineral_name'
          }],
          'unit': 'Minerals',
          'position': 0,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'er_mineral_name'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['San03-001']
        },
        'mineral_alteration': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_alteration'
          }],
          'unit': 'Minerals',
          'position': 13,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_alteration'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['Severe', 'High', 'Mild', 'Trace', 'Unaltered']
        },
        'er_fossil_name': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'er_fossil_name'
          }],
          'unit': 'Minerals',
          'position': 9,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'er_fossil_name'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['AMM43-03']
        },
        'er_location_name': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'er_location_name'
          }],
          'unit': 'Minerals',
          'position': 3,
          'previous_columns': [{
            'table': 'er_minerals',
            'column': 'er_location_name'
          }],
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801']
        }
      },
      'label': 'Minerals',
      'description': 'Naturally occurring minerals'
    },
    'er_specimens': {
      'position': 8,
      'columns': {
        'er_member_name': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'er_member_name'
          }],
          'unit': 'Specimens',
          'position': 5,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'er_member_name'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Glasshound Member']
        },
        'specimen_alteration_type': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_alteration_type'
          }],
          'unit': 'Specimens',
          'position': 13,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_alteration_type'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Hydrothermal', 'Diagenetic', 'Weathering', 'Oxidation', 'Metamorphic']
        },
        'magic_method_codes': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'magic_method_codes'
          }],
          'unit': 'Specimens',
          'position': 27,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'magic_method_codes'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'specimen_composite_depth': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_composite_depth'
          }],
          'unit': 'Specimens',
          'position': 17,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_composite_depth'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Meters below seafloor']
        },
        'specimen_shape': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_shape'
          }],
          'unit': 'Specimens',
          'position': 24,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_shape'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Cube', 'Cylinder', 'Single Crystal', 'Chip']
        },
        'er_scientist_mail_names': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'er_scientist_mail_names'
          }],
          'unit': 'Specimens',
          'position': 28,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'er_scientist_mail_names'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'specimen_lithology': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_lithology'
          }],
          'unit': 'Specimens',
          'position': 9,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_lithology'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Basalt', 'Granite', 'Mudstone', 'Tuff', 'Granodiorite', 'Marl']
        },
        'specimen_density': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_density'
          }],
          'unit': 'Specimens',
          'position': 22,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_density'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens'
        },
        'specimen_azimuth': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_azimuth'
          }],
          'unit': 'Specimens',
          'position': 18,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_azimuth'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'specimen_height': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_height'
          }],
          'unit': 'Specimens',
          'position': 15,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_height'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Positive is up in section or core', 'while negative is down relative to reference height']
        },
        'specimen_igsn': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_igsn'
          }],
          'unit': 'Specimens',
          'position': 25,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_igsn'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['SIO0A0987', 'SIO001317']
        },
        'specimen_type': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_type'
          }],
          'unit': 'Specimens',
          'position': 10,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_type'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Flow Top', 'Glassy Margin', 'Pot Rim', 'Pillow', 'Kiln', 'Dike']
        },
        'specimen_dip': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_dip'
          }],
          'unit': 'Specimens',
          'position': 19,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_dip'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'er_expedition_name': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'er_expedition_name'
          }],
          'unit': 'Specimens',
          'position': 2,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'er_expedition_name'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['AVON02MV']
        },
        'specimen_core_depth': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_core_depth'
          }],
          'unit': 'Specimens',
          'position': 16,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_core_depth'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Meters below seafloor']
        },
        'specimen_texture': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_texture'
          }],
          'unit': 'Specimens',
          'position': 11,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_texture'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Holocrystalline', 'Hawaiitic', 'Homogeneous']
        },
        'er_formation_name': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'er_formation_name'
          }],
          'unit': 'Specimens',
          'position': 4,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'er_formation_name'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Bluebird Formation']
        },
        'specimen_description': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_description'
          }],
          'unit': 'Specimens',
          'position': 26,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_description'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens'
        },
        'er_site_name': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'er_site_name'
          }],
          'unit': 'Specimens',
          'position': 6,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'er_site_name'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Bas123a']
        },
        'er_citation_names': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'er_citation_names'
          }],
          'unit': 'Specimens',
          'position': 29,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'er_citation_names'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'er_sample_name': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'er_sample_name'
          }],
          'unit': 'Specimens',
          'position': 7,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'er_sample_name'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Bas123a-01']
        },
        'er_specimen_name': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'er_specimen_name'
          }],
          'unit': 'Specimens',
          'position': 0,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'er_specimen_name'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Bas123a-01x']
        },
        'er_specimen_alternatives': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'er_specimen_alternatives'
          }],
          'unit': 'Specimens',
          'position': 1,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'er_specimen_alternatives'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens'
        },
        'specimen_alteration': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_alteration'
          }],
          'unit': 'Specimens',
          'position': 12,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_alteration'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Severe', 'High', 'Mild', 'Trace', 'Unaltered']
        },
        'specimen_elevation': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_elevation'
          }],
          'unit': 'Specimens',
          'position': 14,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_elevation'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Meters above sealevel']
        },
        'specimen_class': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_class'
          }],
          'unit': 'Specimens',
          'position': 8,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_class'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Igneous', 'Sedimentary', 'Metamorphic', 'Archeological', 'Intrusive', 'Extrusive', 'Submarine', 'Subaerial']
        },
        'specimen_volume': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_volume'
          }],
          'unit': 'Specimens',
          'position': 20,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_volume'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens'
        },
        'specimen_size': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_size'
          }],
          'unit': 'Specimens',
          'position': 23,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_size'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['25-125 Â¿m', '250-500 Â¿m']
        },
        'specimen_weight': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_weight'
          }],
          'unit': 'Specimens',
          'position': 21,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_weight'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens'
        },
        'er_location_name': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'er_location_name'
          }],
          'unit': 'Specimens',
          'position': 3,
          'previous_columns': [{
            'table': 'er_specimens',
            'column': 'er_location_name'
          }],
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801']
        }
      },
      'label': 'Specimens',
      'description': 'Specimen from sample'
    },
    'rmag_anisotropy': {
      'position': 29,
      'columns': {
        'er_member_name': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_member_name'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 3,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_member_name'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['Glasshound Member']
        },
        'magic_method_codes': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'magic_method_codes'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 27,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'magic_method_codes'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'anisotropy_s5': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_s5'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 16,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_s5'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments'
        },
        'compilation_ids': {
          'group': 'Anisotropy Experiments',
          'next_columns': [],
          'unit': 'Anisotropy Experiments',
          'position': 25,
          'previous_columns': [],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['1435', '23', '2329']
        },
        'anisotropy_s6': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_s6'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 17,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_s6'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments'
        },
        'anisotropy_tilt_correction': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_tilt_correction'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 22,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_tilt_correction'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['Correction between geographic (0%) and stratigraphic (100%); unoriented (-1%); partially oriented to horizontal only (-2%)']
        },
        'anisotropy_unit': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_unit'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 20,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_unit'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['Normalized by trace', 'Am2', 'm3/kg', 'SI', 'deviatoric']
        },
        'rmag_criteria_codes': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'rmag_criteria_codes'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 26,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'rmag_criteria_codes'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['MY-MAD', 'MY-APLHA95']
        },
        'anisotropy_description': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_description'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 23,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_description'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments'
        },
        'er_synthetic_name': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_synthetic_name'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 9,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_synthetic_name'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['STD1546-A1']
        },
        'er_expedition_name': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_expedition_name'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 0,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_expedition_name'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['AVON02MV']
        },
        'anisotropy_s4': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_s4'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 15,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_s4'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments'
        },
        'anisotropy_type': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_type'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 11,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_type'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['AMS', 'AARM', 'AIRM', 'ATRM']
        },
        'er_formation_name': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_formation_name'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 2,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_formation_name'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['Bluebird Formation']
        },
        'er_analyst_mail_names': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_analyst_mail_names'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 29,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_analyst_mail_names'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'anisotropy_sigma': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_sigma'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 19,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_sigma'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['Sigma of Hext (1963)']
        },
        'anisotropy_s3': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_s3'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 14,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_s3'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments'
        },
        'magic_experiment_names': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'magic_experiment_names'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 10,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'magic_experiment_names'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['KOPA-299-1', 'KOPA-299-2', 'KOPA-299-6']
        },
        'er_site_name': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_site_name'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 4,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_site_name'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['Bas123a']
        },
        'compilation_names': {
          'group': 'Anisotropy Experiments',
          'next_columns': [],
          'unit': 'Anisotropy Experiments',
          'position': 24,
          'previous_columns': [],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['GEOMAGIA', 'CALS7', 'ARCHEO00']
        },
        'er_citation_names': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_citation_names'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 30,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_citation_names'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'er_sample_name': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_sample_name'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 5,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_sample_name'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['Bas123a-01']
        },
        'anisotropy_mean': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_mean'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 18,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_mean'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments'
        },
        'er_specimen_name': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_specimen_name'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 6,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_specimen_name'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['Bas123a-01x']
        },
        'anisotropy_s2': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_s2'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 13,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_s2'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments'
        },
        'magic_instrument_codes': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'magic_instrument_codes'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 28,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'magic_instrument_codes'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['SIO-Bubba', 'IRM-OldBlue']
        },
        'anisotropy_n': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_n'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 21,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_n'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments'
        },
        'er_mineral_name': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_mineral_name'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 8,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_mineral_name'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['San03-001']
        },
        'anisotropy_s1': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_s1'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 12,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_s1'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments'
        },
        'er_fossil_name': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_fossil_name'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 7,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_fossil_name'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['AMM43-03']
        },
        'er_location_name': {
          'group': 'Anisotropy Experiments',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_location_name'
          }],
          'unit': 'Anisotropy Experiments',
          'position': 1,
          'previous_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_location_name'
          }],
          'label': 'Anisotropy Experiments',
          'type': 'Anisotropy Experiments',
          'description': 'Anisotropy Experiments',
          'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801']
        }
      },
      'label': 'Anisotropy Experiments',
      'description': 'Experiment for anisotropy parameters'
    },
    'pmag_specimens': {
      'position': 20,
      'columns': {
        'er_member_name': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_member_name'
          }],
          'unit': 'Specimen Data',
          'position': 3,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_member_name'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Glasshound Member']
        },
        'specimen_g': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_g'
          }],
          'unit': 'Specimen Data',
          'position': 47,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_g'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_int_rel_sigma_perc': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_rel_sigma_perc'
          }],
          'unit': 'Specimen Data',
          'position': 37,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_rel_sigma_perc'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'magic_method_codes': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'magic_method_codes'
          }],
          'unit': 'Specimen Data',
          'position': 69,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'magic_method_codes'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'specimen_f': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_f'
          }],
          'unit': 'Specimen Data',
          'position': 42,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_f'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_inferred_age': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_inferred_age'
          }],
          'unit': 'Specimen Data',
          'position': 21,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_inferred_age'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_correction': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_correction'
          }],
          'unit': 'Specimen Data',
          'position': 16,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_correction'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Default = u']
        },
        'specimen_inc': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_inc'
          }],
          'unit': 'Specimen Data',
          'position': 26,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_inc'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'specimen_int_sigma_perc': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_sigma_perc'
          }],
          'unit': 'Specimen Data',
          'position': 34,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_sigma_perc'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'compilation_ids': {
          'group': 'Specimen Data',
          'next_columns': [],
          'unit': 'Specimen Data',
          'position': 66,
          'previous_columns': [],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['1435', '23', '2329']
        },
        'specimen_b_sigma': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_b_sigma'
          }],
          'unit': 'Specimen Data',
          'position': 45,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_b_sigma'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'specimen_drat': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_drat'
          }],
          'unit': 'Specimen Data',
          'position': 51,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_drat'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Normalized by hypotenuse ']
        },
        'specimen_int_corr_anisotropy': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_corr_anisotropy'
          }],
          'unit': 'Specimen Data',
          'position': 63,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_corr_anisotropy'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_q': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_q'
          }],
          'unit': 'Specimen Data',
          'position': 41,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_q'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_md': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_md'
          }],
          'unit': 'Specimen Data',
          'position': 49,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_md'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_inferred_age_sigma': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_inferred_age_sigma'
          }],
          'unit': 'Specimen Data',
          'position': 22,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_inferred_age_sigma'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'specimen_mad': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_mad'
          }],
          'unit': 'Specimen Data',
          'position': 28,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_mad'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_tilt_correction': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_tilt_correction'
          }],
          'unit': 'Specimen Data',
          'position': 31,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_tilt_correction'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Correction between geographic (0%) and stratigraphic (100%); unoriented (-1%); partially oriented to horizontal only (-2%)']
        },
        'specimen_alpha95': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_alpha95'
          }],
          'unit': 'Specimen Data',
          'position': 29,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_alpha95'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Confidence Level = 95%']
        },
        'specimen_ptrm': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_ptrm'
          }],
          'unit': 'Specimen Data',
          'position': 50,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_ptrm'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_b': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_b'
          }],
          'unit': 'Specimen Data',
          'position': 44,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_b'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_int_sigma': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_sigma'
          }],
          'unit': 'Specimen Data',
          'position': 33,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_sigma'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'specimen_dang': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_dang'
          }],
          'unit': 'Specimen Data',
          'position': 48,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_dang'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_b_beta': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_b_beta'
          }],
          'unit': 'Specimen Data',
          'position': 46,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_b_beta'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'specimen_int_corr_cooling_rate': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_corr_cooling_rate'
          }],
          'unit': 'Specimen Data',
          'position': 62,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_corr_cooling_rate'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_n': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_n'
          }],
          'unit': 'Specimen Data',
          'position': 30,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_n'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_int_n': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_n'
          }],
          'unit': 'Specimen Data',
          'position': 39,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_n'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'er_synthetic_name': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_synthetic_name'
          }],
          'unit': 'Specimen Data',
          'position': 9,
          'previous_columns': [],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['STD1546-A1']
        },
        'er_expedition_name': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_expedition_name'
          }],
          'unit': 'Specimen Data',
          'position': 0,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_expedition_name'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['AVON02MV']
        },
        'specimen_inferred_age_unit': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_inferred_age_unit'
          }],
          'unit': 'Specimen Data',
          'position': 25,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_inferred_age_unit'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Ma', 'Ka', 'Ga', 'Years BP', 'Years AD (+/-)', 'Years Cal BP', 'Years Cal AD (+/-)']
        },
        'specimen_int_rel_sigma': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_rel_sigma'
          }],
          'unit': 'Specimen Data',
          'position': 36,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_rel_sigma'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'specimen_rsc': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_rsc'
          }],
          'unit': 'Specimen Data',
          'position': 53,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_rsc'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_comp_n': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_comp_n'
          }],
          'unit': 'Specimen Data',
          'position': 19,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_comp_n'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_polarity': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_polarity'
          }],
          'unit': 'Specimen Data',
          'position': 14,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_polarity'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Default = n']
        },
        'measurement_step_unit': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'measurement_step_unit'
          }],
          'unit': 'Specimen Data',
          'position': 13,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'measurement_step_unit'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_magn_moment': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_magn_moment'
          }],
          'unit': 'Specimen Data',
          'position': 58,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_magn_moment'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_int_mad': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_mad'
          }],
          'unit': 'Specimen Data',
          'position': 38,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_mad'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_magn_mass': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_magn_mass'
          }],
          'unit': 'Specimen Data',
          'position': 60,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_magn_mass'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_direction_type': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_direction_type'
          }],
          'unit': 'Specimen Data',
          'position': 17,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_direction_type'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Default = l']
        },
        'er_formation_name': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_formation_name'
          }],
          'unit': 'Specimen Data',
          'position': 2,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_formation_name'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Bluebird Formation']
        },
        'specimen_viscosity_index': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_viscosity_index'
          }],
          'unit': 'Specimen Data',
          'position': 55,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_viscosity_index'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_lab_field_ac': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_lab_field_ac'
          }],
          'unit': 'Specimen Data',
          'position': 57,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_lab_field_ac'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['No field equals 0 and ambient field equals -1']
        },
        'er_analyst_mail_names': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_analyst_mail_names'
          }],
          'unit': 'Specimen Data',
          'position': 71,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_analyst_mail_names'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'specimen_int': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int'
          }],
          'unit': 'Specimen Data',
          'position': 32,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_description': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_description'
          }],
          'unit': 'Specimen Data',
          'position': 64,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_description'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_w': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_w'
          }],
          'unit': 'Specimen Data',
          'position': 40,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_w'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_nrm': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_nrm'
          }],
          'unit': 'Specimen Data',
          'position': 15,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_nrm'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Default = p']
        },
        'specimen_inferred_age_low': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_inferred_age_low'
          }],
          'unit': 'Specimen Data',
          'position': 23,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_inferred_age_low'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'magic_experiment_names': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'magic_experiment_names'
          }],
          'unit': 'Specimen Data',
          'position': 10,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'magic_experiment_names'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['KOPA-299-1', 'KOPA-299-2', 'KOPA-299-6']
        },
        'measurement_step_min': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'measurement_step_min'
          }],
          'unit': 'Specimen Data',
          'position': 11,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'measurement_step_min'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_z': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_z'
          }],
          'unit': 'Specimen Data',
          'position': 54,
          'previous_columns': [],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Real number between -1 and 100']
        },
        'specimen_drats': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_drats'
          }],
          'unit': 'Specimen Data',
          'position': 52,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_drats'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Normalized by pTRM']
        },
        'er_site_name': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_site_name'
          }],
          'unit': 'Specimen Data',
          'position': 4,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_site_name'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Bas123a']
        },
        'compilation_names': {
          'group': 'Specimen Data',
          'next_columns': [],
          'unit': 'Specimen Data',
          'position': 65,
          'previous_columns': [],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['GEOMAGIA', 'CALS7', 'ARCHEO00']
        },
        'er_citation_names': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_citation_names'
          }],
          'unit': 'Specimen Data',
          'position': 72,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_citation_names'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'er_sample_name': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_sample_name'
          }],
          'unit': 'Specimen Data',
          'position': 5,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_sample_name'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Bas123a-01']
        },
        'specimen_lab_field_dc': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_lab_field_dc'
          }],
          'unit': 'Specimen Data',
          'position': 56,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_lab_field_dc'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['No field equals 0 and ambient field equals -1']
        },
        'specimen_fvds': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_fvds'
          }],
          'unit': 'Specimen Data',
          'position': 43,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_fvds'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'pmag_rotation_codes': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'pmag_rotation_codes'
          }],
          'unit': 'Specimen Data',
          'position': 68,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'pmag_rotation_codes'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['MY-TILT1', 'MY-TILT2', 'MY-TRANS1']
        },
        'er_specimen_name': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_specimen_name'
          }],
          'unit': 'Specimen Data',
          'position': 6,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_specimen_name'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Bas123a-01x']
        },
        'specimen_comp_nmb': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_comp_nmb'
          }],
          'unit': 'Specimen Data',
          'position': 18,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_comp_nmb'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'measurement_step_max': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'measurement_step_max'
          }],
          'unit': 'Specimen Data',
          'position': 12,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'measurement_step_max'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_magn_volume': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_magn_volume'
          }],
          'unit': 'Specimen Data',
          'position': 59,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_magn_volume'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'magic_instrument_codes': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'magic_instrument_codes'
          }],
          'unit': 'Specimen Data',
          'position': 70,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'magic_instrument_codes'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['SIO-Bubba', 'IRM-OldBlue']
        },
        'pmag_criteria_codes': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'pmag_criteria_codes'
          }],
          'unit': 'Specimen Data',
          'position': 67,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'pmag_criteria_codes'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['MY-MAD', 'MY-APLHA95']
        },
        'specimen_comp_name': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_comp_name'
          }],
          'unit': 'Specimen Data',
          'position': 20,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_comp_name'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Characteristic', 'VRM', 'Overprint', 'A', 'B', 'C']
        },
        'specimen_dec': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_dec'
          }],
          'unit': 'Specimen Data',
          'position': 27,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_dec'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'specimen_int_ptrm_n': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_ptrm_n'
          }],
          'unit': 'Specimen Data',
          'position': 61,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_ptrm_n'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'er_mineral_name': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_mineral_name'
          }],
          'unit': 'Specimen Data',
          'position': 8,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_mineral_name'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['San03-001']
        },
        'specimen_int_rel': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_rel'
          }],
          'unit': 'Specimen Data',
          'position': 35,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_rel'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_inferred_age_high': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_inferred_age_high'
          }],
          'unit': 'Specimen Data',
          'position': 24,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_inferred_age_high'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'er_fossil_name': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_fossil_name'
          }],
          'unit': 'Specimen Data',
          'position': 7,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_fossil_name'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['AMM43-03']
        },
        'er_location_name': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_location_name'
          }],
          'unit': 'Specimen Data',
          'position': 1,
          'previous_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_location_name'
          }],
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801']
        }
      },
      'label': 'Specimen Data',
      'description': 'Specimen from sample'
    },
    'er_ages': {
      'position': 12,
      'columns': {
        'er_member_name': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'er_member_name'
          }],
          'unit': 'Ages Determinations',
          'position': 3,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'er_member_name'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Glasshound Member']
        },
        'age_sigma': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'age_sigma'
          }],
          'unit': 'Ages Determinations',
          'position': 16,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'age_sigma'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Uncertainty = 1xSD']
        },
        'magic_method_codes': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'magic_method_codes'
          }],
          'unit': 'Ages Determinations',
          'position': 32,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'magic_method_codes'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'tiepoint_name': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'tiepoint_name'
          }],
          'unit': 'Ages Determinations',
          'position': 9,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'tiepoint_name'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['San Cristobal Red bed']
        },
        'oxygen_stage': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'oxygen_stage'
          }],
          'unit': 'Ages Determinations',
          'position': 29,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'oxygen_stage'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['5e', 'MIS 19', 'Younger Dryas']
        },
        'timescale_stage': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'timescale_stage'
          }],
          'unit': 'Ages Determinations',
          'position': 24,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'timescale_stage'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Maastrichtian', 'Oxfordian', 'Frasnian']
        },
        'timescale_period': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'timescale_period'
          }],
          'unit': 'Ages Determinations',
          'position': 22,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'timescale_period'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Devonian', 'Permian', 'Cretaceous', 'Paleocene']
        },
        'tiepoint_height': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'tiepoint_height'
          }],
          'unit': 'Ages Determinations',
          'position': 11,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'tiepoint_height'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Positive is up in section or core', 'while negative is down relative to reference height']
        },
        'timescale_era': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'timescale_era'
          }],
          'unit': 'Ages Determinations',
          'position': 21,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'timescale_era'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Neoproterozoic', 'Paleozoic', 'Mesozoic', 'Cenozoic']
        },
        'tiepoint_alternatives': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'tiepoint_alternatives'
          }],
          'unit': 'Ages Determinations',
          'position': 10,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'tiepoint_alternatives'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations'
        },
        'age_range_low': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'age_range_low'
          }],
          'unit': 'Ages Determinations',
          'position': 17,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'age_range_low'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations'
        },
        'astronomical_stage': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'astronomical_stage'
          }],
          'unit': 'Ages Determinations',
          'position': 28,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'astronomical_stage'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['MIS 19']
        },
        'age_description': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'age_description'
          }],
          'unit': 'Ages Determinations',
          'position': 31,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'age_description'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations'
        },
        'age_culture_name': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'age_culture_name'
          }],
          'unit': 'Ages Determinations',
          'position': 30,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'age_culture_name'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Halaf culture']
        },
        'biostrat_zone': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'biostrat_zone'
          }],
          'unit': 'Ages Determinations',
          'position': 25,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'biostrat_zone'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['NN10', 'Wasatchian']
        },
        'er_expedition_name': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'er_expedition_name'
          }],
          'unit': 'Ages Determinations',
          'position': 0,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'er_expedition_name'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['AVON02MV']
        },
        'age_unit': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'age_unit'
          }],
          'unit': 'Ages Determinations',
          'position': 19,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'age_unit'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Ma', 'Ka', 'Ga', 'Years BP', 'Years AD (+/-)', 'Years Cal BP', 'Years Cal AD (+/-)']
        },
        'tiepoint_type': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'tiepoint_type'
          }],
          'unit': 'Ages Determinations',
          'position': 14,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'tiepoint_type'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Fossil Layer', 'Volcanic Tuff', 'Basalt Flow', 'Magnetic Anomaly']
        },
        'er_formation_name': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'er_formation_name'
          }],
          'unit': 'Ages Determinations',
          'position': 2,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'er_formation_name'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Bluebird Formation']
        },
        'magnetic_reversal_chron': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'magnetic_reversal_chron'
          }],
          'unit': 'Ages Determinations',
          'position': 27,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'magnetic_reversal_chron'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['C5n', 'C5n.2n']
        },
        'age_range_high': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'age_range_high'
          }],
          'unit': 'Ages Determinations',
          'position': 18,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'age_range_high'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations'
        },
        'er_site_name': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'er_site_name'
          }],
          'unit': 'Ages Determinations',
          'position': 4,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'er_site_name'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Bas123a']
        },
        'er_citation_names': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'er_citation_names'
          }],
          'unit': 'Ages Determinations',
          'position': 34,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'er_citation_names'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'er_timescale_citation_names': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'er_timescale_citation_names'
          }],
          'unit': 'Ages Determinations',
          'position': 33,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'er_timescale_citation_names'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Harland et al. 1993', 'Cande & Kent 1992', 'This study']
        },
        'er_sample_name': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'er_sample_name'
          }],
          'unit': 'Ages Determinations',
          'position': 5,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'er_sample_name'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Bas123a-01']
        },
        'er_specimen_name': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'er_specimen_name'
          }],
          'unit': 'Ages Determinations',
          'position': 6,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'er_specimen_name'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Bas123a-01x']
        },
        'tiepoint_height_sigma': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'tiepoint_height_sigma'
          }],
          'unit': 'Ages Determinations',
          'position': 12,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'tiepoint_height_sigma'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Uncertainty = 1xSD']
        },
        'conodont_zone': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'conodont_zone'
          }],
          'unit': 'Ages Determinations',
          'position': 26,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'conodont_zone'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['B. Triangularis']
        },
        'age': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'age'
          }],
          'unit': 'Ages Determinations',
          'position': 15,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'age'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Preferred age']
        },
        'timescale_epoch': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'timescale_epoch'
          }],
          'unit': 'Ages Determinations',
          'position': 23,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'timescale_epoch'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Late Triassic', 'Early Cretaceous', 'Eocene', 'Miocene', 'Pleistocene']
        },
        'er_mineral_name': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'er_mineral_name'
          }],
          'unit': 'Ages Determinations',
          'position': 8,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'er_mineral_name'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['San03-001']
        },
        'tiepoint_elevation': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'tiepoint_elevation'
          }],
          'unit': 'Ages Determinations',
          'position': 13,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'tiepoint_elevation'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Meters above sealevel']
        },
        'timescale_eon': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'timescale_eon'
          }],
          'unit': 'Ages Determinations',
          'position': 20,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'timescale_eon'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Phanerozoic', 'Proterozoic', 'Archean']
        },
        'er_fossil_name': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'er_fossil_name'
          }],
          'unit': 'Ages Determinations',
          'position': 7,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'er_fossil_name'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['AMM43-03']
        },
        'er_location_name': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'er_location_name'
          }],
          'unit': 'Ages Determinations',
          'position': 1,
          'previous_columns': [{
            'table': 'er_ages',
            'column': 'er_location_name'
          }],
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801']
        }
      },
      'label': 'Ages Determinations',
      'description': 'Ages for discrete samples or horizons in stratigraphic sections or cores'
    },
    'pmag_sites': {
      'position': 22,
      'columns': {
        'er_member_name': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'er_member_name'
          }],
          'unit': 'Site Data',
          'position': 3,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'er_member_name'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Glasshound Member']
        },
        'er_sample_names': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'er_sample_names'
          }],
          'unit': 'Site Data',
          'position': 5,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'er_sample_names'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Bas123a-01', 'Bas123a-04', 'Bas123a-19']
        },
        'site_n': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_n'
          }],
          'unit': 'Site Data',
          'position': 29,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_n'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'site_int_sigma': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_int_sigma'
          }],
          'unit': 'Site Data',
          'position': 36,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_int_sigma'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'magic_method_codes': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'magic_method_codes'
          }],
          'unit': 'Site Data',
          'position': 50,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'magic_method_codes'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'site_r': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_r'
          }],
          'unit': 'Site Data',
          'position': 33,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_r'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'site_inferred_age_sigma': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_inferred_age_sigma'
          }],
          'unit': 'Site Data',
          'position': 21,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_inferred_age_sigma'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'site_description': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_description'
          }],
          'unit': 'Site Data',
          'position': 45,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_description'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'er_fossil_names': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'er_fossil_names'
          }],
          'unit': 'Site Data',
          'position': 7,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'er_fossil_names'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['AMM43-03', 'AMM43-19']
        },
        'site_int_rel': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_int_rel'
          }],
          'unit': 'Site Data',
          'position': 38,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_int_rel'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'compilation_ids': {
          'group': 'Site Data',
          'next_columns': [],
          'unit': 'Site Data',
          'position': 47,
          'previous_columns': [],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['1435', '23', '2329']
        },
        'er_specimen_names': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'er_specimen_names'
          }],
          'unit': 'Site Data',
          'position': 6,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'er_specimen_names'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Bas123a-01x', 'Bas123a-01y']
        },
        'site_sigma': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_sigma'
          }],
          'unit': 'Site Data',
          'position': 27,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_sigma'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'site_int_n': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_int_n'
          }],
          'unit': 'Site Data',
          'position': 41,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_int_n'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'site_inc': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_inc'
          }],
          'unit': 'Site Data',
          'position': 25,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_inc'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'er_mineral_names': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'er_mineral_names'
          }],
          'unit': 'Site Data',
          'position': 8,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'er_mineral_names'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['PLG33a', 'MAGN-MJ-034']
        },
        'site_direction_type': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_direction_type'
          }],
          'unit': 'Site Data',
          'position': 16,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_direction_type'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Default = l']
        },
        'site_comp_nmb': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_comp_nmb'
          }],
          'unit': 'Site Data',
          'position': 17,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_comp_nmb'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'site_nrm': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_nrm'
          }],
          'unit': 'Site Data',
          'position': 15,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_nrm'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Default = p']
        },
        'site_int_sigma_perc': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_int_sigma_perc'
          }],
          'unit': 'Site Data',
          'position': 37,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_int_sigma_perc'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'site_dec': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_dec'
          }],
          'unit': 'Site Data',
          'position': 26,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_dec'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'site_polarity': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_polarity'
          }],
          'unit': 'Site Data',
          'position': 14,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_polarity'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Default = n']
        },
        'site_inferred_age_high': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_inferred_age_high'
          }],
          'unit': 'Site Data',
          'position': 23,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_inferred_age_high'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'site_magn_moment': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_magn_moment'
          }],
          'unit': 'Site Data',
          'position': 42,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_magn_moment'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'er_expedition_name': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'er_expedition_name'
          }],
          'unit': 'Site Data',
          'position': 0,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'er_expedition_name'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['AVON02MV']
        },
        'site_int': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_int'
          }],
          'unit': 'Site Data',
          'position': 35,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_int'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'site_inferred_age_low': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_inferred_age_low'
          }],
          'unit': 'Site Data',
          'position': 22,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_inferred_age_low'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'site_comp_n': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_comp_n'
          }],
          'unit': 'Site Data',
          'position': 18,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_comp_n'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'site_inferred_age': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_inferred_age'
          }],
          'unit': 'Site Data',
          'position': 20,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_inferred_age'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'site_int_rel_sigma_perc': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_int_rel_sigma_perc'
          }],
          'unit': 'Site Data',
          'position': 40,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_int_rel_sigma_perc'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'measurement_step_unit': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'measurement_step_unit'
          }],
          'unit': 'Site Data',
          'position': 13,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'measurement_step_unit'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'site_n_planes': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_n_planes'
          }],
          'unit': 'Site Data',
          'position': 31,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_n_planes'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'site_alpha95': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_alpha95'
          }],
          'unit': 'Site Data',
          'position': 28,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_alpha95'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Confidence Level = 95%']
        },
        'er_formation_name': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'er_formation_name'
          }],
          'unit': 'Site Data',
          'position': 2,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'er_formation_name'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Bluebird Formation']
        },
        'er_analyst_mail_names': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'er_analyst_mail_names'
          }],
          'unit': 'Site Data',
          'position': 52,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'er_analyst_mail_names'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'site_magn_mass': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_magn_mass'
          }],
          'unit': 'Site Data',
          'position': 44,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_magn_mass'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'er_synthetic_names': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'er_synthetic_names'
          }],
          'unit': 'Site Data',
          'position': 9,
          'previous_columns': [],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['STD1546-A1', 'STD1546-X23']
        },
        'magic_experiment_names': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'magic_experiment_names'
          }],
          'unit': 'Site Data',
          'position': 10,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'magic_experiment_names'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['KOPA-299-1', 'KOPA-299-2', 'KOPA-299-6']
        },
        'measurement_step_min': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'measurement_step_min'
          }],
          'unit': 'Site Data',
          'position': 11,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'measurement_step_min'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'er_site_name': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'er_site_name'
          }],
          'unit': 'Site Data',
          'position': 4,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'er_site_name'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Bas123a']
        },
        'compilation_names': {
          'group': 'Site Data',
          'next_columns': [],
          'unit': 'Site Data',
          'position': 46,
          'previous_columns': [],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['GEOMAGIA', 'CALS7', 'ARCHEO00']
        },
        'er_citation_names': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'er_citation_names'
          }],
          'unit': 'Site Data',
          'position': 53,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'er_citation_names'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'pmag_rotation_codes': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'pmag_rotation_codes'
          }],
          'unit': 'Site Data',
          'position': 49,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'pmag_rotation_codes'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['MY-TILT1', 'MY-TILT2', 'MY-TRANS1']
        },
        'site_inferred_age_unit': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_inferred_age_unit'
          }],
          'unit': 'Site Data',
          'position': 24,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_inferred_age_unit'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Ma', 'Ka', 'Ga', 'Years BP', 'Years AD (+/-)', 'Years Cal BP', 'Years Cal AD (+/-)']
        },
        'site_comp_name': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_comp_name'
          }],
          'unit': 'Site Data',
          'position': 19,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_comp_name'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Characteristic', 'VRM', 'Overprint', 'A', 'B', 'C']
        },
        'measurement_step_max': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'measurement_step_max'
          }],
          'unit': 'Site Data',
          'position': 12,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'measurement_step_max'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'magic_instrument_codes': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'magic_instrument_codes'
          }],
          'unit': 'Site Data',
          'position': 51,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'magic_instrument_codes'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['SIO-Bubba', 'IRM-OldBlue']
        },
        'pmag_criteria_codes': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'pmag_criteria_codes'
          }],
          'unit': 'Site Data',
          'position': 48,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'pmag_criteria_codes'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['MY-MAD', 'MY-APLHA95']
        },
        'site_magn_volume': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_magn_volume'
          }],
          'unit': 'Site Data',
          'position': 43,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_magn_volume'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'site_k': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_k'
          }],
          'unit': 'Site Data',
          'position': 32,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_k'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'site_tilt_correction': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_tilt_correction'
          }],
          'unit': 'Site Data',
          'position': 34,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_tilt_correction'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Correction between geographic (0%) and stratigraphic (100%); unoriented (-1%); partially oriented to horizontal only (-2%)']
        },
        'site_n_lines': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_n_lines'
          }],
          'unit': 'Site Data',
          'position': 30,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_n_lines'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'site_int_rel_sigma': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_int_rel_sigma'
          }],
          'unit': 'Site Data',
          'position': 39,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'site_int_rel_sigma'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'er_location_name': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'er_location_name'
          }],
          'unit': 'Site Data',
          'position': 1,
          'previous_columns': [{
            'table': 'pmag_sites',
            'column': 'er_location_name'
          }],
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801']
        }
      },
      'label': 'Site Data',
      'description': 'Unique rock unit in terms of magnetization and geological age'
    },
    'rmag_susceptibility': {
      'position': 26,
      'columns': {
        'er_member_name': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_member_name'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 3,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_member_name'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['Glasshound Member']
        },
        'susceptibility_h_high': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_h_high'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 18,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_h_high'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments'
        },
        'magic_method_codes': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'magic_method_codes'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 24,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'magic_method_codes'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'compilation_ids': {
          'group': 'Susceptibility Experiments',
          'next_columns': [],
          'unit': 'Susceptibility Experiments',
          'position': 22,
          'previous_columns': [],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['1435', '23', '2329']
        },
        'susceptibility_h_low': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_h_low'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 17,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_h_low'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments'
        },
        'susceptibility_loss_tangent': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_loss_tangent'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 19,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_loss_tangent'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments'
        },
        'rmag_criteria_codes': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'rmag_criteria_codes'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 23,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'rmag_criteria_codes'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['MY-MAD', 'MY-APLHA95']
        },
        'susceptibility_chi_mass': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_chi_mass'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 12,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_chi_mass'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments'
        },
        'susceptibility_description': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_description'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 20,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_description'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments'
        },
        'susceptibility_f': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_f'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 13,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_f'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments'
        },
        'er_synthetic_name': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_synthetic_name'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 9,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_synthetic_name'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['STD1546-A1']
        },
        'er_expedition_name': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_expedition_name'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 0,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_expedition_name'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['AVON02MV']
        },
        'susceptibility_chi_volume': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_chi_volume'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 11,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_chi_volume'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments'
        },
        'er_formation_name': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_formation_name'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 2,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_formation_name'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['Bluebird Formation']
        },
        'susceptibility_f_low': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_f_low'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 14,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_f_low'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments'
        },
        'er_analyst_mail_names': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_analyst_mail_names'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 26,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_analyst_mail_names'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'magic_experiment_names': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'magic_experiment_names'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 10,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'magic_experiment_names'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['KOPA-299-1', 'KOPA-299-2', 'KOPA-299-6']
        },
        'susceptibility_f_high': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_f_high'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 15,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_f_high'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments'
        },
        'er_site_name': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_site_name'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 4,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_site_name'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['Bas123a']
        },
        'compilation_names': {
          'group': 'Susceptibility Experiments',
          'next_columns': [],
          'unit': 'Susceptibility Experiments',
          'position': 21,
          'previous_columns': [],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['GEOMAGIA', 'CALS7', 'ARCHEO00']
        },
        'er_citation_names': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_citation_names'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 27,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_citation_names'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'er_sample_name': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_sample_name'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 5,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_sample_name'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['Bas123a-01']
        },
        'er_specimen_name': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_specimen_name'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 6,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_specimen_name'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['Bas123a-01x']
        },
        'susceptibility_h': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_h'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 16,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_h'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments'
        },
        'magic_instrument_codes': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'magic_instrument_codes'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 25,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'magic_instrument_codes'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['SIO-Bubba', 'IRM-OldBlue']
        },
        'er_mineral_name': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_mineral_name'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 8,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_mineral_name'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['San03-001']
        },
        'er_fossil_name': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_fossil_name'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 7,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_fossil_name'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['AMM43-03']
        },
        'er_location_name': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_location_name'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 1,
          'previous_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_location_name'
          }],
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801']
        }
      },
      'label': 'Susceptibility Experiments',
      'description': 'Experiment for susceptibility parameters'
    },
    'er_fossils': {
      'position': 9,
      'columns': {
        'er_member_name': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'er_member_name'
          }],
          'unit': 'Fossils',
          'position': 5,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'er_member_name'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['Glasshound Member']
        },
        'magic_method_codes': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'magic_method_codes'
          }],
          'unit': 'Fossils',
          'position': 25,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'magic_method_codes'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'fossil_density': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_density'
          }],
          'unit': 'Fossils',
          'position': 22,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_density'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils'
        },
        'er_scientist_mail_names': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'er_scientist_mail_names'
          }],
          'unit': 'Fossils',
          'position': 26,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'er_scientist_mail_names'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'fossil_igsn': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_igsn'
          }],
          'unit': 'Fossils',
          'position': 23,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_igsn'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['SIO0A0987', 'SIO001317']
        },
        'fossil_class': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_class'
          }],
          'unit': 'Fossils',
          'position': 10,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_class'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['Branchiopoda', 'Calcarea', 'Camptostromoidea']
        },
        'fossil_description': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_description'
          }],
          'unit': 'Fossils',
          'position': 24,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_description'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils'
        },
        'fossil_volume': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_volume'
          }],
          'unit': 'Fossils',
          'position': 20,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_volume'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils'
        },
        'fossil_family': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_family'
          }],
          'unit': 'Fossils',
          'position': 12,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_family'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['Aceraceae', 'Mucoraceae']
        },
        'fossil_weight': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_weight'
          }],
          'unit': 'Fossils',
          'position': 21,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_weight'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils'
        },
        'fossil_genus': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_genus'
          }],
          'unit': 'Fossils',
          'position': 13,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_genus'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['Acer', 'Canis', 'Rhizopus']
        },
        'er_expedition_name': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'er_expedition_name'
          }],
          'unit': 'Fossils',
          'position': 2,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'er_expedition_name'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['AVON02MV']
        },
        'fossil_shape': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_shape'
          }],
          'unit': 'Fossils',
          'position': 19,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_shape'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils'
        },
        'er_formation_name': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'er_formation_name'
          }],
          'unit': 'Fossils',
          'position': 4,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'er_formation_name'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['Bluebird Formation']
        },
        'fossil_alteration_type': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_alteration_type'
          }],
          'unit': 'Fossils',
          'position': 18,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_alteration_type'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['Hydrothermal', 'Diagenetic', 'Weathering', 'Oxidation', 'Metamorphic']
        },
        'er_fossil_alternatives': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'er_fossil_alternatives'
          }],
          'unit': 'Fossils',
          'position': 1,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'er_fossil_alternatives'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils'
        },
        'fossil_preservation': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_preservation'
          }],
          'unit': 'Fossils',
          'position': 15,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_preservation'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['Pristine', 'Altered']
        },
        'fossil_phylum': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_phylum'
          }],
          'unit': 'Fossils',
          'position': 9,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_phylum'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['Chordata', 'Magnoliophyta', 'Zygomycota', 'Firmicutes', 'Chlorophyta']
        },
        'fossil_species': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_species'
          }],
          'unit': 'Fossils',
          'position': 14,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_species'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['A. Saccharum', 'R. Stolonifer']
        },
        'er_site_name': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'er_site_name'
          }],
          'unit': 'Fossils',
          'position': 6,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'er_site_name'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['Bas123a']
        },
        'er_citation_names': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'er_citation_names'
          }],
          'unit': 'Fossils',
          'position': 27,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'er_citation_names'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'er_sample_name': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'er_sample_name'
          }],
          'unit': 'Fossils',
          'position': 7,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'er_sample_name'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['Bas123a-01']
        },
        'fossil_alteration': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_alteration'
          }],
          'unit': 'Fossils',
          'position': 17,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_alteration'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['Severe', 'High', 'Mild', 'Trace', 'Unaltered']
        },
        'er_specimen_name': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'er_specimen_name'
          }],
          'unit': 'Fossils',
          'position': 8,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'er_specimen_name'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['Bas123a-01x']
        },
        'fossil_texture': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_texture'
          }],
          'unit': 'Fossils',
          'position': 16,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_texture'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['Crystalline', 'Porous', 'Homogeneous']
        },
        'fossil_order': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_order'
          }],
          'unit': 'Fossils',
          'position': 11,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_order'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['Alcyonida', 'Strophomenida', 'Thecideida']
        },
        'er_fossil_name': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'er_fossil_name'
          }],
          'unit': 'Fossils',
          'position': 0,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'er_fossil_name'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['AMM43-03']
        },
        'er_location_name': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'er_location_name'
          }],
          'unit': 'Fossils',
          'position': 3,
          'previous_columns': [{
            'table': 'er_fossils',
            'column': 'er_location_name'
          }],
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801']
        }
      },
      'label': 'Fossils',
      'description': 'Taxon or fossil'
    },
    'pmag_results': {
      'position': 23,
      'columns': {
        'average_nn': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_nn'
          }],
          'unit': 'Results',
          'position': 31,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_nn'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'er_sample_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'er_sample_names'
          }],
          'unit': 'Results',
          'position': 3,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'er_sample_names'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Bas123a-01', 'Bas123a-04', 'Bas123a-19']
        },
        'average_int': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_int'
          }],
          'unit': 'Results',
          'position': 34,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_int'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'average_age': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_age'
          }],
          'unit': 'Results',
          'position': 21,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_age'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'reversed_alpha95': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'reversed_alpha95'
          }],
          'unit': 'Results',
          'position': 92,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'reversed_alpha95'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Confidence Level = 95%']
        },
        'magic_method_codes': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'magic_method_codes'
          }],
          'unit': 'Results',
          'position': 98,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'magic_method_codes'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'tilt_inc_corr': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_inc_corr'
          }],
          'unit': 'Results',
          'position': 68,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_inc_corr'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'tilt_alpha95_uncorr': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_alpha95_uncorr'
          }],
          'unit': 'Results',
          'position': 75,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_alpha95_uncorr'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Confidence Level = 95%']
        },
        'vdm': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'vdm'
          }],
          'unit': 'Results',
          'position': 59,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'vdm'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'data_type': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'data_type'
          }],
          'unit': 'Results',
          'position': 9,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'data_type'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Default = i']
        },
        'tilt_k_ratio': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_k_ratio'
          }],
          'unit': 'Results',
          'position': 66,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_k_ratio'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'average_alpha95': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_alpha95'
          }],
          'unit': 'Results',
          'position': 29,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_alpha95'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Confidence Level = 95%']
        },
        'average_int_rel_sigma_perc': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_int_rel_sigma_perc'
          }],
          'unit': 'Results',
          'position': 39,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_int_rel_sigma_perc'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Uncertainty = 1xSD']
        },
        'model_lon_sigma': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'model_lon_sigma'
          }],
          'unit': 'Results',
          'position': 51,
          'previous_columns': [],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Uncertainty = 1xSD']
        },
        'fold_test_significance': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'fold_test_significance'
          }],
          'unit': 'Results',
          'position': 76,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'fold_test_significance'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'antipodal': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'antipodal'
          }],
          'unit': 'Results',
          'position': 78,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'antipodal'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between 0 and 180']
        },
        'reversed_lat': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'reversed_lat'
          }],
          'unit': 'Results',
          'position': 86,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'reversed_lat'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'eta_inc': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'eta_inc'
          }],
          'unit': 'Results',
          'position': 42,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'eta_inc'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'er_fossil_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'er_fossil_names'
          }],
          'unit': 'Results',
          'position': 5,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'er_fossil_names'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['AMM43-03', 'AMM43-19']
        },
        'tilt_k_uncorr': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_k_uncorr'
          }],
          'unit': 'Results',
          'position': 74,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_k_uncorr'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'compilation_ids': {
          'group': 'Results',
          'next_columns': [],
          'unit': 'Results',
          'position': 95,
          'previous_columns': [],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['1435', '23', '2329']
        },
        'er_specimen_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'er_specimen_names'
          }],
          'unit': 'Results',
          'position': 4,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'er_specimen_names'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Bas123a-01x', 'Bas123a-01y']
        },
        'average_sigma': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_sigma'
          }],
          'unit': 'Results',
          'position': 28,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_sigma'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Uncertainty = 1xSD']
        },
        'average_age_sigma': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_age_sigma'
          }],
          'unit': 'Results',
          'position': 22,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_age_sigma'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Uncertainty = 1xSD']
        },
        'contact_test': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'contact_test'
          }],
          'unit': 'Results',
          'position': 12,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'contact_test'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['C+', 'IC+', '+ (pos)', 'Co', 'ICo', 'o (indeterminate)', 'C-', 'IC-', '- (neg)', 'ND (not done)']
        },
        'normal_lon': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'normal_lon'
          }],
          'unit': 'Results',
          'position': 80,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'normal_lon'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'average_int_rel': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_int_rel'
          }],
          'unit': 'Results',
          'position': 37,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_int_rel'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'eta_semi_angle': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'eta_semi_angle'
          }],
          'unit': 'Results',
          'position': 44,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'eta_semi_angle'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Confidence Level = 95%']
        },
        'vadm_sigma': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'vadm_sigma'
          }],
          'unit': 'Results',
          'position': 63,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'vadm_sigma'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Uncertainty = 1xSD']
        },
        'average_height': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_height'
          }],
          'unit': 'Results',
          'position': 20,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_height'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Positive is up in section or core', 'negative is down']
        },
        'vdm_sigma': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'vdm_sigma'
          }],
          'unit': 'Results',
          'position': 60,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'vdm_sigma'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Uncertainty = 1xSD']
        },
        'average_int_sigma': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_int_sigma'
          }],
          'unit': 'Results',
          'position': 35,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_int_sigma'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Uncertainty = 1xSD']
        },
        'zeta_semi_angle': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'zeta_semi_angle'
          }],
          'unit': 'Results',
          'position': 47,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'zeta_semi_angle'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Confidence Level = 95%']
        },
        'er_mineral_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'er_mineral_names'
          }],
          'unit': 'Results',
          'position': 6,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'er_mineral_names'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['PLG33a', 'MAGN-MJ-034']
        },
        'vgp_lat': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'vgp_lat'
          }],
          'unit': 'Results',
          'position': 52,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'vgp_lat'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'normal_k': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'normal_k'
          }],
          'unit': 'Results',
          'position': 84,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'normal_k'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'average_lon': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_lon'
          }],
          'unit': 'Results',
          'position': 18,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_lon'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'zeta_inc': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'zeta_inc'
          }],
          'unit': 'Results',
          'position': 45,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'zeta_inc'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'tilt_alpha95_corr': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_alpha95_corr'
          }],
          'unit': 'Results',
          'position': 71,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_alpha95_corr'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Confidence Level = 95%']
        },
        'average_age_low': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_age_low'
          }],
          'unit': 'Results',
          'position': 23,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_age_low'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'model_lat_sigma': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'model_lat_sigma'
          }],
          'unit': 'Results',
          'position': 49,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'model_lat_sigma'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Uncertainty = 1xSD']
        },
        'normal_alpha95': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'normal_alpha95'
          }],
          'unit': 'Results',
          'position': 85,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'normal_alpha95'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Confidence Level = 95%']
        },
        'tilt_dec_corr': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_dec_corr'
          }],
          'unit': 'Results',
          'position': 69,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_dec_corr'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'percent_reversed': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'percent_reversed'
          }],
          'unit': 'Results',
          'position': 77,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'percent_reversed'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['200 indicates \'mixed\' polarity and negative numbers indicate \'unknown\' polarity']
        },
        'vgp_alpha95': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'vgp_alpha95'
          }],
          'unit': 'Results',
          'position': 57,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'vgp_alpha95'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Confidence Level = 95%']
        },
        'tilt_k_corr': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_k_corr'
          }],
          'unit': 'Results',
          'position': 70,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_k_corr'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'fold_test': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'fold_test'
          }],
          'unit': 'Results',
          'position': 10,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'fold_test'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['F+', 'SF+', 'RF+', '+ (pos)', 'Fo', 'SFo', 'RFo', 'o (indeterminate)', 'F-', 'SF-', 'RF-', '- (neg)', 'ND (not done) ']
        },
        'reversed_n': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'reversed_n'
          }],
          'unit': 'Results',
          'position': 90,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'reversed_n'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'result_description': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'result_description'
          }],
          'unit': 'Results',
          'position': 93,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'result_description'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'average_k': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_k'
          }],
          'unit': 'Results',
          'position': 32,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_k'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'vgp_lon': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'vgp_lon'
          }],
          'unit': 'Results',
          'position': 53,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'vgp_lon'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'average_age_unit': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_age_unit'
          }],
          'unit': 'Results',
          'position': 25,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_age_unit'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Ma', 'Ka', 'Ga', 'Years BP', 'Years AD (+/-)', 'Years Cal BP', 'Years Cal AD (+/-)']
        },
        'model_lat': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'model_lat'
          }],
          'unit': 'Results',
          'position': 48,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'model_lat'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'tilt_dec_uncorr': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_dec_uncorr'
          }],
          'unit': 'Results',
          'position': 73,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_dec_uncorr'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'normal_n': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'normal_n'
          }],
          'unit': 'Results',
          'position': 83,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'normal_n'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'average_int_nn': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_int_nn'
          }],
          'unit': 'Results',
          'position': 41,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_int_nn'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'normal_lat': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'normal_lat'
          }],
          'unit': 'Results',
          'position': 79,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'normal_lat'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'reversed_lon': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'reversed_lon'
          }],
          'unit': 'Results',
          'position': 87,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'reversed_lon'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'model_lon': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'model_lon'
          }],
          'unit': 'Results',
          'position': 50,
          'previous_columns': [],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'vdm_n': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'vdm_n'
          }],
          'unit': 'Results',
          'position': 61,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'vdm_n'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'average_inc': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_inc'
          }],
          'unit': 'Results',
          'position': 26,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_inc'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'tilt_inc_uncorr': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_inc_uncorr'
          }],
          'unit': 'Results',
          'position': 72,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_inc_uncorr'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'reversed_inc': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'reversed_inc'
          }],
          'unit': 'Results',
          'position': 88,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'reversed_inc'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'average_int_n': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_int_n'
          }],
          'unit': 'Results',
          'position': 40,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_int_n'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'average_int_sigma_perc': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_int_sigma_perc'
          }],
          'unit': 'Results',
          'position': 36,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_int_sigma_perc'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Uncertainty = 1xSD']
        },
        'average_age_high': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_age_high'
          }],
          'unit': 'Results',
          'position': 24,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_age_high'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'eta_dec': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'eta_dec'
          }],
          'unit': 'Results',
          'position': 43,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'eta_dec'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'average_int_rel_sigma': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_int_rel_sigma'
          }],
          'unit': 'Results',
          'position': 38,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_int_rel_sigma'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Uncertainty = 1xSD']
        },
        'er_analyst_mail_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'er_analyst_mail_names'
          }],
          'unit': 'Results',
          'position': 99,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'er_analyst_mail_names'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'average_lat_sigma': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_lat_sigma'
          }],
          'unit': 'Results',
          'position': 17,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_lat_sigma'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Uncertainty = 1xSD']
        },
        'pmag_result_name': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'pmag_result_name'
          }],
          'unit': 'Results',
          'position': 0,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'pmag_result_name'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['MY-POLE-XX']
        },
        'er_synthetic_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'er_synthetic_names'
          }],
          'unit': 'Results',
          'position': 7,
          'previous_columns': [],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['STD1546-A1', 'STD1546-X23']
        },
        'tilt_n': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_n'
          }],
          'unit': 'Results',
          'position': 67,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_n'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'vadm': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'vadm'
          }],
          'unit': 'Results',
          'position': 62,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'vadm'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'magic_experiment_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'magic_experiment_names'
          }],
          'unit': 'Results',
          'position': 8,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'magic_experiment_names'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['KOPA-299-1', 'KOPA-299-2', 'KOPA-299-6']
        },
        'average_lon_sigma': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_lon_sigma'
          }],
          'unit': 'Results',
          'position': 19,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_lon_sigma'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Uncertainty = 1xSD']
        },
        'compilation_names': {
          'group': 'Results',
          'next_columns': [],
          'unit': 'Results',
          'position': 94,
          'previous_columns': [],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['GEOMAGIA', 'CALS7', 'ARCHEO00']
        },
        'er_citation_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'er_citation_names'
          }],
          'unit': 'Results',
          'position': 100,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'er_citation_names'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'tilt_correction': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_correction'
          }],
          'unit': 'Results',
          'position': 65,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_correction'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Correction between geographic (0%) and stratigraphic (100%); unoriented (-1%); partially oriented to horizontal only (-2%)']
        },
        'reversed_dec': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'reversed_dec'
          }],
          'unit': 'Results',
          'position': 89,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'reversed_dec'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'vgp_dp': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'vgp_dp'
          }],
          'unit': 'Results',
          'position': 54,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'vgp_dp'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Uncertainty = 1xSD']
        },
        'pmag_rotation_codes': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'pmag_rotation_codes'
          }],
          'unit': 'Results',
          'position': 97,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'pmag_rotation_codes'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['MY-TILT1', 'MY-TILT2', 'MY-TRANS1']
        },
        'vgp_n': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'vgp_n'
          }],
          'unit': 'Results',
          'position': 58,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'vgp_n'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'vgp_sigma': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'vgp_sigma'
          }],
          'unit': 'Results',
          'position': 56,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'vgp_sigma'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Uncertainty = 1xSD']
        },
        'average_n': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_n'
          }],
          'unit': 'Results',
          'position': 30,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_n'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'er_site_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'er_site_names'
          }],
          'unit': 'Results',
          'position': 2,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'er_site_names'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Bas123a', 'Bas156z', 'Bas445c']
        },
        'average_dec': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_dec'
          }],
          'unit': 'Results',
          'position': 27,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_dec'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'zeta_dec': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'zeta_dec'
          }],
          'unit': 'Results',
          'position': 46,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'zeta_dec'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'normal_inc': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'normal_inc'
          }],
          'unit': 'Results',
          'position': 81,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'normal_inc'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'vadm_n': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'vadm_n'
          }],
          'unit': 'Results',
          'position': 64,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'vadm_n'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'conglomerate_test': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'conglomerate_test'
          }],
          'unit': 'Results',
          'position': 11,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'conglomerate_test'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['G+', 'IG+', '+ (pos)', 'Go', 'IGo', 'o (indeterminate)', 'G-', 'IG-', '- (neg)', 'ND (not done)']
        },
        'pmag_criteria_codes': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'pmag_criteria_codes'
          }],
          'unit': 'Results',
          'position': 96,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'pmag_criteria_codes'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['MY-MAD', 'MY-APLHA95']
        },
        'reversed_k': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'reversed_k'
          }],
          'unit': 'Results',
          'position': 91,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'reversed_k'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'average_lat': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_lat'
          }],
          'unit': 'Results',
          'position': 16,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_lat'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'reversal_test': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'reversal_test'
          }],
          'unit': 'Results',
          'position': 13,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'reversal_test'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Ra', 'Rb', 'Rc', '+ (pos)', 'Ro', 'o (indeterminate)', 'R-', '- (neg)', 'ND (not done)']
        },
        'pole_comp_name': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'pole_comp_name'
          }],
          'unit': 'Results',
          'position': 15,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'pole_comp_name'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Characteristic', 'VRM', 'Overprint', 'A', 'B', 'C']
        },
        'er_location_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'er_location_names'
          }],
          'unit': 'Results',
          'position': 1,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'er_location_names'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Site 801', 'Site 1129', 'Dredge AMAT02-D15']
        },
        'vgp_dm': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'vgp_dm'
          }],
          'unit': 'Results',
          'position': 55,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'vgp_dm'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Uncertainty = 1xSD']
        },
        'normal_dec': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'normal_dec'
          }],
          'unit': 'Results',
          'position': 82,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'normal_dec'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'average_r': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_r'
          }],
          'unit': 'Results',
          'position': 33,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'average_r'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'rock_magnetic_test': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'rock_magnetic_test'
          }],
          'unit': 'Results',
          'position': 14,
          'previous_columns': [{
            'table': 'pmag_results',
            'column': 'rock_magnetic_test'
          }],
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['M (done)', 'ND (not done)']
        }
      },
      'label': 'Results',
      'description': 'Summary results and highly derived data products (stacks, poles, etc)'
    },
    'pmag_criteria': {
      'position': 25,
      'columns': {
        'average_nn': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_nn'
          }],
          'unit': 'Selection Criteria',
          'position': 84,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_nn'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'specimen_g': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_g'
          }],
          'unit': 'Selection Criteria',
          'position': 25,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_g'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'site_n': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_n'
          }],
          'unit': 'Selection Criteria',
          'position': 63,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_n'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'site_int_sigma': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_int_sigma'
          }],
          'unit': 'Selection Criteria',
          'position': 69,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_int_sigma'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'specimen_int_rel_sigma_perc': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_int_rel_sigma_perc'
          }],
          'unit': 'Selection Criteria',
          'position': 16,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_int_rel_sigma_perc'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'specimen_f': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_f'
          }],
          'unit': 'Selection Criteria',
          'position': 21,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_f'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'site_r': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_r'
          }],
          'unit': 'Selection Criteria',
          'position': 67,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_r'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'sample_magn_volume': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_magn_volume'
          }],
          'unit': 'Selection Criteria',
          'position': 55,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_magn_volume'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'specimen_int_sigma_perc': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_int_sigma_perc'
          }],
          'unit': 'Selection Criteria',
          'position': 14,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_int_sigma_perc'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'average_alpha95': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_alpha95'
          }],
          'unit': 'Selection Criteria',
          'position': 82,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_alpha95'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Confidence Level = 95%']
        },
        'average_int_rel_sigma_perc': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_int_rel_sigma_perc'
          }],
          'unit': 'Selection Criteria',
          'position': 89,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_int_rel_sigma_perc'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'sample_sigma': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_sigma'
          }],
          'unit': 'Selection Criteria',
          'position': 41,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_sigma'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'average_age_max': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_age_max'
          }],
          'unit': 'Selection Criteria',
          'position': 78,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_age_max'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum']
        },
        'specimen_b_sigma': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_b_sigma'
          }],
          'unit': 'Selection Criteria',
          'position': 23,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_b_sigma'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'average_sigma': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_sigma'
          }],
          'unit': 'Selection Criteria',
          'position': 81,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_sigma'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'site_sigma': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_sigma'
          }],
          'unit': 'Selection Criteria',
          'position': 61,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_sigma'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'average_age_sigma': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_age_sigma'
          }],
          'unit': 'Selection Criteria',
          'position': 79,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_age_sigma'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'specimen_drat': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_drat'
          }],
          'unit': 'Selection Criteria',
          'position': 29,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_drat'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum']
        },
        'specimen_q': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_q'
          }],
          'unit': 'Selection Criteria',
          'position': 20,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_q'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'specimen_md': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_md'
          }],
          'unit': 'Selection Criteria',
          'position': 27,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_md'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum']
        },
        'site_int_n': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_int_n'
          }],
          'unit': 'Selection Criteria',
          'position': 73,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_int_n'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'vadm_sigma': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'vadm_sigma'
          }],
          'unit': 'Selection Criteria',
          'position': 99,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'vadm_sigma'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'sample_int_sigma': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_int_sigma'
          }],
          'unit': 'Selection Criteria',
          'position': 49,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_int_sigma'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'vdm_sigma': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'vdm_sigma'
          }],
          'unit': 'Selection Criteria',
          'position': 97,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'vdm_sigma'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'average_int_sigma': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_int_sigma'
          }],
          'unit': 'Selection Criteria',
          'position': 87,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_int_sigma'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'sample_magn_mass': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_magn_mass'
          }],
          'unit': 'Selection Criteria',
          'position': 56,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_magn_mass'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'site_direction_type': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_direction_type'
          }],
          'unit': 'Selection Criteria',
          'position': 59,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_direction_type'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'average_age_min': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_age_min'
          }],
          'unit': 'Selection Criteria',
          'position': 77,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_age_min'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'specimen_mad': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_mad'
          }],
          'unit': 'Selection Criteria',
          'position': 10,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_mad'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum']
        },
        'sample_polarity': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_polarity'
          }],
          'unit': 'Selection Criteria',
          'position': 37,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_polarity'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'site_comp_nmb': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_comp_nmb'
          }],
          'unit': 'Selection Criteria',
          'position': 60,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_comp_nmb'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'specimen_alpha95': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_alpha95'
          }],
          'unit': 'Selection Criteria',
          'position': 11,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_alpha95'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Confidence Level = 95%']
        },
        'sample_comp_nmb': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_comp_nmb'
          }],
          'unit': 'Selection Criteria',
          'position': 40,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_comp_nmb'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'sample_int_rel_sigma': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_int_rel_sigma'
          }],
          'unit': 'Selection Criteria',
          'position': 51,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_int_rel_sigma'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'site_nrm': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_nrm'
          }],
          'unit': 'Selection Criteria',
          'position': 58,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_nrm'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'specimen_ptrm': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_ptrm'
          }],
          'unit': 'Selection Criteria',
          'position': 28,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_ptrm'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum']
        },
        'site_int_sigma_perc': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_int_sigma_perc'
          }],
          'unit': 'Selection Criteria',
          'position': 70,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_int_sigma_perc'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'specimen_int_sigma': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_int_sigma'
          }],
          'unit': 'Selection Criteria',
          'position': 13,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_int_sigma'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'specimen_dang': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_dang'
          }],
          'unit': 'Selection Criteria',
          'position': 26,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_dang'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum']
        },
        'specimen_b_beta': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_b_beta'
          }],
          'unit': 'Selection Criteria',
          'position': 24,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_b_beta'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'sample_int_sigma_perc': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_int_sigma_perc'
          }],
          'unit': 'Selection Criteria',
          'position': 50,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_int_sigma_perc'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'vgp_alpha95': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'vgp_alpha95'
          }],
          'unit': 'Selection Criteria',
          'position': 95,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'vgp_alpha95'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Confidence Level = 95%']
        },
        'site_polarity': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_polarity'
          }],
          'unit': 'Selection Criteria',
          'position': 57,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_polarity'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'specimen_n': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_n'
          }],
          'unit': 'Selection Criteria',
          'position': 12,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_n'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'specimen_int_n': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_int_n'
          }],
          'unit': 'Selection Criteria',
          'position': 18,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_int_n'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'sample_k': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_k'
          }],
          'unit': 'Selection Criteria',
          'position': 46,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_k'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'sample_int_rel_sigma_perc': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_int_rel_sigma_perc'
          }],
          'unit': 'Selection Criteria',
          'position': 52,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_int_rel_sigma_perc'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'site_magn_moment': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_magn_moment'
          }],
          'unit': 'Selection Criteria',
          'position': 74,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_magn_moment'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'average_k': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_k'
          }],
          'unit': 'Selection Criteria',
          'position': 85,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_k'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'average_age_unit': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_age_unit'
          }],
          'unit': 'Selection Criteria',
          'position': 80,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_age_unit'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Ma', 'Ka', 'Ga', 'Years BP', 'Years AD (+/-)', 'Years Cal BP', 'Years Cal AD (+/-)']
        },
        'specimen_int_rel_sigma': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_int_rel_sigma'
          }],
          'unit': 'Selection Criteria',
          'position': 15,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_int_rel_sigma'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'sample_nrm': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_nrm'
          }],
          'unit': 'Selection Criteria',
          'position': 38,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_nrm'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'average_int_nn': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_int_nn'
          }],
          'unit': 'Selection Criteria',
          'position': 91,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_int_nn'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'specimen_rsc': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_rsc'
          }],
          'unit': 'Selection Criteria',
          'position': 31,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_rsc'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum']
        },
        'sample_n': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_n'
          }],
          'unit': 'Selection Criteria',
          'position': 43,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_n'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'sample_tilt_correction': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_tilt_correction'
          }],
          'unit': 'Selection Criteria',
          'position': 48,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_tilt_correction'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'specimen_polarity': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_polarity'
          }],
          'unit': 'Selection Criteria',
          'position': 6,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_polarity'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'site_int_rel_sigma_perc': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_int_rel_sigma_perc'
          }],
          'unit': 'Selection Criteria',
          'position': 72,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_int_rel_sigma_perc'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'measurement_step_unit': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'measurement_step_unit'
          }],
          'unit': 'Selection Criteria',
          'position': 5,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'measurement_step_unit'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'vdm_n': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'vdm_n'
          }],
          'unit': 'Selection Criteria',
          'position': 98,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'vdm_n'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'specimen_magn_moment': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_magn_moment'
          }],
          'unit': 'Selection Criteria',
          'position': 33,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_magn_moment'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'site_n_planes': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_n_planes'
          }],
          'unit': 'Selection Criteria',
          'position': 65,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_n_planes'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'specimen_int_mad': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_int_mad'
          }],
          'unit': 'Selection Criteria',
          'position': 17,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_int_mad'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum']
        },
        'site_alpha95': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_alpha95'
          }],
          'unit': 'Selection Criteria',
          'position': 62,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_alpha95'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Confidence Level = 95%']
        },
        'sample_int_n': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_int_n'
          }],
          'unit': 'Selection Criteria',
          'position': 53,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_int_n'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'sample_alpha95': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_alpha95'
          }],
          'unit': 'Selection Criteria',
          'position': 42,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_alpha95'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Confidence Level = 95%']
        },
        'specimen_magn_mass': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_magn_mass'
          }],
          'unit': 'Selection Criteria',
          'position': 35,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_magn_mass'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'specimen_direction_type': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_direction_type'
          }],
          'unit': 'Selection Criteria',
          'position': 8,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_direction_type'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'average_int_n': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_int_n'
          }],
          'unit': 'Selection Criteria',
          'position': 90,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_int_n'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'specimen_viscosity_index': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_viscosity_index'
          }],
          'unit': 'Selection Criteria',
          'position': 32,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_viscosity_index'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum']
        },
        'average_int_rel_sigma': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_int_rel_sigma'
          }],
          'unit': 'Selection Criteria',
          'position': 88,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_int_rel_sigma'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'site_magn_mass': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_magn_mass'
          }],
          'unit': 'Selection Criteria',
          'position': 76,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_magn_mass'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'sample_direction_type': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_direction_type'
          }],
          'unit': 'Selection Criteria',
          'position': 39,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_direction_type'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'specimen_w': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_w'
          }],
          'unit': 'Selection Criteria',
          'position': 19,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_w'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum']
        },
        'specimen_nrm': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_nrm'
          }],
          'unit': 'Selection Criteria',
          'position': 7,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_nrm'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'magic_experiment_names': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'magic_experiment_names'
          }],
          'unit': 'Selection Criteria',
          'position': 2,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'magic_experiment_names'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['KOPA-299-1']
        },
        'sample_n_planes': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_n_planes'
          }],
          'unit': 'Selection Criteria',
          'position': 45,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_n_planes'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'measurement_step_min': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'measurement_step_min'
          }],
          'unit': 'Selection Criteria',
          'position': 3,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'measurement_step_min'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'specimen_drats': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_drats'
          }],
          'unit': 'Selection Criteria',
          'position': 30,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_drats'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum']
        },
        'er_citation_names': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'er_citation_names'
          }],
          'unit': 'Selection Criteria',
          'position': 102,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'er_citation_names'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'vgp_dp': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'vgp_dp'
          }],
          'unit': 'Selection Criteria',
          'position': 92,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'vgp_dp'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'specimen_fvds': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_fvds'
          }],
          'unit': 'Selection Criteria',
          'position': 22,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_fvds'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'sample_n_lines': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_n_lines'
          }],
          'unit': 'Selection Criteria',
          'position': 44,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_n_lines'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'specimen_comp_nmb': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_comp_nmb'
          }],
          'unit': 'Selection Criteria',
          'position': 9,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_comp_nmb'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'vgp_sigma': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'vgp_sigma'
          }],
          'unit': 'Selection Criteria',
          'position': 94,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'vgp_sigma'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'vgp_n': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'vgp_n'
          }],
          'unit': 'Selection Criteria',
          'position': 96,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'vgp_n'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'sample_magn_moment': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_magn_moment'
          }],
          'unit': 'Selection Criteria',
          'position': 54,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_magn_moment'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'pmag_criteria_code': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'pmag_criteria_code'
          }],
          'unit': 'Selection Criteria',
          'position': 0,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'pmag_criteria_code'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['MY-MAD', 'MY-APLHA95']
        },
        'average_n': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_n'
          }],
          'unit': 'Selection Criteria',
          'position': 83,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_n'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'criteria_description': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'criteria_description'
          }],
          'unit': 'Selection Criteria',
          'position': 101,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'criteria_description'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'measurement_step_max': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'measurement_step_max'
          }],
          'unit': 'Selection Criteria',
          'position': 4,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'measurement_step_max'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'specimen_magn_volume': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_magn_volume'
          }],
          'unit': 'Selection Criteria',
          'position': 34,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_magn_volume'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'vadm_n': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'vadm_n'
          }],
          'unit': 'Selection Criteria',
          'position': 100,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'vadm_n'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'site_magn_volume': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_magn_volume'
          }],
          'unit': 'Selection Criteria',
          'position': 75,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_magn_volume'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'specimen_int_ptrm_n': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_int_ptrm_n'
          }],
          'unit': 'Selection Criteria',
          'position': 36,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_int_ptrm_n'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'criteria_definition': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'criteria_definition'
          }],
          'unit': 'Selection Criteria',
          'position': 1,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'criteria_definition'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'site_k': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_k'
          }],
          'unit': 'Selection Criteria',
          'position': 66,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_k'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'site_tilt_correction': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_tilt_correction'
          }],
          'unit': 'Selection Criteria',
          'position': 68,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_tilt_correction'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'vgp_dm': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'vgp_dm'
          }],
          'unit': 'Selection Criteria',
          'position': 93,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'vgp_dm'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'site_n_lines': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_n_lines'
          }],
          'unit': 'Selection Criteria',
          'position': 64,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_n_lines'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'site_int_rel_sigma': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_int_rel_sigma'
          }],
          'unit': 'Selection Criteria',
          'position': 71,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_int_rel_sigma'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'sample_r': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_r'
          }],
          'unit': 'Selection Criteria',
          'position': 47,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_r'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'average_r': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_r'
          }],
          'unit': 'Selection Criteria',
          'position': 86,
          'previous_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_r'
          }],
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        }
      },
      'label': 'Selection Criteria',
      'description': 'Selection criteria used in data selection'
    }
  }
};