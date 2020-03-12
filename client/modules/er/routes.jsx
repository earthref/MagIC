import Cookies from 'js-cookie';
import React from 'react';
import queryString from 'query-string'
import {Switch, Route, Redirect} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import Page from '/client/modules/common/components/page';
import Error from '/client/modules/common/components/error';
import Vocabularies from '/client/modules/er/components/vocabularies';
import { LogIn, ORCIDLoggingInModal } from '/client/modules/common/components/login';
import { User } from '/client/modules/common/components/user';

const Routes = () => (
  <Switch>
    <Redirect exact from="/vocabularies" to="/vocabularies/controlled"/>
    <Route exact path="/vocabularies/:v(controlled|suggested)" render={({match, location}) => {
      if (window.history.replaceState)
        window.history.replaceState({}, 'Vocabularies | EarthRef.org', '/vocabularies/' + match.params.v);
      return (
        <Page portal="EarthRef.org" title="Browse the EarthRef Vocabularies:">
          <Helmet>
            <title>Vocabularies | EarthRef.org</title>
          </Helmet>
          <Vocabularies vocabularies={match.params.v} search={queryString.parse(location.search).q || ""}/>
        </Page>
      );
    }}/>
    <Route exact path="/orcid" render={({location}) =>
      <Page portal="EarthRef.org">
        <ORCIDLoggingInModal code={queryString.parse(location.search).code} />
      </Page>
    }/>
    <Route exact path="/log-in" render={({location}) =>
      <Page portal="EarthRef.org">
        {	parseInt(Cookies.get('mail_id', Meteor.isDevelopment ? {} : { domain: '.earthref.org'})) ?
          <User openInitially portal="EarthRef.org"/> :
          <LogIn openInitially portal="EarthRef.org"/>
        }
      </Page>
    }/>
    <Route exact path="/log-out" render={({location}) => {
      Cookies.remove('mail_id', Meteor.isDevelopment ? {} : { domain: '.earthref.org'});
      Cookies.remove('user_id', Meteor.isDevelopment ? {} : { domain: '.earthref.org'});
      Cookies.remove('name', Meteor.isDevelopment ? {} : { domain: '.earthref.org'});
      return <Redirect to={location.search.next_url || '/'}/>;
    }}/>
    <Route exact path="/edit-profile" render={({location}) =>
      <Page portal="EarthRef.org">
        {	parseInt(Cookies.get('mail_id', Meteor.isDevelopment ? {} : { domain: '.earthref.org'})) ?
          <User openInitially portal="EarthRef.org"/> :
          <LogIn openInitially portal="EarthRef.org"/>
        }
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