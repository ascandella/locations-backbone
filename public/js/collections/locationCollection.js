define('LocationCollection', [
  'backbone',
  'FavoriteLocation'
], function(Backbone, FavoriteLocation) {
  var LocationCollection = Backbone.Collection.extend({
    model: FavoriteLocation,
    url: '/api/locations'

  });

  return LocationCollection;
});
