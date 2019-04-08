import {
    curWeather,
    hourWeather,
    daysWeather
} from './weatherResponse';

import {
    NextHoursWeather,
    NextDaysWeather
} from './NextWeather'

import{curLoc} from './currentLocal';

import {
    isCookiesAllowed,
    isMainCitySet,
    setMainCity
} from './Cookies';
isCookiesAllowed()

const searchIco = document.getElementById('ico')
const searchInput = document.querySelector('.prompt');
const searchForm = document.querySelector('.look')
const city = document.getElementById('city');
const tempNow = document.querySelector('.temp-now');
const weatherIcoNow = document.querySelector('.weather-ico-now')
const nextHourSections = [...document.querySelectorAll('.next-hour')]
const nextDaySections = [...document.querySelectorAll('.next-day')]
const sunTime = document.querySelector('.sun-time')

const showPosition = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    setWeatherData(`lat=${latitude}&lon=${longitude}`);
}


const completeNextHours = (weat) => {
    let wHour = 0;

    weat.forEach(hour => {
        const nextHour = new NextHoursWeather(hour);
        nextHourSections[wHour].children[0].textContent = nextHour.time;
        nextHourSections[wHour].children[1].textContent = `${nextHour.temp}°C`;
        nextHourSections[wHour].children[2].innerHTML = nextHour.ico;
        wHour++;
    });
}

const completeNextDays = (weat) => {
    let wDay = 0;
    weat.forEach(day =>{
        const nextDay = new NextDaysWeather(day);
        nextDaySections[wDay].children[0].textContent = nextDay.date;
        nextDaySections[wDay].children[1].innerHTML = nextDay.ico;
        nextDaySections[wDay].children[2].firstElementChild.textContent = `${nextDay.tempDay}°C`;
        nextDaySections[wDay].children[2].lastElementChild.textContent = `${nextDay.tempNight}°C`;
        wDay++;
    })
}

const showCity = (weat) => {
    city.innerText = `${weat.city_name}, ${weat.country_code}`
}

const sunRiseAndSunSet = (weat) => {
    const rise = weat.sunrise
    const set = weat.sunset
    sunTime.innerHTML = ` <p>${rise} <br> ${set}</p>`
}

const showWeather = () => {
    setWeatherData(`city=${searchInput.value}`);
    searchInput.value = '';
}

const showWeatherEnter = (e) => {
    e.preventDefault();
    showWeather()
}

const weToday = (weat) => { //Aktualizuje aktualną temperaturę
    const temp = Math.round(weat.temp)
    weatherIcoNow.innerHTML = `<img src="img/icons/${weat.weather.icon}.png"
    alt="">`
    tempNow.innerHTML = `${temp}°C`
}

const setWeatherData = (place) => {
    curWeather(place)
        .then(res => { //tutaj wszystkie funkcje/operacje dodające dane z API pogodowego do DOM
            weToday(res);
            showCity(res);
            sunRiseAndSunSet(res);
            console.log(res.city_name);
            setMainCity(res.city_name);
        })
        .catch(res => {
            alert('Nie znaleziono szukanego miasta.');
            console.log(res);
        });
    hourWeather(place)
        .then(res => {
            completeNextHours(res)
        })
        .catch(res => {});
    daysWeather(place)
        .then(res => {
            //console.log(res);
            completeNextDays(res);
        })
        .catch(res => {});
}

searchIco.addEventListener('click', showWeather);
searchForm.addEventListener('submit', showWeatherEnter);

window.onload = isMainCitySet(setWeatherData, curLoc, showPosition);
// const weather = new Weather();
// console.log(weather.getCityWeather('Moscow'));