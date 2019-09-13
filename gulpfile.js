let gulp         = require('gulp'),               // Подключаем Gulp

    autoprefixer = require('gulp-autoprefixer'),  // Подключаем autoprefixer для автоматического добавления префиксов
    browserSync  = require('browser-sync'),       // Подключаем Browser Sync
    cache        = require('gulp-cache'),         // Подключаем библиотеку кеширования
    cssnano      = require('gulp-cssnano'),       // Подключаем пакет для минификации CSS
    del          = require('del'),                // Подключаем плагин для удаления файлов и папок
    imagemin     = require('gulp-imagemin'),      // Подключаем плагин для сжатия изображений
    pngquant     = require('imagemin-pngquant'),  // Подключаем плагин для сжатия png
    prettify     = require('gulp-html-prettify'), // Подключаем плагин для форматирования отступов в HTML
    pug          = require('gulp-pug'),           // Подключаем Pug пакет
    rename       = require('gulp-rename'),        // Подключаем плагин для переименования файлов
    sass         = require('gulp-sass'),          // Подключаем Sass пакет
    svgmin       = require('gulp-svgmin'),        // Подключаем плагин для минификации SVG
    ttf2woff     = require('gulp-ttf2woff'),      // Подключаем конвертер шрифтов из ttf в woff
    ttf2woff2    = require('gulp-ttf2woff2'),     // Подключаем конвертер шрифтов из ttf в woff2
    uglify       = require('gulp-uglifyjs');      // Подключаем плагин для минификации JS



gulp.task('pug', function() {
    return gulp.src('app/pug/*.pug') // Берем источник
        .pipe(pug({pretty: true})) // Компилируем, запрещая минифицировать HTML
        .pipe(prettify({indent_char: ' ', indent_size: 2})) // Форматируем отступы в HTML
        .pipe(gulp.dest('dist/')) // Выгружаем результата в папку dist
        .pipe(browserSync.stream()); // Обновляем HTML на странице при изменении
});


gulp.task('sass', function(){
    return gulp.src('app/sass/style.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer('last 15 versions', { cascade: true })) // Создаем префиксы для последних 15 версий браузеров
        .pipe(gulp.dest('dist/css')) // Выгружаем результата в папку dist/css
        .pipe(browserSync.stream()); // Обновляем CSS на странице при изменении
});

gulp.task('min-css', ['sass'], function() {
    return gulp.src('app/sass/style.scss') // Выбираем файл для минификации
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('dist/css')); // Выгружаем в папку dist/css
});


gulp.task('js', function() {
    gulp.src('app/js/*.js') // Берем источник
        .pipe(gulp.dest('dist/js')) // Переносим скрипты в продакшен
        .pipe(browserSync.stream()); // Обновляем страницу при изменении
});


gulp.task('survive-libs', function(){
    gulp.src('app/libs/**/*.*')
        .pipe(gulp.dest('dist/libs'));
});


gulp.task('survive-fonts', function(){
    gulp.src(['app/fonts/*.{woff, woff2}']) // Берем источник
        .pipe(gulp.dest('dist/fonts/')) // Выгружаем результат в папку dist/fonts
        .pipe(browserSync.stream()); // Обновляем страницу при изменении
});


gulp.task('ttf-woff', function(){
    gulp.src(['app/fonts/*.ttf']) // Берем источник
        .pipe(ttf2woff()) // Конвертируем в woff
        .pipe(gulp.dest('dist/fonts/')) // Выгружаем результат в папку dist/fonts
        .pipe(browserSync.stream()); // Обновляем страницу при изменении
});


gulp.task('ttf-woff2', function(){
    gulp.src(['app/fonts/*.ttf']) // Берем источник
        .pipe(ttf2woff2()) // Конвертируем в woff2
        .pipe(gulp.dest('dist/fonts/')) // Выгружаем результат в папку dist/fonts
        .pipe(browserSync.stream()); // Обновляем страницу при изменении
});


gulp.task('min-img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});


gulp.task('survive-video', function () {
    return gulp.src('app/video/**/*') // Берем источник
        .pipe(gulp.dest('dist/video/')); // Выгружаем результат в папку dist/video
});


gulp.task('survive-svg', function () {
    return gulp.src('app/svg/*.svg') // Берем источник
        .pipe(gulp.dest('dist/svg/')); // Выгружаем результат в папку dist/svg
});


gulp.task('clear-cache', function () {
    return cache.clearAll(); // Очищаем кэш
});


gulp.task('clean-dist', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});


gulp.task('browser-sync', function() {
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'dist' // Директория для сервера - dist
        },
        notify: false // Отключаем уведомления
    });
});






gulp.task('watch', ['browser-sync', 'pug', 'min-css', 'js', 'survive-libs', 'survive-video', 'survive-svg'], function() {
    gulp.watch('app/pug/**/*.pug', ['pug']); // Наблюдение за pug файлами в папке app/pug
    gulp.watch('app/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке app/sass
    gulp.watch('app/js/*.js', ['js']); // Наблюдение за JS файлами
    gulp.watch('app/fonts/*.ttf', ['ttf-woff', 'ttf-woff2']); // Наблюдение за папкой app/fonts
    gulp.watch('app/img/*.{jpg, png, gif}'); // Наблюдение за папкой app/img
    gulp.watch('app/svg/*.svg', ['survive-svg']); // Наблюдение за папкой app/svg
});


gulp.task('build', ['clear-cache', 'clean-dist', 'pug', 'min-css', 'js', 'survive-libs', 'min-img', 'survive-svg', 'survive-fonts', 'ttf-woff', 'ttf-woff2', 'survive-video'], function() {});