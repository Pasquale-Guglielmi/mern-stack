var gulp =require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var watchify = require('watchify');

gulp.task('watch', function() {
    var b = browserify({
        entries: ['./src/App.js'],
        cache: {},
        packageCache: {},
        plugin: [watchify]
    });

    b.on('update', makebundle);

    function makebundle() {
        b.transform(babelify, {presets: "react"})
            .bundle()
            .on('error', function(err) {
                console.log(err.message);
                console.log(err.codeFrame);
                this.emit('end');
            })
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./static/'));
        console.log("Bundle updated!!!");
    }

    makebundle();
    return b;
});

gulp.task('default', ['watch']);