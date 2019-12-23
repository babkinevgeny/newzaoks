let gulp = require('gulp'),
  scss = require('gulp-sass'),
  browserSync = require('browser-sync'),
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
  sitemap = require('gulp-sitemap');

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

gulp.task('css-libs', ['scss'], function() {
  return gulp.src('app/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['browser-sync', 'css-libs', 'pug'], function() {
  gulp.watch('app/scss/**/*.scss', ['scss']);
  gulp.watch('app/**/*.pug', ['pug']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('pug', function () {
  return gulp.src('app/pug/global/**/*.pug')
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest('app'))
});

gulp.task('clean', function() {
  return del.sync('dist');
});

gulp.task('sitemap', function () {
  gulp.src('app/**/*.html', {
          read: false
      })
      .pipe(sitemap({
          siteUrl: 'https://zaoks.ru',
          changefreq: 'daily',
          priority: function(siteUrl, loc, entry) {
            let splitedLoc = loc.split('/').slice(2).filter(elem => elem != '');
            let priority = 1;

            for (let i = 0; i < splitedLoc.length; i++) {

              if (i == 0) {
                continue
              } else {
                priority = priority - 0.2;
              }

            }
          
            priority = priority.toFixed(1);
            return priority;
          }

      }))
      .pipe(gulp.dest('app'));
});

// gulp.task('img', function() {
//   return gulp.src('app/img/**/*')
//     .pipe(cache(imagemin({
//
//       interlaced: true,
//       progressive: true,
//       svgoPlugins: [{
//         removeViewBox: false
//       }],
//       use: [pngquant()]
//     })) /**/ )
//     .pipe(gulp.dest('dist/img'));
// });

gulp.task('build', ['clean', 'scss', 'pug', 'sitemap'], function() {

  let buildCss = gulp.src('app/css/*.css')
    .pipe(gulp.dest('dist/css'))

  let buildImg = gulp.src('app/img/**/*')
    .pipe(gulp.dest('dist/img'))

  let buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

  let buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'))

  let buildLibs = gulp.src('app/libs/**/*')
    .pipe(gulp.dest('dist/libs'))

  let buildHtmlAbout = gulp.src('app/about/*.html')
    .pipe(gulp.dest('dist/about'));

  let buildHtmlMetalProducts = gulp.src('app/metal-products/*.html')
    .pipe(gulp.dest('dist/metal-products'));

  let buildHtmlMetalStructures = gulp.src('app/metal-structures/*.html')
    .pipe(gulp.dest('dist/metal-structures'));

  let buildHtmlMetalworking = gulp.src('app/metalworking/*.html')
    .pipe(gulp.dest('dist/metalworking'));

  let buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

  let buildDocs = gulp.src('app/docs/**/*')
    .pipe(gulp.dest('dist/docs'));

  let buildPhp = gulp.src('app/mail/**/*')
    .pipe(gulp.dest('dist/mail'));

  let buildMailPhp = gulp.src('app/mail.php')
    .pipe(gulp.dest('dist'));

  let buildHtaccess = gulp.src('.htaccess')
    .pipe(gulp.dest('dist'));

  let siteMap = gulp.src('app/sitemap.xml')
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

gulp.task('deploySite', function() {

  let conn = ftp.create({
    host: 'zaoks.ru',
    user: 'o92903x7_zaoks',
    password: 'JsU2RT6*',
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
