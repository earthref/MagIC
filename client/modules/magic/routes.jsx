import _ from  'lodash';
import React from 'react';
import {mount} from 'react-mounter';

import Layout from '/client/modules/common/components/layout';
import Home from '/client/modules/common/components/home';

import {versions} from '/lib/modules/magic/data_models';
import MagICHome from '/client/modules/magic/components/home';
import MagICSearch from '/client/modules/magic/components/search';
import MagICDataModel from '/client/modules/magic/components/data_model';
import MagICMethodCodes from '/client/modules/magic/components/method_codes';
import MagICPrivateContributions from '/client/modules/magic/components/private_contributions';
import MagICUpgradeContribution from '/client/modules/magic/components/upgrade_contribution';
import MagICUploadContribution from '/client/modules/magic/components/upload_contribution';
import MagICValidateContribution from '/client/modules/magic/components/validate_contribution';

export default function (injectDeps, {FlowRouter}) {

  const mounter = ({content = () => null}) => (content());
  const mounterWithContext = injectDeps(mounter);

  let magicRoutes = FlowRouter.group({
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
    action(params, queryParams) {
      console.log('magic search', params, queryParams);
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="MagIC" fullWidth={true}>
            <Home portal="MagIC">
              <MagICSearch search={queryParams.q || ''} bottomOffset={60}/>
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
              <MagICPrivateContributions search={q}/>
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
    action() { FlowRouter.go(`/MagIC/data-models/${_.last(versions)}`); }
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
                Upload data into your private workspace:
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
