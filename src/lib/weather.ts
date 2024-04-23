import GlobalConfig from '@/lib/config';
import Error from '@/lib/error';

export type Situation = "hot" | "cold" | "wet" | "normal";

export type WeatherCondition = {
    temp: number;
    wind: number;
    weather: string;
    icon: string;
    situation: Situation;
};

export async function getWeatherData(): Promise<WeatherCondition> {
    let data = await (await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=30.612408154672494&lon=-96.34166678693717,texas&APPID=${GlobalConfig.weather.key}`,
        // It is likely unnecessary to update weather information more frequently than every 10 minutes
        { cache: 'force-cache', next: { revalidate: 600 } }
    )).json();

    let result: WeatherCondition = {
        temp: data!.main!.temp,
        wind: data!.wind!.speed,
        weather: data!.weather!.main,
        icon: data!.weather!.icon,
        situation: "normal",
    };
    let wid = data!.weather!.id!;
    if (wid >= 200 && wid < 600) {
        result.situation = "wet";
    }
    else if (result.temp < 55) {
        result.situation = "cold";
    } else if (result.temp > 80) {
        result.situation = "hot";
    }
    if (result === undefined) {
        throw new Error("Incomplete data from weather api", data, null);
    }
    return result;
}
