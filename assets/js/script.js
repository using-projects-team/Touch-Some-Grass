const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = '64614857e0d209af3b9fbad0fbe25e31';
const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const searchInput = document.querySelector('input');
const searchButton = document.querySelector('button');
const weatherContainer = document.getElementById('weather');
const currentLocation = document.getElementById('location');
const forecastContainer = document.getElementById('forecast');
const modalBox = document.getElementById('exampleModal');
const taskForm = document.getElementById('formGroup');
const closeButton = document.getElementById('closeBtn');

closeButton.addEventListener('click', function () {
    taskForm.setAttribute('style', 'visibility: hidden;')
});



let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


const getCurrentWeatherByName = async (city) => {
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

const getCurrentWeatherByCoordinate = async (lat, lon) => {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

const getForecastWeatherByName = async (city) => {
    const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

const getForecastWeatherByCoordinate = async (lat, lon) => {
    const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

const renderCurrentWeather = (data) => {
    const weatherJSx = `
        <h1>${data.name}, ${data.sys.country}</h1>
        <div id="main">
            <img alt="Weather Icon" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"/>
            <span>${data.weather[0].main}</span>
            <p>${Math.round(data.main.temp)} °F</p>
        </div>
        <div id="info">
            <p>Humidity: <span>${data.main.humidity}%</span></p>
            <p>Wind Speed: <span>${data.wind.speed} m/s</span></p>
        </div>
    `;
    weatherContainer.innerHTML = weatherJSx;
    if (data.weather[0].main === 'Clear') {
        let promptValue = prompt('Greate News! Weather is good today. Can I offer you some good places to go? please say YES/NO', 'YES/NO')
        let timesRun = 0;
        if (promptValue !== null && promptValue === 'YES' || promptValue === 'yes') {

            var interval = setInterval(function () {
                taskForm.setAttribute('style', 'visibility: visible;')
                timesRun += 1;
                if (timesRun === 2) {
                    clearInterval(interval);
                }
                console.log(timesRun)
            }, 2000);

        }
    } else {
        alert('Sorry! weather is not good today.')
    }

}

const getWeekDay = (date) => {
    return DAYS[new Date(date * 1000).getDay()];
}

const renderForecastWeather = (data) => {
    forecastContainer.innerHTML = '';
    data = data.list.filter(obj => obj.dt_txt.endsWith("12:00:00"));
    data.forEach(i => {
        const foreCastJSx = `
        <div>
            <img alt="Weather Icon" src="https://openweathermap.org/img/w/${i.weather[0].icon}.png"/>
            <h3>${getWeekDay(i.dt)}</h3>
            <p>${Math.round(i.main.temp)} °F</p>
            <span>${i.weather[0].main}</span>
        </div>
        `;
        forecastContainer.innerHTML += foreCastJSx;

    })
}

const searchHandler = async () => {
    const cityName = searchInput.value;

    if (!cityName) {
        alert('Please Enter City Name!');
    }

    const currentData = await getCurrentWeatherByName(cityName);
    renderCurrentWeather(currentData);

    const forecastData = await getForecastWeatherByName(cityName);
    renderForecastWeather(forecastData);
};

const positionCallBack = async (position) => {
    const { latitude, longitude } = position.coords;
    const currentData = await getCurrentWeatherByCoordinate(latitude, longitude);
    renderCurrentWeather(currentData);
    const forecastData = await getForecastWeatherByCoordinate(latitude, longitude);
    renderForecastWeather(forecastData);
}

const errorCallBack = (error) => {
    console.log(error.message);
}

const locationHandler = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positionCallBack, errorCallBack);
    } else {
        alert('Your Browser Does Not Support Geolocation!');
    }
}

searchButton.addEventListener('click', searchHandler);
currentLocation.addEventListener('click', locationHandler);
