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
        _source: ["summary.contribution._history"],
        body: {
          "query": { "bool": { 
            "must": { "exists": { "field": "summary.contribution._history" }},
            "filter": { "term": { "summary.contribution._is_activated": "true"}}
          }}
        }
      }).then((resp) => {
        //let xml = [];
        //console.log(resp.hits.total, resp.hits.hits);
        let urls = {};
        if (resp.hits.total > 0) {
          xml = resp.hits.hits.forEach(hit => {
            hit._source.summary.contribution._history.forEach(contribution => {
              urls[contribution.id] = `<url>` +
              `<loc>https://earthref.org/MagIC/${contribution.id}</loc>` + 
              `<lastmod>${contribution.timestamp}</lastmod>` +
            `</url>`;
            });
          });
        }
        fs.writeFileSync(`C:/Users/rminn/source/repos/MagIC/public/MagIC/contributions.sitemap.xml`, 
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          _.keys(urls).sort((a, b) => a - b).map(id => urls[id]).join('\n') + 
          `\n</urlset>`
        );
        done();
      });

    }, 0)});

  }
);