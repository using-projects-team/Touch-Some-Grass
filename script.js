
let map, infoWindow;
let autocomplete;
const pos = []
const type = ['park', 'amusement_park', 'tourist_attraction', 'campground', 'gym'];
function initMap() {
    let orlando = {lat:28.5384, lng:-81.3789};
    let map = new google.maps.Map(document.getElementById('map'), {zoom:10, center: orlando}); 
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
            //Geolocation by name
            var geoposition = new google.maps.Geocoder;
            function geoLocation(coordinates) {
              geoposition.geocode({'location': coordinates}, function(data, status) {
                if (status === 'OK') {
                  if (data[0]) {
                    console.log(data);
                    document.getElementById("address").textContent = data[0].formatted_address;
                    document.getElementById("nextButton").removeAttribute("disabled");
                    document.getElementById("nextButton").classList.toggle("active");
                  } else {
                    document.getElementById("address").textContent = 'No results found';
                  }

                } else {
                  document.getElementById("address").textContent = 'No results found';
                }
              });
            }
            geoLocation(pos);
            //places API
            var places = new google.maps.places.PlacesService(map);
            var call = {
              location: new google.maps.LatLng(pos.lat, pos.lng),
              radius: 5000,
              types: []
            };
            for (let j = 0; j < 5; j++) {
              call.types = Object.assign([type[j]]);
              places.search(call, function(results) {
                if (results[0]){
                  var store = [];
                  for (let i = 0; i < results.length; i++){
                    store.push(results[i]);
                  }
                  localStorage.setItem(type[j], JSON.stringify(store));
                } else {
                  var store = [];
                  store.push(`No ${type[j]}s found`);
                  localStorage.setItem(type[j], JSON.stringify(store));
                }
              });
            };
            
            infoWindow.setPosition(pos);
            infoWindow.setContent("You are here.");
            infoWindow.open(map);
            map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          },
        );
      } else {
        handleLocationError(false, infoWindow, map.getCenter());

      }


      function createMarker(place) {
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function () {
          alert(place.name);

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



