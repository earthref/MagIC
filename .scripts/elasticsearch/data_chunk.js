var _ = require('lodash');
var fs = require('fs');

var dir = '.data/level345/'
var chunkSize = 1000;
if (!fs.existsSync(dir + 'chunks/')) {
  fs.mkdirSync(dir + 'chunks');
  fs.readdir(dir, (err, files) => {
    files.forEach(file => {

      if (file === 'chunks') return;
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
      });

    });
  });
}