import { aggregateMenuItems } from '@/lib/menuBoard';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        // Since aggregateMenuItems expects Date objects, parse the timestamps directly to Dates
        const beginDate = new Date(Number(url.searchParams.get('beginTime')));
        const endDate = new Date(Number(url.searchParams.get('endTime')));

        console.log(
            'GET /api/aggregateMenuItems with beginDate:',
            beginDate.toISOString(),
            'and endDate:',
            endDate.toISOString()
        );

        // Check if the dates are valid
        if (isNaN(beginDate.getTime()) || isNaN(endDate.getTime())) {
            return NextResponse.json(
                { error: 'Invalid date parameters' },
                { status: 400 }
            );
        }

        // Call the function with Date objects
        const menuTypes = await aggregateMenuItems(beginDate, endDate);
        return NextResponse.json(menuTypes, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error fetching menu types: ${error.message}` },
            { status: 500 }
        );
    }
}
