let autocomplete;
let map, infoWindow;
const pos = []
var button = document.getElementById("Check");
var favLocation = "";
var daySel ="";
// Rylan Maps API code [begins]
function initMap() {
    let orlando = {lat:28.5384, lng:-81.3789};
    let map = new google.maps.Map(
        document.getElementById('map'), {zoom:10, center: orlando})
    ;
    
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
// Rylan Maps API code [ends]
// Prototype function for later, once maps API works properly and generates location strings.
function populateArray() {
    let places;
    for (let i = 0; i < 5; i++) {
        places[i] = initAutocomplete();
    }
    return places;
}
// This function populates a list with strings of selectable places.
function createList() {
    let places = populateArray();
    for (let i = 0; i < 5; i++) {
        var place = document.createElement('option');
        place.textContent(places[i]);
        document.querySelector('select').append(place);
    }    
}
// This function populates a table with weather info.
function createTable() {
    let weather = weatherArray();
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 3; i++) {
            let I = toString(i);
            let J = toSTring(j);
            if (j == 0) {
                document.getElementById(I+J) = weather[j].day;
            } else if ( j == 1) {
                document.getElementById(I+J) = weather[j].stat;
            } else {
                document.getElementById(I+J) = weather[j].sel;
            }
        }
    }
}
// This function stores the preferred place selected by the user in local storage
function storePlace() {
    var goThere = {location: getPlace(), name: favLocation};
    if (localStorage.getItem('My Place') !== null) {
        localStorage.removeItem('My Place');
    }
    localStorage.setItem('My Place', JSON.stringify(goThere));
}
// This function retrieves saved preferred location if it exists
function retrievePlace() {
    var myPlace;
    if (localStorage.getItem('My Place') !== null) {
        myPlace = localStorage.getItem('My Place');
        return myPlace;
    } else {
        return null;
    }
}
