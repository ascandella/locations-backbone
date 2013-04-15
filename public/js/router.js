define('FavoritesRouter', [
  'backbone',
  'LocationListView',
  'MapView'
], function(Backbone, LocationListView, MapView) {
  var Router = Backbone.Router.extend({
    routes: {
      ''          : 'defaultRoute',
      '*anything' : 'defaultRoute'
    },

    initialize: function () {
      this.locations = new LocationListView();
      this.mapView = new MapView();
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
