// DONE

'use client';

import SideBar from '@/components/SideBar';
import React from 'react';

const names = [
    'Home',
    'Menu Manager',
    'Inventory Manager',
    'Manager Data',
    'Reports',
];
const hrefs = [
    '/user/manager',
    '/user/manager/menu',
    '/user/manager/inventory',
    '/user/manager/order_history',
    '/user/manager/report_page',
];

export default function ManagerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SideBar
                className="col-start-1 col-end-2 row-start-2 row-end-3"
                names={names}
                hrefs={hrefs}
            />
            {children}
        </>
    );
}
