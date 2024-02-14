import _ from "lodash";
import fs from "fs";
import opensearch from "@opensearch-project/opensearch";
import uuid from "uuid";
import Promise from "bluebird";

const esClient = new opensearch.Client({
  //log: "trace",
  node: Meteor.settings.opensearch && Meteor.settings.opensearch.node || "",
  keepAlive: false,
  apiVersion: '6.8',
  requestTimeout: 60 * 60 * 1000 // 1 hour
});

const index = "magic";

// Minimum last modified date for contributionn pages
const minLastMod = Date.parse("07-01-2021");

describe("magic.sitemap", () => {

  it("should update contributions sitemap", function (done) { setTimeout(() => {
    this.timeout(0);

    esClient.search({
      index: index, type: "_doc", size: 1e4, 
      _source: ["summary.contribution._history"],
      body: {
        "query": { "bool": { 
          "must": [
            { "term": { "type": "contribution" }},
            { "exists": { "field": "summary.contribution._history" }},
            { "term": { "summary.contribution._is_latest": "true"}},
            { "term": { "summary.contribution._is_activated": "true"}}
          ]
        }}
      }
    }).then((resp) => {
      //let xml = [];
      // console.log(resp.body.hits, resp.body.hits.hits);
      let urls = {};
      if (resp.body.hits.total.value > 0) {
        xml = resp.body.hits.hits.forEach(hit => {
          const contribution = hit._source.summary.contribution._history[0];
          urls[contribution.id] = `<url>` +
            `<loc>https://earthref.org/MagIC/${contribution.id}</loc>` + 
            `<lastmod>${(new Date(Math.max(Date.parse(contribution.timestamp), minLastMod))).toISOString()}</lastmod>` +
          `</url>`;
        });
      }
      fs.writeFileSync(`/home/rminnett/git/EarthRef/MagIC/public/MagIC/contributions.sitemap.xml`, 
        `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        _.keys(urls).sort((a, b) => a - b).map(id => urls[id]).join('\n') + 
        `\n</urlset>`
      );
      done();
    });

  }, 0)});

});