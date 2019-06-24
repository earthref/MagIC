import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import Rows from '/client/modules/common/components/rows';
import {compose} from '@storybook/react-komposer';

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
  Meteor.call('esPage', _.extend({}, es, {source}), pageSize, pageNumber, (error, results) => {
    try {
      if (error) {
        console.error(error);
        onData(null, { error });
      } else {
        let rows = [];
        let titles = [];
        results.forEach(doc => {
          let s = doc.summary;
          rows.push(doc.columns ? doc.rows.map(row => _.zipObject(doc.columns, row)) : doc.rows);
          let citation = s && s.contribution && s.contribution._reference && s.contribution._reference.citation || "Unknown";
          let version = s && s.contribution && s.contribution.version || "Unknown";
          let title = '<b>' + citation +' v. ' + version + '</b>';
          //if (es.type === 'locations' && s._all) {
          //  if (s._all.location) title += ' ⇒ <b>' + s._all.location[0] + '</b>';
          //}
          if (es.type === 'sites' && s._all) {
            if (s._all.location) title += ' ⇒ ' + s._all.location[0];
            //if (s._all.site) title += ' ⇒ <b>' + s._all.site[0] + '</b>';
          }
          if (es.type === 'samples' && s._all) {
            if (s._all.location) title += ' ⇒ ' + s._all.location[0];
            if (s._all.site) title += ' ⇒ ' + s._all.site[0];
            //if (s._all.sample) title += ' ⇒ <b>' + s._all.sample[0] + '</b>';
          }
          if (es.type === 'specimens' && s._all) {
            if (s._all.location) title += ' ⇒ ' + s._all.location[0];
            if (s._all.site) title += ' ⇒ ' + s._all.site[0];
            if (s._all.sample) title += ' ⇒ ' + s._all.sample[0];
            //if (s._all.specimen) title += ' ⇒ <b>' + s._all.specimen[0] + '</b>';
          }
          if (es.type === 'experiments' && s._all) {
            if (s._all.location) title += ' ⇒ ' + s._all.location[0];
            if (s._all.site) title += ' ⇒ ' + s._all.site[0];
            if (s._all.sample) title += ' ⇒ ' + s._all.sample[0];
            if (s._all.specimen) title += ' ⇒ ' + s._all.specimen[0];
            if (s._all.experiment) title += ' ⇒ <b>' + s._all.experiment[0] + '</b>';
          }
          titles.push(title);
        });
        onData(null, { rows, titles });
      }
    } catch (error) {
      console.error(error);
      onData(null, { error });
    }
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
      if (changed) console.log('SearchRows - shouldSubscribe changed', currentProps.pageNumber, currentProps, nextProps);
      return changed;
    }
  }
)(Rows);
