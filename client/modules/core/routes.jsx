import {_} from 'lodash';
import React from 'react';
import {mount} from 'react-mounter';

import {portals} from './configs/portals.js';
const rePortals = _.without(Object.keys(portals), 'EarthRef.org').join('|');

import {magicVersions} from '../magic/configs/magic_versions.js';

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
    action() { FlowRouter.redirect(`/MagIC/data-model/${magicVersions.slice(-1)[0]}/`); }
  });
  FlowRouter.route(`/MagIC/data-model/:magicVersion?`, {
    name: 'magicDataModel',
    action({magicVersion}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="MagIC">
            <Home portal="MagIC">
              <MagICDataModel version={magicVersion}/>
            </Home>
          </Layout>
        )
      });
    }
  });

  FlowRouter.route(`/MagIC/upgrade/`, {
    name: 'magicDataModel',
    action({magicVersion}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="MagIC">
            <Home portal="MagIC">
              <MagICUpgradeContribution/>
            </Home>
          </Layout>
        )
      });
    }
  });

  FlowRouter.notFound = {
    name: '404',
    action({portal}) {
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
