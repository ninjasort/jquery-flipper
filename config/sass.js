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
	    'src/css/jquery.flipper.min.css': 'src/scss/jquery.flipper.scss',
	    'dist/jquery.flipper.min.css': 'src/scss/jquery.flipper.scss'
        }
    }
};