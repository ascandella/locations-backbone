define('LocationListView', [
  'backbone',
  'jquery',
  'underscore',
  'LocationCollection'
], function(Backbone, $, _, LocationCollection) {
  var LocationListView = Backbone.View.extend({
    initialize: function() {
      this.locations = new LocationCollection();
      this.listenTo(this.locations, 'change', this.render());
    },

    fetchData: function() {
      this.locations.fetch();
    },

    render: function() {

    }
  });

  return LocationListView;
});
