import { addOrder } from '@/lib/orders';
import { Order } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';
import Error from '@/lib/error';

export async function POST(request: NextRequest) {
    console.log('POST /api/addOrder');
    try {
        const order = (await request.json()) as Order;
        if(order.items.length === 0) {
            return NextResponse.json(
                { error: 'Order must have at least one item' },
                { status: 400 }
            );
        }

        await addOrder(order);
        return NextResponse.json(
            { message: 'Successfully added order' },
            { status: 201 }
        );
    } catch (error : unknown) {
        if(!(error instanceof Error)) {
            console.error('Unexpected error:', error);
            return NextResponse.json(
                { error: 'Server error' },
                { status: 500 }
            );
        }
        
        console.log('Error adding order:', error.toString());
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        );
    }
}
