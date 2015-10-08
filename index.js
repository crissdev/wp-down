'use strict';

var Download = require('download');
var RELEASE_BASE_URL = 'http://wordpress.org/wordpress-';
var wp = require('./wp');


function getLatestVersion(requestedVersion, cb) {
  if (requestedVersion) {
    process.nextTick(function() {
      cb(null, requestedVersion);
    })
  }
  else {
    wp.getLatestVersion(function(err, latestVersion) {
      if (err) {
        return cb(err);
      }
      cb(null, latestVersion);
    });
  }
}

module.exports = function(options, callback) {
  if (typeof options === 'string') {
    options = {version: options};
  }
  else if (typeof options === 'function') {
    callback = options;
    options = null;
  }
  options = options || {};

  getLatestVersion(options.version, function(_, version) {
    if (!version) {
      if (callback) {
        return callback(new Error('No version specified.'));
      }
      throw new Error('No version specified.');
    }
    options.version = version;

    if (!options.format) {
      options.format = 'zip';
    }
    if (typeof options.extract === 'undefined') {
      options.extract = true;
    }
    if (options.extract) {
      options.dir = (options.dir || './wordpress-{version}').replace('{version}', options.version);
    }
    var archiveUrl = RELEASE_BASE_URL + options.version + '.' + options.format;
    var download = new Download({extract: !!options.extract, strip: 1 }).get(archiveUrl);

    if (options.extract || options.dir) {
      download.dest(options.dir);
    }
    download.run(callback);
  });
};
