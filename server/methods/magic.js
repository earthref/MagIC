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
    'insertContribution': function (contributor, name, c) {
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
      c.contribution[0].contributor = contributor;
      c._inserted = new Date();
      c._name = name;

      console.log('insertContribution', c.contribution);
      Collections['magic.private.contributions'].insert(c);
    },
    'updateContribution': function (id, contributor, name, c) {
      //check(id, Integer);
      //check(name, String);
      //check(data, Object);
      console.log('updateContribution', id, name, c.contribution);
      let c_old = Collections['magic.private.contributions'].findOne(id);
      c = _.merge({}, c_old, c);
      if (c.contribution) {
        delete c.contribution.version;
        delete c.contribution.id;
        delete c.contribution[0].magic_version;
        delete c.contribution[0].timestamp;
      } else {
        c.contribution = {};
      }
      c.contribution.contributor = contributor;
      c.contribution.timestamp = (new Date()).toISOString();
      c._name = name;
      Collections['magic.private.contributions'].update(id, c);
    }
  });

};