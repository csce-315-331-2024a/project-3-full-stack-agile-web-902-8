'use client';
import React from 'react';
import OrderTable from '@/components/OrderTable';

export default function Manager() {
    const tableHead = ['TimeStamp', 'Order_Id', 'Discount', 'Total'];
    const tableBody = [
        ['Sample time 1', 'Sample id 1', 'Sample Discount 1', 'Sample Total 1'],
        ['Sample time 2', 'Sample id 2', 'Sample Discount 2', 'Sample Total 2'],
    ];

    return (
        <main className="col-[2/3] row-[2/3] overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4 justify-start">
            <h1 className="text-[4rem] font-bold relative mainHeader w-fit">Manager</h1>
            <button className='bg-secondary duration-200 hover:bg-secondary/70 disabled:bg-secondary/30 disabled:hover:cursor-wait p-4 rounded-2xl w-fit'>Refresh</button>
            <OrderTable heading={tableHead} rows={tableBody} />
        </main>
    );
}
