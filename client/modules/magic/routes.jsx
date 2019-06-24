import _ from  'lodash';
import React from 'react';
import queryString from 'query-string'
import {Route, Switch, Redirect} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import {versions} from '/lib/configs/magic/data_models.js';
import Page from '/client/modules/common/components/page';
import MagICHome from '/client/modules/magic/components/home';

import MagICMenu from '/client/modules/magic/components/menu/menu';
import MagICAbout from '/client/modules/magic/components/menu/about';
import MagICTechnology from '/client/modules/magic/components/menu/technology';
import MagICContact from '/client/modules/magic/components/menu/contact';
import MagICWorkshops from '/client/modules/magic/components/menu/workshops';
import MagICLinks from '/client/modules/magic/components/menu/links';
import MagICJupyterNotebooks from '/client/modules/magic/components/menu/jupyter_notebooks';
import MagICGrandChallenges from '/client/modules/magic/components/menu/grand_challenges';

import MagICHelp from '/client/modules/magic/components/menu/help/help';
import MagICHelpTextFileFormat from '/client/modules/magic/components/menu/help/text_file_format';
import MagICHelpUploadingData from '/client/modules/magic/components/menu/help/uploading_data';
import MagICHelpCreateAccount from '/client/modules/magic/components/menu/help/create_account';

import MagICSearch from '/client/modules/magic/components/search';
import MagICUpgradeContribution from '/client/modules/magic/components/upgrade_contribution';
import MagICUploadContribution from '/client/modules/magic/components/upload_contribution';
import MagICPrivateContributions from '/client/modules/magic/components/private_contributions';
import MagICDataModel from '/client/modules/magic/components/data_model';
import MagICMethodCodes from '/client/modules/magic/components/method_codes';

import MagICValidateContribution from '/client/modules/magic/components/validate_contribution';
import Error from '/client/modules/common/components/error';

