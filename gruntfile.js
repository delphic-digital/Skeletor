module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			css: {
				files: ['Static/src/scss/**/*.scss'],
				tasks: ['sass']
			},
			sprites: {
				files: ['Static/src/sprites/*'],
				tasks: ['sprite']
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed',
					loadPath: require('node-bourbon').includePaths,
					require: ['sass-css-importer', 'sass-globbing', 'susy']
				},
				files: {
					'Static/dist/css/main.css': 'Static/src/scss/main.scss',
					'Static/dist/css/oldie.css': 'Static/src/scss/oldie.scss'
				}
			}
		},

		sprite:{
			all: {
				src: 'Static/src/sprites/*.png',
				dest: 'Static/dist/spritesheet.png',
				destCss: 'Static/src/scss/partials/base/_sprites.scss'
			}
		},

		requirejs: {
			compile: {
				options: {
					baseUrl: 'Website/js/src',
					mainConfigFile: 'Website/js/src/1919kitchenandtap.main.js',
					dir: 'Website/js/build',
					removeCombined: true,
					//fileExclusionRegExp: /lib/,
					//optimize: 'none',
					paths: {
						jquery: "empty:",
						TweenMax: "empty:",
						TimelineMax: "empty:",
						ScrollMagic: "empty:",
						"ScrollMagic.gsap": "empty:",
						moment: "empty:",
						sha1: "empty:",
						oauth: "empty:",
						scrollTo: "empty:"
					},
					modules: [
						// First set up the common build layer.
						{
							// module names are relative to baseUrl
							name: 'skeletor.main'
						},
						// Now set up a build layer for each main layer, but exclude
						// the common one. If you're excluding a module, the excludee
						// must appear before the excluder in this file. Otherwise it will
						// get confused.
						{
							name: 'components/mobile',
							exclude: ['skeletor.main']
						}
					]
				}
			}
		},

		browserSync: {
			dev: {
				bsFiles: {
					src : [
						'Static/dist/css/**/*.css',
						'Static/src/js/**/*.js',
						'index.html'
					]
				},
				options: {
					//proxy: "localhost",
					watchTask: true,
					server: "./"

				}
			}
		}

	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['browserSync', 'watch']);
}