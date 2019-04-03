import { curWeather } from './weatherResponse';

class Weather {
    constructor() {
        //this.full = curWeather.data[0];
    }

    getCityWeather(city){
        return curWeather(`city=${city}`);
    }
};

export { Weather };