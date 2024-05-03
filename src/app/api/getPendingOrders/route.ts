import Error from '@/lib/error';
import { getPendingOrders } from '@/lib/orders';
import { NextResponse } from 'next/server';

/**
 * GET API to fetch pending orders.
 * Retrieves and returns all pending orders from the system.
 *
 * Returns a 200 response with pending orders on success, or 500 with an error message if an error occurs.
 */
export async function GET() {
    console.log('GET /api/getPendingOrders');
    try {
        const orders = await getPendingOrders();
        return NextResponse.json(orders, { status: 200 });
    } catch (error: unknown) {
        if (!(error instanceof Error)) {
            console.error('Unexpected error:', error);
            return NextResponse.json(
                { error: 'Server error' },
                { status: 500 }
            );
        }

        console.log('Error fetching pending orders:', error.toString());
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';
