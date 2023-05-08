/* Instructions for updating:

    1) Go to https://docs.google.com/spreadsheets/d/1ldYzO6WMyxfVT6gv3imKaZIVqvp97uPmWijT_ElpZnY and 
       copy the JSON cells (column S row 2 to the last entry in column U).
    2) Go to https://jsonlint.com/, paste the JSON into the text area, click "Validate JSON", and 
       copy the formatted JSON.
    3) Replace the JSON starting after "'tables': " roughly on line 426 and before the "};" at the end.
    4) Update the 'updated_day' field at the beginning.

*/

export const model = {
	'updated_day': '2023:05:08',
	'published_day': '2017:09:29',
	'data_model_version': '3.0',
	'criteria_map': {
		'site_polarity': {
			'table_column': 'site.dir_polarity',
			'criterion_operation': '='
		},
		'specimen_b_beta': {
			'table_column': 'specimens.int_b_beta',
			'criterion_operation': '<='
		},
		'specimen_int_ptrm_n': {
			'table_column': 'specimens.int_n_ptrm',
			'criterion_operation': '>='
		},
		'specimen_int_mad': {
			'table_column': 'specimens.int_mad_free',
			'criterion_operation': '<='
		},
		'specimen_dang': {
			'table_column': 'specimens.int_dang',
			'criterion_operation': '<='
		},
		'specimen_drats': {
			'table_column': 'specimens.int_drats',
			'criterion_operation': '<='
		},
		'specimen_fvds': {
			'table_column': 'specimens.int_fvds',
			'criterion_operation': '>='
		},
		'site_int_sigma_perc': {
			'table_column': 'sites.int_abs_sigma_perc',
			'criterion_operation': '<='
		},
		'specimen_md': {
			'table_column': 'specimens.int_maxdev',
			'criterion_operation': '<='
		},
		'specimen_q': {
			'table_column': 'specimens.int_q',
			'criterion_operation': '>='
		},
		'site_int_sigma': {
			'table_column': 'sites.int_abs_sigma',
			'criterion_operation': '<='
		},
		'site_int_n': {
			'table_column': 'sites.int_n_samples',
			'criterion_operation': '>='
		},
		'specimen_mad': {
			'table_column': 'specimens.dir_mad_free',
			'criterion_operation': '<='
		},
		'specimen_n': {
			'table_column': 'specimens.dir_n_measurements',
			'criterion_operation': '>='
		},
		'sample_alpha95': {
			'table_column': 'samples.dir_alpha95',
			'criterion_operation': '<='
		},
		'site_alpha95': {
			'table_column': 'sites.dir_alpha95',
			'criterion_operation': '<='
		},
		'site_k': {
			'table_column': 'sites.dir_k',
			'criterion_operation': '>='
		},
		'site_n': {
			'table_column': 'sites.dir_n_samples',
			'criterion_operation': '>='
		},
		'site_n_lines': {
			'table_column': 'sites.dir_n_specimens_lines',
			'criterion_operation': '>='
		},
		'sample_int_n': {
			'table_column': 'samples.int_n_specimens',
			'criterion_operation': '>='
		},
		'sample_int_sigma': {
			'table_column': 'samples.int_abs_sigma',
			'criterion_operation': '<='
		},
		'sample_int_sigma_perc': {
			'table_column': 'samples.int_abs_sigma_perc',
			'criterion_operation': '<='
		},
		'specimen_alpha95': {
			'table_column': 'specimens.dir_alpha95',
			'criterion_operation': '<='
		},
		'magic_experiment_names': {
			'table_column': 'measurements.experiment',
			'criterion_operation': 'contains'
		},
		'measurement_step_max': {
			'table_column': 'specimens.meas_step_max',
			'criterion_operation': '<='
		},
		'specimen_int_n': {
			'table_column': 'specimens.int_n_measurements',
			'criterion_operation': '>='
		},
		'specimen_int_dang': {
			'table_column': 'specimens.int_dang',
			'criterion_operation': '<='
		},
		'anisotropy_alt': {
			'table_column': 'specimens.aniso_alt',
			'criterion_operation': '<='
		},
		'measurement_step_min': {
			'table_column': 'specimens.meas_step_min',
			'criterion_operation': '>='
		},
		'measurement_step_unit': {
			'table_column': 'specimens.meas_step_unit',
			'criterion_operation': '='
		},
		'sample_aniso_mean': {
			'table_column': 'samples.int_corr_aniso_mean',
			'criterion_operation': '<='
		},
		'sample_comp_nmb': {
			'table_column': 'samples.dir_comp_name',
			'criterion_operation': 'contains'
		},
		'sample_int_rel_sigma': {
			'table_column': 'samples.int_rel_sigma',
			'criterion_operation': '<='
		},
		'sample_int_rel_sigma_perc': {
			'table_column': 'samples.int_rel_sigma_perc',
			'criterion_operation': '<='
		},
		'sample_k': {
			'table_column': 'samples.dir_k',
			'criterion_operation': '>='
		},
		'sample_magn_mass': {
			'table_column': 'samples.magn_mass',
			'criterion_operation': '>='
		},
		'sample_magn_volume': {
			'table_column': 'samples.magn_volume',
			'criterion_operation': '>='
		},
		'sample_n': {
			'table_column': 'samples.dir_n_samples',
			'criterion_operation': '>='
		},
		'sample_n_lines': {
			'table_column': 'samples.dir_n_specimens_lines',
			'criterion_operation': '>='
		},
		'sample_n_planes': {
			'table_column': 'samples.dir_n_specimens_planes',
			'criterion_operation': '>='
		},
		'sample_nrm': {
			'table_column': 'site.dir_nrm_origin',
			'criterion_operation': '='
		},
		'sample_polarity': {
			'table_column': 'site.dir_polarity',
			'criterion_operation': '='
		},
		'sample_r': {
			'table_column': 'samples.dir_r',
			'criterion_operation': '>='
		},
		'sample_tilt_correction': {
			'table_column': 'samples.dir_tilt_correction',
			'criterion_operation': '>='
		},
		'site_comp_nmb': {
			'table_column': 'sites.dir_comp_name',
			'criterion_operation': 'contains'
		},
		'site_int_rel_sigma': {
			'table_column': 'sites.int_rel_sigma',
			'criterion_operation': '<='
		},
		'site_int_rel_sigma_perc': {
			'table_column': 'sites.int_rel_sigma_perc',
			'criterion_operation': '<='
		},
		'site_magn_mass': {
			'table_column': 'sites.magn_mass',
			'criterion_operation': '>='
		},
		'site_magn_volume': {
			'table_column': 'sites.magn_volume',
			'criterion_operation': '>='
		},
		'site_n_planes': {
			'table_column': 'sites.dir_n_specimens_planes',
			'criterion_operation': '>='
		},
		'site_nrm': {
			'table_column': 'site.dir_nrm_origin',
			'criterion_operation': '='
		},
		'site_r': {
			'table_column': 'sites.dir_r',
			'criterion_operation': '>='
		},
		'site_tilt_correction': {
			'table_column': 'sites.dir_tilt_correction',
			'criterion_operation': '>='
		},
		'specimen_ac_n': {
			'table_column': 'specimens.int_n_ac',
			'criterion_operation': '>='
		},
		'specimen_alpha': {
			'table_column': 'specimens.dir_alpha',
			'criterion_operation': '<='
		},
		'specimen_alpha_prime': {
			'table_column': 'specimens.int_alpha_prime',
			'criterion_operation': '<='
		},
		'specimen_aniso_ftest_flag': {
			'table_column': 'specimens.aniso_ftest_quality',
			'criterion_operation': '='
		},
		'specimen_b_sigma': {
			'table_column': 'specimens.int_b_sigma',
			'criterion_operation': '<='
		},
		'specimen_cdrat': {
			'table_column': 'specimens.int_cdrat',
			'criterion_operation': '<='
		},
		'specimen_coeff_det_sq': {
			'table_column': 'specimens.int_r2_det',
			'criterion_operation': '<='
		},
		'specimen_comp_nmb': {
			'table_column': 'specimens.dir_comp',
			'criterion_operation': 'contains'
		},
		'specimen_dac': {
			'table_column': 'specimens.int_dac',
			'criterion_operation': '<='
		},
		'specimen_dck': {
			'table_column': 'specimens.int_dck',
			'criterion_operation': '<='
		},
		'specimen_delta': {
			'table_column': 'specimens.int_delta',
			'criterion_operation': '<='
		},
		'specimen_dpal': {
			'table_column': 'specimens.int_dpal',
			'criterion_operation': '<='
		},
		'specimen_drat': {
			'table_column': 'specimens.int_drat',
			'criterion_operation': '<='
		},
		'specimen_dt': {
			'table_column': 'specimens.int_dt',
			'criterion_operation': '<='
		},
		'specimen_dtr': {
			'table_column': 'specimens.int_dtr',
			'criterion_operation': '<='
		},
		'specimen_f': {
			'table_column': 'specimens.int_f',
			'criterion_operation': '>='
		},
		'specimen_frac': {
			'table_column': 'specimens.int_frac',
			'criterion_operation': '>='
		},
		'specimen_g': {
			'table_column': 'specimens.int_g',
			'criterion_operation': '>='
		},
		'specimen_gamma': {
			'table_column': 'specimens.int_gamma',
			'criterion_operation': '<='
		},
		'specimen_gmax': {
			'table_column': 'specimens.int_gmax',
			'criterion_operation': '<='
		},
		'specimen_int_alpha': {
			'table_column': 'specimens.int_alpha',
			'criterion_operation': '<='
		},
		'specimen_int_crm': {
			'table_column': 'specimens.int_crm',
			'criterion_operation': '<='
		},
		'specimen_int_mad_anc': {
			'table_column': 'specimens.int_mad_anc',
			'criterion_operation': '>='
		},
		'specimen_int_ptrm_tail_n': {
			'table_column': 'specimens.int_n_ptrm_tail',
			'criterion_operation': '>='
		},
		'specimen_int_rel_sigma': {
			'table_column': 'specimens.int_rel_sigma',
			'criterion_operation': '<='
		},
		'specimen_int_rel_sigma_perc': {
			'table_column': 'specimens.int_rel_sigma_perc',
			'criterion_operation': '<='
		},
		'specimen_int_sigma': {
			'table_column': 'specimens.int_abs_sigma',
			'criterion_operation': '<='
		},
		'specimen_int_sigma_perc': {
			'table_column': 'specimens.int_abs_sigma_perc',
			'criterion_operation': '<='
		},
		'specimen_k': {
			'table_column': 'specimens.int_k',
			'criterion_operation': '<='
		},
		'specimen_k_sse': {
			'table_column': 'specimens.int_k_sse',
			'criterion_operation': '<='
		},
		'specimen_mad_anc': {
			'table_column': 'specimens.dir_mad_anc',
			'criterion_operation': '<='
		},
		'specimen_magn_mass': {
			'table_column': 'specimens.magn_mass',
			'criterion_operation': '>='
		},
		'specimen_magn_moment': {
			'table_column': 'specimens.magn_moment',
			'criterion_operation': '>='
		},
		'specimen_magn_volume': {
			'table_column': 'specimens.magn_volume',
			'criterion_operation': '>='
		},
		'specimen_maxdev': {
			'table_column': 'specimens.int_maxdev',
			'criterion_operation': '<='
		},
		'specimen_mdev': {
			'table_column': 'specimens.int_mdev',
			'criterion_operation': '<='
		},
		'specimen_mdrat': {
			'table_column': 'specimens.int_mdrat',
			'criterion_operation': '<='
		},
		'specimen_nrm': {
			'table_column': 'specimens.dir_nrm_origin',
			'criterion_operation': '='
		},
		'specimen_polarity': {
			'table_column': 'specimens.dir_polarity',
			'criterion_operation': '='
		},
		'specimen_ptrm': {
			'table_column': 'specimens.int_ptrm',
			'criterion_operation': '<='
		},
		'specimen_r_sq': {
			'table_column': 'specimens.int_r2_corr',
			'criterion_operation': '>='
		},
		'specimen_rsc': {
			'table_column': 'specimens.int_rsc',
			'criterion_operation': '<='
		},
		'specimen_scat': {
			'table_column': 'specimens.int_scat',
			'criterion_operation': '='
		},
		'specimen_tail_drat': {
			'table_column': 'specimens.int_drat_tail',
			'criterion_operation': '<='
		},
		'specimen_theta': {
			'table_column': 'specimens.int_theta',
			'criterion_operation': '<='
		},
		'specimen_viscosity_index': {
			'table_column': 'specimens.int_viscosity_index',
			'criterion_operation': '<='
		},
		'specimen_w': {
			'table_column': 'specimens.int_w',
			'criterion_operation': '<='
		},
		'specimen_z': {
			'table_column': 'specimens.int_z',
			'criterion_operation': '<='
		},
		'specimen_z_md': {
			'table_column': 'specimens.int_z_md',
			'criterion_operation': '<='
		}
	},
	'tables': {
	'contribution': {
		'label': 'Contribution',
		'position': 1,
		'description': 'Contribution metadata',
		'notes': 'Internal use. Used for batch uploads and data added by contributors before activation',
		'columns': {
			'id': {
				'label': 'Contribution ID',
				'group': 'Contribution',
				'position': 1,
				'type': 'Integer',
				'description': 'Unique MagIC contribution ID',
				'examples': ['5412'],
				'validations': ['downloadOnly()'],
				'previous_columns': [{
					'table': 'contribution',
					'column': 'id'
				}]
			},
			'version': {
				'label': 'Version',
				'group': 'Contribution',
				'position': 2,
				'type': 'Integer',
				'description': 'Contribution version number',
				'notes': '1 for original contribution, 6 for latest contribution if there are 6 versions, empty if the contribution is not activated, written during contribution activation',
				'validations': ['downloadOnly()'],
				'previous_columns': [{
					'table': 'contribution',
					'column': 'version'
				}]
			},
			'timestamp': {
				'label': 'Activation Timestamp',
				'group': 'Contribution',
				'position': 3,
				'type': 'Timestamp',
				'description': 'Date and time of contribution activation',
				'notes': 'ISO 8601 date and time (e.g. "yyyy-mm-ddThh:mm:ss.sssZ"), written during contribution activation',
				'examples': ['2017', '2014-04-21', '1970-01-01T00:00:00', '1969-07-20T22:56:15-04:00'],
				'validations': ['downloadOnly()'],
				'previous_columns': [{
					'table': 'contribution',
					'column': 'timestamp'
				}]
			},
			'contributor': {
				'label': 'Contributor',
				'group': 'Contribution',
				'position': 4,
				'type': 'String',
				'description': 'Contributor EarthRef handle',
				'examples': ['@njarboe'],
				'validations': ['downloadOnly()'],
				'previous_columns': [{
					'table': 'contribution',
					'column': 'contributor'
				}]
			},
			'is_validated': {
				'label': 'Is Validated',
				'group': 'Contribution',
				'position': 5,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Contribution has passed the MagIC Data Model validation',
				'validations': ['cv("boolean")', 'downloadOnly()']
			},
			'is_reviewed': {
				'label': 'Is Reviewed',
				'group': 'Contribution',
				'position': 6,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Contribution has been reviewed for correct usage of the MagIC Data Model',
				'validations': ['cv("boolean")', 'downloadOnly()']
			},
			'data_model_version': {
				'label': 'Data Model Version',
				'group': 'Contribution',
				'position': 7,
				'type': 'String',
				'description': 'MagIC data model version',
				'examples': ['2.5', '3.0'],
				'validations': ['cv("magic_version")', 'downloadOnly()'],
				'previous_columns': [{
					'table': 'contribution',
					'column': 'magic_version'
				}]
			},
			'reference': {
				'label': 'Contribution Reference',
				'group': 'Contribution',
				'position': 8,
				'type': 'String',
				'description': 'The DOI or URL for the document describing this study',
				'notes': 'The DOI must resolve to a publisher or the URL to a web page',
				'examples': ['10.1029/92JB01202', '10.1023/A:1015035228810', 'https://my-university.edu/my_phd_thesis.pdf'],
				'validations': ['type("references")', 'required()'],
				'previous_columns': [{
					'table': 'contribution',
					'column': 'reference'
				}]
			},
			'author': {
				'label': 'Original Author',
				'group': 'Contribution',
				'position': 9,
				'type': 'String',
				'description': 'Original author EarthRef handle or name and email or ORCID',
				'examples': ['@cconstable', 'Not A. Member <no.earthref.handle@gmail.com>', '0000-0002-9000-2100'],
				'validations': ['type("users")'],
				'previous_columns': [{
					'table': 'contribution',
					'column': 'author'
				}]
			},
			'funding': {
				'label': 'Funding',
				'group': 'Contribution',
				'position': 10,
				'type': 'Dictionary',
				'description': 'Dictionary of grant titles and grant urls that supported the creation of the dataset',
				'examples': ['Collaborative Research: EarthCube Capabilities: Repurposing FAIR-Compliant Earth Science Data Repositories[https://www.nsf.gov/awardsearch/showAward?AWD_ID=2126427]:Collaborative Research: EarthCube Capabilities: Repurposing FAIR-Compliant Earth Science Data Repositories[https://www.nsf.gov/awardsearch/simpleSearchResult?queryText=2126298]', 'NASA Discovery Program (contract NNM16AA09C)[https://govtribe.com/award/federal-contract-award/definitive-contract-nnm16aa09c]']
			},
			'lab_names': {
				'label': 'Laboratory Names',
				'group': 'Contribution',
				'position': 11,
				'type': 'List',
				'description': 'List of labs (with institution and country) where the measurements in the contribution were made',
				'notes': 'European Labs use names from EPOS MLS',
				'examples': ['Paleomagnetic Laboratory Fort Hoofddijk (Utrecht University, The Netherlands)', 'Paleomagnetic Laboratory (INGV,  Italy)'],
				'validations': ['cv("lab_names")', 'required()']
			},
			'supplemental_links': {
				'label': 'Supplemental Data Links',
				'group': 'Contribution',
				'position': 12,
				'type': 'Dictionary',
				'description': 'Display name for the link and the permanent URL to the supplemental data',
				'examples': ['Geomagnetic Field Model[https://earthref.org/ERDA/1137/]', 'Geochemistry Data[https://earthref.org/ERDA/192/]:PADM2M Field Model[https://earthref.org/ERDA/1138/]']
			},
			'description': {
				'label': 'Description',
				'group': 'Contribution',
				'position': 13,
				'type': 'String',
				'description': 'Contribution description and update comments',
				'examples': ['Fixes errors in latitudes and adds measurement data'],
				'validations': ['recommended()'],
				'previous_columns': [{
					'table': 'contribution',
					'column': 'description'
				}]
			}
		}
	}

	,
	'locations': {
		'label': 'Locations',
		'position': 2,
		'description': 'Groups of sites',
		'notes': 'Poles, Grand means',
		'columns': {
			'contribution_id': {
				'label': 'Contribution ID',
				'group': 'Contribution',
				'position': 1,
				'type': 'Integer',
				'description': 'Unique MagIC contribution ID',
				'examples': ['5412'],
				'validations': ['downloadOnly()']
			},
			'row_id': {
				'label': 'Contribution Row ID',
				'group': 'Contribution',
				'position': 2,
				'type': 'Integer',
				'description': 'Unique row ID within a MagIC Contribution',
				'examples': ['743'],
				'validations': ['downloadOnly()']
			},
			'location': {
				'label': 'Location Name',
				'group': 'Names',
				'position': 3,
				'type': 'String',
				'description': 'Name for location, dredge or drill site',
				'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801'],
				'validations': ['key()', 'required()'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'er_location_name'
				}, {
					'table': 'pmag_results',
					'column': 'er_location_names'
				}]
			},
			'sites': {
				'label': 'Site Names',
				'group': 'Names',
				'position': 4,
				'type': 'List',
				'description': 'Colon-delimited list of the names of sites included in the result',
				'examples': ['SFVP01:SFVP02'],
				'validations': ['in("sites.site")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'er_site_names'
				}]
			},
			'samples': {
				'label': 'Sample Names',
				'group': 'Names',
				'position': 5,
				'type': 'List',
				'description': 'Colon-delimited list of the names of samples included in the result',
				'examples': ['SFVP01-01:SFVP01-02:SFVP02-01'],
				'validations': ['in("samples.sample")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'er_sample_names'
				}]
			},
			'specimens': {
				'label': 'Specimen Names',
				'group': 'Names',
				'position': 6,
				'type': 'List',
				'description': 'Colon-delimited list of the names of specimens included in the result',
				'examples': ['SFVP01-01a:SFVP01-01b:SFVP02-01a'],
				'validations': ['in("specimens.specimen")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'er_specimen_names'
				}, {
					'table': 'pmag_results',
					'column': 'er_synthetic_names'
				}]
			},
			'experiments': {
				'label': 'Experiment Names',
				'group': 'Names',
				'position': 7,
				'type': 'List',
				'description': 'Colon-delimited list of the names of experiments included in the result',
				'examples': ['SFVP01-01a-LT-AF-Z:SFVP01-01b-LT-T-Z:SFVP02-01a-LT-AF-Z'],
				'validations': ['in("measurements.experiment")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'magic_experiment_names'
				}]
			},
			'location_type': {
				'label': 'Location Type',
				'group': 'Location',
				'position': 8,
				'type': 'String',
				'description': 'Location type',
				'examples': ['Region', 'Outcrop', 'Stratigraphic Section', 'Drill Site'],
				'validations': ['cv("location_type")', 'required()'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'location_type'
				}]
			},
			'location_alternatives': {
				'label': 'Location Name Alternatives',
				'group': 'Location',
				'position': 9,
				'type': 'List',
				'description': 'Colon-delimited list of alternative names and abbreviations',
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'er_location_alternatives'
				}]
			},
			'result_name': {
				'label': 'Result Name',
				'group': 'Result',
				'position': 10,
				'type': 'String',
				'description': 'Name for result or name assigned to paleomagnetic pole',
				'examples': ['Franklin LIP Grand Mean', 'PADM All', '140-E'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'pmag_result_name'
				}]
			},
			'result_type': {
				'label': 'Result Type',
				'group': 'Result',
				'position': 11,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Averaged (a), or model derived (m) data. (i) and (s) types have been depricated for locations',
				'validations': ['cv("data_type")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'data_type'
				}]
			},
			'result_quality': {
				'label': 'Result Quality',
				'group': 'Result',
				'position': 12,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Indicating if good (g) or bad (b) data',
				'notes': 'Can be left empty. This is the case for many legacy data sets.',
				'validations': ['cv("data_quality")', 'recommended()']
			},
			'method_codes': {
				'label': 'Method Codes',
				'group': 'Result',
				'position': 13,
				'type': 'List',
				'description': 'Colon-delimited list of method codes',
				'validations': ['type("method_codes")', 'requiredUnlessTable("sites")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'magic_method_codes'
				}]
			},
			'display_order': {
				'label': 'Display Order',
				'group': 'Result',
				'position': 14,
				'type': 'Number',
				'description': 'Order of the rows for display purposes. If not set at upload will be set to the order in the uploaded file. Can be a float of either sign.',
				'examples': ['1', '0', '1.2', '-4.34']
			},
			'citations': {
				'label': 'Citation DOIs',
				'group': 'Result',
				'position': 15,
				'type': 'List',
				'description': 'Colon-delimited list of citation DOIs',
				'examples': ['10.1029/92JB01202', '10.1029/2003GC000635:This study', '"10.1023/A:1015035228810":This study'],
				'validations': ['type("references")', 'requiredUnlessTable("sites")'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'er_citation_names'
				}, {
					'table': 'pmag_results',
					'column': 'er_citation_names'
				}, {
					'table': 'er_expeditions',
					'column': 'er_citation_names'
				}, {
					'table': 'pmag_rotations',
					'column': 'er_citation_names'
				}]
			},
			'expedition_name': {
				'label': 'Expedition Name',
				'group': 'Expedition',
				'position': 16,
				'type': 'String',
				'description': 'Name for seagoing or land expedition',
				'examples': ['AVON02MV'],
				'previous_columns': [{
					'table': 'er_expeditions',
					'column': 'er_expedition_name'
				}]
			},
			'expedition_ship': {
				'label': 'Expedition Ship Name',
				'group': 'Expedition',
				'position': 17,
				'type': 'String',
				'description': 'Expedition research vessel name',
				'examples': ['R/V Melville'],
				'previous_columns': [{
					'table': 'er_expeditions',
					'column': 'expedition_ship'
				}]
			},
			'expedition_leg': {
				'label': 'Expedition Leg Name',
				'group': 'Expedition',
				'position': 18,
				'type': 'String',
				'description': 'Leg number of a seagoing expedition ',
				'examples': ['Leg 2'],
				'previous_columns': [{
					'table': 'er_expeditions',
					'column': 'expedition_leg'
				}]
			},
			'expedition_url': {
				'label': 'Expedition URL',
				'group': 'Expedition',
				'position': 19,
				'type': 'String',
				'description': 'Website URL for the expedition',
				'examples': ['http://earthref.org'],
				'validations': ['type("url")'],
				'previous_columns': [{
					'table': 'er_expeditions',
					'column': 'expedition_url'
				}, {
					'table': 'er_locations',
					'column': 'location_url'
				}]
			},
			'expedition_description': {
				'label': 'Expedition Description',
				'group': 'Expedition',
				'position': 20,
				'type': 'String',
				'description': 'Description of the expedition',
				'previous_columns': [{
					'table': 'er_expeditions',
					'column': 'expedition_description'
				}, {
					'table': 'er_expeditions',
					'column': 'er_expedition_alternatives'
				}]
			},
			'geologic_classes': {
				'label': 'Geologic Setting',
				'group': 'Geology',
				'position': 21,
				'type': 'List',
				'description': 'Colon-delimited list of geologic setting',
				'validations': ['cv("class")', 'required()'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'location_class'
				}]
			},
			'lithologies': {
				'label': 'Lithologies',
				'group': 'Geology',
				'position': 22,
				'type': 'List',
				'description': 'Colon-delimited list of lithologies or archeological classifications',
				'validations': ['cv("lithology")', 'required()'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'location_lithology'
				}]
			},
			'plate_blocks': {
				'label': 'Plate or Block Name',
				'group': 'Geology',
				'position': 23,
				'type': 'List',
				'description': 'Colon-delimited list of plates or tectonic block names',
				'validations': ['cv("plate_block")'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'plate_block'
				}]
			},
			'terranes': {
				'label': 'Terrane Name',
				'group': 'Geology',
				'position': 24,
				'type': 'List',
				'description': 'Colon-delimited list of terrane names',
				'validations': ['sv("terrane")'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'terrane'
				}]
			},
			'geological_province_sections': {
				'label': 'Geological Province or Section Name',
				'group': 'Geology',
				'position': 25,
				'type': 'List',
				'description': 'Colon-delimited list of geological provinces or section names',
				'validations': ['sv("geological_province_section")'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'geological_province_section'
				}]
			},
			'tectonic_settings': {
				'label': 'Tectonic Setting',
				'group': 'Geology',
				'position': 26,
				'type': 'List',
				'description': 'Colon-delimited list of tectonic settings',
				'validations': ['cv("tectonic_setting")'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'tectonic_setting'
				}]
			},
			'members': {
				'label': 'Member Names',
				'group': 'Geology',
				'position': 27,
				'type': 'List',
				'description': 'Colon-delimited list of formation names',
				'examples': ['Glasshound Member']
			},
			'formations': {
				'label': 'Formation Names',
				'group': 'Geology',
				'position': 28,
				'type': 'List',
				'description': 'Colon-delimited list of member names',
				'examples': ['Bluebird Formation']
			},
			'lat_s': {
				'label': 'Southernmost Latitude',
				'group': 'Geography',
				'position': 29,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Southernmost latitude of the collection of sites',
				'validations': ['min(-90)', 'max(90)', 'max("lat_n")', 'required()'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'location_begin_lat'
				}, {
					'table': 'er_locations',
					'column': 'location_end_lat'
				}]
			},
			'lat_n': {
				'label': 'Northernmost Latitude',
				'group': 'Geography',
				'position': 30,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Northernmost latitude of the collection of sites',
				'validations': ['min(-90)', 'max(90)', 'min("lat_s")', 'required()'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'location_begin_lat'
				}, {
					'table': 'er_locations',
					'column': 'location_end_lat'
				}]
			},
			'lon_w': {
				'label': 'Westernmost Longitude',
				'group': 'Geography',
				'position': 31,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Westernmost longitude of the collection of sites',
				'validations': ['min(0)', 'max(360)', 'required()'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'location_begin_lon'
				}, {
					'table': 'er_locations',
					'column': 'location_end_lon'
				}]
			},
			'lon_e': {
				'label': 'Easternmost Longitude',
				'group': 'Geography',
				'position': 32,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Easternmost longitude of the collection of sites',
				'validations': ['min(0)', 'max(360)', 'required()'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'location_begin_lon'
				}, {
					'table': 'er_locations',
					'column': 'location_end_lon'
				}]
			},
			'lat_lon_precision': {
				'label': 'Geographic Precision',
				'group': 'Geography',
				'position': 33,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Precision in latitude and longitude',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'location_precision'
				}]
			},
			'elevation_low': {
				'label': 'Elevation Low',
				'group': 'Geography',
				'position': 34,
				'type': 'Number',
				'unit': 'm',
				'description': 'Lowest elevation of the collection of sites',
				'notes': 'Meters above sealevel',
				'validations': ['max("elevation_high")'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'location_begin_elevation'
				}]
			},
			'elevation_high': {
				'label': 'Elevation High',
				'group': 'Geography',
				'position': 35,
				'type': 'Number',
				'unit': 'm',
				'description': 'Highest elevation of the collection of sites',
				'notes': 'Meters above sealevel',
				'validations': ['min("elevation_low")'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'location_end_elevation'
				}]
			},
			'continent_ocean': {
				'label': 'Continent or Ocean Name',
				'group': 'Geography',
				'position': 36,
				'type': 'String',
				'description': 'Continent or ocean name',
				'validations': ['cv("continent_ocean")'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'continent_ocean'
				}]
			},
			'country': {
				'label': 'Country Name',
				'group': 'Geography',
				'position': 37,
				'type': 'String',
				'description': 'Country name',
				'validations': ['cv("country")'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'country'
				}]
			},
			'state_province': {
				'label': 'State or Province Name',
				'group': 'Geography',
				'position': 38,
				'type': 'String',
				'description': 'State or Province Name',
				'examples': ['California', 'Alberta', 'Chongqing', 'Minas Gerais'],
				'validations': ['cv("state_province")']
			},
			'ocean_sea': {
				'label': 'Ocean or Sea Name',
				'group': 'Geography',
				'position': 39,
				'type': 'String',
				'description': 'Ocean or sea name',
				'validations': ['cv("ocean_sea")'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'ocean_sea'
				}]
			},
			'region': {
				'label': 'Region Name',
				'group': 'Geography',
				'position': 40,
				'type': 'String',
				'description': 'Region name',
				'validations': ['sv("region")'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'region'
				}]
			},
			'village_city': {
				'label': 'Village or City Name',
				'group': 'Geography',
				'position': 41,
				'type': 'String',
				'description': 'Village or city name',
				'validations': ['sv("village_city")'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'village_city'
				}]
			},
			'age': {
				'label': 'Inferred Age',
				'group': 'Age',
				'position': 42,
				'type': 'Number',
				'unit': 'Custom',
				'description': 'Location inferred age',
				'validations': ['requiredUnless("age_low","age_high")', 'requiredIf("age_sigma")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_age'
				}]
			},
			'age_sigma': {
				'label': 'Inferred Age One Sigma',
				'group': 'Age',
				'position': 43,
				'type': 'Number',
				'unit': 'Custom',
				'description': 'Location inferred age uncertainty, One sigma',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_age_sigma'
				}]
			},
			'age_low': {
				'label': 'Inferred Age Low',
				'group': 'Age',
				'position': 44,
				'type': 'Number',
				'unit': 'Custom',
				'description': 'Location inferred age, Low range, Can be either oldest or youngest age',
				'validations': ['requiredUnless("age")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_age_low'
				}]
			},
			'age_high': {
				'label': 'Inferred Age High',
				'group': 'Age',
				'position': 45,
				'type': 'Number',
				'unit': 'Custom',
				'description': 'Location inferred age, High range, Can be either oldest or youngest age',
				'validations': ['requiredUnless("age")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_age_high'
				}]
			},
			'age_unit': {
				'label': 'Inferred Age Unit',
				'group': 'Age',
				'position': 46,
				'type': 'String',
				'description': 'Location inferred age, Unit of measure',
				'validations': ['cv("age_unit")', 'required()'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_age_unit'
				}]
			},
			'dir_tilt_correction': {
				'label': 'Direction Tilt Correction',
				'group': 'Direction',
				'position': 47,
				'type': 'Number',
				'unit': '%',
				'description': 'Percentage tilt correction applied to the data',
				'notes': 'Correction between geographic (0%) and stratigraphic (100%); unoriented (-1%); partially oriented to horizontal only (-2%); unknown(-3%) - Use 0 for geographic coordinates (i.e. no stratigraphic correction) and 100 for stratigraphic coordinates (i.e. data has been corrected back to horizontal). Values inbetween can be used to indicate partially corrected amounts.',
				'examples': ['0', '100', '-1', '-2', '-3'],
				'validations': ['min(-3)', 'max(100)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'tilt_correction'
				}]
			},
			'dir_dec': {
				'label': 'Direction Declination',
				'group': 'Direction',
				'position': 48,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Location direction in coordinates specified by tilt correction, Declination',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_dec'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_dec_corr'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_dec_uncorr'
				}, {
					'table': 'pmag_results',
					'column': 'normal_dec'
				}, {
					'table': 'pmag_results',
					'column': 'reversed_dec'
				}]
			},
			'dir_inc': {
				'label': 'Direction Inclination',
				'group': 'Direction',
				'position': 49,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Location direction in coordinates specified by tilt correction, Inclination',
				'validations': ['min(-90)', 'max(90)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_inc'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_inc_corr'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_inc_uncorr'
				}, {
					'table': 'pmag_results',
					'column': 'normal_inc'
				}, {
					'table': 'pmag_results',
					'column': 'reversed_inc'
				}]
			},
			'dir_alpha95': {
				'label': 'Direction Alpha 95%',
				'group': 'Direction',
				'position': 50,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Location direction in coordinates specified by tilt correction, Fisher circle',
				'notes': 'Confidence Level = 95%',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_alpha95'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_alpha95_corr'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_alpha95_uncorr'
				}, {
					'table': 'pmag_results',
					'column': 'normal_alpha95'
				}, {
					'table': 'pmag_results',
					'column': 'reversed_alpha95'
				}]
			},
			'dir_r': {
				'label': 'Direction R',
				'group': 'Direction',
				'position': 51,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Location direction in coordinates specified by tilt correction, Resultant Fisher vector',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_r'
				}]
			},
			'dir_k': {
				'label': 'Direction K',
				'group': 'Direction',
				'position': 52,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Location direction in coordinates specified by tilt correction, Fisher\'s dispersion parameter Kappa',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_k'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_k_corr'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_k_uncorr'
				}, {
					'table': 'pmag_results',
					'column': 'normal_k'
				}, {
					'table': 'pmag_results',
					'column': 'reversed_k'
				}]
			},
			'dir_k_ratio': {
				'label': 'Direction Tilt K Ratio',
				'group': 'Direction',
				'position': 53,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Comparison of Fisher dispersion K after and before tilt correction',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'tilt_k_ratio'
				}]
			},
			'dir_polarity': {
				'label': 'Direction Polarity',
				'group': 'Direction',
				'position': 54,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Location direction polarity is normal (n), reversed (r), transitional (t), excursion (e) or intermediate (i)',
				'validations': ['cv("polarity")']
			},
			'dir_n_sites': {
				'label': 'Direction N Sites',
				'group': 'Direction',
				'position': 55,
				'type': 'Integer',
				'description': 'Number of sites included in directional calculations',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_n'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_n'
				}, {
					'table': 'pmag_results',
					'column': 'normal_n'
				}, {
					'table': 'pmag_results',
					'column': 'reversed_n'
				}]
			},
			'dir_n_samples': {
				'label': 'Direction N Samples',
				'group': 'Direction',
				'position': 56,
				'type': 'Integer',
				'description': 'Number of samples included in directional calculations',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_nn'
				}]
			},
			'dir_n_specimens': {
				'label': 'Direction N Specimens',
				'group': 'Direction',
				'position': 57,
				'type': 'Integer',
				'description': 'Number of specimens included in directional calculations',
				'validations': ['min(0)']
			},
			'fold_test_significance': {
				'label': 'Fold Test Significance',
				'group': 'Direction',
				'position': 58,
				'type': 'Number',
				'unit': '%',
				'description': 'Significance level achieved in tilt correction calculations',
				'validations': ['min(0)', 'max(100)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'fold_test_significance'
				}]
			},
			'fold_test': {
				'label': 'Fold Test',
				'group': 'Direction',
				'position': 59,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Classification and result of the folding test',
				'validations': ['cv("fold_test")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'fold_test'
				}]
			},
			'conglomerate_test': {
				'label': 'Conglomerate Test',
				'group': 'Direction',
				'position': 60,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Classification and result of the (intra-formational) conglomerate test',
				'validations': ['cv("conglomerate_test")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'conglomerate_test'
				}]
			},
			'contact_test': {
				'label': 'Baked Contact Test',
				'group': 'Direction',
				'position': 61,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Classification and result of the (inverse) contact test',
				'validations': ['cv("contact_test")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'contact_test'
				}]
			},
			'reversal_test': {
				'label': 'Reversal Test',
				'group': 'Direction',
				'position': 62,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Classification and result of the reversal test',
				'validations': ['cv("reversal_test")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'reversal_test'
				}]
			},
			'pole_lat': {
				'label': 'Pole Latitude',
				'group': 'Pole',
				'position': 63,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Pole latitude, average of site VGP latitudes, north pole',
				'validations': ['min(-90)', 'max(90)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vgp_lat'
				}]
			},
			'pole_lon': {
				'label': 'Pole Longitude',
				'group': 'Pole',
				'position': 64,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Pole longitude, average of site VGP longitudes, north pole',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vgp_lon'
				}]
			},
			'pole_dp': {
				'label': 'Pole DP',
				'group': 'Pole',
				'position': 65,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Pole parallel latitude uncertainty',
				'notes': 'Confidence Level = 95%',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vgp_dp'
				}]
			},
			'pole_dm': {
				'label': 'Pole DM',
				'group': 'Pole',
				'position': 66,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Pole meridian uncertainty',
				'notes': 'Confidence Level = 95%',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vgp_dm'
				}]
			},
			'pole_alpha95': {
				'label': 'Pole Alpha 95%',
				'group': 'Pole',
				'position': 67,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Pole direction, Fisher circle',
				'notes': 'Confidence Level = 95%',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vgp_alpha95'
				}]
			},
			'pole_r': {
				'label': 'Pole R',
				'group': 'Pole',
				'position': 68,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Pole direction, Resultant Fisher vector',
				'validations': ['min(0)']
			},
			'pole_k': {
				'label': 'Pole K',
				'group': 'Pole',
				'position': 69,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Pole direction,  Fisher\'s dispersion parameter Kappa',
				'validations': ['min(0)']
			},
			'pole_conf': {
				'label': 'Pole Confidence Ellipse',
				'group': 'Pole',
				'position': 70,
				'type': 'Matrix',
				'unit': 'Degrees',
				'urls': ['http://dx.doi.org/10.1029/JB095iB06p08383'],
				'description': 'Pole confidence ellipse expressed as a six-element colon-delimited list of major axis eta declination, inclination and semi-angle followed by minor axis zeta declination, inclination and semi-angle',
				'validations': ['type("pole_conf")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'zeta_semi_angle'
				}, {
					'table': 'pmag_results',
					'column': 'zeta_inc'
				}, {
					'table': 'pmag_results',
					'column': 'zeta_dec'
				}, {
					'table': 'pmag_results',
					'column': 'eta_semi_angle'
				}, {
					'table': 'pmag_results',
					'column': 'eta_dec'
				}, {
					'table': 'pmag_results',
					'column': 'eta_inc'
				}]
			},
			'pole_n_sites': {
				'label': 'Pole N Sites',
				'group': 'Pole',
				'position': 71,
				'type': 'Integer',
				'description': 'Number of sites included in pole calculations',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vgp_n'
				}]
			},
			'pole_comp_name': {
				'label': 'Pole Component Name',
				'group': 'Pole',
				'position': 72,
				'type': 'String',
				'description': 'Name of magnetic component for which pole is calculated',
				'examples': ['Characteristic', 'VRM', 'Overprint', 'A', 'B', 'C'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'pole_comp_name'
				}]
			},
			'pole_reversed_perc': {
				'label': 'Percentage Reversed Sites',
				'group': 'Pole',
				'position': 73,
				'type': 'Number',
				'unit': '%',
				'description': 'Percentage of sites that are reversed',
				'notes': 'Mixed polarity = -1%, Unknown polarity = -2%',
				'validations': ['min(-2)', 'max(100)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'percent_reversed'
				}]
			},
			'pole_antipodal_angle': {
				'label': 'Antipodal Angle',
				'group': 'Pole',
				'position': 74,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Great circle distance between normal and reversed poles',
				'validations': ['min(0)', 'max(180)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'antipodal'
				}]
			},
			'pole_vv_q': {
				'label': 'Van der Voo Q',
				'group': 'Pole',
				'position': 75,
				'type': 'Integer',
				'urls': ['http://dx.doi.org/10.1016/0040-1951(90)90116-P'],
				'description': 'Van der Voo Quality Level, Number of criteria passed',
				'validations': ['min(1)', 'max(7)']
			},
			'pole_bc_q': {
				'label': 'Besse and Courtillot Q',
				'group': 'Pole',
				'position': 76,
				'type': 'Integer',
				'urls': ['http://dx.doi.org/10.1029/2000JB000050'],
				'description': 'Besse and Courtillot Quality Level, Number of criteria passed',
				'validations': ['min(1)', 'max(5)']
			},
			'pole_flattening': {
				'label': 'Flattening Ratio',
				'group': 'Pole',
				'position': 77,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Flattening ratio. No flattening = 1.0',
				'validations': ['min(0)', 'max(1)']
			},
			'paleolat': {
				'label': 'Paleolatitude',
				'group': 'Paleoposition',
				'position': 78,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Paleolatitude',
				'validations': ['min(-90)', 'max(90)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'model_lat'
				}]
			},
			'paleolat_sigma': {
				'label': 'Paleolatitude Sigma',
				'group': 'Paleoposition',
				'position': 79,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Paleolatitude, Uncertainty',
				'notes': 'Standard error one sigma',
				'validations': ['min(0)', 'max(180)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'model_lat_sigma'
				}]
			},
			'paleolon': {
				'label': 'Paleolongitude',
				'group': 'Paleoposition',
				'position': 80,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Paleolongitude',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'model_lon'
				}]
			},
			'paleolon_sigma': {
				'label': 'Paleolongitude Sigma',
				'group': 'Paleoposition',
				'position': 81,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Paleolongitude, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'model_lon_sigma'
				}]
			},
			'paleopole_n_sites': {
				'label': 'Paleopole N Sites',
				'group': 'Paleoposition',
				'position': 82,
				'type': 'Integer',
				'description': 'Number of sites included in paleopole calculations',
				'validations': ['min(0)']
			},
			'pdm': {
				'label': 'PDM',
				'group': 'PDM',
				'position': 83,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Paleomagnetic dipole moment, Average of site VDMs',
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vdm'
				}]
			},
			'pdm_sigma': {
				'label': 'PDM Sigma',
				'group': 'PDM',
				'position': 84,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Paleomagnetic dipole moment, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vdm_sigma'
				}]
			},
			'pdm_n_sites': {
				'label': 'PDM N Sites',
				'group': 'PDM',
				'position': 85,
				'type': 'Integer',
				'description': 'Number of sites included in PDM calculations',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vdm_n'
				}]
			},
			'padm': {
				'label': 'PADM',
				'group': 'PADM',
				'position': 86,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Paleomagnetic axial dipole moment, Average of site VADMs',
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vadm'
				}]
			},
			'padm_sigma': {
				'label': 'PADM Sigma',
				'group': 'PADM',
				'position': 87,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Paleomagnetic axial dipole moment, Uncertainty',
				'notes': 'Standard error one sigma',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vadm_sigma'
				}]
			},
			'padm_n_sites': {
				'label': 'PADM N Sites',
				'group': 'PADM',
				'position': 88,
				'type': 'Integer',
				'description': 'Number of sites included in PADM calculations',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vadm_n'
				}]
			},
			'int_abs': {
				'label': 'Absolute Paleointensity',
				'group': 'Paleointensity',
				'position': 89,
				'type': 'Number',
				'unit': 'T',
				'description': 'Absolute field strength',
				'validations': ['min(0)', 'max(0.01)', 'requiredIf("int_sigma")', 'requiredIf("int_sigma_perc")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_int'
				}]
			},
			'int_abs_sigma': {
				'label': 'Absolute Paleointensity Sigma',
				'group': 'Paleointensity',
				'position': 90,
				'type': 'Number',
				'unit': 'T',
				'description': 'Absolute field strength, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)', 'max(0.01)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_int_sigma'
				}]
			},
			'int_abs_sigma_perc': {
				'label': 'Absolute Paleointensity Sigma %',
				'group': 'Paleointensity',
				'position': 91,
				'type': 'Number',
				'unit': '%',
				'description': 'Absolute field strength, Uncertainty in percent',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)', 'max(100)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_int_sigma_perc'
				}]
			},
			'int_n_sites': {
				'label': 'Paleointensity N Sites',
				'group': 'Paleointensity',
				'position': 92,
				'type': 'Integer',
				'description': 'Number of sites included in intensity calculations',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_int_n'
				}]
			},
			'int_n_samples': {
				'label': 'Paleointensity N Samples',
				'group': 'Paleointensity',
				'position': 93,
				'type': 'Integer',
				'description': 'Number of samples included in intensity calculations',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_int_nn'
				}]
			},
			'int_n_specimens': {
				'label': 'Paleointensity N Specimens',
				'group': 'Paleointensity',
				'position': 94,
				'type': 'Integer',
				'description': 'Number of specimens included in intensity calculations',
				'validations': ['min(0)']
			},
			'description': {
				'label': 'Description',
				'group': 'Metadata',
				'position': 95,
				'type': 'String',
				'description': 'Location and result description and comments',
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'location_description'
				}, {
					'table': 'pmag_results',
					'column': 'result_description'
				}]
			},
			'rock_magnetic_test': {
				'label': 'Rock Magnetic Test',
				'group': 'Metadata',
				'position': 96,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Classification and result of the various rock magnetic tests',
				'validations': ['cv("rock_magnetic_test")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'rock_magnetic_test'
				}]
			},
			'rotation_sequence': {
				'label': 'Sequence of Rotations',
				'group': 'Metadata',
				'position': 97,
				'type': 'Matrix',
				'description': 'M by N matrix with M sequential rotations and the length of each row defined by the first element: the rotation type',
				'examples': ['DD:20:124;TP:45:14'],
				'validations': ['matrix(0,3)'],
				'previous_columns': [{
					'table': 'pmag_rotations',
					'column': 'rotation_description'
				}, {
					'table': 'pmag_rotations',
					'column': 'rotation_definition'
				}, {
					'table': 'pmag_rotations',
					'column': 'rotation_lambda'
				}, {
					'table': 'pmag_rotations',
					'column': 'rotation_phi'
				}, {
					'table': 'pmag_rotations',
					'column': 'rotation_omega'
				}]
			},
			'criteria': {
				'label': 'Criteria Names',
				'group': 'Metadata',
				'position': 98,
				'type': 'List',
				'description': 'Colon-delimited list of criteria names',
				'examples': ['MY-MAD', 'MY-APLHA95'],
				'validations': ['in("criteria.criterion")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'pmag_criteria_codes'
				}]
			},
			'software_packages': {
				'label': 'Software Packages',
				'group': 'Metadata',
				'position': 99,
				'type': 'List',
				'description': 'Colon-delimited list of software used for data reduction',
				'examples': ['PmagPy v1.67b', 'FORCinel v1.11'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'magic_software_packages'
				}]
			},
			'external_database_ids': {
				'label': 'External Database IDs',
				'group': 'Metadata',
				'position': 100,
				'type': 'Dictionary',
				'description': 'Dictionary of external databases and IDs where data are used',
				'examples': ['GEOMAGIA50[1435]:CALS7K.2[23]', 'ARCHEO00[2329]', 'ARCHEO00[] if the ID is unknown'],
				'validations': ['cv("database_names")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'external_database_names'
				}, {
					'table': 'pmag_results',
					'column': 'external_database_ids'
				}]
			},
			'pis': {
				'label': 'Principal Investigator Names',
				'group': 'Metadata',
				'position': 101,
				'type': 'List',
				'description': 'Colon-delimited list of EarthRef handles or ORCIDs or names and emails for principal investigators who organized the expedition',
				'examples': ['@user1:@user2:0000-0002-9000-2100:Not A. Member <no.earthref.handle@gmail.com>'],
				'validations': ['type("users")'],
				'previous_columns': [{
					'table': 'er_expeditions',
					'column': 'er_pi_mail_names'
				}]
			},
			'scientists': {
				'label': 'Research Scientist Names',
				'group': 'Metadata',
				'position': 102,
				'type': 'List',
				'description': 'Colon-delimited list of EarthRef handles or ORCIDs or names and emails for scientists who described the location',
				'examples': ['@user1:@user2:0000-0002-9000-2100:Not A. Member <no.earthref.handle@gmail.com>'],
				'validations': ['type("users")'],
				'previous_columns': [{
					'table': 'er_locations',
					'column': 'er_scientist_mail_names'
				}, {
					'table': 'er_expeditions',
					'column': 'er_scientist_mail_names'
				}]
			},
			'analysts': {
				'label': 'Analyst Names',
				'group': 'Metadata',
				'position': 103,
				'type': 'List',
				'description': 'Colon-delimited list of EarthRef handles or ORCIDs or names and emails for analysts',
				'examples': ['@user1:@user2:0000-0002-9000-2100:Not A. Member <no.earthref.handle@gmail.com>'],
				'validations': ['type("users")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'er_analyst_mail_names'
				}]
			}
		}
	}

	,
	'sites': {
		'label': 'Sites',
		'position': 3,
		'description': 'Units with a common age and magnetization',
		'notes': 'VGPs, Intrepretations and summary data for an entire site or horizon in a core',
		'columns': {
			'contribution_id': {
				'label': 'Contribution ID',
				'group': 'Contribution',
				'position': 1,
				'type': 'Integer',
				'description': 'Unique MagIC contribution ID',
				'examples': ['5412'],
				'validations': ['downloadOnly()']
			},
			'row_id': {
				'label': 'Contribution Row ID',
				'group': 'Contribution',
				'position': 2,
				'type': 'Integer',
				'description': 'Unique row ID within a MagIC Contribution',
				'examples': ['743'],
				'validations': ['downloadOnly()']
			},
			'site': {
				'label': 'Site Name',
				'group': 'Names',
				'position': 3,
				'type': 'String',
				'description': 'Name for site',
				'notes': 'In the MagIC database a site is a grouping of samples that are all believed to record the same value of the property that is being measured. The values measured on specimens from those samples are averaged to give the site values. This usually means the samples were all create at the "same" time. Multiple places 10\'s of km apart might be grouped into the same site if it is decided that they belong together. These averages from multiple outcrops should be labeled in the result_type column with an \'a\'. Some examples of sites are: A single lava flow, lava flow "groups" that stacked on top of each other quickly enough to record the same magnetic direction, a sediment horizon, an archeological horizon, a single depth in a core, the average of samples from 4 cores that were believed to be deposited at the same time.',
				'examples': ['SFVP01'],
				'validations': ['key()', 'required()'],
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'er_site_name'
				}, {
					'table': 'er_samples',
					'column': 'er_site_name'
				}, {
					'table': 'er_formations',
					'column': 'er_site_name'
				}, {
					'table': 'pmag_sites',
					'column': 'er_site_name'
				}, {
					'table': 'pmag_results',
					'column': 'er_site_names'
				}, {
					'table': 'rmag_results',
					'column': 'er_site_names'
				}]
			},
			'location': {
				'label': 'Location Name',
				'group': 'Names',
				'position': 4,
				'type': 'String',
				'description': 'Name for location, dredge or drill site',
				'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801'],
				'validations': ['in("locations.location")', 'required()'],
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'er_location_name'
				}, {
					'table': 'pmag_sites',
					'column': 'er_location_name'
				}, {
					'table': 'pmag_results',
					'column': 'er_location_names'
				}]
			},
			'samples': {
				'label': 'Sample Names',
				'group': 'Names',
				'position': 5,
				'type': 'List',
				'description': 'Colon-delimited list of the names of samples included in the result',
				'examples': ['SFVP01-01:SFVP01-02'],
				'validations': ['in("samples.sample")'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'er_sample_names'
				}, {
					'table': 'pmag_results',
					'column': 'er_sample_names'
				}, {
					'table': 'rmag_results',
					'column': 'er_sample_names'
				}]
			},
			'specimens': {
				'label': 'Specimen Names',
				'group': 'Names',
				'position': 6,
				'type': 'List',
				'description': 'Colon-delimited list of the names of specimens included in the result',
				'examples': ['SFVP01-01a:SFVP01-01b:SFVP01-02a'],
				'validations': ['in("specimens.specimen")'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'er_specimen_names'
				}, {
					'table': 'pmag_results',
					'column': 'er_specimen_names'
				}, {
					'table': 'rmag_results',
					'column': 'er_specimen_names'
				}, {
					'table': 'pmag_sites',
					'column': 'er_synthetic_names'
				}, {
					'table': 'pmag_results',
					'column': 'er_synthetic_names'
				}, {
					'table': 'rmag_results',
					'column': 'er_synthetic_names'
				}]
			},
			'experiments': {
				'label': 'Experiment Names',
				'group': 'Names',
				'position': 7,
				'type': 'List',
				'description': 'Colon-delimited list of the names of experiments included in the result',
				'examples': ['SFVP01-01a-LT-AF-Z:SFVP01-01b-LT-T-Z:SFVP01-02a-LT-AF-Z'],
				'validations': ['in("measurements.experiment")'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'magic_experiment_names'
				}, {
					'table': 'pmag_results',
					'column': 'magic_experiment_names'
				}, {
					'table': 'rmag_results',
					'column': 'magic_experiment_names'
				}]
			},
			'igsn': {
				'label': 'Site IGSN',
				'group': 'Site',
				'position': 8,
				'type': 'String',
				'description': 'International Geo Sample Number (IGSN)',
				'examples': ['SIO0A0987', 'SIO001317'],
				'validations': ['type("igsn")'],
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'site_igsn'
				}]
			},
			'site_alternatives': {
				'label': 'Site Name Alternatives',
				'group': 'Site',
				'position': 9,
				'type': 'List',
				'description': 'Colon-delimited list of alternative names and abbreviations',
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'er_site_alternatives'
				}]
			},
			'result_type': {
				'label': 'Result Type',
				'group': 'Result',
				'position': 10,
				'type': 'String',
				'unit': 'Flag',
				'description': '(i) individual site value (an average of samples/specimens), (s) stacked: used for averages of multiple bore hole data, (m) model derived data. ',
				'notes': '(i) individual: A single lava flow at a single outcrop, a single sediment horizon at a single outcrop, a single level in one core, a single archeological horizon seen as continuous at one place. (a) an average value over multiple places over multiple outcrops that are averaged together as one site because they are thought to be of the same age due to geochemical, age, morphology, weathering characteristics, historical records, geological mapping, etc. (s) stacked: used for bore hole data where data from multiple cores of what is determined to be the same time horizon have been averaged, or (m) model derived data. ',
				'validations': ['cv("data_type")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'data_type'
				}]
			},
			'result_quality': {
				'label': 'Result Quality',
				'group': 'Result',
				'position': 11,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Indicating if good (g) or bad (b) data',
				'validations': ['cv("data_quality")', 'recommended()'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_flag'
				}]
			},
			'method_codes': {
				'label': 'Method Codes',
				'group': 'Result',
				'position': 12,
				'type': 'List',
				'description': 'Colon-delimited list of method codes',
				'validations': ['type("method_codes")', 'required()'],
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'magic_method_codes'
				}, {
					'table': 'pmag_sites',
					'column': 'magic_method_codes'
				}, {
					'table': 'pmag_results',
					'column': 'magic_method_codes'
				}, {
					'table': 'rmag_results',
					'column': 'magic_method_codes'
				}]
			},
			'display_order': {
				'label': 'Display Order',
				'group': 'Result',
				'position': 13,
				'type': 'Number',
				'description': 'Order of the rows for display purposes. If not set at upload will be set to the order in the uploaded file. Can be a float of either sign.',
				'examples': ['1', '0', '1.2', '-4.34']
			},
			'citations': {
				'label': 'Citation DOIs',
				'group': 'Result',
				'position': 14,
				'type': 'List',
				'description': 'Colon-delimited list of citation DOIs',
				'examples': ['10.1029/92JB01202', '10.1029/2003GC000635:This study', '"10.1023/A:1015035228810":This study'],
				'validations': ['type("references")', 'required()'],
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'er_citation_names'
				}, {
					'table': 'er_formations',
					'column': 'er_citation_names'
				}, {
					'table': 'er_members',
					'column': 'er_citation_names'
				}, {
					'table': 'pmag_sites',
					'column': 'er_citation_names'
				}, {
					'table': 'pmag_results',
					'column': 'er_citation_names'
				}, {
					'table': 'rmag_results',
					'column': 'er_citation_names'
				}, {
					'table': 'pmag_rotations',
					'column': 'er_citation_names'
				}]
			},
			'geologic_classes': {
				'label': 'Geologic Classes',
				'group': 'Geology',
				'position': 15,
				'type': 'List',
				'description': 'Colon-delimited list of geologic classes',
				'validations': ['cv("class")', 'required()'],
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'site_class'
				}]
			},
			'geologic_types': {
				'label': 'Sample Material Types',
				'group': 'Geology',
				'position': 16,
				'type': 'List',
				'description': 'Colon-delimited list of sample material types',
				'validations': ['cv("type")', 'required()'],
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'site_type'
				}]
			},
			'lithologies': {
				'label': 'Lithologies',
				'group': 'Geology',
				'position': 17,
				'type': 'List',
				'description': 'Colon-delimited list of lithologies or archeological classifications',
				'validations': ['cv("lithology")', 'required()'],
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'site_lithology'
				}]
			},
			'bed_dip': {
				'label': 'Bedding Dip',
				'group': 'Geology',
				'position': 18,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Dip of the bedding as measured to the right of strike direction',
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'site_bed_dip'
				}]
			},
			'bed_dip_direction': {
				'label': 'Bedding Dip Direction',
				'group': 'Geology',
				'position': 19,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Direction of the dip of a paleo-horizontal plane in the bedding',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'site_bed_dip_direction'
				}]
			},
			'cooling_rate': {
				'label': 'Cooling Rate Estimate',
				'group': 'Geology',
				'position': 20,
				'type': 'Number',
				'unit': 'K/Ma',
				'description': 'Estimated ancient in-situ cooling rate per Ma',
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'site_cooling_rate'
				}]
			},
			'formation': {
				'label': 'Formation Name',
				'group': 'Geology',
				'position': 21,
				'type': 'String',
				'description': 'Name for formation',
				'examples': ['Tuff of Coyote Spring'],
				'previous_columns': [{
					'table': 'er_formations',
					'column': 'er_formation_name'
				}]
			},
			'formation_abbreviation': {
				'label': 'Formation Name Abbreviation',
				'group': 'Geology',
				'position': 22,
				'type': 'String',
				'description': 'Abbreviation for the formation name',
				'examples': ['Mics']
			},
			'member': {
				'label': 'Member Name',
				'group': 'Geology',
				'position': 23,
				'type': 'String',
				'description': 'Name for member',
				'examples': ['Glasshound Member'],
				'previous_columns': [{
					'table': 'er_members',
					'column': 'er_member_name'
				}]
			},
			'lat': {
				'label': 'Latitude',
				'group': 'Geography',
				'position': 24,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Site geographic location, Latitude',
				'validations': ['min(-90)', 'max(90)', 'required()'],
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'site_lat'
				}, {
					'table': 'pmag_results',
					'column': 'average_lat'
				}]
			},
			'lat_sigma': {
				'label': 'Latitude Sigma',
				'group': 'Geography',
				'position': 25,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Site geographic location averaging uncertainty, Latitude',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)', 'max(180)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_lat_sigma'
				}]
			},
			'lon': {
				'label': 'Longitude',
				'group': 'Geography',
				'position': 26,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Site geographic location, Longitude',
				'validations': ['min(0)', 'max(360)', 'required()'],
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'site_lon'
				}, {
					'table': 'pmag_results',
					'column': 'average_lon'
				}]
			},
			'lon_sigma': {
				'label': 'Longitude Sigma',
				'group': 'Geography',
				'position': 27,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Site geographic location averaging uncertainty, Longitude',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_lon_sigma'
				}]
			},
			'geographic_precision': {
				'label': 'Geographic Precision',
				'group': 'Geography',
				'position': 28,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Site geographic location, Precision in latitude and longitude',
				'notes': 'Decimal degrees',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'site_location_precision'
				}]
			},
			'groups': {
				'label': 'Site Groups',
				'group': 'Geography',
				'position': 29,
				'type': 'String',
				'description': 'Colon-delimited list of group labels for the site',
				'notes': 'A site can be labeled with one or more names. For example a section name, a core name, a paleomagnetic directional group, or any other site grouping label.',
				'examples': ['Red Hill', 'Fish Lake', '2', 'Steens Mountain:4']
			},
			'order': {
				'label': 'Stratigraphic Order',
				'group': 'Geography',
				'position': 30,
				'type': 'Integer',
				'description': 'Site geographic location, Order in the stratigraphic section',
				'notes': 'Lower number for younger age'
			},
			'height': {
				'label': 'Stratigraphic Height',
				'group': 'Geography',
				'position': 31,
				'type': 'Number',
				'unit': 'm',
				'description': 'Site geographic location, Stratigraphic height',
				'notes': 'Positive is up in section or core, while negative is down relative to reference height',
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'site_height'
				}, {
					'table': 'pmag_results',
					'column': 'average_height'
				}]
			},
			'elevation': {
				'label': 'Elevation',
				'group': 'Geography',
				'position': 32,
				'type': 'Number',
				'unit': 'm',
				'description': 'Site geographic location, Elevation relative to sealevel',
				'notes': 'Meters above sealevel',
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'site_elevation'
				}, {
					'table': 'er_samples',
					'column': 'sample_elevation'
				}]
			},
			'core_depth': {
				'label': 'Core Depth',
				'group': 'Geography',
				'position': 33,
				'type': 'Number',
				'unit': 'm',
				'description': 'Site geographic location, Core depth below seafloor/lake bottom or surface',
				'notes': 'Meters below seafloor',
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'site_core_depth'
				}, {
					'table': 'er_samples',
					'column': 'sample_core_depth'
				}]
			},
			'composite_depth': {
				'label': 'Composite Depth',
				'group': 'Geography',
				'position': 34,
				'type': 'Number',
				'unit': 'm',
				'description': 'Site geographic location, Composite below seafloor/lake bottom or surface',
				'notes': 'Meters below seafloor',
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'site_composite_depth'
				}, {
					'table': 'er_samples',
					'column': 'sample_composite_depth'
				}]
			},
			'age': {
				'label': 'Inferred Age',
				'group': 'Age',
				'position': 35,
				'type': 'Number',
				'unit': 'Custom',
				'description': 'Site inferred age',
				'validations': ['requiredUnless("age_low","age_high")', 'requiredIf("age_sigma")'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_inferred_age'
				}, {
					'table': 'pmag_samples',
					'column': 'sample_inferred_age'
				}, {
					'table': 'pmag_specimens',
					'column': 'specimen_inferred_age'
				}, {
					'table': 'pmag_results',
					'column': 'average_age'
				}]
			},
			'age_sigma': {
				'label': 'Inferred Age One Sigma',
				'group': 'Age',
				'position': 36,
				'type': 'Number',
				'unit': 'Custom',
				'description': 'Site inferred age uncertainty, One sigma',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_inferred_age_sigma'
				}, {
					'table': 'pmag_samples',
					'column': 'sample_inferred_age_sigma'
				}, {
					'table': 'pmag_specimens',
					'column': 'specimen_inferred_age_sigma'
				}, {
					'table': 'pmag_results',
					'column': 'average_age_sigma'
				}]
			},
			'age_low': {
				'label': 'Inferred Age Low',
				'group': 'Age',
				'position': 37,
				'type': 'Number',
				'unit': 'Custom',
				'description': 'Site inferred age, Low range, Can be either oldest or youngest age',
				'validations': ['requiredUnless("age")'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_inferred_age_low'
				}, {
					'table': 'pmag_samples',
					'column': 'sample_inferred_age_low'
				}, {
					'table': 'pmag_specimens',
					'column': 'specimen_inferred_age_low'
				}, {
					'table': 'pmag_results',
					'column': 'average_age_low'
				}]
			},
			'age_high': {
				'label': 'Inferred Age High',
				'group': 'Age',
				'position': 38,
				'type': 'Number',
				'unit': 'Custom',
				'description': 'Site inferred age, High range, Can be either oldest or youngest age',
				'validations': ['requiredUnless("age")'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_inferred_age_high'
				}, {
					'table': 'pmag_samples',
					'column': 'sample_inferred_age_high'
				}, {
					'table': 'pmag_specimens',
					'column': 'specimen_inferred_age_high'
				}, {
					'table': 'pmag_results',
					'column': 'average_age_high'
				}]
			},
			'age_unit': {
				'label': 'Inferred Age Unit',
				'group': 'Age',
				'position': 39,
				'type': 'String',
				'description': 'Site inferred age, Unit',
				'validations': ['cv("age_unit")', 'required()'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_inferred_age_unit'
				}, {
					'table': 'pmag_samples',
					'column': 'sample_inferred_age_unit'
				}, {
					'table': 'pmag_specimens',
					'column': 'specimen_inferred_age_unit'
				}, {
					'table': 'pmag_results',
					'column': 'average_age_unit'
				}]
			},
			'dir_tilt_correction': {
				'label': 'Direction Tilt Correction',
				'group': 'Direction',
				'position': 40,
				'type': 'Number',
				'unit': '%',
				'description': 'Percentage tilt correction applied to the data',
				'notes': 'Correction between geographic (0%) and stratigraphic (100%); unoriented (-1%); partially oriented to horizontal only (-2%); unknown(-3%) - Use 0 for geographic coordinates (i.e. no stratigraphic correction) and 100 for stratigraphic coordinates (i.e. data has been corrected back to horizontal). Values inbetween can be used to indicate partially corrected amounts.',
				'examples': ['0', '100', '-1', '-2', '-3'],
				'validations': ['min(-3)', 'max(100)'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_tilt_correction'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_correction'
				}]
			},
			'dir_dec': {
				'label': 'Direction Declination',
				'group': 'Direction',
				'position': 41,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Site direction in coordinates specified by tilt correction, Declination',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_dec'
				}, {
					'table': 'pmag_results',
					'column': 'average_dec'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_dec_corr'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_dec_uncorr'
				}]
			},
			'dir_inc': {
				'label': 'Direction Inclination',
				'group': 'Direction',
				'position': 42,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Site direction in coordinates specified by tilt correction, Inclination',
				'validations': ['min(-90)', 'max(90)'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_inc'
				}, {
					'table': 'pmag_results',
					'column': 'average_inc'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_inc_corr'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_inc_uncorr'
				}]
			},
			'dir_alpha95': {
				'label': 'Direction Alpha 95%',
				'group': 'Direction',
				'position': 43,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Site direction in coordinates specified by tilt correction, Fisher circle',
				'notes': 'Confidence Level = 95%',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_alpha95'
				}, {
					'table': 'pmag_results',
					'column': 'average_alpha95'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_alpha95_corr'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_alpha95_uncorr'
				}]
			},
			'dir_r': {
				'label': 'Direction R',
				'group': 'Direction',
				'position': 44,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Site direction in coordinates specified by tilt correction, Resultant Fisher vector',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_r'
				}, {
					'table': 'pmag_results',
					'column': 'average_r'
				}]
			},
			'dir_k': {
				'label': 'Direction K',
				'group': 'Direction',
				'position': 45,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Site direction in coordinates specified by tilt correction, Fisher\'s dispersion parameter Kappa',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_k'
				}, {
					'table': 'pmag_results',
					'column': 'average_k'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_k_corr'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_k_uncorr'
				}]
			},
			'dir_k_ratio': {
				'label': 'Direction Tilt K Ratio',
				'group': 'Direction',
				'position': 46,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Comparison of Fisher dispersion K after and before tilt correction',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'tilt_k_ratio'
				}]
			},
			'dir_n_samples': {
				'label': 'Direction N Samples',
				'group': 'Direction',
				'position': 47,
				'type': 'Integer',
				'description': 'Number of samples included in directional calculations.',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_n'
				}, {
					'table': 'pmag_results',
					'column': 'average_n'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_n'
				}]
			},
			'dir_n_total_samples': {
				'label': 'Direction N Total Samples',
				'group': 'Direction',
				'position': 48,
				'type': 'Integer',
				'description': 'Number of samples collected at the site for directional calculations',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_n_total'
				}]
			},
			'dir_n_specimens': {
				'label': 'Direction N Specimens',
				'group': 'Direction',
				'position': 49,
				'type': 'Integer',
				'description': 'Number of specimens included in directional calculations. Generally the same as the number of samples but sometimes multiple specimens per samples are used in the site average.',
				'validations': ['min(0)']
			},
			'dir_n_total_specimens': {
				'label': 'Direction N Total Specimens',
				'group': 'Direction',
				'position': 50,
				'type': 'Integer',
				'description': 'Number of specimens measured for the site for directional calculations',
				'validations': ['min(0)']
			},
			'dir_n_specimens_lines': {
				'label': 'Direction N Specimens from Best-Fit Lines',
				'group': 'Direction',
				'position': 51,
				'type': 'Integer',
				'description': 'Number of specimens included in directional calculations based on best-fit lines',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_n_lines'
				}]
			},
			'dir_n_specimens_planes': {
				'label': 'Direction N Specimens from Best-Fit Planes',
				'group': 'Direction',
				'position': 52,
				'type': 'Integer',
				'description': 'Number of specimens included in directional calculations based on best-fit planes',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_n_planes'
				}]
			},
			'dir_comp_name': {
				'label': 'Direction Component Name',
				'group': 'Direction',
				'position': 53,
				'type': 'String',
				'description': 'Site direction component name',
				'examples': ['Characteristic', 'VRM', 'Overprint', 'A', 'B', 'C'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_comp_name'
				}, {
					'table': 'pmag_sites',
					'column': 'site_comp_nmb'
				}]
			},
			'dir_n_comps': {
				'label': 'Direction N Components',
				'group': 'Direction',
				'position': 54,
				'type': 'Integer',
				'description': 'Total number of site magnetic components',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_comp_n'
				}]
			},
			'dir_polarity': {
				'label': 'Direction Polarity',
				'group': 'Direction',
				'position': 55,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Site direction polarity is normal (n), reversed (r), transitional (t), excursion (e) or intermediate (i)',
				'validations': ['cv("polarity")'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_polarity'
				}]
			},
			'dir_nrm_origin': {
				'label': 'Direction NRM Origin',
				'group': 'Direction',
				'position': 56,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Origin of the site direction NRM is primary (p) or secondary (s)',
				'validations': ['cv("nrm")'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_nrm'
				}]
			},
			'conglomerate_test': {
				'label': 'Conglomerate Test',
				'group': 'Direction',
				'position': 57,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Classification and result of the (intra-formational) conglomerate test',
				'validations': ['cv("conglomerate_test")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'conglomerate_test'
				}]
			},
			'contact_test': {
				'label': 'Baked Contact Test',
				'group': 'Direction',
				'position': 58,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Classification and result of the (inverse) contact test',
				'validations': ['cv("contact_test")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'contact_test'
				}]
			},
			'blanket_demag_level_af': {
				'label': 'Blanket Demagnetization Level Alternating Field',
				'group': 'Direction',
				'position': 59,
				'type': 'Number',
				'unit': 'T',
				'description': 'Level at which all of the samples were demagnetized'
			},
			'blanket_demag_level_t': {
				'label': 'Blanket Demagnetization Level Thermal',
				'group': 'Direction',
				'position': 60,
				'type': 'Number',
				'unit': 'K',
				'description': 'Level at which all of the samples were demagnetized'
			},
			'vgp_lat': {
				'label': 'VGP Latitude',
				'group': 'VGP',
				'position': 61,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Virtual geomagnetic pole, Latitude',
				'validations': ['min(-90)', 'max(90)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vgp_lat'
				}]
			},
			'vgp_lon': {
				'label': 'VGP Longitude',
				'group': 'VGP',
				'position': 62,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Virtual geomagnetic pole, Longitude',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vgp_lon'
				}]
			},
			'vgp_dp': {
				'label': 'VGP DP',
				'group': 'VGP',
				'position': 63,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Virtual geomagnetic pole, Parallel latitude, Uncertainty',
				'notes': 'Confidence Level = 95%',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vgp_dp'
				}]
			},
			'vgp_dm': {
				'label': 'VGP DM',
				'group': 'VGP',
				'position': 64,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Virtual geomagnetic pole, Meridian, Uncertainty',
				'notes': 'Confidence Level = 95%',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vgp_dm'
				}]
			},
			'vgp_alpha95': {
				'label': 'VGP Alpha 95%',
				'group': 'VGP',
				'position': 65,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Virtual geomagnetic pole, Fisher circle',
				'notes': 'Confidence Level = 95%',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vgp_alpha95'
				}]
			},
			'vgp_k': {
				'label': 'VGP K',
				'group': 'VGP',
				'position': 66,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Fisher\'s dispersion parameter Kappa for the site\'s VGPs',
				'validations': ['min(0)']
			},
			'vgp_n_samples': {
				'label': 'VGP N Samples',
				'group': 'VGP',
				'position': 67,
				'type': 'Integer',
				'description': 'Number of samples included in VGP calculations',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vgp_n'
				}]
			},
			'vdm': {
				'label': 'VDM',
				'group': 'VDM',
				'position': 68,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Virtual dipole moment',
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vdm'
				}]
			},
			'vdm_sigma': {
				'label': 'VDM Sigma',
				'group': 'VDM',
				'position': 69,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Virtual dipole moment, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vdm_sigma'
				}]
			},
			'vdm_n_samples': {
				'label': 'VDM N Samples',
				'group': 'VDM',
				'position': 70,
				'type': 'Integer',
				'description': 'Number of samples included in VDM calculations',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vdm_n'
				}]
			},
			'vadm': {
				'label': 'VADM',
				'group': 'VADM',
				'position': 71,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Virtual axial dipole moment',
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vadm'
				}]
			},
			'vadm_sigma': {
				'label': 'VADM Sigma',
				'group': 'VADM',
				'position': 72,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Virtual axial dipole moment, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vadm_sigma'
				}]
			},
			'vadm_n_samples': {
				'label': 'VADM N Samples',
				'group': 'VADM',
				'position': 73,
				'type': 'Integer',
				'description': 'Number of samples included in VADM calculations',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'vadm_n'
				}]
			},
			'paleolat': {
				'label': 'Paleolatitude',
				'group': 'Paleoposition',
				'position': 74,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Paleolatitude',
				'validations': ['min(-90)', 'max(90)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'model_lat'
				}]
			},
			'paleolat_sigma': {
				'label': 'Paleolatitude Sigma',
				'group': 'Paleoposition',
				'position': 75,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Paleolatitude, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)', 'max(180)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'model_lat_sigma'
				}]
			},
			'paleolon': {
				'label': 'Paleolongitude',
				'group': 'Paleoposition',
				'position': 76,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Paleolongitude',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'model_lon'
				}]
			},
			'paleolon_sigma': {
				'label': 'Paleolongitude Sigma',
				'group': 'Paleoposition',
				'position': 77,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Paleolongitude, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'model_lon_sigma'
				}]
			},
			'magn_volume': {
				'label': 'Magnetization Volume',
				'group': 'Magnetization',
				'position': 78,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Measured intensity of magnetization, Volume normalized',
				'validations': ['min(-1000000)', 'max(1000000)'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_magn_volume'
				}]
			},
			'magn_mass': {
				'label': 'Magnetization Mass',
				'group': 'Magnetization',
				'position': 79,
				'type': 'Number',
				'unit': 'Am^2/kg',
				'description': 'Measured intensity of magnetization, Mass normalized',
				'validations': ['min(-200)', 'max(200)'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_magn_mass'
				}]
			},
			'int_abs': {
				'label': 'Absolute Paleointensity',
				'group': 'Paleointensity',
				'position': 80,
				'type': 'Number',
				'unit': 'T',
				'description': 'Absolute field strength',
				'validations': ['min(0)', 'max(0.01)', 'requiredIf("int_abs_sigma")', 'requiredIf("int_abs_sigma_perc")'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_int'
				}, {
					'table': 'pmag_results',
					'column': 'average_int'
				}]
			},
			'int_abs_sigma': {
				'label': 'Absolute Paleointensity Sigma',
				'group': 'Paleointensity',
				'position': 81,
				'type': 'Number',
				'unit': 'T',
				'description': 'Absolute field strength, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)', 'max(0.01)'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_int_sigma'
				}, {
					'table': 'pmag_results',
					'column': 'average_int_sigma'
				}]
			},
			'int_abs_sigma_perc': {
				'label': 'Absolute Paleointensity Sigma %',
				'group': 'Paleointensity',
				'position': 82,
				'type': 'Number',
				'unit': '%',
				'description': 'Absolute field strength, Uncertainty in percent',
				'validations': ['min(0)', 'max(100)'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_int_sigma_perc'
				}, {
					'table': 'pmag_results',
					'column': 'average_int_sigma_perc'
				}]
			},
			'int_abs_min': {
				'label': 'Absolute Paleointensity Min',
				'group': 'Paleointensity',
				'position': 83,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Absolute field strength minimum parameter as described by the method code',
				'examples': ['.025', '.01']
			},
			'int_abs_max': {
				'label': 'Absolute Paleointensity Max',
				'group': 'Paleointensity',
				'position': 84,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Absolute field strength maximim parameter as described by the method code',
				'examples': ['0.95', '.6827']
			},
			'int_rel': {
				'label': 'Relative Paleointensity',
				'group': 'Paleointensity',
				'position': 85,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength',
				'validations': ['requiredIf("int_rel_sigma")', 'requiredIf("int_rel_sigma_perc")'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_int_rel'
				}, {
					'table': 'pmag_results',
					'column': 'average_int_rel'
				}]
			},
			'int_rel_sigma': {
				'label': 'Relative Paleointensity Sigma',
				'group': 'Paleointensity',
				'position': 86,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_int_rel_sigma'
				}, {
					'table': 'pmag_results',
					'column': 'average_int_rel_sigma'
				}]
			},
			'int_rel_sigma_perc': {
				'label': 'Relative Paleointensity Sigma %',
				'group': 'Paleointensity',
				'position': 87,
				'type': 'Number',
				'unit': '%',
				'description': 'Relative field strength, Uncertainty in percent',
				'validations': ['min(0)', 'max(100)'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_int_rel_sigma_perc'
				}, {
					'table': 'pmag_results',
					'column': 'average_int_rel_sigma_perc'
				}]
			},
			'int_rel_ARM': {
				'label': 'ARM Normalized Relative Paleointensity',
				'group': 'Paleointensity',
				'position': 88,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength estimated with NRM normalized by laboratory ARM',
				'validations': ['requiredIf("int_rel_ARM_sigma")', 'requiredIf("int_rel_ARM_sigma_perc")']
			},
			'int_rel_ARM_sigma': {
				'label': 'ARM Normalized Relative Paleointensity Sigma',
				'group': 'Paleointensity',
				'position': 89,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength estimated with NRM normalized by laboratory ARM, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)']
			},
			'int_rel_ARM_sigma_perc': {
				'label': 'ARM Normalized Relative Paleointensity Sigma %',
				'group': 'Paleointensity',
				'position': 90,
				'type': 'Number',
				'unit': '%',
				'description': 'Relative field strength estimated with NRM normalized by laboratory ARM, Uncertainty in percent',
				'validations': ['min(0)', 'max(100)']
			},
			'int_rel_IRM': {
				'label': 'IRM Normalized Relative Paleointensity',
				'group': 'Paleointensity',
				'position': 91,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength estimated with NRM normalized by laboratory IRM',
				'validations': ['requiredIf("int_rel_IRM_sigma")', 'requiredIf("int_rel_IRM_sigma_perc")']
			},
			'int_rel_IRM_sigma': {
				'label': 'IRM Normalized Relative Paleointensity Sigma',
				'group': 'Paleointensity',
				'position': 92,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength estimated with NRM normalized by laboratory IRM, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)']
			},
			'int_rel_IRM_sigma_perc': {
				'label': 'IRM Normalized Relative Paleointensity Sigma %',
				'group': 'Paleointensity',
				'position': 93,
				'type': 'Number',
				'unit': '%',
				'description': 'Relative field strength estimated with NRM normalized by laboratory IRM, Uncertainty in percent',
				'validations': ['min(0)', 'max(100)']
			},
			'int_rel_chi': {
				'label': 'Susceptibility Normalized Relative Paleointensity',
				'group': 'Paleointensity',
				'position': 94,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength estimated with NRM normalized by susceptibility',
				'validations': ['requiredIf("int_rel_chi_sigma")', 'requiredIf("int_rel_chi_sigma_perc")']
			},
			'int_rel_chi_sigma': {
				'label': 'Susceptibility Normalized Relative Paleointensity Sigma',
				'group': 'Paleointensity',
				'position': 95,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength estimated with NRM normalized by susceptibility, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)']
			},
			'int_rel_chi_sigma_perc': {
				'label': 'Susceptibility Normalized Relative Paleointensity Sigma %',
				'group': 'Paleointensity',
				'position': 96,
				'type': 'Number',
				'unit': '%',
				'description': 'Relative field strength estimated with NRM normalized by susceptibility, Uncertainty in percent',
				'validations': ['min(0)', 'max(100)']
			},
			'int_n_samples': {
				'label': 'Paleointensity N Samples',
				'group': 'Paleointensity',
				'position': 97,
				'type': 'Integer',
				'description': 'Number of samples included in intensity calculations',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'site_int_n'
				}, {
					'table': 'pmag_results',
					'column': 'average_int_n'
				}]
			},
			'int_n_specimens': {
				'label': 'Paleointensity N Specimens',
				'group': 'Paleointensity',
				'position': 98,
				'type': 'Integer',
				'description': 'Number of specimens included in intensity calculations',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_int_nn'
				}]
			},
			'int_n_total_samples': {
				'label': 'Intensity N Total Samples',
				'group': 'Paleointensity',
				'position': 99,
				'type': 'Integer',
				'description': 'Number of samples from a site measured for intensity calculations.',
				'validations': ['min(0)']
			},
			'int_n_total_specimens': {
				'label': 'Intensity N Total Specimens',
				'group': 'Paleointensity',
				'position': 100,
				'type': 'Integer',
				'description': 'Number of specimens from a site measured for intensity calculations.',
				'notes': 'This value is the (number of accepted intensity experiments) + (number of rejected intensity experiments) at the site.',
				'validations': ['min(0)']
			},
			'int_corr_cooling_mean': {
				'label': 'Paleointensity Cooling Rate Correction Factor',
				'group': 'Paleointensity',
				'position': 101,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Mean cooling rate correction for all specimens from a site'
			},
			'int_corr_aniso_mean': {
				'label': 'Paleointensity Anisotropy Correction Factor',
				'group': 'Paleointensity',
				'position': 102,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Mean of paleointensity anisotropy correction factors for all specimens from the same mother site'
			},
			'aniso_type': {
				'label': 'Anisotropy Type',
				'group': 'Anisotropy',
				'position': 103,
				'type': 'String',
				'description': 'Anisotropy calculation type',
				'examples': ['AMS', 'AARM', 'AIRM', 'ATRM'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_type'
				}]
			},
			'aniso_tilt_correction': {
				'label': 'Anisotropy Tilt Correction',
				'group': 'Anisotropy',
				'position': 104,
				'type': 'Number',
				'unit': '%',
				'description': 'Percentage tilt correction applied to the data',
				'notes': 'Correction between geographic (0%) and stratigraphic (100%); unoriented (-1%); partially oriented to horizontal only (-2%); unknown(-3%) - Use 0 for geographic coordinates (i.e. no stratigraphic correction) and 100 for stratigraphic coordinates (i.e. data has been corrected back to horizontal). Values inbetween can be used to indicate partially corrected amounts.',
				'examples': ['0', '100', '-1', '-2', '-3'],
				'validations': ['min(-3)', 'max(100)'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'tilt_correction'
				}]
			},
			'aniso_v1': {
				'label': 'Anisotropy V1',
				'group': 'Anisotropy',
				'position': 105,
				'type': 'Matrix',
				'description': 'Anisotropy eigenparameters for the maximum eigenvalue (T1), a colon-delimited list of tau (T1), dec, inc, confidence ellipse type, and confidence ellipse parameters',
				'validations': ['type("aniso_v")'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_t1'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_eta_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_eta_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_eta_semi_angle'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_zeta_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_zeta_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_zeta_semi_angle'
				}]
			},
			'aniso_v2': {
				'label': 'Anisotropy V2',
				'group': 'Anisotropy',
				'position': 106,
				'type': 'Matrix',
				'description': 'Anisotropy eigenparameters for the intermediate eigenvalue (T2), a colon-delimited list of tau (T2), dec, inc, confidence ellipse type, and confidence ellipse parameters',
				'validations': ['type("aniso_v")'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_t2'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_eta_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_eta_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_eta_semi_angle'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_zeta_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_zeta_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_zeta_semi_angle'
				}]
			},
			'aniso_v3': {
				'label': 'Anisotropy V3',
				'group': 'Anisotropy',
				'position': 107,
				'type': 'Matrix',
				'description': 'Anisotropy eigenparameters for the minimum eigenvalue (T3), a colon-delimited list of tau (T3), dec, inc, confidence ellipse type, and confidence ellipse parameters',
				'validations': ['type("aniso_v")'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_t3'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_eta_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_eta_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_eta_semi_angle'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_zeta_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_zeta_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_zeta_semi_angle'
				}]
			},
			'aniso_perc': {
				'label': 'Anisotropy Percent',
				'group': 'Anisotropy',
				'position': 108,
				'type': 'Number',
				'unit': '%',
				'description': 'Percent anisotropy, 100 * (S1-S3) / (S1+S2+S3)',
				'validations': ['min(0)', 'max(100)'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_percent'
				}]
			},
			'aniso_total': {
				'label': 'Anisotropy Total',
				'group': 'Anisotropy',
				'position': 109,
				'type': 'Number',
				'unit': '%',
				'description': 'Total anisotropy, 100 * (S1-S3) / Mean',
				'validations': ['min(0)', 'max(300)'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_total'
				}]
			},
			'aniso_p': {
				'label': 'Anisotropy P',
				'group': 'Anisotropy',
				'position': 110,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Anisotropy degree, T1/T3',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_p'
				}]
			},
			'aniso_pp': {
				'label': 'Anisotropy P\'',
				'group': 'Anisotropy',
				'position': 111,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1016/0040-1951(81)90110-4'],
				'description': 'Corrected anisotropy',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_pp'
				}]
			},
			'aniso_t': {
				'label': 'Anisotropy T',
				'group': 'Anisotropy',
				'position': 112,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1016/0040-1951(81)90110-4'],
				'description': 'Shape factor',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_t'
				}]
			},
			'aniso_l': {
				'label': 'Anisotropy L',
				'group': 'Anisotropy',
				'position': 113,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Lineation, T1/T2',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_l'
				}]
			},
			'aniso_f': {
				'label': 'Anisotropy F',
				'group': 'Anisotropy',
				'position': 114,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Foliation, T2/T3',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_f'
				}]
			},
			'aniso_ll': {
				'label': 'Anisotropy L\'',
				'group': 'Anisotropy',
				'position': 115,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1130/0016-7606(1977)88<1231:SOFSUA>2.0.CO;2'],
				'description': 'Log lineation, ln(L)',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_ll'
				}]
			},
			'aniso_ff': {
				'label': 'Anisotropy F\'',
				'group': 'Anisotropy',
				'position': 116,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1130/0016-7606(1977)88<1231:SOFSUA>2.0.CO;2'],
				'description': 'Log foliation, ln(F)',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_ff'
				}]
			},
			'aniso_vg': {
				'label': 'Anisotropy Vg',
				'group': 'Anisotropy',
				'position': 117,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Graham\'s V parameter defined by sin(V)=sqrt((K2-K3)/(K1-K3))',
				'notes': 'Fabric is oblate when V > 45 degrees',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_vg'
				}]
			},
			'aniso_fl': {
				'label': 'Anisotropy FL Ratio',
				'group': 'Anisotropy',
				'position': 118,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'F/L',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_fl'
				}]
			},
			'aniso_ftest_quality': {
				'label': 'Anisotropy F Test Quality',
				'group': 'Anisotropy',
				'position': 119,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Indicating if a good (g) or bad (b) data according to the F statistical test for anisotropy',
				'notes': 'Can be left empty. This is the case for many legacy data sets.',
				'validations': ['cv("data_quality")']
			},
			'aniso_ftest': {
				'label': 'Anisotropy F Test',
				'group': 'Anisotropy',
				'position': 120,
				'type': 'Number',
				'unit': '%',
				'description': 'F statistical test for anisotropy',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_ftest'
				}]
			},
			'aniso_ftest12': {
				'label': 'Anisotropy F Test Prolateness',
				'group': 'Anisotropy',
				'position': 121,
				'type': 'Number',
				'unit': '%',
				'description': 'F statistical test for prolateness',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_ftest12'
				}]
			},
			'aniso_ftest23': {
				'label': 'Anisotropy F Test Oblateness',
				'group': 'Anisotropy',
				'position': 122,
				'type': 'Number',
				'unit': '%',
				'description': 'F statistical test for oblateness',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_ftest23'
				}]
			},
			'description': {
				'label': 'Description',
				'group': 'Metadata',
				'position': 123,
				'type': 'String',
				'description': 'Site and result description and comments',
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'site_description'
				}, {
					'table': 'pmag_sites',
					'column': 'site_description'
				}, {
					'table': 'pmag_results',
					'column': 'pmag_result_name'
				}, {
					'table': 'pmag_results',
					'column': 'result_description'
				}, {
					'table': 'rmag_results',
					'column': 'rmag_result_name'
				}, {
					'table': 'rmag_results',
					'column': 'result_description'
				}]
			},
			'rotation_sequence': {
				'label': 'Sequence of Rotations',
				'group': 'Metadata',
				'position': 124,
				'type': 'Matrix',
				'description': 'N by M matrix with N sequential rotations and the length of each row defined by the first element: the rotation type',
				'examples': ['DD:20:124;TP:45:14'],
				'validations': ['matrix(0,3)'],
				'previous_columns': [{
					'table': 'pmag_rotations',
					'column': 'rotation_description'
				}, {
					'table': 'pmag_rotations',
					'column': 'rotation_definition'
				}, {
					'table': 'pmag_rotations',
					'column': 'rotation_lambda'
				}, {
					'table': 'pmag_rotations',
					'column': 'rotation_phi'
				}, {
					'table': 'pmag_rotations',
					'column': 'rotation_omega'
				}]
			},
			'criteria': {
				'label': 'Criteria Names',
				'group': 'Metadata',
				'position': 125,
				'type': 'List',
				'description': 'Colon-delimited list of criteria names',
				'examples': ['MY-MAD', 'MY-APLHA95'],
				'validations': ['in("criteria.criterion")'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'pmag_criteria_codes'
				}, {
					'table': 'pmag_results',
					'column': 'pmag_criteria_codes'
				}, {
					'table': 'rmag_results',
					'column': 'rmag_criteria_codes'
				}]
			},
			'instrument_codes': {
				'label': 'Instrument Codes',
				'group': 'Metadata',
				'position': 126,
				'type': 'List',
				'description': 'Colon-delimited list of instrument codes',
				'validations': ['sv("instrument_code")'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'magic_instrument_codes'
				}, {
					'table': 'rmag_results',
					'column': 'magic_instrument_codes'
				}]
			},
			'software_packages': {
				'label': 'Software Packages',
				'group': 'Metadata',
				'position': 127,
				'type': 'List',
				'description': 'Colon-delimited list of software used for data reduction',
				'examples': ['PmagPy v1.67b', 'FORCinel v1.11'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'magic_software_packages'
				}, {
					'table': 'pmag_results',
					'column': 'magic_software_packages'
				}, {
					'table': 'rmag_results',
					'column': 'magic_software_packages'
				}]
			},
			'external_database_ids': {
				'label': 'External Database IDs',
				'group': 'Metadata',
				'position': 128,
				'type': 'Dictionary',
				'description': 'Dictionary of external databases and IDs where data are used',
				'examples': ['GEOMAGIA50[1435]:CALS7K.2[23]', 'ARCHEO00[2329]', 'ARCHEO00[] if the ID is unknown'],
				'validations': ['cv("database_names")'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'external_database_names'
				}, {
					'table': 'pmag_sites',
					'column': 'external_database_ids'
				}, {
					'table': 'pmag_results',
					'column': 'external_database_names'
				}, {
					'table': 'pmag_results',
					'column': 'external_database_ids'
				}, {
					'table': 'rmag_results',
					'column': 'external_database_names'
				}, {
					'table': 'rmag_results',
					'column': 'external_database_ids'
				}]
			},
			'external_results': {
				'label': 'External Results',
				'group': 'Metadata',
				'position': 129,
				'type': 'Matrix',
				'description': 'List of external values associated with a site',
				'notes': 'Results are in the form of key:value:reference;key2:value2:reference2. Keys are from a controlled vocabulary, values are strings, and references should be a DOI or URL.',
				'examples': ['DELTA-O18-SMOW:4.2:10.1126/science.1059412;DELTA-C13-PDB:0.22:10.1126/science.1059412'],
				'validations': ['cv("external_result")']
			},
			'scientists': {
				'label': 'Research Scientist Names',
				'group': 'Metadata',
				'position': 130,
				'type': 'List',
				'description': 'Colon-delimited list of EarthRef handles or ORCIDs or names and emails for scientists who described the site',
				'examples': ['@user1:@user2:0000-0002-9000-2100:Not A. Member <no.earthref.handle@gmail.com>'],
				'validations': ['type("users")'],
				'previous_columns': [{
					'table': 'er_sites',
					'column': 'er_scientist_mail_names'
				}, {
					'table': 'er_formations',
					'column': 'er_scientist_mail_names'
				}, {
					'table': 'er_members',
					'column': 'er_scientist_mail_names'
				}]
			},
			'analysts': {
				'label': 'Analyst Names',
				'group': 'Metadata',
				'position': 131,
				'type': 'List',
				'description': 'Colon-delimited list of EarthRef handles or ORCIDs or names and emails for analysts',
				'examples': ['@user1:@user2:0000-0002-9000-2100:Not A. Member <no.earthref.handle@gmail.com>'],
				'validations': ['type("users")'],
				'previous_columns': [{
					'table': 'pmag_sites',
					'column': 'er_analyst_mail_names'
				}, {
					'table': 'pmag_results',
					'column': 'er_analyst_mail_names'
				}, {
					'table': 'rmag_results',
					'column': 'er_analyst_mail_names'
				}]
			}
		}
	}

	,
	'samples': {
		'label': 'Samples',
		'position': 4,
		'description': 'Samples from a unique site',
		'notes': 'Interpretations of part of a site or discrete sample of a section of the core',
		'columns': {
			'contribution_id': {
				'label': 'Contribution ID',
				'group': 'Contribution',
				'position': 1,
				'type': 'Integer',
				'description': 'Unique MagIC contribution ID',
				'examples': ['5412'],
				'validations': ['downloadOnly()']
			},
			'row_id': {
				'label': 'Contribution Row ID',
				'group': 'Contribution',
				'position': 2,
				'type': 'Integer',
				'description': 'Unique row ID within a MagIC Contribution',
				'examples': ['743'],
				'validations': ['downloadOnly()']
			},
			'sample': {
				'label': 'Sample Name',
				'group': 'Names',
				'position': 3,
				'type': 'String',
				'description': 'Name for sample',
				'examples': ['SFVP01-03'],
				'validations': ['key()', 'required()'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'er_sample_name'
				}, {
					'table': 'pmag_samples',
					'column': 'er_sample_name'
				}, {
					'table': 'pmag_results',
					'column': 'er_sample_names'
				}, {
					'table': 'rmag_results',
					'column': 'er_sample_names'
				}]
			},
			'site': {
				'label': 'Site Name',
				'group': 'Names',
				'position': 4,
				'type': 'String',
				'description': 'Name for site',
				'examples': ['SFVP01'],
				'validations': ['in("sites.site")', 'requiredUnlessSynthetic()'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'er_site_name'
				}, {
					'table': 'pmag_samples',
					'column': 'er_site_name'
				}, {
					'table': 'pmag_results',
					'column': 'er_site_names'
				}]
			},
			'specimens': {
				'label': 'Specimen Name',
				'group': 'Names',
				'position': 5,
				'type': 'List',
				'description': 'Colon-delimited list of the names of specimens included in the result',
				'examples': ['SFVP01-03a:SFVP01-03b'],
				'validations': ['in("specimens.specimen")'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'er_specimen_names'
				}, {
					'table': 'pmag_results',
					'column': 'er_specimen_names'
				}, {
					'table': 'rmag_results',
					'column': 'er_specimen_names'
				}, {
					'table': 'pmag_samples',
					'column': 'er_synthetic_names'
				}, {
					'table': 'pmag_results',
					'column': 'er_synthetic_names'
				}, {
					'table': 'rmag_results',
					'column': 'er_synthetic_names'
				}]
			},
			'experiments': {
				'label': 'Experiment Name',
				'group': 'Names',
				'position': 6,
				'type': 'List',
				'description': 'Colon-delimited list of the names of experiments included in the result',
				'examples': ['SFVP01-03a-LT-AF-Z:SFVP01-03b-LT-AF-Z'],
				'validations': ['in("measurements.experiment")'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'magic_experiment_names'
				}, {
					'table': 'pmag_results',
					'column': 'magic_experiment_names'
				}, {
					'table': 'rmag_results',
					'column': 'magic_experiment_names'
				}]
			},
			'timestamp': {
				'label': 'Sampling Timestamp',
				'group': 'Sample',
				'position': 7,
				'type': 'Timestamp',
				'description': 'Sampling date and time',
				'notes': 'ISO 8601 date and time (e.g. "yyyy-mm-ddThh:mm:ss.sssZ")',
				'examples': ['2017', '2014-04-21', '1970-01-01T00:00:00', '1969-07-20T22:56:15-04:00'],
				'validations': ['type("date_time")'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_date'
				}, {
					'table': 'er_samples',
					'column': 'sample_time_zone'
				}]
			},
			'igsn': {
				'label': 'Sample IGSN',
				'group': 'Sample',
				'position': 8,
				'type': 'String',
				'description': 'International Geo Sample Number (IGSN) of the sample',
				'examples': ['SIO0A0987', 'SIO001317'],
				'validations': ['type("igsn")'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_igsn'
				}]
			},
			'igsn_parent': {
				'label': 'Parent Sample IGSN',
				'group': 'Sample',
				'position': 9,
				'type': 'String',
				'description': 'International Geo Sample Number (IGSN) of the parent of the sample',
				'examples': ['SIO0A0987', 'SIO001317'],
				'validations': ['type("igsn")']
			},
			'sample_alternatives': {
				'label': 'Sample Name Alternatives',
				'group': 'Sample',
				'position': 10,
				'type': 'List',
				'description': 'Colon-delimited list of alternative names and abbreviations',
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'er_sample_alternatives'
				}]
			},
			'material_type': {
				'label': 'Synthetic Material Type',
				'group': 'Synthetic',
				'position': 11,
				'type': 'String',
				'description': 'Synthetic material type',
				'validations': ['cv("synthetic_type")', 'requiredUnlessNatural()'],
				'previous_columns': [{
					'table': 'er_synthetics',
					'column': 'synthetic_type'
				}]
			},
			'assemblage': {
				'label': 'Synthetic Material Assemblage',
				'group': 'Synthetic',
				'position': 12,
				'type': 'String',
				'description': 'Synthetic material assemblage',
				'validations': ['cv("assemblage")'],
				'previous_columns': [{
					'table': 'er_synthetics',
					'column': 'synthetic_assemblage'
				}]
			},
			'dope_material': {
				'label': 'Synthetic Material Dope',
				'group': 'Synthetic',
				'position': 13,
				'type': 'String',
				'description': 'Synthetic dope material',
				'examples': ['Ti', 'Al', 'Mn', 'Mg'],
				'previous_columns': [{
					'table': 'er_synthetics',
					'column': 'synthetic_dope_material'
				}]
			},
			'institution': {
				'label': 'Synthetic Material Institution',
				'group': 'Synthetic',
				'position': 14,
				'type': 'String',
				'description': 'Name for institution that created the synthetic material',
				'examples': ['IRM', 'SIO'],
				'validations': ['requiredUnlessNatural()'],
				'previous_columns': [{
					'table': 'er_synthetics',
					'column': 'synthetic_institution'
				}]
			},
			'result_type': {
				'label': 'Result Type',
				'group': 'Result',
				'position': 15,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Individual (i): result is from a single specimen, average (a): result is from an average of multiple specimens',
				'validations': ['cv("data_type")'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'data_type'
				}]
			},
			'result_quality': {
				'label': 'Result Quality',
				'group': 'Result',
				'position': 16,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Indicating if good (g) or bad (b) data',
				'notes': 'Can be left empty. This is the case for many legacy data sets.',
				'validations': ['cv("data_quality")', 'recommended()'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_flag'
				}]
			},
			'method_codes': {
				'label': 'Method Codes',
				'group': 'Result',
				'position': 17,
				'type': 'List',
				'description': 'Colon-delimited list of method codes',
				'validations': ['type("method_codes")', 'required()'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'magic_method_codes'
				}, {
					'table': 'pmag_samples',
					'column': 'magic_method_codes'
				}, {
					'table': 'pmag_results',
					'column': 'magic_method_codes'
				}, {
					'table': 'rmag_results',
					'column': 'magic_method_codes'
				}]
			},
			'display_order': {
				'label': 'Display Order',
				'group': 'Result',
				'position': 18,
				'type': 'Number',
				'description': 'Order of the rows for display purposes',
				'notes': 'If not set at upload will be set to the order in the uploaded file. Can be a float of either sign.',
				'examples': ['1', '0', '1.2', '-4.34']
			},
			'citations': {
				'label': 'Citation DOIs',
				'group': 'Result',
				'position': 19,
				'type': 'List',
				'description': 'Colon-delimited list of citation DOIs',
				'examples': ['10.1029/92JB01202', '10.1029/2003GC000635:This study', '"10.1023/A:1015035228810":This study'],
				'validations': ['type("references")', 'required()'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'er_citation_names'
				}, {
					'table': 'pmag_samples',
					'column': 'er_citation_names'
				}, {
					'table': 'pmag_results',
					'column': 'er_citation_names'
				}, {
					'table': 'rmag_results',
					'column': 'er_citation_names'
				}, {
					'table': 'pmag_rotations',
					'column': 'er_citation_names'
				}]
			},
			'geologic_classes': {
				'label': 'Geologic Classes',
				'group': 'Geology',
				'position': 20,
				'type': 'List',
				'description': 'Colon-delimited list of geologic classes',
				'validations': ['cv("class")', 'requiredUnlessSynthetic()'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_class'
				}]
			},
			'geologic_types': {
				'label': 'Sample Material Types',
				'group': 'Geology',
				'position': 21,
				'type': 'List',
				'description': 'Colon-delimited list of sample material types',
				'validations': ['cv("type")', 'requiredUnlessSynthetic()'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_type'
				}]
			},
			'lithologies': {
				'label': 'Lithologies',
				'group': 'Geology',
				'position': 22,
				'type': 'List',
				'description': 'Colon-delimited list of lithologies or archeological classifications',
				'validations': ['cv("lithology")', 'requiredUnlessSynthetic()'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_lithology'
				}]
			},
			'texture': {
				'label': 'Texture',
				'group': 'Geology',
				'position': 23,
				'type': 'String',
				'description': 'Sample texture',
				'validations': ['cv("texture")'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_texture'
				}]
			},
			'alteration_grade': {
				'label': 'Alteration',
				'group': 'Geology',
				'position': 24,
				'type': 'String',
				'description': 'Sample alteration, Grade',
				'validations': ['cv("alteration")'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_alteration'
				}]
			},
			'alteration_type': {
				'label': 'Alteration Type',
				'group': 'Geology',
				'position': 25,
				'type': 'String',
				'description': 'Sample alteration, Type',
				'validations': ['cv("alteration_type")'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_alteration_type'
				}]
			},
			'cooling_rate': {
				'label': 'Cooling Rate Estimate',
				'group': 'Geology',
				'position': 26,
				'type': 'Number',
				'unit': 'C/Ma',
				'description': 'Estimated ancient in-situ cooling rate per Ma',
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_cooling_rate'
				}]
			},
			'orientation_quality': {
				'label': 'Orientation Quality',
				'group': 'Orientation',
				'position': 27,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Indicating if good (g) or bad (b) orientation data',
				'notes': 'Can be left empty. This is the case for many legacy data sets.',
				'validations': ['cv("data_quality")'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_orientation_flag'
				}]
			},
			'azimuth': {
				'label': 'Sample X Direction Azimuth',
				'group': 'Orientation',
				'position': 28,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Azimuth of sample’s x direction measured clockwise from north',
				'notes': 'The x direction of the sample is aligned to the x-axis of the magnetometer when the magnetic moment of the sample is measured. See https://earthref.org/PmagPy/cookbook/#x1-260003.8.1 for a more detailed explanation and diagrams of a variety of orientation conventions. ',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_azimuth'
				}]
			},
			'azimuth_dec_correction': {
				'label': 'Declination Correction',
				'group': 'Orientation',
				'position': 29,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Declination correction applied while determining azimuth of sample',
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_declination_correction'
				}]
			},
			'dip': {
				'label': 'Sample X Direction Dip',
				'group': 'Orientation',
				'position': 30,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Dip of sample’s x direction from the horizontal increasing downward',
				'notes': 'The x direction of the sample is aligned to the x-axis of the magnetometer when the magnetic moment of the sample is measured. See https://earthref.org/PmagPy/cookbook/#x1-260003.8.1 for a more detailed explanation and diagrams of a variety of orientation conventions. ',
				'validations': ['min(-180)', 'max(180)'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_dip'
				}]
			},
			'bed_dip': {
				'label': 'Bedding Dip',
				'group': 'Orientation',
				'position': 31,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Dip of the bedding as measured in the bed dip direction (dip right of strike)',
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_bed_dip'
				}]
			},
			'bed_dip_direction': {
				'label': 'Bedding Dip Direction',
				'group': 'Orientation',
				'position': 32,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Direction of the dip of a paleo-horizontal plane of bedding (strike + 90 degrees)',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_bed_dip_direction'
				}]
			},
			'lat': {
				'label': 'Latitude',
				'group': 'Geography',
				'position': 33,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Sample geographic location, Latitude',
				'validations': ['min(-90)', 'max(90)', 'requiredUnlessSynthetic()'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_lat'
				}, {
					'table': 'pmag_results',
					'column': 'average_lat'
				}]
			},
			'lat_sigma': {
				'label': 'Latitude Sigma',
				'group': 'Geography',
				'position': 34,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Sample geographic location averaging uncertainty, Latitude',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)', 'max(180)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_lat_sigma'
				}]
			},
			'lon': {
				'label': 'Longitude',
				'group': 'Geography',
				'position': 35,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Sample geographic location, Longitude',
				'validations': ['min(0)', 'max(360)', 'requiredUnlessSynthetic()'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_lon'
				}, {
					'table': 'pmag_results',
					'column': 'average_lon'
				}]
			},
			'lon_sigma': {
				'label': 'Longitude Sigma',
				'group': 'Geography',
				'position': 36,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Sample geographic location averaging uncertainty, Longitude',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_lon_sigma'
				}]
			},
			'lat_lon_precision': {
				'label': 'Geographic Precision',
				'group': 'Geography',
				'position': 37,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Sample geographic location, Precision in latitude and longitude',
				'notes': 'Decimal degrees',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_location_precision'
				}]
			},
			'height': {
				'label': 'Stratigraphic Height',
				'group': 'Geography',
				'position': 38,
				'type': 'Number',
				'unit': 'm',
				'description': 'Sample geographic location, Stratigraphic height',
				'notes': 'Positive is up in section or core, while negative is down relative to reference height',
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_height'
				}, {
					'table': 'pmag_results',
					'column': 'average_height'
				}]
			},
			'dir_tilt_correction': {
				'label': 'Direction Tilt Correction',
				'group': 'Direction',
				'position': 39,
				'type': 'Number',
				'unit': '%',
				'description': 'Percentage tilt correction applied to the data',
				'notes': 'Correction between geographic (0%) and stratigraphic (100%); unoriented (-1%); partially oriented to horizontal only (-2%); unknown(-3%) - Use 0 for geographic coordinates (i.e. no stratigraphic correction) and 100 for stratigraphic coordinates (i.e. data has been corrected back to horizontal). Values inbetween can be used to indicate partially corrected amounts.',
				'examples': ['0', '100', '-1', '-2', '-3'],
				'validations': ['min(-3)', 'max(100)'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_tilt_correction'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_correction'
				}]
			},
			'dir_dec': {
				'label': 'Direction Declination',
				'group': 'Direction',
				'position': 40,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Sample direction in coordinates specified by tilt correction, Declination',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_dec'
				}, {
					'table': 'pmag_results',
					'column': 'average_dec'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_dec_corr'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_dec_uncorr'
				}]
			},
			'dir_inc': {
				'label': 'Direction Inclination',
				'group': 'Direction',
				'position': 41,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Sample direction in coordinates specified by tilt correction, Inclination',
				'validations': ['min(-90)', 'max(90)'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_inc'
				}, {
					'table': 'pmag_results',
					'column': 'average_inc'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_inc_corr'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_inc_uncorr'
				}]
			},
			'dir_alpha95': {
				'label': 'Direction Alpha 95%',
				'group': 'Direction',
				'position': 42,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Sample direction in coordinates specified by tilt correction, Fisher circle',
				'notes': 'Confidence Level = 95%',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_alpha95'
				}, {
					'table': 'pmag_results',
					'column': 'average_alpha95'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_alpha95_corr'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_alpha95_uncorr'
				}]
			},
			'dir_r': {
				'label': 'Direction R',
				'group': 'Direction',
				'position': 43,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Sample direction in coordinates specified by tilt correction, Resultant Fisher vector',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_r'
				}, {
					'table': 'pmag_results',
					'column': 'average_r'
				}]
			},
			'dir_k': {
				'label': 'Direction K',
				'group': 'Direction',
				'position': 44,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Sample direction in coordinates specified by tilt correction, Fisher\'s dispersion parameter Kappa',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_k'
				}, {
					'table': 'pmag_results',
					'column': 'average_k'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_k_corr'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_k_uncorr'
				}]
			},
			'dir_k_ratio': {
				'label': 'Direction Tilt K Ratio',
				'group': 'Direction',
				'position': 45,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Comparison of Fisher dispersion K after and before tilt correction',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'tilt_k_ratio'
				}]
			},
			'dir_n_specimens': {
				'label': 'Direction N Specimens',
				'group': 'Direction',
				'position': 46,
				'type': 'Integer',
				'description': 'Number of specimens included in directional calculations',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_n'
				}, {
					'table': 'pmag_results',
					'column': 'average_n'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_n'
				}]
			},
			'dir_n_specimens_lines': {
				'label': 'Direction Tilt Corrected N Specimens from Best-Fit Lines',
				'group': 'Direction',
				'position': 47,
				'type': 'Integer',
				'description': 'Number of specimens included in directional calculations based on best-fit lines',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_n_lines'
				}]
			},
			'dir_n_specimens_planes': {
				'label': 'Direction Tilt Corrected N Specimens from Best-Fit Planes',
				'group': 'Direction',
				'position': 48,
				'type': 'Integer',
				'description': 'Number of specimens included in directional calculations based on best-fit planes',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_n_planes'
				}]
			},
			'dir_n_measurements': {
				'label': 'Direction N Measurements',
				'group': 'Direction',
				'position': 49,
				'type': 'Integer',
				'description': 'Number of specimens included in directional calculations',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_nn'
				}]
			},
			'dir_comp_name': {
				'label': 'Direction Component Name',
				'group': 'Direction',
				'position': 50,
				'type': 'String',
				'description': 'Sample direction component name',
				'examples': ['Characteristic', 'VRM', 'Overprint', 'A', 'B', 'C'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_comp_name'
				}, {
					'table': 'pmag_samples',
					'column': 'sample_comp_nmb'
				}]
			},
			'dir_n_comps': {
				'label': 'Direction N Components',
				'group': 'Direction',
				'position': 51,
				'type': 'Integer',
				'description': 'Total number of sample magnetic components',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_comp_n'
				}]
			},
			'dir_polarity': {
				'label': 'Direction Polarity',
				'group': 'Direction',
				'position': 52,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Sample direction polarity is normal (n), reversed (r), transitional (t), excursion (e) or intermediate (i)',
				'validations': ['cv("polarity")'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_polarity'
				}]
			},
			'dir_nrm_origin': {
				'label': 'Direction NRM Origin',
				'group': 'Direction',
				'position': 53,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Origin of the sample direction NRM is primary (p) or secondary (s)',
				'validations': ['cv("nrm")'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_nrm'
				}]
			},
			'magn_volume': {
				'label': 'Magnetization Volume',
				'group': 'Magnetization',
				'position': 54,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Measured intensity of magnetization, Volume normalized',
				'validations': ['min(-1000000)', 'max(1000000)'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_magn_volume'
				}]
			},
			'magn_mass': {
				'label': 'Magnetization Mass',
				'group': 'Magnetization',
				'position': 55,
				'type': 'Number',
				'unit': 'Am^2/kg',
				'description': 'Measured intensity of magnetization, Mass normalized',
				'validations': ['min(-200)', 'max(200)'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_magn_mass'
				}]
			},
			'int_abs': {
				'label': 'Absolute Paleointensity',
				'group': 'Paleointensity',
				'position': 56,
				'type': 'Number',
				'unit': 'T',
				'description': 'Absolute field strength',
				'validations': ['min(0)', 'max(0.01)', 'requiredIf("int_abs_sigma")', 'requiredIf("int_abs_sigma_perc")'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_int'
				}, {
					'table': 'pmag_results',
					'column': 'average_int'
				}]
			},
			'int_abs_sigma': {
				'label': 'Absolute Paleointensity Sigma',
				'group': 'Paleointensity',
				'position': 57,
				'type': 'Number',
				'unit': 'T',
				'description': 'Absolute field strength, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)', 'max(0.01)'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_int_sigma'
				}, {
					'table': 'pmag_results',
					'column': 'average_int_sigma'
				}]
			},
			'int_abs_sigma_perc': {
				'label': 'Absolute Paleointensity Sigma %',
				'group': 'Paleointensity',
				'position': 58,
				'type': 'Number',
				'unit': '%',
				'description': 'Absolute field strength, Uncertainty in percent',
				'validations': ['min(0)', 'max(100)'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_int_sigma_perc'
				}, {
					'table': 'pmag_results',
					'column': 'average_int_sigma_perc'
				}]
			},
			'int_rel': {
				'label': 'Relative Paleointensity',
				'group': 'Paleointensity',
				'position': 59,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength',
				'validations': ['requiredIf("int_rel_sigma")', 'requiredIf("int_rel_sigma_perc")'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_int_rel'
				}, {
					'table': 'pmag_results',
					'column': 'average_int_rel'
				}]
			},
			'int_rel_sigma': {
				'label': 'Relative Paleointensity Sigma',
				'group': 'Paleointensity',
				'position': 60,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_int_rel_sigma'
				}, {
					'table': 'pmag_results',
					'column': 'average_int_rel_sigma'
				}]
			},
			'int_rel_sigma_perc': {
				'label': 'Relative Paleointensity Sigma %',
				'group': 'Paleointensity',
				'position': 61,
				'type': 'Number',
				'unit': '%',
				'description': 'Relative field strength, Uncertainty in percent',
				'validations': ['min(0)', 'max(100)'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_int_rel_sigma_perc'
				}, {
					'table': 'pmag_results',
					'column': 'average_int_rel_sigma_perc'
				}]
			},
			'int_rel_ARM': {
				'label': 'ARM Normalized Relative Paleointensity',
				'group': 'Paleointensity',
				'position': 62,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength estimated with NRM normalized by laboratory ARM',
				'validations': ['requiredIf("int_rel_ARM_sigma")', 'requiredIf("int_rel_ARM_sigma_perc")']
			},
			'int_rel_ARM_sigma': {
				'label': 'ARM Normalized Relative Paleointensity Sigma',
				'group': 'Paleointensity',
				'position': 63,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength estimated with NRM normalized by laboratory ARM, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)']
			},
			'int_rel_ARM_sigma_perc': {
				'label': 'ARM Normalized Relative Paleointensity Sigma %',
				'group': 'Paleointensity',
				'position': 64,
				'type': 'Number',
				'unit': '%',
				'description': 'Relative field strength estimated with NRM normalized by laboratory ARM, Uncertainty in percent',
				'validations': ['min(0)', 'max(100)']
			},
			'int_rel_IRM': {
				'label': 'IRM Normalized Relative Paleointensity',
				'group': 'Paleointensity',
				'position': 65,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength estimated with NRM normalized by laboratory IRM',
				'validations': ['requiredIf("int_rel_IRM_sigma")', 'requiredIf("int_rel_IRM_sigma_perc")']
			},
			'int_rel_IRM_sigma': {
				'label': 'IRM Normalized Relative Paleointensity Sigma',
				'group': 'Paleointensity',
				'position': 66,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength estimated with NRM normalized by laboratory IRM, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)']
			},
			'int_rel_IRM_sigma_perc': {
				'label': 'IRM Normalized Relative Paleointensity Sigma %',
				'group': 'Paleointensity',
				'position': 67,
				'type': 'Number',
				'unit': '%',
				'description': 'Relative field strength estimated with NRM normalized by laboratory IRM, Uncertainty in percent',
				'validations': ['min(0)', 'max(100)']
			},
			'int_rel_chi': {
				'label': 'Susceptibility Normalized Relative Paleointensity',
				'group': 'Paleointensity',
				'position': 68,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength estimated with NRM normalized by susceptibility',
				'validations': ['requiredIf("int_rel_chi_sigma")', 'requiredIf("int_rel_chi_sigma_perc")']
			},
			'int_rel_chi_sigma': {
				'label': 'Susceptibility Normalized Relative Paleointensity Sigma',
				'group': 'Paleointensity',
				'position': 69,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength estimated with NRM normalized by susceptibility, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)']
			},
			'int_rel_chi_sigma_perc': {
				'label': 'Susceptibility Normalized Relative Paleointensity Sigma %',
				'group': 'Paleointensity',
				'position': 70,
				'type': 'Number',
				'unit': '%',
				'description': 'Relative field strength estimated with NRM normalized by susceptibility, Uncertainty in percent',
				'validations': ['min(0)', 'max(100)']
			},
			'int_n_specimens': {
				'label': 'Paleointensity N Specimens',
				'group': 'Paleointensity',
				'position': 71,
				'type': 'Integer',
				'description': 'Number of specimens included in intensity calculations',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'sample_int_n'
				}, {
					'table': 'pmag_results',
					'column': 'average_int_n'
				}]
			},
			'int_n_measurements': {
				'label': 'Paleointensity N Measurements',
				'group': 'Paleointensity',
				'position': 72,
				'type': 'Integer',
				'description': 'Number of measurements included in intensity calculations',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_int_nn'
				}]
			},
			'int_corr_aniso_mean': {
				'label': 'Paleointensity Anisotropy Correction Factor',
				'group': 'Paleointensity',
				'position': 73,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Mean of paleointensity anisotropy correction factors for all specimens from the same mother sample'
			},
			'aniso_type': {
				'label': 'Anisotropy Type',
				'group': 'Anisotropy',
				'position': 74,
				'type': 'String',
				'description': 'Anisotropy calculation type',
				'examples': ['AMS', 'AARM', 'AIRM', 'ATRM'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_type'
				}]
			},
			'aniso_tilt_correction': {
				'label': 'Anisotropy Tilt Correction',
				'group': 'Anisotropy',
				'position': 75,
				'type': 'Number',
				'unit': '%',
				'description': 'Percentage tilt correction applied to the data',
				'notes': 'Correction between geographic (0%) and stratigraphic (100%); unoriented (-1%); partially oriented to horizontal only (-2%); unknown(-3%) - Use 0 for geographic coordinates (i.e. no stratigraphic correction) and 100 for stratigraphic coordinates (i.e. data has been corrected back to horizontal). Values inbetween can be used to indicate partially corrected amounts.',
				'examples': ['0', '100', '-1', '-2', '-3'],
				'validations': ['min(-3)', 'max(100)'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'tilt_correction'
				}]
			},
			'aniso_v1': {
				'label': 'Anisotropy V1',
				'group': 'Anisotropy',
				'position': 76,
				'type': 'Matrix',
				'description': 'Anisotropy eigenparameters for the maximum eigenvalue (T1), a colon-delimited list of tau (T1), dec, inc, confidence ellipse type, and confidence ellipse parameters',
				'validations': ['type("aniso_v")'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_t1'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_eta_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_eta_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_eta_semi_angle'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_zeta_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_zeta_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_zeta_semi_angle'
				}]
			},
			'aniso_v2': {
				'label': 'Anisotropy V2',
				'group': 'Anisotropy',
				'position': 77,
				'type': 'Matrix',
				'description': 'Anisotropy eigenparameters for the intermediate eigenvalue (T2), a colon-delimited list of tau (T2), dec, inc, confidence ellipse type, and confidence ellipse parameters',
				'validations': ['type("aniso_v")'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_t2'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_eta_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_eta_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_eta_semi_angle'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_zeta_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_zeta_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_zeta_semi_angle'
				}]
			},
			'aniso_v3': {
				'label': 'Anisotropy V3',
				'group': 'Anisotropy',
				'position': 78,
				'type': 'Matrix',
				'description': 'Anisotropy eigenparameters for the minimum eigenvalue (T3), a colon-delimited list of tau (T3), dec, inc, confidence ellipse type, and confidence ellipse parameters',
				'validations': ['type("aniso_v")'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_t3'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_eta_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_eta_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_eta_semi_angle'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_zeta_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_zeta_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_zeta_semi_angle'
				}]
			},
			'aniso_perc': {
				'label': 'Anisotropy Percent',
				'group': 'Anisotropy',
				'position': 79,
				'type': 'Number',
				'unit': '%',
				'description': 'Percent anisotropy, 100 * (S1-S3) / (S1+S2+S3)',
				'validations': ['min(0)', 'max(100)'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_percent'
				}]
			},
			'aniso_total': {
				'label': 'Anisotropy Total',
				'group': 'Anisotropy',
				'position': 80,
				'type': 'Number',
				'unit': '%',
				'description': 'Total anisotropy, 100 * (S1-S3) / Mean',
				'validations': ['min(0)', 'max(300)'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_total'
				}]
			},
			'aniso_p': {
				'label': 'Anisotropy P',
				'group': 'Anisotropy',
				'position': 81,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Anisotropy degree, T1/T3',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_p'
				}]
			},
			'aniso_pp': {
				'label': 'Anisotropy P\'',
				'group': 'Anisotropy',
				'position': 82,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1016/0040-1951(81)90110-4'],
				'description': 'Corrected anisotropy',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_pp'
				}]
			},
			'aniso_t': {
				'label': 'Anisotropy T',
				'group': 'Anisotropy',
				'position': 83,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1016/0040-1951(81)90110-4'],
				'description': 'Shape factor',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_t'
				}]
			},
			'aniso_l': {
				'label': 'Anisotropy L',
				'group': 'Anisotropy',
				'position': 84,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Lineation, T1/T2',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_l'
				}]
			},
			'aniso_f': {
				'label': 'Anisotropy F',
				'group': 'Anisotropy',
				'position': 85,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Foliation, T2/T3',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_f'
				}]
			},
			'aniso_ll': {
				'label': 'Anisotropy L\'',
				'group': 'Anisotropy',
				'position': 86,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1130/0016-7606(1977)88<1231:SOFSUA>2.0.CO;2'],
				'description': 'Log lineation, ln(L)',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_ll'
				}]
			},
			'aniso_ff': {
				'label': 'Anisotropy F\'',
				'group': 'Anisotropy',
				'position': 87,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1130/0016-7606(1977)88<1231:SOFSUA>2.0.CO;2'],
				'description': 'Log foliation, ln(F)',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_ff'
				}]
			},
			'aniso_vg': {
				'label': 'Anisotropy Vg',
				'group': 'Anisotropy',
				'position': 88,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Graham\'s V parameter defined by sin(V)=sqrt((K2-K3)/(K1-K3))',
				'notes': 'Fabric is oblate when V > 45 degrees',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_vg'
				}]
			},
			'aniso_fl': {
				'label': 'Anisotropy FL Ratio',
				'group': 'Anisotropy',
				'position': 89,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'F/L',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_fl'
				}]
			},
			'aniso_ftest_quality': {
				'label': 'Anisotropy F Test Quality',
				'group': 'Anisotropy',
				'position': 90,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Indicating if a good (g) or bad (b) data according to the F statistical test for anisotropy',
				'notes': 'Can be left empty. This is the case for many legacy data sets.',
				'validations': ['cv("data_quality")']
			},
			'aniso_ftest': {
				'label': 'Anisotropy F Test',
				'group': 'Anisotropy',
				'position': 91,
				'type': 'Number',
				'unit': '%',
				'description': 'F statistical test for anisotropy',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_ftest'
				}]
			},
			'aniso_ftest12': {
				'label': 'Anisotropy F Test Prolateness',
				'group': 'Anisotropy',
				'position': 92,
				'type': 'Number',
				'unit': '%',
				'description': 'F statistical test for prolateness',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_ftest12'
				}]
			},
			'aniso_ftest23': {
				'label': 'Anisotropy F Test Oblateness',
				'group': 'Anisotropy',
				'position': 93,
				'type': 'Number',
				'unit': '%',
				'description': 'F statistical test for oblateness',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_ftest23'
				}]
			},
			'description': {
				'label': 'Description',
				'group': 'Metadata',
				'position': 94,
				'type': 'String',
				'description': 'Sample and result description and comments',
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'sample_description'
				}, {
					'table': 'pmag_samples',
					'column': 'sample_description'
				}, {
					'table': 'pmag_results',
					'column': 'pmag_result_name'
				}, {
					'table': 'pmag_results',
					'column': 'result_description'
				}, {
					'table': 'rmag_results',
					'column': 'rmag_result_name'
				}, {
					'table': 'rmag_results',
					'column': 'result_description'
				}]
			},
			'rotation_sequence': {
				'label': 'Sequence of Rotations',
				'group': 'Metadata',
				'position': 95,
				'type': 'Matrix',
				'description': 'N by M matrix with N sequential rotations and the length of each row defined by the first element: the rotation type',
				'examples': ['DD:20:124;TP:45:14'],
				'validations': ['matrix(0,3)'],
				'previous_columns': [{
					'table': 'pmag_rotations',
					'column': 'rotation_description'
				}, {
					'table': 'pmag_rotations',
					'column': 'rotation_definition'
				}, {
					'table': 'pmag_rotations',
					'column': 'rotation_lambda'
				}, {
					'table': 'pmag_rotations',
					'column': 'rotation_phi'
				}, {
					'table': 'pmag_rotations',
					'column': 'rotation_omega'
				}]
			},
			'criteria': {
				'label': 'Criteria Names',
				'group': 'Metadata',
				'position': 96,
				'type': 'List',
				'description': 'Colon-delimited list of criteria names',
				'examples': ['MY-MAD', 'MY-APLHA95'],
				'validations': ['in("criteria.criterion")'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'pmag_criteria_codes'
				}, {
					'table': 'pmag_results',
					'column': 'pmag_criteria_codes'
				}, {
					'table': 'rmag_results',
					'column': 'rmag_criteria_codes'
				}]
			},
			'instrument_codes': {
				'label': 'Instrument Codes',
				'group': 'Metadata',
				'position': 97,
				'type': 'List',
				'description': 'Colon-delimited list of instrument codes',
				'validations': ['sv("instrument_code")'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'magic_instrument_codes'
				}, {
					'table': 'rmag_results',
					'column': 'magic_instrument_codes'
				}]
			},
			'software_packages': {
				'label': 'Software Packages',
				'group': 'Metadata',
				'position': 98,
				'type': 'List',
				'description': 'Colon-delimited list of software used for data reduction',
				'examples': ['PmagPy v1.67b', 'FORCinel v1.11'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'magic_software_packages'
				}, {
					'table': 'pmag_results',
					'column': 'magic_software_packages'
				}, {
					'table': 'rmag_results',
					'column': 'magic_software_packages'
				}]
			},
			'external_database_ids': {
				'label': 'External Database IDs',
				'group': 'Metadata',
				'position': 99,
				'type': 'Dictionary',
				'description': 'Dictionary of external databases and IDs where data are used',
				'examples': ['GEOMAGIA50[1435]:CALS7K.2[23]', 'ARCHEO00[2329]', 'ARCHEO00[] if the ID is unknown'],
				'validations': ['cv("database_names")'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'external_database_names'
				}, {
					'table': 'pmag_samples',
					'column': 'external_database_ids'
				}, {
					'table': 'pmag_results',
					'column': 'external_database_names'
				}, {
					'table': 'pmag_results',
					'column': 'external_database_ids'
				}, {
					'table': 'rmag_results',
					'column': 'external_database_names'
				}, {
					'table': 'rmag_results',
					'column': 'external_database_ids'
				}]
			},
			'scientists': {
				'label': 'Research Scientist Names',
				'group': 'Metadata',
				'position': 100,
				'type': 'List',
				'description': 'Colon-delimited list of EarthRef handles or ORCIDs or names and emails for scientists who described the sample',
				'examples': ['@user1:@user2:0000-0002-9000-2100:Not A. Member <no.earthref.handle@gmail.com>'],
				'validations': ['type("users")'],
				'previous_columns': [{
					'table': 'er_samples',
					'column': 'er_scientist_mail_names'
				}]
			},
			'analysts': {
				'label': 'Analyst Names',
				'group': 'Metadata',
				'position': 101,
				'type': 'List',
				'description': 'Colon-delimited list of EarthRef handles or ORCIDs or names and emails for analysts',
				'examples': ['@user1:@user2:0000-0002-9000-2100:Not A. Member <no.earthref.handle@gmail.com>'],
				'validations': ['type("users")'],
				'previous_columns': [{
					'table': 'pmag_samples',
					'column': 'er_analyst_mail_names'
				}, {
					'table': 'pmag_results',
					'column': 'er_analyst_mail_names'
				}, {
					'table': 'rmag_results',
					'column': 'er_analyst_mail_names'
				}]
			}
		}
	}

	,
	'specimens': {
		'label': 'Specimens',
		'position': 5,
		'description': 'Sub-samples being measured',
		'notes': 'Interpretations of measurements, depth position of measurements in the core section',
		'columns': {
			'contribution_id': {
				'label': 'Contribution ID',
				'group': 'Contribution',
				'position': 1,
				'type': 'Integer',
				'description': 'Unique MagIC contribution ID',
				'examples': ['5412'],
				'validations': ['downloadOnly()']
			},
			'row_id': {
				'label': 'Contribution Row ID',
				'group': 'Contribution',
				'position': 2,
				'type': 'Integer',
				'description': 'Unique row ID within a MagIC Contribution',
				'examples': ['743'],
				'validations': ['downloadOnly()']
			},
			'specimen': {
				'label': 'Specimen Name',
				'group': 'Names',
				'position': 3,
				'type': 'String',
				'description': 'Name for specimen',
				'examples': ['SFVP01-01a'],
				'validations': ['key()', 'required()'],
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'er_specimen_name'
				}, {
					'table': 'er_fossils',
					'column': 'er_specimen_name'
				}, {
					'table': 'er_minerals',
					'column': 'er_specimen_name'
				}, {
					'table': 'pmag_specimens',
					'column': 'er_specimen_name'
				}, {
					'table': 'pmag_results',
					'column': 'er_specimen_names'
				}, {
					'table': 'er_synthetics',
					'column': 'er_specimen_name'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'er_specimen_name'
				}, {
					'table': 'rmag_hysteresis',
					'column': 'er_specimen_name'
				}, {
					'table': 'rmag_remanence',
					'column': 'er_specimen_name'
				}, {
					'table': 'rmag_susceptibility',
					'column': 'er_specimen_name'
				}, {
					'table': 'rmag_results',
					'column': 'er_specimen_names'
				}, {
					'table': 'pmag_specimens',
					'column': 'er_synthetic_name'
				}, {
					'table': 'pmag_results',
					'column': 'er_synthetic_names'
				}, {
					'table': 'er_synthetics',
					'column': 'er_synthetic_name'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'er_synthetic_name'
				}, {
					'table': 'rmag_hysteresis',
					'column': 'er_synthetic_name'
				}, {
					'table': 'rmag_remanence',
					'column': 'er_synthetic_name'
				}, {
					'table': 'rmag_susceptibility',
					'column': 'er_synthetic_name'
				}, {
					'table': 'rmag_results',
					'column': 'er_synthetic_names'
				}]
			},
			'sample': {
				'label': 'Sample Name',
				'group': 'Names',
				'position': 4,
				'type': 'String',
				'description': 'Name for sample',
				'examples': ['SFVP01-01'],
				'validations': ['in("samples.sample")', 'required()'],
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'er_sample_name'
				}, {
					'table': 'pmag_specimens',
					'column': 'er_sample_name'
				}, {
					'table': 'pmag_results',
					'column': 'er_sample_names'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'er_sample_name'
				}, {
					'table': 'rmag_hysteresis',
					'column': 'er_sample_name'
				}, {
					'table': 'rmag_remanence',
					'column': 'er_sample_name'
				}, {
					'table': 'rmag_susceptibility',
					'column': 'er_sample_name'
				}, {
					'table': 'rmag_results',
					'column': 'er_sample_names'
				}, {
					'table': 'er_synthetics',
					'column': 'er_sample_name'
				}, {
					'table': 'er_synthetics',
					'column': 'synthetic_parent_sample'
				}]
			},
			'experiments': {
				'label': 'Experiment Names',
				'group': 'Names',
				'position': 5,
				'type': 'List',
				'description': 'Colon-delimited list of the names of experiments included in the result',
				'examples': ['SFVP01-01a-LT-AF-Z:SFVP01-01a-LT-T-Z'],
				'validations': ['in("measurements.experiment")'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'magic_experiment_names'
				}, {
					'table': 'pmag_results',
					'column': 'magic_experiment_names'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'magic_experiment_names'
				}, {
					'table': 'rmag_hysteresis',
					'column': 'magic_experiment_names'
				}, {
					'table': 'rmag_remanence',
					'column': 'magic_experiment_names'
				}, {
					'table': 'rmag_susceptibility',
					'column': 'magic_experiment_names'
				}, {
					'table': 'rmag_results',
					'column': 'magic_experiment_names'
				}]
			},
			'volume': {
				'label': 'Volume',
				'group': 'Specimen',
				'position': 6,
				'type': 'Number',
				'unit': 'm^3',
				'description': 'Specimen volume',
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'specimen_volume'
				}, {
					'table': 'er_synthetics',
					'column': 'synthetic_volume'
				}, {
					'table': 'er_fossils',
					'column': 'fossil_volume'
				}, {
					'table': 'er_minerals',
					'column': 'mineral_volume'
				}]
			},
			'weight': {
				'label': 'Weight',
				'group': 'Specimen',
				'position': 7,
				'type': 'Number',
				'unit': 'kg',
				'description': 'Specimen weight',
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'specimen_weight'
				}, {
					'table': 'er_synthetics',
					'column': 'synthetic_weight'
				}, {
					'table': 'er_fossils',
					'column': 'fossil_weight'
				}, {
					'table': 'er_minerals',
					'column': 'mineral_weight'
				}]
			},
			'density': {
				'label': 'Density',
				'group': 'Specimen',
				'position': 8,
				'type': 'Number',
				'unit': 'kg/m^3',
				'description': 'Specimen density',
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'specimen_density'
				}, {
					'table': 'er_synthetics',
					'column': 'synthetic_density'
				}, {
					'table': 'er_fossils',
					'column': 'fossil_density'
				}, {
					'table': 'er_minerals',
					'column': 'mineral_density'
				}]
			},
			'size': {
				'label': 'Grain Size',
				'group': 'Specimen',
				'position': 9,
				'type': 'String',
				'description': 'Specimen grain size fraction',
				'examples': ['25-125 µm', '250-500 µm'],
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'specimen_size'
				}, {
					'table': 'er_synthetics',
					'column': 'synthetic_size'
				}, {
					'table': 'er_minerals',
					'column': 'mineral_size'
				}]
			},
			'shape': {
				'label': 'Grain Shape',
				'group': 'Specimen',
				'position': 10,
				'type': 'String',
				'description': 'Specimen grain shape',
				'examples': ['Cube', 'Cylinder', 'Single Crystal', 'Chip'],
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'specimen_shape'
				}, {
					'table': 'er_synthetics',
					'column': 'synthetic_shape'
				}, {
					'table': 'er_fossils',
					'column': 'fossil_shape'
				}, {
					'table': 'er_minerals',
					'column': 'mineral_shape'
				}]
			},
			'igsn': {
				'label': 'Specimen IGSN',
				'group': 'Specimen',
				'position': 11,
				'type': 'String',
				'description': 'International Geo Sample Number (IGSN) for the specimen',
				'examples': ['SIO0A0987', 'SIO001317'],
				'validations': ['type("igsn")'],
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'specimen_igsn'
				}, {
					'table': 'er_synthetics',
					'column': 'synthetic_igsn'
				}, {
					'table': 'er_fossils',
					'column': 'fossil_igsn'
				}, {
					'table': 'er_minerals',
					'column': 'mineral_igsn'
				}]
			},
			'igsn_parent': {
				'label': 'Parent Specimen IGSN ',
				'group': 'Specimen',
				'position': 12,
				'type': 'String',
				'description': 'International Geo Sample Number (IGSN) for the parent of the specimen if applicable.',
				'examples': ['SIO0A0987', 'SIO001317'],
				'validations': ['type("igsn")']
			},
			'specimen_alternatives': {
				'label': 'Specimen Name Alternatives',
				'group': 'Specimen',
				'position': 13,
				'type': 'List',
				'description': 'Colon-delimited list of alternative names and abbreviations',
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'er_specimen_alternatives'
				}]
			},
			'synthetic_alternatives': {
				'label': 'Synthetic Specimen Name Alternatives',
				'group': 'Synthetic',
				'position': 14,
				'type': 'List',
				'description': 'Colon-delimited list of alternative names and abbreviations',
				'previous_columns': [{
					'table': 'er_synthetics',
					'column': 'er_synthetic_alternatives'
				}]
			},
			'result_quality': {
				'label': 'Result Quality',
				'group': 'Result',
				'position': 15,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Indicating if good (g) or bad (b) data',
				'notes': 'Can be left empty. This is the case for many legacy data sets.',
				'validations': ['cv("data_quality")', 'recommended()'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_flag'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'anisotropy_flag'
				}, {
					'table': 'rmag_hysteresis',
					'column': 'hysteresis_flag'
				}, {
					'table': 'rmag_remanence',
					'column': 'remanence_flag'
				}, {
					'table': 'rmag_susceptibility',
					'column': 'susceptibility_flag'
				}]
			},
			'method_codes': {
				'label': 'Method Codes',
				'group': 'Result',
				'position': 16,
				'type': 'List',
				'description': 'Colon-delimited list of method codes',
				'validations': ['type("method_codes")', 'required()'],
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'magic_method_codes'
				}, {
					'table': 'er_fossils',
					'column': 'magic_method_codes'
				}, {
					'table': 'er_minerals',
					'column': 'magic_method_codes'
				}, {
					'table': 'pmag_specimens',
					'column': 'magic_method_codes'
				}, {
					'table': 'pmag_results',
					'column': 'magic_method_codes'
				}, {
					'table': 'er_synthetics',
					'column': 'magic_method_codes'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'magic_method_codes'
				}, {
					'table': 'rmag_hysteresis',
					'column': 'magic_method_codes'
				}, {
					'table': 'rmag_remanence',
					'column': 'magic_method_codes'
				}, {
					'table': 'rmag_susceptibility',
					'column': 'magic_method_codes'
				}, {
					'table': 'rmag_results',
					'column': 'magic_method_codes'
				}]
			},
			'display_order': {
				'label': 'Display Order',
				'group': 'Result',
				'position': 17,
				'type': 'Number',
				'description': 'Order of the rows for display purposes. If not set at upload will be set to the order in the uploaded file. Can be a float of either sign.',
				'examples': ['1', '0', '1.2', '-4.34']
			},
			'citations': {
				'label': 'Citation DOIs',
				'group': 'Result',
				'position': 18,
				'type': 'List',
				'description': 'Colon-delimited list of citation DOIs',
				'examples': ['10.1029/92JB01202', '10.1029/2003GC000635:This study', '"10.1023/A:1015035228810":This study'],
				'validations': ['type("references")', 'required()'],
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'er_citation_names'
				}, {
					'table': 'er_fossils',
					'column': 'er_citation_names'
				}, {
					'table': 'er_minerals',
					'column': 'er_citation_names'
				}, {
					'table': 'pmag_specimens',
					'column': 'er_citation_names'
				}, {
					'table': 'pmag_results',
					'column': 'er_citation_names'
				}, {
					'table': 'pmag_rotations',
					'column': 'er_citation_names'
				}, {
					'table': 'er_synthetics',
					'column': 'er_citation_names'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'er_citation_names'
				}, {
					'table': 'rmag_hysteresis',
					'column': 'er_citation_names'
				}, {
					'table': 'rmag_remanence',
					'column': 'er_citation_names'
				}, {
					'table': 'rmag_susceptibility',
					'column': 'er_citation_names'
				}, {
					'table': 'rmag_results',
					'column': 'er_citation_names'
				}]
			},
			'meas_step_min': {
				'label': 'Measurement Step Minimum',
				'group': 'Measurement Parameters',
				'position': 19,
				'type': 'Number',
				'unit': 'Custom',
				'description': 'The lower bound for the parameter varied during the experiment',
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'measurement_step_min'
				}]
			},
			'meas_step_max': {
				'label': 'Measurement Step Maximum',
				'group': 'Measurement Parameters',
				'position': 20,
				'type': 'Number',
				'unit': 'Custom',
				'description': 'The upper bound for the parameter varied during the experiment',
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'measurement_step_max'
				}]
			},
			'meas_step_unit': {
				'label': 'Measurement Step Unit',
				'group': 'Measurement Parameters',
				'position': 21,
				'type': 'String',
				'description': 'Unit used for the parameter varied during the experiment',
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'measurement_step_unit'
				}]
			},
			'meas_orient_theta': {
				'label': 'Measurement Orientation Theta',
				'group': 'Measurement Parameters',
				'position': 22,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Orientation of specimen in magnetometer',
				'notes': 'Angle between the specimen x-y plane and the field direction. Positive toward the positive z direction.',
				'validations': ['min(-90)', 'max(90)'],
				'previous_columns': [{
					'table': 'rmag_hysteresis',
					'column': 'measurement_orient_theta'
				}, {
					'table': 'rmag_remanence',
					'column': 'measurement_orient_theta'
				}]
			},
			'meas_orient_phi': {
				'label': 'Measurement Orientation Phi',
				'group': 'Measurement Parameters',
				'position': 23,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Orientation of specimen in magnetometer',
				'notes': 'Angle of the field direction when projected into the x-y plane. Positive x-axis is 0 and increasing toward the positive y-axis.',
				'examples': ['K', 'C', 'T', 'mT', 'W', 'mW'],
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'rmag_hysteresis',
					'column': 'measurement_orient_phi'
				}, {
					'table': 'rmag_remanence',
					'column': 'measurement_orient_phi'
				}]
			},
			'meas_temp': {
				'label': 'Measurement Temperature',
				'group': 'Measurement Parameters',
				'position': 24,
				'type': 'Number',
				'unit': 'K',
				'description': 'Temperature',
				'notes': 'Temperature at which the measurement was made. Room temperature is 293.',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'rmag_hysteresis',
					'column': 'measurement_temp'
				}, {
					'table': 'rmag_remanence',
					'column': 'measurement_temp'
				}]
			},
			'geologic_classes': {
				'label': 'Geologic Classes',
				'group': 'Geology',
				'position': 25,
				'type': 'List',
				'description': 'Colon-delimited list of geologic classes',
				'validations': ['cv("class")', 'requiredUnlessSynthetic()'],
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'specimen_class'
				}]
			},
			'geologic_types': {
				'label': 'Sample Material Types',
				'group': 'Geology',
				'position': 26,
				'type': 'List',
				'description': 'Colon-delimited list of sample material types',
				'validations': ['cv("type")', 'requiredUnlessSynthetic()'],
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'specimen_type'
				}]
			},
			'lithologies': {
				'label': 'Lithologies',
				'group': 'Geology',
				'position': 27,
				'type': 'List',
				'description': 'Colon-delimited list of lithologies or archeological classifications',
				'validations': ['cv("lithology")', 'requiredUnlessSynthetic()'],
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'specimen_lithology'
				}]
			},
			'texture': {
				'label': 'Texture',
				'group': 'Geology',
				'position': 28,
				'type': 'String',
				'description': 'Specimen texture',
				'validations': ['cv("texture")'],
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'specimen_texture'
				}, {
					'table': 'er_fossils',
					'column': 'fossil_texture'
				}]
			},
			'alteration_grade': {
				'label': 'Alteration Grade',
				'group': 'Geology',
				'position': 29,
				'type': 'String',
				'description': 'Specimen alteration, Grade',
				'validations': ['cv("alteration")'],
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'specimen_alteration'
				}, {
					'table': 'er_fossils',
					'column': 'fossil_alteration'
				}]
			},
			'alteration_type': {
				'label': 'Alteration Type',
				'group': 'Geology',
				'position': 30,
				'type': 'String',
				'description': 'Specimen alteration, Type',
				'validations': ['cv("alteration_type")'],
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'specimen_alteration_type'
				}, {
					'table': 'er_fossils',
					'column': 'fossil_alteration_type'
				}]
			},
			'azimuth': {
				'label': 'Specimen X Direction Azimuth',
				'group': 'Orientation',
				'position': 31,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Azimuth of specimens’s x direction measured clockwise from north',
				'notes': 'The x direction of the specimen is aligned to the x-axis of the magnetometer when the magnetic moment of the sample is measured. See https://earthref.org/PmagPy/cookbook/#x1-260003.8.1 for a more detailed explanation and diagrams of a variety of orientation conventions.',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'specimen_azimuth'
				}]
			},
			'dip': {
				'label': 'Specimen X Direction Dip',
				'group': 'Orientation',
				'position': 32,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Dip of specimens’s x direction from the horizontal increasing downward',
				'notes': 'The x direction of the sample is aligned to the x-axis of the magnetometer when the magnetic moment of the sample is measured. See https://earthref.org/PmagPy/cookbook/#x1-260003.8.1 for a more detailed explanation and diagrams of a variety of orientation conventions. ',
				'validations': ['min(-180)', 'max(180)'],
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'specimen_dip'
				}]
			},
			'mineral_type': {
				'label': 'Mineral Type',
				'group': 'Mineral',
				'position': 33,
				'type': 'String',
				'description': 'Mineral type',
				'validations': ['cv("mineral_type")'],
				'previous_columns': [{
					'table': 'er_minerals',
					'column': 'mineral_type'
				}]
			},
			'mineral_class': {
				'label': 'Mineral Classification Name',
				'group': 'Mineral',
				'position': 34,
				'type': 'String',
				'description': 'Mineral classification name',
				'validations': ['cv("mineral_class")'],
				'previous_columns': [{
					'table': 'er_minerals',
					'column': 'mineral_class_name'
				}]
			},
			'mineral_assemblage': {
				'label': 'Mineral Assemblage',
				'group': 'Mineral',
				'position': 35,
				'type': 'String',
				'description': 'Mineral assemblage',
				'validations': ['cv("assemblage")'],
				'previous_columns': [{
					'table': 'er_minerals',
					'column': 'mineral_assemblage'
				}]
			},
			'fossil_phylum': {
				'label': 'Fossil Phylum',
				'group': 'Fossil',
				'position': 36,
				'type': 'String',
				'description': 'Fossil classification, Phylum',
				'validations': ['sv("fossil_phylum")'],
				'previous_columns': [{
					'table': 'er_fossils',
					'column': 'fossil_phylum'
				}]
			},
			'fossil_class': {
				'label': 'Fossil Class',
				'group': 'Fossil',
				'position': 37,
				'type': 'String',
				'description': 'Fossil classification, Class',
				'validations': ['sv("fossil_class")'],
				'previous_columns': [{
					'table': 'er_fossils',
					'column': 'fossil_class'
				}]
			},
			'fossil_order': {
				'label': 'Fossil Order',
				'group': 'Fossil',
				'position': 38,
				'type': 'String',
				'description': 'Fossil classification, Order',
				'validations': ['sv("fossil_order")'],
				'previous_columns': [{
					'table': 'er_fossils',
					'column': 'fossil_order'
				}]
			},
			'fossil_family': {
				'label': 'Fossil Family',
				'group': 'Fossil',
				'position': 39,
				'type': 'String',
				'description': 'Fossil classification, Family',
				'validations': ['sv("fossil_family")'],
				'previous_columns': [{
					'table': 'er_fossils',
					'column': 'fossil_family'
				}]
			},
			'fossil_genus': {
				'label': 'Fossil Genus',
				'group': 'Fossil',
				'position': 40,
				'type': 'String',
				'description': 'Fossil classification, Genus',
				'validations': ['sv("fossil_genus")'],
				'previous_columns': [{
					'table': 'er_fossils',
					'column': 'fossil_genus'
				}]
			},
			'fossil_species': {
				'label': 'Fossil Species',
				'group': 'Fossil',
				'position': 41,
				'type': 'String',
				'description': 'Fossil classification, Species',
				'validations': ['sv("fossil_species")'],
				'previous_columns': [{
					'table': 'er_fossils',
					'column': 'fossil_species'
				}]
			},
			'fossil_preservation': {
				'label': 'Fossil Preservation',
				'group': 'Fossil',
				'position': 42,
				'type': 'String',
				'description': 'Fossil preservation',
				'validations': ['sv("fossil_preservation")'],
				'previous_columns': [{
					'table': 'er_fossils',
					'column': 'fossil_preservation'
				}]
			},
			'dir_tilt_correction': {
				'label': 'Direction Tilt Correction',
				'group': 'Direction',
				'position': 43,
				'type': 'Number',
				'unit': '%',
				'description': 'Percentage tilt correction applied to the data',
				'notes': 'Correction between geographic (0%) and stratigraphic (100%); unoriented (-1%); partially oriented to horizontal only (-2%); unknown(-3%) - Use 0 for geographic coordinates (i.e. no stratigraphic correction) and 100 for stratigraphic coordinates (i.e. data has been corrected back to horizontal). Values inbetween can be used to indicate partially corrected amounts.',
				'examples': ['0', '100', '-1', '-2', '-3'],
				'validations': ['min(-3)', 'max(100)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_tilt_correction'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_correction'
				}]
			},
			'dir_dec': {
				'label': 'Direction Declination',
				'group': 'Direction',
				'position': 44,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Specimen direction in coordinates specified by tilt correction, Declination',
				'notes': 'Use method code DE-BFP for a best-fit-plane direction',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_dec'
				}, {
					'table': 'pmag_results',
					'column': 'average_dec'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_dec_corr'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_dec_uncorr'
				}]
			},
			'dir_inc': {
				'label': 'Direction Inclination',
				'group': 'Direction',
				'position': 45,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Specimen direction in coordinates specified by tilt correction, Inclination',
				'notes': 'Use method code DE-BFP for a best-fit-plane direction',
				'validations': ['min(-90)', 'max(90)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_inc'
				}, {
					'table': 'pmag_results',
					'column': 'average_inc'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_inc_corr'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_inc_uncorr'
				}]
			},
			'dir_bfv_dec': {
				'label': 'Direction Best Fit Vector Declination',
				'group': 'Direction',
				'position': 46,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Declination of the vector in the best filt plane of the specimen demag in coordinates specified by tilt correction',
				'validations': ['min(0)', 'max(360)']
			},
			'dir_bfv_inc': {
				'label': 'Direction Best Fit Vector Inclination',
				'group': 'Direction',
				'position': 47,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Inclination of the vector in the best filt plane of the specimen demag in coordinates specified by tilt correction',
				'validations': ['min(-90)', 'max(90)']
			},
			'dir_alpha95': {
				'label': 'Direction Alpha 95%',
				'group': 'Direction',
				'position': 48,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Specimen direction in coordinates specified by tilt correction, Fisher circle',
				'notes': 'Confidence Level = 95%',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_alpha95'
				}, {
					'table': 'pmag_results',
					'column': 'average_alpha95'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_alpha95_corr'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_alpha95_uncorr'
				}]
			},
			'dir_r': {
				'label': 'Direction R',
				'group': 'Direction',
				'position': 49,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Specimen direction in coordinates specified by tilt correction, Resultant Fisher vector',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_r'
				}]
			},
			'dir_k': {
				'label': 'Direction K',
				'group': 'Direction',
				'position': 50,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Specimen direction in coordinates specified by tilt correction, Fisher\'s dispersion parameter Kappa',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'average_k'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_k_corr'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_k_uncorr'
				}]
			},
			'dir_k_ratio': {
				'label': 'Direction Tilt K Ratio',
				'group': 'Direction',
				'position': 51,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Comparison of Fisher dispersion K after and before tilt correction',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_results',
					'column': 'tilt_k_ratio'
				}]
			},
			'dir_n_measurements': {
				'label': 'Direction N Measurements',
				'group': 'Direction',
				'position': 52,
				'type': 'Integer',
				'description': 'Number of measurements included in directional calculations',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_n'
				}, {
					'table': 'pmag_results',
					'column': 'average_n'
				}, {
					'table': 'pmag_results',
					'column': 'tilt_n'
				}]
			},
			'dir_comp': {
				'label': 'Direction Component Name',
				'group': 'Direction',
				'position': 53,
				'type': 'String',
				'description': 'Specimen direction component name',
				'examples': ['Characteristic', 'VRM', 'Overprint', 'A', 'B', 'C'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_comp_name'
				}, {
					'table': 'pmag_specimens',
					'column': 'specimen_comp_nmb'
				}]
			},
			'dir_n_comps': {
				'label': 'Direction N Components',
				'group': 'Direction',
				'position': 54,
				'type': 'Integer',
				'description': 'Total number of specimen magnetic components',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_comp_n'
				}]
			},
			'dir_polarity': {
				'label': 'Direction Polarity',
				'group': 'Direction',
				'position': 55,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Specimen direction polarity is normal (n), reversed (r), transitional (t), excursion (e) or intermediate (i)',
				'validations': ['cv("polarity")'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_polarity'
				}]
			},
			'dir_nrm_origin': {
				'label': 'Direction NRM Origin',
				'group': 'Direction',
				'position': 56,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Origin of the specimen direction NRM is primary (p) or secondary (s)',
				'validations': ['cv("nrm")'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_nrm'
				}]
			},
			'dir_mad_anc': {
				'label': 'Direction MAD Anchored',
				'group': 'Directional Statistics',
				'position': 57,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Maximum Angular Deviation (MAD) of the anchored directional PCA fits to the paleomagnetic vector',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_mad_anc'
				}]
			},
			'dir_mad_free': {
				'label': 'Direction MAD Free-Floating',
				'group': 'Directional Statistics',
				'position': 58,
				'type': 'Number',
				'unit': 'Degrees',
				'urls': ['http://dx.doi.org/10.1111/j.1365-246X.1980.tb02601.x'],
				'description': 'Maximum Angular Deviation (MAD) of the free-floating directional PCA fits to the paleomagnetic vector',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_mad'
				}]
			},
			'dir_alpha': {
				'label': 'Direction Alpha',
				'group': 'Directional Statistics',
				'position': 59,
				'type': 'Number',
				'unit': 'Degrees',
				'urls': ['http://dx.doi.org/10.1111/j.1365-246X.1980.tb02601.x'],
				'description': 'Angular difference between the anchored and free-floating best-fit directions on a vector component diagram',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_alpha'
				}]
			},
			'dir_dang': {
				'label': 'Direction DANG',
				'group': 'Directional Statistics',
				'position': 60,
				'type': 'Number',
				'unit': 'Degrees',
				'urls': ['http://dx.doi.org/10.1002/2013GC005135'],
				'description': 'Deviation angle of direction of component with respect to origin',
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_dang'
				}]
			},
			'magn_moment': {
				'label': 'Magnetization Moment',
				'group': 'Magnetization',
				'position': 61,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Measured magnetic moment',
				'validations': ['min(-1)', 'max(1)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_magn_moment'
				}]
			},
			'magn_volume': {
				'label': 'Magnetization Volume',
				'group': 'Magnetization',
				'position': 62,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Measured intensity of magnetization, Volume normalized',
				'validations': ['min(-1000000)', 'max(1000000)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_magn_volume'
				}]
			},
			'magn_mass': {
				'label': 'Magnetization Mass',
				'group': 'Magnetization',
				'position': 63,
				'type': 'Number',
				'unit': 'Am^2/kg',
				'description': 'Measured intensity of magnetization, Mass normalized',
				'validations': ['min(-200)', 'max(200)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_magn_mass'
				}]
			},
			'int_abs': {
				'label': 'Absolute Paleointensity',
				'group': 'Paleointensity',
				'position': 64,
				'type': 'Number',
				'unit': 'T',
				'description': 'Absolute field strength',
				'validations': ['min(0)', 'max(0.01)', 'requiredIf("int_abs_sigma")', 'requiredIf("int_abs_sigma_perc")'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_int'
				}, {
					'table': 'pmag_results',
					'column': 'average_int'
				}]
			},
			'int_abs_sigma': {
				'label': 'Absolute Paleointensity Sigma',
				'group': 'Paleointensity',
				'position': 65,
				'type': 'Number',
				'unit': 'T',
				'description': 'Absolute field strength, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)', 'max(0.01)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_int_sigma'
				}, {
					'table': 'pmag_results',
					'column': 'average_int_sigma'
				}]
			},
			'int_abs_sigma_perc': {
				'label': 'Absolute Paleointensity Sigma %',
				'group': 'Paleointensity',
				'position': 66,
				'type': 'Number',
				'unit': '%',
				'description': 'Absolute field strength, Uncertainty in percent',
				'validations': ['min(0)', 'max(100)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_int_sigma_perc'
				}, {
					'table': 'pmag_results',
					'column': 'average_int_sigma_perc'
				}]
			},
			'int_abs_min': {
				'label': 'Absolute Paleointensity Min',
				'group': 'Paleointensity',
				'position': 67,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Absolute field strength minimum parameter as described by the method code',
				'examples': ['.025', '.01']
			},
			'int_abs_max': {
				'label': 'Absolute Paleointensity Max',
				'group': 'Paleointensity',
				'position': 68,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Absolute field strength maximim parameter as described by the method code',
				'examples': ['0.95', '.6827']
			},
			'int_rel': {
				'label': 'Relative Paleointensity',
				'group': 'Paleointensity',
				'position': 69,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength',
				'validations': ['requiredIf("int_rel_sigma")', 'requiredIf("int_rel_sigma_perc")'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_int_rel'
				}, {
					'table': 'pmag_results',
					'column': 'average_int_rel'
				}]
			},
			'int_rel_sigma': {
				'label': 'Relative Paleointensity Sigma',
				'group': 'Paleointensity',
				'position': 70,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_int_rel_sigma'
				}, {
					'table': 'pmag_results',
					'column': 'average_int_rel_sigma'
				}]
			},
			'int_rel_sigma_perc': {
				'label': 'Relative Paleointensity Sigma %',
				'group': 'Paleointensity',
				'position': 71,
				'type': 'Number',
				'unit': '%',
				'description': 'Relative field strength, Uncertainty in percent',
				'validations': ['min(0)', 'max(100)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_int_rel_sigma_perc'
				}, {
					'table': 'pmag_results',
					'column': 'average_int_rel_sigma_perc'
				}]
			},
			'int_rel_ARM': {
				'label': 'ARM Normalized Relative Paleointensity',
				'group': 'Paleointensity',
				'position': 72,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength estimated with NRM normalized by laboratory ARM',
				'validations': ['requiredIf("int_rel_ARM_sigma")', 'requiredIf("int_rel_ARM_sigma_perc")']
			},
			'int_rel_ARM_sigma': {
				'label': 'ARM Normalized Relative Paleointensity Sigma',
				'group': 'Paleointensity',
				'position': 73,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength estimated with NRM normalized by laboratory ARM, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)']
			},
			'int_rel_ARM_sigma_perc': {
				'label': 'ARM Normalized Relative Paleointensity Sigma %',
				'group': 'Paleointensity',
				'position': 74,
				'type': 'Number',
				'unit': '%',
				'description': 'Relative field strength estimated with NRM normalized by laboratory ARM, Uncertainty in percent',
				'validations': ['min(0)', 'max(100)']
			},
			'int_rel_IRM': {
				'label': 'IRM Normalized Relative Paleointensity',
				'group': 'Paleointensity',
				'position': 75,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength estimated with NRM normalized by laboratory IRM',
				'validations': ['requiredIf("int_rel_IRM_sigma")', 'requiredIf("int_rel_IRM_sigma_perc")']
			},
			'int_rel_IRM_sigma': {
				'label': 'IRM Normalized Relative Paleointensity Sigma',
				'group': 'Paleointensity',
				'position': 76,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength estimated with NRM normalized by laboratory IRM, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)']
			},
			'int_rel_IRM_sigma_perc': {
				'label': 'IRM Normalized Relative Paleointensity Sigma %',
				'group': 'Paleointensity',
				'position': 77,
				'type': 'Number',
				'unit': '%',
				'description': 'Relative field strength estimated with NRM normalized by laboratory IRM, Uncertainty in percent',
				'validations': ['min(0)', 'max(100)']
			},
			'int_rel_chi': {
				'label': 'Susceptibility Normalized Relative Paleointensity',
				'group': 'Paleointensity',
				'position': 78,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength estimated with NRM normalized by susceptibility',
				'validations': ['requiredIf("int_rel_chi_sigma")', 'requiredIf("int_rel_chi_sigma_perc")']
			},
			'int_rel_chi_sigma': {
				'label': 'Susceptibility Normalized Relative Paleointensity Sigma',
				'group': 'Paleointensity',
				'position': 79,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Relative field strength estimated with NRM normalized by susceptibility, Uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)']
			},
			'int_rel_chi_sigma_perc': {
				'label': 'Susceptibility Normalized Relative Paleointensity Sigma %',
				'group': 'Paleointensity',
				'position': 80,
				'type': 'Number',
				'unit': '%',
				'description': 'Relative field strength estimated with NRM normalized by susceptibility, Uncertainty in percent',
				'validations': ['min(0)', 'max(100)']
			},
			'int_n_measurements': {
				'label': 'Paleointensity N Measurements',
				'group': 'Paleointensity',
				'position': 81,
				'type': 'Integer',
				'description': 'Number of measurements included in intensity calculations',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_int_n'
				}, {
					'table': 'pmag_results',
					'column': 'average_int_n'
				}]
			},
			'int_corr': {
				'label': 'Paleointensity Data Corrected',
				'group': 'Paleointensity',
				'position': 82,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Indicating if an uncorrected (u) or corrected (c) estimate with regard to possible anisotropy and cooling rate corrections',
				'validations': ['cv("data_correction")'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_correction'
				}]
			},
			'int_corr_cooling_rate': {
				'label': 'Paleointensity Cooling Rate Correction Factor',
				'group': 'Paleointensity',
				'position': 83,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Cooling rate correction factor for intensity',
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_int_corr_cooling_rate'
				}]
			},
			'int_corr_aniso': {
				'label': 'Paleointensity Anisotropy Correction Factor',
				'group': 'Paleointensity',
				'position': 84,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Anisotropy correction factor for intensity',
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_int_corr_anisotropy'
				}]
			},
			'int_corr_nlt': {
				'label': 'Paleointensity Non-Linear TRM Correction Factor',
				'group': 'Paleointensity',
				'position': 85,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Non-linear TRM correction factor for intensity',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_int_corr_nlt'
				}]
			},
			'int_corr_arm': {
				'label': 'Paleointensity ARM Correction Factor',
				'group': 'Paleointensity',
				'position': 86,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1111/j.1365-246X.1994.tb03999.x'],
				'description': 'ARM correction factor for intensity',
				'validations': ['min(0)']
			},
			'int_viscosity_index': {
				'label': 'Paleointensity Viscosity Index',
				'group': 'Paleointensity',
				'position': 87,
				'type': 'Number',
				'unit': '%',
				'description': 'Viscosity index',
				'validations': ['min(0)', 'max(100)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_viscosity_index'
				}]
			},
			'int_treat_dc_field': {
				'label': 'Paleointensity Lab Treatment DC Field',
				'group': 'Paleointensity',
				'position': 88,
				'type': 'Number',
				'unit': 'T',
				'description': 'Applied DC field',
				'validations': ['min(-100)', 'max(100)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_lab_field_dc'
				}]
			},
			'treat_dc_field_theta': {
				'label': 'Lab Treatment Orientation Theta',
				'group': 'Lab Treatments',
				'position': 89,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Orientation of the lab field with respect to the specimen during treatment',
				'notes': 'Angle between the specimen x-y plane and the field direction. Positive toward the positive z direction.',
				'validations': ['min(-90)', 'max(90)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'treatment_dc_field_theta'
				}]
			},
			'treat_dc_field_phi': {
				'label': 'Lab Treatment Orientation Phi',
				'group': 'Lab Treatments',
				'position': 90,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Orientation of the lab field with respect to the specimen during treatment',
				'notes': 'Angle of the field direction when projected into the x-y plane. Positive x-axis is 0 and increasing toward the positive y-axis.',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'treatment_dc_field_phi'
				}]
			},
			'int_b': {
				'label': 'Paleointensity Best-fit Line Slope',
				'group': 'Paleointensity Arai Statistics',
				'position': 91,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1139/p66-090'],
				'description': 'The slope of the best-fit line of the selected TRM and NRM points on an Arai plot',
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_b'
				}]
			},
			'int_b_sigma': {
				'label': 'Paleointensity Best-fit Line Slope Sigma',
				'group': 'Paleointensity Arai Statistics',
				'position': 92,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1139/p66-090'],
				'description': 'The standard error on the slope on an Arai plot',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_b_sigma'
				}]
			},
			'int_b_beta': {
				'label': 'Paleointensity Best-fit Line Slope Sigma over Slope',
				'group': 'Paleointensity Arai Statistics',
				'position': 93,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1139/p66-090'],
				'description': 'The ratio of the standard error of the slope to the absolute value of the slope on an Arai plot',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_b_beta'
				}]
			},
			'int_rsc': {
				'label': 'Paleointensity Maximum RSC',
				'group': 'Paleointensity Arai Statistics',
				'position': 94,
				'type': 'Number',
				'unit': '%',
				'urls': ['http://dx.doi.org/10.1029/JB083iB04p01740'],
				'description': 'Maximum relative susceptibility change',
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_rsc'
				}]
			},
			'int_f': {
				'label': 'Paleointensity f',
				'group': 'Paleointensity Arai Statistics',
				'position': 95,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1126/science.1057519'],
				'description': 'NRM fraction used for the best-fit on an Arai plot',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_f'
				}]
			},
			'int_fvds': {
				'label': 'Paleointensity f VDS',
				'group': 'Paleointensity Arai Statistics',
				'position': 96,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1029/JB083iB04p01740'],
				'description': 'NRM fraction used for the best-fit on an Arai plot calculated as a vector difference sum',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_fvds'
				}]
			},
			'int_frac': {
				'label': 'Paleointensity FRAC',
				'group': 'Paleointensity Arai Statistics',
				'position': 97,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1029/2003GC000635'],
				'description': 'NRM fraction used for the best-fit on an Arai plot determined entirely by vector difference sum calculation',
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_frac'
				}]
			},
			'int_g': {
				'label': 'Paleointensity Gap Factor',
				'group': 'Paleointensity Arai Statistics',
				'position': 98,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1002/ggge.20062'],
				'description': 'The gap reflects the average spacing of the selected Arai plot points along the best-fit line',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_g'
				}]
			},
			'int_gmax': {
				'label': 'Paleointensity Gap Max',
				'group': 'Paleointensity Arai Statistics',
				'position': 99,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1029/JB083iB04p01740'],
				'description': 'The maximum gap between two points in Arai plot determined by vector arithmetic',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_gmax'
				}]
			},
			'int_q': {
				'label': 'Paleointensity q',
				'group': 'Paleointensity Arai Statistics',
				'position': 100,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1002/ggge.20062'],
				'description': 'A measure of the overall quality of the paleointensity estimate and combines the relative scatter of the best-fit line, the NRM fraction and the gap factor',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_q'
				}]
			},
			'int_w': {
				'label': 'Paleointensity Weighting Factor',
				'group': 'Paleointensity Arai Statistics',
				'position': 101,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1029/JB083iB04p01740'],
				'description': 'Weighting factor',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_w'
				}]
			},
			'int_k': {
				'label': 'Paleointensity K',
				'group': 'Paleointensity Arai Statistics',
				'position': 102,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1029/JB090iB12p10417'],
				'description': 'The curvature of the Arai plot as determined by the best-fit circle to all of the data',
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_k'
				}]
			},
			'int_k_min': {
				'label': 'Paleointensity K Minimum',
				'group': 'Paleointensity Arai Statistics',
				'position': 103,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1029/JB090iB12p10417'],
				'description': 'The minimum K of the Arai plot as described by the method code'
			},
			'int_k_max': {
				'label': 'Paleointensity K Maximum',
				'group': 'Paleointensity Arai Statistics',
				'position': 104,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1029/JB090iB12p10417'],
				'description': 'The maximum K of the Arai plot as described by the method code'
			},
			'int_k_sse': {
				'label': 'Paleointensity K SSE',
				'group': 'Paleointensity Arai Statistics',
				'position': 105,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1029/2011JB008369'],
				'description': 'The quality of the best-fit circle used to determine K',
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_k_sse'
				}]
			},
			'int_k_prime': {
				'label': 'Paleointensity K\'',
				'group': 'Paleointensity Arai Statistics',
				'position': 106,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1029/JB090iB12p10417'],
				'description': 'The curvature of the Arai plot as determined by the best-fit circle to the selected interval of data'
			},
			'int_k_prime_sse': {
				'label': 'Paleointensity K\' SSE',
				'group': 'Paleointensity Arai Statistics',
				'position': 107,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1029/2011JB008369'],
				'description': 'The quality of the best-fit circle used to determine K\''
			},
			'int_scat': {
				'label': 'Paleointensity SCAT',
				'group': 'Paleointensity Arai Statistics',
				'position': 108,
				'type': 'String',
				'unit': 'Flag',
				'urls': ['http://dx.doi.org/10.1029/2011JB008369'],
				'description': 'All pTRM checks, MD checks, IZ ZI data, etc. are in the box',
				'validations': ['cv("boolean")'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_scat'
				}]
			},
			'int_r2_corr': {
				'label': 'Paleointensity Correlation Coefficient',
				'group': 'Paleointensity Arai Statistics',
				'position': 109,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1002/ggge.20062'],
				'description': 'The correlation coefficient to estimate the strength of the linear relationship between the NRM and TRM over the best-fit Arai plot segment',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_r_sq'
				}]
			},
			'int_r2_det': {
				'label': 'Paleointensity Coefficient of Determination',
				'group': 'Paleointensity Arai Statistics',
				'position': 110,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1002/2013GC005135'],
				'description': 'The coefficient of determination to estimate variance accounted for by the linear model fit on an Arai plot',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_coeff_det_sq'
				}]
			},
			'int_z': {
				'label': 'Paleointensity Z',
				'group': 'Paleointensity Arai Statistics',
				'position': 111,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1002/2013GC005135'],
				'description': 'Arai plot zigzag parameter calculated using the scatter around the best-fit slope on an Arai plot',
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_z'
				}]
			},
			'int_z_md': {
				'label': 'Paleointensity IZZI MD',
				'group': 'Paleointensity Arai Statistics',
				'position': 112,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1029/2004GC000840'],
				'description': 'Arai plot zigzag parameter calculated by the area bounded by the curve that the ZI points make and the curve that the IZ points make',
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_z_md'
				}]
			},
			'int_mad_anc': {
				'label': 'Paleointensity MAD Anchored',
				'group': 'Paleointensity Directional Statistics',
				'position': 113,
				'type': 'Number',
				'unit': 'Degrees',
				'urls': ['http://dx.doi.org/10.1016/j.epsl.2011.08.024'],
				'description': 'Maximum Angular Deviation (MAD) of the anchored directional PCA fits to the paleomagnetic vector from a paleointensity experiment',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_int_mad_anc'
				}]
			},
			'int_mad_free': {
				'label': 'Paleointensity MAD Free-Floating',
				'group': 'Paleointensity Directional Statistics',
				'position': 114,
				'type': 'Number',
				'unit': 'Degrees',
				'urls': ['http://dx.doi.org/10.1111/j.1365-246X.1980.tb02601.x'],
				'description': 'Maximum Angular Deviation (MAD) of the free-floating directional PCA fits to the paleomagnetic vector from a paleointensity experiment',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_int_mad'
				}]
			},
			'int_mad_coe': {
				'label': 'Paleointensity MAD Coe',
				'group': 'Paleointensity Directional Statistics',
				'position': 115,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Maximum Angular Deviation (MAD) of the free-floating directional PCA fits to the paleomagnetic vector from a paleointensity experiment calculated using only the zero-field first steps',
				'validations': ['min(0)']
			},
			'int_alpha': {
				'label': 'Paleointensity Alpha',
				'group': 'Paleointensity Directional Statistics',
				'position': 116,
				'type': 'Number',
				'unit': 'Degrees',
				'urls': ['http://dx.doi.org/10.1111/j.1365-246X.1980.tb02601.x'],
				'description': 'Angular difference between the anchored and free-floating best-fit directions on a vector component diagram from a paleointensity experiment',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_int_alpha'
				}]
			},
			'int_alpha_prime': {
				'label': 'Paleointensity Alpha Prime',
				'group': 'Paleointensity Directional Statistics',
				'position': 117,
				'type': 'Number',
				'unit': 'Degrees',
				'urls': ['http://dx.doi.org/10.1002/2013GC005135'],
				'description': 'Angular difference between the anchored best-fit direction from the paleointensity experiment and an independent measure of the paleomagnetic direction',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_alpha_prime'
				}]
			},
			'int_delta': {
				'label': 'Paleointensity Delta',
				'group': 'Paleointensity Directional Statistics',
				'position': 118,
				'type': 'Number',
				'unit': 'Degrees',
				'urls': ['http://dx.doi.org/10.1016/j.pepi.2004.06.010'],
				'description': 'Maximum angle of deviation between assumed NRM and measured NRM in perpendicular paleointensity method',
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_delta'
				}]
			},
			'int_theta': {
				'label': 'Paleointensity Theta',
				'group': 'Paleointensity Directional Statistics',
				'position': 119,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'The angle between the applied field direction and the ChRM direction of the NRM as determined from the free-floating PCA fit to the selected demagnetization steps of the paleointensity experiment',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_theta'
				}]
			},
			'int_dang': {
				'label': 'Paleointensity DANG',
				'group': 'Paleointensity Directional Statistics',
				'position': 120,
				'type': 'Number',
				'unit': 'Degrees',
				'urls': ['http://dx.doi.org/10.1002/2013GC005135'],
				'description': 'The angle between the free-floating best-fit direction and the vector connecting the center of mass and the origin of the vector component diagram',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_int_dang'
				}]
			},
			'int_gamma': {
				'label': 'Paleointensity Gamma',
				'group': 'Paleointensity Directional Statistics',
				'position': 121,
				'type': 'Number',
				'unit': 'Degrees',
				'urls': ['http://dx.doi.org/10.1029/2003GC000635'],
				'description': 'Maximum angle of deviation between acquired pTRM direction and assumed applied field direction',
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_gamma'
				}]
			},
			'int_crm': {
				'label': 'Paleointensity CRM %',
				'group': 'Paleointensity Directional Statistics',
				'position': 122,
				'type': 'Number',
				'unit': '%',
				'description': 'The cumulative deflection between the NRM vectors and the ChRM direction',
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_int_crm'
				}]
			},
			'int_ptrm': {
				'label': 'Paleointensity Maximum pTRM Check',
				'group': 'Paleointensity pTRM Check Statistics',
				'position': 123,
				'type': 'Number',
				'unit': '%',
				'urls': ['http://dx.doi.org/10.1029/JB083iB04p01740'],
				'description': 'Maximum absolute difference produced by a pTRM check, normalized by the TRM acquired at that heating step',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_ptrm'
				}]
			},
			'int_dck': {
				'label': 'Paleointensity Delta CK',
				'group': 'Paleointensity pTRM Check Statistics',
				'position': 124,
				'type': 'Number',
				'unit': '%',
				'urls': ['http://dx.doi.org/10.1002/2013GC005135'],
				'description': 'Maximum absolute difference produced by a pTRM check, normalized by the total TRM (obtained from the intersection of the best-fit line and the x-axis on an Arai plot)',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_dck'
				}]
			},
			'int_drat': {
				'label': 'Paleointensity Difference Ratio pTRM Check',
				'group': 'Paleointensity pTRM Check Statistics',
				'position': 125,
				'type': 'Number',
				'unit': '%',
				'urls': ['http://dx.doi.org/10.1029/2004GC000807'],
				'description': 'Maximum absolute difference produced by a pTRM check, normalized by the length of the best-fit line',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_drat'
				}]
			},
			'int_maxdev': {
				'label': 'Paleointensity Maximum DEV',
				'group': 'Paleointensity pTRM Check Statistics',
				'position': 126,
				'type': 'Number',
				'unit': '%',
				'urls': ['http://dx.doi.org/10.1098/rsta.2000.0574'],
				'description': 'Maximum absolute difference produced by a pTRM check, normalized by the length of the TRM segment of the best-fit line on an Arai plot',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_maxdev'
				}]
			},
			'int_cdrat': {
				'label': 'Paleointensity Cumulative DRAT',
				'group': 'Paleointensity pTRM Check Statistics',
				'position': 127,
				'type': 'Number',
				'unit': '%',
				'urls': ['http://dx.doi.org/10.1016/j.pepi.2012.06.005'],
				'description': 'Cumulative difference ratio difference produced by a pTRM check',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_cdrat'
				}]
			},
			'int_drats': {
				'label': 'Paleointensity Difference Ratio Sum',
				'group': 'Paleointensity pTRM Check Statistics',
				'position': 128,
				'type': 'Number',
				'unit': '%',
				'urls': ['http://dx.doi.org/10.1016/j.pepi.2004.06.010'],
				'description': 'Cumulative pTRM check difference normalized by the pTRM gained at the maximum temperature used for the best-fit on the Arai plot',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_drats'
				}]
			},
			'int_mdrat': {
				'label': 'Paleointensity Mean DRAT',
				'group': 'Paleointensity pTRM Check Statistics',
				'position': 129,
				'type': 'Number',
				'unit': '%',
				'urls': ['http://dx.doi.org/10.1029/2003GC000635'],
				'description': 'The average difference produced by a pTRM check, normalized by the length of the best-fit line',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_mdrat'
				}]
			},
			'int_mdev': {
				'label': 'Paleointensity Mean DEV',
				'group': 'Paleointensity pTRM Check Statistics',
				'position': 130,
				'type': 'Number',
				'unit': '%',
				'urls': ['http://dx.doi.org/10.1002/2013GC005135'],
				'description': 'Mean deviation of a pTRM check',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_mdev'
				}]
			},
			'int_dpal': {
				'label': 'Paleointensity Delta pal',
				'group': 'Paleointensity pTRM Check Statistics',
				'position': 131,
				'type': 'Number',
				'unit': '%',
				'urls': ['http://dx.doi.org/10.1002/2013GC005135'],
				'description': 'A measure of cumulative alteration determined by the difference of the alteration corrected intensity estimate (Valet et al., 1996) and the uncorrected estimate, normalized by the uncorrected estimate (Leonhardt et al., 2004a)',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_dpal'
				}]
			},
			'int_n_ptrm': {
				'label': 'Paleointensity Number pTRM Checks',
				'group': 'Paleointensity pTRM Check Statistics',
				'position': 132,
				'type': 'Integer',
				'urls': ['http://dx.doi.org/10.1029/96JB02115'],
				'description': 'Number of pTRM checks used in paleointensity experiment',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_int_ptrm_n'
				}]
			},
			'int_drat_tail': {
				'label': 'Paleointensity DRAT Tail Check',
				'group': 'Paleointensity pTRM Tail Check Statistics',
				'position': 133,
				'type': 'Number',
				'unit': '%',
				'urls': ['http://dx.doi.org/10.1002/2013GC005135'],
				'description': 'Maximum absolute difference produced by a pTRM tail check, normalized by the length of the best-fit line',
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_tail_drat'
				}]
			},
			'int_dtr': {
				'label': 'Paleointensity Delta TR',
				'group': 'Paleointensity pTRM Tail Check Statistics',
				'position': 134,
				'type': 'Number',
				'unit': '%',
				'urls': ['http://dx.doi.org/10.1016/j.epsl.2007.03.017'],
				'description': 'Maximum absolute difference produced by a pTRM tail check, normalized by the NRM (obtained from the intersection of the best-fit line and the y-axis on an Arai plot)',
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_dtr'
				}]
			},
			'int_md': {
				'label': 'Paleointensity MD VDS',
				'group': 'Paleointensity pTRM Tail Check Statistics',
				'position': 135,
				'type': 'Number',
				'unit': '%',
				'urls': ['http://dx.doi.org/10.1029/2004GC000807'],
				'description': 'Maximum absolute difference produced by a pTRM tail check, normalized by the vector difference sum of the NRM',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_md'
				}]
			},
			'int_dt': {
				'label': 'Paleointensity Delta T',
				'group': 'Paleointensity pTRM Tail Check Statistics',
				'position': 136,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1029/2003GC000635'],
				'description': 'The extent of a pTRM tail after correction for angular dependence',
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_dt'
				}]
			},
			'int_n_ptrm_tail': {
				'label': 'Paleointensity Number pTRM Tail Checks',
				'group': 'Paleointensity pTRM Tail Check Statistics',
				'position': 137,
				'type': 'Integer',
				'urls': ['http://dx.doi.org/10.1029/2004GC000807', 'http://dx.doi.org/10.1016/j.pepi.2004.01.009'],
				'description': 'Number of pTRM tail checks used in paleointensity experiment',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_int_ptrm_tail_n'
				}]
			},
			'int_dac': {
				'label': 'Paleointensity Delta AC',
				'group': 'Paleointensity Additivity Check Statistics',
				'position': 138,
				'type': 'Number',
				'unit': '%',
				'urls': ['http://dx.doi.org/10.1002/2013GC005135'],
				'description': 'The maximum absolute additivity check difference normalized by the total TRM (obtained from the intersection of the best-fit line and the x-axis on an Arai plot',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_dac'
				}]
			},
			'int_n_ac': {
				'label': 'Paleointensity N Additivity Checks ',
				'group': 'Paleointensity Additivity Check Statistics',
				'position': 139,
				'type': 'Integer',
				'urls': ['http://dx.doi.org/10.1029/2004GC000807'],
				'description': 'The number of additivity checks used to analyze the best-fit segment on an Arai plot',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_ac_n'
				}]
			},
			'critical_temp_type': {
				'label': 'Critical Temperature Type',
				'group': 'Critical Temperature',
				'position': 140,
				'type': 'String',
				'urls': ['http://dx.doi.org/10.1002/2013GC005135'],
				'description': 'Interpreted type of temperature transition',
				'validations': ['cv("temp_type")'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'critical_temp_type'
				}]
			},
			'critical_temp_mineral': {
				'label': 'Critical Temperature Mineral Type',
				'group': 'Critical Temperature',
				'position': 141,
				'type': 'List',
				'description': 'Interpreted mineral(s) causing the transition',
				'validations': ['cv("mineral_type")'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'critical_temp_mineral'
				}]
			},
			'critical_temp': {
				'label': 'Critical Temperature',
				'group': 'Critical Temperature',
				'position': 142,
				'type': 'Number',
				'unit': 'K',
				'description': 'Temperature at which some transition occurs',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'critical_temp'
				}]
			},
			'critical_temp_low': {
				'label': 'Critical Temperature Low',
				'group': 'Critical Temperature',
				'position': 143,
				'type': 'Number',
				'unit': 'K',
				'description': 'Critical, Xfd or Xhd temperature calculation, Low range',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'critical_temp_low'
				}]
			},
			'critical_temp_high': {
				'label': 'Critical Temperature High',
				'group': 'Critical Temperature',
				'position': 144,
				'type': 'Number',
				'unit': 'K',
				'description': 'Critical, Xfd or Xhd temperature calculation, High range',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'critical_temp_high'
				}]
			},
			'aniso_type': {
				'label': 'Anisotropy Type',
				'group': 'Anisotropy',
				'position': 145,
				'type': 'String',
				'description': 'Anisotropy calculation type',
				'examples': ['AMS', 'AARM', 'AIRM', 'ATRM'],
				'validations': ['cv("anisotropy_type")'],
				'previous_columns': [{
					'table': 'rmag_anisotropy',
					'column': 'anisotropy_type'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_type'
				}]
			},
			'aniso_tilt_correction': {
				'label': 'Anisotropy Tilt Correction',
				'group': 'Anisotropy',
				'position': 146,
				'type': 'Number',
				'unit': '%',
				'description': 'Percentage tilt correction applied to the data',
				'notes': 'Correction between geographic (0%) and stratigraphic (100%); unoriented (-1%); partially oriented to horizontal only (-2%); unknown(-3%) - Use 0 for geographic coordinates (i.e. no stratigraphic correction) and 100 for stratigraphic coordinates (i.e. data has been corrected back to horizontal). Values inbetween can be used to indicate partially corrected amounts.',
				'examples': ['0', '100', '-1', '-2', '-3'],
				'validations': ['min(-3)', 'max(100)'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'tilt_correction'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'anisotropy_tilt_correction'
				}]
			},
			'aniso_alt': {
				'label': 'Anisotropy Remanence Alteration',
				'group': 'Anisotropy',
				'position': 147,
				'type': 'Number',
				'unit': '%',
				'description': 'Comparison of 1st and 2nd TRMs in TRM anisotropy experiment',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'rmag_anisotropy',
					'column': 'anisotropy_alt'
				}]
			},
			'aniso_s': {
				'label': 'Anisotropy Tensor Elements',
				'group': 'Anisotropy',
				'position': 148,
				'type': 'Matrix',
				'unit': 'Number',
				'description': 'Anisotropy tensor diagonal elements, a six-element colon-delimited list of c11, c22, c33, c12, c23, and c13 tensor elements',
				'previous_columns': [{
					'table': 'rmag_anisotropy',
					'column': 'anisotropy_s1'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'anisotropy_s2'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'anisotropy_s3'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'anisotropy_s4'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'anisotropy_s5'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'anisotropy_s6'
				}]
			},
			'aniso_s_mean': {
				'label': 'Anisotropy Tensor Mean',
				'group': 'Anisotropy',
				'position': 149,
				'type': 'Number',
				'unit': 'Number',
				'description': 'Anisotropy tensor mean, (c11 + c22 + c33) / 3',
				'previous_columns': [{
					'table': 'rmag_anisotropy',
					'column': 'anisotropy_mean'
				}]
			},
			'aniso_s_sigma': {
				'label': 'Anisotropy Tensor Sigma',
				'group': 'Anisotropy',
				'position': 150,
				'type': 'Number',
				'unit': 'Number',
				'description': 'Anisotropy tensor standard deviation',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'rmag_anisotropy',
					'column': 'anisotropy_sigma'
				}]
			},
			'aniso_s_n_measurements': {
				'label': 'Anisotropy N Measurements',
				'group': 'Anisotropy',
				'position': 151,
				'type': 'Integer',
				'urls': ['http://dx.doi.org/10.2307/2333905'],
				'description': 'Number of measurements included in anisotropy tensor calculations',
				'previous_columns': [{
					'table': 'rmag_anisotropy',
					'column': 'anisotropy_n'
				}]
			},
			'aniso_s_unit': {
				'label': 'Anisotropy Tensor Unit',
				'group': 'Anisotropy',
				'position': 152,
				'type': 'String',
				'description': 'Anisotropy tensor unit',
				'examples': ['Normalized by trace', 'Am2', 'm3/kg', 'SI', 'deviatoric'],
				'validations': ['cv("anisotropy_tensor_unit")'],
				'previous_columns': [{
					'table': 'rmag_anisotropy',
					'column': 'anisotropy_unit'
				}]
			},
			'aniso_v1': {
				'label': 'Anisotropy V1',
				'group': 'Anisotropy',
				'position': 153,
				'type': 'Matrix',
				'description': 'Anisotropy eigenparameters for the maximum eigenvalue (T1), a colon-delimited list of tau (T1), dec, inc, confidence ellipse type, and confidence ellipse parameters',
				'validations': ['type("aniso_v")'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_t1'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_eta_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_eta_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_eta_semi_angle'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_zeta_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_zeta_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v1_zeta_semi_angle'
				}]
			},
			'aniso_v2': {
				'label': 'Anisotropy V2',
				'group': 'Anisotropy',
				'position': 154,
				'type': 'Matrix',
				'description': 'Anisotropy eigenparameters for the intermediate eigenvalue (T2), a colon-delimited list of tau (T2), dec, inc, confidence ellipse type, and confidence ellipse parameters',
				'validations': ['type("aniso_v")'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_t2'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_eta_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_eta_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_eta_semi_angle'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_zeta_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_zeta_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v2_zeta_semi_angle'
				}]
			},
			'aniso_v3': {
				'label': 'Anisotropy V3',
				'group': 'Anisotropy',
				'position': 155,
				'type': 'Matrix',
				'description': 'Anisotropy eigenparameters for the minimum eigenvalue (T3), a colon-delimited list of tau (T3), dec, inc, confidence ellipse type, and confidence ellipse parameters',
				'validations': ['type("aniso_v")'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_t3'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_eta_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_eta_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_eta_semi_angle'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_zeta_dec'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_zeta_inc'
				}, {
					'table': 'rmag_results',
					'column': 'anisotropy_v3_zeta_semi_angle'
				}]
			},
			'aniso_perc': {
				'label': 'Anisotropy Percent',
				'group': 'Anisotropy',
				'position': 156,
				'type': 'Number',
				'unit': '%',
				'description': 'Percent anisotropy, 100 * (S1-S3) / (S1+S2+S3)',
				'validations': ['min(0)', 'max(100)'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_percent'
				}]
			},
			'aniso_total': {
				'label': 'Anisotropy Total',
				'group': 'Anisotropy',
				'position': 157,
				'type': 'Number',
				'unit': '%',
				'description': 'Total anisotropy, 100 * (S1-S3) / Mean',
				'validations': ['min(0)', 'max(300)'],
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_total'
				}]
			},
			'aniso_p': {
				'label': 'Anisotropy P',
				'group': 'Anisotropy',
				'position': 158,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Anisotropy degree, T1/T3',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_p'
				}]
			},
			'aniso_pp': {
				'label': 'Anisotropy P\'',
				'group': 'Anisotropy',
				'position': 159,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Corrected anisotropy',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_pp'
				}]
			},
			'aniso_l': {
				'label': 'Anisotropy L',
				'group': 'Anisotropy',
				'position': 160,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1016/0040-1951(81)90110-4'],
				'description': 'Lineation, T1/T2',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_l'
				}]
			},
			'aniso_ll': {
				'label': 'Anisotropy L\'',
				'group': 'Anisotropy',
				'position': 161,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Log lineation, ln(L)',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_ll'
				}]
			},
			'aniso_f': {
				'label': 'Anisotropy F',
				'group': 'Anisotropy',
				'position': 162,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Foliation, T2/T3',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_f'
				}]
			},
			'aniso_ff': {
				'label': 'Anisotropy F\'',
				'group': 'Anisotropy',
				'position': 163,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1130/0016-7606(1977)88<1231:SOFSUA>2.0.CO;2'],
				'description': 'Log foliation, ln(F)',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_ff'
				}]
			},
			'aniso_fl': {
				'label': 'Anisotropy FL Ratio',
				'group': 'Anisotropy',
				'position': 164,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'F/L',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_fl'
				}]
			},
			'aniso_t': {
				'label': 'Anisotropy T',
				'group': 'Anisotropy',
				'position': 165,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1016/0040-1951(81)90110-4'],
				'description': 'Shape factor',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_t'
				}]
			},
			'aniso_vg': {
				'label': 'Anisotropy Vg',
				'group': 'Anisotropy',
				'position': 166,
				'type': 'Number',
				'unit': 'Dimensionless',
				'urls': ['http://dx.doi.org/10.1130/0016-7606(1977)88<1231:SOFSUA>2.0.CO;2'],
				'description': 'Graham\'s V parameter defined by sin(V)=sqrt((K2-K3)/(K1-K3))',
				'notes': 'Fabric is oblate when V > 45 degrees',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_vg'
				}]
			},
			'aniso_ftest_quality': {
				'label': 'Anisotropy F Test Quality',
				'group': 'Anisotropy',
				'position': 167,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Indicating if a good (g) or bad (b) data according to the F statistical test for anisotropy',
				'notes': 'Can be left empty. This is the case for many legacy data sets.',
				'validations': ['cv("data_quality")']
			},
			'aniso_ftest': {
				'label': 'Anisotropy F Test',
				'group': 'Anisotropy',
				'position': 168,
				'type': 'Number',
				'unit': '%',
				'description': 'F statistical test for anisotropy',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_ftest'
				}]
			},
			'aniso_ftest12': {
				'label': 'Anisotropy F Test Prolateness',
				'group': 'Anisotropy',
				'position': 169,
				'type': 'Number',
				'unit': '%',
				'description': 'F statistical test for prolateness',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_ftest12'
				}]
			},
			'aniso_ftest23': {
				'label': 'Anisotropy F Test Oblateness',
				'group': 'Anisotropy',
				'position': 170,
				'type': 'Number',
				'unit': '%',
				'description': 'F statistical test for oblateness',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'anisotropy_ftest23'
				}]
			},
			'hyst_loop': {
				'label': 'Hysteresis Loop Number',
				'group': 'Hysteresis',
				'position': 171,
				'type': 'Integer',
				'description': 'Hysteresis loop counter',
				'previous_columns': [{
					'table': 'rmag_hysteresis',
					'column': 'measurement_loop_x'
				}]
			},
			'hyst_ss': {
				'label': 'Hysteresis S*',
				'group': 'Hysteresis',
				'position': 172,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Curvature of major loop in upper left quadrant',
				'validations': ['min(0)', 'max(1)'],
				'previous_columns': [{
					'table': 'rmag_hysteresis',
					'column': 'hysteresis_ss'
				}]
			},
			'hyst_sq': {
				'label': 'Hysteresis Squareness',
				'group': 'Hysteresis',
				'position': 173,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Squareness of major loop',
				'validations': ['min(0)', 'max(1)'],
				'previous_columns': [{
					'table': 'rmag_hysteresis',
					'column': 'hysteresis_sq'
				}]
			},
			'hyst_mr_moment': {
				'label': 'Hysteresis Mr Moment',
				'group': 'Hysteresis',
				'position': 174,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Measured intensity of remanent magnetization, Moment',
				'previous_columns': [{
					'table': 'rmag_hysteresis',
					'column': 'hysteresis_mr_moment'
				}]
			},
			'hyst_mr_volume': {
				'label': 'Hysteresis Mr Volume',
				'group': 'Hysteresis',
				'position': 175,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Measured intensity of remanent magnetization, Volume normalized',
				'previous_columns': [{
					'table': 'rmag_hysteresis',
					'column': 'hysteresis_mr_volume'
				}]
			},
			'hyst_mr_mass': {
				'label': 'Hysteresis Mr Mass',
				'group': 'Hysteresis',
				'position': 176,
				'type': 'Number',
				'unit': 'Am^2/kg',
				'description': 'Measured intensity of remanent magnetization, Mass normalized',
				'previous_columns': [{
					'table': 'rmag_hysteresis',
					'column': 'hysteresis_mr_mass'
				}]
			},
			'hyst_ms_moment': {
				'label': 'Hysteresis Ms Moment',
				'group': 'Hysteresis',
				'position': 177,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Measured intensity of saturation magnetization, Moment',
				'previous_columns': [{
					'table': 'rmag_hysteresis',
					'column': 'hysteresis_ms_moment'
				}]
			},
			'hyst_ms_volume': {
				'label': 'Hysteresis Ms Volume',
				'group': 'Hysteresis',
				'position': 178,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Measured intensity of saturation magnetization, Volume normalized',
				'previous_columns': [{
					'table': 'rmag_hysteresis',
					'column': 'hysteresis_ms_volume'
				}]
			},
			'hyst_ms_mass': {
				'label': 'Hysteresis Ms Mass',
				'group': 'Hysteresis',
				'position': 179,
				'type': 'Number',
				'unit': 'Am^2/kg',
				'description': 'Measured intensity of saturation magnetization, Mass normalized',
				'previous_columns': [{
					'table': 'rmag_hysteresis',
					'column': 'hysteresis_ms_mass'
				}]
			},
			'hyst_mr_ms': {
				'label': 'Hysteresis Mr over Ms',
				'group': 'Hysteresis',
				'position': 180,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Ratio of saturation remanence to saturation',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'hysteresis_mr_ms'
				}]
			},
			'hyst_bcr': {
				'label': 'Hysteresis Bcr',
				'group': 'Hysteresis',
				'position': 181,
				'type': 'Number',
				'unit': 'T',
				'description': 'Coercivity of remanence',
				'previous_columns': [{
					'table': 'rmag_hysteresis',
					'column': 'hysteresis_bcr'
				}]
			},
			'hyst_bc': {
				'label': 'Hysteresis Bc',
				'group': 'Hysteresis',
				'position': 182,
				'type': 'Number',
				'unit': 'T',
				'description': 'Coercivity',
				'previous_columns': [{
					'table': 'rmag_hysteresis',
					'column': 'hysteresis_bc'
				}]
			},
			'hyst_bcr_bc': {
				'label': 'Hysteresis Bcr over Bc',
				'group': 'Hysteresis',
				'position': 183,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Ratio of coercivity of remanence over coercivity',
				'previous_columns': [{
					'table': 'rmag_results',
					'column': 'hysteresis_bcr_bc'
				}]
			},
			'hyst_bc_offset': {
				'label': 'Hysteresis Bc Offset',
				'group': 'Hysteresis',
				'position': 184,
				'type': 'Number',
				'unit': 'T',
				'description': 'Offset between coercivity in positive and negative fields',
				'previous_columns': [{
					'table': 'rmag_hysteresis',
					'column': 'hysteresis_bc_offset'
				}]
			},
			'hyst_xhf': {
				'label': 'Hysteresis Xhf',
				'group': 'Hysteresis',
				'position': 185,
				'type': 'Number',
				'unit': 'm^3',
				'description': 'High field slope',
				'previous_columns': [{
					'table': 'rmag_hysteresis',
					'column': 'hysteresis_xhf'
				}]
			},
			'hyst_th': {
				'label': 'Hysteresis Transient Induction',
				'group': 'Hysteresis',
				'position': 186,
				'type': 'Number',
				'unit': 'T',
				'description': 'Transient energy dissipation related to domain state',
				'previous_columns': [{
					'table': 'rmag_hysteresis',
					'column': 'hysteresis_th'
				}]
			},
			'rem_dfc_moment': {
				'label': 'Remanence Delta Field Cooled Moment',
				'group': 'Remanence',
				'position': 187,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Fractional remanence loss at Tv (80K,130K) after field cooling, Moment',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_dfc_moment'
				}]
			},
			'rem_dfc_volume': {
				'label': 'Remanence Delta Field Cooled Volume',
				'group': 'Remanence',
				'position': 188,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Fractional remanence loss at Tv (80K,130K) after field cooling, Volume normalized',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_dfc_volume'
				}]
			},
			'rem_dfc_mass': {
				'label': 'Remanence Delta Field Cooled Mass',
				'group': 'Remanence',
				'position': 189,
				'type': 'Number',
				'unit': 'Am^2/kg',
				'description': 'Fractional remanence loss at Tv (80K,130K) after field cooling, Mass normalized',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_dfc_mass'
				}]
			},
			'rem_dzfc_moment': {
				'label': 'Remanence Delta Zerofield Cooled Moment',
				'group': 'Remanence',
				'position': 190,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Fractional remanence loss at Tv (80K,130K) after zero-field cooling, Moment',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_dzfc_moment'
				}]
			},
			'rem_dzfc_volume': {
				'label': 'Remanence Delta Zerofield Cooled Volume',
				'group': 'Remanence',
				'position': 191,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Fractional remanence loss at Tv (80K,130K) after zero-field cooling, Volume normalized',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_dzfc_volume'
				}]
			},
			'rem_dzfc_mass': {
				'label': 'Remanence Delta Zerofield Cooled Mass',
				'group': 'Remanence',
				'position': 192,
				'type': 'Number',
				'unit': 'Am^2/kg',
				'description': 'Fractional remanence loss at Tv (80K,130K) after zero-field cooling, Mass normalized',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_dzfc_mass'
				}]
			},
			'rem_delta_ratio': {
				'label': 'Remanence Delta FC/ZFC Ratio',
				'group': 'Remanence',
				'position': 193,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Ratio (Delta FC/Delta ZFC)',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_delta_ratio'
				}]
			},
			'rem_delta_temp_low': {
				'label': 'Remanence Delta Temperature Low',
				'group': 'Remanence',
				'position': 194,
				'type': 'Number',
				'unit': 'K',
				'description': 'Low Temperature of delta FC/ZFC calculation',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_delta_temp_low'
				}]
			},
			'rem_delta_temp_high': {
				'label': 'Remanence Delta Temperature High',
				'group': 'Remanence',
				'position': 195,
				'type': 'Number',
				'unit': 'K',
				'description': 'High Temperature of delta FC/ZFC calculation',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_delta_temp_high'
				}]
			},
			'rem_mr_moment': {
				'label': 'Remanence Mr Moment',
				'group': 'Remanence',
				'position': 196,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Measured intensity of remanent moment, Moment',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_mr_moment'
				}]
			},
			'rem_mr_volume': {
				'label': 'Remanence Mr Volume',
				'group': 'Remanence',
				'position': 197,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Measured intensity of remanent moment, Volume normalized',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_mr_volume'
				}]
			},
			'rem_mr_mass': {
				'label': 'Remanence Mr Mass',
				'group': 'Remanence',
				'position': 198,
				'type': 'Number',
				'unit': 'Am^2/kg',
				'description': 'Measured intensity of remanent moment, Mass normalized',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_mr_mass'
				}]
			},
			'rem_bcr': {
				'label': 'Remanence Bcr',
				'group': 'Remanence',
				'position': 199,
				'type': 'Number',
				'unit': 'T',
				'description': 'Coercivity of remanence',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_bcr'
				}]
			},
			'rem_sratio': {
				'label': 'Remanence S Ratio',
				'group': 'Remanence',
				'position': 200,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'SIRM ratio S(X)',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_sratio'
				}]
			},
			'rem_sratio_forward': {
				'label': 'Remanence S Ratio Forward Field',
				'group': 'Remanence',
				'position': 201,
				'type': 'Number',
				'unit': 'T',
				'description': 'SIRM field used to calculate S Ratio',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_sratio_forward'
				}]
			},
			'rem_sratio_back': {
				'label': 'Remanence S Ratio Back Field',
				'group': 'Remanence',
				'position': 202,
				'type': 'Number',
				'unit': 'T',
				'description': 'Backfield used to calculate S Ratio',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_sratio_back'
				}]
			},
			'rem_hirm_moment': {
				'label': 'Remanence HIRM Moment',
				'group': 'Remanence',
				'position': 203,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Hard IRM factor, HIRM = SIRM - IRM(300 mT), Moment',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_hirm_moment'
				}]
			},
			'rem_hirm_volume': {
				'label': 'Remanence HIRM Volume',
				'group': 'Remanence',
				'position': 204,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Hard IRM factor, HIRM = SIRM - IRM(300 mT), Volume normalized',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_hirm_volume'
				}]
			},
			'rem_hirm_mass': {
				'label': 'Remanence HIRM Mass',
				'group': 'Remanence',
				'position': 205,
				'type': 'Number',
				'unit': 'Am^2/kg',
				'description': 'Hard IRM factor, HIRM = SIRM - IRM(300 mT), Mass normalized',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_hirm_mass'
				}]
			},
			'rem_armx': {
				'label': 'Remanence ARMx',
				'group': 'Remanence',
				'position': 206,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Anhysteretic susceptibility, Xarm = ARM / Hdc',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_armx'
				}]
			},
			'rem_cross_over': {
				'label': 'Remanence Cross Over Point',
				'group': 'Remanence',
				'position': 207,
				'type': 'Number',
				'unit': 'T',
				'description': 'Field at which demagnetization moment equals acquisition moment',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_cross_over'
				}]
			},
			'rem_mdf': {
				'label': 'Remanence MDF',
				'group': 'Remanence',
				'position': 208,
				'type': 'Number',
				'unit': 'T',
				'description': 'Median destructive field',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_mdf'
				}]
			},
			'rem_maf': {
				'label': 'Remanence MAF',
				'group': 'Remanence',
				'position': 209,
				'type': 'Number',
				'unit': 'T',
				'description': 'Median acquisition field',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_maf'
				}]
			},
			'rem_mdt': {
				'label': 'Remanence MDT',
				'group': 'Remanence',
				'position': 210,
				'type': 'Number',
				'unit': 'K',
				'description': 'Median destructive temperature',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_mdt'
				}]
			},
			'rem_cmf': {
				'label': 'Remanence Component Median Field',
				'group': 'Remanence',
				'position': 211,
				'type': 'Number',
				'unit': 'T',
				'description': 'Median field of remanence component',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_cmf'
				}]
			},
			'rem_cd': {
				'label': 'Remanence Component Dispersion',
				'group': 'Remanence',
				'position': 212,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Dispersion (standard deviation) of remanence components',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_cd'
				}]
			},
			'rem_n_comp': {
				'label': 'Remanence N Components',
				'group': 'Remanence',
				'position': 213,
				'type': 'Integer',
				'description': 'Number of remanence components used',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_comp_n'
				}]
			},
			'rem_sa': {
				'label': 'Remanence Sa',
				'group': 'Remanence',
				'position': 214,
				'type': 'Number',
				'unit': 'Am^2/log(s)',
				'description': 'Viscosity coefficient dM/d(log t) during the acquisition of viscous remanence',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_sa'
				}]
			},
			'rem_sd': {
				'label': 'Remanence Sd',
				'group': 'Remanence',
				'position': 215,
				'type': 'Number',
				'unit': 'Am^2/log(s)',
				'description': 'Decay in the viscosity coefficient dM/d(log t) during the acquisition of viscous remanence',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_sd'
				}]
			},
			'rem_q': {
				'label': 'Remanence Koenigsberger Ratio',
				'group': 'Remanence',
				'position': 216,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Koenigsberger ratio',
				'previous_columns': [{
					'table': 'rmag_remanence',
					'column': 'remanence_q'
				}]
			},
			'rem_ltd_perc': {
				'label': 'Remanence Low-T Demag %',
				'group': 'Remanence',
				'position': 217,
				'type': 'Number',
				'unit': '%',
				'urls': ['http://dx.doi.org/10.1111/j.1365-246X.2005.02651.x '],
				'description': 'Low-temperature demagnetization percentage',
				'validations': ['min(0)', 'max(100)']
			},
			'susc_chi_volume': {
				'label': 'Susceptibility X Volume',
				'group': 'Susceptibility',
				'position': 218,
				'type': 'Number',
				'unit': 'SI Dimensionless',
				'description': 'Average magnetic susceptibility, Volume normalized',
				'previous_columns': [{
					'table': 'rmag_susceptibility',
					'column': 'susceptibility_chi_volume'
				}]
			},
			'susc_chi_mass': {
				'label': 'Susceptibility X Mass',
				'group': 'Susceptibility',
				'position': 219,
				'type': 'Number',
				'unit': 'm^3/kg',
				'description': 'Average magnetic susceptibility, Mass normalized',
				'previous_columns': [{
					'table': 'rmag_susceptibility',
					'column': 'susceptibility_chi_mass'
				}]
			},
			'susc_f': {
				'label': 'Susceptibility Xfd',
				'group': 'Susceptibility',
				'position': 220,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Frequency dependence , Xfd calculation',
				'previous_columns': [{
					'table': 'rmag_susceptibility',
					'column': 'susceptibility_f'
				}]
			},
			'susc_f_low': {
				'label': 'Susceptibility Xfd Low',
				'group': 'Susceptibility',
				'position': 221,
				'type': 'Number',
				'unit': 'Hz',
				'description': 'Xfd calculation, Low frequency',
				'previous_columns': [{
					'table': 'rmag_susceptibility',
					'column': 'susceptibility_f_low'
				}]
			},
			'susc_f_high': {
				'label': 'Susceptibility Xfd High',
				'group': 'Susceptibility',
				'position': 222,
				'type': 'Number',
				'unit': 'Hz',
				'description': 'Xfd calculation, High frequency',
				'previous_columns': [{
					'table': 'rmag_susceptibility',
					'column': 'susceptibility_f_high'
				}]
			},
			'susc_h': {
				'label': 'Susceptibility Xhd',
				'group': 'Susceptibility',
				'position': 223,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Amplitude dependence, Xhd calculation',
				'previous_columns': [{
					'table': 'rmag_susceptibility',
					'column': 'susceptibility_h'
				}]
			},
			'susc_h_low': {
				'label': 'Susceptibility Xhd Low',
				'group': 'Susceptibility',
				'position': 224,
				'type': 'Number',
				'unit': 'T',
				'description': 'Xhd calculation, Low amplitude',
				'previous_columns': [{
					'table': 'rmag_susceptibility',
					'column': 'susceptibility_h_low'
				}]
			},
			'susc_h_high': {
				'label': 'Susceptibility Xhd High',
				'group': 'Susceptibility',
				'position': 225,
				'type': 'Number',
				'unit': 'T',
				'description': 'Xhd calculation, High amplitude',
				'previous_columns': [{
					'table': 'rmag_susceptibility',
					'column': 'susceptibility_h_high'
				}]
			},
			'susc_loss_tangent': {
				'label': 'Susceptibility Loss Tangent',
				'group': 'Susceptibility',
				'position': 226,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Loss tangent or X(quadrature) over X(inphase)',
				'previous_columns': [{
					'table': 'rmag_susceptibility',
					'column': 'susceptibility_loss_tangent'
				}]
			},
			'susc_lab_field_ac_high': {
				'label': 'Susceptibility Max Lab AC Field',
				'group': 'Susceptibility',
				'position': 227,
				'type': 'Number',
				'unit': 'T',
				'description': 'Maximum or peak lab AC field applied during measurement',
				'notes': 'No field equals 0 and ambient field equals -1',
				'validations': ['min(-1)', 'max(1)'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'specimen_lab_field_ac'
				}]
			},
			'description': {
				'label': 'Description',
				'group': 'Metadata',
				'position': 228,
				'type': 'String',
				'description': 'Specimen and result description and comments',
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'specimen_description'
				}, {
					'table': 'pmag_specimens',
					'column': 'specimen_description'
				}, {
					'table': 'er_fossils',
					'column': 'fossil_description'
				}, {
					'table': 'er_minerals',
					'column': 'mineral_description'
				}, {
					'table': 'er_synthetics',
					'column': 'synthetic_description'
				}, {
					'table': 'pmag_results',
					'column': 'pmag_result_name'
				}, {
					'table': 'pmag_results',
					'column': 'result_description'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'anisotropy_description'
				}, {
					'table': 'rmag_hysteresis',
					'column': 'hysteresis_description'
				}, {
					'table': 'rmag_remanence',
					'column': 'remanence_description'
				}, {
					'table': 'rmag_susceptibility',
					'column': 'susceptibility_description'
				}, {
					'table': 'rmag_results',
					'column': 'rmag_result_name'
				}, {
					'table': 'rmag_results',
					'column': 'result_description'
				}]
			},
			'rotation_sequence': {
				'label': 'Sequence of Rotations',
				'group': 'Metadata',
				'position': 229,
				'type': 'Matrix',
				'description': 'N by M matrix with N sequential rotations and the length of each row defined by the first element: the rotation type',
				'examples': ['DD:20:124;TP:45:14'],
				'validations': ['matrix(0,3)'],
				'previous_columns': [{
					'table': 'pmag_rotations',
					'column': 'rotation_description'
				}, {
					'table': 'pmag_rotations',
					'column': 'rotation_definition'
				}, {
					'table': 'pmag_rotations',
					'column': 'rotation_lambda'
				}, {
					'table': 'pmag_rotations',
					'column': 'rotation_phi'
				}, {
					'table': 'pmag_rotations',
					'column': 'rotation_omega'
				}]
			},
			'criteria': {
				'label': 'Criteria Names',
				'group': 'Metadata',
				'position': 230,
				'type': 'List',
				'description': 'Colon-delimited list of criteria names',
				'examples': ['MY-MAD', 'MY-APLHA95'],
				'validations': ['in("criteria.criterion")'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'pmag_criteria_codes'
				}, {
					'table': 'pmag_results',
					'column': 'pmag_criteria_codes'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'rmag_criteria_codes'
				}, {
					'table': 'rmag_hysteresis',
					'column': 'rmag_criteria_codes'
				}, {
					'table': 'rmag_remanence',
					'column': 'rmag_criteria_codes'
				}, {
					'table': 'rmag_susceptibility',
					'column': 'rmag_criteria_codes'
				}, {
					'table': 'rmag_results',
					'column': 'rmag_criteria_codes'
				}]
			},
			'instrument_codes': {
				'label': 'Instrument Codes',
				'group': 'Metadata',
				'position': 231,
				'type': 'List',
				'description': 'Colon-delimited list of instrument codes',
				'validations': ['sv("instrument_code")'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'magic_instrument_codes'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'magic_instrument_codes'
				}, {
					'table': 'rmag_hysteresis',
					'column': 'magic_instrument_codes'
				}, {
					'table': 'rmag_remanence',
					'column': 'magic_instrument_codes'
				}, {
					'table': 'rmag_susceptibility',
					'column': 'magic_instrument_codes'
				}, {
					'table': 'rmag_results',
					'column': 'magic_instrument_codes'
				}]
			},
			'software_packages': {
				'label': 'Software Packages',
				'group': 'Metadata',
				'position': 232,
				'type': 'List',
				'description': 'Colon-delimited list of software used for data reduction',
				'examples': ['PmagPy v1.67b', 'FORCinel v1.11'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'magic_software_packages'
				}, {
					'table': 'pmag_results',
					'column': 'magic_software_packages'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'magic_software_packages'
				}, {
					'table': 'rmag_hysteresis',
					'column': 'magic_software_packages'
				}, {
					'table': 'rmag_remanence',
					'column': 'magic_software_packages'
				}, {
					'table': 'rmag_susceptibility',
					'column': 'magic_software_packages'
				}, {
					'table': 'rmag_results',
					'column': 'magic_software_packages'
				}]
			},
			'external_database_ids': {
				'label': 'External Database IDs',
				'group': 'Metadata',
				'position': 233,
				'type': 'Dictionary',
				'description': 'Dictionary of external databases and IDs where data are used',
				'examples': ['GEOMAGIA50[1435]:CALS7K.2[23]', 'ARCHEO00[2329]', 'ARCHEO00[] if the ID is unknown'],
				'validations': ['cv("database_names")'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'external_database_names'
				}, {
					'table': 'pmag_specimens',
					'column': 'external_database_ids'
				}, {
					'table': 'pmag_results',
					'column': 'external_database_names'
				}, {
					'table': 'pmag_results',
					'column': 'external_database_ids'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'external_database_names'
				}, {
					'table': 'rmag_hysteresis',
					'column': 'external_database_names'
				}, {
					'table': 'rmag_remanence',
					'column': 'external_database_names'
				}, {
					'table': 'rmag_susceptibility',
					'column': 'external_database_names'
				}, {
					'table': 'rmag_results',
					'column': 'external_database_names'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'external_database_ids'
				}, {
					'table': 'rmag_hysteresis',
					'column': 'external_database_ids'
				}, {
					'table': 'rmag_remanence',
					'column': 'external_database_ids'
				}, {
					'table': 'rmag_susceptibility',
					'column': 'external_database_ids'
				}, {
					'table': 'rmag_results',
					'column': 'external_database_ids'
				}]
			},
			'scientists': {
				'label': 'Research Scientist Names',
				'group': 'Metadata',
				'position': 234,
				'type': 'List',
				'description': 'Colon-delimited list of EarthRef handles or ORCIDs or names and emails for scientists who described the specimen',
				'examples': ['@user1:@user2:0000-0002-9000-2100:Not A. Member <no.earthref.handle@gmail.com>'],
				'validations': ['type("users")'],
				'previous_columns': [{
					'table': 'er_specimens',
					'column': 'er_scientist_mail_names'
				}, {
					'table': 'er_fossils',
					'column': 'er_scientist_mail_names'
				}, {
					'table': 'er_minerals',
					'column': 'er_scientist_mail_names'
				}, {
					'table': 'er_synthetics',
					'column': 'er_scientist_mail_names'
				}]
			},
			'analysts': {
				'label': 'Analyst Names',
				'group': 'Metadata',
				'position': 235,
				'type': 'List',
				'description': 'Colon-delimited list of EarthRef handles or ORCIDs or names and emails for analysts',
				'examples': ['@user1:@user2:0000-0002-9000-2100:Not A. Member <no.earthref.handle@gmail.com>'],
				'validations': ['type("users")'],
				'previous_columns': [{
					'table': 'pmag_specimens',
					'column': 'er_analyst_mail_names'
				}, {
					'table': 'pmag_results',
					'column': 'er_analyst_mail_names'
				}, {
					'table': 'rmag_anisotropy',
					'column': 'er_analyst_mail_names'
				}, {
					'table': 'rmag_hysteresis',
					'column': 'er_analyst_mail_names'
				}, {
					'table': 'rmag_remanence',
					'column': 'er_analyst_mail_names'
				}, {
					'table': 'rmag_susceptibility',
					'column': 'er_analyst_mail_names'
				}, {
					'table': 'rmag_results',
					'column': 'er_analyst_mail_names'
				}]
			}
		}
	}

	,
	'measurements': {
		'label': 'Measurements',
		'position': 6,
		'description': 'Measurements',
		'notes': 'Raw instrument data',
		'columns': {
			'contribution_id': {
				'label': 'Contribution ID',
				'group': 'Contribution',
				'position': 1,
				'type': 'Integer',
				'description': 'Unique MagIC contribution ID',
				'examples': ['5412'],
				'validations': ['downloadOnly()']
			},
			'row_id': {
				'label': 'Contribution Row ID',
				'group': 'Contribution',
				'position': 2,
				'type': 'Integer',
				'description': 'Unique row ID within a MagIC Contribution',
				'examples': ['743'],
				'validations': ['downloadOnly()']
			},
			'measurement': {
				'label': 'Measurement Name',
				'group': 'Names',
				'position': 3,
				'type': 'String',
				'description': 'Unique measurement identifier',
				'examples': ['SFVP01-01a-LT-AF-Z-1', 'SFVP01-01a-LT-AF-Z-2', 'SFVP01-01a-LT-T-Z-1'],
				'validations': ['key()', 'required()', 'unique()'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_number'
				}]
			},
			'experiment': {
				'label': 'Experiment Name',
				'group': 'Names',
				'position': 4,
				'type': 'String',
				'description': 'Name for experiment',
				'examples': ['SFVP01-01a-LT-AF-Z'],
				'validations': ['required()'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'magic_experiment_name'
				}]
			},
			'specimen': {
				'label': 'Specimen Name',
				'group': 'Names',
				'position': 5,
				'type': 'String',
				'description': 'Name for specimen',
				'examples': ['SFVP01-01a'],
				'validations': ['in("specimens.specimen")', 'required()'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'er_specimen_name'
				}, {
					'table': 'magic_measurements',
					'column': 'er_synthetic_name'
				}]
			},
			'sequence': {
				'label': 'Measurement Sequence',
				'group': 'Measurement',
				'position': 6,
				'type': 'Integer',
				'description': 'Order of the measurements',
				'examples': ['-50', '0', '1', '343'],
				'validations': ['unique()', 'recommended()']
			},
			'standard': {
				'label': 'Measurement Standard',
				'group': 'Measurement',
				'position': 7,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Indicating if a standard (s) or an unknown (u) measurement',
				'validations': ['cv("measurement_type")'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_standard'
				}]
			},
			'quality': {
				'label': 'Measurement Quality',
				'group': 'Measurement',
				'position': 8,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Indicating if a good (g) or bad (b) measurement',
				'notes': 'Can be left empty. This is the case for many legacy data sets.',
				'validations': ['cv("data_quality")', 'required()'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_flag'
				}]
			},
			'method_codes': {
				'label': 'Method Codes',
				'group': 'Measurement',
				'position': 9,
				'type': 'List',
				'description': 'Colon-delimited list of method codes',
				'validations': ['type("method_codes")', 'required()'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'magic_method_codes'
				}]
			},
			'instrument_codes': {
				'label': 'Instrument Code',
				'group': 'Measurement',
				'position': 10,
				'type': 'List',
				'description': 'Colon-delimited list of instrument codes',
				'examples': ['SIO-Bubba', 'IRM-OldBlue'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'magic_instrument_codes'
				}]
			},
			'display_order': {
				'label': 'Display Order',
				'group': 'Measurement',
				'position': 11,
				'type': 'Number',
				'description': 'Order of the rows for display purposes. If not set at upload will be set to the order in the uploaded file. Can be a float of either sign.',
				'examples': ['1', '0', '1.2', '-4.34']
			},
			'result_type': {
				'label': 'Result Type',
				'group': 'Measurement',
				'position': 12,
				'type': 'String',
				'unit': 'Flag',
				'description': 'Individual/raw data (i) or model (m) data',
				'notes': 'Usually this parameter will be set to (i). (m) is used when low level data is calculated using a model. For example the magnetic moment at a location using a SQUID microscope could be modeled (m) from  the raw Bz (i) field measured.',
				'examples': ['i', 'm'],
				'validations': ['cv("data_type")']
			},
			'citations': {
				'label': 'Citation DOIs',
				'group': 'Measurement',
				'position': 13,
				'type': 'List',
				'description': 'Colon-delimited list of citation DOIs',
				'examples': ['10.1029/92JB01202', '10.1029/2003GC000635:This study', '"10.1023/A:1015035228810":This study'],
				'validations': ['type("references")', 'required()'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'er_citation_names'
				}]
			},
			'treat_temp': {
				'label': 'Lab Treatment Temperature',
				'group': 'Lab Treatments',
				'position': 14,
				'type': 'Number',
				'unit': 'K',
				'description': 'Demagnetization temperature',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'treatment_temp'
				}]
			},
			'treat_temp_decay_rate': {
				'label': 'Lab Treatment Temperature Decay Rate',
				'group': 'Lab Treatments',
				'position': 15,
				'type': 'Number',
				'unit': 'K/s',
				'description': 'Decay rate of temperature on cooling',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'treatment_temp_decay_rate'
				}]
			},
			'treat_temp_dc_on': {
				'label': 'Lab Treatment Temperature DC Field On',
				'group': 'Lab Treatments',
				'position': 16,
				'type': 'Number',
				'unit': 'K',
				'description': 'Temperature in a pTRM experiment at which DC field is turned on',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'treatment_temp_dc_on'
				}]
			},
			'treat_temp_dc_off': {
				'label': 'Lab Treatment Temperature DC Field Off',
				'group': 'Lab Treatments',
				'position': 17,
				'type': 'Number',
				'unit': 'K',
				'description': 'Temperature in a pTRM experiment at which DC field is turned off',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'treatment_temp_dc_off'
				}]
			},
			'treat_ac_field': {
				'label': 'Lab Treatment AC Field',
				'group': 'Lab Treatments',
				'position': 18,
				'type': 'Number',
				'unit': 'T',
				'description': 'Peak field in AC demagnetization experiment',
				'validations': ['min(-5)', 'max(5)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'treatment_ac_field'
				}]
			},
			'treat_ac_field_decay_rate': {
				'label': 'Lab Treatment AC Field Decay Rate',
				'group': 'Lab Treatments',
				'position': 19,
				'type': 'Number',
				'unit': 'T/s',
				'description': 'Decay rate of AC field in AC field demagnetization experiment',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'treatment_ac_field_decay_rate'
				}]
			},
			'treat_ac_field_dc_on': {
				'label': 'Lab Treatment AC Field DC Field On',
				'group': 'Lab Treatments',
				'position': 20,
				'type': 'Number',
				'unit': 'T',
				'description': 'AC field in a pARM experiment at which DC field is turned on',
				'validations': ['min(-5)', 'max(5)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'treatment_ac_field_dc_on'
				}]
			},
			'treat_ac_field_dc_off': {
				'label': 'Lab Treatment AC Field DC Field Off',
				'group': 'Lab Treatments',
				'position': 21,
				'type': 'Number',
				'unit': 'T',
				'description': 'AC field in a pARM experiment at which DC field is turned off',
				'validations': ['min(-5)', 'max(5)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'treatment_ac_field_dc_off'
				}]
			},
			'treat_dc_field': {
				'label': 'Lab Treatment DC Field',
				'group': 'Lab Treatments',
				'position': 22,
				'type': 'Number',
				'unit': 'T',
				'description': 'Applied DC field',
				'validations': ['min(-100)', 'max(100)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'treatment_dc_field'
				}]
			},
			'treat_dc_field_decay_rate': {
				'label': 'Lab Treatment DC Field Decay Rate',
				'group': 'Lab Treatments',
				'position': 23,
				'type': 'Number',
				'unit': 'T/s',
				'description': 'Decay rate of DC field after switching off',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'treatment_dc_field_decay_rate'
				}]
			},
			'treat_dc_field_ac_on': {
				'label': 'Lab Treatment DC Field AC Field On',
				'group': 'Lab Treatments',
				'position': 24,
				'type': 'Number',
				'unit': 'T',
				'description': 'DC field in DC field experiment at which AC field is turned on',
				'validations': ['min(-100)', 'max(100)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'treatment_dc_field_ac_on'
				}]
			},
			'treat_dc_field_ac_off': {
				'label': 'Lab Treatment DC Field AC Field Off',
				'group': 'Lab Treatments',
				'position': 25,
				'type': 'Number',
				'unit': 'T',
				'description': 'DC field in DC field experiment at which AC field is turned off',
				'validations': ['min(-100)', 'max(100)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'treatment_dc_field_ac_off'
				}]
			},
			'treat_dc_field_theta': {
				'label': 'Lab Treatment Orientation Theta',
				'group': 'Lab Treatments',
				'position': 26,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Orientation of the lab field with respect to the specimen during treatment',
				'notes': 'Angle between the specimen x-y plane and the field direction. Positive toward the positive z direction.',
				'validations': ['min(-90)', 'max(90)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'treatment_dc_field_theta'
				}]
			},
			'treat_dc_field_phi': {
				'label': 'Lab Treatment Orientation Phi',
				'group': 'Lab Treatments',
				'position': 27,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Orientation of the lab field with respect to the specimen during treatment',
				'notes': 'Angle of the field direction when projected into the x-y plane. Positive x-axis is 0 and increasing toward the positive y-axis.',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'treatment_dc_field_phi'
				}]
			},
			'treat_mw_power': {
				'label': 'Lab Treatment MW Power',
				'group': 'Lab Treatments',
				'position': 28,
				'type': 'Number',
				'unit': 'W',
				'description': 'Microwave power',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'treatment_mw_power'
				}]
			},
			'treat_mw_time': {
				'label': 'Lab Treatment MW Time',
				'group': 'Lab Treatments',
				'position': 29,
				'type': 'Number',
				'unit': 's',
				'description': 'Time (in seconds) of microwave power application',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'treatment_mw_time'
				}]
			},
			'treat_mw_integral': {
				'label': 'Lab Treatment MW Power Integral',
				'group': 'Lab Treatments',
				'position': 30,
				'type': 'Number',
				'unit': 'J',
				'description': 'Absorbed microwave energy, Applied microwave energy minus reflected microwave energy',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'treatment_mw_integral'
				}]
			},
			'treat_mw_step': {
				'label': 'Lab Treatment MW Step Index',
				'group': 'Lab Treatments',
				'position': 31,
				'type': 'Number',
				'description': 'Number that labels the steps that are the same level in a microwave experiment',
				'examples': ['1', '2', '3', '4', '4.21', '10.8'],
				'validations': ['min(0)']
			},
			'treat_step_num': {
				'label': 'Lab Treatment Step Index',
				'group': 'Lab Treatments',
				'position': 32,
				'type': 'Integer',
				'description': 'An integer that increases by one for each measurement done during an experiment',
				'notes': 'The same 2.5 magic_measurements.measurement_number for SIO and used that way in Thellier GUI.',
				'examples': ['1', '2', '3', '4', '4345', '4345'],
				'validations': ['min(0)']
			},
			'meas_pos_x': {
				'label': 'Measurement X Position',
				'group': 'Measurement Parameters',
				'position': 33,
				'type': 'Number',
				'unit': 'm',
				'description': 'Position of the measurement relative to an arbitrary origin on the specimen, X',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_pos_x'
				}]
			},
			'meas_pos_y': {
				'label': 'Measurement Y Position',
				'group': 'Measurement Parameters',
				'position': 34,
				'type': 'Number',
				'unit': 'm',
				'description': 'Position of the measurement relative to an arbitrary origin on the specimen, Y',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_pos_y'
				}]
			},
			'meas_pos_z': {
				'label': 'Measurement Z Position',
				'group': 'Measurement Parameters',
				'position': 35,
				'type': 'Number',
				'unit': 'm',
				'description': 'Position of the measurement relative to an arbitrary origin on the specimen, Z',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_pos_z'
				}]
			},
			'meas_orient_theta': {
				'label': 'Measurement Orientation Theta',
				'group': 'Measurement Parameters',
				'position': 36,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Orientation of specimen in magnetometer/instrument',
				'notes': 'Angle between the specimen x-axis and the measurement orientation coordinate\'s x-y plane. Positive toward the positive z direction.',
				'validations': ['min(-90)', 'max(90)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_orient_theta'
				}]
			},
			'meas_orient_phi': {
				'label': 'Measurement Orientation Phi',
				'group': 'Measurement Parameters',
				'position': 37,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Orientation of specimen in magnetometer/instrument',
				'notes': 'Angle of the specimen x-axis to the measurement x-axis when projected into the measurement coordinate\'s x-y plane. Positive x-axis is 0 and increasing toward the positive y-axis.',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_orient_phi'
				}]
			},
			'meas_n_orient': {
				'label': 'Measurement N Orientations',
				'group': 'Measurement Parameters',
				'position': 38,
				'type': 'Integer',
				'description': 'Number of different orientations in measurement',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_positions'
				}]
			},
			'meas_temp': {
				'label': 'Measurement Temperature',
				'group': 'Measurement Parameters',
				'position': 39,
				'type': 'Number',
				'unit': 'K',
				'description': 'Temperature',
				'notes': 'Temperature at which the measurement was made. Room temperature is 293.',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_temp'
				}]
			},
			'meas_temp_change': {
				'label': 'Measurement Temperature Change',
				'group': 'Measurement Parameters',
				'position': 40,
				'type': 'Number',
				'unit': 'K',
				'description': 'Change in temperature during each measurement step',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_temp_change'
				}]
			},
			'meas_freq': {
				'label': 'Measurement Frequency',
				'group': 'Measurement Parameters',
				'position': 41,
				'type': 'Number',
				'unit': 'Hz',
				'description': 'Frequency',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_freq'
				}]
			},
			'meas_duration': {
				'label': 'Measurement Duration',
				'group': 'Measurement Parameters',
				'position': 42,
				'type': 'Number',
				'unit': 's',
				'description': 'The length of time that the measurement was averaged over.',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_freq'
				}]
			},
			'meas_field_ac': {
				'label': 'Measurement Lab AC Field',
				'group': 'Measurement Parameters',
				'position': 43,
				'type': 'Number',
				'unit': 'T',
				'description': 'Lab AC field applied during measurement',
				'notes': 'No field equals 0 and ambient field equals -1',
				'validations': ['min(-1)', 'max(1)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_lab_field_ac'
				}]
			},
			'meas_field_ac_theta': {
				'label': 'Measurement Lab AC Field Orientation Theta',
				'group': 'Measurement Parameters',
				'position': 44,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Orientation of the AC lab field with respect to the magnetometer/instrument during measurement',
				'notes': 'Angle between the specimen z-axis and the positive z direction.',
				'validations': ['min(0)', 'max(180)']
			},
			'meas_field_ac_phi': {
				'label': 'Measurement Lab AC Field Orientation Phi',
				'group': 'Measurement Parameters',
				'position': 45,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Orientation of the AC lab field with respect to the magnetometer/instrument during measurement',
				'notes': 'Angle of the specimen x-axis to the measurement x-axis when projected into the measurement coordinate\'s x-y plane. Positive x-axis is 0 and increasing toward the positive y-axis.',
				'validations': ['min(0)', 'max(360)']
			},
			'meas_field_dc': {
				'label': 'Measurement Lab DC Field',
				'group': 'Measurement Parameters',
				'position': 46,
				'type': 'Number',
				'unit': 'T',
				'description': 'Lab DC field applied during measurement',
				'validations': ['min(-30)', 'max(30)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_lab_field_dc'
				}]
			},
			'meas_field_dc_theta': {
				'label': 'Measurement Lab DC Field Orientation Theta',
				'group': 'Measurement Parameters',
				'position': 47,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Orientation of the DC lab field with respect to the magnetometer/instrument during measurement',
				'notes': 'Angle between the specimen z-axis and the positive z direction.',
				'validations': ['min(0)', 'max(180)']
			},
			'meas_field_dc_phi': {
				'label': 'Measurement Lab DC Field Orientation Phi',
				'group': 'Measurement Parameters',
				'position': 48,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Orientation of the DC lab field with respect to the magnetometer/instrument during measurement',
				'notes': 'Angle of the specimen x-axis to the measurement x-axis when projected into the measurement coordinate\'s x-y plane. Positive x-axis is 0 and increasing toward the positive y-axis.',
				'validations': ['min(0)', 'max(360)']
			},
			'inversion_height': {
				'label': 'Model Inversion Height',
				'group': 'Measurement Parameters',
				'position': 49,
				'type': 'Number',
				'unit': 'm',
				'description': 'Distance between the sample and sensor calculated from an inversion of the magnetic field to the dipole moment'
			},
			'inversion_residuals': {
				'label': 'Model Inversion Residuals',
				'group': 'Measurement Parameters',
				'position': 50,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Sum of squares between the difference of the experimental magnetic field data and the dipole model field computed at the same locations'
			},
			'magn_moment': {
				'label': 'Magnetic Moment',
				'group': 'Raw Measurement',
				'position': 51,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Measured magnetic moment',
				'validations': ['min(-1)', 'max(1)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_magn_moment'
				}]
			},
			'magn_x': {
				'label': 'Magnetic Moment X',
				'group': 'Raw Measurement',
				'position': 52,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Measured magnetic moment, X'
			},
			'magn_x_sigma': {
				'label': 'Magnetic Moment X Sigma',
				'group': 'Raw Measurement',
				'position': 53,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Standard deviation in measurements, X',
				'notes': 'Standard error at one sigma',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_sd_x'
				}]
			},
			'magn_y': {
				'label': 'Magnetic Moment Y',
				'group': 'Raw Measurement',
				'position': 54,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Measured magnetic moment, Y'
			},
			'magn_y_sigma': {
				'label': 'Magnetic Moment Y Sigma',
				'group': 'Raw Measurement',
				'position': 55,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Standard deviation in measurements, Y',
				'notes': 'Standard error at one sigma',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_sd_y'
				}]
			},
			'magn_z': {
				'label': 'Magnetic Moment Z',
				'group': 'Raw Measurement',
				'position': 56,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Measured magnetic moment, Z'
			},
			'magn_z_sigma': {
				'label': 'Magnetic Moment Z Sigma',
				'group': 'Raw Measurement',
				'position': 57,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Standard deviation in measurements, Z',
				'notes': 'Standard error at one sigma',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_sd_z'
				}]
			},
			'magn_xyz_sigma': {
				'label': 'Standard Deviation',
				'group': 'Raw Measurement',
				'position': 58,
				'type': 'Number',
				'unit': 'Am^2',
				'description': 'Standard deviation in measurements, Average X, Y and Z directions',
				'notes': 'Standard error at one sigma',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_sd'
				}]
			},
			'magn_induction': {
				'label': 'Magnetic Induction',
				'group': 'Raw Measurement',
				'position': 59,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Measured magnetic induction (B field)'
			},
			'magn_b_x': {
				'label': 'Magnetic Induction X',
				'group': 'Raw Measurement',
				'position': 60,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Measured magnetic induction, X'
			},
			'magn_b_x_sigma': {
				'label': 'Magnetic Induction X Sigma',
				'group': 'Raw Measurement',
				'position': 61,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Standard deviation in measurements, X',
				'notes': 'Standard error at one sigma'
			},
			'magn_b_y': {
				'label': 'Magnetic Induction Y',
				'group': 'Raw Measurement',
				'position': 62,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Measured magnetic induction, Y'
			},
			'magn_b_y_sigma': {
				'label': 'Magnetic Induction Y Sigma',
				'group': 'Raw Measurement',
				'position': 63,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Standard deviation in measurements, Y',
				'notes': 'Standard error at one sigma'
			},
			'magn_b_z': {
				'label': 'Magnetic Induction Z',
				'group': 'Raw Measurement',
				'position': 64,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Measured magnetic induction, Z'
			},
			'magn_b_z_sigma': {
				'label': 'Magnetic Induction Z Sigma',
				'group': 'Raw Measurement',
				'position': 65,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Standard deviation in measurements, Z',
				'notes': 'Standard error at one sigma'
			},
			'magn_b_111': {
				'label': 'Magnetic Induction 111',
				'group': 'Raw Measurement',
				'position': 66,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Measured magnetic induction, 111 direction',
				'notes': 'Magnetic induction in the 1,1,1 direction. Added for Quantum Diamond Microscope (QDM) measuerements'
			},
			'magn_b_111_sigma': {
				'label': 'Magnetic Induction 111 Sigma',
				'group': 'Raw Measurement',
				'position': 67,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Standard deviation in measurements, 111 direction',
				'notes': 'Standard error at one sigma'
			},
			'magn_b_xyz_sigma': {
				'label': 'Standard Deviation',
				'group': 'Raw Measurement',
				'position': 68,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Standard deviation in measurements, Average X, Y and Z directions',
				'notes': 'Standard error at one sigma'
			},
			'magn_r2_det': {
				'label': 'Coefficient of Determination',
				'group': 'Raw Measurement',
				'position': 69,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Goodness of fit in regression, R squared',
				'notes': 'Number between 0 and 1',
				'validations': ['min(0)', 'max(1)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_r2'
				}]
			},
			'dir_dec': {
				'label': 'Declination',
				'group': 'Direction',
				'position': 70,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Directions in specimen coordinates, Declination',
				'notes': 'Decimal degrees between 0 and 360',
				'validations': ['min(0)', 'max(360)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_dec'
				}]
			},
			'dir_inc': {
				'label': 'Inclination',
				'group': 'Direction',
				'position': 71,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Directions in specimen coordinates, Inclination',
				'notes': 'Decimal degrees between -90 and 90',
				'validations': ['min(-90)', 'max(90)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_inc'
				}]
			},
			'dir_csd': {
				'label': 'Circular Standard Deviation',
				'group': 'Direction',
				'position': 72,
				'type': 'Number',
				'unit': 'Degrees',
				'description': 'Circular standard deviation in measurements',
				'notes': 'Standard deviation at one sigma',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_csd'
				}]
			},
			'magn_volume': {
				'label': 'Magnetization Volume',
				'group': 'Magnetization',
				'position': 73,
				'type': 'Number',
				'unit': 'A/m',
				'description': 'Measured intensity of magnetization, Volume normalized',
				'validations': ['min(-1000000)', 'max(1000000)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_magn_volume'
				}]
			},
			'magn_mass': {
				'label': 'Magnetization Mass',
				'group': 'Magnetization',
				'position': 74,
				'type': 'Number',
				'unit': 'Am^2/kg',
				'description': 'Measured intensity of magnetization, Mass normalized',
				'validations': ['min(-200)', 'max(200)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_magn_mass'
				}]
			},
			'magn_uncal': {
				'label': 'Magnetization Uncalibrated',
				'group': 'Magnetization',
				'position': 75,
				'type': 'Number',
				'unit': 'Dimensionless',
				'description': 'Measured intensity of magnetization, Uncalibrated',
				'examples': ['1.90', '8', '786.89'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_magnitude'
				}]
			},
			'aniso_type': {
				'label': 'Anisotropy Type',
				'group': 'Anisotropy',
				'position': 76,
				'type': 'String',
				'description': 'Anisotropy calculation type',
				'examples': ['AMS', 'AARM', 'AIRM', 'ATRM'],
				'validations': ['cv("anisotropy_type")']
			},
			'aniso_s': {
				'label': 'Anisotropy Tensor Elements',
				'group': 'Anisotropy',
				'position': 77,
				'type': 'Matrix',
				'unit': 'Number',
				'description': 'Anisotropy tensor diagonal elements, a six-element colon-delimited list of c11, c22, c33, c12, c23, and c13 tensor elements'
			},
			'hyst_loop': {
				'label': 'Measurement Hysteresis Loop Number',
				'group': 'Hysteresis',
				'position': 78,
				'type': 'Integer',
				'description': 'Hysteresis loop counter',
				'validations': ['min(1)'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_loop_x'
				}]
			},
			'hyst_sweep_rate': {
				'label': 'Measurement Hysteresis Sweep Rate',
				'group': 'Hysteresis',
				'position': 79,
				'type': 'Number',
				'unit': 'T/s',
				'description': 'Rate of field sweep during a hysteresis loop measurement',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_sweep_rate'
				}]
			},
			'hyst_charging_mode': {
				'label': 'Measurement Hysteresis Charging Mode',
				'group': 'Hysteresis',
				'position': 80,
				'type': 'String',
				'description': 'Measurement hysteresis charging mode',
				'examples': ['Hysteresis', 'Steady', 'No Overshoot'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_charging_mode'
				}]
			},
			'susc_chi_volume': {
				'label': 'Susceptibility X Volume',
				'group': 'Susceptibility',
				'position': 81,
				'type': 'Number',
				'unit': 'SI Dimensionless',
				'description': 'Magnetic susceptibility, Volume normalized',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_chi_volume'
				}]
			},
			'susc_chi_mass': {
				'label': 'Susceptibility X Mass',
				'group': 'Susceptibility',
				'position': 82,
				'type': 'Number',
				'unit': 'm^3/kg',
				'description': 'Magnetic susceptibility, Mass normalized',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_chi_mass'
				}]
			},
			'susc_chi_qdr_volume': {
				'label': 'Susceptibility Xqdr Volume',
				'group': 'Susceptibility',
				'position': 83,
				'type': 'Number',
				'unit': 'SI Dimensionless',
				'description': 'Quadrature magnetic susceptibility, Volume normalized',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_chi_qdr_volume'
				}]
			},
			'susc_chi_qdr_mass': {
				'label': 'Susceptibility Xqdr Mass',
				'group': 'Susceptibility',
				'position': 84,
				'type': 'Number',
				'unit': 'm^3/kg',
				'description': 'Quadrature magnetic susceptibility, Mass normalized',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_chi_qdr_mass'
				}]
			},
			'description': {
				'label': 'Description',
				'group': 'Metadata',
				'position': 85,
				'type': 'String',
				'description': 'Measurement description and comments',
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_description'
				}]
			},
			'timestamp': {
				'label': 'Measurement Timestamp',
				'group': 'Metadata',
				'position': 86,
				'type': 'Timestamp',
				'description': 'Date and time when the measurement occured',
				'notes': 'ISO 8601 date and time (e.g. "yyyy-mm-ddThh:mm:ss.sssZ")',
				'examples': ['2017', '2014-04-21', '1970-01-01T00:00:00', '1969-07-20T22:56:15-04:00'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'measurement_date'
				}, {
					'table': 'magic_measurements',
					'column': 'measurement_time_zone'
				}]
			},
			'software_packages': {
				'label': 'MagIC Software Packages',
				'group': 'Metadata',
				'position': 87,
				'type': 'List',
				'description': 'Colon-delimited list of software used for data reduction',
				'examples': ['PmagPy v1.67b', 'FORCinel v1.11'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'magic_software_packages'
				}]
			},
			'files': {
				'label': 'Files',
				'group': 'Metadata',
				'position': 88,
				'type': 'Dictionary',
				'description': 'Dictionary of files types with file name as the key',
				'notes': 'Used to associate a measurement with a file. Used mainly for images but can be used for other file types',
				'examples': ['qdm_context_image[image_file.jpg]'],
				'validations': ['cv("file_type")']
			},
			'external_database_ids': {
				'label': 'External Database IDs',
				'group': 'Metadata',
				'position': 89,
				'type': 'Dictionary',
				'description': 'Dictionary of external databases and IDs where data are used',
				'examples': ['GEOMAGIA50[1435]:CALS7K.2[23]', 'ARCHEO00[2329]', 'ARCHEO00[] if the ID is unknown'],
				'validations': ['cv("database_names")'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'external_database_names'
				}, {
					'table': 'magic_measurements',
					'column': 'external_database_ids'
				}]
			},
			'derived_value': {
				'label': 'Derived Value',
				'group': 'Metadata',
				'position': 90,
				'type': 'Matrix',
				'description': 'Derived values are in the form of key:value:reference;key2:value2:reference2. Keys are from a controlled vocabulary, values are strings, and references should be a DOI or URL.',
				'notes': 'This field is used to place values at the measurement level that are calculated from other measurements but are not an average of measurements that would be placed at the specimen level. For example: X-ray photoemission electron microscopy (XPEEM) data.',
				'examples': ['XPEEM,2.8,10.1088/1742-6596/430/1/012127'],
				'validations': ['cv("derived_value")']
			},
			'analysts': {
				'label': 'Analyst Names',
				'group': 'Metadata',
				'position': 91,
				'type': 'List',
				'description': 'Colon-delimited list of EarthRef handles or ORCIDs or names and emails for analysts or ORCID id',
				'examples': ['@user1:@user2:0000-0002-9000-2100:Not A. Member <no.earthref.handle@gmail.com>'],
				'validations': ['type("users")'],
				'previous_columns': [{
					'table': 'magic_measurements',
					'column': 'er_analyst_mail_names'
				}]
			}
		}
	}

	,
	'criteria': {
		'label': 'Criteria',
		'position': 7,
		'description': 'List of passing criteria',
		'notes': 'Define criterion logical operations on data',
		'columns': {
			'contribution_id': {
				'label': 'Contribution ID',
				'group': 'Contribution',
				'position': 1,
				'type': 'Integer',
				'description': 'Unique MagIC contribution ID',
				'examples': ['5412'],
				'validations': ['downloadOnly()']
			},
			'row_id': {
				'label': 'Contribution Row ID',
				'group': 'Contribution',
				'position': 2,
				'type': 'Integer',
				'description': 'Unique row ID within a MagIC Contribution',
				'examples': ['743'],
				'validations': ['downloadOnly()']
			},
			'criterion': {
				'label': 'Criterion Name',
				'group': 'Names',
				'position': 3,
				'type': 'String',
				'description': 'Criterion name',
				'examples': ['MY-ANIS567', 'MY-LOOPS-12'],
				'validations': ['required()'],
				'previous_columns': [{
					'table': 'pmag_criteria',
					'column': 'pmag_criteria_code'
				}, {
					'table': 'rmag_criteria',
					'column': 'rmag_criteria_code'
				}]
			},
			'table_column': {
				'label': 'MagIC Column Name',
				'group': 'Names',
				'position': 4,
				'type': 'String',
				'description': 'MagIC data model table and column name',
				'examples': ['specimens.susc_f', 'sites.int_rel'],
				'validations': ['cv("magic_table_column")', 'required()']
			},
			'criterion_operation': {
				'label': 'Criterion Operation',
				'group': 'Criterion',
				'position': 5,
				'type': 'String',
				'description': 'Criterion operation',
				'validations': ['cv("criterion_operation")', 'required()']
			},
			'criterion_value': {
				'label': 'Criterion Value',
				'group': 'Criterion',
				'position': 6,
				'type': 'String',
				'description': 'Criterion value which, when evaluated to a logical truth using the criterion operation on the data in the field, determines the records that pass the criterion',
				'examples': ['5.49', '1'],
				'validations': ['required()']
			},
			'description': {
				'label': 'Description',
				'group': 'Metadata',
				'position': 7,
				'type': 'String',
				'description': 'Description of the criterion',
				'previous_columns': [{
					'table': 'pmag_criteria',
					'column': 'criteria_definition'
				}, {
					'table': 'rmag_criteria',
					'column': 'criteria_definition'
				}]
			},
			'citations': {
				'label': 'Citation DOIs',
				'group': 'Metadata',
				'position': 8,
				'type': 'List',
				'description': 'Colon-delimited list of citation DOIs',
				'examples': ['10.1029/92JB01202', '10.1029/2003GC000635:This study', '"10.1023/A:1015035228810":This study'],
				'validations': ['type("references")'],
				'previous_columns': [{
					'table': 'pmag_criteria',
					'column': 'er_citation_names'
				}, {
					'table': 'rmag_criteria',
					'column': 'er_citation_names'
				}]
			}
		}
	}

	,
	'ages': {
		'label': 'Ages',
		'position': 8,
		'description': 'Measured ages',
		'notes': 'Radiometric and stratigraphically constrained ages',
		'columns': {
			'contribution_id': {
				'label': 'Contribution ID',
				'group': 'Contribution',
				'position': 1,
				'type': 'Integer',
				'description': 'Unique MagIC contribution ID',
				'examples': ['5412'],
				'validations': ['downloadOnly()']
			},
			'row_id': {
				'label': 'Contribution Row ID',
				'group': 'Contribution',
				'position': 2,
				'type': 'Integer',
				'description': 'Unique row ID within a MagIC Contribution',
				'examples': ['743'],
				'validations': ['downloadOnly()']
			},
			'location': {
				'label': 'Location Name',
				'group': 'Names',
				'position': 3,
				'type': 'String',
				'description': 'Name for location, dredge or drill site',
				'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801'],
				'validations': ['in("locations.location")', 'requiredOneInGroup("Names")'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'er_location_name'
				}]
			},
			'site': {
				'label': 'Site Name',
				'group': 'Names',
				'position': 4,
				'type': 'String',
				'description': 'Name for site',
				'examples': ['Bas123a'],
				'validations': ['in("sites.site")', 'requiredOneInGroup("Names")'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'er_site_name'
				}]
			},
			'sample': {
				'label': 'Sample Name',
				'group': 'Names',
				'position': 5,
				'type': 'String',
				'description': 'Name for sample',
				'examples': ['Bas123a-01'],
				'validations': ['in("samples.sample")', 'requiredOneInGroup("Names")'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'er_sample_name'
				}]
			},
			'specimen': {
				'label': 'Specimen Name',
				'group': 'Names',
				'position': 6,
				'type': 'String',
				'description': 'Name for specimen',
				'examples': ['Bas123a-01a'],
				'validations': ['in("specimens.specimen")', 'requiredOneInGroup("Names")'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'er_specimen_name'
				}]
			},
			'tiepoint_type': {
				'label': 'Tiepoint Type',
				'group': 'Tiepoint',
				'position': 7,
				'type': 'String',
				'description': 'Tiepoint type',
				'examples': ['Fossil Layer', 'Volcanic Tuff', 'Basalt Flow', 'Magnetic Anomaly'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'tiepoint_type'
				}]
			},
			'tiepoint': {
				'label': 'Tiepoint Name',
				'group': 'Tiepoint',
				'position': 8,
				'type': 'String',
				'description': 'Name for tiepoint horizon',
				'examples': ['San Cristobal Red bed'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'tiepoint_name'
				}]
			},
			'tiepoint_alternatives': {
				'label': 'Tiepoint Name Alternatives',
				'group': 'Tiepoint',
				'position': 9,
				'type': 'List',
				'description': 'Colon-delimited list of alternative names and abbreviations',
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'tiepoint_alternatives'
				}]
			},
			'tiepoint_height': {
				'label': 'Tiepoint Stratigraphic Height',
				'group': 'Tiepoint',
				'position': 10,
				'type': 'Number',
				'unit': 'm',
				'description': 'Tiepoint stratigraphic height relative to reference tiepoint',
				'notes': 'Positive is up in section or core, while negative is down relative to reference height',
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'tiepoint_height'
				}]
			},
			'tiepoint_height_sigma': {
				'label': 'Tiepoint Stratigraphic Height Sigma',
				'group': 'Tiepoint',
				'position': 11,
				'type': 'Number',
				'unit': 'm',
				'description': 'Tiepoint stratigraphic height uncertainty',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'tiepoint_height_sigma'
				}]
			},
			'tiepoint_elevation': {
				'label': 'Tiepoint Elevation',
				'group': 'Tiepoint',
				'position': 12,
				'type': 'Number',
				'unit': 'm',
				'description': 'Tiepoint elevation relative to sealevel',
				'notes': 'Meters above sealevel',
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'tiepoint_elevation'
				}]
			},
			'age': {
				'label': 'Age',
				'group': 'Age',
				'position': 13,
				'type': 'Number',
				'unit': 'Custom',
				'description': 'Age',
				'notes': 'Preferred age',
				'validations': ['requiredIf("age_sigma")'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'age'
				}]
			},
			'age_sigma': {
				'label': 'Age One Sigma',
				'group': 'Age',
				'position': 14,
				'type': 'Number',
				'unit': 'Custom',
				'description': 'Age uncertainty, One sigma',
				'notes': 'Standard error at one sigma',
				'validations': ['min(0)'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'age_sigma'
				}]
			},
			'age_low': {
				'label': 'Age Low',
				'group': 'Age',
				'position': 15,
				'type': 'Number',
				'unit': 'Custom',
				'description': 'Age lower limit, Can be either oldest or youngest age',
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'age_range_low'
				}]
			},
			'age_high': {
				'label': 'Age High',
				'group': 'Age',
				'position': 16,
				'type': 'Number',
				'unit': 'Custom',
				'description': 'Age higher limit,  Can be either oldest or youngest age',
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'age_range_high'
				}]
			},
			'age_unit': {
				'label': 'Age Unit',
				'group': 'Age',
				'position': 17,
				'type': 'String',
				'description': 'Age unit',
				'validations': ['cv("age_unit")'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'age_unit'
				}]
			},
			'timescale_eon': {
				'label': 'Timescale Eon',
				'group': 'Timescale',
				'position': 18,
				'type': 'String',
				'description': 'Timescale Eon',
				'validations': ['cv("timescale_eon")'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'timescale_eon'
				}]
			},
			'timescale_era': {
				'label': 'Timescale Era',
				'group': 'Timescale',
				'position': 19,
				'type': 'String',
				'description': 'Timescale Era',
				'validations': ['cv("timescale_era")'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'timescale_era'
				}]
			},
			'timescale_period': {
				'label': 'Timescale Period',
				'group': 'Timescale',
				'position': 20,
				'type': 'String',
				'description': 'Timescale Period',
				'validations': ['cv("timescale_period")'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'timescale_period'
				}]
			},
			'timescale_epoch': {
				'label': 'Timescale Epoch',
				'group': 'Timescale',
				'position': 21,
				'type': 'String',
				'description': 'Timescale Epoch',
				'validations': ['cv("timescale_epoch")'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'timescale_epoch'
				}]
			},
			'timescale_stage': {
				'label': 'Timescale Stage',
				'group': 'Timescale',
				'position': 22,
				'type': 'String',
				'description': 'Timescale Stage',
				'validations': ['cv("timescale_stage")'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'timescale_stage'
				}]
			},
			'biostrat_zone': {
				'label': 'Biostratigraphic Zone',
				'group': 'Timescale',
				'position': 23,
				'type': 'String',
				'description': 'Biostratigraphic zone',
				'validations': ['sv("biostrat_zone")'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'biostrat_zone'
				}]
			},
			'conodont_zone': {
				'label': 'Conodont Zone',
				'group': 'Timescale',
				'position': 24,
				'type': 'String',
				'description': 'Conodont zone',
				'validations': ['sv("conodont_zone")'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'conodont_zone'
				}]
			},
			'magnetic_reversal_chron': {
				'label': 'Magnetic Reversal Chron',
				'group': 'Timescale',
				'position': 25,
				'type': 'String',
				'description': 'Magnetic reversal chron',
				'validations': ['sv("magnetic_reversal_chron")'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'magnetic_reversal_chron'
				}]
			},
			'astronomical_stage': {
				'label': 'Astronomical Stage Name',
				'group': 'Timescale',
				'position': 26,
				'type': 'String',
				'description': 'Astronomical stage name',
				'validations': ['sv("astronomical_stage")'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'astronomical_stage'
				}]
			},
			'oxygen_stage': {
				'label': 'Oxygen Stage Name',
				'group': 'Timescale',
				'position': 27,
				'type': 'String',
				'description': 'Oxygen stage name',
				'validations': ['sv("oxygen_stage")'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'oxygen_stage'
				}]
			},
			'culture': {
				'label': 'Culture Name',
				'group': 'Timescale',
				'position': 28,
				'type': 'String',
				'description': 'Age culture name',
				'validations': ['sv("age_culture_name")'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'age_culture_name'
				}]
			},
			'description': {
				'label': 'Description',
				'group': 'Metadata',
				'position': 29,
				'type': 'String',
				'description': 'Age description and comments',
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'age_description'
				}]
			},
			'method_codes': {
				'label': 'Method Codes',
				'group': 'Metadata',
				'position': 30,
				'type': 'List',
				'description': 'Colon-delimited list of method codes',
				'validations': ['type("method_codes")', 'required()'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'magic_method_codes'
				}]
			},
			'external_database_ids': {
				'label': 'External Database IDs',
				'group': 'Metadata',
				'position': 31,
				'type': 'Dictionary',
				'description': 'Dictionary of external databases and IDs where data are used',
				'examples': ['GEOCHRON[SSX.IEAZL001P]'],
				'validations': ['cv("database_names")']
			},
			'timescale_citations': {
				'label': 'Timescale Definition Citation DOIs',
				'group': 'Metadata',
				'position': 32,
				'type': 'List',
				'description': 'Colon-delimited list of citation DOIs',
				'examples': ['10.1029/92JB01202', '10.1029/2003GC000635:This study', '"10.1023/A:1015035228810":This study'],
				'validations': ['type("references")'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'er_timescale_citation_names'
				}]
			},
			'citations': {
				'label': 'Citation DOIs',
				'group': 'Metadata',
				'position': 33,
				'type': 'List',
				'description': 'Colon-delimited list of citation DOIs',
				'examples': ['10.1029/92JB01202', '10.1029/2003GC000635:This study', '"10.1023/A:1015035228810":This study'],
				'validations': ['type("references")', 'required()'],
				'previous_columns': [{
					'table': 'er_ages',
					'column': 'er_citation_names'
				}]
			}
		}
	}

	,
	'images': {
		'label': 'Images',
		'position': 9,
		'description': 'Images and plots',
		'notes': 'Batch uploads with images or plots, but information can be added manually before activation',
		'columns': {
			'contribution_id': {
				'label': 'Contribution ID',
				'group': 'Contribution',
				'position': 1,
				'type': 'Integer',
				'description': 'Unique MagIC contribution ID',
				'examples': ['5412'],
				'validations': ['downloadOnly()']
			},
			'row_id': {
				'label': 'Contribution Row ID',
				'group': 'Contribution',
				'position': 2,
				'type': 'Integer',
				'description': 'Unique row ID within a MagIC Contribution',
				'examples': ['743'],
				'validations': ['downloadOnly()']
			},
			'location': {
				'label': 'Location Name',
				'group': 'Names',
				'position': 3,
				'type': 'String',
				'description': 'Name for location, dredge or drill site',
				'examples': ['San Francisco Volcanic Province', 'Dredge AMAT02-D12', 'Site 801'],
				'validations': ['in("locations.location")', 'requiredOneInGroup("Names")'],
				'previous_columns': [{
					'table': 'er_images',
					'column': 'er_location_name'
				}, {
					'table': 'er_plots',
					'column': 'er_location_name'
				}]
			},
			'site': {
				'label': 'Site Name',
				'group': 'Names',
				'position': 4,
				'type': 'String',
				'description': 'Name for site',
				'examples': ['Bas123a'],
				'validations': ['in("sites.site")', 'requiredOneInGroup("Names")'],
				'previous_columns': [{
					'table': 'er_images',
					'column': 'er_site_name'
				}, {
					'table': 'er_plots',
					'column': 'er_site_name'
				}]
			},
			'sample': {
				'label': 'Sample Name',
				'group': 'Names',
				'position': 5,
				'type': 'String',
				'description': 'Name for sample',
				'examples': ['Bas123a-01'],
				'validations': ['in("samples.sample")', 'requiredOneInGroup("Names")'],
				'previous_columns': [{
					'table': 'er_images',
					'column': 'er_sample_name'
				}, {
					'table': 'er_plots',
					'column': 'er_sample_name'
				}]
			},
			'specimen': {
				'label': 'Specimen Name',
				'group': 'Names',
				'position': 6,
				'type': 'String',
				'description': 'Name for specimen',
				'examples': ['Bas123a-01a'],
				'validations': ['in("specimens.specimen")', 'requiredOneInGroup("Names")'],
				'previous_columns': [{
					'table': 'er_images',
					'column': 'er_specimen_name'
				}, {
					'table': 'er_images',
					'column': 'er_synthetic_name'
				}, {
					'table': 'er_plots',
					'column': 'er_specimen_name'
				}, {
					'table': 'er_plots',
					'column': 'er_synthetic_name'
				}]
			},
			'file': {
				'label': 'File Name',
				'group': 'Image',
				'position': 7,
				'type': 'String',
				'description': 'Name of image',
				'examples': ['IMG_1429.jpg'],
				'validations': ['key()', 'required()'],
				'previous_columns': [{
					'table': 'er_images',
					'column': 'er_image_name'
				}, {
					'table': 'er_plots',
					'column': 'er_plot_name'
				}]
			},
			'type': {
				'label': 'Type',
				'group': 'Image',
				'position': 8,
				'type': 'String',
				'description': 'Type of image',
				'validations': ['cv("image_type")', 'required()'],
				'previous_columns': [{
					'table': 'er_images',
					'column': 'image_type'
				}, {
					'table': 'er_plots',
					'column': 'plot_type'
				}]
			},
			'title': {
				'label': 'Title',
				'group': 'Image',
				'position': 9,
				'type': 'String',
				'description': 'Short Image title',
				'examples': ['High tech solutions for being lonely at sea'],
				'validations': ['required()'],
				'previous_columns': [{
					'table': 'er_images',
					'column': 'image_title'
				}, {
					'table': 'er_plots',
					'column': 'plot_title'
				}]
			},
			'keywords': {
				'label': 'Keywords',
				'group': 'Image',
				'position': 10,
				'type': 'List',
				'description': 'Colon delimited list of keywords associated with image',
				'examples': ['Simrad Computer', 'Multibeam', 'Seamounts'],
				'validations': ['required()'],
				'previous_columns': [{
					'table': 'er_images',
					'column': 'image_keywords'
				}, {
					'table': 'er_plots',
					'column': 'plot_keywords'
				}]
			},
			'description': {
				'label': 'Description',
				'group': 'Metadata',
				'position': 11,
				'type': 'String',
				'description': 'Image description and comments',
				'previous_columns': [{
					'table': 'er_images',
					'column': 'image_description'
				}, {
					'table': 'er_plots',
					'column': 'plot_description'
				}, {
					'table': 'er_images',
					'column': 'er_image_alternatives'
				}, {
					'table': 'er_plots',
					'column': 'er_plot_alternatives'
				}]
			},
			'timestamp': {
				'label': 'Creation Timestamp',
				'group': 'Metadata',
				'position': 12,
				'type': 'Timestamp',
				'description': 'UTC Date and time of when image was taken or created',
				'notes': 'ISO 8601 date and time (e.g. "yyyy-mm-ddThh:mm:ss.sssZ")',
				'validations': ['type("date_time")'],
				'previous_columns': [{
					'table': 'er_images',
					'column': 'image_date'
				}, {
					'table': 'er_plots',
					'column': 'plot_date'
				}, {
					'table': 'er_images',
					'column': 'image_time_zone'
				}, {
					'table': 'er_plots',
					'column': 'plot_time_zone'
				}]
			},
			'software_packages': {
				'label': 'Software Packages',
				'group': 'Metadata',
				'position': 13,
				'type': 'List',
				'description': 'Colon-delimited list of software used for generating the plot',
				'examples': ['PmagPy v1.67b', 'FORCinel v1.11']
			},
			'analysts': {
				'label': 'Analyst Names',
				'group': 'Metadata',
				'position': 14,
				'type': 'List',
				'description': 'Colon-delimited list of EarthRef handles or ORCIDs or names and emails for analysts',
				'examples': ['@user1:@user2:0000-0002-9000-2100:Not A. Member <no.earthref.handle@gmail.com>'],
				'validations': ['type("users")'],
				'previous_columns': [{
					'table': 'er_plots',
					'column': 'er_analyst_mail_names'
				}]
			},
			'photographers': {
				'label': 'Photographer Names',
				'group': 'Metadata',
				'position': 15,
				'type': 'List',
				'description': 'Colon-delimited list of EarthRef handles or ORCIDs or names and emails for photographers',
				'examples': ['@user1:@user2:0000-0002-9000-2100:Not A. Member <no.earthref.handle@gmail.com>'],
				'validations': ['type("users")'],
				'previous_columns': [{
					'table': 'er_images',
					'column': 'er_photographer_mail_names'
				}]
			},
			'citations': {
				'label': 'Citation DOIs',
				'group': 'Metadata',
				'position': 16,
				'type': 'List',
				'description': 'Colon-delimited list of citation DOIs',
				'examples': ['10.1029/92JB01202', '10.1029/2003GC000635:This study', '"10.1023/A:1015035228810":This study'],
				'validations': ['type("references")'],
				'previous_columns': [{
					'table': 'er_images',
					'column': 'er_citation_names'
				}, {
					'table': 'er_plots',
					'column': 'er_citation_names'
				}]
			}
		}
	}
}
};
