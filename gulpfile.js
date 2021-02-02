let sourceFolder = "src"; // название папки где идет разработка
let projectFolder = "dist"; // название папки куда выгружает весь готовый проект 

// путь в готовый проект
let path = {
  build: {
    html: projectFolder + "/",
    css: projectFolder + "/css/",
    js: projectFolder + "/js/",
    img: projectFolder + "/img/",
    icons: projectFolder + "/icons",
    fonts: projectFolder + "/fonts/",
  },

  // путь для разработки
  src: {
    html: [sourceFolder + "/html/**/*.html", "!" + sourceFolder + "/html/**/_*.html"],
    css: sourceFolder + "/scss/style.scss",
    js: sourceFolder + "/js/script.js",
    img: sourceFolder + "/img/**/*.{jpg, png, svg, gif, ico, webp}",
    icons: sourceFolder + "/icons/**/*.{svg, png}",
    fonts: sourceFolder + "/fonts/*.ttf",
  },

  // следим
  watch: {
    html: sourceFolder + "/html/*.html", 
    _html: sourceFolder + "/html/**/_*.html",
    css: sourceFolder + "/scss/**/*.scss",
    js: sourceFolder + "/js/**/*.js",
    img: sourceFolder + "/img/**/*.{jpg, png, svg, gif, ico, webp}",
    icons: sourceFolder + "/icons/**/*.{svg, png}",
  },

  clean: "./" + projectFolder + "/", // удаляем папку
};

let { src, dest } = require("gulp"),
  gulp = require("gulp"),// Сам галп
  browser_sync = require("browser-sync").create(), // Синхронизация с браузером автоматическое обновление после изменения в файлах src
  fileinclude = require("gulp-file-include"), // путь пример подключения @@include('./view.html')
  del = require("del"), 
  scss = require("gulp-sass"), // Препроцессор sass для css
  autoprefixer = require("gulp-autoprefixer"), //<--
  group_media = require("gulp-group-css-media-queries"), // @media автоматически собираются и вставляются в дно файла
  clean_css = require("gulp-clean-css"), // сжиматель css
  rename = require("gulp-rename"), //<--
  uglify = require("gulp-uglify-es").default, // сжиматель js
  imagemin = require("gulp-imagemin"), // сжимаетль картинок
  webp = require("gulp-webp"), // сэиматель и преобразования картинки .webp
  webp_html = require("gulp-webp-html"); // автоматически подставляет тэг <pictures></pictures> для браузеров новых будут загружатся картинки с расширением .webp для браузеров старых .jpg и тд


// синхронизация с браузером
function browserSync(params) {
  browser_sync.init({
    server: {
      baseDir: "./" + projectFolder + "/"
    },

    port: 3000,
    notify: false
  });
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(webp_html())
    .pipe(dest(path.build.html))
    .pipe(browser_sync.stream());
}

function css() {
  return src(path.src.css)
    .pipe(scss({
      outputStyle: "expanded"
    }))
    .pipe(group_media())
    .pipe(autoprefixer({
      overrideBrowserslist: 'last 5 versions',
      cascade: true
    }))
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(dest(path.build.css))
    .pipe(browser_sync.stream());
}

function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({
      extname: ".min.js"
    }))
    .pipe(dest(path.build.js))
    .pipe(browser_sync.stream());
}

function images() {
  return src(path.src.img)
    .pipe(webp({
       quality: 70 // Сжимает картинку формата webp от 0 до 100 где 100 без жатия 0 макс сжатие
    }))
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false}],
      interlaced: true,
      optimizationLevel: 3// Сжимает картинки 0 - без сжатия 7 - максимальное сжатие от 0 до 7
    }))
    .pipe(dest(path.build.img))
    .pipe(browser_sync.stream());
}

function icons() {
  return src(path.src.icons)
      .pipe(dest(path.build.icons))
      .pipe(browser_sync.stream());
}

// следим за файлами
function watchFile(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch._html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
  gulp.watch([path.watch.icons], icons);
}

// чистим путь
function clean() {
  return del(path.clean);
}


let build = gulp.series(clean, gulp.parallel(js, css, html, images, icons));

// выполняем слежку
let watch = gulp.parallel(build, watchFile, browserSync);

exports.icons = icons;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html; 
exports.build = build;
exports.watch = watch;
exports.default = watch;

