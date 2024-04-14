import { request } from '@/lib/inventory';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    console.log('POST /api/request');
    try {
        const { name, amount } = await req.json();
        console.log(name);
        console.log(amount);
        const result = await request(name, amount);
        console.log(result);
        return NextResponse.json(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error checking exist: ${error.message}` },
            { status: 500 }
        );
    }
}
