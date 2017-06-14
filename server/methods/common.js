import fs from 'fs';
import path from 'path';
import moment from 'moment';
import {Meteor} from 'meteor/meteor';

export default function () {

  Meteor.methods({
    async getDeploymentDateTimeUTC() {
      try {
        const timeMs = fs.statSync(path.join(process.cwd(), 'package.json')).ctimeMs;
        const dtUTC = moment(timeMs).utc().toISOString();
        return dtUTC;
      } catch(error) {
        console.error('getDeploymentDateTimeUTC', error);
      }
    }
  });

};