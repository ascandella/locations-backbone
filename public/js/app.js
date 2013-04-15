define('FavoritesApp', [
  'backbone',
  'foundation',
  'jquery',
  'Router'
], function(Backbone, foundation, $, Router) {
  function FavoritesApp() {
    this.router = new Router();
    this.start = function() {
      Backbone.history.start();
      $(document).foundation();
    }
  }

  return FavoritesApp;
});
