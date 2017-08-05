import _ from  'lodash';
import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import {versions} from '/lib/modules/magic/data_models.js';
import Page from '/client/modules/common/components/page.jsx';
import MagICHome from '/client/modules/magic/components/home.jsx';
import MagICSearch from '/client/modules/magic/components/search.jsx';
import MagICDataModel from '/client/modules/magic/components/data_model.jsx';
import MagICMethodCodes from '/client/modules/magic/components/method_codes.jsx';
import MagICPrivateContributions from '/client/modules/magic/components/private_contributions.jsx';
import MagICUpgradeContribution from '/client/modules/magic/components/upgrade_contribution.jsx';
import MagICUploadContribution from '/client/modules/magic/components/upload_contribution.jsx';
import MagICValidateContribution from '/client/modules/magic/components/validate_contribution.jsx';
import Error from '/client/modules/common/components/error.jsx';

const Routes = ({match}) => (
  <Switch>
    <Route exact path="/MagIC" render={() =>
      <Page portal="MagIC">
        <MagICHome/>
      </Page>
    }/>
    <Route exact path="/MagIC/search" render={({location}) =>
      <Page fullWidth portal="MagIC">
        <MagICSearch search={location.search || ""}/>
      </Page>
    }/>
    <Route exact path="/MagIC/private" render={({location}) =>
      <Page fullWidth portal="MagIC">
        <MagICSearch search={location.search || ""}/>
      </Page>
    }/>
    <Route exact path="/MagIC/shared" render={({location}) =>
      <Page fullWidth portal="MagIC">
        <MagICSearch search={location.search || ""}/>
      </Page>
    }/>
    <Redirect exact from="/MagIC/data-models" to={`/MagIC/data-models/${_.last(versions)}`}/>
    <Route exact path="/MagIC/data-models/:v" render={({match, location}) =>
      <Page portal="MagIC" title="Browse the current and recent MagIC Data Models:">
        <MagICDataModel version={match.params.v} search={location.search || ""}/>
      </Page>
    }/>
    <Route exact path="/MagIC/method-codes" render={({location}) =>
      <Page portal="MagIC" title="Browse the MagIC Method Codes:">
        <MagICMethodCodes search={location.search || ""}/>
      </Page>
    }/>
    <Route exact path="/MagIC/upgrade" render={() =>
      <Page portal="MagIC" title="Upgrade an outdated MagIC contribution to the latest MagIC data model version:">
        <MagICUpgradeContribution/>
      </Page>
    }/>
    <Route exact path="/MagIC/upload" render={() =>
      <Page portal="MagIC" title="Upload data into your private workspace:">
        <MagICUploadContribution/>
      </Page>
    }/>
    <Route exact path="/MagIC/validate" render={() =>
      <Page portal="MagIC" title="Validate a MagIC contribution:">
        <MagICValidateContribution/>
      </Page>
    }/>
    <Route render={() =>
      <Page portal="MagIC">
        <Error title="Error 404: Sorry, this page is missing!"/>
      </Page>
    }/>
  </Switch>
);

export default Routes;
