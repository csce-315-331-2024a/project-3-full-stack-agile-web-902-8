import { aggregateInventory } from '@/lib/inventory-report';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        // Since aggregateInventory expects number timestamps, we ensure we parse them as such
        const startTime = Number(url.searchParams.get('start'));
        const endTime = Number(url.searchParams.get('end') || Date.now());

        /*console.log(
            'GET /api/aggregateInventory with start:',
            new Date(startTime).toLocaleString(),
            'and end:',
            new Date(endTime).toLocaleString()
        );*/

        // Check if the timestamps are valid numbers
        if (isNaN(startTime) || isNaN(endTime)) {
            return NextResponse.json(
                { error: 'Invalid date parameters' },
                { status: 400 }
            );
        }

        // Call the function with number timestamps
        const inventoryItems = await aggregateInventory(startTime, endTime);
        return NextResponse.json(inventoryItems, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error fetching inventory data: ${error.message}` },
            { status: 500 }
        );
    }
}
