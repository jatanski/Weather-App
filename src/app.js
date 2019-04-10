import {
    curWeather,
    hourWeather,
    daysWeather,
    pollutionWeather
} from './weatherResponse';

import {
    findMatches,
} from './cityBrowser'

import {
    NextHoursWeather,
    NextDaysWeather
} from './NextWeather'

import {
    curLoc
} from './currentLocal';
import {
    speakPolish,
    speakEnglish
} from './speechSynthesis';
import {
    startRecognate
} from './volumeRecognition';

import {
    isCookiesAllowed,
    isMainCitySet,
    setMainCity
} from './Cookies';
isCookiesAllowed()

const date = require('date-and-time');
const searchIco = document.getElementById('ico')
const microIco = document.getElementById('microIco');
export const searchInput = document.querySelector('.prompt');
const searchForm = document.querySelector('.look')
export const city = document.getElementById('city');
export const tempNow = document.querySelector('.temp-now');
export const weatherIcoNow = document.querySelector('.weather-ico-now')
const nextHourSections = [...document.querySelectorAll('.next-hour')]
export const nextDaySections = [...document.querySelectorAll('.next-day')]
const sunTime = document.querySelector('.sun-time')
const searchUl = document.querySelector('.suggestions')
const pollutionSection = document.querySelector('.pollution')
const searchBar = document.querySelector('.prompt')

const showPosition = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    setWeatherData(`lat=${latitude}&lon=${longitude}`);
}


const completeNextHours = (weat) => {
    let wHour = 0;
    weat.forEach(hour => {
        console.log(hour);
        const nextHour = new NextHoursWeather(hour);
        nextHourSections[wHour].children[0].textContent = nextHour.time;
        nextHourSections[wHour].children[1].textContent = `${nextHour.temp}°C`;
        nextHourSections[wHour].children[2].innerHTML = nextHour.ico;
        wHour++;
    });
}

const completeNextDays = (weat) => {
    let wDay = 0;
    weat.forEach(day => {
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
    const sunR = new Date(`2018-04-03T${weat.sunrise}:00`);
    const sunS = new Date(`2018-04-03T${weat.sunset}:00`)
    const rise = `${date.addHours(sunR, 2)}`.toString().slice(16, 21);
    const set = `${date.addHours(sunS, 2)}`.toString().slice(16, 21);
    sunTime.innerHTML = ` <p>${rise} <br> ${set}</p>`
}

const showPollution = (weat) => {
    let airQuality = ''
    let color = ''
    if (weat.mainus == "p1") {
        airQuality = "Dobra"
        color = '#b0dd10'
    } else if (weat.mainus == "p2") {
        airQuality = "Umiarkowana"
        color = '#ffd911'
    } else if (weat.mainus == "p3") {
        airQuality = "Dostateczna"
        color = '#eb913a'
    } else if (weat.mainus == "p4") {
        airQuality = "Zła"
        color = '#e73f3f'
    } else if (weat.mainus == "p5") {
        airQuality = "Bardzo zła"
        color = '#a02c2c'
    } else if (weat.mainus == "p6") {
        airQuality = "Niebezpieczna dla życia"
        color = '#440A24'
    } else {
        airQuality = "Brak danych"
        color = '#aaa'
    }
    console.log(weat.mainus)
    pollutionSection.firstElementChild.innerText = `Jakość powietrza`
    pollutionSection.lastElementChild.innerText = airQuality
    pollutionSection.lastElementChild.style.backgroundColor = color
}

const showWeather = (city) => {
    searchBar.style.marginTop = 0;
    if (typeof city == "string") {
        setWeatherData(`city=${city}`);
    } else if (searchInput.value) setWeatherData(`city=${searchInput.value}`)
    else alert('Najpierw wprowadź miejscowość.')
    searchInput.value = '';
    searchUl.innerHTML = '';
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
    let latitude = 0
    let longitude = 0

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
            console.log("curWeather: " + res);
        });
    hourWeather(place)
        .then(res => {
            completeNextHours(res)
        })
        .catch(res => {
            console.log("hourWeather: " + res);
        });
    daysWeather(place)
        .then(res => {
            console.log(res);
            completeNextDays(res);
        })
        .catch(res => {
            console.log("daysWeather: " + res);
        });
    pollutionWeather(latitude, longitude)
        .then(res => {
            showPollution(res)
        })
        .catch(res => {
            console.log("pollutionWeather: " + res);
        });
}

searchIco.addEventListener('click', showWeather);
searchForm.addEventListener('submit', showWeatherEnter);
volumeIco.addEventListener('click', speakPolish);
window.addEventListener('keypress', (ev) => {
    if (ev.keyCode == '0' || ev.keyCode == '17') {
        ev.preventDefault();
        speakPolish();
    }
});
microIco.addEventListener('click', startRecognate);
searchInput.addEventListener('input', findMatches)

window.onload = isMainCitySet(setWeatherData, curLoc, showPosition);
// const weather = new Weather();
// console.log(weather.getCityWeather('Moscow'));

export {
    showWeather
}