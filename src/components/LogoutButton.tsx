// DONE

'use client';
import React from 'react';

interface LogoutButtonProps {
    isLoggedIn: boolean;
}

function LogoutButton({ isLoggedIn }: LogoutButtonProps) {
    const handleLogout = () => {
        // TODO: implement login/logout functionality
        console.log('Login button clicked');
    };

    return (
        <button className='p-3 mx-4 rounded-2xl m-auto bg-secondary duration-200 hover:bg-secondary/50' onClick={handleLogout}>
            {isLoggedIn ? 'Logout' : 'Login'}
        </button>
    );
}

export default LogoutButton;
