let gulp = require('gulp'),
  scss = require('gulp-sass'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglifyjs'),
  cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  cache = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer'),
  gutil = require('gulp-util'),
  ftp = require('vinyl-ftp'),
  pug = require('gulp-pug'),
  htmlbeautify = require('gulp-html-beautify');

gulp.task('scss', function() {
  return gulp.src('app/scss/*.scss')
    .pipe(scss())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
      cascade: true
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('scripts', function() {
  return gulp.src([
      'app/libs/jquery/dist/jquery.min.js',
      'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
      'app/libs/bxslider-4/dist/jquery.bxslider.min.js',
      'app/libs/jquery.validate/jquery.validate.min.js',
      'app/libs/form/form.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', ['scss'], function() {
  return gulp.src('app/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts', 'pug'], function() {
  gulp.watch('app/scss/**/*.scss', ['scss']);
  gulp.watch('app/**/*.pug', ['pug']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('pug', function () {
  return gulp.src('app/pug/global/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('app'))
});

gulp.task('htmlbeautify', function() {
  return gulp.src('app/*.html')
    .pipe(htmlbeautify())
    .pipe(gulp.dest('app'))
});

gulp.task('clean', function() {
  return del.sync('dist');
});

gulp.task('img', function() {
  return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({

      interlaced: true,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    })) /**/ )
    .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['clean', 'img', 'scss', 'scripts', 'htmlbeautify'], function() {

  let buildCss = gulp.src([
      'app/css/styles.css',
      'app/css/libs.min.css'
    ])
    .pipe(gulp.dest('dist/css'))

  let buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

  let buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'))

  let buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

  let buildDocs = gulp.src('app/docs/**/*')
    .pipe(gulp.dest('dist/docs'));

  let buildPhp = gulp.src('app/mail/**/*')
    .pipe(gulp.dest('dist/mail'));

  let buildMailPhp = gulp.src('app/mail.php')
    .pipe(gulp.dest('dist'));

});

gulp.task('clear', function(callback) {
  return cache.clearAll();
})

gulp.task('deploy', function() {

  let conn = ftp.create({
    host: 'o92903x7.beget.tech',
    user: 'o92903x7_admin',
    password: 'iCU3m&IS',
    parallel: 10,
    log: gutil.log
  });

  let globs = [
    'dist/**'
  ];

  return gulp.src(globs, {
      base: './dist',
      buffer: false
    })
    .pipe(conn.newer('/'))
    .pipe(conn.dest('/'));

});

gulp.task('default', ['watch']);
