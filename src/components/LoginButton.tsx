'use client';

import { signIn, signOut } from 'next-auth/react';

interface LoginButtonProps {
    isLoggedIn: boolean;
}

/**
 * Generates the login button
 * @param param0 The props for the login button
 * @returns The login button
 */
function LoginButton({ isLoggedIn }: LoginButtonProps) {
    const handleLogin = () => {
        signIn('google');
    };

    const handleLogout = () => {
        signOut({ callbackUrl: '/user/customer', redirect: true });
    };

    return (
        <button
            onClick={isLoggedIn ? handleLogout : handleLogin}
            className="p-3 mx-4 rounded-2xl m-auto bg-secondary duration-200 hover:bg-secondary/50"
        >
            {isLoggedIn ? 'Logout' : 'Login'}
        </button>
    );
}

export default LoginButton;
