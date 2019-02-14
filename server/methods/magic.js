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

    async getPmagPyPlotFiles(cID, user, attempt = 0) {
      this.unblock();
      console.log("getPmagPyPlotFiles", attempt, `http://pmagpy.earthref.org/plots/${cID}`);
      
      try {
        const resp = HTTP.call("GET", `http://pmagpy.earthref.org/plots/${cID}`);
        if (resp && resp.statusCode && resp.statusCode === 200 && resp.content) {
          let files = [];
          let html = resp.content.toString();
          const re = /href="(.*?\.png)"/gi;
          let match = re.exec(html);
          while (match !== null) {
            files.push(match[1]);
            match = re.exec(html);
          }
          return files;
        }
        else if (resp && resp.statusCode && resp.statusCode === 404) {
          return [];
        }
        else if (attempt < 3) {
          return Meteor.call("getPmagPyPlot", cID, file, user, attempt + 1);
        } else {
          console.error("getPmagPyPlotFiles", `Failed to retrieve PmagPy plot ${file} for contribution ${cID}`);
          throw new Meteor.Error("getPmagPyPlotFiles", `Failed to retrieve PmagPy plot ${file} for contribution ${cID}`);
        }
      } catch (e) {
        if (e.response && e.response.statusCode && e.response.statusCode === 404) {
          return [];
        }
        else if (attempt < 3) {
          return Meteor.call("getPmagPyPlotFiles", cID, user, attempt + 1);
        } else {
          console.error("getPmagPyPlotFiles", `Failed to retrieve PmagPy plot files for contribution ${cID}`, e);
          throw new Meteor.Error("getPmagPyPlotFiles", `Failed to retrieve PmagPy plot files for contribution ${cID}`);
        }
      }
    },

    async getPmagPyPlot(cID, file, user, attempt = 0) {
      this.unblock();
      console.log("getPmagPyPlot", attempt, `http://pmagpy.earthref.org/plots/${cID}/${file}`);
      
      try {
        const resp = HTTP.call("GET", `http://pmagpy.earthref.org/plots/${cID}/${file}`, { npmRequestOptions: { encoding: null } });
        if (resp && resp.statusCode && resp.statusCode === 200 && resp.headers && resp.content && resp.content.toString) {
          return "data:" + resp.headers["content-type"] + ";base64," + resp.content.toString('base64');
        }
        else if (resp && resp.statusCode && resp.statusCode === 404) {
          return "";
        }
        else if (attempt < 3) {
          return Meteor.call("getPmagPyPlot", cID, file, user, attempt + 1);
        } else {
          console.error("getPmagPyPlot", `Failed to retrieve PmagPy plot ${file} for contribution ${cID}`);
          throw new Meteor.Error("getPmagPyPlot", `Failed to retrieve PmagPy plot ${file} for contribution ${cID}`);
        }
      } catch (e) {
        if (e.response && e.response.statusCode && e.response.statusCode === 404) {
          return "";
        }
        else if (attempt < 3) {
          return Meteor.call("getPmagPyPlot", cID, file, user, attempt + 1);
        } else {
          console.error("getPmagPyPlot", `Failed to retrieve PmagPy plot ${file} for contribution ${cID}`, e);
          throw new Meteor.Error("getPmagPyPlot", `Failed to retrieve PmagPy plot ${file} for contribution ${cID}`);
        }
      }
    }

  });

};