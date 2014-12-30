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
    tasks: ['jshint:src', 'jasmine']
  },
  sass: {
    files: 'src/scss/**/*.scss',
    tasks: ['sass']
  },
  test: {
    files: 'test/*Spec.js',
    tasks: ['jasmine']
  }
};