import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';

import _ from 'lodash';
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

    async magicGetPmagPyPlotFiles(cID, user, limit, attempt = 0) {
      this.unblock();
      //console.log("magicGetPmagPyPlotFiles", attempt, `http://pmagpy.earthref.org/plots/${cID}`);
      
      try {
        return await new Promise(resolve => {
          Meteor.call("s3ListObjects", {
            bucket: "magic-plots",
            prefix: `${cID}/`, 
            limit
          }, (error, objects) => {
            resolve(_.map(objects, 'Key'));
          });
        });
      } catch (e) {
        console.error("magicGetPmagPyPlotFiles", `Failed to retrieve PmagPy plot files for contribution ${cID}`, e);
        throw new Meteor.Error("magicGetPmagPyPlotFiles", `Failed to retrieve PmagPy plot files for contribution ${cID}`);
      }
    },

    async magicGetPmagPyPlot(file, user, attempt = 0) {
      this.unblock();
      //console.log("magicGetPmagPyPlot", attempt, file);
      
      try {
        return await new Promise(resolve => {
          Meteor.call("s3GetObjectBase64", {
            bucket: "magic-plots",
            key: file
          }, (error, base64) => {
            resolve(base64);
          });
        });
      } catch (e) {
        console.error("magicGetPmagPyPlot", `Failed to retrieve PmagPy plot ${file}`, e);
        throw new Meteor.Error("magicGetPmagPyPlot", `Failed to retrieve PmagPy plot ${file}`);
      }
    },

    async magicGetPrivateContribution(id, user, attempt = 0) {
      this.unblock();
      console.log("magicGetPrivateContribution", id, user, attempt);

      try {
        return await Meteor.call("s3GetObject", { 
          bucket: `magic-private-contributions/${id}`,
          key: `magic_contribution_${id}.txt`,
          encoding: 'utf-8'
        });
      } catch (e) {
        // console.error("magicGetPrivateContribution", `Failed to retrieve private contribution for ${id}`, e);
        throw new Meteor.Error("magicGetPrivateContribution", `Failed to retrieve private contribution for ${id}`);
      }
    },

    async magicGetPrivateContributionZip(id, user, attempt = 0) {
      this.unblock();
      console.log("magicGetPrivateContributionZip", id, user, attempt);

      try {
        return await Meteor.call("s3GetObject", { 
          bucket: `magic-private-contributions/${id}`,
          key: `magic_contribution_${id}.zip`
        });
      } catch (e) {
        // console.error("magicGetPrivateContributionZip", `Failed to retrieve private contribution for ${id}`, e);
        throw new Meteor.Error("magicGetPrivateContributionZip", `Failed to retrieve private contribution for ${id}`);
      }
    },

    async magicGetPublicContributions(ids, fileName, user, attempt = 0) {
      this.unblock();
      console.log("magicGetPublicContributions", ids, fileName, user, attempt);

      try {
        return await Meteor.call("s3GetObjectsZip", {
          fileName,
          objects: ids.map(id => { 
            return { 
              bucket: `magic-activated-contributions/${id}`,
              key: `magic_contribution_${id}.txt`
            };
          })
        });
      } catch (e) {
        console.error("magicGetPublicContributions", `Failed to retrieve private contributions for IDs ${ids.join(', ')}`, e);
        // throw new Meteor.Error("magicGetPublicContributions", `Failed to retrieve private contributions for IDs ${ids.join(', ')}`);
      }
    }

  });

};