import { getMenuIgetFrequentlySoldPairstemNamesByTypeAndInSeason } from '@/lib/menu';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Parse the URL parameters
        const url = new URL(request.url);
        const beginDate = Number(url.searchParams.get('start'));
        const endDate = Number(url.searchParams.get('end'));

        /*console.log(
            'GET /api/getMenuIgetFrequentlySoldPairstemNamesByTypeAndInSeason with start:',
            new Date(beginDate).toLocaleString(),
            'and end:',
            new Date(endDate).toLocaleString()
        );*/

        // Check if the dates are valid
        if (isNaN(beginDate) || isNaN(endDate)) {
            return NextResponse.json(
                { error: 'Invalid date parameters' },
                { status: 400 }
            );
        }

        // Fetch frequently sold pairs
        const frequentlySoldPairs =
            await getMenuIgetFrequentlySoldPairstemNamesByTypeAndInSeason(
                beginDate,
                endDate
            );

        return NextResponse.json(frequentlySoldPairs, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error fetching frequently sold pairs: ${error.message}` },
            { status: 500 }
        );
    }
}
