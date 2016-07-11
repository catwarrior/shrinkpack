#!/usr/bin/env node

// 3rd party modules
var path = require('path');
var program = require('commander');

// modules
var cli = require('./src/cli');
var version = require('./package.json').version;

// implementation
program
  .version(version)
  .usage('[options] <directory>')
  .option('-u, --uncompressed', 'use uncompressed .tar files instead of compressed .tgz')
  .parse(process.argv);

var directory = program.args[0] ? path.resolve(program.args[0]) : process.cwd();

cli.run(directory, {
  uncompressed: !!program.uncompressed
});
