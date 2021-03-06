var gulp       = require('gulp'),
    babel      = require('gulp-babel'),
    browserify = require('browserify'),
    source     = require('vinyl-source-stream'),
    babelify   = require("babelify"),
    concat     = require('gulp-concat'),
    buffer     = require('vinyl-buffer'),
    uglify     = require('gulp-uglify');

var defaultTasks = [];
var bowerDir = function(dir) {
    return './bower_components/' + dir;
};

var includes = {
    keypress: bowerDir('Keypress/'),
    peerjs:   bowerDir('peerjs/'),
    seedrandom: bowerDir('seedrandom/'),
    howlerjs: bowerDir('howler.js/'),
    immutable: bowerDir('immutable/dist/')
}

// Compile es6 code
// http://stackoverflow.com/questions/24992980/how-to-uglify-output-with-browserify-in-gulp
gulp.task('es6', function() {
    browserify("./src/AncientCave.js", { debug: true })
      .transform(babelify)
      .bundle()
      .on("error", function (err) { console.log("Error : " + err.message); })
      .pipe(source('AncientCave.js'))
      //.pipe(buffer())
      //.pipe(uglify())
      .pipe(gulp.dest('./dist'));
});
defaultTasks.push('es6');

// Compile es6 code
// http://stackoverflow.com/questions/24992980/how-to-uglify-output-with-browserify-in-gulp
gulp.task('simulation-worker', function() {
    browserify("./src/app/workers/SimulationWorker.js", { debug: true })
      .transform(babelify)
      .bundle()
      .on("error", function (err) { console.log("Error : " + err.message); })
      .pipe(source('SimulationWorker.js'))
      //.pipe(buffer())
      //.pipe(uglify())
      .pipe(gulp.dest('./dist/workers'));
});
defaultTasks.push('simulation-worker');

// Vendor Scripts
gulp.task('vendor-scripts', function() {
    return gulp.src([
        includes.keypress   + 'keypress-2.1.3.min.js',
        includes.peerjs     + 'peer.min.js',
        includes.seedrandom + 'seedrandom.js',
        includes.howlerjs   + 'howler.js',
        includes.immutable  + 'immutable.min.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});
defaultTasks.push('vendor-scripts');

// Watches script directories and rebuilds on change
gulp.task('watch-scripts', function() {
    gulp.watch([
        './src/**/*.js',
    ], function() {
        console.log("~~~ Rebuilding Scripts... ~~~");
    });

    gulp.watch([
        './src/**/*.js',
    ], ['es6', 'simulation-worker']);
});
defaultTasks.push('watch-scripts');

gulp.task('move-resources', function() {
    gulp.src('./src/resources/*/**')
        .pipe(gulp.dest('./dist/resources'));
});
defaultTasks.push('move-resources');

gulp.task('watch-resources', function() {
    gulp.watch(['./src/resources/*/**'], ['move-resources']);
});
defaultTasks.push('watch-resources');

gulp.task('default', defaultTasks);
