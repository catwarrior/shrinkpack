// 3rd party modules
var chalk = require('chalk');

// modules
var copyFile = require('./lib/copyFile');
var uncompressTar = require('./lib/uncompressTar');

// public
module.exports = addToBundle;

// implementation
function addToBundle (deps, uncompressed) {
  return Promise.all(deps.map(
    bundlePackage.bind(null, uncompressed ? uncompressTar : copyFile)
  ));
}

function bundlePackage (bundleDep, dep) {
  return bundleDep(dep.tarball.npm, dep.tarball.shrinkpack)
    .then(success, fail);

  function success () {
    console.info(chalk.green('+ %s'), dep.id);
  }

  function fail (err) {
    console.error(chalk.red('! failed to shrinkpack %s'), dep.id);
    throw err;
  }
}
