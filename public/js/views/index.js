define('LocationListView', [
  'backbone',
  'jquery',
  'underscore',
  'FavoriteLocation',
  'LocationCollection',
  'LocationView'
], function(Backbone, $, _, FavoriteLocation, LocationCollection, LocationView) {
  var LocationListView = Backbone.View.extend({
    events: {
      'click .add-location': 'addLocation'
    },

    el: '#location-list',

    initialize: function() {
      this.locations = new LocationCollection();
      this.listenTo(this.locations, 'add', this.addOne);
      this.listenTo(this.locations, 'reset', this.render);
    },

    fetchData: function() {
      this.locations.fetch();
    },

    addLocation: function() {
      this.locations.add(new FavoriteLocation());
    },

    addOne: function(location) {
      var locationView = new LocationView({ model: location });
      this.$el.prepend(locationView.render().el);
    },

    render: function() {
      var that = this;

      // This logic *probably* belongs in a view, but I'd rather keep
      // collection-views out of the picture and just deal with individual
      // model-views.
      if (!this.locations.length) {
        this.$el.find('.empty-notice').hide().removeClass('hide').fadeIn();
      }

      _.each(this.locations, function(location) {
        that.addOne(location);
      });

      return this;
    }
  });

  return LocationListView;
});
