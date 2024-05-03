import { aggregateMenuItems } from '@/lib/menuBoard';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET API to aggregate menu items based on a specified time range.
 * This endpoint uses `start` and `end` query parameters to define the time range for aggregation.
 *
 * @param {NextRequest} request - The request object that includes the `start` and `end` times as query parameters.
 * @returns Returns a 200 response with the aggregated menu item data if successful,
 * or 400 with an error message for invalid time parameters, or 500 with an error message if an error occurs during fetching.
 */
export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        // Since aggregateInventory expects number timestamps, we ensure we parse them as such
        const startTime = Number(url.searchParams.get('start'));
        const endTime = Number(url.searchParams.get('end'));

        /* console.log(
            'GET /api/aggregateMenu with start:',
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
        const inventoryItems = await aggregateMenuItems(startTime, endTime);
        return NextResponse.json(inventoryItems, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error fetching inventory data: ${error.message}` },
            { status: 500 }
        );
    }
}
