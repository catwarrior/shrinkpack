// 3rd party modules
var chalk = require('chalk');
var fs = require('fs');
var guard = require('when/guard');
var spawn = require('child_process').spawn;

// modules
var rateLimit = require('./rateLimit');
// var shell = require('../lib/shell');

// public
module.exports = guard(rateLimit, uncompressTar);

// implementation
function uncompressTar (source, target) {
  return new Promise(function (resolve, reject) {
    var logStream = fs.createWriteStream(target, { flags: 'a' });
    var ls = spawn('gunzip', ['--decompress', '--fast', '--stdout', source]);

    ls.stdout.pipe(logStream);

    ls.on('close', function (code) {
      if (code === 1) {
        console.error(chalk.red('! failed to uncompress tgz file %s'), source);
        reject();
      } else {
        resolve();
      }
    });
    // console.log('gunzip --decompress --fast --stdout "' + source + '" > "' + target + '"');
    // shell('gunzip --decompress --fast --stdout "' + source + '" > "' + target + '"')
    //   .then(success, fail)
    //   .catch(fail);

    // function fail (err) {
    //   console.error(chalk.red('! failed to uncompress tgz file %s'), source);
    //   reject(err);
    // }

    // function success () {
    //   resolve();
    // }
  });
}
