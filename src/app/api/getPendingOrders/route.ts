import Error from '@/lib/error';
import { getPendingOrders } from '@/lib/orders';
import { NextResponse } from 'next/server';

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
