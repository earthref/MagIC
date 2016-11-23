import {Mongo} from 'meteor/mongo';

//export const Users = new Mongo.Collection('users');
//export const References = new Mongo.Collection('references');
export const MagICSearchSummariesContributionSearch              = new Mongo.Collection('elasticsearch/magic-search-summaries/contribution/_search');
export const MagICSearchSummariesContributionCount               = new Mongo.Collection('elasticsearch/magic-search-summaries/contribution/_count');
export const MagICSearchAgesContributionCount                    = new Mongo.Collection('elasticsearch/magic-search-ages/contribution/_count');
export const MagICSearchImagesContributionCount                  = new Mongo.Collection('elasticsearch/magic-search-images/contribution/_count');
export const MagICSearchSummariesLocationCount                   = new Mongo.Collection('elasticsearch/magic-search-summaries/location/_count');
export const MagICSearchSummariesSiteCount                       = new Mongo.Collection('elasticsearch/magic-search-summaries/site/_count');
export const MagICSearchSummariesSampleCount                     = new Mongo.Collection('elasticsearch/magic-search-summaries/sample/_count');
export const MagICSearchSummariesSpecimenCount                   = new Mongo.Collection('elasticsearch/magic-search-summaries/specimen/_count');
export const MagICSearchFiltersContributionReferenceYearBuckets  = new Mongo.Collection('elasticsearch/magic-search-filters/contribution/reference_year/_buckets');
export const MagICSearchFiltersContributionContributorIDBuckets  = new Mongo.Collection('elasticsearch/magic-search-filters/contribution/contributor_id/_buckets');
export const MagICSearchFiltersContributionExternalDBNameBuckets = new Mongo.Collection('elasticsearch/magic-search-filters/contribution/external_db_name/_buckets');
//export const MagICModels = new Mongo.Collection('magic.models');
