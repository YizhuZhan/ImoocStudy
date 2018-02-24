import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args';

gulp.task('browser',(cb)=>{
    if(!args.watch) return cb();
    gulp.watch('app/**/*.js',['scripts']);
    gulp.watch('app/**/*.css',['css']);
    gulp.watch('app/**/*.ejs',['pages']);
    gulp.watch('app/**/*.ejs',['pages']);
})