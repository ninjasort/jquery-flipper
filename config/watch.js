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
    tasks: ['sass', 'autoprefixer', 'cssmin']
  },
  test: {
    files: 'test/*.spec.js',
    tasks: ['jasmine']
  }
};