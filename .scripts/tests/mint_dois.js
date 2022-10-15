const {describe, it} = global;
import {Meteor} from 'meteor/meteor';
import fs from 'fs';
import {expect} from 'chai';
import _ from 'lodash';
import Promise from 'bluebird';
import opensearch from "@opensearch-project/opensearch";
import ParseContribution from '../parse_contribution';
import request from 'request';

const esClient = new opensearch.Client({
  //log: 'trace',
  node: Meteor.settings.opensearch && Meteor.settings.opensearch.node || "",
  keepAlive: false,
  requestTimeout: 60 * 60 * 1000 // 1 hour
});

//const cidsProblematic = [7395,8407,8851,8879,9493,9552,9557,9558,9562,9943,9946];

//var dirIn = 'D:/Google Drive/Cogense/Clients/Anthony Koppers/EarthRef/MagIC/Projects/Meteor/Upgrader/2.5 Contributions Test - Citations/';
var dirIn = 'D:/Google Drive/Cogense/Clients/Anthony Koppers/EarthRef/MagIC/Projects/Meteor/Upgrader/3.0 Contributions 2/';
var dirOut = 'client/modules/magic/actions/tests/output/minting1/';
var indexName = 'magic';
if (!fs.existsSync(dirOut)) fs.mkdirSync(dirOut);

describe('magic.actions.mint_dois', () => {

  const files = fs.readdirSync(dirIn);
  if (files) for (var file of files.slice(0,5000)) {

    describe('when minting ' + file, function(file) {
      it('should process ' + file, function (done) { setTimeout(() => {
        this.timeout(0);

        //if (fs.existsSync(dirOut + '/' + file + '.indexes/' + file + '.contribution.json')) {
        if (fs.existsSync(dirOut + '/' + file + '.summary.json')) {
          done();
          return undefined;
        }

        const text = fs.readFileSync(dirIn + file, "utf8");
        const parser = new ParseContribution({});
        parser.parsePromise({text: text}).then(() => {
          try {
            expect(parser.errors().length).to.equal(0);
            expect(file).to.equal("magic_contribution_" + parser.json.contribution[0].id + ".txt");
            esOldByContribution(parser.json.contribution[0].id).then((resp) => {
              expect(resp.hits.total).to.equal(1);

              let oldContribution = resp.hits.hits[0]._source;
              let newContribution = {};

              if (oldContribution.CONTRIBUTOR) newContribution._contributor = oldContribution.CONTRIBUTOR;
              if (oldContribution.UPLOAD) newContribution._is_latest = parseInt(oldContribution.UPLOAD) == 1 ? 't' : 'f';
              if (oldContribution.version_history) newContribution._history = oldContribution.version_history.map(v => {
                return {
                  contributor: v.contributor,
                  id: v.contribution_id,
                  data_model_version: v.magic_version,
                  timestamp: v.activated,
                  version: v.version
                }
              });

              if (oldContribution.TITLE) newContribution._title = oldContribution.TITLE;
              if (oldContribution.CITATION) newContribution._citation = oldContribution.CITATION;
              if (oldContribution.YEAR) newContribution._year = oldContribution.YEAR;
              if (oldContribution.LONG_AUTHORS) newContribution._authors = oldContribution.LONG_AUTHORS;
              if (oldContribution.JOURNAL) newContribution._journal = oldContribution.JOURNAL;

              if (oldContribution.REFERENCE_KEYWORDS) newContribution._keywords = oldContribution.REFERENCE_KEYWORDS;
              if (oldContribution.REFERENCE_TAGS) newContribution._tags = oldContribution.REFERENCE_TAGS;
              if (oldContribution.REFERENCE_HTML) newContribution._reference = oldContribution.REFERENCE_HTML;
              if (oldContribution.ABSTRACT_HTML) newContribution._abstract = oldContribution.ABSTRACT_HTML;

              let cID = parser.json.contribution[0].id;
              let xml = `<?xml version="1.0"?>
<database xmlns="http://www.crossref.org/schema/4.4.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.crossref.org/schema/4.4.0
  http://www.crossref.org/schema/deposit/crossref4.4.0.xsd"
>
  <contributors>
    <person_name contributor_role="author" sequence="first">
      <surname>${newContribution._authors}</surname>
    </person_name>
  </contributors>
  <titles>
    <title>${newContribution._title}</title>
  </titles>
  <publisher_item>
    <item_number item_number_type="MagIC Contribution ID">${cID}</item_number>
  </publisher_item>
  <doi_data>
    <doi></doi>
    <resource></resource>
  </doi_data>
</database>`;
              xml = xml.replace(/%/g, "%25").replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/:/g, "%3A");
              let payload =
`_crossref: no
_profile: crossref
_status: public
_target: https://earthref.org/MagIC/${cID}
crossref: ${xml}`;

              request({
                method: 'PUT',
                uri: 'https://ezid.cdlib.org/id/doi:10.7288/V4/MagIC/' + cID,
                auth: {
                  user: process.env.EZID_USER,
                  pass: process.env.EZID_PASS
                },
                headers: {'content-type' : 'text/plain; charset=UTF-8'},
                body: payload
              }, function (error, response, body) {
                if (error) {
                  done(error);
                } else if (/^error: /.test(body)) {
                  console.error(body);
                  done(body);
                } else {
                  console.log(body);
                  done();
                }
              });

            });

          } catch (err) {
            console.error(err);
            done(err);
          }
        });
      }, 0)});
    }.bind(null, file));
  }
});

function esOldByContribution(id) {
  return esClient.search({
    index: 'magic_v5', type: 'contributions_summaries',
    body: {
      "query": {
        "bool": {
          "must": [
            {
              "term": {
                "UPLOAD": "1"
              }
            }, {
              "term": {
                "MAGIC_CONTRIBUTION_ID": id
              }
            }
          ]
        }
      }
    }
  });
}