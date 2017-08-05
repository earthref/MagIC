import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import Rows from '/client/modules/common/components/rows';
import {compose} from 'react-komposer';

export const composer = ({es, pageSize, pageNumber}, onData) => {
  onData(null, { rows: undefined, title: undefined });
  let source = {
    include: [
      'columns',
      'rows',
      'summary.contribution._reference.citation',
      'summary.contribution.version',
      'summary.contribution.timestamp',
      'summary.contribution._contributor',
      'summary._all.location',
      'summary._all.site',
      'summary._all.sample',
      'summary._all.specimen',
      'summary._all.experiment'
    ]
  };
  //console.log('esPage rows', pageNumber, es);
  Meteor.call('esPage', _.extend({}, es, {source}), pageSize, pageNumber, (error, results) => {
    try {
      if (error) {
        console.error('esPage rows', error);
        onData(null, { error });
      } else {
        let rows = [];
        let titles = [];
        results.forEach(doc => {
          rows.push(doc.columns ? doc.rows.map(row => _.zipObject(doc.columns, row)) : doc.rows);
          let title = '<b>' + doc.summary.contribution._reference.citation +
            ' v. ' + doc.summary.contribution.version + '</b>';
          //if (es.type === 'locations' && doc.summary._all) {
          //  if (doc.summary._all.location) title += ' ⇒ <b>' + doc.summary._all.location[0] + '</b>';
          //}
          if (es.type === 'sites' && doc.summary._all) {
            if (doc.summary._all.location) title += ' ⇒ ' + doc.summary._all.location[0];
            //if (doc.summary._all.site) title += ' ⇒ <b>' + doc.summary._all.site[0] + '</b>';
          }
          if (es.type === 'samples' && doc.summary._all) {
            if (doc.summary._all.location) title += ' ⇒ ' + doc.summary._all.location[0];
            if (doc.summary._all.site) title += ' ⇒ ' + doc.summary._all.site[0];
            //if (doc.summary._all.sample) title += ' ⇒ <b>' + doc.summary._all.sample[0] + '</b>';
          }
          if (es.type === 'specimens' && doc.summary._all) {
            if (doc.summary._all.location) title += ' ⇒ ' + doc.summary._all.location[0];
            if (doc.summary._all.site) title += ' ⇒ ' + doc.summary._all.site[0];
            if (doc.summary._all.sample) title += ' ⇒ ' + doc.summary._all.sample[0];
            //if (doc.summary._all.specimen) title += ' ⇒ <b>' + doc.summary._all.specimen[0] + '</b>';
          }
          if (es.type === 'experiments' && doc.summary._all) {
            if (doc.summary._all.location) title += ' ⇒ ' + doc.summary._all.location[0];
            if (doc.summary._all.site) title += ' ⇒ ' + doc.summary._all.site[0];
            if (doc.summary._all.sample) title += ' ⇒ ' + doc.summary._all.sample[0];
            if (doc.summary._all.specimen) title += ' ⇒ ' + doc.summary._all.specimen[0];
            if (doc.summary._all.experiment) title += ' ⇒ <b>' + doc.summary._all.experiment[0] + '</b>';
          }
          titles.push(title);
        });
        onData(null, { rows, titles });
      }
    } catch (error) {}
  });
};

export default compose(
  composer,
  {
    propsToWatch: ['es', 'pageSize', 'pageNumber'],
    shouldSubscribe(currentProps, nextProps) {
      let changed = !_.isEqual(currentProps.es, nextProps.es) ||
        !_.isEqual(currentProps.pageSize, nextProps.pageSize) ||
        !_.isEqual(currentProps.pageNumber, nextProps.pageNumber);
      if (changed) console.log('search_rows - shouldSubscribe changed', currentProps.pageNumber, currentProps, nextProps);
      return changed;
    }
  }
)(Rows);
