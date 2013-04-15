define('FavoriteLocation', [
  'backbone',
  'underscore',
  'googlemaps'
], function(Backbone, _, maps) {
  var FavoriteLocation = Backbone.Model.extend({
    getPoint: function() {
      return new google.maps.LatLng(this.get('latitude'), this.get('longitude'));
    },

    hasLocation: function() {
      return this.get('latitude') && this.get('longitude');
    },

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
        return 'must have both latitude and longitude';
      }

      if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
        return 'not a real place';
      }

      if (!attrs.name || /^\s+$/.test(attrs.name)) {
        return 'must provide a name';
      }
    }
  });

  return FavoriteLocation;
});
