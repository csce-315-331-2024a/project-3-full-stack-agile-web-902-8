'use client';

import React from 'react';
import { Order } from '@/lib/models';
import KitchenGridItem from './KitchenGridItem';

interface KitchenGridProps {
    orders: Order[];
}

export default function KitchenGrid({ orders }: KitchenGridProps) {
    return (
        <div className="grid grid-cols-4 gap-4 w-full">
            {orders.map((order) => (
                <KitchenGridItem order={order} key={order.id} />
            ))}
        </div>
    );
}
