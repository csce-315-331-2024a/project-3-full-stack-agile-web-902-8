'use client';

import React, { useEffect, useState } from 'react';
import { Order, OrderItem, MenuItem } from '@/lib/models';
import KitchenGrid from '@/components/kitchen/KitchenGrid';
import componentStyles from '@/components/component.module.css';

// Query the database for orders with status 'active'
// create a grid of orders
// each order should have:
// - order number
// - menu items and quantity
// - order status
// - time elapsed since order was placed

export default function Kitchen() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch('/api/getPendingOrders');
                if (!response.ok) {
                    throw new Error('Error: ' + response.statusText);
                }
                const orders = await response.json();
                setOrders(orders);
            } catch (err) {
                console.error(err);
            }
        }
        fetchOrders();
    }, []);

    return (
        <main className={componentStyles.kitchenMain}>
            <h1>Kitchen</h1>
            <KitchenGrid orders={orders} />
        </main>
    );
}
