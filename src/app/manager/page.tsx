'use client';
import React from 'react';
import Heading from '@/components/Heading';
import DoubleText from '@/components/DoubleText';
import SideBar from '@/components/SideBar';
import OrderTable from '@/components/OrderTable';
import styles from '../page.module.css';

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
        'Product Data',
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
    const Links2 = ['/manager', '/customer', '/cashier', '/manager'];

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
                        block1={
                            <SideBar
                                names={Items2}
                                hrefs={Links2}
                                onClick={openMenuBoardsPages}
                            />
                        }
                        block2={
                            <div>
                                <h1>Order History</h1>
                                <OrderTable />
                            </div>
                        }
                    />
                </div>
            </div>
        </main>
    );
}
