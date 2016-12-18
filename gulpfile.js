(function() {
    'use strict';

    var gulp = require('gulp');

    var plugins = require('gulp-load-plugins')();

    //Build Vars
    var directive = 'wb-google-addresspicker';

    gulp.task('default', ['build']);

    gulp.task('build', function() {
        return gulp.src('./src/*.js')
            .pipe(plugins.ngAnnotate({
                single_quotes: true,
                add: true
            }))
            .pipe(plugins.stripDebug())
            .pipe(plugins.stripComments())
            .pipe(plugins.concat(directive + '.js'))
            .pipe(gulp.dest('./dist'))
            .pipe(plugins.uglify())
            .pipe(plugins.rename({
                extname: '.min.js'
            }))
            .pipe(gulp.dest('./dist'));
    });
})();
