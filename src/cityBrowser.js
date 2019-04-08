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
const lub = document.getElementsByClassName('li-element')

export let liList = []

export const findMatches = (e) => {
    const searchText = e.target.value

    let cities = cityList.slice()
    cities = cities.filter(city => {
        return city.name.includes(searchText)
    })
    const html = cities.map(el => {
        return `<li class="li-element">
        <span class="name">${el.name}</span>`
    }).join('');

    searchUl.innerHTML = html

    liList = [...lub]
    liList.forEach(el => el.addEventListener('click', searchLi))
}

export function searchLi() {
    showWeather(this.innerText)
}