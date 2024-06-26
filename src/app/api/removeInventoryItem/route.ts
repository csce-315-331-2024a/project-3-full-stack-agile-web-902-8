import { removeInventoryItem } from '@/lib/inventory';
import { NextRequest, NextResponse } from 'next/server';
/**
 * api route for the removeInventoryItem function
 * @param req the request
 * @returns the result of the removeInventoryItem function
 */
export async function POST(request: NextRequest) {
    console.log('POST /api/removeInventoryItem');
    try {
        const name = (await request.json()) as string;
        console.log(name);
        const result = await removeInventoryItem(name);
        console.log(result);
        return NextResponse.json(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error checking exist: ${error.message}` },
            { status: 500 }
        );
    }
}
