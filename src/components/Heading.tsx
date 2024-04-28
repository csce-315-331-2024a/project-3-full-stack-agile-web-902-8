'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './component.module.css';
import LoginButton from './LoginButton';
import { loginLevels } from '@/lib/config';

type HeadingProp = {
    names: string[];
    hrefs: string[];
};

function Heading({ names, hrefs }: HeadingProp) {

    const [userRole, changeUserRole] = useState<string>('');

    // get the user login
    useEffect(() => {
        async function loginUser() {
            const response = await fetch('/api/oauthLogin');
    
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            const type = await response.json();
            changeUserRole(type);
        }
        loginUser();
    }, []);
    
    return (
        <nav className={styles.navbar}>
            <ul>
                {names.map((link, i) => (
                    <li key={link}>
                        <Link href={hrefs[i]}>{link}</Link>
                    </li>
                ))}
                <li>
                    <LoginButton isLoggedIn={
                        userRole != '' &&
                        userRole != loginLevels.LOGIN_FAILED &&
                        userRole != loginLevels.LOGIN_CUSTOMER
                    }/>
                </li>
                <li>{userRole}</li>
            </ul>
        </nav>
    );
}

export default Heading;
