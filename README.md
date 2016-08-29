gulp.js Front End Boilerplate
=============================

Boilerplate Node gulp.js project for front end development.

### Features
* BrowserSync live preview
* SASS post-processing with autoprefixer
* JS Hinting
* CSS and JS concatenation and minification
* Image minification
* Handlebars compilation at runtime

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

### Development dependencies
* gulp.js (http://gulpjs.com/)
* gulp-sass (https://www.npmjs.com/package/gulp-sass)
* gulp-autoprefixer (https://www.npmjs.com/package/gulp-autoprefixer)
* gulp-jshint (https://www.npmjs.com/package/gulp-jshint)
* gulp-concat (https://www.npmjs.com/package/gulp-concat)
* gulp-uglify (https://www.npmjs.com/package/gulp-uglify)
* gulp-rename (https://www.npmjs.com/package/gulp-rename)
* del (https://www.npmjs.com/package/del)
* gulp-imagemin, imagemin-pngquant (https://www.npmjs.com/package/gulp-imagemin)
* run-sequence (https://www.npmjs.com/package/run-sequence)
* browserSync (https://www.browsersync.io/) 
* Handlebars (http://handlebarsjs.com/)
* gulp-help (https://www.npmjs.com/package/gulp-help)
