import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';

import _ from 'lodash';
//import s3 from 's3';
import moment from 'moment';
import request from 'request';

import {Collections, collectionDefinitions} from '/lib/collections';

export default function () {

  Meteor.methods({

    'createImportSettingsTemplate': function (user, name, settings) {
      //console.log('create import', user, name, settings);
      return Collections['magic.import.settings.templates'].insert({
        _user: user,
        _name: name,
        _inserted: moment().utc().toISOString(),
        settings: settings
      }, (error) => { console.log('create import', error)});
    },

    'saveImportSettingsTemplate': function (user, ID, settings) {
      //console.log('save import', user, ID, settings);
      Collections['magic.import.settings.templates'].update({
        _id: ID,
        _user: user
      }, {
        $set: { settings: settings }
      }, (error) => { console.log('save import', error)});
    },

    'renameImportSettingsTemplate': function (user, ID, name) {
      //console.log('rename import', user, ID, name);
      Collections['magic.import.settings.templates'].update({
        _id: ID,
        _user: user
      }, {
        $set: { _name: name }
      }, (error) => { console.log('rename import', error)});
    },

    'deleteImportSettingsTemplate': function (user, ID) {
      //console.log('delete import', user, ID);
      Collections['magic.import.settings.templates'].remove({
        _id: ID,
        _user: user
      }, (error) => { console.log('delete import', error)});
    },

    'getImportSettingsTemplates': function (user) {
      console.log('getImportSettingsTemplates', user);
      let templates = Collections['magic.import.settings.templates'].find(
        {_user: user},
        {sort: {'_inserted': -1}}).fetch();
      console.log('getImportSettingsTemplates', user, templates);
      return templates;
    },

    'getImportSettingsTemplate': function (ID) {
      return Collections['magic.import.settings.templates'].findOne(ID);
    },

    async getPmagPyPlot(cID, user, attempt = 0) {
      this.unblock();
      console.log("getPmagPyPlot", attempt, `http://pmagpy.earthref.org/plots/${cID}`);
      let resp = HTTP.call("GET", `http://pmagpy.earthref.org/plots/${cID}`, { npmRequestOptions: { encoding: null } });
      console.log(resp);
      if (!resp.statusCode || !resp.data || !resp.data.message) {
        if (attempt < 3) {
          return Meteor.call("getPmagPyPlot", cID, user, attempt + 1);
        } else {
          console.error("getPmagPyPlot", `Failed to retrieve PmagPy plot for contribution ${cID}`);
          throw new Meteor.Error("getPmagPyPlot", `Failed to retrieve PmagPy plot for contribution ${cID}`);
        }
      } else {
        console.log(resp);
      }
    }

  });

};