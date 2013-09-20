module.exports = function(grunt) {

  var pkg = grunt.file.readJSON('package.json');

  function createConcatOptions( ) {
    var options = {
                    options: {
                      banner: '/* VERSION: ' + pkg.version + ' */\n',
                      separator: ';'
                    },
                    module: {
                      src: ['src/' + pkg.name + '.js'],
                      dest: 'dist/' + pkg.name + '.js'
                    }
                  };

    grunt.file.recurse( 'src',
      function( abspath, rootdir, subdir, filename ) {
        if ( !subdir ) return;

        options[subdir] = {
          src: [rootdir + '/' + subdir + '/**/*.js'],
          dest: 'dist/' + pkg.name + '-' + subdir + '.js'
        }
    } );
    return options;
  };

  grunt.initConfig( {
    concat: createConcatOptions(  ),
    jshint: {
      files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint' ]);
  grunt.registerTask('default', [/*'jshint',*/ 'concat']);
};