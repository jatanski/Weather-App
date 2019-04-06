const showPosition = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(`${latitude} || ${longitude}`)
}

const showError = (error) => {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("Użytkownik nie wyraził zgody na udostępnienie położenia");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Dane o położeniu niedostępne");
            break;
        case error.TIMEOUT:
            alert("Timeout");
            break;
        case error.UNKNOWN_ERROR:
            alert("Wystąpił nieznany błąd");
            break;
    }
}

const curLoc = (positionFunc) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positionFunc, showError);
    } else {
        alert("Twoja przeglądarka nie obsługuje geolokalizacji");
    };
}

export {curLoc};