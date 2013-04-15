define('FavoriteLocation', [
  'backbone',
  'underscore',
], function(Backbone, _) {
  var FavoriteLocation = Backbone.Model.extend({
    toJSON: function() {
      // Somewhat ghetto hack to work around Ruby's overly-trusting JSOn parsing
      // situation.
      delete this.attributes.json_class;

      return this.attributes;
    },

    validate: function() {
      var latitude  = parseFloat(this.get('latitude'), 10),
          longitude = parseFloat(this.get('longitude'), 10);

      if (!latitude || !longitude) {
        return false;
      }

      if (Math.abs(latitude) > 90 || Math.abs(longitude) > 90) {
        return false;
      }

      return true;
    }
  });

  return FavoriteLocation;
});
