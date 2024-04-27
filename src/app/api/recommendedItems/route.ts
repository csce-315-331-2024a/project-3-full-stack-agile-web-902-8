import { getWeatherRecommendations } from "@/lib/menu";
import { getWeatherData } from "@/lib/weather";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    console.log("GET /api/recommendedItems");
    try {
        const weather = await getWeatherData();
        // console.log("weather:", weather);
        let res = await getWeatherRecommendations(weather.situation);
        // console.log("recommendations:" , res);
        return NextResponse.json(res, { status: 200 });
    } catch (e: unknown) {
        console.log(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
