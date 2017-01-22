import _ from 'lodash';
import Fiber from 'fibers';
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
      c._inserted = new Date();
      c._name = name;

      s = s || {};
      s.contribution = s.contribution || {};
      s.contribution.TITLE = c._name;
      s.contribution.CONTRIBUTOR = contributor;
      s.contribution.CONTRIBUTOR_ID = mailid;
      s.contribution.INSERTED = c._inserted;
      c._summary = s;

      console.log('insertContribution', c.contribution);
      Collections['magic.private.contributions'].insert(c);
    },
    'updateContribution': function (id, contributor, user, mailid, name, c, s) {
      //check(id, Integer);
      //check(name, String);
      //check(data, Object);
      console.log('updateContribution', id, name, c.contribution);
      //let c_old = Collections['magic.private.contributions'].findOne(id);
      //c = _.merge({}, c_old, c);
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
      c._inserted = new Date();
      c._name = name;

      s = s || {};
      s.contribution = s.contribution || {};
      s.contribution.TITLE = c._name;
      s.contribution.CONTRIBUTOR = contributor;
      s.contribution.CONTRIBUTOR_ID = mailid;
      s.contribution.INSERTED = c._inserted;
      c._summary = s;

      Collections['magic.private.contributions'].update(id, c);
    }
  });

};