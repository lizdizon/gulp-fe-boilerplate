var gulp = require('gulp-help')(require('gulp'));
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var pump = require('pump');

paths = {
	src: {
		scss: './source/scss/**/*.scss',
		js: './source/js/',
		images: './source/images/**',
		fonts: './source/fonts/**',
		markup: './source/*.html'
	},
	dist: {
		root: './dist',
		css: './dist/css',
		js: './dist/js',
		images: './dist/images',
		fonts: './dist/fonts'
	}
}

gulp.task('sass', false, function(callback) {
	pump([
		gulp.src(paths.src.scss),
		sass({outputStyle: 'compressed'}),
		autoprefixer({
			browsers: ['last 2 versions']
		}),
		rename('main.min.css'),
		gulp.dest(paths.dist.css),
		browserSync.reload({
			stream: true
		})
	],
	callback);
});

gulp.task('scripts', 'JavaScript concat, uglify, and copy to /dist', function(callback) {
	pump([
			gulp.src([paths.src.js + 'vendor/**', paths.src.js + '*.js']),
			concat('all.js'),
			rename('main.min.js'),
			uglify({
				output: {comments: /^!|@preserve|@license|@cc_on/i}
			}),
			gulp.dest(paths.dist.js)
		],
		callback
	);
});

gulp.task('lint', false, function() {
	return gulp.src(paths.src.js + '*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('clean:all', 'Clean /dist', function() {
	return del(paths.dist.root);
});

gulp.task('copy:images', 'Minimize images from /source/images and copy to /dist/images', function() {
	return gulp.src(paths.src.images)
		.pipe(imagemin([
			imagemin.svgo({
				plugins: [ {cleanupIDs: false} ]
			})
		],{ verbose: true }))
		.pipe(gulp.dest(paths.dist.images));
});

gulp.task('copy:markup', 'Copy /source/*.html to /dist', function() {
	return gulp.src(paths.src.markup)
		.pipe(gulp.dest(paths.dist.root));
});

gulp.task('copy:fonts', false, function() {
	return gulp.src(paths.src.fonts)
		.pipe(gulp.dest(paths.dist.fonts));
});

gulp.task('copy:normalizeCss', false, function() {
	return gulp.src('./node_modules/normalize.css/normalize.css')
		.pipe(rename('_normalize.scss'))
		.pipe(gulp.dest('./source/scss/base/'));
});

gulp.task('browserSync', false, function() {
  browserSync.init({
    server: {
      baseDir: paths.dist.root
    },
  })
});

gulp.task('dev', 'Launch browsersync and watch sass', ['browserSync', 'sass'], function() {
	gulp.watch(paths.src.js + '*.js', ['lint', 'scripts']);
	gulp.watch(paths.src.scss, ['sass']);
	gulp.watch(paths.src.markup, ['copy:markup']);
});

gulp.task('build', 'Clean /dist, copy assets, and build project', function(callback) {
	runSequence(
		'clean:all',
		'copy:markup',
		'copy:images',
		'copy:fonts',
		'copy:normalizeCss',
		'sass',
		'lint',
		'scripts',
		callback
	);
});

gulp.task('default', 'Launch project in browser', ['browserSync']);