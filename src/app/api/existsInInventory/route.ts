import { existsInInventory } from '@/lib/inventory';
import { InventoryItem } from '@/lib/models';
import { request } from 'http';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    console.log('GET /api/existsInInventory');
    try {
        const item = (await request.json()) as InventoryItem;
        const result = await existsInInventory(item.name);
        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error checking exist: ${error.message}` },
            { status: 500 }
        );
    }
}
