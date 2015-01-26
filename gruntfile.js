
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		banner: '/*\n * <%= pkg.name %> v<%= pkg.version %>\n * Build: <%= grunt.template.today("yyyymmddHHMM") %>\n * Author: <%= pkg.author %>\n */\n',

		watch: {
			options: {
				livereload: true,
			},
			scripts: {
				files: ['<%= pkg.config.paths.js %>/**/*.js'],
				options: {
					spawn: false,
				}
			},
			css: {
				files: ['<%= pkg.config.paths.scss %>/**/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false,
				}
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed',
					require: 'sass-globbing'
				},
				files: {
					'<%= pkg.config.paths.css %>/main.min.css': '<%= pkg.config.paths.scss %>/main.scss',
					'<%= pkg.config.paths.css %>/main.min-oldie.css': '<%= pkg.config.paths.scss %>/main-oldie.scss'
				}
			}
		},

		uglify: {
			options: {
				banner: '<%= banner %>',
				mangle: true,
				compress: {
					global_defs: {
					"DEBUG": false
				},
					dead_code: false
				}
			},
			main: {
				files: {
					'<%= pkg.config.paths.js %>/main.min.js': [
						'<%= pkg.config.paths.js %>/vendor/onmediaquery.js',
						'<%= pkg.config.paths.js %>/vendor/LAB.js',
						'<%= pkg.config.paths.js %>/utilities/delphic.inject.js',
						'<%= pkg.config.paths.js %>/config.js',
						'<%= pkg.config.paths.js %>/main.js'
					]
				}
			},
			plugins: {
				files: [{
					expand: true,
					cwd: '<%= pkg.config.paths.js %>/plugins/',
					src: ['*.js', '!*.min.js'],
					dest: '<%= pkg.config.paths.js %>/plugins/',
					ext: '.min.js',
					extDot: 'last'
				}]
			}
		},

		cssmin: {
			options: {
				banner: '<%= banner %>',
			},
			plugins: {
				files: [{
					expand: true,
					cwd: '<%= pkg.config.paths.css %>/plugins/',
					src: ['*.css', '!*.min.css'],
					dest: '<%= pkg.config.paths.css %>/plugins/',
					ext: '.min.css',
					extDot: 'last'
				}]
			}
		},

		replace: {
			dev: {
				src: ['<%= pkg.config.baseTemplate %>'],
				overwrite: true,
				replacements: [{
					from: /<(!|%)-- @START_PRODUCTION --(%?)>/g,
					to: "<$1-- @START_PRODUCTION --#$2>"
				},{
					from: /<(!|%)-- @START_DEBUG --#(%?)>/g,
					to: "<$1-- @START_DEBUG --$2>"
				}]
			},
			prod: {
				src: ['index.html'],
				overwrite: true,
				replacements: [{
						from: /<(!|%)-- @START_DEBUG --(%?)>/g,
						to: "<$1-- @START_DEBUG --#$2>"
					},{
						from: /<(!|%)-- @START_PRODUCTION --#(%?)>/g,
						to: "<$1-- @START_PRODUCTION --$2>"
				},{
						from: /\?v=\d+\.\d+\.\d+(\+)?(?:[a-z][a-z]*[0-9]+[a-z0-9]*)?/g,
						to: "?v=<%= pkg.version %>+build<%= grunt.template.today('yyyymmddHHMMss') %>"
				}]
			},
			version: {
				src: ['js/main.js'],
				overwrite: true,
				replacements: [{
						from: /DELPHIC.ver = '\d+\.\d+\.\d+(\+)?(?:[a-z][a-z]*[0-9]+[a-z0-9]*)?'/g,
						to: "DELPHIC.ver = '<%= pkg.version %>+build<%= grunt.template.today('yyyymmddHHMMss') %>'"
					}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');


	grunt.registerTask('dev', ['replace:dev']);
	grunt.registerTask('prod', ['replace:version', 'uglify:main', 'uglify:plugins', 'cssmin:plugins', 'replace:prod']);

	grunt.registerTask('default', 'dev');
};