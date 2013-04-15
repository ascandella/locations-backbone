define('LocationListView', [
  'backbone',
  'jquery',
  'underscore',
  'LocationCollection',
  'LocationView'
], function(Backbone, $, _, LocationCollection, LocationView) {
  var LocationListView = Backbone.View.extend({
    el: '#location-list',

    initialize: function() {
      this.locations = new LocationCollection();
      this.listenTo(this.locations, 'add', this.addOne);
      this.listenTo(this.locations, 'reset', this.render);
    },

    fetchData: function() {
      this.locations.fetch();
    },

    addOne: function(location) {
      var locationView = new LocationView({ model: location });
      this.$el.append(locationView.render().el);
    },

    render: function() {
      var that = this;

      _.each(this.locations, function(location) {
        that.addOne(location);
      });

      return this;
    }
  });

  return LocationListView;
});
