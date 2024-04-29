import { User, getServerSession } from 'next-auth';

/**
 * An async to return oauth id when an error occurs
 */
export const session = async ({ session, token }: any) => {
    session.user.id = token.id;
    return session;
};

/**
 * Get the user session from oauth
 * @return a user that has username, email, and profile image link
 */
export const getUserSession = async (): Promise<User> => {
    const authUserSession = await getServerSession({
        callbacks: {
            session,
        },
    });
    // if (!authUserSession) throw new Error('unauthorized')
    return authUserSession?.user;
};
