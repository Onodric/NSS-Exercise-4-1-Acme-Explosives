module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['../javascripts/**/*.js'], //location of javascript files
      options: {
        predef: ["document", "console", "$", "XMLHttpRequest", "event", "alert" ], //allows for predefined things not found in js
        esnext: true, //allows for ES6 
        globalstrict: true,
        globals: {"getMyData":true} //name value pairs, allows to define global vars used in many files.
      }
    },
    sass: { //setup sass compilation
      dist: {
        files: {
          '../css/style.css': '../sass/main.scss'
        }
      }
    },
    watch: { //automatically watch for changes
      javascripts: {
        files: ['../javascripts/**/*.js'], 
        tasks: ['jshint']
      },
      sass: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'watch']);
};