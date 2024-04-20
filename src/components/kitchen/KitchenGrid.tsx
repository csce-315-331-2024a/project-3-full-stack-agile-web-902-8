'use client';

import React from 'react';
import componentStyles from '@/components/component.module.css';
import { Order } from '@/lib/models';
import { KitchenOrder } from '@/app/kitchen/page';
import KitchenGridItem from './KitchenGridItem';

interface KitchenGridProps {
    orders: KitchenOrder[];
}

export default function KitchenGrid({ orders }: KitchenGridProps) {
    return (
        <div className={componentStyles.kitchenGrid}>
            {orders.map((order) => (
                <KitchenGridItem order={order} key={order.id} />
            ))}
        </div>
    );
}
