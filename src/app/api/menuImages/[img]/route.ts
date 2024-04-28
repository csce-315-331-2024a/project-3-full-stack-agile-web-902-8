import { getMenuItemImage } from '@/lib/menu';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
    _: NextRequest,
    { params }: { params: { img: number } }
) {
    console.log(`GET /api/menuImages/${params.img}`);
    try {
        const n = Number(params.img);
        if (isNaN(n))
            return NextResponse.json(
                { error: `Invalid id '${params.img}'` },
                { status: 400 }
            );
        const image = await getMenuItemImage(n);
        if (image === null)
            return NextResponse.json(
                { error: `id '${params.img}' does not exist` },
                { status: 400 }
            );
        return new NextResponse(image);
    } catch (e: unknown) {
        console.log(e);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
