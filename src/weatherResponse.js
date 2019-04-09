const apiKey = '4c35b4e8b88542c58826712e428d23ff';

export const curWeather = async (param) => {
    const url = `https://api.weatherbit.io/v2.0/current?${param}&key=${apiKey}&lang=pl`;
    const fetching = await fetch(url);
    const currentWeather = await fetching.json();
    return currentWeather.data[0];
}

export const hourWeather = async (param) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/hourly?${param}&key=${apiKey}&hours=8&lang=pl`;
    const fetching = await fetch(url);
    const weatherHourArray = await fetching.json();
    return weatherHourArray.data;
}

export const daysWeather = async (param) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?${param}&key=${apiKey}&days=5&lang=pl`;
    const fetching = await fetch(url);
    const weatherDaysArray = await fetching.json();
    return weatherDaysArray.data;
}

const pollutionApiKey = 'Ax8icFvXfL3ebLzAb';

export const pollutionWeather = async (latitude, longitude) => {
    const url = `https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${pollutionApiKey}`;
    const fetching = await fetch(url);
    const pollWeather = await fetching.json();
    //console.log(pollWeather)
    return pollWeather.data.current.pollution;
}