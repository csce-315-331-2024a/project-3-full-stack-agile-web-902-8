import { aggregateMenuItems } from '@/lib/menuBoard';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest) {
    console.log('GET /api/aggregateMenuItems');
    try {
        const url = new URL(request.url);
        const startDateParam = url.searchParams.get('startDate');
        const endDateParam = url.searchParams.get('endDate');

        if (!startDateParam || !endDateParam) {
            return NextResponse.json(
                { error: 'Missing required date parameters' },
                { status: 400 }
            );
        }

        const startDate = new Date(startDateParam);
        const endDate = new Date(endDateParam);

        // Further validate the date objects if necessary
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return NextResponse.json(
                { error: 'Invalid date parameters' },
                { status: 400 }
            );
        }

        const menuTypes = await aggregateMenuItems(startDate, endDate);
        return NextResponse.json(menuTypes, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error fetching menu types: ${error.message}` },
            { status: 500 }
        );
    }
}
