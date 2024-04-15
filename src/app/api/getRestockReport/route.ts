import { restockReport } from '@/lib/inventory-report';
import { NextResponse } from 'next/server';

export async function GET() {
    console.log('GET /api/getRestockReport');
    try {
        const res = await restockReport();
        return NextResponse.json(res, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error fetching menu types: ${error.message}` },
            { status: 500 }
        );
    }
}
