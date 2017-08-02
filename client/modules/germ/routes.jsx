import _ from  'lodash';
import React from 'react';
import {mount} from 'react-mounter';

import Layout from '/client/modules/common/components/layout';
import Home from '/client/modules/common/components/home';

export default function (injectDeps, {FlowRouter}) {

  const mounter = ({content = () => null}) => (content());
  const mounterWithContext = injectDeps(mounter);

  var germRoutes = FlowRouter.group({
    prefix: '/GERM',
    name: 'GERM',
    triggersEnter: [function(context, redirect) {
      console.log('running GERM group triggers');
    }]
  });

  germRoutes.route(`/`, {
    name: 'germHome',
    action({}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="GERM">
            <Home portal="GERM">
              <div>
                GERM Home.
              </div>
            </Home>
          </Layout>
        )
      });
    }
  });

}
