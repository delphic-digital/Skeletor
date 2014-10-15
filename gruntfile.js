
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*\n * <%= pkg.name %> v<%= pkg.version %>\n * Build: <%= grunt.template.today("yyyymmddHHMM") %>\n * Author: <%= pkg.author %>\n */\n',
		bumpup: {
			options: {
				updateProps: {
				pkg: 'package.json'
				}
			},
			file: 'package.json'
		},

		watch: {
			options: {
				livereload: true,
			},
			scripts: {
				files: ['**/*.js'],
				options: {
					spawn: false,
				}
			},
			css: {
				files: ['**/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false,
				}
			}
		},
		sass: {
			dist: {
				options: {
					//style: 'compressed'
					sourcemap: true,
					require: 'sass-globbing'
				},
				files: {
					'css/main.css': 'sass/main.scss',
					'css/main-oldie.css': 'sass/main-oldie.scss'
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
					'js/main.min.js': [
						'js/vendor/onmediaquery.js', 
						'js/vendor/LAB.js',  
						'js/vendor/minified-src.js',
						'js/utilities/delphic.inject.js', 
						'js/config.js', 
						'js/main.js' 
					]
				}
			},
			plugins: {
				files: grunt.file.expandMapping(['js/plugins/*.js','!js/plugins/*.min.js'], 'js/plugins/', {
					rename: function(destBase, destPath) {
						return destPath.replace('.js', '.min.js');
					}
				})
			}
		},

		cssmin: {
			options: {
				banner: '<%= banner %>',
			},
			plugins: {
				files: grunt.file.expandMapping(['css/plugins/*.css','!css/plugins/*.min.css'], 'css/plugins/', {
					rename: function(destBase, destPath) {
						return destPath.replace('.css', '.min.css');
					}
				})
			}
		},

		replace: {
			dev: {
				src: ['index.html'],
				overwrite: true,
				replacements: [{
					from: /<(!|%)-- @START_PRODUCTION --(%?)>([\s\S]*?)<(!|%)-- @END_PRODUCTION --(%?)>/g,
					to: "<$1-- @START_PRODUCTION $3@END_PRODUCTION --$5>"
				},{
					from: /<(!|%)-- @START_DEBUG([\s\S]*?)@END_DEBUG --(%?)>/g,
					to: "<$1-- @START_DEBUG --$3> $2<$1-- @END_DEBUG --$3>"
				}]
			},
			prod: {
				src: ['index.html'],
				overwrite: true,        
				replacements: [{
						from: /<(!|%)-- @START_DEBUG --(%?)>([\s\S]*?)<(!|%)-- @END_DEBUG --(%?)>/g,
						to: "<$1-- @START_DEBUG $3@END_DEBUG --$5>"
					},{
						from: /<(!|%)-- @START_PRODUCTION([\s\S]*?)@END_PRODUCTION --(%?)>/g,
						to: "<$1-- @START_PRODUCTION --$3> $2<$1-- @END_PRODUCTION --$3>"
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
	grunt.loadNpmTasks('grunt-bumpup');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');


	grunt.registerTask('dev', ['replace:dev']);
	grunt.registerTask('prod', ['replace:version', 'uglify:main', 'uglify:plugins', 'cssmin:plugins', 'replace:prod']);

	grunt.registerTask('release', function (type) {
		type = type ? type : 'patch';
		grunt.task.run('bumpup:' + type);
		grunt.task.run('replace:prod'); 
	});

	grunt.registerTask('default', 'dev');
};

/*
X.Y.Z

1. Z is increasing if a release contains just a bug fix, dependencies update or some application internal changes, so no new functionality introduced to user;
2. Y is increasing if a release contains minor changes in UI or just introduces some new feature, or some feature redesign/functionality update which will affect user;
3. X is increasing if a release contains major UI/functionality update, for example: new interface design/layout;

New project starts with version 0.1 and minor version is increasing with development;
If a project contains all planned functionality for version 1.0 the version should be changed to 1.0.

*/