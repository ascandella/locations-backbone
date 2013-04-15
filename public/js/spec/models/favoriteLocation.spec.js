define([
  'mocha',
  'FavoriteLocation'
], function(mocha, FavoriteLocation) {
  describe('FavoriteLocation', function() {
    beforeEach(function() {
      this.location = new FavoriteLocation({
        name: 'Testing Location',
        id: 42,
        longitude: 42,
        latitude: 42
      });
    });

    describe('#toJSON', function() {
      it('strips json_class from the attributes', function() {
        expect(this.location.toJSON()['json_class']).to.be.undefined;
      });
    });

    describe('#validate', function() {
      it('is valid by default', function() {
        expect(this.location.validate()).to.be.true;
      });
    });
  });
});
