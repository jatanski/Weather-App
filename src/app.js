import {
    curWeather,
    hourWeather,
    daysWeather
} from './weatherResponse';

const searchIco = document.getElementById('ico')
const searchInput = document.querySelector('.prompt');
const searchForm = document.querySelector('.look')
const city = document.getElementById('city');
const tempNow = document.querySelector('.temp-now')

let hour = hourWeather(`city=Wroclaw`);
hour.then(res => {
    console.log(res);
})

let days = daysWeather(`city=Wroclaw`);
days.then(res => {
    console.log(res);
})

const showCity = () => {
    city.innerText = searchInput.value;
    setWeatherData(searchInput.value);
    searchInput.value = ''
}

const showCityEnter = (e) => {
    e.preventDefault();
    showCity()
}

const weToday = (weat) => { //Aktualizuje aktualną temperaturę
    const temp = Math.round(weat.temp)
    tempNow.innerHTML = `${temp}°C`
}

const setWeatherData = (city) => {
    curWeather(`city=${city}`)
        .then(res => { //tutaj wszystkie funkcje/operacje dodające dane z API pogodowego do DOM
            weToday(res);
        })
}

searchIco.addEventListener('click', showCity);
searchForm.addEventListener('submit', showCityEnter);

// const weather = new Weather();

// console.log(weather.getCityWeather('Moscow'));