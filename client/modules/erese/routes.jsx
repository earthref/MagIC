import {_} from 'lodash';
import React from 'react';
import {mount} from 'react-mounter';

import Layout from '../core/components/layout.jsx';
import Home from '../core/components/home.jsx';

export default function (injectDeps, {FlowRouter}) {

  const mounter = ({content = () => null}) => (content());
  const mounterWithContext = injectDeps(mounter);

  var ereseRoutes = FlowRouter.group({
    prefix: '/ERESE',
    name: 'ERESE',
    triggersEnter: [function(context, redirect) {
      console.log('running ERESE group triggers');
    }]
  });

  ereseRoutes.route(`/`, {
    name: 'ereseHome',
    action({}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="ERESE">
            <Home portal="ERESE">
              <div>
                ERESE Home.
              </div>
            </Home>
          </Layout>
        )
      });
    }
  });

}
