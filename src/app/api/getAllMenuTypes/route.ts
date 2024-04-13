import { getAllMenuTypes } from '@/lib/menu';
import { NextResponse } from 'next/server';

export async function GET() {
    console.log("GET /api/getAllMenuTypes");
    try {
        const menuTypes = await getAllMenuTypes();
        return NextResponse.json(menuTypes, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching menu types' }, { status: 500 });
    }
} 