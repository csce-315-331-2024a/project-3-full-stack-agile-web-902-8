import { getMenuItemByName } from '@/lib/menu';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    console.log('POST /api/getMenuItemByName');
    try {
        const name = (await request.json()) as string;
        console.log(name);
        const result = await getMenuItemByName(name);
        console.log(result);
        return NextResponse.json(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error checking exist: ${error.message}` },
            { status: 500 }
        );
    }
}
