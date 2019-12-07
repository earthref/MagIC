import _ from "lodash";
import fs from "fs";
import elasticsearch from "elasticsearch";
import uuid from "uuid";
import Promise from "bluebird";

const esClient = new elasticsearch.Client({
  //log: "trace",
  host: "http://128.193.70.68:9200",
  keepAlive: false,
  requestTimeout: 60 * 60 * 1000 // 1 hour
});

let index = "magic_v4";

  describe("magic.json_ld", () => {

    it("should update contributions sitemap", function (done) { setTimeout(() => {
      this.timeout(0);

      esClient.search({
        index: index, type: "contribution", size: 1e4, 
        _source: ["summary.contribution._reference.doi", "summary.contribution.timestamp"],
        body: {
          "query": { "bool": { 
            "must": { "exists": { "field": "summary.contribution._reference.doi" }},
            "filter": { "term": { "summary.contribution._is_latest": "true"}}
          }}
        }
      }).then((resp) => {
        let xml = [];
        //console.log(resp.hits.total, resp.hits.hits);
        if (resp.hits.total > 0) {
          xml = resp.hits.hits.map(hit => {
            let doi = encodeURI(hit._source.summary.contribution._reference.doi)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
            return _.trim(hit._source.summary.contribution._reference.doi) !== '' && `<url>` +
              `<loc>https://earthref.org/MagIC/doi/${doi}</loc>` + 
              `<lastmod>${hit._source.summary.contribution.timestamp}</lastmod>` +
            `</url>` || undefined;
          }).filter(Boolean);
        }
        fs.writeFileSync(`C:/Users/rminn/source/repos/MagIC/public/MagIC/contributions.sitemap.xml`, 
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          xml.join('\n') + 
          `\n</urlset>`
        );
        done();
      });

    }, 0)});

  }
);