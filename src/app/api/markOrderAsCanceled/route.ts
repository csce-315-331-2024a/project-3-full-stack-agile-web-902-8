import { markOrderAsCanceled } from '@/lib/orders';
import { NextRequest, NextResponse } from 'next/server';
import Error from '@/lib/error';

/**
 * POST API to mark an order as canceled.
 * @param {NextRequest} request - The request containing the order ID.
 * Returns a 201 response on success, or 500 if an error occurs.
 */
export async function POST(request: NextRequest) {
    console.log('POST /api/markOrderAsCanceled');
    try {
        const orderId = (await request.json()) as number;
        await markOrderAsCanceled(orderId);
        return NextResponse.json(
            { message: 'Successfully marked order as canceled' },
            { status: 201 }
        );
    } catch (error: unknown) {
        if (!(error instanceof Error)) {
            console.error('Unexpected error:', error);
            return NextResponse.json(
                { error: 'Server error' },
                { status: 500 }
            );
        }

        console.log('Error marking order as canceled:', error.toString());
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
