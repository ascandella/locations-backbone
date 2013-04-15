define('Router', [
  'backbone',
  'LocationListView'
], function(Backbone, LocationListView) {
  var Router = Backbone.Router.extend({
    routes: {
      '' : 'defaultRoute'
    },

    initialize: function () {
      this.locations = new LocationListView();
    },

    defaultRoute: function() {
      this.locations.fetchData();
    }
  });

  return Router;
});
