const searchIco = document.getElementById('ico')
const searchInput = document.querySelector('.prompt');
const todaySection = document.querySelector('.today');

const showCity = () => {
    todaySection.innerHTML = `<p class='city'>${searchInput.value}</p>`
    searchInput.value = ''
}

searchIco.addEventListener('click', showCity)