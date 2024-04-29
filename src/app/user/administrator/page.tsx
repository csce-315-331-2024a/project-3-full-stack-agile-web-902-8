'use client';
import React, { useEffect, useState } from 'react';
import Heading from '@/components/Heading';
import DoubleText from '@/components/DoubleText';
import SideBar from '@/components/SideBar';
import styles from '@/app/page.module.css';
import UserManager from '@/components/UserManager';

/**
 * Creates the page for the administrator
 * @returns the page for the administrator
 */
export default function Administrator() {
    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <div className={styles.body}>
                    <div>
                        <h1>Manage Inventory</h1>
                        <UserManager />
                    </div>
                </div>
            </div>
        </main>
    );
}
