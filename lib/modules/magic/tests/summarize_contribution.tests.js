const {describe, it} = global;
import _ from 'lodash';
import {expect} from 'chai';
import Promise from 'bluebird';
import SummarizeContribution from '/lib/modules/magic/summarize_contribution';

// Test summarizing valid contributions.
describe('magic.actions.summarize_contribution', () => {

  it('should summarize a age_low of 0.', () => {
    const json = {
      contribution: [{
        data_model_version: '3.0'
      }],
      locations: [{
        location: 'location 1',
        age_low: 0,
        age_high: 2,
        age_unit: 'Ma'
      }]
    };
    return summarizeNoErrorTest(json);
  });

});

// Expect summarizing errors to be empty.
const summarizeNoErrorTest = (json) => {
  const summarizer = new SummarizeContribution({});
  return summarizer.summarizePromise(json, {}).then(() => {
    expect(summarizer.warnings()).to.be.empty;
    expect(summarizer.errors()).to.be.empty;
  });
};