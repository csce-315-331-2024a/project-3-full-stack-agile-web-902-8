'use client';
import React from 'react';
import PageButton from '@/components/PageButton';
import OrderTable from '@/components/OrderTable';

export default function Manager() {
    const tableHead = ['TimeStamp', 'Order_Id', 'Discount', 'Total'];
    const tableBody = [
        ['Sample time 1', 'Sample id 1', 'Sample Discount 1', 'Sample Total 1'],
        ['Sample time 2', 'Sample id 2', 'Sample Discount 2', 'Sample Total 2'],
    ];

    return (
        <main>
            <h1>Manager Page</h1>
            <PageButton>Refresh</PageButton>
            <OrderTable heading={tableHead} rows={tableBody} />
        </main>
    );
}
