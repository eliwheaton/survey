const gulp = require('gulp');
const scss = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');


gulp.task('styles', () => (
  gulp
    .src('./public/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(scss({
      errorLogToConsole: true,
      outputStyle: 'compressed',
    }).on('error', scss.logError))
    .pipe(autoprefixer())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/dist/css'))
));

gulp.task('lint', () => (
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  gulp.src(['**/*.js', '!node_modules/**', '!public/dist/**'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError())
));

gulp.task('js', () => (
  gulp.src('./public/js/**/*.js')
    .pipe(babel({
      presets: ['env'],
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('./public/dist/js'))
));

gulp.task('watch', () => {
  gulp.watch('./public/scss/**/*.scss', ['styles']);
  gulp.watch('**/*.js', ['lint']);
  gulp.watch('./public/js/**/*.js', ['js']);
});

gulp.task('default', ['styles', 'lint', 'js']);
