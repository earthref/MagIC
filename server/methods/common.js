import {Meteor} from 'meteor/meteor';
import {HTTP} from 'meteor/http';

import _ from "lodash";
import __ from 'deepdash/standalone';
import fs from 'fs';
import path from 'path';
import moment from 'moment';

export default function () {

  Meteor.methods({
    async getDeploymentDateTimeUTC() {
      this.unblock();
      try {
        const timeMs = fs.statSync(path.join(process.cwd(), "package.json")).ctimeMs;
        const dtUTC = moment(timeMs).utc().toISOString();
        return dtUTC;
      } catch(error) {
        console.error("getDeploymentDateTimeUTC", error);
      }
    },

    async updateUserWithORCID({id, code}) {
      let orcid, token, existingUser;
      if (id) try {
        let user = await Meteor.call('esGetUserByID', {id});
        orcid = user && user.orcid && user.orcid.id;
        token = user && user.orcid && user.orcid.token;
        existingUser = user;
      } catch (error) {
        console.error('updateUserWithORCID esGetUserByID', id, error);
      }
      if (code && (!orcid || !token)) try {
        let auth = HTTP.call("POST", `https://${Meteor.isDevelopment ? 'sandbox.' : ''}orcid.org/oauth/token`, {
          headers: {
            Accept: 'application/json'
          },
          params: {
            client_id: Meteor.isDevelopment ? 'APP-F8JQS3NCYGINEF7B' : 'APP-7V8YQW9CI7R01H1T',
            client_secret: Meteor.isDevelopment ? Meteor.settings.orcid.sandbox_client_secret : Meteor.settings.orcid.client_secret,
            grant_type: 'authorization_code',
            code: code
          }
        });
        orcid = auth.data.orcid;
        token = auth.data.access_token;
      } catch (error) {
        console.error('updateUserWithORCID Authorize', error);
        throw new Meteor.Error(
          'Failed to authenticate your ORCID account.',
          'Please retry logging in with ORCID. If you are still having trouble, please email us.'
        );
      }
      if (orcid) try {
        existingUser = await Meteor.call('esGetUserByORCID', {orcid});
      } catch (error) {
        console.error('updateUserWithORCID esGetUserByORCID', orcid, error);
      }
      try {
        let record = HTTP.call("GET", `https://api.${Meteor.isDevelopment ? 'sandbox.' : ''}orcid.org/v3.0/${orcid}/record`, {
          headers: {
            Accept: 'application/vnd.orcid+json',
            Authorization: `Bearer ${token}`
          }
        });
        let content = JSON.parse(record.content);
        let emailsSortedByMostReliable = 
            content.person.emails && 
            content.person.emails.email &&
            content.person.emails.email.sort((e1, e2) => { 
          if (e1.primary && !e2.primary) return -1;
          if (!e1.primary && e2.primary) return 1;
          if (e1.verified && !e2.verified) return -1;
          if (!e1.verified && e2.verified) return 1;
        }).map(x => { return { email: x.email, verified: x.verified, primary: x.primary }});
        for (x of emailsSortedByMostReliable) {
          try {
            if (!existingUser) {
              let users = await Meteor.call('esGetUsersByEmail', {email: x.email});
              let orcidUsers = users && users.filter(x => x && x.orcid && x.orcid.id === orcid) || undefined;
              existingUser = orcidUsers && orcidUsers.length && orcidUsers[0] || users[0];
            }
          } catch (e) {
            console.error("updateUserWithORCID esGetUsersByEmail", `Failed to get user for email ${x.email}`, e);
          } 
        }
        let user = {
          orcid: {
            id: orcid,
            token: token
          },
          name: {
            source: 'EarthRef'
          },
          email: {
            source: 'EarthRef'
          }
        };
        if (content.person.name) {
          if (content.person.name['given-names'] && content.person.name['given-names'].value) {
            user.name.given = content.person.name['given-names'].value;
            user.name.source = 'ORCID';
          }
          if (content.person.name['family-name'] && content.person.name['family-name'].value) {
            user.name.family = content.person.name['family-name'].value;
            user.name.source = 'ORCID';
          }
          if (content.person.name['credit-name'] && content.person.name['credit-name'].value) {
            user.name.published = content.person.name['credit-name'].value;
            user.name.source = 'ORCID';
          }
        }
        if (emailsSortedByMostReliable && emailsSortedByMostReliable[0] && emailsSortedByMostReliable[0].email) {
          user.email.address = emailsSortedByMostReliable[0].email;
          user.email.source = 'ORCID';
        }
        if (existingUser) {
          user = _.merge(existingUser, user);
          await Meteor.call('esUpdateUserORCID', user);
        } else {
          user = await Meteor.call('esCreateUserFromORCID', user);
        }
        return __.omitDeep(user, /(^|\.)_/);
      } catch (error) {
        console.error('orcidLogin Record Request', error);
        throw new Meteor.Error(
          'Failed to retrieve your ORCID record.', 
          'Please retry logging in with ORCID. If you are still having trouble, please email us.'
        );
      }
    },

    async getReferenceMetadata(doi, attempt = 0) {
      this.unblock();
      // console.log("getReferenceMetadata", attempt, `http://api.crossref.org/works/${doi}`);
      let resp = HTTP.call("GET", `http://api.crossref.org/works/${doi}`);
      if (!resp.statusCode || !resp.data || !resp.data.message) {
        if (attempt < 3) {
          return Meteor.call("getReferenceMetadata", doi, attempt + 1);
        } else {
          console.error("getReferenceMetadata", `Failed to retrieve reference metadata for doi ${doi}`);
          throw new Meteor.Error("getReferenceMetadata", `Failed to retrieve reference metadata for doi ${doi}`);
        }
      } else {
        let d = resp.data.message;
        let _reference = {
          source: 'crossref',
          doi: _.toUpper(d.DOI)
        };

        if (d.title && d.title.length > 0)
          _reference.title = d.title[0];

        if (d['container-title'] && d['container-title'].length > 0)
          _reference.journal = d['container-title'][0];

        if (d['published-print'] && d['published-print']['date-parts'] &&
          d['published-print']['date-parts'][0] && d['published-print']['date-parts'][0][0])
          _reference.year = d['published-print']['date-parts'][0][0];
        else if (d['published-online'] && d['published-online']['date-parts'] &&
          d['published-online']['date-parts'][0] && d['published-online']['date-parts'][0][0])
          _reference.year = d['published-online']['date-parts'][0][0];

        if (d.subject)
          _reference.keywords = d.subject;

        if (d.author && d.author.length === 1)
          _reference.citation = d.author[0].family;
        else if (d.author && d.author.length === 2)
          _reference.citation = d.author[0].family + ' & ' + d.author[1].family;
        else if (d.author && d.author.length > 2)
          _reference.citation = d.author[0].family + ' et al.';
        if (_reference.year)
          _reference.citation += ' (' + _reference.year + ')';

        if (d.author)
          _reference.authors = d.author.map((a) => {
            let author = {};
            author.family = (a.family == a.family.toUpperCase() ? _.startCase(_.lowerCase(a.family)) : a.family);
            author._name = (_.trim(a.given) === '' ? '' : a.given.toUpperCase().substr(0, 1) + '. ') + a.family;
            if (a.given) author.given = a.given;
            if (a.affiliation && a.affiliation.length > 0)
              author.affiliation = a.affiliation.map((affiliation) => affiliation.name);
            if (a.ORCID) {
              let match = a.ORCID.match(/\/([^\/]+)$/);
              if (match.length >= 2) author._orcid = match[1];
            }
            return author;
          });

        if (d.author)
          _reference.long_authors = d.author.map((a) => (a.given ? a.given + ' ' : '') + a.family).join(', ');

        if (d['is-referenced-by-count'])
          _reference.n_citations = d['is-referenced-by-count'];

        _reference.html = '<b>' +
          (_reference.long_authors ? _reference.long_authors : '<i>Unknown Authors</i>') +
          ' (' + (_reference.year ? _reference.year : '<i>Unknown Year</i>') + ').</b> ' +
          (_reference.title ? _reference.title : '<i>Unknown Title</i>') + '. <i>' +
          (_reference.journal ? _reference.journal : 'Unknown Journal') +
          (d.volume ? ' ' + d.volume : '') +
          (d.issue ? ' (' + d.issue + ')' : '') +
          (d.page ? ':' + d.page : '') + '.' +
          (d.DOI ? ' doi:<a href="//dx.doi.org/' + _.toUpper(d.DOI) + '">' + _.toUpper(d.DOI) + '</a>.' : '') +
          '</i>';
        _reference.html = _reference.html.replace(/"/g, "'");
        //console.log("getReferenceMetadata", attempt, `http://api.crossref.org/works/${doi}`, _reference);
        return _reference;

      }
    }
  });

};