const Cookies = require('js-cookie');

const isCookiesAllowed = () => {
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

export const testCookie = () => {
    isCookiesAllowed();
    if (Cookies.get('city')) {
        //console.log(Cookies.get('city'));
    } else {
        Cookies.set('city', 'Wroclaw', {
            expires: 7
        });
    }
};