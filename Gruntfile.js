module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/vendor/*.js'],
        dest: 'js/vendor.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        compress: {
          drop_console: true
        }
      },
      dist: {
        files: {
          'js/main.min.js': ['js/main.js'],
          'js/vendor.min.js': ['js/vendor.js']
        }
      }
    },
    jshint: {
      files: ['js/main.js'],
      options: {
          bitwise: false,
          browser: true,
          curly: true,
          eqeqeq: true,
          es3: true, /* Assume site must work in IE6/7/8. */
          forin: true,
          globals: { /* Require and Jasmine's Globals. Note that $ is not permitted. */
              'requirejs': false, /* Require */
              'require': false,
              'define': false,
              'describe': false, /* Jasmine */
              'xdescribe': false,
              'it': false,
              'xit': false,
              'beforeEach': false,
              'afterEach': false,
              'jasmine': false,
              'spyOn': false,
              'expect': false,
              'waitsFor': false
          },
          immed: true,
          jquery: true,
          latedef: true,
          maxdepth: 2,
          multistr: true,
          newcap: true,
          noarg: true,
          noempty: false,
          onevar: true,
          plusplus: false,
          quotmark: true, /* Use backslashes if they\'re needed. */
          regexp: false,
          regexdash: true,
          strict: true, /* Use one 'use strict'; per file. */
          trailing: true, /* Turn 'show whitespace' on in your editor. */
          undef: true,
          unused: true
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'css/main.css': 'scss/main.scss'
        }
      }
    },
    watch: {
      files: ['scss/**/*.scss', 'js/*.js', '!js/*.min.js'],
      tasks: ['sass:dist', 'uglify:dist']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['concat', 'sass']);
};