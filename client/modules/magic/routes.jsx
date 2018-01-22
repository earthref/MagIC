import _ from  'lodash';
import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import {versions} from '/lib/configs/magic/data_models.js';
import Page from '/client/modules/common/components/page';
import MagICHome from '/client/modules/magic/components/home';
import MagICSearch from '/client/modules/magic/components/search';
import MagICDataModel from '/client/modules/magic/components/data_model';
import MagICMethodCodes from '/client/modules/magic/components/method_codes';
import MagICPrivateContributions from '/client/modules/magic/components/private_contributions';
import MagICUpgradeContribution from '/client/modules/magic/components/upgrade_contribution';
import MagICUploadContribution from '/client/modules/magic/components/upload_contribution';
import MagICValidateContribution from '/client/modules/magic/components/validate_contribution';
import Error from '/client/modules/common/components/error';

const Routes = ({match}) => (
  <Switch>
    <Route exact path="/MagIC" render={() =>
      <Page portal="MagIC">
        <Helmet>
          <title>MagIC Home | EarthRef.org</title>
        </Helmet>
        <MagICHome/>
      </Page>
    }/>
    <Route exact path="/MagIC/:id(\d+)/:private_key([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})" render={({match, location}) =>
      <Page fullWidth portal="MagIC">
        <Helmet>
          <title>MagIC Search | EarthRef.org</title>
        </Helmet>
        <MagICSearch search={`id:"${match.params.id}" private_key:"${match.params.private_key}" ` + location.search || ""}/>
      </Page>
    }/>
    <Route exact path="/MagIC/:id(\d+)" render={({match, location}) =>
      <Page fullWidth portal="MagIC">
        <Helmet>
          <title>MagIC Search | EarthRef.org</title>
        </Helmet>
        <MagICSearch search={`id:"${match.params.id}" ` + location.search || ""}/>
      </Page>
    }/>
    <Route exact path="/MagIC/search" render={({location}) =>
      <Page fullWidth portal="MagIC">
        <Helmet>
          <title>MagIC Search | EarthRef.org</title>
        </Helmet>
        <MagICSearch search={location.search && location.search.substring(1) || ""}/>
      </Page>
    }/>
    <Route exact path="/MagIC/private" render={({location}) =>
      <Page portal="MagIC" title="Manage your contributions:">
        <Helmet>
          <title>MagIC Private Workspace | EarthRef.org</title>
        </Helmet>
        <MagICPrivateContributions/>
      </Page>
    }/>
    <Redirect exact from="/MagIC/data-models" to={`/MagIC/data-models/${_.last(versions)}`}/>
    <Route exact path="/MagIC/data-models/:v" render={({match, location}) =>
      <Page portal="MagIC" title="Browse the current and recent MagIC Data Models:">
        <Helmet>
          <title>MagIC Data Models | EarthRef.org</title>
        </Helmet>
        <MagICDataModel version={match.params.v} search={location.search && location.search.substring(1) || ""}/>
      </Page>
    }/>
    <Route exact path="/MagIC/method-codes" render={({location}) =>
      <Page portal="MagIC" title="Browse the MagIC Method Codes:">
        <Helmet>
          <title>MagIC Method Codes | EarthRef.org</title>
        </Helmet>
        <MagICMethodCodes search={location.search || ""}/>
      </Page>
    }/>
    <Route exact path="/MagIC/upgrade" render={() =>
      <Page portal="MagIC" title="Upgrade an outdated MagIC contribution to the latest MagIC data model version:">
        <Helmet>
          <title>MagIC Upgrader | EarthRef.org</title>
        </Helmet>
        <MagICUpgradeContribution/>
      </Page>
    }/>
    <Route exact path="/MagIC/upload" render={() =>
      <Page portal="MagIC" title="Upload data into your private workspace:">
        <Helmet>
          <title>MagIC Uploader | EarthRef.org</title>
        </Helmet>
        <MagICUploadContribution/>
      </Page>
    }/>
    <Route exact path="/MagIC/validate" render={() =>
      <Page portal="MagIC" title="Validate a MagIC contribution:">
        <Helmet>
          <title>MagIC Validator | EarthRef.org</title>
        </Helmet>
        <MagICValidateContribution/>
      </Page>
    }/>
    <Route render={() =>
      <Page portal="MagIC">
        <Helmet>
          <title>MagIC Error | EarthRef.org</title>
        </Helmet>
        <Error title="Error 404: Sorry, this page is missing!"/>
      </Page>
    }/>
  </Switch>
);

export default Routes;
