'use client';
import React, { useEffect, useState } from 'react';
import Heading from '@/components/Heading';
import PageButton from '@/components/PageButton';
import DoubleText from '@/components/DoubleText';
import SideBar from '@/components/SideBar';
import styles from '@/app/page.module.css';
import MenuEditer from '@/components/MenuEditer';

export default function Manager() {
    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <div className={styles.body}>
                    <div>
                        <h1>Manager Page</h1>
                        <PageButton>Refresh</PageButton>
                        <MenuEditer />
                    </div>
                </div>
            </div>
        </main>
    );
}
