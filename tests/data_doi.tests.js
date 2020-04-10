import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import elasticsearch from "elasticsearch";
import BPromise from 'bluebird';
import request from 'request';

const esClient = new elasticsearch.Client({
  //log: "trace",
  host: "http://128.193.70.68:9200",
  keepAlive: false,
  apiVersion: '6.8',
  requestTimeout: 60 * 60 * 1000 // 1 hour
});

let index = "magic_v4";

  describe("magic.data_doi", () => {

    it("should update data dois", function (done) { setTimeout(() => {
      this.timeout(0);

      esClient.search({
        index: index, type: "contribution", size: 1e4, 
        _source: [
          "summary.contribution.id", 
          "summary.contribution.timestamp", 
          "summary.contribution.version", 
          "summary.contribution._reference.title", 
          "summary.contribution._reference.long_authors", 
          "summary.contribution._reference.year", 
          "summary.contribution._reference.journal", 
          "summary.contribution._reference.doi", 
          "summary.contribution._reference.authors", 
          "summary._all.geologic_classes", 
          "summary._all.geologic_types", 
          "summary._all.lithologies", 
          "summary._all._geo_envelope",
          "summary._all._age_range_ybp"
        ],
        body: {
          "query": { "bool": { 
            "must": [
              { "exists": { "field": "summary.contribution._reference.long_authors" }},
              { "exists": { "field": "summary.contribution._reference.title" }},
              { "exists": { "field": "summary.contribution._reference.year" }},
              { "exists": { "field": "summary.contribution.version" }},
              { "term": { "summary.contribution._is_activated": "true"}}
            ],
            "must_not": [{ "term": { "summary.contribution._has_data_doi": "true"}}],
            //"filter": { "term": { "summary.contribution.id": 16758}}
          }}
        }
      }).then((resp) => {
        console.log('Contributions without a data DOI:', resp.hits.total);
        if (resp.hits.total > 0) {

          BPromise.each(resp.hits.hits, hit => {
            return new Promise((resolve) => {

              let related = hit._source.summary.contribution._reference.doi &&
                `<relatedIdentifiers>
                  <relatedIdentifier relatedIdentifierType="DOI" relationType="IsDocumentedBy">` +
                    `${hit._source.summary.contribution._reference.doi.replace(/</g, "&lt;").replace(/>/g, "&gt;")}` +
                  `</relatedIdentifier>
                </relatedIdentifiers>`;
              let subjects = [];
              hit._source.summary._all && hit._source.summary._all.geologic_classes && 
                hit._source.summary._all.geologic_classes.forEach(geologic_class => {
                  subjects.push(
                    `<subject 
                      subjectScheme="earthref.magic.geologic_classes"
                      schemeURI="https://earthref.org/MagIC/data-models/3.0?q=geologic_classes"
                      valueURI="https://earthref.org/vocabularies/controlled?q=${geologic_class}"
                    >${geologic_class}</subject>`
                  );
                });
              hit._source.summary._all && hit._source.summary._all.geologic_types && 
                hit._source.summary._all.geologic_types.forEach(geologic_type => {
                  subjects.push(
                    `<subject
                      subjectScheme="earthref.magic.geologic_types"
                      schemeURI="https://earthref.org/MagIC/data-models/3.0?q=geologic_types"
                      valueURI="https://earthref.org/vocabularies/controlled?q=${geologic_type}"
                    >${geologic_type}</subject>`
                  );
                });
              hit._source.summary._all && hit._source.summary._all.lithologies && 
                hit._source.summary._all.lithologies.forEach(lithology => {
                  subjects.push(
                    `<subject
                      subjectScheme="earthref.magic.lithologies"
                      schemeURI="https://earthref.org/MagIC/data-models/3.0?q=lithologies"
                      valueURI="https://earthref.org/vocabularies/controlled?q=${lithology}"
                    >${lithology}</subject>`
                  );
                });
              hit._source.summary._all && hit._source.summary._all._age_range_ybp && 
              hit._source.summary._all._age_range_ybp.range && 
              hit._source.summary._all._age_range_ybp.range.gte !== undefined && 
              subjects.push(
                `<subject
                  schemeURI="https://earthref.org/MagIC/data-models/3.0?q=age_low"
                  subjectScheme="earthref.magic.age_low"
                >${hit._source.summary._all._age_range_ybp.range.gte}</subject>`
              );
              hit._source.summary._all && hit._source.summary._all._age_range_ybp && 
              hit._source.summary._all._age_range_ybp.range && 
              hit._source.summary._all._age_range_ybp.range.lte !== undefined && 
              subjects.push(
                `<subject
                  schemeURI="https://earthref.org/MagIC/data-models/3.0?q=age_high"
                  subjectScheme="earthref.magic.age_high"
                >${hit._source.summary._all._age_range_ybp.range.lte}</subject>`
              );
              hit._source.summary._all && hit._source.summary._all._age_range_ybp && 
              hit._source.summary._all._age_range_ybp.range && (
                hit._source.summary._all._age_range_ybp.range.lte !== undefined || 
                hit._source.summary._all._age_range_ybp.range.gte !== undefined
              ) && 
              subjects.push(
                `<subject 
                  subjectScheme="earthref.magic.age_unit"
                  schemeURI="https://earthref.org/MagIC/data-models/3.0?q=age_unit"
                  valueURI="https://earthref.org/vocabularies/controlled?q=Years BP"
                >Years BP</subject>`
              );

              
              subjects = subjects.length && `<subjects>${subjects.join('')}</subjects>`;

              let geos = [];
              hit._source.summary._all && hit._source.summary._all._geo_envelope && _.sortedUniqBy(
                _.sortBy(hit._source.summary._all._geo_envelope, 
                  x => _.flatten(x.coordinates).join('_')), 
                x => _.flatten(x.coordinates).join('_'))
              .forEach((envelope, i) => {
                let n = geos.push('') - 1;
                geos[n] += '<geoLocation>';
                if (
                  envelope.coordinates[0][0] == envelope.coordinates[1][0] &&
                  envelope.coordinates[0][1] == envelope.coordinates[1][1]
                ) {
                  geos[n] += 
                    `<geoLocationPoint>
                      <pointLongitude>${envelope.coordinates[0][0]}</pointLongitude>
                      <pointLatitude>${envelope.coordinates[0][1]}</pointLatitude>
                    </geoLocationPoint>`;
                } else {
                  geos[n] += 
                    `<geoLocationBox>
                      <westBoundLongitude>${envelope.coordinates[0][0]}</westBoundLongitude>
                      <eastBoundLongitude>${envelope.coordinates[1][0]}</eastBoundLongitude>
                      <southBoundLatitude> ${envelope.coordinates[0][1]}</southBoundLatitude>
                      <northBoundLatitude>${envelope.coordinates[1][1]}</northBoundLatitude>
                    </geoLocationBox>`;
                }
                geos[n] += '</geoLocation>';
              });
              geos = geos.length && `<geoLocations>${geos.join('')}</geoLocations>`;

              let creators = [];
              hit._source.summary.contribution._reference.authors &&
                hit._source.summary.contribution._reference.authors.forEach(author => {
                  creators.push(
                    `<creator>
                      ${(author.given || author.family) && (
                        `<creatorName>` +
                          `${author.given}${author.given && author.family && ' '}${author.family}` +
                        `</creatorName>`) || '' }
                      ${author._orcid && (
                        `<nameIdentifier schemeURI="https://orcid.org" nameIdentifierScheme="ORCID">` +
                          `${author._orcid}` +
                        `</nameIdentifier>`) || '' }
                      ${author.affiliation && author.affiliation.map(affiliation =>
                        `<affiliation>${affiliation}</affiliation>`).join('') || '' }
                    </creator>`
                  );
                });
              creators = creators.length && `<creators>${creators.join('')}</creators>` || 
                `<creators><creator><creatorName>` +
                  `${hit._source.summary.contribution._reference.long_authors}` +
                `</creatorName></creator></creators>`;
              let datacite = 
                `<?xml version="1.0"?>
                <resource 
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xmlns="http://datacite.org/schema/kernel-4"
                  xsi:schemaLocation="http://datacite.org/schema/kernel-4 http://schema.datacite.org/meta/kernel-4.3/metadata.xsd"
                >
                  <identifier identifierType="DOI">10.7288/V4/MAGIC/${hit._source.summary.contribution.id}</identifier>
                  ${creators}
                  <titles>
                    <title>${hit._source.summary.contribution._reference.title} (Dataset)</title>
                  </titles>
                  <contributors>
                    <contributor contributorType="Distributor">
                      <contributorName>Magnetics Information Consortium (MagIC)</contributorName>
                    </contributor>
                  </contributors>
                  <publisher>${hit._source.summary.contribution._reference.journal || 
                    'Magnetics Information Consortium (MagIC)'}</publisher>
                  <publicationYear>${hit._source.summary.contribution._reference.year}</publicationYear>
                  <version>${hit._source.summary.contribution.version}</version>
                  <dates>
                    <date dateType="Available">${hit._source.summary.contribution.timestamp.substr(0, 10)}</date>
                  </dates>
                  <language>en-US</language>
                  <resourceType resourceTypeGeneral="Dataset"/>
                  ${related || ''}
                  ${geos || ''}
                  ${subjects || ''}
                  <rightsList>
                    <rights rightsURI="https://creativecommons.org/licenses/by/4.0/"/>
                  </rightsList>
                </resource>`;
              datacite = datacite.replace(/%/g, "%25").replace(/\s*\n\s*/g, "%0A").replace(/\r/g, "%0D").replace(/:/g, "%3A").replace(/\s&\s/g, " and ");
              let payload =
                `_profile: datacite\n` +
                `_status: public\n` +
                `_target: https://earthref.org/MagIC/${hit._source.summary.contribution.id}\n` +
                `datacite: ${datacite}`;

              request({
                method: 'PUT',
                uri: 'https://ezid.cdlib.org/id/doi:10.7288/V4/MAGIC/' + hit._source.summary.contribution.id + '?update_if_exists=yes',
                auth: Meteor.settings.ezid,
                headers: {'content-type': 'text/plain; charset=UTF-8'},
                body: payload
              }, function (error, response, body) {
                if (error) {
                  console.error(error);
                  resolve();
                } else if (body === 'error: bad request - identifier already exists') {
                  esClient.update({
                    "index": hit._index,
                    "type":hit._type,
                    "id": hit._id,
                    "refresh": true,
                    "body": {
                      "doc": {
                        "summary": {
                          "contribution": {
                            "_has_data_doi": "true"
                          }
                        }
                      }
                    }
                  }).then(() => {
                    console.log(hit._id, 'already had a Data DOI minted');
                    resolve();
                  });
                }  else if (/^error: /.test(body)) {
                  console.error(hit._id, body);
                  resolve();
                } else {
                  esClient.update({
                    "index": hit._index,
                    "type":hit._type,
                    "id": hit._id,
                    "refresh": true,
                    "body": {
                      "doc": {
                        "summary": {
                          "contribution": {
                            "_has_data_doi": "true"
                          }
                        }
                      }
                    }
                  }).then(() => {
                    console.log(hit._id, 'now has a Data DOI');
                    resolve();
                  });
                }
              });
              
            });

          }, { concurrency: 5 }).then((results) => {
            done();
          });

        }
      });

    }, 0)});

  }
);