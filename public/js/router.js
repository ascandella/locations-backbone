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
      this.locations.fetchData();
    }
  });

  return Router;
});
