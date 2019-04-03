import { Weather } from './weather';

const searchIco = document.getElementById('ico')
const searchInput = document.querySelector('.prompt');
const todaySection = document.querySelector('.today');

const showCity = () => {
    todaySection.innerHTML = `<p class='city'>${searchInput.value}</p>`;
    setWeatherData(searchInput.value);
    searchInput.value = ''
}

const setWeatherData =  (city) => {
    const weather = new Weather();
    const weatherData = new Promise((resolve,reject) => {
        resolve(weather.getCityWeather(city));
    });

    weatherData.then(res => {
        let temp = document.createElement('div');
        temp.setAttribute('class','city');
        temp.innerHTML = `<h2>${res.data[0].temp}</h2>`;
        todaySection.appendChild(temp);
    });
}

searchIco.addEventListener('click', showCity);

// const weather = new Weather();

// console.log(weather.getCityWeather('Moscow'));