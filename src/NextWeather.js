export class NextHoursWeather {
    constructor(time, temp, ico) {
        this.time = time;
        this.temp = temp;
        this.ico = ico;
    }
}

export class NextDaysWeather {
    constructor(date, ico, tempDay, tempNight) {
        this.date = date;
        this.ico = ico;
        this.tempDay = tempDay;
        this.tempNight = tempNight;
    }
}