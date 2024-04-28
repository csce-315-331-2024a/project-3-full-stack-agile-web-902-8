import { orderHistory } from '@/lib/order-history';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        console.log('Entering GET function.');

        const url = new URL(request.url);
        const beginTime = Number(url.searchParams.get('beginTime'));
        const endTime = Number(url.searchParams.get('endTime'));

        const dateFormatOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'America/Chicago',
        };

        const beginDate = new Intl.DateTimeFormat(
            'en-US',
            dateFormatOptions
        ).format(new Date(beginTime));
        const endDate = new Intl.DateTimeFormat(
            'en-US',
            dateFormatOptions
        ).format(new Date(endTime));

        console.log(
            'GET /api/getorderHistory with beginTime:',
            beginDate,
            beginTime,
            'and endTime:',
            endDate,
            endTime
        );

        if (isNaN(beginTime) || isNaN(endTime)) {
            return NextResponse.json(
                { error: 'Please provide a valid begin time and end time.' },
                { status: 400 }
            );
        }

        if (beginTime > endTime) {
            return NextResponse.json(
                {
                    error: 'Warning: starting date cannot be greater than end date.',
                },
                { status: 400 }
            );
        }

        const res = await orderHistory(beginTime, endTime);

        const orders = res.map((order) => {
            const localTime = new Intl.DateTimeFormat(
                'en-US',
                dateFormatOptions
            ).format(new Date(order.timestamp));
            return { ...order, timestamp: localTime };
        });

        return NextResponse.json(orders, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error fetching order history: ${error.message}` },
            { status: 500 }
        );
    }
}
