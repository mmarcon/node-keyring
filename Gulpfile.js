var gulp = require("gulp");
var jshint = require("gulp-jshint");
var nodemon = require("gulp-nodemon");
var jasmine = require('gulp-jasmine');

var paths = {
    js: [
        'lib/**/*.js',
        'test/**/*.spec.js'
    ],
    tests: [
        'test/**/*.js'
    ]
};

gulp.task('hint', function() {
    gulp.src(paths.js)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('nodemon', function () {
    nodemon({
        script: 'index.js'
    });
});

gulp.task('test', function () {
    return gulp.src(paths.tests)
        .pipe(jasmine());
});