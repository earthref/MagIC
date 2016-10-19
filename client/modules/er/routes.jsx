import {_} from 'lodash';
import React from 'react';
import {mount} from 'react-mounter';

import {portals} from '../common/configs/portals.js';
const rePortals = _.without(Object.keys(portals), 'EarthRef.org').join('|');

import Layout from '../common/components/layout.jsx';
import Home from '../common/components/home.jsx';
import Vocabularies from './components/vocabularies.jsx';

export default function (injectDeps, {FlowRouter}) {

  const mounter = ({content = () => null}) => (content());
  const mounterWithContext = injectDeps(mounter);

  FlowRouter.route(`/`, {
    action() { FlowRouter.go('/MagIC'); }
  });
  /*FlowRouter.route(`/`, {
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
  });*/

  FlowRouter.route(`/vocabularies`, {
    action() { FlowRouter.go('/vocabularies/controlled'); }
  });
  FlowRouter.route(`/vocabularies/:v(controlled|suggested)`, {
    name: 'erVocabularies',
    action({v}, {q}) {
      mount(mounterWithContext, {
        content: () => (
          <Layout portal="EarthRef.org">
            <Home portal="EarthRef.org">
              <h3>
                Browse the EarthRef Vocabularies:
              </h3>
              <Vocabularies vocabularies={v} search={q}/>
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
