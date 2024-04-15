'use client';
import React from 'react';
import Heading from '@/components/Heading';
import DoubleText from '@/components/DoubleText';
import SideBar from '@/components/SideBar';
import styles from '@/app/page.module.css';

export default function Manager() {
    const openMenuBoardsPages = () => {
        window.open('/menuboards/Burgs', '_blank');
        window.open('/menuboards/Meals_Limited', '_blank');
        window.open('/menuboards/Misc', '_blank');
        window.open('/menuboards/Sandwiches_Baskets', '_blank');
    };

    const Items = ['Manager', 'Customer', 'Cashier', 'MenuBoard'];
    const Links = ['/manager', '/customer', '/cashier', '/'];

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <div className={styles.body}>
                    <DoubleText
                        block1={
                            <SideBar
                                names={Items}
                                hrefs={Links}
                                onClick={openMenuBoardsPages}
                            />
                        }
                        block2={undefined}
                    />
                </div>
            </div>
        </main>
    );
}
