'use client';

import SideBar from '@/components/SideBar';
import React from 'react';

const names = [
    'Home',
    'Menu Manager',
    'Inventory Manager',
    'Order History',
    'Reports',
];
const hrefs = [
    '/user/manager',
    '/user/manager',
    '/user/manager/inventory',
    '/user/manager',
    '/user/manager/report_page',
];

export default function ManagerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SideBar names={names} hrefs={hrefs} />
            {children}
        </>
    );
}
