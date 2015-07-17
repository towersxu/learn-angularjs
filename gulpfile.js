var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');
var imagemin = require('gulp-imagemin');

gulp.task('less', function () {
  return gulp.src('./app/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./app/css'));
});
gulp.task('minify', function () {
  return gulp.src('./app/less/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./release/css'))
});

gulp.task('autoprefixer',function(){
  return gulp.src('./app/less/*.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers:['last 2 versions'],
      cascade:false
    }))
    .pipe(gulp.dest('./app/css'))
});

gulp.task('hint',function(){
  return gulp.src('./app/directives/chatroom/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default', { verbose: true }));
});

gulp.task('concat',function(){
  return gulp.src('./app/directives/chatroom/*.js')
    .pipe(concat('chatroom.js'))
    .pipe(gulp.dest('./release/js'));
});


gulp.task('uglify',function(){
  return gulp.src('./release/js/*.js')
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify({outSourceMap: false}))
    .pipe(gulp.dest('./release/js'))
});

gulp.task('ngAnnotate',function(){
  return gulp.src('./app/directives/chatroom/*.js')
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./app/directives/chatroom/'))
});

gulp.task('images',function(){
  return gulp.src('app/imag/*')
    .pipe(imagemin({optimizationLevel:3,pregressive:true,interlaced:true}))
    .pipe(gulp.dest('release/img'))
    .pipe(notify({message:'Image task complete'}));
});

gulp.task('html',function(){
  return gulp.src('app/directives/chatroom/*.html')
    .pipe(gulp.dest('release/html'));
});
gulp.task('default', ['less']);
