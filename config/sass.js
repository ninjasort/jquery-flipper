module.exports = {
    options: {
        includePaths: require('node-bourbon').includePaths,
        quiet: true
    },
    demo: {
        files: {
            'demo/demo.css': 'src/scss/demo.scss'
        }
    },
    flipper: {
        options: {
            outputStyle: 'compressed'
        },
        files: {
            'src/css/flipper.min.css': 'src/scss/flipper.scss',
            'dist/flipper.min.css': 'src/scss/flipper.scss'
        }
    }
};