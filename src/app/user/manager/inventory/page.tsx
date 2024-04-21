'use client';
import React, { useEffect, useState } from 'react';
import Heading from '@/components/Heading';
import PageButton from '@/components/PageButton';
import DoubleText from '@/components/DoubleText';
import SideBar from '@/components/SideBar';
import styles from '@/app/page.module.css';
import InventoryAdjuster from '@/components/InventoryAdjuster';
import { InventoryItem } from '@/lib/models';

export default function Inventory() {
    const openMenuBoardsPages = () => {
        window.open('/menuboards/Burgs', '_blank');
        window.open('/menuboards/Meals_Limited', '_blank');
        window.open('/menuboards/Misc', '_blank');
        window.open('/menuboards/Sandwiches_Baskets', '_blank');
    };

    const Items = [
        'Home',
        'Menu',
        'Inventory',
        'Order History',
        'Reports',
        'Logout',
    ];
    const Links = [
        '/manager',
        '/manager',
        '/manager/inventory',
        '/manager',
        '/manager/report_page',
        '/',
    ];
    const Items2 = ['Manager', 'Customer', 'Cashier', 'MenuBoard'];
    const Links2 = ['/manager', '/customer', '/cashier', '/menuboards'];
    const inventoryItem: InventoryItem = new InventoryItem(0, '', 0, 0, 0, 0);

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <div className={styles.body}>
                    <h1>Manage Inventory</h1>
                    <PageButton>Refresh</PageButton>
                    <InventoryAdjuster />
                </div>
            </div>
        </main>
    );
}
