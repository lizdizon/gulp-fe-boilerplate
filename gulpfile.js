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

gulp.task('sass', false, function() {
	return gulp.src(paths.src.scss)
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest(paths.dist.css))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('scripts', 'JavaScript concat, uglify, and copy to /dist', function(callback) {
	pump([
			gulp.src([paths.src.js + 'vendor/**', paths.src.js + '*.js']),
			concat('all.js'),
			rename('main.min.js'),
			uglify(),
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
		.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
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

gulp.task('copy:json', 'Copy /source/*.json to /dist', function() {
	return gulp.src('./source/js/index.json')
		.pipe(gulp.dest(paths.dist.js));
});

gulp.task('copy:hbslib', false, function() {
	return gulp.src('./node_modules/handlebars/dist/handlebars.js')
		.pipe(gulp.dest('./source/js/vendor/'));
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

gulp.task('watch', 'Launch browsersync and watch sass', ['browserSync', 'sass'], function() {
	gulp.watch(paths.src.js + '*.js', ['lint', 'scripts']);
	gulp.watch('./source/js/*.json', ['copy:json']);
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
		'copy:hbslib',
		'copy:json',
		'sass',
		'lint',
		'scripts',
		callback
	);
});

gulp.task('default', 'Launch project in browser', ['browserSync']);