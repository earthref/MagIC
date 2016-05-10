import {_} from 'lodash';
import React from 'react';
import {mount} from 'react-mounter';

import Layout from '../core/components/layout.jsx';
import Home from '../core/components/home.jsx';

export default function (injectDeps, {FlowRouter}) {

  const mounter = ({content = () => null}) => (content());
  const mounterWithContext = injectDeps(mounter);

  var femoRoutes = FlowRouter.group({
    prefix: '/FeMO',
    name: 'FeMO',
    triggersEnter: [function(context, redirect) {
      console.log('running FeMO group triggers');
    }]
  });

  femoRoutes.route(`/`, {
    name: 'femoHome',
    action({}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="FeMO">
            <Home portal="FeMO">
              <div>
                FeMO Home.
              </div>
            </Home>
          </Layout>
        )
      });
    }
  });

}
