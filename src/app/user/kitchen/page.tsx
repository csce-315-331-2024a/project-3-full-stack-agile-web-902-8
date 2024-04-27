'use client';

import React, { useEffect, useState } from 'react';
import { Order, OrderItem, MenuItem } from '@/lib/models';
import KitchenGrid from '@/components/kitchen/KitchenGrid';
import componentStyles from '@/components/component.module.css';

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
        <main className={componentStyles.kitchenMain}>
            <h1>Kitchen</h1>
            {isInitializing ? (
                <div
                    className={
                        componentStyles.loading + ' ' + componentStyles.card
                    }
                >
                    Loading Orders...
                </div>
            ) : (
                <KitchenGrid orders={orders} />
            )}
        </main>
    );
}
