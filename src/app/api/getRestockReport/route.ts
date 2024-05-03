import { restockReport } from '@/lib/inventory-report';
import { NextResponse } from 'next/server';

/**
 * GET API to fetch a restock report.
 * Retrieves and returns the restock report data.
 *
 * Returns a 200 response with the restock report on success, or 500 with an error message if an error occurs.
 */
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
