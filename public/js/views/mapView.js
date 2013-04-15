define('MapView', [
  'backbone',
  'jquery',
  'underscore',
  'googlemaps'
], function(Backbone, $, _, maps) {
  var MapView = Backbone.View.extend({
    el: '#map-view',

    initialize: function() {
      this.mapOptions = {
        center: new google.maps.LatLng(37.775, -122.4183),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 12
      };
    },

    render: function() {
      this.map = maps.createMap(this.$el[0], this.mapOptions);
    }
  });

  return MapView;
});
