import { getMenuItemByName } from '@/lib/menu';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST API to fetch a specific menu item by name.
 * Accepts the name of the menu item in the request body and returns the corresponding menu item details.
 *
 * @param {NextRequest} request - The Next.js request object that includes the menu item name in the JSON payload.
 * @returns Returns a 200 response with the menu item details on success, or 500 with an error message if an error occurs.
 */

export async function POST(request: NextRequest) {
    console.log('POST /api/getMenuItemByName');
    try {
        const name = (await request.json()) as string;
        console.log(name);
        const result = await getMenuItemByName(name);
        console.log(result);
        return NextResponse.json(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error checking exist: ${error.message}` },
            { status: 500 }
        );
    }
}
