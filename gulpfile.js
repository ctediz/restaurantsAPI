var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function() {
    var options = {
        script: 'app.js',
        ext: '.js',
        env: {
            port: 5000
        },
        ignore: ['./node_modules/**']
    };

    return nodemon(options)
        .on('restart', function(ev) {
            console.log('Restarting..');
        });
});