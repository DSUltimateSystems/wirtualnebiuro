/*global require*/
"use strict";
var gulp = require('gulp'),
	path = require('path'),
	data = require('gulp-data'),
	twig = require('gulp-twig'), // Decided to use twig instead of pug, because already familiar with it
	prefix = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync'),
	imagemin = require('gulp-imagemin'),
	fs = require('fs'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer');

/*
 * Directories here
 */
var paths = {
	build: './build/',
	sass: './app/scss/',
	css: './build/assets/css/',
	js: './app/js/',
	data: './app/views/data/'
};

var jsSRC = 'script.js';
var jsFolder = './app/js/';
var jsDIST = './build/assets/js/';
var jsFiles = [jsSRC];


gulp.task('images', () =>
	gulp.src('app/images/**')
		.pipe(imagemin())
		.pipe(gulp.dest('build/assets/images'))
);

gulp.task('fonts', () =>
    gulp.src('app/fonts/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/assets/fonts'))
);

/**
 * Compile .twig files and pass data from json file
 * matching file name. index.twig - index.twig.json into HTMLs
 */
gulp.task('twig', function () {
	return gulp.src(['./app/views/templates/*.twig'])
	// Stay live and reload on error
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(data(function (file) {
			return JSON.parse(fs.readFileSync(paths.data +
				path.basename(file.path) + '.json'));
		}))
		.pipe(twig())
		.on('error', function (err) {
			process.stderr.write(err.message + '\n');
			this.emit('end');
		})
		.pipe(gulp.dest(paths.build));
});
/**
 * Recompile .twig files and live reload the browser
 */
gulp.task('rebuild', ['twig'], function () {
	// BrowserSync Reload
	browserSync.reload();
});
/**
 * Wait for twig, js and sass tasks, then launch the browser-sync Server
 */
gulp.task('browser-sync', ['sass', 'twig', 'js', 'images', 'fonts'], function () {
	browserSync({
		server: {
			baseDir: paths.build
		},
		notify: false,
		open: false,
		browser:"google chrome"
	});
});
/**
 * Compile .scss files into build css directory With autoprefixer no
 * need for vendor prefixes then live reload the browser.
 */
gulp.task('sass', function () {
  return gulp.src(paths.sass + 'vendors/main.scss')
		.pipe(sourcemaps.init())
		// Stay live and reload on error
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(
			sass({
				includePaths: [paths.sass + 'vendors/'],
				outputStyle: 'expanded'
			}).on('error', function (err) {
				console.log(err.message);
				this.emit('end');
			})
		)
		.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
			cascade: true
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.css));
});
/**
 * Compile .js files into build js directory With app.min.js
 */

gulp.task('js', function(){
  jsFiles.map(function(entry){
    return browserify({
      entries: [jsFolder + entry]
    })
        .transform(babelify, {
          presets: ['env']
        })
        .bundle()
        .pipe(source(entry))
        .pipe(rename({
          extname: '.min.js'
        }))
        .pipe(buffer())
        .pipe(sourcemaps.init({
          loadMaps: true
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(jsDIST))
  });
});

/**
 * Watch scss files for changes & recompile
 * Watch .twig files run twig-rebuild then reload BrowserSync
 */
gulp.task('watch', function () {
	gulp.watch(paths.js + '/**', ['js', browserSync.reload]);
	gulp.watch(paths.sass + 'vendors/**', ['sass', browserSync.reload]);
	gulp.watch([
			'app/views/templates/**/*.twig',
			'app/views/data/**/*.twig.json'
		],
		{cwd:'./'},
		['rebuild']);
});
// Build task compile sass and twig.
gulp.task('build', ['sass', 'twig', 'images', 'fonts']);
/**
 * Default task, running just `gulp` will compile the sass,
 * compile the project site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', ['browser-sync', 'watch']);