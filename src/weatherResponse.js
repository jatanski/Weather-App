
const apiKey = '4c35b4e8b88542c58826712e428d23ff';

export const curWeather = async (param) => {
    const url = `https://api.weatherbit.io/v2.0/current?${param}&key=${apiKey}`;

    const fetching = await fetch(url);
    return await fetching.json();
}

// export const curWeather = {
//         "data": [{
//             "rh": 54,
//             "pod": "d",
//             "lon": 17.03333,
//             "pres": 992.03,
//             "timezone": "Europe\/Warsaw",
//             "ob_time": "2019-04-03 20:21",
//             "country_code": "PL",
//             "clouds": 98,
//             "ts": 1554322915.2951,
//             "solar_rad": 0,
//             "state_code": "72",
//             "lat": 51.1,
//             "wind_spd": 3.95947,
//             "wind_cdir_full": "southeast",
//             "wind_cdir": "SE",
//             "slp": 1005.59,
//             "vis": 24.1,
//             "h_angle": -90,
//             "sunset": "17:30",
//             "dni": 383.259,
//             "dewpt": 3.1,
//             "snow": 0,
//             "uv": 2.20872,
//             "precip": 0,
//             "wind_dir": 134,
//             "sunrise": "04:22",
//             "ghi": 239.811,
//             "dhi": 46.3731,
//             "aqi": 64,
//             "city_name": "Wrocław",
//             "weather": {
//                 "icon": "c04d",
//                 "code": 804,
//                 "description": "Overcast clouds"
//             },
//             "datetime": "2019-04-03:20",
//             "temp": 12.1,
//             "station": "AU681",
//             "elev_angle": -21.9,
//             "app_temp": 12.1
//         }],
//         "count": 1
//     }