const Routes = ({match}) => (
  <Switch>

    {/* Static Pages */}
    <Route exact path="/MagIC" render={() =>
      <Page portal="MagIC" menu={<MagICMenu/>}>
        <Helmet><title>MagIC Home | EarthRef.org</title></Helmet>
        <MagICHome/>
      </Page>
    }/>
    <Route exact path="/MagIC/about" render={() =>
      <Page portal="MagIC" menu={<MagICMenu/>}>
        <Helmet><title>About MagIC | EarthRef.org</title></Helmet>
        <MagICAbout/>
      </Page>
    }/>
    <Route exact path="/MagIC/technology" render={() =>
      <Page portal="MagIC" menu={<MagICMenu/>}>
        <Helmet><title>MagIC Technology | EarthRef.org</title></Helmet>
        <MagICTechnology/>
      </Page>
    }/>
    <Route exact path="/MagIC/contact" render={() =>
      <Page portal="MagIC" menu={<MagICMenu/>}>
        <Helmet><title>Contact MagIC | EarthRef.org</title></Helmet>
        <MagICContact/>
      </Page>
    }/>
    <Route exact path="/MagIC/help" render={() =>
      <Page portal="MagIC" title="MagIC Help" menu={<MagICMenu/>}>
        <Helmet><title>MagIC Help | EarthRef.org</title></Helmet>
        <MagICHelp/>
      </Page>
    }/>
    <Route exact path="/MagIC/help/text-file-format" render={() =>
      <Page portal="MagIC" title="The MagIC Text File Format" menu={<MagICMenu/>}>
        <Helmet><title>MagIC Help - MagIC Text File Format</title></Helmet>
        <MagICHelpTextFileFormat/>
      </Page>
    }/>
    <Route exact path="/MagIC/help/uploading-data" render={() =>
      <Page portal="MagIC" title="Uploading Data to MagIC" menu={<MagICMenu/>}>
        <Helmet><title>MagIC Help - Uploading Data into MagIC</title></Helmet>
        <MagICHelpUploadingData/>
      </Page>
    }/>
    <Route exact path="/MagIC/help/create-account" render={() =>
      <Page portal="MagIC" title="Creating a MagIC Account" menu={<MagICMenu/>}>
        <Helmet><title>MagIC Help - Creating a MagIC Account</title></Helmet>
        <MagICHelpCreateAccount/>
      </Page>
    }/>
    <Route exact path="/MagIC/workshops" render={() =>
      <Page portal="MagIC" title="MagIC Workshops" menu={<MagICMenu/>}>
        <Helmet><title>MagIC Workshops | EarthRef.org</title></Helmet>
        <MagICWorkshops/>
      </Page>
    }/>
    <Route exact path="/MagIC/links" render={() =>
      <Page portal="MagIC" title="Links to Outside Resources" menu={<MagICMenu/>}>
        <Helmet><title>Links to Outside Resources | EarthRef.org</title></Helmet>
         <MagICLinks/>
      </Page>
    }/>
    <Route exact path="/MagIC/jupyter-notebooks" render={({location}) =>
      <Page portal="MagIC" title="Jupyter Notebooks" menu={<MagICMenu/>}>
        <Helmet><title>Jupyter Notebooks | EarthRef.org</title></Helmet>
        <MagICJupyterNotebooks/>
      </Page>
    }/>
    <Route exact path="/MagIC/grand-challenges" render={({location}) =>
      <Page portal="MagIC" title="The MagIC Grand Challenges" menu={<MagICMenu/>}>
        <Helmet><title>MagIC Grand Challenges | EarthRef.org</title></Helmet>
        <MagICGrandChallenges/>
      </Page>
    }/>

    {/* Search Interface */}
    <Route exact path="/MagIC/search" render={({location}) => {
      let redirectTo;
      if (_.trim(location.hash) !== '') {
        try {
          let oldSearchState = JSON.parse(atob(location.hash.substr(1)));
          if (oldSearchState && oldSearchState.p && oldSearchState.p.length >= 0)
            redirectTo = {
              pathname: "/MagIC/search", 
              state: {
                search: `doi:"${oldSearchState.p[0]}"`
              }
            };
        } catch(e) { console.error(e); }
      }
      if (!redirectTo && location.search && location.search.length > 1) {
        redirectTo = {
          pathname: "/MagIC/search", 
          state: {
            search: location.search.substring(1)
          }
        };
      }
      return (redirectTo && <Redirect to={redirectTo}/> ||
        <Page fullWidth portal="MagIC" menu={<MagICMenu/>}>
          <Helmet><title>MagIC Search | EarthRef.org</title></Helmet>
          <MagICSearch search={location.state && location.state.search || ""}/>
        </Page>
      );
    }}/>
    <Route exact path="/MagIC/:id(\d+)/:private_key([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})" render={({match, location}) =>
      <Redirect to={{
        pathname: "/MagIC/search", 
        state: {
          search: `id:"${match.params.id}" private_key:"${match.params.private_key}" ` + location.search || ""
        }
      }}/>
    }/>
    <Route exact path="/MagIC/:id(\d+)" render={({match, location}) =>
      <Redirect to={{
        pathname: "/MagIC/search", 
        state: {
          search: `id:"${match.params.id}" ` + location.search || ""
        }
      }}/>
    }/>
    <Route exact path="/MagIC/doi/:doi(.+)" render={({match, location}) =>
      <Redirect to={{
        pathname: "/MagIC/search", 
        state: {
          search: `doi:"${match.params.doi}" ` + location.search || ""
        }
      }}/>
    }/>
    
    {/* Other Tools */}
    <Route exact path="/MagIC/validate" render={() =>
      <Page portal="MagIC" title="Validate a MagIC contribution:" menu={<MagICMenu/>}>
        <Helmet>
          <title>MagIC Validator | EarthRef.org</title>
        </Helmet>
        <MagICValidateContribution/>
      </Page>
    }/>

    <Route exact path="/MagIC/upgrade" render={() =>
      <Page portal="MagIC" title="Upgrade an outdated MagIC contribution to the latest MagIC data model version:" menu={<MagICMenu/>}>
        <Helmet>
          <title>MagIC Upgrader | EarthRef.org</title>
        </Helmet>
        <MagICUpgradeContribution/>
      </Page>
    }/>

    <Route exact path="/MagIC/upload" render={() =>
      <Page portal="MagIC" title="Upload data into your private workspace:" menu={<MagICMenu/>}>
        <Helmet>
          <title>MagIC Uploader | EarthRef.org</title>
        </Helmet>
        <MagICUploadContribution/>
      </Page>
    }/>

    <Route exact path="/MagIC/private" render={({location}) =>
      <Page portal="MagIC" title="Manage your contributions:" menu={<MagICMenu/>}>
        <Helmet>
          <title>MagIC Private Workspace | EarthRef.org</title>
        </Helmet>
        <MagICPrivateContributions/>
      </Page>
    }/>

    <Redirect exact from="/MagIC/data-models" to={`/MagIC/data-models/${_.last(versions)}`}/>
    <Route exact path="/MagIC/data-models/:v" render={({match, location}) =>
      <Page portal="MagIC" title="Browse the current and recent MagIC Data Models:" menu={<MagICMenu/>}>
        <Helmet>
          <title>MagIC Data Models | EarthRef.org</title>
        </Helmet>
        <MagICDataModel version={match.params.v} search={queryString.parse(location.search).q || ""}/>
      </Page>
    }/>

    <Route exact path="/MagIC/method-codes" render={({location}) =>
      <Page portal="MagIC" title="Browse the MagIC Method Codes:" menu={<MagICMenu/>}>
        <Helmet>
          <title>MagIC Method Codes | EarthRef.org</title>
        </Helmet>
        <MagICMethodCodes search={location.search || ""}/>
      </Page>
    }/>
    
    {/* 404 Not Found */}
    <Route render={() =>
      <Page portal="MagIC" menu={<MagICMenu/>}>
        <Helmet>
          <title>MagIC Error | EarthRef.org</title>
        </Helmet>
        <Error title="Error 404: Sorry, this page is missing!"/>
      </Page>
    }/>
  </Switch>
);

export default Routes;
