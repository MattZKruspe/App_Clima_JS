const APIKEY = 'b1553b0af8e2d8c92d386aad1f9b2a26';
const URLBase = "https://api.openweathermap.org/data/2.5/weather?";

async function request(url){
    return fetch(url).then(data => data.json());
}

async function getWeather(lat, lon){
    url = `${ URLBase }lat=${ lat }&lon=${ lon }&appid=${APIKEY}`;
    const weather = await request(url);
    console.log(weather);
    updateDoM(weather.name,weather.main.temp);
}

async function getWeatherByCity(city){
    const url =URLBase + `q=${city}&appid=${APIKEY}`;
    const weather = await request(url);
    updateDoM(weather.name, weather.main.temp);
}

function updateDoM(city, temp) {
    document.getElementById('city').textContent = `Clima de ${city}`;
    const temperatureCelsius = Math.round(temp - 273.15);
    document.getElementById('temperature').textContent = `${temperatureCelsius}°C`;
    updateBackground(temperatureCelsius);
}

function updateBackground(temperature) {

    const body = document.body;

    if (temperature > 30) {
        body.style.backgroundImage = 'url("./red.jpg")';
    } else if (temperature > 20) {
        body.style.backgroundImage = 'url("./amarillo.jpg")';
    } else if (temperature > 10) {
        body.style.backgroundImage = 'url("./azul_fuerte.jpg")';
    } else {
        body.style.backgroundImage = 'url("./azul_bajo.jpg")';
    }
    body.style.backgroundSize = 'cover';
    body.style.backgroundRepeat = 'no-repeat';
}

document.getElementById('weatherForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const cityInput = document.getElementById('cityInput').value;
    const countrySelect = document.getElementById('country');
    const selectedCountry = countrySelect.options[countrySelect.selectedIndex].value;

    if (cityInput && selectedCountry) {
        getWeatherByCity(cityInput, selectedCountry);
    } else {
        alert('Por favor rellena el formulario');
    }
});



navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon);
});
