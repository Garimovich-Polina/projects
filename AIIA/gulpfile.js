const {src, dest, parallel, series, watch} = require('gulp');
const autoPrefixer = require('gulp-autoprefixer');
const sass = require ('gulp-sass') (require ('sass'));
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fs = require('fs');
const del = require('del');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const uglify = require('gulp-uglify-es').default;
const image = require('gulp-image');
const svgStore = require('gulp-svgstore');

const fonts = () => {
  src('./src/fonts/**.ttf')
  .pipe(ttf2woff())
  .pipe(dest('./app/fonts'))
  return src('./src/fonts/**.ttf')
  .pipe(ttf2woff2())
  .pipe(dest('./app/fonts'))
}

const checkWeight = (fontname) => {
  let weight = 400;
  switch (true) {
    case /Thin/.test(fontname):
      weight = 100;
      break;
    case /ExtraLight/.test(fontname):
      weight = 200;
      break;
    case /Light/.test(fontname):
      weight = 300;
      break;
    case /Regular/.test(fontname):
      weight = 400;
      break;
    case /Medium/.test(fontname):
    weight = 500;
    break;
    case /SemiBold/.test(fontname):
      weight = 600;
      break;
    case /Semi/.test(fontname):
      weight = 600;
      break;
    case /Bold/.test(fontname):
      weight = 700;
      break;
    case /ExtraBold/.test(fontname):
      weight = 800;
      break;
    case /Heavy/.test(fontname):
    weight = 700;
    break;
    case /Black/.test(fontname):
      weight = 900;
      break;
    default:
      weight = 400;
  }
  return weight;
}

const cb = () => {}

let srcFonts = './src/scss/_fonts.scss';
let appFonts = './app/fonts/';

const fontsStyle = (done) => {
	let file_content = fs.readFileSync(srcFonts);

	fs.writeFile(srcFonts, '', cb);
	fs.readdir(appFonts, function (err, items) {
		if (items) {
			let c_fontname;
			for (var i = 0; i < items.length; i++) {
				let fontname = items[i].split('.');
				fontname = fontname[0];
        let font = fontname.split('-')[0];
        let weight = checkWeight(fontname);

				if (c_fontname != fontname) {
					fs.appendFile(srcFonts, '@include font-face("' + font + '", "' + fontname + '", ' + weight +');\r\n', cb);
				}
				c_fontname = fontname;
			}
		}
	})

	done();
}

const svgSpriteStore = () => {
  return src('./src/img/sprite/**/*.svg')
  .pipe(svgStore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(dest('./app/img'))
}

const styles = () => {
  return src('./src/scss/main.scss')
  .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }
    ).on('error', notify.onError()))
    .pipe(autoprefixer({
      overrideBrowserlist: ["last 5 versions"],
      cascade: true,
      grid: true,
    }))
    .pipe(dest('./app/css/'))
    .pipe(cleanCSS({
      level: 2,
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css/'))
    .pipe(browserSync.stream());
}

const htmlInclude = () => {
  return src(['./src/*.html'])
  .pipe(fileinclude({
    prefix: '@',
    basepath: '@file'
  }))
  .pipe(dest('./app'))
  .pipe(browserSync.stream());
}

const images = () => {
  return src(['./src/img/**/*.jpg', './src/img/**/*.png', './src/img/**/*.jpeg', './src/img/**/*.webp', './src/img/**/*.svg', '!./src/img/sprite/*.svg'])
    .pipe(dest('./app/img'))
    .pipe(browserSync.stream());
}

const resources = () => {
  return src('./src/resources/**')
  .pipe(dest('./app'))
}

const clean = () => {
  return del(['app/*'])
}

const scripts = () => {
	return src('./src/js/main.js')
		.pipe(webpackStream({
			mode: 'development',
			output: {
				filename: 'main.js',
			},
			module: {
				rules: [{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}]
			},
		}))
  .on('error', function (err) {
    console.error('WEBPACK ERROR', err);
    this.emit('end');
  })
  .pipe(sourcemaps.init())
  .pipe(uglify().on("error", notify.onError()))
  .pipe(sourcemaps.write('.'))
  .pipe(dest('./app/js'))
  .pipe(browserSync.stream());
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./app"
    }
  });

  watch('./src/scss/**/*.scss', styles);
  watch('./src/html/*.html', htmlInclude);
  watch('./src/*.html', htmlInclude);
  watch('./src/img/**.{jpg,jpeg,png,svg,webp}', images);
  watch('./src/img/**.svg', svgSpriteStore);
  watch('./src/resources/**', resources);
  watch('./src/fonts/**.ttf', fonts);
  watch('./src/fonts/**.ttf', fontsStyle)
  watch('./src/js/**/*.js', scripts);
}

exports.styles = styles;
exports.watchFiles = watchFiles;
exports.fileinclude = htmlInclude;

exports.default = series(clean, parallel(htmlInclude, scripts, fonts, resources, images, svgSpriteStore), fontsStyle, styles, watchFiles);

const imagemin = () => {
  return src(['./src/img/**/*.jpg', './src/img/**/*.png', './src/img/**/*.jpeg'])
  .pipe(image({
    gifsicle: true
  }))
  .pipe(dest('./app/img/'))
}

const stylesBuild = () => {
  return src('./src/scss/**/*.scss')
  .pipe(sass({
    outputStyle: 'expanded'
  }
  ).on('error', notify.onError()))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(autoprefixer({
    cascade: false,
    overrideBrowserlist: ["last 5 versions"],
    gulp: true,
  }))
  .pipe(cleanCSS({
    level: 2,
  }))
  .pipe(dest('./app/css/'))
}

const scriptsBuild = () => {
	return src('./src/js/main.js')
		.pipe(webpackStream({
			mode: 'development',
			output: {
				filename: 'main.js',
			},
			module: {
				rules: [{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}]
			},
		}))
  .on('error', function (err) {
    console.error('WEBPACK ERROR', err);
    this.emit('end');
  })
  .pipe(uglify().on("error", notify.onError()))
  .pipe(dest('./app/js'))
}

exports.build = series(clean, parallel(htmlInclude, scriptsBuild, fonts, resources, images, svgSpriteStore), fontsStyle, stylesBuild, imagemin);
