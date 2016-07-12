var gulp = require('gulp');
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

paths = {
	src: {
		scss: './source/scss/**/*.scss',
		js: './source/js/*.js',
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

gulp.task('sass', function() {
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

gulp.task('scripts', function() {
	return gulp.src(paths.src.js)
		.pipe(concat('all.js'))
		.pipe(rename('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.dist.js));
});

gulp.task('lint', function() {
	return gulp.src([paths.src.js, '!./source/js/handlebars.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('clean:all', function() {
	return del(paths.dist.root);
});

gulp.task('copy:images', function() {
	return gulp.src(paths.src.images)
		.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			}))
		.pipe(gulp.dest(paths.dist.images));
});

gulp.task('copy:markup', function() {
	return gulp.src(paths.src.markup)
		.pipe(gulp.dest(paths.dist.root));
});

gulp.task('copy:fonts', function() {
	return gulp.src(paths.src.fonts)
		.pipe(gulp.dest(paths.dist.fonts));
});

gulp.task('copy:json', function() {
	return gulp.src('./source/js/index.json')
		.pipe(gulp.dest(paths.dist.js));
});

gulp.task('copy:hbslib', function() {
	return gulp.src('./node_modules/handlebars/dist/handlebars.js')
		.pipe(gulp.dest('./source/js/'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: paths.dist.root
    },
  })
});

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch(paths.src.js, ['lint', 'scripts']);
	gulp.watch(paths.src.scss, ['sass']);
	gulp.watch(paths.src.markup, ['copy:markup']);
});

gulp.task('build', function(callback) {
	runSequence(
		'clean:all',
		'copy:markup',
		'copy:images',
		'copy:fonts',
		'copy:hbslib',
		'copy:json',
		'sass',
		'lint',
		'scripts',
		callback
	);
});

gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);