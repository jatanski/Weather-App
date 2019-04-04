import { curWeather, hourWeather, daysWeather } from './weatherResponse';

const searchIco = document.getElementById('ico')
const searchInput = document.querySelector('.prompt');
const todaySection = document.querySelector('.today');

let hour = hourWeather(`city=Wroclaw`);
hour.then(res => {
    console.log(res);
})

let days = daysWeather(`city=Wroclaw`);
days.then(res => {
    console.log(res);
})

const showCity = () => {
    todaySection.innerHTML = `<p class='city'>${searchInput.value}</p>`;
    setWeatherData(searchInput.value);
    searchInput.value = ''
}

const weToday = (weat) => { //dodaje boxa z temperaturą
    let tempBox = document.createElement('div');
    tempBox.innerHTML = `<h2>${weat.temp} &deg;C</h2>`
    todaySection.append(tempBox);
}

const setWeatherData = (city) => {
    curWeather(`city=${city}`)
        .then(res => { //tutaj wszystkie funkcje/operacje dodające dane z API pogodowego do DOM
            weToday(res);
        })
}

searchIco.addEventListener('click', showCity);

// const weather = new Weather();

// console.log(weather.getCityWeather('Moscow'));