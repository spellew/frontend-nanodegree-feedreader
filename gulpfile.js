var gulp = require('gulp'),
  gutil = require('gulp-util'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  ngrok = require('ngrok'),
  sequence = require('run-sequence'),
  port = 8080,
  site = null;

var serveSequence = function () {
  sequence(
    'browser-sync',
    'ngrok-url'
  );
}

gulp.task('browser-sync', function () {
  browserSync.init({
    port: port,
    open: false,
    injectChanges: true,
    server: {
      baseDir: "."
    }
  });
});

gulp.task('ngrok-url', (cb) => {
  return ngrok.connect(port)
    .then((url) => {
      site = url.replace('https://', 'http://');
      gutil.log(gutil.colors.blue('[Secure Url]'), site);
    })
    .catch((err) => {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
      return err;
    });
});

gulp.task('serve', function () {
  serveSequence();
});

gulp.task('reload', function () {
  reload();
});

gulp.task('develop', function () {
  serveSequence();
  gulp.watch(['css/**', 'fonts/**', 'jasmine/**', 'js/**', '*.html'], function () {
    sequence(
      'reload'
    );
  });
});

gulp.task('default', ['develop']);