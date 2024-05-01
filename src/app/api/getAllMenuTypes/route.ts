import Error from '@/lib/error';
import { getAllMenuTypes } from '@/lib/menu';
import { NextResponse } from 'next/server';

/**
 * GET API to fetch all menu types.
 * Retrieves and returns a list of all available menu types from the system.
 *
 * @returns Returns a 200 response with the list of menu types on success,
 * or 500 with an error message if an error occurs.
 */
export async function GET() {
    console.log('GET /api/getAllMenuTypes');
    try {
        const menuTypes = await getAllMenuTypes();
        return NextResponse.json(menuTypes, { status: 200 });
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
