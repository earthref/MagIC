import {_} from 'lodash';
import React from 'react';
import {mount} from 'react-mounter';

import {portals} from './configs/portals.js';
const rePortals = _.without(Object.keys(portals), 'EarthRef.org').join('|');

import Layout from './components/layout.jsx';
import Home from './components/home.jsx';

export default function (injectDeps, {FlowRouter}) {

  const mounter = ({content = () => null}) => (content());
  const mounterWithContext = injectDeps(mounter);

  FlowRouter.route(`/`, {
    name: 'erHome',
    action({}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="EarthRef.org">
            <Home portal="EarthRef.org">
              <div>
                EarthRef Home.
              </div>
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
