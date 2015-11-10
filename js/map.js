var infowindow;
var currentLocation;
var inputLocation;
var map;
var geocoder;
$(document).ready(function() {
    document.getElementById('submit').addEventListener('click', function() {
        findLocation();
    });
});

function initMap(position) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  geocoder = new google.maps.Geocoder();
  infowindow = new google.maps.InfoWindow();

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(location) {
          warn.innerHTML = "Lat: " + location.coords.latitude + " Long: " + location.coords.longitude;
          var position = {
              lat: location.coords.latitude,
              lng: location.coords.longitude
          };
          map.setCenter(position);
            var marker = new google.maps.Marker({
                map: map,
                position: position,
                icon: {
                    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    scale: 5
                }
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent("Your current location.");
                infowindow.open(map, this);
            });


          var service = new google.maps.places.PlacesService(map);
          service.nearbySearch({
            location: position,
            radius: 750,
            types: ['bar', 'restaurant']
          }, callback);

          function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                  createMarker(results[i]);
              }
          }
      }
  })
  } else {
      warn.innerHTML="Browser does not support location.";
  }



  function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
  }

}

function detectLocation() {
    initMap();
}

function findLocation() {
    var address = document.getElementById('input').value;
    var position;
    console.log("Geocoding address: " + address);
     map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    geocoder.geocode({'address':address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            position = results[0].geometry.location;
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                icon: {
                    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    scale: 5
                }
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent("Your current location.");
                infowindow.open(map, this);
            });
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: position,
                radius: 750,
                types: ['bar', 'restaurant']
            }, callback);
        } else {
            warn.innerHTML("Address geocode was unsuccessful.");
            console.log(status);
        }
    });



    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
          }
      }
  }

  function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
    });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
  }
}
