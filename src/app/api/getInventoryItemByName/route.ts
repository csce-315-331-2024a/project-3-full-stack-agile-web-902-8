import { getInventoryItemByName } from '@/lib/inventory';
import { InventoryItem } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    console.log('GET /api/existsInInventory');
    try {
        const name = (await request.json()) as string;
        const result = await getInventoryItemByName(name);
        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error checking exist: ${error.message}` },
            { status: 500 }
        );
    }
}