const gulp = require('gulp')
const less = require('gulp-less')
const del = require('del')
const rename = require('gulp-rename')
const minCSS = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const gulppug = require('gulp-pug')
const browsersync = require('browser-sync').create()
const gulpCopy = require('gulp-copy')
const imagemin = require('gulp-imagemin')
const newer = require('gulp-newer')

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
    },
    img: {
        src: 'source/img/**/*.{png,jpg,svg}',
        dest: 'dist/img'
    },
    script: {
        src: 'source/js/*.js',
        dest: 'dist/js'
    }
}

function img () {
    return gulp.src(paths.img.src)
    .pipe(newer(paths.img.dest))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.img.dest))
    .pipe(browsersync.stream())
}

function clean () {
    return del(['dist/*', '!dist/img'])
}

function copyScripts () {
    return gulp.src(paths.script.src)
    .pipe(gulpCopy(paths.script.dest, {prefix: 2}))
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
    gulp.watch('source/img', img)
    gulp.watch('source/js/*.js', copyScripts)
    gulp.watch('source/less/**/*.less', styles)
    gulp.watch('source/**/*.pug', pug)
}

const build = gulp.series(clean, pug, gulp.parallel(styles, copyScripts, img), watch)

exports.img = img
exports.pug = pug
exports.clean = clean
exports.styles = styles
exports.watch - watch
exports.build = build
exports.copyScripts = copyScripts