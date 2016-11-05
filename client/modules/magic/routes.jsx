import _ from  'lodash';
import React from 'react';
import {mount} from 'react-mounter';

import Layout from '../common/components/layout.jsx';
import Home from '../common/components/home.jsx';

import {default as magicVersions} from '../../../lib/modules/magic/magic_versions.js';
import MagICHome from './components/home.jsx';
import MagICSearch from './components/search.jsx';
import MagICDataModel from './components/data_model.jsx';
import MagICMethodCodes from './components/method_codes.jsx';
import MagICUpgradeContribution from './components/upgrade_contribution.jsx';
import MagICUploadContribution from './components/upload_contribution.jsx';
import MagICValidateContribution from './components/validate_contribution.jsx';

export default function (injectDeps, {FlowRouter}) {

  const mounter = ({content = () => null}) => (content());
  const mounterWithContext = injectDeps(mounter);

  var magicRoutes = FlowRouter.group({
    prefix: '/MagIC',
    name: 'MagIC',
    triggersEnter: [function(context, redirect) {
      //console.log('running MagIC group triggers', context, redirect);
    }]
  });

  magicRoutes.route(`/`, {
    name: 'magicHome',
    action({}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="MagIC">
            <Home portal="MagIC">
              <MagICHome/>
            </Home>
          </Layout>
        )
      });
    }
  });

  magicRoutes.route(`/search`, {
    name: 'magicSearch',
    action({q}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="MagIC" fullWidth={true}>
            <Home portal="MagIC">
              <MagICSearch search={q} bottomOffset={70}/>
            </Home>
          </Layout>
        )
      });
    }
  });

  magicRoutes.route(`/private`, {
    name: 'magicSearch',
    action({q}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="MagIC">
            <Home portal="MagIC">
              <h3>
                Manage your contributions:
              </h3>
              <MagICSearch view="private" search={q}/>
            </Home>
          </Layout>
        )
      });
    }
  });

  magicRoutes.route(`/shared`, {
    name: 'magicSearch',
    action({q}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="MagIC">
            <Home portal="MagIC">
              <h3>
                Manage your collaborators' contributions:
              </h3>
              <MagICSearch view="shared" search={q}/>
            </Home>
          </Layout>
        )
      });
    }
  });

  magicRoutes.route(`/data-model`, {
    action() { FlowRouter.go(`/MagIC/data-models/${magicVersions.slice(-1)[0]}`); }
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

  magicRoutes.route(`/method-codes`, {
    name: 'magicMethodCodes',
    action({q}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="MagIC">
            <Home portal="MagIC">
              <h3>
                Browse the MagIC Method Codes:
              </h3>
              <MagICMethodCodes search={q}/>
            </Home>
          </Layout>
        )
      });
    }
  });

  magicRoutes.route(`/upgrade`, {
    name: 'magicUpgrade',
    action({}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="MagIC">
            <Home portal="MagIC">
              <h3>
                Upgrade an outdated MagIC contribution to the&nbsp;
                <a className="purple" href="data-model" target="_blank">latest MagIC data model version</a>:
              </h3>
              <MagICUpgradeContribution/>
            </Home>
          </Layout>
        )
      });
    }
  });

  magicRoutes.route(`/upload`, {
    name: 'magicUpload',
    action({}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="MagIC">
            <Home portal="MagIC">
              <h3>
                Upload data into a private workspace:
              </h3>
              <MagICUploadContribution/>
            </Home>
          </Layout>
        )
      });
    }
  });

  magicRoutes.route(`/validate`, {
    name: 'magicValidate',
    action({}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="MagIC">
            <Home portal="MagIC">
              <h3>
                Validate a MagIC contribution:
              </h3>
              <MagICValidateContribution/>
            </Home>
          </Layout>
        )
      });
    }
  });

}
