define('googlemaps', [
  'async!http://maps.googleapis.com/maps/api/js?key=AIzaSyAwV2xZPg9Jj50ne5y5bjVwTnBhIIxkMkM&sensor=false'
], function() {
  var geoCode,
      createMap;

  geoCode = function(address, callback) {

  };

  createMap = function(element, options) {
    return new google.maps.Map(element, options);
  };

  return {
    createMap: createMap,
    geoCode: geoCode
  };
});
