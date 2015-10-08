module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			css: {
				files: ['Static/src/scss/**/*.scss'],
				tasks: ['sass']
			},
			sprites: {
				files: ['Static/src/sprite/*'],
				tasks: ['sprite']
			}/*,
			hologram: {
				files: [
					'Static/dist/css/main.css',
					'Static/src/styleguide/Cortana/'
				],
				tasks: ['hologram']
			}*/
		},

		sass: {
			dist: {
				options: {
					style: 'expanded',
					loadPath: require('node-bourbon').includePaths,
					require: ['sass-css-importer', 'sass-globbing', 'susy', 'breakpoint']
				},
				files: {
					'Static/dist/css/main.css': 'Static/src/scss/main.scss',
					'Static/dist/css/oldie.css': 'Static/src/scss/oldie.scss'
				}
			}
		},

		sprite:{
			all: {
				src: 'Static/src/sprite/*.png',
				dest: 'Static/assets/images/spritesheet.png',
				destCss: 'Static/src/scss/partials/base/_sprites.scss',
				imgPath: '../../assets/images/spritesheet.png'
			}
		},

		requirejs: {
			compile: {
				options: {
					baseUrl: 'Static/src/js',
					dir: 'Static/dist/js',
					removeCombined: true,
					//optimize: 'none',
					paths: {
						//Map all CDN paths to empty so optimizer doesn't try to include them
						jquery: "empty:",
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
						},
						{
							name: 'components/slider',
							exclude: ['skeletor.main']
						}
					]
				}
			}
		},

		replace: {
			build: {
				src: ['index.html'],
				overwrite: true,
				replacements: [{
					from: "/Static/src/js/",
					to: "/Static/dist/js/"
				}]
			},
			dev: {
				src: ['index.html'],
				overwrite: true,
				replacements: [{
					from: "/Static/dist/js/",
					to: "/Static/src/js/"
				}]
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
		},
		hologram: {
		  generate: {
        options: {
          config: 'hologram_config.yml'
        }
      }
		}

	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('dev', ['replace:dev','browserSync', 'watch']);
	grunt.registerTask('build', ['requirejs','replace:build']);

	grunt.registerTask('default', 'dev');
}