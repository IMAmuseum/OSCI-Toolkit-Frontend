module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			name: 'OSCI Toolkit',
			version: '0.1.0',
			author: 'The Art Institute of Chicago and the Indianapolis Museum of Art',
			banner: '/*\n' +
				' * <%= meta.name %> - v<%= meta.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
				' * http://oscitoolkit.org/\n' +
				' * Copyright (c) 2010-<%= grunt.template.today("yyyy") %> <%= meta.author %>\n' +
				' * GNU General Public License\n' +
				' */'
		},
		lint: {
			files: ['grunt.js', 'js/oscitk/**/*.js', 'js/appBootstrap.js']
		},
		concat: {
			dist: {
				src: [
					'<banner:meta.banner>',
					'js/oscitk/OsciTk.js',
					'js/oscitk/helper.js',
					'js/oscitk/Router.js',
					'js/oscitk/TemplateManager.js',
					'js/oscitk/collections/BaseCollection.js',
					'js/oscitk/models/BaseModel.js',
					'js/oscitk/views/BaseView.js',
					'js/oscitk/templates/CompiledTemplates.js',
					'js/oscitk/models/**/*.js',
					'js/oscitk/collections/**/*.js',
					'js/oscitk/views/PageView.js',
					'js/oscitk/views/SectionView.js',
					'js/oscitk/views/MultiColumnFigureView.js',
					'js/oscitk/views/**/*.js',
					'js/oscitk/osci_tk_layered_image.js',
					'js/appBootstrap.js',
					'js/oscitk/zotero.js'
				],
				dest: 'dist/js/OSCI-Toolkit-<%= meta.version %>.js'
			},
			dependencies: {
				src: [
					'js/external/json2.js',
					'js/external/jquery-1.7.1.js',
					'js/external/underscore-1.4.3.js',
					'js/external/backbone.js',
					'js/external/backbone-super.js',
					'js/external/jquery.qtip.js',
					'js/external/fancybox/jquery.fancybox.js',
					'js/external/polymaps.min.js',
					'js/external/jquery-ui-1.8.23.custom.min.js'
				],
				dest: 'dist/js/OSCI-Toolkit-<%= meta.version %>-dependencies.js'
			},
			css: {
				src: [
					'<banner:meta.banner>',
					'css/common.css',
					'css/toolbar.css',
					'css/section.css',
					'css/multiColumnSection.css',
					'css/search.css',
					'css/navigation.css',
					'css/notes.css',
					'css/layered_image.css',
					'css/citation.css',
					'css/themeNight.css',
					'css/themeSepia.css'
				],
				dest: 'dist/css/OSCI-Toolkit-<%= meta.version %>.css'
			},
			css_dependencies: {
				src: [
					'<banner:meta.banner>',
					'js/external/fancybox/jquery.fancybox.css',
					'js/external/jquery-ui.custom.css',
					'js/external/jquery.qtip.css'
				],
				dest: 'dist/css/OSCI-Toolkit-<%= meta.version %>-dependencies.css'
			}
		},
		min: {
			dist: {
				src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
				dest: 'dist/js/OSCI-Toolkit-<%= meta.version %>.min.js'
			},
			dependencies: {
				src: ['<banner:meta.banner>', '<config:concat.dependencies.dest>'],
				dest: 'dist/js/OSCI-Toolkit-<%= meta.version %>-dependencies.min.js'
			}
		},
		cssmin: {
			dist: {
				src: ['<banner:meta.banner>', '<config:concat.css.dest>'],
				dest: 'dist/css/OSCI-Toolkit-<%= meta.version %>.min.css'
			},
			css_dependencies: {
				src: ['<banner:meta.banner>', '<config:concat.css_dependencies.dest>'],
				dest: 'dist/css/OSCI-Toolkit-<%= meta.version %>-dependencies.min.css'
			}
		},
		copy: {
			dist: {
				files: {
					'dist/img/': 'img/*'
				}
			}
		},
		compress: {
			zip: {
				files: {
					'dist/osci_toolkit.zip': [
						'dist/css/*',
						'dist/js/*',
						'dist/img/*'
					]
				},
				options: {
					rootDir: 'osci_toolkit'
				}
			}
		},
		watch: {
			files: '<config:lint.files>',
			tasks: 'concat min'
		},
		precompileTemplates: {
			dist : {
				src: ['js/oscitk/templates/*.tpl.html'],
				dest: 'js/oscitk/templates/CompiledTemplates.js'
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: false,
				boss: true,
				eqnull: true,
				browser: true
			},
			globals: {
				jQuery: true
			}
		},
		uglify: {}
	});

	//MultiTask for Compiling Underscore templates into a single file
	grunt.registerMultiTask('precompileTemplates', 'Precompile Underscore templates', function() {
		var files = grunt.file.expandFiles(this.file.src);

		var src = grunt.helper('precompileTemplates', files);
		grunt.file.write(this.file.dest, src);

		if (this.errorCount) { return false; }

		grunt.log.writeln('File "' + this.file.dest + '" created.');
	});

	//Helper for compiligin Underscore templates
	grunt.registerHelper('precompileTemplates', function(files) {
		var output = '';

		if (files) {
			output += files.map(function(filepath) {
				var templateHtml = grunt.task.directive(filepath, grunt.file.read),
					templateSrc = grunt.utils._.template(templateHtml).source,
					fileParts = filepath.split("\/"),
					fileName = fileParts[fileParts.length - 1];

				return "OsciTk.templates['" + fileName.substr(0,fileName.indexOf('.tpl.html')) + "'] = " + templateSrc;
			}).join('\n');
		}

		return output;
	});

	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');

	// Default task.
	grunt.registerTask('default', 'precompileTemplates concat min cssmin copy compress');

};
