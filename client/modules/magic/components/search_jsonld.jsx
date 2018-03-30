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
      let all = this.props.item._all || {};

      console.log("JSONLD", contribution);
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
      if (contribution._reference.abstract_html) json.description = contribution._reference.abstract_html;
      if (contribution._reference.keywords) json.keywords = contribution._reference.keywords;
      if (contribution._reference.year) json.datePublished = contribution._reference.year;

      return (
        <Helmet>
          <script id="schemaorg" type="application/ld+json">{JSON.stringify(json, null, '  ')}</script>
        </Helmet>
      );

    }
    else return null;

  }

}