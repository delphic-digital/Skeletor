module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			css: {
				files: ['<%= pkg.config.paths.scss %>/**/*.scss'],
				tasks: ['sass']
			},
			sprites: {
				files: ['<%= pkg.config.paths.images %>/sprites/*'],
				tasks: ['sprite']
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed',
					require: ['sass-css-importer', 'sass-globbing', 'susy']
				},
				files: {
					'<%= pkg.config.paths.css %>/main.css': '<%= pkg.config.paths.scss %>/main.scss',
					'<%= pkg.config.paths.css %>/main-oldie.css': '<%= pkg.config.paths.scss %>/main-oldie.scss'
				}
			}
		},

		sprite:{
			all: {
				src: '<%= pkg.config.paths.images %>/sprites/*.png',
				dest: '<%= pkg.config.paths.images %>/spritesheet.png',
				destCss: '<%= pkg.config.paths.scss %>/partials/base/_sprites.scss'
			}
		},

		browserSync: {
			dev: {
				bsFiles: {
					src : [
						'<%= pkg.config.paths.css %>/**/*.css',
						'<%= pkg.config.paths.js %>/**/*.js',
						'<%= pkg.config.paths.html %>/**/*'
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

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('default', ['browserSync', 'watch']);
}