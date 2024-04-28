import { getAllInventoryItemNames } from '@/lib/inventory';
import { NextResponse } from 'next/server';
/**
 * api route for the getAllInventoryItemNames function
 * @param req the request
 * @returns the result of the getAllInventoryItemNames function
 */
export async function GET() {
    console.log('GET /api/getAllInventoryItemNames');
    try {
        const itemNames = await getAllInventoryItemNames();
        return NextResponse.json(itemNames, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error fetching inventory item names: ${error.message}` },
            { status: 500 }
        );
    }
}

export const dynamic = 'force-dynamic';
