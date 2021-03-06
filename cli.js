#!/usr/bin/env node
'use strict';

var program = require('commander');
var wpd = require('./');

var args = process.argv.slice(0);
args[1] = 'wp-down';

function yesNo(value) {
  return !!(value === 'y' || value === 'Y' || value === 'yes');
}

program.version('1.0.5')
  .usage('[options]')
  .option('-r, --release [release]', 'WordPress release to download. Default to latest version available', String)
  .option('-f, --format [format]', 'Format of the downloaded archive. Default to zip', String, 'zip')
  .option('-x, --extract [yes|no]', 'Whether or not to extract the archive. Default to yes', yesNo, true)
  .option('-o, --out [dir]', 'Directory where to download/extract the archive. Default to ./ or wordpress-{version}')
  .parse(args);

wpd({version: program.release,
  format: program.format,
  extract: program.extract,
  dir: program.out || (!program.extract ? './': undefined)});
