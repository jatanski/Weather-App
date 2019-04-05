import {
    curWeather,
    hourWeather,
    daysWeather
} from './weatherResponse';

import {
    NextHoursWeather,
    NextDaysWeather
} from './NextWeather'

const searchIco = document.getElementById('ico')
const searchInput = document.querySelector('.prompt');
const searchForm = document.querySelector('.look')
const city = document.getElementById('city');
const tempNow = document.querySelector('.temp-now');
const weatherIcoNow = document.querySelector('.weather-ico-now')
const nextHourSections = [...document.querySelectorAll('.next-hour')]
const nextDaySections = [...document.querySelectorAll('.next-day')]
const sunTime = document.querySelector('.sun-time')


let hour = hourWeather(`city=Wroclaw`);
hour.then(res => {
    console.log(res);
})

let days = daysWeather(`city=Wroclaw`);
days.then(res => {
    console.log(res);
})

const completeNextHours = (weat) => {
    const curTime = (new Date).getHours();
    let showTime = curTime;

    for (let i = 0; i < nextHourSections.length; i++) {
        const nextHour = new NextHoursWeather(`${showTime}:00`, Math.round(weat[i].temp), `<img src="img/icons/${weat[i].weather.icon}.png"
    alt="">`)
        nextHourSections[i].children[0].textContent = nextHour.time
        nextHourSections[i].children[1].textContent = `${nextHour.temp}°C`
        nextHourSections[i].children[2].innerHTML = nextHour.ico
        showTime = showTime + 1
    }
}
const completeNextDays = (weat) => {
    const curDay = (new Date).getDay()
    const curMonth = (new Date).getMonth() + 1
    let showDay = curDay
    for (let i = 0; i < nextDaySections.length; i++) {
        let thisDay = `showDay`
        if (showDay <= 9) thisDay = `0${showDay}`

        let thisMonth = `curMonth`
        if (curMonth <= 9) thisMonth = `0${curMonth}`

        const nextDay = new NextDaysWeather(`${thisDay}.${thisMonth}`, `<img src="img/icons/${weat[i].weather.icon}.png"
    alt="">`, Math.round(weat[i].max_temp), Math.round(weat[i].min_temp))
        nextDaySections[i].children[0].textContent = nextDay.date;
        nextDaySections[i].children[1].innerHTML = nextDay.ico;
        nextDaySections[i].children[2].firstElementChild.textContent = `${nextDay.tempDay}°C`
        nextDaySections[i].children[2].lastElementChild.textContent = `${nextDay.tempNight}°C`
        showDay = showDay + 1
    }
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
    setWeatherData(searchInput.value);
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

const setWeatherData = (city) => {
    curWeather(`city=${city}`)
        .then(res => { //tutaj wszystkie funkcje/operacje dodające dane z API pogodowego do DOM
            weToday(res);
            showCity(res);
            sunRiseAndSunSet(res);
        })
    hourWeather(`city=${city}`)
        .then(res => {
            completeNextHours(res)
        })
    daysWeather(`city=${city}`)
        .then(res => {
            completeNextDays(res)
        })
}

searchIco.addEventListener('click', showWeather);
searchForm.addEventListener('submit', showWeatherEnter);

// const weather = new Weather();
// console.log(weather.getCityWeather('Moscow'));