var gulp = require('gulp');
var $ = require('gulp-load-plugins')()


gulp.task('js', function () {

  gulp.src([
      'app/shared/vendor/angular.min.js',
      'app/shared/vendor/*.js',
      'app/modules.js',
      'app/shared/**/*.js',
      '!app/shared/**/*Spec.js',
      'app/pages/**/*.js',
      '!app/pages/**/*Spec.js'
    ])
    .pipe($.sourcemaps.init())
    .pipe($.concat('cluster.js'))
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


gulp.task('dev', ['js', 'sass'], function () {
  gulp.watch(['app/pages/**/*.js', 'app/shared/**/*.js'], ['js'])
  gulp.watch('app/assets/sass/**/*.sass', ['sass'])
})


gulp.task('build', ['js'])
