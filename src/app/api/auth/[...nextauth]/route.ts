import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const authOption: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID as string,
            clientSecret: GOOGLE_CLIENT_SECRET as string,
        }),
    ],
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
