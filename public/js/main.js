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
    'mocha'      : {
      init: function() {
        this.mocha.setup('bdd');
        return this.mocha;
      }
    },
    'underscore' : {
      exports: '_'
    }
  },

  paths: {
    'async'              : '//cdnjs.cloudflare.com/ajax/libs/async/1.22/async.min',
    'backbone'           : '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min',
    'foundation'         : 'foundation.min',
    'googlemaps'         : 'support/googlemaps',
    'jquery'             : '//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min',
    'underscore'         : '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
    'text'               : '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.5/text',

    'FavoritesApp'       : 'app',
    'FavoritesRouter'    : 'router',
    'FavoriteLocation'   : 'models/favoriteLocation',
    'LocationListView'   : 'views/index',
    'LocationView'       : 'views/locationView',
    'LocationCollection' : 'collections/locationCollection',
    'MapView'            : 'views/mapView',

    'mocha'              : 'spec/mocha',
    'chai'               : 'spec/chai',
    'SpecRunner'         : 'spec/specRunner'
  }
});

if (!window._mochaSpecMode) {
  require(['FavoritesApp'], function(FavoritesApp) {
    new FavoritesApp().start();
  });
} else {
  require(['SpecRunner'], function(SpecRunner) {
    SpecRunner.run();
  });
}
