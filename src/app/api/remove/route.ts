import { remove } from '@/lib/menu';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API route for the remove function
 * @param {NextRequest} req The request object containing the name of the item to remove
 * @returns The result of the remove function
 */
export async function POST(request: NextRequest) {
    console.log('POST /api/remove');
    try {
        const name = (await request.json()) as string;
        console.log(name);
        const result = await remove(name);
        console.log(result);
        return NextResponse.json(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error checking exist: ${error.message}` },
            { status: 500 }
        );
    }
}
