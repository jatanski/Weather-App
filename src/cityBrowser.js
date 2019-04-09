// const url = 'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json'

// const cities = [];

// export const prom = async () => {
//     const fetching = await fetch(url)
//     const cityList = await fetching.json()
//     // return cityList
//     console.log(cityList)
// }

import cityList from '../db/world-cities_json.json'
import {
    showWeather
} from './app'

const searchUl = document.querySelector('.suggestions')
const searchBox = document.querySelector('.prompt')
const lub = document.getElementsByClassName('li-element')

export let liList = []

export const findMatches = (e) => {

    if(e.target.value.length < 3) // Don't search for short strings
        return;

    const searchText = e.target.value.toLowerCase()

    let cities = cityList.slice()
    cities = cities.map(city => {
        return [city.name.toLowerCase(), city.country]
    })
    cities = cities.filter(city => {
        return city[0].includes(searchText)
    })
    const html = cities.map(el => {
        return `<li class="li-element">
        <span class="name">${el[0]}, ${el[1]}</span>`
    }).join('');

    searchBox.style.marginTop = Math.min(400, 60 * cities.length) + 'px';
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