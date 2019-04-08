import {
    searchInput,
    showWeather
}
from './app';

function startRecognate() {
    if ('webkitSpeechRecognition' in window) {
        var speechRecognizer = new webkitSpeechRecognition();
        speechRecognizer.interimResults = true;
        speechRecognizer.lang = 'pl-PL';
        speechRecognizer.start();

        speechRecognizer.onresult = function (event) {
            var interimTranscripts = '';
            for (var i = event.resultIndex; i < event.results.length; i++) {
                var transcript = event.results[i][0].transcript;
                interimTranscripts += transcript;
            }
            searchInput.value = interimTranscripts;
            showWeather()
        };
        speechRecognizer.onerror = function (event) {
            alert('Wystąpił błąd, prosimy spróbować ponownie.');
        };
    } else {
        alert('Twoja przeglądarka nie obsługuje funkcji mikrofonu.');
    }
}

export {
    startRecognate
}