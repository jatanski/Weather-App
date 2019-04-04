import { curWeather } from './weatherResponse';

const searchIco = document.getElementById('ico')
const searchInput = document.querySelector('.prompt');
const todaySection = document.querySelector('.today');



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
    new Promise((resolve, reject) => {
            resolve(curWeather(`city=${city}`));
        })
        .then(res => {
            return res.data[0];
        })
        .then(wetDat => { //tutaj wszystkie funkcje/operacje dodające dane z API pogodowego do DOM
            weToday(wetDat);
        })
}

searchIco.addEventListener('click', showCity);

// const weather = new Weather();

// console.log(weather.getCityWeather('Moscow'));