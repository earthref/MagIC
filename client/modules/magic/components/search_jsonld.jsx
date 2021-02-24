import _ from 'lodash';
import React from 'react';
import {Helmet} from 'react-helmet';
import {versions, models} from '/lib/configs/magic/data_models';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    if (this.props.item && this.props.item.summary && 
      this.props.item.summary.contribution
    ) {

      const contribution = this.props.item.summary.contribution;
      const all = this.props.item.summary._all || {};
      const cid = this.props.id || contribution.id;
      
      const model = models[_.last(versions)];
      const now = new Date();

      let json = {
        "@context": {
          "@vocab": "https://schema.org/",
          "geosci-time": "http://schema.geoschemas.org/contexts/temporal#"
        },
        "@type": "Dataset",
        "identifier": {
          "@id": `http://dx.doi.org/10.7288/V4/MAGIC/{cid}`,
        },
        "url": `https://earthref.org/MagIC/{cid}`,
        "identifier": `http://dx.doi.org/10.7288/V4/MAGIC/{cid}`,
        "isAccessibleForFree": true,
        "license": "https://creativecommons.org/licenses/by/4.0/",
        "provider": {
          "@id": "https://earthref.org/MagIC",
          "type": "Organization",
          "legalName": "Magnetics Information Consortium (MagIC) Data Repository",
          "name": "MagIC",
          "url": "https://earthref.org/MagIC"
        },
        "publisher": {
          "@id": "https//earthref.org/MagIC"
        },
        "sdPublisher": "EarthRef.org",
        "sdLicense": "https://creativecommons.org/licenses/by/4.0/",
        "sdDatePublished": now.toISOString(),
        "labNames": contribution.lab_names,
        "distribution":{
          "@type":"DataDownload",
          "contentUrl": `https://earthref.org/MagIC/download/{cid}/magic_contribution_{cid}.txt`,
          "encodingFormat": ["text/plain; application=earthref-tsv", "EarthRef-tsv-Multipart"] }
      };

      if (this.props.id && contribution._history) {
        let history = contribution._history.filter(x => parseInt(x.id, 10) === parseInt(this.props.id, 10));
        if (history[0] && history[0].version) json.version = history[0].version;
      }
      if (!json.version && contribution.version) json.version = contribution.version;

      if (contribution._contributor) json.contributor = contribution._contributor;
      if (contribution.timestamp) json.dateModified = contribution.timestamp;
  
      if (contribution._reference) {
        if (contribution._reference.html || contribution._reference.title) json.citation = (contribution._reference.html || contribution._reference.title);
        if (contribution._reference.doi) json.sameAs = ["https://doi.org/" + contribution._reference.doi];
        if (contribution._reference.html || contribution._reference.title) json.name = (contribution._reference.html || contribution._reference.title) + ' (Dataset)';
        if (contribution._reference.html || contribution._reference.title) json.description = "Paleomagnetic, rock magnetic, or geomagnetic data found in the MagIC data repository from a paper titled: " + (contribution._reference.html || contribution._reference.title);
        if (contribution._reference.keywords) json.keywords = contribution._reference.keywords;
        if (contribution._reference.abstract_html) json.description = contribution._reference.abstract_html;
        if (contribution._reference.year) json.datePublished = contribution.timestamp;
      }

      if (all._geo_envelope) {
        try {
          _.sortedUniqBy(
            _.sortBy(all._geo_envelope, 
              x => _.flatten(x.coordinates).join('_')), 
            x => _.flatten(x.coordinates).join('_'))
          .forEach((envelope, i) => {
            json.spatialCoverage = json.spatialCoverage || { "@type": "Place", "geo": [] };
            if (
              envelope.coordinates[0][0] == envelope.coordinates[1][0] &&
              envelope.coordinates[0][1] == envelope.coordinates[1][1]
            ) {
              json.spatialCoverage.geo.push({ 
                "@type": "GeoCoordinates",
                "latitude": envelope.coordinates[0][1],
                "longitude": envelope.coordinates[0][0]
              });
            } else {
              json.spatialCoverage.geo.push({ "@type": "GeoShape", "box":  
                envelope.coordinates[1][1] + " " +
                envelope.coordinates[0][0] + " " +
                envelope.coordinates[0][1] + " " +
                envelope.coordinates[1][0]
              });
            }
          });
        } catch(error) {
          console.error("JSONLD", error);
        }
      }
      
      if (all._geo_point) {
        try {
          _.sortedUniqBy(
            _.sortBy(all._geo_point, 
              x => _.flatten(x.coordinates).join('_')), 
            x => _.flatten(x.coordinates).join('_'))
          .forEach((point, i) => {
            json.spatialCoverage = json.spatialCoverage || { "@type": "Place", "geo": [] };
            json.spatialCoverage.geo.push({ 
              "@type": "GeoCoordinates",
              "latitude": point.coordinates[1],
              "longitude": point.coordinates[0]
            });
          });
        } catch(error) {
          console.error("JSONLD", error);
        }
      }
      
      if (all._age_range_ybp && all._age_range_ybp.range.gte && all._age_range_ybp.range.lte) {
        let startYBP = Math.round(all._age_range_ybp.range.gte);
        let endYBP = Math.round(all._age_range_ybp.range.lte);
        json.temporalCoverage = { 
          "@type": "DateTime", 
          "startDate": -startYBP + 1949 + (startYBP < 1950 ? 1 : 0), 
          "endDate": -endYBP + 1949 + (endYBP < 1950 ? 1 : 0),
        };
      }

      if (all._age_range_ybp && all._age_range_ybp.range.gte && all._age_range_ybp.range.lte) {
        let startYBP = Math.round(all._age_range_ybp.range.gte);
        let endYBP = Math.round(all._age_range_ybp.range.lte);
        json['geosci-time'] =  json['geosci-time'] || {
          "@type": "time:Instant", 
          "time:inTimePosition" : {
            "@type": "time:ProperInterval",
            "time:hasBeginning": {
              "time:hasTRS": { 
                "@id": "geosci-time:BeforePresent" 
              },
              "time:numericPosition": {
                "@value": startYBP, 
                "@type": "xsd:decimal"
              },
            },
            "time:hasEnd": {
              "time:hasTRS": { 
                "@id": "geosci-time:BeforePresent" 
              },
              "time:numericPosition": {
                "@value": endYBP, 
                "@type": "xsd:decimal"
              },
            },
          },
        };
      }

      const modelAllColumns = {};
      _.keys(model.tables).forEach(table => {
        _.keys(model.tables[table].columns).forEach(column => {
          if (all[column]) modelAllColumns[column] = model.tables[table].columns[column];
        });
      });

      _.keys(all).forEach(key => {
        if (
          key[0] !== '_' && 
          key.substr(0, 4) !== 'age_' && 
          key.substr(0, 4) !== 'lat_' && 
          key.substr(0, 4) !== 'lon_' && 
          all[key].range
        ) {
          //console.log(key, all[key], modelAllColumns[key]);
          json.variableMeasured = json.variableMeasured || [];
          json.variableMeasured.push({
            "@type": "PropertyValue", 
            "name": modelAllColumns[key].label,
            "description": modelAllColumns[key].description,
            "minValue": all[key].range.gte,
            "maxValue": all[key].range.lte,
            "unitText": modelAllColumns[key].unit
          });
        }
      });

      //console.log("JSONLD", contribution, all, json, modelAllColumns);

      return (
        <Helmet>
          <link rel="canonical" href={"https://earthref.org/MagIC/" + (this.props.id || contribution.id)} />
          <script id="schemaorg" type="application/ld+json">{JSON.stringify(json, null, '  ')}</script>
        </Helmet>
      );

    }
    else return null;

  }

}
