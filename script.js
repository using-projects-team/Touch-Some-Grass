let autocomplete;
var button = document.getElementById("Check");
// Rylan Maps API code [begins]
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

function initMap() {
    let orlando = {lat:28.5384, lng:-81.3789};
    let map = new google.maps.Map(document.getElementById('map'), {zoom:8, center: orlando});
    let marker = new google.maps.Marker({position: orlando, map: map});
    initAutocomplete()
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
// Rylan Maps API code [ends]
// Prototype function for later, once maps API works properly and generates location strings.
function populateArray() {
    let places;
    for (let i = 0; i < 5; i++) {
        places[i] = initAutocomplete();
    }
    return places;
}
// This function creates a list of selectable places.
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