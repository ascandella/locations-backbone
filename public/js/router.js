define('FavoritesRouter', [
  'backbone',
  'LocationListView',
  'LocationCollection',
  'MapView'
], function(Backbone, LocationListView, LocationCollection, MapView) {
  var Router = Backbone.Router.extend({
    routes: {
      ''          : 'defaultRoute',
      '*anything' : 'defaultRoute'
    },

    initialize: function () {
      this.collection = new LocationCollection();
      this.locations = new LocationListView({ collection: this.collection });

      this.mapView = new MapView({ collection: this.collection });
      this.mapView.render();
    },

    defaultRoute: function() {
      // Render an before fetching data to have actionable buttons
      this.locations.render();
      this.locations.fetchData();
    }
  });

  return Router;
});
