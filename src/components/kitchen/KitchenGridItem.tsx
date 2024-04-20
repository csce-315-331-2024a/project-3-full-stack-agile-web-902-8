'use client';

import React, { useEffect, useState } from 'react';
import componentStyles from '@/components/component.module.css';
import { KitchenOrder } from '@/app/kitchen/page';
import { Order } from '@/lib/models';

interface KitchenGridItemProps {
    order: KitchenOrder;
}

export default function KitchenGridItem({ order }: KitchenGridItemProps) {
    const [timeElapsed, setTimeElapsed] = useState(
        new Date(Date.now() - order.timestamp.getTime())
    );
    const [hurry, setHurry] = useState(false);

    function completeOrder() {
        // Implement this function to update the order status to 'Completed'
        // and remove it from the grid
        console.log('Complete order', order.id);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeElapsed(new Date(Date.now() - order.timestamp.getTime()));
        }, 1000);
        return () => clearInterval(interval);
    }, [order.timestamp]);

    useEffect(() => {
        setHurry(timeElapsed.getTime() >= 5 * 60 * 1000); // 5 minutes
    }, [timeElapsed]);

    const hoursElapsed = Math.floor(timeElapsed.getTime() / (1000 * 60 * 60));
    const minutesElapsed = Math.floor(
        (timeElapsed.getTime() / (1000 * 60)) % 60
    );
    const secondsElapsed = Math.floor((timeElapsed.getTime() / 1000) % 60);

    const timeString = `${hoursElapsed.toString().padStart(2, '0')}:${minutesElapsed.toString().padStart(2, '0')}:${secondsElapsed.toString().padStart(2, '0')}`;

    return (
        <div
            className={
                componentStyles.kitchenGridItem +
                ' ' +
                componentStyles.card +
                (hurry ? ' ' + componentStyles.hurry : '')
            }
        >
            <p
                className={
                    componentStyles.kitchenGridTimer +
                    (hurry ? ' ' + componentStyles.hurry : '')
                }
            >
                {timeString}
            </p>
            <h2>Order #{order.id}</h2>
            <p>{order.status}</p>
            <ul>
                {order.items.map((item) => (
                    <li key={item.item.id}>
                        <span className={componentStyles.kitchenGridQuantity}>
                            {item.quantity}
                        </span>
                        <span className={componentStyles.kitchenGridItemName}>
                            {item.item.name}
                        </span>
                    </li>
                ))}
            </ul>
            <p>Total: ${order.total}</p>
            <button
                className={
                    componentStyles.completeOrder + ' ' + componentStyles.card
                }
                onClick={completeOrder}
            >
                Complete
            </button>
        </div>
    );
}
