import { removeUser } from '@/lib/user';
import { NextRequest, NextResponse } from 'next/server';
/**
 * api route for the removeUser function
 * @param req the request
 * @returns the result of the removeUser function
 */
export async function POST(request: NextRequest) {
    console.log('POST /api/removeUser');
    try {
        const username = (await request.json()) as string;
        console.log(username);
        const result = await removeUser(username);
        console.log(result);
        return NextResponse.json(JSON.stringify(result), { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error checking exist: ${error.message}` },
            { status: 500 }
        );
    }
}
