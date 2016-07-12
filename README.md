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
`$ gulp watch` - Start local server, preview build at http://localhost:3000
* starts browserSync and local server
* watches for changes in /src/* and runs jshint, js cat + uglify, sass + autoprefixer, and copy tasks as needed, outputting into /dist/*

`$ gulp build` - build project from source
* clean /dist/*, compile and copy all assets and dependencies, optimize images

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
