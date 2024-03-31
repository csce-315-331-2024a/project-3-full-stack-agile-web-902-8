'use client';
import React from 'react';
import Link from 'next/link';
import componentStyles from './component.module.css';

function LogoutButton(){
    const handleLogout = () => {
        // TODO: implement logout
        console.log("Logout button clicked");
    };

    return (
        <div className={componentStyles.logoutDiv}>
            <Link href="/">
                <button className={componentStyles.logout + ' ' + componentStyles.card} onClick={handleLogout}>
                    Logout
                </button>
            </Link>
        </div>
    );
};

export default LogoutButton;
