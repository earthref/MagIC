export default {
  'magic_version':'2.0',
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
          'label': 'Rock Member',
          'type': 'Rock Member',
          'description': 'Rock Member',
          'examples': ['Igneous', 'Sedimentary', 'Metamorphic', 'Archeological', 'Intrusive', 'Extrusive']
        },
        'er_formation_name': {
          'group': 'Rock Member',
          'next_columns': [{
            'table': 'er_members',
            'column': 'er_formation_name'
          }],
          'unit': 'Rock Member',
          'position': 2,
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
          'label': 'Calibrations',
          'type': 'Calibrations',
          'description': 'Calibrations'
        },
        'er_specimen_name': {
          'group': 'Calibrations',
          'next_columns': [{
            'table': 'magic_calibrations',
            'column': 'er_specimen_name'
          }],
          'unit': 'Calibrations',
          'position': 1,
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
      'position': 7,
      'columns': {
        'er_member_name': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'er_member_name'
          }],
          'unit': 'Sites',
          'position': 5,
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
          'position': 19,
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'site_lon': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_lon'
          }],
          'unit': 'Sites',
          'position': 12,
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
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Bluebird Formation']
        },
        'site_lithology': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_lithology'
          }],
          'unit': 'Sites',
          'position': 9,
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Basalt', 'Granite', 'Mudstone', 'Tuff', 'Granodiorite', 'Marl']
        },
        'site_definition': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_definition'
          }],
          'unit': 'Sites',
          'position': 7,
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Single (s) site or composite (c) site including various geological units']
        },
        'site_description': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_description'
          }],
          'unit': 'Sites',
          'position': 18,
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
          'position': 20,
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'site_location_precision': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_location_precision'
          }],
          'unit': 'Sites',
          'position': 13,
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
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Meters below seafloor']
        },
        'er_site_alternatives': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'er_site_alternatives'
          }],
          'unit': 'Sites',
          'position': 1,
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites'
        },
        'site_drill_depth': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_drill_depth'
          }],
          'unit': 'Sites',
          'position': 16,
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
          'position': 10,
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Flow Top', 'Glassy Margin', 'Pot Rim', 'Pillow', 'Kiln', 'Sediment Layer']
        },
        'site_height': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_height'
          }],
          'unit': 'Sites',
          'position': 15,
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Positive is up in section or core', 'while negative is down relative to reference height']
        },
        'site_elevation': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_elevation'
          }],
          'unit': 'Sites',
          'position': 14,
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Meters above sealevel']
        },
        'site_class': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_class'
          }],
          'unit': 'Sites',
          'position': 8,
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Igneous', 'Sedimentary', 'Metamorphic', 'Archeological', 'Intrusive', 'Extrusive']
        },
        'er_expedition_name': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'er_expedition_name'
          }],
          'unit': 'Sites',
          'position': 2,
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['AVON02MV']
        },
        'er_site_name': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'er_site_name'
          }],
          'unit': 'Sites',
          'position': 0,
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Bas123a']
        },
        'er_section_name': {
          'group': 'Sites',
          'next_columns': [],
          'unit': 'Sites',
          'position': 6,
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Berkeley Lava Flows', '810C', '1129D']
        },
        'er_citation_names': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'er_citation_names'
          }],
          'unit': 'Sites',
          'position': 21,
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'site_lat': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'site_lat'
          }],
          'unit': 'Sites',
          'position': 11,
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'er_location_name': {
          'group': 'Sites',
          'next_columns': [{
            'table': 'er_sites',
            'column': 'er_location_name'
          }],
          'unit': 'Sites',
          'position': 3,
          'label': 'Sites',
          'type': 'Sites',
          'description': 'Sites',
          'examples': ['San Francisco Volcanic Province', 'Site 801']
        }
      },
      'label': 'Sites',
      'description': 'Unique rock unit in terms of geological age'
    },
    'er_citations': {
      'position': 14,
      'columns': {
        'issn': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'issn'
          }],
          'unit': 'Citations List',
          'position': 4,
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['1525-2027']
        },
        'er_citation_name': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'er_citation_name'
          }],
          'unit': 'Citations List',
          'position': 0,
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
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['Seamount', 'Alkali basalt', 'Hotspot']
        },
        'city': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'city'
          }],
          'unit': 'Citations List',
          'position': 13,
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['Dordrecht', 'the Netherlands']
        },
        'publisher': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'publisher'
          }],
          'unit': 'Citations List',
          'position': 12,
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['Kluwer Academics']
        },
        'journal': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'journal'
          }],
          'unit': 'Citations List',
          'position': 7,
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['Always use non-abbreviated journal names']
        },
        'doi': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'doi'
          }],
          'unit': 'Citations List',
          'position': 3,
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['10.1029/2002GC000343']
        },
        'volume': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'volume'
          }],
          'unit': 'Citations List',
          'position': 8,
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['34A or 101(4)']
        },
        'citation_type': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'citation_type'
          }],
          'unit': 'Citations List',
          'position': 6,
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['Journal', 'Book', 'Edited Book', 'Serial Book', 'Abstract', 'Ph.D. Thesis']
        },
        'long_authors': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'long_authors'
          }],
          'unit': 'Citations List',
          'position': 1,
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['Hart', 'S.R.', 'Blusztajn', 'J. and Meyer', 'P.S.']
        },
        'book_editors': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'book_editors'
          }],
          'unit': 'Citations List',
          'position': 11,
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['Hart', 'S.R.', 'Blusztajn', 'J. and Meyer', 'P.S.']
        },
        'book_title': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'book_title'
          }],
          'unit': 'Citations List',
          'position': 10,
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['No period required at end of title']
        },
        'iaga_ref_no': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'iaga_ref_no'
          }],
          'unit': 'Citations List',
          'position': 16,
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List'
        },
        'title': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'title'
          }],
          'unit': 'Citations List',
          'position': 5,
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['No period required at end of title']
        },
        'iaga_database': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'iaga_database'
          }],
          'unit': 'Citations List',
          'position': 15,
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['ARCHEO', 'PGMDB', 'PINT', 'PSVRL', 'SECVR', 'TRANS']
        },
        'pages': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'pages'
          }],
          'unit': 'Citations List',
          'position': 9,
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['2', '345-2', '367 or 123']
        },
        'year': {
          'group': 'Citations List',
          'next_columns': [{
            'table': 'er_citations',
            'column': 'year'
          }],
          'unit': 'Citations List',
          'position': 2,
          'label': 'Citations List',
          'type': 'Citations List',
          'description': 'Citations List',
          'examples': ['Number in the \'yyyy\' format', 'where 2001a and 2001b are allowed']
        }
      },
      'label': 'Citations List',
      'description': 'List of references'
    },
    'er_expeditions': {
      'position': 2,
      'columns': {
        'expedition_start_lon': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_start_lon'
          }],
          'unit': 'Expeditions',
          'position': 11,
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'expedition_start_lat': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_start_lat'
          }],
          'unit': 'Expeditions',
          'position': 10,
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'expedition_box_lat_max': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_box_lat_max'
          }],
          'unit': 'Expeditions',
          'position': 21,
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
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'expedition_vru_sensor': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_vru_sensor'
          }],
          'unit': 'Expeditions',
          'position': 26,
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
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'expedition_end_date': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_end_date'
          }],
          'unit': 'Expeditions',
          'position': 17,
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
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'er_citation_names': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'er_citation_names'
          }],
          'unit': 'Expeditions',
          'position': 34,
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
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['R/V Melville']
        },
        'expedition_std_equipment': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_std_equipment'
          }],
          'unit': 'Expeditions',
          'position': 8,
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'expedition_mdg_sensor': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_mdg_sensor'
          }],
          'unit': 'Expeditions',
          'position': 28,
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'expedition_sci_equipment': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_sci_equipment'
          }],
          'unit': 'Expeditions',
          'position': 9,
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
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'expedition_mb_sonar': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_mb_sonar'
          }],
          'unit': 'Expeditions',
          'position': 24,
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'expedition_description': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_description'
          }],
          'unit': 'Expeditions',
          'position': 29,
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
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'expedition_nav_sensor': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_nav_sensor'
          }],
          'unit': 'Expeditions',
          'position': 25,
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'er_pi_mail_names': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'er_pi_mail_names'
          }],
          'unit': 'Expeditions',
          'position': 31,
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
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'expedition_location': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_location'
          }],
          'unit': 'Expeditions',
          'position': 6,
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'er_expedition_name': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'er_expedition_name'
          }],
          'unit': 'Expeditions',
          'position': 0,
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['AVON02MV']
        },
        'expedition_sponsor': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_sponsor'
          }],
          'unit': 'Expeditions',
          'position': 5,
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['NSF-OCE', 'NASA']
        },
        'expedition_start_date': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_start_date'
          }],
          'unit': 'Expeditions',
          'position': 12,
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
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'expedition_box_lon_min': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_box_lon_min'
          }],
          'unit': 'Expeditions',
          'position': 22,
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
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['http://earthref.org']
        },
        'expedition_leg': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_leg'
          }],
          'unit': 'Expeditions',
          'position': 3,
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions'
        },
        'expedition_box_lat_min': {
          'group': 'Expeditions',
          'next_columns': [{
            'table': 'er_expeditions',
            'column': 'expedition_box_lat_min'
          }],
          'unit': 'Expeditions',
          'position': 20,
          'label': 'Expeditions',
          'type': 'Expeditions',
          'description': 'Expeditions',
          'examples': ['Decimal degrees between -90 and 90']
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
          'position': 43,
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
          'position': 11,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['KOPA-299-1']
        },
        'measurement_standard': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_standard'
          }],
          'unit': 'Measurements',
          'position': 13,
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
          'position': 65,
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
          'position': 33,
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
          'position': 14,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['03C3012']
        },
        'treatment_ac_field_decay_rate': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_ac_field_decay_rate'
          }],
          'unit': 'Measurements',
          'position': 32,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_k': {
          'group': 'Measurements',
          'next_columns': [],
          'unit': 'Measurements',
          'position': 55,
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
          'position': 35,
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
          'position': 24,
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
          'position': 40,
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
          'position': 53,
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
          'position': 63,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Uncertainty = 1xSD']
        },
        'measurement_x': {
          'group': 'Measurements',
          'next_columns': [],
          'unit': 'Measurements',
          'position': 56,
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
          'position': 39,
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
          'position': 29,
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
          'position': 36,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_moment': {
          'group': 'Measurements',
          'next_columns': [],
          'unit': 'Measurements',
          'position': 52,
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
          'position': 23,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Meters above sealevel']
        },
        'measurement_drill_depth': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_drill_depth'
          }],
          'unit': 'Measurements',
          'position': 25,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Meters below seafloor']
        },
        'measurement_pos_z': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_pos_z'
          }],
          'unit': 'Measurements',
          'position': 21,
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
          'position': 51,
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
          'position': 60,
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
          'position': 49,
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
          'position': 61,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Number between 0 and 1']
        },
        'measurement_description': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_description'
          }],
          'unit': 'Measurements',
          'position': 64,
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
          'position': 10,
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
          'position': 12,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Default = g']
        },
        'er_expedition_name': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'er_expedition_name'
          }],
          'unit': 'Measurements',
          'position': 0,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['AVON02MV']
        },
        'treatment_dc_field_ac_on': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_dc_field_ac_on'
          }],
          'unit': 'Measurements',
          'position': 37,
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
          'position': 62,
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
          'position': 47,
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
          'position': 17,
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
          'position': 19,
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
          'position': 22,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_k_quadr': {
          'group': 'Measurements',
          'next_columns': [],
          'unit': 'Measurements',
          'position': 57,
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
          'position': 45,
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
          'position': 67,
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
          'position': 27,
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
          'position': 48,
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
          'position': 38,
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
          'position': 42,
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
          'position': 34,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'er_citation_names': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'er_citation_names'
          }],
          'unit': 'Measurements',
          'position': 68,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'er_site_name': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'er_site_name'
          }],
          'unit': 'Measurements',
          'position': 5,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Bas123a']
        },
        'measurement_freq': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_freq'
          }],
          'unit': 'Measurements',
          'position': 44,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'er_sample_name': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'er_sample_name'
          }],
          'unit': 'Measurements',
          'position': 6,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Bas123a-01']
        },
        'measurement_loop_n': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_loop_n'
          }],
          'unit': 'Measurements',
          'position': 18,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_date': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_date'
          }],
          'unit': 'Measurements',
          'position': 15,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Number in the \'yyyy:mm:dd:hh:mm:ss.ss\' format']
        },
        'er_specimen_name': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'er_specimen_name'
          }],
          'unit': 'Measurements',
          'position': 7,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Bas123a-01x']
        },
        'measurement_x_quadr': {
          'group': 'Measurements',
          'next_columns': [],
          'unit': 'Measurements',
          'position': 58,
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
          'position': 50,
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
          'position': 46,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_demagn_code': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'measurement_demagn_code'
          }],
          'unit': 'Measurements',
          'position': 41,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'measurement_magn_weight': {
          'group': 'Measurements',
          'next_columns': [],
          'unit': 'Measurements',
          'position': 54,
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
          'position': 59,
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
          'position': 16,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'magic_instrument_codes': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'magic_instrument_codes'
          }],
          'unit': 'Measurements',
          'position': 66,
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
          'position': 20,
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
          'position': 9,
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
          'position': 26,
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
          'position': 31,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        },
        'er_section_name': {
          'group': 'Measurements',
          'next_columns': [],
          'unit': 'Measurements',
          'position': 4,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['Berkeley Lava Flows', '810C', '1129D']
        },
        'er_fossil_name': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'er_fossil_name'
          }],
          'unit': 'Measurements',
          'position': 8,
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
          'position': 30,
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
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements',
          'examples': ['San Francisco Volcanic Province', 'Site 801']
        },
        'treatment_temp_decay_rate': {
          'group': 'Measurements',
          'next_columns': [{
            'table': 'magic_measurements',
            'column': 'treatment_temp_decay_rate'
          }],
          'unit': 'Measurements',
          'position': 28,
          'label': 'Measurements',
          'type': 'Measurements',
          'description': 'Measurements'
        }
      },
      'label': 'Measurements',
      'description': 'Level zero analytical data'
    },
    'rmag_criteria': {
      'position': 30,
      'columns': {
        'rmag_criteria_code': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'rmag_criteria',
            'column': 'rmag_criteria_code'
          }],
          'unit': 'Selection Criteria',
          'position': 0,
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
          'label': 'Methods',
          'type': 'Methods',
          'description': 'Methods',
          'examples': ['Any paleo intensity experiment in which a laboratory ARM is used to normalize NRM for paleofield estimation as suggested by Levi and Banerjee (1976) or more detailed pseudo Thellier experiments by Tauxe et al. (1995).']
        }
      },
      'label': 'Methods',
      'description': 'Description sampling, laboratory and statistical techniques'
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
          'label': 'Instruments',
          'type': 'Instruments',
          'description': 'Instruments',
          'examples': ['AC bridge', 'RF-SQUID', 'MÂ¿ssbauer']
        }
      },
      'label': 'Instruments',
      'description': 'Instrument listing based on institute, year of build and instrument name'
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
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['Glasshound Member']
        },
        'magic_experiment_name': {
          'group': 'Hysteresis Experiments',
          'next_columns': [],
          'unit': 'Hysteresis Experiments',
          'position': 11,
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['KOPA-299-1']
        },
        'magic_method_codes': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'magic_method_codes'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 27,
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'hysteresis_bcr1': {
          'group': 'Hysteresis Experiments',
          'next_columns': [],
          'unit': 'Hysteresis Experiments',
          'position': 19,
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
          'position': 26,
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['MY-MAD', 'MY-APLHA95']
        },
        'measurement_file_name': {
          'group': 'Hysteresis Experiments',
          'next_columns': [],
          'unit': 'Hysteresis Experiments',
          'position': 12,
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['Hart.et.al.2000.data.txt']
        },
        'hysteresis_ms': {
          'group': 'Hysteresis Experiments',
          'next_columns': [],
          'unit': 'Hysteresis Experiments',
          'position': 18,
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
          'position': 10,
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
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['AVON02MV']
        },
        'hysteresis_ss': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_ss'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 15,
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
          'position': 24,
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
          'position': 13,
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
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['Bluebird Formation']
        },
        'er_analyst_mail_names': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_analyst_mail_names'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 29,
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'hysteresis_bc_plus': {
          'group': 'Hysteresis Experiments',
          'next_columns': [],
          'unit': 'Hysteresis Experiments',
          'position': 22,
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'hysteresis_sq': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'hysteresis_sq'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 16,
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
          'position': 5,
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['Bas123a']
        },
        'er_citation_names': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_citation_names'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 30,
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
          'position': 6,
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['Bas123a-01']
        },
        'er_specimen_name': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_specimen_name'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 7,
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['Bas123a-01x']
        },
        'measurement_loop_n': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'measurement_loop_n'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 14,
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'hysteresis_bcr2': {
          'group': 'Hysteresis Experiments',
          'next_columns': [],
          'unit': 'Hysteresis Experiments',
          'position': 20,
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'hysteresis_mr': {
          'group': 'Hysteresis Experiments',
          'next_columns': [],
          'unit': 'Hysteresis Experiments',
          'position': 17,
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
          'position': 25,
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
          'position': 28,
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['SIO-Bubba', 'IRM-OldBlue']
        },
        'hysteresis_bcr3': {
          'group': 'Hysteresis Experiments',
          'next_columns': [],
          'unit': 'Hysteresis Experiments',
          'position': 21,
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'er_mineral_name': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_mineral_name'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 9,
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['San03-001']
        },
        'er_section_name': {
          'group': 'Hysteresis Experiments',
          'next_columns': [],
          'unit': 'Hysteresis Experiments',
          'position': 4,
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['Berkeley Lava Flows', '810C', '1129D']
        },
        'hysteresis_bc_min': {
          'group': 'Hysteresis Experiments',
          'next_columns': [],
          'unit': 'Hysteresis Experiments',
          'position': 23,
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments'
        },
        'er_fossil_name': {
          'group': 'Hysteresis Experiments',
          'next_columns': [{
            'table': 'rmag_hysteresis',
            'column': 'er_fossil_name'
          }],
          'unit': 'Hysteresis Experiments',
          'position': 8,
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
          'label': 'Hysteresis Experiments',
          'type': 'Hysteresis Experiments',
          'description': 'Hysteresis Experiments',
          'examples': ['San Francisco Volcanic Province', 'Site 801']
        }
      },
      'label': 'Hysteresis Experiments',
      'description': 'Experiment for hysteresis loops and FORCs'
    },
    'er_samples': {
      'position': 8,
      'columns': {
        'er_member_name': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'er_member_name'
          }],
          'unit': 'Samples',
          'position': 5,
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Glasshound Member']
        },
        'magic_method_codes': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'magic_method_codes'
          }],
          'unit': 'Samples',
          'position': 29,
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
          'position': 16,
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
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Meters above sealevel']
        },
        'er_scientist_mail_names': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'er_scientist_mail_names'
          }],
          'unit': 'Samples',
          'position': 30,
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
          'position': 13,
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
          'position': 23,
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
          'position': 26,
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
          'position': 10,
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
          'position': 28,
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
          'position': 12,
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
          'position': 11,
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
          'position': 27,
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
          'position': 15,
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
          'position': 9,
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
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples'
        },
        'sample_composite_depth': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_composite_depth'
          }],
          'unit': 'Samples',
          'position': 20,
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Meters below seafloor']
        },
        'er_site_name': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'er_site_name'
          }],
          'unit': 'Samples',
          'position': 7,
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
          'position': 31,
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
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Bas123a-01']
        },
        'sample_drill_depth': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_drill_depth'
          }],
          'unit': 'Samples',
          'position': 19,
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Meters below seafloor']
        },
        'sample_bed_dip_direction': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'sample_bed_dip_direction'
          }],
          'unit': 'Samples',
          'position': 25,
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
          'position': 24,
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
          'position': 14,
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
          'position': 8,
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Igneous', 'Sedimentary', 'Metamorphic', 'Archeological', 'Intrusive', 'Extrusive']
        },
        'er_section_name': {
          'group': 'Samples',
          'next_columns': [],
          'unit': 'Samples',
          'position': 6,
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['Berkeley Lava Flows', '810C', '1129D']
        },
        'er_location_name': {
          'group': 'Samples',
          'next_columns': [{
            'table': 'er_samples',
            'column': 'er_location_name'
          }],
          'unit': 'Samples',
          'position': 3,
          'label': 'Samples',
          'type': 'Samples',
          'description': 'Samples',
          'examples': ['San Francisco Volcanic Province', 'Site 801']
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
          'position': 14,
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
          'position': 16,
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
          'position': 18,
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'er_location_alternatives': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'er_location_alternatives'
          }],
          'unit': 'Locations',
          'position': 1,
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
          'position': 12,
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Baja California', 'Gulf of Mexico']
        },
        'location_end_lat': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'location_end_lat'
          }],
          'unit': 'Locations',
          'position': 6,
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
          'position': 11,
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Mexico', 'Costa Rica', 'the Netherlands']
        },
        'continent_ocean': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'continent_ocean'
          }],
          'unit': 'Locations',
          'position': 9,
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
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Drill Site', 'Land Section', 'Submarine Section', 'Stratigraphic Section', 'Archeological Site', 'Outcrop']
        },
        'location_end_lon': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'location_end_lon'
          }],
          'unit': 'Locations',
          'position': 7,
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
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'er_citation_names': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'er_citation_names'
          }],
          'unit': 'Locations',
          'position': 19,
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'plate_block': {
          'group': 'Locations',
          'next_columns': [{
            'table': 'er_locations',
            'column': 'plate_block'
          }],
          'unit': 'Locations',
          'position': 13,
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
          'position': 15,
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
          'position': 10,
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
          'position': 17,
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
          'label': 'Locations',
          'type': 'Locations',
          'description': 'Locations',
          'examples': ['San Francisco Volcanic Province', 'Site 801']
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
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Glasshound Member']
        },
        'magic_experiment_name': {
          'group': 'Sample Data',
          'next_columns': [],
          'unit': 'Sample Data',
          'position': 10,
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['KOPA-299-1']
        },
        'magic_method_codes': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'magic_method_codes'
          }],
          'unit': 'Sample Data',
          'position': 49,
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
          'position': 26,
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
          'position': 44,
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
          'position': 8,
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
          'position': 28,
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'sample_comp_name': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_comp_name'
          }],
          'unit': 'Sample Data',
          'position': 20,
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
          'position': 7,
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
          'position': 21,
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
          'position': 37,
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'er_mineral_names': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'er_mineral_names'
          }],
          'unit': 'Sample Data',
          'position': 9,
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'sample_polarity': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_polarity'
          }],
          'unit': 'Sample Data',
          'position': 15,
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Polarity is normal (n)', 'reversed (r)', 'transitional (t)', 'excursion (e) or intermediate (i)']
        },
        'sample_comp_nmb': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_comp_nmb'
          }],
          'unit': 'Sample Data',
          'position': 18,
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
          'position': 40,
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
          'position': 46,
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
          'position': 27,
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'measurement_file_name': {
          'group': 'Sample Data',
          'next_columns': [],
          'unit': 'Sample Data',
          'position': 11,
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Hart.et.al.2000.data.txt']
        },
        'sample_int_sigma_perc': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_int_sigma_perc'
          }],
          'unit': 'Sample Data',
          'position': 38,
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
          'position': 22,
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
          'position': 33,
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
          'position': 41,
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
          'position': 23,
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
          'position': 16,
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'sample_n': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_n'
          }],
          'unit': 'Sample Data',
          'position': 30,
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
          'position': 35,
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
          'position': 14,
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
          'position': 29,
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
          'position': 42,
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
          'position': 24,
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
          'position': 51,
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
          'position': 17,
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'sample_int': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_int'
          }],
          'unit': 'Sample Data',
          'position': 36,
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'sample_n_planes': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_n_planes'
          }],
          'unit': 'Sample Data',
          'position': 32,
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
          'position': 12,
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
          'position': 19,
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
          'position': 5,
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Bas123a']
        },
        'er_citation_names': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'er_citation_names'
          }],
          'unit': 'Sample Data',
          'position': 52,
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
          'position': 6,
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
          'position': 48,
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
          'position': 31,
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'sample_magn_weight': {
          'group': 'Sample Data',
          'next_columns': [],
          'unit': 'Sample Data',
          'position': 45,
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
          'position': 13,
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        },
        'sample_moment': {
          'group': 'Sample Data',
          'next_columns': [],
          'unit': 'Sample Data',
          'position': 43,
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
          'position': 25,
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
          'position': 39,
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
          'position': 50,
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
          'position': 47,
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['MY-MAD', 'MY-APLHA95']
        },
        'er_section_name': {
          'group': 'Sample Data',
          'next_columns': [],
          'unit': 'Sample Data',
          'position': 4,
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['Berkeley Lava Flows', '810C', '1129D']
        },
        'er_location_name': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'er_location_name'
          }],
          'unit': 'Sample Data',
          'position': 1,
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data',
          'examples': ['San Francisco Volcanic Province', 'Site 801']
        },
        'sample_r': {
          'group': 'Sample Data',
          'next_columns': [{
            'table': 'pmag_samples',
            'column': 'sample_r'
          }],
          'unit': 'Sample Data',
          'position': 34,
          'label': 'Sample Data',
          'type': 'Sample Data',
          'description': 'Sample Data'
        }
      },
      'label': 'Sample Data',
      'description': 'Sample from site'
    },
    'er_mailinglist': {
      'position': 15,
      'columns': {
        'department': {
          'group': 'Mailing List Contributors',
          'next_columns': [{
            'table': 'er_mailinglist',
            'column': 'department'
          }],
          'unit': 'Mailing List Contributors',
          'position': 2,
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
          'label': 'Mailing List Contributors',
          'type': 'Mailing List Contributors',
          'description': 'Mailing List Contributors',
          'examples': ['U.S.A.']
        },
        'zip_code': {
          'group': 'Mailing List Contributors',
          'next_columns': [{
            'table': 'er_mailinglist',
            'column': 'zip_code'
          }],
          'unit': 'Mailing List Contributors',
          'position': 6,
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
          'label': 'Mailing List Contributors',
          'type': 'Mailing List Contributors',
          'description': 'Mailing List Contributors',
          'examples': ['621-345-4567']
        }
      },
      'label': 'Mailing List Contributors',
      'description': 'List of addresses'
    },
    'er_sections': {
      'position': 6,
      'columns': {
        'er_member_name': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 5,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Glasshound Member']
        },
        'section_begin_lon': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 12,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'section_begin_elevation': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 13,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Meters above sealevel']
        },
        'section_definition': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 6,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Either a single (s) section or the data is based on composite (c) or average (a) sections including various geological units']
        },
        'er_scientist_mail_names': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 26,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'section_type': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 9,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Subsection', 'Polarity Transition', 'Excursion']
        },
        'section_begin_lat': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 11,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'er_section_alternatives': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 1,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections'
        },
        'section_end_height': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 20,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Positive is up in section or core', 'negative is down']
        },
        'section_end_lat': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 17,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'section_begin_composite_depth': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 16,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Meters below seafloor']
        },
        'er_expedition_name': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 2,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['AVON02MV']
        },
        'section_begin_height': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 14,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Positive is up in section or core', 'negative is down']
        },
        'section_description': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 25,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections'
        },
        'er_formation_name': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 4,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Bluebird Formation']
        },
        'section_n': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 10,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections'
        },
        'section_end_lon': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 18,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'section_end_elevation': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 19,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Meters above sealevel']
        },
        'er_citation_names': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 27,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'section_begin_drill_depth': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 15,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Meters below seafloor']
        },
        'section_dip': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 24,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'section_lithology': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 8,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Basalt', 'Granite', 'Mudstone', 'Tuff', 'Granodiorite', 'Marl']
        },
        'section_class': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 7,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Igneous', 'Sedimentary', 'Metamorphic', 'Archeological', 'Intrusive', 'Extrusive']
        },
        'section_end_composite_depth': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 22,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Meters below seafloor']
        },
        'section_azimuth': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 23,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'section_end_drill_depth': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 21,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Meters below seafloor']
        },
        'er_section_name': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 0,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['Berkeley Lava Flows', '810C', '1129D']
        },
        'er_location_name': {
          'group': 'Sections',
          'next_columns': [],
          'unit': 'Sections',
          'position': 3,
          'label': 'Sections',
          'type': 'Sections',
          'description': 'Sections',
          'examples': ['San Francisco Volcanic Province', 'Site 801']
        }
      },
      'label': 'Sections',
      'description': 'Group of sites or subsection in one or more outcrops and/or cores'
    },
    'er_synthetics': {
      'position': 12,
      'columns': {
        'er_member_name': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'er_member_name'
          }],
          'unit': 'Synthetic Materials',
          'position': 5,
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
          'position': 22,
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
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials'
        },
        'synthetic_shape': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_shape'
          }],
          'unit': 'Synthetic Materials',
          'position': 15,
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['Euhedral', 'Orthorhombic ']
        },
        'er_scientist_mail_names': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'er_scientist_mail_names'
          }],
          'unit': 'Synthetic Materials',
          'position': 23,
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
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['AVON02MV']
        },
        'synthetic_density': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_density'
          }],
          'unit': 'Synthetic Materials',
          'position': 19,
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials'
        },
        'synthetic_volume': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'synthetic_volume'
          }],
          'unit': 'Synthetic Materials',
          'position': 17,
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
          'position': 7,
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
          'position': 24,
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
          'position': 8,
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
          'position': 9,
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
          'position': 21,
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
          'position': 11,
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['San03-001']
        },
        'er_section_name': {
          'group': 'Synthetic Materials',
          'next_columns': [],
          'unit': 'Synthetic Materials',
          'position': 6,
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['Berkeley Lava Flows', '810C', '1129D']
        },
        'er_fossil_name': {
          'group': 'Synthetic Materials',
          'next_columns': [{
            'table': 'er_synthetics',
            'column': 'er_fossil_name'
          }],
          'unit': 'Synthetic Materials',
          'position': 10,
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
          'label': 'Synthetic Materials',
          'type': 'Synthetic Materials',
          'description': 'Synthetic Materials',
          'examples': ['San Francisco Volcanic Province', 'Site 801']
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
          'position': 25,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'magic_experiment_name': {
          'group': 'Remanence Experiments',
          'next_columns': [],
          'unit': 'Remanence Experiments',
          'position': 11,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['KOPA-299-1']
        },
        'remanence_delta_ratio': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_delta_ratio'
          }],
          'unit': 'Remanence Experiments',
          'position': 15,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_temp_mineral': {
          'group': 'Remanence Experiments',
          'next_columns': [],
          'unit': 'Remanence Experiments',
          'position': 24,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['Magnetite', 'hematite', 'maghemite']
        },
        'magic_method_codes': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'magic_method_codes'
          }],
          'unit': 'Remanence Experiments',
          'position': 42,
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
          'position': 30,
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
          'position': 34,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_mr': {
          'group': 'Remanence Experiments',
          'next_columns': [],
          'unit': 'Remanence Experiments',
          'position': 18,
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
          'position': 37,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments'
        },
        'remanence_mdf': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_mdf'
          }],
          'unit': 'Remanence Experiments',
          'position': 31,
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
          'position': 16,
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
          'position': 41,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['MY-MAD', 'MY-APLHA95']
        },
        'remanence_hirm': {
          'group': 'Remanence Experiments',
          'next_columns': [],
          'unit': 'Remanence Experiments',
          'position': 28,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_maf': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_maf'
          }],
          'unit': 'Remanence Experiments',
          'position': 32,
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
          'position': 29,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'measurement_file_name': {
          'group': 'Remanence Experiments',
          'next_columns': [],
          'unit': 'Remanence Experiments',
          'position': 12,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['Hart.et.al.2000.data.txt']
        },
        'remanence_bcr': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_bcr'
          }],
          'unit': 'Remanence Experiments',
          'position': 19,
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
          'position': 27,
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
          'position': 10,
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
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['AVON02MV']
        },
        'remanence_temp_low': {
          'group': 'Remanence Experiments',
          'next_columns': [],
          'unit': 'Remanence Experiments',
          'position': 20,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_comp_n': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_comp_n'
          }],
          'unit': 'Remanence Experiments',
          'position': 36,
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
          'position': 40,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_temp_critical': {
          'group': 'Remanence Experiments',
          'next_columns': [],
          'unit': 'Remanence Experiments',
          'position': 22,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_dfc': {
          'group': 'Remanence Experiments',
          'next_columns': [],
          'unit': 'Remanence Experiments',
          'position': 13,
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
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['Bluebird Formation']
        },
        'er_analyst_mail_names': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_analyst_mail_names'
          }],
          'unit': 'Remanence Experiments',
          'position': 44,
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
          'position': 35,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_temp_type': {
          'group': 'Remanence Experiments',
          'next_columns': [],
          'unit': 'Remanence Experiments',
          'position': 23,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['Verway', 'Morin', 'pyrrhotite', 'Neel', 'spin glass', 'Curie', 'Hopkinson', 'blocking', 'unblocking']
        },
        'remanence_sratio_forward': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_sratio_forward'
          }],
          'unit': 'Remanence Experiments',
          'position': 26,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'er_site_name': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_site_name'
          }],
          'unit': 'Remanence Experiments',
          'position': 5,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['Bas123a']
        },
        'er_citation_names': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_citation_names'
          }],
          'unit': 'Remanence Experiments',
          'position': 45,
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
          'position': 6,
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
          'position': 7,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['Bas123a-01x']
        },
        'remanence_sd': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_sd'
          }],
          'unit': 'Remanence Experiments',
          'position': 38,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments'
        },
        'remanence_delta_temp_high': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_delta_temp_high'
          }],
          'unit': 'Remanence Experiments',
          'position': 17,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_dzfc': {
          'group': 'Remanence Experiments',
          'next_columns': [],
          'unit': 'Remanence Experiments',
          'position': 14,
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
          'position': 43,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['SIO-Bubba', 'IRM-OldBlue']
        },
        'remanence_temp_high': {
          'group': 'Remanence Experiments',
          'next_columns': [],
          'unit': 'Remanence Experiments',
          'position': 21,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'remanence_q': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'remanence_q'
          }],
          'unit': 'Remanence Experiments',
          'position': 39,
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
          'position': 9,
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
          'position': 33,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments'
        },
        'er_section_name': {
          'group': 'Remanence Experiments',
          'next_columns': [],
          'unit': 'Remanence Experiments',
          'position': 4,
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['Berkeley Lava Flows', '810C', '1129D']
        },
        'er_fossil_name': {
          'group': 'Remanence Experiments',
          'next_columns': [{
            'table': 'rmag_remanence',
            'column': 'er_fossil_name'
          }],
          'unit': 'Remanence Experiments',
          'position': 8,
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
          'label': 'Remanence Experiments',
          'type': 'Remanence Experiments',
          'description': 'Remanence Experiments',
          'examples': ['San Francisco Volcanic Province', 'Site 801']
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
          'label': 'Rock Formations',
          'type': 'Rock Formations',
          'description': 'Rock Formations',
          'examples': ['Igneous', 'Sedimentary', 'Metamorphic', 'Archeological', 'Intrusive', 'Extrusive']
        },
        'er_scientist_mail_names': {
          'group': 'Rock Formations',
          'next_columns': [{
            'table': 'er_formations',
            'column': 'er_scientist_mail_names'
          }],
          'unit': 'Rock Formations',
          'position': 7,
          'label': 'Rock Formations',
          'type': 'Rock Formations',
          'description': 'Rock Formations',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'formation_paleo_enviroment': {
          'group': 'Rock Formations',
          'next_columns': [{
            'table': 'er_formations',
            'column': 'formation_paleo_enviroment'
          }],
          'unit': 'Rock Formations',
          'position': 4,
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
          'label': 'Rotation Data',
          'type': 'Rotation Data',
          'description': 'Rotation Data'
        }
      },
      'label': 'Rotation Data',
      'description': 'Data used to perform complex rotations between coordinate systems'
    },
    'er_minerals': {
      'position': 11,
      'columns': {
        'er_member_name': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'er_member_name'
          }],
          'unit': 'Minerals',
          'position': 5,
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
          'position': 17,
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['250-500 Â¿m']
        },
        'mineral_class_name': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_class_name'
          }],
          'unit': 'Minerals',
          'position': 12,
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['Magnetite', 'Plagioclase ']
        },
        'mineral_assemblage': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_assemblage'
          }],
          'unit': 'Minerals',
          'position': 13,
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
          'position': 16,
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['Euhedral', 'Orthorhombic ']
        },
        'mineral_density': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'mineral_density'
          }],
          'unit': 'Minerals',
          'position': 20,
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
          'position': 15,
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
          'position': 11,
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
          'position': 7,
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
          'position': 8,
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
          'position': 9,
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
          'position': 18,
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
          'position': 19,
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
          'position': 14,
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['Severe', 'High', 'Mild', 'Trace', 'Unaltered']
        },
        'er_section_name': {
          'group': 'Minerals',
          'next_columns': [],
          'unit': 'Minerals',
          'position': 6,
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['Berkeley Lava Flows', '810C', '1129D']
        },
        'er_fossil_name': {
          'group': 'Minerals',
          'next_columns': [{
            'table': 'er_minerals',
            'column': 'er_fossil_name'
          }],
          'unit': 'Minerals',
          'position': 10,
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
          'label': 'Minerals',
          'type': 'Minerals',
          'description': 'Minerals',
          'examples': ['San Francisco Volcanic Province', 'Site 801']
        }
      },
      'label': 'Minerals',
      'description': 'Naturally occurring minerals'
    },
    'er_specimens': {
      'position': 9,
      'columns': {
        'er_member_name': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'er_member_name'
          }],
          'unit': 'Specimens',
          'position': 5,
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
          'position': 14,
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
          'position': 26,
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
          'position': 18,
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Meters below seafloor']
        },
        'er_scientist_mail_names': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'er_scientist_mail_names'
          }],
          'unit': 'Specimens',
          'position': 27,
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
          'position': 10,
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
          'position': 23,
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
          'position': 19,
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'specimen_drill_depth': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_drill_depth'
          }],
          'unit': 'Specimens',
          'position': 17,
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Meters below seafloor']
        },
        'specimen_height': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_height'
          }],
          'unit': 'Specimens',
          'position': 16,
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Positive is up in section or core', 'while negative is down relative to reference height']
        },
        'specimen_type': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_type'
          }],
          'unit': 'Specimens',
          'position': 11,
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
          'position': 20,
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
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['AVON02MV']
        },
        'specimen_texture': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_texture'
          }],
          'unit': 'Specimens',
          'position': 12,
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
          'position': 25,
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
          'position': 7,
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
          'position': 28,
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
          'position': 8,
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
          'position': 13,
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
          'position': 15,
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
          'position': 9,
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Igneous', 'Sedimentary', 'Metamorphic', 'Archeological', 'Intrusive', 'Extrusive']
        },
        'specimen_volume': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'specimen_volume'
          }],
          'unit': 'Specimens',
          'position': 21,
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
          'position': 24,
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
          'position': 22,
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens'
        },
        'er_section_name': {
          'group': 'Specimens',
          'next_columns': [],
          'unit': 'Specimens',
          'position': 6,
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['Berkeley Lava Flows', '810C', '1129D']
        },
        'er_location_name': {
          'group': 'Specimens',
          'next_columns': [{
            'table': 'er_specimens',
            'column': 'er_location_name'
          }],
          'unit': 'Specimens',
          'position': 3,
          'label': 'Specimens',
          'type': 'Specimens',
          'description': 'Specimens',
          'examples': ['San Francisco Volcanic Province', 'Site 801']
        }
      },
      'label': 'Specimens',
      'description': 'Specimen from sample'
    },
    'rmag_anisotropy': {
      'position': 29,
      'columns': {
        'anisotropy_fl': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_fl'
          }],
          'unit': 'Anisotropy Data',
          'position': 45,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'er_sample_names': {
          'group': 'Anisotropy Data',
          'next_columns': [],
          'unit': 'Anisotropy Data',
          'position': 4,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'magic_experiment_name': {
          'group': 'Anisotropy Data',
          'next_columns': [],
          'unit': 'Anisotropy Data',
          'position': 9,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data',
          'examples': ['KOPA-299-1']
        },
        'magic_method_codes': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'magic_method_codes'
          }],
          'unit': 'Anisotropy Data',
          'position': 50,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'anisotropy_eta_dec': {
          'group': 'Anisotropy Data',
          'next_columns': [],
          'unit': 'Anisotropy Data',
          'position': 32,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_p': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_p'
          }],
          'unit': 'Anisotropy Data',
          'position': 41,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_pp': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_pp'
          }],
          'unit': 'Anisotropy Data',
          'position': 42,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_ll': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_ll'
          }],
          'unit': 'Anisotropy Data',
          'position': 40,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_s5': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_s5'
          }],
          'unit': 'Anisotropy Data',
          'position': 16,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_t2': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_t2'
          }],
          'unit': 'Anisotropy Data',
          'position': 23,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_zeta_inc': {
          'group': 'Anisotropy Data',
          'next_columns': [],
          'unit': 'Anisotropy Data',
          'position': 34,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'er_fossil_names': {
          'group': 'Anisotropy Data',
          'next_columns': [],
          'unit': 'Anisotropy Data',
          'position': 6,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data',
          'examples': ['AMM43-03', 'AMM43-19']
        },
        'anisotropy_l': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_l'
          }],
          'unit': 'Anisotropy Data',
          'position': 39,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'er_specimen_names': {
          'group': 'Anisotropy Data',
          'next_columns': [],
          'unit': 'Anisotropy Data',
          'position': 5,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_s6': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_s6'
          }],
          'unit': 'Anisotropy Data',
          'position': 17,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_unit': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_unit'
          }],
          'unit': 'Anisotropy Data',
          'position': 20,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data',
          'examples': ['Normalized by trace', 'Am2', 'm3/kg', 'SI', 'deviatoric']
        },
        'anisotropy_deg1': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_deg1'
          }],
          'unit': 'Anisotropy Data',
          'position': 46,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data',
          'examples': ['Number between 0 and 300% ']
        },
        'er_mineral_names': {
          'group': 'Anisotropy Data',
          'next_columns': [],
          'unit': 'Anisotropy Data',
          'position': 7,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'rmag_criteria_codes': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'rmag_criteria_codes'
          }],
          'unit': 'Anisotropy Data',
          'position': 49,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data',
          'examples': ['MY-MAD', 'MY-APLHA95']
        },
        'anisotropy_eta_inc': {
          'group': 'Anisotropy Data',
          'next_columns': [],
          'unit': 'Anisotropy Data',
          'position': 31,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_v3_dec': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_v3_dec'
          }],
          'unit': 'Anisotropy Data',
          'position': 27,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_t': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_t'
          }],
          'unit': 'Anisotropy Data',
          'position': 43,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_t3': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_t3'
          }],
          'unit': 'Anisotropy Data',
          'position': 24,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_v1_inc': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_v1_inc'
          }],
          'unit': 'Anisotropy Data',
          'position': 28,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_v3_inc': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_v3_inc'
          }],
          'unit': 'Anisotropy Data',
          'position': 30,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'measurement_file_name': {
          'group': 'Anisotropy Data',
          'next_columns': [],
          'unit': 'Anisotropy Data',
          'position': 10,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data',
          'examples': ['Hart.et.al.2000.data.txt']
        },
        'anisotropy_description': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_description'
          }],
          'unit': 'Anisotropy Data',
          'position': 48,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'rmag_anisotropy_name': {
          'group': 'Anisotropy Data',
          'next_columns': [],
          'unit': 'Anisotropy Data',
          'position': 0,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data',
          'examples': ['Bas123-anis']
        },
        'anisotropy_s4': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_s4'
          }],
          'unit': 'Anisotropy Data',
          'position': 15,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_f': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_f'
          }],
          'unit': 'Anisotropy Data',
          'position': 37,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_type': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_type'
          }],
          'unit': 'Anisotropy Data',
          'position': 11,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data',
          'examples': ['AMS', 'AARM', 'AIRM', 'ATRM']
        },
        'anisotropy_v2_dec': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_v2_dec'
          }],
          'unit': 'Anisotropy Data',
          'position': 26,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'er_analyst_mail_names': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_analyst_mail_names'
          }],
          'unit': 'Anisotropy Data',
          'position': 52,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'anisotropy_sigma': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_sigma'
          }],
          'unit': 'Anisotropy Data',
          'position': 19,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data',
          'examples': ['Sigma of Hext (1963)']
        },
        'er_synthetic_names': {
          'group': 'Anisotropy Data',
          'next_columns': [],
          'unit': 'Anisotropy Data',
          'position': 8,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_s3': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_s3'
          }],
          'unit': 'Anisotropy Data',
          'position': 14,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_vg': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_vg'
          }],
          'unit': 'Anisotropy Data',
          'position': 44,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data'
        },
        'anisotropy_ff': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_ff'
          }],
          'unit': 'Anisotropy Data',
          'position': 38,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_v1_dec': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_v1_dec'
          }],
          'unit': 'Anisotropy Data',
          'position': 25,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_zeta_semi_angle': {
          'group': 'Anisotropy Data',
          'next_columns': [],
          'unit': 'Anisotropy Data',
          'position': 36,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data',
          'examples': ['Confidence Level = 95%']
        },
        'er_citation_names': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'er_citation_names'
          }],
          'unit': 'Anisotropy Data',
          'position': 53,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data',
          'examples': ['Smith et al. 2003', 'Hart & Heard 1967', 'This study']
        },
        'anisotropy_mean': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_mean'
          }],
          'unit': 'Anisotropy Data',
          'position': 18,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_v2_inc': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_v2_inc'
          }],
          'unit': 'Anisotropy Data',
          'position': 29,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_eta_semi_angle': {
          'group': 'Anisotropy Data',
          'next_columns': [],
          'unit': 'Anisotropy Data',
          'position': 33,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data',
          'examples': ['Confidence Level = 95%']
        },
        'anisotropy_s2': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_s2'
          }],
          'unit': 'Anisotropy Data',
          'position': 13,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'er_site_names': {
          'group': 'Anisotropy Data',
          'next_columns': [],
          'unit': 'Anisotropy Data',
          'position': 3,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data',
          'examples': ['Bas123a', 'Bas156z', 'Bas445c']
        },
        'er_section_names': {
          'group': 'Anisotropy Data',
          'next_columns': [],
          'unit': 'Anisotropy Data',
          'position': 2,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data',
          'examples': ['810C', '810D']
        },
        'anisotropy_zeta_dec': {
          'group': 'Anisotropy Data',
          'next_columns': [],
          'unit': 'Anisotropy Data',
          'position': 35,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'magic_instrument_codes': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'magic_instrument_codes'
          }],
          'unit': 'Anisotropy Data',
          'position': 51,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data',
          'examples': ['SIO-Bubba', 'IRM-OldBlue']
        },
        'anisotropy_t1': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_t1'
          }],
          'unit': 'Anisotropy Data',
          'position': 22,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'anisotropy_n': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_n'
          }],
          'unit': 'Anisotropy Data',
          'position': 21,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        },
        'er_location_names': {
          'group': 'Anisotropy Data',
          'next_columns': [],
          'unit': 'Anisotropy Data',
          'position': 1,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data',
          'examples': ['Site 801', 'Site 1129']
        },
        'anisotropy_deg2': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_deg2'
          }],
          'unit': 'Anisotropy Data',
          'position': 47,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data',
          'examples': ['Number between 0 and 100% ']
        },
        'anisotropy_s1': {
          'group': 'Anisotropy Data',
          'next_columns': [{
            'table': 'rmag_anisotropy',
            'column': 'anisotropy_s1'
          }],
          'unit': 'Anisotropy Data',
          'position': 12,
          'label': 'Anisotropy Data',
          'type': 'Anisotropy Data',
          'description': 'Anisotropy Data'
        }
      },
      'label': 'Anisotropy Data',
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
          'position': 48,
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'magic_experiment_name': {
          'group': 'Specimen Data',
          'next_columns': [],
          'unit': 'Specimen Data',
          'position': 10,
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['KOPA-299-1']
        },
        'specimen_int_rel_sigma_perc': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_int_rel_sigma_perc'
          }],
          'unit': 'Specimen Data',
          'position': 38,
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
          'position': 67,
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
          'position': 43,
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
          'position': 22,
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
          'position': 17,
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_inc': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_inc'
          }],
          'unit': 'Specimen Data',
          'position': 27,
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
          'position': 35,
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'specimen_b_sigma': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_b_sigma'
          }],
          'unit': 'Specimen Data',
          'position': 46,
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
          'position': 52,
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
          'position': 42,
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
          'position': 50,
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
          'position': 23,
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
          'position': 29,
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
          'position': 32,
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
          'position': 30,
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
          'position': 51,
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
          'position': 45,
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
          'position': 34,
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
          'position': 49,
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'measurement_file_name': {
          'group': 'Specimen Data',
          'next_columns': [],
          'unit': 'Specimen Data',
          'position': 11,
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Hart.et.al.2000.data.txt']
        },
        'specimen_b_beta': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_b_beta'
          }],
          'unit': 'Specimen Data',
          'position': 47,
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
          'position': 31,
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
          'position': 40,
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_magn_weight': {
          'group': 'Specimen Data',
          'next_columns': [],
          'unit': 'Specimen Data',
          'position': 60,
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'er_expedition_name': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_expedition_name'
          }],
          'unit': 'Specimen Data',
          'position': 0,
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
          'position': 26,
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
          'position': 37,
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
          'position': 54,
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
          'position': 20,
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
          'position': 15,
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Polarity is normal (n)', 'reversed (r)', 'transitional (t)', 'excursion (e) or intermediate (i)']
        },
        'measurement_step_unit': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'measurement_step_unit'
          }],
          'unit': 'Specimen Data',
          'position': 14,
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_moment': {
          'group': 'Specimen Data',
          'next_columns': [],
          'unit': 'Specimen Data',
          'position': 58,
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
          'position': 39,
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
          'position': 18,
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'er_formation_name': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_formation_name'
          }],
          'unit': 'Specimen Data',
          'position': 2,
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
          'position': 69,
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
          'position': 33,
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
          'position': 41,
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
          'position': 16,
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_inferred_age_low': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_inferred_age_low'
          }],
          'unit': 'Specimen Data',
          'position': 24,
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'measurement_step_min': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'measurement_step_min'
          }],
          'unit': 'Specimen Data',
          'position': 12,
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'specimen_drats': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'specimen_drats'
          }],
          'unit': 'Specimen Data',
          'position': 53,
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
          'position': 5,
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Bas123a']
        },
        'er_citation_names': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_citation_names'
          }],
          'unit': 'Specimen Data',
          'position': 70,
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
          'position': 6,
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
          'position': 44,
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
          'position': 66,
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
          'position': 7,
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
          'position': 19,
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
          'position': 13,
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
          'position': 68,
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
          'position': 65,
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
          'position': 21,
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
          'position': 28,
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
          'position': 9,
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
          'position': 36,
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
          'position': 25,
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data'
        },
        'er_section_name': {
          'group': 'Specimen Data',
          'next_columns': [],
          'unit': 'Specimen Data',
          'position': 4,
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['Berkeley Lava Flows', '810C', '1129D']
        },
        'er_fossil_name': {
          'group': 'Specimen Data',
          'next_columns': [{
            'table': 'pmag_specimens',
            'column': 'er_fossil_name'
          }],
          'unit': 'Specimen Data',
          'position': 8,
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
          'label': 'Specimen Data',
          'type': 'Specimen Data',
          'description': 'Specimen Data',
          'examples': ['San Francisco Volcanic Province', 'Site 801']
        }
      },
      'label': 'Specimen Data',
      'description': 'Specimen from sample'
    },
    'er_ages': {
      'position': 13,
      'columns': {
        'er_member_name': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'er_member_name'
          }],
          'unit': 'Ages Determinations',
          'position': 3,
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
          'position': 17,
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
          'position': 33,
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
          'position': 10,
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations'
        },
        'oxygen_stage': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'oxygen_stage'
          }],
          'unit': 'Ages Determinations',
          'position': 30,
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['5e', '19', 'Younger Dryas']
        },
        'timescale_stage': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'timescale_stage'
          }],
          'unit': 'Ages Determinations',
          'position': 25,
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
          'position': 23,
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
          'position': 12,
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
          'position': 22,
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
          'position': 11,
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
          'position': 18,
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
          'position': 29,
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations'
        },
        'age_description': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'age_description'
          }],
          'unit': 'Ages Determinations',
          'position': 32,
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
          'position': 31,
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
          'position': 26,
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
          'position': 20,
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
          'position': 15,
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
          'position': 28,
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
          'position': 19,
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
          'position': 5,
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
          'position': 35,
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
          'position': 34,
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
          'position': 6,
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
          'position': 7,
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
          'position': 13,
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
          'position': 27,
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations'
        },
        'age': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'age'
          }],
          'unit': 'Ages Determinations',
          'position': 16,
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
          'position': 24,
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
          'position': 9,
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
          'position': 14,
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
          'position': 21,
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Phanerozoic', 'Proterozoic', 'Archean']
        },
        'er_section_name': {
          'group': 'Ages Determinations',
          'next_columns': [],
          'unit': 'Ages Determinations',
          'position': 4,
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['Berkeley Lava Flows', '810C', '1129D']
        },
        'er_fossil_name': {
          'group': 'Ages Determinations',
          'next_columns': [{
            'table': 'er_ages',
            'column': 'er_fossil_name'
          }],
          'unit': 'Ages Determinations',
          'position': 8,
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
          'label': 'Ages Determinations',
          'type': 'Ages Determinations',
          'description': 'Ages Determinations',
          'examples': ['San Francisco Volcanic Province', 'Site 801']
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
          'position': 6,
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
          'position': 30,
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
          'position': 37,
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Uncertainty = 1xSD']
        },
        'magic_experiment_name': {
          'group': 'Site Data',
          'next_columns': [],
          'unit': 'Site Data',
          'position': 10,
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['KOPA-299-1']
        },
        'magic_method_codes': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'magic_method_codes'
          }],
          'unit': 'Site Data',
          'position': 49,
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
          'position': 34,
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
          'position': 22,
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
          'position': 46,
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
          'position': 8,
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
          'position': 39,
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'er_specimen_names': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'er_specimen_names'
          }],
          'unit': 'Site Data',
          'position': 7,
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
          'position': 28,
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
          'position': 42,
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
          'position': 26,
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
          'position': 9,
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'site_direction_type': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_direction_type'
          }],
          'unit': 'Site Data',
          'position': 17,
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'site_comp_nmb': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_comp_nmb'
          }],
          'unit': 'Site Data',
          'position': 18,
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
          'position': 16,
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'site_int_sigma_perc': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_int_sigma_perc'
          }],
          'unit': 'Site Data',
          'position': 38,
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
          'position': 27,
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'measurement_file_name': {
          'group': 'Site Data',
          'next_columns': [],
          'unit': 'Site Data',
          'position': 11,
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Hart.et.al.2000.data.txt']
        },
        'site_polarity': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_polarity'
          }],
          'unit': 'Site Data',
          'position': 15,
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Polarity is normal (n)', 'reversed (r)', 'transitional (t)', 'excursion (e) or intermediate (i)']
        },
        'site_inferred_age_high': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_inferred_age_high'
          }],
          'unit': 'Site Data',
          'position': 24,
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
          'position': 36,
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
          'position': 23,
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
          'position': 19,
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
          'position': 21,
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
          'position': 41,
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
          'position': 14,
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
          'position': 32,
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
          'position': 29,
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
          'position': 51,
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'measurement_step_min': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'measurement_step_min'
          }],
          'unit': 'Site Data',
          'position': 12,
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
          'position': 5,
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Bas123a']
        },
        'er_citation_names': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'er_citation_names'
          }],
          'unit': 'Site Data',
          'position': 52,
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
          'position': 48,
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['MY-TILT1', 'MY-TILT2', 'MY-TRANS1']
        },
        'site_moment': {
          'group': 'Site Data',
          'next_columns': [],
          'unit': 'Site Data',
          'position': 43,
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'site_inferred_age_unit': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_inferred_age_unit'
          }],
          'unit': 'Site Data',
          'position': 25,
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
          'position': 20,
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Characteristic', 'VRM', 'Overprint', 'A', 'B', 'C']
        },
        'site_magn_weight': {
          'group': 'Site Data',
          'next_columns': [],
          'unit': 'Site Data',
          'position': 45,
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'measurement_step_max': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'measurement_step_max'
          }],
          'unit': 'Site Data',
          'position': 13,
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
          'position': 50,
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
          'position': 47,
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
          'position': 44,
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
          'position': 33,
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
          'position': 35,
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
          'position': 31,
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data'
        },
        'er_section_name': {
          'group': 'Site Data',
          'next_columns': [],
          'unit': 'Site Data',
          'position': 4,
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['Berkeley Lava Flows', '810C', '1129D']
        },
        'site_int_rel_sigma': {
          'group': 'Site Data',
          'next_columns': [{
            'table': 'pmag_sites',
            'column': 'site_int_rel_sigma'
          }],
          'unit': 'Site Data',
          'position': 40,
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
          'label': 'Site Data',
          'type': 'Site Data',
          'description': 'Site Data',
          'examples': ['San Francisco Volcanic Province', 'Site 801']
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
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['Glasshound Member']
        },
        'magic_experiment_name': {
          'group': 'Susceptibility Experiments',
          'next_columns': [],
          'unit': 'Susceptibility Experiments',
          'position': 11,
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['KOPA-299-1']
        },
        'susceptibility_h_high': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_h_high'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 20,
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
          'position': 29,
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['DE-DC0', 'FT-F1', 'LP-DCDMAG']
        },
        'susceptibility_temp_critical': {
          'group': 'Susceptibility Experiments',
          'next_columns': [],
          'unit': 'Susceptibility Experiments',
          'position': 23,
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments'
        },
        'susceptibility_temp_mineral': {
          'group': 'Susceptibility Experiments',
          'next_columns': [],
          'unit': 'Susceptibility Experiments',
          'position': 25,
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['Magnetite', 'hematite', 'maghemite']
        },
        'susceptibility_temp_type': {
          'group': 'Susceptibility Experiments',
          'next_columns': [],
          'unit': 'Susceptibility Experiments',
          'position': 24,
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['Verway', 'Morin', 'pyrrhotite', 'Neel', 'spin glass', 'Curie', 'Hopkinson', 'blocking', 'unblocking']
        },
        'susceptibility_h_low': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_h_low'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 19,
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments'
        },
        'susceptibility_xfd': {
          'group': 'Susceptibility Experiments',
          'next_columns': [],
          'unit': 'Susceptibility Experiments',
          'position': 15,
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
          'position': 28,
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['MY-MAD', 'MY-APLHA95']
        },
        'susceptibility_temp_low': {
          'group': 'Susceptibility Experiments',
          'next_columns': [],
          'unit': 'Susceptibility Experiments',
          'position': 21,
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments'
        },
        'susceptibility_k': {
          'group': 'Susceptibility Experiments',
          'next_columns': [],
          'unit': 'Susceptibility Experiments',
          'position': 13,
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
          'position': 27,
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments'
        },
        'measurement_file_name': {
          'group': 'Susceptibility Experiments',
          'next_columns': [],
          'unit': 'Susceptibility Experiments',
          'position': 12,
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['Hart.et.al.2000.data.txt']
        },
        'er_synthetic_name': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_synthetic_name'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 10,
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
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['AVON02MV']
        },
        'susceptibility_x': {
          'group': 'Susceptibility Experiments',
          'next_columns': [],
          'unit': 'Susceptibility Experiments',
          'position': 14,
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments'
        },
        'susceptibility_temp_high': {
          'group': 'Susceptibility Experiments',
          'next_columns': [],
          'unit': 'Susceptibility Experiments',
          'position': 22,
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
          'position': 16,
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
          'position': 31,
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'susceptibility_f_high': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'susceptibility_f_high'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 17,
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
          'position': 5,
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['Bas123a']
        },
        'er_citation_names': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_citation_names'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 32,
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
          'position': 6,
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['Bas123a-01']
        },
        'susceptibility_xhd': {
          'group': 'Susceptibility Experiments',
          'next_columns': [],
          'unit': 'Susceptibility Experiments',
          'position': 18,
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments'
        },
        'er_specimen_name': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_specimen_name'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 7,
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['Bas123a-01x']
        },
        'susceptibility_xx': {
          'group': 'Susceptibility Experiments',
          'next_columns': [],
          'unit': 'Susceptibility Experiments',
          'position': 26,
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
          'position': 30,
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
          'position': 9,
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['San03-001']
        },
        'er_section_name': {
          'group': 'Susceptibility Experiments',
          'next_columns': [],
          'unit': 'Susceptibility Experiments',
          'position': 4,
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['Berkeley Lava Flows', '810C', '1129D']
        },
        'er_fossil_name': {
          'group': 'Susceptibility Experiments',
          'next_columns': [{
            'table': 'rmag_susceptibility',
            'column': 'er_fossil_name'
          }],
          'unit': 'Susceptibility Experiments',
          'position': 8,
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
          'label': 'Susceptibility Experiments',
          'type': 'Susceptibility Experiments',
          'description': 'Susceptibility Experiments',
          'examples': ['San Francisco Volcanic Province', 'Site 801']
        }
      },
      'label': 'Susceptibility Experiments',
      'description': 'Experiment for susceptibility parameters'
    },
    'er_fossils': {
      'position': 10,
      'columns': {
        'er_member_name': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'er_member_name'
          }],
          'unit': 'Fossils',
          'position': 5,
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
          'position': 23,
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
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'fossil_class': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'fossil_class'
          }],
          'unit': 'Fossils',
          'position': 11,
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
          'position': 21,
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
          'position': 13,
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
          'position': 22,
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
          'position': 14,
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
          'position': 20,
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
          'position': 19,
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
          'position': 16,
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
          'position': 10,
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
          'position': 15,
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
          'position': 7,
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
          'position': 8,
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
          'position': 18,
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
          'position': 9,
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
          'position': 17,
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
          'position': 12,
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['Alcyonida', 'Strophomenida', 'Thecideida']
        },
        'er_section_name': {
          'group': 'Fossils',
          'next_columns': [],
          'unit': 'Fossils',
          'position': 6,
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['Berkeley Lava Flows', '810C', '1129D']
        },
        'er_fossil_name': {
          'group': 'Fossils',
          'next_columns': [{
            'table': 'er_fossils',
            'column': 'er_fossil_name'
          }],
          'unit': 'Fossils',
          'position': 0,
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
          'label': 'Fossils',
          'type': 'Fossils',
          'description': 'Fossils',
          'examples': ['San Francisco Volcanic Province', 'Site 801']
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
          'position': 29,
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
          'position': 4,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'average_int': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_int'
          }],
          'unit': 'Results',
          'position': 32,
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
          'position': 19,
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
          'position': 87,
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
          'position': 93,
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
          'position': 63,
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
          'position': 70,
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
          'position': 54,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'tilt_k_ratio': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_k_ratio'
          }],
          'unit': 'Results',
          'position': 61,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'iaga_res_no': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'iaga_res_no'
          }],
          'unit': 'Results',
          'position': 89,
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
          'position': 27,
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
          'position': 36,
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
          'position': 71,
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
          'position': 73,
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
          'position': 81,
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
          'position': 39,
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
          'position': 6,
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
          'position': 69,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'er_specimen_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'er_specimen_names'
          }],
          'unit': 'Results',
          'position': 5,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'average_sigma': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_sigma'
          }],
          'unit': 'Results',
          'position': 26,
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
          'position': 20,
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
          'position': 10,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['C+', 'IC+', '+ (pos)', 'Co', 'Ico', 'o (indeterminate)', 'C-', 'IC-', '- (neg)', 'ND (not done)']
        },
        'normal_lon': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'normal_lon'
          }],
          'unit': 'Results',
          'position': 75,
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
          'position': 34,
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
          'position': 41,
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
          'position': 58,
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
          'position': 18,
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
          'position': 55,
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
          'position': 33,
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
          'position': 44,
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
          'position': 7,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'vgp_lat': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'vgp_lat'
          }],
          'unit': 'Results',
          'position': 47,
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
          'position': 79,
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
          'position': 16,
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
          'position': 42,
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
          'position': 66,
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
          'position': 21,
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
          'position': 46,
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
          'position': 80,
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
          'position': 64,
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
          'position': 72,
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
          'position': 52,
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
          'position': 65,
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
          'position': 8,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['F+', 'SF+', 'RF+', '+ (pos)', 'Fo', 'SFo', 'Rfo', 'o (indeterminate)', 'F-', 'SF-', 'RF-', '- (neg)', 'ND (not done) ']
        },
        'reversed_n': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'reversed_n'
          }],
          'unit': 'Results',
          'position': 85,
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
          'position': 90,
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
          'position': 30,
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
          'position': 48,
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
          'position': 23,
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
          'position': 45,
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
          'position': 68,
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
          'position': 78,
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
          'position': 38,
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
          'position': 74,
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
          'position': 82,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'vdm_n': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'vdm_n'
          }],
          'unit': 'Results',
          'position': 56,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'tilt_inc_uncorr': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_inc_uncorr'
          }],
          'unit': 'Results',
          'position': 67,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between -90 and 90']
        },
        'average_inc': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_inc'
          }],
          'unit': 'Results',
          'position': 24,
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
          'position': 83,
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
          'position': 37,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'average_age_high': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_age_high'
          }],
          'unit': 'Results',
          'position': 22,
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
          'position': 40,
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
          'position': 35,
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
          'position': 94,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Jim R.D. Hart', 'Alexis Heard', 'Bob McIntire']
        },
        'pmag_result_name': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'pmag_result_name'
          }],
          'unit': 'Results',
          'position': 0,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['MY-POLE-XX']
        },
        'average_lat_sigma': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_lat_sigma'
          }],
          'unit': 'Results',
          'position': 15,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Uncertainty = 1xSD']
        },
        'tilt_n': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'tilt_n'
          }],
          'unit': 'Results',
          'position': 62,
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
          'position': 57,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'average_lon_sigma': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_lon_sigma'
          }],
          'unit': 'Results',
          'position': 17,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Uncertainty = 1xSD']
        },
        'er_citation_names': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'er_citation_names'
          }],
          'unit': 'Results',
          'position': 95,
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
          'position': 60,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        },
        'reversed_dec': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'reversed_dec'
          }],
          'unit': 'Results',
          'position': 84,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'iaga_database': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'iaga_database'
          }],
          'unit': 'Results',
          'position': 88,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['ARCHEO', 'PGMDB', 'PINT', 'PSVRL', 'SECVR', 'TRANS']
        },
        'vgp_dp': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'vgp_dp'
          }],
          'unit': 'Results',
          'position': 49,
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
          'position': 92,
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
          'position': 53,
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
          'position': 51,
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
          'position': 28,
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
          'position': 3,
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
          'position': 25,
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
          'position': 43,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'er_section_names': {
          'group': 'Results',
          'next_columns': [],
          'unit': 'Results',
          'position': 2,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['810C', '810D']
        },
        'normal_inc': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'normal_inc'
          }],
          'unit': 'Results',
          'position': 76,
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
          'position': 59,
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
          'position': 9,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['G+', 'IG+', '+ (pos)', 'Go', 'Igo', 'o (indeterminate)', 'G-', 'IG-', '- (neg)', 'ND (not done)']
        },
        'pmag_criteria_codes': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'pmag_criteria_codes'
          }],
          'unit': 'Results',
          'position': 91,
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
          'position': 86,
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
          'position': 14,
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
          'position': 11,
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
          'position': 13,
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
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Site 801', 'Site 1129']
        },
        'vgp_dm': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'vgp_dm'
          }],
          'unit': 'Results',
          'position': 50,
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
          'position': 77,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['Decimal degrees between 0 and 360']
        },
        'rock_magnetic_test': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'rock_magnetic_test'
          }],
          'unit': 'Results',
          'position': 12,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results',
          'examples': ['M (done)', 'ND (not done)']
        },
        'average_r': {
          'group': 'Results',
          'next_columns': [{
            'table': 'pmag_results',
            'column': 'average_r'
          }],
          'unit': 'Results',
          'position': 31,
          'label': 'Results',
          'type': 'Results',
          'description': 'Results'
        }
      },
      'label': 'Results',
      'description': 'Summary of results: Magnetic poles, VGP, VDM and VADM'
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
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'magic_experiment_name': {
          'group': 'Selection Criteria',
          'next_columns': [],
          'unit': 'Selection Criteria',
          'position': 2,
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['KOPA-299-1']
        },
        'specimen_int_rel_sigma_perc': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_int_rel_sigma_perc'
          }],
          'unit': 'Selection Criteria',
          'position': 16,
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
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'site_direction_type': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_direction_type'
          }],
          'unit': 'Selection Criteria',
          'position': 59,
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
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Polarity is normal (n)', 'reversed (r)', 'transitional (t)', 'excursion (e) or intermediate (i)']
        },
        'site_comp_nmb': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_comp_nmb'
          }],
          'unit': 'Selection Criteria',
          'position': 60,
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
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Polarity is normal (n)', 'reversed (r)', 'transitional (t)', 'excursion (e) or intermediate (i)']
        },
        'specimen_n': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_n'
          }],
          'unit': 'Selection Criteria',
          'position': 12,
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
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'specimen_magn_weight': {
          'group': 'Selection Criteria',
          'next_columns': [],
          'unit': 'Selection Criteria',
          'position': 35,
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
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'average_k': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'average_k'
          }],
          'unit': 'Selection Criteria',
          'position': 85,
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
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Polarity is normal (n)', 'reversed (r)', 'transitional (t)', 'excursion (e) or intermediate (i)']
        },
        'site_int_rel_sigma_perc': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'site_int_rel_sigma_perc'
          }],
          'unit': 'Selection Criteria',
          'position': 72,
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
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'specimen_moment': {
          'group': 'Selection Criteria',
          'next_columns': [],
          'unit': 'Selection Criteria',
          'position': 33,
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
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Confidence Level = 95%']
        },
        'specimen_direction_type': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'specimen_direction_type'
          }],
          'unit': 'Selection Criteria',
          'position': 8,
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
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = maximum; Uncertainty = 1xSD']
        },
        'sample_direction_type': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_direction_type'
          }],
          'unit': 'Selection Criteria',
          'position': 39,
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
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'sample_n_planes': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'sample_n_planes'
          }],
          'unit': 'Selection Criteria',
          'position': 45,
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
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'site_moment': {
          'group': 'Selection Criteria',
          'next_columns': [],
          'unit': 'Selection Criteria',
          'position': 74,
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'vgp_sigma': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'vgp_sigma'
          }],
          'unit': 'Selection Criteria',
          'position': 94,
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
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria'
        },
        'sample_magn_weight': {
          'group': 'Selection Criteria',
          'next_columns': [],
          'unit': 'Selection Criteria',
          'position': 56,
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'site_magn_weight': {
          'group': 'Selection Criteria',
          'next_columns': [],
          'unit': 'Selection Criteria',
          'position': 76,
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'sample_moment': {
          'group': 'Selection Criteria',
          'next_columns': [],
          'unit': 'Selection Criteria',
          'position': 54,
          'label': 'Selection Criteria',
          'type': 'Selection Criteria',
          'description': 'Selection Criteria',
          'examples': ['Criterion = minimum']
        },
        'measurement_step_max': {
          'group': 'Selection Criteria',
          'next_columns': [{
            'table': 'pmag_criteria',
            'column': 'measurement_step_max'
          }],
          'unit': 'Selection Criteria',
          'position': 4,
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