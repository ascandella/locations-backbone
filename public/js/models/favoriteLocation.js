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
    }
  });

  return FavoriteLocation;
});
