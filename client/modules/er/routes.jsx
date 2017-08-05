import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Page from '/client/modules/common/components/page';
import Error from '/client/modules/common/components/error';
import Vocabularies from '/client/modules/er/components/vocabularies';

const Routes = () => (
  <Switch>
    <Redirect exact from="/vocabularies" to="/vocabularies/controlled"/>
    <Route exact path="/vocabularies/:v(controlled|suggested)" render={({match, location}) =>
      <Page portal="EarthRef.org" title="Browse the EarthRef Vocabularies:">
        <Vocabularies vocabularies={match.params.v} search={location.search}/>
      </Page>
    }/>
    <Route render={() =>
      <Page portal="EarthRef.org">
        <Error title="Error 404: Sorry, this page is missing!"/>
      </Page>
    }/>
  </Switch>
);

export default Routes;