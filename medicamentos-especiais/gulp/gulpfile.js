/**
 * ============= REQUIRE ===================
 */
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer')
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var gulpCopy      = require('gulp-copy');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
// otimizador de imagem
var smushit = require('gulp-smushit');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var imageminJpegtran = require('imagemin-jpegtran');
var imageminOptipng = require('imagemin-optipng');

// iconfont
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runTimestamp = Math.round(Date.now()/1000);

// font gen
var webfont = require('gulp-webfont');
/**
 * =========================================
 */

var webfont_config = {
  types:'eot,woff2,woff,ttf,svg',
  ligatures: true
};

gulp.task('webfont', function () {
return gulp.src('./font/*.otf')
  .pipe(webfont(webfont_config))
  .pipe(gulp.dest('../assets/fonts'));
});

// icon fonts
var fontName = 'icons';
gulp.task('iconfont', function() {
  gulp.src(['../assets/images/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      targetPath: '../../gulp/sass/_icons.scss',
      fontPath: '../fonts/'
    }))
    .pipe(iconfont({
      fontName: fontName,
      // Remove woff2 if you get an ext error on compile
      formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
      normalize: true,
      fontHeight: 1001
    }))
    .pipe(gulp.dest('../assets/fonts/'))
});


// otimiza imagens
gulp.task('imagemin', function () {
    return gulp.src('../assets/images/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [ pngquant(), imageminJpegtran(), imageminOptipng()]
        }))
        .pipe(gulp.dest('../assets/images'));
});

// smushit
gulp.task('smushit', function () {
    return gulp.src('../assets/images/**/*.{jpg,png}')
    .pipe(smushit({
      verbose: true
    }))
    .pipe(gulp.dest('../assets/images'));
});

// gulp.task('smushitu', function () {
//   return gulp.src('../../../uploads/2018/07/*.{jpg,png}')
//       .pipe(smushit({
//            verbose: true
//        }))
//       .pipe(gulp.dest('../../../uploads/2018/07'));
// });

  //  copia arquivos importantes
  var sourceFilesJs = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js.map',
    './node_modules/popper.js/dist/umd/popper.min.js',
    './node_modules/popper.js/dist/umd/popper.min.js.map',
    './node_modules/swiper/dist/js/swiper.min.js',
    // './node_modules/@fancyapps/dist/jquery.fancybox.min.js'
  ];
  var destinationJs = '../assets/js/';

  gulp.task('gulpCopy', function () {
      gulp.src(sourceFilesJs)
          .pipe(gulp.dest(destinationJs));
  });
//  /copia arquivos importantes

/**
 * ================= TASKS =================
 */

//SASS + CONCAT CSS+SASS
gulp.task('sass-general', function(){
  gulp.src([
    'sass/head-comments/comments.css',
    'node_modules/swiper/dist/css/swiper.css',
    // 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',
    'node_modules/bootstrap-select/dist/css/bootstrap-select.css',
    'node_modules/animate.css/animate.css',
    'none_modules/lity-2.4.0/dist/lity.css',
    'sass/main.sass'
    ])
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer('last 5 versions'))
  .pipe(concat('style.css'))
  .pipe(gulp.dest('../assets/css/'))
})

//SASS + CONCAT CSS+SASS ie9
gulp.task('sass-ie9', function(){
  gulp.src([
    'sass/ie9.sass'
    ])
  .pipe(plumber())
  .pipe(sass())
  //.pipe(autoprefixer('last 5 versions'))
  .pipe(concat('style-ie9.css'))
  .pipe(gulp.dest('../assets/css/'))
})

//CONCAT JS
gulp.task('concat-js',function(){

  var srcJs = [
        './node_modules/popper.js/dist/umd/popper.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/swiper/dist/js/swiper.js',
        './node_modules/jquery-mask-plugin/dist/jquery.mask.min.js',
        './node_modules/jquery-validation/dist/jquery.validate.min.js',
        // './node_modules/masonry-layout/dist/masonry.pkgd.js',
        // './node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
        './node_modules/bootstrap-select/dist/js/bootstrap-select.js',
        'node_modules/wow.js/dist/wow.js',
        // 'none_modules/lity-2.4.0/dist/lity.css',
        './js/scripts.js',
        // './js/new-functions.js'
    ]

  gulp.src(srcJs)
  .pipe(plumber())
  .pipe(uglify())
  .pipe(concat('scripts.min.js'))
  .pipe(gulp.dest('../assets/js'))
})

/**
 * =========================================
 */
 /**
  * ================ browserSync ================
  */
  gulp.task('browser-sync', function() {
    //watch files
    var files = [
      '../assets/js/*js',
      '../assets/css/*.css',
      '../**/*.php'
    ];

    //initialize browsersync
    browserSync.init(files, {
      //browsersync with a php server
      proxy: "qd-araujo-cdn.github.io.test/medicamentos-especiais",
      notify: false
    });
  });

/**
 * ================ WATCH ================
 */

gulp.task('watch', function(){
  gulp.watch('sass/*.sass', ['sass-general','sass-ie9']);
  gulp.watch('sass/head-comments/comments.css', ['sass-general','sass-ie9']);
  gulp.watch('sass/**/*.sass', ['sass-general','sass-ie9']);
  gulp.watch('js/*.js', ['concat-js']);
  gulp.watch('../assets/images/icons/*.svg',['iconfont'])
})

/**
 * =========================================
 */



/**
 * ================ DEFAULT ================
 */

// gulp.task('default', ['gulpCopy','sass-general','sass-ie9','concat-js','browser-sync','watch'])
gulp.task('default', ['gulpCopy','iconfont','sass-general','sass-ie9','concat-js','browser-sync','watch'])

/**
 * =========================================
 */
