var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    browserSync = require('browser-sync');

gulp.task('connect-sync', function() {
    connect.server({}, function (){
        browserSync({
            proxy: 'http://emocar.com'
        });
    });

    gulp.watch('**/*.php').on('change', function () {
        browserSync.reload();
    });

    gulp.watch('**/*.js').on('change', function () {
        browserSync.reload();
    });

    gulp.watch('**/*.css').on('change', function () {
        browserSync.reload();
    });

    gulp.watch('**/*.scss').on('change', function () {
        browserSync.reload();
    });
});