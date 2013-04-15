define('Router', [
  'backbone',
  'LocationListView'
], function(Backbone, LocationListView) {
  var Router = Backbone.Router.extend({
    routes: {
      '' : 'defaultRoute'
    },

    initialize: function () {
      console.log("Init router");
      this.locations = new LocationListView();
    },

    defaultRoute: function() {
      console.log("Default route");
      this.locations.fetchData();
    }
  });

  return Router;
});
