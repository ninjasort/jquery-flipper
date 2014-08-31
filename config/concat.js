module.exports = {
  options: {
    stripBanners: true
  },
  dist: {
    src: ['src/jquery.<%= pkg.name %>.js'],
    dest: 'dist/jquery.<%= pkg.name %>.js'
  }
};