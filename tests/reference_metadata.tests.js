import _ from "lodash";
import elasticsearch from "elasticsearch";
import BPromise from "bluebird";

const esClient = new elasticsearch.Client({
  //log: "trace",
  host: "http://128.193.70.68:9200",
  keepAlive: false,
  requestTimeout: 60 * 60 * 1000 // 1 hour
});

let index = "magic_v2";

  describe("magic.reference_metadata", () => {

    it("should create missing year field", function (done) { setTimeout(() => {
      this.timeout(0);

      esClient.search({
        index: index, type: "contribution", size: 1e4, 
        _source: ["summary.contribution._reference.citation", "summary.contribution.id"],
        body: {
          "query": {
            "bool": {
              "must": [{
                "exists": {
                  "field": "summary.contribution._reference.citation"
                }
              }],
              "must_not": [{
                "exists": {
                  "field": "summary.contribution._reference.year"
                }
              }]
            }
          }
        }
      }).then((resp) => {
        let reYear = /\((\d\d\d\d)\)$/;
        let updates = [];
        _.map(resp.hits.hits, hit => {
          let matchYear = hit._source.summary.contribution._reference.citation.match(reYear);
          if (matchYear)
            updates.push([hit._source.summary.contribution.id, parseInt(matchYear[1])])
        });
        BPromise.each(updates, update => {
          return new Promise((resolve) => {
            esClient.updateByQuery({
              "index": index,
              "refresh": true,
              "body": {
                "script": {
                  "inline": "ctx._source.summary.contribution._reference.year = " + update[1]
                },
                "query": {
                  "term": {
                    "summary.contribution.id": update[0]
                  }
                }
              }
            }, (err, resp) => {
              if (!resp || resp.errors) {
                console.error(update, JSON.stringify(resp));
                resolve(false);
              } else {
                console.log(update);
                resolve(true);
              }
            });
          });
        }).then((results) => {
          if (!_.every(results, Boolean))
            done("Failed to update all year fields.");
          else
            done();
        });

      });

    }, 0)});
    
    it("should create missing CrossRef authors", function (done) { setTimeout(() => {
      this.timeout(0);

      esClient.search({
        index: index, type: "contribution", size: 1e4, 
        _source: ["summary.contribution._reference.doi", "summary.contribution.id"],
        body: {
          "query": {
            "bool": {
              "must": [{
                "exists": {
                  "field": "summary.contribution._reference.doi"
                }
              }],
              "must_not": [{
                "exists": {
                  "field": "summary.contribution._reference.authors"
                }
              }]
            }
          }
        }
      }).then((resp) => {
        let _references = {};
        _.map(resp.hits.hits, hit => {

          let doi = hit._source.summary.contribution._reference.doi;

          if (!_references[doi]) {
            console.log(doi);
            let resp = HTTP.call("GET", `http://api.crossref.org/works/${doi}`);
            if (!resp.statusCode || !resp.data || !resp.data.message) {
              console.error(doi, resp);
            } else {
              let d = resp.data.message;
              let _reference = {
                source: 'crossref',
                doi: _.toUpper(d.DOI)
              };

              if (d.title && d.title.length > 0)
                _reference.title = d.title[0];

              if (d['container-title'] && d['container-title'].length > 0)
                _reference.journal = d['container-title'][0];

              if (d['published-print'] && d['published-print']['date-parts'] &&
                d['published-print']['date-parts'][0] && d['published-print']['date-parts'][0][0])
                _reference.year = d['published-print']['date-parts'][0][0];
              else if (d['published-online'] && d['published-online']['date-parts'] &&
                d['published-online']['date-parts'][0] && d['published-online']['date-parts'][0][0])
                _reference.year = d['published-online']['date-parts'][0][0];

              if (d.subject)
                _reference.keywords = d.subject;

              if (d.author && d.author.length === 1)
                _reference.citation = d.author[0].family;
              else if (d.author && d.author.length === 2)
                _reference.citation = d.author[0].family + ' & ' + d.author[1].family;
              else if (d.author && d.author.length > 2)
                _reference.citation = d.author[0].family + ' et al.';
              if (_reference.year)
                _reference.citation += ' (' + _reference.year + ')';

              if (d.author)
                _reference.authors = d.author.map((a) => {
                  let author = {};
                  author.family = a.family;
                  author._name = (_.trim(a.given) === '' ? '' : a.given.toUpperCase().substr(0, 1) + '. ') + a.family;
                  if (a.given) author.given = a.given;
                  if (a.affiliation && a.affiliation.length > 0)
                    author.affiliation = a.affiliation.map((affiliation) => affiliation.name);
                  if (a.ORCID) {
                    let match = a.ORCID.match(/\/([^\/]+)$/);
                    if (match.length >= 2) author._orcid = match[1];
                  }
                  return author;
                });

              if (d.author)
                _reference.long_authors = d.author.map((a) => (a.given ? a.given + ' ' : '') + a.family).join(', ');

              if (d['is-referenced-by-count'])
                _reference.n_citations = d['is-referenced-by-count'];

              _reference.html = '<b>' +
                (_reference.long_authors ? _reference.long_authors : '<i>Unknown Authors</i>') +
                ' (' + (_reference.year ? _reference.year : '<i>Unknown Year</i>') + ').</b> ' +
                (_reference.title ? _reference.title : '<i>Unknown Title</i>') + '. <i>' +
                (_reference.journal ? _reference.journal : 'Unknown Journal') +
                (d.volume ? ' ' + d.volume : '') +
                (d.issue ? ' (' + d.issue + ')' : '') +
                (d.page ? ':' + d.page : '') + '.' +
                (d.DOI ? ' doi:<a href="//dx.doi.org/' + _.toUpper(d.DOI) + '">' + _.toUpper(d.DOI) + '</a>.' : '') +
                '</i>';
              _reference.html = _reference.html.replace(/"/g, "'");

              console.log(doi, _reference.authors);
              _references[doi] = _reference;

            }
          }
        });
        
        BPromise.each(_.keys(_references), doi => {
          return new Promise((resolve) => {
            if (!_references[doi].authors) resolve();
            else esClient.updateByQuery({
              "index": index,
              "refresh": true,
              "body": {
                "script": {
                  "inline": "ctx._source.summary.contribution._reference = params._reference",
                  "params": { "_reference": _references[doi] }
                },
                "query": {
                  "term": {
                    "summary.contribution._reference.doi.raw": doi
                  }
                }
              }
            }, (err, resp) => {
              if (!resp || resp.errors) {
                console.error(doi, JSON.stringify(resp));
                resolve(false);
              } else {
                console.log(doi, JSON.stringify(resp));
                resolve(true);
              }
            });
          });
        }).then((results) => {
          if (!_.every(results, Boolean))
            done("Failed to update all authors fields.");
          else
            done();
        });

      });

    }, 0)});

  }
);