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
            outputStyle: 'expanded'
        },
        files: {
            'src/css/jquery.flipper.css': 'src/scss/jquery.flipper.scss',
            'dist/jquery.flipper.css': 'src/scss/jquery.flipper.scss'
        }
    }
};