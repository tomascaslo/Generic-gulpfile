/*
Author: tomascaslo
Version: 1.0.0

Comments: 

	npm install gulp gulp-util gulp-rename gulp-jade gulp-minify-html gulp-minify-css gulp-uglify gulp-less gulp-jshint jshint-stylish gulp-concat
*/

var gulp = require('gulp'),
	gutil = require('gulp-util'),
	rename = require('gulp-rename'),
	jade = require('gulp-jade'),
	minifyHTML = require('gulp-minify-html'),
	minifyCSS = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	less = require('gulp-less'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	concat = require('gulp-concat');

var filesPaths = {
	jadeFiles = './jade/*.jade',
	lessFiles = './less/**/*.less',
	jsFiles = './js/**/*.js',
	htmlDest = './dist/views/',
	htmlMinDest = './dist/min/views/',
	cssDest = './dist/css/',
	cssMinDest = './dist/min/css/',
	jsDest = './dist/js/',
	jsMinDest = './dist/min/js/',
};

/* HTML minification options */
var htmlMinOpts = {comments:false, spare:false};
	
gulp.task('templates', function(){
	gulp.src(filesPaths.jadeFiles)
		.pipe(jade({pretty: true,}))
		.pipe(gulp.dest(filesPaths.htmlDest))
		.pipe(minifyHTML(htmlMinOpts))
		.pipe(gulp.dest(filesPaths.htmlMinDest));
});

gulp.task('styles', function(){
	gulp.src(lessFiles)
	,pipe(less())
	.pipe(gulp.dest(cssDest))
	.pipe(minifyCSS({keepBreaks:true}))
	.pipe(rename({suffix:'.min', extname:'.css',}))
	.pipe(gulp.dest(cssMinDest))
	.pipe(concat('main.min.css'))
	.pipe(gulp.dest(cssDest));
});

gulp.task('scripts', function(){
	gulp.src(jsFiles)
	.pipe(jshint())
	.pipe(jshint.reporter(stylish))
	.pipe(gulp.dest(jsDest))
	.pipe(uglify())
	.pipe(rename({suffix:'.min', extname:'.js',}))
	.pipe(gulp.dest(jsMinDest))
	.pipe(concat('main.min.js'))
	.pipe(gulp.dest(jsDest));
});

gulp.task('watch', function(){
		gulp.watch(jadeFiles, ['templates']);
		gulp.watch(lessFiles, ['styles']);
		gulp.watch(jsFiles, ['scripts']);
	});

gulp.task('default', ['templates', 'styles', 'scripts', 'watch']);
