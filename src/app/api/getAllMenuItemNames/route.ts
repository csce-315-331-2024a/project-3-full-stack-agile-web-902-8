import Error from '@/lib/error';
import { getAllMenuItemNames } from '@/lib/menu';
import { NextResponse } from 'next/server';

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
