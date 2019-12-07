import _ from 'lodash';
import React from 'react';
import {Helmet} from 'react-helmet';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    if (this.props.item && this.props.item.summary && 
      this.props.item.summary.contribution && 
      this.props.item.summary.contribution._reference && 
      this.props.item.summary.contribution._reference.doi
    ) {

      let contribution = this.props.item.summary.contribution;
      let all = this.props.item.summary._all || {};

      console.log("JSONLD", contribution, all);
      let json = {
        "@context": {
          "@vocab": "http://schema.org"
        },
        "@type": "Dataset",
        "url": "https://earthref.org/MagIC/doi/" + contribution._reference.doi,
        "citation": "https://dx.doi.org/" + contribution._reference.doi,
        "license": "CC-BY-4.0"
      };
  
      if (contribution.version) json.version = contribution.version;
      if (contribution._contributor) json.contributor = contribution._contributor;
      if (contribution.timestamp) json.dateModified = contribution.timestamp;
  
      if (contribution._reference.title) json.name = contribution._reference.title;
      if (contribution._reference.title) json.description = "Paleomagnetic, rock magnetic, or geomagnetic data found in the MagIC data repository from a paper titled: " + contribution._reference.title;
      if (contribution._reference.keywords) json.keywords = contribution._reference.keywords;
      if (contribution._reference.abstract_html) json.description = contribution._reference.abstract_html;
      if (contribution._reference.year) json.datePublished = contribution._reference.year;

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

      return (
        <Helmet>
          <link rel="canonical" href={"https://earthref.org/MagIC/doi/" + contribution._reference.doi} />
          <script id="schemaorg" type="application/ld+json">{JSON.stringify(json, null, '  ')}</script>
        </Helmet>
      );

    }
    else return null;

  }

}
