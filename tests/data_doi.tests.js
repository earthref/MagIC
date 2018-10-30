import fs from "fs";
import elasticsearch from "elasticsearch";
import BPromise from 'bluebird';
import request from 'request';

const esClient = new elasticsearch.Client({
  //log: "trace",
  host: "http://128.193.70.68:9200",
  keepAlive: false,
  requestTimeout: 60 * 60 * 1000 // 1 hour
});

let index = "magic_v2";

  describe("magic.data_doi", () => {

    it("should update data dois", function (done) { setTimeout(() => {
      this.timeout(0);

      console.log(process.env.EZID_USER, process.env.EZID_PASS);

      esClient.search({
        index: index, type: "contribution", size: 1e4, 
        _source: [
          "summary.contribution.id", 
          "summary.contribution._reference.title", 
          "summary.contribution._reference.long_authors", 
          "summary.contribution._reference.year"
        ],
        body: {
          "query": { "bool": { 
            "must": [
              { "exists": { "field": "summary.contribution._reference.long_authors" }},
              { "exists": { "field": "summary.contribution._reference.title" }},
              { "exists": { "field": "summary.contribution._reference.year" }}
              //{ "term": { "summary.contribution._is_latest": "true"}}
            ],
            //"must_not": [{ "term": { "summary.contribution._has_data_doi": "true"}}]
            //"filter": { "term": { "summary.contribution.id": 16450}}
          }}
        }
      }).then((resp) => {
        console.log('Contributions without a data DOI:', resp.hits.total);
        if (resp.hits.total > 0) {

          BPromise.each(resp.hits.hits, hit => {
            return new Promise((resolve) => {
              let xml = `<?xml version="1.0"?>
<database xmlns="http://www.crossref.org/schema/4.4.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.crossref.org/schema/4.4.0
  http://www.crossref.org/schema/deposit/crossref4.4.0.xsd"
>
  <contributors>
    <person_name contributor_role="author" sequence="first">
      <surname>${hit._source.summary.contribution._reference.long_authors}</surname>
    </person_name>
  </contributors>
  <titles>
    <title>${hit._source.summary.contribution._reference.title}</title>
  </titles>
  <publisher_item>
    <item_number item_number_type="MagIC Contribution ID">${hit._source.summary.contribution.id}</item_number>
  </publisher_item>
  <publisher><publisher_name>Magnetics Information Consortium (MagIC)</publisher_name></publisher>
  <publication_date><year>${hit._source.summary.contribution._reference.year}</year></publication_date>
  <doi_data>
    <doi></doi>
    <resource></resource>
  </doi_data>
</database>`;
              xml = xml.replace(/%/g, "%25").replace(/\s*\n\s*/g, "%0A").replace(/\r/g, "%0D").replace(/:/g, "%3A");
              let payload =
`_profile: crossref
_status: public
_target: https://earthref.org/MagIC/${hit._source.summary.contribution.id}
crossref: ${xml}`;

              request({
                method: 'POST',
                uri: 'https://ezid.cdlib.org/id/doi:10.7288/V4/MagIC/' + hit._source.summary.contribution.id,
                auth: {
                  user: '
                  pass: '
                },
                headers: {'content-type' : 'text/plain; charset=UTF-8'},
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
                  console.error(body);
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