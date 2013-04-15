requirejs.config({
  shim: {
    'backbone'   : {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'foundation' : {
      deps: ['jquery']
    },
    'jquery'     : {
      exports: '$'
    },
    'underscore' : {
      exports: '_'
    }
  },

  paths: {
    'backbone'         : '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min',
    'foundation'       : 'foundation.min',
    'jquery'           : '//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min',
    'underscore'       : '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
    'FavoritesApp'     : 'app',
    'FavoriteLocation' : 'models/favoriteLocation',
    'FavoritesAppView' : 'views/appView'
  }
});

require(['FavoritesApp'], function(App) {
  new App().start();
});
