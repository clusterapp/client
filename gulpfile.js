var gulp = require('gulp');
var $ = require('gulp-load-plugins')()


gulp.task('js', function () {

  gulp.src([
      'app/shared/vendor/async.js',
      'app/shared/vendor/jquery.min.js',
      'app/shared/vendor/angular.min.js',
      'app/shared/vendor/moment.min.js',
      'app/shared/vendor/*.js',
      'app/modules.js',
      'app/shared/**/*.js',
      '!app/shared/**/*Spec.js',
      'app/pages/**/*.js',
      '!app/pages/guest/*.js',
      '!app/pages/**/*Spec.js'
    ])
    .pipe($.sourcemaps.init())
    .pipe($.concat('cluster.js'))
    // .pipe($.ngAnnotate())
    // .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('app/assets/js'))
})



gulp.task('guestjs', function () {

  gulp.src([
      'app/shared/vendor/jquery.min.js',
      'app/shared/vendor/angular.min.js',
      'app/shared/vendor/moment.min.js',
      'app/shared/vendor/*.js',
      'app/modules.js',
      'app/shared/**/*.js',
      '!app/shared/routes/*.js',
      '!app/shared/**/*Spec.js',
      'app/pages/**/*.js',
      '!app/pages/logout/*.js',
      '!app/pages/create/*.js',
      '!app/pages/**/*Spec.js'
  ])
  .pipe($.sourcemaps.init())
  .pipe($.concat('guest.js'))
  // .pipe($.ngAnnotate())
  // .pipe($.uglify())
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest('app/assets/js'))

})



gulp.task('sass', function () {
  gulp.src('app/assets/sass/cluster.sass')
    .pipe($.rubySass({style: 'compressed', loadPath: process.cwd() + '/app/assets/sass'}))
    .pipe(gulp.dest('app/assets/css'));
});


gulp.task('dev', ['js', 'guestjs', 'sass'], function () {
  gulp.watch(['app/pages/**/*.js', 'app/shared/**/*.js'], ['js', 'guestjs'])
  gulp.watch('app/assets/sass/**/*.sass', ['sass'])
})


gulp.task('build', ['js'])
