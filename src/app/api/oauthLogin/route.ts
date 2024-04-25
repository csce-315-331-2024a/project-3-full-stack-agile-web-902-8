import { attemptLogin, LoginResult } from '@/lib/login';
import { NextResponse } from 'next/server';
import { getUserSession } from '@/lib/session';
/**
 * api route for the attemptLogin function
 * @param req the request
 * @returns the result of the attemptLogin function
 */
export async function GET() {
    console.log('GET /api/oauthLogin');
    try {
        const user = await getUserSession();
        const res: LoginResult = await attemptLogin(user.email as string);
        return NextResponse.json(
            res.description,
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error trying to login user: ${error.message}` },
            { status: 500 }
        );
    }
}

