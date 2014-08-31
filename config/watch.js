module.exports = {
  options: {
    livereload: true
  },
  gruntfile: {
    files: '<%= jshint.gruntfile.src %>',
    tasks: ['jshint:gruntfile']
  },
  src: {
    files: '<%= jshint.src.src %>',
    tasks: ['jshint:src', 'karma']
  },
  sass: {
    files: 'src/scss/**/*.scss',
    tasks: ['sass']
  },
  test: {
    files: '<%= jshint.test.src %>',
    tasks: ['jshint:test', 'karma']
  }
};