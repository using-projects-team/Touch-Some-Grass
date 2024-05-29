// { <iframe
//   width="600"
//   height="450"
//   style="border:0"
//   loading="lazy"
//   allowfullscreen
//   referrerpolicy="no-referrer-when-downgrade"
//   src="https://www.google.com/maps/embed/v1/place?key=API_KEY
//     &q=Space+Needle,Seattle+WA">
// </iframe>}
let autocomplete;

function initMap() {
    let orlando = {lat:28.5384, lng:-81.3789};
    let map = new google.maps.Map(
        document.getElementById('map'), {zoom:8, center: orlando})
    ;
    let marker = new google.maps.Marker({position: orlando, map: map});
    
    initAutocomplete()
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