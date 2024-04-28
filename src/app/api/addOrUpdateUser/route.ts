import { addOrUpdateUser } from '@/lib/user';
import { User } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';
/**
 * api route for the addOrUpdateUser function
 * @param req the request
 * @returns the result of the addOrUpdateUser function
 */
export async function POST(request: NextRequest) {
    console.log('POST /api/addOrder');
    try {
        const user = (await request.json()) as User;
        await addOrUpdateUser(user);
        return NextResponse.json(
            { message: 'Successfully added order' },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error adding/updating item: ${error.message}` },
            { status: 500 }
        );
    }
}
