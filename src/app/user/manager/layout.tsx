'use client';

import SideBar from '@/components/SideBar';
import React from 'react';

function openMenuBoardsPages() {
    window.open('/menuboards/Burgs', '_blank');
    window.open('/menuboards/Meals_Limited', '_blank');
    window.open('/menuboards/Misc', '_blank');
    window.open('/menuboards/Sandwiches_Baskets', '_blank');
}

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
            { children }
        </>
    );
}