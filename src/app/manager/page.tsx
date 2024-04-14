'use client';
import React from 'react';
import Heading from '@/components/Heading';
import PageButton from '@/components/PageButton';
import DoubleText from '@/components/DoubleText';
import SideBar from '@/components/SideBar';
import OrderTable from '@/components/OrderTable';
import {
    ScaleProvider,
    useScale,
    ZoomIn,
    ZoomOut,
    ResetZoom,
} from '../zoom.client'; // Ensure these are correctly imported
import styles from '../page.module.css';

export default function Manager() {
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
    const { scale } = useScale(); // Use the scale from the context

    return (
        <ScaleProvider initialScale={1}>
            <main
                className={styles.main}
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    overflow: 'auto',
                }}
            >
                <div
                    style={{
                        position: 'fixed',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1000,
                    }}
                >
                    <ZoomIn />
                    <ZoomOut />
                    <ResetZoom />
                </div>
                <div className={styles.description}>
                    <Heading names={Items} hrefs={Links} />
                    <div className={styles.body}>
                        <DoubleText
                            block1={<SideBar names={Items2} hrefs={Links2} />}
                            block2={
                                <div>
                                    <h1>Manager Page</h1>
                                    <PageButton>Refresh</PageButton>
                                    <OrderTable
                                        heading={tableHead}
                                        rows={tableBody}
                                    />
                                </div>
                            }
                        />
                    </div>
                </div>
            </main>
        </ScaleProvider>
    );
}
