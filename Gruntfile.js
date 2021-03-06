module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: './styles',
          src: ['*.scss'],
          dest: './public',
          ext: '.css'
        }],
        files: {
          './public/stylesheets/main.css': './styles/sass/main.scss',
        },
      },
    },
    watch: {
      scripts: {
        files: ['**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        },
      },
    },
  });
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-sass');

grunt.registerTask('default', ['sass']);
};

