define([
  'googlemaps',
  'jquery'
], function(maps, $) {
  describe('createMap', function() {
    it('returns a map', function() {
      // Sanity check
      expect(maps.createMap($('#test-map'))).to.be.ok;
    });
  });
});
