import { addOrder } from '@/lib/orders';
import { Order } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';
import Error from '@/lib/error';

/**
 * POST API to add a new order.
 * This endpoint accepts an order object in the request body and adds it to the system.
 * Validates that the order includes at least one item and rounds the total to two decimal places before saving.
 *
 * @param {NextRequest} request - The request object containing the order data as JSON.
 * @returns Returns a 201 response with a success message if the order is added successfully,
 * or 400 with an error message if the order does not meet validation criteria, or 500 with an error message if an error occurs during processing.
 */
export async function POST(request: NextRequest) {
    console.log('POST /api/addOrder');
    try {
        const order = (await request.json()) as Order;
        if (order.items.length === 0) {
            return NextResponse.json(
                { error: 'Order must have at least one item' },
                { status: 400 }
            );
        }

        order.total = Math.round(order.total * 100) / 100;

        await addOrder(order);
        return NextResponse.json(
            { message: 'Successfully added order' },
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

        console.log('Error adding order:', error.toString());
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
