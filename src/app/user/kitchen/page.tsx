'use client';

import React, { useEffect, useState } from 'react';
import { Order, OrderItem, MenuItem } from '@/lib/models';
import KitchenGrid from '@/components/kitchen/KitchenGrid';

// TODO: Consider moving from polling to a more efficient method such as websockets or server-sent events

export default function Kitchen() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch('/api/getPendingOrders');
                if (!response.ok) {
                    throw new Error('Error: ' + response.statusText);
                }
                const orders = await response.json();
                setOrders(orders);
            } finally {
                setIsInitializing(false);
            }
        }
        fetchOrders();
        const interval = setInterval(() => {
            fetchOrders();
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    return (
        <main className="col-[2/3] row-[2/3] overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start p-4">
            <h1 className="text-[4rem] font-bold relative mainHeader mb-4">
                Kitchen
            </h1>
            {isInitializing ? (
                <div className="p-4 rounded-2xl text-background bg-text hover:cursor-wait">
                    Loading Orders...
                </div>
            ) : orders.length === 0 ? (
                <div className="p-4 rounded-2xl text-background bg-text">
                    No Orders
                </div>
            ) : (
                <KitchenGrid orders={orders} />
            )}
        </main>
    );
}
