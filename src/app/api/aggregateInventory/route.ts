import { aggregateInventory } from '@/lib/inventory-report';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    console.log('GET /api/aggregateInventory');
    try {
        const url = new URL(request.url);
        const startParam = url.searchParams.get('start');
        const endParam = url.searchParams.get('end') || new Date().toISOString();

        if (!startParam || !endParam) {
            return NextResponse.json(
                { error: 'Missing required parameters: start and/or end dates' },
                { status: 400 }
            );
        }

        const start = new Date(startParam);
        const end = new Date(endParam);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return NextResponse.json(
                { error: 'Invalid date parameters' },
                { status: 400 }
            );
        }

        // Convert Date objects to milliseconds since the Unix epoch
        const startMillis = start.getTime();
        const endMillis = end.getTime();

        const inventoryItems = await aggregateInventory(startMillis, endMillis);
        return NextResponse.json(inventoryItems, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error fetching inventory data: ${error.message}` },
            { status: 500 }
        );
    }
}