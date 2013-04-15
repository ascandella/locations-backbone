define('googlemaps', [
  'async!http://maps.googleapis.com/maps/api/js?key=AIzaSyAwV2xZPg9Jj50ne5y5bjVwTnBhIIxkMkM&sensor=false'
], function() {
  var geoCode,
      coder,
      createMap;

  coder = new google.maps.Geocoder();

  geoCode = function(address, callback) {
    coder.geocode({ address: address }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        callback(results);
      } else {
        callback([], status);
      }
    });
  };

  createMap = function(element, options) {
    return new google.maps.Map(element, options);
  };

  return {
    createMap: createMap,
    geoCode: geoCode
  };
});
