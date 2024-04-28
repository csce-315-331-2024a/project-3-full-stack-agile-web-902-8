'use client';
import React, { useEffect, useState } from 'react';
import Heading from '@/components/Heading';
import PageButton from '@/components/PageButton';
import DoubleText from '@/components/DoubleText';
import SideBar from '@/components/SideBar';
import styles from '@/app/page.module.css';
import InventoryAdjuster from '@/components/InventoryAdjuster';
import { InventoryItem } from '@/lib/models';
import UserManager from '@/components/UserManager';

export default function Inventory() {
    const openMenuBoardsPages = () => {
        window.open('/menuboards/Burgs', '_blank');
        window.open('/menuboards/Meals_Limited', '_blank');
        window.open('/menuboards/Misc', '_blank');
        window.open('/menuboards/Sandwiches_Baskets', '_blank');
    };

    const Items = [
        'Home',
    ];
    const Links = [
        '/administrator',
    ];
    const Items2 = ['Manager', 'Customer', 'Cashier', 'MenuBoard'];
    const Links2 = ['/manager', '/customer', '/cashier', '/menuboards'];

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <div>
                    <Heading names={Items} hrefs={Links} />
                </div>
                <div className={styles.body}>
                    <DoubleText
                        block1={
                            <SideBar
                                names={Items2}
                                hrefs={Links2}
                                onClick={openMenuBoardsPages}
                            />
                        }
                        block2=<div>
                            <h1>Manage Inventory</h1>
                            <UserManager/>
                        </div>
                    />
                </div>
            </div>
        </main>
    );
}
