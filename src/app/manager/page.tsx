'use client';
import React from 'react';
import Heading from '@/components/Heading';
import PageButton from '@/components/PageButton';
import DoubleText from '@/components/DoubleText';
import SideBar from '@/components/SideBar';
import OrderTable from '@/components/OrderTable';
import styles from '../page.module.css';
import {
    ScaleProvider,
    useScale,
    ZoomIn,
    ZoomOut,
    ResetZoom,
} from '../zoom.client';


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
        'Manager Data',
        'Reports',
        'Logout',
    ];
    const Links = [
        '/manager',
        '/manager/menu',
        '/manager/inventory',
        '/manager',
        '/manager/report_page',
        '/manager',
    ];
    const Items2 = ['Manager', 'Customer', 'Cashier', 'MenuBoard'];
    const Links2 = ['/manager', '/customer', '/cashier', '/manager'];

    const tableHead = ['TimeStamp', 'Order_Id', 'Discount', 'Total'];
    const tableBody = [
        ['Sample time 1', 'Sample id 1', 'Sample Discount 1', 'Sample Total 1'],
        ['Sample time 2', 'Sample id 2', 'Sample Discount 2', 'Sample Total 2'],
    ];

    const { scale } = useScale();

    return (
        <ScaleProvider initialScale={1}>
            {/* Wrapping everything except the zoom controls with the scale effect */}
            <div
                id="scaled-content"
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    overflow: 'auto',
                }}
            >
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
            </div>
            {/* Fixed-position zoom controls that do not scale */}
            <div
                id="zoom-controls"
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1001, // Ensure this is above the scaled content
                    textAlign: 'center',
                }}
            >
                <ZoomIn />
                <ZoomOut />
                <ResetZoom />
            </div>
        </ScaleProvider>
    );
 
}