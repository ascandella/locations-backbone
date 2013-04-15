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
    'async'              : 'vendor/async.min',
    'backbone'           : 'vendor/backbone-min',
    'foundation'         : 'foundation.min',
    'googlemaps'         : 'support/googlemaps',
    'jquery'             : 'vendor/jquery',
    'underscore'         : 'vendor/underscore-min',
    'text'               : 'vendor/text',

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
