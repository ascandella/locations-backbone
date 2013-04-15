define('FavoriteLocation', [
  'backbone',
  'underscore',
], function(Backbone, _) {
  var FavoriteLocation = Backbone.Model.extend({
    toJSON: function() {
      // Somewhat ghetto hack to work around Ruby's overly-trusting JSON parsing
      // situation.
      delete this.attributes.json_class;

      return this.attributes;
    },

    validate: function(attrs) {
      var latitude  = parseFloat(attrs.latitude, 10),
          longitude = parseFloat(attrs.longitude, 10);

      if (!latitude || !longitude) {
        return "must have both latitude and longitude";
      }

      if (Math.abs(latitude) > 90 || Math.abs(longitude) > 90) {
        return "must be between 0 and 90 degrees";
      }
    }
  });

  return FavoriteLocation;
});
