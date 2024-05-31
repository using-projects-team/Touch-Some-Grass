let map, infoWindow;
let autocomplete;



const pos = []

function initMap() {
    let orlando = {lat:28.5384, lng:-81.3789};
    let map = new google.maps.Map(
        document.getElementById('map'), {zoom:10, center: orlando})
    ;
    let marker = new google.maps.Marker({position: orlando, map: map});
    
    initAutocomplete()
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


console.log(pos)


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation.",
  );
  infoWindow.open(map);
}

        function initAutocomplete() {
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
        }

window.initMap = initMap;