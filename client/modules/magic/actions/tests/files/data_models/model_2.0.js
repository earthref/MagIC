export const model = {
  'magic_version':'2.0',
  "tables": {
    "er_members": {
      "position": 5,
      "columns": {
        "er_member_name": {
          "group": "Rock Member",
          "next_columns": [{
            "table": "er_members",
            "column": "er_member_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Member Name",
          "type": "String",
          "description": "Name for member",
          "examples": ["Glasshound Member"]
        },
        "er_member_alternatives": {
          "group": "Rock Member",
          "next_columns": [{
            "table": "er_members",
            "column": "er_member_alternatives"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Site Name Alternatives",
          "type": "List",
          "description": "Colon-delimited list of alternative names and abbreviations"
        },
        "member_paleo_environment": {
          "group": "Rock Member",
          "next_columns": [{
            "table": "er_members",
            "column": "member_paleo_environment"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Member Paleo Environment",
          "type": "String",
          "description": "Depositional environment",
          "examples": ["Fluvial", "Continental Shelf", "Eolian", "Fringing Reef"]
        },
        "member_thickness": {
          "group": "Rock Member",
          "next_columns": [{
            "table": "er_members",
            "column": "member_thickness"
          }],
          "unit": "Number in m",
          "position": 6,
          "label": "Member Thickness",
          "type": "Number",
          "description": "Member thickness"
        },
        "member_class": {
          "group": "Rock Member",
          "next_columns": [{
            "table": "er_members",
            "column": "member_class"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Member Class",
          "type": "String",
          "description": "General lithology type",
          "examples": ["Igneous", "Sedimentary", "Metamorphic", "Archeological", "Intrusive", "Extrusive"]
        },
        "er_formation_name": {
          "group": "Rock Member",
          "next_columns": [{
            "table": "er_members",
            "column": "er_formation_name"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Formation Name",
          "type": "String",
          "description": "Name for formation",
          "examples": ["Bluebird Formation"]
        },
        "er_citation_names": {
          "group": "Rock Member",
          "next_columns": [{
            "table": "er_members",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "er_scientist_mail_names": {
          "group": "Rock Member",
          "next_columns": [{
            "table": "er_members",
            "column": "er_scientist_mail_names"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Research Scientist Names",
          "type": "List",
          "description": "Colon-delimited list of names for scientists who described member",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "member_description": {
          "group": "Rock Member",
          "next_columns": [{
            "table": "er_members",
            "column": "member_description"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Member Description",
          "type": "String",
          "description": "Detailed description"
        },
        "member_lithology": {
          "group": "Rock Member",
          "next_columns": [{
            "table": "er_members",
            "column": "member_lithology"
          }],
          "unit": "Text",
          "position": 4,
          "label": "Member Lithology",
          "type": "String",
          "description": "Lithology",
          "examples": ["Basalt", "Granite", "Mudstone", "Tuff", "Granodiorite", "Marl"]
        }
      },
      "label": "Rock Member",
      "description": "Unique rock member or section"
    },
    "magic_calibrations": {
      "position": 19,
      "columns": {
        "calibration_time_zone": {
          "group": "Calibrations",
          "next_columns": [{
            "table": "magic_calibrations",
            "column": "calibration_time_zone"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Calibration Date Time Zone",
          "type": "String",
          "description": "Time zone"
        },
        "er_specimen_name": {
          "group": "Calibrations",
          "next_columns": [{
            "table": "magic_calibrations",
            "column": "er_specimen_name"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Specimen Name",
          "type": "String",
          "description": "Name for specimen",
          "examples": ["Bas123a-01x"]
        },
        "magic_instrument_codes": {
          "group": "Calibrations",
          "next_columns": [{
            "table": "magic_calibrations",
            "column": "magic_instrument_codes"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Instrument Codes",
          "type": "List",
          "description": "Colon-delimited list of instrument codes",
          "examples": ["SIO-Bubba", "IRM-OldBlue"]
        },
        "magic_method_codes": {
          "group": "Calibrations",
          "next_columns": [{
            "table": "magic_calibrations",
            "column": "magic_method_codes"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Method Codes",
          "type": "List",
          "description": "Colon-delimited list of method codes",
          "examples": ["DE-DC0", "FT-F1", "LP-DCDMAG"]
        },
        "er_mineral_name": {
          "group": "Calibrations",
          "next_columns": [{
            "table": "magic_calibrations",
            "column": "er_mineral_name"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Mineral Name",
          "type": "String",
          "description": "Name for mineral",
          "examples": ["San03-001"]
        },
        "er_synthetic_name": {
          "group": "Calibrations",
          "next_columns": [{
            "table": "magic_calibrations",
            "column": "er_synthetic_name"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Synthetic Material Name",
          "type": "String",
          "description": "Name for synthetic material",
          "examples": ["STD1546-A1"]
        },
        "calibration_date": {
          "group": "Calibrations",
          "next_columns": [{
            "table": "magic_calibrations",
            "column": "calibration_date"
          }],
          "unit": "Text",
          "position": 4,
          "label": "Calibration Date",
          "type": "Date",
          "description": "Date of last calibration",
          "examples": ["Number in the \"yyyy:mm:dd:hh:mm:ss.ss\" format"]
        },
        "er_citation_names": {
          "group": "Calibrations",
          "next_columns": [{
            "table": "magic_calibrations",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 10,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "calibration_description": {
          "group": "Calibrations",
          "next_columns": [{
            "table": "magic_calibrations",
            "column": "calibration_description"
          }],
          "unit": "Text",
          "position": 6,
          "label": "Calibration Description",
          "type": "String",
          "description": "Detailed description"
        },
        "er_analyst_mail_names": {
          "group": "Calibrations",
          "next_columns": [{
            "table": "magic_calibrations",
            "column": "er_analyst_mail_names"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Analyst Names",
          "type": "List",
          "description": "Colon-delimited list of names for analysts",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "er_sample_name": {
          "group": "Calibrations",
          "next_columns": [{
            "table": "magic_calibrations",
            "column": "er_sample_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Sample Name",
          "type": "String",
          "description": "Name for sample",
          "examples": ["Bas123a-01"]
        }
      },
      "label": "Calibrations",
      "description": "Calibrations"
    },
    "er_sites": {
      "position": 7,
      "columns": {
        "er_member_name": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "er_member_name"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Member Name",
          "type": "String",
          "description": "Name for member",
          "examples": ["Glasshound Member"]
        },
        "magic_method_codes": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "magic_method_codes"
          }],
          "unit": "Text",
          "position": 19,
          "label": "Method Codes",
          "type": "List",
          "description": "Colon-delimited list of method codes",
          "examples": ["DE-DC0", "FT-F1", "LP-DCDMAG"]
        },
        "site_lon": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "site_lon"
          }],
          "unit": "Number in Degrees",
          "position": 12,
          "label": "Site Longitude",
          "type": "Number",
          "description": "Site location -- longitude",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "er_formation_name": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "er_formation_name"
          }],
          "unit": "Text",
          "position": 4,
          "label": "Formation Name",
          "type": "String",
          "description": "Name for formation",
          "examples": ["Bluebird Formation"]
        },
        "site_lithology": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "site_lithology"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Site Lithology",
          "type": "String",
          "description": "Site lithology or archeological classification",
          "examples": ["Basalt", "Granite", "Mudstone", "Tuff", "Granodiorite", "Marl"]
        },
        "site_definition": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "site_definition"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Site Definition",
          "type": "String",
          "description": "General definition of site",
          "examples": ["Single (s) site or composite (c) site including various geological units"]
        },
        "site_description": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "site_description"
          }],
          "unit": "Text",
          "position": 18,
          "label": "Site Description",
          "type": "String",
          "description": "Detailed description"
        },
        "er_scientist_mail_names": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "er_scientist_mail_names"
          }],
          "unit": "Text",
          "position": 20,
          "label": "Research Scientist Names",
          "type": "List",
          "description": "Colon-delimited list of names for scientists who described site",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "site_location_precision": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "site_location_precision"
          }],
          "unit": "Number in Degrees",
          "position": 13,
          "label": "Site Location Precision",
          "type": "Number",
          "description": "Site location -- precision in latitude and longitude",
          "examples": ["Decimal degrees"]
        },
        "site_composite_depth": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "site_composite_depth"
          }],
          "unit": "Number in m",
          "position": 17,
          "label": "Site Composite Depth",
          "type": "Number",
          "description": "Site location -- composite depth in MBSF as used by ODP",
          "examples": ["Meters below seafloor"]
        },
        "er_site_alternatives": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "er_site_alternatives"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Site Name Alternatives",
          "type": "List",
          "description": "Colon-delimited list of alternative names and abbreviations"
        },
        "site_drill_depth": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "site_drill_depth"
          }],
          "unit": "Number in m",
          "position": 16,
          "label": "Site Drill Depth",
          "type": "Number",
          "description": "Site location -- depth in MBSF as used by ODP",
          "examples": ["Meters below seafloor"]
        },
        "site_type": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "site_type"
          }],
          "unit": "Text",
          "position": 10,
          "label": "Site Type",
          "type": "String",
          "description": "Site type",
          "examples": ["Flow Top", "Glassy Margin", "Pot Rim", "Pillow", "Kiln", "Sediment Layer"]
        },
        "site_height": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "site_height"
          }],
          "unit": "Number in m",
          "position": 15,
          "label": "Site Stratigraphic Height",
          "type": "Number",
          "description": "Site location -- stratigraphic height",
          "examples": ["Positive is up in section or core", "while negative is down relative to reference height"]
        },
        "site_elevation": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "site_elevation"
          }],
          "unit": "Number in m",
          "position": 14,
          "label": "Site Elevation",
          "type": "Number",
          "description": "Site location -- elevation relative to sealevel",
          "examples": ["Meters above sealevel"]
        },
        "site_class": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "site_class"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Site Class",
          "type": "String",
          "description": "General lithology type",
          "examples": ["Igneous", "Sedimentary", "Metamorphic", "Archeological", "Intrusive", "Extrusive"]
        },
        "er_expedition_name": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "er_expedition_name"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Expedition Name",
          "type": "String",
          "description": "Name for seagoing or land expedition",
          "examples": ["AVON02MV"]
        },
        "er_site_name": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "er_site_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Site Name",
          "type": "String",
          "description": "Name for site",
          "examples": ["Bas123a"]
        },
        "er_section_name": {
          "group": "Sites",
          "next_columns": [{}],
          "unit": "Text",
          "position": 6,
          "label": "Section Name",
          "type": "String",
          "description": "Name for section or core",
          "examples": ["Berkeley Lava Flows", "810C", "1129D"]
        },
        "er_citation_names": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 21,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "site_lat": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "site_lat"
          }],
          "unit": "Number in Degrees",
          "position": 11,
          "label": "Site Latitude",
          "type": "Number",
          "description": "Site location -- latitude",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "er_location_name": {
          "group": "Sites",
          "next_columns": [{
            "table": "er_sites",
            "column": "er_location_name"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Location Name",
          "type": "String",
          "description": "Name for location or drill site",
          "examples": ["San Francisco Volcanic Province", "Site 801"]
        }
      },
      "label": "Sites",
      "description": "Unique rock unit in terms of geological age"
    },
    "er_citations": {
      "position": 14,
      "columns": {
        "issn": {
          "group": "Citations List",
          "next_columns": [{
            "table": "er_citations",
            "column": "issn"
          }],
          "unit": "Text",
          "position": 4,
          "label": "Citation ISSN",
          "type": "String",
          "description": "ISSN number",
          "examples": ["1525-2027"]
        },
        "er_citation_name": {
          "group": "Citations List",
          "next_columns": [{
            "table": "er_citations",
            "column": "er_citation_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Citation Name",
          "type": "String",
          "description": "Formal citation including its year of publication",
          "examples": ["Hart et al. 1999", "Hart & Staudigel 1999", "This Study"]
        },
        "keywords": {
          "group": "Citations List",
          "next_columns": [{
            "table": "er_citations",
            "column": "keywords"
          }],
          "unit": "Text",
          "position": 14,
          "label": "Citation Keywords",
          "type": "List",
          "description": "Colon-delimited list of keywords",
          "examples": ["Seamount", "Alkali basalt", "Hotspot"]
        },
        "city": {
          "group": "Citations List",
          "next_columns": [{
            "table": "er_citations",
            "column": "city"
          }],
          "unit": "Text",
          "position": 13,
          "label": "Publisher City",
          "type": "String",
          "description": "Publisher city",
          "examples": ["Dordrecht", "the Netherlands"]
        },
        "publisher": {
          "group": "Citations List",
          "next_columns": [{
            "table": "er_citations",
            "column": "publisher"
          }],
          "unit": "Text",
          "position": 12,
          "label": "Book Publisher",
          "type": "String",
          "description": "Publisher name",
          "examples": ["Kluwer Academics"]
        },
        "journal": {
          "group": "Citations List",
          "next_columns": [{
            "table": "er_citations",
            "column": "journal"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Journal",
          "type": "String",
          "description": "Journal name",
          "examples": ["Always use non-abbreviated journal names"]
        },
        "doi": {
          "group": "Citations List",
          "next_columns": [{
            "table": "er_citations",
            "column": "doi"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Citation DOI",
          "type": "String",
          "description": "DOI number",
          "examples": ["10.1029/2002GC000343"]
        },
        "volume": {
          "group": "Citations List",
          "next_columns": [{
            "table": "er_citations",
            "column": "volume"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Citation Volume",
          "type": "String",
          "description": "Volume of the journal, conference proceeding or serial book",
          "examples": ["34A or 101(4)"]
        },
        "citation_type": {
          "group": "Citations List",
          "next_columns": [{
            "table": "er_citations",
            "column": "citation_type"
          }],
          "unit": "Text",
          "position": 6,
          "label": "Citation Type",
          "type": "String",
          "description": "Citation type",
          "examples": ["Journal", "Book", "Edited Book", "Serial Book", "Abstract", "Ph.D. Thesis"]
        },
        "long_authors": {
          "group": "Citations List",
          "next_columns": [{
            "table": "er_citations",
            "column": "long_authors"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Long Authors",
          "type": "String",
          "description": "Complete author string",
          "examples": ["Hart", "S.R.", "Blusztajn", "J. and Meyer", "P.S."]
        },
        "book_editors": {
          "group": "Citations List",
          "next_columns": [{
            "table": "er_citations",
            "column": "book_editors"
          }],
          "unit": "Text",
          "position": 11,
          "label": "Book Editors",
          "type": "String",
          "description": "Book editors",
          "examples": ["Hart", "S.R.", "Blusztajn", "J. and Meyer", "P.S."]
        },
        "book_title": {
          "group": "Citations List",
          "next_columns": [{
            "table": "er_citations",
            "column": "book_title"
          }],
          "unit": "Text",
          "position": 10,
          "label": "Book Title",
          "type": "String",
          "description": "Book title",
          "examples": ["No period required at end of title"]
        },
        "iaga_ref_no": {
          "group": "Citations List",
          "next_columns": [{
            "table": "er_citations",
            "column": "iaga_ref_no"
          }],
          "unit": "Integer",
          "position": 16,
          "label": "IAGA Database Reference Number",
          "type": "Integer",
          "description": "IAGA7 database -- internal record number for reference"
        },
        "title": {
          "group": "Citations List",
          "next_columns": [{
            "table": "er_citations",
            "column": "title"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Citation Title",
          "type": "String",
          "description": "Paper title or chapter title in a book",
          "examples": ["No period required at end of title"]
        },
        "iaga_database": {
          "group": "Citations List",
          "next_columns": [{
            "table": "er_citations",
            "column": "iaga_database"
          }],
          "unit": "Text",
          "position": 15,
          "label": "IAGA Database Name",
          "type": "String",
          "description": "IAGA7 database -- name",
          "examples": ["ARCHEO", "PGMDB", "PINT", "PSVRL", "SECVR", "TRANS"]
        },
        "pages": {
          "group": "Citations List",
          "next_columns": [{
            "table": "er_citations",
            "column": "pages"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Citation Pages",
          "type": "String",
          "description": "Page range or total number of pages in a book",
          "examples": ["2", "345-2", "367 or 123"]
        },
        "year": {
          "group": "Citations List",
          "next_columns": [{
            "table": "er_citations",
            "column": "year"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Citation Year",
          "type": "Year",
          "description": "Year of publication",
          "examples": ["Number in the \"yyyy\" format", "where 2001a and 2001b are allowed"]
        }
      },
      "label": "Citations List",
      "description": "List of references"
    },
    "er_expeditions": {
      "position": 2,
      "columns": {
        "expedition_start_lon": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_start_lon"
          }],
          "unit": "Number in Degrees",
          "position": 11,
          "label": "Expedition Start Longitude",
          "type": "Number",
          "description": "Start location -- longitude",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "expedition_start_lat": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_start_lat"
          }],
          "unit": "Number in Degrees",
          "position": 10,
          "label": "Expedition Start Latitude",
          "type": "Number",
          "description": "Start location -- latitude",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "expedition_box_lat_max": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_box_lat_max"
          }],
          "unit": "Number in Degrees",
          "position": 21,
          "label": "Expedition Box Latitude",
          "type": "Number",
          "description": "Encompassing latitude and longitude box -- latitude maximum",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "expedition_ssv_sensor": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_ssv_sensor"
          }],
          "unit": "Text",
          "position": 27,
          "label": "Vessel SSV Sensor",
          "type": "String",
          "description": "Ship sensors -- SSV"
        },
        "er_crew_mail_names": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "er_crew_mail_names"
          }],
          "unit": "Text",
          "position": 33,
          "label": "Crew Names",
          "type": "List",
          "description": "Colon-delimited list of names for marine technicians and other crew",
          "examples": ["Josh Coldheart", "Jane Goodall"]
        },
        "er_expedition_alternatives": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "er_expedition_alternatives"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Expedition Name Alternatives",
          "type": "List",
          "description": "Colon-delimited list of alternative names and abbreviations"
        },
        "expedition_vru_sensor": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_vru_sensor"
          }],
          "unit": "Text",
          "position": 26,
          "label": "Vessel VRU Sensor",
          "type": "String",
          "description": "Ship sensors -- VRU"
        },
        "expedition_themes": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_themes"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Expedition Science Themes",
          "type": "String",
          "description": "Specific science themes and questions"
        },
        "er_scientist_mail_names": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "er_scientist_mail_names"
          }],
          "unit": "Text",
          "position": 32,
          "label": "Research Scientist Names",
          "type": "List",
          "description": "Colon-delimited list of names for scientists participating in expedition",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "expedition_end_lon": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_end_lon"
          }],
          "unit": "Number in Degrees",
          "position": 16,
          "label": "Expedition End Longitude",
          "type": "Number",
          "description": "Ending location -- longitude",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "expedition_end_date": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_end_date"
          }],
          "unit": "Text",
          "position": 17,
          "label": "Expedition End Date",
          "type": "Date",
          "description": "Ending location -- date",
          "examples": ["Number in the \"yyyy:mm:dd:hh:mm:ss.ss\" format"]
        },
        "expedition_end_time_zone": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_end_time_zone"
          }],
          "unit": "Text",
          "position": 18,
          "label": "Expedition End Time Zone",
          "type": "String",
          "description": "Ending location -- time zone"
        },
        "er_citation_names": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 34,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "expedition_end_loc": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_end_loc"
          }],
          "unit": "Text",
          "position": 19,
          "label": "Expedition End Location",
          "type": "String",
          "description": "Ending location -- name"
        },
        "expedition_ship": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_ship"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Expedition Ship",
          "type": "String",
          "description": "Expedition research vessel name",
          "examples": ["R/V Melville"]
        },
        "expedition_std_equipment": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_std_equipment"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Expedition Standard Equipment",
          "type": "String",
          "description": "Equipment available on vessel"
        },
        "expedition_mdg_sensor": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_mdg_sensor"
          }],
          "unit": "Text",
          "position": 28,
          "label": "Vessel MDG Sensor",
          "type": "String",
          "description": "Ship sensors -- MDG"
        },
        "expedition_sci_equipment": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_sci_equipment"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Expedition Science Equipment",
          "type": "String",
          "description": "Equipment brought on ship by scientists"
        },
        "expedition_box_lon_max": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_box_lon_max"
          }],
          "unit": "Number in Degrees",
          "position": 23,
          "label": "Expedition Box Longitude",
          "type": "Number",
          "description": "Encompassing latitude and longitude box -- longitude maximum",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "expedition_mb_sonar": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_mb_sonar"
          }],
          "unit": "Text",
          "position": 24,
          "label": "Vessel Sonar Type",
          "type": "String",
          "description": "Ship sensors -- sonar"
        },
        "expedition_description": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_description"
          }],
          "unit": "Text",
          "position": 29,
          "label": "Expedition Description",
          "type": "String",
          "description": "Detailed description"
        },
        "expedition_start_loc": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_start_loc"
          }],
          "unit": "Text",
          "position": 14,
          "label": "Expedition Start Location",
          "type": "String",
          "description": "Start location -- name"
        },
        "expedition_start_time_zone": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_start_time_zone"
          }],
          "unit": "Text",
          "position": 13,
          "label": "Expedition Start Time Zone",
          "type": "String",
          "description": "Start location -- time zone"
        },
        "expedition_nav_sensor": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_nav_sensor"
          }],
          "unit": "Text",
          "position": 25,
          "label": "Vessel NAV Sensor",
          "type": "String",
          "description": "Ship sensors -- NAV"
        },
        "er_pi_mail_names": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "er_pi_mail_names"
          }],
          "unit": "Text",
          "position": 31,
          "label": "Principal Investigator Names",
          "type": "List",
          "description": "Colon-delimited list of names for PI's of expedition",
          "examples": ["Jean Smith", "Conan H. Blacksun"]
        },
        "expedition_ngdc_numb": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_ngdc_numb"
          }],
          "unit": "Text",
          "position": 4,
          "label": "Expedition NGDC Number",
          "type": "String",
          "description": "NGDC cruise identifier"
        },
        "expedition_location": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_location"
          }],
          "unit": "Text",
          "position": 6,
          "label": "Expedition Location",
          "type": "List",
          "description": "Colon-delimited list of locations"
        },
        "er_expedition_name": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "er_expedition_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Expedition Name",
          "type": "String",
          "description": "Name for seagoing or land expedition",
          "examples": ["AVON02MV"]
        },
        "expedition_sponsor": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_sponsor"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Expedition Sponsor",
          "type": "String",
          "description": "Name(s) of sponsors",
          "examples": ["NSF-OCE", "NASA"]
        },
        "expedition_start_date": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_start_date"
          }],
          "unit": "Text",
          "position": 12,
          "label": "Expedition Start Date",
          "type": "Date",
          "description": "Start location -- date",
          "examples": ["Number in the \"yyyy:mm:dd:hh:mm:ss.ss\" format"]
        },
        "expedition_end_lat": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_end_lat"
          }],
          "unit": "Number in Degrees",
          "position": 15,
          "label": "Expedition End Latitude",
          "type": "Number",
          "description": "Ending location -- latitude",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "expedition_box_lon_min": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_box_lon_min"
          }],
          "unit": "Number in Degrees",
          "position": 22,
          "label": "Expedition Box Longitude",
          "type": "Number",
          "description": "Encompassing latitude and longitude box -- longitude minimum",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "expedition_url": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_url"
          }],
          "unit": "Text",
          "position": 30,
          "label": "Expedition URL",
          "type": "String",
          "description": "Website URL for the expedition explicitly",
          "examples": ["http://earthref.org"]
        },
        "expedition_leg": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_leg"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Expedition Leg",
          "type": "String",
          "description": "Leg number of a seagoing expedition"
        },
        "expedition_box_lat_min": {
          "group": "Expeditions",
          "next_columns": [{
            "table": "er_expeditions",
            "column": "expedition_box_lat_min"
          }],
          "unit": "Number in Degrees",
          "position": 20,
          "label": "Expedition Box Latitude",
          "type": "Number",
          "description": "Encompassing latitude and longitude box -- latitude minimum",
          "examples": ["Decimal degrees between -90 and 90"]
        }
      },
      "label": "Expeditions",
      "description": "Expedition, fieldwork or cruise definition"
    },
    "magic_measurements": {
      "position": 16,
      "columns": {
        "er_member_name": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "er_member_name"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Member Name",
          "type": "String",
          "description": "Name for member",
          "examples": ["Glasshound Member"]
        },
        "measurement_temp_change": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_temp_change"
          }],
          "unit": "Number in K",
          "position": 43,
          "label": "Measurement Temperature Change",
          "type": "Number",
          "description": "Change in temperature during each measurement step"
        },
        "magic_experiment_name": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "magic_experiment_names"
          }],
          "unit": "Text",
          "position": 11,
          "label": "Experiment Name",
          "type": "String",
          "description": "Name for experiment",
          "examples": ["KOPA-299-1"]
        },
        "measurement_standard": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_standard"
          }],
          "unit": "Flag",
          "position": 13,
          "label": "Measurement Standard Flag",
          "type": "String",
          "description": "Indicating if a standard (s) or an unknown (u) measurement",
          "examples": ["Default = u"]
        },
        "magic_method_codes": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "magic_method_codes"
          }],
          "unit": "Text",
          "position": 65,
          "label": "Method Codes",
          "type": "List",
          "description": "Colon-delimited list of method codes",
          "examples": ["DE-DC0", "FT-F1", "LP-DCDMAG"]
        },
        "treatment_ac_field_dc_on": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "treatment_ac_field_dc_on"
          }],
          "unit": "Number in T",
          "position": 33,
          "label": "Lab Treatment AC Field DC Field On",
          "type": "Number",
          "description": "AC field in a pARM experiment at which DC field is turned on"
        },
        "measurement_number": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_number"
          }],
          "unit": "Text",
          "position": 14,
          "label": "Measurement Number",
          "type": "String",
          "description": "Measurement identifier or lab number",
          "examples": ["03C3012"]
        },
        "treatment_ac_field_decay_rate": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "treatment_ac_field_decay_rate"
          }],
          "unit": "Number in T/s",
          "position": 32,
          "label": "Lab Treatment AC Field Decay Rate",
          "type": "Number",
          "description": "Decay rate of AC field in AC field demagnetization experiment"
        },
        "measurement_k": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_chi_volume"
          }],
          "unit": "Number in SI",
          "position": 55,
          "label": "Measurement Susceptibility K",
          "type": "Number",
          "description": "Magnetic susceptibility -- volume normalized"
        },
        "treatment_dc_field": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "treatment_dc_field"
          }],
          "unit": "Number in T",
          "position": 35,
          "label": "Lab Treatment DC Field",
          "type": "Number",
          "description": "Applied DC field"
        },
        "measurement_height": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_height"
          }],
          "unit": "Number in m",
          "position": 24,
          "label": "Measurement Stratigraphic Height",
          "type": "Number",
          "description": "Measurement location -- stratigraphic height",
          "examples": ["Positive is up in section or core", "while negative is down relative to reference height"]
        },
        "treatment_dc_field_theta": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "treatment_dc_field_theta"
          }],
          "unit": "Number in Degrees",
          "position": 40,
          "label": "Lab Treatment Orientation Theta",
          "type": "Number",
          "description": "Orientation of sample in magnetometer"
        },
        "measurement_magn_volume": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_magn_volume"
          }],
          "unit": "Number in A/m",
          "position": 53,
          "label": "Measurement Magnetization Volume",
          "type": "Number",
          "description": "Measured intensity -- remanent magnetization that is volume normalized"
        },
        "measurement_sd": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_sd"
          }],
          "unit": "Number in Degrees",
          "position": 63,
          "label": "Measurement Standard Deviation",
          "type": "Number",
          "description": "Standard deviation in measurements",
          "examples": ["Uncertainty = 1xSD"]
        },
        "measurement_x": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_chi_mass"
          }],
          "unit": "Number in m3/kg",
          "position": 56,
          "label": "Measurement Susceptibility X",
          "type": "Number",
          "description": "Magnetic susceptibility -- mass normalized"
        },
        "treatment_dc_field_phi": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "treatment_dc_field_phi"
          }],
          "unit": "Number in Degrees",
          "position": 39,
          "label": "Lab Treatment Orientation Phi",
          "type": "Number",
          "description": "Orientation of sample in magnetometer"
        },
        "treatment_temp_dc_on": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "treatment_temp_dc_on"
          }],
          "unit": "Number in K",
          "position": 29,
          "label": "Lab Treatment Temperature DC Field On",
          "type": "Number",
          "description": "Temperature in a pTRM experiment at which DC field is turned on"
        },
        "treatment_dc_field_decay_rate": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "treatment_dc_field_decay_rate"
          }],
          "unit": "Number in T/s",
          "position": 36,
          "label": "Lab Treatment DC Field Decay Rate",
          "type": "Number",
          "description": "Decay rate of DC field after switching off"
        },
        "measurement_moment": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_magn_moment"
          }],
          "unit": "Number in Am2",
          "position": 52,
          "label": "Measurement Moment",
          "type": "Number",
          "description": "Measured intensity -- remanent moment"
        },
        "measurement_elevation": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_elevation"
          }],
          "unit": "Number in m",
          "position": 23,
          "label": "Measurement Elevation",
          "type": "Number",
          "description": "Measurement location -- elevation relative to sealevel",
          "examples": ["Meters above sealevel"]
        },
        "measurement_drill_depth": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_drill_depth"
          }],
          "unit": "Number in m",
          "position": 25,
          "label": "Measurement Drill Depth",
          "type": "Number",
          "description": "Measurement location -- depth in MBSF as used by ODP",
          "examples": ["Meters below seafloor"]
        },
        "measurement_pos_z": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_pos_z"
          }],
          "unit": "Number in m",
          "position": 21,
          "label": "Measurement Z Position",
          "type": "Number",
          "description": "Position of the measurement relative to the specimen -- z"
        },
        "measurement_magnitude": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_magnitude"
          }],
          "unit": "Dimensionless",
          "position": 51,
          "label": "Measurement Magnitude",
          "type": "Number",
          "description": "Uncalibrated magnitude measurement"
        },
        "measurement_charging_mode": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_charging_mode"
          }],
          "unit": "Text",
          "position": 60,
          "label": "Measurement Hysteresis Charging Mode",
          "type": "String",
          "description": "Measurement hysteresis charging mode",
          "examples": ["Hysteresis", "Steady", "No Overshoot"]
        },
        "measurement_inc": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_inc"
          }],
          "unit": "Number in Degrees",
          "position": 49,
          "label": "Measurement Inclination",
          "type": "Number",
          "description": "Directions in sample coordinates -- inclination",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "measurement_r2": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_r2"
          }],
          "unit": "Dimensionless",
          "position": 61,
          "label": "Measurement Goodness of Fit",
          "type": "Number",
          "description": "Goodness of fit in regression",
          "examples": ["Number between 0 and 1"]
        },
        "measurement_description": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_description"
          }],
          "unit": "Text",
          "position": 64,
          "label": "Measurement Description",
          "type": "String",
          "description": "Detailed description"
        },
        "er_synthetic_name": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "er_synthetic_name"
          }],
          "unit": "Text",
          "position": 10,
          "label": "Synthetic Material Name",
          "type": "String",
          "description": "Name for synthetic material",
          "examples": ["STD1546-A1"]
        },
        "measurement_flag": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_flag"
          }],
          "unit": "Flag",
          "position": 12,
          "label": "Measurement Flag",
          "type": "String",
          "description": "Indicating if good (g) or bad (b) measurement",
          "examples": ["Default = g"]
        },
        "er_expedition_name": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "er_expedition_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Expedition Name",
          "type": "String",
          "description": "Name for seagoing or land expedition",
          "examples": ["AVON02MV"]
        },
        "treatment_dc_field_ac_on": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "treatment_dc_field_ac_on"
          }],
          "unit": "Number in T",
          "position": 37,
          "label": "Lab Treatment DC Field AC Field On",
          "type": "Number",
          "description": "DC field in DC field experiment at which AC field is turned on"
        },
        "measurement_csd": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_csd"
          }],
          "unit": "Number in Degrees",
          "position": 62,
          "label": "Measurement Circular Standard Deviation",
          "type": "Number",
          "description": "Circular standard deviation in measurements",
          "examples": ["Uncertainty = 1xSD"]
        },
        "measurement_lab_field_ac": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_lab_field_ac"
          }],
          "unit": "Number in T",
          "position": 47,
          "label": "Measurement Lab Field AC",
          "type": "Number",
          "description": "Measured AC field in laboratory"
        },
        "measurement_loop_x": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_loop_x"
          }],
          "unit": "Integer",
          "position": 17,
          "label": "Measurement Hysteresis Loop Number",
          "type": "Integer",
          "description": "Hysteresis loop -- counter"
        },
        "measurement_pos_x": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_pos_x"
          }],
          "unit": "Number in m",
          "position": 19,
          "label": "Measurement X Position",
          "type": "Number",
          "description": "Position of the measurement relative to the specimen -- x"
        },
        "measurement_positions": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_positions"
          }],
          "unit": "Integer",
          "position": 22,
          "label": "Measurement Number of Positions",
          "type": "Integer",
          "description": "Number of different positions in measurement"
        },
        "measurement_k_quadr": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_chi_qdr_volume"
          }],
          "unit": "Number in SI",
          "position": 57,
          "label": "Measurement Susceptibility K Quadrature",
          "type": "Number",
          "description": "Quadrature magnetic susceptibility -- volume normalized"
        },
        "er_formation_name": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "er_formation_name"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Formation Name",
          "type": "String",
          "description": "Name for formation",
          "examples": ["Bluebird Formation"]
        },
        "measurement_orient_phi": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_orient_phi"
          }],
          "unit": "Number in Degrees",
          "position": 45,
          "label": "Measurement Orientation Phi",
          "type": "Number",
          "description": "Orientation of sample in magnetometer"
        },
        "er_analyst_mail_names": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "er_analyst_mail_names"
          }],
          "unit": "Text",
          "position": 67,
          "label": "Analyst Names",
          "type": "List",
          "description": "Colon-delimited list of names for analysts",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "treatment_temp": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "treatment_temp"
          }],
          "unit": "Number in K",
          "position": 27,
          "label": "Lab Treatment Temperature",
          "type": "Number",
          "description": "Demagnetization temperature"
        },
        "measurement_lab_field_dc": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_lab_field_dc"
          }],
          "unit": "Number in T",
          "position": 48,
          "label": "Measurement Lab Field DC",
          "type": "Number",
          "description": "Measured DC field in laboratory"
        },
        "treatment_dc_field_ac_off": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "treatment_dc_field_ac_off"
          }],
          "unit": "Number in T",
          "position": 38,
          "label": "Lab Treatment DC Field AC Field Off",
          "type": "Number",
          "description": "DC field in DC field experiment at which AC field is turned off"
        },
        "measurement_temp": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_temp"
          }],
          "unit": "Number in K",
          "position": 42,
          "label": "Measurement Temperature",
          "type": "Number",
          "description": "Temperature"
        },
        "treatment_ac_field_dc_off": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "treatment_ac_field_dc_off"
          }],
          "unit": "Number in T",
          "position": 34,
          "label": "Lab Treatment AC Field DC Field Off",
          "type": "Number",
          "description": "AC field in a pARM experiment at which DC field is turned off"
        },
        "er_citation_names": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 68,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "er_site_name": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "er_site_name"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Site Name",
          "type": "String",
          "description": "Name for site",
          "examples": ["Bas123a"]
        },
        "measurement_freq": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_freq"
          }],
          "unit": "Number in Hz",
          "position": 44,
          "label": "Measurement Frequency",
          "type": "Number",
          "description": "Frequency"
        },
        "er_sample_name": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "er_sample_name"
          }],
          "unit": "Text",
          "position": 6,
          "label": "Sample Name",
          "type": "String",
          "description": "Name for sample",
          "examples": ["Bas123a-01"]
        },
        "measurement_loop_n": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_loop_n"
          }],
          "unit": "Integer",
          "position": 18,
          "label": "Measurement Hysteresis Loop Total",
          "type": "Integer",
          "description": "Hysteresis loop -- total number of loops"
        },
        "measurement_date": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_date"
          }],
          "unit": "Text",
          "position": 15,
          "label": "Measurement Date and Time",
          "type": "Date",
          "description": "Date and time of the measurement",
          "examples": ["Number in the \"yyyy:mm:dd:hh:mm:ss.ss\" format"]
        },
        "er_specimen_name": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "er_specimen_name"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Specimen Name",
          "type": "String",
          "description": "Name for specimen",
          "examples": ["Bas123a-01x"]
        },
        "measurement_x_quadr": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_chi_qdr_mass"
          }],
          "unit": "Number in m3/kg",
          "position": 58,
          "label": "Measurement Susceptibility X Quadrature",
          "type": "Number",
          "description": "Quadrature magnetic susceptibility -- mass normalized"
        },
        "measurement_dec": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_dec"
          }],
          "unit": "Number in Degrees",
          "position": 50,
          "label": "Measurement Declination",
          "type": "Number",
          "description": "Directions in sample coordinates -- declination",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "measurement_orient_theta": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_orient_theta"
          }],
          "unit": "Number in Degrees",
          "position": 46,
          "label": "Measurement Orientation Theta",
          "type": "Number",
          "description": "Orientation of sample in magnetometer"
        },
        "measurement_demagn_code": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_demagn_code"
          }],
          "unit": "Text",
          "position": 41,
          "label": "Measurement Demagnetization Code",
          "type": "String",
          "description": "Demagnitization code for legacy data"
        },
        "measurement_magn_weight": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_magn_mass"
          }],
          "unit": "Number in Am2/kg",
          "position": 54,
          "label": "Measurement Magnetization Weight",
          "type": "Number",
          "description": "Measured intensity -- remanent magnetization that is weight normalized"
        },
        "measurement_sweep_rate": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_sweep_rate"
          }],
          "unit": "Number in T/s",
          "position": 59,
          "label": "Measurement Hysteresis Sweep Rate",
          "type": "Number",
          "description": "Rate of field sweep during a hysteresis loop measurement"
        },
        "measurement_time_zone": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_time_zone"
          }],
          "unit": "Text",
          "position": 16,
          "label": "Measurement Time Zone",
          "type": "String",
          "description": "Time zone"
        },
        "magic_instrument_codes": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "magic_instrument_codes"
          }],
          "unit": "Text",
          "position": 66,
          "label": "Instrument Code",
          "type": "List",
          "description": "Colon-delimited list of instrument codes",
          "examples": ["SIO-Bubba", "IRM-OldBlue"]
        },
        "measurement_pos_y": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_pos_y"
          }],
          "unit": "Number in m",
          "position": 20,
          "label": "Measurement Y Position",
          "type": "Number",
          "description": "Position of the measurement relative to the specimen -- y"
        },
        "er_mineral_name": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "er_mineral_name"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Mineral Name",
          "type": "String",
          "description": "Name for mineral",
          "examples": ["San03-001"]
        },
        "measurement_composite_depth": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "measurement_composite_depth"
          }],
          "unit": "Number in m",
          "position": 26,
          "label": "Measurement Composite Depth",
          "type": "Number",
          "description": "Measurement location -- composite depth in MBSF as used by ODP",
          "examples": ["Meters below seafloor"]
        },
        "treatment_ac_field": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "treatment_ac_field"
          }],
          "unit": "Number in T",
          "position": 31,
          "label": "Lab Treatment AC Field",
          "type": "Number",
          "description": "Peak field in AC demagnetization experiment"
        },
        "er_section_name": {
          "group": "Measurements",
          "next_columns": [{}],
          "unit": "Text",
          "position": 4,
          "label": "Section Name",
          "type": "String",
          "description": "Name for section or core",
          "examples": ["Berkeley Lava Flows", "810C", "1129D"]
        },
        "er_fossil_name": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "er_fossil_name"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Fossil Name",
          "type": "String",
          "description": "Name for fossil",
          "examples": ["AMM43-03"]
        },
        "treatment_temp_dc_off": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "treatment_temp_dc_off"
          }],
          "unit": "Number in K",
          "position": 30,
          "label": "Lab Treatment Temperature DC Field Off",
          "type": "Number",
          "description": "Temperature in a pTRM experiment at which DC field is turned off"
        },
        "er_location_name": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "er_location_name"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Location Name",
          "type": "String",
          "description": "Name for location or drill site",
          "examples": ["San Francisco Volcanic Province", "Site 801"]
        },
        "treatment_temp_decay_rate": {
          "group": "Measurements",
          "next_columns": [{
            "table": "magic_measurements",
            "column": "treatment_temp_decay_rate"
          }],
          "unit": "Number in K/s",
          "position": 28,
          "label": "Lab Treatment Temperature Decay Rate",
          "type": "Number",
          "description": "Decay rate of temperature on cooling"
        }
      },
      "label": "Measurements",
      "description": "Level zero analytical data"
    },
    "rmag_criteria": {
      "position": 30,
      "columns": {
        "rmag_criteria_code": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "rmag_criteria",
            "column": "rmag_criteria_code"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Criteria Code",
          "type": "String",
          "description": "Criteria type name or number",
          "examples": ["MY-ANIS567", "MY-LOOPS-12"]
        },
        "er_citation_names": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "rmag_criteria",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "criteria_description": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "rmag_criteria",
            "column": "criteria_description"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Criteria Description",
          "type": "String",
          "description": "Detailed description"
        },
        "criteria_definition": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "rmag_criteria",
            "column": "criteria_definition"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Criteria Definition",
          "type": "String",
          "description": "Definition of the criteria"
        }
      },
      "label": "Selection Criteria",
      "description": "Selection criteria used in data selection"
    },
    "magic_methods": {
      "position": 17,
      "columns": {
        "method_type": {
          "group": "Methods",
          "next_columns": [{
            "table": "magic_methods",
            "column": "method_type"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Method Type",
          "type": "String",
          "description": "Type of method",
          "examples": ["Lab Protocol"]
        },
        "magic_method_code": {
          "group": "Methods",
          "next_columns": [{
            "table": "magic_methods",
            "column": "magic_method_code"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Method Code",
          "type": "String",
          "description": "Unique code describing field, lab or statistical method",
          "examples": ["AC-AARM"]
        },
        "method_iaga7": {
          "group": "Methods",
          "next_columns": [{
            "table": "magic_methods",
            "column": "method_iaga7"
          }],
          "unit": "Text",
          "position": 4,
          "label": "Method IAGA-7 Code",
          "type": "String",
          "description": "IAGA-7 method code",
          "examples": ["C", "G", "F", "F*"]
        },
        "method_url": {
          "group": "Methods",
          "next_columns": [{
            "table": "magic_methods",
            "column": "method_url"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Method URLs",
          "type": "String",
          "description": "URL to website explaining method",
          "examples": ["http://earthref.org/MAGIC/books/Tauxe/2005/lecture.01.htm"]
        },
        "method_definition": {
          "group": "Methods",
          "next_columns": [{
            "table": "magic_methods",
            "column": "method_definition"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Method Definition",
          "type": "String",
          "description": "Definition",
          "examples": ["Paleo intensity experiment that uses a laboratory ARM to normalize NRM for paleofield estimation"]
        },
        "er_citation_names": {
          "group": "Methods",
          "next_columns": [{
            "table": "magic_methods",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "method_url_tauxe": {
          "group": "Methods",
          "next_columns": [{
            "table": "magic_methods",
            "column": "method_url_tauxe"
          }],
          "unit": "Text",
          "position": 6,
          "label": "Method URLs",
          "type": "String",
          "description": "URL to electronic handbook of L. Tauxe explaining method",
          "examples": ["http://earthref.org/MAGIC/books/Tauxe/2005/lecture.01.htm"]
        },
        "method_description": {
          "group": "Methods",
          "next_columns": [{
            "table": "magic_methods",
            "column": "method_description"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Method Description",
          "type": "String",
          "description": "Detailed description or glossary",
          "examples": ["Any paleo intensity experiment in which a laboratory ARM is used to normalize NRM for paleofield estimation as suggested by Levi and Banerjee (1976) or more detailed pseudo Thellier experiments by Tauxe et al. (1995)."]
        }
      },
      "label": "Methods",
      "description": "Description sampling, laboratory and statistical techniques"
    },
    "magic_instruments": {
      "position": 18,
      "columns": {
        "instrument_software_version": {
          "group": "Instruments",
          "next_columns": [{
            "table": "magic_instruments",
            "column": "instrument_software_version"
          }],
          "unit": "Text",
          "position": 13,
          "label": "Instrument Software Version",
          "type": "String",
          "description": "Software version",
          "examples": ["Version 1.53", "Build 056"]
        },
        "instrument_software": {
          "group": "Instruments",
          "next_columns": [{
            "table": "magic_instruments",
            "column": "instrument_software"
          }],
          "unit": "Text",
          "position": 12,
          "label": "Instrument Software",
          "type": "String",
          "description": "Software name",
          "examples": ["Dtech D2000 AF Demagnetizer", "Custom", "Ranger MS1200"]
        },
        "instrument_dimension": {
          "group": "Instruments",
          "next_columns": [{
            "table": "magic_instruments",
            "column": "instrument_dimension"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Instrument Dimensions",
          "type": "String",
          "description": "Diameter of sample access ",
          "examples": ["47", "80"]
        },
        "instrument_year": {
          "group": "Instruments",
          "next_columns": [{
            "table": "magic_instruments",
            "column": "instrument_year"
          }],
          "unit": "Integer",
          "position": 1,
          "label": "Instrument Year",
          "type": "Year",
          "description": "Instrument build year",
          "examples": ["Number in the \"yyyy\" format"]
        },
        "instrument_url_tauxe": {
          "group": "Instruments",
          "next_columns": [{
            "table": "magic_instruments",
            "column": "instrument_url_tauxe"
          }],
          "unit": "Text",
          "position": 16,
          "label": "Instrument URLs",
          "type": "String",
          "description": "URL to electronic handbook of L. Tauxe explaining instrument",
          "examples": ["http://lisa.tauxe.com/handbook/instrument.html"]
        },
        "instrument_atmosphere": {
          "group": "Instruments",
          "next_columns": [{
            "table": "magic_instruments",
            "column": "instrument_atmosphere"
          }],
          "unit": "Text",
          "position": 10,
          "label": "Instrument Atmosphere ",
          "type": "String",
          "description": "Instrument atmosphere ",
          "examples": ["Air", "Nitrogen", "Helium", "Argon", "Vacuum"]
        },
        "instrument_manufacturer": {
          "group": "Instruments",
          "next_columns": [{
            "table": "magic_instruments",
            "column": "instrument_manufacturer"
          }],
          "unit": "Text",
          "position": 4,
          "label": "Instrument Manufacturer",
          "type": "String",
          "description": "Instrument manufacturer",
          "examples": ["Bartington", "Custom", "Princeton Measurements Co."]
        },
        "instrument_operation_mode": {
          "group": "Instruments",
          "next_columns": [{
            "table": "magic_instruments",
            "column": "instrument_operation_mode"
          }],
          "unit": "Text",
          "position": 6,
          "label": "Instrument Operation Mode",
          "type": "String",
          "description": "Manual or automated operation mode",
          "examples": ["Rotating Field", "Flowing He Gas"]
        },
        "instrument_model": {
          "group": "Instruments",
          "next_columns": [{
            "table": "magic_instruments",
            "column": "instrument_model"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Instrument Model",
          "type": "String",
          "description": "Instrument model",
          "examples": ["D2000", "MS1200"]
        },
        "magic_instrument_code": {
          "group": "Instruments",
          "next_columns": [{
            "table": "magic_instruments",
            "column": "magic_instrument_code"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Instrument Code",
          "type": "String",
          "description": "Unique code describing instrument",
          "examples": ["SIO-Bubba", "IRM-OldBlue"]
        },
        "instrument_url": {
          "group": "Instruments",
          "next_columns": [{
            "table": "magic_instruments",
            "column": "instrument_url"
          }],
          "unit": "Text",
          "position": 15,
          "label": "Instrument URLs",
          "type": "String",
          "description": "URL to website explaining specific instrument",
          "examples": ["http://jcruiser.fu.edu/instrument.html"]
        },
        "er_citation_names": {
          "group": "Instruments",
          "next_columns": [{
            "table": "magic_instruments",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 17,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "instrument_temp_control": {
          "group": "Instruments",
          "next_columns": [{
            "table": "magic_instruments",
            "column": "instrument_temp_control"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Instrument Temperature Control",
          "type": "String",
          "description": "Instrument temperature control",
          "examples": ["Flowing Gas Heater", "Cryostat", "Exchange Gas", "Oven"]
        },
        "instrument_field_control": {
          "group": "Instruments",
          "next_columns": [{
            "table": "magic_instruments",
            "column": "instrument_field_control"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Instrument Field Control",
          "type": "String",
          "description": "Instrument field control",
          "examples": ["Coil Constant", "Hall Probe", "Shielding"]
        },
        "instrument_shielding": {
          "group": "Instruments",
          "next_columns": [{
            "table": "magic_instruments",
            "column": "instrument_shielding"
          }],
          "unit": "Text",
          "position": 11,
          "label": "Instrument Laboratory Environment",
          "type": "String",
          "description": "Instrument laboratory environment",
          "examples": ["Shielded Room", "Instrument Shielding Only", "Helmholtz Coils"]
        },
        "instrument_category": {
          "group": "Instruments",
          "next_columns": [{
            "table": "magic_instruments",
            "column": "instrument_category"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Instrument Category",
          "type": "String",
          "description": "Instrument category name",
          "examples": ["Magnetometer", "Susceptometer", "Domain Imager"]
        },
        "instrument_description": {
          "group": "Instruments",
          "next_columns": [{
            "table": "magic_instruments",
            "column": "instrument_description"
          }],
          "unit": "Text",
          "position": 14,
          "label": "Instrument Description",
          "type": "String",
          "description": "Detailed description"
        },
        "instrument_type": {
          "group": "Instruments",
          "next_columns": [{
            "table": "magic_instruments",
            "column": "instrument_type"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Instrument Type",
          "type": "String",
          "description": "Instrument type",
          "examples": ["AC bridge", "RF-SQUID", "MÂ¿ssbauer"]
        }
      },
      "label": "Instruments",
      "description": "Instrument listing based on institute, year of build and instrument name"
    },
    "rmag_hysteresis": {
      "position": 28,
      "columns": {
        "er_member_name": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "er_member_name"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Member Name",
          "type": "String",
          "description": "Name for member",
          "examples": ["Glasshound Member"]
        },
        "magic_experiment_name": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "magic_experiment_names"
          }],
          "unit": "Text",
          "position": 11,
          "label": "Experiment Name",
          "type": "String",
          "description": "Name for experiment",
          "examples": ["KOPA-299-1"]
        },
        "magic_method_codes": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "magic_method_codes"
          }],
          "unit": "Text",
          "position": 27,
          "label": "Method Codes",
          "type": "List",
          "description": "Colon-delimited list of method codes",
          "examples": ["DE-DC0", "FT-F1", "LP-DCDMAG"]
        },
        "hysteresis_bcr1": {
          "group": "Hysteresis Experiments",
          "next_columns": [{}],
          "unit": "Number in T",
          "position": 19,
          "label": "Hysteresis Bcr Wohlfarth",
          "type": "Number",
          "description": "Coercivity of remanence -- back field method"
        },
        "rmag_criteria_codes": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "rmag_criteria_codes"
          }],
          "unit": "Text",
          "position": 26,
          "label": "Criteria Codes",
          "type": "List",
          "description": "Colon-delimited list of criteria codes",
          "examples": ["MY-MAD", "MY-APLHA95"]
        },
        "measurement_file_name": {
          "group": "Hysteresis Experiments",
          "next_columns": [{}],
          "unit": "Text",
          "position": 12,
          "label": "Measurement File Name",
          "type": "String",
          "description": "Name for MagIC format text file containing measurement data",
          "examples": ["Hart.et.al.2000.data.txt"]
        },
        "hysteresis_ms": {
          "group": "Hysteresis Experiments",
          "next_columns": [{}],
          "unit": "Number in Am2",
          "position": 18,
          "label": "Hysteresis Ms",
          "type": "Number",
          "description": "Measured intensity of saturation magnetization"
        },
        "er_synthetic_name": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "er_synthetic_name"
          }],
          "unit": "Text",
          "position": 10,
          "label": "Synthetic Material Name",
          "type": "String",
          "description": "Name for synthetic material",
          "examples": ["STD1546-A1"]
        },
        "er_expedition_name": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "er_expedition_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Expedition Name",
          "type": "String",
          "description": "Name for expedition such as AVON02MV",
          "examples": ["AVON02MV"]
        },
        "hysteresis_ss": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "hysteresis_ss"
          }],
          "unit": "Dimensionless",
          "position": 15,
          "label": "Hysteresis S*",
          "type": "Number",
          "description": "Curvature of major loop in upper left quadrant",
          "examples": ["Number between 0 and 1"]
        },
        "hysteresis_xhf": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "hysteresis_xhf"
          }],
          "unit": "Number in m3",
          "position": 24,
          "label": "Hysteresis Xhf",
          "type": "Number",
          "description": "High field slope"
        },
        "measurement_loop_x": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "measurement_loop_x"
          }],
          "unit": "Integer",
          "position": 13,
          "label": "Measurement Hysteresis Loop Number",
          "type": "Integer",
          "description": "Hysteresis loop counter"
        },
        "er_formation_name": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "er_formation_name"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Formation Name",
          "type": "String",
          "description": "Name for formation",
          "examples": ["Bluebird Formation"]
        },
        "er_analyst_mail_names": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "er_analyst_mail_names"
          }],
          "unit": "Text",
          "position": 29,
          "label": "Analyst Names",
          "type": "List",
          "description": "Colon-delimited list of names for analysts",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "hysteresis_bc_plus": {
          "group": "Hysteresis Experiments",
          "next_columns": [{}],
          "unit": "Number in T",
          "position": 22,
          "label": "Hysteresis Bc+",
          "type": "Number",
          "description": "Coercivity in positive fields"
        },
        "hysteresis_sq": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "hysteresis_sq"
          }],
          "unit": "Dimensionless",
          "position": 16,
          "label": "Hysteresis Squareness",
          "type": "Number",
          "description": "Squareness of major loop",
          "examples": ["Number between 0 and 1"]
        },
        "er_site_name": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "er_site_name"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Site Name",
          "type": "String",
          "description": "Name for site",
          "examples": ["Bas123a"]
        },
        "er_citation_names": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 30,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "er_sample_name": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "er_sample_name"
          }],
          "unit": "Text",
          "position": 6,
          "label": "Sample Name",
          "type": "String",
          "description": "Name for sample",
          "examples": ["Bas123a-01"]
        },
        "er_specimen_name": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "er_specimen_name"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Specimen Name",
          "type": "String",
          "description": "Name for specimen",
          "examples": ["Bas123a-01x"]
        },
        "measurement_loop_n": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "measurement_loop_n"
          }],
          "unit": "Integer",
          "position": 14,
          "label": "Measurement Hysteresis Loop Total",
          "type": "Integer",
          "description": "Total number of hysteresis loops in experiment"
        },
        "hysteresis_bcr2": {
          "group": "Hysteresis Experiments",
          "next_columns": [{}],
          "unit": "Number in T",
          "position": 20,
          "label": "Hysteresis Bcr Jackson",
          "type": "Number",
          "description": "Coercivity of remanence -- Half delta M"
        },
        "hysteresis_mr": {
          "group": "Hysteresis Experiments",
          "next_columns": [{}],
          "unit": "Number in Am2",
          "position": 17,
          "label": "Hysteresis Mr",
          "type": "Number",
          "description": "Measured intensity of remanent moment"
        },
        "hysteresis_description": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "hysteresis_description"
          }],
          "unit": "Text",
          "position": 25,
          "label": "Hysteresis Description",
          "type": "String",
          "description": "Detailed description"
        },
        "magic_instrument_codes": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "magic_instrument_codes"
          }],
          "unit": "Text",
          "position": 28,
          "label": "Instrument Codes",
          "type": "List",
          "description": "Colon-delimited list of instrument codes",
          "examples": ["SIO-Bubba", "IRM-OldBlue"]
        },
        "hysteresis_bcr3": {
          "group": "Hysteresis Experiments",
          "next_columns": [{}],
          "unit": "Number in T",
          "position": 21,
          "label": "Hysteresis Bcr Tauxe",
          "type": "Number",
          "description": "Coercivity of remanence -- crossing of ascending / descending loops"
        },
        "er_mineral_name": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "er_mineral_name"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Mineral Name",
          "type": "String",
          "description": "Name for mineral",
          "examples": ["San03-001"]
        },
        "er_section_name": {
          "group": "Hysteresis Experiments",
          "next_columns": [{}],
          "unit": "Text",
          "position": 4,
          "label": "Section Name",
          "type": "String",
          "description": "Name for section or core",
          "examples": ["Berkeley Lava Flows", "810C", "1129D"]
        },
        "hysteresis_bc_min": {
          "group": "Hysteresis Experiments",
          "next_columns": [{}],
          "unit": "Number in T",
          "position": 23,
          "label": "Hysteresis Bc-",
          "type": "Number",
          "description": "Coercivity in negative fields"
        },
        "er_fossil_name": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "er_fossil_name"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Fossil Name",
          "type": "String",
          "description": "Name for fossil",
          "examples": ["AMM43-03"]
        },
        "er_location_name": {
          "group": "Hysteresis Experiments",
          "next_columns": [{
            "table": "rmag_hysteresis",
            "column": "er_location_name"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Location Name",
          "type": "String",
          "description": "Name for location or drill site",
          "examples": ["San Francisco Volcanic Province", "Site 801"]
        }
      },
      "label": "Hysteresis Experiments",
      "description": "Experiment for hysteresis loops and FORCs"
    },
    "er_samples": {
      "position": 8,
      "columns": {
        "er_member_name": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "er_member_name"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Member Name",
          "type": "String",
          "description": "Name for member",
          "examples": ["Glasshound Member"]
        },
        "magic_method_codes": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "magic_method_codes"
          }],
          "unit": "Text",
          "position": 29,
          "label": "Method Codes",
          "type": "List",
          "description": "Colon-delimited list of method codes",
          "examples": ["DE-DC0", "FT-F1", "LP-DCDMAG"]
        },
        "sample_location_precision": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_location_precision"
          }],
          "unit": "Number in Degrees",
          "position": 16,
          "label": "Sample Location Precision",
          "type": "Number",
          "description": "Sample location -- precision in latitude and longitude",
          "examples": ["Decimal degrees"]
        },
        "sample_elevation": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_elevation"
          }],
          "unit": "Number in m",
          "position": 17,
          "label": "Sample Elevation",
          "type": "Number",
          "description": "Sample location -- elevation relative to sealevel",
          "examples": ["Meters above sealevel"]
        },
        "er_scientist_mail_names": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "er_scientist_mail_names"
          }],
          "unit": "Text",
          "position": 30,
          "label": "Research Scientist Names",
          "type": "List",
          "description": "Colon-delimited list of names for scientists who took sample",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "sample_alteration_type": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_alteration_type"
          }],
          "unit": "Text",
          "position": 13,
          "label": "Sample Alteration Type",
          "type": "String",
          "description": "Sample alteration type",
          "examples": ["Hydrothermal", "Diagenetic", "Weathering", "Oxidation", "Metamorphic"]
        },
        "sample_azimuth": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_azimuth"
          }],
          "unit": "Number in Degrees",
          "position": 23,
          "label": "Sample Azimuth",
          "type": "Number",
          "description": "Sample azimuth as measured clockwise from the north",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "sample_bed_dip": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_bed_dip"
          }],
          "unit": "Number in Degrees",
          "position": 26,
          "label": "Sample Bedding Dip",
          "type": "Number",
          "description": "Dip of the bedding as measured to the right of strike direction",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "sample_type": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_type"
          }],
          "unit": "Text",
          "position": 10,
          "label": "Sample Type",
          "type": "String",
          "description": "Sample type",
          "examples": ["Flow Top", "Glassy Margin", "Pot Rim", "Pillow", "Kiln", "Dike"]
        },
        "sample_description": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_description"
          }],
          "unit": "Text",
          "position": 28,
          "label": "Sample Description",
          "type": "String",
          "description": "Detailed description"
        },
        "sample_alteration": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_alteration"
          }],
          "unit": "Text",
          "position": 12,
          "label": "Sample Alteration",
          "type": "String",
          "description": "Sample alteration grade",
          "examples": ["Severe", "High", "Mild", "Trace", "Unaltered"]
        },
        "sample_date": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_date"
          }],
          "unit": "Text",
          "position": 21,
          "label": "Sample Date",
          "type": "Date",
          "description": "Sampling date",
          "examples": ["Number in the \"yyyy:mm:dd:hh:mm:ss.ss\" format"]
        },
        "sample_texture": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_texture"
          }],
          "unit": "Text",
          "position": 11,
          "label": "Sample Texture",
          "type": "String",
          "description": "Sample texture",
          "examples": ["Holocrystalline", "Hawaiitic", "Homogeneous"]
        },
        "er_expedition_name": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "er_expedition_name"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Expedition Name",
          "type": "String",
          "description": "Name for seagoing or land expedition",
          "examples": ["AVON02MV"]
        },
        "sample_cooling_rate": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_cooling_rate"
          }],
          "unit": "Number in K/Ma",
          "position": 27,
          "label": "Sample Cooling Rate Estimate",
          "type": "Number",
          "description": "Estimated ancient in-situ cooling rate per Ma"
        },
        "er_sample_alternatives": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "er_sample_alternatives"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Sample Name Alternatives",
          "type": "List",
          "description": "Colon-delimited list of alternative names and abbreviations"
        },
        "sample_lon": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_lon"
          }],
          "unit": "Number in Degrees",
          "position": 15,
          "label": "Sample Longitude",
          "type": "Number",
          "description": "Sample location -- longitude",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "sample_lithology": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_lithology"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Sample Lithology",
          "type": "String",
          "description": "Sample lithology or archeological classification",
          "examples": ["Basalt", "Granite", "Mudstone", "Tuff", "Granodiorite", "Marl"]
        },
        "er_formation_name": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "er_formation_name"
          }],
          "unit": "Text",
          "position": 4,
          "label": "Formation Name",
          "type": "String",
          "description": "Name for formation",
          "examples": ["Bluebird Formation"]
        },
        "sample_time_zone": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_time_zone"
          }],
          "unit": "Text",
          "position": 22,
          "label": "Sample Time Zone",
          "type": "String",
          "description": "Sampling time zone"
        },
        "sample_composite_depth": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_composite_depth"
          }],
          "unit": "Number in m",
          "position": 20,
          "label": "Sample Composite Depth",
          "type": "Number",
          "description": "Sample location -- composite depth in MBSF as used by ODP",
          "examples": ["Meters below seafloor"]
        },
        "er_site_name": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "er_site_name"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Site Name",
          "type": "String",
          "description": "Name for site",
          "examples": ["Bas123a"]
        },
        "er_citation_names": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 31,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "er_sample_name": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "er_sample_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Sample Name",
          "type": "String",
          "description": "Name for sample",
          "examples": ["Bas123a-01"]
        },
        "sample_drill_depth": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_drill_depth"
          }],
          "unit": "Number in m",
          "position": 19,
          "label": "Sample Drill Depth",
          "type": "Number",
          "description": "Sample location -- depth in MBSF as used by ODP",
          "examples": ["Meters below seafloor"]
        },
        "sample_bed_dip_direction": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_bed_dip_direction"
          }],
          "unit": "Number in Degrees",
          "position": 25,
          "label": "Sample Bedding Dip Direction",
          "type": "Number",
          "description": "Direction of the dip of a paleo-horizontal plane in the bedding",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "sample_dip": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_dip"
          }],
          "unit": "Number in Degrees",
          "position": 24,
          "label": "Sample Dip",
          "type": "Number",
          "description": "Sample dip as measured into the outcrop",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "sample_height": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_height"
          }],
          "unit": "Number in m",
          "position": 18,
          "label": "Sample Stratigraphic Height",
          "type": "Number",
          "description": "Sample location -- stratigraphic height",
          "examples": ["Positive is up in section or core", "while negative is down relative to reference height"]
        },
        "sample_lat": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_lat"
          }],
          "unit": "Number in Degrees",
          "position": 14,
          "label": "Sample Latitude",
          "type": "Number",
          "description": "Sample location -- latitude",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "sample_class": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "sample_class"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Sample Class",
          "type": "String",
          "description": "General lithology type",
          "examples": ["Igneous", "Sedimentary", "Metamorphic", "Archeological", "Intrusive", "Extrusive"]
        },
        "er_section_name": {
          "group": "Samples",
          "next_columns": [{}],
          "unit": "Text",
          "position": 6,
          "label": "Section Name",
          "type": "String",
          "description": "Name for section or core",
          "examples": ["Berkeley Lava Flows", "810C", "1129D"]
        },
        "er_location_name": {
          "group": "Samples",
          "next_columns": [{
            "table": "er_samples",
            "column": "er_location_name"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Location Name",
          "type": "String",
          "description": "Name for location or drill site",
          "examples": ["San Francisco Volcanic Province", "Site 801"]
        }
      },
      "label": "Samples",
      "description": "Sample from site"
    },
    "er_locations": {
      "position": 3,
      "columns": {
        "terrane": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "terrane"
          }],
          "unit": "Text",
          "position": 14,
          "label": "Terrane Name",
          "type": "String",
          "description": "Terrane name",
          "examples": ["Colorado Plateau", "Baltica", "Grenville Province"]
        },
        "location_description": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "location_description"
          }],
          "unit": "Text",
          "position": 16,
          "label": "Location Description",
          "type": "String",
          "description": "Detailed description"
        },
        "er_scientist_mail_names": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "er_scientist_mail_names"
          }],
          "unit": "Text",
          "position": 18,
          "label": "Research Scientist Names",
          "type": "List",
          "description": "Colon-delimited list of names for scientists who described location",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "er_location_alternatives": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "er_location_alternatives"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Location Name Alternatives",
          "type": "List",
          "description": "Colon-delimited list of alternative names and abbreviations"
        },
        "region": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "region"
          }],
          "unit": "Text",
          "position": 12,
          "label": "Region Name",
          "type": "String",
          "description": "Region name",
          "examples": ["Baja California", "Gulf of Mexico"]
        },
        "location_end_lat": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "location_end_lat"
          }],
          "unit": "Number in Degrees",
          "position": 6,
          "label": "Geographic End Latitude",
          "type": "Number",
          "description": "Ending of section or core -- latitude ",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "location_begin_lon": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "location_begin_lon"
          }],
          "unit": "Number in Degrees",
          "position": 4,
          "label": "Geographic Begin Longitude",
          "type": "Number",
          "description": "Begin of section or core or outcrop -- longitude",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "location_end_elevation": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "location_end_elevation"
          }],
          "unit": "Number in m",
          "position": 8,
          "label": "Geographic End Elevation",
          "type": "Number",
          "description": "Ending of section or core -- elevation relative to sealevel",
          "examples": ["Meters above sealevel"]
        },
        "country": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "country"
          }],
          "unit": "Text",
          "position": 11,
          "label": "Country Name",
          "type": "String",
          "description": "Country name",
          "examples": ["Mexico", "Costa Rica", "the Netherlands"]
        },
        "continent_ocean": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "continent_ocean"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Continent or Ocean Island Region",
          "type": "String",
          "description": "Name for continent or ocean island region",
          "examples": ["North America", "Australia", "Europe", "Asia", "Artic Ocean", "Indian Ocean"]
        },
        "location_type": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "location_type"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Location Type",
          "type": "String",
          "description": "Location type",
          "examples": ["Drill Site", "Land Section", "Submarine Section", "Stratigraphic Section", "Archeological Site", "Outcrop"]
        },
        "location_end_lon": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "location_end_lon"
          }],
          "unit": "Number in Degrees",
          "position": 7,
          "label": "Geographic End Longitude",
          "type": "Number",
          "description": "Ending of section or core -- longitude ",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "location_begin_lat": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "location_begin_lat"
          }],
          "unit": "Number in Degrees",
          "position": 3,
          "label": "Geographic Begin Latitude",
          "type": "Number",
          "description": "Begin of section or core or outcrop -- latitude",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "er_citation_names": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 19,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "plate_block": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "plate_block"
          }],
          "unit": "Text",
          "position": 13,
          "label": "Plate or Block Name",
          "type": "String",
          "description": "Plate or tectonic block name",
          "examples": ["North American Plate", "Xifon Block", "Cocos Plate"]
        },
        "tectonic_setting": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "tectonic_setting"
          }],
          "unit": "Text",
          "position": 15,
          "label": "Tectonic Setting",
          "type": "String",
          "description": "Tectonic setting",
          "examples": ["Intra-Plate Volcanism", "Subduction Zone", "Mid-Oceanic Ridge"]
        },
        "ocean_sea": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "ocean_sea"
          }],
          "unit": "Text",
          "position": 10,
          "label": "Ocean or Sea Name",
          "type": "String",
          "description": "Name for location in an ocean or sea",
          "examples": ["Pacific Ocean", "North Sea", "Gulf of Mexico"]
        },
        "location_url": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "location_url"
          }],
          "unit": "Text",
          "position": 17,
          "label": "Location URL",
          "type": "String",
          "description": "Website URL for the location explicitly",
          "examples": ["http://earthref.org"]
        },
        "location_begin_elevation": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "location_begin_elevation"
          }],
          "unit": "Number in m",
          "position": 5,
          "label": "Geographic Begin Elevation",
          "type": "Number",
          "description": "Begin of section or core or outcrop -- elevation relative to sealevel",
          "examples": ["Meters above sealevel"]
        },
        "er_location_name": {
          "group": "Locations",
          "next_columns": [{
            "table": "er_locations",
            "column": "er_location_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Location Name",
          "type": "String",
          "description": "Name for location or drill site",
          "examples": ["San Francisco Volcanic Province", "Site 801"]
        }
      },
      "label": "Locations",
      "description": "Location definition"
    },
    "pmag_samples": {
      "position": 21,
      "columns": {
        "er_member_name": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "er_member_name"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Member Name",
          "type": "String",
          "description": "Name for member",
          "examples": ["Glasshound Member"]
        },
        "magic_experiment_name": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "magic_experiment_names"
          }],
          "unit": "Text",
          "position": 10,
          "label": "Experiment Name",
          "type": "String",
          "description": "Name for experiment",
          "examples": ["KOPA-299-1"]
        },
        "magic_method_codes": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "magic_method_codes"
          }],
          "unit": "Text",
          "position": 49,
          "label": "Method Codes",
          "type": "List",
          "description": "Colon-delimited list of method codes",
          "examples": ["DE-DC0", "FT-F1", "LP-DCDMAG"]
        },
        "sample_inc": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_inc"
          }],
          "unit": "Number in Degrees",
          "position": 26,
          "label": "Sample Inclination",
          "type": "Number",
          "description": "Directions in coordinates specified by tilt correction -- inclination",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "sample_magn_volume": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_magn_volume"
          }],
          "unit": "Number in A/m",
          "position": 44,
          "label": "Sample NRM Magnetization Volume",
          "type": "Number",
          "description": "Measured intensity -- remanent magnetization that is volume normalized"
        },
        "er_fossil_names": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "er_fossil_names"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Fossil Name List",
          "type": "List",
          "description": "Colon-delimited list of fossil names",
          "examples": ["AMM43-03", "AMM43-19"]
        },
        "sample_sigma": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_sigma"
          }],
          "unit": "Number in Degrees",
          "position": 28,
          "label": "Sample Sigma",
          "type": "Number",
          "description": "Directions in coordinates specified by tilt correction -- standard deviation",
          "examples": ["Uncertainty = 1xSD"]
        },
        "sample_comp_name": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_comp_name"
          }],
          "unit": "Text",
          "position": 20,
          "label": "Sample Component Name",
          "type": "String",
          "description": "Sample component name",
          "examples": ["Characteristic", "VRM", "Overprint", "A", "B", "C"]
        },
        "er_specimen_names": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "er_specimen_names"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Specimen Name List",
          "type": "List",
          "description": "Colon-delimited list of specimen names",
          "examples": ["Bas123a-01x", "Bas123a-01y"]
        },
        "sample_inferred_age": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_inferred_age"
          }],
          "unit": "Custom",
          "position": 21,
          "label": "Sample Inferred Age",
          "type": "Number",
          "description": "Sample inferred age"
        },
        "sample_int_sigma": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_int_sigma"
          }],
          "unit": "Number in T",
          "position": 37,
          "label": "Sample Paleo Intensity Sigma",
          "type": "Number",
          "description": "Average field strength -- uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "er_mineral_names": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "er_mineral_names"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Mineral Name List",
          "type": "List",
          "description": "Colon-delimited list of mineral names"
        },
        "sample_polarity": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_polarity"
          }],
          "unit": "Flag",
          "position": 15,
          "label": "Sample Magnetic Polarity",
          "type": "String",
          "description": "Polarity of sample",
          "examples": ["Polarity is normal (n)", "reversed (r)", "transitional (t)", "excursion (e) or intermediate (i)"]
        },
        "sample_comp_nmb": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_comp_nmb"
          }],
          "unit": "Integer",
          "position": 18,
          "label": "Sample Component Number",
          "type": "Integer",
          "description": "Magnetic component number"
        },
        "sample_int_rel_sigma": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_int_rel_sigma"
          }],
          "unit": "Dimensionless",
          "position": 40,
          "label": "Sample Paleo Intensity Relative Sigma",
          "type": "Number",
          "description": "Relative field strength -- uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "sample_description": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_description"
          }],
          "unit": "Text",
          "position": 46,
          "label": "Sample Description",
          "type": "String",
          "description": "Detailed description"
        },
        "sample_dec": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_dec"
          }],
          "unit": "Number in Degrees",
          "position": 27,
          "label": "Sample Declination",
          "type": "Number",
          "description": "Directions in coordinates specified by tilt correction -- declination",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "measurement_file_name": {
          "group": "Sample Data",
          "next_columns": [{}],
          "unit": "Text",
          "position": 11,
          "label": "Measurement File Name",
          "type": "String",
          "description": "Name for MagIC format text file containing measurement data",
          "examples": ["Hart.et.al.2000.data.txt"]
        },
        "sample_int_sigma_perc": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_int_sigma_perc"
          }],
          "unit": "Number in %",
          "position": 38,
          "label": "Sample Paleo Intensity Sigma %",
          "type": "Number",
          "description": "Average field strength -- uncertainty in percent",
          "examples": ["Uncertainty = 1xSD"]
        },
        "sample_inferred_age_sigma": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_inferred_age_sigma"
          }],
          "unit": "Custom",
          "position": 22,
          "label": "Sample Inferred Age Sigma",
          "type": "Number",
          "description": "Sample inferred age -- uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "sample_k": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_k"
          }],
          "unit": "Dimensionless",
          "position": 33,
          "label": "Sample K",
          "type": "Number",
          "description": "Fisher's dispersion parameter Kappa"
        },
        "sample_int_rel_sigma_perc": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_int_rel_sigma_perc"
          }],
          "unit": "Number in %",
          "position": 41,
          "label": "Sample Paleo Intensity Relative Sigma %",
          "type": "Number",
          "description": "Relative field strength -- uncertainty in percent",
          "examples": ["Uncertainty = 1xSD"]
        },
        "sample_inferred_age_low": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_inferred_age_low"
          }],
          "unit": "Custom",
          "position": 23,
          "label": "Sample Inferred Age Low",
          "type": "Number",
          "description": "Sample inferred age -- low range"
        },
        "er_expedition_name": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "er_expedition_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Expedition Name",
          "type": "String",
          "description": "Name for seagoing or land expedition",
          "examples": ["AVON02MV"]
        },
        "sample_nrm": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_nrm"
          }],
          "unit": "Flag",
          "position": 16,
          "label": "Sample NRM",
          "type": "String",
          "description": "Origin of the NRM is primary (p) or secondary (s)"
        },
        "sample_n": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_n"
          }],
          "unit": "Integer",
          "position": 30,
          "label": "Sample N",
          "type": "Integer",
          "description": "Number of specimens included in directional calculations"
        },
        "sample_tilt_correction": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_tilt_correction"
          }],
          "unit": "Number in %",
          "position": 35,
          "label": "Sample Tilt Correction",
          "type": "Number",
          "description": "Percentage tilt correction applied to the data",
          "examples": ["Correction between geographic (0%) and stratigraphic (100%); unoriented (-1%); partially oriented to horizontal only (-2%)"]
        },
        "measurement_step_unit": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "measurement_step_unit"
          }],
          "unit": "Text",
          "position": 14,
          "label": "Measurement Step Unit",
          "type": "String",
          "description": "Step included in calculation -- unit"
        },
        "sample_alpha95": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_alpha95"
          }],
          "unit": "Number in Degrees",
          "position": 29,
          "label": "Sample Alpha 95%",
          "type": "Number",
          "description": "Fisher circle",
          "examples": ["Confidence Level = 95%"]
        },
        "sample_int_n": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_int_n"
          }],
          "unit": "Integer",
          "position": 42,
          "label": "Sample Paleo Intensity N",
          "type": "Integer",
          "description": "Number of specimens included in intensity calculations"
        },
        "sample_inferred_age_high": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_inferred_age_high"
          }],
          "unit": "Custom",
          "position": 24,
          "label": "Sample Inferred Age High",
          "type": "Number",
          "description": "Sample inferred age -- high range"
        },
        "er_formation_name": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "er_formation_name"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Formation Name",
          "type": "String",
          "description": "Name for formation",
          "examples": ["Bluebird Formation"]
        },
        "er_analyst_mail_names": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "er_analyst_mail_names"
          }],
          "unit": "Text",
          "position": 51,
          "label": "Analyst Names",
          "type": "List",
          "description": "Colon-delimited list of names for analysts",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "sample_direction_type": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_direction_type"
          }],
          "unit": "Flag",
          "position": 17,
          "label": "Sample Direction Type",
          "type": "String",
          "description": "Direction determined from (l) or plane (p)"
        },
        "sample_int": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_int"
          }],
          "unit": "Number in T",
          "position": 36,
          "label": "Sample Paleo Intensity",
          "type": "Number",
          "description": "Average field strength"
        },
        "sample_n_planes": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_n_planes"
          }],
          "unit": "Integer",
          "position": 32,
          "label": "Sample N Best-Fit Planes",
          "type": "Integer",
          "description": "Number of specimens included based on best-fit planes"
        },
        "measurement_step_min": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "measurement_step_min"
          }],
          "unit": "Custom",
          "position": 12,
          "label": "Measurement Step Minimum",
          "type": "Number",
          "description": "Step included in calculation -- lower bound"
        },
        "sample_comp_n": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_comp_n"
          }],
          "unit": "Integer",
          "position": 19,
          "label": "Sample Component N",
          "type": "Integer",
          "description": "Total number of magnetic components in specimen"
        },
        "er_site_name": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "er_site_name"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Site Name",
          "type": "String",
          "description": "Name for site",
          "examples": ["Bas123a"]
        },
        "er_citation_names": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 52,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "er_sample_name": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "er_sample_name"
          }],
          "unit": "Text",
          "position": 6,
          "label": "Sample Name",
          "type": "String",
          "description": "Name for sample",
          "examples": ["Bas123a-01"]
        },
        "pmag_rotation_codes": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "pmag_rotation_codes"
          }],
          "unit": "Text",
          "position": 48,
          "label": "Rotation Codes",
          "type": "List",
          "description": "Colon-delimited list of rotation codes",
          "examples": ["MY-TILT1", "MY-TILT2", "MY-TRANS1"]
        },
        "sample_n_lines": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_n_lines"
          }],
          "unit": "Integer",
          "position": 31,
          "label": "Sample N Best-Fit Lines",
          "type": "Integer",
          "description": "Number of specimens included based on best-fit lines"
        },
        "sample_magn_weight": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_magn_mass"
          }],
          "unit": "Number in Am2/kg",
          "position": 45,
          "label": "Sample NRM Magnetization Weight",
          "type": "Number",
          "description": "Measured intensity -- remanent magnetization that is weight normalized"
        },
        "measurement_step_max": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "measurement_step_max"
          }],
          "unit": "Custom",
          "position": 13,
          "label": "Measurement Step Maximum",
          "type": "Number",
          "description": "Step included in calculation -- higher bound"
        },
        "sample_moment": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_magn_moment"
          }],
          "unit": "Number in Am2",
          "position": 43,
          "label": "Sample NRM Moment",
          "type": "Number",
          "description": "Measured intensity -- remanent moment"
        },
        "sample_inferred_age_unit": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_inferred_age_unit"
          }],
          "unit": "Text",
          "position": 25,
          "label": "Sample Inferred Age Unit",
          "type": "String",
          "description": "Sample inferred age -- age unit",
          "examples": ["Ma", "Ka", "Ga", "Years BP", "Years AD (+/-)", "Years Cal BP", "Years Cal AD (+/-)"]
        },
        "sample_int_rel": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_int_rel"
          }],
          "unit": "Dimensionless",
          "position": 39,
          "label": "Sample Paleo Intensity Relative",
          "type": "Number",
          "description": "Relative field strength"
        },
        "magic_instrument_codes": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "magic_instrument_codes"
          }],
          "unit": "Text",
          "position": 50,
          "label": "Instrument Codes",
          "type": "List",
          "description": "Colon-delimited list of instrument codes",
          "examples": ["SIO-Bubba", "IRM-OldBlue"]
        },
        "pmag_criteria_codes": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "pmag_criteria_codes"
          }],
          "unit": "Text",
          "position": 47,
          "label": "Criteria Codes",
          "type": "List",
          "description": "Colon-delimited list of criteria codes",
          "examples": ["MY-MAD", "MY-APLHA95"]
        },
        "er_section_name": {
          "group": "Sample Data",
          "next_columns": [{}],
          "unit": "Text",
          "position": 4,
          "label": "Section Name",
          "type": "String",
          "description": "Name for section or core",
          "examples": ["Berkeley Lava Flows", "810C", "1129D"]
        },
        "er_location_name": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "er_location_name"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Location Name",
          "type": "String",
          "description": "Name for location or drill site",
          "examples": ["San Francisco Volcanic Province", "Site 801"]
        },
        "sample_r": {
          "group": "Sample Data",
          "next_columns": [{
            "table": "pmag_samples",
            "column": "sample_r"
          }],
          "unit": "Dimensionless",
          "position": 34,
          "label": "Sample R",
          "type": "Number",
          "description": "Resultant Fisher vector"
        }
      },
      "label": "Sample Data",
      "description": "Sample from site"
    },
    "er_mailinglist": {
      "position": 15,
      "columns": {
        "department": {
          "group": "Mailing List Contributors",
          "next_columns": [{
            "table": "er_mailinglist",
            "column": "department"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Department Name",
          "type": "String",
          "description": "Department or faculty name",
          "examples": ["Laboratory of Isotope Geology"]
        },
        "email": {
          "group": "Mailing List Contributors",
          "next_columns": [{
            "table": "er_mailinglist",
            "column": "email"
          }],
          "unit": "Text",
          "position": 10,
          "label": "Email Address",
          "type": "String",
          "description": "Email address",
          "examples": ["jcruiser@fu.edu"]
        },
        "url": {
          "group": "Mailing List Contributors",
          "next_columns": [{
            "table": "er_mailinglist",
            "column": "url"
          }],
          "unit": "Text",
          "position": 11,
          "label": "Personal URL",
          "type": "String",
          "description": "Personal url",
          "examples": ["http://jcruiser.fu.edu/home.html"]
        },
        "er_mail_name": {
          "group": "Mailing List Contributors",
          "next_columns": [{
            "table": "er_mailinglist",
            "column": "er_mail_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Name",
          "type": "String",
          "description": "Name",
          "examples": ["John A.B. Cruiser"]
        },
        "organization": {
          "group": "Mailing List Contributors",
          "next_columns": [{
            "table": "er_mailinglist",
            "column": "organization"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Organization Name",
          "type": "String",
          "description": "Organization or university name",
          "examples": ["Free University Amsterdam"]
        },
        "country": {
          "group": "Mailing List Contributors",
          "next_columns": [{
            "table": "er_mailinglist",
            "column": "country"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Country",
          "type": "String",
          "description": "Country",
          "examples": ["U.S.A."]
        },
        "zip_code": {
          "group": "Mailing List Contributors",
          "next_columns": [{
            "table": "er_mailinglist",
            "column": "zip_code"
          }],
          "unit": "Text",
          "position": 6,
          "label": "Zip Code",
          "type": "String",
          "description": "Zip code",
          "examples": ["CA 92093"]
        },
        "state": {
          "group": "Mailing List Contributors",
          "next_columns": [{
            "table": "er_mailinglist",
            "column": "state"
          }],
          "unit": "Text",
          "position": 5,
          "label": "State",
          "type": "String",
          "description": "State or province",
          "examples": ["California"]
        },
        "address": {
          "group": "Mailing List Contributors",
          "next_columns": [{
            "table": "er_mailinglist",
            "column": "address"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Address",
          "type": "String",
          "description": "Street address",
          "examples": ["Vessel Blvd. 2345"]
        },
        "work_phone": {
          "group": "Mailing List Contributors",
          "next_columns": [{
            "table": "er_mailinglist",
            "column": "work_phone"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Work Phone",
          "type": "String",
          "description": "Work phone",
          "examples": ["620-345-4567"]
        },
        "city": {
          "group": "Mailing List Contributors",
          "next_columns": [{
            "table": "er_mailinglist",
            "column": "city"
          }],
          "unit": "Text",
          "position": 4,
          "label": "City",
          "type": "String",
          "description": "City",
          "examples": ["Amsterdam"]
        },
        "work_fax": {
          "group": "Mailing List Contributors",
          "next_columns": [{
            "table": "er_mailinglist",
            "column": "work_fax"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Work Fax",
          "type": "String",
          "description": "Work fax",
          "examples": ["621-345-4567"]
        }
      },
      "label": "Mailing List Contributors",
      "description": "List of addresses"
    },
    "er_sections": {
      "position": 6,
      "columns": {
        "er_member_name": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Text",
          "position": 5,
          "label": "Member Name",
          "type": "String",
          "description": "Name for member",
          "examples": ["Glasshound Member"]
        },
        "section_begin_lon": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Number in Degrees",
          "position": 12,
          "label": "Section Begin Longitude",
          "type": "Number",
          "description": "Beginning as defined by bottom of section or top of core -- longitude",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "section_begin_elevation": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Number in m",
          "position": 13,
          "label": "Section Begin Elevation",
          "type": "Number",
          "description": "Beginning as defined by bottom of section or top of core -- elevation relative to sealevel",
          "examples": ["Meters above sealevel"]
        },
        "section_definition": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Text",
          "position": 6,
          "label": "Section Definition",
          "type": "String",
          "description": "General definition of section in terms of its data collection",
          "examples": ["Either a single (s) section or the data is based on composite (c) or average (a) sections including various geological units"]
        },
        "er_scientist_mail_names": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Text",
          "position": 26,
          "label": "Research Scientist Names",
          "type": "List",
          "description": "Colon-delimited list of names for scientists who described section",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "section_type": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Text",
          "position": 9,
          "label": "Section Type",
          "type": "String",
          "description": "Section type",
          "examples": ["Subsection", "Polarity Transition", "Excursion"]
        },
        "section_begin_lat": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Number in Degrees",
          "position": 11,
          "label": "Section Begin Latitude",
          "type": "Number",
          "description": "Beginning as defined by bottom of section or top of core -- latitude",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "er_section_alternatives": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Text",
          "position": 1,
          "label": "Section Name Alternatives",
          "type": "List",
          "description": "Colon-delimited list of alternative names and abbreviations"
        },
        "section_end_height": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Number in m",
          "position": 20,
          "label": "Section End Stratigraphic Height",
          "type": "Number",
          "description": "End as defined by top of section or bottom of core -- stratigraphic height",
          "examples": ["Positive is up in section or core", "negative is down"]
        },
        "section_end_lat": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Number in Degrees",
          "position": 17,
          "label": "Section End Latitude",
          "type": "Number",
          "description": "End as defined by top of section or bottom of core -- latitude ",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "section_begin_composite_depth": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Number in m",
          "position": 16,
          "label": "Section Begin Composite Depth",
          "type": "Number",
          "description": "Beginning as defined by bottom of section or top of core -- composite depth in MBSF as used by ODP",
          "examples": ["Meters below seafloor"]
        },
        "er_expedition_name": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Text",
          "position": 2,
          "label": "Expedition Name",
          "type": "String",
          "description": "Name for seagoing or land expedition",
          "examples": ["AVON02MV"]
        },
        "section_begin_height": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Number in m",
          "position": 14,
          "label": "Section Begin Stratigraphic Height",
          "type": "Number",
          "description": "Beginning as defined by bottom of section or top of core -- stratigraphic height",
          "examples": ["Positive is up in section or core", "negative is down"]
        },
        "section_description": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Text",
          "position": 25,
          "label": "Section Description",
          "type": "String",
          "description": "Detailed description"
        },
        "er_formation_name": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Text",
          "position": 4,
          "label": "Formation Name",
          "type": "String",
          "description": "Name for formation",
          "examples": ["Bluebird Formation"]
        },
        "section_n": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Integer",
          "position": 10,
          "label": "Section N",
          "type": "Integer",
          "description": "Number of subsections included composite (stacked) section"
        },
        "section_end_lon": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Number in Degrees",
          "position": 18,
          "label": "Section End Longitude",
          "type": "Number",
          "description": "End as defined by top of section or bottom of core -- longitude ",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "section_end_elevation": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Number in m",
          "position": 19,
          "label": "Section End Elevation",
          "type": "Number",
          "description": "End as defined by top of section or bottom of core -- elevation relative to sealevel",
          "examples": ["Meters above sealevel"]
        },
        "er_citation_names": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Text",
          "position": 27,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "section_begin_drill_depth": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Number in m",
          "position": 15,
          "label": "Section Begin Drill Depth",
          "type": "Number",
          "description": "Beginning as defined by bottom of section or top of core -- depth in MBSF as used by ODP",
          "examples": ["Meters below seafloor"]
        },
        "section_dip": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Number in Degrees",
          "position": 24,
          "label": "Section Dip",
          "type": "Number",
          "description": "Section dip as measured into the outcrop",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "section_lithology": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Text",
          "position": 8,
          "label": "Section Lithology",
          "type": "String",
          "description": "Section lithology or archeological classification",
          "examples": ["Basalt", "Granite", "Mudstone", "Tuff", "Granodiorite", "Marl"]
        },
        "section_class": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Text",
          "position": 7,
          "label": "Section Class",
          "type": "String",
          "description": "General lithology type",
          "examples": ["Igneous", "Sedimentary", "Metamorphic", "Archeological", "Intrusive", "Extrusive"]
        },
        "section_end_composite_depth": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Number in m",
          "position": 22,
          "label": "Section End Composite Depth",
          "type": "Number",
          "description": "End as defined by top of section or bottom of core -- composite depth in MBSF as used by ODP",
          "examples": ["Meters below seafloor"]
        },
        "section_azimuth": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Number in Degrees",
          "position": 23,
          "label": "Section Azimuth",
          "type": "Number",
          "description": "Section azimuth as measured clockwise from the north",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "section_end_drill_depth": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Number in m",
          "position": 21,
          "label": "Section End Drill Depth",
          "type": "Number",
          "description": "End as defined by top of section or bottom of core -- depth in MBSF as used by ODP",
          "examples": ["Meters below seafloor"]
        },
        "er_section_name": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Text",
          "position": 0,
          "label": "Section Name",
          "type": "String",
          "description": "Name for section or core",
          "examples": ["Berkeley Lava Flows", "810C", "1129D"]
        },
        "er_location_name": {
          "group": "Sections",
          "next_columns": [{}],
          "unit": "Text",
          "position": 3,
          "label": "Location Name",
          "type": "String",
          "description": "Name for location or drill site",
          "examples": ["San Francisco Volcanic Province", "Site 801"]
        }
      },
      "label": "Sections",
      "description": "Group of sites or subsection in one or more outcrops and/or cores"
    },
    "er_synthetics": {
      "position": 12,
      "columns": {
        "er_member_name": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "er_member_name"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Member Name",
          "type": "String",
          "description": "Name for member",
          "examples": ["Glasshound Member"]
        },
        "magic_method_codes": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "magic_method_codes"
          }],
          "unit": "Text",
          "position": 22,
          "label": "Method Codes",
          "type": "List",
          "description": "Colon-delimited list of method codes",
          "examples": ["DE-DC0", "FT-F1", "LP-DCDMAG"]
        },
        "synthetic_dope_material": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "synthetic_dope_material"
          }],
          "unit": "Text",
          "position": 20,
          "label": "Synthetic Material Dope",
          "type": "String",
          "description": "Synthetic dope material"
        },
        "synthetic_shape": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "synthetic_shape"
          }],
          "unit": "Text",
          "position": 15,
          "label": "Synthetic Material Shape",
          "type": "String",
          "description": "Synthetic material shape",
          "examples": ["Euhedral", "Orthorhombic "]
        },
        "er_scientist_mail_names": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "er_scientist_mail_names"
          }],
          "unit": "Text",
          "position": 23,
          "label": "Research Scientist Names",
          "type": "List",
          "description": "Colon-delimited list of names for scientists who prepared synthetic material",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "synthetic_institution": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "synthetic_institution"
          }],
          "unit": "Text",
          "position": 12,
          "label": "Synthetic Material Institution",
          "type": "String",
          "description": "Name for institution that created synthetic material",
          "examples": ["IRM", "SIO"]
        },
        "synthetic_size": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "synthetic_size"
          }],
          "unit": "Text",
          "position": 16,
          "label": "Synthetic Material Size",
          "type": "String",
          "description": "Synthetic material grain size fraction",
          "examples": ["250-500 Â¿m"]
        },
        "er_synthetic_name": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "er_synthetic_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Synthetic Material Name",
          "type": "String",
          "description": "Name for synthetic material",
          "examples": ["STD1546-A1"]
        },
        "er_expedition_name": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "er_expedition_name"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Expedition Name",
          "type": "String",
          "description": "Name for seagoing or land expedition",
          "examples": ["AVON02MV"]
        },
        "synthetic_density": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "synthetic_density"
          }],
          "unit": "Number in g/m3",
          "position": 19,
          "label": "Synthetic Material Density",
          "type": "Number",
          "description": "Synthetic material  density"
        },
        "synthetic_volume": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "synthetic_volume"
          }],
          "unit": "Number in m3",
          "position": 17,
          "label": "Synthetic Material Volume",
          "type": "Number",
          "description": "Synthetic material  volume"
        },
        "er_formation_name": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "er_formation_name"
          }],
          "unit": "Text",
          "position": 4,
          "label": "Formation Name",
          "type": "String",
          "description": "Name for formation",
          "examples": ["Bluebird Formation"]
        },
        "er_synthetic_alternatives": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "er_synthetic_alternatives"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Synthetic Material Name Alternatives",
          "type": "List",
          "description": "Colon-delimited list of alternative names and abbreviations"
        },
        "er_site_name": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "er_site_name"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Site Name",
          "type": "String",
          "description": "Name for site",
          "examples": ["Bas123a"]
        },
        "er_citation_names": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 24,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "er_sample_name": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "er_sample_name"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Sample Name",
          "type": "String",
          "description": "Name for sample",
          "examples": ["Bas123a-01"]
        },
        "er_specimen_name": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "er_specimen_name"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Specimen Name",
          "type": "String",
          "description": "Name for specimen",
          "examples": ["Bas123a-01x"]
        },
        "synthetic_weight": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "synthetic_weight"
          }],
          "unit": "Number in g",
          "position": 18,
          "label": "Synthetic Material Weight",
          "type": "Number",
          "description": "Synthetic material  weight"
        },
        "synthetic_description": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "synthetic_description"
          }],
          "unit": "Text",
          "position": 21,
          "label": "Synthetic Material Description",
          "type": "String",
          "description": "Detailed description"
        },
        "synthetic_assemblage": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "synthetic_assemblage"
          }],
          "unit": "Text",
          "position": 14,
          "label": "Synthetic Material Assemblage",
          "type": "String",
          "description": "Synthetic material assemblage",
          "examples": ["Single Crystal", "Mineral Separate", "Polycrystalline"]
        },
        "synthetic_type": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "synthetic_type"
          }],
          "unit": "Text",
          "position": 13,
          "label": "Synthetic Material Type",
          "type": "String",
          "description": "Synthetic material type",
          "examples": ["Rock", "Biogenic", "Ceramic"]
        },
        "er_mineral_name": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "er_mineral_name"
          }],
          "unit": "Text",
          "position": 11,
          "label": "Mineral Name",
          "type": "String",
          "description": "Name for mineral",
          "examples": ["San03-001"]
        },
        "er_section_name": {
          "group": "Synthetic Materials",
          "next_columns": [{}],
          "unit": "Text",
          "position": 6,
          "label": "Section Name",
          "type": "String",
          "description": "Name for section or core",
          "examples": ["Berkeley Lava Flows", "810C", "1129D"]
        },
        "er_fossil_name": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "er_fossil_name"
          }],
          "unit": "Text",
          "position": 10,
          "label": "Fossil Name",
          "type": "String",
          "description": "Name for fossil",
          "examples": ["AMM43-03"]
        },
        "er_location_name": {
          "group": "Synthetic Materials",
          "next_columns": [{
            "table": "er_synthetics",
            "column": "er_location_name"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Location Name",
          "type": "String",
          "description": "Name for location or drill site",
          "examples": ["San Francisco Volcanic Province", "Site 801"]
        }
      },
      "label": "Synthetic Materials",
      "description": "Synthetic material that is not necessarily related to geology"
    },
    "rmag_remanence": {
      "position": 27,
      "columns": {
        "er_member_name": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "er_member_name"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Member Name",
          "type": "String",
          "description": "Name for member",
          "examples": ["Glasshound Member"]
        },
        "remanence_sratio": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "remanence_sratio"
          }],
          "unit": "Dimensionless",
          "position": 25,
          "label": "Remanence S Ratio",
          "type": "Number",
          "description": "SIRM ratio S(X)"
        },
        "magic_experiment_name": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "magic_experiment_names"
          }],
          "unit": "Text",
          "position": 11,
          "label": "Experiment Name",
          "type": "String",
          "description": "Name for experiment",
          "examples": ["KOPA-299-1"]
        },
        "remanence_delta_ratio": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "remanence_delta_ratio"
          }],
          "unit": "Dimensionless",
          "position": 15,
          "label": "Remanence Delta FC/ZFC Ratio",
          "type": "Number",
          "description": "Ratio (Delta FC/Delta ZFC)"
        },
        "remanence_temp_mineral": {
          "group": "Remanence Experiments",
          "next_columns": [{}],
          "unit": "Text",
          "position": 24,
          "label": "Remanence Critical Mineral Type",
          "type": "List",
          "description": "Interpreted mineral(s) causing the transition",
          "examples": ["Magnetite", "hematite", "maghemite"]
        },
        "magic_method_codes": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "magic_method_codes"
          }],
          "unit": "Text",
          "position": 42,
          "label": "Method Codes",
          "type": "List",
          "description": "Colon-delimited list of method codes",
          "examples": ["DE-DC0", "FT-F1", "LP-DCDMAG"]
        },
        "remanence_cross_over": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "remanence_cross_over"
          }],
          "unit": "Number in T",
          "position": 30,
          "label": "Remanence Cross Over Point",
          "type": "Number",
          "description": "Field at which demagnetization moment equals acquisition moment"
        },
        "remanence_cmf": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "remanence_cmf"
          }],
          "unit": "Number in T",
          "position": 34,
          "label": "Remanence Component Median Field",
          "type": "Number",
          "description": "Median field of remanence component"
        },
        "remanence_mr": {
          "group": "Remanence Experiments",
          "next_columns": [{}],
          "unit": "Number in Am2",
          "position": 18,
          "label": "Remanence Mr",
          "type": "Number",
          "description": "Measured intensity of remanent moment"
        },
        "remanence_sa": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "remanence_sa"
          }],
          "unit": "Number in Am2/log(s)",
          "position": 37,
          "label": "Remanence Sa",
          "type": "Number"
        },
        "remanence_mdf": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "remanence_mdf"
          }],
          "unit": "Number in T",
          "position": 31,
          "label": "Remanence MDF",
          "type": "Number",
          "description": "Median destructive field"
        },
        "remanence_delta_temp_low": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "remanence_delta_temp_low"
          }],
          "unit": "Number in K",
          "position": 16,
          "label": "Remanence Delta Temperature Low",
          "type": "Number",
          "description": "Low Temperature of delta FC/ZFC calculation"
        },
        "rmag_criteria_codes": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "rmag_criteria_codes"
          }],
          "unit": "Text",
          "position": 41,
          "label": "Criteria Codes",
          "type": "List",
          "description": "Colon-delimited list of criteria codes",
          "examples": ["MY-MAD", "MY-APLHA95"]
        },
        "remanence_hirm": {
          "group": "Remanence Experiments",
          "next_columns": [{}],
          "unit": "Number in Am2",
          "position": 28,
          "label": "Remanence HIRM",
          "type": "Number",
          "description": "Hard IRM factor HIRM = SIRM - IRM(300 mT)"
        },
        "remanence_maf": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "remanence_maf"
          }],
          "unit": "Number in T",
          "position": 32,
          "label": "Remanence MAF",
          "type": "Number",
          "description": "Median acquisition field"
        },
        "remanence_armx": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "remanence_armx"
          }],
          "unit": "Dimensionless",
          "position": 29,
          "label": "Remanence ARMx",
          "type": "Number",
          "description": "Anhysteretic susceptibility Xarm = ARM / Hdc"
        },
        "measurement_file_name": {
          "group": "Remanence Experiments",
          "next_columns": [{}],
          "unit": "Text",
          "position": 12,
          "label": "Measurement File Name",
          "type": "String",
          "description": "Name for MagIC format text file containing measurement data",
          "examples": ["Hart.et.al.2000.data.txt"]
        },
        "remanence_bcr": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "remanence_bcr"
          }],
          "unit": "Number in T",
          "position": 19,
          "label": "Remanence Bcr",
          "type": "Number",
          "description": "Remanent coercivity by direct backfield measurement "
        },
        "remanence_sratio_back": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "remanence_sratio_back"
          }],
          "unit": "Number in T",
          "position": 27,
          "label": "Remanence S Ratio Back Field",
          "type": "Number",
          "description": "Backfield used to calculate S Ratio"
        },
        "er_synthetic_name": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "er_synthetic_name"
          }],
          "unit": "Text",
          "position": 10,
          "label": "Synthetic Material Name",
          "type": "String",
          "description": "Name for synthetic material",
          "examples": ["STD1546-A1"]
        },
        "er_expedition_name": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "er_expedition_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Expedition Name",
          "type": "String",
          "description": "Name for expedition such as AVON02MV",
          "examples": ["AVON02MV"]
        },
        "remanence_temp_low": {
          "group": "Remanence Experiments",
          "next_columns": [{}],
          "unit": "Number in K",
          "position": 20,
          "label": "Remanence Temperature Low",
          "type": "Number",
          "description": "Critical, Xfd or Xhd temperature calculation -- low range"
        },
        "remanence_comp_n": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "remanence_comp_n"
          }],
          "unit": "Integer",
          "position": 36,
          "label": "Remanence Component N",
          "type": "Integer",
          "description": "Number of remanence components used"
        },
        "remanence_description": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "remanence_description"
          }],
          "unit": "Text",
          "position": 40,
          "label": "Remanence Description",
          "type": "String",
          "description": "Detailed description"
        },
        "remanence_temp_critical": {
          "group": "Remanence Experiments",
          "next_columns": [{}],
          "unit": "Number in K",
          "position": 22,
          "label": "Remanence Critical Temperature",
          "type": "Number",
          "description": "Temperature at which some transition occurs"
        },
        "remanence_dfc": {
          "group": "Remanence Experiments",
          "next_columns": [{}],
          "unit": "Number in Am2",
          "position": 13,
          "label": "Remanence Delta Field Cooled",
          "type": "Number",
          "description": "Fractional remanence loss at Tv (80K,130K) after field cooling"
        },
        "er_formation_name": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "er_formation_name"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Formation Name",
          "type": "String",
          "description": "Name for formation",
          "examples": ["Bluebird Formation"]
        },
        "er_analyst_mail_names": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "er_analyst_mail_names"
          }],
          "unit": "Text",
          "position": 44,
          "label": "Analyst Names",
          "type": "List",
          "description": "Colon-delimited list of names for analysts",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "remanence_cd": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "remanence_cd"
          }],
          "unit": "Dimensionless",
          "position": 35,
          "label": "Remanence Component Dispersion",
          "type": "Number",
          "description": "Dispersion (standard deviation) of remanence components"
        },
        "remanence_temp_type": {
          "group": "Remanence Experiments",
          "next_columns": [{}],
          "unit": "Text",
          "position": 23,
          "label": "Remanence Critical Temperature Type",
          "type": "String",
          "description": "Interpreted type of temperature transition",
          "examples": ["Verway", "Morin", "pyrrhotite", "Neel", "spin glass", "Curie", "Hopkinson", "blocking", "unblocking"]
        },
        "remanence_sratio_forward": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "remanence_sratio_forward"
          }],
          "unit": "Number in T",
          "position": 26,
          "label": "Remanence S Ratio Forward Field",
          "type": "Number",
          "description": "SIRM field used to calculate S Ratio"
        },
        "er_site_name": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "er_site_name"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Site Name",
          "type": "String",
          "description": "Name for site",
          "examples": ["Bas123a"]
        },
        "er_citation_names": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 45,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "er_sample_name": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "er_sample_name"
          }],
          "unit": "Text",
          "position": 6,
          "label": "Sample Name",
          "type": "String",
          "description": "Name for sample",
          "examples": ["Bas123a-01"]
        },
        "er_specimen_name": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "er_specimen_name"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Specimen Name",
          "type": "String",
          "description": "Name for specimen",
          "examples": ["Bas123a-01x"]
        },
        "remanence_sd": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "remanence_sd"
          }],
          "unit": "Number in Am2/log(s)",
          "position": 38,
          "label": "Remanence Sd",
          "type": "Number"
        },
        "remanence_delta_temp_high": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "remanence_delta_temp_high"
          }],
          "unit": "Number in K",
          "position": 17,
          "label": "Remanence Delta Temperature High",
          "type": "Number",
          "description": "High Temperature of delta FC/ZFC calculation"
        },
        "remanence_dzfc": {
          "group": "Remanence Experiments",
          "next_columns": [{}],
          "unit": "Number in Am2",
          "position": 14,
          "label": "Remanence Delta Zerofield Cooled",
          "type": "Number",
          "description": "Fractional remanence loss at Tv (80K,130K) after zero-field cooling"
        },
        "magic_instrument_codes": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "magic_instrument_codes"
          }],
          "unit": "Text",
          "position": 43,
          "label": "Instrument Codes",
          "type": "List",
          "description": "Colon-delimited list of instrument codes",
          "examples": ["SIO-Bubba", "IRM-OldBlue"]
        },
        "remanence_temp_high": {
          "group": "Remanence Experiments",
          "next_columns": [{}],
          "unit": "Number in K",
          "position": 21,
          "label": "Remanence Temperature High",
          "type": "Number",
          "description": "Critical, Xfd or Xhd temperature calculation -- high range"
        },
        "remanence_q": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "remanence_q"
          }],
          "unit": "Dimensionless",
          "position": 39,
          "label": "Remanence Koenigsberger Ratio",
          "type": "Number",
          "description": "Koenigsberger ratio"
        },
        "er_mineral_name": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "er_mineral_name"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Mineral Name",
          "type": "String",
          "description": "Name for mineral",
          "examples": ["San03-001"]
        },
        "remanence_mdt": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "remanence_mdt"
          }],
          "unit": "Number in K",
          "position": 33,
          "label": "Remanence MDT",
          "type": "Number",
          "description": "Median destructive temperature"
        },
        "er_section_name": {
          "group": "Remanence Experiments",
          "next_columns": [{}],
          "unit": "Text",
          "position": 4,
          "label": "Section Name",
          "type": "String",
          "description": "Name for section or core",
          "examples": ["Berkeley Lava Flows", "810C", "1129D"]
        },
        "er_fossil_name": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "er_fossil_name"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Fossil Name",
          "type": "String",
          "description": "Name for fossil",
          "examples": ["AMM43-03"]
        },
        "er_location_name": {
          "group": "Remanence Experiments",
          "next_columns": [{
            "table": "rmag_remanence",
            "column": "er_location_name"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Location Name",
          "type": "String",
          "description": "Name for location or drill site",
          "examples": ["San Francisco Volcanic Province", "Site 801"]
        }
      },
      "label": "Remanence Experiments",
      "description": "Experiment for magnetic remanence:  ARM, IRM, TRM, CRM, VRM and DRM"
    },
    "er_formations": {
      "position": 4,
      "columns": {
        "formation_class": {
          "group": "Rock Formations",
          "next_columns": [{
            "table": "er_formations",
            "column": "formation_class"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Formation Class",
          "type": "String",
          "description": "General lithology type",
          "examples": ["Igneous", "Sedimentary", "Metamorphic", "Archeological", "Intrusive", "Extrusive"]
        },
        "er_scientist_mail_names": {
          "group": "Rock Formations",
          "next_columns": [{
            "table": "er_formations",
            "column": "er_scientist_mail_names"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Research Scientist Names",
          "type": "List",
          "description": "Colon-delimited list of names for scientists who described formation",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "formation_paleo_enviroment": {
          "group": "Rock Formations",
          "next_columns": [{
            "table": "er_formations",
            "column": "formation_paleo_enviroment"
          }],
          "unit": "Text",
          "position": 4,
          "label": "Formation Paleo Environment",
          "type": "String",
          "description": "Depositional environment",
          "examples": ["Fluvial", "Continental Shelf", "Eolian", "Fringing Reef"]
        },
        "formation_description": {
          "group": "Rock Formations",
          "next_columns": [{
            "table": "er_formations",
            "column": "formation_description"
          }],
          "unit": "Text",
          "position": 6,
          "label": "Formation Description",
          "type": "String",
          "description": "Detailed description"
        },
        "er_formation_name": {
          "group": "Rock Formations",
          "next_columns": [{
            "table": "er_formations",
            "column": "er_formation_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Formation Name",
          "type": "String",
          "description": "Name for formation",
          "examples": ["Bluebird Formation"]
        },
        "er_citation_names": {
          "group": "Rock Formations",
          "next_columns": [{
            "table": "er_formations",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "formation_thickness": {
          "group": "Rock Formations",
          "next_columns": [{
            "table": "er_formations",
            "column": "formation_thickness"
          }],
          "unit": "Number in m",
          "position": 5,
          "label": "Formation Thickness",
          "type": "Number",
          "description": "Formation thickness"
        },
        "er_formation_alternatives": {
          "group": "Rock Formations",
          "next_columns": [{
            "table": "er_formations",
            "column": "er_formation_alternatives"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Formation Name Alternatives",
          "type": "List",
          "description": "Colon-delimited list of alternative names and abbreviations"
        },
        "formation_lithology": {
          "group": "Rock Formations",
          "next_columns": [{
            "table": "er_formations",
            "column": "formation_lithology"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Formation Lithology",
          "type": "String",
          "description": "Lithology",
          "examples": ["Basalt", "Granite", "Mudstone", "Tuff", "Granodiorite", "Marl"]
        }
      },
      "label": "Rock Formations",
      "description": "Unique rock formation or sequence"
    },
    "pmag_rotations": {
      "position": 24,
      "columns": {
        "rotation_phi": {
          "group": "Rotation Data",
          "next_columns": [{
            "table": "pmag_rotations",
            "column": "rotation_phi"
          }],
          "unit": "Number in Degrees",
          "position": 3,
          "label": "Rotation Parameter Phi",
          "type": "Number",
          "description": "Finite rotation pole -- Axis in degrees from North (strike if lambda is zero)"
        },
        "pmag_rotation_code": {
          "group": "Rotation Data",
          "next_columns": [{
            "table": "pmag_rotations",
            "column": "pmag_rotation_code"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Rotation Code",
          "type": "String",
          "description": "Rotation name or number",
          "examples": ["MY-TILT1", "MY-TILT2", "MY-TRANS1", "MY-ROT1", "MY-ROT2"]
        },
        "rotation_description": {
          "group": "Rotation Data",
          "next_columns": [{
            "table": "pmag_rotations",
            "column": "rotation_description"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Rotation Description",
          "type": "String",
          "description": "Detailed description"
        },
        "er_citation_names": {
          "group": "Rotation Data",
          "next_columns": [{
            "table": "pmag_rotations",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 6,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "rotation_omega": {
          "group": "Rotation Data",
          "next_columns": [{
            "table": "pmag_rotations",
            "column": "rotation_omega"
          }],
          "unit": "Number in Degrees",
          "position": 4,
          "label": "Rotation Parameter Omega",
          "type": "Number",
          "description": "Finite rotation pole -- Degrees of clockwise rotation around axis (negative dip if lambda is zero)"
        },
        "rotation_lambda": {
          "group": "Rotation Data",
          "next_columns": [{
            "table": "pmag_rotations",
            "column": "rotation_lambda"
          }],
          "unit": "Number in Degrees",
          "position": 2,
          "label": "Rotation Parameter Lambda",
          "type": "Number",
          "description": "Finite rotation pole -- Tilt in degrees from horizontal"
        },
        "rotation_definition": {
          "group": "Rotation Data",
          "next_columns": [{
            "table": "pmag_rotations",
            "column": "rotation_definition"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Rotation Definition",
          "type": "String",
          "description": "Definition of the rotation applied"
        }
      },
      "label": "Rotation Data",
      "description": "Data used to perform complex rotations between coordinate systems"
    },
    "er_minerals": {
      "position": 11,
      "columns": {
        "er_member_name": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "er_member_name"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Member Name",
          "type": "String",
          "description": "Name for member",
          "examples": ["Glasshound Member"]
        },
        "magic_method_codes": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "magic_method_codes"
          }],
          "unit": "Text",
          "position": 22,
          "label": "Method Codes",
          "type": "List",
          "description": "Colon-delimited list of method codes",
          "examples": ["DE-DC0", "FT-F1", "LP-DCDMAG"]
        },
        "er_scientist_mail_names": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "er_scientist_mail_names"
          }],
          "unit": "Text",
          "position": 23,
          "label": "Research Scientist Names",
          "type": "List",
          "description": "Colon-delimited list of names for scientists who prepared mineral sample",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "mineral_size": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "mineral_size"
          }],
          "unit": "Text",
          "position": 17,
          "label": "Mineral Size",
          "type": "String",
          "description": "Mineral separate grain size fraction",
          "examples": ["250-500 Â¿m"]
        },
        "mineral_class_name": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "mineral_class_name"
          }],
          "unit": "Text",
          "position": 12,
          "label": "Mineral Classification Name",
          "type": "String",
          "description": "Mineral classification name",
          "examples": ["Magnetite", "Plagioclase "]
        },
        "mineral_assemblage": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "mineral_assemblage"
          }],
          "unit": "Text",
          "position": 13,
          "label": "Mineral Assemblage",
          "type": "String",
          "description": "Mineral assemblage",
          "examples": ["Single Crystal", "Mineral Separate", "Polycrystalline", "In Situ"]
        },
        "er_expedition_name": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "er_expedition_name"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Expedition Name",
          "type": "String",
          "description": "Name for seagoing or land expedition",
          "examples": ["AVON02MV"]
        },
        "mineral_shape": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "mineral_shape"
          }],
          "unit": "Text",
          "position": 16,
          "label": "Mineral Shape",
          "type": "String",
          "description": "Mineral shape",
          "examples": ["Euhedral", "Orthorhombic "]
        },
        "mineral_density": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "mineral_density"
          }],
          "unit": "Number in g/m3",
          "position": 20,
          "label": "Mineral Density",
          "type": "Number",
          "description": "Mineral density"
        },
        "mineral_alteration_type": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "mineral_alteration_type"
          }],
          "unit": "Text",
          "position": 15,
          "label": "Mineral Alteration Type",
          "type": "String",
          "description": "Mineral alteration type",
          "examples": ["Hydrothermal", "Diagenetic", "Weathering", "Oxidation", "Metamorphic"]
        },
        "er_mineral_alternatives": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "er_mineral_alternatives"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Mineral Name Alternatives",
          "type": "List",
          "description": "Colon-delimited list of alternative names and abbreviations"
        },
        "er_formation_name": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "er_formation_name"
          }],
          "unit": "Text",
          "position": 4,
          "label": "Formation Name",
          "type": "String",
          "description": "Name for formation",
          "examples": ["Bluebird Formation"]
        },
        "mineral_type": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "mineral_type"
          }],
          "unit": "Text",
          "position": 11,
          "label": "Mineral Type",
          "type": "String",
          "description": "Mineral type",
          "examples": ["Phenocryst", "Microcryst", "Groundmass", "Biogenic", "Detrital Clasts"]
        },
        "mineral_description": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "mineral_description"
          }],
          "unit": "Text",
          "position": 21,
          "label": "Mineral Description",
          "type": "String",
          "description": "Detailed description"
        },
        "er_site_name": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "er_site_name"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Site Name",
          "type": "String",
          "description": "Name for site",
          "examples": ["Bas123a"]
        },
        "er_citation_names": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 24,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "er_sample_name": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "er_sample_name"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Sample Name",
          "type": "String",
          "description": "Name for sample",
          "examples": ["Bas123a-01"]
        },
        "er_specimen_name": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "er_specimen_name"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Specimen Name",
          "type": "String",
          "description": "Name for specimen",
          "examples": ["Bas123a-01x"]
        },
        "mineral_volume": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "mineral_volume"
          }],
          "unit": "Number in m3",
          "position": 18,
          "label": "Mineral Volume",
          "type": "Number",
          "description": "Mineral volume"
        },
        "mineral_weight": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "mineral_weight"
          }],
          "unit": "Number in g",
          "position": 19,
          "label": "Mineral Weight",
          "type": "Number",
          "description": "Mineral weight"
        },
        "er_mineral_name": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "er_mineral_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Mineral Name",
          "type": "String",
          "description": "Name for natural occurring mineral",
          "examples": ["San03-001"]
        },
        "mineral_alteration": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "mineral_alteration"
          }],
          "unit": "Text",
          "position": 14,
          "label": "Mineral Alteration",
          "type": "String",
          "description": "Mineral alteration grade",
          "examples": ["Severe", "High", "Mild", "Trace", "Unaltered"]
        },
        "er_section_name": {
          "group": "Minerals",
          "next_columns": [{}],
          "unit": "Text",
          "position": 6,
          "label": "Section Name",
          "type": "String",
          "description": "Name for section or core",
          "examples": ["Berkeley Lava Flows", "810C", "1129D"]
        },
        "er_fossil_name": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "er_fossil_name"
          }],
          "unit": "Text",
          "position": 10,
          "label": "Fossil Name",
          "type": "String",
          "description": "Name for fossil",
          "examples": ["AMM43-03"]
        },
        "er_location_name": {
          "group": "Minerals",
          "next_columns": [{
            "table": "er_minerals",
            "column": "er_location_name"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Location Name",
          "type": "String",
          "description": "Name for location or drill site",
          "examples": ["San Francisco Volcanic Province", "Site 801"]
        }
      },
      "label": "Minerals",
      "description": "Naturally occurring minerals"
    },
    "er_specimens": {
      "position": 9,
      "columns": {
        "er_member_name": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "er_member_name"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Member Name",
          "type": "String",
          "description": "Name for member",
          "examples": ["Glasshound Member"]
        },
        "specimen_alteration_type": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "specimen_alteration_type"
          }],
          "unit": "Text",
          "position": 14,
          "label": "Specimen Alteration Type",
          "type": "String",
          "description": "Specimen alteration type",
          "examples": ["Hydrothermal", "Diagenetic", "Weathering", "Oxidation", "Metamorphic"]
        },
        "magic_method_codes": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "magic_method_codes"
          }],
          "unit": "Text",
          "position": 26,
          "label": "Method Codes",
          "type": "List",
          "description": "Colon-delimited list of method codes",
          "examples": ["DE-DC0", "FT-F1", "LP-DCDMAG"]
        },
        "specimen_composite_depth": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "specimen_composite_depth"
          }],
          "unit": "Number in m",
          "position": 18,
          "label": "Specimen Composite Depth",
          "type": "Number",
          "description": "Specimen location -- composite depth in MBSF as used by ODP",
          "examples": ["Meters below seafloor"]
        },
        "er_scientist_mail_names": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "er_scientist_mail_names"
          }],
          "unit": "Text",
          "position": 27,
          "label": "Research Scientist Names",
          "type": "List",
          "description": "Colon-delimited list of names for scientists who prepared specimen",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "specimen_lithology": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "specimen_lithology"
          }],
          "unit": "Text",
          "position": 10,
          "label": "Specimen Lithology",
          "type": "String",
          "description": "Specimen lithology or archeological classification",
          "examples": ["Basalt", "Granite", "Mudstone", "Tuff", "Granodiorite", "Marl"]
        },
        "specimen_density": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "specimen_density"
          }],
          "unit": "Number in g/m3",
          "position": 23,
          "label": "Specimen Density",
          "type": "Number",
          "description": "Specimen density"
        },
        "specimen_azimuth": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "specimen_azimuth"
          }],
          "unit": "Number in Degrees",
          "position": 19,
          "label": "Specimen Azimuth",
          "type": "Number",
          "description": "Specimen azimuth as measured clockwise from the north",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "specimen_drill_depth": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "specimen_drill_depth"
          }],
          "unit": "Number in m",
          "position": 17,
          "label": "Specimen Drill Depth",
          "type": "Number",
          "description": "Specimen location -- depth in MBSF as used by ODP",
          "examples": ["Meters below seafloor"]
        },
        "specimen_height": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "specimen_height"
          }],
          "unit": "Number in m",
          "position": 16,
          "label": "Specimen Stratigraphic Height",
          "type": "Number",
          "description": "Specimen location -- stratigraphic height",
          "examples": ["Positive is up in section or core", "while negative is down relative to reference height"]
        },
        "specimen_type": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "specimen_type"
          }],
          "unit": "Text",
          "position": 11,
          "label": "Specimen Type",
          "type": "String",
          "description": "Specimen type",
          "examples": ["Flow Top", "Glassy Margin", "Pot Rim", "Pillow", "Kiln", "Dike"]
        },
        "specimen_dip": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "specimen_dip"
          }],
          "unit": "Number in Degrees",
          "position": 20,
          "label": "Specimen Dip",
          "type": "Number",
          "description": "Specimen dip as measured into the outcrop",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "er_expedition_name": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "er_expedition_name"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Expedition Name",
          "type": "String",
          "description": "Name for seagoing or land expedition",
          "examples": ["AVON02MV"]
        },
        "specimen_texture": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "specimen_texture"
          }],
          "unit": "Text",
          "position": 12,
          "label": "Specimen Texture",
          "type": "String",
          "description": "Specimen texture",
          "examples": ["Holocrystalline", "Hawaiitic", "Homogeneous"]
        },
        "er_formation_name": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "er_formation_name"
          }],
          "unit": "Text",
          "position": 4,
          "label": "Formation Name",
          "type": "String",
          "description": "Name for formation",
          "examples": ["Bluebird Formation"]
        },
        "specimen_description": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "specimen_description"
          }],
          "unit": "Text",
          "position": 25,
          "label": "Specimen Description",
          "type": "String",
          "description": "Detailed description"
        },
        "er_site_name": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "er_site_name"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Site Name",
          "type": "String",
          "description": "Name for site",
          "examples": ["Bas123a"]
        },
        "er_citation_names": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 28,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "er_sample_name": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "er_sample_name"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Sample Name",
          "type": "String",
          "description": "Name for sample",
          "examples": ["Bas123a-01"]
        },
        "er_specimen_name": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "er_specimen_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Specimen Name",
          "type": "String",
          "description": "Name for specimen",
          "examples": ["Bas123a-01x"]
        },
        "er_specimen_alternatives": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "er_specimen_alternatives"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Specimen Name Alternatives",
          "type": "List",
          "description": "Colon-delimited list of alternative names and abbreviations"
        },
        "specimen_alteration": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "specimen_alteration"
          }],
          "unit": "Text",
          "position": 13,
          "label": "Specimen Alteration",
          "type": "String",
          "description": "Specimen alteration grade",
          "examples": ["Severe", "High", "Mild", "Trace", "Unaltered"]
        },
        "specimen_elevation": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "specimen_elevation"
          }],
          "unit": "Number in m",
          "position": 15,
          "label": "Specimen Elevation",
          "type": "Number",
          "description": "Specimen location -- elevation relative to sealevel",
          "examples": ["Meters above sealevel"]
        },
        "specimen_class": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "specimen_class"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Specimen Class",
          "type": "String",
          "description": "General lithology type",
          "examples": ["Igneous", "Sedimentary", "Metamorphic", "Archeological", "Intrusive", "Extrusive"]
        },
        "specimen_volume": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "specimen_volume"
          }],
          "unit": "Number in m3",
          "position": 21,
          "label": "Specimen Volume",
          "type": "Number",
          "description": "Specimen volume"
        },
        "specimen_size": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "specimen_size"
          }],
          "unit": "Text",
          "position": 24,
          "label": "Specimen Grain Size",
          "type": "String",
          "description": "Specimen grain size fraction",
          "examples": ["25-125 Â¿m", "250-500 Â¿m"]
        },
        "specimen_weight": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "specimen_weight"
          }],
          "unit": "Number in g",
          "position": 22,
          "label": "Specimen Weight",
          "type": "Number",
          "description": "Specimen weight"
        },
        "er_section_name": {
          "group": "Specimens",
          "next_columns": [{}],
          "unit": "Text",
          "position": 6,
          "label": "Section Name",
          "type": "String",
          "description": "Name for section or core",
          "examples": ["Berkeley Lava Flows", "810C", "1129D"]
        },
        "er_location_name": {
          "group": "Specimens",
          "next_columns": [{
            "table": "er_specimens",
            "column": "er_location_name"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Location Name",
          "type": "String",
          "description": "Name for location or drill site",
          "examples": ["San Francisco Volcanic Province", "Site 801"]
        }
      },
      "label": "Specimens",
      "description": "Specimen from sample"
    },
    "rmag_anisotropy": {
      "position": 29,
      "columns": {
        "anisotropy_fl": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_fl"
          }],
          "unit": "Dimensionless",
          "position": 45,
          "label": "Anisotropy FL Ratio",
          "type": "Number",
          "description": "F/L"
        },
        "er_sample_names": {
          "group": "Anisotropy Data",
          "next_columns": [{}],
          "unit": "Text",
          "position": 4,
          "label": "Sample Name List",
          "type": "List",
          "description": "Colon-delimited list of sample names"
        },
        "magic_experiment_name": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "magic_experiment_names"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Experiment Name",
          "type": "String",
          "description": "Name for experiment",
          "examples": ["KOPA-299-1"]
        },
        "magic_method_codes": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "magic_method_codes"
          }],
          "unit": "Text",
          "position": 50,
          "label": "Method Codes",
          "type": "List",
          "description": "Colon-delimited list of method codes",
          "examples": ["DE-DC0", "FT-F1", "LP-DCDMAG"]
        },
        "anisotropy_eta_dec": {
          "group": "Anisotropy Data",
          "next_columns": [{}],
          "unit": "Number in Degrees",
          "position": 32,
          "label": "Anisotropy ETA Declination",
          "type": "Number",
          "description": "Minor axis -- declination"
        },
        "anisotropy_p": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_p"
          }],
          "unit": "Dimensionless",
          "position": 41,
          "label": "Anisotropy P",
          "type": "Number",
          "description": "T1/T3"
        },
        "anisotropy_pp": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_pp"
          }],
          "unit": "Dimensionless",
          "position": 42,
          "label": "Anisotropy P?",
          "type": "Number",
          "description": "Corrected anisotropy of Jelinek (1981)"
        },
        "anisotropy_ll": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_ll"
          }],
          "unit": "Dimensionless",
          "position": 40,
          "label": "Anisotropy L?",
          "type": "Number",
          "description": "ln(L)"
        },
        "anisotropy_s5": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_s5"
          }],
          "unit": "Number",
          "position": 16,
          "label": "Anisotropy Tensor Element 5",
          "type": "Number",
          "description": "Anisotropy tensor element -- c23"
        },
        "anisotropy_t2": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_t2"
          }],
          "unit": "Number",
          "position": 23,
          "label": "Anisotropy Eigenvalue 2",
          "type": "Number",
          "description": "Intermediate eigenvalue"
        },
        "anisotropy_zeta_inc": {
          "group": "Anisotropy Data",
          "next_columns": [{}],
          "unit": "Number in Degrees",
          "position": 34,
          "label": "Anisotropy ZETA Inclination",
          "type": "Number",
          "description": "Major axis -- inclination"
        },
        "er_fossil_names": {
          "group": "Anisotropy Data",
          "next_columns": [{}],
          "unit": "Text",
          "position": 6,
          "label": "Fossil Name List",
          "type": "List",
          "description": "Colon-delimited list of fossil names included in calculation",
          "examples": ["AMM43-03", "AMM43-19"]
        },
        "anisotropy_l": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_l"
          }],
          "unit": "Dimensionless",
          "position": 39,
          "label": "Anisotropy L",
          "type": "Number",
          "description": "T1/T2"
        },
        "er_specimen_names": {
          "group": "Anisotropy Data",
          "next_columns": [{}],
          "unit": "Text",
          "position": 5,
          "label": "Specimen Name List",
          "type": "List",
          "description": "Colon-delimited list of specimen names"
        },
        "anisotropy_s6": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_s6"
          }],
          "unit": "Number",
          "position": 17,
          "label": "Anisotropy Tensor Element 6",
          "type": "Number",
          "description": "Anisotropy tensor element -- c13"
        },
        "anisotropy_unit": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_unit"
          }],
          "unit": "Text",
          "position": 20,
          "label": "Anisotropy Tensor Unit",
          "type": "String",
          "description": "Anisotropy tensor unit",
          "examples": ["Normalized by trace", "Am2", "m3/kg", "SI", "deviatoric"]
        },
        "anisotropy_deg1": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_deg1"
          }],
          "unit": "Number in %",
          "position": 46,
          "label": "Anisotropy Degree",
          "type": "Number",
          "description": "Total anisotropy -- 100 * (S1-S3) / Mean",
          "examples": ["Number between 0 and 300% "]
        },
        "er_mineral_names": {
          "group": "Anisotropy Data",
          "next_columns": [{}],
          "unit": "Text",
          "position": 7,
          "label": "Mineral Name List",
          "type": "List",
          "description": "Colon-delimited list of mineral names"
        },
        "rmag_criteria_codes": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "rmag_criteria_codes"
          }],
          "unit": "Text",
          "position": 49,
          "label": "Criteria Codes",
          "type": "List",
          "description": "Colon-delimited list of criteria codes",
          "examples": ["MY-MAD", "MY-APLHA95"]
        },
        "anisotropy_eta_inc": {
          "group": "Anisotropy Data",
          "next_columns": [{}],
          "unit": "Number in Degrees",
          "position": 31,
          "label": "Anisotropy ETA Inclination",
          "type": "Number",
          "description": "Minor axis -- inclination"
        },
        "anisotropy_v3_dec": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_v3_dec"
          }],
          "unit": "Number in Degrees",
          "position": 27,
          "label": "Anisotropy Eigenvector 3 Declination",
          "type": "Number",
          "description": "Declination eigenvector associated with minimum eigenvalue"
        },
        "anisotropy_t": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_t"
          }],
          "unit": "Dimensionless",
          "position": 43,
          "label": "Anisotropy T",
          "type": "Number",
          "description": "Shape factor of Jelinek (1981)"
        },
        "anisotropy_t3": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_t3"
          }],
          "unit": "Number",
          "position": 24,
          "label": "Anisotropy Eigenvalue 3",
          "type": "Number",
          "description": "Minimum eigenvalue"
        },
        "anisotropy_v1_inc": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_v1_inc"
          }],
          "unit": "Number in Degrees",
          "position": 28,
          "label": "Anisotropy Eigenvector 1 Inclination",
          "type": "Number",
          "description": "Inclination eigenvector associated with maximum eigenvalue"
        },
        "anisotropy_v3_inc": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_v3_inc"
          }],
          "unit": "Number in Degrees",
          "position": 30,
          "label": "Anisotropy Eigenvector 3 Inclination",
          "type": "Number",
          "description": "Inclination eigenvector associated with minimum eigenvalue"
        },
        "measurement_file_name": {
          "group": "Anisotropy Data",
          "next_columns": [{}],
          "unit": "Text",
          "position": 10,
          "label": "Measurement File Name",
          "type": "String",
          "description": "Name for MagIC format text file containing measurement data",
          "examples": ["Hart.et.al.2000.data.txt"]
        },
        "anisotropy_description": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_description"
          }],
          "unit": "Text",
          "position": 48,
          "label": "Anisotropy Description",
          "type": "String",
          "description": "Detailed description"
        },
        "rmag_anisotropy_name": {
          "group": "Anisotropy Data",
          "next_columns": [{}],
          "unit": "Text",
          "position": 0,
          "label": "Anisotropy Name",
          "type": "String",
          "description": "Name or number for anisotropy determination",
          "examples": ["Bas123-anis"]
        },
        "anisotropy_s4": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_s4"
          }],
          "unit": "Number",
          "position": 15,
          "label": "Anisotropy Tensor Element 4",
          "type": "Number",
          "description": "Anisotropy tensor element -- c12"
        },
        "anisotropy_f": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_f"
          }],
          "unit": "Dimensionless",
          "position": 37,
          "label": "Anisotropy F",
          "type": "Number",
          "description": "T2/T3"
        },
        "anisotropy_type": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_type"
          }],
          "unit": "Text",
          "position": 11,
          "label": "Anisotropy Type",
          "type": "String",
          "description": "Anisotropy calculation type",
          "examples": ["AMS", "AARM", "AIRM", "ATRM"]
        },
        "anisotropy_v2_dec": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_v2_dec"
          }],
          "unit": "Number in Degrees",
          "position": 26,
          "label": "Anisotropy Eigenvector 2 Declination",
          "type": "Number",
          "description": "Declination eigenvector associated with intermediate eigenvalue"
        },
        "er_analyst_mail_names": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "er_analyst_mail_names"
          }],
          "unit": "Text",
          "position": 52,
          "label": "Analyst Names",
          "type": "List",
          "description": "Colon-delimited list of names for analysts",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "anisotropy_sigma": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_sigma"
          }],
          "unit": "Number",
          "position": 19,
          "label": "Anisotropy Tensor Sigma",
          "type": "Number",
          "description": "Anisotropy tensor standard deviation",
          "examples": ["Sigma of Hext (1963)"]
        },
        "er_synthetic_names": {
          "group": "Anisotropy Data",
          "next_columns": [{}],
          "unit": "Text",
          "position": 8,
          "label": "Synthetic Material Name List",
          "type": "List",
          "description": "Colon-delimited list of synthetic materials"
        },
        "anisotropy_s3": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_s3"
          }],
          "unit": "Number",
          "position": 14,
          "label": "Anisotropy Tensor Element 3",
          "type": "Number",
          "description": "Anisotropy tensor element -- c33"
        },
        "anisotropy_vg": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_vg"
          }],
          "unit": "Dimensionless",
          "position": 44,
          "label": "Anisotropy Vg",
          "type": "Number"
        },
        "anisotropy_ff": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_ff"
          }],
          "unit": "Dimensionless",
          "position": 38,
          "label": "Anisotropy F?",
          "type": "Number",
          "description": "ln(F)"
        },
        "anisotropy_v1_dec": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_v1_dec"
          }],
          "unit": "Number in Degrees",
          "position": 25,
          "label": "Anisotropy Eigenvector 1 Declination",
          "type": "Number",
          "description": "Declination eigenvector associated with maximum eigenvalue"
        },
        "anisotropy_zeta_semi_angle": {
          "group": "Anisotropy Data",
          "next_columns": [{}],
          "unit": "Number in Degrees",
          "position": 36,
          "label": "Anisotropy ZETA Semi Angle",
          "type": "Number",
          "description": "Major axis -- semi angle",
          "examples": ["Confidence Level = 95%"]
        },
        "er_citation_names": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 53,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "anisotropy_mean": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_mean"
          }],
          "unit": "Number",
          "position": 18,
          "label": "Anisotropy Tensor Mean",
          "type": "Number",
          "description": "Anisotropy tensor mean -- (c11 + c22 + c33) / 3"
        },
        "anisotropy_v2_inc": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_v2_inc"
          }],
          "unit": "Number in Degrees",
          "position": 29,
          "label": "Anisotropy Eigenvector 2 Inclination",
          "type": "Number",
          "description": "Inclination eigenvector associated with intermediate eigenvalue"
        },
        "anisotropy_eta_semi_angle": {
          "group": "Anisotropy Data",
          "next_columns": [{}],
          "unit": "Number in Degrees",
          "position": 33,
          "label": "Anisotropy ETA Semi Angle",
          "type": "Number",
          "description": "Minor axis -- semi angle",
          "examples": ["Confidence Level = 95%"]
        },
        "anisotropy_s2": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_s2"
          }],
          "unit": "Number",
          "position": 13,
          "label": "Anisotropy Tensor Element 2",
          "type": "Number",
          "description": "Anisotropy tensor element -- c22"
        },
        "er_site_names": {
          "group": "Anisotropy Data",
          "next_columns": [{}],
          "unit": "Text",
          "position": 3,
          "label": "Site Name List",
          "type": "List",
          "description": "Colon-delimited list of site names",
          "examples": ["Bas123a", "Bas156z", "Bas445c"]
        },
        "er_section_names": {
          "group": "Anisotropy Data",
          "next_columns": [{}],
          "unit": "Text",
          "position": 2,
          "label": "Section Name List",
          "type": "List",
          "description": "Colon-delimited list of section or core names",
          "examples": ["810C", "810D"]
        },
        "anisotropy_zeta_dec": {
          "group": "Anisotropy Data",
          "next_columns": [{}],
          "unit": "Number in Degrees",
          "position": 35,
          "label": "Anisotropy ZETA Declination",
          "type": "Number",
          "description": "Major axis -- declination"
        },
        "magic_instrument_codes": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "magic_instrument_codes"
          }],
          "unit": "Text",
          "position": 51,
          "label": "Instrument Codes",
          "type": "List",
          "description": "Colon-delimited list of instrument codes",
          "examples": ["SIO-Bubba", "IRM-OldBlue"]
        },
        "anisotropy_t1": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_t1"
          }],
          "unit": "Number",
          "position": 22,
          "label": "Anisotropy Eigenvalue 1",
          "type": "Number",
          "description": "Maximum eigenvalue"
        },
        "anisotropy_n": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_n"
          }],
          "unit": "Integer",
          "position": 21,
          "label": "Anisotropy Number of Measurements",
          "type": "Integer",
          "description": "Number of measurements included in the calculation"
        },
        "er_location_names": {
          "group": "Anisotropy Data",
          "next_columns": [{}],
          "unit": "Text",
          "position": 1,
          "label": "Location Name List",
          "type": "List",
          "description": "Colon-delimited list of location or drill site names",
          "examples": ["Site 801", "Site 1129"]
        },
        "anisotropy_deg2": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_deg2"
          }],
          "unit": "Number in %",
          "position": 47,
          "label": "Anisotropy Degree",
          "type": "Number",
          "description": "Percent anisotropy -- 100 * (S1-S3) / (S1+S2+S3)",
          "examples": ["Number between 0 and 100% "]
        },
        "anisotropy_s1": {
          "group": "Anisotropy Data",
          "next_columns": [{
            "table": "rmag_anisotropy",
            "column": "anisotropy_s1"
          }],
          "unit": "Number",
          "position": 12,
          "label": "Anisotropy Tensor Element 1",
          "type": "Number",
          "description": "Anisotropy tensor element -- c11"
        }
      },
      "label": "Anisotropy Data",
      "description": "Experiment for anisotropy parameters"
    },
    "pmag_specimens": {
      "position": 20,
      "columns": {
        "er_member_name": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "er_member_name"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Member Name",
          "type": "String",
          "description": "Name for member",
          "examples": ["Glasshound Member"]
        },
        "specimen_g": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_g"
          }],
          "unit": "Dimensionless",
          "position": 48,
          "label": "Specimen g",
          "type": "Number",
          "description": "COE's quality factors -- the GAP factor"
        },
        "magic_experiment_name": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "magic_experiment_names"
          }],
          "unit": "Text",
          "position": 10,
          "label": "Experiment Name",
          "type": "String",
          "description": "Name for experiment",
          "examples": ["KOPA-299-1"]
        },
        "specimen_int_rel_sigma_perc": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_int_rel_sigma_perc"
          }],
          "unit": "Number in %",
          "position": 38,
          "label": "Specimen Paleo Intensity Relative Sigma %",
          "type": "Number",
          "description": "Relative field strength -- uncertainty in percent",
          "examples": ["Uncertainty = 1xSD"]
        },
        "magic_method_codes": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "magic_method_codes"
          }],
          "unit": "Text",
          "position": 67,
          "label": "Method Codes",
          "type": "List",
          "description": "Colon-delimited list of method codes",
          "examples": ["DE-DC0", "FT-F1", "LP-DCDMAG"]
        },
        "specimen_f": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_f"
          }],
          "unit": "Dimensionless",
          "position": 43,
          "label": "Specimen f",
          "type": "Number",
          "description": "COE's quality factors -- amount of NRM in component"
        },
        "specimen_inferred_age": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_inferred_age"
          }],
          "unit": "Custom",
          "position": 22,
          "label": "Specimen Inferred Age",
          "type": "Number",
          "description": "Specimen inferred age"
        },
        "specimen_correction": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_correction"
          }],
          "unit": "Flag",
          "position": 17,
          "label": "Specimen Data Corrected",
          "type": "String",
          "description": "Indicating if an uncorrected (u) or corrected (c) estimate with regard to possible anisotropy and cooling rate corrections"
        },
        "specimen_inc": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_inc"
          }],
          "unit": "Number in Degrees",
          "position": 27,
          "label": "Specimen Inclination",
          "type": "Number",
          "description": "Directions in coordinates specified by tilt correction -- inclination",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "specimen_int_sigma_perc": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_int_sigma_perc"
          }],
          "unit": "Number in %",
          "position": 35,
          "label": "Specimen Paleo Intensity Sigma %",
          "type": "Number",
          "description": "Average field strength -- uncertainty in percent",
          "examples": ["Uncertainty = 1xSD"]
        },
        "specimen_b_sigma": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_b_sigma"
          }],
          "unit": "Dimensionless",
          "position": 46,
          "label": "Specimen b Sigma",
          "type": "Number",
          "description": "COE's quality factors -- error on slope fit",
          "examples": ["Uncertainty = 1xSD"]
        },
        "specimen_drat": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_drat"
          }],
          "unit": "Number in %",
          "position": 52,
          "label": "Specimen Difference Ratio pTRM Checks",
          "type": "Number",
          "description": "Difference in first and second pTRM measurements",
          "examples": ["Normalized by hypotenuse "]
        },
        "specimen_int_corr_anisotropy": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_int_corr_anisotropy"
          }],
          "unit": "Dimensionless",
          "position": 63,
          "label": "Specimen Correction Anisotropy",
          "type": "Number",
          "description": "Anisotropy correction factor for intensity"
        },
        "specimen_q": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_q"
          }],
          "unit": "Dimensionless",
          "position": 42,
          "label": "Specimen Q",
          "type": "Number",
          "description": "COE's quality factors -- overall quality"
        },
        "specimen_md": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_md"
          }],
          "unit": "Number in %",
          "position": 50,
          "label": "Specimen Maximum MD",
          "type": "Number",
          "description": "Maximum difference between first and second zero field steps"
        },
        "specimen_inferred_age_sigma": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_inferred_age_sigma"
          }],
          "unit": "Custom",
          "position": 23,
          "label": "Specimen Inferred Age Sigma",
          "type": "Number",
          "description": "Specimen inferred age -- uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "specimen_mad": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_mad"
          }],
          "unit": "Number in Degrees",
          "position": 29,
          "label": "Specimen MAD",
          "type": "Number",
          "description": "Maximum angle of deviation of the best fit direction or plane"
        },
        "specimen_tilt_correction": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_tilt_correction"
          }],
          "unit": "Number in %",
          "position": 32,
          "label": "Specimen Tilt Correction",
          "type": "Number",
          "description": "Percentage tilt correction applied to the data",
          "examples": ["Correction between geographic (0%) and stratigraphic (100%); unoriented (-1%); partially oriented to horizontal only (-2%)"]
        },
        "specimen_alpha95": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_alpha95"
          }],
          "unit": "Number in Degrees",
          "position": 30,
          "label": "Specimen Alpha 95%",
          "type": "Number",
          "description": "Fisher circle",
          "examples": ["Confidence Level = 95%"]
        },
        "specimen_ptrm": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_ptrm"
          }],
          "unit": "Number in %",
          "position": 51,
          "label": "Specimen Maximum pTRM",
          "type": "Number",
          "description": "Classical pTRM check"
        },
        "specimen_b": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_b"
          }],
          "unit": "Dimensionless",
          "position": 45,
          "label": "Specimen b",
          "type": "Number",
          "description": "COE's quality factors -- slope of Arai diagram"
        },
        "specimen_int_sigma": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_int_sigma"
          }],
          "unit": "Number in T",
          "position": 34,
          "label": "Specimen Paleo Intensity Sigma",
          "type": "Number",
          "description": "Average field strength -- uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "specimen_dang": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_dang"
          }],
          "unit": "Number in Degrees",
          "position": 49,
          "label": "Specimen DANG",
          "type": "Number",
          "description": "Deviation angle of direction of component with respect to origin"
        },
        "measurement_file_name": {
          "group": "Specimen Data",
          "next_columns": [{}],
          "unit": "Text",
          "position": 11,
          "label": "Measurement File Name",
          "type": "String",
          "description": "Name for MagIC format text file containing measurement data",
          "examples": ["Hart.et.al.2000.data.txt"]
        },
        "specimen_b_beta": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_b_beta"
          }],
          "unit": "Dimensionless",
          "position": 47,
          "label": "Specimen Sigma over b",
          "type": "Number",
          "description": "COE's quality factors -- relative error over slope",
          "examples": ["Uncertainty = 1xSD"]
        },
        "specimen_int_corr_cooling_rate": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_int_corr_cooling_rate"
          }],
          "unit": "Dimensionless",
          "position": 62,
          "label": "Specimen Correction Cooling Rate",
          "type": "Number",
          "description": "Cooling rate correction factor for intensity"
        },
        "specimen_n": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_n"
          }],
          "unit": "Integer",
          "position": 31,
          "label": "Specimen N",
          "type": "Integer",
          "description": "Number of measurements included in directional calculations"
        },
        "specimen_int_n": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_int_n"
          }],
          "unit": "Integer",
          "position": 40,
          "label": "Specimen Paleo Intensity N",
          "type": "Integer",
          "description": "Number of measurements included in intensity calculations"
        },
        "specimen_magn_weight": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_magn_mass"
          }],
          "unit": "Number in Am2/kg",
          "position": 60,
          "label": "Specimen NRM Magnetization Weight",
          "type": "Number",
          "description": "Measured intensity -- remanent magnetization that is weight normalized"
        },
        "er_expedition_name": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "er_expedition_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Expedition Name",
          "type": "String",
          "description": "Name for seagoing or land expedition",
          "examples": ["AVON02MV"]
        },
        "specimen_inferred_age_unit": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_inferred_age_unit"
          }],
          "unit": "Text",
          "position": 26,
          "label": "Specimen Inferred Age Unit",
          "type": "String",
          "description": "Specimen inferred age -- age unit",
          "examples": ["Ma", "Ka", "Ga", "Years BP", "Years AD (+/-)", "Years Cal BP", "Years Cal AD (+/-)"]
        },
        "specimen_int_rel_sigma": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_int_rel_sigma"
          }],
          "unit": "Dimensionless",
          "position": 37,
          "label": "Specimen Paleo Intensity Relative Sigma",
          "type": "Number",
          "description": "Relative field strength -- uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "specimen_rsc": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_rsc"
          }],
          "unit": "Number in %",
          "position": 54,
          "label": "Specimen Maximum RSC",
          "type": "Number",
          "description": "Maximum relative susceptibility change"
        },
        "specimen_comp_n": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_comp_n"
          }],
          "unit": "Integer",
          "position": 20,
          "label": "Specimen Component N",
          "type": "Integer",
          "description": "Total number of magnetic components in specimen"
        },
        "specimen_polarity": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_polarity"
          }],
          "unit": "Flag",
          "position": 15,
          "label": "Specimen Magnetic Polarity",
          "type": "String",
          "description": "Polarity of specimen",
          "examples": ["Polarity is normal (n)", "reversed (r)", "transitional (t)", "excursion (e) or intermediate (i)"]
        },
        "measurement_step_unit": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "measurement_step_unit"
          }],
          "unit": "Text",
          "position": 14,
          "label": "Measurement Step Unit",
          "type": "String",
          "description": "Step included in calculation -- unit"
        },
        "specimen_moment": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_magn_moment"
          }],
          "unit": "Number in Am2",
          "position": 58,
          "label": "Specimen NRM Moment",
          "type": "Number",
          "description": "Measured intensity -- remanent moment"
        },
        "specimen_int_mad": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_int_mad"
          }],
          "unit": "Number in Degrees",
          "position": 39,
          "label": "Specimen Paleo Intensity MAD",
          "type": "Number",
          "description": "Maximum angle of deviation of the best fit line"
        },
        "specimen_direction_type": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_direction_type"
          }],
          "unit": "Flag",
          "position": 18,
          "label": "Specimen Direction Type",
          "type": "String",
          "description": "Direction determined from (l) or plane (p)"
        },
        "er_formation_name": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "er_formation_name"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Formation Name",
          "type": "String",
          "description": "Name for formation",
          "examples": ["Bluebird Formation"]
        },
        "specimen_viscosity_index": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_viscosity_index"
          }],
          "unit": "Number in %",
          "position": 55,
          "label": "Specimen Viscosity Index",
          "type": "Number",
          "description": "Viscosity index"
        },
        "specimen_lab_field_ac": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_lab_field_ac"
          }],
          "unit": "Number in T",
          "position": 57,
          "label": "Specimen Lab Field AC",
          "type": "Number",
          "description": "Applied maximum or peak AC field in laboratory",
          "examples": ["No field equals 0 and ambient field equals -1"]
        },
        "er_analyst_mail_names": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "er_analyst_mail_names"
          }],
          "unit": "Text",
          "position": 69,
          "label": "Analyst Names",
          "type": "List",
          "description": "Colon-delimited list of names for analysts",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "specimen_int": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_int"
          }],
          "unit": "Number in T",
          "position": 33,
          "label": "Specimen Paleo Intensity",
          "type": "Number",
          "description": "Average field strength"
        },
        "specimen_description": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_description"
          }],
          "unit": "Text",
          "position": 64,
          "label": "Specimen Description",
          "type": "String",
          "description": "Detailed description"
        },
        "specimen_w": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_w"
          }],
          "unit": "Dimensionless",
          "position": 41,
          "label": "Specimen Weighting Factor",
          "type": "Number",
          "description": "Weighting factor"
        },
        "specimen_nrm": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_nrm"
          }],
          "unit": "Flag",
          "position": 16,
          "label": "Specimen NRM",
          "type": "String",
          "description": "Origin of the NRM is primary (p) or secondary (s)"
        },
        "specimen_inferred_age_low": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_inferred_age_low"
          }],
          "unit": "Custom",
          "position": 24,
          "label": "Specimen Inferred Age Low",
          "type": "Number",
          "description": "Specimen inferred age -- low range"
        },
        "measurement_step_min": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "measurement_step_min"
          }],
          "unit": "Custom",
          "position": 12,
          "label": "Measurement Step Minimum",
          "type": "Number",
          "description": "Step included in calculation -- lower bound"
        },
        "specimen_drats": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_drats"
          }],
          "unit": "Number in %",
          "position": 53,
          "label": "Specimen Difference Ratio Sum",
          "type": "Number",
          "description": "Sum of difference in first and second pTRM measurements",
          "examples": ["Normalized by pTRM"]
        },
        "er_site_name": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "er_site_name"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Site Name",
          "type": "String",
          "description": "Name for site",
          "examples": ["Bas123a"]
        },
        "er_citation_names": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 70,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "er_sample_name": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "er_sample_name"
          }],
          "unit": "Text",
          "position": 6,
          "label": "Sample Name",
          "type": "String",
          "description": "Name for sample",
          "examples": ["Bas123a-01"]
        },
        "specimen_lab_field_dc": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_lab_field_dc"
          }],
          "unit": "Number in T",
          "position": 56,
          "label": "Specimen Lab Field DC",
          "type": "Number",
          "description": "Applied DC field in laboratory",
          "examples": ["No field equals 0 and ambient field equals -1"]
        },
        "specimen_fvds": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_fvds"
          }],
          "unit": "Dimensionless",
          "position": 44,
          "label": "Specimen f VDS",
          "type": "Number",
          "description": "COE's quality factors -- vector difference sum of NRM components"
        },
        "pmag_rotation_codes": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "pmag_rotation_codes"
          }],
          "unit": "Text",
          "position": 66,
          "label": "Rotation Codes",
          "type": "List",
          "description": "Colon-delimited list of rotation codes",
          "examples": ["MY-TILT1", "MY-TILT2", "MY-TRANS1"]
        },
        "er_specimen_name": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "er_specimen_name"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Specimen Name",
          "type": "String",
          "description": "Name for specimen",
          "examples": ["Bas123a-01x"]
        },
        "specimen_comp_nmb": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_comp_nmb"
          }],
          "unit": "Integer",
          "position": 19,
          "label": "Specimen Component Number",
          "type": "Integer",
          "description": "Magnetic component number"
        },
        "measurement_step_max": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "measurement_step_max"
          }],
          "unit": "Custom",
          "position": 13,
          "label": "Measurement Step Maximum",
          "type": "Number",
          "description": "Step included in calculation -- higher bound"
        },
        "specimen_magn_volume": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_magn_volume"
          }],
          "unit": "Number in A/m",
          "position": 59,
          "label": "Specimen NRM Magnetization Volume",
          "type": "Number",
          "description": "Measured intensity -- remanent magnetization that is volume normalized"
        },
        "magic_instrument_codes": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "magic_instrument_codes"
          }],
          "unit": "Text",
          "position": 68,
          "label": "Instrument Codes",
          "type": "List",
          "description": "Colon-delimited list of instrument codes",
          "examples": ["SIO-Bubba", "IRM-OldBlue"]
        },
        "pmag_criteria_codes": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "pmag_criteria_codes"
          }],
          "unit": "Text",
          "position": 65,
          "label": "Criteria Codes",
          "type": "List",
          "description": "Colon-delimited list of criteria codes",
          "examples": ["MY-MAD", "MY-APLHA95"]
        },
        "specimen_comp_name": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_comp_name"
          }],
          "unit": "Text",
          "position": 21,
          "label": "Specimen Component Name",
          "type": "String",
          "description": "Specimen component name",
          "examples": ["Characteristic", "VRM", "Overprint", "A", "B", "C"]
        },
        "specimen_dec": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_dec"
          }],
          "unit": "Number in Degrees",
          "position": 28,
          "label": "Specimen Declination",
          "type": "Number",
          "description": "Directions in coordinates specified by tilt correction -- declination",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "specimen_int_ptrm_n": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_int_ptrm_n"
          }],
          "unit": "Dimensionless",
          "position": 61,
          "label": "Specimen Number pTRM Checks",
          "type": "Number",
          "description": "Number of pTRM checks used in experiment"
        },
        "er_mineral_name": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "er_mineral_name"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Mineral Name",
          "type": "String",
          "description": "Name for mineral",
          "examples": ["San03-001"]
        },
        "specimen_int_rel": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_int_rel"
          }],
          "unit": "Dimensionless",
          "position": 36,
          "label": "Specimen Paleo Intensity Relative",
          "type": "Number",
          "description": "Relative field strength"
        },
        "specimen_inferred_age_high": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "specimen_inferred_age_high"
          }],
          "unit": "Custom",
          "position": 25,
          "label": "Specimen Inferred Age High",
          "type": "Number",
          "description": "Specimen inferred age -- high range"
        },
        "er_section_name": {
          "group": "Specimen Data",
          "next_columns": [{}],
          "unit": "Text",
          "position": 4,
          "label": "Section Name",
          "type": "String",
          "description": "Name for section or core",
          "examples": ["Berkeley Lava Flows", "810C", "1129D"]
        },
        "er_fossil_name": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "er_fossil_name"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Fossil Name",
          "type": "String",
          "description": "Name for fossil",
          "examples": ["AMM43-03"]
        },
        "er_location_name": {
          "group": "Specimen Data",
          "next_columns": [{
            "table": "pmag_specimens",
            "column": "er_location_name"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Location Name",
          "type": "String",
          "description": "Name for location or drill site",
          "examples": ["San Francisco Volcanic Province", "Site 801"]
        }
      },
      "label": "Specimen Data",
      "description": "Specimen from sample"
    },
    "er_ages": {
      "position": 13,
      "columns": {
        "er_member_name": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "er_member_name"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Member Name",
          "type": "String",
          "description": "Name for member",
          "examples": ["Glasshound Member"]
        },
        "age_sigma": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "age_sigma"
          }],
          "unit": "Custom",
          "position": 17,
          "label": "Age Sigma",
          "type": "Number",
          "description": "Age -- uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "magic_method_codes": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "magic_method_codes"
          }],
          "unit": "Text",
          "position": 33,
          "label": "Method Codes",
          "type": "List",
          "description": "Colon-delimited list of method codes",
          "examples": ["DE-DC0", "FT-F1", "LP-DCDMAG"]
        },
        "tiepoint_name": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "tiepoint_name"
          }],
          "unit": "Text",
          "position": 10,
          "label": "Tiepoint Name",
          "type": "String",
          "description": "Name for tiepoint horizon"
        },
        "oxygen_stage": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "oxygen_stage"
          }],
          "unit": "Text",
          "position": 30,
          "label": "Oxygen Stage Name",
          "type": "String",
          "description": "Oxygen stage name",
          "examples": ["5e", "19", "Younger Dryas"]
        },
        "timescale_stage": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "timescale_stage"
          }],
          "unit": "Text",
          "position": 25,
          "label": "Timescale Stage",
          "type": "String",
          "description": "Timescale stage",
          "examples": ["Maastrichtian", "Oxfordian", "Frasnian"]
        },
        "timescale_period": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "timescale_period"
          }],
          "unit": "Text",
          "position": 23,
          "label": "Timescale Period",
          "type": "String",
          "description": "Timescale period",
          "examples": ["Devonian", "Permian", "Cretaceous", "Paleocene"]
        },
        "tiepoint_height": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "tiepoint_height"
          }],
          "unit": "Number in m",
          "position": 12,
          "label": "Tiepoint Stratigraphic Height",
          "type": "Number",
          "description": "Tiepoint stratigraphic height relative to reference tiepoint",
          "examples": ["Positive is up in section or core", "while negative is down relative to reference height"]
        },
        "timescale_era": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "timescale_era"
          }],
          "unit": "Text",
          "position": 22,
          "label": "Timescale Era",
          "type": "String",
          "description": "Timescale era",
          "examples": ["Neoproterozoic", "Paleozoic", "Mesozoic", "Cenozoic"]
        },
        "tiepoint_alternatives": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "tiepoint_alternatives"
          }],
          "unit": "Text",
          "position": 11,
          "label": "Tiepoint Name Alternatives",
          "type": "List",
          "description": "Colon-delimited list of alternative names and abbreviations"
        },
        "age_range_low": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "age_range_low"
          }],
          "unit": "Custom",
          "position": 18,
          "label": "Age Low",
          "type": "Number",
          "description": "Age -- low range"
        },
        "astronomical_stage": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "astronomical_stage"
          }],
          "unit": "Text",
          "position": 29,
          "label": "Astronomical Stage Name",
          "type": "String",
          "description": "Astronomical stage name"
        },
        "age_description": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "age_description"
          }],
          "unit": "Text",
          "position": 32,
          "label": "Age Description",
          "type": "String",
          "description": "Detailed description"
        },
        "age_culture_name": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "age_culture_name"
          }],
          "unit": "Text",
          "position": 31,
          "label": "Age Culture Name",
          "type": "String",
          "description": "Age culture name",
          "examples": ["Halaf culture"]
        },
        "biostrat_zone": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "biostrat_zone"
          }],
          "unit": "Text",
          "position": 26,
          "label": "Biostratigraphic Zone",
          "type": "String",
          "description": "Biostratigraphic zone",
          "examples": ["NN10", "Wasatchian"]
        },
        "er_expedition_name": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "er_expedition_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Expedition Name",
          "type": "String",
          "description": "Name for seagoing or land expedition",
          "examples": ["AVON02MV"]
        },
        "age_unit": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "age_unit"
          }],
          "unit": "Text",
          "position": 20,
          "label": "Age Unit",
          "type": "String",
          "description": "Age -- unit",
          "examples": ["Ma", "Ka", "Ga", "Years BP", "Years AD (+/-)", "Years Cal BP", "Years Cal AD (+/-)"]
        },
        "tiepoint_type": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "tiepoint_type"
          }],
          "unit": "Text",
          "position": 15,
          "label": "Tiepoint Type",
          "type": "String",
          "description": "Tiepoint type",
          "examples": ["Fossil Layer", "Volcanic Tuff", "Basalt Flow", "Magnetic Anomaly"]
        },
        "er_formation_name": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "er_formation_name"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Formation Name",
          "type": "String",
          "description": "Name for formation",
          "examples": ["Bluebird Formation"]
        },
        "magnetic_reversal_chron": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "magnetic_reversal_chron"
          }],
          "unit": "Text",
          "position": 28,
          "label": "Magnetic Reversal Chron",
          "type": "String",
          "description": "Magnetic reversal chron",
          "examples": ["C5n", "C5n.2n"]
        },
        "age_range_high": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "age_range_high"
          }],
          "unit": "Custom",
          "position": 19,
          "label": "Age High",
          "type": "Number",
          "description": "Age -- high range"
        },
        "er_site_name": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "er_site_name"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Site Name",
          "type": "String",
          "description": "Name for site",
          "examples": ["Bas123a"]
        },
        "er_citation_names": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 35,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "er_timescale_citation_names": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "er_timescale_citation_names"
          }],
          "unit": "Text",
          "position": 34,
          "label": "Citation Names Timescale Definition",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Harland et al. 1993", "Cande & Kent 1992", "This study"]
        },
        "er_sample_name": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "er_sample_name"
          }],
          "unit": "Text",
          "position": 6,
          "label": "Sample Name",
          "type": "String",
          "description": "Name for sample",
          "examples": ["Bas123a-01"]
        },
        "er_specimen_name": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "er_specimen_name"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Specimen Name",
          "type": "String",
          "description": "Name for specimen",
          "examples": ["Bas123a-01x"]
        },
        "tiepoint_height_sigma": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "tiepoint_height_sigma"
          }],
          "unit": "Number in m",
          "position": 13,
          "label": "Tiepoint Stratigraphic Height Sigma",
          "type": "Number",
          "description": "Tiepoint stratigraphic height uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "conodont_zone": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "conodont_zone"
          }],
          "unit": "Text",
          "position": 27,
          "label": "Conodont Zone",
          "type": "String",
          "description": "Conodont zone"
        },
        "age": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "age"
          }],
          "unit": "Custom",
          "position": 16,
          "label": "Age",
          "type": "Number",
          "description": "Age",
          "examples": ["Preferred age"]
        },
        "timescale_epoch": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "timescale_epoch"
          }],
          "unit": "Text",
          "position": 24,
          "label": "Timescale Epoch",
          "type": "String",
          "description": "Timescale epoch",
          "examples": ["Late Triassic", "Early Cretaceous", "Eocene", "Miocene", "Pleistocene"]
        },
        "er_mineral_name": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "er_mineral_name"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Mineral Name",
          "type": "String",
          "description": "Name for mineral",
          "examples": ["San03-001"]
        },
        "tiepoint_elevation": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "tiepoint_elevation"
          }],
          "unit": "Number in m",
          "position": 14,
          "label": "Tiepoint Elevation",
          "type": "Number",
          "description": "Tiepoint elevation relative to sealevel",
          "examples": ["Meters above sealevel"]
        },
        "timescale_eon": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "timescale_eon"
          }],
          "unit": "Text",
          "position": 21,
          "label": "Timescale Eon",
          "type": "String",
          "description": "Timescale eon",
          "examples": ["Phanerozoic", "Proterozoic", "Archean"]
        },
        "er_section_name": {
          "group": "Ages Determinations",
          "next_columns": [{}],
          "unit": "Text",
          "position": 4,
          "label": "Section Name",
          "type": "String",
          "description": "Name for section or core",
          "examples": ["Berkeley Lava Flows", "810C", "1129D"]
        },
        "er_fossil_name": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "er_fossil_name"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Fossil Name",
          "type": "String",
          "description": "Name for fossil",
          "examples": ["AMM43-03"]
        },
        "er_location_name": {
          "group": "Ages Determinations",
          "next_columns": [{
            "table": "er_ages",
            "column": "er_location_name"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Location Name",
          "type": "String",
          "description": "Name for location or drill site",
          "examples": ["San Francisco Volcanic Province", "Site 801"]
        }
      },
      "label": "Ages Determinations",
      "description": "Ages for discrete samples or horizons in stratigraphic sections or cores"
    },
    "pmag_sites": {
      "position": 22,
      "columns": {
        "er_member_name": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "er_member_name"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Member Name",
          "type": "String",
          "description": "Name for member",
          "examples": ["Glasshound Member"]
        },
        "er_sample_names": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "er_sample_names"
          }],
          "unit": "Text",
          "position": 6,
          "label": "Sample Name List",
          "type": "List",
          "description": "Colon-delimited list of sample names",
          "examples": ["Bas123a-01", "Bas123a-04", "Bas123a-19"]
        },
        "site_n": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_n"
          }],
          "unit": "Integer",
          "position": 30,
          "label": "Site N",
          "type": "Integer",
          "description": "Number of samples included in directional calculations"
        },
        "site_int_sigma": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_int_sigma"
          }],
          "unit": "Number in T",
          "position": 37,
          "label": "Site Paleo Intensity Sigma",
          "type": "Number",
          "description": "Average field strength -- uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "magic_experiment_name": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "magic_experiment_names"
          }],
          "unit": "Text",
          "position": 10,
          "label": "Experiment Name",
          "type": "String",
          "description": "Name for experiment",
          "examples": ["KOPA-299-1"]
        },
        "magic_method_codes": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "magic_method_codes"
          }],
          "unit": "Text",
          "position": 49,
          "label": "Method Codes",
          "type": "List",
          "description": "Colon-delimited list of method codes",
          "examples": ["DE-DC0", "FT-F1", "LP-DCDMAG"]
        },
        "site_r": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_r"
          }],
          "unit": "Dimensionless",
          "position": 34,
          "label": "Site R",
          "type": "Number",
          "description": "Resultant Fisher vector"
        },
        "site_inferred_age_sigma": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_inferred_age_sigma"
          }],
          "unit": "Custom",
          "position": 22,
          "label": "Site Inferred Age Sigma",
          "type": "Number",
          "description": "Site inferred age -- uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "site_description": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_description"
          }],
          "unit": "Text",
          "position": 46,
          "label": "Site Description",
          "type": "String",
          "description": "Detailed description"
        },
        "er_fossil_names": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "er_fossil_names"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Fossil Name List",
          "type": "List",
          "description": "Colon-delimited list of fossil names",
          "examples": ["AMM43-03", "AMM43-19"]
        },
        "site_int_rel": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_int_rel"
          }],
          "unit": "Dimensionless",
          "position": 39,
          "label": "Site Paleo Intensity Relative",
          "type": "Number",
          "description": "Relative field strength"
        },
        "er_specimen_names": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "er_specimen_names"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Specimen Name List",
          "type": "List",
          "description": "Colon-delimited list of specimen names",
          "examples": ["Bas123a-01x", "Bas123a-01y"]
        },
        "site_sigma": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_sigma"
          }],
          "unit": "Number in Degrees",
          "position": 28,
          "label": "Site Sigma",
          "type": "Number",
          "description": "Directions in coordinates specified by tilt correction -- standard deviation",
          "examples": ["Uncertainty = 1xSD"]
        },
        "site_int_n": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_int_n"
          }],
          "unit": "Integer",
          "position": 42,
          "label": "Site Paleo Intensity N",
          "type": "Integer",
          "description": "Number of samples included in intensity calculations"
        },
        "site_inc": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_inc"
          }],
          "unit": "Number in Degrees",
          "position": 26,
          "label": "Site Inclination",
          "type": "Number",
          "description": "Directions in coordinates specified by tilt correction -- inclination",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "er_mineral_names": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "er_mineral_names"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Mineral Name List",
          "type": "List",
          "description": "Colon-delimited list of mineral names"
        },
        "site_direction_type": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_direction_type"
          }],
          "unit": "Flag",
          "position": 17,
          "label": "Site Direction Type",
          "type": "String",
          "description": "Direction determined from (l) or plane (p)"
        },
        "site_comp_nmb": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_comp_nmb"
          }],
          "unit": "Integer",
          "position": 18,
          "label": "Site Component Number",
          "type": "Integer",
          "description": "Magnetic component number"
        },
        "site_nrm": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_nrm"
          }],
          "unit": "Flag",
          "position": 16,
          "label": "Site NRM",
          "type": "String",
          "description": "Origin of the NRM is primary (p) or secondary (s)"
        },
        "site_int_sigma_perc": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_int_sigma_perc"
          }],
          "unit": "Number in %",
          "position": 38,
          "label": "Site Paleo Intensity Sigma %",
          "type": "Number",
          "description": "Average field strength -- uncertainty in percent",
          "examples": ["Uncertainty = 1xSD"]
        },
        "site_dec": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_dec"
          }],
          "unit": "Number in Degrees",
          "position": 27,
          "label": "Site Declination",
          "type": "Number",
          "description": "Directions in coordinates specified by tilt correction -- declination",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "measurement_file_name": {
          "group": "Site Data",
          "next_columns": [{}],
          "unit": "Text",
          "position": 11,
          "label": "Measurement File Name",
          "type": "String",
          "description": "Name for MagIC format text file containing measurement data",
          "examples": ["Hart.et.al.2000.data.txt"]
        },
        "site_polarity": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_polarity"
          }],
          "unit": "Flag",
          "position": 15,
          "label": "Site Magnetic Polarity",
          "type": "String",
          "description": "Polarity of site",
          "examples": ["Polarity is normal (n)", "reversed (r)", "transitional (t)", "excursion (e) or intermediate (i)"]
        },
        "site_inferred_age_high": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_inferred_age_high"
          }],
          "unit": "Custom",
          "position": 24,
          "label": "Site Inferred Age High",
          "type": "Number",
          "description": "Site inferred age -- high range"
        },
        "er_expedition_name": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "er_expedition_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Expedition Name",
          "type": "String",
          "description": "Name for seagoing or land expedition",
          "examples": ["AVON02MV"]
        },
        "site_int": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_int"
          }],
          "unit": "Number in T",
          "position": 36,
          "label": "Site Paleo Intensity",
          "type": "Number",
          "description": "Average field strength"
        },
        "site_inferred_age_low": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_inferred_age_low"
          }],
          "unit": "Custom",
          "position": 23,
          "label": "Site Inferred Age Low",
          "type": "Number",
          "description": "Site inferred age -- low range"
        },
        "site_comp_n": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_comp_n"
          }],
          "unit": "Integer",
          "position": 19,
          "label": "Site Component N",
          "type": "Integer",
          "description": "Total number of magnetic components in specimen"
        },
        "site_inferred_age": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_inferred_age"
          }],
          "unit": "Custom",
          "position": 21,
          "label": "Site Inferred Age",
          "type": "Number",
          "description": "Site inferred age"
        },
        "site_int_rel_sigma_perc": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_int_rel_sigma_perc"
          }],
          "unit": "Number in %",
          "position": 41,
          "label": "Site Paleo Intensity Relative Sigma %",
          "type": "Number",
          "description": "Relative field strength -- uncertainty in percent",
          "examples": ["Uncertainty = 1xSD"]
        },
        "measurement_step_unit": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "measurement_step_unit"
          }],
          "unit": "Text",
          "position": 14,
          "label": "Measurement Step Unit",
          "type": "String",
          "description": "Step included in calculation -- unit"
        },
        "site_n_planes": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_n_planes"
          }],
          "unit": "Integer",
          "position": 32,
          "label": "Site N Best-Fit Planes",
          "type": "Integer",
          "description": "Number of samples included based on best-fit planes"
        },
        "site_alpha95": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_alpha95"
          }],
          "unit": "Number in Degrees",
          "position": 29,
          "label": "Site Alpha 95%",
          "type": "Number",
          "description": "Fisher circle",
          "examples": ["Confidence Level = 95%"]
        },
        "er_formation_name": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "er_formation_name"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Formation Name",
          "type": "String",
          "description": "Name for formation",
          "examples": ["Bluebird Formation"]
        },
        "er_analyst_mail_names": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "er_analyst_mail_names"
          }],
          "unit": "Text",
          "position": 51,
          "label": "Analyst Names",
          "type": "List",
          "description": "Colon-delimited list of names for analysts",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "measurement_step_min": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "measurement_step_min"
          }],
          "unit": "Custom",
          "position": 12,
          "label": "Measurement Step Minimum",
          "type": "Number",
          "description": "Step included in calculation -- lower bound"
        },
        "er_site_name": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "er_site_name"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Site Name",
          "type": "String",
          "description": "Name for site",
          "examples": ["Bas123a"]
        },
        "er_citation_names": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 52,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "pmag_rotation_codes": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "pmag_rotation_codes"
          }],
          "unit": "Text",
          "position": 48,
          "label": "Rotation Codes",
          "type": "List",
          "description": "Colon-delimited list of rotation codes",
          "examples": ["MY-TILT1", "MY-TILT2", "MY-TRANS1"]
        },
        "site_moment": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_magn_moment"
          }],
          "unit": "Number in Am2",
          "position": 43,
          "label": "Site NRM Moment",
          "type": "Number",
          "description": "Measured intensity -- remanent moment"
        },
        "site_inferred_age_unit": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_inferred_age_unit"
          }],
          "unit": "Text",
          "position": 25,
          "label": "Site Inferred Age Unit",
          "type": "String",
          "description": "Site inferred age -- unit",
          "examples": ["Ma", "Ka", "Ga", "Years BP", "Years AD (+/-)", "Years Cal BP", "Years Cal AD (+/-)"]
        },
        "site_comp_name": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_comp_name"
          }],
          "unit": "Text",
          "position": 20,
          "label": "Site Component Name",
          "type": "String",
          "description": "Site component name",
          "examples": ["Characteristic", "VRM", "Overprint", "A", "B", "C"]
        },
        "site_magn_weight": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_magn_mass"
          }],
          "unit": "Number in Am2/kg",
          "position": 45,
          "label": "Site NRM Magnetization Weight",
          "type": "Number",
          "description": "Measured intensity -- remanent magnetization that is weight normalized"
        },
        "measurement_step_max": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "measurement_step_max"
          }],
          "unit": "Custom",
          "position": 13,
          "label": "Measurement Step Maximum",
          "type": "Number",
          "description": "Step included in calculation -- higher bound"
        },
        "magic_instrument_codes": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "magic_instrument_codes"
          }],
          "unit": "Text",
          "position": 50,
          "label": "Instrument Codes",
          "type": "List",
          "description": "Colon-delimited list of instrument codes",
          "examples": ["SIO-Bubba", "IRM-OldBlue"]
        },
        "pmag_criteria_codes": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "pmag_criteria_codes"
          }],
          "unit": "Text",
          "position": 47,
          "label": "Criteria Codes",
          "type": "List",
          "description": "Colon-delimited list of criteria codes",
          "examples": ["MY-MAD", "MY-APLHA95"]
        },
        "site_magn_volume": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_magn_volume"
          }],
          "unit": "Number in A/m",
          "position": 44,
          "label": "Site NRM Magnetization Volume",
          "type": "Number",
          "description": "Measured intensity -- remanent magnetization that is volume normalized"
        },
        "site_k": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_k"
          }],
          "unit": "Dimensionless",
          "position": 33,
          "label": "Site K",
          "type": "Number",
          "description": "Fisher's dispersion parameter Kappa"
        },
        "site_tilt_correction": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_tilt_correction"
          }],
          "unit": "Number in %",
          "position": 35,
          "label": "Site Tilt Correction",
          "type": "Number",
          "description": "Percentage tilt correction applied to the data",
          "examples": ["Correction between geographic (0%) and stratigraphic (100%); unoriented (-1%); partially oriented to horizontal only (-2%)"]
        },
        "site_n_lines": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_n_lines"
          }],
          "unit": "Integer",
          "position": 31,
          "label": "Site N Best-Fit Lines",
          "type": "Integer",
          "description": "Number of samples included based on best-fit lines"
        },
        "er_section_name": {
          "group": "Site Data",
          "next_columns": [{}],
          "unit": "Text",
          "position": 4,
          "label": "Section Name",
          "type": "String",
          "description": "Name for section or core",
          "examples": ["Berkeley Lava Flows", "810C", "1129D"]
        },
        "site_int_rel_sigma": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "site_int_rel_sigma"
          }],
          "unit": "Dimensionless",
          "position": 40,
          "label": "Site Paleo Intensity Relative Sigma",
          "type": "Number",
          "description": "Relative field strength -- uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "er_location_name": {
          "group": "Site Data",
          "next_columns": [{
            "table": "pmag_sites",
            "column": "er_location_name"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Location Name",
          "type": "String",
          "description": "Name for location or drill site",
          "examples": ["San Francisco Volcanic Province", "Site 801"]
        }
      },
      "label": "Site Data",
      "description": "Unique rock unit in terms of magnetization and geological age"
    },
    "rmag_susceptibility": {
      "position": 26,
      "columns": {
        "er_member_name": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "er_member_name"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Member Name",
          "type": "String",
          "description": "Name for member",
          "examples": ["Glasshound Member"]
        },
        "magic_experiment_name": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "magic_experiment_names"
          }],
          "unit": "Text",
          "position": 11,
          "label": "Experiment Name",
          "type": "String",
          "description": "Name for experiment",
          "examples": ["KOPA-299-1"]
        },
        "susceptibility_h_high": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "susceptibility_h_high"
          }],
          "unit": "Number in T",
          "position": 20,
          "label": "Susceptibility Amplitude High",
          "type": "Number",
          "description": "Xhd calculation -- high amplitude"
        },
        "magic_method_codes": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "magic_method_codes"
          }],
          "unit": "Text",
          "position": 29,
          "label": "Method Codes",
          "type": "List",
          "description": "Colon-delimited list of method codes",
          "examples": ["DE-DC0", "FT-F1", "LP-DCDMAG"]
        },
        "susceptibility_temp_critical": {
          "group": "Susceptibility Experiments",
          "next_columns": [{}],
          "unit": "Number in K",
          "position": 23,
          "label": "Susceptibility Critical Temperature",
          "type": "Number",
          "description": "Temperature at which some transition occurs"
        },
        "susceptibility_temp_mineral": {
          "group": "Susceptibility Experiments",
          "next_columns": [{}],
          "unit": "Text",
          "position": 25,
          "label": "Susceptibility Critical Mineral Type",
          "type": "List",
          "description": "Interpreted mineral(s) causing the transition",
          "examples": ["Magnetite", "hematite", "maghemite"]
        },
        "susceptibility_temp_type": {
          "group": "Susceptibility Experiments",
          "next_columns": [{}],
          "unit": "Text",
          "position": 24,
          "label": "Susceptibility Critical Temperature Type",
          "type": "String",
          "description": "Interpreted type of temperature transition",
          "examples": ["Verway", "Morin", "pyrrhotite", "Neel", "spin glass", "Curie", "Hopkinson", "blocking", "unblocking"]
        },
        "susceptibility_h_low": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "susceptibility_h_low"
          }],
          "unit": "Number in T",
          "position": 19,
          "label": "Susceptibility Amplitude Low",
          "type": "Number",
          "description": "Xhd calculation -- low amplitude"
        },
        "susceptibility_xfd": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "susceptibility_f"
          }],
          "unit": "Dimensionless",
          "position": 15,
          "label": "Susceptibility Xfd",
          "type": "Number",
          "description": "Frequency dependence "
        },
        "rmag_criteria_codes": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "rmag_criteria_codes"
          }],
          "unit": "Text",
          "position": 28,
          "label": "Criteria Codes",
          "type": "List",
          "description": "Colon-delimited list of criteria codes",
          "examples": ["MY-MAD", "MY-APLHA95"]
        },
        "susceptibility_temp_low": {
          "group": "Susceptibility Experiments",
          "next_columns": [{}],
          "unit": "Number in K",
          "position": 21,
          "label": "Susceptibility Temperature Low",
          "type": "Number",
          "description": "Critical, Xfd or Xhd temperature calculation -- low range"
        },
        "susceptibility_k": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "susceptibility_chi_volume"
          }],
          "unit": "Number in SI",
          "position": 13,
          "label": "Susceptibility K",
          "type": "Number",
          "description": "Average magnetic susceptibility -- volume normalized"
        },
        "susceptibility_description": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "susceptibility_description"
          }],
          "unit": "Text",
          "position": 27,
          "label": "Susceptibility Description",
          "type": "String",
          "description": "Detailed description"
        },
        "measurement_file_name": {
          "group": "Susceptibility Experiments",
          "next_columns": [{}],
          "unit": "Text",
          "position": 12,
          "label": "Measurement File Name",
          "type": "String",
          "description": "Name for MagIC format text file containing measurement data",
          "examples": ["Hart.et.al.2000.data.txt"]
        },
        "er_synthetic_name": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "er_synthetic_name"
          }],
          "unit": "Text",
          "position": 10,
          "label": "Synthetic Material Name",
          "type": "String",
          "description": "Name for synthetic material",
          "examples": ["STD1546-A1"]
        },
        "er_expedition_name": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "er_expedition_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Expedition Name",
          "type": "String",
          "description": "Name for seagoing or land expedition",
          "examples": ["AVON02MV"]
        },
        "susceptibility_x": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "susceptibility_chi_mass"
          }],
          "unit": "Number in m3/kg",
          "position": 14,
          "label": "Susceptibility X",
          "type": "Number",
          "description": "Average magnetic susceptibility -- mass normalized"
        },
        "susceptibility_temp_high": {
          "group": "Susceptibility Experiments",
          "next_columns": [{}],
          "unit": "Number in K",
          "position": 22,
          "label": "Susceptibility Temperature High",
          "type": "Number",
          "description": "Critical, Xfd or Xhd temperature calculation -- high range"
        },
        "er_formation_name": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "er_formation_name"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Formation Name",
          "type": "String",
          "description": "Name for formation",
          "examples": ["Bluebird Formation"]
        },
        "susceptibility_f_low": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "susceptibility_f_low"
          }],
          "unit": "Number in Hz",
          "position": 16,
          "label": "Susceptibility Frequency Low",
          "type": "Number",
          "description": "Xfd calculation -- low frequency"
        },
        "er_analyst_mail_names": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "er_analyst_mail_names"
          }],
          "unit": "Text",
          "position": 31,
          "label": "Analyst Names",
          "type": "List",
          "description": "Colon-delimited list of names for analysts",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "susceptibility_f_high": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "susceptibility_f_high"
          }],
          "unit": "Number in Hz",
          "position": 17,
          "label": "Susceptibility Frequency High",
          "type": "Number",
          "description": "Xfd calculation -- high frequency"
        },
        "er_site_name": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "er_site_name"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Site Name",
          "type": "String",
          "description": "Name for site",
          "examples": ["Bas123a"]
        },
        "er_citation_names": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 32,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "er_sample_name": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "er_sample_name"
          }],
          "unit": "Text",
          "position": 6,
          "label": "Sample Name",
          "type": "String",
          "description": "Name for sample",
          "examples": ["Bas123a-01"]
        },
        "susceptibility_xhd": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "susceptibility_h"
          }],
          "unit": "Dimensionless",
          "position": 18,
          "label": "Susceptibility Xhd",
          "type": "Number",
          "description": "Amplitude dependence"
        },
        "er_specimen_name": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "er_specimen_name"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Specimen Name",
          "type": "String",
          "description": "Name for specimen",
          "examples": ["Bas123a-01x"]
        },
        "susceptibility_xx": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "susceptibility_loss_tangent"
          }],
          "unit": "Dimensionless",
          "position": 26,
          "label": "Susceptibility X?? Over X?",
          "type": "Number",
          "description": "Loss tangent or X(quadrature) over X(inphase)"
        },
        "magic_instrument_codes": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "magic_instrument_codes"
          }],
          "unit": "Text",
          "position": 30,
          "label": "Instrument Codes",
          "type": "List",
          "description": "Colon-delimited list of instrument codes",
          "examples": ["SIO-Bubba", "IRM-OldBlue"]
        },
        "er_mineral_name": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "er_mineral_name"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Mineral Name",
          "type": "String",
          "description": "Name for mineral",
          "examples": ["San03-001"]
        },
        "er_section_name": {
          "group": "Susceptibility Experiments",
          "next_columns": [{}],
          "unit": "Text",
          "position": 4,
          "label": "Section Name",
          "type": "String",
          "description": "Name for section or core",
          "examples": ["Berkeley Lava Flows", "810C", "1129D"]
        },
        "er_fossil_name": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "er_fossil_name"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Fossil Name",
          "type": "String",
          "description": "Name for fossil",
          "examples": ["AMM43-03"]
        },
        "er_location_name": {
          "group": "Susceptibility Experiments",
          "next_columns": [{
            "table": "rmag_susceptibility",
            "column": "er_location_name"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Location Name",
          "type": "String",
          "description": "Name for location or drill site",
          "examples": ["San Francisco Volcanic Province", "Site 801"]
        }
      },
      "label": "Susceptibility Experiments",
      "description": "Experiment for susceptibility parameters"
    },
    "er_fossils": {
      "position": 10,
      "columns": {
        "er_member_name": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "er_member_name"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Member Name",
          "type": "String",
          "description": "Name for member",
          "examples": ["Glasshound Member"]
        },
        "magic_method_codes": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "magic_method_codes"
          }],
          "unit": "Text",
          "position": 25,
          "label": "Method Codes",
          "type": "List",
          "description": "Colon-delimited list of method codes",
          "examples": ["DE-DC0", "FT-F1", "LP-DCDMAG"]
        },
        "fossil_density": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "fossil_density"
          }],
          "unit": "Number in g/m3",
          "position": 23,
          "label": "Fossil Density",
          "type": "Number",
          "description": "Fossil density"
        },
        "er_scientist_mail_names": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "er_scientist_mail_names"
          }],
          "unit": "Text",
          "position": 26,
          "label": "Research Scientist Names",
          "type": "List",
          "description": "Colon-delimited list of names for scientists who prepared fossil sample",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "fossil_class": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "fossil_class"
          }],
          "unit": "Text",
          "position": 11,
          "label": "Fossil Class",
          "type": "String",
          "description": "Fossil class",
          "examples": ["Branchiopoda", "Calcarea", "Camptostromoidea"]
        },
        "fossil_description": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "fossil_description"
          }],
          "unit": "Text",
          "position": 24,
          "label": "Fossil Description",
          "type": "String",
          "description": "Detailed description"
        },
        "fossil_volume": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "fossil_volume"
          }],
          "unit": "Number in m3",
          "position": 21,
          "label": "Fossil Volume",
          "type": "Number",
          "description": "Fossil volume"
        },
        "fossil_family": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "fossil_family"
          }],
          "unit": "Text",
          "position": 13,
          "label": "Fossil Family",
          "type": "String",
          "description": "Fossil family",
          "examples": ["Aceraceae", "Mucoraceae"]
        },
        "fossil_weight": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "fossil_weight"
          }],
          "unit": "Number in g",
          "position": 22,
          "label": "Fossil Weight",
          "type": "Number",
          "description": "Fossil weight"
        },
        "fossil_genus": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "fossil_genus"
          }],
          "unit": "Text",
          "position": 14,
          "label": "Fossil Genus",
          "type": "String",
          "description": "Fossil genus",
          "examples": ["Acer", "Canis", "Rhizopus"]
        },
        "er_expedition_name": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "er_expedition_name"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Expedition Name",
          "type": "String",
          "description": "Name for seagoing or land expedition",
          "examples": ["AVON02MV"]
        },
        "fossil_shape": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "fossil_shape"
          }],
          "unit": "Text",
          "position": 20,
          "label": "Fossil Shape",
          "type": "String",
          "description": "Fossil shape"
        },
        "er_formation_name": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "er_formation_name"
          }],
          "unit": "Text",
          "position": 4,
          "label": "Formation Name",
          "type": "String",
          "description": "Name for formation",
          "examples": ["Bluebird Formation"]
        },
        "fossil_alteration_type": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "fossil_alteration_type"
          }],
          "unit": "Text",
          "position": 19,
          "label": "Fossil Alteration Type",
          "type": "String",
          "description": "Fossil alteration type",
          "examples": ["Hydrothermal", "Diagenetic", "Weathering", "Oxidation", "Metamorphic"]
        },
        "er_fossil_alternatives": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "er_fossil_alternatives"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Fossil Name Alternatives",
          "type": "List",
          "description": "Colon-delimited list of alternative names and abbreviations"
        },
        "fossil_preservation": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "fossil_preservation"
          }],
          "unit": "Text",
          "position": 16,
          "label": "Fossil Preservation",
          "type": "String",
          "description": "Fossil preservation",
          "examples": ["Pristine", "Altered"]
        },
        "fossil_phylum": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "fossil_phylum"
          }],
          "unit": "Text",
          "position": 10,
          "label": "Fossil Phylum",
          "type": "String",
          "description": "Fossil phylum",
          "examples": ["Chordata", "Magnoliophyta", "Zygomycota", "Firmicutes", "Chlorophyta"]
        },
        "fossil_species": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "fossil_species"
          }],
          "unit": "Text",
          "position": 15,
          "label": "Fossil Species",
          "type": "String",
          "description": "Fossil species",
          "examples": ["A. Saccharum", "R. Stolonifer"]
        },
        "er_site_name": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "er_site_name"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Site Name",
          "type": "String",
          "description": "Name for site",
          "examples": ["Bas123a"]
        },
        "er_citation_names": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 27,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "er_sample_name": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "er_sample_name"
          }],
          "unit": "Text",
          "position": 8,
          "label": "Sample Name",
          "type": "String",
          "description": "Name for sample",
          "examples": ["Bas123a-01"]
        },
        "fossil_alteration": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "fossil_alteration"
          }],
          "unit": "Text",
          "position": 18,
          "label": "Fossil Alteration",
          "type": "String",
          "description": "Fossil alteration grade",
          "examples": ["Severe", "High", "Mild", "Trace", "Unaltered"]
        },
        "er_specimen_name": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "er_specimen_name"
          }],
          "unit": "Text",
          "position": 9,
          "label": "Specimen Name",
          "type": "String",
          "description": "Name for specimen",
          "examples": ["Bas123a-01x"]
        },
        "fossil_texture": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "fossil_texture"
          }],
          "unit": "Text",
          "position": 17,
          "label": "Fossil Texture",
          "type": "String",
          "description": "Fossil texture",
          "examples": ["Crystalline", "Porous", "Homogeneous"]
        },
        "fossil_order": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "fossil_order"
          }],
          "unit": "Text",
          "position": 12,
          "label": "Fossil Order",
          "type": "String",
          "description": "Fossil order",
          "examples": ["Alcyonida", "Strophomenida", "Thecideida"]
        },
        "er_section_name": {
          "group": "Fossils",
          "next_columns": [{}],
          "unit": "Text",
          "position": 6,
          "label": "Section Name",
          "type": "String",
          "description": "Name for section or core",
          "examples": ["Berkeley Lava Flows", "810C", "1129D"]
        },
        "er_fossil_name": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "er_fossil_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Fossil Name",
          "type": "String",
          "description": "Name for fossil",
          "examples": ["AMM43-03"]
        },
        "er_location_name": {
          "group": "Fossils",
          "next_columns": [{
            "table": "er_fossils",
            "column": "er_location_name"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Location Name",
          "type": "String",
          "description": "Name for location or drill site",
          "examples": ["San Francisco Volcanic Province", "Site 801"]
        }
      },
      "label": "Fossils",
      "description": "Taxon or fossil"
    },
    "pmag_results": {
      "position": 23,
      "columns": {
        "average_nn": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_nn"
          }],
          "unit": "Integer",
          "position": 29,
          "label": "Number of Samples",
          "type": "Integer",
          "description": "Number of samples included in directional calculations"
        },
        "er_sample_names": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "er_sample_names"
          }],
          "unit": "Text",
          "position": 4,
          "label": "Sample Name List",
          "type": "List",
          "description": "Colon-delimited list of sample names"
        },
        "average_int": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_int"
          }],
          "unit": "Number in T",
          "position": 32,
          "label": "Average Intensity",
          "type": "Number",
          "description": "Average field strength"
        },
        "average_age": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_age"
          }],
          "unit": "Custom",
          "position": 19,
          "label": "Average Age",
          "type": "Number",
          "description": "Average magnetization age based on multiple sites"
        },
        "reversed_alpha95": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "reversed_alpha95"
          }],
          "unit": "Number in Degrees",
          "position": 87,
          "label": "Reversed Alpha 95%",
          "type": "Number",
          "description": "Average direction Fisher circle",
          "examples": ["Confidence Level = 95%"]
        },
        "magic_method_codes": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "magic_method_codes"
          }],
          "unit": "Text",
          "position": 93,
          "label": "Method Codes",
          "type": "List",
          "description": "Colon-delimited list of method codes",
          "examples": ["DE-DC0", "FT-F1", "LP-DCDMAG"]
        },
        "tilt_inc_corr": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "tilt_inc_corr"
          }],
          "unit": "Number in Degrees",
          "position": 63,
          "label": "Tilt Corrected Inclination",
          "type": "Number",
          "description": "Tilt corrected inclination",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "tilt_alpha95_uncorr": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "tilt_alpha95_uncorr"
          }],
          "unit": "Number in Degrees",
          "position": 70,
          "label": "Tilt Uncorrected Alpha 95%",
          "type": "Number",
          "description": "Fisher circle",
          "examples": ["Confidence Level = 95%"]
        },
        "vdm": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "vdm"
          }],
          "unit": "Number in Am2",
          "position": 54,
          "label": "VDM",
          "type": "Number",
          "description": "Virtual dipole moment"
        },
        "tilt_k_ratio": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "tilt_k_ratio"
          }],
          "unit": "Dimensionless",
          "position": 61,
          "label": "Tilt K Ratio",
          "type": "Number",
          "description": "Comparison of Fisher dispersion K after and before tilt correction"
        },
        "iaga_res_no": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "iaga_res_no"
          }],
          "unit": "Integer",
          "position": 89,
          "label": "IAGA Database Result Number",
          "type": "Integer",
          "description": "IAGA7 database -- internal record number of result"
        },
        "average_alpha95": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_alpha95"
          }],
          "unit": "Number in Degrees",
          "position": 27,
          "label": "Average Alpha 95%",
          "type": "Number",
          "description": "Average direction Fisher circle",
          "examples": ["Confidence Level = 95%"]
        },
        "average_int_rel_sigma_perc": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_int_rel_sigma_perc"
          }],
          "unit": "Number in %",
          "position": 36,
          "label": "Average Intensity Relative Sigma %",
          "type": "Number",
          "description": "Relative average field strength -- uncertainty in percent",
          "examples": ["Uncertainty = 1xSD"]
        },
        "fold_test_significance": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "fold_test_significance"
          }],
          "unit": "Number in %",
          "position": 71,
          "label": "Fold Test Significance",
          "type": "Number",
          "description": "Significance level achieved in tilt correction calculations"
        },
        "antipodal": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "antipodal"
          }],
          "unit": "Number in Degrees",
          "position": 73,
          "label": "Antipodal Angle",
          "type": "Number",
          "description": "Great circle distance between normal and reversed poles",
          "examples": ["Decimal degrees between 0 and 180"]
        },
        "reversed_lat": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "reversed_lat"
          }],
          "unit": "Number in Degrees",
          "position": 81,
          "label": "Reversed Pole Latitude",
          "type": "Number",
          "description": "Reversed pole -- latitude",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "eta_inc": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "eta_inc"
          }],
          "unit": "Number in Degrees",
          "position": 39,
          "label": "Confidence Ellipse",
          "type": "Number",
          "description": "Definition of confidence ellipse -- inclination",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "er_fossil_names": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "er_fossil_names"
          }],
          "unit": "Text",
          "position": 6,
          "label": "Fossil Name List",
          "type": "List",
          "description": "Colon-delimited list of fossil names included in calculation",
          "examples": ["AMM43-03", "AMM43-19"]
        },
        "tilt_k_uncorr": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "tilt_k_uncorr"
          }],
          "unit": "Dimensionless",
          "position": 69,
          "label": "Tilt Uncorrected K",
          "type": "Number",
          "description": "Average direction Fisher's dispersion parameter Kappa"
        },
        "er_specimen_names": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "er_specimen_names"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Specimen Name List",
          "type": "List",
          "description": "Colon-delimited list of specimen names"
        },
        "average_sigma": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_sigma"
          }],
          "unit": "Number in Degrees",
          "position": 26,
          "label": "Average Sigma",
          "type": "Number",
          "description": "Average direction in stratigraphic coordinates -- standard deviation",
          "examples": ["Uncertainty = 1xSD"]
        },
        "average_age_sigma": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_age_sigma"
          }],
          "unit": "Custom",
          "position": 20,
          "label": "Average Age Sigma",
          "type": "Number",
          "description": "Average magnetization age based on multiple sites -- uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "contact_test": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "contact_test"
          }],
          "unit": "Flag",
          "position": 10,
          "label": "Baked Contact Test",
          "type": "String",
          "description": "Classification and result of the (inverse) contact test",
          "examples": ["C+", "IC+", "+ (pos)", "Co", "Ico", "o (indeterminate)", "C-", "IC-", "- (neg)", "ND (not done)"]
        },
        "normal_lon": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "normal_lon"
          }],
          "unit": "Number in Degrees",
          "position": 75,
          "label": "Normal Pole Longitude",
          "type": "Number",
          "description": "Normal pole -- longitude",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "average_int_rel": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_int_rel"
          }],
          "unit": "Dimensionless",
          "position": 34,
          "label": "Average Intensity Relative",
          "type": "Number",
          "description": "Relative average field strength"
        },
        "eta_semi_angle": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "eta_semi_angle"
          }],
          "unit": "Number in Degrees",
          "position": 41,
          "label": "Confidence Ellipse",
          "type": "Number",
          "description": "Definition of confidence ellipse -- semi angle",
          "examples": ["Confidence Level = 95%"]
        },
        "vadm_sigma": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "vadm_sigma"
          }],
          "unit": "Number in Am2",
          "position": 58,
          "label": "VADM Sigma",
          "type": "Number",
          "description": "Virtual axial dipole moment -- uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "average_height": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_height"
          }],
          "unit": "Number in m",
          "position": 18,
          "label": "Average Height",
          "type": "Number",
          "description": "Measurement stratigraphic height relative to reference height",
          "examples": ["Positive is up in section or core", "negative is down"]
        },
        "vdm_sigma": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "vdm_sigma"
          }],
          "unit": "Number in Am2",
          "position": 55,
          "label": "VDM Sigma",
          "type": "Number",
          "description": "Virtual dipole moment -- uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "average_int_sigma": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_int_sigma"
          }],
          "unit": "Number in T",
          "position": 33,
          "label": "Average Intensity Sigma",
          "type": "Number",
          "description": "Average field strength -- uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "zeta_semi_angle": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "zeta_semi_angle"
          }],
          "unit": "Number in Degrees",
          "position": 44,
          "label": "Confidence Ellipse",
          "type": "Number",
          "description": "Definition of confidence ellipse -- semi angle",
          "examples": ["Confidence Level = 95%"]
        },
        "er_mineral_names": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "er_mineral_names"
          }],
          "unit": "Text",
          "position": 7,
          "label": "Mineral Name List",
          "type": "List",
          "description": "Colon-delimited list of mineral names"
        },
        "vgp_lat": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "vgp_lat"
          }],
          "unit": "Number in Degrees",
          "position": 47,
          "label": "VGP Latitude",
          "type": "Number",
          "description": "Virtual geomagnetic pole -- latitude",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "normal_k": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "normal_k"
          }],
          "unit": "Dimensionless",
          "position": 79,
          "label": "Normal K",
          "type": "Number",
          "description": "Average direction Fisher's dispersion parameter Kappa"
        },
        "average_lon": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_lon"
          }],
          "unit": "Number in Degrees",
          "position": 16,
          "label": "Average Longitude",
          "type": "Number",
          "description": "Average location based on multiple sites -- longitude",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "zeta_inc": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "zeta_inc"
          }],
          "unit": "Number in Degrees",
          "position": 42,
          "label": "Confidence Ellipse",
          "type": "Number",
          "description": "Definition of confidence ellipse -- inclination",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "tilt_alpha95_corr": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "tilt_alpha95_corr"
          }],
          "unit": "Number in Degrees",
          "position": 66,
          "label": "Tilt Corrected Alpha 95%",
          "type": "Number",
          "description": "Fisher circle",
          "examples": ["Confidence Level = 95%"]
        },
        "average_age_low": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_age_low"
          }],
          "unit": "Custom",
          "position": 21,
          "label": "Average Age Low",
          "type": "Number",
          "description": "Average magnetization age based on multiple sites -- low range"
        },
        "model_lat_sigma": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "model_lat_sigma"
          }],
          "unit": "Number in Degrees",
          "position": 46,
          "label": "Model Latitude Sigma",
          "type": "Number",
          "description": "Model latitude based on plate reconstruction -- uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "normal_alpha95": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "normal_alpha95"
          }],
          "unit": "Number in Degrees",
          "position": 80,
          "label": "Normal Alpha 95%",
          "type": "Number",
          "description": "Average direction Fisher circle",
          "examples": ["Confidence Level = 95%"]
        },
        "tilt_dec_corr": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "tilt_dec_corr"
          }],
          "unit": "Number in Degrees",
          "position": 64,
          "label": "Tilt Corrected Declination",
          "type": "Number",
          "description": "Tilt corrected declination",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "percent_reversed": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "percent_reversed"
          }],
          "unit": "Number in %",
          "position": 72,
          "label": "Percentage Reversed Data",
          "type": "Number",
          "description": "Percentage of sites and samples that is reversed",
          "examples": ["200 indicates \"mixed\" polarity and negative numbers indicate \"unknown\" polarity"]
        },
        "vgp_alpha95": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "vgp_alpha95"
          }],
          "unit": "Number in Degrees",
          "position": 52,
          "label": "VGP Alpha 95%",
          "type": "Number",
          "description": "Fisher circle",
          "examples": ["Confidence Level = 95%"]
        },
        "tilt_k_corr": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "tilt_k_corr"
          }],
          "unit": "Dimensionless",
          "position": 65,
          "label": "Tilt Corrected K",
          "type": "Number",
          "description": "Average direction Fisher's dispersion parameter Kappa"
        },
        "fold_test": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "fold_test"
          }],
          "unit": "Flag",
          "position": 8,
          "label": "Fold Test",
          "type": "String",
          "description": "Classification and result of the folding test",
          "examples": ["F+", "SF+", "RF+", "+ (pos)", "Fo", "SFo", "Rfo", "o (indeterminate)", "F-", "SF-", "RF-", "- (neg)", "ND (not done) "]
        },
        "reversed_n": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "reversed_n"
          }],
          "unit": "Integer",
          "position": 85,
          "label": "Reversed N",
          "type": "Integer",
          "description": "Number of sites or samples included in reversed pole calculation"
        },
        "result_description": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "result_description"
          }],
          "unit": "Text",
          "position": 90,
          "label": "Result Description",
          "type": "String",
          "description": "Detailed description of results"
        },
        "average_k": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_k"
          }],
          "unit": "Dimensionless",
          "position": 30,
          "label": "Average K",
          "type": "Number",
          "description": "Average direction Fisher's dispersion parameter Kappa"
        },
        "vgp_lon": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "vgp_lon"
          }],
          "unit": "Number in Degrees",
          "position": 48,
          "label": "VGP Longitude",
          "type": "Number",
          "description": "Virtual geomagnetic pole -- longitude",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "average_age_unit": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_age_unit"
          }],
          "unit": "Text",
          "position": 23,
          "label": "Average Age Unit",
          "type": "String",
          "description": "Average magnetization age based on multiple sites -- unit",
          "examples": ["Ma", "Ka", "Ga", "Years BP", "Years AD (+/-)", "Years Cal BP", "Years Cal AD (+/-)"]
        },
        "model_lat": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "model_lat"
          }],
          "unit": "Number in Degrees",
          "position": 45,
          "label": "Model Latitude",
          "type": "Number",
          "description": "Model latitude based on plate reconstruction",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "tilt_dec_uncorr": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "tilt_dec_uncorr"
          }],
          "unit": "Number in Degrees",
          "position": 68,
          "label": "Tilt Uncorrected Declination",
          "type": "Number",
          "description": "Tilt uncorrected declination",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "normal_n": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "normal_n"
          }],
          "unit": "Integer",
          "position": 78,
          "label": "Normal N",
          "type": "Integer",
          "description": "Number of sites or samples included in normal pole calculation"
        },
        "average_int_nn": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_int_nn"
          }],
          "unit": "Integer",
          "position": 38,
          "label": "Number of Samples",
          "type": "Integer",
          "description": "Number of samples included in intensity calculations"
        },
        "normal_lat": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "normal_lat"
          }],
          "unit": "Number in Degrees",
          "position": 74,
          "label": "Normal Pole Latitude",
          "type": "Number",
          "description": "Normal pole -- latitude",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "reversed_lon": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "reversed_lon"
          }],
          "unit": "Number in Degrees",
          "position": 82,
          "label": "Reversed Pole Longitude",
          "type": "Number",
          "description": "Reversed pole -- longitude",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "vdm_n": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "vdm_n"
          }],
          "unit": "Integer",
          "position": 56,
          "label": "VDM N",
          "type": "Integer",
          "description": "Number of data points included in VDM calculations"
        },
        "tilt_inc_uncorr": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "tilt_inc_uncorr"
          }],
          "unit": "Number in Degrees",
          "position": 67,
          "label": "Tilt Uncorrected Inclination",
          "type": "Number",
          "description": "Tilt uncorrected inclination",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "average_inc": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_inc"
          }],
          "unit": "Number in Degrees",
          "position": 24,
          "label": "Average Inclination",
          "type": "Number",
          "description": "Average direction in stratigraphic coordinates -- inclination",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "reversed_inc": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "reversed_inc"
          }],
          "unit": "Number in Degrees",
          "position": 83,
          "label": "Reversed Inclination",
          "type": "Number",
          "description": "Reversed pole -- inclination",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "average_int_n": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_int_n"
          }],
          "unit": "Integer",
          "position": 37,
          "label": "Number of Sites",
          "type": "Integer",
          "description": "Number of sites included in intensity calculations"
        },
        "average_age_high": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_age_high"
          }],
          "unit": "Custom",
          "position": 22,
          "label": "Average Age High",
          "type": "Number",
          "description": "Average magnetization age based on multiple sites -- high range"
        },
        "eta_dec": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "eta_dec"
          }],
          "unit": "Number in Degrees",
          "position": 40,
          "label": "Confidence Ellipse",
          "type": "Number",
          "description": "Definition of confidence ellipse -- declination",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "average_int_rel_sigma": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_int_rel_sigma"
          }],
          "unit": "Dimensionless",
          "position": 35,
          "label": "Average Intensity Relative Sigma",
          "type": "Number",
          "description": "Relative average field strength -- uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "er_analyst_mail_names": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "er_analyst_mail_names"
          }],
          "unit": "Text",
          "position": 94,
          "label": "Analyst Names",
          "type": "List",
          "description": "Colon-delimited list of names for analysts",
          "examples": ["Jim R.D. Hart", "Alexis Heard", "Bob McIntire"]
        },
        "pmag_result_name": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "pmag_result_name"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Result Name",
          "type": "String",
          "description": "Name or number to identify results",
          "examples": ["MY-POLE-XX"]
        },
        "average_lat_sigma": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_lat_sigma"
          }],
          "unit": "Number in Degrees",
          "position": 15,
          "label": "Average Latitude Sigma",
          "type": "Number",
          "description": "Average location based on multiple sites -- latitude uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "tilt_n": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "tilt_n"
          }],
          "unit": "Integer",
          "position": 62,
          "label": "Tilt N",
          "type": "Integer",
          "description": "Number of data points included in tilt correction"
        },
        "vadm": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "vadm"
          }],
          "unit": "Number in Am2",
          "position": 57,
          "label": "VADM",
          "type": "Number",
          "description": "Virtual axial dipole moment"
        },
        "average_lon_sigma": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_lon_sigma"
          }],
          "unit": "Number in Degrees",
          "position": 17,
          "label": "Average Longitude Sigma",
          "type": "Number",
          "description": "Average location based on multiple sites -- longitude uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "er_citation_names": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 95,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "tilt_correction": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "tilt_correction"
          }],
          "unit": "Number in %",
          "position": 60,
          "label": "Tilt Correction",
          "type": "Number",
          "description": "Tilt correction applied to the data"
        },
        "reversed_dec": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "reversed_dec"
          }],
          "unit": "Number in Degrees",
          "position": 84,
          "label": "Reversed Declination",
          "type": "Number",
          "description": "Reversed pole -- declination",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "iaga_database": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "iaga_database"
          }],
          "unit": "Text",
          "position": 88,
          "label": "IAGA Database Name",
          "type": "String",
          "description": "IAGA7 database -- name",
          "examples": ["ARCHEO", "PGMDB", "PINT", "PSVRL", "SECVR", "TRANS"]
        },
        "vgp_dp": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "vgp_dp"
          }],
          "unit": "Number in Degrees",
          "position": 49,
          "label": "VGP DP",
          "type": "Number",
          "description": "Virtual geomagnetic pole -- parallel latitude uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "pmag_rotation_codes": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "pmag_rotation_codes"
          }],
          "unit": "Text",
          "position": 92,
          "label": "Rotation Codes",
          "type": "List",
          "description": "Colon-delimited list of rotation codes",
          "examples": ["MY-TILT1", "MY-TILT2", "MY-TRANS1"]
        },
        "vgp_n": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "vgp_n"
          }],
          "unit": "Integer",
          "position": 53,
          "label": "VGP N",
          "type": "Integer",
          "description": "Number of data points included in VGP calculations"
        },
        "vgp_sigma": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "vgp_sigma"
          }],
          "unit": "Number in Degrees",
          "position": 51,
          "label": "VGP Sigma",
          "type": "Number",
          "description": "Virtual geomagnetic pole -- standard deviation",
          "examples": ["Uncertainty = 1xSD"]
        },
        "average_n": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_n"
          }],
          "unit": "Integer",
          "position": 28,
          "label": "Number of Sites",
          "type": "Integer",
          "description": "Number of sites included in directional calculations"
        },
        "er_site_names": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "er_site_names"
          }],
          "unit": "Text",
          "position": 3,
          "label": "Site Name List",
          "type": "List",
          "description": "Colon-delimited list of site names",
          "examples": ["Bas123a", "Bas156z", "Bas445c"]
        },
        "average_dec": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_dec"
          }],
          "unit": "Number in Degrees",
          "position": 25,
          "label": "Average Declination",
          "type": "Number",
          "description": "Average direction in stratigraphic coordinates -- declination",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "zeta_dec": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "zeta_dec"
          }],
          "unit": "Number in Degrees",
          "position": 43,
          "label": "Confidence Ellipse",
          "type": "Number",
          "description": "Definition of confidence ellipse -- declination",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "er_section_names": {
          "group": "Results",
          "next_columns": [{}],
          "unit": "Text",
          "position": 2,
          "label": "Section Name List",
          "type": "List",
          "description": "Colon-delimited list of section or core names",
          "examples": ["810C", "810D"]
        },
        "normal_inc": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "normal_inc"
          }],
          "unit": "Number in Degrees",
          "position": 76,
          "label": "Normal Inclination",
          "type": "Number",
          "description": "Normal pole -- inclination",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "vadm_n": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "vadm_n"
          }],
          "unit": "Integer",
          "position": 59,
          "label": "VADM N",
          "type": "Integer",
          "description": "Number of data points included in VADM calculations"
        },
        "conglomerate_test": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "conglomerate_test"
          }],
          "unit": "Flag",
          "position": 9,
          "label": "Conglomerate Test",
          "type": "String",
          "description": "Classification and result of the (intra-formational) conglomerate test",
          "examples": ["G+", "IG+", "+ (pos)", "Go", "Igo", "o (indeterminate)", "G-", "IG-", "- (neg)", "ND (not done)"]
        },
        "pmag_criteria_codes": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "pmag_criteria_codes"
          }],
          "unit": "Text",
          "position": 91,
          "label": "Criteria Codes",
          "type": "List",
          "description": "Colon-delimited list of criteria codes",
          "examples": ["MY-MAD", "MY-APLHA95"]
        },
        "reversed_k": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "reversed_k"
          }],
          "unit": "Dimensionless",
          "position": 86,
          "label": "Reversed K",
          "type": "Number",
          "description": "Average direction Fisher's dispersion parameter Kappa"
        },
        "average_lat": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_lat"
          }],
          "unit": "Number in Degrees",
          "position": 14,
          "label": "Average Latitude",
          "type": "Number",
          "description": "Average location based on multiple sites -- latitude",
          "examples": ["Decimal degrees between -90 and 90"]
        },
        "reversal_test": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "reversal_test"
          }],
          "unit": "Flag",
          "position": 11,
          "label": "Reversal Test",
          "type": "String",
          "description": "Classification and result of the reversal test",
          "examples": ["Ra", "Rb", "Rc", "+ (pos)", "Ro", "o (indeterminate)", "R-", "- (neg)", "ND (not done)"]
        },
        "pole_comp_name": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "pole_comp_name"
          }],
          "unit": "Text",
          "position": 13,
          "label": "Pole Component Name",
          "type": "String",
          "description": "Name of magnetic component for which pole is calculated",
          "examples": ["Characteristic", "VRM", "Overprint", "A", "B", "C"]
        },
        "er_location_names": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "er_location_names"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Location Name List",
          "type": "List",
          "description": "Colon-delimited list of location or drill site names",
          "examples": ["Site 801", "Site 1129"]
        },
        "vgp_dm": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "vgp_dm"
          }],
          "unit": "Number in Degrees",
          "position": 50,
          "label": "VGP DM",
          "type": "Number",
          "description": "Virtual geomagnetic pole -- meridian uncertainty",
          "examples": ["Uncertainty = 1xSD"]
        },
        "normal_dec": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "normal_dec"
          }],
          "unit": "Number in Degrees",
          "position": 77,
          "label": "Normal Declination",
          "type": "Number",
          "description": "Normal pole -- declination",
          "examples": ["Decimal degrees between 0 and 360"]
        },
        "rock_magnetic_test": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "rock_magnetic_test"
          }],
          "unit": "Flag",
          "position": 12,
          "label": "Rock Magnetic Test",
          "type": "String",
          "description": "Classification and result of the various rock magnetic tests",
          "examples": ["M (done)", "ND (not done)"]
        },
        "average_r": {
          "group": "Results",
          "next_columns": [{
            "table": "pmag_results",
            "column": "average_r"
          }],
          "unit": "Dimensionless",
          "position": 31,
          "label": "Average R",
          "type": "Number",
          "description": "Average direction resultant Fisher vector"
        }
      },
      "label": "Results",
      "description": "Summary of results: Magnetic poles, VGP, VDM and VADM"
    },
    "pmag_criteria": {
      "position": 25,
      "columns": {
        "average_nn": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "average_nn"
          }],
          "unit": "Integer",
          "position": 84,
          "label": "Average N Samples",
          "type": "Integer",
          "description": "Number of samples included in directional calculations",
          "examples": ["Criterion = minimum"]
        },
        "specimen_g": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_g"
          }],
          "unit": "Dimensionless",
          "position": 25,
          "label": "Specimen g",
          "type": "Number",
          "description": "COE's quality factors -- the GAP factor",
          "examples": ["Criterion = minimum"]
        },
        "site_n": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_n"
          }],
          "unit": "Integer",
          "position": 63,
          "label": "Site N",
          "type": "Integer",
          "description": "Number of samples included in directional calculations",
          "examples": ["Criterion = minimum"]
        },
        "site_int_sigma": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_int_sigma"
          }],
          "unit": "Number in T",
          "position": 69,
          "label": "Site Paleo Intensity Sigma",
          "type": "Number",
          "description": "Average field strength -- uncertainty",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "magic_experiment_name": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "magic_experiment_names"
          }],
          "unit": "Text",
          "position": 2,
          "label": "Experiment Name",
          "type": "String",
          "description": "Name for experiment",
          "examples": ["KOPA-299-1"]
        },
        "specimen_int_rel_sigma_perc": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_int_rel_sigma_perc"
          }],
          "unit": "Number in %",
          "position": 16,
          "label": "Specimen Paleo Intensity Relative Sigma %",
          "type": "Number",
          "description": "Relative field strength -- uncertainty in percent",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "specimen_f": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_f"
          }],
          "unit": "Dimensionless",
          "position": 21,
          "label": "Specimen f",
          "type": "Number",
          "description": "COE's quality factors -- amount of NRM in component",
          "examples": ["Criterion = minimum"]
        },
        "site_r": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_r"
          }],
          "unit": "Dimensionless",
          "position": 67,
          "label": "Site R",
          "type": "Number",
          "description": "Resultant Fisher vector",
          "examples": ["Criterion = minimum"]
        },
        "sample_magn_volume": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_magn_volume"
          }],
          "unit": "Number in A/m",
          "position": 55,
          "label": "Sample NRM Magnetization Volume",
          "type": "Number",
          "description": "Measured intensity -- remanent magnetization that is volume normalized",
          "examples": ["Criterion = minimum"]
        },
        "specimen_int_sigma_perc": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_int_sigma_perc"
          }],
          "unit": "Number in %",
          "position": 14,
          "label": "Specimen Paleo Intensity Sigma %",
          "type": "Number",
          "description": "Average field strength -- uncertainty in percent",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "average_alpha95": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "average_alpha95"
          }],
          "unit": "Number in Degrees",
          "position": 82,
          "label": "Average Alpha 95%",
          "type": "Number",
          "description": "Fisher circle",
          "examples": ["Criterion = maximum; Confidence Level = 95%"]
        },
        "average_int_rel_sigma_perc": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "average_int_rel_sigma_perc"
          }],
          "unit": "Number in %",
          "position": 89,
          "label": "Average Intensity Relative Sigma %",
          "type": "Number",
          "description": "Relative VGP field strength -- uncertainty in percent",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "sample_sigma": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_sigma"
          }],
          "unit": "Number in Degrees",
          "position": 41,
          "label": "Sample Sigma",
          "type": "Number",
          "description": "Directions in sample coordinates -- standard deviation",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "average_age_max": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "average_age_max"
          }],
          "unit": "Custom",
          "position": 78,
          "label": "Average Age Maximum",
          "type": "Number",
          "description": "Average age based on multiple sites or samples -- maximum",
          "examples": ["Criterion = maximum"]
        },
        "specimen_b_sigma": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_b_sigma"
          }],
          "unit": "Dimensionless",
          "position": 23,
          "label": "Specimen b Sigma",
          "type": "Number",
          "description": "COE's quality factors -- error on slope fit",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "average_sigma": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "average_sigma"
          }],
          "unit": "Number in Degrees",
          "position": 81,
          "label": "Average Sigma",
          "type": "Number",
          "description": "Directions in stratigraphic coordinates -- standard deviation",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "site_sigma": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_sigma"
          }],
          "unit": "Number in Degrees",
          "position": 61,
          "label": "Site Sigma",
          "type": "Number",
          "description": "Directions in stratigraphic coordinates -- standard deviation",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "average_age_sigma": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "average_age_sigma"
          }],
          "unit": "Custom",
          "position": 79,
          "label": "Average Age Sigma",
          "type": "Number",
          "description": "Average age based on multiple sites or samples -- uncertainty",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "specimen_drat": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_drat"
          }],
          "unit": "Number in %",
          "position": 29,
          "label": "Specimen Difference Ratio pTRM Checks",
          "type": "Number",
          "description": "Difference in first and second pTRM measurements",
          "examples": ["Criterion = maximum"]
        },
        "specimen_q": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_q"
          }],
          "unit": "Dimensionless",
          "position": 20,
          "label": "Specimen Q",
          "type": "Number",
          "description": "COE's quality factors -- overall quality",
          "examples": ["Criterion = minimum"]
        },
        "specimen_md": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_md"
          }],
          "unit": "Number in %",
          "position": 27,
          "label": "Specimen Maximum MD",
          "type": "Number",
          "description": "Maximum difference between first and second zero field steps",
          "examples": ["Criterion = maximum"]
        },
        "site_int_n": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_int_n"
          }],
          "unit": "Integer",
          "position": 73,
          "label": "Site Paleo Intensity N",
          "type": "Integer",
          "description": "Number of samples included in intensity calculations",
          "examples": ["Criterion = minimum"]
        },
        "vadm_sigma": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "vadm_sigma"
          }],
          "unit": "Number in Am2",
          "position": 99,
          "label": "VADM Sigma",
          "type": "Number",
          "description": "Virtual axial dipole moment -- uncertainty",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "sample_int_sigma": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_int_sigma"
          }],
          "unit": "Number in T",
          "position": 49,
          "label": "Sample Paleo Intensity Sigma",
          "type": "Number",
          "description": "Average field strength -- uncertainty",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "vdm_sigma": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "vdm_sigma"
          }],
          "unit": "Number in Am2",
          "position": 97,
          "label": "VDM Sigma",
          "type": "Number",
          "description": "Virtual dipole moment -- uncertainty",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "average_int_sigma": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "average_int_sigma"
          }],
          "unit": "Number in T",
          "position": 87,
          "label": "Average Intensity Sigma",
          "type": "Number",
          "description": "VGP field strength -- uncertainty",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "site_direction_type": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_direction_type"
          }],
          "unit": "Flag",
          "position": 59,
          "label": "Site Direction Type",
          "type": "String",
          "description": "Direction determined from (l) or plane (p)"
        },
        "average_age_min": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "average_age_min"
          }],
          "unit": "Custom",
          "position": 77,
          "label": "Average Age Minimum",
          "type": "Number",
          "description": "Average age based on multiple sites or samples -- minimum",
          "examples": ["Criterion = minimum"]
        },
        "specimen_mad": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_mad"
          }],
          "unit": "Number in Degrees",
          "position": 10,
          "label": "Specimen MAD",
          "type": "Number",
          "description": "Maximum angle of deviation of the best fit direction or plane",
          "examples": ["Criterion = maximum"]
        },
        "sample_polarity": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_polarity"
          }],
          "unit": "Flag",
          "position": 37,
          "label": "Sample Magnetic Polarity",
          "type": "String",
          "description": "Polarity of sample",
          "examples": ["Polarity is normal (n)", "reversed (r)", "transitional (t)", "excursion (e) or intermediate (i)"]
        },
        "site_comp_nmb": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_comp_nmb"
          }],
          "unit": "Integer",
          "position": 60,
          "label": "Site Component Number",
          "type": "Integer",
          "description": "Magnetic component number"
        },
        "specimen_alpha95": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_alpha95"
          }],
          "unit": "Number in Degrees",
          "position": 11,
          "label": "Specimen Alpha 95%",
          "type": "Number",
          "description": "Fisher circle",
          "examples": ["Criterion = maximum; Confidence Level = 95%"]
        },
        "sample_comp_nmb": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_comp_nmb"
          }],
          "unit": "Integer",
          "position": 40,
          "label": "Sample Component Number",
          "type": "Integer",
          "description": "Magnetic component number"
        },
        "sample_int_rel_sigma": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_int_rel_sigma"
          }],
          "unit": "Dimensionless",
          "position": 51,
          "label": "Sample Paleo Intensity Relative Sigma",
          "type": "Number",
          "description": "Relative field strength -- uncertainty",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "site_nrm": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_nrm"
          }],
          "unit": "Flag",
          "position": 58,
          "label": "Site NRM",
          "type": "String",
          "description": "Origin of the NRM is primary (p) or secondary (s)"
        },
        "specimen_ptrm": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_ptrm"
          }],
          "unit": "Number in %",
          "position": 28,
          "label": "Specimen Maximum pTRM",
          "type": "Number",
          "description": "Classical pTRM check",
          "examples": ["Criterion = maximum"]
        },
        "site_int_sigma_perc": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_int_sigma_perc"
          }],
          "unit": "Number in %",
          "position": 70,
          "label": "Site Paleo Intensity Sigma %",
          "type": "Number",
          "description": "Average field strength -- uncertainty in percent",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "specimen_int_sigma": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_int_sigma"
          }],
          "unit": "Number in T",
          "position": 13,
          "label": "Specimen Paleo Intensity Sigma",
          "type": "Number",
          "description": "Average field strength -- uncertainty",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "specimen_dang": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_dang"
          }],
          "unit": "Number in Degrees",
          "position": 26,
          "label": "Specimen DANG",
          "type": "Number",
          "description": "Deviation angle of direction of component with respect to origin",
          "examples": ["Criterion = maximum"]
        },
        "specimen_b_beta": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_b_beta"
          }],
          "unit": "Dimensionless",
          "position": 24,
          "label": "Specimen Sigma over b",
          "type": "Number",
          "description": "COE's quality factors -- relative error over slope",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "sample_int_sigma_perc": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_int_sigma_perc"
          }],
          "unit": "Number in %",
          "position": 50,
          "label": "Sample Paleo Intensity Sigma %",
          "type": "Number",
          "description": "Average field strength -- uncertainty in percent",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "vgp_alpha95": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "vgp_alpha95"
          }],
          "unit": "Number in Degrees",
          "position": 95,
          "label": "VGP Alpha 95%",
          "type": "Number",
          "description": "Fisher circle",
          "examples": ["Criterion = maximum; Confidence Level = 95%"]
        },
        "site_polarity": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_polarity"
          }],
          "unit": "Flag",
          "position": 57,
          "label": "Site Magnetic Polarity",
          "type": "String",
          "description": "Polarity of site",
          "examples": ["Polarity is normal (n)", "reversed (r)", "transitional (t)", "excursion (e) or intermediate (i)"]
        },
        "specimen_n": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_n"
          }],
          "unit": "Integer",
          "position": 12,
          "label": "Specimen N",
          "type": "Integer",
          "description": "Number of measurements included in directional calculations",
          "examples": ["Criterion = minimum"]
        },
        "specimen_int_n": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_int_n"
          }],
          "unit": "Integer",
          "position": 18,
          "label": "Specimen Paleo Intensity N",
          "type": "Integer",
          "description": "Number of measurements included in intensity calculations",
          "examples": ["Criterion = minimum"]
        },
        "specimen_magn_weight": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_magn_mass"
          }],
          "unit": "Number in Am2/kg",
          "position": 35,
          "label": "Specimen NRM Magnetization Weight",
          "type": "Number",
          "description": "Measured intensity -- remanent magnetization that is weight normalized",
          "examples": ["Criterion = minimum"]
        },
        "sample_k": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_k"
          }],
          "unit": "Dimensionless",
          "position": 46,
          "label": "Sample K",
          "type": "Number",
          "description": "Fisher's dispersion parameter Kappa",
          "examples": ["Criterion = minimum"]
        },
        "sample_int_rel_sigma_perc": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_int_rel_sigma_perc"
          }],
          "unit": "Number in %",
          "position": 52,
          "label": "Sample Paleo Intensity Relative Sigma %",
          "type": "Number",
          "description": "Relative field strength -- uncertainty in percent",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "average_k": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "average_k"
          }],
          "unit": "Dimensionless",
          "position": 85,
          "label": "Average K",
          "type": "Number",
          "description": "Fisher's dispersion parameter Kappa",
          "examples": ["Criterion = minimum"]
        },
        "average_age_unit": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "average_age_unit"
          }],
          "unit": "Text",
          "position": 80,
          "label": "Average Age Unit",
          "type": "String",
          "description": "Average age based on multiple sites or samples -- age unit",
          "examples": ["Ma", "Ka", "Ga", "Years BP", "Years AD (+/-)", "Years Cal BP", "Years Cal AD (+/-)"]
        },
        "specimen_int_rel_sigma": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_int_rel_sigma"
          }],
          "unit": "Dimensionless",
          "position": 15,
          "label": "Specimen Paleo Intensity Relative Sigma",
          "type": "Number",
          "description": "Relative field strength -- uncertainty",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "sample_nrm": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_nrm"
          }],
          "unit": "Flag",
          "position": 38,
          "label": "Sample NRM",
          "type": "String",
          "description": "Origin of the NRM is primary (p) or secondary (s)"
        },
        "average_int_nn": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "average_int_nn"
          }],
          "unit": "Integer",
          "position": 91,
          "label": "Number of Samples",
          "type": "Integer",
          "description": "Number of samples included in intensity calculations"
        },
        "specimen_rsc": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_rsc"
          }],
          "unit": "Number in %",
          "position": 31,
          "label": "Specimen Maximum RSC",
          "type": "Number",
          "description": "Maximum relative susceptibility change",
          "examples": ["Criterion = maximum"]
        },
        "sample_n": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_n"
          }],
          "unit": "Integer",
          "position": 43,
          "label": "Sample N",
          "type": "Integer",
          "description": "Number of specimens included in directional calculations",
          "examples": ["Criterion = minimum"]
        },
        "sample_tilt_correction": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_tilt_correction"
          }],
          "unit": "Number in %",
          "position": 48,
          "label": "Sample Tilt Correction",
          "type": "Number",
          "description": "Percentage tilt correction applied to the data",
          "examples": ["Criterion = minimum"]
        },
        "specimen_polarity": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_polarity"
          }],
          "unit": "Flag",
          "position": 6,
          "label": "Specimen Magnetic Polarity",
          "type": "String",
          "description": "Polarity of specimen",
          "examples": ["Polarity is normal (n)", "reversed (r)", "transitional (t)", "excursion (e) or intermediate (i)"]
        },
        "site_int_rel_sigma_perc": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_int_rel_sigma_perc"
          }],
          "unit": "Number in %",
          "position": 72,
          "label": "Site Paleo Intensity Relative Sigma %",
          "type": "Number",
          "description": "Relative field strength -- uncertainty in percent",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "measurement_step_unit": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "measurement_step_unit"
          }],
          "unit": "Text",
          "position": 5,
          "label": "Measurement Step Unit",
          "type": "String",
          "description": "Step included in calculation -- unit"
        },
        "vdm_n": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "vdm_n"
          }],
          "unit": "Integer",
          "position": 98,
          "label": "VDM N",
          "type": "Integer",
          "description": "Number of data points included in VDM calculations",
          "examples": ["Criterion = minimum"]
        },
        "specimen_moment": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_magn_moment"
          }],
          "unit": "Number in Am2",
          "position": 33,
          "label": "Specimen NRM Moment",
          "type": "Number",
          "description": "Measured intensity -- remanent moment",
          "examples": ["Criterion = minimum"]
        },
        "site_n_planes": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_n_planes"
          }],
          "unit": "Integer",
          "position": 65,
          "label": "Site N Best-Fit Planes",
          "type": "Integer",
          "description": "Number of samples included based on best-fit planes",
          "examples": ["Criterion = minimum"]
        },
        "specimen_int_mad": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_int_mad"
          }],
          "unit": "Number in Degrees",
          "position": 17,
          "label": "Specimen Paleo Intensity MAD",
          "type": "Number",
          "description": "Maximum angle of deviation of the best fit line",
          "examples": ["Criterion = maximum"]
        },
        "site_alpha95": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_alpha95"
          }],
          "unit": "Number in Degrees",
          "position": 62,
          "label": "Site Alpha 95%",
          "type": "Number",
          "description": "Fisher circle",
          "examples": ["Criterion = maximum; Confidence Level = 95%"]
        },
        "sample_int_n": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_int_n"
          }],
          "unit": "Integer",
          "position": 53,
          "label": "Sample Paleo Intensity N",
          "type": "Integer",
          "description": "Number of specimens included in intensity calculations",
          "examples": ["Criterion = minimum"]
        },
        "sample_alpha95": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_alpha95"
          }],
          "unit": "Number in Degrees",
          "position": 42,
          "label": "Sample Alpha 95%",
          "type": "Number",
          "description": "Fisher circle",
          "examples": ["Criterion = maximum; Confidence Level = 95%"]
        },
        "specimen_direction_type": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_direction_type"
          }],
          "unit": "Flag",
          "position": 8,
          "label": "Specimen Direction Type",
          "type": "String",
          "description": "Direction determined from (l) or plane (p)"
        },
        "average_int_n": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "average_int_n"
          }],
          "unit": "Integer",
          "position": 90,
          "label": "Number of Sites",
          "type": "Integer",
          "description": "Number of sites included in intensity calculations"
        },
        "specimen_viscosity_index": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_viscosity_index"
          }],
          "unit": "Number in %",
          "position": 32,
          "label": "Specimen Viscosity Index",
          "type": "Number",
          "description": "Viscosity index",
          "examples": ["Criterion = maximum"]
        },
        "average_int_rel_sigma": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "average_int_rel_sigma"
          }],
          "unit": "Dimensionless",
          "position": 88,
          "label": "Average Intensity Relative Sigma",
          "type": "Number",
          "description": "Relative VGP field strength -- uncertainty",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "sample_direction_type": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_direction_type"
          }],
          "unit": "Flag",
          "position": 39,
          "label": "Sample Direction Type",
          "type": "String",
          "description": "Direction determined from (l) or plane (p)"
        },
        "specimen_w": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_w"
          }],
          "unit": "Dimensionless",
          "position": 19,
          "label": "Specimen Weighting Factor",
          "type": "Number",
          "description": "Weighting factor",
          "examples": ["Criterion = maximum"]
        },
        "specimen_nrm": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_nrm"
          }],
          "unit": "Flag",
          "position": 7,
          "label": "Specimen NRM",
          "type": "String",
          "description": "Origin of the NRM is primary (p) or secondary (s)"
        },
        "sample_n_planes": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_n_planes"
          }],
          "unit": "Integer",
          "position": 45,
          "label": "Sample N Best-Fit Planes",
          "type": "Integer",
          "description": "Number of specimens included based on best-fit planes",
          "examples": ["Criterion = minimum"]
        },
        "measurement_step_min": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "measurement_step_min"
          }],
          "unit": "Custom",
          "position": 3,
          "label": "Measurement Step Minimum",
          "type": "Number",
          "description": "Step included in calculation -- lower bound"
        },
        "specimen_drats": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_drats"
          }],
          "unit": "Number in %",
          "position": 30,
          "label": "Specimen Difference Ratio Sum",
          "type": "Number",
          "description": "Sum of difference in first and second pTRM measurements",
          "examples": ["Criterion = maximum"]
        },
        "er_citation_names": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "er_citation_names"
          }],
          "unit": "Text",
          "position": 102,
          "label": "Citation Names",
          "type": "List",
          "description": "Colon-delimited list of citations",
          "examples": ["Smith et al. 2003", "Hart & Heard 1967", "This study"]
        },
        "vgp_dp": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "vgp_dp"
          }],
          "unit": "Number in Degrees",
          "position": 92,
          "label": "VGP DP",
          "type": "Number",
          "description": "Parallel latitude -- uncertainty",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "specimen_fvds": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_fvds"
          }],
          "unit": "Dimensionless",
          "position": 22,
          "label": "Specimen f VDS",
          "type": "Number",
          "description": "COE's quality factors -- vector difference sum of NRM components",
          "examples": ["Criterion = minimum"]
        },
        "sample_n_lines": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_n_lines"
          }],
          "unit": "Integer",
          "position": 44,
          "label": "Sample N Best-Fit Lines",
          "type": "Integer",
          "description": "Number of specimens included based on best-fit lines",
          "examples": ["Criterion = minimum"]
        },
        "specimen_comp_nmb": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_comp_nmb"
          }],
          "unit": "Integer",
          "position": 9,
          "label": "Specimen Component Number",
          "type": "Integer",
          "description": "Magnetic component number"
        },
        "site_moment": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_magn_moment"
          }],
          "unit": "Number in Am2",
          "position": 74,
          "label": "Site NRM Moment",
          "type": "Number",
          "description": "Measured intensity -- remanent moment",
          "examples": ["Criterion = minimum"]
        },
        "vgp_sigma": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "vgp_sigma"
          }],
          "unit": "Number in Degrees",
          "position": 94,
          "label": "VGP Sigma",
          "type": "Number",
          "description": "Virtual geomagnetic pole -- Standard deviation",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "vgp_n": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "vgp_n"
          }],
          "unit": "Integer",
          "position": 96,
          "label": "VGP N",
          "type": "Integer",
          "description": "Number of data points included in VGP calculations",
          "examples": ["Criterion = minimum"]
        },
        "pmag_criteria_code": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "pmag_criteria_code"
          }],
          "unit": "Text",
          "position": 0,
          "label": "Criteria Code",
          "type": "String",
          "description": "Criteria type name or number",
          "examples": ["MY-MAD", "MY-APLHA95"]
        },
        "average_n": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "average_n"
          }],
          "unit": "Integer",
          "position": 83,
          "label": "Average N Sites",
          "type": "Integer",
          "description": "Number of sites included in directional calculations",
          "examples": ["Criterion = minimum"]
        },
        "criteria_description": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "criteria_description"
          }],
          "unit": "Text",
          "position": 101,
          "label": "Criteria Description",
          "type": "String",
          "description": "Detailed description"
        },
        "sample_magn_weight": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_magn_mass"
          }],
          "unit": "Number in Am2/kg",
          "position": 56,
          "label": "Sample NRM Magnetization Weight",
          "type": "Number",
          "description": "Measured intensity -- remanent magnetization that is weight normalized",
          "examples": ["Criterion = minimum"]
        },
        "site_magn_weight": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_magn_mass"
          }],
          "unit": "Number in Am2/kg",
          "position": 76,
          "label": "Site NRM Magnetization Weight",
          "type": "Number",
          "description": "Measured intensity -- remanent magnetization that is weight normalized",
          "examples": ["Criterion = minimum"]
        },
        "sample_moment": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_magn_moment"
          }],
          "unit": "Number in Am2",
          "position": 54,
          "label": "Sample NRM Moment",
          "type": "Number",
          "description": "Measured intensity -- remanent moment",
          "examples": ["Criterion = minimum"]
        },
        "measurement_step_max": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "measurement_step_max"
          }],
          "unit": "Custom",
          "position": 4,
          "label": "Measurement Step Maximum",
          "type": "Number",
          "description": "Step included in calculation -- higher bound"
        },
        "specimen_magn_volume": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_magn_volume"
          }],
          "unit": "Number in A/m",
          "position": 34,
          "label": "Specimen NRM Magnetization Volume",
          "type": "Number",
          "description": "Measured intensity -- remanent magnetization that is volume normalized",
          "examples": ["Criterion = minimum"]
        },
        "vadm_n": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "vadm_n"
          }],
          "unit": "Integer",
          "position": 100,
          "label": "VADM N",
          "type": "Integer",
          "description": "Number of data points included in VADM calculations",
          "examples": ["Criterion = minimum"]
        },
        "site_magn_volume": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_magn_volume"
          }],
          "unit": "Number in A/m",
          "position": 75,
          "label": "Site NRM Magnetization",
          "type": "Number",
          "description": "Measured intensity -- remanent magnetization that is volume normalized",
          "examples": ["Criterion = minimum"]
        },
        "specimen_int_ptrm_n": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "specimen_int_ptrm_n"
          }],
          "unit": "Dimensionless",
          "position": 36,
          "label": "Specimen Number pTRM Checks",
          "type": "Number",
          "description": "Number of pTRM checks used in experiment",
          "examples": ["Criterion = minimum"]
        },
        "criteria_definition": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "criteria_definition"
          }],
          "unit": "Text",
          "position": 1,
          "label": "Criteria Definition",
          "type": "String",
          "description": "Definition of the criteria"
        },
        "site_k": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_k"
          }],
          "unit": "Dimensionless",
          "position": 66,
          "label": "Site K",
          "type": "Number",
          "description": "Fisher's dispersion parameter Kappa",
          "examples": ["Criterion = minimum"]
        },
        "site_tilt_correction": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_tilt_correction"
          }],
          "unit": "Number in %",
          "position": 68,
          "label": "Site Tilt Correction",
          "type": "Number",
          "description": "Percentage tilt correction applied to the data",
          "examples": ["Criterion = minimum"]
        },
        "vgp_dm": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "vgp_dm"
          }],
          "unit": "Number in Degrees",
          "position": 93,
          "label": "VGP DM",
          "type": "Number",
          "description": "Meridian -- uncertainty",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "site_n_lines": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_n_lines"
          }],
          "unit": "Integer",
          "position": 64,
          "label": "Site N Best-Fit Lines",
          "type": "Integer",
          "description": "Number of samples included based on best-fit lines",
          "examples": ["Criterion = minimum"]
        },
        "site_int_rel_sigma": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "site_int_rel_sigma"
          }],
          "unit": "Dimensionless",
          "position": 71,
          "label": "Site Paleo Intensity Relative Sigma",
          "type": "Number",
          "description": "Relative field strength -- uncertainty",
          "examples": ["Criterion = maximum; Uncertainty = 1xSD"]
        },
        "sample_r": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "sample_r"
          }],
          "unit": "Dimensionless",
          "position": 47,
          "label": "Sample R",
          "type": "Number",
          "description": "Resultant Fisher vector",
          "examples": ["Criterion = minimum"]
        },
        "average_r": {
          "group": "Selection Criteria",
          "next_columns": [{
            "table": "pmag_criteria",
            "column": "average_r"
          }],
          "unit": "Dimensionless",
          "position": 86,
          "label": "Average R",
          "type": "Number",
          "description": "Resultant Fisher vector",
          "examples": ["Criterion = minimum"]
        }
      },
      "label": "Selection Criteria",
      "description": "Selection criteria used in data selection"
    }
  }
};
