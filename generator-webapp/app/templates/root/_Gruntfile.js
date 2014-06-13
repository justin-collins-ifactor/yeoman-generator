'use strict';

module.exports = function (grunt) {
	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Configurable paths for the application
	var appConfig = {
		dev: require('./bower.json').appPath || 'dev',
		prod: 'prod'
	};

	grunt.initConfig({
		yeoman: appConfig,

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			js: {
				files: ['<%= yeoman.dev %>/js/{,*/}*.js'],
				tasks: ['newer:jshint:all'],
				options: {
					livereload: '<%= connect.options.livereload %>'
				}
			},
			compass: {
				files: ['<%= yeoman.dev %>/sass/{,*/}*.{scss,sass}'],
				tasks: ['compass']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= yeoman.dev %>/{,*/}*.html',
					'<%= yeoman.dev %>/*.css',
					'<%= yeoman.dev %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35729
			},
			livereload: {
				options: {
					open: true,
					middleware: function (connect) {
						return [
							connect.static('.tmp'),
							connect().use(
								'/bower_components',
								connect.static('./bower_components')
							),
							connect.static(appConfig.dev)
						];
					}
				}
			},
			prod: {
				options: {
					open: true,
					base: '<%= yeoman.prod %>'
				}
			}
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: {
				src: [
					'Gruntfile.js',
					'<%= yeoman.dev %>/js/{,*/}*.js'
				]
			},
			test: {
				options: {
					jshintrc: './.jshintrc'
				},
				src: ['test/spec/{,*/}*.js']
			}
		},

		// Empties folders to start fresh
		clean: {
			prod: {
				files: [{
					dot: true,
					src: [

						'<%= yeoman.prod %>/{,*/}*',
						'!<%= yeoman.prod %>/.git*'
					]
				}]
			},
      		server: '.tmp'
		},

		// Automatically inject Bower components into the app
		wiredep: {
			dev: {
				src: ['<%= yeoman.dev %>/index.html'],
				ignorePath: new RegExp('^<%= yeoman.dev %>/|../'),
				fileTypes: {
					html: {
						replace: {
							js: '<script src="../{{filePath}}"></script>',
							css: '<link rel="stylesheet" href="../{{filePath}}" />'
						}
					}
				},
			}
		},

		// Compiles Sass to CSS and generates necessary files if requested
		compass: {
			prod:{
				options: {
					sassDir: '<%= yeoman.dev %>/sass',
					cssDir: '<%= yeoman.dev %>/css',
					raw: 'Sass::Script::Number.precision = 10\n'
				}
			},
			server: {
				options: {
					debugInfo: true
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '<%= yeoman.dev %>/index.html',
			options: {
				dest: '<%= yeoman.prod %>',
				mangle:false,
				flow: {
					html: {
						steps: {
							js: ['concat', 'uglifyjs'],
							css: ['cssmin']
						},
						post: {}
					}
				}
			}
		},

		// Performs rewrites based on filerev and the useminPrepare configuration
		usemin: {
			html: ['<%= yeoman.prod %>/{,*/}*.html'],
			css: ['<%= yeoman.prod %>/css/{,*/}*.css'],
			options: {
				assetsDirs: ['<%= yeoman.prod %>','<%= yeoman.prod %>/assets']
			}
		},
 
        uglify: {
            options: {
                report: 'min',
                mangle: false
            }
        },

		imagemin: {
			prod: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.dev %>/assets/images',
					src: '{,*/}*.{png,jpg,jpeg,gif}',
					dest: '<%= yeoman.prod %>/assets/images'
				}]
			}
		},

		svgmin: {
			prod: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.dev %>/assets/images',
					src: '{,*/}*.svg',
					dest: '<%= yeoman.prod %>/assets/images'
				}]
			}
		},

		htmlmin: {
			prod: {
				options: {
					collapseWhitespace: true,
					conservativeCollapse: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.prod %>',
					src: ['*.html', 'templates/{,*/}*.html'],
					dest: '<%= yeoman.prod %>'
				}]
			}
		},

		// ngmin tries to make the code safe for minification automatically by
		// using the Angular long form for dependency injection. It doesn't work on
		// things like resolve or inject so those have to be done manually.
		ngmin: {
			prod: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.dev %>/js',
					src: '*.js',
					dest: '<%= yeoman.prod %>/js'
				}]
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			prod: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.dev %>',
					dest: '<%= yeoman.prod %>',
					src: [
						'*.{ico,png,txt}',
						'*.html',
						'css/*.css',
						'templates/{,*/}*.html',
						'assets/{,*/}*.{webp}'
					]
				}, 
				{
					expand: true,
					cwd: '<%= yeoman.dev %>/assets/images',
					dest: '<%= yeoman.prod %>/assets/images',
					src: ['<%= yeoman.dev %>/assets/generated/*']
				}]
			}
		},

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			server: [
				'compass:server'
			],
			test: [
				'compass'
			],
			prod: [
				'compass',
				'imagemin',
				'svgmin'
			]
		}
	});

	grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
		if (target === 'prod') {
			//return grunt.task.run(['build', 'connect:prod:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'wiredep',
			'concurrent:server',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('test', [
	    'clean:server',
	    'wiredep',
		'concurrent:test',
	    'clean:server',
	]);

	grunt.registerTask('build', [
		'clean:prod',
		'wiredep',
		'compass',
		'useminPrepare',
		'concurrent:prod',
		'concat',
		'ngmin',
		'copy',
		'cssmin',
		'uglify',
		'usemin',
		'htmlmin',
    	'clean:server'
	]);

	grunt.registerTask('default', [
		'newer:jshint',
		'build'
	]);
};