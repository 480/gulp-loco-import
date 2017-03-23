/**
 * Created by matthew on 2017. 3. 23..
 */

'use strict';

var assert = require('assert');
var gulp = require('gulp');
var loco_api_import = require('../index');

// the function to test
function consoleOutput(param) {
  var newParam = param * param;
  console.log(newParam);
}

var options = {
  'key': '--YOUR--LOCO--API--KEY--',
  'ext': 'pot',
  'index': 'id',
  'ignore-new':false,
  'ignore-existing':true,
  'delete-absent':false,
  'async':false
}

describe('gulp-loco-import', function() {

  it('should import call successfully', function(done) {

    gulp.task('test', function() {
      return gulp.src('test/test.pot')
        .pipe(loco_api_import(options))
        .on('end', function(data){
          console.log(data);
          //assert.equal(content, destFile.toString());
          done();
        });
    });

    gulp.start('test');

  });
});
