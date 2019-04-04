import { curWeather } from './weatherResponse';

class Weather {
    constructor(city) {
        new Promise((resolve,reject) => {
            resolve(this.getCityWeather(city));
        })
        .then(res => {
            return this.full = res;
        })
    }

    getCityWeather(city){
        return curWeather(`city=${city}`);
    }
};

export { Weather };