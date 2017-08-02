import _ from  'lodash';
import React from 'react';
import {mount} from 'react-mounter';

import Layout from '/client/modules/common/components/layout';
import Home from '/client/modules/common/components/home';

export default function (injectDeps, {FlowRouter}) {

  const mounter = ({content = () => null}) => (content());
  const mounterWithContext = injectDeps(mounter);

  var abnRoutes = FlowRouter.group({
    prefix: '/SBN',
    name: 'SBN',
    triggersEnter: [function(context, redirect) {
      console.log('running SBN group triggers');
    }]
  });

  abnRoutes.route(`/`, {
    name: 'sbnHome',
    action({}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="SBN">
            <Home portal="SBN">
              <div>
                SBN Home.
              </div>
            </Home>
          </Layout>
        )
      });
    }
  });

}
