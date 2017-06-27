import _ from 'lodash';
import Fiber from 'fibers';
import uuid from 'uuid';
import promise from 'bluebird';
import request from 'request';
import elasticsearch from 'elasticsearch';
//import s3 from 's3';
import moment from 'moment';
import {Collections, collectionDefinitions} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {HTTP} from 'meteor/http';

//console.log('es', Meteor.settings.elasticsearch.url);
const esClient = new elasticsearch.Client({
  //log: 'trace',
  host: Meteor.settings.elasticsearch && Meteor.settings.elasticsearch.url || ''
});

export default function () {

  Meteor.methods({
    'createImportSettingsTemplate': function (user, name, settings) {
      //console.log('create import', user, name, settings);
      return Collections['magic.import.settings.templates'].insert({
        _user: user,
        _name: name,
        _inserted: moment().toISOString(),
        settings: settings
      }, (error) => { console.log('create import', error)});
    },
    'saveImportSettingsTemplate': function (user, ID, settings) {
      //console.log('save import', user, ID, settings);
      Collections['magic.import.settings.templates'].update({
        _id: ID,
        _user: user
      }, {
        $set: { settings: settings }
      }, (error) => { console.log('save import', error)});
    },
    'renameImportSettingsTemplate': function (user, ID, name) {
      //console.log('rename import', user, ID, name);
      Collections['magic.import.settings.templates'].update({
        _id: ID,
        _user: user
      }, {
        $set: { _name: name }
      }, (error) => { console.log('rename import', error)});
    },
    'deleteImportSettingsTemplate': function (user, ID) {
      //console.log('delete import', user, ID);
      Collections['magic.import.settings.templates'].remove({
        _id: ID,
        _user: user
      }, (error) => { console.log('delete import', error)});
    },
    'getImportSettingsTemplates': function (user) {
      return Collections['magic.import.settings.templates'].find(
        {_user: user},
        {sort: {'_inserted': -1}}).fetch();
    },
    'getImportSettingsTemplate': function (ID) {
      return Collections['magic.import.settings.templates'].findOne(ID);
    },
    'insertContribution': function (contributor, user, mailid, name, c, s) {
      //check(id, Integer);
      //check(name, String);
      //check(data, Object);

      if (c.contribution && c.contribution.length > 0) {
        c.contribution = c.contribution.splice(0,1);
        delete c.contribution[0].version;
        delete c.contribution[0].id;
        delete c.contribution[0].magic_version;
        delete c.contribution[0].timestamp;
      } else {
        c.contribution = [{}];
      }
      c.contribution[0].contributor = user;
      c.contribution[0].magic_version = '3.0';
      c.contribution[0].version = 'PRIVATE';
      c.contribution[0].timestamp = moment().utc().toISOString();
      c._contributor = user;
      c._inserted = c.contribution[0].timestamp;
      c._name = name;

      let id = Collections['magic.private.contributions'].findOne('next_id');
      if (id && id.next_id) {
        c.contribution[0].id = id.next_id;
        Collections['magic.private.contributions'].update('next_id', {next_id: id.next_id + 1});
      }

      c._id = uuid.v4();

      s = s || {};
      s.contribution = s.contribution || {};
      s.contribution.TITLE = c._name;
      s.contribution.CONTRIBUTOR = contributor;
      s.contribution.CONTRIBUTOR_ID = mailid;
      s.contribution.INSERTED = moment().format("DD-MMM-YY HH:mm:ss");
      s.contribution.VERSION = 'PRIVATE';
      s.contribution.MAGIC_CONTRIBUTION_ID = c.contribution[0].id;
      s.contribution._id = c._id;
      c._summary = s;

      /*let es = {};
       _.keys(c._summary.contribution, (k) => {
       if (k !== 'LAT' &&
       k !== 'LON' &&
       k !== 'VGP_LAT' &&
       k !== 'VGP_LON')
       es[k] = c._summary.contribution[k];
       });*/

      Collections['magic.private.contributions'].insert(c, (error) => { console.log('insert', error)});
    },
    'updateContribution': function (id, contributor, user, mailid, name, c, s) {

      c._id = id;

      s = s || c._summary || {};
      s.contribution = s.contribution || {};
      s.contribution.TITLE = c._name;
      s.contribution.CONTRIBUTOR = contributor;
      s.contribution.CONTRIBUTOR_ID = mailid;
      s.contribution.INSERTED = moment().utc().format("DD-MMM-YY HH:mm:ss");
      s.contribution.VERSION = s.contribution.VERSION || 'PRIVATE';
      s.contribution.MAGIC_CONTRIBUTION_ID = c.contribution[0].id;
      s.contribution._id = c._id;
      c._summary = s;

      //if (c.measurements && c.measurements.rows && c.measurements.columns) {
      //  let i = 0;
      //  for (i = 0; i < c.measurements.rows.length; i+=1000) {
      //    Collections['magic.private.measurements'].insert({
      //      contribution_mongo_id: c._id,
      //      columns: c.measurements.columns,
      //      rows: c.measurements.rows.slice(i, 1000)
      //    });
      //  }
      //}

      Collections['magic.private.contributions'].update(id, c, (error) => { console.log('update', error, id, _.keys(c))});
    },
    async activateContribution(id) {
      let c = Collections['magic.private.contributions'].findOne(id);
      c._es_id = uuid.v4();
      c._activated = true;
      c.contribution[0].timestamp = moment().utc().toISOString();
      c.contribution[0].version = c.contribution[0].version === 'PRIVATE' || _.trim(c.contribution[0].version) === '' ? '1' : c.contribution[0].version;

      let summary = _.pick(c._summary.contribution, [
        "AGE_UNIT",
        "LAT_N",
        "N_LOCATION_RESULTS",
        "LITHOLOGIES",
        "MEAS_STEP_MAX",
        "AGES",
        "GEOLOGIC_TYPES",
        "N_SITES",
        "N_SPECIMENS",
        "LON_W",
        "CONTRIBUTOR_ID",
        "CITATIONS",
        "LAT_S",
        "CONTRIBUTOR",
        "N_SAMPLES",
        "N_SAMPLE_RESULTS",
        "LON_E",
        "N_LOCATIONS",
        "METHOD_CODES",
        "MEAS_STEP_UNIT",
        "LOCATION_TYPE",
        "GEOLOGIC_CLASSES",
        "N_MEASUREMENTS",
        "N_SPECIMEN_RESULTS",
        "N_EXPERIMENTS",
        "TITLE",
        "MEAS_STEP_MIN",
        "N_SITE_RESULTS",
        "CITATION",
        "YEAR",
        "REFERENCE_KEYWORDS",
        "MAGIC_CONTRIBUTION_ID",
        "JOURNAL",
        "REFERENCE_HTML",
        "DOI",
        "VERSION",
        "version_history"
      ]);
      summary.UPLOAD = 1;
      summary.INSERTED = moment().utc().format("DD-MMM-YY HH:mm:ss");
      summary.VERSION = summary.VERSION === 'PRIVATE' || _.trim(summary.VERSION) === '' ? "1" : summary.VERSION;
      summary.version_history = summary.version_history || [];
      summary.version_history.unshift({
        "contributor": summary.CONTRIBUTOR,
        "upload": 1,
        "mongo_id": id,
        "contribution_id": summary.MAGIC_CONTRIBUTION_ID,
        "version": summary.VERSION,
        "magic_version": 3,
        "activated": moment().utc()
      });

      await Collections['magic.private.contributions'].update(id, c, (error) => { console.log('activate', error)});
      await esClient.index({
        index: 'magic_v5', type: 'contributions_summaries',
        id: id,
        body: summary,
      });
    },
    async updateDOI(id, doiData) {
      check(id, String);
      check(doiData, Object);

      let c = Collections['magic.private.contributions'].findOne(id);
      c._doiData = doiData;
      c._summary = c._summary || {};
      c._summary.contribution = c._summary.contribution || {};
      c.contribution = c.contribution || [{}];

      if (doiData.title && doiData.title[0]) {
        c._summary.contribution.TITLE = doiData.title[0];
      }

      if (doiData['container-title'] && doiData['container-title'][0]) {
        c._summary.contribution.JOURNAL = doiData['container-title'][0];
      }

      if (doiData['published-print'] && doiData['published-print']['date-parts'] &&
        doiData['published-print']['date-parts'][0] && doiData['published-print']['date-parts'][0][0]) {
        c._summary.contribution.YEAR = doiData['published-print']['date-parts'][0][0];
      }

      c._summary.contribution.REFERENCE_KEYWORDS = doiData.subject.join(':') || undefined;

      if (doiData.author && doiData.author.length == 1) {
        c._summary.contribution.CITATION = doiData.author[0].family;
      }
      if (doiData.author && doiData.author.length == 2) {
        c._summary.contribution.CITATION = doiData.author[0].family + ' & ' + doiData.author[1].family;
      }
      if (doiData.author && doiData.author.length > 2) {
        c._summary.contribution.CITATION = doiData.author[0].family + ' et al.';
      }
      if (c._summary.contribution.YEAR)
        c._summary.contribution.CITATION += ' (' + c._summary.contribution.YEAR + ')';
      c._name = c._summary.contribution.CITATION;

      c._summary.contribution.REFERENCE_HTML = '<b>' +
        doiData.author.map((a) => a.family + ', ' + a.given).join(', ') +
        ' (' + c._summary.contribution.YEAR + ').</b> ' +
        c._summary.contribution.TITLE + '.<i> ' +
        c._summary.contribution.JOURNAL +
        (doiData.volume ? ' ' + doiData.volume : '') +
        (doiData.issue ? ' (' + doiData.issue + ')' : '') +
        (doiData.page ? ':' + doiData.page : '') + '.' +
        (doiData.DOI ? ' doi:<a href="//dx.doi.org/' + doiData.DOI + '">' + doiData.DOI + '</a>.' : '') +
        '</i>';

      if (doiData.DOI) {
        c.contribution[0].doi = doiData.DOI;
        c._summary.contribution.DOI = doiData.DOI;
        const resp = await esClient.search({
          index: 'magic_v5', type: 'contributions_summaries',
          body: {
            "size": 1,
            "sort": [{ "VERSION": "desc"}],
            "query": {
              "bool": {
                "must": {
                  "simple_query_string": {
                    "query": '"' + doiData.DOI + '"'
                  }
                },
                "filter": {
                  "term": {"UPLOAD": 1}
                }
              }
            }
          }
        });
        if (resp.hits.hits.length > 0) {
          const prev_summary = resp.hits.hits[0]._source;
          c._summary.contribution.VERSION = Number(prev_summary.VERSION) + 1 + '';
          c.contribution[0].version = Number(prev_summary.VERSION) + 1 + '';
          c._summary.contribution.version_history = prev_summary.version_history;
        }
      }

      await Collections['magic.private.contributions'].rawCollection().update({ _id: id}, c);
      console.log('updatedDOI', c._summary.contribution.DOI);
      return c;
    },
    'deleteContribution': function(id, user) {
      //console.log('deleting', id, user);
      let nRemoved = Collections['magic.private.contributions'].remove({_id: id, _contributor: user});
      if (nRemoved < 1) {
        if (error) {
          console.trace(error.message);
          //this.error(new Meteor.Error(e, 'hey!'));
        }
      }
    },
    'getPrivateContribution': function(id) {
      return Collections['magic.private.contributions'].findOne(id);
    },
    'getPrivateContributions': function(contributor) {
      return Collections['magic.private.contributions'].find(
        {_contributor: contributor},
        {sort: {'_inserted': -1}}
      ).fetch();
    },
    'getUnactivatedContributions': function(contributor) {
      return Collections['magic.private.contributions'].find(
        {_contributor: contributor, _activated: false},
        {sort: {'_inserted': -1}}
      ).fetch();
    },
    'getERDAContribution': function(url) {
      this.unblock();
      const response = HTTP.call('GET',url);
      return response.content;
    },
    async insertIntoPrivate(contributor, user, mailid, c, s, v) {

      let id = Collections['magic.private.contributions'].findOne('next_id');
      if (id && id.next_id) {
        c.contribution[0].id = id.next_id;
        Collections['magic.private.contributions'].update('next_id', {next_id: id.next_id + 1});
      }

      c._id = uuid.v4();

      s.contribution.VERSION = v || 'PRIVATE';
      s.contribution.CONTRIBUTOR_ID = mailid;
      s.contribution.CONTRIBUTOR = contributor;
      s.contribution.INSERTED = moment().utc().format("DD-MMM-YY HH:mm:ss");
      s.contribution.UPLOAD = 0;
      c._summary = s;

      c.contribution[0].contributor = user;
      c.contribution[0].magic_version = '3.0';
      c.contribution[0].version = s.contribution.VERSION;
      c.contribution[0].timestamp = moment().utc().toISOString();
      c._contributor = user;
      c._inserted = c.contribution[0].timestamp;
      c._name = s.contribution.TITLE;
      c._activated = false;
      c._doiData = c._doiData || {};

      Collections['magic.private.contributions'].insert(c, (error) => { if (error) console.log('insert', error)});
    }
  });

};

function updateContribution(id, c) {
  //console.log('before update', id, c);
  Collections['magic.private.contributions'].update(id, c);
  //console.log('after update', id, c);

}
