'use strict';

var Download = require('download');


module.exports.TagsEndpoint = 'https://api.github.com/repos/wordpress/wordpress/tags';

module.exports.getLatestVersion = (function() {
  var _latestVersion;
  var _timestamp;
  var _cacheDuration = 12 * 60 * 60 * 1000;

  return function getLatestVersion(cb) {
    if (_latestVersion && (_timestamp + _cacheDuration > Date.now())) {
      process.nextTick(function() {
        cb(null, _latestVersion);
      });
    }
    else {
      var download = new Download({encoding: 'utf8'});
      download.get(module.exports.TagsEndpoint).run(function(err, files) {
        if (err) {
          return cb(err);
        }
        try {
          var versions = JSON.parse(files[0].contents.toString('utf8'));

          _latestVersion = versions[0].name;
          _timestamp = Date.now();

          cb(null, _latestVersion);
        }
        catch (e) {
          cb(e);
        }
      });
    }
  };
})();
