var gulp = require('gulp');
var concat = require('gulp-concat');
var html2js = require('gulp-html2js');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

gulp.task('html2js', function(){
  gulp
    .src('./src/templates/*.html')
    .pipe(html2js({
      base: 'src',
      useStrict: true,
      outputModuleName: 'angular-xmodal-templates'
    }))
    .pipe(concat('angular-xmodal-templates.js'))
    .pipe(gulp.dest('./.tmp/'));
});

gulp.task('concat', function(){
  gulp
    .src([
      './src/angular-xmodal.js',
      './src/directives/xmodal.js',
      './src/services/xmodal-service.js',
      './.tmp/angular-xmodal-templates.js'
    ])
    .pipe(concat('angular-xmodal.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', function(){
  runSequence('html2js', 'concat');
});