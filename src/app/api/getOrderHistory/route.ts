import { orderHistory } from '@/lib/order-history';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        // Get the begin time and end time from the request URL
        const url = new URL(request.url);
        const beginTime = Number(url.searchParams.get('beginTime'));
        const endTime = Number(url.searchParams.get('endTime'));

        // Convert timestamps to date strings
        const beginDate = new Date(beginTime).toLocaleString();
        const endDate = new Date(endTime).toLocaleString();

        console.log(
            'GET /api/getExcessReport with beginTime:',
            beginDate,
            'and endTime:',
            endDate
        );

        if (isNaN(beginTime) || isNaN(endTime)) {
            return NextResponse.json(
                { error: 'Please provide a valid begin time and end time.' },
                { status: 400 }
            );
        }

        // Check if begin time is greater than end time
        if (beginTime > endTime) {
            return NextResponse.json(
                {
                    error: 'Warning: starting date cannot be greater than end date.',
                },
                { status: 400 }
            );
        }

        const res = await orderHistory(beginTime, endTime);
        return NextResponse.json(res, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error fetching excess report: ${error.message}` },
            { status: 500 }
        );
    }
}
