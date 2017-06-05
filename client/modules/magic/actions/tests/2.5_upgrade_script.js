const {describe, it} = global;
import fs from 'fs';
import {expect} from 'chai';
import _ from 'lodash';
import Promise from 'bluebird';
import ParseContribution from '../parse_contribution';
import UpgradeContribution from '../upgrade_contribution';
import ExportContribution from '../export_contribution';
import SummarizeContribution from '../summarize_contribution';

//var dirIn = 'D:/Google Drive/Cogense/Clients/Anthony Koppers/EarthRef/MagIC/Projects/Meteor/Upgrader/2.5 Contributions Test - Citations/';
var dirIn = 'D:/Google Drive/Cogense/Clients/Anthony Koppers/EarthRef/MagIC/Projects/Meteor/Upgrader/2.5 Contributions/';
var dirOut = 'client/modules/magic/actions/tests/output/upgraded2/';
if (!fs.existsSync(dirOut)) fs.mkdirSync(dirOut);

describe('magic.actions.2_5_upgrade_script', () => {

  // Test upgrading.
  //const files = ['3476.txt'];
  const files = fs.readdirSync(dirIn);
  if (files) for (var file of files.slice(0,50000)) {

    describe('when upgrading ' + file, function(file) {
      it('should process.', function (done) { setTimeout(() => {
        //if (fs.existsSync(dirOut + '/' + file + '.indexes/' + file + '.contribution.json')) {
        if (fs.existsSync(dirOut + '/' + file + '.summary.json')) {
          done();
        } else {
          this.timeout(0);

          const text = fs.readFileSync(dirIn+file, "utf8");

          //console.log(text);
          const parser = new ParseContribution({});

          parser.parsePromise({text: text}).then(() => {
            //console.log('Parser output', parser.json);
            try { expect(parser.errors().length).to.equal(0); } catch (err) { done(err); return }

            const upgrader = new UpgradeContribution({});
            upgrader.upgradePromise({json: parser.json}).then(() => {
              try { expect(upgrader.errors().length).to.equal(0); } catch (err) { done(err); return }

              const exporter = new ExportContribution({});
              fs.writeFileSync(dirOut+file+'.3.0.txt', exporter.toText(upgrader.json));
              fs.writeFileSync(dirOut+file+'.3.0.json', JSON.stringify(upgrader.json));
              try { expect(exporter.errors().length).to.equal(0); } catch (err) { done(err); return }

              const summarizer = new SummarizeContribution({});
              summarizer.summarizePromise(upgrader.json).then(() => {
                fs.writeFileSync(dirOut + file + '.summary.json', JSON.stringify(summarizer.json));
                /*if (!fs.existsSync(dirOut + '/' + file + '.indexes/')) fs.mkdirSync(dirOut + '/' + file + '.indexes/');
                  _.keys(summarizer.json).forEach((key) => {
                  if (key !== 'contribution') _.keys(summarizer.json[key]).forEach((val, idx) => {
                    fs.writeFileSync(dirOut + '/' + file + '.indexes/' + file + '.' + key + '.' + idx + '.json', JSON.stringify(summarizer.json[key][val]));
                  });
                });
                fs.writeFileSync(dirOut + '/' + file + '.indexes/' + file + '.contribution.json', JSON.stringify(summarizer.json.contribution));*/
                try { expect(summarizer.errors().length).to.equal(0); } catch (err) { done(err); return }
                done();
              });

            });

          });
        }
      }, 4)});
    }.bind(null, file));

    //break;

  }
});