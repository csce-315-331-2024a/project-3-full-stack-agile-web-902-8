import GlobalConfig from '@/lib/config';
import Error from '@/lib/error';

export type WeatherCondition = {
    temp: number;
    wind: number;
    weather: string;
    icon: string;
};

export async function getWeatherData(): WeatherCondition {
    let data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=30.612408154672494&lon=-96.34166678693717,texas&APPID=${GlobalConfig.weather.key}`,
        // It is likely unnecessary to update weather information more frequently than every 10 minutes
        { cache: 'force-cache', next: { revalidate: 600 } }
    );

    let result: WeatherCondition | undefined = {
        temp: data?.main?.temp,
        wind: data?.wind?.speed,
        weather: data?.weather?.main,
        icon: data?.weather?.icon
    };
    if (result === undefined) {
        throw new Error("Incomplete data from weather api", data, null);
    }
    return result;
}
