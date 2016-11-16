import {MagICSummariesContributions} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('magic.summaries.contributions', function (selector, options) {
    return MagICSummariesContributions.find(selector, options);
  });
  Meteor.publish('magic.summaries.contributions.count', function (selector) {

    // Increment and decrement the counter on changes.
    let count = 0;
    let initializing = true;
    const cursor = MagICSummariesContributions.find(selector);
    const id = JSON.stringify(selector);
    const handle = cursor.observeChanges({
      added: () => {
        count++;
        if (!initializing) this.changed('magic.summaries.contributions.counts', id, {count: count});
      },
      removed: () => {
        count--;
        this.changed('magic.summaries.contributions.counts', id, {count: count});
      }
    });

    // Initialize the subscription.
    initializing = false;
    this.added('magic.summaries.contributions.counts', id, {count: count});
    this.ready();

    // Stop observing the cursor when client unsubscribes.
    this.onStop(() => handle.stop());

  });
}