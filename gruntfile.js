module.exports = function (grunt) {

	// Load plugins
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/* <%= pkg.name %> / <%= pkg.author %> / <%= grunt.template.today("yyyy-mm-dd") %> */\n',
		clean: {
			build: {
				src: ['images/svgmin']
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'images/svg',
					src: ['**/*.svg'],
					dest: 'images/svgmin',
					ext: '.min.svg'
				}]
			}
		},
		jshint: {
			all: ['Gruntfile.js', 'scripts/common.js'],
			options: {
				lastsemic: true,
				strict: false,
				unused: false,
				globals: {
					jQuery: true
				}
			}
		},
		sass: {
			dist: {
				files: {
					'css/global.css': 'css/master.scss'
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 9']
			},
			global: {
				src: 'css/global.css'
			}
		},
		cmq: {
			your_target: {
				files: {
					'css': ['css/global.css']
				}
			}
		},
		cssmin: {
			add_banner: {
				options: {
					banner: '<%= banner %>'
				},
				files: {
					'css/global.min.css': ['css/global.css']
				}
			}
		},
		concat: {
			options: {
				stripBanners: true,
				banner: '<%= banner %>'
			},
			all: {
				src: [
					'scripts/vendor/jquery.debouncedresize.js',
					'scripts/vendor/tappy-custom.js',
					'scripts/common.js'
				],
				dest: 'scripts/all.js'
			},
			head: {
				src: [
					'scripts/vendor/modernizr.latest.js'
			],
				dest: 'scripts/head.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>',
				warnings: false
			},
			build: {
				files: {
					'scripts/all.min.js': ['scripts/all.js'],
					'scripts/head.min.js': ['scripts/head.js']
				}
			}
		},
		watch: {
			css: {
				files: 'css/scss/*.scss',
				tasks: ['css']
			},
			js: {
				files: [
					'scripts/vendor/*.js',
					'scripts/common.js'],
				tasks: ['js']
			}
		}
	});

	// Development tasks
	grunt.registerTask('css', ['sass', 'autoprefixer', 'cmq', 'cssmin']);
	grunt.registerTask('js', ['concat', 'jshint', 'uglify']);

	// Deployment tasks
	grunt.registerTask('build', ['sass', 'autoprefixer', 'cmq', 'cssmin', 'concat', 'jshint', 'uglify']);

	// Manual tasks
	grunt.registerTask('svg', ['clean', 'svgmin']);
	
};