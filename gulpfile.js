// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var gulpUtil = require('gulp-util');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');


// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('public/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('public/scss/*.scss', ['sass']);
});

//Nodemon - start node server and watch for changes
gulp.task('start', function () {
  nodemon({
    script: 'app.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
})

// Default Task
gulp.task('default', ['lint', 'sass', 'watch', 'start']);
