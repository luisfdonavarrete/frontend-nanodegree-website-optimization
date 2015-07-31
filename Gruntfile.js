var ngrok = require('ngrok');
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        pagespeed: {
            options: {
                nokey: true,
                locale: "en_GB",
                threshold: 40
            },
            local: {
                options: {
                    strategy: "desktop"
                }
            },
            mobile: {
                options: {
                    strategy: "mobile"
                }
            }
        },
        uglify: {
             my_target: {
                 files: {
                     'js/perfmatters.min.js': ['components/js/perfmatters.js']
                 }
             }
        },
        cssmin: {
            target: {
                files: {
                    'css/style.min.css': ['components/css/style.css'],
                    'css/print.min.css': ['components/css/print.css']
                }
            }
        },
        watch: {
            options: { 
                livereload: true
            },
            scripts: {
                files: ['components/js/*.js'],
                tasks: ['uglify', 'cssmin']
            },
            html: {
                files: ['*.html', 'components/css/*.css'],
                tasks: ['uglify', 'cssmin']
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,                  
                    cwd: 'components/img/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'img/'                  // Destination path prefix
                }]
            }
        },
        image_resize: {
            resize: {
                options: {
                    width: 115,
                    height: 75
                },
                files: {
                    'components/img/pizzeria-small.jpg': 'components/img/pizzeria.jpg'
                }
            }
        },
		critical: {
			test: {
				options: {
					base: './',
					css: [
						'components/css/style.css'
            		],
            		width: 320,
            		height: 70
        		},
        		src: 'index.html',
        		dest: 'index.html'
    		}
		}
    });
    
    // Register customer task for ngrok
    grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
        var done = this.async();
        var port = 8080;

        ngrok.connect(port, function(err, url) {
            if (err !== null) {
                grunt.fail.fatal(err);
                return done();
            } 
            grunt.config.set('pagespeed.options.url', url);
            grunt.task.run('pagespeed');
            done();
        });
    });
    
    grunt.loadNpmTasks('grunt-pagespeed');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-image-resize');
	grunt.loadNpmTasks('grunt-critical');

    // Default task(s).
    grunt.registerTask('default', 'watch');

};