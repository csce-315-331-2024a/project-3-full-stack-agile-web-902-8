import { markOrderAsFilled } from "@/lib/orders";
import { NextRequest, NextResponse } from "next/server";
import Error from '@/lib/error';

export async function POST(request: NextRequest) {
    console.log('POST /api/markOrderAsFilled');
    try {
        const orderId = (await request.json()) as number;
        await markOrderAsFilled(orderId);
        return NextResponse.json(
            { message: 'Successfully marked order as filled' },
            { status: 201 }
        );
    } catch (error: unknown) {
        if(!(error instanceof Error)) {
            console.error('Unexpected error:', error);
            return NextResponse.json(
                { error: 'Server error' },
                { status: 500 }
            );
        }

        console.log('Error marking order as filled:', error.toString());
        return NextResponse.json(
            { error: 'Server error'},
            { status: 500 }
        );
    }
}