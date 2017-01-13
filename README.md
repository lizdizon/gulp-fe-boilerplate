gulp.js Front End Boilerplate
=============================

Boilerplate Node gulp.js project for front end development.

### Features
* BrowserSync live preview
* SASS pre-processing with autoprefixing
* JS Hinting
* CSS and JS concatenation and minification
* Image minification

### Installation
```
$ npm install
$ gulp build
```

### Commands

#### Main tasks
`$ gulp watch` - Start local server, preview build at http://localhost:3000
* starts browserSync and local server
* watches for changes in /source/* and runs jshint, js cat + uglify, sass + autoprefixer, and copy tasks as needed, outputting into /dist/*

`$ gulp build` - build project from source
* clean /dist/*, copy the following: /source/*.html, /source/images/* optimized with imagemin, /source/fonts/*, dev dependencies into /dist/.

#### Additional tasks
`$ gulp help` - List additional dev gulp tasks.

`$ gulp help --all` - List all project tasks

### Dependencies
* gulp.js (http://gulpjs.com/)
* gulp-sass (https://github.com/dlmanning/gulp-sass)
* gulp-autoprefixer (https://github.com/sindresorhus/gulp-autoprefixer)
* gulp-jshint (https://github.com/spalger/gulp-jshint)
* gulp-concat (https://github.com/contra/gulp-concat)
* gulp-uglify (https://github.com/terinjokes/gulp-uglify)
* gulp-rename (https://github.com/hparra/gulp-rename)
* del (https://github.com/sindresorhus/del)
* gulp-imagemin, imagemin-pngquant (https://github.com/sindresorhus/gulp-imagemin)
* run-sequence (https://github.com/OverZealous/run-sequence)
* browserSync (https://www.browsersync.io/) 
* gulp-help (https://github.com/chmontgomery/gulp-help)
* pump (https://github.com/mafintosh/pump)
* normalize.css (https://github.com/necolas/normalize.css/)
