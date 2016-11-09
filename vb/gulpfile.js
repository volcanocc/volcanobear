/**
 * Created by CAN on 2016/9/25.
 */


var gulp = require("gulp");
var gutil = require("gulp-util");
var del = require("del");
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cached = require('gulp-cached');
var remember = require('gulp-remember');

var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

var connect = require('gulp-connect');
var rest = require('connect-rest');
var mocks = require('./mocks');

/**
 * ----------------------------------------------------
 * source configuration
 * ----------------------------------------------------
 */

var src = {
    html: "src/*.html",                               // html 文件
    vendor: ["vendor/**/*", "bower_components/**/*"], // vendor 目录和 bower_components
    styles: "src/styles/*.scss",                      // styles 目录下所有*.scss
    assets: "assets/**/*"                             // 图片等应用资源
};

var tmp = {
    root: "tmp/",
    html: "tmp/",
    styles: "tmp/styles",
    vendor: "tmp/vendor",
    assets: "tmp/assets"
};

var dist = {
    root: "dist/",
    html: "dist/",
    styles: "dist/styles",
    vendor: "dist/vendor",
    assets: "dist/assets"
};

/**
 * ----------------------------------------------------
 *  tasks
 * ----------------------------------------------------
 */

/**
 * clean build dir
 */
function clean(done) {
    del.sync(tmp.root);
    done();
}

exports.clean = clean;


/**
 * [cleanDist description]
 * @return {[type]} [description]
 */
function cleanDist(done) {
    del.sync(dist.root);
    done();
}

/**
 * [copyVendor description]
 * @return {[type]} [description]
 */
function copyVendor() {
    return gulp.src(src.vendor)
        .pipe(gulp.dest(tmp.vendor));
}

/**
 * [copyAssets description]
 * @return {[type]} [description]
 */
function copyAssets() {
    return gulp.src(src.assets)
        .pipe(gulp.dest(tmp.assets));
}

/**
 * [copyTmp description]
 * @return {[type]} [description]
 */
function copyTmp() {
    return gulp.src(tmp.root + '**/*')
        .pipe(gulp.dest(dist.root));
}

/**
 * [html description]
 * @return {[type]} [description]
 */
function html() {
    return gulp.src(src.html)
        .pipe(gulp.dest(tmp.html))
}

/**
 * [styles description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */

function styles() {
    return gulp.src(src.styles)
        .pipe(cached('styles'))
        .pipe(sass())
        .on('error', handleError)
        .pipe(autoprefixer({
            browsers: ['last 3 version']
        }))
        .pipe(gulp.dest(tmp.styles))
}

exports.styles = styles;

/**
 * [webpackProduction description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
function webpackProduction(done) {
    var config = Object.create(webpackConfig);
    config.plugins = config.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    webpack(config, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:production]", stats.toString({
            colors: true
        }));
        done();
    });
}


/**
 * [webpackDevelopment description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
var devConfig, devCompiler;

devConfig = Object.create(webpackConfig);
devConfig.devtool = "sourcemap";
devConfig.debug = true;
devCompiler = webpack(devConfig);

function webpackDevelopment(done) {
    devCompiler.run(function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:build-dev", err);
            return;
        }
        /*gutil.log("[webpack:build-dev]", stats.toString({
         colors: true
         }));*/
        done();
    });
}

/**
 * webpack develop server
 */
// devConfig.plugins = devConfig.plugins || []
// devConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
// function webpackDevelopmentServer(done) {
//   new WebpackDevServer(devCompiler, {
//    contentBase: tmp.root,
//     lazy: false,
//     hot: true
//   }).listen(8080, 'localhost', function (err) {
//     if (err) throw new gutil.PluginError('webpack-dev-server', err)
//     gutil.log('[webpack-dev-server]', 'http://localhost:8080/')
//  reload();
//  done();
//   });
// }

/**
 * [connectServer description]
 * @return {[type]} [description]
 */
function connectServer(done) {
    connect.server({
        root: tmp.root,
        port: 8080,
        livereload: true,
        middleware: function (connect, opt) {
            return [rest.rester({
                context: "/"
            })]
        }
    });
    mocks(rest);
    done();
}

/**
 * [watch description]
 * @return {[type]} [description]
 */
function watch() {
    gulp.watch(src.html, html);
    gulp.watch("src/**/*.js", webpackDevelopment);
    gulp.watch("src/**/*.scss", styles);
    gulp.watch("tmp/**/*").on('change', function (file) {
        gulp.src('tmp/')
            .pipe(connect.reload());
    });
}

/**
 * serve task
 */
gulp.task("serve", gulp.series(
    clean,
    gulp.parallel(copyAssets, copyVendor, html, styles, webpackDevelopment),
    connectServer,
    watch
));

/**
 * production build task
 */
gulp.task("build", gulp.series(
    clean,
    gulp.parallel(copyAssets, copyVendor, html, styles, webpackProduction),
    cleanDist,
    copyTmp,
    function (done) {
        console.log('build success');
        done();
    }
));

/**
 * [handleError description]
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
function handleError(err) {
    if (err.message) {
        console.log(err.message)
    } else {
        console.log(err)
    }
    this.emit('end')
}

/**
 * [reload description]
 * @return {[type]} [description]
 */
function reload() {
    connect.reload();
}
