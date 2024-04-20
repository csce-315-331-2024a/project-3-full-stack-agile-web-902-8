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
// - orders that have been completed or cancelled should stay for 1 minute before being removed from the grid

export class KitchenOrder extends Order {
    status: string;

    constructor(
        id: number,
        timestamp: Date,
        discount: number,
        total: number,
        items: OrderItem[],
        status: string
    ) {
        super(id, timestamp, discount, total, items);
        this.status = status;
    }
}

export default function Kitchen() {
    const [orders, setOrders] = useState<KitchenOrder[]>([]);

    useEffect(() => {
        const sampleMenuItem = new MenuItem(
            1,
            'Pizza',
            'Main',
            9.99,
            8.99,
            5,
            [],
            null
        );
        const sampleMenuItem2 = new MenuItem(
            2,
            'Burger',
            'Main',
            7.99,
            6.99,
            5,
            [],
            null
        );
        const sampleMenuItem3 = new MenuItem(
            3,
            'Fries',
            'Side',
            2.99,
            1.99,
            5,
            [],
            null
        );
        const sampleMenuItem4 = new MenuItem(
            4,
            'Soda',
            'Drink',
            1.99,
            0.99,
            5,
            [],
            null
        );
        const sampleOrderItem = new OrderItem(2, sampleMenuItem);
        const sampleOrderItem2 = new OrderItem(1, sampleMenuItem2);
        const sampleOrderItem3 = new OrderItem(3, sampleMenuItem3);
        const sampleOrderItem4 = new OrderItem(1, sampleMenuItem4);
        const sampleOrders = [
            new KitchenOrder(
                2,
                new Date(),
                0,
                9.99,
                [sampleOrderItem],
                'Active'
            ),
            new KitchenOrder(
                3,
                new Date(),
                0,
                7.99,
                [sampleOrderItem2],
                'Active'
            ),
            new KitchenOrder(
                4,
                new Date(),
                0,
                2.99,
                [sampleOrderItem3],
                'Active'
            ),
            new KitchenOrder(
                5,
                new Date(),
                0,
                1.99,
                [sampleOrderItem4],
                'Active'
            ),
            new KitchenOrder(
                6,
                new Date(),
                0,
                11.98,
                [sampleOrderItem, sampleOrderItem4],
                'Active'
            ),
        ];
        setOrders(sampleOrders);
    }, []);

    return (
        <main className={componentStyles.kitchenMain}>
            <h1>Kitchen</h1>
            <KitchenGrid orders={orders} />
        </main>
    );
}
