const {describe, it, beforeEach} = global;
import {expect} from 'chai';
import {spy} from 'sinon';
import {shallow, mount} from 'enzyme';
import ReactTestUtils from 'react-addons-test-utils';
import UpgradeContribution from '../upgrade_contribution.jsx';

describe('magic.components.upgrade_contribution', () => {

  let files = [];

  beforeEach(() => {
    files = [{
      name: 'file1.pdf',
      size: 1111
    }];
  });

  it('renders the content', () => {
    const el = shallow(<UpgradeContribution/>);
    expect(el.find('.upgrade-contribution-message').length).to.be.equal(1);
  });

  it('advances to the upgrade step after selecting files', () => {
    const dropSpy = spy();
    const el = mount(<UpgradeContribution/>);
    const dropzone = el.find('upgrade-dropzone');
    ReactTestUtils.Simulate.drop(dropzone, {dataTransfer: {files}});
    expect(el.find('.select-step-content.active').length).to.be.equal(0);
    expect(el.find('.upgrade-step-content.active').length).to.be.equal(1);
  });

  it('rejects upgrading an invalid contribution', () => {
    const dropSpy = spy();
    const el = mount(<UpgradeContribution/>);
    const dropzone = el.find('upgrade-dropzone');
    ReactTestUtils.Simulate.drop(dropzone, {dataTransfer: {files}});
    expect(el.find('.upgrade-step-message').length).to.be.greater.than(1);
  });

});