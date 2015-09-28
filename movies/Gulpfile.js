var gulp = require('gulp');
var exec = require('child_process').exec;
var uglify = require('gulp-uglify');

gulp.task('bundle', function(callback) {
  exec('aurelia bundle', function(err) {
    callback(err);
  });
});

gulp.task('uglify', ['bundle'], function() {
  return gulp.src('src/appbundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('src/'));
});

gulp.task('default', ['uglify']);
