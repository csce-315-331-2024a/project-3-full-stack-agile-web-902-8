import { getInventoryItemByName } from '@/lib/inventory';
import { NextRequest, NextResponse } from 'next/server';
/**
 * api route for the getInventoryItemByName function
 * @param req the request
 * @returns the result of the getInventoryItemByName function
 */
export async function POST(request: NextRequest) {
    console.log('POST /api/getInventoryItemByName');
    try {
        const name = (await request.json()) as string;
        console.log(name);
        const result = await getInventoryItemByName(name);
        console.log(result);
        return NextResponse.json(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error checking exist: ${error.message}` },
            { status: 500 }
        );
    }
}
