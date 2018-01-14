const gulp = require('gulp');
const scss = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');


gulp.task('styles', () => {
  return gulp
    .src('./public/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(scss({
        errorLogToConsole: true,
        outputStyle: 'compressed'
      }).on('error', scss.logError))
    .pipe(autoprefixer())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/dist/css'));
});

gulp.task('js', () => {
  gulp.src('./public/js/**/*.js')
  .pipe(uglify())
  .pipe(concat('main.min.js'))
  .pipe(gulp.dest('./public/dist/js'))
});

gulp.task('watch', () => {
  gulp.watch('./public/scss/**/*.scss', ['styles']);
  gulp.watch('./public/js/**/*.js', ['js']);
});

gulp.task('default', ['styles', 'js']);