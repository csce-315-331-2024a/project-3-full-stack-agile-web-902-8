'use client';
import React from 'react';
import componentStyles from './component.module.css';

interface LogoutButtonProps {
    isLoggedIn: boolean;
}

function LogoutButton({ isLoggedIn }: LogoutButtonProps) {
    const handleLogout = () => {
        // TODO: implement login/logout functionality
        console.log('Login button clicked');
    };

    return (
        <button className={componentStyles.logout} onClick={handleLogout}>
            {isLoggedIn ? 'Logout' : 'Login'}
        </button>
    );
}

export default LogoutButton;
