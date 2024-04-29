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

    return (
        <main className="col-[2/3] row-[2/3] overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4 justify-start">
            <h1 className="text-[4rem] font-bold relative mainHeader w-fit">
                Manager
            </h1>
            <OrderTable heading={tableHead} />
        </main>
    );
}
