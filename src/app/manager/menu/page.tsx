'use client';
import React, { useEffect, useState } from 'react';
import Heading from '@/components/Heading';
import PageButton from '@/components/PageButton';
import DoubleText from '@/components/DoubleText';
import SideBar from '@/components/SideBar';
import styles from '@/app/page.module.css';
import MenuEditer from '@/components/MenuEditer';

export default function Manager() {
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
        '/manager',
        '/manager',
        '/manager',
        '/',
    ];
    const Items2 = ['Manager', 'Customer', 'Cashier', 'MenuBoard'];
    const Links2 = ['/manager', '/customer', '/cashier', '/menuboards'];
    const tableHead = ['TimeStamp', 'Order_Id', 'Discount', 'Total'];
    const tableBody = [
        ['Sample time 1', 'Sample id 1', 'Sample Discount 1', 'Sample Total 1'],
        ['Sample time 2', 'Sample id 2', 'Sample Discount 2', 'Sample Total 2'],
    ];

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <div>
                    <Heading names={Items} hrefs={Links} />
                </div>
                <div className={styles.body}>
                    <DoubleText
                        block1=<SideBar
                            names={Items2}
                            hrefs={Links2}
                            onClick={openMenuBoardsPages}
                        />
                        block2=<div>
                            <h1>Manager Page</h1>

                            <PageButton>Refresh</PageButton>
                            <MenuEditer />
                        </div>
                    />
                </div>
            </div>
        </main>
    );
}
