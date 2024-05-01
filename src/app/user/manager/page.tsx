'use client';
import React from 'react';
import OrderTable from '@/components/OrderTable';

export default function Manager() {
    const tableHead = [
        'Order ID',
        'Timestamp',
        'Discount',
        'Total',
        'Ordered Items',
        'Status',
    ];
    const tableBody = [
        ['Sample time 1', 'Sample id 1', 'Sample Discount 1', 'Sample Total 1'],
        ['Sample time 2', 'Sample id 2', 'Sample Discount 2', 'Sample Total 2'],
    ];

    return (
        <main className="col-[2/3] row-[2/3] overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4 justify-start">
            <h1 className="text-[4rem] font-bold relative mainHeader w-fit">
                Order History
            </h1>
            <OrderTable heading={tableHead} />
        </main>
    );
}
