var localHostname = 'localhost.com',
    siteShortname = 'skeletor',
    baseLayoutDir = "./",
		baseLayoutFile = "index.html",
    views = [baseLayoutFile, './r/**/*'],
    src = './Static/src',
    dist = './Static/dist',
    assets = './Static/assets'

module.exports = {

	base: {
		baseLayoutDir: baseLayoutDir,
		baseLayoutFile: baseLayoutFile
	},

	browserSync: {
		static : {
			server: {
				baseDir: './'
			},
			notify: true,
			ghostMode: false
		},
		dynamic: {
			proxy: localHostname,
			notify: true,
			ghostMode: false,
			open: false
		}
	},

	watch: {
		views : views
	},

	sass: {
		srcPath: src + '/scss',
		src: src + '/scss/main.scss',
		dest: dist + '/css',
		settings: {
			outputStyle: 'expanded',
			importer: require('node-sass-globbing'),
			includePaths:[].concat(
				require('bourbon').includePaths,
				'./node_modules/susy/sass',
				'./node_modules/breakpoint-sass/stylesheets'),
		}
	},

	sprites: {
		bitmapSrc: src + '/sprites/bitmaps/**/*.png',
		vectorSrc: src + '/sprites/vectors/**/*.svg',
		inlineSrc: src + '/sprites/inline/**/*.svg',
		dest: assets+'/spritesheets',

		spritesmith : {
			retinaSrcFilter: src+'/sprites/bitmaps/**/*@2x.png',
			imgName: 'bitmap.spritesheet.png',
			retinaImgName: 'bitmap.spritesheet@2x.png',
			imgPath: '../../assets/spritesheets/bitmap.spritesheet.png',
			retinaImgPath : '../../assets/spritesheets/bitmap.spritesheet@2x.png',
			cssName: '_sprites.scss'
		},

		svgSprite: {
			svg:{
				rootAttributes: {width: 0, height: 0, display: 'none'}
			},
			mode: {
				symbol: {
					dest: '.',
					sprite : 'vector.spritesheet.svg',
					example: {
						template: src + '/sprites/vector.example.html',
						dest: 'vector.example.html'
					}
				}
			}
		},

		inlineSvg: {
			template: src + '/sprites/inline.mustache'
		}
	},

	scripts: {
		baseName: siteShortname+'.main',
		srcPath: src+'/js',
		src: src+'/js/'+siteShortname+'.main.js',
		dest: dist+'/js',

		settings : {
			baseUrl: src+'/js',
			name: siteShortname+'.main',
			mainConfigFile: src+'/js/'+siteShortname+'.main.js',
			removeCombined: true,
			optimize: 'uglify2',
			wrapShim: true,
			preserveLicenseComments: false,
			uglify2: {
				compress: {
					drop_console : true,
					dead_code: true
				}
			},
			paths: {
				//Map all CDN paths to empty so optimizer doesn't try to include them
				jquery: "empty:",
			}
		}
	}
};
