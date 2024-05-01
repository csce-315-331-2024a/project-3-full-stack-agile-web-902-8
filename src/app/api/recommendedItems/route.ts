import { getWeatherRecommendations } from '@/lib/menu';
import { getWeatherData } from '@/lib/weather';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Gets recommended items from the database
 *
 * @param req The the condition to fetch recommended items for
 * @returns A Promise resolving to an array of ids of recommended items from the database
 */
export async function GET(request: NextRequest) {
    console.log('GET /api/recommendedItems');
    try {
        const lat = request.nextUrl.searchParams.get('lat');
        const lon = request.nextUrl.searchParams.get('lon');
        if ((lat === null) !== (lon === null)) {
            return NextResponse.json(
                {
                    error: 'Must include both parts of the coordinate or neither.',
                },
                { status: 400 }
            );
        }
        let weather;
        if (lat === null) {
            weather = await getWeatherData();
        } else {
            weather = await getWeatherData([Number(lat), Number(lon)]);
        }
        // console.log("weather:", weather);
        let res = await getWeatherRecommendations(weather.situation);
        // console.log("recommendations:" , res);
        return NextResponse.json(res, { status: 200 });
    } catch (e: unknown) {
        console.log(e);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
