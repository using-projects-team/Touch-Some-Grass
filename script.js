let map, infoWindow;
let autocomplete;
const pos = []

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
  
  
            console.log(pos)
            //Geolocation by name
            var geoposition = new google.maps.Geocoder;
            function geoLocation(coordinates) {
              geoposition.geocode({'location': coordinates}, function(results, status) {
                if (status === 'OK') {
                  if (results[0]) {
                    document.getElementById("address").textContent = results[0].formatted_address;
                    document.getElementById("nextButton").removeAttribute("disabled");
                  } else {
                    document.getElementById("address").textContent = 'No results found';
                  }
                } else {
                  document.getElementById("address").textContent = 'Error detected';
                }
              });
            }
            geoLocation(pos);
            //end of geolocation function
            //Find places nearby API, TODO: It is not going to work until we get a valid key
            fetch('https://places.googleapis.com/v1/places:searchNearby', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': 'AIzaSyAks66r63NKJQCXN-ElReI33CP-EARiaTY',
                'X-Goog-FieldMask': 'places.displayName'
              },
              body: JSON.stringify({
                'includedTypes': ['historical_landmark', 'park', 'national_park', 'tourist_attraction', 'hiking_area'],
                'maxResultCount': 1,
                'rankPreference': 'DISTANCE',
                'locationRestriction': {
                  'circle': {
                    'center': {
                      'latitude': pos.lat,
                      'longitude': pos.lng
                    },
                    'radius': 3000
                  }
                }
              })
            });
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
// Scrapped idea that never worked
/*       function initAutocomplete() {
            autocomplete = new google.maps.places.Autocomplete(
                document.getElementById('autocomplete'),
                {
                    types: ['(cities)'],
                    componentRestrictions: {'country': ['US']},
                    fields: ['place_id', 'geometry', 'name']

                }
            );
            autocomplete.addListener('place_changed', placeChanged);
        }
        function placeChanged() {
            var place = autocomplete.getPlace();

            if (!place.geometry) {
                document.getElementById('autocomplete').placeholder =
                'Enter a City';
            } else {
                document.getElementById('details').innerHTML = place.name;
            }
        }*/

window.initMap = initMap;

