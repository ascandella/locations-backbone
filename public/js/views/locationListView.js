define('LocationListView', [
  'backbone',
  'jquery',
  'underscore',
  'FavoriteLocation',
  'LocationCollection',
  'LocationView',
  'text!templates/locationList.html'
], function(Backbone, $, _, FavoriteLocation, LocationCollection,
            LocationView, template) {
  var LocationListView = Backbone.View.extend({
    el: '#location-list',

    events: {
      'click .add-location': 'addLocation'
    },

    initialize: function() {
      this.template  = _.template(template);

      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'remove', this.removeOne);
      this.listenTo(this.collection, 'reset', this.render);
    },

    fetchData: function() {
      this.collection.fetch();
    },

    addLocation: function() {
      this.collection.add(new FavoriteLocation());
    },

    addOne: function(location) {
      this.setup();

      this.$el.find('.no-locations').hide();

      var locationView = new LocationView({ model: location }),
          $newEntry = locationView.render().$el.hide();

      this.$el.prepend($newEntry);
      $newEntry.slideDown();
    },

    removeOne: function() {
      if (!this.collection.length) {
        this.$el.find('.no-locations').show();
      }
    },

    setup: function() {
      if (this._setup) {
        return;
      }

      this.$el.html(this.template({
        locations: this.collection
      }));

      this._setup = true;
    },

    render: function() {
      this.setup();
      var that = this;

      this.collection.each(function(location) {
        that.addOne(location);
      });

      return this;
    }
  });

  return LocationListView;
});
