const gulp = require('gulp')
const less = require('gulp-less')
const del = require('del')
const rename = require('gulp-rename')
const minCSS = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const gulppug = require('gulp-pug')
const browsersync = require('browser-sync').create()

const paths = {
    styles: {
        src: 'source/less/styles.less',
        dest: 'dist/css/'
    },
    html: {
        src: 'source/*.html',
        dest: 'dist/'
    },
    pug: {
        src: 'source/*.pug',
        dest: 'dist/'
    }
}

function clean () {
    return del('dist')
}

function styles () {
    return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(minCSS())
    .pipe(rename({
        basename: 'style',
        suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browsersync.stream())
}

function pug () {
    return gulp.src(paths.pug.src)
    .pipe(gulppug())
    .pipe(gulp.dest(paths.pug.dest))
    .pipe(browsersync.stream())
}

function watch () {
    browsersync.init({
        server: {
            baseDir: "./dist/"
        }
    });
    gulp.watch(paths.styles.src, styles)
    gulp.watch('source/**/*.pug', pug)
}

const build = gulp.series(clean, pug, styles, watch)

exports.pug = pug
exports.clean = clean
exports.styles = styles
exports.watch - watch
exports.build = build