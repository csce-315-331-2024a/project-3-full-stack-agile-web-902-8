import { addMenuItem } from '@/lib/menu';
import { MenuItem } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';
/**
 * api route for the addOrUpdateInventoryItem function
 * @param req the request
 * @returns the result of the addOrUpdateInventoryItem function
 */
export async function POST(request: NextRequest) {
    console.log('POST /api/addMenuItem');
    try {
        const item = (await request.json()) as MenuItem;
        const success = await addMenuItem(item);
        console.log(success);
        return NextResponse.json(
            { message: 'Successfully added order' },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error adding/updating item: ${error.message}` },
            { status: 500 }
        );
    }
}
