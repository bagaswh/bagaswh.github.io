const gulp = require('gulp'),
  sass = require('gulp-sass'),
  minifyCss = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename');

const SCSS_SRC = ['./src/sass/**/*.scss'];

gulp.task('scss', function () {
  return gulp.src(SCSS_SRC)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(concat('style.css'))
    .pipe(rename({
      basename: 'style',
      extname: '.min.css'
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', function () {
  gulp.watch('./src/sass/**/*.scss', gulp.series('scss'));
});