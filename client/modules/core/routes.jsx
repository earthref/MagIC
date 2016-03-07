import React from 'react';
import {mount} from 'react-mounter';

import Layout from './components/layout.jsx';

export default function (injectDeps, {FlowRouter}) {

  const mounter = ({content = () => null}) => (content());
  const mounterWithContext = injectDeps(mounter);

  FlowRouter.route('/', {
    name: 'erHome',
    action({portal}) {
      mount(mounterWithContext, {
        content: () => (<Layout portal="EarthRef"/>)
      });
    }
  });

  FlowRouter.route('/:portal(GERM|MagIC|SBN|ERESE)', {
    name: 'portalHome',
    action({portal}) {
      mount(mounterWithContext, {
        content: () => (<Layout portal={portal}/>)
      });
    }
  });

  FlowRouter.notFound = {
    name: '404',
    action({portal}) {
      mount(mounterWithContext, {
        content: () => (<Layout portal="404"/>)
      });
    }
  };

}
