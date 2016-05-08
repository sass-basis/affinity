'use strict';

/**
 * Import node modules
 */
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var rename       = require('gulp-rename');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano      = require('cssnano');
var browserify   = require('browserify');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var babelify     = require('babelify');
var browser_sync = require( 'browser-sync' );

/**
 * ES6 to ES5
 */
gulp.task('js', function() {
	return browserify({
		entries: 'src/js/app.js'
	})
	.transform('babelify', {presets: ['es2015']})
	.bundle()
	.pipe(source('app.js'))
	.pipe(buffer())
	.pipe(gulp.dest('assets/js/'));
} );

/**
 * Sass to CSS
 */
gulp.task('sass', function() {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(gulp.dest('assets/css/'))
		.pipe(postcss([autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		})]))
		.pipe(gulp.dest('assets/css/'))
		.pipe(postcss([cssnano()]))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('assets/css/'));
});

/**
 * Auto Compile Sass.
 */
gulp.task('watch', function() {
	gulp.watch(['src/scss/**/*.scss'], ['sass']);
	gulp.watch(['src/js/**.js'], ['js']);
});


/**
 * Browsersync
 */
gulp.task('browsersync', function() {
	browser_sync.init( {
		server: {
			baseDir: "./"
		},
		files: [
			'./**.html',
			'./assets/**'
		]
	});
});

/**
 * Deploy GitHub Pages
 */
gulp.task('deploy_gh_pages', ['build'], function() {
	return gulp.src(
				[
					'./assets/**',
					'./index.html',
					'./*.md'
				],
				{base: './'}
			)
			.pipe(gulp.dest('gh-pages'));
});

gulp.task('build', ['sass', 'js']);

gulp.task('default', ['build', 'browsersync', 'watch']);
