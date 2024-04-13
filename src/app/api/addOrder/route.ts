import { addOrder } from '@/lib/orders';
import { Order } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    console.log('POST /api/addOrder');
    try {
        const order = (await request.json()) as Order;
        await addOrder(order);
        return NextResponse.json(
            { message: 'Successfully added order' },
            { status: 201 }
        );
    } catch (error: any) {
        if (error.message === 'Order has no items') {
            return NextResponse.json(
                { error: 'Error adding order: Order has no items' },
                { status: 400 }
            );
        }
        if (error.message === 'Order insert failed') {
            return NextResponse.json(
                { error: 'Error adding order: Order insert failed' },
                { status: 500 }
            );
        }
        if (error.message === 'Order item insert failed') {
            return NextResponse.json(
                { error: 'Error adding order: Order item insert failed' },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: 'Error adding order: Unexpected server error' },
            { status: 500 }
        );
    }
}
