'use client';

import { signIn, signOut } from 'next-auth/react';
import styles from './component.module.css';

interface LoginButtonProps {
    isLoggedIn: boolean
}


function LoginButton({ isLoggedIn }: LoginButtonProps) {

    const handleLogin = () => {
        signIn('google');
    };

    const handleLogout = () => {
        signOut({ callbackUrl: '/customer', redirect: true});
    }

    return (
        <>
        {isLoggedIn ? (
            <button onClick={handleLogout} className={styles.loginButton}>
                Logout
            </button>
        ) : (
            <button onClick={handleLogin} className={styles.loginButton}>
                Login
            </button>
        )}
        </>
    );
}

export default LoginButton;
