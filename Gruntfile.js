'use strict';

/*global module:false*/
module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  var appConfig = {
    app: require('./bower.json').appPath || 'www'
  };
  var _ = require('lodash');
  var path = require('path');
  var cordova = require('cordova');
  var spawn = require('child_process').spawn;
  var process = require('child_process');
  // Project configuration.
  grunt.initConfig({
    yeoman: appConfig,
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        strict: true,
        globalstrict: true,
        globals: {
          jQuery: true,
          angular: true,
          console: true,
          $: true,
          _: true,
          moment: true,
          describe: true,
          beforeEach: true,
          module: true,
          inject: true,
          it: true,
          expect: true,
          browser: true,
          element: true,
          by: true,
          require: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function(connect) {
            return [
              connect().use(
                '/<%= yeoman.app %>/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9000,
          middleware: function(connect) {
            return [
              connect().use(
                '/<%= yeoman.app %>/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    protractor: {
      options: {
        configFile: 'protractor.conf.js'
      },
      chrome: {
        options: {
          args: {
            browser: 'chrome'
          }
        }
      }
    },
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: /\.\.\//
      }
    },
    replace: {
      devCordovaIndex: {
        src: [
          '<%= yeoman.app %>/index.html'
        ],
        overwrite: true,
        replacements: [{
          from: 'ngCordova/dist/ng-cordova.js',
          //TODO check me
          to: 'ng-cordova-mocks/dist/ngCordovaMocks.js'
        }]
      },
      devCordovaApp: {
        src: [
          '<%= yeoman.app %>/js/app.js'
        ],
        overwrite: true,
        replacements: [{
          from: 'ngCordova',
          to: 'ngCordovaMocks'
        }]
      },
      cleanCordovaApp: {
        src: [
          '<%= yeoman.app %>/js/app.js'
        ],
        overwrite: true,
        replacements: [{
          from: 'ngCordovaMocks',
          to: 'ngCordova'
        }]
      }
    },
    inlinelint: {
      html: ['<%= yeoman.app %>/tpl/*.html', '<%= yeoman.app %>/tpl/blocks/*.html', '<%= yeoman.app %>/index.html']
    },
    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['<%= yeoman.app %>/assets/**/*.css']
      }
    },
    less: {
      development: {
        options: {
          paths: ['<%= yeoman.app %>/css/less']
        },
        files: {
          '<%= yeoman.app %>/css/app.css': '<%= yeoman.app %>/css/less/app.less'
        }
      },
      production: {
        options: {
          paths: ["assets/css"],
          cleancss: true,
        },
        files: {
          "<%= yeoman.app %>/assets/css/app.css": "<%= yeoman.app %>/assets/css/less/app.less"
        }
      }
    },
    injector: {
      options: {

      },
      scripts: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/www/', '');
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= yeoman.app %>/index.html': [
            ['<%= yeoman.app %>/{app,components}/**/*.js',
              '!<%= yeoman.app %>/js/app.js',
              '!<%= yeoman.app %>/{app,components}/**/*.spec.js',
              '!<%= yeoman.app %>/{app,components}/**/*.mock.js'
            ]
          ],
        }
      }
    },
    copy: {
      app: {
        flatten: true,
        expand: true,
        src: 'platforms/android/ant-build/*.apk',
        dest: 'dist/'
      }
    },
    clean: {
      build: {
        src: ['dist']
      }
    },
    watch: {
      injectJS: {
        files: [
          '<%= yeoman.app %>/{app,components}/**/*.js',
          '!<%= yeoman.app %>/{app,components}/**/*.spec.js',
          '!<%= yeoman.app %>/{app,components}/**/*.mock.js',
          '!<%= yeoman.app %>/js/app.js'
        ],
        tasks: ['injector:scripts']
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      js: {
        files: ['<%= yeoman.app %>/js/**/*.js'],
        tasks: ['newer:jshint', 'karma'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      html: {
        files: ['<%= yeoman.app %>/js/**/*.html', '<%= yeoman.app %>/index.html'],
        tasks: ['newer:inlinelint'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.{png,jpg,jpeg,gif,webp,svg,html,css}'
        ]
      }
    }
  });
  // Register tasks for all Cordova commands
     _.functions(cordova).forEach(function (name) {
            name = (name === 'build') ? 'cordova:build' : name;
            grunt.registerTask(name, function () {
              this.args.unshift(name.replace('cordova:', ''));
              // Handle URL's being split up by Grunt because of `:` characters
              if (_.contains(this.args, 'http') || _.contains(this.args, 'https')) {
                this.args = this.args.slice(0, -2).concat(_.last(this.args, 2).join(':'));
              }
              var done = this.async();
              var cmd = path.resolve('./node_modules/cordova/bin', 'cordova');
              var child = spawn(cmd, this.args);
              child.stdout.on('data', function (data) {
                grunt.log.writeln(data);
              });
              child.stderr.on('data', function (data) {
                grunt.log.error(data);
              });
              child.on('close', function (code) {
                code = (name === 'cordova:build') ? true : code ? false : true;
                done(code);
              });
            });
          });
  grunt.registerTask('ripple', ['ripple-emulator']);
  grunt.registerTask('ripple-emulator', function() {
    grunt.config.set('watch', {
      all: {
        files: _.flatten(_.pluck(grunt.config.get('watch'), 'files')),
        tasks: ['prepare']
      }
    });

    var cmd = path.resolve('./node_modules/ripple-emulator/bin', 'ripple');
    var child = spawn(cmd, ['emulate']);
    child.stdout.on('data', function(data) {
      grunt.log.writeln(data);
    });
    child.stderr.on('data', function(data) {
      grunt.log.error(data);
    });
    process.on('exit', function(code) {
      child.kill('SIGINT');
      process.exit(code);
    });

    return grunt.task.run(['watch']);
  });
  
  // Default task.
  // grunt.registerTask('default', ['jshint', 'karma']);
  grunt.registerTask('serve', [
    'inlinelint',
    'less',
    'csslint',
    'jshint',
    'karma',
    'cordova:clean',
    'injector',
    'wiredep',
    'cordova:dev',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('test', function(target) {
    if (target === 'unit') {
      return grunt.task.run([
        'jshint',
        'karma'
      ]);
    } else if (target === 'e2e') {
      return grunt.task.run([
        'cordova:clean',
        'injector',
        'wiredep',
        'cordova:dev',
        'connect:test',
        'protractor'
      ]);
    } else {
      grunt.task.run([
        'test:unit',
        'test:e2e'
      ]);
    }
  });

  grunt.registerTask('cordova', function(target) {
    if (target === 'dev') {
      return grunt.task.run([
        'replace:devCordovaIndex',
        'replace:devCordovaApp'
      ]);
    } else if (target === 'clean') {
      grunt.task.run([
        'replace:cleanCordovaApp'
      ]);
    }
  });

};