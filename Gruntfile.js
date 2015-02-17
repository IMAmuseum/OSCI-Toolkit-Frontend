'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var theme = grunt.option('theme') || 'base';
    var osciConfig = {
        app: 'app/oscitk/themes/' + theme,
        dist: 'dist/themes/' + theme
    };

    grunt.initConfig({
        osci: osciConfig,
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            compass: {
                files: ['<%= osci.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                files: [
                    '<%= osci.app %>/*.html',
                    '{.tmp,<%= osci.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= osci.app %>}/views/{,*/}*.js',
                    '<%= osci.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    '<%= osci.app %>/templates/*.tpl.html',
                    'test/spec/**/*.js'
                ]
            },
            jst: {
                files: [
                    '<%= osci.app %>/templates/*.html'
                ],
                tasks: ['jst']
            }
        },
        clean: {
            dist: ['.tmp', '<%= osci.dist %>/*']
        },
        compass: {
            options: {
                sassDir: '<%= osci.app %>/styles',
                cssDir: '<%= osci.dist %>/styles',
                imagesDir: '<%= osci.app %>/images',
                javascriptsDir: '<%= osci.app %>/views',
                fontsDir: '<%= osci.app %>/styles/fonts',
                relativeAssets: true
            },
            dist: {}
        },
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/
        useminPrepare: {
            html: '<%= osci.app %>/index.html',
            options: {
                dest: '<%= osci.dist %>'
            }
        },
        usemin: {
            html: ['<%= osci.dist %>/{,*/}*.html'],
            css: ['<%= osci.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= osci.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= osci.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= osci.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= osci.dist %>/styles/main.css': [
                        '<%= osci.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/osci/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= osci.app %>',
                    src: '*.html',
                    dest: '<%= osci.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= osci.app %>',
                    dest: '<%= osci.dist %>',
                    src: [
                        '*.{ico,txt}',
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/{,*/}*.*'
                    ]
                }]
            }
        },
        jst: {
            compile: {
                files: {
                    '<%= osci.dist %>/scripts/templates.js': ['<%= osci.app %>/templates/*.html']
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= osci.dist %>/scripts/{,*/}*.js',
                        '<%= osci.dist %>/styles/{,*/}*.css',
                        '/styles/fonts/{,*/}*.*'
                    ]
                }
            }
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'jst',
        'compass:dist',
        'useminPrepare',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'usemin'
    ]);

    grunt.registerTask('final', [
        'clean:dist',
        'jst',
        'compass:dist',
        'useminPrepare',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'build',
        'watch'
    ]);
};
