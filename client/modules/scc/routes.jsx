import {_} from 'lodash';
import React from 'react';
import {mount} from 'react-mounter';

import Layout from '../common/components/layout.jsx';
import Home from '../common/components/home.jsx';

export default function (injectDeps, {FlowRouter}) {

  const mounter = ({content = () => null}) => (content());
  const mounterWithContext = injectDeps(mounter);

  var sccRoutes = FlowRouter.group({
    prefix: '/SCC',
    name: 'SCC',
    triggersEnter: [function(context, redirect) {
      console.log('running SCC group triggers');
    }]
  });

  sccRoutes.route(`/`, {
    name: 'sccHome',
    action({}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="SCC">
            <Home portal="SCC">
              <div>
                SCC Home.
              </div>
            </Home>
          </Layout>
        )
      });
    }
  });

}
