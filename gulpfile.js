'use strict';

const gulp         = require('gulp');
const nodemon      = require('gulp-nodemon');
const browserSync  = require('browser-sync').create();
const postcss      = require('gulp-postcss');
const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');

gulp.task('autoprefixer', function () {

    return gulp.src('./public_src/stylesheets/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/stylesheets'))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('serve', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: 'localhost:3000',
    port: '9000'
  });

  gulp.watch('public_src/**/*.css', ['autoprefixer']);
  gulp.watch('views/**/*.ejs').on('change', browserSync.reload);
});

gulp.task('nodemon', function(cb) {
  let started = false;

  return nodemon({
    script: './bin/www'
  }).on('start', function() {
    if (!started) {
      cb();
      started = true;
    }
  });
});
