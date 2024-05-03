import Error from '@/lib/error';
import { getAllMenuItemNames } from '@/lib/menu';
import { NextResponse } from 'next/server';

/**
 * GET API to fetch all menu item names.
 * Retrieves and returns a list of all menu item names from the system.
 *
 * @returns Returns a 200 response with the list of menu item names on success,
 * or 500 with an error message if an error occurs.
 */
export async function GET() {
    console.log('GET /api/getAllMenuItemNames');
    try {
        const menuItems = await getAllMenuItemNames();
        return NextResponse.json(menuItems, { status: 200 });
    } catch (error: unknown) {
        if (!(error instanceof Error)) {
            console.error('Unexpected error:', error);
            return NextResponse.json(
                { error: 'Server error' },
                { status: 500 }
            );
        }

        console.log('Error fetching menu types:', error.toString());
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';
