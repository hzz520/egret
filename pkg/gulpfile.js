var gulp = require('gulp')
var concat = require('gulp-concat')
var htmlmin = require('gulp-htmlmin')
var clean = require('gulp-clean')
var removeEmptyLines = require('gulp-remove-empty-lines')

gulp.task("concat",function () {
    gulp.src(
        [
            '../bin-release/web/2017/libs/modules/egret/egret.min.js',
            '../bin-release/web/2017/libs/modules/egret/egret.web.min.js',
            '../bin-release/web/2017/libs/modules/game/game.min.js',
            '../bin-release/web/2017/polyfill/promise.min.js',
            '../bin-release/web/2017/libs/modules/res/res.min.js'
        ])
        .pipe(concat('egret.new.js'))
        .pipe(gulp.dest('../bin-release/web/JS'))
})

gulp.task('html',function () {
    var options = {
        removeComments: true,
        // collapseWhitespace: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
    }

    gulp.src('../bin-release/web/2017/Paint/html/*.html')
        .pipe(clean())

    gulp.src('../bin-release/web/2017/Paint/*.html')
            .pipe(removeEmptyLines())
            .pipe(htmlmin(options))
            .pipe(gulp.dest('bin-release/web/2017/Paint/html'))
})