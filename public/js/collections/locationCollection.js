define('LocationCollection', [
  'backbone',
  'FavoriteLocation'
], function(Backbone, FavoriteLocation) {
  var LocationCollection = Backbone.Collection.extend({
    model: FavoriteLocation,
    url: '/api/locations',

    initialize: function() {
      this.on('destroy', this.modelDestroyed);
    },

    modelDestroyed: function(model) {
      this.remove(model);
    }
  });

  return LocationCollection;
});
