import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import EarthRefRoutes from '/client/modules/er/routes';
import MagICRoutes from '/client/modules/magic/routes';

const queryClient = new QueryClient()
const supportsHistory = 'pushState' in window.history;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router forceRefresh={!supportsHistory}>
      <Switch>
        <Redirect exact from="/" to="/MagIC"/>
        <Route path="/MagIC" component={MagICRoutes}/>
        <Route               component={EarthRefRoutes}/>
      </Switch>
    </Router>
  </QueryClientProvider>
);

export default App;