
module.exports = function(grunt) {

	grunt.initConfig({
		projectConfig: {
			baseTemplate: 'index.html',
			paths: {
				scss: 'scss',
				css: 'css',
				js: 'js'
			}
		},
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*\n * <%= pkg.name %> v<%= pkg.version %>\n * Build: <%= grunt.template.today("yyyymmddHHMM") %>\n * Author: <%= pkg.author %>\n */\n',
		watch: {
			options: {
				livereload: true,
			},
			scripts: {
				files: ['<%= projectConfig.paths.js %>/**/*.js'],
				options: {
					spawn: false,
				}
			},
			css: {
				files: ['<%= projectConfig.paths.scss %>/**/*.scss'],
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
					'<%= projectConfig.paths.css %>/main.min.css': '<%= projectConfig.paths.scss %>/main.scss',
					'<%= projectConfig.paths.css %>/main.min-oldie.css': '<%= projectConfig.paths.scss %>/main-oldie.scss'
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
					dead_code: true
				}
			},
			main: {
				files: {
					'<%= projectConfig.paths.js %>/main.min.js': [
						'<%= projectConfig.paths.js %>/vendor/onmediaquery.js',
						'<%= projectConfig.paths.js %>/vendor/LAB.js',
						'<%= projectConfig.paths.js %>/vendor/minified-src.js',
						'<%= projectConfig.paths.js %>/utilities/delphic.inject.js',
						'<%= projectConfig.paths.js %>/config.js',
						'<%= projectConfig.paths.js %>/main.js'
					]
				}
			},
			plugins: {
				files: [{
					expand: true,
					cwd: '<%= projectConfig.paths.js %>/plugins/',
					src: ['*.js', '!*.min.js'],
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
					cwd: '<%= projectConfig.paths.css %>/plugins/',
					src: ['*.css', '!*.min.css'],
					ext: '.min.css',
					extDot: 'last'
				}]
			}
		},

		replace: {
			dev: {
				src: ['<%= projectConfig.baseTemplate %>'],
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