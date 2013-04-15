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
    'backbone'           : '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min',
    'foundation'         : 'foundation.min',
    'jquery'             : '//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min',
    'underscore'         : '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
    'text'               : '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.5/text',

    'FavoritesApp'       : 'app',
    'FavoriteLocation'   : 'models/favoriteLocation',
    'LocationListView'   : 'views/index',
    'LocationView'       : 'views/locationView',
    'LocationCollection' : 'collections/locationCollection'
  }
});

require(['FavoritesApp'], function(FavoritesApp) {
  new FavoritesApp().start();
});
