'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var urllib = require('urllib');
var querystring = require('querystring');

// consts
var PLUGIN_NAME = 'gulp-loco-import';

// exporting the plugin main function
module.exports = function(options) {

  if (!options) {
    options = {
      'ext': 'pot',
      'index': 'id',
      'ignore-new':false,
      'ignore-existing':true,
      'delete-absent':false,
      'async':false
    };
  }

  if (!options.key) {
    throw new PluginError(PLUGIN_NAME, 'localize.biz(Loco) api key is required.');
  }

  return through.obj(function(file, enc, next) {
    if (!file.isBuffer()) return next(null, file);

    var self = this;
    var content = file.contents.toString();
    var qs = querystring.stringify(options);
    //console.log('https://localise.biz:443/api/import/' + options.ext + '?' + qs);

    urllib.request('https://localise.biz:443/api/import/' + options.ext + '?' + qs, {
      method: 'post',
      timeout: 50000,
      content: content
    }, function (err, data, res) {
      // console.log(data.toString());
      self.push(file);
      next(null, file);
    });
  });
};
