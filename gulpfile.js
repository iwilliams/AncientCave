var gulp       = require('gulp'),
    babel      = require('gulp-babel'),
    browserify = require('browserify'),
    source     = require('vinyl-source-stream'),
    babelify   = require("babelify");

var defaultTasks = [];

// Compile es6 code
gulp.task('es6', function() {
    browserify("./src/AncientCave.js", { debug: true })
      .transform(babelify)
      .bundle()
      .on("error", function (err) { console.log("Error : " + err.message); })
      .pipe(source('AncientCave.js'))
      .pipe(gulp.dest('./dist'));
});
defaultTasks.push('es6');

// Watches script directories and rebuilds on change
gulp.task('watch-scripts', function() {
    gulp.watch([
        './src/**/*.js',
    ], function() {
        console.log("~~~ Rebuilding Scripts... ~~~");
    });

    gulp.watch([
        './src/**/*.js',
    ], ['es6']);
});
defaultTasks.push('watch-scripts');

gulp.task('move-resources', function() {
    gulp.src('./src/resources/*/**')
        .pipe(gulp.dest('./dist/resources'));
});
defaultTasks.push('move-resources');

gulp.task('default', defaultTasks);
