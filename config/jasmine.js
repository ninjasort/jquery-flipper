module.exports = {
    tests: {
	src: 'src/*.js',
	options: {
	    keepRunner: true,
	    vendor: [
		'test/lib/jquery.js',
		'test/lib/jquery-ui.js'
	    ],
	    helpers: [
		'test/lib/jasmine-jquery.js'
	    ],
	    specs: 'test/*Spec.js'
	}
    }
};