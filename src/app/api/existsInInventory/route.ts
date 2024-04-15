import { existsInInventory } from '@/lib/inventory';
import { InventoryItem } from '@/lib/models';
import { request } from 'http';
import { NextRequest, NextResponse } from 'next/server';
/**
 * api route for the existsInInventory function
 * @param req the request
 * @returns the result of the existsInInventory function
 */
export async function POST(request: NextRequest) {
    console.log('GET /api/existsInInventory');
    try {
        const name = (await request.json()) as string;
        const result = await existsInInventory(name);
        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error checking exist: ${error.message}` },
            { status: 500 }
        );
    }
}
