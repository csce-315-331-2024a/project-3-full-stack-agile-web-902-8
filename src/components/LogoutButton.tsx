'use client';
import React from 'react';
import componentStyles from './component.module.css';

function LogoutButton(){
    const handleLogout = () => {
        // Call the logout function
        console.log("Logout button clicked");
    };

    return (
        <button className={componentStyles.logout + ' ' + componentStyles.card} onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
