import GlobalConfig from '@/lib/config';
import Error from '@/lib/error';

export type Situation = 'hot' | 'cold' | 'wet' | 'normal';

export type WeatherCondition = {
    temp: number;
    wind: number;
    weather: string;
    icon: string;
    situation: Situation;
};

export async function getWeatherData([ lat, lon ]: [number, number] = [30.612408154672494,-96.34166678693717]): Promise<WeatherCondition> {
    // console.log("looking for weather at", lat, lon);
    let data = await (
        await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${GlobalConfig.weather.key}`,
            // It is likely unnecessary to update weather information more frequently than every 10 minutes
            { next: { revalidate: 600 } }
        )
    ).json();

    // console.log("got weather data", data);

    let result: WeatherCondition;
    try {
        result = {
            temp: data.main.temp,
            wind: data.wind.speed,
            weather: data.weather[0].main,
            icon: data.weather[0].icon,
            situation: 'normal',
        };
    } catch(e) {
        throw new Error('Incomplete data from weather api', data, { lat, lon });
    }

    // console.log("got result", result);

    let wid = data!.weather!.id!;
    if (wid >= 200 && wid < 600) {
        result.situation = 'wet';
    } else if (result.temp < 285) {
        result.situation = 'cold';
    } else if (result.temp > 300) {
        result.situation = 'hot';
    }

    return result;
}
