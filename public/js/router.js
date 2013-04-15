define('Router', [
  'backbone'
], function(Backbone) {
  var Router = Backbone.Router.extend({
    routes: {
      '' : 'defaultRoute'
    },

    initialize: function () {
      console.log("Init router");
    },

    defaultRoute: function() {
      console.log("Default route");
    }
  });

  return Router;
});
