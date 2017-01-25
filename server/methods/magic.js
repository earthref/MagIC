import _ from 'lodash';
import Fiber from 'fibers';
import uuid from 'uuid';
import {Collections, collectionDefinitions} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import elasticsearch from 'elasticsearch';

const esClient = new elasticsearch.Client({
  //log: 'trace',
  host: 'http://elastic:7UCqaDzNAmgRrPw7VnMVfm7JRBE6@128.193.70.68:9200' //process.env.ELASTICSEARCH_URL
});

export default function () {

  Meteor.methods({
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
      c._contributor = user;
      c._inserted = new Date();
      c._name = name;

      if (c.measurements) {
        delete c.measurements;
      }

      s = s || {};
      s.contribution = s.contribution || {};
      s.contribution.TITLE = c._name;
      s.contribution.CONTRIBUTOR = contributor;
      s.contribution.CONTRIBUTOR_ID = mailid;
      s.contribution.INSERTED = c._inserted;
      c._summary = s;

      c._es_id = uuid.v4();

      /*let es = {};
      _.keys(c._summary.contribution, (k) => {
        if (k !== 'LAT' &&
          k !== 'LON' &&
          k !== 'VGP_LAT' &&
          k !== 'VGP_LON')
          es[k] = c._summary.contribution[k];
      });*/

      //console.log('insertContribution', c.contribution);
      esClient.index({
        index: 'magic_v5', type: 'contributions_summaries',
        id: c._es_id,
        body: {UPLOAD: 1}
      }, function (error, response) {
        console.log('insert es, c._es_id', error, response);
        if(error) console.trace(error);
      });

      Collections['magic.private.contributions'].insert(c);
    },
    'updateContribution': function (id, contributor, user, mailid, name, c, s) {
      //check(id, Integer);
      //check(name, String);
      //check(data, Object);
      //console.log('updateContribution', id, name, c.contribution);
      let c_old = Collections['magic.private.contributions'].findOne(id);
      c = _.merge({}, c_old, c);
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
      c._contributor = user;
      c._inserted = new Date();
      c._name = name;

      if (c.measurements) {
        delete c.measurements;
      }

      s = s || {};
      s.contribution = s.contribution || {};
      s.contribution.TITLE = c._name;
      s.contribution.CONTRIBUTOR = contributor;
      s.contribution.CONTRIBUTOR_ID = mailid;
      s.contribution.INSERTED = c._inserted;
      c._summary = s;

      c._es_id = c._es_id || uuid.v4();

      /*let es = {};
      _.keys(c._summary.contribution, (k) => {
        if (k !== 'LAT' &&
          k !== 'LON' &&
          k !== 'VGP_LAT' &&
          k !== 'VGP_LON')
          es[k] = c._summary.contribution[k];
      });

      esClient.update({
        index: 'magic_v5', type: 'contributions_summaries',
        id: c._es_id,
        body: es
      }, function (error, response) {
        console.log('insert es, c._es_id', error, response);
        if(error) console.trace(error);
      });*/

      Collections['magic.private.contributions'].update(id, c);
    },
    'updateES': function (id, es) {

      es.UPLOAD = 1;
      //es.INSERTED = new Date();

      esClient.update({
        index: 'magic_v5', type: 'contributions_summaries',
        id: id,
        body: {
          doc: es
        }
      }, function (error, response) {
        console.log('insert es',id, error, response);
        if(error) console.trace(error);
      });
    },
    'updateDOI': function (id, doiData) {
      let c = Collections['magic.private.contributions'].findOne(id);
      c._summary = c._summary || {};
      c._summary.contribution = c._summary.contribution || {};
      c.contribution = c.contribution || [{}];
      c._summary.contribution.VERSION = '1';
      if (doiData && doiData.title && doiData.title[0]) {
        c._name = doiData.title[0];
        c._summary.contribution.TITLE = doiData.title[0];
      }
      if (doiData && doiData['container-title'] && doiData['container-title'][0]) {
        c._summary.contribution.JOURNAL = doiData['container-title'][0];
      }
      if (doiData && doiData.DOI)
        c.contribution[0].doi = doiData.DOI;
      if (doiData && doiData['published-print'] && doiData['published-print']['date-parts'] &&
        doiData['published-print']['date-parts'][0] && doiData['published-print']['date-parts'][0][0]) {
        c._summary.contribution.YEAR = doiData['published-print']['date-parts'][0][0];
      }
      c._summary.contribution.REFERENCE_KEYWORDS = doiData.subject.join(':') || undefined;
      if (doiData && doiData.author && doiData.author.length == 1) {
        c._summary.contribution.CITATION = doiData.author[0].family;
      }
      if (doiData && doiData.author && doiData.author.length == 2) {
        c._summary.contribution.CITATION = doiData.author[0].family + ' & ' + doiData.author[1].family;
      }
      if (doiData && doiData.author && doiData.author.length > 2) {
        c._summary.contribution.CITATION = doiData.author[0].family + ' et al.';
      }
      if (c._summary.contribution.YEAR)
        c._summary.contribution.CITATION += ' (' + c._summary.contribution.YEAR + ')';
      c._summary.contribution.REFERENCE_HTML = '<b>' +
        doiData.author.map((a) => a.family + ', ' + a.given).join(', ') +
        ' (' + c._summary.contribution.YEAR + ').</b> ' +
        c._summary.contribution.TITLE + '.<i> ' +
        c._summary.contribution.JOURNAL +
        (doiData.volume ? ' ' + doiData.volume : '') +
        (doiData.issue ? ' (' + doiData.issue + ')' : '') +
        (doiData.page ? ':' + doiData.page : '') + '. ' +
        'doi:<a href="//dx.doi.org/' + doiData.DOI + '">' + doiData.DOI + '</a>.</i>';
      Collections['magic.private.contributions'].update(id, c);
    },
    'getContribution': function(id) {
      return Collections['magic.private.contributions'].findOne(id);
    },
    'deleteContribution': function(id, user) {
      Collections['magic.private.contributions'].remove({_id: id, _contributor: user});
    }
  });

};