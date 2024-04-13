import { getMenuItemsInSeason } from '@/lib/menu';
import { NextResponse } from 'next/server';

export async function GET() {
    console.log('GET /api/getMenuItemsInSeason');
    try {
        const menuItems = await getMenuItemsInSeason();
        return NextResponse.json(menuItems, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error fetching menu items' },
            { status: 500 }
        );
    }
}
