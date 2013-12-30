// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

module.exports = function(grunt) {

    'use strict';

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({

        banner: '/*! <%%= grunt.template.today("yyyy-mm-dd, h:MM:ss TT") %> */\n',
        bower: grunt.file.readJSON('.bowerrc'),

        srcDir: 'src',
        buildDir: 'dist',
        cssDir: 'css',
        stylusDir: 'stylus',
        jsDir: 'js',
        imgDir: 'img',
        fontsDir: 'fonts',
        pagesDir: 'pages',
        vendorDir: 'vendor',
        cssName: 'main',
        bundleName: 'bundle',

        connect: {
            server: {
                options: {
                    hostname: '*',
                    port: grunt.option('port') || 9001,
                    base: ['<%%= buildDir %>/', '<%%= srcDir %>/'],
                    livereload: true
                }
            }
        },

        clean: {
            build: {src: '<%%= buildDir %>/'},
            css: {src: '<%%= copy.css.dest %>'},
            tmp: {src: '.tmp/'}
        },

        copy: {
            css: {
                expand: true,
                cwd: '<%%= srcDir %>/<%%= cssDir %>/',
                src: '{,*/}*',
                dest: '<%%= buildDir %>/<%%= cssDir %>/'
            },

            img: {
                expand: true,
                cwd: '<%%= srcDir %>/<%%= imgDir %>/',
                src: ['{,*/}*', '!sprites/{,*/}*'],
                dest: '<%%= buildDir %>/<%%= imgDir %>/'
            },

            fonts: {
                expand: true,
                cwd: '<%%= srcDir %>/<%%= fontsDir %>/',
                src: '{,*/}*',
                dest: '<%%= buildDir %>/<%%= fontsDir %>/'
            },

            js: {
                expand: true,
                cwd: '<%%= srcDir %>/<%%= jsDir %>/',
                src: '**/*.js',
                dest: '<%%= buildDir %>/<%%= jsDir %>/'
            }
        },

        ejs: {
            options: {
                debug: grunt.option('debug'),
                cssName: '<%%= cssName %>',
                bundleName: '<%%= bundleName %>'
            },
            dist: {
                expand: true,
                ext: '.html',
                flatten: true,
                src: ['<%%= srcDir %>/<%%= pagesDir %>/*.ejs'],
                dest: '<%%= buildDir %>/'
            }
        },

        stylus: {
            dist: {
                options: {
                    compress: false
                },
                files: {
                    '<%%= buildDir %>/<%%= cssDir %>/<%%= cssName %>.css': '<%%= srcDir %>/<%%= stylusDir %>/index.styl'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'ff 24', 'opera 12.1', 'ie 8', 'ie 9']
            },
            dist: {
                src: '<%%= buildDir %>/<%%= cssDir %>/<%%= cssName %>.css'
            }
        },

        csslint: {
            options: {
                'adjoining-classes': false,
                'box-model': false,
                'box-sizing': false,
                'compatible-vendor-prefixes': false,
                'font-sizes': false,
                'gradients': false,
                'important': false,
                'outline-none': false,
                'regex-selectors': false,
                'universal-selector': false,
                'unqualified-attributes': false,
                'bulletproof-font-face': false,
                'unique-headings': false
            },
            dist: {
                src: '<%%= buildDir %>/<%%= cssDir %>/<%%= cssName %>.css'
            }
        },

        cssmin: {
            options: {
                banner: '<%%= banner %>',
                report: 'min'
            }
        },

        uglify: {
            options: {
                report: 'min',
                banner: '<%%= banner %>'
            }
        },

        useminPrepare: {
            options: {
                dest: '<%%= buildDir %>'
            },
            html: '<%%= buildDir %>/index.html'
        },

        usemin: {
            html: '<%%= buildDir %>/*.html',
        },

        filerev: {
            options: {
                length: 4
            },
            dist: {
                src: [
                    '<%%= buildDir %>/<%%= cssDir %>/<%%= bundleName %>.css',
                    '<%%= buildDir %>/<%%= jsDir %>/<%%= bundleName %>.js'
                ]
            }
        },

        sprite: {
            dist: {
                src: '<%%= srcDir %>/<%%= imgDir %>/sprites/*.png',
                destImg: '<%%= buildDir %>/<%%= imgDir %>/sprite.png',
                destCSS: '<%%= srcDir %>/<%%= stylusDir %>/partials/sprites.styl',
                imgPath: '../<%%= imgDir %>/sprite.png',
                algorithm: 'binary-tree',
                engine: 'gm',
                padding: 5
            },
            hidpi: {
                src: '<%%= srcDir %>/<%%= imgDir %>/sprites/2x/*.png',
                destImg: '<%%= buildDir %>/<%%= imgDir %>/sprite_2x.png',
                destCSS: '<%%= srcDir %>/<%%= stylusDir %>/partials/sprites.styl',
                imgPath: '../<%%= imgDir %>/sprite_2x.png',
                algorithm: 'binary-tree',
                engine: 'gm',
                padding: 5
            }
        },

        imagemin: {
            options: {
                pngquant: true
            },
            dist: {
                expand: true,
                cwd: '<%%= buildDir %>/<%%= imgDir %>/',
                src: ['{,*/}*.{png,jpg,jpeg,gif}'],
                dest: '<%%= buildDir %>/<%%= imgDir %>/'
            }
        },

        compress: {
            main: {
                options: {
                    archive: '<%%= buildDir %>.zip'
                },
                src: '<%%= buildDir %>/**',
                dest: './'
            }
        },

        watch: {
            ejs: {
                files: ['<%%= srcDir %>/<%%= pagesDir %>/{,*/}*.ejs'],
                tasks: ['ejs']
            },

            stylus: {
                files: ['<%%= srcDir %>/<%%= stylusDir %>/**/*.styl'],
                tasks: ['stylus', 'autoprefixer']
            },

            sprite: {
                files: ['<%%= sprite.dist.src %>', '<%%= sprite.hidpi.src %>'],
                tasks: 'sprite'
            },

            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%%= buildDir %>/**',
                    '<%%= srcDir %>/<%%= cssDir %>/{,*/}*.css',
                    '<%%= srcDir %>/<%%= imgDir %>/**/*',
                    '<%%= srcDir %>/<%%= fontsDir %>/{,*/}*',
                    '<%%= srcDir %>/<%%= jsDir %>/**/*.js'
                ]
            }
        }

    });

    // Compile all files that should be compiled
    grunt.registerTask('build', [
        'clean:build',
        'ejs',
        'stylus', 'autoprefixer'
    ]);

    // Create non-minified project snapshot in build directory and compress it to zip
    grunt.registerTask('dist', [
        'build',
        'copy',
        'imagemin',
        'compress'
    ]);

    grunt.registerTask('serve', [
        'connect',
        'watch'
    ]);

    grunt.registerTask('lint', [
        'csslint'
    ]);

    // Minify all JS and CSS, optimize images, rev JS and CSS and replace paths in HTML
    grunt.registerTask('minify', [
        'build',
        'copy:css', 'copy:img', 'copy:fonts',
        'useminPrepare',
        'concat',
        'clean:css',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'imagemin',
        'clean:tmp'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
