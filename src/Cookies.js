const Cookies = require('js-cookie');

export const isCookiesAllowed = () => {
    if (Boolean(Cookies.get('isAllowed'))) {
        return;
    } else {
        //w tej części tworzę elementy z powiadomieniem o używaniu cookies
        const element = document.createElement('div');
        element.setAttribute('class','cookie-confirmation');
        document.querySelector('.wrap').appendChild(element);

        const textInfo = document.createElement('p');
        textInfo.innerText = 'Musisz akceptować cookies';

        element.appendChild(textInfo);

        const button = document.createElement('button');
        button.setAttribute('id','cookiesAllowed');
        button.innerText = 'Zgadzam się';

        element.appendChild(button);

        button.addEventListener('click', e => {
            Cookies.set('isAllowed', true, {
                expires: 365
            });
            document.querySelector('.wrap').removeChild(element);
        })
    }
}

//funkcja bierze 3 callbacki, setWeather to funkcja, która ma nam pobrać aktualną pogodę z podanego miasta lub szerokości geo
// curLoc to funkcja do pobierania geolokacji jeśli nie mamy ustawionego domyślnego miasta
// curLocCallback to funkcja callback dla curLoc
export const isMainCitySet = (setWeather, curLoc, curLocCallback) => {
    //Cookies.set('isMainCity', 'Warszawa', {expires:7});
    //console.log(Cookies.get('isMainCity'));
    if (Boolean(Cookies.get('isMainCity'))) {
        const input = `city=${Cookies.get('isMainCity')}`;
        console.log(input);
        setWeather(input)
        return;
    } else {
        curLoc(curLocCallback);
    }
}

export const setMainCity = (displayedCity) => {
    //document.querySelector('.search').removeChild(document.querySelector('#defCityButt')) //usuwa ew. przycisk z poprzedniego wyszukania
    //po wyszukaniu sprawdza czy miasto wyszukane jest ustawione jako domyślne, jesli tak to return
    console.log(Cookies.get('isMainCity'));
    if (Cookies.get('isMainCity') == displayedCity) {
        return;
    //jeśli nie ma domyślnego miasta lub jest to inne miasto to daje opcję ustawienia ciastka z miastem domyslnym
    } else {
        const setDefaultCityButton = document.createElement('button');
        setDefaultCityButton.innerText = 'Ustaw jako miasto domyślne';
        setDefaultCityButton.setAttribute('id','defCityButt')
        document.querySelector('.search').appendChild(setDefaultCityButton);

        setDefaultCityButton.addEventListener('click', e => {
            Cookies.set('isMainCity', displayedCity);
            //od razu usuwam przycisk bo po co pokazywać jak miasto domyślne?
            document.querySelector('.search').removeChild(setDefaultCityButton);
        })


    }
}
