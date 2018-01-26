var _ = require('lodash');
var fs = require('fs');

//var ParseContribution = require('./client/modules/magic/actions/parse_contribution.js');
//var UpgradeContribution = require('./client/modules/magic/actions/upgrade_contribution.js');

var dirIn = 'D:/Google Drive/Cogense/Clients/Anthony Koppers/EarthRef/MagIC/Projects/Meteor/Upgrader/2.5 Contributions/';
var dirOut = '.scripts/upgrade/upgraded1/';

var iFile = 0;
if (!fs.existsSync(dirOut)) fs.mkdirSync(dirOut);

fs.readdir(dirIn, (err, files) => {
  if (files)
    for (var file of files) {

    console.log(file);

      var lines = fs.readFileSync(dirIn+file, "utf8");

    //const upgrader = new UpgradeContribution({});

    console.log(lines);
    /*if (file === 'chunks') return;

    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream(dir+file)
    });

    var header = '';
    var lines = [];
    var iChunk = 1;
    lineReader
    .on('line', function (line) {
      if (header == '') {
        header = line;
        return;
      }
      lines.push(line);
      if (line[0] !== '<' && lines.length > chunkSize) {
        fs.writeFileSync(dir + 'chunks/' + file + '.' + iChunk, header + '\n' + lines.join('\n'));
        console.log('Wrote chunk', dir + 'chunks/' + file + '.' + iChunk);
        lines = [];
        iChunk += 1;
      }
    })
    .on('close', function() {
      fs.writeFileSync(dir + 'chunks/' + file + '.' + iChunk, header + '\n' + lines.join('\n'));
      console.log('Wrote chunk', dir + 'chunks/' + file + '.' + iChunk);
    });*/

    iFile++;

    break;

  }
});