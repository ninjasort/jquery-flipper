describe('Flipper', function () {

    jasmine.getFixtures().fixturesPath = 'test/fixtures';
    var fixture;

    beforeEach(function () {
	loadFixtures('fixture.html');
	fixture = $('#myFlipper');
	fixture.flipper();
    });

    afterEach(function() {
	fixture.remove();
    });

    it('should be defined', function () {
	expect(fixture).toExist();
    });

    it("should have the correct class applied", function() {
	expect(fixture.hasClass('flipper-container')).toBeTruthy();
    });

});