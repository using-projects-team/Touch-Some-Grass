var map, infoWindow;
var autocomplete;
var position = {};
var service

function initMap() {
  let orlando = { lat: 28.5384, lng: -81.3789 };
  let map = new google.maps.Map(
    document.getElementById('map'), { zoom: 10, center: orlando })
    ;

  var input = document.getElementById('search');

  let autocomplete = new google.maps.places.Autocomplete(input)

  autocomplete.bindTo('bounds', map)

  let marker = new google.maps.Marker({
    map: map
  })

  google.maps.event.addListener(autocomplete, 'place_changed', () => {
    var place = autocomplete.getPlace()
    console.log(place)
    console.log(place.photos[0].getUrl())


    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport)
    } else {
      map.setCenter(place.geometry.location)
      map.setZoom(17)
    }
    marker.setPosition(place.geometry.location)
    marker.setVisible(true)

    let request = {
      location: place.geometry.location,
      type: ['park', 'national_park', 'aquarium', 'hiking_area', 'zoo', 'historical_landmark', 'dog_park'],
      radius: 8050
    }

    

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);


    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          createMarker(results[i]);
        }
      }


      function createMarker(place) {
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function () {
          alert(place.name);
          // window.open(place.photos[0].getUrl(), "_blank");
          // infoWindow.open(map, this);
        });

      }
    }


  })


  infoWindow = new google.maps.InfoWindow();


  const locationButton = document.getElementById("locationButton");

  locationButton.textContent = "Go to Current Location";
  locationButton.classList.add("custom-map-control-button");
  locationButton.addEventListener("click", () => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };




          console.log(pos)


          infoWindow.setPosition(pos);
          infoWindow.setContent("You are here.");
          infoWindow.open(map);
          map.setCenter(pos);
          map.setZoom(13)
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        },

      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

  
  });
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation.",
  );
  infoWindow.open(map);
}

window.initMap = initMap;