let h2 = document.querySelector('h2')
let button = document.querySelector('#sendLocation')
var map


function success(position) {

    h2.innerHTML = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`

    if (map === undefined) {
        map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
    } else {
        map.remove();
        map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
    }

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
        .bindPopup('Eu estou aqui!')
        .openPopup();

    function sendLocation() {
        let link = `https://share-my-location.com/location?latlong=${position.coords.latitude},${position.coords.longitude}`

        alert(`O link para compartilhar a sua localização é: ${link}`)
    }
    button.addEventListener('click', sendLocation)
}

function error() {
    throw new Error('Erro ao obter a localização!')
}

var watchID = navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000
})