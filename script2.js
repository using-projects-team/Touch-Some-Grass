const selButton = document.getElementById('sel');

function selectPlace(selection) {
    var sel = localStorage.getItem(selection);
    var array = JSON.parse(sel)
    if (sel != null){
        if (sel == `No ${selection}s found`) {
            document.getElementById("info").textContent = `No ${selection}s found`;
        }
        else {
            document.getElementById("info").textContent = array[0];
        }
    }
}

function getSelection() {
    var type;
    type = document.getElementById("opt").value;
    return type;
}

selButton.addEventListener('click', selectPlace(getSelection()));
