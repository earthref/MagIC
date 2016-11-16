import {MagICSummariesContributions} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('magic.summaries.contributions', function (selector, options) {
    return MagICSummariesContributions.find(selector, options);
  });
  Meteor.publish('magic.summaries.contributions.count', function (selector) {
    return MagICSummariesContributions.find(selector);
  });
}