var gulp = require('gulp');
var $ = require('gulp-load-plugins')()


gulp.task('js', function () {
  var jsBase = 'app/assets/js/';

  gulp.src([
      jsBase + 'libs/angular.min.js',
      jsBase + 'libs/*.js',
      jsBase + 'main.js',
      jsBase + '**/*.js'
    ])
    .pipe($.sourcemaps.init())
    .pipe($.concat('cluster.js'))
    // .pipe($.ngAnnotate())
    // .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('app'))
})
