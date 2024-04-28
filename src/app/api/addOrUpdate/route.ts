import { addOrUpdate } from '@/lib/menu';
import { MenuItem } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';
/**
 * api route for the addOrUpdate function
 * @param req the request
 * @returns the result of the addOrUpdate function
 */
export async function POST(request: NextRequest) {
    console.log('POST /api/addOrUpdate');
    try {
        const item = (await request.json()) as MenuItem;
        await addOrUpdate(item);
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
