import { attemptLogin, LoginResult } from '@/lib/login';
import { NextResponse } from 'next/server';
import { getUserSession } from '@/lib/session';
import { loginLevels } from '@/lib/config';

/**
 * api route for getting oauth session and getting permission level of user from db
 * @returns the result of the attemptLogin function
 */
export async function GET() {
    console.log('GET /api/oauthLogin');
    try {
        const user = await getUserSession();
        if (user === undefined) {
            return NextResponse.json(loginLevels.LOGIN_FAILED, { status: 200 });
        }

        const res: LoginResult = await attemptLogin(user.email as string);
        return NextResponse.json(res, { status: 200 });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(
            { error: `Error trying to login user: ${error.message}` },
            { status: 500 }
        );
    }
}
