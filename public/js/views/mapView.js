define('MapView', [
  'backbone',
  'jquery',
  'underscore',
  'googlemaps'
], function(Backbone, $, _, google) {
  var MapView = Backbone.View.extend({
    el: '#map-view',

    initialize: function() {
      // this.mapOptions = {
      //   center: new google.maps.LatLng(-34.397, 150.644),
      //   mapTypeId: google.maps.MapTypeId.ROADMAP,
      //   zoom: 8
      // };
    },

    render: function() {
      // this.map = new google.maps.Map(this.$el[0], this.mapOptions);
    }
  });

  return MapView;
});
