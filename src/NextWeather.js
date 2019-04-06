const date = require('date-and-time');

export class NextHoursWeather {
    constructor(hour) {
        this.time = date.addHours(new Date(hour.timestamp_utc), 2).getHours()+':00';
        this.temp = Math.round(hour.app_temp);
        this.ico = `<img src="img/icons/${hour.weather.icon}.png" alt="${hour.weather.description}">`;
    }
}

export class NextDaysWeather {
    constructor(day) {
        //zwraca datę w formacie MM.DD
        this.date = `${day.datetime[8]}${day.datetime[9]}.${day.datetime[5]}${day.datetime[6]}`
        this.ico = `<img src="img/icons/${day.weather.icon}.png" alt="${day.weather.description}">`;
        this.tempDay = Math.round(day.max_temp);
        this.tempNight = Math.round(day.min_temp);
    }
}