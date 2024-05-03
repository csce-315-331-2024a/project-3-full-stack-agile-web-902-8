'use client';

import React from 'react';
import { Order } from '@/lib/models';
import KitchenGridItem from './KitchenGridItem';

interface KitchenGridProps {
    orders: Order[];
}

/**
 * A functional component that renders a grid of orders, each represented by a KitchenGridItem component.
 * This component is designed to handle and display multiple orders in a structured grid format, facilitating easy navigation and management in a kitchen environment.
 * @param orders - The array of orders to be displayed.
 * @return A React element representing a grid of orders. Each order is displayed as an individual grid item.
 */
export default function KitchenGrid({ orders }: KitchenGridProps) {
    return (
        <div className="grid grid-cols-4 gap-4 w-full pb-[70px]">
            {orders.map((order) => (
                <KitchenGridItem order={order} key={order.id} />
            ))}
        </div>
    );
}
