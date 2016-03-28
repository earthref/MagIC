import {_} from 'lodash';
import React from 'react';
import {mount} from 'react-mounter';

import {portals} from './configs/portals.js';
const rePortals = _.without(Object.keys(portals), 'EarthRef.org').join('|');

import {default as magicVersions} from '../magic/configs/magic_versions.js';

import Layout from './components/layout.jsx';
import Home from './components/home.jsx';
import MagICDataModel from '../magic/components/data_model.jsx';
import MagICUpgradeContribution from '../magic/components/upgrade_contribution.jsx';

export default function (injectDeps, {FlowRouter}) {

  const mounter = ({content = () => null}) => (content());
  const mounterWithContext = injectDeps(mounter);

  FlowRouter.route(`/:portal(${rePortals})?`, {
    name: 'portalHome',
    action({portal}) {
      if(!portal) portal = 'EarthRef.org';
      mount(mounterWithContext, {
        content: () => (
          <Layout portal={portal}>
            <Home portal={portal}>
              {(portal === "MagIC" ?
                <div>
                  <a className="ui button" href="/MagIC/data-model/">Data Model</a>
                  <a className="ui button" href="/MagIC/upgrade/">Upgrade a Contribution</a>
                </div>
              : '')}
            </Home>
          </Layout>
        )
      });
    }
  });

  FlowRouter.route(`/MagIC/data-model/`, {
    action() { FlowRouter.redirect(`/MagIC/data-models/${magicVersions.slice(-1)[0]}/`); }
  });
  FlowRouter.route(`/MagIC/data-models/:v`, {
    name: 'magicDataModel',
    action({v}, {q}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="MagIC">
            <Home portal="MagIC">
              <h3>
                Browse the current and recent MagIC Data Models:
              </h3>
              <MagICDataModel version={v} search={q}/>
            </Home>
          </Layout>
        )
      });
    }
  });

  FlowRouter.route(`/MagIC/upgrade/`, {
    name: 'magicDataModel',
    action({}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="MagIC">
            <Home portal="MagIC">
              <h3>
                Upgrade an outdated MagIC contribution to the&nbsp;
                <a className="purple" href="../data-model/">latest MagIC data model version</a>:
              </h3>
              <MagICUpgradeContribution/>
            </Home>
          </Layout>
        )
      });
    }
  });

  FlowRouter.notFound = {
    name: '404',
    action({}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="404">
            <div>Error 404.</div>
          </Layout>
        )
      });
    }
  };

}
