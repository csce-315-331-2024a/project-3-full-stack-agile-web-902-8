import { addOrUpdateInventoryItem } from '@/lib/inventory';
import { InventoryItem } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    console.log('POST /api/addOrder');
    try {
        const item = (await request.json()) as InventoryItem;
        await addOrUpdateInventoryItem(item);
        return NextResponse.json(
            { message: 'Successfully added order' },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error adding/udpating item: ${error.message}` },
            { status: 500 }
        );
    }
}
