import {_} from 'lodash';
import React from 'react';
import {mount} from 'react-mounter';

import Layout from '../core/components/layout.jsx';
import Home from '../core/components/home.jsx';

import {default as magicVersions} from './configs/magic_versions.js';
import MagICDataModel from './components/data_model.jsx';
import MagICUpgradeContribution from './components/upgrade_contribution.jsx';

export default function (injectDeps, {FlowRouter}) {

  const mounter = ({content = () => null}) => (content());
  const mounterWithContext = injectDeps(mounter);

  var magicRoutes = FlowRouter.group({
    prefix: '/MagIC',
    name: 'MagIC',
    triggersEnter: [function(context, redirect) {
      console.log('running MagIC group triggers');
    }]
  });

  magicRoutes.route(`/`, {
    name: 'magicHome',
    action({}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="MagIC">
            <Home portal="MagIC">
              <div>
                <a className="ui button" href="/MagIC/data-model/">Data Model</a>
              </div>
            </Home>
          </Layout>
        )
      });
    }
  });
  
  magicRoutes.route(`/data-model/`, {
    action() { FlowRouter.go(`/MagIC/data-models/${magicVersions.slice(-1)[0]}/`); }
  });
  magicRoutes.route(`/data-models/:v`, {
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

  magicRoutes.route(`/upgrade/`, {
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

}
