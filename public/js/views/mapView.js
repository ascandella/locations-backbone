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
        disableDefaultUI: true,
        center: new google.maps.LatLng(37.775, -122.4183),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 12
      };

      this.markerStore = {};

      this.listenTo(this.collection, 'add remove', this.fitMap);
      this.listenTo(this.collection, 'change:latitude change:longitude', this.pointMoved);
      this.listenTo(this.collection, 'add',        this.addOne);
      this.listenTo(this.collection, 'remove',     this.removeOne);
    },

    addOne: function(location) {
      var marker = new google.maps.Marker({
        map: this.map,
        position: location.getPoint(),
        title: location.get('name')
      });
      this.markerStore[location.cid] = marker;

      return marker;
    },

    pointMoved: function(location) {
      this.removeOne(location);
      this.addOne(location);

      this.fitMap();
    },

    fitMap: function() {
      var bounds       = new google.maps.LatLngBounds(),
          placedPoints = 0;

      this.collection.each(function(location) {
        if (location.hasLocation()) {
          bounds.extend(location.getPoint());
          placedPoints++;
        }
      });

      if (placedPoints) {
        this.map.fitBounds(bounds);

        if (placedPoints < 2) {
          this.map.setZoom(12);
        }
      }
    },

    removeOne: function(model) {
      var marker = this.markerStore[model.cid];
      if (marker) {
        marker.setMap(null);
      }
    },

    render: function() {
      this.map = maps.createMap(this.$el[0], this.mapOptions);
    }
  });

  return MapView;
});
