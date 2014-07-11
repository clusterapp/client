var gulp = require('gulp');
var $ = require('gulp-load-plugins')()


gulp.task('js', function () {

  gulp.src([
      'app/shared/vendor/angular.min.js',
      'app/shared/vendor/*.js',
      'app/modules.js',
      'app/pages/**/*.js'
    ])
    .pipe($.sourcemaps.init())
    .pipe($.concat('cluster.js'))
    // .pipe($.ngAnnotate())
    // .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('app/assets/js'))
})


gulp.task('dev', ['js'], function () {
  gulp.watch('app/assets/js/**/*.js', ['js'])
})


gulp.task('build', ['js'])
