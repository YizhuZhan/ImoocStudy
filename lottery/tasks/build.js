import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import gulpsequence from 'gulp-sequence';
import args from './util/args';

gulp.task('build',gulpsequence('clean','css','pages','scripts',['browser','serve']))