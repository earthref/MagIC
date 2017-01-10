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
    'uploadContribution': (id, name, data) => {
      check(id, Integer);
      check(name, String);
      check(data, Object);
      console.log('uploadContribution', id, name);
      Collections['magic.private.contributions'].insert(data);
    }
  });

}