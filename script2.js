const selButton = document.getElementById('sel');
const chButton = document.getElementById('ch');
var x = 1;
var type1;

function selectPlace(selection) {
    var sel = localStorage.getItem(selection);
    var array = JSON.parse(sel);
    var lat;
    var lng;
    if (sel != null){
        if (array[0] == `No ${selection}s found`) {
            document.getElementById("info").textContent = `No ${selection}s found`;
            document.getElementById("go").setAttribute('disabled', '');
            document.getElementById("ch").setAttribute('disabled', '');
        }
        else {
            document.getElementById("info").textContent = array[0].name;
            lat = array[0].geometry.location.lat;
            lng = array[0].geometry.location.lng;
            setupMaps(lat, lng);
            type1 = selection;
            document.getElementById("go").removeAttribute('disabled');
            document.getElementById("ch").removeAttribute('disabled');
        }
    }
    else {
        document.getElementById("info").textContent = `No ${selection}s found`;
    }
}

function setupMaps(lat, lng) {
    document.getElementById("map").setAttribute('href', 'https://www.google.com/maps?z=5&t=m&q=loc:' + lat + "+" + lng);
}

function getSelection() {
    var type;
    type = document.getElementById("opt").value;
    return type;
}

function changeSelection() {
    if (type1 != 'nothing') {       
        var sel = localStorage.getItem(type1);
        var array = JSON.parse(sel);
        if ((x < array.length) && (x >= 0)) { 
            document.getElementById("info").textContent = array[x].name;
            lat = array[x].geometry.location.lat;
            lng = array[x].geometry.location.lng;
            setupMaps(lat, lng);
            if (x == array.length - 1) {
                x = 0;
            } else if (x == 0) {
                x++;
            }
            else {
                x++;
            }
        } else if (x > array.length) {
            x--;
            document.getElementById("info").textContent = array[x].name;
            lat = array[x].geometry.location.lat;
            lng = array[x].geometry.location.lng;
            setupMaps(lat, lng);
        } else if (x < 0) {
            x++;
            document.getElementById("info").textContent = array[x].name;
            lat = array[0].geometry.location.lat;
            lng = array[0].geometry.location.lng;
            setupMaps(lat, lng);
        }
    }
    else {
        window.alert("Nothing selected yet");
    }
}

selButton.addEventListener('click', () => selectPlace(getSelection()));
chButton.addEventListener('click', () => changeSelection());
