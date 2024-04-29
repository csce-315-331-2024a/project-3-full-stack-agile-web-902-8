'use client';
import React from 'react';
import OrderTable from '@/components/OrderTable';
import {
    useScale,
    ScaleProvider,
    ZoomIn,
    ZoomOut,
    ResetZoom,
} from '@/app/zoom.client'; // Ensure the path is correct

export default function Manager() {
    const { scale, setScale } = useScale(); // use the scale from context

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
        <ScaleProvider initialScale={1}>
            {/* Scaled content */}
            <div
                id="scaled-content"
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                    overflow: 'auto',
                }}
            >
                <main className="col-[2/3] row-[2/3] overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4 justify-start">
                    <h1 className="text-[4rem] font-bold relative mainHeader w-fit">
                        Manager
                    </h1>
                    <button className="bg-secondary duration-200 hover:bg-secondary/70 disabled:bg-secondary/30 disabled:hover:cursor-wait p-4 rounded-2xl w-fit">
                        Refresh
                    </button>
                    <OrderTable heading={tableHead} />
                </main>
            </div>
            {/* Fixed-position zoom controls */}
            <div
                id="zoom-controls"
                style={{
                    position: 'fixed',
                    top: '70px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1001, // Above scaled content
                    textAlign: 'center',
                }}
            >
                <ZoomIn />
                <ZoomOut />
                <ResetZoom />
            </div>
        </ScaleProvider>
    );
    return (
        <main className="col-[2/3] row-[2/3] overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4 justify-start">
            <h1 className="text-[4rem] font-bold relative mainHeader w-fit">
                Manager
            </h1>
            <OrderTable heading={tableHead} />
        </main>
    );
}
