'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import jshint from 'gulp-jshint';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
browserSync.create('bs-server');

const dirs = {
    src: 'src',
    dest: 'build'
};
const sassPaths = {
    src: `${dirs.src}/app.scss`,
    dest: `${dirs.dest}/styles/`
};
const jsPaths = {
    src: `${dirs.src}/app.js`,
    dest: `${dirs.dest}/js/`
};

gulp.task('javascript', () => {
   return gulp
       .src(jsPaths.src)
       .pipe(babel({
           presets: ['es2015']
       }))
       .pipe(jshint()) //TODO: configuration?
       .pipe(uglify())
       .pipe(sourcemaps.write('.'))
       .pipe(gulp.dest(jsPaths.dest));
});

gulp.task('styles', () => {
    return gulp
        .src(sassPaths.src)
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(sassPaths.dest))
});

gulp.task('browser-sync', ['javascript', 'styles'], () => {
    return browserSync.init([`index.html`,`${dirs.src}/*.scss`, `${dirs.src}/*.js`, `${dirs.src}/*.css`], {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', () => {
    gulp.watch(`${dirs.src}/*.js`, ['javascript']);
    gulp.watch(`${dirs.src}/*.scss`, ['styles']);
    gulp.watch(`index.html`, ['javascript','styles']);
});

gulp.task('default', ['javascript', 'styles', 'browser-sync','watch'], () => {
    // default task to RUN THEM ALLLLL !!!!!!!!!
});

