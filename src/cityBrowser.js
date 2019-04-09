import worldCityList from '../db/world-cities_json.json'
import polishCityList from '../db/miasta_.json'

import {
    showWeather
} from './app'

// const polishCity = polishCityList.json()

const searchUl = document.querySelector('.suggestions')
const searchBox = document.querySelector('.prompt')
const lub = document.getElementsByClassName('li-element')

export let liList = []

export const findMatches = (e) => {
    console.log(polishCityList)
    if (e.target.value.length < 3) // Don't search for short strings
        return;

    const searchText = e.target.value.toLowerCase()

    let polishCities = []
    for (let i = 0; i < polishCityList.length; i++) {
        const el = polishCityList[i].cities
        for (let j = 0; j < el.length; j++) {
            polishCities.push([el[j].text_simple.toLowerCase(), "Poland"])
        }
    }

    polishCities = polishCities.filter(city => {
        return city[0].includes(searchText)
    })

    let cities = worldCityList.slice()
    cities = cities.map(city => {
        return [city.name.toLowerCase(), city.country]
    })
    cities = cities.filter(city => {
        return city[0].includes(searchText)
    })

    const allCities = polishCities.concat(cities)

    const html = allCities.map(el => {
        return `<li class="li-element">
        <span class="name">${el[0]}, ${el[1]}</span>`
    }).join('');

    searchBox.style.marginTop = Math.min(400, 60 * allCities.length) + 'px';
    searchUl.innerHTML = html

    // console.log(searchBox.style.marginTop)

    liList = [...lub]
    liList.forEach(el => el.addEventListener('click', searchLi))
}

export function searchLi(e) {
    console.log(e.target.innerText);
    showWeather(e.target.innerText)
    searchBox.style.marginTop = 0;
}