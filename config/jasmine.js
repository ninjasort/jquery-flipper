module.exports = {
    tests: {
        src: 'src/*.js',
        options: {
            vendor: [
                'bower_components/jquery/dist/jquery.js',
                'bower_components/jquery-ui/jquery-ui.js'
            ],
            helpers: [
                'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
            ],
            styles: 'src/css/jquery.flipper.min.css',
            specs: 'test/*.spec.js'
        }
    }
};